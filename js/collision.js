//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.deathTwo = function (victim, killer) {
    victim.kill();
    if (killer.name === 'immovableWallPhase') {
        this.emitterFunction(killer);
        killer.kill();
    }
};
brawl.game.prototype.deathThree = function (killer, victim) {
    victim.kill();
};

brawl.game.prototype.ledgeEnemyDeath = function (le, death) {
    // le.body.stop();
    if (le.body.touching.up) {
        le.body.velocity.y = le.velocityVsWallY;
    }
    if (le.body.touching.down) {
        le.body.velocity.y = -le.velocityVsWallY;
    }
    if (le.body.touching.left) {
        le.body.velocity.x = le.velocityVsWallX;
    }
    if (le.body.touching.right) {
        le.body.velocity.x = -le.velocityVsWallX;
    }
    return;
};

brawl.game.prototype.immovableMoveable = function (immovable, obj2) {
    if (immovable.name === immovableWallPadding) {
        // obj2.body.stop();
        obj2.body.bounce.setTo(1.3)
        obj2.velocityVsWallY = 100;
        obj2.velocityVsWallX = 100;
        // obj2.tint = tintImmovableWallMagnet;
        ////Maybe Kill This Later///
    }
    //////////////Actual Collision Mechanics////////////
    // obj2.body.stop();
    // if (immovable.body.touching.up) {
    //     obj2.body.velocity.y = -obj2.velocityVsWallY;
    // }
    // if (immovable.body.touching.down) {
    //     obj2.body.velocity.y = obj2.velocityVsWallY;
    // }
    // if (immovable.body.touching.left) {
    //     obj2.body.velocity.x = -obj2.velocityVsWallX;
    // }
    // if (immovable.body.touching.right) {
    //     obj2.body.velocity.x = obj2.velocityVsWallX;
    // }
    /////////////////////////Only Ball Specific/////////////////
    // if (obj2.groupName === groupBall) {
    //     obj2.body.stop();
    // }
    ///////////////////////The Rest Applies to Every Object///////////////////
    if (obj2.body.touching.up) {
        obj2.body.velocity.y = obj2.velocityVsWallY;
    }
    if (obj2.body.touching.down) {
        obj2.body.velocity.y = -obj2.velocityVsWallY;
    }
    if (obj2.body.touching.left) {
        obj2.body.velocity.x = obj2.velocityVsWallX;
    }
    if (obj2.body.touching.right) {
        obj2.body.velocity.x = -obj2.velocityVsWallX;
    }
    return;
};
brawl.game.prototype.wallImmovable = function (wall, sprite2) {
    /////////////////Make Sure to Code In Objects Interacting With Each Other!!////////////////
    ////////////////Interactions Coded in the Orientation of Immovable Walls//////////////////
    // wall.body.stop();
    if (sprite2.name === immovableWallKillWall) {
        wall.kill();
        this.emitterFunction(wall);
    }
    return;
};
brawl.game.prototype.wallMoveable = function (wall, objMov) {
    //////////////////////////Between Walls and Balls or Ledges//////////////////////
    //Turns wallRegular to Control (Ball);
    if (wall.name === wallRegular && objMov.groupName === groupBall) {
        wall.name = wallControl;
        wall.tint = tintWallControl;
        // wall.body.gravity.y = 300; //500 Original
    }
    //Turns wallRegular to wallInverse (Ball)
    if (wall.name === wallRegular && objMov.groupName === groupLedge) {
        wall.name = wallInverse;
        wall.tint = tintWallInverse;
    }

    //////////////////////////Between Walls and Enemies//////////////////////
    if (wall.name === wallRegular && objMov.groupName === groupEnemy) {
        wall.name = wallBlackFrozen;
        wall.body.moves = false;
        wall.body.immovable = true;
        wall.tint = tintWallBlackFrozen;
    }
    if (wall.name === wallControl && objMov.groupName === groupEnemy) {
        wall.name = wallBlackKiller;
        wall.tint = tintWallBlackKiller;
    }
    if (wall.name === wallInverse && objMov.groupName === groupEnemy) {
        wall.name = wallBlackTrap;
        wall.tint = tintWallBlackTrap;
        wall.body.stop();
        wall.body.immovable = true;
        wall.body.velocity.y = 100;
    }

    ///////////////////////////////Experimental///////////////////////////////
    if (wall.name === wallBlackTrap || wall.name === wallBlackFrozen || wall.name === wallBlackKiller) {
        if (objMov.groupName === groupEnemy) {
            this.emitterFunction(objMov);
            objMov.kill();
        }
        // this.emitterFunction(objMov);
        // objMov.kill();
    }

    return;
};
brawl.game.prototype.ghostWall = function (wall, immovable) {
    if (wall.name === wallGhost) {
        return false;
    }
    else {
        true;
    }
};
brawl.game.prototype.playerImmovable = function (player, immovable) {
    //Activating Slippery Walls and Unactivating It
    // console.log(this.game.physics.arcade.getOverlapX(player,immovable));
    // console.log(this.game.physics.arcade.getOverlapY(player,immovable));
    // this.game.physics.arcade.getOverlapX(player,immovable);
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
        immovable.kill();
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
brawl.game.prototype.playerWall = function (player, wall) {
    if (wall.name === wallRegular) {
        //Actual Collision Mechanics
        player.body.stop();
        wall.body.velocity.y = 0;
        wall.body.velocity.y += player.body.velocity.y;
    }
    if (wall.name === wallControl) {
        wall.body.stop();
        player.body.stop();
        if (player.body.touching.down) {
            wall.body.velocity.y = -25
        }
        else if (player.body.touching.up) {
            wall.body.velocity.y = 50;
        }
    }
    if (wall.name === wallInverse) {
        wall.body.stop();
        player.body.stop();
        player.body.velocity.y = -150;
        if (player.body.touching.down) {
            wall.body.velocity.y = -150;
            if (player.x < wall.x) {
                wall.body.velocity.x = -150;
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 150;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        if (player.body.touching.up) {
            wall.body.stop();
            if (player.x < wall.x) {
                wall.body.velocity.x = -150;
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 150;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        if (player.body.touching.left || player.body.touching.right) {
            wall.body.velocity.y = 150;
        }
    }
    //Enemy Walls
    if (wall.name === wallBlackFrozen) {
        player.body.stop();
    }
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

    //Special Walls
    // if (wall.name === wallGhost) {
    //     player.body.stop();
    // }

    ////Enemy Walls On You Baby////////
    if (wall.name === wallBlackTrap) {
        this.deathState(this.player);
    }

    //Test Wall
    if (wall.name === wallTest) {
        wall.name = wallPlayerFrozen;
        player.body.stop();
        wall.body.stop();
        // player.body.velocity.y = wall.body.velocity.y;
        wall.body.moves = false;
        wall.body.immovable = true;
        wall.tint = tintWallBlackFrozen;
    }

    return;
};
brawl.game.prototype.playerBlackWall = function (player, wall) {
    if (wall.name === wallBlackKiller) {
        return false;
    }
    else {
        return true;
    }
};
brawl.game.prototype.playerBall = function (player, ball) {
    /////////////////////GOOOFY///////////////
    // ball.body.stop();
    //75 is Original
    if (ball.body.touching.up) {
        ball.body.velocity.y = 100;
    }
    if (ball.body.touching.down) {
        ball.body.velocity.y = -100;
    }
    if (ball.body.touching.left) {
        ball.body.velocity.x = 100;
    }
    if (ball.body.touching.right) {
        ball.body.velocity.x = -100;
    }
    //   //////////////Control////////////
    //   // if (ball.body.touching.up) {
    //   //   ball.body.velocity.y = player.body.velocity.y;
    //   // }
    //   // if (ball.body.touching.down) {
    //   //   ball.body.velocity.y = player.body.velocity.y;
    //   // }
    //   // if (ball.body.touching.left) {
    //   //   ball.body.velocity.x = player.body.velocity.x;
    //   // }
    //   // if (ball.body.touching.right) {
    //   //   ball.body.velocity.x = player.body.velocity.x;
    //   // }
};
brawl.game.prototype.playerLedge = function (player, ledge) {
    // player.body.velocity.y = 0;
    //////////Eleveator Ledges/////////
    if (ledge.name === elevator) {
        ledge.body.stop();
        if (ledge.body.touching.up) {
            ledge.body.velocity.y = -400;
        }
        // When You're Hitting the Edge from the Sides (Right and Left)
        if (ledge.body.touching.left || ledge.body.touching.right) {
            ledge.body.velocity.y = 0;
            ledge.body.velocity.x = 0;
        }
        if (ledge.body.touching.down) {
            ledge.body.velocity.y = -50;
            // player.body.velocity.y = -100;
        }
    }
    //////////Super Jump Bounce/////////
    if (ledge.name === bounce) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -1200;
        }
        if (ledge.body.touching.left || ledge.body.touching.right) {
            ledge.body.velocity.y = 0;
            ledge.body.velocity.x = 0;
        }
    }
    ////////Surfs Up Dude////////
    if (ledge.name === surf) {
        ledge.body.stop();
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
//Ball Interaction With Different Objects
brawl.game.prototype.ballHandler = function (ball, sprite2) {
    if (sprite2.groupName === groupEnemy || sprite2.groupName === groupSpikes) {
        sprite2.kill();
        this.emitterFunction(sprite2);
        //Removes Localized Sprites from Regenerating (Spikes)
        if (sprite2.specialCondition === 0) {
            //Destruction of Localized Sprite
            worldClassLevels[this.indexOfCurrentWorld].undeniableDeathSpawn[sprite2.positionInArray].trigger = false;
        }
        //Removes Sprites from Different Levels (Spikes)
        else if (sprite2.specialCondition === 1) {
            worldClassLevels[this.indexOfCurrentWorld].undeniableDeathSpawn[sprite2.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldClassLevels[sprite2.specialWorld].undeniableDeathSpawn[sprite2.specialArray].trigger = false;
        }
        //////////////////////////Creates New Sprites After Spikes Destroyed///////////////////////
        //worldClassLevels[sprite2.specialWorld].ledgeGreySpawn[sprite2.specialArray].trigger = true;
    }
    //////////////////////Otherwise Collision Mechanics//////////////////
    // ball.body.stop();
    if (ball.body.touching.up) {
        ball.body.velocity.y = ball.velocityVsWallY;
    }
    if (ball.body.touching.down) {
        ball.body.velocity.y = -ball.velocityVsWallY;
    }
    if (ball.body.touching.left) {
        ball.body.velocity.x = ball.velocityVsWallX;
    }
    if (ball.body.touching.right) {
        ball.body.velocity.x = -ball.velocityVsWallX;
    }
    return;
};