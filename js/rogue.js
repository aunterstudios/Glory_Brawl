///////////////////////////////////////////Rogue Test//////////////////////////////////////////
brawl.state12 = function () { };
brawl.state12.prototype = {
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
        this.load.image('win', 'assets/flag.png');
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

        //Pause Menu
        this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        this.pause.onDown.add(this.goPause, this);

        // Setting World Stage

        //3200
        this.game.world.setBounds(0, 0, 1400, 6400);

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


        //Adding Player
        //3000
        this.player = this.game.add.sprite(700, 6180, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.6);
        this.player.body.setSize(63, 84, 5, 6);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        // this.player.body.collideWorldBounds = true;
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(this.playerOut, this);

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        //////////////////Grid System Creation////////////////

        var xBlockSize = 280;
        var yBlockSize = 450;

        //6
        for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 13; y++) {
                var xRandom = this.game.rnd.realInRange((x * xBlockSize) + 1, (x + 1) * xBlockSize);
                var yRandom = this.game.rnd.realInRange((y * yBlockSize) + 1, (y + 1) * yBlockSize);
                this.gridSystem(xRandom, yRandom);
                // console.log(x + ' ' + y + ' ' + xRandom + ' ' + yRandom);
            }
        }

        //Base Camp (Starting Area);
        this.baseCamp();

        //Adding Flag (Win Game)
        var finishX = this.game.rnd.integerInRange(0, 1400);
        var finishY = this.game.rnd.integerInRange(0, 350)
        this.finish = this.game.add.sprite(finishX, finishY, 'win');
        this.game.physics.arcade.enable(this.finish);
        this.finish.body.collideWorldBounds = true;
        this.finish.body.velocity.x = 20;
        this.finish.body.bounce.setTo(1);
        this.finish.body.maxVelocity.setTo(100);


        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

        //Streak
        //3300
        this.text = this.game.add.text(200, 6208, "Streak: " + streak, { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(100, 750);

    },
    playerOut: function () {
        if (this.player.x >= 1400) {
            this.player.reset(0, this.player.y)
            this.player.body.velocity.x = 400;
        }
        else if (0 >= this.player.x) {
            this.player.reset(1400, this.player.y)
            this.player.body.velocity.x = -400;
        }

    },
    //Creation of the Grid System (objects Spawning)
    gridSystem: function (x, y) {
        //Create Randomness in Each Grid
        var gridSystemGenesis = this.game.rnd.integerInRange(0, 100);
        if (gridSystemGenesis >= 0 && gridSystemGenesis <= 46) {
            this.wallSpawn(x, y);
        }
        else if (gridSystemGenesis >= 47 && gridSystemGenesis <= 61) {
            this.enemySpawn(x, y);
        }
        else if (gridSystemGenesis >= 62 && gridSystemGenesis <= 72) {
            this.ledgeDownSpawn(x,y);
        }
        else if (gridSystemGenesis >= 73 && gridSystemGenesis <= 79) {
            this.ledgeSideSpawn(x, y);
        }
        else if (gridSystemGenesis >= 80 && gridSystemGenesis <= 100) {
            this.spikeSpawn(x, y);
        }
    },
    baseCamp: function () {

        //Spawning Ledges
        for (var i = 0; i<4; i++) {
            this.ledgeSpawn((i*350)+200,6200);
        }

        //create wall
        this.wallX = this.wall.create(700, 6250, 'rotatedWall');
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(.5);
        this.wallX.body.immovable = true;

        //create ball
        this.ballSpawn(700, 6000);

        //creating spikes
        for (var i = 0; i < 2; i++) {
            var iteratorSpikes = i * 300;
            this.spikesX = this.spikes.create(0, iteratorSpikes + 6300, 'spikes');
            this.spikesX.scale.setTo(1);
            this.spikesX.body.immovable = true;
        }
    },
    // Creating Game Objects
    wallSpawn: function (x, y) {
        var wallArray = ['brownPlatform', 'wall', 'rotatedWall'];
        this.wallX = this.wall.create(x, y, wallArray[Math.floor(Math.random() * wallArray.length)]);
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(.5);
        this.wallX.body.immovable = true;
    },
    enemySpawn: function (x, y) {
        this.trumpX = this.enemy.create(x, y, 'enemy');
        this.trumpX.body.velocity.x = this.game.rnd.realInRange(-1000, 1000)
        // this.trumpX.body.gravity.y = 10;
        this.trumpX.body.maxVelocity.setTo(1000);
        this.trumpX.body.bounce.setTo(1);
        this.trumpX.body.collideWorldBounds = true;
    },
    ledgeSpawn: function (x, y) {
        this.ledgeX = this.ledge.create(x, y, 'ledge');
        this.ledgeX.body.maxVelocity.setTo(400);
        this.ledgeX.anchor.setTo(.5);
        this.ledgeX.scale.setTo(.5);
        this.ledgeX.body.collideWorldBounds = true;
        this.ledgeX.body.bounce.setTo(1);
    },
    ledgeDownSpawn: function (x, y) {
        this.ledgeY = this.ledgeDown.create(x, y, 'ledgeDown');
        // this.ledgeY.body.maxVelocity.setTo(400);
        this.ledgeY.anchor.setTo(.5);
        this.ledgeY.scale.setTo(.5);
        this.ledgeY.body.collideWorldBounds = true;
        this.ledgeY.body.immovable = true;
        this.ledgeY.body.bounce.setTo(1);
    },
    ledgeSideSpawn: function (x, y) {
        this.ledgeSideways = this.ledgeSide.create(x, y, 'ledgeSide');
        this.ledgeSideways.anchor.setTo(.5);
        this.ledgeSideways.scale.setTo(.5);
        this.ledgeSideways.body.immovable = true;
        this.ledgeSideways.body.velocity.x = this.game.rnd.realInRange(-500, 500);
        this.ledgeSideways.body.collideWorldBounds = true;
        this.ledgeSideways.body.bounce.setTo(1);
    },
    ballSpawn: function (x, y) {
        //Adding Ball
        this.ballX = this.ball.create(x, y, 'ball');
        this.ballX.anchor.setTo(.5);
        this.ballX.scale.setTo(.5);
        // this.ballX.body.setCircle(50);
        this.ballX.body.mass = 5;
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.maxVelocity.setTo(150);
        this.ballX.body.velocity.x = this.game.rnd.realInRange(-100, 100)
        this.ballX.body.bounce.setTo(1.0);
    },
    spikeSpawn: function (x, y) {
        var spikeArray = ['invertedSpikes', 'spikes'];
        var spikeLength = [.2, .3, .4, .5];
        this.spikesX = this.spikes.create(x, y, spikeArray[Math.floor(Math.random() * spikeArray.length)]);
        this.spikesX.anchor.setTo(.5);
        this.spikesX.scale.setTo(spikeLength[Math.floor(Math.random() * spikeLength.length)]);
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
        this.game.physics.arcade.collide(this.player, this.ball, ballMover);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, this.ball);
        this.game.physics.arcade.collide(this.ball, this.wall);
        this.game.physics.arcade.overlap(this.ball, this.spikes, deathThree);
        this.game.physics.arcade.collide(this.ball, this.ledge);
        this.game.physics.arcade.collide(this.ball, this.ledgeDown);
        this.game.physics.arcade.collide(this.ball, this.ledgeSide);
        this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);

        //Ledge vs. Ledge Mechanics
        // this.game.physics.arcade.collide(this.ledge, this.ledge);
        // this.game.physics.arcade.collide(this.ledgeDown, this.ledgeDown);
        this.game.physics.arcade.collide(this.ledge, this.ledgeDown);
        this.game.physics.arcade.collide(this.ledge, this.ledgeSide);
        this.game.physics.arcade.collide(this.ledgeDown, this.ledgeSide);

        //Ledge vs. Other Objects
        this.game.physics.arcade.collide(this.ledge, this.wall, preventPhysicsBug);
        this.game.physics.arcade.collide(this.ledge, this.enemy, enemyLedge);
        this.game.physics.arcade.collide(this.ledge, this.spikes, preventPhysicsBug);
        // this.game.physics.arcade.collide(this.ledgeDown, this.wall, preventPhysicsBug);
        // this.game.physics.arcade.collide(this.ledgeDown, this.enemy, enemyLedge);
        this.game.physics.arcade.collide(this.ledgeDown, this.enemy);
        // this.game.physics.arcade.collide(this.ledgeDown, this.spikes, preventPhysicsBug);
        this.game.physics.arcade.collide(this.ledgeDown, this.spikes);
        this.game.physics.arcade.collide(this.ledgeSide, this.wall);
        this.game.physics.arcade.collide(this.ledgeSide, this.enemy);

        //Enemy Mechanics
        this.game.physics.arcade.collide(this.enemy, this.spikes);
        this.game.physics.arcade.collide(this.enemy, this.wall);
        this.game.physics.arcade.collide(this.enemy, this.enemy);

        //Flag Moving Mechanics
        this.game.physics.arcade.collide(this.finish, this.wall);
        this.game.physics.arcade.collide(this.finish, this.enemy);
        this.game.physics.arcade.collide(this.finish, this.ledge);
        this.game.physics.arcade.collide(this.finish, this.ledgeDown);
        this.game.physics.arcade.collide(this.finish, this.ledgeSide);
        this.game.physics.arcade.collide(this.finish, this.spikes);
        this.game.physics.arcade.collide(this.finish, this.ball);

        //Win
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, this.enemy, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);

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
    //     this.game.debug.body(this.player);
    // }
};