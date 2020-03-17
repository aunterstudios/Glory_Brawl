//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (weapon, sprite) {
    if (sprite.groupName === groupBall || sprite.groupName === groupEnemy || sprite.groupName === groupWall || sprite.groupName === groupLedge) {
        if (weapon.key === 'bulletPull') {
            this.game.physics.arcade.moveToObject(sprite, this.player, 200); //200
        }
        else if (weapon.key === 'bulletPush') {
            sprite.body.velocity.x = weapon.body.velocity.x/2; //Divided By 2
            sprite.body.velocity.y = weapon.body.velocity.y/2;
        }
        else if (weapon.key === 'bulletStop') {
            sprite.body.stop();
        }
        else if (weapon.key === 'bulletKill') {
            // this.emitterFunction(sprite);
            // sprite.destroy();
            // sprite.body.velocity.x = -100;
            // sprite.body.velocity.y = 0;
            //Experimental
            // if (sprite.name === wallPlayerFrozen) {
            //     sprite.name = wallTest;
            //     sprite.body.moves = true;
            //     sprite.body.immovable = false;
            //     sprite.tint = tintRemover;
            // }
            // else if (sprite.name === wallTest) {
            //     sprite.name = wallPlayerFrozen
            //     sprite.body.moves = false;
            //     sprite.body.immovable = true;
            //     sprite.tint = tintWallBlackFrozen;
            // }
            // sprite.body.stop();
            // this.player.body.stop();
            sprite.scale.setTo(.1);

        }
    }
    weapon.kill();
};
//Let Weapon Fire Pass Through
brawl.game.prototype.weaponGhost = function (weapon, ghost) {
    if (ghost.name === wallCloud) {
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
    killBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goPush = function () {
    // console.log("2");
    this.player.tint = Phaser.Color.BLUE;
    pullBoolean = false;
    pushBoolean = true;
    stopBoolean = false;
    killBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goStop = function () {
    // console.log("3");
    this.player.tint = Phaser.Color.YELLOW;
    pullBoolean = false;
    pushBoolean = false;
    stopBoolean = true;
    killBoolean = false;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};
brawl.game.prototype.goKill = function () {
    // console.log("4");
    this.player.tint = Phaser.Color.VIOLET;
    pullBoolean = false;
    pushBoolean = false;
    stopBoolean = false;
    killBoolean = true;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};