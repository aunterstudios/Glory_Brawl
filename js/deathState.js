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

        this.text = this.game.add.text(this.game.world.centerX-300, 200, "Try Again Prisoner \n Deaths: "+deaths);
        this.text.anchor.setTo(0.5);
        this.text.align = 'center';

        //	Font style
        this.text.font = 'Arial Black';
        this.text.fontSize = 45;
        this.text.fill = "#000000";
        this.text.fontWeight = 'bold';

    },
    update: function () {
        if (this.game.input.activePointer.isDown) {

            if (ghettoLoopMechanic === 10) {
                this.game.state.start('levelOne');
            }
            else if (ghettoLoopMechanic === 9) {
                this.game.state.start('levelTwo');
            }
            else if (ghettoLoopMechanic === 8) {
                this.game.state.start('levelThree');
            }
            else if (ghettoLoopMechanic === 7) {
                this.game.state.start('levelFour');
            }
            else if (ghettoLoopMechanic === 6) {
                this.game.state.start('levelFive');
            }
            else if (ghettoLoopMechanic === 5) {
                this.game.state.start('levelSix');
            }
            else if (ghettoLoopMechanic === 4) {
                this.game.state.start('levelSeven');
            }
            else if (ghettoLoopMechanic === 3) {
                this.game.state.start('levelEight');
            }
        }

    }
};
