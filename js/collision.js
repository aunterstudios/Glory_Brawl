//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.trapProjectiles = function (trapProjectiles, obstacles) {
    trapProjectiles.kill();
    if (obstacles.name === 'immovableWallPhase') {
        this.emitterFunction(obstacles, trapProjectiles, 'destroy');
    }
};

brawl.game.prototype.immovableImmovable = function (immovable1, immovable2) {
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
brawl.game.prototype.immovableMoveable = function (immovable, objMov) {
    ////////////////////Ball Against Spikes///////////////
    if (immovable.groupName === groupSpikes && objMov.groupName === groupBall) {
        this.emitterFunction(immovable, objMov, 'destroy');
        //Removes Localized Sprites from Regenerating (Spikes)
        if (immovable.specialCondition === 0) {
            //Destruction of Localized Sprite
            worldClassLevels[this.indexOfCurrentWorld].undeniableDeathSpawn[immovable.positionInArray].trigger = false;
        }
        //Removes Sprites from Different Levels (Spikes)
        else if (immovable.specialCondition === 1) {
            worldClassLevels[this.indexOfCurrentWorld].undeniableDeathSpawn[immovable.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldClassLevels[immovable.specialWorld].undeniableDeathSpawn[immovable.specialArray].trigger = false;
        }
        //////////////////////////Creates New Sprites After Spikes Destroyed///////////////////////
        //worldClassLevels[immovable.specialWorld].ledgeGreySpawn[immovable.specialArray].trigger = true;
    }
    //////////////////////////Ledge/////////////////////////////
    //Elevator Ledge Destruction
    if (objMov.elevatorActivate) {
        this.emitterFunction(objMov, null, 'destroy');
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
//Wall Against Immovable Objects
brawl.game.prototype.wallImmovable = function (wall, immovable) {
    /////////////////Make Sure to Code In Objects Interacting With Each Other!!////////////////
    ////////////////Interactions Coded in the Orientation of Immovable Walls//////////////////
    //////////////////////////Wall Destruction////////////////////////////
    if (immovable.name === immovableWallKillWall) {
        this.emitterFunction(wall, null, 'destroy');
    }
    if (immovable.body.speed > 0) {
        this.emitterFunction(wall, null, 'destroy');
    }
    return;
};

brawl.game.prototype.wallImmovableProcessArgument = function (wall, immovable) {
    // if (wall.groupName === groupWallType1) {
    //     return false;
    // }
    // else {
    //     true;
    // }
};

//Wall Against Moveable Objects
brawl.game.prototype.wallMoveable = function (wall, objMov) {
    /////////////////////////Experimental Two////////////////////
    if (objMov.groupName === groupEnemy) {
        //Build One
        // objMov.body.stop();
        // objMov.body.velocity.x += wall.body.velocity.x/10;
        // objMov.body.velocity.y += wall.body.velocity.y/10;
        // var x = this.game.physics.arcade.computeVelocity(2, objMov.body, 300, 100, 200);
        // objMov.body.velocity.x += x;
        // objMov.body.stop();
        objMov.name = 'enemyStill';
        objMov.tint = tintRemover;
        objMov.body.stop();
        if (objMov.body.touching.left) {
            objMov.body.velocity.x = 300;
        }
        else if (objMov.body.touching.right) {
            objMov.body.velocity.x = -300;
        }
        // objMov.body.velocity.x = -objMov.body.velocity.x;
    }
    //////////////////////Elevator Ledge/////////////////////////
    if (objMov.elevatorActivate) {
        this.emitterFunction(objMov, null, 'destroy');
    }

    return;
};

brawl.game.prototype.wallMoveableProcessArgument = function (wall, objMov) {
    // /////////////////////////Experimental Two////////////////////
    // if (wall.groupName === groupWallType1) {
    //     return false;
    // }
    // return;
};

brawl.game.prototype.ballEnemy = function (ball, enemy) {
    /////////////////////////killEnemy////////////////////
    this.emitterFunction(enemy, null, 'kill');
    return;
};


brawl.game.prototype.playerImmovable = function (player, immovable) {
    // player.body.stop();
    if (immovable.name === immovableWallSlippery) {
        playerSlippery = 150;
    }
    else {
        playerSlippery = -25;
    }
    ///Activating immovableWallActivation(Like a Cloud)
    if (immovable.name === immovableWallActivation) {
        if (immovable.body.touching.up) {
            immovable.body.velocity.y = 200;
        }
        if (immovable.body.touching.down) {
            immovable.body.velocity.y = -200;
        }
        if (immovable.body.touching.left) {
            immovable.body.velocity.x = 200;
        }
        if (immovable.body.touching.up) {
            immovable.body.velocity.x = -200;
        }
        immovable.name = immovableWallRegular;
        immovable.tint = tintRemover;
    }
    //Activating immovableWallWorldGravity (World Gravity)
    if (immovable.name === immovableWallWorldGravity) {
        this.game.physics.arcade.gravity.setTo(0, 500);
        immovable.destroy();
    }
    if (immovable.name === immovableWallMario) {
        if (player.body.touching.up) {
            player.body.gravity.y = 500;
        }
        if (player.body.touching.down) {
            playerDoubleJumps = 4;
        }
        if (player.body.touching.left) {
            playerSpeed = 800;
        }
        if (player.body.touching.right) {
            playerJump = -1000;
        }
        immovable.name = immovableWallRegular;
        immovable.tint = tintRemover;
    }
    // console.log("Yes This is Hitting");
    // return;
};

brawl.game.prototype.playerImmovableWallProcessArgument = function (player, wall) {
    if (wall.name === immovableWallOneWayPlayer) {
        return false;
    }
    else {
        return true
    }
};

brawl.game.prototype.playerWall = function (player, wall) {
    //WallRegular?
    if (wall.name === wallRegular) {
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
    if (wall.name === wallInverse) {
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
    if (wall.name === wallCloud) {
        //Control
        // wall.body.velocity.x = player.body.velocity.x;
        //Let it Go
        if (wall.key === wallHorizontal) {
            if (player.body.velocity.x < 0) {
                wall.body.velocity.x = -200;
            }
            if (player.body.velocity.x > 0) {
                wall.body.velocity.x = 200;
            }
        }
        else {
            if (this.movementUp.isDown) {
                wall.body.velocity.y = -200;
            }
            if (this.movementDown.isDown) {
                wall.body.velocity.y = 200;
            }
        }
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
    if (ledge.name === elevator) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -300;
            ledge.body.velocity.y = -300;
        }
        if (!ledge.elevatorActivate) {
            ledge.elevatorActivate = true;
        }
    }
    //////////Super Jump Bounce/////////
    if (ledge.name === bounce) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -1200;
        }
        this.emitterFunction(ledge, null, 'destroy');
    }
    ////////Surfs Up Dude////////
    if (ledge.name === surf) {
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
