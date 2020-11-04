//Death State
brawl.death = function () { };
brawl.death.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        //Properties For Effects
        this.max = 0;
        this.update_interval = 4 * 60;
        this.i = 0;
    },
    preload: function () {
    },
    create: function () {
        //Browser Pause
        // this.game.stage.disableVisibilityChange = true;

        //Increase Death Total
        ++deaths;

        //Background
        this.background = this.game.add.tileSprite(0, 0, 1400, 800, 'player');
        this.background.animations.add('move');
        this.background.animations.play('move', 10, true);

        //Text Bar
        this.bar = this.game.add.graphics();
        this.bar.beginFill(0x000000, .5);
        this.bar.drawRect(200, 150, 500, 150);

        //Text
        this.text = this.game.add.text(this.game.world.centerX - 250, 220, "SPACEBAR to Restart \n Deaths: " + deaths);
        this.text.anchor.setTo(0.5);
        this.text.align = 'center';

        //	Font style
        this.text.font = 'Arial Black';
        this.text.fontSize = 35;
        this.text.fill = "#ff0000";
        this.text.fontWeight = 'bold';

        //Emitter For Effect
        this.bloodSnow = this.game.add.emitter(this.game.world.centerX, -32, 50);
        this.bloodSnow.makeParticles('particles');
        this.bloodSnow.maxParticleScale = 1;
        this.bloodSnow.minParticleScale = 0.5;
        this.bloodSnow.setYSpeed(100, 200);
        this.bloodSnow.gravity = 0;
        this.bloodSnow.width = this.game.world.width * 1.5;
        this.bloodSnow.minRotation = 0;
        this.bloodSnow.maxRotation = 40;

        this.bloodSnow.start(false, 6000, 100);

    },
    changeWindDirection: function () {
        var multi = Math.floor((this.max + 200) / 4),
            frag = (Math.floor(Math.random() * 100) - multi);
        this.max = this.max + frag;

        if (this.max > 200) this.max = 150;
        if (this.max < -200) this.max = -150;

        this.setXSpeed(this.bloodSnow, this.max);
    },
    setXSpeed(emitter, max) {
        emitter.setXSpeed(max - 20, max);
        emitter.forEachAlive(this.setParticleXSpeed, this, max);
    },
    setParticleXSpeed(particle, max) {
        particle.body.velocity.x = max - Math.floor(Math.random() * 30);
    },
    update: function () {
        this.i++;
        if (this.i === this.update_interval) {
            this.changeWindDirection();
            this.update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
            this.i = 0;
        }
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
