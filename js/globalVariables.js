////////////////////////////////////////////Class Declarations/////////////////////////////////////////////////////
//Creates Each Individual Level
class LevelCreator {
  constructor(worldName, xOfWorld, yOfWorld, metroidvania, backgroundColor) {
    this.worldName = worldName;
    this.xOfWorld = xOfWorld;
    this.yOfWorld = yOfWorld;
    this.metroidvania = metroidvania;
    this.backgroundColor = backgroundColor;
  }
};

///Creates Room Switching
class MetroidvaniaCreator {
  constructor(roomUpIndex, roomUpValue, roomDownIndex, roomDownValue, roomLeftIndex, roomLeftValue, roomRightIndex, roomRightValue) {
    this.roomUpIndex = roomUpIndex;
    this.roomUpValue = roomUpValue
    this.roomDownIndex = roomDownIndex;
    this.roomDownValue = roomDownValue;
    this.roomLeftIndex = roomLeftIndex;
    this.roomLeftValue = roomLeftValue;
    this.roomRightIndex = roomRightIndex;
    this.roomRightValue = roomRightValue;
  }
};

//Creates Player Positioning (Up, Down, Left Right);
class PlayerPositionCreator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

//Creates World Gravity Object
class worldGravityCreator {
  constructor(gravityX, gravityY) {
    this.gravityX = gravityX;
    this.gravityY = gravityY;
  }
};

///Generate Shadow Levels
class shadowLevelGenerator {
  constructor(page, levelSwitchArray) {
    this.page = page; //Denotes the Story Page
    this.levelSwitchArray = levelSwitchArray; //Array that Switches Any number of Levels (Room Stays the same but becomes completely different)
  }
}
class shadowLevelArray {
  constructor(oldLevel, shadowLevel) {
    this.oldLevel = oldLevel; //The Level That's Going To Be Changed
    this.shadowLevel = shadowLevel; //The New Level that takes place
  }
}

//Generates Nen or Physics of the Individual Player
class nenCreator {
  constructor(playerSpeed, playerJump, playerGravityX, playerGravityY, playerDoubleJumps, playerWallJumpX, playerWallJumpY, playerWallDisengage, playerStickiness, playerSlippery, playerUpsideDownVelocity, playerUpsideDownMovement, playerDownwards, weaponFireRate, weaponBulletSpeed, weaponBulletAmount) {
    this.playerSpeed = playerSpeed;
    this.playerJump = playerJump;
    this.playerGravityX = playerGravityX;
    this.playerGravityY = playerGravityY;
    this.playerDoubleJumps = playerDoubleJumps;
    this.playerWallJumpX = playerWallJumpX;
    this.playerWallJumpY = playerWallJumpY;
    this.playerWallDisengage = playerWallDisengage;
    this.playerStickiness = playerStickiness;
    this.playerSlippery = playerSlippery;
    this.playerUpsideDownVelocity = playerUpsideDownVelocity;
    this.playerUpsideDownMovement = playerUpsideDownMovement;
    this.playerDownwards = playerDownwards;
    /////////////////////////Weapon Attributes///////////////////
    this.weaponFireRate = weaponFireRate;
    this.weaponBulletSpeed = weaponBulletSpeed;
    this.weaponBulletAmount = weaponBulletAmount;
  }
};

//Generates Group Array Within Spawn
class groupArrayCreator {
  constructor(groupSprite, groupCategory) {
    this.groupSprite = groupSprite;
    this.groupCategory = groupCategory;
  }
}

//Generates Sprite Placement (Physics)
class SpriteCreator {
  constructor(trigger, spriteType, generationType, art, x, y, widthX, widthY, scale, velocityX, velocityY, gravityX, gravityY, specialCondition, time) {
    this.trigger = trigger;
    this.spriteType = spriteType;
    this.generationType = generationType;
    this.art = art;
    this.x = x;
    this.y = y;
    this.widthX = widthX;
    this.widthY = widthY;
    this.scale = scale;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.specialCondition = specialCondition;
    this.time = time;
  }
};

//Creates Special Conditions (scalable)
class specialConditionCreator {
  constructor(name) {
    this.name = name;
  }
};

class timerCreator {
  constructor(timerType, repeatAmount, seconds) {
    {
      this.timerType = timerType;
      this.repeatAmount = repeatAmount;
      this.seconds = seconds;
    }
  }
}

//The individual properties of each sprite. 
class spriteType {
  constructor(groupNumber, name, tint, mass, anchor, immovable, maxVelocity, bounce) {
    this.groupNumber = groupNumber;
    this.name = name;
    this.tint = tint;
    this.mass = mass;
    this.anchor = anchor;
    this.immovable = immovable;
    this.maxVelocity = maxVelocity;
    this.bounce = bounce;
  }
};

//Creating Images
class imageCreator {
  constructor(trigger, name, art, x, y, scale) {
    this.trigger = trigger;
    this.name = name;
    this.art = art;
    this.x = x;
    this.y = y;
    this.scale = scale;
  }
};

//////////////////Flag Specific Classes/////////
class flagCreator {
  constructor(indexOfPlayerPosition, trigger, name, art, x, y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY, specialHandler) {
    this.indexOfPlayerPosition = indexOfPlayerPosition;
    this.trigger = trigger;
    this.name = name;
    this.art = art;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.specialHandler = specialHandler;
  }
};

//Creating Bitmap Text Class
class textCreator {
  constructor(trigger, x, y, textInput, font, fontSize) {
    this.trigger = trigger;
    this.x = x;
    this.y = y;
    this.textInput = textInput;
    this.font = font;
    this.fontSize = fontSize;
  }
};

//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////
//Weapon Variables to Change Bullet Type
var pullBoolean = false;
var pushBoolean = false;
var stopBoolean = false;
var killBoolean = false;

//Respawn Holder (The Level You Will Respawn In)
var respawnHolder = {
  indexOfCurrentWorld: 2,
  indexOfPlayerPosition: 3,
  metroidvania: null,
}

//Toggling Camera
var cameraBoolean = true;

//Engage Coordinate system
var coordinateSystem = true;
// var coordinateSystem = false;

// Global Timer
var total = 0;

//BMD Text (Toggle On or Off)
// var bitmapBoolean = true;
var bitmapBoolean = false;
//BMD Font
var fontGrind = 'fontGrind';

//Slow Motion
var slowMotionLimit;
var timerEvents;

// Total Deaths
var deaths = 0;

/////////////////////////Nen System///////////////////////////
//Holds as Reference
var nenHolder;
////////////////////////Creation of Nen System
var portalNen = new nenCreator(400, -500, null, 1500, 2, 1000, 500, 500, 200, -25, -200, 100, 400, 500, 500, 30);

/////////////////////////List of GROUP NAMES of Each Sprite (For Different Special Properties)////////////////
//Death Group
var groupUndeniableDeath = 'groupUndeniableDeath';
//Immovable Walls
var groupImmovableWall = 'groupImmovableWall';
//Moveable Walls
var groupWall = 'groupWall';
//Ledge
var groupLedge = 'groupLedge';
//Enemy
var groupEnemy = 'groupEnemy';
//Ball
var groupBall = 'groupBall';
//Hazama
var groupHazama = 'groupHazama';
//Falling Spikes
var groupFallingSpikes = 'groupFallingSpikes';
//Flag
var groupFlag = 'groupFlag';

/////////////////////////Global Tints//////////////////////////
var tintRemover = 0xFFFFFF; //wallRegular (Removes Tint)
var tintWallPlayerFrozen = 0x00ffff; //Frozen Wall Tints
var testTint = Math.random() * 0xffffff; // testTint
var tintOrange = 15631118.030252509;
/////////////////////////List of Names of Each Sprite (For Different Special Properties)////////////////
//Death Names
var undeniableDeathRegular = new spriteType(0, 'undeniableDeathRegular', Phaser.Color.RED, 100, 0, true, 1000, 1); //No Special Properties
var undeniableDeathBallKill = new spriteType(0, 'undeniableDeathBallKill', Phaser.Color.ORANGE, 100, 0, true, 1000, 1); //Killable By Ball

//Immovable Wall Names
var immovableWallRegular = new spriteType(1, 'immovableWallRegular', tintRemover, 100, 0, true, 1000, 1); //No Special Properties
var immovableWallKillWall = new spriteType(1, 'immovableWallKillWall', 7019278.306799905, 100, 0, true, 1000, 1); //Kills Walls(Will Be Everything)
var immovableWallPhase = new spriteType(1, 'immovableWallPhase', 12758247.409111453, 100, 0, true, 1000, 1); //Killed By Enemy BULLETS
var immovableWallActivation = new spriteType(1, 'immovableWallActivation', 0xffff00, 100, 0, true, 1000, 1); //Triggers Movement in a Wall
var immovableWallWorldGravity = new spriteType(1, 'immovableWallWorldGravity', 8314793.039214706, 100, 0, true, 1000, 1); //Triggers World Gravity
var immovableWallOneWayObject = new spriteType(1, 'immovableWallOneWayObject', 2499878.036284214, 100, 0, true, 1000, 1); //One Way (Objects Only)
var immovableWallOneWayPlayer = new spriteType(1, 'immovableWallOneWayPlayer', 241917.63554178402, 100, 0, true, 1000, 1); //One Way (Players Only)
var immovableWallSlippery = new spriteType(1, 'immovableWallSlippery', 766012.4141677661, 100, 0, true, 1000, 1); //Makes you SLIPPERY!
var immovableWallOneWayPlayerBlockLeft = new spriteType(1, 'immovableWallOneWayPlayerBlockLeft', 3588771.242333334, 100, 0, true, 1000, 1); //One way player only from the left
var immovableWallPowerJump = new spriteType(1, 'immovableWallPowerUpJump', testTint, 1, 0, true, 1000, 1);

//Moveable Wall Names
var wallRegular = new spriteType(2, 'wallRegular', tintRemover, 200, .5, false, 1000, 1);
var wallSurf = new spriteType(2, 'wallSurf', 10409939.733364154, 200, .5, false, 1000, 1);
var wallInverse = new spriteType(2, 'wallInverse', 1181911.9307258818, 200, .5, false, 1000, 1); //First Turn (Leaners Walls From Ledge)
var wallGhost = new spriteType(2, 'wallGhost', 16771007.229130682, 200, .5, true, 1000, 1); //Immovable Wall That Let's You Get Through Objects
var wallCloud = new spriteType(2, 'wallCloud', 9583870.358153213, 200, .5, true, 1000, 1); //Stationary Shooting Platform Cloud

//Ledge Names
var ledgeElevator = new spriteType(3, 'ledgeElevator', Phaser.Color.YELLOW, 20, .5, false, 1000, .5);
var ledgeBounce = new spriteType(3, 'ledgeBounce', Phaser.Color.GREEN, 20, .5, false, 1000, .5);
var ledgeSurf = new spriteType(3, 'ledgeSurf', Phaser.Color.AQUA, 20, .5, false, 1000, .5);

//Enemy Names
var enemyShooter = new spriteType(4, 'enemyShooter', 12758247.409111453, 20, .5, false, 1000, 1);
var enemyDaakath = new spriteType(4, 'enemyDaakath', 15269906.933038201, 20, .5, false, 1000, 1);
var enemyAccelerate = new spriteType(4, 'enemyAccelerate', 2885804.4944837275, 20, .5, false, 1000, 1);

//Ball Names
var ballRegular = new spriteType(5, 'ballRegular', Phaser.Color.BLUE, 20, .5, false, 1000, .5);

//Falling Spikes
var fallingSpikesRegular = new spriteType(6, 'fallingSpikesRegular', Phaser.Color.RED, 1, .5, false, 10000, 0);

//Hazama
var hazamaFalconia = new spriteType(7, 'hazamaFalconia', testTint, 1, 0, false, 200, 1); //SUPER JUMPING ABILITY

//Flag Names
var flagRegular = 'flagRegular';
var flagSpecial = 'flagSpecial';

//////////////////////////Special Conditions///////////////////////
var scReverseVelocity = new specialConditionCreator('reverseVelocity');
var scLocalizedDestruction = new specialConditionCreator('localizedDestruction');

/////////////////////////List of Art or Image Keys of Each Sprite/////////////////
//Death
var deathTile = 'deathTile';

//Immovable Wall
var immovableWallTile = 'immovableWallTile';
var powerJar = 'powerJar';

//Moveable Wall
var wallTile50 = 'wallTile50';
var wallTile25 = 'wallTile25';

//Ledge
var ledge = 'ledge';

//enemy
var enemyOne = 'enemyOne'

//Ball
var ball = 'ball';

//Falling Spikes
var fallingSpikesOne = 'fallingSpikesOne';

//Flag
var flag = 'flag';

//Hazama
var hazamaHippie = 'hazamaHippie';

//Slow Motion
var slowMotion = 'slowMotion';

