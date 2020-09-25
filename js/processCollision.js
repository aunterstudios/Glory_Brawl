brawl.game.prototype.immoVsSelfProcess = function (immovable1, immovable2) {
    if (!immovable1.specialCondition && !immovable2.specialCondition) {
        return false;
    }
    else {
        return true;
    }

};

brawl.game.prototype.immoVsMovProcess = function (imb, mov) {
    if (imb.name === immovableWallOneWayObject) {
        return false;
    }
    else {
        return true;
    }

};

brawl.game.prototype.wallVsMovProcess = function (wall, mov) {
    /////////////////Actual Collision Physics/////////////
    // bL.body.velocity.setTo(-wall.body.velocity.x, -wall.body.velocity.y);
    //////////////////////Destroys Elevator Ledge/////////////////////////
    if (!wall.phase) {
        return false;
    }
    else {
        return true;
    }
};

brawl.game.prototype.playerImmovableProcess = function (player, wall) {
    if (wall.name === immovableWallOneWayPlayer.name) {
        return false;
    }
    else {
        return true
    }
};