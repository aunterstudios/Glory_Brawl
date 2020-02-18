//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Immovable/Unkillable Objects (It Dies);
brawl.game.prototype.weaponImmovable = function (weapon, wall) {
    weapon.kill();
};
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (weapon, sprite) {
    if (weapon.key === 'bulletPull') {
        this.game.physics.arcade.moveToObject(sprite, this.player, 200);
    }
    else if (weapon.key === 'bulletStop') {
        sprite.body.stop();
    }
    else if (weapon.key === 'bulletKill') {
        this.emitterFunction(sprite);
        // this.emitter.explode(1000);
        sprite.kill();
    }
    weapon.kill();
};
//Let Weapon Fire Pass Through
brawl.game.prototype.weaponGhost = function (weapon, ghost) {
    if (ghost.name === wallCloud || ghost.name === wallBlackCloud) {
        return false;
    }
    else {
        return true;
    }
};
///////////////////////////Weapon Switching/////////////////
brawl.game.prototype.goPull = function () {
    // console.log("1");
    this.player.tint = Phaser.Color.GREEN;
    pullBoolean = true;
    pushBoolean = false;
    stopBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goPush = function () {
    // console.log("2");
    this.player.tint = Phaser.Color.YELLOW;
    pullBoolean = false;
    pushBoolean = true;
    stopBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goKill = function () {
    // console.log("3");
    this.player.tint = Phaser.Color.RED;
    pullBoolean = false;
    pushBoolean = false;
    stopBoolean = true;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};