brawl.game.prototype.immovableImmovableProcessArgument = function (immovable1, immovable2) {
    if (!immovable1.specialCondition && !immovable2.specialCondition) {
        return false;
    }
    else {
        return true;
    }

};

brawl.game.prototype.immovableMoveableProcessArgument = function (imb, mov) {
    if (imb.name === immovableWallOneWayObject) {
        return false;
    }
    else {
        return true;
    }

};

brawl.game.prototype.wallVsEnemyProcess = function (wall, enemy) {
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

brawl.game.prototype.playerImmovableWallProcessArgument = function (player, wall) {
    if (wall.name === immovableWallOneWayPlayer.name) {
        return false;
    }
    else {
        return true
    }
};




brawl.game.prototype.playerWallProcessArgument = function (player, wall) {
    // if (wall.name === wallRegularKiller) {
    //     return false;
    // }
    // else {
    //     return true;
    // }
};

// brawl.game.prototype.playerLedgeProcessArgument = function (player, ledge) {
//     if (player.body.touching) {
//         return true;
//     }
//     else {
//         return false;
//     }
// };