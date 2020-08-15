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
        ///////////////////////Setting Camera and Gun to Default/////////////
        pullBoolean = true;
        cameraBoolean = true;
        ///////////////////////These Are Resetting the Player Attributes For Each Level////////////////////
        playerSpeed = 400;
        playerJump = -500;
        // playerJump = -1000;
        playerGravity = 1500;
        // playerGravity = 100;
        playerDoubleJumps = 2;
        playerWallJumpX = 1000;
        playerWallJumpY = 500;
        playerWallDisengage = 500;
        playerStickiness = 200;
        playerSlippery = -25;
        playerUpsideDownVelocity = -200; //-100
        playerUpsideDownMovement = 100;
        playerDownwards = 400;
        //////////////////////Slow Motion Reset//////////////////
        slowMotionLimit = 3;
        timerEvents = [];
        this.game.time.slowMotion = 1.0;
        //////////////////////Weapon Attributes//////////////////////
        weaponFireRate = 500; //500
        weaponBulletSpeed = 500; //500
        weaponBulletAmount = 30; //30
    },
    create: function () {
        //Initializing FPS framework
        this.game.forceSingleRender = false;
        // this.game.time.advancedTiming = true; //Allows FPS to be calculated
        this.game.time.desiredFps = 60; //This Keeps Things Consistent
        // this.game.forceSingleUpdate = false;
        //FPS Debugging
        // this.game.fpsProblemNotifier.add(this.handleFpsProblem, this);

        //Background Color of Game
        this.game.stage.backgroundColor = worldClassLevels[this.indexOfCurrentWorld].backgroundColor;

        //Sort Direction
        this.game.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;

        // Stretch to fill (Full Screen Mode)
        this.createFullScreen();

        //Pause Menu (Freeze TIME LOL)
        this.createPause();

        //Overlap Bias to Prevent Sprite Tunneling
        this.game.physics.arcade.OVERLAP_BIAS = 10; //17 is original

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
        this.cameraPlayer()

        //////////////////////////////////////////Creating BMD///////////////////////////////
        //bmd is following around stuff
        // this.bmd = this.game.add.bitmapData(worldClassLevels[this.indexOfCurrentWorld].xOfWorld, worldClassLevels[this.indexOfCurrentWorld].yOfWorld);
        // this.bmd.context.fillStyle = '#FF0000';

        // this.bg = game.add.sprite(0, 0, this.bmd);

        //////////////////////////////////////BitMap Text////////////////////////////////////////////
        if (bitmapBoolean) {
            this.text = this.game.add.bitmapText(200, 6208, 'fontGrind', worldName, 32);
            this.text.fixedToCamera = true;
            this.text.cameraOffset.setTo(1100, 700);
        }
        else {
            this.text = this.game.add.text(200, 6208, worldName, { font: "20px Arial", fill: "#000000", align: "center" });
            this.text.fixedToCamera = true;
            this.text.cameraOffset.setTo(1100, 700);
        }
    },
    // //How Game Updates Real-Time (Actual Controls)////
    update: function () {
        ////////////////////////////////////FPS Debugging////////////////////////////////////////
        // this.game.time.desiredFps = this.game.time.fps;
        // console.log(this.game.time.desiredFps, "Desired");
        // console.log(this.game.time.rps, " rps", this.game.time.renders, ' renders');
        /////////////////////////////////////////BMD////////////////////////////////////////////////
        // this.bmd.context.fillRect(this.player.x-100, this.player.y-100, 50, 50);
        // this.bmd.dirty = true;
        ////////////////////////////////////////Continious Collision//////////////////////////////////
        //Images Moving
        // this.imageMovement();
        ///Enemies Attacking
        this.enemyAttack();
        //Walls
        // this.wallContinious(); //Work in Progress
        //Immovable Walls
        // this.immovableWallContinious();
        ///////////////////////////////////////////Physics////////////////////////////////////////
        //Player Mechanics
        var onImmovable = this.game.physics.arcade.collide(this.player, this.immovableWall, this.playerImmovable, this.playerImmovableWallProcessArgument, this);
        var onWall = this.game.physics.arcade.collide(this.player, this.wall, this.playerWall, this.playerWallProcessArgument, this);
        var onLedge = this.game.physics.arcade.collide(this.player, this.ledge, this.playerLedge, null, this);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, this.playerBall, null, this);
        //Death Mechanics (Game State Change)
        this.game.physics.arcade.overlap(this.player, [this.enemy, this.enemyBullets.bullets, this.undeniableDeath, this.fallingSpikes], this.playerDeath, null, this);

        //Respawn Point Mechanics
        this.game.physics.arcade.overlap(this.player, this.flag, this.respawn, null, this);

        //Weapon Mechanics
        this.game.physics.arcade.overlap([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.ball, this.wall, this.ledge, this.enemy, this.immovableWall, this.undeniableDeath], this.weaponHandler, this.weaponProcessArgument, this);

        //Immovable Wall and Death vs. Moveable Objects
        this.game.physics.arcade.collide([this.immovableWall, this.undeniableDeath], [this.ball, this.enemy, this.ledge, this.wall], this.immovableMoveable, this.immovableMoveableProcessArgument, this);

        //Immovable Wall and Death vs. Themselves
        this.game.physics.arcade.overlap([this.immovableWall, this.undeniableDeath], [this.immovableWall, this.undeniableDeath], this.immovableImmovable, this.immovableImmovableProcessArgument, this);

        //Movable Wall Mechanics vs. Moveable Objects (NOT ITSELF) (OVERLAP)
        this.game.physics.arcade.collide(this.wall, this.enemy, this.wallVsEnemy, null, this);
        this.game.physics.arcade.overlap(this.wall, [this.ball, this.ledge], this.wallVsBl, null, this);
        //Ball and Ledge vs. Enemy
        this.game.physics.arcade.overlap([this.ball, this.ledge], this.enemy, this.blVsEnemy, null, this);

        //Enemy Bullet and Falling Spike Mechanics (trapProjectiles)
        this.game.physics.arcade.overlap([this.enemyBullets.bullets, this.fallingSpikes], [this.ball, this.wall, this.immovableWall, this.ledge, this.undeniableDeath], this.trapProjectiles, null, this);

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

        //////////////////////////////////Player Motion//////////////////////////
        //Standing Still
        // this.player.body.acceleration.x = 0;
        this.player.body.velocity.x = 0;

        //////////////////////////////////////////WASD Controls and Player Touch Mechanics//////////////////////////////////////////////
        //Camera Focused on Player
        if (cameraBoolean) {
            if (onTheGround) {
                //Set HitBox Size
                this.player.body.setSize(34, 55.5, 15, 7);
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    // this.player.body.acceleration.x = -30000;
                    this.player.body.velocity.x = -playerSpeed;
                    this.player.animations.play('left');
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    // this.player.body.acceleration.x = 30000;
                    this.player.body.velocity.x = playerSpeed;
                    this.player.animations.play('right');
                }
                else {
                    this.player.animations.stop();
                    this.player.frame = 0;
                }
            }
            else if (onTheRightSide) {
                this.player.body.setSize(30, 50, 19, 10);
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = playerStickiness;
                    this.player.body.velocity.y = playerSlippery; //100 is original
                }
                if (onWall || onImmovable || onLedge) {
                    this.player.frame = 7;
                }
                if (this.movementLeft.isDown) {
                    this.player.body.velocity.y = -playerWallJumpY;
                    this.player.body.velocity.x = -playerWallJumpX;
                }
            }
            else if (onTheLeftSide) {
                this.player.body.setSize(30, 50, 15, 10);
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = -playerStickiness;
                    this.player.body.velocity.y = playerSlippery; //100 is Original
                }
                if (onWall || onImmovable || onLedge) {
                    this.player.frame = 13;
                }
                if (this.movementRight.isDown) {
                    this.player.body.velocity.y = -playerWallJumpY;
                    this.player.body.velocity.x = playerWallJumpX;
                }
            }
            else if (onUpsideDown) {
                this.player.body.setSize(34, 55.5, 15, 0);
                this.player.body.velocity.y = playerUpsideDownVelocity;
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    this.player.body.velocity.x = -playerSpeed;
                    this.player.animations.play('upsideDownLeft');
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    this.player.body.velocity.x = playerSpeed;
                    this.player.animations.play('upsideDownRight');
                }
                else {
                    this.player.animations.stop();
                    this.player.frame = 1;
                }

            }
            else if (onNone) {
                // this.player.animations.stop();
                this.player.body.setSize(34, 55.5, 15, 7);
                if (this.player.body.velocity.x === 0) {
                    this.player.frame = 2;
                }
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    this.player.body.velocity.x = -playerSpeed;
                    this.player.frame = 8;
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    this.player.body.velocity.x = playerSpeed;
                    this.player.frame = 14;
                }
                else if (this.movementLeft.isDown && this.movementRight.isDown) {
                    this.player.body.velocity.x = 0;
                }
            }

            // //Upwards
            // if (this.movementUp.isDown) {
            //     this.player.frame = 2;
            // }

            //////////Downwards Mechanics////////
            if (this.movementDown.isDown && onUpsideDown) {
                // this.player.frame = 13;
                this.player.body.velocity.y = playerUpsideDownMovement;
            }

            if (this.movementDown.isDown && !this.movementLeft.isDown && !this.movementRight.isDown) {
                this.player.body.setSize(34, 55.5, 15, 7);
                if (onNone || onUpsideDown || onTheGround) {
                    this.player.frame = 3;
                    this.player.body.velocity.y = playerDownwards;
                }
                if (onTheLeftSide) {
                    this.player.body.velocity.x = playerWallDisengage;
                }
                if (onTheRightSide) {
                    this.player.body.velocity.x = -playerWallDisengage;
                }
            }
        }
        //Freelook
        else {
            ////////////Stop Animations///////////
            this.player.frame = 0;
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
                if (onWall || onImmovable || onLedge) {
                    this.player.frame = 7;
                }
            }
            else if (onTheLeftSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = -playerStickiness;
                    this.player.body.velocity.y = playerSlippery;
                }
                if (onWall || onImmovable || onLedge) {
                    this.player.frame = 13;
                }
            }
            else if (onUpsideDown) {
                this.player.frame = 1;
                this.player.body.velocity.y = playerUpsideDownVelocity;
            }
            else if (onNone) {
                this.player.frame = 2;
            }
        }
        ///////////////////////Weapon Mechanics///////////////
        //Shoot from Mouse
        if (this.game.input.activePointer.leftButton.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
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
            else if (killBoolean) {
                this.weapon4.fireAtPointer();
                this.weapon4.fire();
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
    //     //Timer Debugging
    //     // this.game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
    //     // this.game.debug.text('Global Timer: ' + total, 32, 32);
    //     // this.game.debug.text('Heat Timer: ' + total, 32, 64);
    //     //Body Physics
    //     // this.game.debug.body(this.player);
    //     // this.game.debug.bodyInfo(this.player, 200, 200);
    //     // this.game.debug.physicsGroup(this.immovableWall);
    //     //Debugging FPS
    //     // this.game.debug.text(this.game.time.fps, 200, 300);
    // },
};