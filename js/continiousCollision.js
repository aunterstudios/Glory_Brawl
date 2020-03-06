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
//Enemy Bullets
brawl.game.prototype.fireEnemyBullet = function () {
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
                this.game.physics.arcade.accelerateToObject(enemy, this.player, 350);
            }
        }
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
brawl.game.prototype.immovableWallContinious = function (wall) {
    if (wall.name === immovableWallMagnet) {
        if (this.game.physics.arcade.distanceBetween(this.player, wall, false, true) < 250) {
            this.game.physics.arcade.moveToObject(this.player, wall, 100);
        };
    }
};