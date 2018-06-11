var redoLog = [],
    log = [],
    player1score = 0,
    player2score = 0,
    player1active,
    remaining = 147,
    difference = 0,
    reds = 15,
    snookersRequired = 0,
    framesPlayed = 0,
    player1break,
    freeBallActive = false,
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

    for (let i=0;i<balls.length;i++) {
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
    reds=15;
    for (let i = 0; i < log.length; i++) {
        // Balls Potted
        if (log[i].indexOf("RED") !== -1) {
            reds--;
            remaining = (8*reds + 34);
            if (log[i].substr(0,1) == "1") {
                player1score++;
            } else {
                player2score++;
            }
        }
        if (log[i].indexOf("PINK") !== -1) {
            remaining = (8*reds + 27);
            if (log[i].substr(0,1) == "1") {
                player1score = player1score+6;
            } else {
                player2score = player2score+6;
            }
        }
        if (log[i].indexOf("BLACK") !== -1) {
            remaining = (8*reds + 27);
            if (log[i].substr(0,1) == "1") {
                player1score = player1score+7;
            } else {
                player2score = player2score+7;
            }
        }
        if (log[i].indexOf("BLUE") !== -1) {
            remaining = (8*reds + 27);
            if (log[i].substr(0,1) == "1") {
                player1score = player1score+5;
            } else {
                player2score = player2score+5;
            }
        }
        if (log[i].indexOf("BROWN") !== -1) {
            remaining = (8*reds + 27);
            if (log[i].substr(0,1) == "1") {
                player1score = player1score+4;
            } else {
                player2score = player2score+4;
            }
        }
        if (log[i].indexOf("GREEN") !== -1) {
            remaining = (8*reds + 27);
            if (log[i].substr(0,1) == "1") {
                player1score = player1score+3;
            } else {
                player2score = player2score+3;
            }
        }
        if (log[i].indexOf("YELLOW") !== -1) {
            remaining = (8*reds + 27);
            if (log[i].substr(0,1) == "1") {
                player1score = player1score+2;
            } else {
                player2score = player2score+2;
            }
        }
        //BALLS POTTED END
        // FOULS

        //FOULS END








    }

    console.log(log);

    populateUI();
}

function populateUI() {

    if (log.length > 0) {
    if (log[log.length - 1].indexOf("RED") == -1) {

        for (let i=0;i<balls.length;i++) {
            balls[i].classList.add("disabled");
        }
        document.querySelector(".redmenu").classList.remove("disabled");

    } else {
        for (let i=0;i<balls.length;i++) {
            if (balls[i].classList.contains("disabled")) {
                balls[i].classList.remove("disabled");
            }
        }
        document.querySelector(".redmenu").classList.add("disabled");
    }
    } else {
        for (let i=0;i<balls.length;i++) {
            balls[i].classList.add("disabled");
        }
        document.querySelector(".redmenu").classList.remove("disabled");
    }
    //check active player and adjust accordingly

    //populate scores

    //populate remaining

    //populate snookers required meters


    //set width of log based on content
    logTopLayer.style.width = (divsInTopLog.length+1)*20+20+"px";
    logBottomLayer.style.width = (divsInBottomLog.length+1)*20+20+"px";
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

document.querySelector(".redmenu").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_RED");
    } else {
        addToLog("1_RED");
    }
});
document.querySelector(".pinkborder").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_PINK");
    } else {
        addToLog("1_PINK");
    }
});
document.querySelector(".blackborder").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_BLACK");
    } else {
        addToLog("1_BLACK");
    }
});
document.querySelector(".blueborder").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_BLUE");
    } else {
        addToLog("1_BLUE");
    }
});
document.querySelector(".brownborder").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_BROWN");
    } else {
        addToLog("1_BROWN");
    }
});
document.querySelector(".greenborder").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_GREEN");
    } else {
        addToLog("1_GREEN");
    }
});
document.querySelector(".yellowborder").addEventListener("click",function() {
    if (player1active) {
        addToLog("0_YELLOW");
    } else {
        addToLog("1_YELLOW");
    }
});
document.querySelector(".undo").addEventListener("click",undo,false);
