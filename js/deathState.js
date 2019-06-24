//Death State
brawl.state2 = function () { };
brawl.state2.prototype = {
    init: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.world.setBounds(0, 0, 1400, 800);
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

        this.text = this.game.add.text(this.game.world.centerX - 300, 300, "SPACEBAR to Try Again Prisoner \n Deaths: " + deaths + "\n Longest Streak: " + longestStreak);
        this.text.anchor.setTo(0.5);
        this.text.align = 'center';

        //	Font style
        this.text.font = 'Arial Black';
        this.text.fontSize = 35;
        this.text.fill = "#000000";
        this.text.fontWeight = 'bold';

        console.log(deathStateProcedural);

    },
    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (deathStateProcedural) {
                this.game.state.start('rogueTest');
            }
            else {
                this.game.state.start('test');
            }
        }

    }
};
