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
        this.load.image('background-three', 'assets/trumpBackground.png');
    },
    create: function () {

        //Increase Death Total
        ++deaths;

        //Art
        this.trump = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background-three');
        this.trump.anchor.setTo(.5);
        //this.trump.scale.setTo(.75);

        this.text = this.game.add.text(this.game.world.centerX - 250, 220, "SPACEBAR to Try Again \n Deaths: " + deaths);
        this.text.anchor.setTo(0.5);
        this.text.align = 'center';

        //	Font style
        this.text.font = 'Arial Black';
        this.text.fontSize = 35;
        this.text.fill = "#000000";
        this.text.fontWeight = 'bold';

    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game', true, false, this.indexOfCurrentWorld, this.indexOfPlayerPosition, worldClassLevels[this.indexOfCurrentWorld].metroidvania);

        }

    }
};
