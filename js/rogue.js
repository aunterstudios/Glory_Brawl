///////////////////////////////////////////Rogue Main Version//////////////////////////////////////////
brawl.rogue = function () { };
brawl.rogue.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.game.forceSingleUpdate = true;
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
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        // Stretch to fill (Full Screen Mode)
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.F);

        this.fullSize.onDown.add(this.gofull, this);

        //Pause Menu (Freeze TIME LOL)
        this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

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
        //Adding This Undeniable Death
        this.death = this.game.add.group();
        this.death.enableBody = true;
        for (var i = 0; i < 4; i++) {
            this.deathX = this.death.create(i * 1400, 6250, 'spikes');
            this.deathX.scale.setTo(1);
            this.deathX.body.immovable = true;
        }


        //Adding Player
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

        ///////////Alpha Build One///////////
        // var xBlockSize = 280;
        // var yBlockSize = 375;

        // for (var x = 0; x < 20; x++) {
        //     for (var y = 0; y < 16; y++) {
        //         var xRandom = this.game.rnd.realInRange((x * xBlockSize) + 1, (x + 1) * xBlockSize);
        //         var yRandom = this.game.rnd.realInRange((y * yBlockSize) + 1, (y + 1) * yBlockSize);
        //         this.gridSystem(xRandom, yRandom);
        //         // console.log(x + ' ' + y + ' ' + xRandom + ' ' + yRandom);
        //     }
        // }

        /////////Alpha Build Six//////////
        /////////Alpha Build Six//////////
        // var xBlockSize = 300;
        // var yBlockSize = 500;
        // for (var x = 0; x < 14; x++) {
        //     for (var y = 0; y < 10; y++) {
        //         // Phaser.TOP_LEFT, Phaser.TOP_CENTER, Phaser.TOP_RIGHT, Phaser.LEFT_CENTER, Phaser.CENTER, Phaser.RIGHT_CENTER, Phaser.BOTTOM_LEFT, Phaser.BOTTOM_CENTER and Phaser.BOTTOM_RIGHT.
        //         ////////////X Grid System///////////

        //         var xOfSprite = (x * xBlockSize) + 225;
        //         var yOfSprite = (y * yBlockSize) + 300;
        //         console.log("X Iterator: " + x + " " + xOfSprite + " Y Iterator: " + y + " " + yOfSprite);

        //         ////////Creation of Rectangle////////////

        //         // var rect = new Phaser.Rectangle(x * xBlockSize, (y * yBlockSize) + 600, xBlockSize, yBlockSize);
        //         var rect = new Phaser.Rectangle(x*400, y*600, xBlockSize, yBlockSize);
        //         console.log(rect);
        //         ////////////Random Array to Scramble Positions//////////
        //         // var positionArray = [topCenter, topLeft, topRight, center, centerLeft, centerRight, bottomCenter, bottomLeft, bottomRight];
        //         var positionArray = [];
        //         var randomGeneratorForArray = this.game.rnd.integerInRange(0, 100);
        //         if (randomGeneratorForArray >= 0 && randomGeneratorForArray <= 25) {
        //             positionArray.push(topCenter);
        //             positionArray.push(bottomLeft);
        //             positionArray.push(centerRight);
        //             positionArray.push(topLeft);
        //         }
        //         else if (randomGeneratorForArray >= 26 && randomGeneratorForArray <= 50) {
        //             positionArray.push(topLeft);
        //             positionArray.push(bottomCenter);
        //             positionArray.push(centerLeft);
        //             positionArray.push(centerRight);
        //         }
        //         else if (randomGeneratorForArray >= 51 && randomGeneratorForArray <= 75) {
        //             positionArray.push(topRight);
        //             positionArray.push(center);
        //             positionArray.push(bottomRight);
        //             positionArray.push(bottomLeft);
        //         }
        //         else if (randomGeneratorForArray >= 76 && randomGeneratorForArray <= 100) {
        //             positionArray.push(topCenter);
        //             positionArray.push(bottomCenter);
        //             positionArray.push(centerLeft);
        //             positionArray.push(topRight);
        //         }

        //         console.log(positionArray);
        //         //////Sprites//////
        //         this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[0]);
        //         this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[1]);
        //         this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[2]);
        //         this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[3]);

        //     }
        // }

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
                    console.log("-----------------------------------");
                    console.log("BaseCamp");
                    //create wall
                    this.wallX = this.wall.create(xOfSprite, yOfSprite, 'rotatedWall');
                    this.wallX.anchor.setTo(.5);
                    this.wallX.scale.setTo(.4);
                    this.wallX.alignIn(rect, bottomCenter);
                    this.wallX.body.immovable = true;
                    this.wallX.body.moves = false;
                    this.ledgeSpawn(xOfSprite, yOfSprite, rect, bottomLeft);
                    this.ledgeSpawn(xOfSprite, yOfSprite, rect, bottomRight);
                    this.ballSpawn(xOfSprite, yOfSprite, rect, centerLeft);
                    this.ballSpawn(xOfSprite, yOfSprite, rect, centerRight);
                    console.log("-----------------------------------");
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
                        console.log("Formation1");
                    }
                    else if (randomGeneratorForArray >= 26 && randomGeneratorForArray <= 50) {
                        positionArray.push(topRight);
                        positionArray.push(center);
                        positionArray.push(bottomLeft);
                        positionArray.push(bottomRight);
                        positionArray.push(bottomCenter);
                        console.log("Formation2");
                    }
                    else if (randomGeneratorForArray >= 51 && randomGeneratorForArray <= 75) {
                        positionArray.push(topRight);
                        positionArray.push(topLeft);
                        positionArray.push(bottomRight);
                        positionArray.push(centerLeft);
                        positionArray.push(bottomLeft);
                        console.log("Formation3");
                    }
                    else if (randomGeneratorForArray >= 76 && randomGeneratorForArray <= 100) {
                        positionArray.push(centerLeft);
                        positionArray.push(bottomCenter);
                        positionArray.push(centerRight);
                        positionArray.push(bottomRight);
                        positionArray.push(topLeft);
                        console.log("Formation4");
                    }

                    // console.log(positionArray);
                    //////Sprites//////
                    this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[0]);
                    this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[1]);
                    this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[2]);
                    this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[3]);
                    this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[4]);
                    console.log("---------------------------------------------------");
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
    ////////////////Creation of the Grid System (objects Spawning)/////////////////
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
    baseCamp: function () {

        /////////////////////////////////Starting Point of The Map////////////////////////////////

        //create wall
        this.wallX = this.wall.create(2800, 6300, 'rotatedWall');
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(.4);
        this.wallX.body.immovable = true;

        //Create Ledge
        this.ledgeX = this.ledge.create(2800, 6200, 'ledge');
        this.ledgeX.body.maxVelocity.setTo(400);
        this.ledgeX.anchor.setTo(.5);
        // this.ledgeX.scale.setTo(.5);
        this.ledgeX.scale.setTo(.4);
        this.ledgeX.body.collideWorldBounds = true;
        //////////////////////Ledge Out of Bounds/////////////////////
        // this.ledgeX.checkWorldBounds = true;
        // this.ledgeX.events.onOutOfBounds.add(this.ledgeOut, this);
        this.ledgeX.body.bounce.setTo(1);

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
        this.wallX.alignIn(rect, positionInRectangle)
        this.wallX.body.immovable = true;
        this.wallX.body.moves = false;
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
        this.ledgeY.body.immovable = true;
        this.ledgeY.body.bounce.setTo(1);
    },
    ledgeSideSpawn: function (x, y, rect, positionInRectangle) {
        this.ledgeSideways = this.ledgeSide.create(x, y, 'ledgeSide');
        this.ledgeSideways.anchor.setTo(.5);
        // this.ledgeSideways.scale.setTo(.5);
        this.ledgeSideways.scale.setTo(.4);
        this.ledgeSideways.alignIn(rect, positionInRectangle);
        this.ledgeSideways.body.immovable = true;
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
        this.ballX.body.setCircle(50);
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

        released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
        released |= this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR)

        return released;
    },
    upInputIsActive: function (duration) {
        var isActive = false;

        isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
        isActive |= this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);

        return isActive;
    },
    //How Game Updates Real-Time
    update: function () {

        ////////////////////////Physics////////////////////////
        //Player Mechanics

        var onWall = this.game.physics.arcade.collide(this.player, this.wall);
        var onLedgeGrey = this.game.physics.arcade.collide(this.player, this.ledge, ledgeUp);
        var onLedgeGreen = this.game.physics.arcade.collide(this.player, this.ledgeDown, ledgeDownS);
        var onLedgeBlue = this.game.physics.arcade.collide(this.player, this.ledgeSide, ledgeSideX);
        // this.game.physics.arcade.collide(this.player, this.ball, ballMover, ballGround);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, ballMover);


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
        this.game.physics.arcade.collide(this.ledgeSide, this.enemy);

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

        /////////////////////////////God Mode/////////////////////////////////////

        //////////Player Standing Still//////////////
        // this.player.body.velocity.y = 0;
        // this.player.body.velocity.x = 0;

        // if (this.cursors.left.isDown) {
        //     this.player.body.velocity.x = -400;
        //     this.player.animations.play('left');
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.body.velocity.x = 400;
        //     this.player.animations.play('right');
        // }
        // if (this.cursors.up.isDown) {
        //     this.player.frame = 10;
        //     this.player.body.velocity.y = -650;
        // }
        // else if (this.cursors.down.isDown) {
        //     this.player.frame = 10;
        //     this.player.body.velocity.y = 650;
        // }

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
            this.player.body.velocity.y = -600;
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

        if (onTheGround) {
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 8;
            }
        }
        else if (onTheRightSide) {
            this.player.body.velocity.x = 50;
            this.player.body.velocity.y = 100;
            if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey) {
                this.player.frame = 6;
            }
            if (this.cursors.left.isDown) {
                this.player.body.velocity.y = -500;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (onTheLeftSide) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            if (onWall || onLedgeBlue || onLedgeGreen || onLedgeGrey) {
                this.player.frame = 12;
            }
            if (this.cursors.right.isDown) {
                this.player.body.velocity.y = -500;
                this.player.body.velocity.x = 1000;
            }
        }
        else if (onUpsideDown) {
            this.player.animations.stop();
            this.player.frame = 8;
            this.player.angle = 180;
            this.player.body.velocity.y = -100;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            }

        }
        if (onNone) {
            this.player.frame = 10;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -400;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 400;
            }
        }

        //////////Downwards Mechanics
        if (this.cursors.down.isDown && onUpsideDown) {
            this.player.frame = 13;
            this.player.body.velocity.y = 200;
        }

        //Downward Mechanics
        if (this.cursors.down.isDown) {
            this.player.frame = 13;
            this.player.body.velocity.y = 500;
        }
    },
    // render: function () {
    //     function getRandomColor() {
    //         var letters = '0123456789ABCDEF';
    //         var color = '#';
    //         for (var i = 0; i < 6; i++) {
    //             color += letters[Math.floor(Math.random() * 16)];
    //         }
    //         return color;
    //     }

    //     for (var i = 0; i < this.testingArray.length; i++) {
    //         if (this.testingArray[i].flagged) {
    //             this.game.debug.geom(this.testingArray[i], getRandomColor());
    //         }
    //         else {
    //             this.game.debug.geom(this.testingArray[i]);
    //         }

    //         this.game.debug.text(this.testingArray[i].id, this.testingArray[i].x + 4, this.testingArray[i].y + 16);
    //     }

    // }
};