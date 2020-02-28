//////////////////////////////////////////Environment//////////////////////////////////////////
brawl.game = function () { };
brawl.game.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania) {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
        /*
        Essentially the room initializes with the index of the current world, where the player should spawn in the world, and lastly the rooms available to switch to depending on the side.
        */
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
        cameraBoolean = true;
        ///////////////////////These Are Resetting the Player Attributes For Each Level////////////////////
        playerSpeed = 400;
        playerJump = -500;
        playerGravity = 1500;
        playerDoubleJumps = 2;
        playerWallJumpX = 1000;
        playerWallJumpY = 500;
        playerStickiness = 100;
        playerSlippery = -25;
        playerUpsideDownVelocity = -100;
        playerUpsideDownMovement = 100;
        playerDownwards = 400;
    },
    preload: function () {
        // this.game.forceSingleUpdate = true;
        //Immovable Walls
        this.load.image('immovableWallVertical', 'assets/immovableWallVertical.png');
        this.load.image('immovableWallHorizontal', 'assets/immovableWallHorizontal.png');
        //Moveable Walls
        this.load.image('wallVertical', 'assets/wallVertical.png');
        this.load.image('wallHorizontal', 'assets/wallHorizontal.png');
        this.load.image('wallBrown', 'assets/wallBrown.png');
        //Ledges
        this.load.image('ledge', 'assets/ledge.png');
        //Traps
        this.load.image('spikeFall', 'assets/spikeFall.png');
        this.load.image('spikesHorizontalOne', 'assets/spikesHorizontalOne.png')
        this.load.image('spikesVertical', 'assets/spikesVertical.png');
        //Death (Red)
        this.load.image('deathVertical', 'assets/deathVertical.png');
        this.load.image('deathHorizontal', 'assets/deathHorizontal.png');
        //Bullets
        this.load.image('bulletKill', 'assets/bulletKill.png');
        this.load.image('bulletStop', 'assets/bulletStop.png');
        this.load.image('bulletPull', 'assets/bulletPull.png');
        this.load.image('bulletEnemy', 'assets/bulletEnemy.png');
        //Coin
        this.load.image('coin', 'assets/coin.png');
        //Flag
        this.load.image('flag', 'assets/flag.png');
        //Door
        this.load.image('door', 'assets/door.png');
        //Ball
        this.load.image('ball', 'assets/ball.png');
        //Enemies
        this.load.image('enemy', 'assets/trumpface.png');
        //Emitter
        this.load.image('particles', 'assets/z2.png');
        //Player
        // this.load.spritesheet('player', 'assets/player.png', 87.5, 93.5);
        this.load.image('player', 'assets/playerFiller.png');
    },
    create: function () {
        //Desired FPS of game and fps and lag debugging
        this.game.time.desiredFps = 60;

        //FPS Debugging
        // this.game.time.advancedTiming = true;

        //Background Color of Game
        this.game.stage.backgroundColor = worldClassLevels[this.indexOfCurrentWorld].backgroundColor;

        //Sort Direction
        this.game.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
        //What Is This?
        // this.game.physics.arcade.forceX = true;

        // Stretch to fill (Full Screen Mode)
        this.createFullScreen();

        //Pause Menu (Freeze TIME LOL)
        this.createPause();

        //Overlap Bias to Prevent Sprite Tunneling
        this.game.physics.arcade.OVERLAP_BIAS = 17; //10 is original

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, worldClassLevels[this.indexOfCurrentWorld].xOfWorld, worldClassLevels[this.indexOfCurrentWorld].yOfWorld);
        ///////////////////World Gravity////////////////////////
        if ('worldGravity' in worldClassLevels[this.indexOfCurrentWorld]) {
            this.game.physics.arcade.gravity.setTo(worldClassLevels[this.indexOfCurrentWorld].worldGravity.gravityX, worldClassLevels[this.indexOfCurrentWorld].worldGravity.gravityY);
        }

        //////////////////Initializing Sprite Groups///////////////
        this.spriteGroupGenerator();

        ////////////////////////////////Key Control Movements/////////////////////////
        this.initControls();

        /////////////////////////World Creation Initialization Grid///////////////////////
        var worldName;
        this.worldCreator(worldClassLevels[this.indexOfCurrentWorld]);
        worldName = worldClassLevels[this.indexOfCurrentWorld].worldName

        ////////////////////////////////////////////Camera on Player///////////////////////////////////////////////////////////
        this.cameraPlayer();

        //World
        this.text = this.game.add.text(200, 6208, "World: " + worldName, { font: "20px Arial", fill: "#000000", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(1100, 725);
    },
    // //How Game Updates Real-Time (Actual Controls)////
    update: function () {
        ////////////////////////////////////FPS Debugging////////////////////////////////////////
        // console.log(this.game.time.fps);
        ////////////////////////////////////////Continious Updating//////////////////////////////////
        ///Enemy Sprites Firing Bullets
        this.fireEnemyBullet();
        ////Magnetism in Immovable Walls
        this.immovableWall.forEachAlive(this.immovableWallContinious, this);
        ////////////////////////Physics////////////////////////
        //Player Mechanics
        var onImmovable = this.game.physics.arcade.collide(this.player, this.immovableWall, this.playerImmovable, null, this);
        var onWall = this.game.physics.arcade.collide(this.player, this.wall, this.playerWall, this.playerBlackWall, this);
        var onLedge = this.game.physics.arcade.collide(this.player, this.ledge, this.playerLedge, null, this);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, this.playerBall, null, this);
        //Death Mechanics (Game State Change)
        this.game.physics.arcade.overlap(this.player, [this.enemy, this.enemyBullets, this.death, this.fallingSpikes], this.deathState, null, this);

        //Respawn Point Mechanics
        this.game.physics.arcade.overlap(this.player, this.flag, this.respawn, null, this);

        //Weapon Mechanics
        this.game.physics.arcade.collide([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.ball, this.wall, this.ledge, this.enemy], this.weaponHandler, this.weaponGhost, this);
        this.game.physics.arcade.overlap([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.immovableWall, this.death], this.weaponImmovable, null, this);

        //Immovable Wall vs Moveable Objects
        this.game.physics.arcade.collide(this.immovableWall, [this.ball, this.ledge, this.enemy], this.immovableMoveable, null, this);

        //Moveable Wall vs Immoveable Objects and Itself
        this.game.physics.arcade.collide(this.wall, [this.immovableWall, this.death], this.wallImmovable, this.ghostWall, this);

        //Movable Wall Mechanics vs. Moveable Objects (NOT ITSELF) (OVERLAP)
        this.game.physics.arcade.overlap(this.wall, [this.ledge, this.ball, this.enemy], this.wallMoveable, null, this);

        //Enemy Bullet and Falling Spike Mechanics
        this.game.physics.arcade.overlap([this.enemyBullets, this.fallingSpikes], [this.ball, this.wall, this.immovableWall, this.ledge, this.death], this.deathTwo, null, this);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, [this.ledge, this.enemy, this.death], this.ballHandler, null, this);

        //Ledge and Enemy Interactions With Death
        this.game.physics.arcade.collide([this.ledge, this.enemy], this.death, this.ledgeEnemyDeath, null, this);

        //Enemy Interactions With Each other (Tabled For Now)
        // this.game.physics.arcade.overlap(this.enemy, this.enemy, this.deathTwo, null, this)

        ////////////////////////////////Actual Controls////////////////////////////////

        //Jump Mechanics
        // Set a variable that is true when the player is a surface the ground (or different sides) or not a surface
        var onTheGround = this.player.body.touching.down;
        var onTheRightSide = this.player.body.touching.right;
        var onTheLeftSide = this.player.body.touching.left;
        var onUpsideDown = this.player.body.touching.up;
        var onNone = this.player.body.touching.none;

        // If the player is touching a surface, let him have 2 jumps
        if (onTheGround || onTheLeftSide || onTheRightSide || onUpsideDown) {
            this.jumps = playerDoubleJumps;
            this.jumping = false;
        }

        // Jump!
        if (this.jumps > 0 && this.upInputIsActive(5)) {
            this.player.body.velocity.y = playerJump;
            this.jumping = true;
        }

        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }

        //Player Standing Still
        this.player.body.velocity.x = 0;

        // //Player Angle Still
        // this.player.angle = 0;

        //////////////////////////////////////////WASD Controls and Player Touch Mechanics//////////////////////////////////////////////
        //Camera Focused on Player
        if (cameraBoolean) {
            if (onTheGround) {
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    this.player.body.velocity.x = -playerSpeed;
                    // this.player.animations.play('left');
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    this.player.body.velocity.x = playerSpeed;
                    // this.player.animations.play('right');
                }
                // else {
                //     this.player.animations.stop();
                //     this.player.frame = 8;
                // }
            }
            else if (onTheRightSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = playerStickiness;
                    this.player.body.velocity.y = playerSlippery; //100 is original
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 6;
                // }
                if (this.movementLeft.isDown) {
                    this.player.body.velocity.y = -playerWallJumpY;
                    this.player.body.velocity.x = -playerWallJumpX;
                }
            }
            else if (onTheLeftSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = -playerStickiness;
                    this.player.body.velocity.y = playerSlippery; //100 is Original
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 12;
                // }
                if (this.movementRight.isDown) {
                    this.player.body.velocity.y = -playerWallJumpY;
                    this.player.body.velocity.x = playerWallJumpX;
                }
            }
            else if (onUpsideDown) {
                // this.player.animations.stop();
                // this.player.frame = 8;
                // this.player.angle = 180;
                this.player.body.velocity.y = playerUpsideDownVelocity;
                if (this.movementLeft.isDown) {
                    this.player.body.velocity.x = -playerSpeed;
                    // this.player.animations.play('left');
                }
                else if (this.movementRight.isDown) {
                    this.player.body.velocity.x = playerSpeed;
                    // this.player.animations.play('right');
                }

            }
            else if (onNone) {
                // this.player.frame = 10;
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    this.player.body.velocity.x = -playerSpeed;
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    this.player.body.velocity.x = playerSpeed;
                }
                else if (this.movementLeft.isDown && this.movementRight.isDown) {
                    this.player.body.velocity.x = 0;
                }
            }

            //////////Downwards Mechanics////////
            if (this.movementDown.isDown && onUpsideDown) {
                // this.player.frame = 13;
                this.player.body.velocity.y = playerUpsideDownMovement;
            }

            //Downward Mechanics
            if (this.movementDown.isDown) {
                // this.player.frame = 13;
                this.player.body.velocity.y = playerDownwards;
            }
        }
        //Freelook
        else {
            //Original is 8 (Camera Speed)
            if (this.movementLeft.isDown) {
                this.game.camera.x -= 20;
            }
            else if (this.movementRight.isDown) {
                this.game.camera.x += 20;
            }
            if (this.movementUp.isDown) {
                this.game.camera.y -= 20;
                this.player.body.velocity.y = 0;
            }
            else if (this.movementDown.isDown) {
                this.game.camera.y += 20;
            }
            if (onTheRightSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = playerStickiness;
                    this.player.body.velocity.y = playerSlippery;
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 6;
                // }
            }
            else if (onTheLeftSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = -playerStickiness;
                    this.player.body.velocity.y = playerSlippery;
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 12;
                // }
            }
            else if (onUpsideDown) {
                // this.player.animations.stop();
                // this.player.frame = 8;
                // this.player.angle = 180;
                this.player.body.velocity.y = playerUpsideDownVelocity;
            }
            // else if (onNone) {
            //     this.player.frame = 10;
            // }
        }
        ///////////////////////Weapon Mechanics///////////////
        //Shoot from Mouse
        if (this.game.input.activePointer.leftButton.isDown || this.shiftFire.isDown) {
            if (pullBoolean) {
                this.weapon1.fireAtPointer();
                this.weapon1.fire();
            }
            else if (pushBoolean) {
                this.weapon2.fireAtPointer();
                this.weapon2.fire();
            }
            else if (stopBoolean) {
                this.weapon3.fireAtPointer();
                this.weapon3.fire();
            }
        }
    },
    //How Game Updates Real-Time (God Mode)!
    // update: function () {
    //     this.fireEnemyBullet();
    //     ///////////God Mode//////////////
    //     this.player.body.velocity.y = 0;
    //     this.player.body.velocity.x = 0;

    //     if (cameraBoolean) {
    //         if (this.movementLeft.isDown) {
    //             this.player.body.velocity.x = -400;
    //             this.player.animations.play('left');
    //         }
    //         else if (this.movementRight.isDown) {
    //             this.player.body.velocity.x = 400;
    //             this.player.animations.play('right');
    //         }
    //         if (this.movementUp.isDown) {
    //             this.player.frame = 10;
    //             this.player.body.velocity.y = -650;
    //         }
    //         else if (this.movementDown.isDown) {
    //             this.player.frame = 10;
    //             this.player.body.velocity.y = 650;
    //         }
    //     }
    //     else {
    //         if (this.movementLeft.isDown) {
    //            this.game.camera.x -= 10;
    //         }
    //         else if (this.movementRight.isDown) {
    //             this.game.camera.x += 10;
    //         }
    //         if (this.movementUp.isDown) {
    //             this.game.camera.y -= 10;
    //         }
    //         else if (this.movementDown.isDown) {
    //             this.game.camera.y += 10;
    //         }
    //     }
    //     ///////////////////////Weapon Mechanics///////////////
    //     //Shoot from Mouse
    //     if (this.game.input.activePointer.leftButton.isDown || this.shiftFire.isDown) {
    //         if (pullBoolean) {
    //             this.weapon1.fireAtPointer();
    //             this.weapon1.fire();
    //         }
    //         else if (pushBoolean) {
    //             this.weapon2.fireAtPointer();
    //             this.weapon2.fire();
    //         }
    //         else if (stopBoolean) {
    //             this.weapon3.fireAtPointer();
    //             this.weapon3.fire();
    //         }
    //     }
    // }
    /////////////////////////Debugging + Timer///////////////////////////
    // render: function () {
    //     // this.game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
    //     // this.game.debug.text('Global Timer: ' + total, 32, 32);
    //     // this.game.debug.text('Heat Timer: ' + total, 32, 64);
    //     // this.game.debug.body(this.player);
    //     // this.game.debug.physicsGroup(this.weapon1.bullets, '#ffffff');
    //     //Debugging FPS
    //     // this.game.debug.text(game.time.fps,500,500);
    // },
};