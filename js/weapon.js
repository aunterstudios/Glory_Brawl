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
    else if (weapon.key === 'bulletPush') {
        // sprite.body.velocity.x = sprite.body.velocity.x*-1;
        // sprite.body.velocity.y = sprite.body.velocity.y*-1;
        //Test Zero
        // console.log(weapon.body.angle, 'angle');
        // this.game.physics.arcade.velocityFromAngle(weapon.body.angle, 300, sprite.velocity);
        //Test One
        // sprite.body.stop();
        if (sprite.body.touching.up) {
            sprite.body.velocity.y = 200;
        }
        if (sprite.body.touching.down) {
            sprite.body.velocity.y = -200;
        }
        if (sprite.body.touching.left) {
            sprite.body.velocity.x = 200;
        }
        if (sprite.body.touching.right) {
            sprite.body.velocity.x = -200;
        }
        //Test Two
        // if (sprite.body.touching.up) {
        //     if (sprite.body.velocity.x < 0) {
        //         sprite.body.velocity.x = Math.abs(sprite.body.velocity.x); 
        //     }
        //     else if (sprite.body.velocity.x > 0) {
        //         sprite.body.velocity.x = -sprite.body.velocity.x;
        //     }
        //     sprite.body.velocity.x = -sprite.body.velocity.x; 
        //     sprite.body.velocity.y = 200;
        // }
        // if (sprite.body.touching.down) {
        //     if (sprite.body.velocity.x < 0) {
        //         sprite.body.velocity.x = Math.abs(sprite.body.velocity.x); 
        //     }
        //     else if (sprite.body.velocity.x > 0) {
        //         sprite.body.velocity.x = -sprite.body.velocity.x;
        //     }
        //     sprite.body.velocity.y = -200;
        // }
        // if (sprite.body.touching.left) {
        //     if (sprite.body.velocity.y < 0) {
        //         sprite.body.velocity.y = Math.abs(sprite.body.velocity.y); 
        //     }
        //     else if (sprite.body.velocity.y > 0) {
        //         sprite.body.velocity.y = -sprite.body.velocity.y;
        //     }
        //     sprite.body.velocity.x = 200;
        // }
        // if (sprite.body.touching.right) {
        //     if (sprite.body.velocity.y < 0) {
        //         sprite.body.velocity.y = Math.abs(sprite.body.velocity.y); 
        //     }
        //     else if (sprite.body.velocity.y > 0) {
        //         sprite.body.velocity.y = -sprite.body.velocity.y;
        //     }
        //     sprite.body.velocity.x = -200;
        // }

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
    if (ghost.name === wallCloud || ghost.name === wallBlackTrap) {
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
    this.player.tint = Phaser.Color.RED;
    pullBoolean = false;
    pushBoolean = false;
    stopBoolean = false;
    killBoolean = true;
    // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
};