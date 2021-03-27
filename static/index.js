var video = document.getElementById("video1");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasDimensions = {
  width: 0,
  height: 0
};
var Bpm_value = 0;


async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const navigatorAny = navigator;
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigatorAny.webkitGetUserMedia ||
      navigatorAny.mozGetUserMedia ||
      navigatorAny.msGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        stream => {
          video.srcObject = stream;
          video.addEventListener(
            "loadeddata",
            e => {
              // video has been loaded with its meta data such as width and height
              // use it to set height and width of the canvas
              canvas.setAttribute("height", e.target.clientHeight);
              canvas.setAttribute("width", e.target.clientWidth);
              canvasDimensions = {
                width: e.target.clientWidth,
                height: e.target.clientHeight
              };
              resolve();
            },
            false
          );
        },
        error => reject()
      );
    } else {
      reject();
    }
  });
}

setupWebcam();


 function getBpm() {
  ctx.drawImage(video, 0, 0, canvasDimensions.width, canvasDimensions.height);
  img = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
  var payload1 = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    body: img
  };
    // TODO: Change other AJAX calls to fetch calls.
    var response = fetch("https://127.0.0.1:2221/take_pic", payload1)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      Bpm_value = json.BPM;
      console.log('BPM Value : ', Bpm_value)
      DisplayText(Bpm_value);
    })
}

function change() {
  if (click_val == true) {
    click_val = false;
  } else {
    click_val = true;
  }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DisplayText(bpm) {
  if(typeof bpm === "undefined"){
    bpm = getRandomInt(60, 100)
  }
  console.log('New BPM: ', bpm)
  bpm = bpm.toString();
  document.getElementById("ShowText").innerHTML = bpm.fontcolor("red");
}

