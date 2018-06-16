    if (finalColour) {

        if (player1) {
            undoLog.push("P1:"+ballValues[value]+"pot");
            player1score+=value;
            player1history.push(ballValues[value]);

        } else {
            undoLog.push("P2:"+ballValues[value]+"pot");
            player2score+=value;
            player2history.push(ballValues[value]);
        }
        finalBallsDisplay("yellow");
        finalBalls = true;
    }


    if (freeBall) {

        finalColour = true;
        freeBall=false;
        remaining=27;
        hideRedShowColours();


    }



    if (finalBalls) {
        if (player1) {
            undoLog.push("P1:"+ballValues[value]+"pot");
            player1score+=value;
            player1history.push(ballValues[value]);

        } else {
            undoLog.push("P2:"+ballValues[value]+"pot");
            player2score+=value;
            player2history.push(ballValues[value]);
        }
        (value !== 7) ? finalBallsDisplay(ballValues[++value]) : null;
        remaining -= value;

        }

