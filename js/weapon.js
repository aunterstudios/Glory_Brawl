//////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
//When Weapon Hits Moveable Objects (It's Special Property Expressed)
brawl.game.prototype.weaponHandler = function (bullet, sprite) {
    if (sprite.groupName === groupBall || sprite.groupName === groupEnemy || sprite.groupName === groupWall || sprite.groupName === groupLedge || sprite.groupName === groupFlagPhysics) {
        /////////////////Basic OG Gun Set/////////////////
        if (bullet.name === 'pull' && !sprite.name === 'immovable') {
            this.game.physics.arcade.moveToObject(sprite, this.player, bullet.powerOne);
        }
        else if (bullet.name === 'push' && !sprite.name === 'immovable') {
            sprite.body.velocity.setTo(bullet.body.velocity.x / bullet.powerOne, bullet.body.velocity.y / bullet.powerOne);
        }
        else if (bullet.name === 'stop' && !sprite.name === 'immovable') {
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
        //Set One (Momentum Set to Zero)
        else if (bullet.name === 'upZero' && !sprite.name === 'immovable') {
            // sprite.body.velocity.y = -bullet.powerOne;
            sprite.body.velocity.setTo(0, -bullet.powerOne);
        }
        else if (bullet.name === 'downZero' && !sprite.name === 'immovable') {
            // sprite.body.velocity.y = bullet.powerOne;
            sprite.body.velocity.setTo(0, bullet.powerOne);
        }
        else if (bullet.name === 'leftZero' && !sprite.name === 'immovable') {
            // sprite.body.velocity.x = -bullet.powerOne;
            sprite.body.velocity.setTo(bullet.powerOne, 0);
        }
        else if (bullet.name === 'rightZero' && !sprite.name === 'immovable') {
            // sprite.body.velocity.x = bullet.powerOne;
            sprite.body.velocity.setTo(-bullet.powerOne, 0);
        }
        //Set Two (Momentum Continued)
        else if (bullet.name === 'up' && !sprite.name === 'immovable') {
            sprite.body.velocity.y = -bullet.powerOne;
        }
        else if (bullet.name === 'down' && !sprite.name === 'immovable') {
            sprite.body.velocity.y = bullet.powerOne;
        }
        else if (bullet.name === 'left' && !sprite.name === 'immovable') {
            sprite.body.velocity.x = -bullet.powerOne;
        }
        else if (bullet.name === 'right' && !sprite.name === 'immovable') {
            sprite.body.velocity.x = bullet.powerOne;
        }
        //////////////////////////Gravity Guns//////////////////////
        else if (bullet.name === 'gravity' && !sprite.name === 'immovable') {
            if (sprite.body.gravity.y < 1500) {
                sprite.body.gravity.y += bullet.powerOne;
                // console.log(sprite.body.gravity.y, 'gravity');
            }
        }
        else if (bullet.name === 'antiGravity' && !sprite.name === 'immovable') {
            if (sprite.body.gravity.y > -1500) {
                sprite.body.gravity.y -= bullet.powerOne;
                // console.log(sprite.body.gravity.y, 'AntiGravity');
            }
        }
        else if (bullet.name === 'gravityLeft' && !sprite.name === 'immovable') {
            if (sprite.body.gravity.x > -1500) {
                sprite.body.gravity.x -= bullet.powerOne;
                // console.log(sprite.body.gravity.y, 'AntiGravity');
            }
        }
        else if (bullet.name === 'gravityRight' && !sprite.name === 'immovable') {
            if (sprite.body.gravity.x < 1500) {
                sprite.body.gravity.x += bullet.powerOne;
                // console.log(sprite.body.gravity.y, 'gravity');
            }
        }
        //////////////////////Immovable///////////////////////
        else if (bullet.name === 'immovable') {
            if (sprite.body.immovable) {
                sprite.body.stop();
                sprite.body.immovable = false;
                // sprite.body.moves = true;
                sprite.name = sprite.nameSave;
                sprite.tint = sprite.originalTint;
                // sprite.tint = Phaser.Color.getRandomColor();
            }
            else {
                sprite.body.stop();
                sprite.body.immovable = true;
                // sprite.body.moves = false;
                sprite.name = 'immovable';
                sprite.tint = tintWallPlayerFrozen;
            }
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