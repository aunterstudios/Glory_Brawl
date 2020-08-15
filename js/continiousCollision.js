///////////////////////Handling Jump Events (Double-Jump)//////////////////
brawl.game.prototype.upInputReleased = function () {
    var released = false;

    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);

    return released;
};
brawl.game.prototype.upInputIsActive = function (duration) {
    var isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);

    return isActive;
};

//Images
brawl.game.prototype.imageMovement = function () {
    //Images
    this.imageGroup.forEachAlive(function (image) {
        // image.rotation += 0.001;
        // if (image.name === slowMotion) {
        //     this.game.physics.arcade.moveToObject(image, this.player, 400);
        // }
    }, this);
};

//Enemy Bullets
brawl.game.prototype.enemyAttack = function () {
    this.enemy.forEachAlive(function (enemy) {
        if (this.game.physics.arcade.distanceBetween(enemy, this.player, false, true) < 400) {
            if (enemy.name === enemyShooter.name) {
                this.enemyBullets.fire(enemy, this.player.x, this.player.y);
            }
            //Daakath
            if (enemy.name === enemyDaakath.name) {
                this.game.physics.arcade.moveToObject(enemy, this.player, 350);
            }
            if (enemy.name === enemyAccelerate.name) {
                this.game.physics.arcade.moveToPointer(enemy, 600);
            }
        }
        // else {
        //     if (enemy.name === enemyDaakath) {
        //         enemy.body.stop();
        //     }
        // }
    }, this, this.player);
    //Acceleration to Object (Another Type of Enemy)
};

//Immovable Wall
brawl.game.prototype.immovableWallContinious = function () {
    this.immovableWall.forEachAlive(function (immovableWall) {
        // if (immovableWall.name === immovableWallOneWayPlayerBlockLeft) {
        //     immovableWall.body.checkCollision.left = true;
        // }
    }, this, this.player);
};

//Moveable Wall
brawl.game.prototype.wallContinious = function () {
    // this.wall.forEachAlive(function (wall) {
    //     // if (this.game.physics.arcade.distanceBetween(wall, this.player, false, true) < 400 && wall.name === wallPoint) {
    //     //     this.game.physics.arcade.moveToPointer(wall, 200);
    //     // }
    //     // if (wall.name === wallPlayerFrozen) {
    //     //     wall.name = wallRegular;
    //     //     wall.body.moves = true;
    //     //     wall.body.immovable = false;
    //     //     wall.tint = tintRemover;
    //     // }
    //     //Defunct But Still Useful For Different Walls
    //     // if (wall.name === wallSurfKiller) {
    //     //     wall.name = wallSurf;
    //     //     wall.tint = tintWallSurf;
    //     // }
    //     // if (wall.name === wallGhost && wall.body.speed > 0) {
    //     //     wall.tint = tintWallGhostKiller;
    //     // }
    //     // else if (wall.name === wallGhost && wall.body.speed <= 0) {
    //     //     wall.tint = tintWallGhost;
    //     // }
    //     // if (wall.name === wallInverse && wall.body.speed > 0) {
    //     //     wall.tint = tintWallInverse;
    //     // }
    //     // else if (wall.name === wallInverse && wall.body.speed <= 0) {
    //     //     wall.tint = tintWallInverseKiller;
    //     // }
    // }, this, this.player);
    //Acceleration to Object (Another Type of Enemy)
};

//////////////////Emitter Function/////////////////////
brawl.game.prototype.emitterFunction = function (sprite1, sprite2, killOrDestroy) {
    //Sprite 1 is Always Killed
    //If Sprite Two is "True", It denotes the position of the emitter
    if (sprite2) {
        this.emitter.x = sprite2.centerX;
        this.emitter.y = sprite2.centerY;
    }
    else {
        this.emitter.x = sprite1.centerX;
        this.emitter.y = sprite1.centerY;
    }
    this.emitter.start(true, 1500, null, 10);
    if (killOrDestroy === 'kill') {
        sprite1.kill();
    }
    else {
        sprite1.destroy();
    }
};

//////////////////////Sprite Self Destruct///////////////////////
brawl.game.prototype.spriteSelfDestruct = function (sprite, killOrDestroy) {
    //Self Destruct Sprite Timer 
    this.emitterFunction(sprite, null, killOrDestroy);
};