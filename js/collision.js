//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Immovable/Unkillable Objects (It Dies);
brawl.game.prototype.weaponImmovable = function (weapon, wall) {
    weapon.kill();
};
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (weapon, sprite) {
    if (weapon.key === 'bulletPull') {
        this.game.physics.arcade.moveToObject(sprite, this.player, 200);
    }
    else if (weapon.key === 'bulletStop') {
        sprite.body.stop();
    }
    else if (weapon.key === 'bulletKill') {
        sprite.kill();
    }
    weapon.kill();
};
//Let Weapon Fire Pass Through
brawl.game.prototype.weaponGhost = function (weapon, ghost) {
    if (ghost.name === wallCloud) {
        return false;
    }
    else {
        return true;
    }
};
///////////////////////////Weapon Switching/////////////////
brawl.game.prototype.goPull = function () {
    // console.log("1");
    pullBoolean = true;
    pushBoolean = false;
    stopBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goPush = function () {
    // console.log("2");
    pullBoolean = false;
    pushBoolean = true;
    stopBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goKill = function () {
    // console.log("3");
    pullBoolean = false;
    pushBoolean = false;
    stopBoolean = true;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
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
brawl.game.prototype.immovableMoveable = function (immovable, obj2) {
    if (immovable.name === immovableWallPadding) {
        // obj2.body.stop();
        obj2.body.bounce.setTo(.5)
        obj2.velocityVsWallY = 50;
        obj2.velocityVsWallX = 50;
        obj2.tint = tintImmovableWallMagnet;
        ////Maybe Kill This Later///
    }
    //////////////Actual Collision Mechanics////////////
    // obj2.body.stop();
    if (immovable.body.touching.up) {
        obj2.body.velocity.y = -obj2.velocityVsWallY;
    }
    if (immovable.body.touching.down) {
        obj2.body.velocity.y = obj2.velocityVsWallY;
    }
    if (immovable.body.touching.left) {
        obj2.body.velocity.x = -obj2.velocityVsWallX;
    }
    if (immovable.body.touching.right) {
        obj2.body.velocity.x = obj2.velocityVsWallX;
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
    //First Interaction!! (WallRegular to WallFrozen)
    if ((wall.name === wallRegular || wall.name === wallFrozen) && objMov.groupName === groupLedge) {
        wall.name = wallFrozen;
        wall.body.moves = false;
        wall.body.immovable = true;
        wall.tint = tintWallFrozen;
    }
    //Turns wallRegular to wallGravity (Ball);
    if (wall.name === wallRegular && objMov.groupName === groupBall) {
        wall.name = wallGravity;
        wall.tint = tintWallGravity;
        wall.body.gravity.y = 300; //500 Original
    }
    //Turns wallGravity to wallReverseGravity (Ledge)
    if (wall.name === wallGravity && objMov.groupName === groupLedge) {
        wall.name = wallReverseGravity;
        wall.tint = tintWallReverseGravity;
        wall.body.gravity.y = -500;
    }
    //Turns wallReverseGravity to wallLight (Ball)
    if (wall.name === wallReverseGravity && objMov.groupName === groupBall) {
        wall.name = wallLight;
        wall.tint = tintWallLight;
        wall.body.gravity.y = 0;
    }
    //Turns wallLight to wallHeavy (ledge)
    if (wall.name === wallLight && objMov.groupName === groupLedge) {
        wall.name = wallHeavy;
        wall.tint = tintWallHeavy;
    }
    //Turns wallHeavy to wallCloud (Ball)
    if (wall.name === wallHeavy && objMov.groupName === groupBall) {
        wall.name = wallCloud;
        wall.tint = tintWallCloud;
        wall.body.stop();
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

    /////////////////////The Actual Collision Physics/////////////////
    if (wall.body.touching.up) {
        objMov.body.velocity.y = -objMov.velocityVsWallY;
    }
    if (wall.body.touching.down) {
        objMov.body.velocity.y = objMov.velocityVsWallY;
    }
    if (wall.body.touching.left) {
        objMov.body.velocity.x = -objMov.velocityVsWallX;
    }
    if (wall.body.touching.right) {
        objMov.body.velocity.x = objMov.velocityVsWallX;
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
        immovable.kill();
    }
    // return;
};
brawl.game.prototype.playerWall = function (player, wall) {
    if (wall.name === wallRegular || wall.name === wallFrozen) {
        wall.name = wallRegular;
        wall.body.moves = true;
        wall.tint = tintRemover;
        wall.body.immovable = false;
        ////////////////////Maybe//////////////////////
        // if (player.body.touching.up) {
        //     wall.body.velocity.y = -100;
        // }
    }
    if (wall.name === wallLight) {
        player.body.gravity.y = 500;
        if (player.body.touching.up) {
            wall.body.velocity.y = -500;
        }
        if (player.body.touching.down) {
            wall.body.velocity.y = 200;
        }
        if (player.body.touching.left) {
            wall.body.velocity.x = -500;
        }
        if (player.body.touching.right) {
            wall.body.velocity.x = 500;
        }
    }
    if (wall.name === wallHeavy) {
        wall.body.stop();
        if (player.body.touching.up) {
            wall.body.velocity.y = -5;
        }
        if (player.body.touching.down) {
            wall.body.velocity.y = 5;
        }
        if (player.body.touching.left) {
            wall.body.velocity.x = -5;
        }
        if (player.body.touching.right) {
            wall.body.velocity.x = 5;
        }
    }
    if (wall.name === wallCloud) {
        //Control
        // wall.body.velocity.x = player.body.velocity.x;
        //Let it Go
        if (player.body.velocity.x < 0) {
            wall.body.velocity.x = -200;
        }
        if (player.body.velocity.x > 0) {
            wall.body.velocity.x = 200;
        }
    }
    return;
};
brawl.game.prototype.playerBall = function (player, ball) {
    /////////////////////GOOOFY///////////////
    ball.body.stop();
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
    //   //////////////////Natural///////////////
    //   // if (ball.body.touching.up) {
    //   //   ball.body.velocity.y = 50;
    //   // }
    //   // else if (ball.body.touching.down) {
    //   //   ball.body.velocity.y = -50;
    //   //   player.body.velocity.y = -75;
    //   // }
    //   // else if (ball.body.touching.left) {
    //   //   ball.body.velocity.x = 50;
    //   // }
    //   // else if (ball.body.touching.right) {
    //   //   ball.body.velocity.x = -50;
    //   // }
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
            ledge.body.velocity.y = -200;
            player.body.velocity.y = -200
            // if (player.body.velocity.x < 0) {
            //   ledge.body.velocity.x = player.body.velocity.x - 100;
            // }
            // if (player.body.velocity.x > 0) {
            //   ledge.body.velocity.x = player.body.velocity.x + 100;
            // }
            // {
            //   ledge.body.velocity.x = 0;
            // }
        }
        // When You're Hitting the Edge from the Sides (Right and Left)
        if (ledge.body.touching.left || ledge.body.touching.right) {
            ledge.body.velocity.y = 0;
            ledge.body.velocity.x = 0;
        }
        /////////////////////////////////In Case Want to Change Side Ledge Velocity///////////
        // if (ledge.body.touching.left) {
        //   ledge.body.velocity.y = 0;
        //   ledge.body.velocity.x = 300;
        // }
        // if (ledge.body.touching.right) {
        //   ledge.body.velocity.y = 0;
        //   ledge.body.velocity.x = -300;
        // }
        // if (ledge.body.touching.down && player.body.velocity.y < -1) {
        //   player.body.velocity.y = -100;
        // }
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
brawl.game.prototype.ballHandler = function (sprite1, sprite2) {
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
};