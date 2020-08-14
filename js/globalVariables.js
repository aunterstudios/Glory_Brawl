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

//Frame Rate 
// var setFps;

// Total Deaths
var deaths = 0;

/////////////////////////Player Attributes/////////////////////////(Can Be Used For Later Things)
//Remember All These Things Are changed in the Init Function of game.js
var playerSpeed;
var playerJump;
var playerGravity;
var playerDoubleJumps;
var playerWallJumpX;
var playerWallJumpY;
var playerWallDisengage;
var playerStickiness;
var playerSlippery;
var playerUpsideDownVelocity;
var playerUpsideDownMovement;
var playerDownwards;

/////////////////////////Weapon Attributes////////////
var weaponFireRate;
var weaponBulletSpeed;
var weaponBulletAmount;


/////////////////////////List of GROUP NAMES of Each Sprite (For Different Special Properties)////////////////
/*
Note: This is an extra name that denotes the entirety of a group. To keep physics consistent throughout.
*/
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
//Falling Spikes
var groupFallingSpikes = 'groupFallingSpikes';
//Flag
var groupFlag = 'groupFlag';

/////////////////////////List of Names of Each Sprite (For Different Special Properties)////////////////
//Death Names
var undeniableDeathRegular = 'undeniableDeathRegular'; //No Special Properties
var undeniableDeathBallKill = 'undeniableDeathBallKill'; //Killable By Ball

//Immovable Wall Names
var immovableWallRegular = 'immovableWallRegular'; //No Special Properties
var immovableWallKillWall = 'immovableWallKillWall'; //Kills Walls(Will Be Everything)
var immovableWallPhase = 'immovableWallPhase'; //Killed By Enemy BULLETS
var immovableWallActivation = 'immovableWallActivation'; //Triggers Movement in a Wall
var immovableWallWorldGravity = 'immovableWallWorldGravity'; //Triggers World Gravity
var immovableWallOneWayObject = 'immovableWallOneWayObject'; //One Way (Objects Only)
var immovableWallOneWayPlayer = 'immovableWallOneWayPlayer'; //One Way (Players Only)
var immovableWallSlippery = 'immovableWallSlippery'; //Makes you SLIPPERY!
var immovableWallOneWayPlayerBlockLeft = 'immovableWallOneWayPlayerBlockLeft'; //One way player only from the left

//Moveable Wall Names
var wallRegular = 'wallRegular';
var wallPlayerFrozen = 'wallPlayerFrozen';
var wallSurf = 'wallSurf';
var wallInverse = 'wallInverse'; //First Turn (Leaners Walls From Ledge)
var wallGhost = 'wallGhost'; //Immovable Wall That Let's You Get Through Objects
var wallCloud = 'wallCloud'; //Stationary Shooting Platform Cloud

//Ledge Names
var elevator = 'elevator';
var bounce = 'bounce';
var surf = 'surf';

//Enemy Names
var enemyShooter = 'enemyShooter';
var enemyDaakath = 'enemyDaakath';
var enemyAccelerate = 'enemyAccelerate';

//Ball Names
var ballRegular = 'ballRegular';

//Falling Spikes
var fallingSpikesRegular = 'fallingSpikesRegular';

//Power-Ups
var powerUpFalconia = 'powerUpFalconia';

//Flag Names
var flagRegular = 'flagRegular';
var flagSpecial = 'flagSpecial';

/////////////////////////List of Art or Image Keys of Each Sprite/////////////////
//Death
var deathTile = 'deathTile';

//Immovable Wall
var immovableWallTile = 'immovableWallTile';

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

var powerUpJar = 'powerUpJar';

//Slow Motion
var slowMotion = 'slowMotion';

///////////////////////////////////////////Tint Specific Art//////////////////////////////////////////////
//Tint Remover 
var tintRemover = 0xFFFFFF; //wallRegular (Removes Tint)
//Immovable Walls
var tintImmovableWallKillWall = 7019278.306799905;
var tintImmovableWallPhase = 15631118.030252509;
var tintImmovableWallMagnet = 10804989.680595484;
var tintImmovableWallActivation = 0xffff00;
var tintImmovableWallPadding = 2499878.036284214;
var tintImmovableWallWorldGravity = 8314793.039214706;
var tintImmovableWallMario = 241917.63554178402;
var tintImmovableWallSlippery = 766012.4141677661;
var tintImmovableWallOneWayPlayerBlockLeft = 3588771.242333334;

//Frozen Wall Tints
var tintWallPlayerFrozen = 0x00ffff;
//Surf Wall Tints
var tintWallSurf = 10409939.733364154;
//Inverse Tints
var tintWallInverse = 1181911.9307258818;
//Ghost Tints
var tintWallGhost = 16771007.229130682;
//Special Wall Tints
var tintWallCloud = 9583870.358153213;

//Enemies
var tintEnemyShooter = 12758247.409111453;
var tintEnemyDaakath = 15269906.933038201;
var tintEnemyAccelerate = 2885804.4944837275;

//Power-Up Tint

var tintPowerUpFalconia = 3599221.242333334;


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

//Generates All Physics Sprites
class SpriteCreator {
  constructor(trigger, name, art, x, y, widthX, widthY, scale, velocityX, velocityY, gravityX, gravityY, specialCondition, seconds) {
    this.trigger = trigger;
    this.name = name;
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
    this.seconds = seconds;
  }
};

//Creates Images
class imageCreator {
  constructor(trigger, name, art, x, y, scale) {
    this.trigger = trigger;
    this.name = name;
    this.art = art;
    this.x = x;
    this.y = y;
    this.scale = scale;
  }
}

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
}
////////////////////////////////////Experimental////////////////////////////////
/////////////////////////////Special Handlers For Changing Conditions of Levels//////////////////
// var experimental_LevelChanger = {
//   storyTrigger: {
//     page: 1,
//     level: 5,
//     backgroundColor: "#00A6CF",
//     fontColor: '#B339CE'
//   },
//   specialWorld: [2, 5],
//   undeniableDeathInsert: [[], [28, 29, 30, 31, 32, 33, 34, 35, 36]],
//   undeniableDeathRemove: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27]],
//   immovableWallInsert: [[], [14, 15, 16, 17, 18]],
//   immovableWallRemove: [[8, 0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
//   wallInsert: [[], [4]],
//   wallRemove: [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3]],
//   // ledgeInsert: [[], []],
//   ledgeRemove: [[0, 1, 2, 3, 4, 5, 6], [0, 1]],
//   ballInsert: [[], [0]],
//   ballRemove: [[0], []],
//   enemyInsert: [[], [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]],
//   enemyRemove: [[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]],
//   fallingSpikesInsert: [[], [6, 7, 8, 9, 10]],
//   fallingSpikesRemove: [[], [0, 1, 2, 3, 4, 5]],
//   // flagInsert: [[],[]],
//   flagRemove: [[0, 2, 3], [0, 1, 2, 3, 4]],
//   textInsert: [[], [17, 18, 19, 20, 21, 22]],
//   textRemove: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
// };