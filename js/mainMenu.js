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
                var yText = 70;
                var textInput = " W or Spacebar to Jump (Tap Twice to Double Jump) \n\n S to Move or Push Downwards \n\n A to Move Left \n\n D to Move Right \n\n Use Mouse to Shoot \n\n Press 1 or 2 or 3 to Switch Weapons \n\n 1-Pull 2-Stop 3-Kill \n\n P to Pause";
                var fontFill = "#19de65";
                var fontSize = 25;
            }
            //Mechanical Explanations
            else if (i === 1) {
                var xText = 700;
                var yText = 250;
                var textInput = "You Automatically Stick to Walls. Press F to Full Screen";
                var fontFill = "#19de65";
                var fontSize = 20;
            }
            //Hints
            else if (i === 2) {
                var xText = 10;
                var yText = 600;
                var textInput = "Hints: \n 1. Once You Hit a Surface You Can Double-Jump Again.\n 2. Use Your Weapon to Manipulate the Environment. \n 3. You Can Stick to the Bottom of Surfaces. \n 4. Play Patiently";
                var fontFill = "#19de65";
                var fontSize = 25;
            }
            //Spacebar to Play
            else {
                var xText = 900;
                var yText = 700;
                var textInput = "Press Z to Play Procedural Version. Complete the Objective. \n\n Press X to Play Designed Levels (Incomplete)";
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
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            this.game.state.start('rogueTest');
            deathStateProcedural = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            // this.game.state.start('test', true, false, 0, 1, worldDesignedLevels[0].metroidvania);
            this.game.state.start('test', true, false, 1, 1, worldDesignedLevels[1].metroidvania);
            deathStateProcedural = false;
        }
    }
};


