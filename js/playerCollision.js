brawl.game.prototype.playerGround = function (player, ground) {
    // player.body.stop();
    if (ground.name === groundSlippery.name) {
        this.playerSlippery = 200;
    }
    else {
        this.playerSlippery = nenHolder.playerSlippery;
    }
    ///Activating groundActivation(Like a Cloud)
    if (ground.name === groundActivation.name) {
        if (ground.body.touching.up) {
            ground.body.velocity.setTo(0, 200);
        }
        else if (ground.body.touching.down) {
            ground.body.velocity.setTo(0, -200);

        }
        else if (ground.body.touching.left) {
            ground.body.velocity.setTo(200, 0);

        }
        else if (ground.body.touching.right) {
            ground.body.velocity.setTo(-200, 0);
        }
        ground.name = groundRegular;
        ground.tint = tintWallPlayerFrozen;

    }
    ////////////////Player vs. Moving Ground/////////////
    if (ground.name === groundRegularMove.name) {
        ground.groupName = groupGround;
        ground.name = groundRegular.name;
        player.body.stop();
        ground.body.stop();
        // ground.body.moves = false;
        ground.body.immovable = true;
        ground.tint = tintWallPlayerFrozen;
    }
    ////////////////Ground Destruction//////////////
    //The Fire Punch
    if (ground.name === groundFirePunch.name) {
        if (this.movementDown.isDown && !this.movementUp.isDown && !this.movementLeft.isDown && !this.movementRight.isDown) {
            this.emitterFunction(ground, null, 'destroy');
        }
        else {
            this.playerDeath(player, ground);
        }
    }
    ////////////////Player vs. Power Ups and Coin/////////////
    if (ground.name === powerJump.name) {
        player.powerJump = true;
        // this.playerJump += -1000;
        this.playerJump = -1000;
        this.emitterFunction(ground, null, 'destroy');
    }
    //Activating immovableWallWorldGravity (World Gravity)
    if (ground.name === powerWorldGravity.name) {
        this.game.physics.arcade.gravity.setTo(0, 500);
        this.emitterFunction(ground, null, 'destroy');
    }
    if (ground.name === powerNegativeGravity.name) {
        this.game.physics.arcade.gravity.setTo(0, -500);
        this.emitterFunction(ground, null, 'destroy');
    }
    if (ground.name === coinDefault.name) {
        this.emitterFunction(ground, null, 'destroy');
    }
    return;
};

brawl.game.prototype.playerWall = function (player, wall) {
    //////////Global Wall Effects////////
    wall.phase = false;
    wall.alpha = .4;
    ///////////Default Easy Wall///////////
    if (wall.name === wallRegular.name || wall.name === wallExplode.name) {
        // if (wall.body.touching.up || wall.body.touching.down) {
        //     player.body.stop();
        //     wall.body.stop();
        // }
        player.body.stop();
        wall.body.stop();
    }
    ////////Slightly Harder Wall///////////
    if (wall.name === wallMomentum.name) {
        if (wall.body.touching.up) {
            wall.body.velocity.y = 700;
        }
        else if (wall.body.touching.down) {
            wall.body.velocity.y = -700;
        }
        else if (wall.body.touching.left) {
            wall.body.velocity.x = 700;
        }
        else if (wall.body.touching.right) {
            wall.body.velocity.x = -700;
        }
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
    if (wall.name === wallLeftRight.name) {
        if (this.movementLeft.isDown) {
            wall.body.velocity.setTo(-300, 0);
        }
        else if (this.movementRight.isDown) {
            wall.body.velocity.setTo(300, 0);
        }
    }
    if (wall.name === wallKiller.name) {
        this.playerDeath(player, wall);
    }
    ////////////////////////////////Testing//////////////////////////////////
    //////////////Alpha Test One
    // if (wall.body.touching.up || wall.body.touching.down) {
    //     player.body.stop();
    //     wall.body.stop();
    // }
    // else {
    //     wall.body.velocity.x = player.body.velocity.x;
    // }

    return;
};

brawl.game.prototype.playerEnemy = function (player, enemy) {
    enemy.phase = false;
    enemy.alpha = .4;
    if (enemy.name === 'enemyWall') {
        player.body.stop();
        enemy.body.stop();
        if (enemy.body.touching.left) {
            enemy.body.velocity.setTo(300, 0);
        }
        else if (enemy.body.touching.right) {
            enemy.body.velocity.setTo(-300, 0);

        }
    }
    else if (enemy.name === 'immovable') {
        return;
    }
    else {
        this.playerDeath(player, enemy);
    }
    return;
};

brawl.game.prototype.playerLedge = function (player, ledge) {
    /////////////Collision Turned Off////////////
    ledge.phase = false;
    ledge.alpha = .4;
    //////////Eleveator Ledges/////////
    if (ledge.name === ledgeElevator.name || ledge.name === 'ledgeElevatorActivate') {
        if (ledge.body.touching.up) {
            ledge.body.stop();
            player.body.velocity.y = -300;
            ledge.body.velocity.y = -300;
        }
        else if (ledge.body.touching.down) {
            ledge.body.stop();
        }
        else if (ledge.body.touching.left) {
            ledge.body.velocity.x = 150;
        }
        else if (ledge.body.touching.right) {
            ledge.body.velocity.x = -150;
        }
        if (ledge.name === ledgeElevator.name) {
            ledge.name = 'ledgeElevatorActivate';
        }
    }
    //////////Super Jump Bounce/////////
    if (ledge.name === ledgeBounce.name) {
        if (ledge.body.touching.up) {
            player.body.velocity.y = -1200;
        }
        if (ledge.generationType === 'timer') {
            this.emitterFunction(ledge, null, 'kill');

        }
        else {
            this.emitterFunction(ledge, null, 'destroy');

        }
    }
    ////////Surfs Up Dude////////
    if (ledge.name === ledgeSurf.name) {
        //Self Destruct
        if (!ledge.surfActivate) {
            ledge.surfActivate = true;
            if (ledge.generationType === 'timer') {
                var killOrDestroy = 'kill'

            }
            else {
                var killOrDestroy = 'destroy'
            }
            this.game.time.events.add(3000, this.spriteSelfDestruct, this, ledge, killOrDestroy);
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
    hazama.lastOverlapped = this.game.time.now + 100;
    if (hazama.name === hazamaFalconia.name) {
        player.body.gravity.y = -200;
    }

};
