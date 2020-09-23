//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (weapon, sprite) {
    if (sprite.groupName === groupBall || sprite.groupName === groupEnemy || sprite.groupName === groupWall || sprite.groupName === groupLedge) {
        if (weapon.name === 'pull') {
            this.game.physics.arcade.moveToObject(sprite, this.player, weapon.powerOne);
        }
        else if (weapon.name === 'push') {
            sprite.body.velocity.setTo(weapon.body.velocity.x / weapon.powerOne, weapon.body.velocity.y / weapon.powerOne);
        }
        else if (weapon.name === 'stop') {
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
brawl.game.prototype.goWeapon1 = function () {
    // console.log("1");
    if (this.weapon1Holder) {
        this.player.tint = this.weapon1Holder.tint;
        weapon1Boolean = true;
        weapon2Boolean = false;
        weapon3Boolean = false;
        weapon4Boolean = false;
    }
    // console.log("Pull: " + weapon1Boolean + " Push: " + weapon2Boolean + " Kill: " + weapon3Boolean);
};
brawl.game.prototype.goWeapon2 = function () {
    // console.log("2");
    if (this.weapon2Holder) {
        this.player.tint = this.weapon2Holder.tint;
        weapon1Boolean = false;
        weapon2Boolean = true;
        weapon3Boolean = false;
        weapon4Boolean = false;
    }
    // console.log("Pull: " + weapon1Boolean + " Push: " + weapon2Boolean + " Kill: " + weapon3Boolean);
};
brawl.game.prototype.goWeapon3 = function () {
    // console.log("3");
    if (this.weapon3Holder) {
        this.player.tint = this.weapon3Holder.tint;
        weapon1Boolean = false;
        weapon2Boolean = false;
        weapon3Boolean = true;
        weapon4Boolean = false;
    }
    // console.log("Pull: " + weapon1Boolean + " Push: " + weapon2Boolean + " Kill: " + weapon3Boolean);
};
brawl.game.prototype.goWeapon4 = function () {
    // console.log("4");
    if (this.weapon4Holder) {
        this.player.tint = this.weapon4Holder.tint;
        weapon1Boolean = false;
        weapon2Boolean = false;
        weapon3Boolean = false;
        weapon4Boolean = true;
    }
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};