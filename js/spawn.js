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
    this.fallingSpikesTwo = this.game.add.group(); //To draw from different Sprite Pool
    this.fallingSpikesTwo.enableBody = true;
    //Adding Ground
    this.ground = this.game.add.group();
    this.ground.enableBody = true;
    //Adding Death
    this.death = this.game.add.group();
    this.death.enableBody = true;
    //Adding Hazama and Powerups
    this.hazama = this.game.add.group();
    this.hazama.enableBody = true;
    //Adding Invisible Objects
    this.invisible = this.game.add.group();
    this.invisible.enableBody = true;
    //Adding Flag Group
    this.flag = this.game.add.group();
    this.flag.enableBody = true;
    //Slow Motion
    this.slowMotionGroup = this.game.add.group();
    this.slowMotionGroup.classType = Phaser.Image;
    ////////////////////////////////Creating Enemy Bullets///////////////////////////////
    //  Creates 30 bullets, using the 'bullet' graphic
    this.enemyBullets = this.game.add.weapon(1000, 'bulletOne');
    //  Global Tint of Enemy Bullets
    this.enemyBullets.bullets.setAll('tint', 12758247.409111453);
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
brawl.game.prototype.spriteGen = function (sprite, positionInArray) {
    //////////////Debugging Purposes/////////////
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    ///////////////////Group Generation/////////////////
    var groupArray = [
        new groupArrayCreator(this.death, groupDeath),
        new groupArrayCreator(this.ground, groupGround),
        new groupArrayCreator(this.wall, groupWall),
        new groupArrayCreator(this.ledge, groupLedge),
        new groupArrayCreator(this.enemy, groupEnemy),
        new groupArrayCreator(this.ball, groupBall),
        new groupArrayCreator(this.fallingSpikes, groupFallingSpikes),
        new groupArrayCreator(this.fallingSpikesTwo, groupFallingSpikes),
        new groupArrayCreator(this.hazama, groupHazama),
        new groupArrayCreator(this.invisible, groupInvisible),
        /////////////Moving Ground and Death/////////////
        new groupArrayCreator(this.death, groupDeathMove),
        new groupArrayCreator(this.ground, groupGroundMove),
    ]
    var groupSprite = groupArray[sprite.spriteType.groupNumber].groupSprite;
    var groupCategory = groupArray[sprite.spriteType.groupNumber].groupCategory;
    //Checks if It's a tileSprite or Regular Sprite or Timer
    if (sprite.generationType === 'tile') {
        var newTile = this.game.add.tileSprite(sprite.x, sprite.y, sprite.widthX, sprite.widthY, sprite.art);
        this.game.physics.enable([newTile], Phaser.Physics.ARCADE);
        this.spriteX = groupSprite.add(newTile);
        this.spriteX.tileScale.setTo(sprite.scale);
    }
    else if (sprite.generationType === 'sprite') {
        this.spriteX = groupSprite.create(sprite.x, sprite.y, sprite.art);
        this.spriteX.scale.setTo(sprite.scale);
    }
    else if (sprite.generationType === 'timer') {
        this.spriteX = groupSprite.getFirstDead(true, sprite.x, sprite.y, sprite.art);
        this.spriteX.scale.setTo(sprite.scale);
    }
    //Sprite Name
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
    //Handle Collision Events
    this.spriteX.phase = true;
    this.spriteX.originalTint = sprite.spriteType.tint;
    // if (sprite.specialCondition) {
    //     this.spriteX.body.setSize(this.spriteX.width / 1.4, this.spriteX.height / 1.4, 20);
    // }
    /////////////////////Worlds Bound Configuration////////////////////////
    if (groupCategory !== groupFallingSpikes) {
        this.spriteX.body.collideWorldBounds = true;
    }
    else {
        this.spriteX.checkWorldBounds = true;
        this.spriteX.outOfBoundsKill = true;
    }
    this.spriteX.body.bounce.setTo(sprite.spriteType.bounce);
    this.spriteX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    /////////////////////////Special Properties of Sprites/////////////////
    if (sprite.spriteType.name === groundOneWayPlayerBlockLeft.name) {
        this.spriteX.body.checkCollision.left = false;
    }
    if (sprite.spriteType.name === groundOneWayPlayerBlockDown.name) {
        this.spriteX.body.checkCollision.down = false;
    }
    ////////////////////Alpha////////////////////////
    if (groupCategory === groupHazama) {
        this.spriteX.alpha = .3;
    }
    if (groupCategory === groupInvisible) {
        this.spriteX.alpha = .1;
    }
    if (sprite.spriteType.name === groundOneWayKillObject.name) {
        this.spriteX.alpha = .4;
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


