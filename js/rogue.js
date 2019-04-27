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
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        // Stretch to fill (Full Screen Mode)
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.spacebar.onDown.add(this.gofull, this);

        // Setting World Stage

        this.game.world.setBounds(0, 0, 1400, 2000);

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        /////////////////Adding Sprite Groups//////////////
        //Adding the Wall
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        //Adding Ledge
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
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
        this.player = this.game.add.sprite(100, 1750, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.60);
        this.player.body.setSize(75, 84, 5, 6);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        this.player.body.collideWorldBounds = true;

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        //////////////////Grid System Creation////////////////

        var xBlockSize = 350;
        var yBlockSize = 400;

        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 5; y++) {
                var xRandom = this.game.rnd.realInRange((x*xBlockSize)+1, (x+1)*xBlockSize);
                var yRandom = this.game.rnd.realInRange((y*yBlockSize)+1, (y+1)*yBlockSize);
                this.gridSystem(xRandom,yRandom);
                console.log(x+ ' ' + y+ ' ' +xRandom + ' ' + yRandom);
            }
        }

        
        // for (var i = 0; i < 20; i++) {

        //     ////////////The X-Axis Block///////////
        //     var block1x = this.game.rnd.realInRange(0, 350);
        //     var block2x = this.game.rnd.realInRange(351, 700);
        //     var block3x = this.game.rnd.realInRange(701, 1050);
        //     var block4x = this.game.rnd.realInRange(1051, 1400);
        //     ////////////The Y-Axis Block///////////
        //     var block1y = this.game.rnd.realInRange(0, 400);
        //     var block2y = this.game.rnd.realInRange(401, 800);
        //     var block3y = this.game.rnd.realInRange(801, 1200);
        //     var block4y = this.game.rnd.realInRange(1201, 1600);
        //     var block5y = this.game.rnd.realInRange(1601, 2000);

        //     //block 1
        //     if (i === 0) {
        //         this.gridSystem(block1x, block5y);
        //         console.log(block1x,block5y);
        //     }
        //     else if (i === 1) {
        //         this.gridSystem(block2x, block5y);
        //         console.log(block2x,block5y);
        //     }
        //     else if (i === 2) {
        //         this.gridSystem(block3x, block5y);
        //         console.log(block3x,block5y);
        //     }
        //     else if (i === 3) {
        //         this.gridSystem(block4x, block5y);
        //         console.log(block4x,block5y);
        //     }
        //     else if (i === 4) {
        //         this.gridSystem(block1x, block4y);
        //         console.log(block1x,block4y);
        //     }
        //     else if (i === 5) {
        //         this.gridSystem(block2x, block4y);
        //     }
        //     else if (i === 6) {
        //         this.gridSystem(block3x, block4y);
        //     }
        //     else if (i === 7) {
        //         this.gridSystem(block4x, block4y);
        //     }
        //     else if (i === 8) {
        //         this.gridSystem(block1x, block3y);
        //     }
        //     else if (i === 9) {
        //         this.gridSystem(block2x, block3y);
        //     }
        //     else if (i === 10) {
        //         this.gridSystem(block3x, block3y);
        //     }
        //     else if (i === 11) {
        //         this.gridSystem(block4x, block3y);
        //     }
        //     else if (i === 12) {
        //         this.gridSystem(block1x, block2y);
        //     }
        //     else if (i === 13) {
        //         this.gridSystem(block2x, block2y);
        //     }
        //     else if (i === 14) {
        //         this.gridSystem(block3x, block2y);
        //     }
        //     else if (i === 15) {
        //         this.gridSystem(block4x, block2y);
        //     }
        //     else if (i === 16) {
        //         this.gridSystem(block1x, block1y);
        //     }
        //     else if (i === 17) {
        //         this.gridSystem(block2x, block1y);
        //     }
        //     else if (i === 18) {
        //         this.gridSystem(block3x, block1y);
        //     }
        //     else if (i === 19) {
        //         this.gridSystem(block4x, block1y);
        //     }
        // }
        

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    },
    //Creation of the Grid System (objects Spawning)
    gridSystem: function (x, y) {
        //Create Randomness in Each Grid
        var gridSystemGenesis = this.game.rnd.integerInRange(0, 4);
        if (gridSystemGenesis === 0) {
            this.wallSpawn(x, y);
        }
        else if (gridSystemGenesis === 1) {
            this.enemySpawn(x, y);
        }
        else if (gridSystemGenesis === 2) {
            this.ledgeSpawn(x, y);
        }
        else if (gridSystemGenesis === 3) {
            this.ballSpawn(x,y);
        }
        else if (gridSystemGenesis === 4) {
            this.spikeSpawn(x,y);
        }
    },
    // Creating Game Objects
    wallSpawn: function (x, y) {
        var wallArray = ['brownPlatform', 'wall', 'rotatedWall'];
        this.wallX = this.wall.create(x, y, wallArray[Math.floor(Math.random() * wallArray.length)]);
        this.wallX.scale.setTo(.5);
        this.wallX.body.immovable = true;
    },
    enemySpawn: function (x, y) {
        this.trumpX = this.enemy.create(x, y, 'enemy');
        //this.trumpX.body.velocity.x = -1000;
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
    ballSpawn: function (x,y) {
        //Adding Ball
        this.ballX = this.ball.create(x,y, 'ball');
        this.ballX.anchor.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.body.setCircle(50);
        this.ballX.body.mass = 2;
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.bounce.setTo(.8);
    },
    spikeSpawn: function (x,y) {
        var spikeArray = ['invertedSpikes','spikes'];
        var spikeLength = [.4,.5,.6];
        this.spikesX = this.spikes.create(x, y, spikeArray[Math.floor(Math.random() * spikeArray.length)]);
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
    //How Game Updates Real-Time
    update: function () {

        //Player Standing Still
        this.player.body.velocity.x = 0;

        /////////////////////////////God Mode/////////////////////////////////////

        this.player.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -400;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 400;
            this.player.animations.play('right');
        }
        if (this.cursors.up.isDown) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
        }
        else if (this.cursors.down.isDown) {
            this.player.frame = 10;
            this.player.body.velocity.y = 650;
        }
    }
};