brawl.game.prototype.gVsdProcess = function (ground, death) {
    if (ground.groupName === groupCollect) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.groundVsSelfProcess = function (g1, g2) {
    if (g1.groupName === g2.groupName || (g1.groupName === groupCollect || g2.groupName === groupCollect)) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.deathVsSelfProcess = function (d1, d2) {
    if (d1.groupName === d2.groupName) {
        return false;
    }
    else {
        return true;
    }
};

//ground and death vs moveable
brawl.game.prototype.gdVsMovProcess = function (imb, mov) {
    if (imb.name === groundOneWayObject || (!mov.phase && !mov.elevatorActivate && (imb.groupName === groupDeathMove || imb.groupName === groupGroundMove)) || imb.groupName === groupCollect) {
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

brawl.game.prototype.flagVsEprocess = function (flag, obj) {
    ///////////////Actual Collision Physics/////////////
    if (flag.groupName === groupFlag || !obj.phase) {
        return false;
    }
    else {
        return true
    }
    return;
};