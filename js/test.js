///////////////////////////////////////////Testing Environment//////////////////////////////////////////
brawl.testing = function () { };
brawl.testing.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        // this.game.forceSingleUpdate = true;
        this.load.image('wall', 'assets/wall.png');
        this.load.image('ball', 'assets/ball.png')
        this.load.image('rotatedWall', 'assets/rotatedWall.png');
        this.load.image('fallingSpikes', 'assets/newSpikes.png');
        this.load.image('win', 'assets/finishLine.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('invertedSpikes', 'assets/invertedSpikesTrue.png')
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.image('ledgeDown', 'assets/platformX.png');
        this.load.image('ledgeSide', 'assets/platformSide.png');
        this.load.image('bullet3', 'assets/bullet09.png');
        this.load.image('bullet2', 'assets/bullet254.png');
        this.load.image('bullet1', 'assets/bullet255.png');
        this.load.image('boundary', 'assets/worldBounds.png');
        this.load.image('coin', 'assets/shield2.png');
        this.load.image('flag', 'assets/flag.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Desired FPS of game
        this.game.time.desiredFps = 60;

        // this.game.time.advancedTiming = true;

        // Stretch to fill (Full Screen Mode)
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.F);

        this.fullSize.onDown.add(this.gofull, this);

        //Pause Menu (Freeze TIME LOL)
        this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        this.pause.onDown.add(this.goPause, this);

        //Overlap Bias to Prevent Sprite Tunneling
        this.game.physics.arcade.OVERLAP_BIAS = 12;

        //Initializes all the Randomness
        var randomGeneratorForWorld = this.game.rnd.integerInRange(0, 4);

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, worldGenerator[randomGeneratorForWorld].xOfWorld, worldGenerator[randomGeneratorForWorld].yOfWorld);

        ////////////Generator for Game Mode//////////////
        var randomGeneratorForGameMode = this.game.rnd.integerInRange(0, 1);
        var gameModeName;
        if (randomGeneratorForGameMode === 0) {
            gameModeName = "Collect the Coins";
        }
        else {
            gameModeName = "Capture the Flag";
        }
        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        /////////////////Adding Sprite Groups//////////////
        //Adding the Wall
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        //Adding Upwards Ledge
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        //Adding Downward Ledge
        this.ledgeDown = this.game.add.group();
        this.ledgeDown.enableBody = true;
        //Adding Sidewards Ledge
        this.ledgeSide = this.game.add.group();
        this.ledgeSide.enableBody = true;
        //Adding Enemies
        this.enemy = this.game.add.group();
        this.enemy.enableBody = true;
        //Adding Balls
        this.ball = this.game.add.group();
        this.ball.enableBody = true;
        //Adding Spikes
        this.spikes = this.game.add.group();
        this.spikes.enableBody = true;
        //Adding Coins (Win Game)
        this.coin = this.game.add.group();
        this.coin.enableBody = true;
        //Adding This Undeniable Death At the Bottom
        this.death = this.game.add.group();
        this.death.enableBody = true;

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
        this.worldCreator(worldGenerator[randomGeneratorForWorld], randomGeneratorForGameMode);

        worldName = worldGenerator[randomGeneratorForWorld].worldName

        ////////////////////////////////////////////Camera///////////////////////////////////////////////////////////
        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

        //Streak
        this.text = this.game.add.text(200, 6208, "Streak: " + streak, { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(100, 750);

        //World
        this.text = this.game.add.text(200, 6208, "World: " + worldName + "\n Game Mode: " + gameModeName, { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(1100, 725);


    },
    // ////////////////////////Out of Bounds Events//////////////////////////
    // playerOut: function (player) {
    //     if (player.x >= 1400) {
    //         player.reset(0, player.y)
    //         player.body.velocity.x = 400;
    //     }
    //     else if (0 >= player.x) {
    //         player.reset(1400, player.y)
    //         player.body.velocity.x = -400;
    //     }

    // },
    // // ledgeOut: function (ledge) {
    // //     if (ledge.x >= 1400) {
    // //         ledge.reset(0, ledge.y)
    // //         ledge.body.velocity.x = 400;
    // //     }
    // //     else if (0 >= ledge.x) {
    // //         ledge.reset(1400, ledge.y)
    // //         ledge.body.velocity.x = -400;
    // //     }
    // //     // console.log(this.ledgeX.x + ' ' + this.ledgeX.y);

    // // },
    //////////////Creation of the World///////////////
    worldCreator: function (thisWorldGenerator, gameMode) {
        //Entire Object Fed to Integrate World Generator
        console.log(thisWorldGenerator);
        //////////////////Shuffling Positions of Player and BaseCamp////////////////

        shuffle(thisWorldGenerator.baseCamp);
        console.log(thisWorldGenerator.baseCamp);

        ////////////////////Adding Player//////////////////////
        this.player = this.game.add.sprite(thisWorldGenerator.baseCamp[0].playerXBaseCamp, thisWorldGenerator.baseCamp[0].playerYBaseCamp, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        // this.player.scale.setTo(.6);
        this.player.scale.setTo(.35);
        this.player.body.setSize(63, 84, 5, 6);
        // this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        this.player.body.collideWorldBounds = true;
        // this.player.checkWorldBounds = true;
        // this.player.events.onOutOfBounds.add(this.playerOut, this);

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        //////////////////Adding Weapons////////////////////
        /////////////Pull as Default
        pullBoolean = true;
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon1 = this.game.add.weapon(60, 'bullet1');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon1.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon1.bulletSpeed = 700;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon1.fireRate = 120;
        // Track Player
        this.weapon1.trackSprite(this.player, 0, -20);

        /////////////////Push
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon2 = this.game.add.weapon(60, 'bullet2');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon2.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon2.bulletSpeed = 700;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 120;
        //Match Your Velocity?
        // Track Player
        this.weapon2.trackSprite(this.player, 0, -20);

        ////////////////Stop
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon3 = this.game.add.weapon(60, 'bullet3');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon3.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon3.bulletSpeed = 700;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 120;
        // Track Player
        this.weapon3.trackSprite(this.player, 0, -20);

        //Adding Undeniable Death
        for (var i = 0; i < thisWorldGenerator.world.deathIterator; i++) {
            this.deathX = this.death.create(i * thisWorldGenerator.world.deathX, thisWorldGenerator.world.deathY, 'spikes');
            this.deathX.scale.setTo(1);
            this.deathX.body.immovable = true;
        }

        //Block Debugging
        for (var x = 0; x < thisWorldGenerator.world.iteratorX; x++) {
            for (var y = 0; y < thisWorldGenerator.world.iteratorY; y++) {
                ////////Creation of Rectangle////////////;
                var rect = new Phaser.Rectangle(x * thisWorldGenerator.world.xRectangleF, y * thisWorldGenerator.world.yRectangleF, thisWorldGenerator.world.xBlockSizeF, thisWorldGenerator.world.yBlockSizeF);
                var xOfSprite = rect.x
                var yOfSprite = rect.y

                //Debugging Purposes
                this.text = this.game.add.text(rect.x + 100, rect.y + 100, "Rectangle " + x + " x " + y + " y ", { font: "32px Arial", fill: "#ffffff", align: "center" });
                ////////////Random Array to Scramble Positions//////////
                // var positionArray = [topCenter, topLeft, topRight, center, centerLeft, centerRight, bottomCenter, bottomLeft, bottomRight];
                if (x === thisWorldGenerator.baseCamp[0].iteratorXBaseCamp && y === thisWorldGenerator.baseCamp[0].iteratorYBaseCamp) {
                    this.baseCamp(xOfSprite, yOfSprite, rect, bottomCenter, bottomLeft, bottomRight, centerLeft, centerRight);
                }
                else {
                    shuffle(positionArray);
                    console.log("x" + "y" + x + y + " " + positionArray)
                    //////Sprites//////
                    for (var i = 0; i < thisWorldGenerator.world.amountOfSpritesInGrid; i++) {
                        this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[i]);
                    }
                    if (gameMode === 0) {
                        this.coinSpawn(xOfSprite, yOfSprite, rect, positionArray[thisWorldGenerator.world.amountOfSpritesInGrid])
                        console.log("coin initiated");
                    }
                    else if (gameMode === 1) {
                        if (x === thisWorldGenerator.baseCamp[1].iteratorXBaseCamp && y === thisWorldGenerator.baseCamp[1].iteratorYBaseCamp) {
                            this.finish = this.game.add.sprite(xOfSprite, yOfSprite, 'flag');
                            this.game.physics.arcade.enable(this.finish);
                            this.finish.alignIn(rect, positionArray[i + 1]);
                            console.log("Flag Initiated");
                        }
                    }
                }
            }
        }
    },
    /////////////////////////Randomness of the Map///////////////////////////
    gridSystem: function (x, y, rect, positionInRectangle) {
        //Create Randomness in Each Grid
        var gridSystemGenesis = this.game.rnd.integerInRange(0, 100);
        //Create Random Pattern Within Each Grid
        if (gridSystemGenesis >= 0 && gridSystemGenesis <= 41) {
            this.wallSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 42 && gridSystemGenesis <= 56) {
            this.enemySpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 57 && gridSystemGenesis <= 61) {
            this.ledgeSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 62 && gridSystemGenesis <= 69) {
            this.ledgeDownSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 70 && gridSystemGenesis <= 74) {
            this.ballSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 75 && gridSystemGenesis <= 84) {
            this.ledgeSideSpawn(x, y, rect, positionInRectangle);
        }
        else if (gridSystemGenesis >= 85 && gridSystemGenesis <= 100) {
            this.spikeSpawn(x, y, rect, positionInRectangle);
        }
    },
    //////////////////////////////////////Starting Position of Player//////////////////////////////
    baseCamp: function (x, y, rect, positionInRectangle1, positionInRectangle2, positionInRectangle3, positionInRectangle4, positionInRectangle5) {

        /////////////////////////////////Starting Point of The Map////////////////////////////////

        // console.log("-----------------------------------");
        // console.log("BaseCamp");
        //create wall
        this.wallX = this.wall.create(x, y, 'rotatedWall');
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(.4);
        this.wallX.alignIn(rect, positionInRectangle1);
        this.wallX.body.immovable = true;
        this.wallX.body.moves = false;
        this.ledgeSpawn(x, y, rect, positionInRectangle2);
        this.ledgeSpawn(x, y, rect, positionInRectangle3);
        this.ballSpawn(x, y, rect, positionInRectangle4);
        this.ballSpawn(x, y, rect, positionInRectangle5);
        // console.log("-----------------------------------");

    },
    //////////////////////////Creating Game Objects/////////////////////////
    coinSpawn: function (x, y, rect, positionInRectangle) {
        this.coinX = this.coin.create(x, y, 'coin');
        this.coinX.anchor.setTo(.7);
        this.coinX.scale.setTo(.7);
        this.coinX.alignIn(rect, positionInRectangle);
    },
    wallSpawn: function (x, y, rect, positionInRectangle) {
        this.wallX = this.wall.create(x, y, wallArray[Math.floor(Math.random() * wallArray.length)]);
        this.wallX.anchor.setTo(.5);
        // this.wallX.scale.setTo(.5);
        this.wallX.scale.setTo(wallLength[Math.floor(Math.random() * wallLength.length)]);
        this.wallX.body.collideWorldBounds = true;
        this.wallX.body.bounce.setTo(1);
        this.wallX.alignIn(rect, positionInRectangle)
        // this.wallX.body.immovable = true;
        // this.wallX.body.mass = 200;
        this.wallX.body.velocity.setTo(this.game.rnd.integerInRange(-50, 50), this.game.rnd.integerInRange(-50, 50));
        // this.wallX.body.moves = false;
    },
    enemySpawn: function (x, y, rect, positionInRectangle) {
        this.trumpX = this.enemy.create(x, y, 'enemy');
        this.trumpX.body.velocity.x = this.game.rnd.realInRange(-400, 400);
        // this.trumpX.body.gravity.y = 10;
        this.trumpX.anchor.setTo(.5);
        this.trumpX.scale.setTo(.6);
        this.trumpX.alignIn(rect, positionInRectangle);
        this.trumpX.body.maxVelocity.setTo(400);
        this.trumpX.body.bounce.setTo(1);
        this.trumpX.body.collideWorldBounds = true;
    },
    ledgeSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeX = this.ledge.create(x, y, 'ledge');
        this.ledgeX.body.maxVelocity.setTo(400);
        this.ledgeX.anchor.setTo(.5);
        // this.ledgeX.scale.setTo(.5);
        this.ledgeX.scale.setTo(.4);
        this.ledgeX.alignIn(rect, positionInRectangle);
        this.ledgeX.body.collideWorldBounds = true;
        //////////////////////Ledge Out of Bounds/////////////////////
        // this.ledgeX.checkWorldBounds = true;
        // this.ledgeX.events.onOutOfBounds.add(this.ledgeOut, this);
        this.ledgeX.body.bounce.setTo(1);
    },
    ledgeDownSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeY = this.ledgeDown.create(x, y, 'ledgeDown');
        // this.ledgeY.body.maxVelocity.setTo(400);
        this.ledgeY.anchor.setTo(.5);
        // this.ledgeY.scale.setTo(.5);
        this.ledgeY.scale.setTo(.4);
        this.ledgeY.alignIn(rect, positionInRectangle);
        this.ledgeY.body.collideWorldBounds = true;
        // this.ledgeY.body.immovable = true;
        this.ledgeY.body.bounce.setTo(1);
        this.ledgeY.body.mass = 200;
    },
    ledgeSideSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeSideways = this.ledgeSide.create(x, y, 'ledgeSide');
        this.ledgeSideways.anchor.setTo(.5);
        // this.ledgeSideways.scale.setTo(.5);
        this.ledgeSideways.scale.setTo(.4);
        this.ledgeSideways.alignIn(rect, positionInRectangle);
        // this.ledgeSideways.body.immovable = true;
        this.ledgeSideways.body.velocity.x = this.game.rnd.realInRange(-300, 300);
        this.ledgeSideways.body.collideWorldBounds = true;
        this.ledgeSideways.body.bounce.setTo(1);
    },
    ballSpawn: function (x, y, rect, positionInRectangle) {
        //Adding Ball
        this.ballX = this.ball.create(x, y, 'ball');
        this.ballX.anchor.setTo(.5);
        // this.ballX.scale.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.alignIn(rect, positionInRectangle);
        // this.ballX.body.setCircle(50);
        // this.ballX.body.mass = 5;
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.maxVelocity.setTo(500);
        this.ballX.body.velocity.x = this.game.rnd.realInRange(-100, 100)
        this.ballX.body.bounce.setTo(1.0);
    },
    spikeSpawn: function (x, y, rect, positionInRectangle) {
        // var spikeArray = ['invertedSpikes', 'spikes'];
        // // var spikeLength = [.2, .3, .4, .5];
        // var spikeLength = [.2, .3,];
        this.spikesX = this.spikes.create(x, y, spikeArray[Math.floor(Math.random() * spikeArray.length)]);
        this.spikesX.anchor.setTo(.5);
        this.spikesX.scale.setTo(spikeLength[Math.floor(Math.random() * spikeLength.length)]);
        this.spikesX.alignIn(rect, positionInRectangle);
        this.spikesX.body.immovable = true;
    },
    //Put the Game on Full Screen Mode
    gofull: function () {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
        else {
            this.game.scale.startFullScreen(false);
        }
    },
    //Pausing the Game
    goPause: function () {
        if (this.game.paused) {
            this.game.paused = false;
        }
        else {
            this.game.paused = true;
            //Streak
            // this.pauseText = this.game.add.text(this.player.x, this.player.y, "PAUSE", { font: "32px Arial", fill: "#ffffff", align: "center" });
            // this.pauseText.fixedToCamera = true;
            // this.pauseText.cameraOffset.setTo(1200, 750);
        }
    },
    ///////////////////////Handling Jump Events (Double-Jump)//////////////////
    upInputReleased: function () {
        var released = false;

        released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
        released |= this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);

        return released;
    },
    upInputIsActive: function (duration) {
        var isActive = false;

        isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
        isActive |= this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);

        return isActive;
    },
    ///////////////////////////Weapon Functionality/////////////////
    goPull: function () {
        // console.log("1");
        pullBoolean = true;
        pushBoolean = false;
        stopBoolean = false;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    goPush: function () {
        // console.log("2");
        pullBoolean = false;
        pushBoolean = true;
        stopBoolean = false;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    goKill: function () {
        // console.log("3");
        pullBoolean = false;
        pushBoolean = false;
        stopBoolean = true;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    //How Game Updates Real-Time
    update: function () {
        ///////////God Mode//////////////
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (this.movementLeft.isDown) {
            this.player.body.velocity.x = -400;
            this.player.animations.play('left');
        }
        else if (this.movementRight.isDown) {
            this.player.body.velocity.x = 400;
            this.player.animations.play('right');
        }
        if (this.movementUp.isDown) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
        }
        else if (this.movementDown.isDown) {
            this.player.frame = 10;
            this.player.body.velocity.y = 650;
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

        //Shoot from Directional
        if (pullBoolean) {
            if (this.cursors.up.isDown) {
                this.weapon1.fireAngle = 270;
                this.weapon1.fire();
            }
            else if (this.cursors.down.isDown) {
                this.weapon1.fireAngle = 90;
                this.weapon1.fire();
            }
            else if (this.cursors.left.isDown) {
                this.weapon1.fireAngle = 180;
                this.weapon1.fire();
            }
            else if (this.cursors.right.isDown) {
                this.weapon1.fireAngle = 0;
                this.weapon1.fire();
            }
        }
        else if (pushBoolean) {
            if (this.cursors.up.isDown) {
                this.weapon2.fireAngle = 270;
                this.weapon2.fire();
            }
            else if (this.cursors.down.isDown) {
                this.weapon2.fireAngle = 90;
                this.weapon2.fire();
            }
            else if (this.cursors.left.isDown) {
                this.weapon2.fireAngle = 180;
                this.weapon2.fire();
            }
            else if (this.cursors.right.isDown) {
                this.weapon2.fireAngle = 0;
                this.weapon2.fire();
            }
        }
        else if (stopBoolean) {
            if (this.cursors.up.isDown) {
                this.weapon3.fireAngle = 270;
                this.weapon3.fire();
            }
            else if (this.cursors.down.isDown) {
                this.weapon3.fireAngle = 90;
                this.weapon3.fire();
            }
            else if (this.cursors.left.isDown) {
                this.weapon3.fireAngle = 180;
                this.weapon3.fire();
            }
            else if (this.cursors.right.isDown) {
                this.weapon3.fireAngle = 0;
                this.weapon3.fire();
            }
        }
    }
    // render: function () {
    //     this.game.debug.physicsGroup(this.wall);
    //     this.game.debug.physicsGroup(this.weapon);
    // }
};