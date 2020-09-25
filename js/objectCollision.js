//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.trapProjectiles = function (trapProjectiles, obstacles) {
    trapProjectiles.kill();
    if (obstacles.name === 'immovableWallPhase') {
        this.emitterFunction(obstacles, trapProjectiles, 'destroy');
        if (obstacles.specialCondition) {
            if (obstacles.specialCondition.name === scLocalizedDestruction.name) {
                //Destruction of Localized Sprite
                worldClassLevels[this.indexOfCurrentWorld].spriteSpawn[obstacles.positionInArray].trigger = false;
            }
        }
    }
};

//Immovable Objects vs. Themselves
brawl.game.prototype.immoVsSelf = function (immovable1, immovable2) {
    ////////////More Special Interactions to Come//////////////
    //Reverses The Velocity's of the Object
    if (immovable1.specialCondition) {
        if (immovable1.specialCondition.name === scReverseVelocity.name) {
            var x = immovable1.body.velocity.x * -1;
            var y = immovable1.body.velocity.y * -1;
            immovable1.body.velocity.setTo(x, y);
        }
    }
    return;
};

//Immovable Objects vs. Moveable Objects
brawl.game.prototype.immoVsMov = function (immovable, moveable) {
    ////////////////////Physics of Immoveable Against Ball or Ledge or Enemy////////////
    // if (immovable.body.touching.up) {
    //     moveable.body.velocity.y = -200;
    // }
    // else if (immovable.body.touching.down) {
    //     moveable.body.velocity.y = 200;
    // }
    // else if (immovable.body.touching.left) {
    //     moveable.body.velocity.x = -200;
    // }
    // else if (immovable.body.touching.right) {
    //     moveable.body.velocity.x = 200;
    // }
    /////////////////////Immovable Wall Effects Against Moveable////////////////////
    if (immovable.name === immovableWallKillWall.name || immovable.body.speed > 0 || moveable.elevatorActivate) {
        this.emitterFunction(moveable, null, 'destroy');

    }
    // ////////////////////Moveable Effects Against Immovable///////////////
    if (immovable.name === undeniableDeathBallKill.name && moveable.groupName === groupBall) {
        this.emitterFunction(immovable, moveable, 'destroy');
        //Removes Localized Sprites from Regenerating (Spikes)
        if (immovable.specialCondition) {
            if (immovable.specialCondition.name === scLocalizedDestruction.name) {
                //Destruction of Localized Sprite
                worldClassLevels[this.indexOfCurrentWorld].spriteSpawn[immovable.positionInArray].trigger = false;
            }
        }
    }
    return;
};

//Wall Against Moveable Objects
brawl.game.prototype.wallVsMov = function (wall, mov) {
    ///////////////Actual Collision Physics/////////////
    if (mov.groupName === groupEnemy) {
        mov.name = 'enemyWall';
        mov.tint = tintRemover;
    }
    if (wall.body.touching.up) {
        mov.body.velocity.y = -300;
    }
    else if (wall.body.touching.down) {
        mov.body.velocity.y = 300;
    }
    else if (wall.body.touching.left) {
        mov.body.velocity.x = -300;
    }
    else if (wall.body.touching.right) {
        mov.body.velocity.x = 300;
    }
    ///////////////Ledge Specific Death///////////
    if (mov.elevatorActivate) {
        this.emitterFunction(mov, null, 'destroy');
    }
    return;
};

brawl.game.prototype.wallVsBl = function (wall, bL) {
    //////////////////////Destroys Elevator Ledge/////////////////////////
    if (bL.elevatorActivate) {
        this.emitterFunction(bL, null, 'destroy');
    }
    return;
};

brawl.game.prototype.blVsEnemy = function (bL, enemy) {
    /////////////////////////killEnemy////////////////////
    if (bL.groupName === groupBall) {
        this.emitterFunction(enemy, null, 'destroy');
    }
    if (bL.groupName === groupLedge) {
        enemy.name = 'enemyFrozen';
        enemy.tint = tintWallPlayerFrozen;
        enemy.body.immovable = true;
        enemy.body.moves = false;
        // this.emitterFunction(bL, null, 'destroy');
    }
    return;
};