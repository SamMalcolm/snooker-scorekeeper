var redoLog = [],
    log = [],
    player1score = 0,
    player2score = 0,
    player1active,
    remaining = 147,
    difference = 0,
    reds = 5,
    p1snookersRequired = 0,
    p2snookersRequired = 0,
    framesPlayed = 0,
    player1break,
    freeBallActive = false,
    currentBreak = 0,
    p1hb = 0,
    p2hb = 0,
    p1name,
    p2name,
    p1hc,
    p2hc,
    logTopLayer = document.querySelector(".log-top-layer"),
    logBottomLayer = document.querySelector(".log-bottom-layer"),
    divsInTopLog = document.querySelectorAll(".log-top-layer div"),
    divsInBottomLog = document.querySelectorAll(".log-bottom-layer div"),
    urlParams = new URLSearchParams(window.location.search),
    balls = document.querySelectorAll(".ball");

function endGame() {

}

function hideRedShowColours() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.remove("disabled");
    }
    document.querySelector(".redmenu").classList.add("disabled");
}

function hideColoursShowRed() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.add("disabled");
    }
    document.querySelector(".redmenu").classList.remove("disabled");
}

function showSpecifcColour(color) {
    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.add("disabled");
    }
    document.querySelector("." + color + "border").classList.remove("disabled");
}



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function init() {
    //populate names and handicap
    if (urlParams.get("hc")) {
        p1hc = urlParams.get("p1hc");
        p2hc = urlParams.get("p2hc");
    }

    //add frame count if multiple frames palyed


    if (!framesPlayed) {
        if (getRandomInt(2)) {
            player1break = true;
            player1active = true;

        } else {
            player1break = false;
            player1active = false;
        }
    } else {
        if (player1break) {
            player1active = false;
            player1break = false;
        } else {
            player1active = true;
            player1break = true;
        }
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].classList.add("disabled");
    }

    document.querySelector(".redmenu").classList.remove("disabled");
    console.log(player1active);
    populateUI();
}

function loopThroughLog() {
    //calculate scores during loop and also populate log then populate ui with scores
    //reset values to zero?
    player1score = 0;
    player2score = 0;
    remaining = 0;
    reds = 5;
    currentBreak = 0;
    for (let i = 0; i < log.length; i++) {
        if (log.length > 2 && i > 2) {
            if (log[i].substr(0, 1) == log[i - 1].substr(0, 1)) {
                if (player1active == "1" && currentBreak > p1hb) {
                    p1hb = currentBreak;

                } else {
                    if (player1active == "0" && currentBreak > p2hb) {
                        p2hchb = currentBreak;
                    }
                }

            } else {
                currentBreak = 0;
            }
        }


        // Balls Potted
        if (log[i].indexOf("RED") !== -1) {
            currentBreak++;
            reds--;
            remaining = (8 * reds + 34);
            if (log[i].substr(0, 1) == "1") {
                player1score++;
            } else {
                player2score++;
            }
        }
        if (log[i].indexOf("PINK") !== -1) {
            currentBreak = currentBreak + 6;
            remaining = (8 * reds + 27);
            if (reds == 0 && log[log.length - 1]) {
                remaining = 7;
            }
            if (log[i].substr(0, 1) == "1") {
                player1score = player1score + 6;
            } else {
                player2score = player2score + 6;
            }
        }
        if (log[i].indexOf("BLACK") !== -1) {
            currentBreak = currentBreak + 7;
            remaining = (8 * reds + 27);
            if (reds == 0 && log[log.length - 1]) {
                remaining = 0;
            }
            if (log[i].substr(0, 1) == "1") {
                player1score = player1score + 7;
            } else {
                player2score = player2score + 7;
            }
            if (remaining == 0) {
                endGame();
            }
        }
        if (log[i].indexOf("BLUE") !== -1) {
            currentBreak = currentBreak + 5;
            remaining = (8 * reds + 27);
            if (reds == 0 && log[log.length - 1]) {
                remaining = 13;
            }
            if (log[i].substr(0, 1) == "1") {
                player1score = player1score + 5;
            } else {
                player2score = player2score + 5;
            }
        }
        if (log[i].indexOf("BROWN") !== -1) {
            currentBreak = currentBreak + 4;
            remaining = (8 * reds + 27);
            if (reds == 0 && log[log.length - 1]) {
                remaining = 18;
            }
            if (log[i].substr(0, 1) == "1") {
                player1score = player1score + 4;
            } else {
                player2score = player2score + 4;
            }
        }
        if (log[i].indexOf("GREEN") !== -1) {
            currentBreak = currentBreak + 3;
            remaining = (8 * reds + 27);
            if (reds == 0 && log[log.length - 1]) {
                remaining = 22;
            }
            if (log[i].substr(0, 1) == "1") {
                player1score = player1score + 3;
            } else {
                player2score = player2score + 3;
            }
        }
        if (log[i].indexOf("YELLOW") !== -1) {
            currentBreak = currentBreak + 2;
            remaining = (8 * reds + 27);
            if (reds == 0 && log[log.length - 1]) {
                remaining = 25;
            }
            if (log[i].substr(0, 1) == "1") {
                player1score = player1score + 2;
            } else {
                player2score = player2score + 2;
            }
        }
        //BALLS POTTED END

        // FOULS
        if (log[i].indexOf("FOUL") !== -1) {
            currentBreak = 0;
            var value = log[i][log[i].length - 1];
            if (log[i].substr(0, 1) == "0") {
                player1score = player1score + parseInt(value);
                player1active = true;
            } else {
                player2score = player2score + parseInt(value);
                player1active = false;
            }
            if (remaining < 7) {
                endGame();
            }
        }
        //FOULS END




    }

    console.log(log);
    console.log(currentBreak);
    populateUI();
}

function populateUI() {
    if (player1score > player2score) {
        difference = player1score - player2score;
    } else {
        difference = player2score - player1score;
    }
    if (player1active == "0" && player1score > player2score) {
        p2snookersRequired = ((remaining - difference) / 2) + 1;
        if (p1snookersRequired < 0) {
            var p1snookeramount = Math.ceil(Math.abs(p1snookersRequired) / 4);
            console.log("p1 snooker quant: " + p1snookeramount);
        }

    }
        if (player1active == "1" && player1score < player2score) {
            p1snookersRequired = ((remaining - difference) / 2) + 1;
            if (p2snookersRequired < 0) {
                var p2snookeramount = Math.ceil(Math.abs(p2snookersRequired) / 4);
                console.log("p2 snooker quant: " + p2snookeramount);
            }
        }

    console.log("difference: " + difference)
    console.log("p2 Snookers req: " + p2snookersRequired);
    console.log("p1 Snookers req: " + p1snookersRequired);

    if (log.length > 0) {
        if (reds !== 0) {
            if (log[log.length - 1].indexOf("RED") == -1) {
                hideColoursShowRed();
            } else {
                hideRedShowColours();
            }
        } else {

            console.log("reds = " + reds);
            if (log[log.length - 1].indexOf("RED") !== -1 && player1active == log[log.length - 1].substr(0, 1)) {
                hideRedShowColours();
            } else {

                if (log[log.length - 2].indexOf("RED") !== -1 && currentBreak > 1) {
                    showSpecifcColour("yellow");
                } else {


                    if (log[log.length - 1].indexOf("RED") !== -1 && player1active !== log[log.length - 1].substr(0, 1)) {
                        showSpecifcColour("yellow");
                    }
                    if (log[log.length - 1].indexOf("YELLOW") !== -1) {
                        showSpecifcColour("green");
                    }
                    if (log[log.length - 1].indexOf("GREEN") !== -1) {
                        showSpecifcColour("brown");
                    }
                    if (log[log.length - 1].indexOf("BROWN") !== -1) {
                        showSpecifcColour("blue");
                    }
                    if (log[log.length - 1].indexOf("BLUE") !== -1) {
                        showSpecifcColour("pink");
                    }
                    if (log[log.length - 1].indexOf("PINK") !== -1) {
                        showSpecifcColour("black");
                    }
                }
            }
        }

    } else {
        hideColoursShowRed();
    }


    //populate scores

    //populate remaining

    //populate snookers required meters

    //check active player and adjust accordingly
    if (player1active == "1") {
        document.querySelector(".point-meter.pm2").classList.remove("point-meter-inactive");
        document.querySelector(".point-meter.pm1").classList.add("point-meter-inactive");
        document.querySelector(".point-meter.pm1 .snookers-req").innerHTML = "";
        document.querySelector(".point-meter.pm1 .max-score").innerHTML = "";
        document.querySelector(".point-meter.pm1 .points-scored").innerHTML = "";
        document.querySelector("html").style.paddingLeft = "0";
        document.querySelector("html").style.paddingRight = "13px";
        document.querySelector(".log").style.left="2px";
        document.querySelector(".log").style.left="2px";
        document.querySelector(".difference_counter").style.removeProperty("left");
        document.querySelector(".difference_counter").style.right = "15px";


    } else {
        document.querySelector(".point-meter.pm2").classList.add("point-meter-inactive");
        document.querySelector(".point-meter.pm1").classList.remove("point-meter-inactive");
        document.querySelector(".point-meter.pm2 .snookers-req").innerHTML = "";
        document.querySelector(".point-meter.pm2 .max-score").innerHTML = "";
        document.querySelector(".point-meter.pm2 .points-scored").innerHTML = "";
        document.querySelector("html").style.paddingLeft = "13px";
        document.querySelector("html").style.paddingRight = "0";
        document.querySelector(".log").style.left="15px";
        document.querySelector(".difference_counter").style.removeProperty("right");
        document.querySelector(".difference_counter").style.left = "15px";
    }
    //set width of log based on content
    logTopLayer.style.width = (divsInTopLog.length + 1) * 20 + 20 + "px";
    logBottomLayer.style.width = (divsInBottomLog.length + 1) * 20 + 20 + "px";
}

function addToLog(logItem) {
    log.push(logItem);
    loopThroughLog();
}

function undo() {
    redoLog.push(log[log.length]);
    log.pop();
    loopThroughLog();
}

init();

document.querySelector(".redmenu").addEventListener("click", function () {
    if (reds > 0) {
        if (player1active == "0") {
            addToLog("0_RED");
        } else {
            addToLog("1_RED");
        }
    } else {
        console.log("no more reds");
    }
});
document.querySelector(".pinkborder").addEventListener("click", function () {
    if (player1active == "0") {
        addToLog("0_PINK");
    } else {
        addToLog("1_PINK");
    }
});
document.querySelector(".blackborder").addEventListener("click", function () {
    if (player1active == "0") {
        addToLog("0_BLACK");
    } else {
        addToLog("1_BLACK");
    }
});
document.querySelector(".blueborder").addEventListener("click", function () {
    if (player1active == "0") {
        addToLog("0_BLUE");
    } else {
        addToLog("1_BLUE");
    }
});
document.querySelector(".brownborder").addEventListener("click", function () {
    if (player1active == "0") {
        addToLog("0_BROWN");
    } else {
        addToLog("1_BROWN");
    }
});
document.querySelector(".greenborder").addEventListener("click", function () {
    if (player1active == "0") {
        addToLog("0_GREEN");
    } else {
        addToLog("1_GREEN");
    }
});
document.querySelector(".yellowborder").addEventListener("click", function () {
    if (player1active == "0") {
        addToLog("0_YELLOW");
    } else {
        addToLog("1_YELLOW");
    }
});

var foulButtons = document.querySelectorAll(".foulBallButton");
for (let i = 0; i < foulButtons.length; i++) {
    foulButtons[i].addEventListener("click", function () {
        console.log("foul clicked");
        var foulValue = this.getAttribute("data-value");
        if (player1active == "0") {
            addToLog("0_FOUL_" + foulValue);
        } else {
            addToLog("1_FOUL_" + foulValue);
        }
    });
}


document.querySelector(".undo").addEventListener("click", undo, false);
var playerDivs = document.querySelectorAll(".player");
for (let i=0;i<playerDivs.length;i++) {
    playerDivs[i].addEventListener("click",function() {
    if (player1active == "1") {
        player1active = "0";
        playerDivs[0].classList.remove("inactive-player");
        playerDivs[1].classList.add("inactive-player");
    } else {
        player1active = "1";
        playerDivs[1].classList.remove("inactive-player");
        playerDivs[0].classList.add("inactive-player");
    }
        populateUI();
}, false);
}
