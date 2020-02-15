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
},
/////////////////////////////////////////////////Camera///////////////////////////////////////////
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