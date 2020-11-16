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
    if (imb.name === groundOneWayObject || imb.groupName === groupCollect) {
        return false;
    }
    else if (!mov.phase && (imb.groupName === groupDeathMove || imb.groupName === groupGroundMove)) {
        return false;
    }
    else if (!mov.ghost) {
        return false;
    }
    else if (imb.name === groundOneWayKillObject.name && (mov.name === wallCloud.name || mov.name === wallCloudSuper.name)) {
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
    if (!wall.phase || !mov.phase || !wall.ghost || !mov.ghost) {
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
    if (!enemy.phase || !ball.ghost || !enemy.ghost) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.ledgeVsEnemyProcess = function (ledge, enemy) {
    if (!ledge.phase || !enemy.phase || !ledge.ghost || !enemy.ghost) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.ballVsLedgeProcess = function (ball, ledge) {
    if (!ledge.phase || !ball.ghost || !ledge.ghost) {
        return false;
    }
    else {
        return true
    }
};

brawl.game.prototype.flagVsEprocess = function (flag, obj) {
    ///////////////Actual Collision Physics/////////////
    if (flag.groupName === groupFlag || !obj.phase || !obj.ghost || !flag.ghost) {
        return false;
    }
    else {
        return true
    }
};


//Trap Projectiles
brawl.game.prototype.trapProjectilesProcess = function (projectiles, obj) {
    ///////////////Actual Collision Physics/////////////
    if (obj.name === enemyShooter.name) {
        return false;
    }
    else {
        return true
    }
};