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
        //Controls
        this.load.image('controlScreen', 'assets/controls.png');
        //Bit Map Font
        if (bitmapBoolean) {
            this.game.load.bitmapFont('fontGrind', 'assets/fontGrind.png', 'assets/fontGrind.fnt');
            this.game.load.bitmapFont('fontBlock', 'assets/fontBlock.png', 'assets/fontBlock.fnt');
            this.game.load.bitmapFont('fontNokia', 'assets/fontNokia.png', 'assets/fontNokia.fnt');
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
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(0, 100, 5);
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
            "Beginning Levels",
            "GLORY BRAWL",
        ];
        var text = new lineTextCreator(100, 150, 'Impact', '#ffffff', 42, content, 120, 400, '#000000', 4)
        lineText(text);

        ///////////////////Main Title Reflect Later Use/////////////////
        // this.titleText = this.game.add.text(200, 150, "GLORY BRAWL");
        // this.titleText.font = 'Impact';
        // this.titleText.fontSize = 42;
        // this.titleText.fill = "#ffffff";
        // this.titleText.fontWeight = 'bold';
        // this.titleText.align = 'center';
        // this.titleText.anchor.setTo(.5);
        // this.titleText.stroke = "#ff0000";
        // this.titleText.strokeThickness = 4;

        // //Title Reflect
        // this.titleTextReflect = this.game.add.text(200, 200, "GLORY BRAWl");
        // //  Centers the text
        // this.titleTextReflect.anchor.set(0.5);
        // this.titleTextReflect.align = 'center';
        // this.titleTextReflect.scale.y = -1;
        // //  Our font + size
        // this.titleTextReflect.font = 'Impact';
        // this.titleTextReflect.fontWeight = 'bold';
        // this.titleTextReflect.fontSize = 42;
        // //  Here we create a linear gradient on the Text context.
        // //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
        // var grd = this.titleTextReflect.context.createLinearGradient(0, 0, 0, this.titleText.canvas.height);
        // //  Add in 2 color stops
        // grd.addColorStop(0, 'rgba(255,255,255,0)');
        // grd.addColorStop(1, 'rgba(255,255,255,0.08)');
        // //  And apply to the Text
        // this.titleTextReflect.fill = grd;


        //Skip Written Already.
        this.skipText = this.game.add.text(this.game.world.centerX - 25, this.game.world.centerY + 375, "Press SPACEBAR to Play.\nPress O to go Full-Screen");

        //	Font style
        this.skipText.font = 'Impact';
        this.skipText.fontSize = 30;
        this.skipText.fill = "#ffffff";
        this.skipText.fontWeight = 'bold';
        this.skipText.align = 'center';
        this.skipText.anchor.setTo(.5);
        this.skipText.stroke = "#000000";
        this.skipText.strokeThickness = 4;

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
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(100, 250, 5);
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
        //Background
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(10, 50);

        // //Line by Line
        // var content = [
        //     "I know longer remember who I am or why I'm here.",
        //     "But I'm filled with desire to find answers.",
        //     "Why is my heart filled with such anger and sadness?",
        //     "Why must I complete Glory Brawl's trials?",
        // ];
        // var text = new lineTextCreator(200, 250, 'Lucida Console', "#FF0000", 30, content, 120, 400, '#000000', 4)
        // lineText(text);

        //Kern
        // var content = [
        //     " ",
        //     "I know longer remember who I am or why I'm here.",
        //     "But I'm filled with desire to find answers.",
        //     "Why is my heart filled with such anger and sadness?",
        //     "Why must I complete Glory Brawl's trials?",
        // ];
        // var text = new lineTextCreator(200, 250, 'Bradley Hand', "#FF0000", 30, content, 80, 2)
        // kernText(text);

        this.text = this.game.add.text(525, 100, "GLORY BRAWL");
        this.text.font = 'Courier New';
        this.text.fontSize = 72;
        this.text.fill = "#ffffff";
        this.text.fontWeight = 'bold';
        this.text.align = 'center';
        this.text.stroke = "#CD5C5C";
        this.text.strokeThickness = 10;
        this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        this.newText = this.game.add.text(525, 800, "GLORY BRAWL");
        this.newText.font = 'Courier New';
        this.newText.fontSize = 72;
        this.newText.fill = "#ffffff";
        this.newText.fontWeight = 'bold';
        this.newText.align = 'center';
        this.newText.stroke = "#CD5C5C";
        this.newText.strokeThickness = 10;
        this.newText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        // var content = [
        //     "While enduring a miasma",
        //     "Of depression and neuroticism",
        //     "Crushing my soul from within",
        //     "I saw a chance for salvation",
        //     "The completion of this story",
        //     "The start of my revenge",
        //     "To tell stories and to fuck"
        // ];

        // var content = [
        //     "It's so hard to do anything",
        //     "when the miasma of",
        //     "depression and neuroticism",
        //     "constantly eats your soul",
        //     "but I saw a chance for salvation",
        //     "the completion of this story",
        //     "a chance for happiness"
        // ];

        // var content = [
        //     "The almighty warrior",
        //     "that suffers the miasma",
        //     "of depression and neuroticism",
        //     "finds the antidote",
        //     "through the completion of this story",
        //     "the start of his counter-attack",
        // ];

        // var content = [
        //     "I've always been a warrior",
        //     "fighting an epic battle of life and death",
        //     "against the almighty and invincible evil",
        //     "known as depression and neuroticism",
        //     "I don't think I ever had a chance of winning",
        //     "but I have one last gambit to play",
        //     "the completion of this story"
        // ];

        // var content = [
        //     "This is my prayer to myself",
        //     "I am the bravest warrior",
        //     "sworn to fight the almighty evil",
        //     "known as depression and neuroticism",
        //     "I don't think I ever had a chance of winning",
        //     "But I will keep fighting",
        //     "for I do have one last gambit to play",
        //     "the completion of this story"
        // ];

        var content = [
            "A warrior is tasked with a duty",
            "To slay the three great evils of his world",
            "Obsessiveness, depression, and neuroticism",
            "To accomplish this",
            "He needs to complete this story"
        ];




        var text = new lineTextCreator(400, 300, 'Courier New', "#ffffff", 30, content, 200, 200, "#000000", 10)
        lineText(text)

        // var text = new lineTextCreator(400, 400, 'Courier New', "#ffffff", 30, content, 50, 2, "#000000", 10)
        // kernText(text)

        /////////////////////////Skip//////////////////////////////////////
        this.xToPlay = this.game.add.text(50, 850, "Press X to Play");
        // this.xToPlay.anchor.setTo(.5);
        this.xToPlay.font = 'Courier New';
        this.xToPlay.fontSize = 20;
        this.xToPlay.fill = '#ffffff';
        // this.xToPlay.fontWeight = 'bold';
        this.xToPlay.stroke = "#000000";
        this.xToPlay.strokeThickness = 10;
        this.xToPlay.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    },
    update: function () {
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(10, 100, 5);
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            /////////CurrentWorld-PlayerPosition-CurrentWorld(metroidvania)////////
            ////////0-Up, 1-Down, 2-Left, 3-Right//////
            ///////(IndexOfCurrentWorld, Position)////////////
            //Direct Physics
            // this.game.state.start('game', true, false, 0, 0);
            //Beginning
            // this.game.state.start('game', true, false, 7, 0);
            //OG Actual Levels
            // this.game.state.start('game', true, false, 1, 0);
            // this.game.state.start('game', true, false, 2, 3);
            // this.game.state.start('game', true, false, 3, 0);
            // this.game.state.start('game', true, false, 4, 1);
            //Working on these Levels
            this.game.state.start('game', true, false, 12, 3);
            // this.game.state.start('game', true, false, 8, 1);
            // this.game.state.start('game', true, false, 5, 3);
        }
    }
};


