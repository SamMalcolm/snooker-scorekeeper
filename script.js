// SETTING VARS

function _(x) {
    return document.querySelector(x);
}

function _All(x) {
    return document.querySelectorAll(x);
}

var urlParams = new URLSearchParams(window.location.search);

var reds = urlParams.get('reds');
var player1name = urlParams.get('p1name');
var player2name = urlParams.get('p2name');

if (player1name) {
    _("#player1").innerHTML = "<h1>"+player1name+"</h1>";
}
if (player2name) {
    _("#player2").innerHTML = "<h1>"+player2name+"</h1>";
}
console.log(reds);

var player1 = true;
var player1history = [];
var player2history = [];
var undoLog = [];
var player1score = 0;
var player2score = 0;
var remaining = (8*reds)+27;
var freeBall = false;
var finalBalls = false;
var gameEnd = false;
var finalColour=false;

function initiate() {

    hideColoursShowRed();
    updateRemaining();
}

function respottedBlack() {
    // HANDLE EVENT OF TIE
    alert('This is a tie, respot the black and shoot from the baulk line');
    changePlayer(false);
    finalBallsDisplay("black");
}

function updateRemaining() {
    _(".remaining").innerHTML = remaining;
}

function hideColoursShowRed() {
    //REDS ARENT KNOWN UNLESS COMING FROM MENU PAGE WITH QUERY STRING
    /* if (reds>0) { */

    var balls = _All(".ball");

    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "hidden";
    }


    _(".ball#red").style.visibility = "visible";

   /* } */
}

function hideRedShowColours() {
    var balls = _All(".ball");
    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "visible";
    }
    _(".ball#red").style.visibility = "hidden";
}

function finalBallsDisplay(ball) {
    var balls = _All(".ball");
    for (var i=0;i<balls.length;i++) {
        balls[i].style.visibility = "hidden";
    }
    _(".ball#"+ball).style.visibility = "visible";
}

function changePlayer(undo) {

    _("#player1").classList.toggle("current_player");
    _("#player2").classList.toggle("current_player");

    if (undo == false) {
    undoLog.push("player_change");
    }

    if (player1) {
        player1history.push("end");
        setLogBalls();
        player1=false;
    } else {
        player2history.push("end");
        setLogBalls();
        player1=true;
    }
    if (reds==0 && freeBall) {
        freeBall=false;
        finalBalls=true;
        finalBallsDisplay("yellow");
    } else {
        if (!finalBalls) {
        hideColoursShowRed();
        }
    }

    freeBall=false;
}

function setLogBalls() {
    _("#player1log").innerHTML = "";
    _("#player2log").innerHTML = "";
    for (var a=0;a<player1history.length;a++) {
        _("#player1log").innerHTML += "<div class=\"ball_log\" id=\""+player1history[a]+"_log\"></div>";
        }
    for (var j=0;j<player2history.length;j++) {
        _("#player2log").innerHTML += "<div class=\"ball_log\" id=\""+player2history[j]+"_log\"></div>";
        }
}

function setDifference() {
    if (player1score > player2score) {
        var difference = (player1score-player2score);
        // ACCOUNTED FOR NO COME BACK OPPORTUNITY, NOT HANDLED IN CODE
        /* if (difference < remaining) { */
            _("#player1score_diff").innerHTML = "+"+difference;
            _("#player2score_diff").innerHTML = "";
      /*  } */
    } else {
        var difference = (player2score-player1score);
        /* if (difference < remaining) { */
            _("#player2score_diff").innerHTML = "+"+difference;
            _("#player1score_diff").innerHTML = "";
        /* } */
    }
}

function updateScore() {
    _(".score#player1score").innerHTML = player1score;
    _(".score#player2score").innerHTML = player2score;
}

function endGame() {
    if (player1name) {
        var alertp1 = player1name;
    } else {
       var alertp1 = "Player 1";
    }
    if (player2name) {
        var alertp2 = player2name;
    } else {
       var alertp2 = "Player 2";
    }

    if (player1score>player2score) {
        var difference = player1score-player2score;
        alert(`Congratulations ${alertp1}

                ${alertp1} beat ${alertp2} by ${difference} points
                with a score of ${player1score}`);
    } else {
        var difference = player2score-player1score;
        alert(`Congratulations ${alertp2}

                ${alertp2} beat ${alertp1} by ${difference} points
                with a score of ${player2score}`);
    }
    /*
    _(".modal").style.display = "block";
    if (player1score>player2score) {
        var player1Wins = "<h1>Congratulations Player 1!</h1>";
        player1Wins += "<h3>With a score of "+player1score+"</h3>";
        player1Wins += "<h3>Player 1 has beaten player 2 by "+(player1score-player2score)+" points!</h3>"
        _(".modal_content").innerHTML += player1Wins;
    } else {
        var player2Wins = "<h1>Congratulations Player 2!</h1>";
        player2Wins += "<h3>With a score of "+player2score+"</h3>";
        player2Wins += "<h3>Player 2 has beaten player 1 by "+(player2score-player1score)+" points!</h3>"
        _(".modal_content").innerHTML += player2Wins;
    }
    */
}

function foulMove(i) {

    if (player1) {
        player2score += i;
        undoLog.push("P1:foul"+i);
    } else {
        player1score += i;
        undoLog.push("P2:foul"+i);
    }
    changePlayer(true);
    updateScore();
    setDifference();
    updateRemaining();
}

function undoMove() {

    console.log(undoLog.length);
    console.log(undoLog[undoLog.length-1]);
    var ballValues = {
        1:"red",
        2:"yellow",
        3:"green",
        4:"brown",
        5:"blue",
        6:"pink",
        7:"black"
    };


    switch (undoLog[undoLog.length-1]) {
        case "player_change":
            changePlayer(true);
            break;
           /*
        for (let i=0;i<ballValues.length;i++) {
            case "P1:"+ballValues[i]+"pot":
                if (ballValues[i]=="red") {
                    reds++;
                    remaining+=8;
                    hideColoursShowRed();
                } else {
                    hideRedShowColours();
                }
                player1score -= i;
                player1history.pop;

            case "P2:"+ballValues[i]+"pot":
                if (ballValues[i]=="red") {
                    reds++;
                    remaining+=8;
                    hideColoursShowRed();
                } else {
                    hideRedShowColours();
                }
                player2score -= i;
                player2history.pop;
        } */

        case "P1:redpot":
            player1score--;
            remaining+=8;
            reds++;
            player1history.pop();
            hideColoursShowRed();
            break;

        case "P2:redpot":
            player2score--;
            remaining+=8;
            reds++;
            player2history.pop();
            hideColoursShowRed();
            break;

        case "P1:yellowpot":
            player1score-=2;
            hideRedShowColours();
            player1history.pop();
            break;

        case "P2:yellowpot":
            player2score-=2;
            hideRedShowColours();
            player2history.pop();
            break;

        case "P1:greenpot":
            player1score-=3;
            hideRedShowColours();
            player1history.pop();
            break;

        case "P2:greenpot":
            player2score-=3;
            hideRedShowColours();
            player2history.pop();
            break;

        case "P1:brownpot":
            player1score-=4;
            hideRedShowColours();
            player1history.pop();
            break;

        case "P2:brownpot":
            player2score-=4;
            hideRedShowColours();
            player2history.pop();
            break;

        case "P1:bluepot":
            player1score-=5;
            hideRedShowColours();
            player1history.pop();
            break;

        case "P2:bluepot":
            player2score-=5;
            hideRedShowColours();
            player2history.pop();
            break;

        case "P1:pinkpot":
            player1score-=6;
            hideRedShowColours();
            player1history.pop();
            break;

        case "P2:pinkpot":
            player2score-=6;
            hideRedShowColours();
            player2history.pop();
            break;

        case "P1:blackpot":
            player1score-=7;
            hideRedShowColours();
            player1history.pop();

            break;

        case "P2:blackpot":
            player2score-=7;
            hideRedShowColours();
            player2history.pop();
            break;

        // FOULS UNDO

        case "P2:foul4":
            player1score-=4;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;

        case "P2:foul5":
            player1score-=5;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;

        case "P2:foul6":
            player1score-=6;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;

        case "P2:foul7":
            player1score-=7;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;
        // FOULS UNDO PLAYER 1

        case "P1:foul4":
            player2score-=4;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;

        case "P1:foul5":
            player2score-=5;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;

        case "P1:foul6":
            player2score-=6;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;

        case "P1:foul7":
            player2score-=7;
            if (undoLog.length !== 1) {
            if (undoLog[undoLog.length-2].includes("red")) {
                hideRedShowColours();
            } else {
                hideColoursShowRed();
            }
            } else {
                hideColoursShowRed();
            }
            changePlayer(true);
            break;
         // Final ball count undo //
        case "P1:yellowpot_final":
            player1score -= 2;
            remaining += 2;
            finalBallsDisplay("yellow");
            player1history.pop();
            break;
        case "P1:greenpot_final":
            player1score -= 3;
            remaining += 3;
            finalBallsDisplay("green");
            player1history.pop();
            break;
        case "P1:brownpot_final":
            player1score -= 4;
            remaining += 4;
            finalBallsDisplay("brown");
            player1history.pop();
            break;
        case "P1:bluepot_final":
            player1score -= 5;
            remaining += 5;
            finalBallsDisplay("blue");
            player1history.pop();
            break;
        case "P1:pinkpot_final":
            player1score -= 6;
            remaining += 6;
            finalBallsDisplay("pink");
            player1history.pop();
            break;
        case "P1:blackpot_final":
            player1score -= 7;
            remaining += 7;
            finalBallsDisplay("black");
            player1history.pop();
            break;

        case "P2:yellowpot_final":
            player2score -= 2;
            remaining += 2;
            finalBallsDisplay("yellow");
            player2history.pop();
            break;
        case "P2:greenpot_final":
            player2score -= 3;
            remaining += 3;
            finalBallsDisplay("green");
            player2history.pop();
            break;
        case "P2:brownpot_final":
            player2score -= 4;
            remaining += 4;
            finalBallsDisplay("brown");
            player2history.pop();
            break;
        case "P2:bluepot_final":
            player2score -= 5;
            remaining += 5;
            finalBallsDisplay("blue");
            player2history.pop();
            break;
        case "P2:pinkpot_final":
            player2score -= 6;
            remaining += 6;
            finalBallsDisplay("pink");
            player2history.pop();
            break;
        case "P2:blackpot_final":
            player2score -= 7;
            remaining += 7;
            finalBallsDisplay("black");
            player2history.pop();
            break;

          // Free Ball Undos //
        case "P1:yellowpot_fb":
            player1score -= 2;
            remaining += 2;
            freeBall = true;
            hideRedShowColours();
            player1history.pop();
            break;
        case "P1:greenpot_fb":
            player1score -= 3;
            remaining += 3;
            freeBall = true;
            hideRedShowColours();
            player1history.pop();
            break;
        case "P1:brownpot_fb":
            player1score -= 4;
            remaining += 4;
            freeBall = true;
            hideRedShowColours();
            player1history.pop();
            break;
        case "P1:bluepot_fb":
            player1score -= 5;
            remaining += 5;
            freeBall = true;
            hideRedShowColours();
            player1history.pop();
            break;
        case "P1:pinkpot_fb":
            player1score -= 6;
            remaining += 6;
            freeBall = true;
            hideRedShowColours();
            player1history.pop();
            break;
        case "P1:blackpot_fb":
            player1score -= 7;
            remaining += 7;
            freeBall = true;
            hideRedShowColours();
            player1history.pop();
            break;

        case "P2:yellowpot_fb":
            player2score -= 2;
            remaining += 2;
            freeBall = true;
            hideRedShowColours();
            player2history.pop();
            break;

        case "P2:greenpot_fb":
            player2score -= 3;
            remaining += 3;
            freeBall = true;
            hideRedShowColours();
            player2history.pop();
            break;
        case "P2:brownpot_fb":
            player2score -= 4;
            remaining += 4;
            freeBall = true;
            hideRedShowColours();
            player2history.pop();
            break;
        case "P2:bluepot_fb":
            player2score -= 5;
            remaining += 5;
            freeBall = true;
            hideRedShowColours();
            player2history.pop();
            break;
        case "P2:pinkpot_fb":
            player2score -= 6;
            remaining += 6;
            freeBall = true;
            hideRedShowColours();
            player2history.pop();
            break;
        case "P2:blackpot_fb":
            player2score -= 7;
            remaining += 7;
            freeBall = true;
            hideRedShowColours();
            player2history.pop();
            break;

    }
            updateRemaining();
            updateScore();
            setDifference();
            setLogBalls();
            undoLog.pop();


}

function pot(value) {

var ballValues = {
        1:"red",
        2:"yellow",
        3:"green",
        4:"brown",
        5:"blue",
        6:"pink",
        7:"black"
};

    if (ballValues[value]=="red") {
        hideRedShowColours();
    } else {
        (reds > 0) ? hideColoursShowRed() : null;
    }
    // If Ball is red
    if (ballValues[value] == "red") {
        reds--;
        if (reds==0) {
            freeBall=true;
        }
        remaining -= 8;
    }

    if (player1) {

        player1score += value;
        player1history.push(ballValues[value]);
        undoLog.push("P1:"+ballValues[value]+"pot");

    } else {

        player2score += value;
        player2history.push(ballValues[value]);
        undoLog.push("P2:"+ballValues[value]+"pot");

    }
    if (freeBall) {
        hideRedShowColours();
    }

    updateScore();
    setLogBalls();
    updateRemaining();
    setDifference();

}

function freeBallPot(value) {

var ballValues = {
        1:"red",
        2:"yellow",
        3:"green",
        4:"brown",
        5:"blue",
        6:"pink",
        7:"black"
};

    if (player1) {
        undoLog.push("P1:"+ballValues[value]+"pot_fb");
        player1score+=value;
        player1history.push(ballValues[value]);
    } else {
        undoLog.push("P2:"+ballValues[value]+"pot_fb");
        player2score+=value;
        player2history.push(ballValues[value]);
    }

    finalBalls = true;
    freeBall=false;
    remaining=27;
    finalBallsDisplay("yellow");
    setDifference();
    setLogBalls();
    updateScore();
    updateRemaining();
}

function finalPot(value) {

var ballValues = {
        1:"red",
        2:"yellow",
        3:"green",
        4:"brown",
        5:"blue",
        6:"pink",
        7:"black"
};
        if (player1) {
            undoLog.push("P1:"+ballValues[value]+"pot_final");
            player1score+=value;
            player1history.push(ballValues[value]);

        } else {
            undoLog.push("P2:"+ballValues[value]+"pot_final");
            player2score+=value;
            player2history.push(ballValues[value]);
        }
        remaining -= value;

        if (value==7) {
            if (player1score == player2score) {
                respottedBlack();
            } else {
                endGame();
            }
        }

        (value !== 7) ? finalBallsDisplay(ballValues[++value]) : null;

        setDifference();
        setLogBalls();
        updateScore();
        updateRemaining();



}



/* Ball Colours */
_(".ball#red").addEventListener("click", function() { pot(1) }, false);
_(".ball#pink").addEventListener("click", function() {
    if (!freeBall && !finalBalls) {
        pot(6);
    } else {
        if (finalBalls) {
            finalPot(6);
        } else {
            freeBallPot(6);
        }
    }

}, false);
_(".ball#black").addEventListener("click", function() {
    if (!freeBall && !finalBalls) {
        pot(7);
    } else {
        if (finalBalls) {
            finalPot(7);
        } else {
            freeBallPot(7);
        }
    }

}, false);
_(".ball#blue").addEventListener("click", function() {
    if (!freeBall && !finalBalls) {
        pot(5);
    } else {
        if (finalBalls) {
            finalPot(5);
        } else {
            freeBallPot(5);
        }
    }
}, false);
_(".ball#yellow").addEventListener("click", function() {
    if (!freeBall && !finalBalls) {
        pot(2);
    } else {
        if (finalBalls) {
            finalPot(2);
        } else {
            freeBallPot(2);
        }
    }
}, false);
_(".ball#green").addEventListener("click", function() {
    if (!freeBall && !finalBalls) {
        pot(3);
    } else {
        if (finalBalls) {
            finalPot(3);
        } else {
            freeBallPot(3);
        }
    }
}, false);
_(".ball#brown").addEventListener("click", function() {
    if (!freeBall && !finalBalls) {
        pot(4);
    } else {
        if (finalBalls) {
            finalPot(4);
        } else {
            freeBallPot(4);
        }
    }

}, false);

/* Foul and undo */
_("#endbreak").addEventListener("click", function() {changePlayer(false)}, false);
_("#player1").addEventListener("click",function() {
    if (!player1) { changePlayer(); }
},false);
_("#player2").addEventListener("click",function() {
    if (player1) { changePlayer(); }
},false);
_(".button_game#undo").addEventListener("click", undoMove, false);
_(".button_game#foul4").addEventListener("click", function() { foulMove(4) }, false);
_(".button_game#foul5").addEventListener("click", function() { foulMove(5) }, false);
_(".button_game#foul6").addEventListener("click", function() { foulMove(6) }, false);
_(".button_game#foul7").addEventListener("click", function() { foulMove(7) }, false);
_(".exit_modal").addEventListener("click", function() {
    window.location.replace("index.html");
});

/* Initlal Functions */
window.onLoad = initiate();

