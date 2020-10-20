//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (bullet, sprite) {
    if (sprite.groupName === groupBall || sprite.groupName === groupEnemy || sprite.groupName === groupWall || sprite.groupName === groupLedge || sprite.groupName === groupFlagPhysics) {
        /////////////////Basic OG Gun Set/////////////////
        if (bullet.name === 'pull') {
            this.game.physics.arcade.moveToObject(sprite, this.player, bullet.powerOne);
        }
        else if (bullet.name === 'push') {
            sprite.body.velocity.setTo(bullet.body.velocity.x / bullet.powerOne, bullet.body.velocity.y / bullet.powerOne);
        }
        else if (bullet.name === 'stop') {
            sprite.body.stop();
        }
        else if (bullet.name === 'kill') {
            if (sprite.generationType === 'timer') {
                this.emitterFunction(sprite, null, 'kill');
            }
            else {
                this.emitterFunction(sprite, null, 'destroy');

            }
        }
        ////////////////////Directional Guns//////////////////
        else if (bullet.name === 'up') {
            sprite.body.velocity.y = -bullet.powerOne;
        }
        else if (bullet.name === 'down') {
            sprite.body.velocity.y = bullet.powerOne;

        }
        else if (bullet.name === 'left') {
            sprite.body.velocity.x = -bullet.powerOne;
        }
        else if (bullet.name === 'right') {
            sprite.body.velocity.x = bullet.powerOne;
        }
    }
    bullet.kill();
};
//Let Weapon Fire Pass Through
brawl.game.prototype.weaponProcess = function (weapon, ghost) {
    if (ghost.name === wallCloud.name || ghost.name === deathGhost.name || ghost.groupName === groupFlag) {
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