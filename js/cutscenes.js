//Death State
brawl.death = function () { };
brawl.death.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
    },
    preload: function () {
    },
    create: function () {
        //Browser Pause
        // this.game.stage.disableVisibilityChange = true;

        // this.game.stage.backgroundColor = "#ffffff";

        //Increase Death Total
        ++deaths;

        // //Background
        // this.background = this.game.add.tileSprite(0, 0, 1400, 800, 'player');
        // this.background.animations.add('move');
        // this.background.animations.play('move', 10, true);

        this.background = this.game.add.sprite(this.game.world.centerX + 100, this.game.world.centerY, 'player');
        // this.background.animations.add('move');
        // this.background.animations.play('move', 10, true);
        this.background.animations.add('move');
        this.background.animations.play('move', 5, true);

        ////////////////////////////////////////Death Text///////////////////////////////////////
        if (this.game.stage.backgroundColor === 0) {
            this.deathText = this.game.add.bitmapText(this.game.world.centerX - 250, 220, fontGrind, "SPACEBAR\n\nto Restart", 35);

            ///////////////////////////////////////Death Number////////////////////////////////////////////
            this.deathText4 = this.game.add.bitmapText(this.game.world.centerX + 250, 270, fontNokia, deaths, 35);
            this.deathText4 = this.game.add.text(this.game.world.centerX + 275, 290, deaths);
            //Font Style
            this.deathText4.font = 'Brush Script MT';
            this.deathText4.fontSize = 35;
            this.deathText4.fontWeight = 'bold';
            // this.deathText4.stroke = "#ffffff";
            // this.deathText4.strokeThickness = 4;
            this.deathText4.fill = "#FF0000"

            // //Gradient of Text
            // var grd = this.deathText4.context.createLinearGradient(0, 0, 0, this.deathText4.height);

            // //Fill Grid
            // grd.addColorStop(0, "#ffafbd");
            // grd.addColorStop(1, "#ffc3a0");
            // this.deathText4.fill = grd;
        }
        else {
            this.deathText = this.game.add.bitmapText(this.game.world.centerX - 250, 220, fontBlock, "SPACEBAR", 35);
            this.deathText2 = this.game.add.bitmapText(this.game.world.centerX - 250, 270, fontNokia, "to Restart", 35);
            this.deathText4 = this.game.add.bitmapText(this.game.world.centerX + 250, 270, fontNokia, deaths, 35);
        }
        this.deathText3 = this.game.add.bitmapText(this.game.world.centerX + 250, 220, fontGrind, "Deaths", 35);

        ////////////////////////////////Blood Rain Emitter//////////////////////////////
        this.bloodRain = this.game.add.emitter(this.game.world.centerX, 0, 2000);
        this.bloodRain.width = this.game.world.width * 1.5;
        // this.bloodRain.angle = 30; // uncomment to set an angle for the rain.
        this.bloodRain.makeParticles('particles');
        this.bloodRain.minParticleScale = 1;
        this.bloodRain.maxParticleScale = 1.5;
        this.bloodRain.setYSpeed(300, 500);
        this.bloodRain.setXSpeed(-5, 5);
        this.bloodRain.minRotation = 0;
        this.bloodRain.maxRotation = 40;
        this.bloodRain.start(false, 1600, 5, 0);
    },
    update: function () {
        this.background.rotation += .01;
        this.background.tint = Phaser.Color.getRandomColor();
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition);
        }

    }
};

//Story Pages
brawl.story = function () { };
brawl.story.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, page) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.page = page;
    },
    create: function () {
        //Browser Pause
        // this.game.stage.disableVisibilityChange = true;
        //Sprites
        // this.imagePlayer = this.game.add.image(700, 600, 'player');
        // this.imagePlayer.animations.add('left', [7, 8, 9], 10, true);
        // this.imagePlayer.animations.add('right', [13, 14, 15], 10, true);
        // this.game.stage.backgroundColor = Phaser.Color.WHITE;
        //Background Color
        if (this.page === 0) {
            //Line by Line
            var content = [
                " ",
                "There's something I need to do",
                "I know it has something to do with this pain inside me",
                "And Glory Brawl has the answers",
            ];
            // var text = new lineTextCreator(200, 250, 'Lucida Console', "#FF0000", 30, content, 120, 400, '#000000', 4)
            // lineText(text);
            var text = new lineTextCreator(200, 350, 'Courier New', "#000000", 30, content, 50, 2, '#8A0707', 4)
            kernText(text);
            ////////////////////////////////Blood Rain Emitter//////////////////////////////
            this.emitterStory();
        }
        else if (this.page === 1) {
            this.text1 = this.game.add.text(525, 300, "TIMER WORKS");
            this.text1.font = 'Arial Black'
            this.text1.fontSize = 25;
            this.text1.fill = "#00FF00";
            this.text1.fontWeight = 'bold';
            this.text1.align = 'center';
        }
        this.spaceBarPlay = this.game.add.text(50, 850, "Spacebar to Skip");
        this.spaceBarPlay.font = 'Arial Black';
        this.spaceBarPlay.fontSize = 20;
        // this.spaceBarPlay.fill = "#00FF00";
        this.spaceBarPlay.fill = "#000000";
        this.spaceBarPlay.fontWeight = 'bold';
        this.spaceBarPlay.align = 'center';
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition);
        }

    },
    emitterStory: function () {
        ////////////////////////////////Blood Rain Emitter//////////////////////////////
        this.bloodRain = this.game.add.emitter(this.game.world.centerX, 0, 2000);
        this.bloodRain.width = this.game.world.width * 1.5;
        // this.bloodRain.angle = 30; // uncomment to set an angle for the rain.
        this.bloodRain.makeParticles('particles');
        this.bloodRain.minParticleScale = 1;
        this.bloodRain.maxParticleScale = 1.5;
        this.bloodRain.setYSpeed(300, 500);
        this.bloodRain.setXSpeed(-5, 5);
        this.bloodRain.minRotation = 0;
        this.bloodRain.maxRotation = 40;
        this.bloodRain.start(false, 1600, 5, 0);
    },
};
