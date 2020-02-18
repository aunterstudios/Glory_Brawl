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
    //Clears Array
    livingEnemies.length = 0;
    this.enemy.forEachAlive(function (enemy) {
        if (this.game.physics.arcade.distanceBetween(enemy, this.player, false, true) < 400) {
            livingEnemies.push(enemy)
        }
    }, this, this.player);
    if (this.time.now > enemyBulletTime) {
        enemyBullet = this.enemyBullets.getFirstExists(false);
        if (enemyBullet && livingEnemies.length > 0) {
            //enemyShotSound.play();
            var random = this.rnd.integerInRange(0, livingEnemies.length - 1);
            var shooter = livingEnemies[random];
            enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
            enemyBulletTime = this.time.now + 500; //500 was the "default value"
            // if (game.physics.arcade.distanceBetween(enemyBullet, this.player, false, true) < 500) {
            //     this.physics.arcade.moveToObject(enemyBullet,this.player,600);
            // }
            this.physics.arcade.moveToObject(enemyBullet, this.player, 440);
        }
    }
};
//////////////////Emitter Function/////////////////////
brawl.game.prototype.emitterFunction = function (sprite) {
    this.emitter.x = sprite.x;
    this.emitter.y = sprite.y;
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