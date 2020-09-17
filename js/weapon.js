//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (weapon, sprite) {
    if (sprite.groupName === groupBall || sprite.groupName === groupEnemy || sprite.groupName === groupWall || sprite.groupName === groupLedge) {
        if (weapon.key === 'bulletPull') {
            // if (cameraBoolean) {
            //     this.game.physics.arcade.moveToObject(sprite, this.player, 200);
            // }
            // else {
            //     // sprite.body.velocity.setTo(weapon.body.velocity.x / 4, weapon.body.velocity.y / 4);
            //     this.game.physics.arcade.moveToObject(sprite, this.player, 600);

            // }
            // this.game.physics.arcade.moveToPointer(sprite, 400)
            if (cameraBoolean) {
                this.game.physics.arcade.moveToObject(sprite, this.player, 300);
            }
            else {
                this.game.physics.arcade.moveToObject(sprite, this.player, 300, 1000);
            }
        }
        else if (weapon.key === 'bulletPush') {
            sprite.body.velocity.setTo(weapon.body.velocity.x / 2, weapon.body.velocity.y / 2);
        }
        else if (weapon.key === 'bulletStop') {
            sprite.body.stop();
        }
    }
    weapon.kill();
};
//Let Weapon Fire Pass Through
brawl.game.prototype.weaponProcessArgument = function (weapon, ghost) {
    if (ghost.name === wallCloud.name || ghost.name === undeniableDeathGhost.name) {
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