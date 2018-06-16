var urlParams = new URLSearchParams(window.location.search),
    redoLog = [],
    log = [],
    player1score = 0,
    player2score = 0,
    player1active,
    difference = 0,
    reds = urlParams.get("reds"),
    remaining = reds*8+27,
    p1snookersRequired = 0,
    p2snookersRequired = 0,
    framesPlayed = 0,
    player1break = 0,
    freeBallActive = false,
    currentBreak = 0,
    p1hb = 0,
    p2hb = 0,
    p1name,
    p2name,
    p1hc,
    p2hc,
    p1max,
    p2max,
    player1frames = 0,
    player2frames = 0,
    logTopLayer = document.querySelector(".log-top-layer"),
    logBottomLayer = document.querySelector(".log-bottom-layer"),
    divsInTopLog = document.querySelectorAll(".log-top-layer div"),
    divsInBottomLog = document.querySelectorAll(".log-bottom-layer div"),
    balls = document.querySelectorAll(".ball"),
    p1name = urlParams.get("p1n"),
    p2name = urlParams.get("p2n");

function addToBallLog(playerID, colour) {
    if (playerID == "1") {
        document.querySelector(".log .log-top-layer").innerHTML += "<div class=\""+colour+" logball\"></div>";
        document.querySelector(".log .log-bottom-layer").innerHTML += "<div class=\"logball\"></div>";
    } else {
        document.querySelector(".log .log-bottom-layer").innerHTML += "<div class=\""+colour+" logball\"></div>";
        document.querySelector(".log .log-top-layer").innerHTML += "<div class=\"logball\"></div>";
    }
}

function endGame() {
    if (player1score > player2score) {
        player1frames++;
    } else {
        player2frames++;
    }
    framesPlayed++;
    player1score = 0;
    player2score = 0;
    document.querySelector(".player[data-player='1'] .frames").innerHTML = "Frames: "+player1frames;
    document.querySelector(".player[data-player='2'] .frames").innerHTML = "Frames: "+player2frames;
    reds = urlParams.get("reds");
    remaining = reds*8+27;

    init();
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
    log = [];
    document.querySelector(".log-top-layer").innerHTML = "<div class=\"p1\">"+p1name+"</div><div class=\"logball\"></div>";
    document.querySelector(".log-bottom-layer").innerHTML = "<div class=\"p1\">"+p2name+"</div>";
    //populate names and handicap
    if (urlParams.get("hc") == "true") {
        p1hc = urlParams.get("p1hc");
        p2hc = urlParams.get("p2hc");
        if (parseInt(p2hc) > 0) {
            document.querySelector(".player[data-player='2'] .handicap").innerHTML = "+"+p2hc;
        } else {
            document.querySelector(".player[data-player='2'] .handicap").innerHTML = "-"+p2hc;
        }
        if (parseInt(p1hc) > 0) {
            document.querySelector(".player[data-player='1'] .handicap").innerHTML = "+"+p1hc;
        } else {
            document.querySelector(".player[data-player='1'] .handicap").innerHTML = "-"+p1hc;
        }
        document.querySelector(".player[data-player='1'] .score").innerHTML = p1hc;
        document.querySelector(".player[data-player='2'] .score").innerHTML = p2hc;

    } else {
        document.querySelector(".player[data-player='1'] .handicap").innerHTML = "";
        document.querySelector(".player[data-player='2'] .handicap").innerHTML = "";
    }

    document.querySelector(".player[data-player='1'] .name").innerHTML = p1name;
    document.querySelector(".player[data-player='2'] .name").innerHTML = p2name;



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
    document.querySelector(".log-top-layer").innerHTML = "<div class=\"p1\">"+p1name+"</div>";
    document.querySelector(".log-bottom-layer").innerHTML = "<div class=\"p1\">"+p2name+"</div>";
    //calculate scores during loop and also populate log then populate ui with scores
    //reset values to zero?
    player1score = 0;
    player2score = 0;
    remaining = 0;
    reds = urlParams.get("reds");
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
                addToBallLog("1","red");
            } else {
                player2score++;
                addToBallLog("0","red");
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
                addToBallLog("1","pink");
            } else {
                player2score = player2score + 6;
                addToBallLog("0","pink");
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
                addToBallLog("1","black");
            } else {
                player2score = player2score + 7;
                addToBallLog("0","black");
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
                addToBallLog("1","blue");
            } else {
                player2score = player2score + 5;
                addToBallLog("0","blue");
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
                addToBallLog("1","brown");
            } else {
                player2score = player2score + 4;
                addToBallLog("0","brown");
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
                addToBallLog("1","green");
            } else {
                player2score = player2score + 3;
                addToBallLog("0","green");
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
                addToBallLog("1","yellow");
            } else {
                player2score = player2score + 2;
                addToBallLog("0","yellow");
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
    if (p1hc && p2hc) {
        player1score = player1score+parseInt(p1hc);
        player2score = player2score+parseInt(p2hc);
    }
    document.querySelector(".stats p").innerHTML = "Reds: "+reds;
    if (player1active == "1") {
        document.querySelector(".player[data-player='1']").classList.remove("inactive-player");
        document.querySelector(".player[data-player='2']").classList.add("inactive-player");
    } else {
        document.querySelector(".player[data-player='1']").classList.add("inactive-player");
        document.querySelector(".player[data-player='2']").classList.remove("inactive-player");
    }
    document.querySelector(".player[data-player='1'] .score").innerHTML = player1score;
    document.querySelector(".player[data-player='2'] .score").innerHTML = player2score;
    if (player1score > player2score) {
        difference = player1score - player2score;
        if (player1active == "0") {
            document.querySelector(".diff_label").innerHTML = "Behind";
            document.querySelector(".diff_pts").innerHTML = difference;
        } else {
            document.querySelector(".diff_label").innerHTML = "Ahead";
            document.querySelector(".diff_pts").innerHTML = difference;
        }
    } else {
        difference = player2score - player1score;
        if (player1active == "1") {
            document.querySelector(".diff_label").innerHTML = "Behind";
            document.querySelector(".diff_pts").innerHTML = difference;
        } else {
            document.querySelector(".diff_label").innerHTML = "Ahead";
            document.querySelector(".diff_pts").innerHTML = difference;
        }
    }

    p1snookersRequired = ((remaining-difference)/2)+1;
    p2snookersRequired = ((remaining-difference)/2)+1;


    p1max = player1score+remaining;
    p2max = player2score+remaining;


    let p1pointpercentage = Math.ceil((player1score/p1max)*100);
    let p2pointpercentage = Math.ceil((player2score/p2max)*100);
    let p2snookerpercentage = Math.ceil(((p2snookersRequired)/p2max)*100);
    let p1snookerpercentage = Math.ceil(((p1snookersRequired)/p1max)*100);
    let p1maxpercent = 100 - p1pointpercentage - p1snookerpercentage;
    let p2maxpercent = 100 - p2pointpercentage - p2snookerpercentage;

    if (p1snookersRequired > 0) {
            document.querySelector(".pm1").setAttribute("style","grid-template-rows:"+p1maxpercent+"% "+p1snookerpercentage+"% "+p1pointpercentage+"% ");
        } else {
            if (p1snookersRequired < player1score) {
                document.querySelector(".pm1").setAttribute("style","grid-template-rows:auto 0 "+p1pointpercentage+"%");
            }
            if (p1max == player1score) {
                document.querySelector(".pm1").setAttribute("style","grid-template-rows:0 0 100%");
            }
        }
    if (p2snookersRequired > 0) {
            document.querySelector(".pm2").setAttribute("style","grid-template-rows:"+p2maxpercent+"% "+p2snookerpercentage+"% "+p2pointpercentage+"% ");
        } else {
            if (p2snookersRequired < player2score) {
                document.querySelector(".pm2").setAttribute("style","grid-template-rows:auto 0% "+p2pointpercentage+"%");
            }
            if (p2max == player2score) {
                document.querySelector(".pm2").setAttribute("style","grid-template-rows:0 0 100%");
            }
        }
    if (player1active == "1") {
        document.querySelector(".pm1 .points-scored").innerHTML = player1score;
        document.querySelector(".pm1 .snookers-req").innerHTML = Math.ceil(player1score+p1snookersRequired);
        document.querySelector(".pm1 .max-score").innerHTML = p1max;



    } else {
        document.querySelector(".pm2 .points-scored").innerHTML = player2score;
        document.querySelector(".pm2 .snookers-req").innerHTML = Math.ceil(player2score+p1snookersRequired);
        document.querySelector(".pm2 .max-score").innerHTML = p2max;
    }

//    if (remaining < difference && player1score < player2score) {
//        let player1snookerquant = Math.ceil(difference/4);
//        document.querySelector("p.snookers").innerHTML = "P1 Snookers Required: "+player1snookerquant;
//    } else {
//        if (remaining < difference && player2score < player1score) {
//        let player2snookerquant = Math.ceil(difference/4);
//        document.querySelector("p.snookers").innerHTML = "P2 Snookers Required: "+player2snookerquant;
//    }
//    }


    console.log("difference: " + difference)
    console.log("p2 Snookers req: " + p2snookersRequired);
    console.log("p1 Snookers req: " + p1snookersRequired);

    if (log.length > 0) {
        if (reds !== 0) {
            if (log[log.length - 1].indexOf("RED") == -1) {
                hideColoursShowRed();
            } else {
                if (log[log.length - 1].indexOf("0") == -1 && player1active == "1" || log[log.length - 1].indexOf("1") == -1 && player1active == "0") {
                    hideRedShowColours();
                } else {
                    hideColoursShowRed();
                }

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

    //populate remaining
    document.querySelector(".remain_pts").innerHTML = remaining;
    //populate snookers required meters

    //check active player and adjust accordingly
    if (player1active == "0") {
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

document.querySelector(".redmenu").addEventListener("click", function (e) {

    if (!e.target.classList.contains("disabled")) {
       if (reds > 0) {
        if (player1active == "0") {
            addToLog("0_RED");
        } else {
            addToLog("1_RED");
        }
    } else {
        console.log("no more reds");
    }

    }
});
document.querySelector(".pinkborder").addEventListener("click", function (e) {
    if (!e.target.classList.contains("disabled")) {
    if (player1active == "0") {
        addToLog("0_PINK");
    } else {
        addToLog("1_PINK");
    }
    }
});
document.querySelector(".blackborder").addEventListener("click", function (e) {
    if (!e.target.classList.contains("disabled")) {
    if (player1active == "0") {
        addToLog("0_BLACK");
    } else {
        addToLog("1_BLACK");
    }
    }
});
document.querySelector(".blueborder").addEventListener("click", function (e) {

    if (!e.target.classList.contains("disabled")) {
    if (player1active == "0") {
        addToLog("0_BLUE");
    } else {
        addToLog("1_BLUE");
    }}
});
document.querySelector(".brownborder").addEventListener("click", function (e) {

    if (!e.target.classList.contains("disabled")) {
    if (player1active == "0") {
        addToLog("0_BROWN");
    } else {
        addToLog("1_BROWN");
    }}
});
document.querySelector(".greenborder").addEventListener("click", function (e) {
    if (!e.target.classList.contains("disabled")) {
    if (player1active == "0") {
        addToLog("0_GREEN");
    } else {
        addToLog("1_GREEN");
    }}
});
document.querySelector(".yellowborder").addEventListener("click", function (e) {
    if (!e.target.classList.contains("disabled")) {
    if (player1active == "0") {
        addToLog("0_YELLOW");
    } else {
        addToLog("1_YELLOW");
    }
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
    } else {
        player1active = "1";
    }
    populateUI();
}, false);
}

document.querySelector(".concede").addEventListener("click",function() {
    if (confirm('Are you sure you want to concede?')) {
        endGame();
    } else {

    }
},false);
