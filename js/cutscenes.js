//Death State
brawl.death = function () { };
brawl.death.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
    },
    preload: function () {
    },
    create: function () {

        //Increase Death Total
        ++deaths;

        //Art
        this.trump = this.game.add.sprite(this.game.world.centerX + 300, this.game.world.centerY, 'background-three');
        this.trump.anchor.setTo(.5);
        //this.trump.scale.setTo(.75);

        this.text = this.game.add.text(this.game.world.centerX - 250, 220, "SPACEBAR to Try Again \n Attemps to Be Reborn: " + deaths);
        this.text.anchor.setTo(0.5);
        this.text.align = 'center';

        //	Font style
        this.text.font = 'Arial Black';
        this.text.fontSize = 35;
        this.text.fill = "#ff0000";
        this.text.fontWeight = 'bold';

    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].metroidvania);

        }

    }
};

//Story Pages
brawl.story = function () { };
brawl.story.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania, page) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
        this.page = page;
    },
    create: function () {
        this.game.stage.backgroundColor = Phaser.Color.WHITE;
        if (this.page === 0) {
            this.text1 = this.game.add.text(550, 200, "The Shadow is Eternal.\n\nI'm burned in your soul.\n\nWe Will Keep Doing This\n\nForever.");
            this.text1.font = 'Courier New'
            this.text1.fontSize = 25;
            this.text1.fill = Phaser.Color.RED;
            this.text1.fontWeight = 'bold';
            this.text1.align = 'center';
        }
        this.spaceBarPlay = this.game.add.text(590, 700, "Spacebar to Skip");
        this.spaceBarPlay.font = 'Courier New';
        this.spaceBarPlay.fontSize = 25;
        this.spaceBarPlay.fill = Phaser.Color.RED;
        this.spaceBarPlay.fontWeight = 'bold';
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].metroidvania);
            // console.log(this.indexOfCurrentWorld);
        }

    }
};
