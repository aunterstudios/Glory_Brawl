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
        //Streak
        // this.pauseText = this.game.add.text(this.player.x, this.player.y, "PAUSE", { font: "32px Arial", fill: "#ffffff", align: "center" });
        // this.pauseText.fixedToCamera = true;
        // this.pauseText.cameraOffset.setTo(1200, 750);
    }
};
/////////////////////////////////////////////////Camera///////////////////////////////////////////
brawl.game.prototype.cameraPlayer = function () {
    ////////////////////////////////////////////Camera on Player///////////////////////////////////////////////////////////
    // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    this.cameraStyle = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
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
    }
    else {
        this.game.camera.unfollow();
    }
};