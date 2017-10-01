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

function updateRemaining() {
    document.querySelector(".remaining").innerHTML = remaining;
}

function hideColoursShowRed() {
    //REDS ARENT KNOWN UNLESS COMING FROM MENU PAGE WITH QUERY STRING
    /* if (reds>0) { */

    var balls = document.querySelectorAll(".ball");

    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "hidden";
    }


    document.querySelector(".ball#red").style.visibility = "visible";

   /* } */
}

function hideRedShowColours() {
    var balls = document.querySelectorAll(".ball");
    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "visible";
    }
    document.querySelector(".ball#red").style.visibility = "hidden";
}


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

    hideColoursShowRed();

}

function setDifference() {
    if (player1score > player2score) {
        var difference = (player1score-player2score);
        if (difference < remaining) {
            document.querySelector("#player1score_diff").innerHTML = "+"+difference;
            document.querySelector("#player2score_diff").innerHTML = "";
        }
    } else {
        var difference = (player2score-player1score);
        if (difference < remaining) {
            document.querySelector("#player2score_diff").innerHTML = "+"+difference;
            document.querySelector("#player1score_diff").innerHTML = "";
        }
    }
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
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"red_log\"></div>";
        player1history.push("Red");
        undoLog.push("P1:redpot");
    } else {
        player2score++;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"red_log\"></div>";
        player2history.push("Red");
        undoLog.push("P2:redpot");
    }
    hideRedShowColours();
    updateScore();
    setDifference();
    updateRemaining();
}


function blackPot() {

    if (player1) {
        player1score += 7;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"black_log\"></div>";
        player1history.push("Black");
        undoLog.push("P1:blackpot");
    } else {
        player2score += 7;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"black_log\"></div>";
        player2history.push("Black");
        undoLog.push("P2:blackpot");
    }
    hideColoursShowRed();
    updateScore();
    setDifference();
}

function pinkPot() {

        if (player1) {
        player1score+=6;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"pink_log\"></div>";
        player1history.push("Pink");
        undoLog.push("P1:pinkpot");
    } else {
        player2score+=6;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"pink_log\"></div>";
        player2history.push("Pink");
        undoLog.push("P2:pinkpot");
    }

    hideColoursShowRed();
    updateScore();
    setDifference();
}


function yellowPot() {
    if (player1) {
        player1score+=2;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"yellow_log\"></div>";
        player1history.push("Yellow");
        undoLog.push("P1:yellowpot");
    } else {
        player2score+=2;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"yellow_log\"></div>";
        player2history.push("Yellow");
        undoLog.push("P2:yellowpot");
    }
    hideColoursShowRed();
    updateScore();
    setDifference();
}


function greenPot() {
    if (player1) {
        player1score += 3;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"green_log\"></div>";
        player1history.push("Green");
        undoLog.push("P1:greenpot");
    } else {
        player2score += 3;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"green_log\"></div>";
        player2history.push("Green");
        undoLog.push("P2:greenpot");
    }

    hideColoursShowRed();
    updateScore();
    setDifference();
}

function brownPot() {
    if (player1) {
        player1score += 4;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"brown_log\"></div>";
        player1history.push("Brown");
        undoLog.push("P1:brownpot");
    } else {
        player2score += 4;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"brown_log\"></div>";
        player2history.push("Brown");
        undoLog.push("P2:brownpot");
    }

    hideColoursShowRed();
    updateScore();
    setDifference();
}

function bluePot() {
    if (player1) {
        player1score += 5;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"blue_log\"></div>";
        player1history.push("Blues");
        undoLog.push("P1:bluepot");
    } else {
        player2score += 5;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"blue_log\"></div>";
        player2history.push("Blue");
        undoLog.push("P2:bluepot");
    }

    hideColoursShowRed();
    updateScore();
    setDifference();
}

function foulMove(i) {

    if (player1) {
        player2score += i;
    } else {
        player1score += i;
    }
    changePlayer();
    updateScore();
    setDifference();
}

function undoMove() {
    /*
    switch (undoLog[undoLog.lastIndexOf])

        case ("P1:redpot") {
            player1score--;
            remaining+=8;
        }
        case ("P2:redpot") {
            player1score--;
            remaining+=8;
        }
        case ("P1:yellowpot") {
            player1score-=2;
        }
        case ("P2:yellowpot") {
            player2score-=2;
        }
        case ("P2:greenpot") {
            player1score-=3;
        }
        case ("P2:greenpot") {
            player2score-=3;
        }
        case ("P2:brownpot") {
            player1score-=3;
        }
        case ("P2:brownpot") {
            player2score-=3;
        }
        */

}
/* Ball Colours */
document.querySelector(".ball#red").addEventListener("click", redPot, false);
document.querySelector(".ball#pink").addEventListener("click", pinkPot, false);
document.querySelector(".ball#black").addEventListener("click", blackPot, false);
document.querySelector(".ball#blue").addEventListener("click", bluePot, false);
document.querySelector(".ball#yellow").addEventListener("click", yellowPot, false);
document.querySelector(".ball#green").addEventListener("click", greenPot, false);
document.querySelector(".ball#brown").addEventListener("click", brownPot, false);

/* Foul and undo */
document.querySelector("#endbreak").addEventListener("click", changePlayer, false);
document.querySelector(".button_game#undo").addEventListener("click", undoMove, false);
document.querySelector(".button_game#foul4").addEventListener("click", function() { foulMove(4) }, false);
document.querySelector(".button_game#foul5").addEventListener("click", function() { foulMove(5) }, false);
document.querySelector(".button_game#foul6").addEventListener("click", function() { foulMove(6) }, false);
document.querySelector(".button_game#foul7").addEventListener("click", function() { foulMove(7) }, false);



/* Initlal Functions */

hideColoursShowRed();
