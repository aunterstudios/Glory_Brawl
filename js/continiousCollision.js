///////////////////////Debugging///////////////////////
brawl.game.prototype.debugSprites = function () {
    // console.log(this.enemy.count('name', 'enemyDaakath'), 'EnemyDaakath');
    // console.log(this.enemy.count('name', 'enemyWall'), 'EnemyWall');
    // console.log(this.enemy.countDead(), 'DeadEnemy');
    // console.log(this.enemy.countLiving(), 'LivingEnemy');
    // console.log(this.fallingSpikes.countDead(), 'FallingSpikesDead');
    // console.log(this.fallingSpikes.countLiving(), 'FallingSpikesAlive');
    console.log(this.ledge.countDead(), 'Deadledge');
    console.log(this.ledge.countLiving(), 'Livingledge');
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
    if (sprite1.specialCondition) {
        if (sprite1.specialCondition.name === scKillAll.name || sprite1.specialCondition.name === scCollect.name) {
            this.amount -= 1;
            if (this.amount === 0) {
                this.specialLevelSwitch(worldClassLevels[this.indexOfCurrentWorld].specialLevel.indexWorld, worldClassLevels[this.indexOfCurrentWorld].specialLevel.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].specialLevel.page);
            }
        }
    }
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
        //Collision Handler
        enemy.phase = true;
        enemy.alpha = 1;
        // var enemySpeed = enemy.body.speed;
        if (this.game.physics.arcade.distanceBetween(enemy, this.player, false, true) < 400) {
            //Shooter
            if (enemy.name === enemyShooter.name) {
                this.enemyBullets.fire(enemy, this.player.x, this.player.y);
            }
            //Daakath
            if (enemy.name === enemyDaakath.name) {
                this.game.physics.arcade.moveToObject(enemy, this.player, 350);
                // this.game.physics.arcade.moveToObject(enemy, this.player, enemySpeed);
                // enemy.tint = Math.random() * 0xffffff;
            }
            if (enemy.name === enemyAccelerate.name) {
                this.game.physics.arcade.moveToPointer(enemy, 600);
            }
        }
        // else {
        //     if (enemy.name === enemyDaakath.name) {
        //         enemy.tint = Phaser.Color.RED;
        //     }
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
    this.wall.forEachAlive(function (wall) {
        wall.phase = true;
        wall.alpha = 1;
    }, this, this.player);
};

brawl.game.prototype.groundContinious = function () {
    this.ground.forEachAlive(function (ground) {
        if (ground.groupName === groupGroundMove) {
            ground.body.moves = true;
            ground.body.immovable = false;
            ground.tint = Phaser.Color.WHITE;
            // console.log(ground.tint);
        }
    }, this, this.player);
};

// brawl.game.prototype.ledgeContinious = function () {
//     this.ledge.forEachAlive(function (ledge) {
//         ledge.phase = true;
//         ledge.alpha = 1;
//     }, this, this.player);
// };

brawl.game.prototype.hazamaContinious = function () {
    this.hazama.forEachAlive(function (hazama) {
        if (hazama.lastOverlapped && this.game.time.now > hazama.lastOverlapped) {
            if (!this.player.powerJump) {
                this.playerJump = nenHolder.playerJump;
            }
            if (!this.player.powerGravity) {
                //Gravity is Special as It's not Always Updated
                this.player.body.gravity.y = nenHolder.playerGravityY;
            }
        }
    }, this, this.player);
};

brawl.game.prototype.playerContinious = function () {
    this.player.alpha = 1;
};