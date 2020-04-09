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
            //Regular Walls
            if (sprite.name === wallRegular) {
                sprite.name = wallRegularKiller;
                sprite.tint = 8494971.358153213;
            }
            else if (sprite.name === wallRegularKiller) {
                sprite.name = wallRegular;
                sprite.tint = tintRemover;
            }
            //Surf Walls
            if (sprite.name === wallSurf) {
                sprite.name = wallSurfKiller;
                sprite.tint = tintWallSurfKiller;
            }
            else if (sprite.name === wallSurfKiller) {
                sprite.name = wallSurf;
                sprite.tint = tintWallSurf;
            }
            //Inverse Walls
            if (sprite.name === wallInverse) {
                sprite.name = wallInverseKiller;
                sprite.tint = tintWallInverseKiller;
            }
            else if (sprite.name === wallInverseKiller) {
                sprite.name = wallInverse;
                sprite.tint = tintWallInverse;
            }
            //Ghost Walls
            if (sprite.name === wallGhost) {
                sprite.name = wallGhostKiller;
                sprite.scale.setTo(sprite.scale.x/3, sprite.scale.y/3);
            }
            else if (sprite.name === wallGhostKiller) {
                sprite.name = wallGhost;
                sprite.scale.setTo(sprite.scale.x*3, sprite.scale.y*3);
            }
        }
    }
    weapon.kill();
};
//Let Weapon Fire Pass Through
brawl.game.prototype.weaponProcessArgument = function (weapon, ghost) {
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