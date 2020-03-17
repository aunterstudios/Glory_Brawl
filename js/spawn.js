//////////////////Initializing All the Sprite Groups///////////////
brawl.game.prototype.spriteGroupGenerator = function () {
    //Toggle Console Log
    this.toggleConsoleLog = false;
    // this.toggleConsoleLog = true;
    ////////////////////////////////Z-Index Order/////////////////////////////
    ////////////////////////////////Initializing Groups///////////////////////
    //Adding Images
    this.imageGroup = this.game.add.group();
    this.imageGroup.classType = Phaser.Image;
    //Adding Moveable Walls
    this.wall = this.game.add.group();
    this.wall.enableBody = true; //enables physics for wall
    //Adding Ledges
    this.ledge = this.game.add.group();
    this.ledge.enableBody = true;
    //Adding Balls
    this.ball = this.game.add.group();
    this.ball.enableBody = true;
    //Adding Enemies
    this.enemy = this.game.add.group();
    this.enemy.enableBody = true;
    //Timer Traps
    this.fallingSpikes = this.game.add.group();
    this.fallingSpikes.enableBody = true;
    //Adding Coins (Win Game)
    this.coin = this.game.add.group();
    this.coin.enableBody = true;
    //Adding Immovable Walls
    this.immovableWall = this.game.add.group();
    this.immovableWall.enableBody = true;
    //Adding This Undeniable Death
    this.death = this.game.add.group();
    this.death.enableBody = true;
    //Adding Flag Group
    this.flag = this.game.add.group();
    this.flag.enableBody = true;

    /////////////////////Practice Specific Sprite Groups/////////////////
    /////////////////////Enemy Bullets///////////////
    // creates enemy bullets
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(30, 'bulletEnemy');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 1);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);


    ///////////////////Adding Emitters///////////////
    this.emitter = this.game.add.emitter();
    this.emitter.makeParticles('particles');
    this.emitter.gravity = 100;
};
/////////////////////////Image Creation//////////////////////////
brawl.game.prototype.imageSpawn = function (sprite, positionInArray) {
    this.imageGroupX = this.imageGroup.create(sprite.x, sprite.y, sprite.art);
    this.imageGroupX.name = sprite.name;
    this.imageGroupX.scale.setTo(sprite.scale)
    this.imageGroupX.anchor.set(.5);
    this.imageGroupX.pivot.x = 100;
    this.imageGroupX.pivot.y = 100;
};
/////////////////Undeniable Death Spawn////////////////////
brawl.game.prototype.undeniableDeathSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.deathX = this.death.create(sprite.x, sprite.y, sprite.art);
    this.deathX.name = sprite.name;
    //Unkillable
    if (sprite.name === undeniableDeathRegular) {
        this.deathX.groupName = groupUndeniableDeath;
    }
    //Killable By Ball
    else if (sprite.name === spikesRegular) {
        this.deathX.groupName = groupSpikes;
    }
    this.deathX.specialCondition = sprite.specialCondition;
    this.deathX.positionInArray = positionInArray;
    this.deathX.scale.setTo(sprite.sizeX, sprite.sizeY);
    this.deathX.visible = sprite.visible;
    this.deathX.body.immovable = true;
    this.deathX.body.mass = 100;
    this.deathX.body.maxVelocity.setTo(600);
    this.deathX.body.collideWorldBounds = true;
    this.deathX.body.immovable = true;
    this.deathX.body.bounce.setTo(1);
    this.deathX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

/////////////////Immovable Walls/////////////////////
brawl.game.prototype.immovableWallSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.immovableWallX = this.immovableWall.create(sprite.x, sprite.y, sprite.art);
    this.immovableWallX.name = sprite.name;
    this.immovableWallX.groupName = groupImmovableWall;
    this.immovableWallX.specialCondition = sprite.specialCondition;
    this.immovableWallX.positionInArray = positionInArray;
    if (sprite.name === immovableWallPhase) {
        this.immovableWallX.tint = tintImmovableWallPhase;
    }
    else if (sprite.name === immovableWallKillWall) {
        this.immovableWallX.tint = tintImmovableWallKillWall;
    }
    else if (sprite.name === immovableWallMagnet) {
        this.immovableWallX.tint = tintImmovableWallMagnet;
        this.immovableWallX.anchor.setTo(.5);
    }
    else if (sprite.name === immovableWallActivation) {
        this.immovableWallX.tint = tintImmovableWallActivation;
        this.immovableWallX.anchor.setTo(.5);
    }
    else if (sprite.name === immovableWallPadding) {
        this.immovableWallX.tint = tintImmovableWallPadding;
    }
    else if (sprite.name === immovableWallWorldGravity) {
        this.immovableWallX.tint = tintImmovableWallWorldGravity;
    }
    else if (sprite.name === immovableWallMario) {
        this.immovableWallX.tint = tintImmovableWallMario;
    }
    else if (sprite.name === immovableWallSlippery) {
        this.immovableWallX.tint = tintImmovableWallSlippery;
    }
    this.immovableWallX.scale.setTo(sprite.sizeX, sprite.sizeY);
    this.immovableWallX.visible = sprite.visible;
    this.immovableWallX.body.immovable = true;
    this.immovableWallX.body.mass = 100;
    this.immovableWallX.body.maxVelocity.setTo(600);
    this.immovableWallX.body.collideWorldBounds = true;
    this.immovableWallX.body.bounce.setTo(1);
    this.immovableWallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

////////////////////////Wall Spawn///////////////////////
brawl.game.prototype.wallSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.wallX = this.wall.create(sprite.x, sprite.y, sprite.art);
    this.wallX.name = sprite.name;
    this.wallX.groupName = groupWall;
    this.wallX.specialCondition = sprite.specialCondition;
    this.wallX.positionInArray = positionInArray;
    this.wallX.velocityVsImmovable = 100;
    ////////////Moving Walls/////////// 
    if (sprite.name === wallInverse) {
        // var testTint = Math.random() * 0xffffff;
        // this.wallX.tint = testTint;
        // console.log(testTint, this.wallX.positionInArray);
        this.wallX.tint = tintWallInverse;
    }
    else if (sprite.name === wallSurf) {
        // var testTint = Math.random() * 0xffffff;
        // this.wallX.tint = testTint;
        // console.log(testTint, this.wallX.positionInArray);
        this.wallX.tint = tintWallSurf;
    }
    else if (sprite.name === wallGhost) {
        // var testTint = Math.random() * 0xffffff;
        // this.wallX.tint = testTint;
        // console.log(testTint, this.wallX.positionInArray);
        this.wallX.tint = tintWallGhost;
        this.wallX.body.immovable = true;
    }
    ///////////////Special Walls////////////////
    else if (sprite.name === wallCloud) {
        this.wallX.tint = tintWallCloud;
        this.wallX.body.immovable = true;
    }
    this.wallX.anchor.setTo(.5);
    this.wallX.scale.setTo(sprite.sizeX, sprite.sizeY);
    this.wallX.visible = sprite.visible;
    // this.wallX.body.immovable = true;
    ////////////////Special Properties////////////
    this.wallX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.wallX.body.mass = 200; //200
    this.wallX.body.maxVelocity.setTo(400);
    // this.wallX.body.friction.setTo(0);
    ////////////////////Testing///////////////////
    this.wallX.body.collideWorldBounds = true;
    ////////////////////////Testing/////////////////////////
    // this.wallX.checkWorldBounds = true;
    // this.wallX.events.onOutOfBounds.add(this.wallOut, this);
    /////////////////////////Testing//////////////////
    this.wallX.body.bounce.setTo(1);
    this.wallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    ///////////Drag Events///////////
    // this.wallX.inputEnabled = true;
    // this.wallX.input.enableDrag();
    // this.wallX.events.onDragStart.add(this.startDrag, this);
    // this.wallX.events.onDragStop.add(this.stopDrag, this);
    // this.wallX.body.moves = false;
};

/////////////////////////////Ledge Spawn///////////////////////////
brawl.game.prototype.ledgeSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.ledgeX = this.ledge.create(sprite.x, sprite.y, sprite.art);
    this.ledgeX.name = sprite.name;
    this.ledgeX.groupName = groupLedge;
    this.ledgeX.specialCondition = sprite.specialCondition;
    this.ledgeX.positionInArray = positionInArray;
    if (sprite.name === elevator) {
        this.ledgeX.tint = Phaser.Color.YELLOW;
    }
    else if (sprite.name === bounce) {
        this.ledgeX.tint = Phaser.Color.GREEN;
    }
    else if (sprite.name === surf) {
        this.ledgeX.tint = Phaser.Color.AQUA;
    }
    this.ledgeX.velocityVsWallX = 50; //30
    this.ledgeX.velocityVsWallY = 50;
    this.ledgeX.anchor.setTo(.5);
    this.ledgeX.scale.setTo(.4); //.4
    this.ledgeX.visible = sprite.visible;
    //////////////Immovable Testing//////////////
    // this.ledgeX.body.immovable = true;
    //////////////Immovable Testing//////////////
    this.ledgeX.body.mass = 20;
    this.ledgeX.body.maxVelocity.setTo(1000);
    this.ledgeX.body.collideWorldBounds = true;
    this.ledgeX.body.bounce.setTo(.5);//.5;
    this.ledgeX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

brawl.game.prototype.ballSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.ballX = this.ball.create(sprite.x, sprite.y, sprite.art);
    this.ballX.name = sprite.name;
    this.ballX.groupName = groupBall;
    this.ballX.specialCondition = sprite.specialCondition;
    this.ballX.positionInArray = positionInArray;
    this.ballX.velocityVsWallX = 50;
    this.ballX.velocityVsWallY = 50;
    this.ballX.tint = Phaser.Color.BLUE;
    this.ballX.anchor.setTo(.5);
    this.ballX.scale.setTo(.5); //.5
    this.ballX.visible = sprite.visible;
    // this.ballX.body.setCircle(50); //Maybe Change
    this.ballX.body.mass = 20;
    this.ballX.body.maxVelocity.setTo(300);
    this.ballX.body.collideWorldBounds = true;
    this.ballX.body.bounce.setTo(.5);
    this.ballX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};


//////////////////////////Creating Enemies/////////////////////////
brawl.game.prototype.enemySpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.trumpX = this.enemy.create(sprite.x, sprite.y, 'enemy');
    this.trumpX.name = sprite.name;
    this.trumpX.groupName = groupEnemy;
    this.trumpX.specialCondition = sprite.specialCondition;
    this.trumpX.positionInArray = positionInArray;
    if (sprite.name === enemyShooter) {
        // var testTint = Math.random() * 0xffffff;
        // this.trumpX.tint = testTint;
        // console.log(testTint, this.trumpX.positionInArray);
        //True
        this.trumpX.tint = tintEnemyShooter;
    }
    else if (sprite.name === enemyDaakath) {
        // var testTint = Math.random() * 0xffffff;
        // this.trumpX.tint = testTint;
        // console.log(testTint, this.trumpX.positionInArray);
        //True
        this.trumpX.tint = tintEnemyDaakath;
    }
    else if (sprite.name === enemyAccelerate) {
        // var testTint = Math.random() * 0xffffff;
        // this.trumpX.tint = testTint;
        // console.log(testTint, this.trumpX.positionInArray);
        //True
        this.trumpX.tint = tintEnemyAccelerate;
    }
    this.trumpX.velocityVsWallX = 300;
    this.trumpX.velocityVsWallY = 300;
    this.trumpX.anchor.setTo(.5);
    this.trumpX.scale.setTo(.6);
    this.trumpX.visible = sprite.visible;
    this.trumpX.body.mass = 20;
    this.trumpX.body.maxVelocity.setTo(1000);
    this.trumpX.body.collideWorldBounds = true;
    this.trumpX.body.bounce.setTo(1.0);
    this.trumpX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};
/////////////////////////////////Falling Spikes///////////////////////////
brawl.game.prototype.spikeFall = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.spikesFall = this.fallingSpikes.getFirstDead(true, sprite.x, sprite.y, 'spikeFall');
    this.spikesFall.specialCondition = sprite.specialCondition;
    this.spikesFall.positionInArray = positionInArray;
    this.spikesFall.name = sprite.name
    this.spikesFall.anchor.setTo(.5);
    this.spikesFall.scale.setTo(.5);
    this.spikesFall.checkWorldBounds = true;
    this.spikesFall.outOfBoundsKill = true;
    this.spikesFall.body.gravity.x = sprite.gravityX;
    this.spikesFall.body.gravity.y = sprite.gravityY;
};
//////////////////////////Flag Spawn(Checkpoints or Respawn Points)/////////////////////////
brawl.game.prototype.flagSpawn = function (sprite) {
    this.flagX = this.flag.create(sprite.x, sprite.y, sprite.art);
    this.flagX.name = sprite.name;
    this.flagX.specialHandler = sprite.specialHandler;
    if (sprite.name === flagSpecial) {
        this.flagX.tint = Phaser.Color.AQUA;
    }
    //this.flagX.scale(sprite.sizeX,sprite.sizeY);
    this.flagX.body.mass = 1;
    this.flagX.body.maxVelocity.setTo(300);
    this.flagX.body.collideWorldBounds = true;
    this.flagX.body.bounce.setTo(1);
    this.flagX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    ////////////////Special Property of Flag//////////////////
    this.flagX.indexOfPlayerPosition = sprite.indexOfPlayerPosition;
};
/////////////////////////////////Text Generator////////////////////////
/////////////////////////////Creation of Text in Game/////////////////////////////////
brawl.game.prototype.textCreator = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.text1 = this.game.add.text(sprite.x, sprite.y, sprite.textInput);
    this.text1.font = sprite.font;
    this.text1.fontSize = sprite.fontSize;
    this.text1.fill = sprite.fill;
    this.text1.fontWeight = sprite.fontWeight;
    this.text1.positionInArray = positionInArray
};


