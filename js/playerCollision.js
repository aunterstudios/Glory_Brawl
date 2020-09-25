brawl.game.prototype.playerImmovable = function (player, immovable) {
    // player.body.stop();
    if (immovable.name === immovableWallSlippery.name) {
        this.playerSlippery = 200;
    }
    else {
        this.playerSlippery = nenHolder.playerSlippery;
    }
    //Activating immovableWallOneWay
    // if (immovable.name === immovableWallOneWayPlayerBlockLeft) {
    //     immovable.body.checkCollision.left = false;
    // }
    ///Activating immovableWallActivation(Like a Cloud)
    if (immovable.name === immovableWallActivation.name) {
        if (immovable.body.touching.up) {
            immovable.body.velocity.setTo(0, 200);
        }
        else if (immovable.body.touching.down) {
            immovable.body.velocity.setTo(0, -200);

        }
        else if (immovable.body.touching.left) {
            immovable.body.velocity.setTo(200, 0);

        }
        else if (immovable.body.touching.right) {
            immovable.body.velocity.setTo(-200, 0);
        }
        immovable.name = immovableWallRegular;
        // console.log(immovable.tint, "1");
        immovable.tint = tintWallPlayerFrozen;
        // console.log(immovable.tint, "Removed");
        // immovable.alpha = .5;

    }
    //Activating immovableWallWorldGravity (World Gravity)
    if (immovable.name === immovableWallWorldGravity.name) {
        this.game.physics.arcade.gravity.setTo(0, 500);
        this.emitterFunction(immovable, null, 'destroy');
    }
    if (immovable.name === immovableWallPowerJump.name) {
        player.powerJump = true;
        this.playerJump = -1000;
        this.emitterFunction(immovable, null, 'destroy');
    }
    return;
};

brawl.game.prototype.playerImmovableWallProcessArgument = function (player, wall) {
    if (wall.name === immovableWallOneWayPlayer.name) {
        return false;
    }
    else {
        return true
    }
};

brawl.game.prototype.playerWall = function (player, wall) {
    //WallRegular?
    wall.phase = false;
    wall.alpha = .4;
    if (wall.name === wallRegular.name) {
        // wall.name = wallPlayerFrozen;
        // wall.body.moves = false;
        // wall.body.immovable = true;
        // player.body.stop();
        // wall.body.stop();
        // wall.tint = tintWallPlayerFrozen;
        player.body.stop();
        wall.body.stop();
    }
    ///////////////////////////////Special Walls///////////////////////////
    if (wall.name === wallCloud.name) {
        if (this.movementUp.isDown) {
            wall.body.velocity.setTo(0, -200);
        }
        else if (this.movementDown.isDown) {
            wall.body.velocity.setTo(0, 200);
        }
        else if (this.movementLeft.isDown) {
            wall.body.velocity.setTo(-200, 0);
        }
        else if (this.movementRight.isDown) {
            wall.body.velocity.setTo(200, 0);
        }
    }
    if (wall.name === wallKiller.name) {
        this.playerDeath(player, wall);
    }

    return;
};

brawl.game.prototype.playerEnemy = function (player, enemy) {
    if (enemy.name === 'enemyWall') {
        if (enemy.body.touching.up) {
            enemy.body.velocity.setTo(0, 0);
        }
        else if (enemy.body.touching.down) {
            enemy.body.velocity.setTo(0, -200);

        }
        else if (enemy.body.touching.left) {
            enemy.body.velocity.setTo(200, 0);

        }
        else if (enemy.body.touching.right) {
            enemy.body.velocity.setTo(-200, 0);
        }
    }
    else {
        this.playerDeath(player, enemy);
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

brawl.game.prototype.playerBall = function (player, ball) {
    //ballRegular Physics
    ball.body.stop();
    if (ball.body.touching.down) {
        ball.body.velocity.y = -50;
    }
    if (ball.body.touching.left) {
        ball.body.velocity.x = 50;
    }
    if (ball.body.touching.right) {
        ball.body.velocity.x = -50;
    }
};

brawl.game.prototype.playerLedge = function (player, ledge) {
    // player.body.velocity.y = 0;
    //////////Eleveator Ledges/////////
    if (ledge.name === ledgeElevator.name) {
        if (ledge.body.touching.up) {
            ledge.body.stop();
            player.body.velocity.y = -300;
            ledge.body.velocity.y = -300;
        }
        if (!ledge.elevatorActivate) {
            ledge.elevatorActivate = true;
        }
    }
    //////////Super Jump Bounce/////////
    if (ledge.name === ledgeBounce.name) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -1200;
        }
        this.emitterFunction(ledge, null, 'destroy');
    }
    ////////Surfs Up Dude////////
    if (ledge.name === ledgeSurf.name) {
        //Self Destruct
        if (!ledge.surfActivate) {
            ledge.surfActivate = true;
            this.game.time.events.add(3000, this.spriteSelfDestruct, this, ledge, 'destroy');
        }
        //Physics
        ledge.body.stop();
        player.body.velocity.y = 100;
        ledge.body.velocity.y = 0;
        if (player.body.touching.up || player.body.touching.down) {
            ledge.body.velocity.x = player.body.velocity.x;
            // console.log(player.body.touching.up, 'up');
        }
        if (ledge.body.touching.left || ledge.body.touching.right) {
            ledge.body.velocity.y = 0;
            ledge.body.velocity.x = 0;
            // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
        }
    }
};

///////////Hazama//////////
brawl.game.prototype.playerHazama = function (player, hazama) {
    //ballRegular Physics
    // console.log(player.body.touching);
    // if (hazama.name === powerUpFalconia.name) {
    //     playerJump = -1000;
    //     player.body.gravity.y = 500;
    //     this.emitterFunction(hazama, null, 'destroy');
    // }
    hazama.lastOverlapped = this.game.time.now + 100;
    if (hazama.name === hazamaFalconia.name) {
        player.body.gravity.y = -200;
    }

};
