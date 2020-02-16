///////////////////////////Controls/////////////////////////////
brawl.game.prototype.initControls = function () {
    ////////////////////////////////Key Control Movements/////////////////////////
    //Player Movement (WASD);
    this.movementUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.movementDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.movementLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.movementRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

    //Change Weapon Fire Type
    this.pullBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.pushBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.killBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

    //Booleans to Trigger Different Weapon Types
    this.pullBullet.onDown.add(this.goPull, this);
    this.pushBullet.onDown.add(this.goPush, this);
    this.killBullet.onDown.add(this.goKill, this);

    //Fire from Keyboard
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
    this.shiftFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
};