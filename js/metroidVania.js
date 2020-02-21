//////////////////////////Creation of the World/////////////////////////////////
brawl.game.prototype.worldCreator = function (levelGenerator) {
    /////////////////////Testing Entirety of Level/////////////////
    // console.log(levelGenerator);
    ////////////////////Adding Player//////////////////////
    this.player = this.game.add.sprite(levelGenerator.playerPosition[this.indexOfPlayerPosition].x, levelGenerator.playerPosition[this.indexOfPlayerPosition].y, 'player');
    this.game.physics.arcade.enable(this.player); //enables physics for player
    this.player.anchor.setTo(.5);
    // this.player.scale.setTo(.6);
    this.player.scale.setTo(.35);
    this.player.tint = Phaser.Color.GREEN;
    // this.player.alpha = this.game.rnd.realInRange(.5, 1);
    // this.player.tint = Phaser.Color.getRandomColor(50, 255, 255);
    // this.player.body.setSize(63, 84, 5, 6);
    // this.player.body.bounce.y = 0;
    this.player.body.mass = 6; //6
    this.player.body.gravity.y = 1500;
    //this.player.body.allowDrag = false;
    // this.player.body.collideWorldBounds = true;
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(this.playerOut, this);

    // // PLAYER ANIMATIONS
    // this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    // this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

    //////////////////Adding Weapons////////////////////
    /////////////Pull as Default
    pullBoolean = true;
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon1 = this.game.add.weapon(30, 'bulletPull');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon1.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon1.bulletSpeed = 500;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon1.fireRate = 500;
    //Size of Bullet
    // this.weapon1.setBulletBodyOffset(5,2,-20,0); //setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)
    // Track Player
    this.weapon1.trackSprite(this.player, 0, 0);

    /////////////////Push
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon2 = this.game.add.weapon(weaponBulletAmount, 'bulletStop');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon2.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon2.bulletSpeed = weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon2.fireRate = weaponFireRate;
    //Match Your Velocity?
    // Track Player
    this.weapon2.trackSprite(this.player, 0, 0);

    ////////////////Stop
    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon3 = this.game.add.weapon(weaponBulletAmount, 'bulletKill');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.weapon3.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.weapon3.bulletSpeed = weaponBulletSpeed;
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon3.fireRate = weaponFireRate;
    // Track Player
    this.weapon3.trackSprite(this.player, 0, 0);

    // - 20 for Tracking//

    ///////////////////////////Sprite Generation in World/////////////////////////////
    // Generating Undeniable Death
    if ('undeniableDeathSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.undeniableDeathSpawn.length; i++) {
            if (levelGenerator.undeniableDeathSpawn[i].trigger) {
                this.undeniableDeathSpawn(levelGenerator.undeniableDeathSpawn[i]);
            }
        }
    }
    //Generating Immovable Walls
    if ('immovableWallSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.immovableWallSpawn.length; i++) {
            if (levelGenerator.immovableWallSpawn[i].trigger) {
                this.immovableWallSpawn(levelGenerator.immovableWallSpawn[i]);
            }
        }
    }
    //Generating movable Walls
    if ('wallSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.wallSpawn.length; i++) {
            if (levelGenerator.wallSpawn[i].trigger) {
                this.wallSpawn(levelGenerator.wallSpawn[i]);
            }
        }
    }
    //Generating Ledges
    if ('ledgeSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.ledgeSpawn.length; i++) {
            if (levelGenerator.ledgeSpawn[i].trigger) {
                this.ledgeSpawn(levelGenerator.ledgeSpawn[i]);
            }
        }
    }
    //Generating enemies (Tabled For Now)
    if ('enemySpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.enemySpawn.length; i++) {
            if (levelGenerator.enemySpawn[i].trigger) {
                this.enemySpawn(levelGenerator.enemySpawn[i]);
            }
        }
    }
    //Generating balls ledges
    if ('ballSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.ballSpawn.length; i++) {
            if (levelGenerator.ballSpawn[i].trigger) {
                this.ballSpawn(levelGenerator.ballSpawn[i]);
            }
        }
    }
    ///////////////////(Falling Spikes)////////////////
    if ('fallingSpikes' in levelGenerator) {
        for (var i = 0; i < levelGenerator.fallingSpikes.length; i++) {
            if (levelGenerator.fallingSpikes[i].trigger) {
                this.game.time.events.loop(Phaser.Timer.SECOND * levelGenerator.fallingSpikes[i].seconds, this.spikeFall, this, levelGenerator.fallingSpikes[i]);
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
                this.textCreator(levelGenerator.text[i]);
            }
        }
    }

    ///////////////////Debugging Purposes (Knowing The Placement of Each Sprites)/////////////////////////
    // var distanceOfXandY = 200;
    // var xIterator = Math.round(levelGenerator.xOfWorld / distanceOfXandY);
    // var yIterator = Math.round(levelGenerator.yOfWorld / distanceOfXandY);

    // for (var x = 1; x < xIterator; x++) {
    //     for (var y = 1; y < yIterator; y++) {
    //         this.text = this.game.add.text(x*distanceOfXandY, y*distanceOfXandY, x*distanceOfXandY+'X'+y*distanceOfXandY+'Y', { font: "10px Arial", fill: "#ff0000", align: "center" });
    //     }
    // }

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
//Character Dying
brawl.game.prototype.deathState = function (victim, killer) {
    victim.kill();
    this.emitterFunction(victim);
    this.game.time.events.add(1000, this.deathSwitch, this);
    // this.game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania);
};
//State Switch
brawl.game.prototype.deathSwitch = function () {
    this.game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania);
},
//Character Respawn
brawl.game.prototype.respawn = function (player, flag) {
    flag.kill();
    respawnHolder.indexOfCurrentWorld = this.indexOfCurrentWorld;
    respawnHolder.indexOfPlayerPosition = flag.indexOfPlayerPosition;
    respawnHolder.metroidvania = this.metroidvania;
    ///////////////////The Double Loops of Death//////////////////
    if (flag.specialHandler) {
        if ('undeniableDeathRemove' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.undeniableDeathRemove[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].undeniableDeathSpawn[flag.specialHandler.undeniableDeathRemove[i][j]].trigger = false;
                }
            }
        }
        if ('immovableWallRemove' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.immovableWallRemove[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].immovableWallSpawn[flag.specialHandler.immovableWallRemove[i][j]].trigger = false;
                }
            }
        }
        if ('enemyRemove' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.enemyRemove[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].enemySpawn[flag.specialHandler.enemyRemove[i][j]].trigger = false;
                }
            }
        }
        if ('enemyInsert' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.enemyInsert[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].enemySpawn[flag.specialHandler.enemyInsert[i][j]].trigger = true;
                }
            }
        }
        if ('fallingSpikesInsert' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.fallingSpikesInsert[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].fallingSpikes[flag.specialHandler.fallingSpikesInsert[i][j]].trigger = true;
                }
            }
        }
        if ('textInsert' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.textInsert[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].text[flag.specialHandler.textInsert[i][j]].trigger = true;
                }
            }
        }
        if ('textRemove' in flag.specialHandler) {
            for (var i = 0; i<flag.specialHandler.specialWorld.length; i++) {
                for (var j = 0; j<flag.specialHandler.textRemove[i].length; j++) {
                    worldClassLevels[flag.specialHandler.specialWorld[i]].text[flag.specialHandler.textRemove[i][j]].trigger = false;
                }
            }
        }
        if ('storyTrigger' in flag.specialHandler) {
            worldClassLevels[flag.specialHandler.storyTrigger.level].backgroundColor = flag.specialHandler.storyTrigger.backgroundColor;
            this.game.state.start('story', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania, flag.specialHandler.storyTrigger.page);
        }
    }
};