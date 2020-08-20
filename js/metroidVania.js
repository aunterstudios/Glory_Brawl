//////////////////////////Creation of the World/////////////////////////////////
brawl.game.prototype.worldCreator = function (levelGenerator) {
    /////////////////////Testing Entirety of Level/////////////////
    // console.log(levelGenerator);
    ////////////////////Adding Player//////////////////////
    this.player = this.game.add.sprite(levelGenerator.playerPosition[this.indexOfPlayerPosition].x, levelGenerator.playerPosition[this.indexOfPlayerPosition].y, 'player');
    this.game.physics.arcade.enable(this.player); //enables physics for player
    this.player.anchor.setTo(.5);
    // this.player.scale.setTo(.6);
    this.player.scale.setTo(1);
    this.player.tint = Phaser.Color.GREEN;
    // this.player.alpha = this.game.rnd.realInRange(.5, 1);
    // this.player.tint = Phaser.Color.getRandomColor(50, 255, 255);
    this.player.body.setSize(34, 55.5, 15, 7);
    // this.player.body.bounce.y = 0;
    this.player.body.mass = 6; //6
    this.player.body.gravity.y = this.playerGravityY;
    //this.player.body.allowDrag = false;
    // this.player.body.collideWorldBounds = true;
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(this.playerOut, this);

    // PLAYER ANIMATIONS
    this.player.animations.add('left', [7, 8, 9], 10, true);
    this.player.animations.add('upsideDownLeft', [4, 5, 6], 10, true);
    this.player.animations.add('right', [13, 14, 15], 10, true);
    this.player.animations.add('upsideDownRight', [10, 11, 12], 10, true);

    //Camera Indicator
    this.cameraImage = this.game.add.image(0, 0, 'camera');
    this.cameraImage.fixedToCamera = true;
    this.cameraImage.cameraOffset.setTo(200, 100);
    //Kill Right Away To Remove it From View Then to Revive
    this.cameraImage.kill();

    ///////////////////////Slow Motion Indicator////////////////////
    this.slowMotionArray = [];
    for (var i = 0; i < slowMotionLimit; i++) {
        // this.slowMotionFollow = this.imageGroup.create(0, 0, slowMotion);
        // this.slowMotionFollow = this.imageGroup.create(this.player.x + (i * 40), this.player.y - 50, slowMotion);
        this.slowMotionFollow = this.slowMotionGroup.create(i * 100 + 50, 6208, slowMotion);
        this.slowMotionFollow.fixedToCamera = true;
        this.slowMotionFollow.cameraOffset.setTo(i * 100 + 50, 700);
        this.slowMotionFollow.name = slowMotion;
        // this.slowMotionFollow.fixedToCamera = true;
        this.slowMotionArray.push(this.slowMotionFollow);
    }
    //////////////////Adding Weapons////////////////////
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon1 = this.game.add.weapon(this.weaponBulletAmount, 'bulletPull');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    // this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon1.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon1.bulletSpeed = this.weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon1.fireRate = this.weaponFireRate;
    //Size of Bullet
    // this.weapon1.setBulletBodyOffset(5,2,-20,0); //setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)
    // Track Player
    this.weapon1.trackSprite(this.player, 0, 0);

    /////////////////PUSH
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon2 = this.game.add.weapon(this.weaponBulletAmount, 'bulletPush');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon2.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon2.bulletSpeed = this.weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon2.fireRate = this.weaponFireRate;
    //Match Your Velocity?
    // Track Player
    this.weapon2.trackSprite(this.player, 0, 0);

    /////////////////Stop
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon3 = this.game.add.weapon(this.weaponBulletAmount, 'bulletStop');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon3.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon3.bulletSpeed = this.weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon3.fireRate = this.weaponFireRate;
    //Match Your Velocity?
    // Track Player
    this.weapon3.trackSprite(this.player, 0, 0);

    // - 20 for Tracking//
    ////////////////////////////Image Creation/////////////////////////
    if ('imageSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.imageSpawn.length; i++) {
            if (levelGenerator.imageSpawn[i].trigger) {
                this.imageSpawn(levelGenerator.imageSpawn[i], i);
            }
        }
    }
    ///////////////////////////Sprite Generation in World/////////////////////////////
    // Generating Undeniable Death
    if ('undeniableDeathSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.undeniableDeathSpawn.length; i++) {
            if (levelGenerator.undeniableDeathSpawn[i].trigger) {
                this.spriteGen(levelGenerator.undeniableDeathSpawn[i], i, this.undeniableDeath, groupUndeniableDeath, 'tile');
            }
        }
    }
    //Generating Immovable Walls
    if ('immovableWallSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.immovableWallSpawn.length; i++) {
            if (levelGenerator.immovableWallSpawn[i].trigger) {
                this.spriteGen(levelGenerator.immovableWallSpawn[i], i, this.immovableWall, groupImmovableWall, 'tile');
            }
        }
    }
    //Generating movable Walls
    if ('wallSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.wallSpawn.length; i++) {
            if (levelGenerator.wallSpawn[i].trigger) {
                this.spriteGen(levelGenerator.wallSpawn[i], i, this.wall, groupWall, 'tile');
            }
        }
    }
    //Generating Ledges
    if ('ledgeSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.ledgeSpawn.length; i++) {
            if (levelGenerator.ledgeSpawn[i].trigger) {
                this.spriteGen(levelGenerator.ledgeSpawn[i], i, this.ledge, groupLedge, 'sprite');
            }
        }
    }
    //Generating enemies (Tabled For Now)
    if ('enemySpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.enemySpawn.length; i++) {
            if (levelGenerator.enemySpawn[i].trigger) {
                this.spriteGen(levelGenerator.enemySpawn[i], i, this.enemy, groupEnemy, 'sprite');
            }
        }
    }
    //Generating balls ledges
    if ('ballSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.ballSpawn.length; i++) {
            if (levelGenerator.ballSpawn[i].trigger) {
                this.spriteGen(levelGenerator.ballSpawn[i], i, this.ball, groupBall, 'tile');
            }
        }
    }

    //Generating balls ledges
    if ('hazamaSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.hazamaSpawn.length; i++) {
            if (levelGenerator.hazamaSpawn[i].trigger) {
                this.spriteGen(levelGenerator.hazamaSpawn[i], i, this.hazama, groupHazama, 'tile');
            }
        }
    }
    ///////////////////(Falling Spikes)////////////////
    if ('fallingSpikes' in levelGenerator) {
        for (var i = 0; i < levelGenerator.fallingSpikes.length; i++) {
            if (levelGenerator.fallingSpikes[i].trigger) {
                if (levelGenerator.fallingSpikes[i].time.timerType === 'loop') {
                    this.game.time.events.loop(Phaser.Timer.SECOND * levelGenerator.fallingSpikes[i].time.seconds, this.spriteGen, this, levelGenerator.fallingSpikes[i], i, this.fallingSpikes, groupFallingSpikes, 'timer');
                }
                else if (levelGenerator.fallingSpikes[i].time.timerType === 'repeat') {
                    this.game.time.events.repeat(Phaser.Timer.SECOND * levelGenerator.fallingSpikes[i].time.seconds, levelGenerator.fallingSpikes[i].time.repeatAmount, this.spriteGen, this, levelGenerator.fallingSpikes[i], i, this.fallingSpikes, groupFallingSpikes, 'timer');
                }
            }
        }
    }
    // //////////////////(Respawn)Flag//////////////////
    if ('flagSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.flagSpawn.length; i++) {
            if (levelGenerator.flagSpawn[i].trigger) {
                this.flagSpawn(levelGenerator.flagSpawn[i]);
            }
        }

    }
    ////////////////////////Text Generation///////////////////////////
    if ('text' in levelGenerator) {
        for (var i = 0; i < levelGenerator.text.length; i++) {
            if (levelGenerator.text[i].trigger) {
                this.textCreator(levelGenerator.text[i], i);
            }
        }
    }

    ///////////////////Debugging Purposes (Knowing The Placement of Each Sprites)/////////////////////////
    if (coordinateSystem) {
        var distanceOfXandY = 200;
        var xIterator = Math.round(levelGenerator.xOfWorld / distanceOfXandY);
        var yIterator = Math.round(levelGenerator.yOfWorld / distanceOfXandY);

        for (var x = 1; x < xIterator; x++) {
            for (var y = 1; y < yIterator; y++) {
                this.text = this.game.add.text(x * distanceOfXandY, y * distanceOfXandY, x * distanceOfXandY + 'X' + y * distanceOfXandY + 'Y', { font: "10px Arial", fill: "#ff0000", align: "center" });
            }
        }
    }

};

//////////////////////////Room Switching (Metroidvania) Events//////////////////////////
brawl.game.prototype.playerOut = function (player) {
    //Up
    if (player.y <= this.metroidvania.roomUpValue) {
        // player.reset(0, player.y)
        // player.body.velocity.x = 400;
        this.game.state.restart(true, false, this.metroidvania.roomUpIndex, 1, worldClassLevels[this.metroidvania.roomUpIndex].metroidvania);
    }
    //Down
    else if (player.y >= this.metroidvania.roomDownValue) {
        // player.reset(1400, player.y)
        // player.body.velocity.x = -400;
        this.game.state.restart(true, false, this.metroidvania.roomDownIndex, 0, worldClassLevels[this.metroidvania.roomDownIndex].metroidvania);
    }
    //Left
    else if (player.x <= this.metroidvania.roomLeftValue) {
        // player.reset(1400, player.y)
        // player.body.velocity.x = -400;
        this.game.state.restart(true, false, this.metroidvania.roomLeftIndex, 3, worldClassLevels[this.metroidvania.roomLeftIndex].metroidvania);
    }
    //Right
    else if (player.x >= this.metroidvania.roomRightValue) {
        // player.reset(1400, player.y)
        // player.body.velocity.x = -400;
        this.game.state.restart(true, false, this.metroidvania.roomRightIndex, 2, worldClassLevels[this.metroidvania.roomRightIndex].metroidvania);
    }

};

///////////////////////////////////////////State Switches////////////////////////////////
//Character Dying From Enemies and Such
brawl.game.prototype.playerDeath = function (victim, killer) {
    this.emitterFunction(victim, null, 'kill');
    this.game.time.events.add(1000, this.deathSwitch, this);
};
//Killing Yourself Literally
brawl.game.prototype.killSelf = function () {
    this.emitterFunction(this.player, null, 'kill');
    this.game.time.events.add(1000, this.deathSwitch, this);
};
//State Switch
brawl.game.prototype.deathSwitch = function () {
    this.game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania);
};

//Character Respawn
brawl.game.prototype.respawn = function (player, flag) {
    flag.destroy();
    respawnHolder.indexOfCurrentWorld = this.indexOfCurrentWorld;
    respawnHolder.indexOfPlayerPosition = flag.indexOfPlayerPosition;
    respawnHolder.metroidvania = this.metroidvania;
    ///////////////////The Double Loops of Death//////////////////
    if (flag.specialHandler) {
        for (var i = 0; i < flag.specialHandler.levelSwitchArray.length; i++) {
            worldClassLevels[flag.specialHandler.levelSwitchArray[i].oldLevel] = worldClassLevels[flag.specialHandler.levelSwitchArray[i].shadowLevel];
        }
        this.game.state.start('story', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania, flag.specialHandler.page);
    }
};