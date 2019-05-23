///////////////////////////////////////////Rogue Main Version//////////////////////////////////////////
brawl.rogue = function () { };
brawl.rogue.prototype = {
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
        this.load.image('crosshair', 'assets/shield2.png');
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

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, 5600, 6400);

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
        //Adding Flag (Win Game)
        this.finish = this.game.add.sprite(0, 0, 'win');
        this.game.physics.arcade.enable(this.finish);
        //Adding This Undeniable Death At the Bottom
        this.death = this.game.add.group();
        this.death.enableBody = true;
        for (var i = 0; i < 4; i++) {
            this.deathX = this.death.create(i * 1400, 6250, 'spikes');
            this.deathX.scale.setTo(1);
            this.deathX.body.immovable = true;
        }
        // //Adding World Boundaries
        // this.boundary = this.game.add.group();
        // this.boundary.enableBody = true;
        // for (var i = 0; i < 4; i++) {
        //     if (i <= 1) {
        //         var boundaryKey = 'boundary';
        //         var xCoordinate = 5590;
        //         var yCoordinate = 0;
        //         console.log("ayo");
        //     }
        //     else {
        //         var boundaryKey = 'win';
        //         var xCoordinate = 0;
        //         if (i === 3) {
        //             var yCoordinate = -40;
        //         }
        //         else {
        //             var yCoordinate = 6390;
        //         }
        //         console.log('thefuck');
        //     }
        //     this.boundaryX = this.boundary.create(xCoordinate * i, yCoordinate, boundaryKey);
        //     //5600x
        //     //6400y
        // }

        // this.wallX = this.wall.create(x, y, wallArray[Math.floor(Math.random() * wallArray.length)]);
        // this.wallX.anchor.setTo(.5);
        // // this.wallX.scale.setTo(.5);
        // // var wallLength = [.2, .3, .4];
        // // this.wallX.scale.setTo(wallLength[Math.floor(Math.random() * wallLength.length)]);
        // this.wallX.scale.setTo(.35);
        // this.wallX.body.collideWorldBounds = true;
        // this.wallX.alignIn(rect, positionInRectangle)
        // this.wallX.body.immovable = true;


        ////////////////////Adding Player//////////////////////
        this.player = this.game.add.sprite(200, 6100, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        // this.player.scale.setTo(.6);
        this.player.scale.setTo(.45);
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

        //Player Movement (WASD);
        //Angle Weapon Fire
        this.movementUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.movementDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.movementLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.movementRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D)


        /////////////////////////////////////Adding Mouse Events for PointerLock on Canvas////////////////////////

        //////////////////Adding Weapons////////////////////
        //Set Pull as Default for Weapons;
        pullBoolean = true;
        // console.log(pullBoolean + "pullBoolean Status");
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon1 = this.game.add.weapon(60, 'bullet1');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon1.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon1.bulletSpeed = 700;
        //400 previous value
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon1.fireRate = 120;
        //60 previous value
        //Match Your Velocity?
        // this.weapon.bulletRotateToVelocity = true;
        // Track Player
        this.weapon1.trackSprite(this.player, 0, -20);

        // console.log(pullBoolean + "pullBoolean Status");
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon2 = this.game.add.weapon(60, 'bullet2');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon2.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon2.bulletSpeed = 700;
        //400 previous value
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 120;
        //60 previous value
        //Match Your Velocity?
        // this.weapon2.bulletRotateToVelocity = true;
        // Track Player
        this.weapon2.trackSprite(this.player, 0, -20);

        // console.log(pullBoolean + "pullBoolean Status");
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon3 = this.game.add.weapon(60, 'bullet3');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon3.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon3.bulletSpeed = 700;
        //400 previous value
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 120;
        //60 previous value
        //Match Your Velocity?
        // this.weapon3.bulletRotateToVelocity = true;
        // Track Player
        this.weapon3.trackSprite(this.player, 0, -20);

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

        //////////////////Grid System Creation////////////////
        ///Top Positions
        var topCenter = Phaser.TOP_CENTER;
        var topLeft = Phaser.TOP_LEFT;
        var topRight = Phaser.TOP_RIGHT;
        //Center Positions
        var center = Phaser.CENTER;
        var centerLeft = Phaser.LEFT_CENTER;
        var centerRight = Phaser.RIGHT_CENTER;
        //Bottom Positions
        var bottomCenter = Phaser.BOTTOM_CENTER;
        var bottomLeft = Phaser.BOTTOM_LEFT;
        var bottomRight = Phaser.BOTTOM_RIGHT;

        /////////////////////////Test Grid///////////////////////
        var xBlockSize = 650;
        var yBlockSize = 650;
        var xRectangle = 700;
        var yRectangle = 700;
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 9; y++) {
                ////////Creation of Rectangle////////////

                // var rect = new Phaser.Rectangle(x * xBlockSize, (y * yBlockSize) + 600, xBlockSize, yBlockSize);
                var rect = new Phaser.Rectangle(x * xRectangle, y * yRectangle, xBlockSize, yBlockSize);
                var xOfSprite = rect.x
                var yOfSprite = rect.y
                // console.log(rect);
                // this.testingArray.push(rect);
                // this.text = this.game.add.text(rect.x + 100, rect.y + 100, "Rectangle " + x + y, { font: "32px Arial", fill: "#ffffff", align: "center" });
                // console.log("Rectangle " + x + y);
                ////////////Random Array to Scramble Positions//////////
                // var positionArray = [topCenter, topLeft, topRight, center, centerLeft, centerRight, bottomCenter, bottomLeft, bottomRight];
                if (x === 0 && y === 8) {
                    this.baseCamp(xOfSprite, yOfSprite, rect, bottomCenter, bottomLeft, bottomRight, centerLeft, centerRight);
                }
                else {
                    var positionArray = [];
                    var randomGeneratorForArray = this.game.rnd.integerInRange(0, 100);
                    if (randomGeneratorForArray >= 0 && randomGeneratorForArray <= 25) {
                        // positionArray.push(topCenter);
                        // positionArray.push(bottomLeft);
                        // positionArray.push(centerRight);
                        // positionArray.push(topLeft);
                        positionArray.push(topLeft);
                        positionArray.push(center);
                        positionArray.push(bottomRight);
                        positionArray.push(bottomLeft);
                        positionArray.push(topRight);
                        // console.log("Formation1");
                    }
                    else if (randomGeneratorForArray >= 26 && randomGeneratorForArray <= 50) {
                        positionArray.push(topRight);
                        positionArray.push(center);
                        positionArray.push(bottomLeft);
                        positionArray.push(bottomRight);
                        positionArray.push(bottomCenter);
                        // console.log("Formation2");
                    }
                    else if (randomGeneratorForArray >= 51 && randomGeneratorForArray <= 75) {
                        positionArray.push(topRight);
                        positionArray.push(topLeft);
                        positionArray.push(bottomRight);
                        positionArray.push(centerLeft);
                        positionArray.push(bottomLeft);
                        // console.log("Formation3");
                    }
                    else if (randomGeneratorForArray >= 76 && randomGeneratorForArray <= 100) {
                        positionArray.push(centerLeft);
                        positionArray.push(bottomCenter);
                        positionArray.push(centerRight);
                        positionArray.push(bottomRight);
                        positionArray.push(topLeft);
                        // console.log("Formation4");
                    }

                    // console.log(positionArray);
                    //////Sprites//////
                    for (var i = 0; i < 5; i++) {
                        this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[i]);
                        // console.log("---------------------------------------------------");
                    }
                }
            }
        }

        // //Base Camp (Starting Area);
        // this.baseCamp();

        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

        //Streak
        //3300
        this.text = this.game.add.text(200, 6208, "Streak: " + streak, { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(100, 750);

        //Debugging Weapons
        this.weaponType = "Pull";
        this.text2 = this.game.add.text(1200, 6208, "Weapon Type: " + this.weaponType);
        this.text2.fixedToCamera = true;
        this.text2.cameraOffset.setTo(1000, 750);

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
    //////////////Creation of the Grid System (Objects Spawning)///////////////
    gridSystem: function (x, y, rect, positionInRectangle) {
        //Create Randomness in Each Grid
        var gridSystemGenesis = this.game.rnd.integerInRange(0, 100);
        //Create Random Pattern Within Each Grid
        // var randomPattern = this.game.rnd.integerInRange(0, 100);
        //Alpha One Build:
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
    ///////////////////////////////Mouse or PointerLock///////////////////////////
    // pointerHold: function () {
    //     game.input.pointerLock.request();
    // },
    // move: function (pointer, x, y, click) {
    //     // if (game.input.mouse.locked && !click)
    //     // {
    //     //     this.crosshair.x += this.game.input.activePointer.movementX;
    //     //     this.crosshair.y += this.game.input.activePointer.movementY;
    //     // }
    //     // this.crosshair.x += this.game.input.activePointer.movementX;
    //     // this.crosshair.y += this.game.input.activePointer.movementY;
    //     if (game.input.mouse.locked && !click) {
    //         // console.log("locked");
    //         // console.log(this.game.input.activePointer.movementX+"x");
    //         // console.log(this.game.input.activePointer.movementY+"y");

    //         this.crosshair.x += this.game.input.activePointer.X;
    //         this.crosshair.y += this.game.input.activePointer.Y;


    //     }
    // },
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
    // Creating Game Objects
    wallSpawn: function (x, y, rect, positionInRectangle) {
        var wallArray = ['brownPlatform', 'wall', 'rotatedWall'];
        this.wallX = this.wall.create(x, y, wallArray[Math.floor(Math.random() * wallArray.length)]);
        this.wallX.anchor.setTo(.5);
        // this.wallX.scale.setTo(.5);
        // var wallLength = [.2, .3, .4];
        // this.wallX.scale.setTo(wallLength[Math.floor(Math.random() * wallLength.length)]);
        this.wallX.scale.setTo(.35);
        this.wallX.body.collideWorldBounds = true;
        this.wallX.body.bounce.setTo(1);
        this.wallX.alignIn(rect, positionInRectangle)
        // this.wallX.body.immovable = true;
        this.wallX.body.mass = 200;
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
        var spikeArray = ['invertedSpikes', 'spikes'];
        // var spikeLength = [.2, .3, .4, .5];
        var spikeLength = [.2, .3,];
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

        // console.log(this.game.time.fps);
        ////////////////////////Physics////////////////////////
        //Player Mechanics

        var onWall = this.game.physics.arcade.collide(this.player, this.wall, playerWall);
        var onLedgeGrey = this.game.physics.arcade.collide(this.player, this.ledge, ledgeUp);
        var onLedgeGreen = this.game.physics.arcade.collide(this.player, this.ledgeDown, ledgeDownS);
        var onLedgeBlue = this.game.physics.arcade.collide(this.player, this.ledgeSide, ledgeSideX);
        // this.game.physics.arcade.collide(this.player, this.ball, ballMover, ballGround);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, ballMover);

        //Weapon One Mechanics
        this.game.physics.arcade.collide(this.weapon1.bullets, this.ball, weaponBall, null, this);
        this.game.physics.arcade.collide(this.weapon1.bullets, this.wall, weaponWall, null, this);
        this.game.physics.arcade.collide(this.weapon1.bullets, this.spikes, weaponSpikes, null, this);
        this.game.physics.arcade.collide(this.weapon1.bullets, this.ledge, weaponLedge, null, this);
        this.game.physics.arcade.collide(this.weapon1.bullets, this.ledgeDown, weaponDownLedge, null, this);
        this.game.physics.arcade.collide(this.weapon1.bullets, this.ledgeSide, weaponSideLedge, null, this);
        this.game.physics.arcade.collide(this.weapon1.bullets, this.enemy, weaponEnemy, null, this);
        // this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);


        //Weapon Two Mechanics
        this.game.physics.arcade.collide(this.weapon2.bullets, this.ball, weaponBall, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, this.wall, weaponWall, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, this.spikes, weaponSpikes, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, this.ledge, weaponLedge, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, this.ledgeDown, weaponDownLedge, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, this.ledgeSide, weaponSideLedge, null, this);
        this.game.physics.arcade.collide(this.weapon2.bullets, this.enemy, weaponEnemy, null, this);
        // this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);

        //Weapon Three Mechanics
        this.game.physics.arcade.collide(this.weapon3.bullets, this.ball, weaponBall, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, this.wall, weaponWall, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, this.spikes, weaponSpikes, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, this.ledge, weaponLedge, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, this.ledgeDown, weaponDownLedge, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, this.ledgeSide, weaponSideLedge, null, this);
        this.game.physics.arcade.collide(this.weapon3.bullets, this.enemy, weaponEnemy, null, this);
        // this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);

        //Boundary Mechanics
        // this.game.physics.arcade.overlap(this.boundary, this.wall, boundaryCollisionCheck, null, this);
        // this.game.physics.arcade.overlap(this.boundary, this.ledgeDown, boundaryCollisionCheck, null, this);
        // this.game.physics.arcade.overlap(this.boundary, this.ledgeSide, boundaryCollisionCheck, null, this);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, this.ball);
        this.game.physics.arcade.collide(this.ball, this.wall, ballWall);
        this.game.physics.arcade.overlap(this.ball, this.spikes, deathThree);
        this.game.physics.arcade.collide(this.ball, this.ledge, ballLedge);
        this.game.physics.arcade.collide(this.ball, this.ledgeDown, ballLedgeDown);
        this.game.physics.arcade.collide(this.ball, this.ledgeSide);
        this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);

        //Ledge vs. Ledge Mechanics
        // this.game.physics.arcade.collide(this.ledge, this.ledge);
        // this.game.physics.arcade.collide(this.ledgeDown, this.ledgeDown);
        this.game.physics.arcade.collide(this.ledge, this.ledgeDown, preventPhysicsBug);
        this.game.physics.arcade.collide(this.ledge, this.ledgeSide);
        this.game.physics.arcade.collide(this.ledgeDown, this.ledgeSide);

        //Ledge vs. Other Objects
        // this.game.physics.arcade.collide(this.ledge, this.wall, preventPhysicsBug);
        this.game.physics.arcade.collide(this.ledge, this.enemy, enemyLedge);
        this.game.physics.arcade.collide(this.ledge, this.spikes, preventPhysicsBug);
        // this.game.physics.arcade.collide(this.ledgeDown, this.wall, preventPhysicsBug);
        // this.game.physics.arcade.collide(this.ledgeDown, this.enemy, enemyLedge);
        this.game.physics.arcade.collide(this.ledgeDown, this.enemy);
        // this.game.physics.arcade.collide(this.ledgeDown, this.spikes, preventPhysicsBug);
        this.game.physics.arcade.collide(this.ledgeDown, this.spikes);
        // this.game.physics.arcade.collide(this.ledgeSide, this.wall, preventPhysicsBug);
        this.game.physics.arcade.collide(this.ledgeSide, this.enemy, enemyLedgeBlue);

        //Enemy Mechanics
        this.game.physics.arcade.collide(this.enemy, this.spikes);
        this.game.physics.arcade.collide(this.enemy, this.wall);
        this.game.physics.arcade.collide(this.enemy, this.enemy);

        // //Flag Moving Mechanics
        // this.game.physics.arcade.collide(this.finish, this.wall);
        // this.game.physics.arcade.collide(this.finish, this.enemy);
        // this.game.physics.arcade.collide(this.finish, this.ledge);
        // this.game.physics.arcade.collide(this.finish, this.ledgeDown);
        // this.game.physics.arcade.collide(this.finish, this.ledgeSide);
        // this.game.physics.arcade.collide(this.finish, this.spikes);
        // this.game.physics.arcade.collide(this.finish, this.ball);

        //Win
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, this.enemy, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.death, deathOne, null, this);
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

        //////////////////////////Double Jump Only from the ground/////////////////
        // if (onTheGround) {
        //     this.jumps = 2;
        //     this.jumping = false;
        // }

        // if (onTheLeftSide || onTheRightSide || onUpsideDown) {
        //     this.jumps = 0;
        //     this.jumping = false;
        // }

        // Jump!
        if (this.jumps > 0 && this.upInputIsActive(5)) {
            this.player.body.velocity.y = -400;
            this.jumping = true;
        }

        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }

        //Player Standing Still
        this.player.body.velocity.x = 0;

        //Player Angle Still
        this.player.angle = 0;

        //////////////////////////////////////////WASD Controls//////////////////////////////////////////////
        if (onTheGround) {
            if (this.movementLeft.isDown) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.movementRight.isDown) {
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 8;
            }
        }
        else if (onTheRightSide) {
            this.player.body.velocity.x = 100;
            this.player.body.velocity.y = 100;
            if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey) {
                this.player.frame = 6;
            }
            if (this.movementLeft.isDown) {
                this.player.body.velocity.y = -500;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (onTheLeftSide) {
            this.player.body.velocity.x = -100;
            this.player.body.velocity.y = 100;
            if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey) {
                this.player.frame = 12;
            }
            if (this.movementRight.isDown) {
                this.player.body.velocity.y = -500;
                this.player.body.velocity.x = 1000;
            }
        }
        else if (onUpsideDown) {
            this.player.animations.stop();
            this.player.frame = 8;
            this.player.angle = 180;
            this.player.body.velocity.y = -100;
            if (this.movementLeft.isDown) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.movementRight.isDown) {
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            }

        }
        if (onNone) {
            this.player.frame = 10;
            if (this.movementLeft.isDown) {
                this.player.body.velocity.x = -400;
            }
            else if (this.movementRight.isDown) {
                this.player.body.velocity.x = 400;
            }
        }

        //////////Downwards Mechanics
        if (this.movementDown.isDown && onUpsideDown) {
            this.player.frame = 13;
            this.player.body.velocity.y = 200;
        }

        //Downward Mechanics
        if (this.movementDown.isDown) {
            this.player.frame = 13;
            this.player.body.velocity.y = 500;
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

        // console.log(this.crosshair.x + ' ' + this.crosshair.y);
    }
    // render: function () {
    //     this.game.debug.physicsGroup(this.wall);
    //     this.game.debug.physicsGroup(this.weapon);
    // }
};