brawl.game.prototype.gdVsSelfProcess = function (gd1, gd2) {
    // if (!gd1.specialCondition && !gd2.specialCondition) {
    //     console.log("Did this hit?"); 
    //     return false;
    // }
    // else {
    //     return true;
    // }
    if ((gd1.groupName === groupDeathMove || gd1.groupName === groupGroundMove) && (gd2.groupName === groupDeathMove || gd2.groupName === groupGroundMove)) {
        return false;
    }
    else {
        return true;
    }
};

//ground and death vs moveable
brawl.game.prototype.gdVsMovProcess = function (imb, mov) {
    if (imb.name === groundOneWayObject || (!mov.phase && !mov.elevatorActivate && (imb.groupName === groupDeathMove || imb.groupName === groupGroundMove))) {
        return false;
    }
    else {
        return true;
    }

};

//Ground and Death vs Invisible Objects
brawl.game.prototype.gdVsInvisbleProcess = function (imb, invisible) {

};

brawl.game.prototype.wallVsMovProcess = function (wall, mov) {
    /////////////////Actual Collision Physics/////////////
    // bL.body.velocity.setTo(-wall.body.velocity.x, -wall.body.velocity.y);
    //////////////////////Destroys Elevator Ledge/////////////////////////
    if (!wall.phase || !mov.phase) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.playerGroundProcess = function (player, wall) {
    if (wall.name === groundOneWayPlayer.name || wall.name === groundOneWayKillObject.name) {
        return false;
    }
    else {
        return true
    }
};

brawl.game.prototype.ballVsEnemyProcess = function (ball, enemy) {
    if (!enemy.phase) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.ledgeVsEnemyProcess = function (ledge, enemy) {
    if (!ledge.phase || !enemy.phase) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.ballVsLedgeProcess = function (ball, ledge) {
    if (!ledge.phase) {
        return false;
    }
    else {
        return true
    }
};