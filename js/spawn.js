//////////////////Initializing All the Sprite Groups///////////////
brawl.game.prototype.spriteGroupGenerator = function () {
    ////////////////////////Toggle Console Log//////////////////
    this.toggleConsoleLog = false;
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
    //Adding Immovable Walls
    this.immovableWall = this.game.add.group();
    this.immovableWall.enableBody = true;
    //Adding This Undeniable Death
    this.undeniableDeath = this.game.add.group();
    this.undeniableDeath.enableBody = true;
    //Adding Hazama and Powerups
    this.hazama = this.game.add.group();
    this.hazama.enableBody = true;
    //Adding Flag Group
    this.flag = this.game.add.group();
    this.flag.enableBody = true;
    //Slow Motion
    this.slowMotionGroup = this.game.add.group();
    this.slowMotionGroup.classType = Phaser.Image;
    ////////////////////////////////Creating Enemy Bullets///////////////////////////////
    //  Creates 30 bullets, using the 'bullet' graphic
    this.enemyBullets = this.game.add.weapon(1000, 'bulletKill');
    //  The bullet will be automatically killed when it leaves the camera bounds
    this.enemyBullets.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    //  Because our bullet is drawn facing up, we need to offset its rotation:
    this.enemyBullets.bulletAngleOffset = 90;
    //  The speed at which the bullet is fired
    this.enemyBullets.bulletSpeed = 600;
    this.enemyBullets.fireRate = 300;
    this.enemyBullets.multiFire = true;
    this.enemyBullets.autoExpandBulletsGroup = true;

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
////////////////////////Sprite Generator///////////////////////////
brawl.game.prototype.spriteGen = function (sprite, positionInArray, groupSprite, groupCategory, tileOrSprite) {
    //////////////Debugging Purposes/////////////
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray, groupSprite, groupCategory, tileOrSprite);
    }
    ///////////////Sprite Generation///////////
    if (tileOrSprite === 'tile') {
        var newTile = this.game.add.tileSprite(sprite.x, sprite.y, sprite.widthX, sprite.widthY, sprite.art);
        this.game.physics.enable([newTile], Phaser.Physics.ARCADE);
        this.spriteX = groupSprite.add(newTile);
        this.spriteX.tileScale.setTo(sprite.scale);
    }
    else {
        this.spriteX = groupSprite.create(sprite.x, sprite.y, sprite.art);
        this.spriteX.scale.setTo(sprite.scale);
    }
    this.spriteX.name = sprite.spriteType.name;
    this.spriteX.groupName = groupCategory;
    this.spriteX.tint = sprite.spriteType.tint;
    this.spriteX.specialCondition = sprite.specialCondition;
    this.spriteX.positionInArray = positionInArray;
    this.spriteX.anchor.setTo(sprite.spriteType.anchor);
    //Physics Properties
    this.spriteX.body.immovable = sprite.spriteType.immovable;
    this.spriteX.body.mass = sprite.spriteType.mass;
    this.spriteX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.spriteX.body.maxVelocity.setTo(sprite.spriteType.maxVelocity);
    this.spriteX.body.collideWorldBounds = true;
    this.spriteX.body.bounce.setTo(sprite.spriteType.bounce);
    this.spriteX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);

    /////////////////////////Special Properties of Sprites/////////////////
    if (sprite.spriteType.name === immovableWallOneWayPlayerBlockLeft.name ) {
        this.spriteX.body.checkCollision.left = false;
    }
    ///////////Drag Events///////////
    // this.spriteX.inputEnabled = true;
    // this.spriteX.input.enableDrag();
    // this.spriteX.events.onDragStart.add(this.startDrag, this);
    // this.spriteX.events.onDragStop.add(this.stopDrag, this);
    // this.spriteX.body.moves = false;
    ////////////////////////Testing/////////////////////////
    // this.spriteX.checkWorldBounds = true;
    // this.spriteX.events.onOutOfBounds.add(this.wallOut, this);
};
/////////////////////////////////Falling Spikes///////////////////////////
brawl.game.prototype.fallingSpikesSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.fallingSpikesX = this.fallingSpikes.getFirstDead(true, sprite.x, sprite.y, sprite.art);
    this.fallingSpikesX.specialCondition = sprite.specialCondition;
    this.fallingSpikesX.positionInArray = positionInArray;
    this.fallingSpikesX.name = sprite.spriteType.name
    this.fallingSpikesX.anchor.setTo(.5);
    this.fallingSpikesX.scale.setTo(sprite.scale);
    //Physics Properties
    this.fallingSpikesX.checkWorldBounds = true;
    this.fallingSpikesX.outOfBoundsKill = true;
    this.fallingSpikesX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
};
//////////////////////////Flag Spawn(Checkpoints or Respawn Points)/////////////////////////
brawl.game.prototype.flagSpawn = function (sprite) {
    this.flagX = this.flag.create(sprite.x, sprite.y, sprite.art);
    this.flagX.name = sprite.name;
    this.flagX.specialHandler = sprite.specialHandler;
    if (sprite.name === flagSpecial) {
        this.flagX.tint = Phaser.Color.AQUA;
    }
    this.flagX.body.mass = 1;
    this.flagX.body.maxVelocity.setTo(300);
    this.flagX.body.collideWorldBounds = true;
    this.flagX.body.bounce.setTo(1);
    this.flagX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    ////////////////Special Property of Flag//////////////////
    this.flagX.indexOfPlayerPosition = sprite.indexOfPlayerPosition;
};
/////////////////////////////Text Generator/////////////////////////////////
brawl.game.prototype.textCreator = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    if (bitmapBoolean) {
        this.text1 = this.game.add.bitmapText(sprite.x, sprite.y, sprite.font, sprite.textInput, sprite.fontSize);
    }
    else {
        this.text1 = this.game.add.text(sprite.x, sprite.y, sprite.textInput);
        this.text1.font = 'Courier New'
        this.text1.fontSize = 25;
        this.text1.fill = '#000000';
        this.text1.fontWeight = 'bold';
    }
    this.text1.positionInArray = positionInArray;
};


