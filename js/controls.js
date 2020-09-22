///////////////////////////Controls/////////////////////////////
brawl.game.prototype.initControls = function () {
    ////////////////////////////////Key Control Movements/////////////////////////
    //Player Movement (WASD);
    this.movementUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.movementDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.movementLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.movementRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

    //Change Weapon Fire Type
    this.weapon1Control = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.weapon2Control = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.weapon3Control = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    this.weapon4Control = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);

    //Booleans to Trigger Different Weapon Types
    this.weapon1Control.onDown.add(this.goWeapon1, this);
    this.weapon2Control.onDown.add(this.goWeapon2, this);
    this.weapon3Control.onDown.add(this.goWeapon3, this);
    this.weapon4Control.onDown.add(this.goWeapon4, this);

    //Kill Yourself
    this.killYourself = this.game.input.keyboard.addKey(Phaser.Keyboard.R);

    //Trigger Killing Yourself
    this.killYourself.onDown.add(this.killSelf, this);

    //Slow Motion
    this.slowMo = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);

    //Trigger Slow Motion
    this.slowMo.onDown.add(this.slowMotionActivate, this);

};

///////////////////////Handling Jump Events (Double-Jump)//////////////////
brawl.game.prototype.upInputReleased = function () {
    var released = false;

    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);

    return released;
};
brawl.game.prototype.upInputIsActive = function (duration) {
    var isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);

    return isActive;
};

