//////////////////////////Creation of the World/////////////////////////////////
brawl.game.prototype.worldCreator = function (levelGenerator) {
    /////////////////////Testing Entirety of Level/////////////////
    // console.log(levelGenerator);
    ////////////////////Adding Player//////////////////////
    this.player = this.game.add.sprite(levelGenerator.playerPosition[this.indexOfPlayerPosition].x, levelGenerator.playerPosition[this.indexOfPlayerPosition].y, 'player');
    this.game.physics.arcade.enable(this.player); //enables physics for player
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(levelGenerator.playerScale);
    if (this.game.stage.backgroundColor !== 0) {
        this.player.tint = Phaser.Color.BLACK;
    }
    this.player.body.setSize(34, 55.5, 15, 7);
    // this.player.body.mass = 1; //6
    this.player.body.mass = 15; //6
    this.player.body.gravity.y = this.playerGravityY;
    if (levelGenerator.outOfBounds) {
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(this.playerOut, this);
    }
    else {
        this.player.body.collideWorldBounds = true;
    }

    // PLAYER ANIMATIONS
    this.player.animations.add('left', [7, 8, 9], 10, true);
    this.player.animations.add('upsideDownLeft', [4, 5, 6], 10, true);
    this.player.animations.add('right', [13, 14, 15], 10, true);
    this.player.animations.add('upsideDownRight', [10, 11, 12], 10, true);

    //Camera Indicator
    this.cameraImage = this.game.add.image(0, 0, 'camera');
    this.cameraImage.fixedToCamera = true;
    this.cameraImage.cameraOffset.setTo(300, 150);
    //Kill Right Away To Remove it From View Then to Revive
    this.cameraImage.kill();

    ///////////////////////Player Stats/////////////////////////////
    this.playerStats = [
        new PlayerStatsText('Speed', this.playerSpeed),
        new PlayerStatsText('Jump', this.playerJump),
        new PlayerStatsText('GravityX', this.playerGravityX),
        new PlayerStatsText('GravityY', this.playerGravityY),
        new PlayerStatsText('Jumps', this.playerDoubleJumps),
        new PlayerStatsText('WallJumpX', this.playerWallJumpX),
        new PlayerStatsText('WallJumpY', this.playerWallJumpY),
        new PlayerStatsText('Stickiness', this.playerStickiness),
        new PlayerStatsText('Punch', this.playerDownwards),
    ]

    for (var i = 0; i < this.playerStats.length; i++) {
        // this.playerStatsText = this.game.add.bitmapText(0, 0, fontLogan, this.playerStats[i].name + " " + this.playerStats[i].value, 24);
        // this.playerStatsText.fixedToCamera = true;
        // this.playerStatsText.cameraOffset.setTo(60, i * 20 + 50);
        // this.playerStatsText.tint = this.playerStatsColor;
        this['playerStatsText' + this.playerStats[i].name] = this.game.add.bitmapText(0, 0, fontLogan, this.playerStats[i].name + " " + this.playerStats[i].value, 24);
        this['playerStatsText' + this.playerStats[i].name].fixedToCamera = true;
        this['playerStatsText' + this.playerStats[i].name].cameraOffset.setTo(60, i * 20 + 50);
        this['playerStatsText' + this.playerStats[i].name].tint = this.playerStatsColor;
    }

    ///////////////////////Slow Motion Indicator////////////////////
    this.slowMotionArray = [];
    for (var i = 0; i < slowMotionLimit; i++) {
        // this.slowMotionFollow = this.imageGroup.create(0, 0, slowMotion);
        // this.slowMotionFollow = this.imageGroup.create(this.player.x + (i * 40), this.player.y - 50, slowMotion);
        this.slowMotionFollow = this.slowMotionGroup.create(i * 100 + 50, 6208, slowMotion);
        this.slowMotionFollow.fixedToCamera = true;
        this.slowMotionFollow.cameraOffset.setTo(i * 100 + 50, 800);
        this.slowMotionFollow.name = slowMotion;
        // this.slowMotionFollow.fixedToCamera = true;
        this.slowMotionArray.push(this.slowMotionFollow);
    }

    //////////////////Adding Weapons////////////////////
    //Initializing Weapons
    for (var i = 1; i < 5; i++) {
        this["weapon" + i] = this.game.add.weapon(30, 'bulletOne');
    }

    //Creating The Weapons
    for (var i = 0; i < this.weaponAllHolder.length; i++) {
        // console.log(this.weaponAllHolder[i]);
        if (this.weaponAllHolder[i]) {
            //Making the Array Make Sense
            var weaponNumber = i + 1;
            // Name
            this['weapon' + weaponNumber].bullets.setAll('name', this.weaponAllHolder[i].name);
            // Tint
            this['weapon' + weaponNumber].bullets.setAll('tint', this.weaponAllHolder[i].tint);
            // Power One
            this['weapon' + weaponNumber].bullets.setAll('powerOne', this.weaponAllHolder[i].powerOne, false, false, 0, true);
            // The bullet will be automatically killed when it leaves the camera bounds
            this['weapon' + weaponNumber].bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
            //  Because our bullet is drawn facing up, we need to offset its rotation:
            this['weapon' + weaponNumber].bulletAngleOffset = 90;
            // The speed at which the bullet is fired
            this['weapon' + weaponNumber].bulletSpeed = this.weaponAllHolder[i].weaponBulletSpeed;
            // Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
            this['weapon' + weaponNumber].fireRate = this.weaponAllHolder[i].weaponFireRate;
            // Track Player
            this['weapon' + weaponNumber].trackSprite(this.player, 0, 0);
            ///////////////Adding Text///////////////
            if (this.weaponAllHolder[i].powerOne) {
                this['weapon' + weaponNumber + 'text'] = this.game.add.bitmapText(0, 0, fontLogan, weaponNumber + "." + this.weaponAllHolder[i].name + " " + this.weaponAllHolder[i].powerOne, 24);
            }
            else {
                this['weapon' + weaponNumber + 'text'] = this.game.add.bitmapText(0, 0, fontLogan, weaponNumber + "." + this.weaponAllHolder[i].name, 24);
            }
            this['weapon' + weaponNumber + 'text'].tint = this.weaponAllHolder[i].tint;
            this['weapon' + weaponNumber + 'text'].fixedToCamera = true;
            this['weapon' + weaponNumber + 'text'].cameraOffset.setTo(1450, i * 25 + 80);
        }
    }
    
    ////////////////////////////Image Creation/////////////////////////
    if ('imageSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.imageSpawn.length; i++) {
            if (levelGenerator.imageSpawn[i].trigger) {
                this.imageSpawn(levelGenerator.imageSpawn[i], i);
            }
        }
    }
    ///////////////////////////Sprite Generation in World/////////////////////////////
    //Experimental But Hopefully The Truth
    for (var i = 0; i < levelGenerator.spriteSpawn.length; i++) {
        if (levelGenerator.spriteSpawn[i].trigger) {
            if (!levelGenerator.spriteSpawn[i].time) {
                this.spriteGen(levelGenerator.spriteSpawn[i], i);
            }
            else if (levelGenerator.spriteSpawn[i].time.timerType === 'loop') {
                this.game.time.events.loop(Phaser.Timer.SECOND * levelGenerator.spriteSpawn[i].time.seconds, this.spriteGen, this, levelGenerator.spriteSpawn[i], i);
            }
            else if (levelGenerator.spriteSpawn[i].time.timerType === 'repeat') {
                this.game.time.events.repeat(Phaser.Timer.SECOND * levelGenerator.spriteSpawn[i].time.seconds, levelGenerator.spriteSpawn[i].time.repeatAmount, this.spriteGen, this, levelGenerator.spriteSpawn[i], i);
            }
        }
    }
    ////////////////////(Respawn)Flag//////////////////
    if ('flagSpawn' in levelGenerator) {
        for (var i = 0; i < levelGenerator.flagSpawn.length; i++) {
            if (levelGenerator.flagSpawn[i].trigger) {
                this.flagSpawn(levelGenerator.flagSpawn[i], i);
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

    ///////////////////World Level Physics///////////////
    if (levelGenerator.specialLevel) {
        if (levelGenerator.specialLevel.name === 'timed') {
            this.timerSpecialLevel = this.game.time.events.add(Phaser.Timer.SECOND * levelGenerator.specialLevel.seconds, this.specialLevelSwitch, this, levelGenerator.specialLevel.indexWorld, levelGenerator.specialLevel.indexOfPlayerPosition, levelGenerator.specialLevel.page)
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
    if (player.y <= 0) {
        this.game.state.restart(true, false, this.metroidvania.roomUpIndex, 1);
    }
    //Left
    else if (player.x <= 0) {
        this.game.state.restart(true, false, this.metroidvania.roomLeftIndex, 3);
    }
    //Right
    else if (player.x >= this.xOfWorld) {
        this.game.state.restart(true, false, this.metroidvania.roomRightIndex, 2);
    }
    //Down
    else if (player.y >= this.yOfWorld) {
        this.game.state.restart(true, false, this.metroidvania.roomDownIndex, 0);
    }

};

///////////////////////////////////////////State Switches////////////////////////////////
//Character Dying From Enemies and Such
brawl.game.prototype.playerDeath = function (victim, killer) {
    this.shakeFlash();
    this.emitterFunction(victim, null, 'kill');
    if (this.timerSpecialLevel) {
        this.game.time.events.remove(this.timerSpecialLevel);
    }
    this.game.time.events.add(1000, this.deathSwitch, this);
};
//Killing Yourself Literally
brawl.game.prototype.killSelf = function () {
    this.shakeFlash();
    this.emitterFunction(this.player, null, 'kill');
    if (this.timerSpecialLevel) {
        this.game.time.events.remove(this.timerSpecialLevel);
    }
    this.game.time.events.add(1000, this.deathSwitch, this);
};
//Death Switch
brawl.game.prototype.deathSwitch = function () {
    this.game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition);
};

//Special Level Switch (No Flag)
brawl.game.prototype.specialLevelSwitch = function (indexLevel, playerPosition, page) {
    this.game.state.start('story', true, false, indexLevel, playerPosition, page)
};

//Character Respawn
brawl.game.prototype.respawn = function (player, flag) {
    //////////////////////Respawn Checkpoint of Current Level/////////////////
    flag.destroy();
    respawnHolder.indexOfCurrentWorld = this.indexOfCurrentWorld;
    respawnHolder.indexOfPlayerPosition = flag.indexOfPlayerPosition;
    ///////////////////The Double Loops of Death AKA Level Changes Initiated by Flag//////////////////
    if (flag.specialHandler) {
        ////////////////////////////Completely Replaces a Level//////////////////////////
        if (flag.specialHandler.name === 'shadowLevel') {
            for (var i = 0; i < flag.specialHandler.levelSwitchArray.length; i++) {
                worldClassLevels[flag.specialHandler.levelSwitchArray[i].oldLevel] = worldClassLevels[flag.specialHandler.levelSwitchArray[i].shadowLevel];
            }
        }
        /////////////////////////Triggers Certain Sprites On and Off/////////////////////
        if (flag.specialHandler.name === 'spriteLevelSwitch') {
            for (var i = 0; i < flag.specialHandler.insertIndex.length; i++) {
                for (var j = 0; j < flag.specialHandler.insertSprite.length; j++) {
                    worldClassLevels[flag.specialHandler.insertIndex[i]].spriteSpawn[flag.specialHandler.insertSprite[j]].trigger = true;
                }
            }
            for (var i = 0; i < flag.specialHandler.removeIndex.length; i++) {
                for (var j = 0; j < flag.specialHandler.removeSprite.length; j++) {
                    worldClassLevels[flag.specialHandler.removeIndex[i]].spriteSpawn[flag.specialHandler.removeSprite[j]].trigger = false;
                }
            }
        }
        this.game.state.start('story', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, flag.specialHandler.page);
    }
};