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

        this.game.world.setBounds(0, 0, 1400, 3200);

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
        this.player = this.game.add.sprite(700, 3000, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.60);
        this.player.body.setSize(75, 84, 5, 6);
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

        // var xBlockSize = 350;
        // var yBlockSize = 400;

        // for (var x = 0; x < 4; x++) {
        //     for (var y = 0; y < 5; y++) {
        //         var xRandom = this.game.rnd.realInRange((x*xBlockSize)+1, (x+1)*xBlockSize);
        //         var yRandom = this.game.rnd.realInRange((y*yBlockSize)+1, (y+1)*yBlockSize);
        //         this.gridSystem(xRandom,yRandom);
        //         console.log(x+ ' ' + y+ ' ' +xRandom + ' ' + yRandom);
        //     }
        // }


        for (var i = 0; i < 30; i++) {

            ////////////The X-Axis Block///////////
            var block1x = this.game.rnd.realInRange(0, 350);
            var block2x = this.game.rnd.realInRange(351, 700);
            var block3x = this.game.rnd.realInRange(701, 1050);
            var block4x = this.game.rnd.realInRange(1051, 1400);
            ////////////The Y-Axis Block///////////
            var block1y = this.game.rnd.realInRange(0, 400);
            var block2y = this.game.rnd.realInRange(401, 800);
            var block3y = this.game.rnd.realInRange(801, 1200);
            var block4y = this.game.rnd.realInRange(1201, 1600);
            var block5y = this.game.rnd.realInRange(1601, 2000);
            var block6y = this.game.rnd.realInRange(2001, 2400);
            var block7y = this.game.rnd.realInRange(2401, 2600);

            //block 1
            if (i === 0) {
                this.gridSystem(block1x, block5y);
            }
            else if (i === 1) {
                this.gridSystem(block2x, block5y);
            }
            else if (i === 2) {
                this.gridSystem(block3x, block5y);
            }
            else if (i === 3) {
                this.gridSystem(block4x, block5y);
            }
            else if (i === 4) {
                this.gridSystem(block1x, block4y);
            }
            else if (i === 5) {
                this.gridSystem(block2x, block4y);
            }
            else if (i === 6) {
                this.gridSystem(block3x, block4y);
            }
            else if (i === 7) {
                this.gridSystem(block4x, block4y);
            }
            else if (i === 8) {
                this.gridSystem(block1x, block3y);
            }
            else if (i === 9) {
                this.gridSystem(block2x, block3y);
            }
            else if (i === 10) {
                this.gridSystem(block3x, block3y);
            }
            else if (i === 11) {
                this.gridSystem(block4x, block3y);
            }
            else if (i === 12) {
                this.gridSystem(block1x, block2y);
            }
            else if (i === 13) {
                this.gridSystem(block2x, block2y);
            }
            else if (i === 14) {
                this.gridSystem(block3x, block2y);
            }
            else if (i === 15) {
                this.gridSystem(block4x, block2y);
            }
            else if (i === 16) {
                this.gridSystem(block1x, block1y);
            }
            else if (i === 17) {
                this.gridSystem(block2x, block1y);
            }
            else if (i === 18) {
                this.gridSystem(block3x, block1y);
            }
            else if (i === 19) {
                this.gridSystem(block4x, block1y);
            }
            else if (i === 20) {
                console.log("Itworks");
                this.baseCamp()
            }
            else if (i === 21) {
                this.gridSystem(block1x, block6y);
            }
            else if (i === 22) {
                this.gridSystem(block2x, block6y);
            }
            else if (i === 23) {
                this.gridSystem(block3x, block6y);
            }
            else if (i === 24) {
                this.gridSystem(block4x, block6y);
            }
            else if (i === 25) {
                this.gridSystem(block1x, block7y);
            }
            else if (i === 26) {
                this.gridSystem(block2x, block7y);
            }
            else if (i === 27) {
                this.gridSystem(block3x, block7y);
            }
            else if (i === 28) {
                this.gridSystem(block4x, block7y);
            }
            else {
                //Adding Flag
                var finishX = this.game.rnd.integerInRange(0, 1400);
                var finishY = this.game.rnd.integerInRange(0, 350)
                this.finish = this.game.add.sprite(finishX, finishY, 'win');
                this.game.physics.arcade.enable(this.finish);
                this.finish.body.collideWorldBounds = true;
                this.finish.body.velocity.x = 20;
                this.finish.body.bounce.setTo(1);
                this.finish.body.maxVelocity.setTo(100);
            }
        }


        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

        //Streak
        this.text = this.game.add.text(200, 3300, "Streak: " + streak, { font: "32px Arial", fill: "#ffffff", align: "center" });
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
        if (gridSystemGenesis >= 0 && gridSystemGenesis <= 40) {
            this.wallSpawn(x, y);
        }
        else if (gridSystemGenesis >= 41 && gridSystemGenesis <= 60) {
            this.enemySpawn(x, y);
        }
        else if (gridSystemGenesis >= 61 && gridSystemGenesis <= 71) {
            this.ledgeSpawn(x, y);
        }
        else if (gridSystemGenesis >= 72 && gridSystemGenesis <= 90 ) {
            this.ballSpawn(x, y);
        }
        else if (gridSystemGenesis >= 91 && gridSystemGenesis <= 100) {
            this.spikeSpawn(x, y);
        }
    },
    baseCamp: function () {

        //create ledge
        for (var i = 1; i < 5; i++) {
            var iteratorX = i * 290;
            var iteratorY = i * 50;
            this.ledgeX = this.ledge.create(iteratorX, iteratorY + 2900, 'ledge');
            this.ledgeX.body.maxVelocity.setTo(400);
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1);
        }

        //create wall
        this.wallX = this.wall.create(700, 3100, 'rotatedWall');
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(.5);
        this.wallX.body.immovable = true;

        //create ball
        this.ballX = this.ball.create(1100, 3000, 'ball');
        this.ballX.anchor.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.body.setCircle(50);
        this.ballX.body.mass = 2;
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.bounce.setTo(.8);

        //creating spikes
        this.spikesX = this.spikes.create(0, 3125, 'spikes');
        this.spikesX.scale.setTo(1);
        this.spikesX.body.immovable = true;

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
    ballSpawn: function (x, y) {
        //Adding Ball
        this.ballX = this.ball.create(x, y, 'ball');
        this.ballX.anchor.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.body.setCircle(50);
        this.ballX.body.mass = 2;
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.velocity.x = this.game.rnd.realInRange(-1000, 1000)
        this.ballX.body.bounce.setTo(.8);
    },
    spikeSpawn: function (x, y) {
        var spikeArray = ['invertedSpikes', 'spikes'];
        var spikeLength = [.2, .3, .4, .5];
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

        ////////////////////////Physics////////////////////////
        //Player Mechanics

        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player, this.ledge, ledgeUp);
        this.game.physics.arcade.collide(this.player, this.ball, ballMover);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, this.wall);
        this.game.physics.arcade.collide(this.ball, this.spikes);
        this.game.physics.arcade.collide(this.ball, this.ledge);
        this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);

        // //Wall/Enemy/Ledge/Spike Mechanics
        this.game.physics.arcade.collide(this.ledge, this.wall);
        this.game.physics.arcade.collide(this.ledge, this.ledge);
        this.game.physics.arcade.collide(this.ledge, this.enemy, enemyLedge);
        this.game.physics.arcade.collide(this.ledge, this.spikes);
        this.game.physics.arcade.collide(this.enemy, this.spikes);
        this.game.physics.arcade.collide(this.enemy, this.wall);
        this.game.physics.arcade.collide(this.enemy, this.enemy);

        //Flag Moving Mechanics
        this.game.physics.arcade.collide(this.finish, this.wall);
        this.game.physics.arcade.collide(this.finish, this.ledge);
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

        //Player Standing Still
        this.player.body.velocity.x = 0;

        if (this.player.body.touching.down) {
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
        else if (this.player.body.touching.right) {
            this.player.body.velocity.x = 50;
            this.player.body.velocity.y = 100;
            this.player.frame = 6;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if (this.cursors.right.isDown) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        else if (this.player.body.touching.up) {
            this.player.animations.stop();
            this.player.frame = 8;
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
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -400;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 400;
            }
        }

        ////Player Jump Mechanics
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
        }
        else if (this.cursors.down.isDown && this.player.body.touching.up) {
            this.player.frame = 10;
            this.player.body.velocity.y = 200;
        }

        //Downward Mechanics
        if (this.cursors.down.isDown) {
            this.player.frame = 10;
            this.player.body.velocity.y = 500;
        }
    },
    render: function () {

    }
};