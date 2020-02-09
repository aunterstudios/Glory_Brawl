var brawl = {};
brawl.state1 = function () { };
brawl.state1.prototype = {
    preload: function () {
        this.load.image('background-one', 'assets/trumpFirstBackground.jpg');
    },
    create: function () {

        //Full Screen-Scaling
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.F);

        this.fullSize.onDown.add(this.gofull, this);

        //Scaling V.2
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Trump Background
        this.trumpBackground = this.game.add.sprite(this.game.world.centerX + 200, this.game.world.centerY + 150, 'background-one');
        this.trumpBackground.anchor.setTo(.5);

        //Adding Cool Looking Text
        text = this.game.add.text(40, 50, '', { font: "25px Arial", fill: "#19de65" });
        nextLine();

        //Skip Written Already.
        this.text2 = game.add.text(800, 300, "Press SPACEBAR to Play.\nPress F to go Full-Screen");

        //	Font style
        this.text2.font = 'Arial';
        this.text2.fontSize = 30;
        this.text2.fill = "#19de65";
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
        var xText = 550;
        var yText = 400;
        var textInput = "Press X to Play";
        var fontFill = "#ffffff";
        var fontSize = 20;
        this.text1 = this.game.add.text(xText, yText, textInput);
        this.text1.font = 'Arial Black';
        this.text1.fontSize = fontSize;
        this.text1.fill = fontFill;
        this.text1.fontWeight = 'bold';
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            /////////CurrentWorld-PlayerPosition-CurrentWorld(metroidvania)////////
            ////////0-Up, 1-Down, 2-Left, 3-Right//////
            ///////(IndexOfCurrentWorld, Position, MetroidVania(Same as Index of Current World))
            //Level 3
            this.game.state.start('game', true, false, 1, 3, worldClassLevels[1].metroidvania);

        }
    }
};


