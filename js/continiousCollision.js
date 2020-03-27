///////////////////////Handling Jump Events (Double-Jump)//////////////////
brawl.game.prototype.upInputReleased = function () {
    var released = false;

    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
    released |= this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);

    return released;
};
brawl.game.prototype.upInputIsActive = function (duration) {
    var isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
    isActive |= this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);

    return isActive;
};

////////////////////////////////////Continious Updating In Game////////////////////////
//Images
brawl.game.prototype.imageMovement = function () {
    this.imageGroup.forEachAlive(function (image) {
        image.rotation += 0.001;
    }, this);
};

//Enemy Bullets
brawl.game.prototype.enemyAttack = function () {
    this.enemy.forEachAlive(function (enemy) {
        if (this.game.physics.arcade.distanceBetween(enemy, this.player, false, true) < 400) {
            if (enemy.name === enemyShooter) {
                enemyBullet = this.enemyBullets.getFirstExists(false);
                if (this.time.now >= enemyBulletTime) {
                    // enemyBullet.reset(enemy.body.x, enemy.body.y + 30);
                    enemyBulletTime = this.time.now + 400; //500 was the "default value"
                    enemyBullet.reset(enemy.body.x, enemy.body.y + 30);
                    this.game.physics.arcade.moveToObject(enemyBullet, this.player, 400);
                }
            }
            //Daakath
            if (enemy.name === enemyDaakath) {
                this.game.physics.arcade.moveToObject(enemy, this.player, 350);
            }
            if (enemy.name === enemyAccelerate) {
                this.game.physics.arcade.moveToPointer(enemy, 600);
            }
        }
    }, this, this.player);
    //Acceleration to Object (Another Type of Enemy)
};

brawl.game.prototype.wallSpecial = function () {
    this.wall.forEachAlive(function (wall) {
        // if (this.game.physics.arcade.distanceBetween(wall, this.player, false, true) < 400 && wall.name === wallPoint) {
        //     this.game.physics.arcade.moveToPointer(wall, 200);
        // }
        if (wall.name === wallPlayerFrozen) {
            wall.name = wallRegular;
            wall.body.moves = true;
            wall.body.immovable = false;
            wall.tint = tintRemover;
        }
        //Defunct But Still Useful
        // if (wall.name === wallSurfKiller) {
        //     wall.name = wallSurf;
        //     wall.tint = tintWallSurf;
        // }
        // if (wall.name === wallGhost && wall.body.speed > 0) {
        //     wall.tint = tintWallGhostKiller;
        // }
        // else if (wall.name === wallGhost && wall.body.speed <= 0) {
        //     wall.tint = tintWallGhost;
        // }
        // if (wall.name === wallInverse && wall.body.speed > 0) {
        //     wall.tint = tintWallInverse;
        // }
        // else if (wall.name === wallInverse && wall.body.speed <= 0) {
        //     wall.tint = tintWallInverseKiller;
        // }
    }, this, this.player);
    //Acceleration to Object (Another Type of Enemy)
};


//////////////////Emitter Function/////////////////////
brawl.game.prototype.emitterFunction = function (sprite) {
    this.emitter.x = sprite.centerX;
    this.emitter.y = sprite.centerY;
    this.emitter.start(true, 1500, null, 10);
};

///////////////////////////Magnet Walls/////////////////////
brawl.game.prototype.immovableWallContinious = function () {
    this.immovableWall.forEachAlive(function (immovableWall) {
        if (immovableWall.name === immovableWallMagnet) {
            if (this.game.physics.arcade.distanceBetween(this.player, immovableWall, false, true) < 300) {
                this.game.physics.arcade.moveToObject(this.player, immovableWall, 100);
            };
        }
    }, this, this.player);
};