var logTopLayer = document.querySelector(".log-top-layer"),
    logBottomLayer = document.querySelector(".log-bottom-layer"),
    divsInTopLog = document.querySelectorAll(".log-top-layer div"),
    divsInBottomLog = document.querySelectorAll(".log-bottom-layer div");

function setLogWidth() {
    logTopLayer.style.width = (divsInTopLog.length+1)*20+20+"px";
    logBottomLayer.style.width = (divsInBottomLog.length+1)*20+20+"px";

}

setLogWidth();
