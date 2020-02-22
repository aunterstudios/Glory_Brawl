//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.deathTwo = function (victim, killer) {
    victim.kill();
    if (killer.name === 'immovableWallPhase') {
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
        obj2.body.bounce.setTo(.2)
        obj2.velocityVsWallY = 20;
        obj2.velocityVsWallX = 20;
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
    if (obj2.groupName === groupBall) {
        obj2.body.stop();
    }
    ///////////////////////Only Ball Specific///////////////////
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
    if (sprite2.name === immovableWallKillWall) {
        wall.kill();
    }
    return;
};
brawl.game.prototype.wallMoveable = function (wall, objMov) {
    //////////////////////////Between Walls and Balls or Ledges//////////////////////
    //First Interaction!! (WallRegular to WallFrozen)
    if ((wall.name === wallRegular || wall.name === wallFrozen) && objMov.groupName === groupLedge) {
        wall.name = wallFrozen;
        wall.body.moves = false;
        wall.body.immovable = true;
        wall.tint = tintWallFrozen;
    }
    //Turns wallRegular to wallHeavy (Ball);
    if (wall.name === wallRegular && objMov.groupName === groupBall) {
        wall.name = wallHeavy;
        wall.tint = tintWallHeavy;
        wall.body.maxVelocity.setTo(450);
        // wall.body.gravity.y = 300; //500 Original
    }
    //Turns wallHeavy to wallInverse (Ledge)
    if (wall.name === wallHeavy && objMov.groupName === groupLedge) {
        wall.name = wallInverse;
        wall.tint = tintwallInverse;
    }
    //Turns wallInverse to wallLight (Ball)
    if (wall.name === wallInverse && objMov.groupName === groupBall) {
        wall.name = wallLight;
        wall.tint = tintWallLight;
    }
    //Turns wallLight to wallControl(ledge)
    if (wall.name === wallLight && objMov.groupName === groupLedge) {
        wall.name = wallControl;
        wall.tint = tintWallControl;
    }
    //Turns wallControl to wallCloud (Ball)
    if (wall.name === wallControl && objMov.groupName === groupBall) {
        wall.name = wallCloud;
        wall.tint = tintWallCloud;
        wall.body.stop();
        wall.body.gravity.y = 0;
        wall.body.immovable = true;
        // wall.body.velocity.x = objMov.body.velocity.x;
    }
    //Turns wallCloud to Wall Ghost (Ledge)
    if (wall.name === wallCloud && objMov.groupName === groupLedge) {
        wall.name = wallGhost;
        wall.tint = tintWallGhost;
        wall.body.stop();
        wall.body.immovable = true;
    }
    //Turns wallGhost to wallFrozen (Ball)
    if (wall.name === wallGhost && objMov.groupName === groupBall) {
        wall.name = wallFrozen;
        wall.body.moves = false;
        wall.tint = tintWallFrozen;
    }

    //////////////////////////Between Walls and Enemies//////////////////////
    if (wall.name === wallRegular && objMov.groupName === groupEnemy) {
        wall.name = wallBlack;
        wall.tint = tintWallBlack;
    }
    if (wall.name === wallFrozen && objMov.groupName === groupEnemy) {
        wall.name = wallBlackFrozen;
        /////////Might Be Unncessary///////
        wall.body.moves = false;
        wall.body.immovable = true;
        wall.tint = tintWallBlackFrozen;
    }
    if (wall.name === wallControl && objMov.groupName === groupEnemy) {
        wall.name = wallBlackGravity;
        /////////Might Be Unncessary///////
        wall.body.immovable = true;
        wall.body.gravity.x = 500;
        wall.tint = tintWallBlackGravity;
    }
    if (wall.name === wallInverse && objMov.groupName === groupEnemy) {
        wall.name = wallBlackReverseGravity;
        wall.body.immovable = true;
        wall.body.gravity.x = -500;
        wall.tint = tintWallBlackReverseGravity;
    }
    if (wall.name === wallLight && objMov.groupName === groupEnemy) {
        wall.name = wallBlackLight;
        wall.body.gravity.x = 0;
        wall.tint = tintWallBlackLight;
    }
    if (wall.name === wallHeavy && objMov.groupName === groupEnemy) {
        wall.name = wallBlackHeavy;
        wall.body.stop();
        wall.tint = tintWallBlackHeavy;
    }
    if (wall.name === wallCloud && objMov.groupName === groupEnemy) {
        wall.name = wallBlackCloud;
        wall.body.stop();
        wall.body.immovable = true;
        wall.tint = tintWallBlackCloud;
    }
    if (wall.name === wallGhost && objMov.groupName === groupEnemy) {
        wall.name = wallBlackGhost;
        wall.body.immovable = true;
        wall.tint = tintWallBlackGhost;
    }

    ////////////////Special Handler for wallBlackGhost////////////
    if (wall.name === wallBlackGhost) {
        objMov.kill(); //Even the Younglings
    }
    // console.log(wall.name);


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
            playerWallJumpX = 2000;
            playerWallJumpY = 1000;
        }
        if (player.body.touching.down) {
            playerSlippery = 0;
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
    if (wall.name === wallRegular || wall.name === wallFrozen) {
        wall.name = wallRegular;
        wall.body.moves = true;
        wall.tint = tintRemover;
        wall.body.immovable = false;
        //////////Testing///////////////
        // wall.body.stop();
        // player.body.velocity.y = 0;
        // wall.body.velocity.y += player.body.velocity.y;
        // if (this.movementDown.isDown) {
        //     wall.body.velocity.y = 300;
        // }
        // else if (this.movementLeft.isDown) {
        //     wall.body.velocity.x = -300;
        // }
        // else if (this.movementRight.isDown) {
        //     wall.body.velocity.x = 300;
        // }
        //////////////Testing 2///////////////
        wall.body.stop();
        wall.body.velocity.y = -150;
        if (player.body.touching.down) {
            //////Testing
            // if (this.movementRight.isDown) {
            //     wall.body.velocity.x = 300;
            // }
            // else if (this.movementLeft.isDown) {
            //     wall.body.velocity.x = -300;
            // }
            wall.body.velocity.x += player.body.velocity.x;
        }
        if (player.body.touching.up) {
            wall.body.stop();
            wall.body.velocity.x += player.body.velocity.x;
        }
        if (wall.body.touching.left || wall.body.touching.right) {
            wall.body.velocity.y = 0;
            wall.body.velocity.x = 0;
            // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
        }
    }
    if (wall.name === wallHeavy) {
        // player.body.velocity.y = 0;
        // wall.body.velocity.y += player.body.velocity.y;
        ////////////Testing 1 ///////////
        // wall.body.stop();
        // wall.body.velocity.y = 0;
        // player.body.velocity.y = -100;
        // wall.body.velocity.y = player.body.velocity.y;
        // wall.body.velocity.x = player.body.velocity.x;
        ///////////Testing 2///////////
        wall.body.stop();
        if (player.body.touching.down) {
            wall.body.velocity.y = -150;
            wall.body.velocity.x = player.body.velocity.x;
            // console.log(player.body.touching.up, 'up');
        }
        if (player.body.touching.up) {
            wall.body.stop();
            wall.body.velocity.x = player.body.velocity.x;
        }
        if (wall.body.touching.left || wall.body.touching.right) {
            wall.body.stop();
            // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
        }
    }
    if (wall.name === wallControl) {
        if (wall.key === wallHorizontal) {
            player.body.velocity.y = 0;
            wall.body.velocity.y = -100;
            if (this.movementLeft.isDown) {
                wall.body.velocity.x = -200;
            }
            else if (this.movementRight.isDown) {
                wall.body.velocity.x = 200;
            }
            if (this.movementDown.isDown) {
                // wall.body.stop();
                wall.body.stop();
            }
        }
        else {
            // player.body.velocity.y = 0;
            if (player.body.velocity.x > 0) {
                wall.body.stop();
                wall.body.velocity.y = -50;
            }
            else if (player.body.velocity.x < 0) {
                wall.body.stop();
                wall.body.velocity.y = 50;
            }
        }
    }
    if (wall.name === wallInverse) {
        wall.body.stop();
        if (wall.key === wallHorizontal) {
            wall.body.stop();
            player.body.velocity.y = 0;
            wall.body.velocity.y = -100;
            if (player.x < wall.x) {
                wall.body.velocity.x = -100;
                // console.log(player.body.touching.up, 'up');
            }
            if (player.x > wall.x) {
                wall.body.velocity.x = 100;
                // console.log(player.body.touching.left, 'left', player.body.touching.right, 'right')
            }
        }
        else {
            if (player.body.touching.left) {
                wall.body.velocity.x = 100;
            }
            if (player.body.touching.right) {
                wall.body.velocity.x = -100;
            }
        }
    }
    if (wall.name === wallLight) {
        player.body.gravity.y = 500;
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

    ////Enemy Walls On You Baby////////
    if (wall.name === wallBlackLight) {
        player.body.gravity.y = 2500;
        if (player.body.touching.up) {
            wall.body.velocity.y = -300;
        }
        if (player.body.touching.down) {
            wall.body.velocity.y = 200;
        }
        if (player.body.touching.left) {
            wall.body.velocity.x = -300;
        }
        if (player.body.touching.right) {
            wall.body.velocity.x = 300;
        }
    }
    if (wall.name === wallBlackHeavy) {
        this.deathState(this.player);
    }
    if (wall.name === wallBlackCloud) {
        //Control
        // wall.body.velocity.x = player.body.velocity.x;
        //Let it Go
        if (player.body.velocity.x < 0) {
            wall.body.velocity.x = 200;
        }
        if (player.body.velocity.x > 0) {
            wall.body.velocity.x = -200;
        }
    }
    return;
};
brawl.game.prototype.playerBlackWall = function (player, wall) {
    if (wall.name === wallBlack || wall.name === wallBlackGhost) {
        return false;
    }
    else {
        return true;
    }
};
brawl.game.prototype.playerBall = function (player, ball) {
    /////////////////////GOOOFY///////////////
    ball.body.stop();
    if (ball.body.touching.up) {
        ball.body.velocity.y = 75;
    }
    if (ball.body.touching.down) {
        ball.body.velocity.y = -75;
    }
    if (ball.body.touching.left) {
        ball.body.velocity.x = 75;
    }
    if (ball.body.touching.right) {
        ball.body.velocity.x = -75;
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
    // console.log(sprite2.groupName);
    if (sprite2.groupName === (groupSpikes || groupEnemy)) {
        sprite2.kill();
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
    ball.body.stop();
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