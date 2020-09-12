/////////////////////////////Initializing Full Screen Mode/////////////////////
brawl.game.prototype.createFullScreen = function () {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
    this.fullSize.onDown.add(this.gofull, this);
};

/////////////////////////////Creating Pause/////////////////////
brawl.game.prototype.createPause = function () {
    //Pause Menu (Freeze TIME LOL)
    this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.pause.onDown.add(this.goPause, this);
};
/////////////////////////////Put the Game on Full Screen Mode/////////////////////
brawl.game.prototype.gofull = function () {
    if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
    }
    else {
        this.game.scale.startFullScreen(false);
    }
};
///////////////////////////Pausing the Game///////////////////
brawl.game.prototype.goPause = function () {
    if (this.game.paused) {
        this.game.paused = false;
    }
    else {
        this.game.paused = true;
    }
};
/////////////////////////////////////////////////Camera///////////////////////////////////////////
brawl.game.prototype.cameraPlayer = function () {
    ////////////////////////////////////////////Camera on Player///////////////////////////////////////////////////////////
    // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    //Toggle Camera
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
    this.cameraStyle = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.cameraStyle.onDown.add(this.cameraChange, this);
};
brawl.game.prototype.cameraChange = function () {
    if (cameraBoolean) {
        cameraBoolean = false;
    }
    else {
        cameraBoolean = true;
    }
    if (cameraBoolean) {
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.cameraImage.kill();
        //Change Weapon Values
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapon1.fireRate = nenHolder.weaponFireRate;
        this.weapon1.bulletSpeed = nenHolder.weaponBulletSpeed;

        this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapon2.fireRate = nenHolder.weaponFireRate;
        this.weapon2.bulletSpeed = nenHolder.weaponBulletSpeed;

        this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapon3.fireRate = nenHolder.weaponFireRate;
        this.weapon3.bulletSpeed = nenHolder.weaponBulletSpeed;
    }
    else {
        this.game.camera.unfollow();
        this.cameraImage.revive();
        //Change Weapon Values (Activates Sniper Mode)
        // this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        // this.weapon1.fireRate = nenHolder.weaponFireRate / 2;
        // this.weapon1.bulletSpeed = nenHolder.weaponBulletSpeed * 2;
        
        // this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        // this.weapon2.fireRate = nenHolder.weaponFireRate / 2;
        // this.weapon2.bulletSpeed = nenHolder.weaponBulletSpeed * 2;

        // this.weapon3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        // this.weapon3.fireRate = nenHolder.weaponFireRate / 2;
        // this.weapon3.bulletSpeed = nenHolder.weaponBulletSpeed * 2;
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon1.fireRate = nenHolder.weaponFireRate / 3;
        this.weapon1.bulletSpeed = nenHolder.weaponBulletSpeed * 3;
        
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon2.fireRate = nenHolder.weaponFireRate / 3;
        this.weapon2.bulletSpeed = nenHolder.weaponBulletSpeed * 3;

        this.weapon3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon3.fireRate = nenHolder.weaponFireRate / 3;
        this.weapon3.bulletSpeed = nenHolder.weaponBulletSpeed * 3;
    }
};
///////////////////////////////////////////////Fps///////////////////////////////////////////////////
brawl.game.prototype.handleFpsProblem = function () {
    // modify the game desired fps to match the current suggested fps
    this.game.time.desiredFps = this.game.time.suggestedFps;
    // console.log("Working baby fps");
};

///////////////////////////////////////////////Slow Motion///////////////////////////////////////////
brawl.game.prototype.slowMotionActivate = function () {
    if (slowMotionLimit > 0) {
        slowMotionLimit--;
        this.slowMotionGroup.remove(this.slowMotionArray[slowMotionLimit]);
        if (this.game.time.slowMotion === 3.0) {
            this.game.time.events.remove(timerEvents[0]);
        }
        this.game.time.desiredFps = 180;
        // this.game.time.desiredFps = this.game.time.suggestedFps * 3;
        // this.game.time.desiredFps = setFps*3;
        this.game.time.slowMotion = 3.0;
        timerEvents[0] = this.game.time.events.add(5000, this.slowMotionStop, this); //7 seconds was original
    }
};

brawl.game.prototype.slowMotionStop = function () {
    this.game.time.desiredFps = 60;
    // this.game.time.desiredFps = setFps;
    // this.game.time.desiredFps = this.game.time.suggestedFps;
    this.game.time.slowMotion = 1.0;
};