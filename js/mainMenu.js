var brawl = {};
brawl.state1 = function () { };
brawl.state1.prototype = {
    preload: function () {
        //////////////////////////////Loads All The Sprites At The Main Menu Screen////////////////////
        this.load.image('background-one', 'assets/trumpFirstBackground.jpg');
        this.load.image('deathTile', 'assets/deathTile.png');
        this.load.image('deathMoveTile', 'assets/deathMoveTile.png');
        //Immovable Walls
        this.load.image('groundTile', 'assets/groundTile.png');
        this.load.image('gMovingTile', 'assets/gMovingTile.png');
        //Moveable Walls
        this.load.image('wallTile50', 'assets/wallTile50.png');
        this.load.image('wallTile25', 'assets/wallTile25.png');
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
        /////////////////////////////////Menu Images and Sprites////////////////////////
        this.load.image('background-three', 'assets/trumpFirstBackground.jpg');
        //Bit Map Font
        if (bitmapBoolean) {
            this.game.load.bitmapFont('fontGrind', 'assets/fontGrind.png', 'assets/fontGrind.fnt');
        }
    },
    create: function () {

        //Full Screen-Scaling
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.O);

        this.fullSize.onDown.add(this.gofull, this);

        //Scaling V.2
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Trump Background
        this.trumpBackground = this.game.add.sprite(this.game.world.centerX + 200, this.game.world.centerY, 'background-one');
        this.trumpBackground.anchor.setTo(.5);

        //Adding Cool Looking Text
        text = this.game.add.text(200, 50, '', { font: "30px Impact", fill: "#FF0000" });
        nextLine();

        //Skip Written Already.
        this.text2 = game.add.text(200, 600, "Press SPACEBAR to Play.\nPress O to go Full-Screen");

        //	Font style
        this.text2.font = 'Impact';
        this.text2.fontSize = 30;
        this.text2.fill = "#FF0000";
        this.text2.fontWeight = 'bold';

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
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('controlScreen');
        }
    }
};

////////////////////////Play the Game//////////////////
brawl.stateControls = function () { };
brawl.stateControls.prototype = {
    init: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
    },
    preload: function () {
    },
    create: function () {
        this.text1 = this.game.add.text(100, 200, "I know you don't know what's going on.\n\nBut we've been here countless times.\n\nDoing the same thing over and over again.\n\nTrying to become reborn again.\n\nTo defeat The Shadow.\n\nSo I ask you to remember the words.\n\nGLORY BRAWL");
        this.text1.font = 'Courier New';
        this.text1.fontSize = 25
        this.text1.fill = '#ffffff';
        this.text1.fontWeight = 'bold';

        this.xToPlay = this.game.add.text(600, 700, "Press X to Play");
        this.xToPlay.font = 'Courier New';
        this.xToPlay.fontSize = 25;
        this.xToPlay.fill = '#ff0000'
        this.xToPlay.fontWeight = 'bold';
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            /////////CurrentWorld-PlayerPosition-CurrentWorld(metroidvania)////////
            ////////0-Up, 1-Down, 2-Left, 3-Right//////
            ///////(IndexOfCurrentWorld, Position, MetroidVania(Same as Index of Current World))
            //Direct Physics
            this.game.state.start('game', true, false, 0, 0, worldClassLevels[0].metroidvania);
            //Sean Moody Level Mode
            // this.game.state.start('game', true, false, 1, 1, worldClassLevels[1].metroidvania);
            //Actual Levels
            // this.game.state.start('game', true, false, 4, 3, worldClassLevels[4].metroidvania);
        }
    }
};


