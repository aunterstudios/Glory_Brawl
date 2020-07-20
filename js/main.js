var game = new Phaser.Game(1400, 800, Phaser.CANVAS);

/////////////////////////////////////////////////Disable RightClick////////////////////////////////////
// window.onload = function() {
//   document.addEventListener("contextmenu", function(e){
//     e.preventDefault();
//   }, false);
//   document.addEventListener("keydown", function(e) {
//   //document.onkeydown = function(e) {
//     // "I" key
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
//       disabledEvent(e);
//     }
//     // "J" key
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
//       disabledEvent(e);
//     }
//     // "S" key + macOS
//     if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
//       disabledEvent(e);
//     }
//     // "U" key
//     if (e.ctrlKey && e.keyCode == 85) {
//       disabledEvent(e);
//     }
//     // "F12" key
//     if (event.keyCode == 123) {
//       disabledEvent(e);
//     }
//   }, false);
//   function disabledEvent(e){
//     if (e.stopPropagation){
//       e.stopPropagation();
//     } else if (window.event){
//       window.event.cancelBubble = true;
//     }
//     e.preventDefault();
//     return false;
//   }
// };

//////////////////////////////////////////////////Game States//////////////////////////////////////////////
game.state.add('mainMenu', brawl.state1);
game.state.add('deathState', brawl.state2);
game.state.add('game', brawl.game);
game.state.add('story', brawl.story);
game.state.add('controlScreen', brawl.stateControls);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
game.state.start('mainMenu');
//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "Summon All Your Hatred And Anger",
  "Remember the Words",
  "GLORY BRAWL",
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

function nextLine() {

  if (lineIndex === content.length) {
    //  We're finished
    return;
  }

  //  Split the current line on spaces, so one word per array element
  line = content[lineIndex].split(' ');

  //  Reset the word index to zero (the first word in the line)
  wordIndex = 0;

  //  Call the 'nextWord' function once for each word in the line (line.length)
  game.time.events.repeat(wordDelay, line.length, nextWord, this);

  //  Advance to the next line
  lineIndex++;

}

function nextWord() {

  //  Add the next word onto the text string, followed by a space
  text.text = text.text.concat(line[wordIndex] + " ");

  //  Advance the word index to the next word in the line
  wordIndex++;

  //  Last word?
  if (wordIndex === line.length) {
    //  Add a carriage return
    text.text = text.text.concat("\n");

    //  Get the next line after the lineDelay amount of ms has elapsed
    game.time.events.add(lineDelay, nextLine, this);
  }

}
//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////
//Weapon Variables to Change Bullet Type
var pullBoolean = false;
var pushBoolean = false;
var stopBoolean = false;
var killBoolean = false;

//Respawn Holder (The Level You Will Respawn In)
var respawnHolder = {
  indexOfCurrentWorld: 0,
  indexOfPlayerPosition: 1,
  metroidvania: null,
}

//Toggling Camera
var cameraBoolean = true;

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

//////////////////////////Enemy Bullet Handler//////////////////////
var enemyBulletTime = 0;

/////////////////////////Player Attributes/////////////////////////(Can Be Used For Later Things)
//Remember All These Things Are changed in the Init Function of game.js
var playerSpeed;
var playerJump;
var playerGravity;
var playerDoubleJumps;
var playerWallJumpX;
var playerWallJumpY;
var playerStickiness;
var playerSlippery;
var playerUpsideDownVelocity;
var playerUpsideDownMovement;
var playerDownwards;

/////////////////////////Weapon Attributes////////////
var weaponFireRate;
var weaponBulletSpeed;
var weaponBulletAmount;


/////////////////////////////////////////////////Array Shuffler///////////////////////////////////////
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

////////////////////////////////////////////Designed Levels/////////////////////////////////////////////////////
//Level Holder
var worldClassLevels = [];
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

//Creates the Sprite Properties
class SpriteCreator {
  constructor(trigger, visible, name, art, x, y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY, specialCondition, seconds) {
    this.trigger = trigger;
    this.visible = visible;
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

////////////////////////////////////Experimental////////////////////////////////
// class specialHandler {
//   constructor(specialWorld, undeniableDeathInsert, undeniableDeathRemove, immovableWallInsert, immovableWallRemove, wallInsert, wallRemove, ledgeInsert,ledgeRemove, ballInsert, ballRemove, enemyInsert, enemyRemove, spikeFallInsert, spikeFallRemove, flagInsert, flagRemove, textInsert, textRemove) {
//     this.specialWorld = specialWorld;
//     this.undeniableDeathInsert = undeniableDeathInsert;
//     this.undeniableDeathRemove = undeniableDeathRemove;
//     this.immovableWallInsert = immovableWallInsert;
//     this.immovableWallRemove = immovableWallRemove;
//     this.wallInsert = wallInsert;
//     this.wallRemove = wallRemove;
//     this.ledgeInsert = ledgeInsert;
//     this.ledgeRemove = ledgeRemove;
//     this.ballInsert = ballInsert;
//     this.ballRemove = ballRemove;
//     this.enemyInsert = enemyInsert;
//     this.enemyRemove = enemyRemove;
//     this.spikeFallInsert = spikeFallInsert;
//     this.spikeFallRemove = spikeFallRemove;
//     this.flagInsert = flagInsert;
//     this.flagRemove = flagRemove;
//     this.textInsert = textInsert;
//     this.textRemove = textRemove;
//   }
// };

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

/////////////////////////List of GROUP NAMES of Each Sprite (For Different Special Properties)////////////////
/*
Note: This is an extra name that denotes the entirety of a group. To keep physics consistent throughout.
*/
//Death Group
var groupUndeniableDeath = 'groupUndeniableDeath';
//Spikes
var groupSpikes = 'groupSpikes';
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
var undeniableDeathRegular = 'undeniableDeathRegular';
//Spikes
var spikesRegular = 'spikesRegular'

//Immovable Wall Names
var immovableWallRegular = 'immovableWallRegular';
var immovableWallKillWall = 'immovableWallKillWall';
var immovableWallPhase = 'immovableWallPhase';
var immovableWallMagnet = 'immovableWallMagnet';
var immovableWallActivation = 'immovableWallActivation'; //Triggers Movement in a Wall
var immovableWallMario = 'immovableWallMario'; //Triggers Special Powers in Player
var immovableWallPadding = 'immovableWallPadding'; //Triggers Special Properties in Objects
var immovableWallWorldGravity = 'immovableWallWorldGravity'; //Triggers World Gravity
// var immovableWallSkateBoard = 'immovableWallSkateboard'; //Triggers a Super OP Unchangeable Wall
var immovableWallSlippery = 'immovableWallSlippery'; //Makes you SLIPPERY!wa 

//Moveable Wall Names
//The Walls That Get Frozen and Unfrozen
var wallRegular = 'wallRegular';
var wallPlayerFrozen = 'wallPlayerFrozen';
//The Surf Walls (Moving Walls)
var wallSurf = 'wallSurf';
//The Inverse Wall
var wallInverse = 'wallInverse'; //First Turn (Leaners Walls From Ledge)
//Ghost Wall
var wallGhost = 'wallGhost'; //Immovable Wall That Let's You Get Through Objects
//Special Walls (Can't Be Transuted Too or From)
var wallCloud = 'wallCloud'; //Stationary Shooting Platform Heh

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
var spikeRegular = 'spikeRegular';

//Flag Names
var flagRegular = 'flagRegular';
var flagSpecial = 'flagSpecial';

/////////////////////////List of Art of Each Image/////////////////
var star = 'star';

/////////////////////////List of Art of Each Sprite/////////////////
//Death
var deathHorizontal = 'deathHorizontal';
var deathVertical = 'deathVertical';
//Spikes
var spikesVertical = 'spikesVertical';
var spikesHorizontalOne = 'spikesHorizontalOne';

//Immovable Wall
var immovableWallHorizontal = 'immovableWallHorizontal';
var immovableWallVertical = 'immovableWallVertical';

//Moveable Wall
var wallHorizontal = 'wallHorizontal';
var wallVertical = 'wallVertical';

//Ledge
var ledge = 'ledge';

//enemy
var enemyOne = 'enemy'

//Ball
var ball = 'ball';

//Falling Spikes
var spikeFall = 'spikeFall';

//Flag
var flag = 'flag';

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

/////////////////////////////Special Handlers For Changing Conditions of Levels//////////////////
var flagSpecial_Level3 = {
  storyTrigger: {
    page: 0,
    level: 3,
    backgroundColor: "#000000",
    fontColor: '#ff0000'
  },
  specialWorld: [2, 3],
  // undeniableDeathRemove: [[10], []],
  immovableWallRemove: [[9], []],
  enemyInsert: [[], [10, 11, 12, 13, 14, 15, 16, 17, 18]],
  enemyRemove: [[], [0, 1, 2, 5, 6, 7, 8, 9]],
  fallingSpikesInsert: [[], [1, 2, 3]],
  textInsert: [[9, 10], [4, 5, 6, 7]],
  textRemove: [[8], [0, 1, 2, 3, 8]],
};

var flagSpecial_Level5 = {
  storyTrigger: {
    page: 1,
    level: 5,
    backgroundColor: "#00A6CF",
    fontColor: '#B339CE'
  },
  specialWorld: [2, 5],
  undeniableDeathInsert: [[], [28, 29, 30, 31, 32, 33, 34, 35, 36]],
  undeniableDeathRemove: [[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27]],
  immovableWallInsert: [[], [14, 15, 16, 17, 18]],
  immovableWallRemove: [[8], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
  wallInsert: [[], [4]],
  wallRemove: [[], [0, 1, 2, 3]],
  // ledgeInsert: [[], []],
  ledgeRemove: [[], [0, 1]],
  ballInsert: [[], [0]],
  // ballRemove: [[], []],
  enemyInsert: [[], [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]],
  enemyRemove: [[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]],
  fallingSpikesInsert: [[], [6, 7, 8, 9, 10]],
  fallingSpikesRemove: [[], [0, 1, 2, 3, 4, 5]],
  // flagInsert: [[],[]],
  flagRemove: [[], [0, 1, 2, 3, 4]],
  textInsert: [[], [17, 18, 19, 20, 21, 22]],
  textRemove: [[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
};

var experimental_Level5 = {
  storyTrigger: {
    page: 1,
    level: 5,
    backgroundColor: "#00A6CF",
    fontColor: '#B339CE'
  },
  specialWorld: [2, 5],
  undeniableDeathInsert: [[], [28, 29, 30, 31, 32, 33, 34, 35, 36]],
  undeniableDeathRemove: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27]],
  immovableWallInsert: [[], [14, 15, 16, 17, 18]],
  immovableWallRemove: [[8, 0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
  wallInsert: [[], [4]],
  wallRemove: [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3]],
  // ledgeInsert: [[], []],
  ledgeRemove: [[0, 1, 2, 3, 4, 5, 6], [0, 1]],
  ballInsert: [[], [0]],
  ballRemove: [[0], []],
  enemyInsert: [[], [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]],
  enemyRemove: [[], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]],
  fallingSpikesInsert: [[], [6, 7, 8, 9, 10]],
  fallingSpikesRemove: [[], [0, 1, 2, 3, 4, 5]],
  // flagInsert: [[],[]],
  flagRemove: [[0, 2, 3], [0, 1, 2, 3, 4]],
  textInsert: [[], [17, 18, 19, 20, 21, 22]],
  textRemove: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
};

///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator("The Beginning", 3000, 4000, new MetroidvaniaCreator(1, 100, 0, 4200, 0, 1, 0, 3800), "#ffffff"); //3800

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(200, 200),
  new PlayerPositionCreator(300, 3900),
  new PlayerPositionCreator(1250, 2000),
  new PlayerPositionCreator(2600, 600),
]

///////////////////////Creation of Undeniable Death

level_0.undeniableDeathSpawn = [
  //Little Death to Prevent Running At Wall Cheese Glitch
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1468, 3810, 0, 0, .41, .09, 0, 0, null, null),
  // new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1468, 3710, 0, 0, .43, .09, 0, 0, null, null),

  ///Force You to Double Jump
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1468, 2400, 0, 0, .41, .428, 0, 0, null, null),
  //Holds The Second Ground Wall
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 849, 1700, 0, 0, .41, .428, 0, 0, null, null),
  //Divider For The First Half
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1468, 200, 0, 0, .41, .992, 0, 0, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_0.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 4000, 0, 0, 1.8, .5, 0, 0, null, null),
  //First Wall (Double Jump)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1469, 3000, 0, 0, .5, .95, 0, 0, null, null),
  //Second Wall (And Then...)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 850, 2300, 0, 0, .5, .95, 0, 0, null, null),
  //Before Jumping To the Landing Pad
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1469, 1591, 0, 0, .5, .95, 0, 0, null, null),
  //Landing Pad (Once You Touching a Surface You Can Double Jump)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 1635, 0, 0, 1.08, .5, 0, 0, null, null),
  
];

//Moveable Walls
///Single Wall to Teach You  
// level_0.wallSpawn = [new SpriteCreator(true, true, wallSurf, wallHorizontal, 800, 3400, 0, 0, .5, .5, 0, 0, null, null)];

// level_0.ledgeSpawn = [
//   // //Surf
//   new SpriteCreator(true, true, surf, ledge, 800, 3400, 0, 0, .4, .4, 0, 0, null, null),

//   // //Bounce Ledges
//   // new SpriteCreator(2, true, true, bounce, ledge, 900, 390, 0, 0, .4, .4, 0, 0, null, null),
//   // //Surf Ledges
//   // new SpriteCreator(3, true, true, elevator, ledge, 200, 200, 0, 0, .4, .4, 0, 0, null, null),
// ];

//Ball
// level_0.ballSpawn = [new SpriteCreator(true, true, ballRegular, ball, 700, 1350, 0, 0, null, null, 0, 0, null, null)];

//FLag Respawn
level_0.flagSpawn = [
  new flagCreator(0, true, flagRegular, flag, 100, 200, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(3, true, flagRegular, flag, 2400, 600, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 1150, 2000, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_0.text = [
  new textCreator(true, 150, 3500, "Time To Be Reborn\n\nP- Pause\nO- FullScreen\nW or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right", fontGrind, 25),
  new textCreator(true, 1100, 3700, "Double Jump", fontGrind, 25),
  new textCreator(true, 1100, 3400, "Hold D and Tap A\n\nTo Fast Climb", fontGrind, 25),
  new textCreator(true, 1100, 3100, "Move Left\n\nThen Double Jump", fontGrind, 25),
  new textCreator(true, 1100, 2750, "Hold A and Tap D\n\nThis Time", fontGrind, 25),
  new textCreator(true, 1100, 2450, "Move Right\n\nThen Double Jump", fontGrind, 25),
  new textCreator(true, 150, 1400, "Once You Hit A Surface\n\nThis is Fucking Important\n\nYou Can Double Jump Again", fontGrind, 25),
  //Arrows
  // new textCreator(true, 1900, 3500, "←", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 1900, 3800, "↑", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 1400, 3200, "←", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 1050, 2900, "↓", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 200, 3100, "↑", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 1000, 3250, "←", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 1000, 3250, "←", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 300, 2700, "→", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 500, 2600, "↑", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 300, 2700, "→", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 300, 2350, "←", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 200, 1900, "↑", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 400, 1525, "→", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 1100, 1525, "↓", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 2100, 2100, "↓", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 2300, 2400, "→", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 3500, 2200, "↑", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 2400, 1000, "↑", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 2900, 1000, "←", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 2800, 600, "→", 'Courier New', 30, '#000000', 'bold'),
  // new textCreator(true, 3500, 1800, "→", 'Courier New', 30, '#000000', 'bold'),
];

//Push to worldClassLevelsGlobalArray
worldClassLevels.push(level_0);

////////////////////////////////////////Level 1/////////////////////////////////////(Testing Ground)
var level_1 = new LevelCreator("Level 1-SurfWorld", 6000, 3000, new MetroidvaniaCreator(2, 0, 0, 2990, null, null, null, null), '#ffffff');

// level_1.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(5700, 100),
  new PlayerPositionCreator(400, 2920),
  new PlayerPositionCreator(1800, 2920), //100x,2950y ORG
  new PlayerPositionCreator(3800, 325),
]

///////////////////////Creation of Undeniable Death

level_1.undeniableDeathSpawn = [
  //First Hat of First Phase Death
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 500, 2387, 0, 0, .5545, .5, 0, 0, null, null),
  //Left Side Border (Guarding Level One)
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, 2.0975, 0, 0, null, null),
  //Divider For the Regular Walls
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1277, 400, 0, 0, .3895, 1.4185, 0, 0, null, null),
  //Second Obstacle of Regular Wall Horizontal
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 41.5, 1700, 0, 0, .5545, .5, 0, 0, null, null),
  //Third Obstacle of Regular Wall Horizontal
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 500, 1013, 0, 0, .5545, .5, 0, 0, null, null),
  //First Obstacle of Control Wall Horizontal
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1339.5, 1013, 0, 0, .5545, .5, 0, 0, null, null),
  //Divider For The Control Wall
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2617.5, 0, 0, 0, .3895, 2, 0, 0, null, null),
  //Last Death Wall For Control Wall
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1840.5, 1700, 0, 0, .5545, .5, 0, 0, null, null),
  //Divider For The Invese Wall
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3979, 400, 0, 0, .3895, 1.8565, 0, 0, null, null),
  //First Obstacle For Inverse
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 2681, 2387, 0, 0, .5545, .5, 0, 0, null, null),
  //Second Obstacle For Inverse
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 3201.8, 1700, 0, 0, .5545, .5, 0, 0, null, null),
  //Third Obstacle of Inverse Horizontal
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 2680.5, 1013, 0, 0, .5545, .5, 0, 0, null, null),
  //First Obstacle of Inverse Vertical
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4042, 1013, 0, 0, .5545, .5, 0, 0, null, null),
  //Second Obstacle of Inverse Vertical
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4042, 2387, 0, 0, .5545, .5, 0, 0, null, null),
  //Divider of Inverse Vertical Wall
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4622.8, 1700, 0, 0, .5545, .5, 0, 0, null, null),
  //Top Borders
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 30, 0, 0, 0, 1.8475, .25, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 2680.7, 0, 0, 0, 1.9415, .25, 0, 0, null, null),

];

/////////////////////////Creation of ImmovableWalls
level_1.immovableWallSpawn = [
  //First Ground (Near Level 1);
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 3000, 0, 0, .6, .5, 0, 0, null, null),
  //Second Ground (near Level 1)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 800, 3000, 0, 0, .56, .5, 0, 0, null, null),
  //First Vertical Wall After Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1277, 2400, 0, 0, .5, .72, 0, 0, null, null),
  //The First Hat of the Regular Wall Surf Test
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallHorizontal, 300, 336, 0, 0, 1.221, .5, 0, 0, null, null),
  //Second Ground (After Control Wall End)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 1340.5, 3000, 0, 0, 3.1, .5, 0, 0, null, null),
  //Divider Testing PlaceHolder For Control Wallz PLACE
  // new SpriteCreator(4, true, true, immovableWallRegular, immovableWallVertical, 2617.5, 2400, 0, 0, .5, .72, 0, 0, null, null),
  //All The wallkillable Walls AT The Bottom of Control Wall
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallHorizontal, 1340.5, 2387, 0, 0, .7, .63, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallHorizontal, 2021, 2387, 0, 0, .7, .63, 0, 0, null, null),
  //Kill Wall At Top of Inverse
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallHorizontal, 3003, 336, 0, 0, 1.221, .5, 0, 0, null, null),
  //Third Ground Inverse Walls;
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4041.5, 3000, 0, 0, 2.3, .5, 0, 0, null, null),
  //Last Divider For The Walls Then To Change Walls
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 5400, 0, 0, 0, .5, 3.25, 0, 0, null, null),
  //Third Ground Inverse Walls;
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 5935, 0, 0, 0, .5, 3.45, 0, 0, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_1.wallSpawn = [
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 800, 2850, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallSurf, wallHorizontal, 1700, 600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallHorizontal, 3300, 2850, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallVertical, 4570, 450, 0, 0, .4, .4, 0, 0, null, null),
  //Walls That Change
  //Ledge
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 5645, 2200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 5750, 2200, 0, 0, .4, .4, 0, 0, null, null),
  //Ball
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 5645, 600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 5750, 600, 0, 0, .4, .4, 0, 0, null, null),
  // new SpriteCreator(4, true, true, wallRegular, wallHorizontal, 5720, 1800, 0, 0, .4, .4, 0, 0, null, null),
];

level_1.ledgeSpawn = [
  // //Surf
  new SpriteCreator(true, true, surf, ledge, 5510, 1600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 5600, 1600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 5690, 1600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 5780, 1600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 5870, 1600, 0, 0, .4, .4, 0, 0, null, null),

  // //Bounce Ledges
  // new SpriteCreator(2, true, true, bounce, ledge, 900, 390, 0, 0, .4, .4, 0, 0, null, null),
  // //Surf Ledges
  // new SpriteCreator(3, true, true, elevator, ledge, 200, 200, 0, 0, .4, .4, 0, 0, null, null),
];

//Enemy Spawn
// level_1.enemySpawn = [
//   // new SpriteCreator(0, true, true, enemyDaakath, enemyOne, 400, 200, 0, 0, .5, .5, 0, 0, null, null),
//   new SpriteCreator(1, true, true, enemyShooter, enemyOne, 1200, 300, 0, 0, .5, .5, 0, 0, null, null),
// ];

//Ball
level_1.ballSpawn = [
  new SpriteCreator(true, true, ballRegular, ball, 5510, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, ballRegular, ball, 5600, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, ballRegular, ball, 5690, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, ballRegular, ball, 5780, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, ballRegular, ball, 5870, 1000, 0, 0, .4, .4, 0, 0, null, null),
];

//Flag Spawn
level_1.flagSpawn = [
  //First Flag
  new flagCreator(1, true, flagRegular, flag, 200, 2850, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 1600, 2850, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(3, true, flagRegular, flag, 3600, 250, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)

//Push Level 1 Into World Class Array
worldClassLevels.push(level_1);

///////////////////////////////////////////Level 2/////////////////////////////////////////////////////////////
var level_2 = new LevelCreator("Level 2-CLObstacle", 3200, 3200, new MetroidvaniaCreator(null, null, 1, 3200, 3, 1, 5, 3200), '#ffffff');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(1800, 1450),
  new PlayerPositionCreator(400, 3120),
  new PlayerPositionCreator(100, 1320),
  new PlayerPositionCreator(2600, 3100),
]

///////////////////////Creation of Undeniable Death

level_2.undeniableDeathSpawn = [
  //Ground Next To Flag
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 725, 3170, 0, 0, .5, .4, 0, 0, null, null),
  //Top of the Yellow at the Bottom
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 2691, 0, 0, .5, .5, 0, 0, null, null),
  //Border of First Half
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1425, 1700, 0, 0, .25, 1.08, 0, 0, null, null),
  //Connector to top of yellow
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 700, 2000, 0, 0, .25, .714, 0, 0, null, null),
  //Preventing Grey Cheese
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 150, 1690, 0, 0, .2, .39, 0, 0, null, null),
  //Border Slim Left Side
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 1400, 0, 0, .3, .922, 0, 0, null, null),
  //Next to Wall at the End of Grey Phase
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 426, 1336.5, 0, 0, .8029, .395, 0, 0, null, null),
  //Entryway to the Green Ledge
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1550, 1336.5, 0, 0, .25, .714, 0, 0, null, null),
  //Connector to the right side of the map
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1465, 3170, 0, 0, .5249, .4, 0, 0, null, null),
  //Final Hurdles Till You Get Respawn Twin Primes
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2150, 2000, 0, 0, .25, .811, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2250, 541, 0, 0, .25, 1.5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3200, 0, 0, 0, .25, 1.837, 0, 0, null, null),
  //Long Pole Death
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2695, 600, 0, 0, .375, .03, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2695, 1000, 0, 0, .375, .03, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2695, 1400, 0, 0, .375, .03, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2695, 1800, 0, 0, .375, .03, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2695, 2200, 0, 0, .375, .03, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2695, 2600, 0, 0, .375, .03, 0, 0, null, null),
  //Blue Ledge Past Long Pole of Death
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1200, 0, 0, 0, 1.3995, .25, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1200, 0, 0, 0, .25, .8, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1830, 500, 0, 0, .3, .25, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1240, 1080, 0, 0, .3, .25, 0, 0, null, null),
  //Entry Way to Left Side of the Map
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 0, 0, 0, .507, .25, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, .82, 0, 0, null, null),
  //////////////////////////////Blocking Entrance to Level 3///////////////////(Spikes)
  new SpriteCreator(true, true, spikesRegular, spikesVertical, 3200, 2573, 0, 0, .6, .4, 0, 0, 0, null),
  /////////////////////////////Shadow Level///////////////////////////////
  //Border Right
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3200, 0, 0, 0, .25, 2.239, 0, 0, null, null),
  //Border Left
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, 2.285, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 40.7, 4000, 0, 0, 1.542, .25, 0, 0, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_2.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 300, 3136, 0, 0, .5, .5, 0, 0, null, null),
  //Vertical Wall Connector to Level 0
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 0, 2772, 0, 0, .5, .5, 0, 0, null, null),
  //Mini Box (First Instance of Immovable Wall Destroying Regular Wall)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1062.5, 2600, 0, 0, .3, .05, 0, 0, null, null),
  //Top of First Grey Ledge
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 430, 1690, 0, 0, 1.17, .5, 0, 0, null, null),
  //End of Grey Ledge
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 1336.5, 0, 0, .5, .5, 0, 0, null, null),
  //End of Green Ledge
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 1591, 1500, 0, 0, .774, .5, 0, 0, null, null),
  //Entry to Right Side of the Map
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 2200, 3136, 0, 0, 1.1737, .5, 0, 0, null, null),
  //Long Pole
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2700, 400, 0, 0, .4, 3, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 773, 0, 0, 0, .5, .5, 0, 0, null, null),
  /////////////////////////////////////First Wall That Gets Removed From Level 3//////////////////////
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 773, 300, 0, 0, .5, .5, 0, 0, null, null),
  //Divider
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 710, 0, 0, 0, .5, .8, 0, 0, null, null),
  //Divider 2
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 425, 600, 0, 0, .5, .87, 0, 0, null, null),
  //Mini Walls At The End
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 400, 400, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 600, 600, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 600, 400, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 700, 500, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 300, 1000, 0, 0, .3, .05, 0, 0, null, null),
  ////////////////////////////////////////////////Shadow Level///////////////////////////////////////////////
];

//Moveable Walls
///Single Wall to Teach You  
level_2.wallSpawn = [
  //Before Grey
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 1100, 3000, 0, 0, .5, .5, 0, 0, null, null),
  //After BLue
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 1100, 1250, 0, 0, .5, .5, 0, 0, null, null),
  //Kill These
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 250, 600, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 250, 700, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 250, 800, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 250, 900, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 250, 1000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 250, 1100, 0, 0, .5, .5, 0, 0, null, null),
];

//Ledges
level_2.ledgeSpawn = [
  //Elevator
  new SpriteCreator(true, true, elevator, ledge, 100, 2600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 1080, 2200, 0, 0, .4, .4, 0, 0, null, null),
  //Bounce Ledges
  new SpriteCreator(true, true, bounce, ledge, 1525, 3000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 1700, 2200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 1900, 2700, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 2100, 2000, 0, 0, .4, .4, 0, 0, null, null),
  //Surf Ledges
  new SpriteCreator(true, true, surf, ledge, 2900, 300, 0, 0, .4, .4, 0, 0, null, null),
];

//Ball
level_2.ballSpawn = [new SpriteCreator(true, true, ballRegular, ball, 975, 200, 0, 0, null, null, 0, 0, null, null)];

//650, 1300
level_2.flagSpawn = [
  new flagCreator(1, true, flagRegular, flag, 600, 3050, 0, 0, .4, .4, 0, 0, null),
  // new flagCreator(3, true, flagRegular, flag, 2500, 3050, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(3, true, flagSpecial, flag, 2500, 3050, 0, 0, .4, .4, 0, 0, experimental_Level5),
  new flagCreator(2, true, flagRegular, flag, 200, 1250, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(0, true, flagRegular, flag, 1700, 1400, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)

//Push Level 2 Into World Class Array
worldClassLevels.push(level_2);

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator("Level 3-CLEnemies", 4800, 800, new MetroidvaniaCreator(4, 0, 4, 800, 1, 1, 2, 4800), '#ffffff');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(1700, 690),
  new PlayerPositionCreator(200, 380),
  new PlayerPositionCreator(4700, 750),
]

///////////////////////Creation of Undeniable Death

level_3.undeniableDeathSpawn = [
  //Bottom At The End of the Map (INVISIBLE)
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 4100, 0, 0, .5, .1, 0, 0, null, null),
  //Top of Map
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 300, 0, 0, 0, 3.215, .1, 0, 0, null, null),
  //Long Pit (Under Vertical Moveable Wall)
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1406.5, 4100, 0, 0, .995, .1, 0, 0, null, null),
  //Bottom Beginning of the Map
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 3506, 4100, 0, 0, .4169, .1, 0, 0, null, null),
  // //Spike of Death At Bottom to Prevent Glitch
  // new SpriteCreator(4, true, true, undeniableDeathRegular, deathHorizontal, 0, 800, 0, 0, 3.45, .1, 0, 0, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_3.immovableWallSpawn = [
  //Border of Level One and Level Two
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 4800, 0, 0, 0, .3, .7, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4100, 800, 0, 0, .83, .5, 0, 0, null, null),
  //Wall Blocking First Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 4090, 100, 0, 0, .5, .83, 0, 0, null, null),
  //Wall With Little Hole
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3300, 0, 0, 0, .5, .83, 0, 0, null, null),
  //Past Max Jump
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 2800, 800, 0, 0, .83, .5, 0, 0, null, null),
  //Ground Past Vertical Moveable Wall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 700, 800, 0, 0, .83, .5, 0, 0, null, null),
  //Divider At The End
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 300, 0, 0, 0, .5, .455, 0, 0, null, null),
  //Ground For the Flag
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 85, 388.3, 0, 0, .276, .297, 0, 0, null, null),
  //Border At the ENd of the Level
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 0, 0, 0, 0, .3, .93, 0, 0, null, null),
  //First Phase Wall
  new SpriteCreator(true, true, immovableWallPhase, immovableWallVertical, 300, 426, 0, 0, .5, .418, null, null),
  //Ground for Flag Because People are stupid
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 1500, 700, 0, 0, .5, .5, 0, 0, null, null),
  //Preventing You From Killing Last Enemy Sprite
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 700, 565, 0, 0, .5, .2, 0, 0, null, null),
  //New Wall At the Beginning (To Prevent Cheese)
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4250, 400, 0, 0, .5, .5, 0, 0, null, null),
];

//Moveable Walls 
level_3.wallSpawn = [
  //Before Grey
  new SpriteCreator(true, true, wallRegular, wallVertical, 2000, 400, 0, 0, .5, .5, 0, 0, null, null),
];


//Enemy Spawn
level_3.enemySpawn = [
  //First Three Enemies
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 4250, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyShooter, enemyOne, 4450, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 4650, 200, 0, 0, .5, .5, 0, 0, null, null),
  //Blocking the First Entrance
  new SpriteCreator(true, true, enemyShooter, enemyOne, 4125, 50, 0, 0, .5, .5, 0, 0, null, null),
  //Maximum Jump Enemy
  new SpriteCreator(true, true, enemyShooter, enemyOne, 3500, 500, 0, 0, .5, .5, 0, 0, null, null),
  //Four Enemies of the Gate
  new SpriteCreator(true, true, enemyShooter, enemyOne, 1000, 50, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1000, 250, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 1000, 450, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1000, 650, 0, 0, .5, .5, 0, 0, null, null),
  //Last Enemy
  new SpriteCreator(true, true, enemyShooter, enemyOne, 600, 600, 0, 0, .5, .5, 0, 0, null, null),
  /////////////////////////////////Shadow Level//////////////////////////////////
  //Up and Down Enemies
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 800, 50, 0, 200, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyAccelerate, enemyOne, 1000, 50, 0, 200, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 1200, 50, 0, 200, .5, .5, 0, 0, null, null),
  //Blocking the Little Hole
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 3200, 100, 0, 200, .5, .5, 0, 0, null, null),
  //First Enemy of the Shadow Level You'll Encounter
  new SpriteCreator(false, true, enemyShooter, enemyOne, 600, 600, 0, 200, .5, .5, 0, 0, null, null),
  //First or Last Enemies
  new SpriteCreator(false, true, enemyAccelerate, enemyOne, 4300, 100, 0, 200, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 4500, 100, 0, 200, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyShooter, enemyOne, 4700, 100, 0, 200, .5, .5, 0, 0, null, null),
  //New Up and Down Enemy
  new SpriteCreator(false, true, enemyShooter, enemyOne, 1400, 50, 0, 200, .5, .5, 0, 0, null, null),
];

//Falling Spikes
level_3.fallingSpikes = [
  new SpriteCreator(true, true, spikeRegular, spikeFall, 475, 50, null, null, .4, .4, 0, 500, null, 3),
  /////////////////////////////////////Shadow Level////////////////////////////////////////////
  new SpriteCreator(false, true, spikeRegular, spikeFall, 2100, 50, null, null, .4, .4, 0, 500, null, 3),
  new SpriteCreator(false, true, spikeRegular, spikeFall, 2300, 50, null, null, .4, .4, 0, 500, null, 4),
  new SpriteCreator(false, true, spikeRegular, spikeFall, 2500, 50, null, null, .4, .4, 0, 500, null, 5),
];

//Flag Spawn
level_3.flagSpawn = [
  //First Flag from Level 1;
  new flagCreator(3, true, flagRegular, flag, 4550, 650, 0, 0, .4, .4, 0, 0, null),
  //Special Flag At The ENd
  new flagCreator(2, true, flagSpecial, flag, 220, 250, 0, 0, .4, .4, 0, 0, flagSpecial_Level3),
  //Testing For Special Properties
  // new flagCreator(3, true, flagSpecial, flag, 4550, 650, 0, 0, .4, .4, 0, 0, flagSpecial_Level2),
  ///Middle FLag
  new flagCreator(1, true, flagRegular, flag, 1600, 620, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)

//Push Level 3 Into World Class Array
worldClassLevels.push(level_3);


////////////////////////////////////////Level 4/////////////////////////////////////(Testing Ground)
var level_4 = new LevelCreator("Level 4-PlayGround", 5000, 1600, new MetroidvaniaCreator(null, null, 3, 800, null, null, null, null), '#ffffff'); //2400

// level_4.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_4.playerPosition = [
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(400, 700), //400/700
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(1400, 700),
]

///////////////////////Creation of Undeniable Death

level_4.undeniableDeathSpawn = [
  //Bottom At The End of the Map (INVISIBLE)
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2800, 0, 0, 0, .25, 1.1, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, 1.1, 0, 0, null, null),
  // new SpriteCreator(true, true, spikesRegular, spikesVertical, 700, 800, 0, 0, .25, 1.1, 0, 0, 0, null),
];

/////////////////////////Creation of ImmovableWalls
level_4.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 300, 1600, 0, 0, 1.2, .25, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 700, 1000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 400, 1000, 0, 0, .5, .5, 0, 0, null, null),

  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 800, 1000, 0, 100, 1.2, .25, 0, 0, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_4.wallSpawn = [
  new SpriteCreator(true, true, wallGhost, wallHorizontal, 1000, 400, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallSurf, wallHorizontal, 1490, 400, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallVertical, 400, 700, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallHorizontal, 400, 800, 0, 0, .3, .3, 0, 0, null, null),
];


// //Ledges
level_4.ledgeSpawn = [
  // //Surf
  new SpriteCreator(true, true, surf, ledge, 1100, 200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 1200, 800, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 1300, 600, 0, 0, .4, .4, 0, 0, null, null),
];

// // //Enemy Spawn
level_4.enemySpawn = [
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1600, 300, 0, 0, .5, .5, 0, 0, null, null),
  // new SpriteCreator(true, true, enemyAccelerate, enemyOne, 1800, 300, 0, 0, .5, .5, 0, 0, null, null),
];

// //Ball
level_4.ballSpawn = [
  new SpriteCreator(true, true, ballRegular, ball, 200, 400, 0, 0, null, null, 0, 0, null, null)
];

//Push Level 4 Into World Class Array
worldClassLevels.push(level_4);


////////////////////////////////////////Level 4/////////////////////////////////////(Testing Ground)
var level_5 = new LevelCreator("Level 5-SpecialWalls", 6000, 4000, new MetroidvaniaCreator(null, null, null, 6000, 2, 0, null, null), '#ffffff');

// level_5.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_5.playerPosition = [
  new PlayerPositionCreator(5500, 100),
  new PlayerPositionCreator(250, 1975),
  new PlayerPositionCreator(100, 3800),
  new PlayerPositionCreator(4000, 3830),
]

///////////////////////Creation of Undeniable Death

level_5.undeniableDeathSpawn = [
  //First Vertical Divider
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1021.5, 3250, 0, 0, .25, .535, 0, 0, null, null),
  //First Horizontal Divider
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 2750, 0, 0, 1.5, .25, 0, 0, null, null),
  //Vertical Divider For wallBlackKiller
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2060, 2791.5, 0, 0, .25, .535, 0, 0, null, null),
  //Horizontal Lock In wallBlackTrap
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1062, 3550, 0, 0, .6, .25, 0, 0, null, null),
  //Bounce Da Enemy
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 2101, 3000, 0, 0, 1, .25, 0, 0, null, null),
  //Divider For Checkpoint
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3460, 3042, 0, 0, .25, .535, 0, 0, null, null),
  //Ground For Enemies
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1062, 4000, 0, 0, 1.741, .25, 0, 0, null, null),
  //Second Divider For Checkpoint
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 4266.5, 1600, 0, 0, .25, 1.73, 0, 0, null, null),
  /////////////////////////////Prevent You From Going to Level 1/////////////////////////////////
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .001, 1.96, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 3500, 4000, 0, 0, .54, .001, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4310, 4000, 0, 0, 1.17, .001, 0, 0, null, null),
  //Obstacles For Ghost Wall THE DEATH ONES
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3400, 0, 0, 0, .25, .6, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2800, 700, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1900, 700, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3900, 700, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 4600, 0, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 5000, 899, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 5400, 500, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 5500, 1900, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 5100, 2000, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 5200, 2650, 0, 0, .5, .25, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4400, 3000, 0, 0, .5, .25, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 5200, 3400, 0, 0, .5, .25, 0, 0, null, null),
  //The Box Bottom 664.5, 1600,
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 664.5, 1600, 0, 0, 2.572, .25, 0, 0, null, null),
  //The Box Part Two
  //The Box Bottom 664.5, 1600,
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4307.5, 1600, 0, 0, .73, .25, 0, 0, null, null),
  //Right Border of Map
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 6000, 0, 0, 0, .25, 2.858, 0, 0, null, null),
  //Left Border of Map
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 2792, 0, 0, .25, .6, 0, 0, null, null),
  //Don't Do This Ever Again
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 0, 0, 0, 4.2565, .25, 0, 0, null, null),
  ///////////////////////////////////////////The Yellow Level///////////////////////////////////////////////
  //Top Border
  new SpriteCreator(false, true, undeniableDeathRegular, deathHorizontal, 0, 0, 0, 0, 4.285, .25, 0, 0, null, null),
  //Bottom Border
  new SpriteCreator(false, true, undeniableDeathRegular, deathHorizontal, 0, 4000, 0, 0, 4.285, .25, 0, 0, null, null),
  //Moving Death Traps lmao
  new SpriteCreator(false, true, undeniableDeathRegular, deathVertical, 800, 1000, 0, 500, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, undeniableDeathRegular, deathVertical, 1600, 1200, 0, 500, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, undeniableDeathRegular, deathVertical, 2400, 1800, 0, 500, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, undeniableDeathRegular, deathVertical, 3200, 2400, 0, 500, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, undeniableDeathRegular, deathVertical, 4000, 500, 0, 500, .25, .5, 0, 0, null, null),
  //Barrier to Level 2
  new SpriteCreator(false, true, spikesRegular, spikesVertical, 0, 0, 0, 0, .5, 2.829, 0, 0, null, null),
  //More Moving Death Traps
  new SpriteCreator(false, true, undeniableDeathRegular, deathVertical, 4600, 0, 0, 500, .25, .5, 0, 0, null, null),

];

/////////////////////////Creation of ImmovableWalls
level_5.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 4000, 0, 0, 1.2, .25, 0, 0, null, null),
  //Vertical
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 870, 3218, 0, 0, .4, .25, 0, 0, null, null),
  //Kill Wall To Prevent Cheese
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallHorizontal, 1200, 2715, 0, 0, 1.058, .25, 0, 0, null, null),
  //Ground For CheckPoint
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 3500, 4000, 0, 0, .9, .45, 0, 0, null, null),
  //Prevent You From Spam Killing Enemies
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2300, 3400, 0, 0, .25, .655, 0, 0, null, null),
  //Ground For Cloud Wall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 3600, 2500, 0, 0, .7817, .5, 0, 0, null, null),
  //Barriers For Cloud Wall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 600, 0, 0, 0, .5, 3.23, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 0, 0, 0, 0, .5, 3.23, 0, 0, null, null),
  //CheckPoint GhostWall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 200, 2000, 0, 0, .3, .25, 0, 0, null, null),
  //Connector to Checkpoint Undeniable Wall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 4266.5, 0, 0, 0, .322, 1.852, 0, 0, null, null),
  ////////////////////////Obstacles For Ghost Walls////////////////
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1400, 0, 0, 0, .322, 1.878, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2400, 0, 0, 0, .322, 1.878, 0, 0, null, null),
  //Last Obstacle For Ghost Wall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4310, 3620, 0, 0, 1.937, .25, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4310, 4000, 0, 0, 1.937, .25, 0, 0, null, null),
  ////////////////////////////////////The Yellow Level////////////////////////////////////////////
  new SpriteCreator(false, true, immovableWallRegular, immovableWallVertical, 1300, 2100, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, immovableWallRegular, immovableWallVertical, 2000, 1500, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, immovableWallRegular, immovableWallVertical, 2800, 2100, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, immovableWallRegular, immovableWallVertical, 3600, 1500, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(false, true, immovableWallRegular, immovableWallVertical, 4400, 2100, 0, 0, .25, .5, 0, 0, null, null),
];

//Walls
level_5.wallSpawn = [
  //First Control Wall Turned Into WallBlackKiller
  // new SpriteCreator(true, true, wallRegular, wallHorizontal, 600, 3600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallSurf, wallVertical, 1200, 3000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallHorizontal, 1900, 3650, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallCloud, wallHorizontal, 3150, 2400, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallGhost, wallHorizontal, 330, 1650, 0, 0, .4, .4, 0, 0, null, null),
  ////////////////////////////////////The Yellow Level////////////////////////////////////////////
  new SpriteCreator(false, true, wallCloud, wallHorizontal, 5500, 2000, 0, 0, .4, .4, 0, 0, null, null),

];


//Ledges
level_5.ledgeSpawn = [
  //Surf Tool
  new SpriteCreator(true, true, surf, ledge, 600, 3600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 3900, 3750, 0, 0, .4, .4, 0, 0, null, null),
];

//Ball
level_5.ballSpawn = [
  //Surf Tool
  new SpriteCreator(false, true, ballRegular, ball, 5000, 1800, 0, 0, .4, .4, 0, 0, null, null),
];

//Enemy Spawn
level_5.enemySpawn = [
  //Enemies For wallBlackKiller
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1250, 2900, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1250, 3000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1250, 3100, 0, 0, .5, .5, 0, 0, null, null),
  //Enemeis For wallBlackTrap
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1750, 3750, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1850, 3750, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1950, 3750, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2050, 3750, 0, 0, .5, .5, 0, 0, null, null),
  //Enemies That Force You To Use wallBlackKiller
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3400, 3600, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2600, 3750, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2700, 3800, 0, 300, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2900, 3750, 0, 300, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3100, 3800, 0, 300, .5, .5, 0, 0, null, null),
  //Enemy Shoots For WallBlackTrap
  new SpriteCreator(true, true, enemyShooter, enemyOne, 2450, 3300, 0, 300, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyShooter, enemyOne, 3300, 3400, 0, 300, .5, .5, 0, 0, null, null),
  //Enemies Accelerate
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2500, 3500, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2500, 3550, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2700, 3400, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2800, 3200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2900, 3300, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 3000, 3800, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 3000, 3600, 0, 0, .5, .5, 0, 0, null, null),
  //More Enemies To Fuck With You
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3300, 3700, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3200, 3750, 0, 0, .5, .5, 0, 0, null, null),
  //More Enemies To Fuck With You Part 2
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3000, 3600, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3300, 3700, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3200, 3750, 0, 0, .5, .5, 0, 0, null, null),
  //Cloud Walls
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2400, 2600, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2600, 2600, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2800, 2600, 0, 0, .5, .5, 0, 0, null, null),
  /////////////////////////////////////The Yellow Level//////////////////////////////
  //Step One
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 4375, 2150, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 4375, 2250, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyAccelerate, enemyOne, 4375, 2350, 0, 0, .5, .5, 0, 0, null, null),
  //Step Two
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 3575, 1850, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyAccelerate, enemyOne, 3575, 1750, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 3575, 1650, 0, 0, .5, .5, 0, 0, null, null),
  //Step Three
  new SpriteCreator(false, true, enemyAccelerate, enemyOne, 2775, 2150, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 2775, 2250, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 2775, 2350, 0, 0, .5, .5, 0, 0, null, null),
  //Step Four
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 1975, 1850, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 1975, 1750, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyShooter, enemyOne, 1975, 2000, 0, 0, .5, .5, 0, 0, null, null),
  //Step Five
  new SpriteCreator(false, true, enemyShooter, enemyOne, 1275, 2000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 1275, 2250, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(false, true, enemyDaakath, enemyOne, 1275, 2350, 0, 0, .5, .5, 0, 0, null, null),
];

//Falling Spikes
level_5.fallingSpikes = [
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2255, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2315, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2600, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2800, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 3000, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 3200, 3075, null, null, .4, .4, 0, 700, null, 3),
  /////////////////////////////////////Shadow Level////////////////////////////////////////////
  new SpriteCreator(false, true, spikeRegular, spikeFall, 1100, 75, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(false, true, spikeRegular, spikeFall, 1900, 3925, null, null, .4, .4, 0, -700, null, 3),
  new SpriteCreator(false, true, spikeRegular, spikeFall, 2700, 75, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(false, true, spikeRegular, spikeFall, 3500, 3925, null, null, .4, .4, 0, -700, null, 3),
  new SpriteCreator(false, true, spikeRegular, spikeFall, 4300, 75, null, null, .4, .4, 0, 700, null, 3),
];

//Flag Spawn
level_5.flagSpawn = [
  //First Flag from Level 1;
  new flagCreator(2, true, flagRegular, flag, 400, 3875, 0, 0, .4, .4, 0, 0, null),
  //Special Flag At The ENd
  new flagCreator(3, true, flagRegular, flag, 4100, 3850, 0, 0, .4, .4, 0, 0, null),
  ///Middle FLag
  new flagCreator(1, true, flagRegular, flag, 400, 1910, 0, 0, .4, .4, 0, 0, null),
  //End Flag
  new flagCreator(0, true, flagSpecial, flag, 5400, 3875, 0, 0, .4, .4, 0, 0, null),
  //Testing End Flag
  new flagCreator(0, true, flagSpecial, flag, 5500, 300, 0, 0, .4, .4, 0, 0, flagSpecial_Level5),
];

//Text Creator (Helpful Hints)

//Push Level 5 Into World Class Array
worldClassLevels.push(level_5);

/////////////Change Base Texture////////////////
// game.add.loadTexture('key','frame')
///////////////LifeSpan////////////
///game.add.lifespan

////////////////Teleportation////////////////
/*
if (wall.name === immovableWallTeleportation) {
        //     if (this.game.physics.arcade.distanceBetween(this.player, wall, false, true) < 250) {
        //         if (this.player.body.y < wall.body.y) {
        //             this.player.body.y = wall.body.y - 400;
        //         }
        //     };
        // }
*/

/////Playing Around with Delta
/*
if (this.player.body.deltaAbsY() > 10) {
            this.player.kill();
        }
*/
