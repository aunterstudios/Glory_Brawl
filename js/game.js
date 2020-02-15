//////////////////////////////////////////Environment//////////////////////////////////////////
brawl.game = function () { };
brawl.game.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania) {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
        //Reset Enemy Bullet Array
        livingEnemies = [];
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
        playerWallJumpX = 1000;
        playerWallJumpY = 500;
        playerStickiness = 100;
        playerSlippery = 20;
        playerUpsideDownVelocity = -100;
        playerUpsideDownMovement = 100;
        playerDownwards = 500;
        ////////////////////These Are Resetting the Weapon Attributes For Each Level/////////////////////
        // weaponFireRate = 500;
        // weaponBulletSpeed = 500;
        // weaponBulletAmount = 30;
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
        this.load.image('ledgeElevator', 'assets/ledgeElevator.png');
        this.load.image('ledgeBounce', 'assets/ledgeBounce.png');
        this.load.image('ledgeSurf', 'assets/ledgeSurf.png');
        //Traps
        this.load.image('spikeFall', 'assets/spikeFall.png');
        this.load.image('spikesHorizontalOne', 'assets/spikesHorizontalOne.png')
        this.load.image('spikesHorizontalTwo', 'assets/spikesHorizontalTwo.png');
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
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
        // this.game.stage.backgroundColor = "#2F4F4F";

        //Sort Direction
        this.game.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
        //What Is This?
        this.game.physics.arcade.forceX = true;

        // Stretch to fill (Full Screen Mode)
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.O);

        this.fullSize.onDown.add(this.gofull, this);

        //Pause Menu (Freeze TIME LOL)
        this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        this.pause.onDown.add(this.goPause, this);

        //Overlap Bias to Prevent Sprite Tunneling
        this.game.physics.arcade.OVERLAP_BIAS = 10; //20 is original

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, worldClassLevels[this.indexOfCurrentWorld].xOfWorld, worldClassLevels[this.indexOfCurrentWorld].yOfWorld);
        ///////////////////World Gravity////////////////////////
        if ('worldGravity' in worldClassLevels[this.indexOfCurrentWorld]) {
            this.game.physics.arcade.gravity.setTo(worldClassLevels[this.indexOfCurrentWorld].worldGravity.gravityX, worldClassLevels[this.indexOfCurrentWorld].worldGravity.gravityY);
        }

        ////////////////////////////////////Keyboard Controls/////////////////////////////////
        this.cursors = this.game.input.keyboard.createCursorKeys();

        /////////////////Adding Sprite Groups//////////////
        //Adding Moveable Walls
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        //Adding Immovable Walls
        this.immovableWall = this.game.add.group();
        this.immovableWall.enableBody = true;
        //Adding Ledges
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        //Adding Enemies
        this.enemy = this.game.add.group();
        this.enemy.enableBody = true;
        //Adding Balls
        this.ball = this.game.add.group();
        this.ball.enableBody = true;
        //Timer Traps
        this.fallingSpikes = this.game.add.group();
        this.fallingSpikes.enableBody = true;
        //Adding Coins (Win Game)
        this.coin = this.game.add.group();
        this.coin.enableBody = true;
        //Adding This Undeniable Death
        this.death = this.game.add.group();
        this.death.enableBody = true;
        //Adding Flag Group
        this.flag = this.game.add.group();
        this.flag.enableBody = true;

        /////////////////////Practice Specific Sprite Groups/////////////////
        /////////////////////Enemy Bullets///////////////
        // creates enemy bullets
        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'bulletEnemy');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        ////////////////////////////////Key Control Movements/////////////////////////
        //Player Movement (WASD);
        this.movementUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.movementDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.movementLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.movementRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

        //Change Weapon Fire Type
        this.pullBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.pushBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.killBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

        //Booleans to Trigger Different Weapon Types
        this.pullBullet.onDown.add(this.goPull, this);
        this.pushBullet.onDown.add(this.goPush, this);
        this.killBullet.onDown.add(this.goKill, this);

        //Fire from Keyboard
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
        this.shiftFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        /////////////////////////World Creation Initialization Grid///////////////////////
        var worldName;
        this.worldCreator(worldClassLevels[this.indexOfCurrentWorld]);

        worldName = worldClassLevels[this.indexOfCurrentWorld].worldName

        ////////////////////////////////////////////Camera///////////////////////////////////////////////////////////
        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.cameraStyle = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.cameraStyle.onDown.add(this.cameraChange, this);

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
        var onWall = this.game.physics.arcade.collide(this.player, this.wall, this.playerWall, null, this);
        var onLedge = this.game.physics.arcade.collide(this.player, this.ledge, this.playerLedge, null, this);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, this.playerBall, null, this);

        //Respawn Point Mechanics
        this.game.physics.arcade.overlap(this.player, this.flag, this.respawn, null, this);

        //Weapon Mechanics
        this.game.physics.arcade.collide([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.ball, this.wall, this.ledge, this.enemy], this.weaponHandler, this.weaponGhost, this);
        this.game.physics.arcade.overlap([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.immovableWall, this.death], this.weaponImmovable, null, this);

        //Immovable Wall vs Moveable Objects
        this.game.physics.arcade.collide(this.immovableWall, [this.ball, this.ledge, this.enemy], this.immovableMoveable, null, this);

        //Moveable Wall vs Immoveable Objects and Itself
        this.game.physics.arcade.collide(this.wall, [this.wall, this.immovableWall, this.death], this.wallImmovable, this.ghostWall, this);

        //Movable Wall Mechanics vs. Moveable Objects (NOT ITSELF)
        this.game.physics.arcade.collide(this.wall, [this.ledge, this.ball, this.enemy], this.wallMoveable, null, this);

        //Enemy Bullet Mechanics
        this.game.physics.arcade.overlap(this.enemyBullets, [this.ball, this.wall, this.immovableWall, this.ledge, this.death], this.deathTwo, null, this);

        //Falling Spikes Mechanics
        this.game.physics.arcade.overlap(this.fallingSpikes, [this.ball, this.wall, this.immovableWall, this.ledge, this.enemy, this.death], this.deathTwo, null, this);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, [this.ball, this.ledge, this.enemy, this.death], this.ballHandler, null, this);

        //Ledge and Enemy Interactions
        this.game.physics.arcade.collide([this.ledge, this.enemy], [this.ledge, this.enemy, this.death], null, null, this);

        //Death Mechanics (Game State Change)
        this.game.physics.arcade.overlap(this.player, [this.enemy, this.enemyBullets, this.death, this.fallingSpikes], this.deathState, null, this);

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
            this.jumps = 2;
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