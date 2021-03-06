var urlParams = new URLSearchParams(window.location.search),
	redoLog = [],
	log = [],
	colours = ["RED", "YELLOW", "GREEN", "BROWN", "BLUE", "PINK", "BLACK"],
	remaining_final = [27, 25, 22, 18, 13, 7, 0],
	player1score = 0,
	player2score = 0,
	player1active,
	difference = 0,
	reds = urlParams.get("reds"),
	remaining = reds * 8 + 27,
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
	freeReds = 0,
	player1frames = 0,
	player2frames = 0,
	logTopLayer,
	logBottomLayer,
	divsInTopLog,
	divsInBottomLog,
	balls = document.querySelectorAll(".ball"),
	p1name = urlParams.get("p1n"),
	p2name = urlParams.get("p2n");

function freeBall() {
	freeBallActive = true;
	if (reds > 0) {
		hideColoursShowRed();
	} else {
		for (let i = 0; i < colours.length; i++) {
			if (log[log.length].indexOf(colours[i]) !== -1) {
				showSpecifcColour(colours[i + 1]);
			}
		}
	}

}

function addToBallLog(playerID, colour) {
	if (playerID == "1") {
		document.querySelector(".log .log-top-layer").innerHTML += "<div class=\"" + colour + " logball\"></div>";
		document.querySelector(".log .log-bottom-layer").innerHTML += "<div class=\"logball\"></div>";
	} else {
		document.querySelector(".log .log-bottom-layer").innerHTML += "<div class=\"" + colour + " logball\"></div>";
		document.querySelector(".log .log-top-layer").innerHTML += "<div class=\"logball\"></div>";
	}
	var fouls = document.querySelectorAll(".foul_log");
	for (let i = 0; i < fouls.length; i++) {
		if (fouls[i].classList.contains("foul_4")) {
			fouls[i].innerHTML = "<div class=\"foul_label\">F4</div>";
		}
		if (fouls[i].classList.contains("foul_5")) {
			fouls[i].innerHTML = "<div class=\"foul_label\">F5</div>";
		}
		if (fouls[i].classList.contains("foul_6")) {
			fouls[i].innerHTML = "<div class=\"foul_label\">F6</div>";
		}
		if (fouls[i].classList.contains("foul_7")) {
			fouls[i].innerHTML = "<div class=\"foul_label\">F7</div>";
		}
	}
}


function endGame() {
	populateUI();
	if (player1score > player2score) {
		player1frames++;
	} else {
		player2frames++;
	}
	framesPlayed++;
	player1score = 0;
	player2score = 0;
	document.querySelector(".player[data-player='1'] .frames").innerHTML = "Frames: " + player1frames;
	document.querySelector(".player[data-player='2'] .frames").innerHTML = "Frames: " + player2frames;
	reds = urlParams.get("reds");
	remaining = reds * 8 + 27;

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
	//    for (let i=0;i<colours.length;i++) {
	//        if (colours[i].indexOf(color) !== -1) {
	//            remaining = remaining_final[i];
	//        }
	//    }

}


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


function init() {
	p1hb = 0;
	p2hb = 0;
	currentBreak = 0;
	log = [];
	document.querySelector(".log-top-layer").innerHTML = "<div class=\"p1\">" + p1name + "</div><div class=\"logball\"></div>";
	document.querySelector(".log-bottom-layer").innerHTML = "<div class=\"p1\">" + p2name + "</div>";
	//populate names and handicap
	if (urlParams.get("hc") == "true") {
		p1hc = urlParams.get("p1hc") || 0;
		p2hc = urlParams.get("p2hc") || 0;
		if (parseInt(p2hc) > 0) {
			document.querySelector(".player[data-player='2'] .handicap").innerHTML = "+" + p2hc;
		} else {
			if (parseInt(p2hc) == 0) {
				document.querySelector(".player[data-player='2'] .handicap").innerHTML = p2hc;
			}
			document.querySelector(".player[data-player='2'] .handicap").innerHTML = "-" + p2hc;
		}
		if (parseInt(p1hc) > 0) {
			document.querySelector(".player[data-player='1'] .handicap").innerHTML = "+" + p1hc;
		} else {
			if (parseInt(p1hc) == 0) {
				document.querySelector(".player[data-player='1'] .handicap").innerHTML = p2hc;
			}
			document.querySelector(".player[data-player='1'] .handicap").innerHTML = "-" + p1hc;
		}
		document.querySelector(".player[data-player='1'] .score").innerHTML = p1hc;
		document.querySelector(".player[data-player='2'] .score").innerHTML = p2hc;
		if (p1hc) {
			player1score = parseInt(p1hc);
		}
		if (p2hc) {
			player2score = parseInt(p2hc);
		}

	} else {
		document.querySelector(".player[data-player='1'] .handicap").innerHTML = "";
		document.querySelector(".player[data-player='2'] .handicap").innerHTML = "";
	}

	document.querySelector(".player[data-player='1'] .name").innerHTML = p1name;
	document.querySelector(".player[data-player='2'] .name").innerHTML = p2name;

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

	hideColoursShowRed();
	console.log(player1active);
	populateUI();
}


function loopThroughLog() {

	document.querySelector(".log-top-layer").innerHTML = "<div class=\"p1\">" + p1name + "</div>";
	document.querySelector(".log-bottom-layer").innerHTML = "<div class=\"p1\">" + p2name + "</div>";
	player1score = 0;
	player2score = 0;
	if (p1hc) {
		player1score = parseInt(p1hc);
	}
	if (p2hc) {
		player2score = parseInt(p2hc);
	}
	remaining = 8 * reds + 27;;
	reds = urlParams.get("reds");
	currentBreak = 0;

	for (let i = 0; i < log.length; i++) {

		if (i !== 0) {
			if (log[i].substr(0, 1) != log[i - 1].substr(0, 1)) {
				currentBreak = 0;
			}
		}

		for (let a = 0; a < colours.length; a++) {
			if (log[i].indexOf(colours[a]) !== -1) {
				currentBreak += (a + 1);

				if (colours[a] == "RED") {
					if (log[i].indexOf("FB") == -1) {
						reds--;
					}

					remaining = (8 * reds + 34);
				} else {
					remaining = (8 * reds + 27);
				}
				if (reds == 0) {
					for (let c = 0; c < colours.length; c++) {
						//                        if (log[log.length - 1].indexOf("RED") !== -1 && player1active == log[log.length - 1].substr(0, 1) && currentBreak > 1) {
						//                            remaining = 34;
						//                        } else {
						//                            if (log[log.length - 1].indexOf("RED") !== -1 && player1active !== log[log.length - 1].substr(0, 1)) {
						//                                remaining = 27;
						//                            }
						//                            if (log[i].indexOf(colours[c]) !== -1) {
						//                                remaining = remaining_final[c];
						//                                if (log[i].indexOf("BLACK") !== -1 && remaining <= 7 && log[i-1].indexOf("RED") == -1) {
						//                                    endGame();
						//                                }
						//
						//                            }
						//                        }

						if (log[i].indexOf(colours[c]) !== -1) {

							remaining = remaining_final[c];
							// EXCEPTION
							if (log[i - 1].indexOf("RED") !== -1 && player1active == log[i - 1].substr(0, 1) && player1active == log[i].substr(0, 1) && currentBreak > 1) {
								remaining = 27;
							}
							if (remaining <= 7 && log[i].indexOf("BLACK") !== -1) {
								if (log[i].substr(0, 1) == "1" && currentBreak > p1hb) {
									p1hb = currentBreak;

								} else {
									if (log[i].substr(0, 1) == "0" && currentBreak > p2hb) {
										p2hb = currentBreak;
									}
								}
								endGame();
							}
						}

					}
				}
				if (log.length >= 1) {
					if (log[i].substr(0, 1) == "1") {
						player1score += (a + 1);
						addToBallLog("1", colours[a].toLowerCase());
					} else {
						player2score += (a + 1);
						addToBallLog("0", colours[a].toLowerCase());
					}
				}

			}
		}

		if (log[i].indexOf("FOUL") !== -1) {
			currentBreak = 0;
			var value = log[i][log[i].length - 1];
			if (log[i].substr(0, 1) == "0") {
				player1score = player1score + parseInt(value);
				addToBallLog("0", "foul_" + value + " foul_log");
			} else {
				player2score = player2score + parseInt(value);
				addToBallLog("1", "foul_" + value + " foul_log");
			}

		}

		if (log.length > 2 && i > 2) {
			//            if (log[i].substr(0, 1) == log[i - 1].substr(0, 1)) {
			//                currentBreak++;
			if (log[i].substr(0, 1) == "1" && currentBreak > p1hb) {
				p1hb = currentBreak;

			} else {
				if (log[i].substr(0, 1) == "0" && currentBreak > p2hb) {
					p2hb = currentBreak;
				}
			}

			//            } else {
			//                currentBreak = 0;
			//            }
		}
		if (log[i].indexOf("EOB") !== -1) {
			currentBreak = 0;
		}
	}
	console.log(log);
	console.log(currentBreak);
	populateUI();
}


function populateUI() {
	document.querySelector(".concede").style.display = "none";

	if (log.length >= 1) {
		if (log[log.length - 1].indexOf("FOUL") !== -1) {
			document.querySelector(".freeBallButton").style.display = "block";
		} else {
			document.querySelector(".freeBallButton").style.display = "none";

		}
	}

	if (p1hb) {
		document.querySelector(".player[data-player='1'] .hb").innerHTML = "High Break: " + p1hb;
	}
	if (p2hb) {
		document.querySelector(".player[data-player='2'] .hb").innerHTML = "High Break: " + p2hb;
	}
	// if (p1hc && p2hc) {
	// 	player1score = player1score + parseInt(p1hc);
	// 	player2score = player2score + parseInt(p2hc);
	// }

	document.querySelector(".stats p").innerHTML = "Reds: " + reds;
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
	// if (player1score > player2score) {
	//     p1snookersRequired = (remaining/2)+1-player1score;
	//     p2snookersRequired = player1score + ((remaining - player1score)/2) +1;
	// } else {
	//     p2snookersRequired = (remaining/2)+1-player2score;
	//     p1snookersRequired = player2score + ((remaining - player2score)/2) +1;
	// }
	p1snookersRequired = (remaining - (player1score - player2score)) / 2;
	p2snookersRequired = (remaining - (player2score - player1score)) / 2;
	p1max = player1score + remaining;
	p2max = player2score + remaining;
	let p1pointpercentage = Math.ceil((player1score / p1max) * 100);
	let p2pointpercentage = Math.ceil((player2score / p2max) * 100);
	let p2snookerpercentage = Math.ceil(((p2snookersRequired) / p2max) * 100);
	let p1snookerpercentage = Math.ceil(((p1snookersRequired) / p1max) * 100);
	let p1maxpercent = 100 - p1pointpercentage - p1snookerpercentage;
	let p2maxpercent = 100 - p2pointpercentage - p2snookerpercentage;

	if (p1snookersRequired > 0) {
		document.querySelector(".pm1").setAttribute("style", "grid-template-rows:" + p1maxpercent + "% " + p1snookerpercentage + "% " + p1pointpercentage + "% ");
	} else {
		if (p1snookersRequired < player1score) {
			document.querySelector(".pm1").setAttribute("style", "grid-template-rows:auto 0 " + p1pointpercentage + "%");
		}
		if (p1max == player1score) {
			document.querySelector(".pm1").setAttribute("style", "grid-template-rows:0 0 100%");
		}
	}

	if (p2snookersRequired > 0) {
		document.querySelector(".pm2").setAttribute("style", "grid-template-rows:" + p2maxpercent + "% " + p2snookerpercentage + "% " + p2pointpercentage + "% ");
	} else {
		if (p2snookersRequired < player2score) {
			document.querySelector(".pm2").setAttribute("style", "grid-template-rows:auto 0% " + p2pointpercentage + "%");
		}
		if (p2max == player2score) {
			document.querySelector(".pm2").setAttribute("style", "grid-template-rows:0 0 100%");
		}
	}

	if (player1active == "1") {
		document.querySelector(".pm1 .points-scored").innerHTML = player1score;
		document.querySelector(".pm1 .snookers-req").innerHTML = Math.ceil(p1snookersRequired + player1score);
		document.querySelector(".pm1 .max-score").innerHTML = p1max;
	} else {
		document.querySelector(".pm2 .points-scored").innerHTML = player2score;
		document.querySelector(".pm2 .snookers-req").innerHTML = Math.ceil(p2snookersRequired + player2score);
		document.querySelector(".pm2 .max-score").innerHTML = p2max;
	}

	if (remaining < difference) {
		if (player1active == "1" && player1score < player2score) {
			document.querySelector(".concede").style.display = "block";
			let player1snookerquant = Math.ceil((difference - remaining) / 4);
			document.querySelector("p.snookers").innerHTML = "P1 Snookers Required: " + player1snookerquant;
		} else {
			if (player1active == "0" && player2score < player1score) {
				document.querySelector(".concede").style.display = "block";
				let player2snookerquant = Math.ceil((difference - remaining) / 4);
				document.querySelector("p.snookers").innerHTML = "P2 Snookers Required: " + player2snookerquant;
			}
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

					for (let i = 0; i < colours.length; i++) {
						if (colours[i] !== "RED") {
							if (log[log.length - 1].indexOf(colours[i]) !== -1) {
								if (log[log.length - 1].indexOf("FB") == -1) {
									if (colours[i] !== "BLACK") {
										showSpecifcColour(colours[i + 1].toLowerCase());
									}

								} else {
									showSpecifcColour(colours[i].toLowerCase());
								}
							}

						}


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
		document.querySelector("html").style.paddingRight = "19px";
		document.querySelector(".log").style.left = "2px";
		document.querySelector(".log").style.left = "2px";
		document.querySelector(".difference_counter").style.removeProperty("left");
		document.querySelector(".difference_counter").style.right = "19px";
	} else {
		document.querySelector(".point-meter.pm2").classList.add("point-meter-inactive");
		document.querySelector(".point-meter.pm1").classList.remove("point-meter-inactive");
		document.querySelector(".point-meter.pm2 .snookers-req").innerHTML = "";
		document.querySelector(".point-meter.pm2 .max-score").innerHTML = "";
		document.querySelector(".point-meter.pm2 .points-scored").innerHTML = "";
		document.querySelector("html").style.paddingLeft = "19px";
		document.querySelector("html").style.paddingRight = "0";
		document.querySelector(".log").style.left = "19px";
		document.querySelector(".difference_counter").style.removeProperty("right");
		document.querySelector(".difference_counter").style.left = "19px";
	}
	//set width of log based on content
	logTopLayer = document.querySelector(".log-top-layer");
	logBottomLayer = document.querySelector(".log-bottom-layer");
	divsInTopLog = document.querySelectorAll(".log-top-layer div");
	divsInBottomLog = document.querySelectorAll(".log-bottom-layer div");
	logTopLayer.style.width = (divsInTopLog.length + 1) * 25 + "px";
	logBottomLayer.style.width = (divsInBottomLog.length + 1) * 25 + "px";
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


for (let b = 0; b < colours.length; b++) {
	document.querySelector("." + colours[b].toLowerCase() + "border").addEventListener("click", function (e) {
		if (!e.target.classList.contains("disabled")) {
			if (log.length > 1) {
				if (freeBallActive && log[log.length - 1].indexOf("FB") !== -1) {
					freeBallActive = false;
				}
			}

			if (!freeBallActive) {
				if (player1active == "0") {
					addToLog("0_" + colours[b]);
				} else {
					addToLog("1_" + colours[b]);
				}
			} else {
				if (player1active == "0") {
					addToLog("0_FB_" + colours[b]);
				} else {
					addToLog("1_FB_" + colours[b]);
				}
			}

		}
	});
}


var foulButtons = document.querySelectorAll(".foulBallButton");
for (let i = 0; i < foulButtons.length; i++) {
	foulButtons[i].addEventListener("click", function () {
		console.log("foul clicked");
		var foulValue = this.getAttribute("data-value");
		if (player1active == "0") {
			player1active = "1";
			addToLog("0_FOUL_" + foulValue);
		} else {
			player1active = "0";
			addToLog("1_FOUL_" + foulValue);
		}
	});
}


document.querySelector(".undo").addEventListener("click", undo, false);
var playerDivs = document.querySelectorAll(".player");
for (let i = 0; i < playerDivs.length; i++) {
	playerDivs[i].addEventListener("click", function () {
		if (freeBallActive) {
			freeBallActive = false;
		}
		if (player1active == "1") {
			player1active = "0";
		} else {
			player1active = "1";
		}
		addToLog("EOB");
		populateUI();
	}, false);
}


document.querySelector(".concede").addEventListener("click", function () {
	if (confirm('Are you sure you want to concede?')) {
		endGame();
	} else {

	}
}, false);

document.querySelector(".button.freeBallButton").addEventListener("click", function () {
	freeBall();
}, false);

init();
