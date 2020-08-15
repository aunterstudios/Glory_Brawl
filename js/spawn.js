//////////////////Initializing All the Sprite Groups///////////////
brawl.game.prototype.spriteGroupGenerator = function () {
    ////////////////////////Toggle Console Log//////////////////
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
    //Adding Immovable Walls
    this.immovableWall = this.game.add.group();
    this.immovableWall.enableBody = true;
    //Adding This Undeniable Death
    this.death = this.game.add.group();
    this.death.enableBody = true;
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
/////////////////Undeniable Death Spawn////////////////////
brawl.game.prototype.undeniableDeathSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    var tileDeath = this.game.add.tileSprite(sprite.x, sprite.y, sprite.widthX, sprite.widthY, sprite.art);
    this.game.physics.enable([tileDeath], Phaser.Physics.ARCADE);
    this.deathX = this.death.add(tileDeath);
    this.deathX.name = sprite.spriteType.name;
    this.deathX.groupName = groupUndeniableDeath;
    this.deathX.tint = sprite.spriteType.tint;
    this.deathX.specialCondition = sprite.specialCondition;
    this.deathX.positionInArray = positionInArray;
    this.deathX.tileScale.setTo(sprite.scale);
    //Physics Properties
    this.deathX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.deathX.body.immovable = true;
    this.deathX.body.mass = 100;
    this.deathX.body.maxVelocity.setTo(1000);
    this.deathX.body.collideWorldBounds = true;
    this.deathX.body.bounce.setTo(1);
    this.deathX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};
/////////////////Immovable Walls/////////////////////
brawl.game.prototype.immovableWallSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    var tileImmovable = this.game.add.tileSprite(sprite.x, sprite.y, sprite.widthX, sprite.widthY, sprite.art);
    this.game.physics.enable([tileImmovable], Phaser.Physics.ARCADE);
    this.immovableWallX = this.immovableWall.add(tileImmovable);
    this.immovableWallX.name = sprite.spriteType.name;
    this.immovableWallX.groupName = groupImmovableWall;
    this.immovableWallX.tint = sprite.spriteType.tint;
    this.immovableWallX.specialCondition = sprite.specialCondition;
    this.immovableWallX.positionInArray = positionInArray;
    this.immovableWallX.tileScale.setTo(sprite.scale);
    //Physics Properties
    if (sprite.spriteType.name === immovableWallOneWayPlayerBlockLeft.name) {
        this.immovableWallX.body.checkCollision.left = false;
    }
    this.immovableWallX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.immovableWallX.body.immovable = true;
    this.immovableWallX.body.mass = 100;
    this.immovableWallX.body.maxVelocity.setTo(1000);
    this.immovableWallX.body.collideWorldBounds = true;
    this.immovableWallX.body.bounce.setTo(1);
    this.immovableWallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};
////////////////////////Wall Spawn///////////////////////
brawl.game.prototype.wallSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    var tileWall = this.game.add.tileSprite(sprite.x, sprite.y, sprite.widthX, sprite.widthY, sprite.art);
    this.game.physics.enable([tileWall], Phaser.Physics.ARCADE);
    this.wallX = this.wall.add(tileWall);
    this.wallX.name = sprite.spriteType.name;
    this.wallX.groupName = groupWall;
    this.wallX.tint = sprite.spriteType.tint;
    this.wallX.specialCondition = sprite.specialCondition;
    this.wallX.positionInArray = positionInArray;
    this.wallX.anchor.setTo(.5);
    this.wallX.tileScale.setTo(sprite.scale);
    //Physics Properties
    if (sprite.name === wallCloud || sprite.spriteType.name === wallGhost) {
        this.wallX.body.immovable = true;
    }
    this.wallX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.wallX.body.mass = 200; //200
    this.wallX.body.maxVelocity.setTo(1000);
    this.wallX.body.collideWorldBounds = true;
    this.wallX.body.bounce.setTo(1);
    this.wallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    ///////////Drag Events///////////
    // this.wallX.inputEnabled = true;
    // this.wallX.input.enableDrag();
    // this.wallX.events.onDragStart.add(this.startDrag, this);
    // this.wallX.events.onDragStop.add(this.stopDrag, this);
    // this.wallX.body.moves = false;
    ////////////////////////Testing/////////////////////////
    // this.wallX.checkWorldBounds = true;
    // this.wallX.events.onOutOfBounds.add(this.wallOut, this);
};
/////////////////////////////Ledge Spawn///////////////////////////
brawl.game.prototype.ledgeSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.ledgeX = this.ledge.create(sprite.x, sprite.y, sprite.art);
    this.ledgeX.name = sprite.spriteType.name;
    this.ledgeX.groupName = groupLedge;
    this.ledgeX.tint = sprite.spriteType.tint;
    this.ledgeX.specialCondition = sprite.specialCondition;
    this.ledgeX.positionInArray = positionInArray;
    this.ledgeX.anchor.setTo(.5);
    this.ledgeX.scale.setTo(sprite.scale);
    //Physics Properties
    if (sprite.spriteType.name === ledgeElevator) {
        this.ledgeX.elevatorActivate = false;
    }
    else if (sprite.spriteType.name === ledgeSurf) {
        this.ledgeX.surfActivate = false;
    }
    this.ledgeX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.ledgeX.body.mass = 20;
    this.ledgeX.body.maxVelocity.setTo(1000);
    this.ledgeX.body.collideWorldBounds = true;
    this.ledgeX.body.bounce.setTo(.5);//.5;
    this.ledgeX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};
/////////////////////////////Ball Spawn///////////////////////////
brawl.game.prototype.ballSpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    var tileBall = this.game.add.tileSprite(sprite.x, sprite.y, sprite.widthX, sprite.widthY, sprite.art);
    this.game.physics.enable([tileBall], Phaser.Physics.ARCADE);
    this.ballX = this.ball.add(tileBall);
    this.ballX.name = sprite.spriteType.name;
    this.ballX.groupName = groupBall;
    this.ballX.specialCondition = sprite.specialCondition;
    this.ballX.positionInArray = positionInArray;
    this.ballX.tint = sprite.spriteType.tint;
    this.ballX.anchor.setTo(.5);
    this.ballX.tileScale.setTo(sprite.scale); //.5
    //Physics Properties
    this.ballX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.ballX.body.mass = 20;
    this.ballX.body.maxVelocity.setTo(1000);
    this.ballX.body.collideWorldBounds = true;
    this.ballX.body.bounce.setTo(.5);
    this.ballX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

//////////////////////////Enemy Spawn/////////////////////////
brawl.game.prototype.enemySpawn = function (sprite, positionInArray) {
    if (this.toggleConsoleLog) {
        console.log(sprite, positionInArray);
    }
    this.trumpX = this.enemy.create(sprite.x, sprite.y, sprite.art);
    this.trumpX.name = sprite.spriteType.name;
    this.trumpX.groupName = groupEnemy;
    this.trumpX.specialCondition = sprite.specialCondition;
    this.trumpX.positionInArray = positionInArray;
    this.trumpX.tint = sprite.spriteType.tint;
    this.trumpX.anchor.setTo(.5);
    this.trumpX.scale.setTo(sprite.scale);
    //Physics Properties
    this.trumpX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.trumpX.body.mass = 20;
    this.trumpX.body.maxVelocity.setTo(1000);
    this.trumpX.body.collideWorldBounds = true;
    this.trumpX.body.bounce.setTo(1.0);
    this.trumpX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
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


