var brawl = {};

//State that loads assets
brawl.boot = function () { };
brawl.boot.prototype = {
    init: function () {
        //Full Screen-Scaling
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    },
    preload: function () {
        //////////////////////////////Loads All The Sprites At The Main Menu Screen////////////////////
        //Death
        this.load.image('deathTile', 'assets/deathTile.png');
        this.load.image('deathMoveTile', 'assets/deathMoveTile.png');
        //Ground
        this.load.image('groundTile', 'assets/groundTile.png');
        this.load.image('gMovingTile', 'assets/gMovingTile.png');
        //Moveable Walls
        this.load.image('wallTile50', 'assets/wallTile50.png');
        this.load.image('wallTile25', 'assets/wallTile25.png');
        //Invsible Tiles
        this.load.image('invisibleTile', 'assets/invisibleTile.png');
        //Ledges
        this.load.image('ledge', 'assets/ledge.png');
        //Traps
        this.load.image('fallingSpikesOne', 'assets/fallingSpikesOne.png');
        this.load.image('fallingSpikesTwo', 'assets/fallingSpikesTwo.png');
        //Bullets
        this.load.image('bulletOne', 'assets/bulletOne.png');
        //Flag
        this.load.image('flag', 'assets/flag.png');
        //Ball
        this.load.image('ball', 'assets/ball.png');
        //Enemies
        this.load.image('enemyOne', 'assets/enemyOne.png');
        //Power-Up
        this.load.image('powerJar', 'assets/powerJar.png');
        //Hazama
        this.load.image('hazamaHippie', 'assets/hazamaHippie.png');
        //Emitter
        this.load.image('particles', 'assets/z2.png');
        //Slow Motion Indicator
        this.load.image('slowMotion', 'assets/z5SlowMotion.png');
        //Player
        this.load.spritesheet('player', 'assets/player.png', 64, 64);
        //Camera
        this.load.image('camera', 'assets/camera.png');
        //Coin
        this.load.image('coin', 'assets/coin.png');
        //Bit Map Font
        if (bitmapBoolean) {
            this.game.load.bitmapFont('fontGrind', 'assets/fontGrind.png', 'assets/fontGrind.fnt');
        }
    },
    create: function () {
        this.game.state.start('mainMenu');
    },
    update: function () {
    }
};


brawl.mainMenu = function () { };
brawl.mainMenu.prototype = {
    init: function () {
        //Full Screen-Scaling
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    },
    preload: function () {
    },
    create: function () {
        //Game Background Color
        // this.game.stage.backgroundColor = '#ffffff';
        //Full Screen
        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
        this.fullSize.onDown.add(this.gofull, this);

        //Background
        this.background = this.game.add.tileSprite(this.game.world.centerX, this.game.world.centerY, 64, 64, 'player');
        this.background.animations.add('move');
        this.background.animations.play('move', 5, true);

        //Accompaying Sprites
        this.wall = this.game.add.sprite(this.game.world.centerX + 150, this.game.world.centerY, wallTile50);
        this.wall.tint = Phaser.Color.GRAY;
        this.wall.pivot.x = 200;
        this.wall.pivot.y = 250;

        this.ledge = this.game.add.sprite(this.game.world.centerX - 150, this.game.world.centerY, ledge);
        this.ledge.tint = Phaser.Color.GREEN;
        this.ledge.pivot.x = 200;
        this.ledge.pivot.y = 250;

        this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 150, ball);
        this.ball.tint = Phaser.Color.BLUE;
        this.ball.pivot.x = 200;
        this.ball.pivot.y = 200;

        //Adding Cool Looking Text
        var content = [
          "Canvas Size",
          "GLORY BRAWL",
        ];
        var mainMenuText = new lineTextCreator(200, 50, 'Impact', '#ffffff', 30, content, 120, 400)
        lineText(mainMenuText);

        //Skip Written Already.
        this.text2 = game.add.text(this.game.world.centerX, this.game.world.centerY + 300, "Press SPACEBAR to Play.\nPress O to go Full-Screen");

        //	Font style
        this.text2.font = 'Impact';
        this.text2.fontSize = 30;
        this.text2.fill = "#FF0000";
        this.text2.fontWeight = 'bold';
        this.text2.align = 'center';
        this.text2.anchor.setTo(.5);

    },
    gofull: function () {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
        else {
            this.game.scale.startFullScreen(false);
        }
    },
    update: function () {
        //Background Color
        this.game.stage.backgroundColor = Phaser.Color.getRandomColor(10, 100, 5);
        //Rotation
        this.background.rotation += .01;
        this.wall.rotation += .02;
        this.ball.rotation += .02;
        this.ledge.rotation += .02;

        //Tint
        this.wall.tint = Phaser.Color.getRandomColor();
        this.ball.tint = Phaser.Color.getRandomColor();
        this.ledge.tint = Phaser.Color.getRandomColor();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('startScreen');
        }
    }
};

////////////////////////Play the Game//////////////////
brawl.startScreen = function () { };
brawl.startScreen.prototype = {
    init: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
    },
    preload: function () {
    },
    create: function () {
        this.game.stage.backgroundColor = '#D8A8B2';

        this.text1 = this.game.add.text(100, 200, "Insert Story Here\n\nGLORY BRAWL");
        this.text1.font = 'Courier New';
        this.text1.fontSize = 30;
        this.text1.fill = '#A8D8CE';
        this.text1.fontWeight = 'bold';
        this.text1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        this.xToPlay = this.game.add.text(this.game.world.centerX, 700, "Press X to Play");
        this.xToPlay.anchor.setTo(.5);
        this.xToPlay.font = 'Courier New';
        this.xToPlay.fontSize = 40;
        this.xToPlay.fill = '#A8D8CE';
        this.xToPlay.fontWeight = 'bold';
        this.xToPlay.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            /////////CurrentWorld-PlayerPosition-CurrentWorld(metroidvania)////////
            ////////0-Up, 1-Down, 2-Left, 3-Right//////
            ///////(IndexOfCurrentWorld, Position)////////////
            //Direct Physics
            // this.game.state.start('game', true, false, 0, 0);
            //Levels
            // this.game.state.start('game', true, false, 1, 0);
            // this.game.state.start('game', true, false, 4, 1);
            this.game.state.start('game', true, false, 3, 0);
            // this.game.state.start('game', true, false, 4, 1);
            // this.game.state.start('game', true, false, 2, 2);
            // this.game.state.start('game', true, false, 5, 1);
        }
    }
};


