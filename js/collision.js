//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.trapProjectiles = function (trapProjectiles, obstacles) {
    trapProjectiles.kill();
    if (obstacles.name === 'immovableWallPhase') {
        this.emitterFunction(obstacles, trapProjectiles, 'destroy');
    }
};

//Immovable Objects vs. Themselves
brawl.game.prototype.immovableImmovable = function (immovable1, immovable2) {
    ////////////More Special Interactions to Come//////////////
    //Reverses The Velocity's of the Object
    if (immovable1.specialCondition) {
        if (immovable1.specialCondition.name === scReverseVelocity.name) {
            var x = immovable1.body.velocity.x * -1;
            var y = immovable1.body.velocity.y * -1;
            immovable1.body.velocity.setTo(x, y);
        }
    }
    return;
};

brawl.game.prototype.immovableImmovableProcessArgument = function (immovable1, immovable2) {
    if (!immovable1.specialCondition && !immovable2.specialCondition) {
        return false;
    }
    else {
        return true;
    }

};

//Immovable Objects vs. Moveable Objects
brawl.game.prototype.immovableMoveable = function (immovable, moveable) {
    ////////////////////Physics of Immoveable Against Ball or Ledge or Enemy////////////
    // if (immovable.body.touching.up) {
    //     moveable.body.velocity.y = -200;
    // }
    // else if (immovable.body.touching.down) {
    //     moveable.body.velocity.y = 200;
    // }
    // else if (immovable.body.touching.left) {
    //     moveable.body.velocity.x = -200;
    // }
    // else if (immovable.body.touching.right) {
    //     moveable.body.velocity.x = 200;
    // }
    /////////////////////Immovable Wall Effects Against Moveable////////////////////
    if (immovable.name === immovableWallKillWall.name || immovable.body.speed > 0 || moveable.elevatorActivate) {
        this.emitterFunction(moveable, null, 'destroy');

    }
    // ////////////////////Moveable Effects Against Immovable///////////////
    if (immovable.name === undeniableDeathBallKill.name && moveable.groupName === groupBall) {
        this.emitterFunction(immovable, moveable, 'destroy');
        //Removes Localized Sprites from Regenerating (Spikes)
        if (immovable.specialCondition) {
            if (immovable.specialCondition.name === scLocalizedDestruction.name) {
                //Destruction of Localized Sprite
                worldClassLevels[this.indexOfCurrentWorld].spriteSpawn[immovable.positionInArray].trigger = false;
            }
        }
    }
    return;
};

brawl.game.prototype.immovableMoveableProcessArgument = function (imb, mov) {
    if (imb.name === immovableWallOneWayObject) {
        return false;
    }
    else {
        return true;
    }

};

//Wall Against Moveable Objects
brawl.game.prototype.wallVsEnemy = function (wall, enemy) {
    /////////////////Actual Collision Physics/////////////
    if (enemy.name !== 'enemyFrozen') {
        enemy.name = 'enemyStill';
        enemy.tint = tintRemover;
        enemy.body.stop();
        if (enemy.body.touching.up) {
            enemy.body.velocity.y = 300;
        }
        else if (enemy.body.touching.down) {
            enemy.body.velocity.y = -300;
        }
        else if (enemy.body.touching.left) {
            enemy.body.velocity.x = 300;
        }
        else if (enemy.body.touching.right) {
            enemy.body.velocity.x = -300;
        }
    }
    else {
        if (wall.body.touching.up) {
            wall.body.velocity.y = 300;
        }
        else if (wall.body.touching.down) {
            wall.body.velocity.y = -300;
        }
        else if (wall.body.touching.left) {
            wall.body.velocity.x = 300;
        }
        else if (wall.body.touching.right) {
            wall.body.velocity.x = -300;
        }
    }
    return;
};

brawl.game.prototype.wallVsBl = function (wall, bL) {
    /////////////////Actual Collision Physics/////////////
    // bL.body.velocity.setTo(-wall.body.velocity.x, -wall.body.velocity.y);
    //////////////////////Destroys Elevator Ledge/////////////////////////
    if (bL.elevatorActivate) {
        this.emitterFunction(bL, null, 'destroy');
    }
    return;
};


brawl.game.prototype.blVsEnemy = function (bL, enemy) {
    /////////////////////////killEnemy////////////////////
    if (bL.groupName === groupBall) {
        this.emitterFunction(enemy, null, 'destroy');
    }
    if (bL.groupName === groupLedge) {
        enemy.name = 'enemyFrozen';
        enemy.tint = tintWallPlayerFrozen;
        enemy.body.immovable = true;
        enemy.body.moves = false;
        // this.emitterFunction(bL, null, 'destroy');
    }
    return;
};


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
    // if (immovable.name === immovableWallMario) {
    //     if (player.body.touching.up) {
    //         player.body.gravity.y = 500;
    //     }
    //     if (player.body.touching.down) {
    //         playerDoubleJumps = 4;
    //     }
    //     if (player.body.touching.left) {
    //         playerSpeed = 800;
    //     }
    //     if (player.body.touching.right) {
    //         playerJump = -1000;
    //     }
    //     immovable.name = immovableWallRegular;
    //     immovable.tint = tintRemover;
    // }
    if (immovable.name === immovableWallPowerJump.name) {
        player.powerJump = true;
        this.playerJump = -1000;
        this.emitterFunction(immovable, null, 'destroy');
    }
    // console.log("Yes This is Hitting");
    // return;
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
    // //Wall Surf
    // if (wall.name === wallSurf) {
    //     player.body.stop();
    //     wall.body.stop();
    // }
    // if (wall.name === wallSurfKiller) {
    //     player.body.stop();
    //     wall.body.stop();
    //     this.game.physics.arcade.moveToPointer(wall, 200);
    // }
    //Wall Inverse
    if (wall.name === wallInverse.name) {
        player.body.stop();
        wall.body.stop();
        player.body.velocity.y = -50;
        if (player.body.touching.down) {
            wall.body.velocity.y = -50;
            if (player.x < wall.x) {
                wall.body.velocity.x = -300; //150
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 300;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        if (player.body.touching.up) {
            wall.body.stop();
            if (player.x < wall.x) {
                wall.body.velocity.x = -300;
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 300;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        if (player.body.touching.left || player.body.touching.right) {
            wall.body.velocity.y = 300;
        }
    }
    ///////////////////////////////Special Walls///////////////////////////
    if (wall.name === wallCloud.name) {
        //Alpha One
        // if (player.body.velocity.x < 0) {
        //     wall.body.velocity.x = -200;
        // }
        // if (player.body.velocity.x > 0) {
        //     wall.body.velocity.x = 200;
        // }
        //Alpha Two
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
        //Alpha Three
        // if (this.movementUp.isDown) {
        //     wall.body.velocity.y = -200;
        // }
        // else if (this.movementDown.isDown) {
        //     wall.body.velocity.y = 200;
        // }
        // else if (this.movementLeft.isDown) {
        //     wall.body.velocity.x = -200;
        // }
        // else if (this.movementRight.isDown) {
        //     wall.body.velocity.x = 200;
        // }
    }

    return;
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
