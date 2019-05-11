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

//How to Play (Controls)
brawl.stateControls = function () { };
brawl.stateControls.prototype = {
    init: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
    },
    preload: function () {
        this.load.image('sideways', 'assets/howToSideWaysJump.PNG');
        this.load.image('jump', 'assets/jumpingoff.PNG');
    },
    create: function () {

        //Sprite Resting On Wall
        this.sideWaysResting = this.game.add.sprite(1100, 300, 'sideways');
        this.sideWaysResting.scale.setTo(.6);

        //Sprite Jumping Off Wall
        this.jumpingOff = this.game.add.sprite(800, 300, 'jump');
        this.jumpingOff.scale.setTo(.6);

        //Text
        for (var i = 0; i < 4; i++) {
            //Controls
            if (i === 0) {
                var xText = 10;
                var yText = 100;
                var textInput = " Spacebar or Up Arrow Key to Jump (Tap Twice to Double Jump) \n\n Down Arrow Key to Move or Push Downwards \n\n Left Arrow Key to Move Left \n\n Right Arrow Key to Move Right \n\n CTRL to Freeze Time";
                var fontFill = "#19de65";
                var fontSize = 25;
            }
            //Mechanical Explanations
            else if (i === 1) {
                var xText = 700;
                var yText = 250;
                var textInput = "You Automatically Stick to Walls. Use Arrow Keys to Jump Off";
                var fontFill = "#19de65";
                var fontSize = 20;
            }
            //Hints
            else if (i === 2) {
                var xText = 10;
                var yText = 600;
                var textInput = "Hints: \n 1. Once You Hit a Surface You Can Double-Jump Again. (Use the Ball) \n 2. The Ball is Your Best Friend \n 3. You Can Stick to the Bottom of Surfaces";
                var fontFill = "#19de65";
                var fontSize = 25;
            }
            //Spacebar to Play
            else {
                var xText = 1000;
                var yText = 700;
                var textInput = "Press Enter to Play. Get to the Top";
                var fontFill = "#ffffff";
                var fontSize = 20;
            }
            this.text1 = this.game.add.text(xText, yText, textInput);
            this.text1.font = 'Arial Black';
            this.text1.fontSize = fontSize;
            this.text1.fill = fontFill;
            this.text1.fontWeight = 'bold';
        }
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.game.state.start('rogueTest');
        }

    }
};


