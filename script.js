var urlParams = new URLSearchParams(window.location.search);

var reds = urlParams.get('reds');

console.log(reds);

var player1 = true;
var player1history = [];
var player2history = [];
var undoLog = [];
var player1score = 0;
var player2score = 0;
var remaining = 147;

function changePlayer() {

    document.querySelector("#player1").classList.toggle("current_player");
    document.querySelector("#player2").classList.toggle("current_player");

    if (player1) {
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"end\"></div>";
        player1=false;
    } else {
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"end\"></div>";
        player1=true;
    }

}

function setDifference() {

}

function updateScore() {
    document.querySelector(".score#player1score").innerHTML = player1score;
    document.querySelector(".score#player2score").innerHTML = player2score;
}

function redPot() {

    reds--;
    remaining -= 8;

    if (player1) {
        player1score++;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"red\"></div>";
        player1history.push("Red");
        undoLog.push("P1:redpot");
    } else {
        player2score++;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"red\"></div>";
        player2history.push("Red");
        undoLog.push("P2:redpot");
    }

    updateScore();

}


function blackPot() {

    if (player1) {
        player1score += 7;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"black\"></div>";
        player1history.push("Black");
        undoLog.push("P1:blackpot");
    } else {
        player2score += 7;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"black\"></div>";
        player2history.push("Black");
        undoLog.push("P2:blackpot");
    }

    updateScore();
    setDifference();
}

function pinkPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"pink\"></div>";
}

function yellowPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"yellow\"></div>";
}

function greenPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"green\"></div>";
}

function brownPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"brown\"></div>";
}

function bluePot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"blue\"></div>";
}

document.querySelector("#endbreak").addEventListener("click", changePlayer, false);
document.querySelector(".ball#red").addEventListener("click", redPot, false);
document.querySelector(".ball#pink").addEventListener("click", pinkPot, false);
document.querySelector(".ball#black").addEventListener("click", blackPot, false);
document.querySelector(".ball#blue").addEventListener("click", bluePot, false);
document.querySelector(".ball#yellow").addEventListener("click", yellowPot, false);
document.querySelector(".ball#green").addEventListener("click", greenPot, false);
document.querySelector(".ball#brown").addEventListener("click", brownPot, false);
