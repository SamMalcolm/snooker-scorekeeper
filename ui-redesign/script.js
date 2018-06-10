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
    p1name,
    p2name,
    p1hc,
    p2hc,
    logTopLayer = document.querySelector(".log-top-layer"),
    logBottomLayer = document.querySelector(".log-bottom-layer"),
    divsInTopLog = document.querySelectorAll(".log-top-layer div"),
    divsInBottomLog = document.querySelectorAll(".log-bottom-layer div"),
    urlParams = new URLSearchParams(window.location.search);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function init() {
    //populate names and handicap
    if (urlParams.get("hc")) {
        p1hc = urlParams.get("p1hc");
        p2hc = urlParams.get("p2hc");
    }


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
    console.log(player1active);
    populateUI();
}

function loopThroughLog() {
    //calculate scores during loop and also populate log then populate ui with scores


    populateUI();
}

function populateUI() {
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
}

function undo() {
    redoLog.push(log[log.length]);
    log.pop();
    loopThroughLog();
}

init();
