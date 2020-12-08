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

        //Text
        this.deathText = this.game.add.text(this.game.world.centerX - 250, 220, "SPACEBAR to Restart \n Deaths: " + deaths);
        //Font Style
        this.deathText.anchor.setTo(0.5);
        this.deathText.align = 'center';
        this.deathText.font = 'Arial Black';
        this.deathText.fontSize = 35;
        // this.deathText.fill = "#ff0000";
        this.deathText.fontWeight = 'bold';
        this.deathText.stroke = "#ffffff";
        this.deathText.strokeThickness = 4;

        //Gradient of Text
        var grd = this.deathText.context.createLinearGradient(0, 0, 0, this.deathText.height);

        //  Add in 2 color stops
        grd.addColorStop(0, "#ffafbd");
        grd.addColorStop(1, "#ffc3a0");

        //  And apply to the Text
        this.deathText.fill = grd;

        //New Emitter
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
        //Background Color
        this.game.stage.backgroundColor = Phaser.Color.BLACK;
        if (this.page === 0) {
            this.text1 = this.game.add.text(575, 300, "KillAmount");
            this.text1.font = 'Arial Black'
            this.text1.fontSize = 25;
            this.text1.fill = "#00FF00";
            this.text1.fontWeight = 'bold';
            this.text1.align = 'center';
        }
        else if (this.page === 1) {
            this.text1 = this.game.add.text(575, 300, "TIMER WORKS");
            this.text1.font = 'Arial Black'
            this.text1.fontSize = 25;
            this.text1.fill = "#00FF00";
            this.text1.fontWeight = 'bold';
            this.text1.align = 'center';
        }
        this.spaceBarPlay = this.game.add.text(530, 700, "Spacebar to Skip");
        this.spaceBarPlay.font = 'Arial Black';
        this.spaceBarPlay.fontSize = 30;
        this.spaceBarPlay.fill = "#00FF00";
        this.spaceBarPlay.fontWeight = 'bold';
        this.spaceBarPlay.align = 'center';
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition);
        }

    }
};
