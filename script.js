// SETTING VARS

var urlParams = new URLSearchParams(window.location.search);

var reds = urlParams.get('reds');

console.log(reds);

var player1 = true;
var player1history = [];
var player2history = [];
var undoLog = [];
var player1score = 0;
var player2score = 0;
var remaining = (8*reds)+27;
var lastRedPotted = false;
var finalBalls = false;
var gameEnd = false;

function initiate() {

    hideColoursShowRed();

}

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

function showAllBalls() {
    var balls = document.querySelectorAll(".ball");
    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "visible";
    }
}

function finalBallsDisplay(ball) {
    var balls = document.querySelectorAll(".ball");
    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "hidden";
    }
    document.querySelector(".ball#"+ball).style.visibility = "visible";
}

function changePlayer() {

    document.querySelector("#player1").classList.toggle("current_player");
    document.querySelector("#player2").classList.toggle("current_player");

    if (player1) {
        player1history.push("end");
        setLogBalls();
        player1=false;
    } else {
        player2history.push("end");
        setLogBalls();
        player1=true;
    }
    undoLog.push("player_change");

    hideColoursShowRed();

}

function setLogBalls() {
    document.querySelector("#player1log").innerHTML = "";
    document.querySelector("#player2log").innerHTML = "";
    for (var a=0;a<player1history.length;a++) {
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\""+player1history[a]+"_log\"></div>";
        }
    for (var j=0;j<player2history.length;j++) {
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\""+player2history[j]+"_log\"></div>";
        }
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

function endGame() {
    // HANDLE GAME CONCLUSION
}

function redPot() {
    reds--;
    if (reds==0) { lastRedPotted=true; console.log("lastRedPotted"); }
    remaining -= 8;

    if (player1) {
        player1score++;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"red_log\"></div>";
        player1history.push("red");
        setLogBalls();
        undoLog.push("P1:redpot");
    } else {
        player2score++;
        player2history.push("red");
        setLogBalls();
        undoLog.push("P2:redpot");
    }
    hideRedShowColours();
    updateScore();
    setDifference();
    updateRemaining();
}

function blackPot() {
    if (reds>=1 && !finalBalls) {
    if (player1) {
        player1score += 7;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"black_log\"></div>";
        player1history.push("black");
        setLogBalls();
        undoLog.push("P1:blackpot");
    } else {
        player2score += 7;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"black_log\"></div>";
        player2history.push("black");
        setLogBalls();
        undoLog.push("P2:blackpot");
    }} else {
    if (lastRedPotted) {
        lastRedPotted=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
        remaining=27;
    } else {
        if (player1) {
            undoLog.push("P1:finalblack");
            player1score+=7;
        } else {
            undoLog.push("P2:finalblack");
            player2score+=7;
        }
        remaining-=7;
        gameEnd=true;
    }}
    if (!finalBalls) { hideColoursShowRed(); }
    updateScore();
    setDifference();
    if (gameEnd) { endGame(); }
}

function pinkPot() {
    if (reds>=1 && !finalBalls) {
    if (player1) {
        player1score+=6;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"pink_log\"></div>";
        player1history.push("pink");
        setLogBalls();
        undoLog.push("P1:pinkpot");
    } else {
        player2score+=6;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"pink_log\"></div>";
        player2history.push("pink");
        setLogBalls();
        undoLog.push("P2:pinkpot");
        }
    } else {
    if (lastRedPotted) {
        lastRedPotted=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
        remaining=27;
    } else {
        if (player1) {
            undoLog.push("P1:finalpink");
            player1score+=6;
        } else {
            undoLog.push("P2:finalpink");
            player2score+=6;
        }
        remaining-=6;
        finalBallsDisplay("black");
    }}
    if (!finalBalls) { hideColoursShowRed(); }
    updateScore();
    setDifference();
}

function yellowPot() {
    if (reds>=1 && !finalBalls) {
    if (player1) {
        player1score+=2;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"yellow_log\"></div>";
        player1history.push("yellow");
        setLogBalls();
        undoLog.push("P1:yellowpot");
    } else {
        player2score+=2;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"yellow_log\"></div>";
        player2history.push("yellow");
        setLogBalls();
        undoLog.push("P2:yellowpot");
    }} else {
    if (lastRedPotted) {
        lastRedPotted=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
        remaining=27;
    } else {
        if (player1) {
            undoLog.push("P1:finalyellow");
            player1score+=2;
        } else {
            undoLog.push("P2:finalyellow");
            player2score+=2;
        }
        remaining-=2;
        finalBallsDisplay("green");
    }}
    if (!finalBalls) { hideColoursShowRed(); }
    updateScore();
    setDifference();
}

function greenPot() {
    if (reds>=1 && !finalBalls) {
    if (player1) {
        player1score += 3;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"green_log\"></div>";
        player1history.push("green");
        setLogBalls();
        undoLog.push("P1:greenpot");
    } else {
        player2score += 3;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"green_log\"></div>";
        player2history.push("green");
        setLogBalls();
        undoLog.push("P2:greenpot");
    }} else {
    if (lastRedPotted) {
        lastRedPotted=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
        remaining=27;
    } else {
        if (player1) {
            undoLog.push("P1:finalgreen");
            player1score+=3;
        } else {
            undoLog.push("P2:finalgreen");
            player2score+=3;
        }
        remaining-=3;
        finalBallsDisplay("brown");
    }}
    if (!finalBalls) { hideColoursShowRed(); }
    updateScore();
    setDifference();
}

function brownPot() {
    if (reds>=1 && !finalBalls) {
    if (player1) {
        player1score += 4;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"brown_log\"></div>";
        player1history.push("brown");
        setLogBalls();
        undoLog.push("P1:brownpot");
    } else {
        player2score += 4;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"brown_log\"></div>";
        player2history.push("brown");
        setLogBalls();
        undoLog.push("P2:brownpot");
    }} else {
    if (lastRedPotted) {
        lastRedPotted=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
        remaining=27;
    } else {
        if (player1) {
            undoLog.push("P1:finalbrown");
            player1score+=4;
        } else {
            undoLog.push("P2:finalbrown");
            player2score+=4;
        }
        remaining-=4;
        finalBallsDisplay("blue");
    }}
    if (!finalBalls) { hideColoursShowRed(); }
    updateScore();
    setDifference();
}

function bluePot() {
    if (reds>=1 && !finalBalls) {
    if (player1) {
        player1score += 5;
        document.querySelector("#player1log").innerHTML += "<div class=\"ball_log\" id=\"blue_log\"></div>";
        player1history.push("blue");
        setLogBalls();
        undoLog.push("P1:bluepot");
    } else {
        player2score += 5;
        document.querySelector("#player2log").innerHTML += "<div class=\"ball_log\" id=\"blue_log\"></div>";
        player2history.push("blue");
        setLogBalls();
        undoLog.push("P2:bluepot");
    }} else {
    if (lastRedPotted) {
        lastRedPotted=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
        remaining=27;
    } else {
        if (player1) {
            undoLog.push("P1:finalblue");
            player1score+=5;
        } else {
            undoLog.push("P2:finalblue");
            player2score+=5;
        }
        remaining-=5;
        finalBallsDisplay("pink");
    }}
    if (!finalBalls) { hideColoursShowRed(); }
    updateScore();
    setDifference();
}

function foulMove(i) {

    if (player1) {
        player2score += i;
        undoLog.push("P1:foul"+i);
    } else {
        player1score += i;
        undoLog.push("P2:foul"+i);
    }
    if (lastRedPotted) { lastRedPotted=false; } else {
        // HANDLE THAT BALL BEING LAST POTTED
    }
    changePlayer();
    updateScore();
    setDifference();
}

function undoMove() {

    console.log(undoLog.length);
    console.log(undoLog[undoLog.length-1]);

    switch (undoLog[undoLog.length-1]) {
        case "player_change":
            if (player1) { player1=false; } else { player1=true; }
            break;

        case "P1:redpot":
            player1score--;
            remaining+=8;
            reds++;
            player1=false;
            if (undoLog.length!==1) {
            hideRedShowColours();
            } else { hideColoursShowRed(); }
            break;

        case "P2:redpot":
            player2score--;
            remaining+=8;
            reds++;
            player1=true;
            if (undoLog.length!==1) {
            hideRedShowColours();
            } else { hideColoursShowRed(); }
            break;

        case "P1:yellowpot":
            player1score-=2;
            player1=false;
            hideColoursShowRed();
            break;

        case "P2:yellowpot":
            player2score-=2;
            player1=true;
            hideColoursShowRed();
            break;

        case "P1:greenpot":
            player1score-=3;
            player1=false;
            hideColoursShowRed();
            break;

        case "P2:greenpot":
            player2score-=3;
            player1=true;
            hideColoursShowRed();
            break;

        case "P1:brownpot":
            player1score-=4;
            player1=false;
            hideColoursShowRed();
            break;

        case "P2:brownpot":
            player2score-=4;
            player1=true;
            hideColoursShowRed();
            break;

        case "P1:bluepot":
            player1score-=5;
            player1=false;
            hideColoursShowRed();
            break;

        case "P2:bluepot":
            player2score-=5;
            player1=true;
            hideColoursShowRed();
            break;

        case "P1:pinkpot":
            player1score-=6;
            player1=false;
            hideColoursShowRed();
            break;

        case "P2:pinkpot":
            player2score-=6;
            player1=true;
            hideColoursShowRed();
            break;

        case "P1:blackpot":
            player1score-=7;
            player1=false;
            hideColoursShowRed();
            break;

        case "P2:blackpot":
            player2score-=7;
            player1=true;
            hideColoursShowRed();
            break;

        // FOULS UNDO

        case "P2:foul4":
            player1score-=4;
            player1=false;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            break;

        case "P2:foul5":
            player1score-=5;
            player1=false;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            break;

        case "P2:foul6":
            player1score-=6;
            player1=false;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            break;

        case "P2:foul7":
            player1score-=7;
            player1=false;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }

        // FOULS UNDO PLAYER 1

        case "P1:foul4":
            player2score-=4;
            player1=true;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            break;

        case "P1:foul5":
            player2score-=5;
            player1=true;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            break;

        case "P1:foul6":
            player2score-=6;
            player1=true;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            break;

        case "P1:foul7":
            player2score-=7;
            player1=true;
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }

            break;
    }
            updateRemaining();
            updateScore();
            setDifference();
            undoLog.pop();


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
window.onLoad = initiate();

