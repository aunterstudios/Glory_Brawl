//Death State
brawl.state2 = function () { };
brawl.state2.prototype = {
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

//Death State
brawl.story = function () { };
brawl.story.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania, page, backgroundColor, fontColor) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
        //Init To Get to the Next State
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
        this.page = page;
        this.backgroundColor = backgroundColor;
        this.fontColor = fontColor;
    },
    create: function () {
        this.game.stage.backgroundColor = this.backgroundColor;
        if (this.page === 0) {
            this.text1 = this.game.add.text(550, 200, "The Shadow is Eternal.\n\nI'm burned in your soul.\n\nWe Will Keep Doing This\n\nForever.");
            this.text1.font = 'Courier New'
            this.text1.fontSize = 25;
            this.text1.fill = this.fontColor;
            this.text1.fontWeight = 'bold';
            this.text1.align = 'center';
        }
        else if (this.page === 1) {
            this.text1 = this.game.add.text(100, 200, "It's All A Lie\n\nWe've Never Been Reborn");
            this.text1.font = 'Courier New'
            this.text1.fontSize = 25;
            this.text1.fill = this.fontColor;
            this.text1.fontWeight = 'bold';
            this.text1.align = 'left';
        }
        this.spaceBarPlay = this.game.add.text(590, 700, "Spacebar to Skip");
        this.spaceBarPlay.font = 'Courier New';
        this.spaceBarPlay.fontSize = 25;
        this.spaceBarPlay.fill = this.fontColor;
        this.spaceBarPlay.fontWeight = 'bold';
    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].metroidvania);

        }

    }
};
