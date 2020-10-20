//////////////////////////////////////Physics Handlers Between Objects////////////////////////////
//Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
brawl.game.prototype.trapProjectiles = function (trapProjectiles, obstacles) {
    trapProjectiles.kill();
    if (obstacles.name === 'groundPhase') {
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
brawl.game.prototype.gVsd = function (ground, death) {
    ////////////More Special Interactions to Come//////////////
    //Reverses The Velocity's of the Object
    // if (obj1.specialCondition) {
    //     if (obj1.specialCondition.name === scReverseVelocity.name) {
    //         var x = obj1.body.velocity.x * -1;
    //         var y = obj1.body.velocity.y * -1;
    //         obj1.body.velocity.setTo(x, y);
    //     }
    // }
    // if (!obj1.body.immovable) {
    //     obj1.body.stop();
    //     if (obj1.body.touching.up) {
    //         obj1.body.velocity.y = 200;
    //     }
    //     else if (obj1.body.touching.down) {
    //         obj1.body.velocity.y = -200;
    //     }
    //     else if (obj1.body.touching.left) {
    //         obj1.body.velocity.x = 200;
    //     }
    //     else if (obj1.body.touching.right) {
    //         obj1.body.velocity.x = -200;
    //     }
    // }
    if (ground.groupName === groupGroundMove && death.groupName === groupDeathMove) {
        if (death.specialCondition) {
            if (death.specialCondition.name === 'spriteKiller') {
                this.emitterFunction(ground, null, 'destroy');
                if (death.body.touching.up) {
                    death.body.velocity.y = -death.specialCondition.velocityY;
                }
                else if (death.body.touching.down) {
                    death.body.velocity.y = death.specialCondition.velocityY;
                }
                else if (death.body.touching.left) {
                    death.body.velocity.x = -death.specialCondition.velocityX;
                }
                else if (death.body.touching.right) {
                    death.body.velocity.x = death.specialCondition.velocityX;
                }
            }
        }
        else {
            ground.body.stop();
            if (ground.body.touching.up) {
                death.body.velocity.y = -200;
            }
            else if (ground.body.touching.down) {
                death.body.velocity.y = 200;
            }
            else if (ground.body.touching.left) {
                death.body.velocity.x = -200;
            }
            else if (ground.body.touching.right) {
                death.body.velocity.x = 200;
            }
        }
        // ground.body.stop();
        // if (ground.body.touching.up) {
        //     death.body.velocity.y = -200;
        // }
        // else if (ground.body.touching.down) {
        //     death.body.velocity.y = 200;
        // }
        // else if (ground.body.touching.left) {
        //     death.body.velocity.x = -200;
        // }
        // else if (ground.body.touching.right) {
        //     death.body.velocity.x = 200;
        // }
    }
    return;
};

brawl.game.prototype.groundVsSelf = function (g1, g2) {

    return;
};

brawl.game.prototype.deathVsSelf = function (d1, d2) {
    // if (d1.groupName === groupDeathMove && d2.groupName === groupDeath) {
    //     if (d2.body.touching.up) {
    //         d1.body.velocity.y = -200;
    //     }
    //     else if (d2.body.touching.down) {
    //         d1.body.velocity.y = 200;
    //     }
    //     else if (d2.body.touching.left) {
    //         d1.body.velocity.x = -200;
    //     }
    //     else if (d2.body.touching.right) {
    //         d1.body.velocity.x = 200;
    //     }
    // }
    return;
};

//Ground and Death vs. Moveable Objects
brawl.game.prototype.gdVsMov = function (groundDeath, moveable) {
    ////////////////////Physics of Immoveable Against Ball or Ledge or Enemy////////////
    if (groundDeath.name === deathRegularMove.name || groundDeath.name === groundRegularMove.name) {
        moveable.body.stop()
        // groundDeath.body.stop();
        if (moveable.body.touching.up) {
            groundDeath.body.velocity.y = -200;
        }
        else if (moveable.body.touching.down) {
            groundDeath.body.velocity.y = 200;
        }
        else if (moveable.body.touching.left) {
            groundDeath.body.velocity.x = -200;
        }
        else if (moveable.body.touching.right) {
            groundDeath.body.velocity.x = 200;
        }
    }
    /////////////////////groundDeath Wall Effects Against Moveable////////////////////
    if (groundDeath.name === groundKillWall.name || groundDeath.name === groundOneWayKillObject.name || moveable.name === 'ledgeElevatorActivate') {
        if (moveable.generationType === 'timer') {
            this.emitterFunction(moveable, null, 'kill');
        }
        else {
            this.emitterFunction(moveable, null, 'destroy');

        }
        // this.emitterFunction(moveable, null, 'destroy');
    }
    if (groundDeath.specialCondition) {
        if (groundDeath.specialCondition.name === 'spriteKiller') {
            if (moveable.generationType === 'timer') {
                this.emitterFunction(moveable, null, 'kill');

            }
            else {
                this.emitterFunction(moveable, null, 'destroy');

            }
            if (groundDeath.body.touching.up) {
                groundDeath.body.velocity.y = -groundDeath.specialCondition.velocityY;
            }
            else if (groundDeath.body.touching.down) {
                groundDeath.body.velocity.y = groundDeath.specialCondition.velocityY;
            }
            else if (groundDeath.body.touching.left) {
                groundDeath.body.velocity.x = -groundDeath.specialCondition.velocityX;
            }
            else if (groundDeath.body.touching.right) {
                groundDeath.body.velocity.x = groundDeath.specialCondition.velocityX;
            }
        }
    }
    // ////////////////////Moveable Effects Against groundDeath///////////////
    if (groundDeath.name === deathBallKill.name && moveable.groupName === groupBall) {
        this.emitterFunction(groundDeath, moveable, 'destroy');
        //Removes Localized Sprites from Regenerating (Spikes)
        if (groundDeath.specialCondition) {
            if (groundDeath.specialCondition.name === scLocalizedDestruction.name) {
                //Destruction of Localized Sprite
                worldClassLevels[this.indexOfCurrentWorld].spriteSpawn[groundDeath.positionInArray].trigger = false;
            }
        }
    }
    // if (moveable.groupName === groupBall) {
    //     console.log(moveable.body.velocity.x, moveable.body.velocity.y);
    // }
    return;
};

//Ground and Death vs. Moveable Objects
brawl.game.prototype.gdVsInvisible = function (groundDeath, invisible) {
    // if (invisible.body.touching.up) {
    //     groundDeath.body.velocity.y = 500;
    // }
    // else if (invisible.body.touching.down) {
    //     groundDeath.body.velocity.y = -500;
    // }
    // else if (invisible.body.touching.left) {
    //     groundDeath.body.velocity.x = 500;
    // }
    // else if (invisible.body.touching.right) {
    //     groundDeath.body.velocity.x = -500;
    // }
    return;
};

//Wall Against Moveable Objects
brawl.game.prototype.wallVsMov = function (wall, mov) {
    ///////////////Actual Collision Physics/////////////
    // wall.body.stop();
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
    return;
};

//Ball Interaction Vs. Enemy
brawl.game.prototype.ballVsEnemy = function (ball, enemy) {
    ///////////////Actual Collision Physics/////////////
    if (enemy.generationType === 'timer') {
        this.emitterFunction(enemy, null, 'kill');

    }
    else {
        this.emitterFunction(enemy, null, 'destroy');

    }
    // this.emitterFunction(enemy, null, 'destroy');
    return;
};

//Ledge Interaction Vs. Enemy
brawl.game.prototype.ledgeVsEnemy = function (ledge, enemy) {
    ///////////////Actual Collision Physics/////////////
    ledge.body.stop();
    if (ledge.body.touching.up) {
        enemy.body.velocity.y = -300;
    }
    else if (ledge.body.touching.down) {
        enemy.body.velocity.y = 300;
    }
    else if (ledge.body.touching.left) {
        enemy.body.velocity.x = -300;
    }
    else if (ledge.body.touching.right) {
        enemy.body.velocity.x = 300;
    }
    return;
};

brawl.game.prototype.ballVsLedge = function (ball, ledge) {
    ///////////////Actual Collision Physics/////////////
    ledge.body.stop();
    if (ledge.body.touching.up) {
        ball.body.velocity.y = -300;
    }
    else if (ledge.body.touching.down) {
        ball.body.velocity.y = 300;
    }
    else if (ledge.body.touching.left) {
        ball.body.velocity.x = -300;
    }
    else if (ledge.body.touching.right) {
        ball.body.velocity.x = 300;
    }
    return;
};

brawl.game.prototype.flagVsE = function (flag, obj) {
    ///////////////Actual Collision Physics/////////////
    obj.body.stop();
    if (obj.body.touching.up) {
        flag.body.velocity.y = -300;
    }
    else if (obj.body.touching.down) {
        flag.body.velocity.y = 300;
    }
    else if (obj.body.touching.left) {
        flag.body.velocity.x = -300;
    }
    else if (obj.body.touching.right) {
        flag.body.velocity.x = 300;
    }
    return;
};