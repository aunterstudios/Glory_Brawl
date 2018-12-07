var brawl= {};
brawl.state1=function(){};
brawl.state1.prototype= {
    preload: function (){
        this.load.image('background-one', 'assets/trumpFirstBackground.jpg');
    },
    create: function (){

        //Trump Background
        this.trumpBackground = this.game.add.sprite(this.game.world.centerX+200,this.game.world.centerY+150,'background-one');
        this.trumpBackground.anchor.setTo(.5);
        //Scaling
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Adding Cool Looking Text
        text = this.game.add.text(40, 50, '', { font: "50px Arial", fill: "#19de65" });
        nextLine();
        
        //Skip Written Already.
        this.text2 = game.add.text(700,300,"Tap Screen to Skip/Play");

        //	Font style
        this.text2.font = 'Arial';
        this.text2.fontSize = 35;
        this.text2.fill= "#19de65";
        this.text2.fontWeight = 'bold';

    },
    update: function (){
       if (this.game.input.activePointer.isDown)
      {
        this.game.state.start('ruleSets');
      }
    }
};


