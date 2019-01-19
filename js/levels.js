///////////////////////////////////////////Rulesets//////////////////////////////////////////
brawl.state3 = function () { };
brawl.state3.prototype = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Scales our Game
        this.game.world.setBounds(0, 0, 1400, 800);
    },
    preload: function () {
        this.load.image('background-one', 'assets/trumpFirstBackground.jpg');
    },
    create: function () {

        //Push Levels of Game Forward
        --ghettoLoopMechanic;

        this.trumpBackground = this.game.add.sprite(this.game.world.centerX + 100, 500, 'background-one');
        this.trumpBackground.anchor.setTo(.5);

        //Skip Written Already.
        if (ghettoLoopMechanic === 10) {
            this.text2 = game.add.text(300, 200, "Level One");
        }

        else if (ghettoLoopMechanic === 9) {
            this.text2 = game.add.text(300, 200, "Level Two");
        }

        else if (ghettoLoopMechanic === 8) {
            this.text2 = game.add.text(300, 200, "Level Three");
        }

        else if (ghettoLoopMechanic === 7) {
            this.text2 = game.add.text(300, 200, "Level Four");
        }

        else if (ghettoLoopMechanic === 6) {
            this.text2 = game.add.text(300, 200, "Level Five: Score the Ball. Don't let it Hit the Spikes");
        }

        else if (ghettoLoopMechanic === 5) {
            this.text2 = game.add.text(300, 200, "Level Six: Kill All the Trumps");

        }

        else if (ghettoLoopMechanic === 4) {
            this.text2 = game.add.text(300, 50, "Level Seven: \n\n All the Levels Before Were To Teach You The Game \n\n Now Shit Gets Real.");

        }

        else if (ghettoLoopMechanic === 3) {
            this.text2 = game.add.text(300, 50, "Level Eight: \n\n Climb Up. \n\n I'm Fucking With You At This Point.");

        }
        //	Font style
        this.text2.font = 'Arial';
        this.text2.fontSize = 35;
        this.text2.fill = "#19de65";
        this.text2.fontWeight = 'bold';

    },
    update: function () {
        if (this.game.input.activePointer.isDown) {
            if (ghettoLoopMechanic === 10) {
                this.game.state.start('levelOne');
            }
            else if (ghettoLoopMechanic === 9) {
                this.game.state.start('levelTwo');
            }
            else if (ghettoLoopMechanic === 8) {
                this.game.state.start('levelThree');
            }
            else if (ghettoLoopMechanic === 7) {
                this.game.state.start('levelFour');
            }
            else if (ghettoLoopMechanic === 6) {
                this.game.state.start('levelFive');
            }
            else if (ghettoLoopMechanic === 5) {
                this.game.state.start('levelSix');
            }
            else if (ghettoLoopMechanic === 4) {
                this.game.state.start('levelSeven');
            }
            else if (ghettoLoopMechanic === 3) {
                this.game.state.start('levelEight');
            }

        }
    }
};

///////////////////////////////////////////Level One//////////////////////////////////////////
brawl.state4 = function () { };
brawl.state4.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('sky', 'assets/sky3.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Adding Sprite Background
        this.game.add.sprite(0, 0, 'sky');

        //Adding Flag to End Game
        this.finish = this.game.add.sprite(1010, this.game.world.centerY - 175, 'win');
        this.finish.anchor.setTo(.5);
        this.game.physics.arcade.enable(this.finish);

        //Adding Wall in the Middle
        this.wall = this.game.add.sprite(1000, this.game.world.centerY + 75, 'wall');
        this.wall.anchor.setTo(.5);
        this.wall.scale.setTo(.5);
        this.game.physics.arcade.enable(this.wall); //enables physics for wall
        this.wall.body.immovable = true;

        //Adding Ground at the Bottom
        this.ground = this.game.add.sprite(0, 760, 'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;

        //Adding Player
        this.player = this.game.add.sprite(500, 100, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.scale.setTo(.75);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        this.player.customParams = {};
        this.createOnscreenControls();

        for (var i = 0; i < 4; i++) {
            if (i === 0) {
                var x = 110;
                var y = this.game.world.centerY;
                var fontNumber = 40;
                var string = "Move Left";
            }
            else if (i === 1) {
                var x = 350;
                var y = this.game.world.centerY;
                var fontNumber = 40;
                var string = "Move Right";
            }
            else if (i === 2) {
                var x = 750;
                var y = this.game.world.centerY - 250;
                var fontNumber = 30;
                var string = "Jump on the Wall. You Stick Automatically. \n\n Tap Jump + Move (Opposite Direction) to Wall Jump. \n\n While in the Air Move Towards the Wall To Get Back on It. \n\n Rinse and Repeat.";
            }
            else {
                var x = 1250;
                var y = this.game.world.centerY;
                var fontNumber = 40;
                var string = "Jump";
            }
            this.text = this.game.add.text(x, y, string);
            this.text.anchor.setTo(0.5);
            this.text.align = 'center';
            //	Font style
            this.text.font = 'Arial Narrow';
            this.text.fontSize = fontNumber;
            this.text.fill = "#39db31";
            this.text.fontWeight = 'bold';
        }
    },
    createOnscreenControls: function () {
        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = .3;
        this.rightArrow.alpha = .3;
        this.actionButton.alpha = .5;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .5;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = .3;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .5;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = .3;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .5;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = .3;
        }, this);



    },
    update: function () {

        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player, this.ground);

        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            this.player.body.velocity.y = 50;
            this.player.frame = 6;
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 50;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }
    },
};

///////////////////////////////////////////Level Two//////////////////////////////////////////
brawl.state5 = function () { };
brawl.state5.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('sky', 'assets/sky3.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('rotatedWall', 'assets/rotatedWall.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Adding Sprite Background
        this.game.add.sprite(0, 0, 'sky');

        //Adding Wall in the Middle
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        for (var i = 0; i < 3; i++) {
            if (i === 0) {
                this.wallX = this.wall.create(this.game.world.centerX, this.game.world.centerY + 200, 'wall');
            }
            else if (i === 1) {
                this.wallX = this.wall.create(this.game.world.centerX - 500, this.game.world.centerY, 'brownPlatform');
                this.wallX.scale.setTo(1.6, 1);
            }
            else {
                this.wallX = this.wall.create(this.game.world.centerX - 300, this.game.world.centerY - 193, 'rotatedWall');
                this.wallX.scale.setTo(.5);
            }
            this.wallX.anchor.setTo(.5);
            this.wallX.body.immovable = true;
        }

        //Adding Ledge next to Flag
        this.ledge = this.game.add.sprite(1000, this.game.world.centerY, 'ledge');
        this.game.physics.arcade.enable(this.ledge);
        this.ledge.body.collideWorldBounds = true;

        //Adding Spikes
        this.spikes = this.game.add.sprite(1125, this.game.world.centerY + 325, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(.5);

        //Adding Flag to End Game
        this.finish = this.game.add.sprite(1350, this.game.world.centerY - 100, 'win');
        this.game.physics.arcade.enable(this.finish);

        //Adding Ground at the Bottom
        this.ground = this.game.add.sprite(0, 760, 'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;
        this.ground.scale.setTo(1.3);

        //Adding Player
        this.player = this.game.add.sprite(0, 500, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.scale.setTo(.75);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        this.player.customParams = {};
        this.createOnscreenControls();

    },
    createOnscreenControls: function () {
        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    update: function () {

        //Collision Physics
        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.player, this.ledge);

        //Death of Player and Objects
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);
        this.game.physics.arcade.overlap(this.ledge, this.spikes, deathTwo, null, this);

        //Win
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }

    },
};

///////////////////////////////////////////Level Three//////////////////////////////////////////
brawl.state6 = function () { };
brawl.state6.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('sky', 'assets/sky3.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Adding Sprite Background
        this.game.add.sprite(0, 0, 'sky');

        //Adding Wall in the Right-Hand Side
        this.wall = this.game.add.group();
        this.wall.enableBody = true;
        for (var i = 0; i < 3; i++) {
            if (i === 0) {
                this.wallX = this.wall.create(1200, this.game.world.centerY - 90, 'wall');
                this.wallX.scale.setTo(.5, .60);
            }
            else if (i === 1) {
                this.wallX = this.wall.create(this.game.world.centerX, this.game.world.centerY + 250, 'brownPlatform');
                this.wallX.body.velocity.setTo(350, 0);
                this.wallX.body.collideWorldBounds = true;
                this.wallX.body.bounce.set(1.0);
                this.wallX.scale.setTo(.5);
            }
            else {
                this.wallX = this.wall.create(this.game.world.centerX - 600, this.game.world.centerY - 200, 'brownPlatform');
                this.wallX.scale.setTo(1, .5);
            }
            this.wallX.anchor.setTo(.5);
            this.wallX.body.immovable = true;
        }

        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        for (var i = 0; i < 3; i++) {
            if (i === 0) {
                this.ledgeX = this.ledge.create(100, this.game.world.centerY - 50, 'ledge');
                this.ledgeX.body.velocity.setTo(300, 0);
            }
            else if (i === 1) {
                this.ledgeX = this.ledge.create(200, this.game.world.centerY + 50, 'ledge');
                this.ledgeX.body.velocity.setTo(-300, 0);
            }
            else {
                this.ledgeX = this.ledge.create(300, this.game.world.centerY + 100, 'ledge');
                this.ledgeX.body.velocity.setTo(300, 0);
            }
            this.ledgeX.body.maxVelocity.y = 400;
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1, .5);
        }

        //Adding Spikes
        this.spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 350, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(1);
        this.spikes.body.immovable = true;

        //Adding Flag to End Game
        this.finish = this.game.add.sprite(1350, 50, 'win');
        this.game.physics.arcade.enable(this.finish);

        //Adding Player
        this.player = this.game.add.sprite(0, -50, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.scale.setTo(.75);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;

        this.player.customParams = {};

        this.createOnscreenControls();

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

    },
    createOnscreenControls: function () {
        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    update: function () {


        //Collision Physics
        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player, this.ledge, ledgeUpMiddle);

        this.game.physics.arcade.collide(this.wall, this.ledge);
        this.game.physics.arcade.collide(this.spikes, this.ledge);

        //Death of Player and Objects
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);

        //Win
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }



    }
};

///////////////////////////////////////////Level Four//////////////////////////////////////////
brawl.state7 = function () { };
brawl.state7.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('wall', 'assets/wall.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        for (var i = 0; i < 4; i++) {
            if (i === 0) {
                this.ledgeX = this.ledge.create(0, this.game.world.centerY - 150, 'ledge');
                this.ledgeX.body.velocity.setTo(850, 0);
            }
            else if (i === 1) {
                this.ledgeX = this.ledge.create(900, this.game.world.centerY - 25, 'ledge');
                this.ledgeX.body.velocity.setTo(-850, 0);
            }
            else if (i === 2) {
                this.ledgeX = this.ledge.create(450, this.game.world.centerY + 80, 'ledge');
                this.ledgeX.body.velocity.setTo(900, 0);
            }
            else {
                this.ledgeX = this.ledge.create(900, this.game.world.centerY + 120, 'ledge');
                this.ledgeX.body.velocity.setTo(-850, 0);
            }
            this.ledgeX.body.maxVelocity.y = 400;
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1);
            this.ledgeX.body.allowRotation = true;
        }

        //Adding Flag to End Game
        this.finish = this.game.add.sprite(this.game.world.centerX, 550, 'win');
        this.game.physics.arcade.enable(this.finish);
        this.finish.body.velocity.setTo(1300, 0);
        this.finish.body.collideWorldBounds = true;
        this.finish.body.bounce.setTo(1);

        //Adding Enemy

        this.enemy = game.add.group();
        this.enemy.enableBody = true;
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                this.trumpImage = this.enemy.create(400, 300, 'enemy');
                this.trumpImage.body.velocity.x = 800;
            }
            else {
                this.trumpImage = this.enemy.create(900, 200, 'enemy');
                this.trumpImage.body.velocity.x = -800;
            }
            this.trumpImage.body.maxVelocity.setTo(800);
            this.trumpImage.body.bounce.setTo(1);
            this.trumpImage.body.collideWorldBounds = true;
        }

        //Adding Spikes
        this.spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 350, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(1);
        this.spikes.body.immovable = true;

        //Adding Wall
        this.wall = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 125, 'wall');
        this.wall.anchor.setTo(.5);
        this.wall.scale.setTo(.40);
        this.game.physics.arcade.enable(this.wall); //enables physics for wall
        this.wall.body.immovable = true;

        //Adding Player
        this.player = this.game.add.sprite(this.game.world.centerX, 0, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.75);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;

        this.player.customParams = {};
        this.createOnscreenControls();

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

    },
    createOnscreenControls: function () {

        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    update: function () {

        //Collision Physics
        this.game.physics.arcade.collide(this.player, this.ledge, ledgeUpFast);
        this.game.physics.arcade.collide(this.player, this.wall);

        this.game.physics.arcade.collide(this.spikes, this.ledge, spikeLedge);
        this.game.physics.arcade.collide(this.wall, this.ledge);
        this.game.physics.arcade.collide(this.enemy, this.ledge);
        this.game.physics.arcade.collide(this.enemy, this.wall);
        this.game.physics.arcade.collide(this.enemy, this.spikes);
        this.game.physics.arcade.collide(this.finish, this.ledge);
        this.game.physics.arcade.collide(this.finish, this.wall);
        this.game.physics.arcade.collide(this.finish, this.spikes);

        //Death of Player and Objects
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemy, deathOne, null, this);

        //Win
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);


        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }

    }
};

///////////////////////////////////////////Level Five//////////////////////////////////////////
brawl.state8 = function () { };
brawl.state8.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('wall', 'assets/wall.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('ground', 'assets/platform.png')
        this.load.image('rotatedWall', 'assets/rotatedWall.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Adding Ball
        this.ball = this.game.add.sprite(250, this.game.world.centerY - 120, 'ball');
        this.ball.anchor.setTo(.5);
        this.game.physics.arcade.enable(this.ball); //enables physics for ball
        this.ball.body.mass = 1.5;
        this.ball.scale.setTo(.5);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(.8);

        //Adding the Wall
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        for (var i = 0; i < 3; i++) {
            if (i === 0) {
                this.wallX = this.wall.create(this.game.world.centerX, this.game.world.centerY + 200, 'wall');
            }
            else if (i === 1) {
                this.wallX = this.wall.create(this.game.world.centerX - 450, this.game.world.centerY, 'brownPlatform');
                this.wallX.scale.setTo(1.5, .8);
            }
            else {
                this.wallX = this.wall.create(this.game.world.centerX + 400, this.game.world.centerY - 193, 'rotatedWall');
                this.wallX.scale.setTo(.5);
            }
            this.wallX.anchor.setTo(.5);
            this.wallX.body.immovable = true;
        }

        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        for (var i = 0; i < 4; i++) {
            if (i === 0) {
                this.ledgeX = this.ledge.create(850, this.game.world.centerY - 50, 'ledge');
            }
            else if (i === 1) {
                this.ledgeX = this.ledge.create(900, this.game.world.centerY + 65, 'ledge');
            }
            else if (i === 2) {
                this.ledgeX = this.ledge.create(1000, this.game.world.centerY + 150, 'ledge');
            }
            else {
                this.ledgeX = this.ledge.create(1100, this.game.world.centerY + 250, 'ledge');
            }
            this.ledgeX.body.velocity.x = 400
            this.ledgeX.body.maxVelocity.setTo(400);
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1);
        }

        //Adding Flag to End Game
        this.finish = this.game.add.sprite(800, 550, 'win');
        this.game.physics.arcade.enable(this.finish);
        this.finish.body.collideWorldBounds = true;
        this.finish.body.bounce.setTo(1);

        //Adding Spikes
        this.spikes = this.game.add.sprite(1125, this.game.world.centerY + 325, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(.5);
        this.spikes.body.immovable = true;

        //Adding Ground
        this.ground = this.game.add.sprite(0, 760, 'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.immovable = true;
        this.ground.scale.setTo(1.3);

        //Adding Player
        this.player = this.game.add.sprite(0, 700, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.75);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        this.player.body.collideWorldBounds = true;

        this.player.customParams = {};
        this.createOnscreenControls();

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);


    },
    createOnscreenControls: function () {

        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    update: function () {

        this.game.physics.arcade.collide(this.player, this.ball);
        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.player, this.ledge, ledgeUpFast);

        //Wall and Ledge Mechanics
        this.game.physics.arcade.collide(this.wall, this.ledge);
        this.game.physics.arcade.collide(this.ground, this.ledge);

        //Ball Mechanics
        this.game.physics.arcade.collide(this.ball, this.wall);
        this.game.physics.arcade.collide(this.ball, this.ground);
        this.game.physics.arcade.collide(this.ball, this.ledge);

        //Flag Mechanics
        this.game.physics.arcade.collide(this.finish, this.ledge);
        this.game.physics.arcade.collide(this.finish, this.wall);
        this.game.physics.arcade.collide(this.finish, this.spikes);

        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);
        this.game.physics.arcade.overlap(this.ball, this.spikes, deathOne, null, this);
        //Win
        this.game.physics.arcade.overlap(this.ball, this.finish, nextLevel, null, this);

        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }

    }
};

///////////////////////////////////////////Level Six//////////////////////////////////////////
brawl.state9 = function () { };
brawl.state9.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('wall', 'assets/wall.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //ball
        this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
        this.ball.anchor.setTo(.5);
        this.game.physics.arcade.enable(this.ball); //enables physics for ball
        this.ball.body.mass = 1.5;
        this.ball.scale.setTo(.5);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.setTo(.8);

        this.game.time.events.repeat(Phaser.Timer.SECOND, 6, trumpGenerator, this);

        // Adding Enemies

        this.enemy = this.game.add.group();
        this.enemy.enableBody = true;

        function trumpGenerator() {
            this.trumpImage = this.enemy.create(0, this.game.world.height - 1000, 'enemy');
            this.trumpImage.body.bounce.setTo(1);
            this.trumpImage.body.gravity.y = 10;
            this.trumpImage.body.collideWorldBounds = true;
            this.trumpImage.body.velocity.x = -500;
            this.trumpImage.body.maxVelocity.setTo(500);
        }


        //Adding Ledge
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        for (var i = 0; i < 4; i++) {
            if (i === 0) {
                var x = 400;
            }
            else if (i === 1) {
                var x = 600;
            }
            else if (i === 2) {
                var x = 800;
            }
            else {
                var x = 1000;
            }
            this.ledgeX = this.ledge.create(x, this.game.world.centerY + 100, 'ledge');
            this.ledgeX.body.velocity.x = 400
            this.ledgeX.body.maxVelocity.setTo(400);
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1);
        }

        //Adding Brown Ledge
        this.brownLedge = this.game.add.sprite(0, this.game.world.centerY + 210, 'brownPlatform');
        this.game.physics.arcade.enable(this.brownLedge);
        this.brownLedge.body.immovable = true;
        this.brownLedge.body.collideWorldBounds = true;
        this.brownLedge.body.velocity.setTo(100, 0);
        this.brownLedge.body.bounce.set(1.0);

        //Adding Spikes
        this.spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 350, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(1);
        this.spikes.body.immovable = true;

        //Adding Player
        this.player = this.game.add.sprite(300, 500, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.75);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        this.player.body.collideWorldBounds = true;

        this.player.customParams = {};
        this.createOnscreenControls();

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

    },
    createOnscreenControls: function () {

        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    update: function () {

        if (this.enemy.countDead() === 6) {
            this.game.state.start('ruleSets');
        }

        //Player Mechanics
        this.game.physics.arcade.collide(this.player, this.brownLedge);
        this.game.physics.arcade.collide(this.player, this.ledge, ledgeNormal);
        this.game.physics.arcade.collide(this.player, this.ball);

        //Ledge/Ground/Mechanics
        this.game.physics.arcade.collide(this.brownLedge, this.ledge);
        this.game.physics.arcade.collide(this.brownLedge, this.enemy);
        this.game.physics.arcade.collide(this.enemy, this.ledge);
        this.game.physics.arcade.collide(this.spikes, this.ledge);
        this.game.physics.arcade.collide(this.enemy, this.spikes);

        //Ball Mechanics
        this.game.physics.arcade.collide(this.ball, this.brownLedge);
        this.game.physics.arcade.collide(this.ball, this.spikes);
        this.game.physics.arcade.collide(this.ball, this.ledge);
        this.game.physics.arcade.overlap(this.ball, this.enemy, deathThree);

        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, this.enemy, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);

        //Player Standing Still
        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }



    }
};

///////////////////////////////////////////Level Seven//////////////////////////////////////////
brawl.state10 = function () { };
brawl.state10.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('wall', 'assets/wall.png');
        this.load.image('rotatedWall', 'assets/rotatedWall.png');
        this.load.image('fallingSpikes', 'assets/newSpikes.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
        this.load.image('joystick', 'assets/joystick.png');
        this.load.image('joystick2', 'assets/joystickR.png');
        this.load.image('action', 'assets/action.png');
        this.load.spritesheet('dude', 'assets/white.png', 87.5, 93.5);
    },
    create: function () {

        this.game.world.setBounds(0, 0, 2000, 800);

        //Keyboard Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Falling Spikes
        this.fallingSpikes = game.add.group();
        this.fallingSpikes.enableBody = true;

        this.game.time.events.repeat(Phaser.Timer.SECOND * 2, Infinity, spikesFalling, this);

        function spikesFalling() {
            for (var i = 0; i < 4; i++) {
                if (i === 0) {
                    var spikesX = 550;
                }
                else if (i === 1) {
                    var spikesX = 790;
                }
                else if (i === 2) {
                    var spikesX = 1100;
                }
                else {
                    var spikesX = 1750;
                }
                this.spikeFall = this.fallingSpikes.create(spikesX, this.game.world.height - 1000, 'fallingSpikes');
                this.spikeFall.body.gravity.y = 410;
            }
        }

        //Adding the Wall
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        for (var i = 0; i < 8; i++) {
            if (i === 0) {
                this.wallX = this.wall.create(100, this.game.world.centerY + 225, 'brownPlatform');
                this.wallX.scale.setTo(.5);
            }
            else if (i === 1) {
                this.wallX = this.wall.create(300, this.game.world.centerY + 45, 'wall');
                this.wallX.scale.setTo(.30, .03);
            }
            else if (i === 2) {
                this.wallX = this.wall.create(35, this.game.world.centerY - 120, 'wall');
                this.wallX.scale.setTo(.30, .03);
            }
            else if (i === 3) {
                this.wallX = this.wall.create(400, this.game.world.centerY - 200, 'wall');
                this.wallX.scale.setTo(.30, .03);
            }
            else if (i === 4) {
                this.wallX = this.wall.create(800, this.game.world.centerY - 100, 'wall');
                this.wallX.scale.setTo(.4);
            }
            else if (i === 5) {
                this.wallX = this.wall.create(1100, 550, 'rotatedWall');
                this.wallX.scale.setTo(.3);
            }
            else if (i === 6) {
                this.wallX = this.wall.create(1200, this.game.world.centerY - 100, 'wall');
                this.wallX.scale.setTo(.30, .03);
            }
            else {
                this.wallX = this.wall.create(1400, this.game.world.centerY - 200, 'wall');
                this.wallX.scale.setTo(.30, .03);
            }
            this.wallX.anchor.setTo(.5);
            this.wallX.body.immovable = true;
        }

        //Adding Ledge
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        for (var i = 0; i < 3; i++) {
            if (i === 0) {
                var x = 700;
                var y = 400;
            }
            else if (i === 1) {
                var x = 840;
                var y = 625;
            }
            else {
                var x = 1100;
                var y = 250;
            }
            this.ledgeX = this.ledge.create(x, y, 'ledge');
            this.ledgeX.body.maxVelocity.setTo(400);
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1);
        }

        //Adding Spikes
        this.spikes = this.game.add.sprite(0, this.game.world.centerY + 250, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        //this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(1.45, 1);
        this.spikes.body.immovable = true;

        //Adding Enemy
        this.enemy = this.game.add.sprite(700, 100, 'enemy');
        this.game.physics.arcade.enable(this.enemy);
        this.enemy.body.bounce.setTo(1);
        //this.enemy.body.gravity.y = 10;
        this.enemy.body.collideWorldBounds = true;
        //this.enemy.body.velocity.x = -500;
        this.enemy.body.maxVelocity.setTo(500);

        //Adding Flag
        this.finish = this.game.add.sprite(1950, 550, 'win');
        this.game.physics.arcade.enable(this.finish);
        this.finish.body.collideWorldBounds = true;
        this.finish.body.bounce.setTo(1);

        //Adding Player
        this.player = this.game.add.sprite(100, 500, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.60);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        this.player.body.collideWorldBounds = true;

        this.player.customParams = {};
        this.createOnscreenControls();

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    },
    createOnscreenControls: function () {

        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    update: function () {

        //Player Mechanics
        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player, this.ledge, ledgeUpMiddle);

        //Wall/Enemy/Ledge/Spike Mechanics
        this.game.physics.arcade.collide(this.ledge, this.wall);
        this.game.physics.arcade.collide(this.ledge, this.enemy);
        this.game.physics.arcade.collide(this.ledge, this.spikes);
        this.game.physics.arcade.collide(this.enemy, this.spikes);
        this.game.physics.arcade.collide(this.enemy, this.wall);

        //Spikes Dying
        this.game.physics.arcade.overlap(this.fallingSpikes, this.ledge, deathTwo, null, this);
        this.game.physics.arcade.overlap(this.spikes, this.fallingSpikes, deathThree, null, this);
        this.game.physics.arcade.overlap(this.fallingSpikes, this.wall, deathTwo, null, this);

        //Flag Moving Mechanics
        this.game.physics.arcade.collide(this.finish, this.wall);
        this.game.physics.arcade.collide(this.finish, this.ledge);
        this.game.physics.arcade.collide(this.finish, this.spikes);

        //Win
        this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        //Death Mechanics
        this.game.physics.arcade.overlap(this.player, this.enemy, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);
        this.game.physics.arcade.overlap(this.player, this.fallingSpikes, deathOne, null, this);

        //Player Standing Still
        this.player.body.velocity.x = 0;

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }
    }
};


///////////////////////////////////////////Level Eight//////////////////////////////////////////
brawl.state11 = function () { };
brawl.state11.prototype = {
    init: function () {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
    },
    preload: function () {
        this.load.image('wall', 'assets/wall.png');
        this.load.image('rotatedWall', 'assets/rotatedWall.png');
        this.load.image('fallingSpikes', 'assets/newSpikes.png');
        this.load.image('win', 'assets/flag.png');
        this.load.image('enemy', 'assets/trumpface.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('brownPlatform', 'assets/platform2.png');
        this.load.image('ledge', 'assets/platformY.png');
        this.load.image('spikes', 'assets/invisibleFloorSpikes.png');
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

        //Falling Spikes
        this.fallingSpikes = game.add.group();
        this.fallingSpikes.enableBody = true;

        this.game.time.events.repeat(Phaser.Timer.SECOND * 4, Infinity, spikesFalling, this);

        function spikesFalling() {
            for (var i = 0; i < 3; i++) {
                if (i === 0) {
                    var spikesX = 100;
                }
                else if (i === 1) {
                    var spikesX = 700;
                }
                else {
                    var spikesX = 1200;
                }
                this.spikeFall = this.fallingSpikes.create(spikesX, -10, 'fallingSpikes');
                this.spikeFall.body.gravity.y = 600;
            }
        }

        //Adding the Wall
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        for (var i = 0; i < 12; i++) {
            if (i === 0) {
                this.wallX = this.wall.create(100, 1800, 'brownPlatform');
                this.wallX.scale.setTo(.5);
            }
            else if (i === 1) {
                this.wallX = this.wall.create(530, 1700, 'wall');
            }
            else if (i === 2) {
                this.wallX = this.wall.create(900, 1600, 'wall');
            }
            else if (i === 3) {
                this.wallX = this.wall.create(1270, 1500, 'wall');
            }
            else if (i === 4) {
                this.wallX = this.wall.create(900, 1390, 'wall');
            }
            else if (i === 5) {
                this.wallX = this.wall.create(1260, 1280, 'wall');
            }
            else if (i === 6) {
                this.wallX = this.wall.create(1200, 880, 'wall');
                this.wallX.scale.setTo(.3,.6);
            }
            else if (i === 7) {
                this.wallX = this.wall.create(1325, 880, 'wall');
                this.wallX.scale.setTo(.3,.6);
            }
            else if (i === 8 ) {
                this.wallX = this.wall.create(960, 300, 'rotatedWall');
                this.wallX.scale.setTo(1,.5);
            }
            else if (i === 9) {
                this.wallX = this.wall.create(100, 1390, 'wall');
                this.wallX.scale.setTo(.30, .03);
            }
            if (0 < i && i < 6) {
                this.wallX.scale.setTo(.30, .03);
            }
            this.wallX.anchor.setTo(.5);
            this.wallX.body.immovable = true;
        }

        //Adding Ledge
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        for (var i = 0; i < 2; i++) {
            if (i === 0) {
                var x = 300;
                var y = 1200;
            }
            else {
                var x = 600;
                var y = 1200;
            }
            this.ledgeX = this.ledge.create(x, y, 'ledge');
            this.ledgeX.body.maxVelocity.setTo(400);
            this.ledgeX.anchor.setTo(.5);
            this.ledgeX.scale.setTo(.5);
            this.ledgeX.body.collideWorldBounds = true;
            this.ledgeX.body.bounce.setTo(1);
        }

        //Adding Spikes
        this.spikes = this.game.add.sprite(0, 1850, 'spikes');
        this.game.physics.arcade.enable(this.spikes);
        //this.spikes.anchor.setTo(.5);
        this.spikes.scale.setTo(1);
        this.spikes.body.immovable = true;

        //Adding Enemy
        this.enemy = this.game.add.sprite(200, 900, 'enemy');
        this.game.physics.arcade.enable(this.enemy); 
        this.enemy.body.bounce.setTo(1);
        //this.enemy.body.gravity.y = 10;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.velocity.x = -1000;
        this.enemy.body.maxVelocity.setTo(1000);

        //Adding Flag
        this.finish = this.game.add.sprite(1300, 0, 'win');
        this.game.physics.arcade.enable(this.finish);
        this.finish.body.collideWorldBounds = true;
        this.finish.body.bounce.setTo(1);

        //Adding Player
        this.player = this.game.add.sprite(100, 1750, 'dude');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        this.player.scale.setTo(.60);
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        this.player.body.collideWorldBounds = true;

        this.player.customParams = {};
        this.createOnscreenControls();

        // PLAYER ANIMATIONS
        this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    },
    createOnscreenControls: function () {

        this.leftArrow = this.add.button(0, 0, 'joystick');
        this.rightArrow = this.add.button(231, 0, 'joystick2');
        this.actionButton = this.add.button(1050, 0, 'action');

        this.leftArrow.alpha = 0;
        this.rightArrow.alpha = 0;
        this.actionButton.alpha = 0;

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        //Jumping
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
            this.actionButton.alpha = .05;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
            this.actionButton.alpha = 0;
        }, this);

        //Left Movement
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.leftMovement = true;
            this.leftArrow.alpha = .05;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.leftMovement = false;
            this.leftArrow.alpha = 0;
        }, this);

        //Right Movement

        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.rightMovement = true;
            this.rightArrow.alpha = .05;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.rightMovement = false;
            this.rightArrow.alpha = 0;
        }, this);
    },
    gofull: function() {
        if (this.game.scale.isFullScreen)
        {
            this.game.scale.stopFullScreen();
        }
        else
        {
            this.game.scale.startFullScreen(false);
        }
    },
    update: function () {

        //Player Mechanics
        
        this.game.physics.arcade.collide(this.player, this.wall);
        this.game.physics.arcade.collide(this.player,this.ledge,ledgeUpMiddle);

        // //Wall/Enemy/Ledge/Spike Mechanics
        this.game.physics.arcade.collide(this.ledge,this.wall);
        this.game.physics.arcade.collide(this.ledge,this.enemy);
        this.game.physics.arcade.collide(this.ledge,this.spikes);
        this.game.physics.arcade.collide(this.enemy,this.spikes); 
        this.game.physics.arcade.collide(this.enemy,this.wall); 

        // //Spikes Dying
        // this.game.physics.arcade.overlap(this.fallingSpikes, this.ledge, deathTwo, null, this);
        // this.game.physics.arcade.overlap(this.spikes, this.fallingSpikes, deathThree, null, this);
        // this.game.physics.arcade.overlap(this.fallingSpikes, this.wall, deathTwo, null, this);

        // //Flag Moving Mechanics
        // this.game.physics.arcade.collide(this.finish,this.wall);
        // this.game.physics.arcade.collide(this.finish,this.ledge);
        // this.game.physics.arcade.collide(this.finish,this.spikes);

        // //Win
        // this.game.physics.arcade.overlap(this.player, this.finish, nextLevel, null, this);

        // //Death Mechanics
        // this.game.physics.arcade.overlap(this.player, this.enemy, deathOne, null, this);
        // this.game.physics.arcade.overlap(this.player, this.spikes, deathOne, null, this);
        // this.game.physics.arcade.overlap(this.player, this.fallingSpikes, deathOne, null, this);
        

        //Player Standing Still
        this.player.body.velocity.x = 0;

        /////////////////////////////God Mode/////////////////////////////////////

        // this.player.body.velocity.y = 0;

        // if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //     this.player.body.velocity.x = -400;
        //     this.player.animations.play('left');
        // }
        // else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //     this.player.body.velocity.x = 400;
        //     this.player.animations.play('right');
        // }

        // if (this.cursors.up.isDown || this.player.customParams.mustJump) {
        //     this.player.frame = 10;
        //     this.player.body.velocity.y = -650;
        //     this.player.customParams.mustJump = false;
        // }
        // if (this.cursors.down.isDown) {
        //     this.player.frame = 10;
        //     this.player.body.velocity.y = 650;
        //     this.player.customParams.mustJump = false;
        // }

        ////////////////////////////////Actual Controls///////////////////////////////////

        ///Player Movement and Wall-Jump Mechanics
        if (this.player.body.touching.down) {
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
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
            if ((this.cursors.up.isDown && this.cursors.left.isDown) || (this.player.customParams.mustJump && this.player.customParams.leftMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = -1000;
            }
        }
        else if (this.player.body.touching.left) {
            this.player.body.velocity.x = -50;
            this.player.body.velocity.y = 100;
            this.player.frame = 12;
            if ((this.cursors.up.isDown && this.cursors.right.isDown) || (this.player.customParams.mustJump && this.player.customParams.rightMovement)) {
                this.player.body.velocity.y = -650;
                this.player.body.velocity.x = 1000;
            }
        }
        if (this.player.body.touching.none) {
            this.player.frame = 10;
            if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
                this.player.body.velocity.x = -400;
                this.player.customParams.rightMovement = false;
            }
            else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
                this.player.body.velocity.x = 400;
                this.player.customParams.leftMovement = false;
            }
        }
        
        /* MORE FOR INSTANTANEOUS REACTION */
        // if (this.player.body.wasTouching.none) {
        //     console.log("wasTouching")
        //     this.player.frame = 10;
        //     if (this.cursors.left.isDown || this.player.customParams.leftMovement) {
        //         this.player.body.velocity.x = -400;
        //         this.player.customParams.rightMovement = false;
        //     }
        //     else if (this.cursors.right.isDown || this.player.customParams.rightMovement) {
        //         this.player.body.velocity.x = 400;
        //         this.player.customParams.leftMovement = false;
        //     }
        // }

        ////Player Jump Mechanics
        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.frame = 10;
            this.player.body.velocity.y = -650;
            this.player.customParams.mustJump = false;
        }
    }
};

