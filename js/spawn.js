/////////////////Undeniable Death Spawn////////////////////
brawl.game.prototype.undeniableDeathSpawn = function (sprite) {
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
    this.deathX.specialWorld = sprite.specialWorld;
    this.deathX.specialArray = sprite.specialArray;
    this.deathX.positionInArray = sprite.positionInArray;
    this.deathX.scale.setTo(sprite.sizeX, sprite.sizeY);
    this.deathX.body.immovable = true;
    this.deathX.body.mass = 300;
    this.deathX.body.maxVelocity.setTo(300);
    this.deathX.body.collideWorldBounds = true;
    this.deathX.body.immovable = true;
    this.deathX.body.bounce.setTo(1);
    this.deathX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

/////////////////Immovable Walls/////////////////////
brawl.game.prototype.immovableWallSpawn = function (sprite) {
    this.immovableWallX = this.immovableWall.create(sprite.x, sprite.y, sprite.art);
    // this.immovableWallX.anchor.setTo(.5);
    this.immovableWallX.name = sprite.name;
    this.immovableWallX.groupName = groupImmovableWall;
    this.immovableWallX.specialCondition = sprite.specialCondition;
    this.immovableWallX.specialWorld = sprite.specialWorld;
    this.immovableWallX.specialArray = sprite.specialArray;
    this.immovableWallX.positionInArray = sprite.positionInArray;
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
    this.immovableWallX.scale.setTo(sprite.sizeX, sprite.sizeY);
    this.immovableWallX.body.immovable = true;
    this.immovableWallX.body.mass = 100;
    this.immovableWallX.body.maxVelocity.setTo(300);
    this.immovableWallX.body.collideWorldBounds = true;
    this.immovableWallX.body.bounce.setTo(1);
    this.immovableWallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

////////////////////////Wall Spawn///////////////////////
brawl.game.prototype.wallSpawn = function (sprite) {
    this.wallX = this.wall.create(sprite.x, sprite.y, sprite.art);
    this.wallX.name = sprite.name;
    this.wallX.groupName = groupWall;
    this.wallX.specialCondition = sprite.specialCondition;
    this.wallX.specialWorld = sprite.specialWorld;
    this.wallX.specialArray = sprite.specialArray;
    this.wallX.positionInArray = sprite.positionInArray;
    this.wallX.velocityVsImmovable = 100;
    if (sprite.name === wallGhost) {
        var testTint = Math.random() * 0xffffff;
        this.wallX.tint = testTint;
        console.log(testTint, this.wallX.positionInArray);
        // this.wallX.tint = tintWallGhost;
        this.wallX.body.immovable = true;
    }
    else if (sprite.name === wallHeavy) {
        this.wallX.tint = tintWallHeavy;
    }
    else if (sprite.name === wallLight) {
        this.wallX.tint = tintWallLight;
    }
    else if (sprite.name === wallCloud) {
        this.wallX.tint = tintWallCloud;
        this.wallX.body.immovable = true;
    }
    this.wallX.anchor.setTo(.5);
    this.wallX.scale.setTo(sprite.sizeX, sprite.sizeY);
    // this.wallX.body.immovable = true;
    this.wallX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
    this.wallX.body.mass = 150;
    this.wallX.body.maxVelocity.setTo(300);
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
brawl.game.prototype.ledgeSpawn = function (sprite) {
    this.ledgeX = this.ledge.create(sprite.x, sprite.y, sprite.art);
    this.ledgeX.name = sprite.name;
    this.ledgeX.groupName = groupLedge;
    this.ledgeX.specialCondition = sprite.specialCondition;
    this.ledgeX.specialWorld = sprite.specialWorld;
    this.ledgeX.specialArray = sprite.specialArray;
    this.ledgeX.positionInArray = sprite.positionInArray;
    this.ledgeX.velocityVsWallX = 50;
    this.ledgeX.velocityVsWallY = 50;
    this.ledgeX.anchor.setTo(.5);
    this.ledgeX.scale.setTo(.4);
    this.ledgeX.body.mass = 20;
    this.ledgeX.body.maxVelocity.setTo(1000);
    this.ledgeX.body.collideWorldBounds = true;
    this.ledgeX.body.bounce.setTo(1);
    this.ledgeX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};

//////////////////////////Creating Game Objects/////////////////////////
brawl.game.prototype.enemySpawn = function (sprite) {
    this.trumpX = this.enemy.create(sprite.x, sprite.y, 'enemy');
    this.trumpX.name = sprite.name;
    this.trumpX.groupName = groupEnemy;
    this.trumpX.specialCondition = sprite.specialCondition;
    this.trumpX.specialWorld = sprite.specialWorld;
    this.trumpX.specialArray = sprite.specialArray;
    this.trumpX.positionInArray = sprite.positionInArray;
    this.trumpX.velocityVsWallX = 50;
    this.trumpX.velocityVsWallY = 50;
    this.trumpX.anchor.setTo(.5);
    this.trumpX.scale.setTo(.6);
    this.trumpX.body.mass = 20;
    this.trumpX.body.maxVelocity.setTo(300);
    this.trumpX.body.collideWorldBounds = true;
    this.trumpX.body.bounce.setTo(1);
    this.trumpX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};
brawl.game.prototype.ballSpawn = function (sprite) {
    //Adding Ball
    this.ballX = this.ball.create(sprite.x, sprite.y, 'ball');
    this.ballX.name = sprite.name;
    this.ballX.groupName = groupBall;
    this.ballX.specialCondition = sprite.specialCondition;
    this.ballX.specialWorld = sprite.specialWorld;
    this.ballX.specialArray = sprite.specialArray;
    this.ballX.positionInArray = sprite.positionInArray;
    this.ballX.velocityVsWallX = 50;
    this.ballX.velocityVsWallY = 50;
    this.ballX.anchor.setTo(.5);
    this.ballX.scale.setTo(.5);
    this.ballX.body.setCircle(50);
    this.ballX.body.mass = 20;
    this.ballX.body.maxVelocity.setTo(300);
    this.ballX.body.collideWorldBounds = true;
    this.ballX.body.bounce.setTo(1.0);
    this.ballX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
};
/////////////////////////////////Falling Spikes///////////////////////////
brawl.game.prototype.spikeFall = function (sprite) {
    this.spikesFall = this.fallingSpikes.getFirstDead(true, sprite.x, sprite.y, 'spikeFall');
    this.spikesFall.specialCondition = sprite.specialCondition;
    this.spikesFall.specialWorld = sprite.specialWorld;
    this.spikesFall.specialArray = sprite.specialArray;
    this.spikesFall.positionInArray = sprite.positionInArray;
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
    this.flagX.specialCondition = sprite.specialCondition;
    this.flagX.specialWorld = sprite.specialWorld;
    this.flagX.specialArray = sprite.specialArray;
    this.flagX.positionInArray = sprite.positionInArray;
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
brawl.game.prototype.textCreator = function (sprite) {
    this.text1 = this.game.add.text(sprite.x, sprite.y, sprite.textInput);
    this.text1.font = sprite.font;
    this.text1.fontSize = sprite.fontSize;
    this.text1.fill = sprite.fill;
    this.text1.fontWeight = sprite.fontWeight;
    this.text1.positionInArray = sprite.positionInArray;
};
//////////////////////////////////Test Spawn//////////////////////////
brawl.game.prototype.coinSpawn = function (sprite) {
    this.coinX = this.coin.create(sprite.x, sprite.y, 'coin');
    this.coinX.anchor.setTo(.7);
    this.coinX.scale.setTo(.7);
    this.coinX.body.mass = 1;
    this.coinX.body.maxVelocity.setTo(1000);
    this.coinX.body.collideWorldBounds = true;
    this.coinX.body.bounce.setTo(1);
    this.coinX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
}

