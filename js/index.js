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
  const ws = new WebSocket("wss://192.168.4.1/ws");

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
    //console.log(JSON.parse(event.data));
    let pad_snare = JSON.parse(event.data).snare;
    let pad_hihat = JSON.parse(event.data).hihat;
    let pad_tom = JSON.parse(event.data).tom;
    let pad_kick = JSON.parse(event.data).kick;
    let pad_crash = JSON.parse(event.data).crash;
    
    if (round(pad_snare, 0, 1000) > 0) {

        
        soundPlay(snare, round(pad_snare, 0, 1000));
      
      console.log(round(pad_snare, 0, 1000));
    } else if (round(pad_hihat, 0, 1000) > 0) {
      soundPlay(hihat,round(pad_hihat, 0, 1000));
    } else if (round(pad_tom, 0, 1000) > 0) {
      soundPlay(tom,round(pad_tom, 0, 1000));
    } else if (round(pad_kick, 0, 1000) > 0) {
      soundPlay(kick,round(pad_kick, 0, 1000));
    } else if (pad_crash > 10) {
      //soundPlay(crash, pad_crash);
    }
  };
}

function soundPlay(pad_name, pad_value) {
  pad_name.pause();
  pad_name.currentTime = 0;
  pad_name.play();
  pad_name.volume = Number(`0.${pad_value}`);
}

function round(value, min, max) {
  return Math.round(((value - min) * (99 - 0)) / (max - min) + 0);
}
//soc = Math.round((voltage - bmin) * (100 - 0) / (bmax - bmin) + 0);
