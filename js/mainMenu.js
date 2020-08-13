var brawl = {};
brawl.state1 = function () { };
brawl.state1.prototype = {
    preload: function () {
        this.load.image('background-one', 'assets/trumpFirstBackground.jpg');
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
        //Setting Up FrameRate
        this.game.time.advancedTiming = true; //Allows FPS to be calculated
        // console.log(setFps);

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
        //////////Fps Settings/////////
        setFps = this.game.time.suggestedFps;
        console.log(setFps, "Hits Amiright");
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            /////////CurrentWorld-PlayerPosition-CurrentWorld(metroidvania)////////
            ////////0-Up, 1-Down, 2-Left, 3-Right//////
            ///////(IndexOfCurrentWorld, Position, MetroidVania(Same as Index of Current World))
            //Direct Physics
            this.game.state.start('game', true, false, 0, 0, worldClassLevels[0].metroidvania);
            //Level I'm Testing-Sean Moody
            // this.game.state.start('game', true, false, 4, 1, worldClassLevels[4].metroidvania);
            // this.game.state.start('game', true, false, 2, 3, worldClassLevels[2].metroidvania);
            // this.game.state.start('game', true, false, 3, 1, worldClassLevels[3].metroidvania);

        }
    }
};


