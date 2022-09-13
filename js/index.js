const snare = document.querySelector("#snare");
const hihat = document.querySelector("#hihat");
const tom = document.querySelector("#tom");
const kick = document.querySelector("#kick");
const crash = document.querySelector("#crash");
const btn_play = document.querySelector("button");

btn_play.addEventListener("click", () => {
  initWebSocket();
  btn_play.innerText = `Conectando...`;
});

function initWebSocket() {
  const ws = new WebSocket("ws://192.168.4.1/ws");

  ws.onopen = function () {
    console.log("Connection opened");
    btn_play.innerText = `Conctado com sucesso`;
  };
  ws.onclose = function () {
    console.log("Connection closed");
    btn_play.style.background = "red";
    btn_play.innerText = `Falha na conexão`;
    setTimeout(() => {
      btn_play.innerText = `PLAY`;
      btn_play.style.background = "rgb(38, 172, 255)";
    }, 2000);
  };
  ws.onmessage = function (event) {
    console.log(JSON.parse(event.data));
    let pad_snare = JSON.parse(event.data).snare;
    let pad_hihat = JSON.parse(event.data).hihat;
    let pad_tom = JSON.parse(event.data).tom;
    let pad_kick = JSON.parse(event.data).kick;
    let pad_crash = JSON.parse(event.data).crash;

    if (pad_snare > 0) {
      soundPlay(snare, pad_snare);
    } else if (pad_hihat > 0) {
      soundPlay(hihat, pad_hihat);
    } else if (pad_tom > 0) {
      soundPlay(tom, pad_tom);
    } else if (pad_kick > 0) {
      soundPlay(kick, pad_kick);
    } else if (pad_crash > 0) {
      soundPlay(crash, pad_crash);
    }
  };
}

function soundPlay(pad_name, pad_value) {
  pad_name.pause();
  pad_name.currentTime = 0;
  pad_name.volume = Number(`0.${pad_value}`);
  pad_name.play();
}
