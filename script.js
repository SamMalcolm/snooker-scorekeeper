var urlParams = new URLSearchParams(window.location.search);

var reds = urlParams.get('reds');

console.log(reds);
var player1=true;

function changePlayer() {
        console.log("Burtton CLicked Player 1");
        document.querySelector("#player1").classList.toggle("current_player");
        document.querySelector("#player2").classList.toggle("current_player");
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"end\"></div>";
        player1=false;


}

function redPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"red\"></div>";
}

function blackPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"black\"></div>";
}

function pinkPot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"pink\"></div>";
}

function bluePot() {
    document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"blue\"></div>";
}

document.querySelector("#endbreak").addEventListener("click", changePlayer, false);

document.querySelector(".ball#red").addEventListener("click", redPot, false);
document.querySelector(".ball#pink").addEventListener("click", pinkPot, false);
document.querySelector(".ball#black").addEventListener("click", blackPot, false);
document.querySelector(".ball#blue").addEventListener("click", bluePot, false);
