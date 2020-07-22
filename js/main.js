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
  "RESTART",
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
  indexOfCurrentWorld: 3,
  indexOfPlayerPosition: 3,
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
var immovableWallRegular = 'immovableWallRegular'; //No Special Properties
var immovableWallKillWall = 'immovableWallKillWall'; //Kills Walls(Will Be Everything)
var immovableWallPhase = 'immovableWallPhase'; //Killed By Enemy BULLETS
var immovableWallMagnet = 'immovableWallMagnet'; //Attracts Player
var immovableWallActivation = 'immovableWallActivation'; //Triggers Movement in a Wall
var immovableWallMario = 'immovableWallMario'; //Triggers Special Powers in Player
var immovableWallPadding = 'immovableWallPadding'; //Triggers Special Properties in Objects
var immovableWallWorldGravity = 'immovableWallWorldGravity'; //Triggers World Gravity
var immovableWallOneWayObject = 'immovableWallOneWayObject'; //One Way (Objects Only)
var immovableWallOneWayPlayer = 'immovableWallOneWayPlayer'; //One Way (Players Only)
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
//New Playground
var level_2 = new LevelCreator("Level 2-SandboxMode", 5000, 4000, new MetroidvaniaCreator(null, null, null, null, 3, 0, null, null), '#ffffff');

///Creates Room Switching
// class MetroidvaniaCreator {
//   constructor(roomUpIndex, roomUpValue, roomDownIndex, roomDownValue, roomLeftIndex, roomLeftValue, roomRightIndex, roomRightValue) {
//     this.roomUpIndex = roomUpIndex;
//     this.roomUpValue = roomUpValue
//     this.roomDownIndex = roomDownIndex;
//     this.roomDownValue = roomDownValue;
//     this.roomLeftIndex = roomLeftIndex;
//     this.roomLeftValue = roomLeftValue;
//     this.roomRightIndex = roomRightIndex;
//     this.roomRightValue = roomRightValue;
//   }
// };

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(1800, 1450),
  new PlayerPositionCreator(400, 3120),
  new PlayerPositionCreator(200, 200),
  new PlayerPositionCreator(2600, 3100),
]

///////////////////////Creation of Undeniable Death

level_2.undeniableDeathSpawn = [
  //Ground Next To Flag
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 725, 3170, 0, 0, .5, .4, 0, 0, null, null),
  //Top of the Yellow at the Bottom
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 2691, 0, 0, .5, .5, 0, 0, null, null),
  //////////////////////////////Blocking Entrance to Level 3///////////////////(Spikes)
  new SpriteCreator(true, true, spikesRegular, spikesVertical, 3200, 2573, 0, 0, .6, .4, 0, 0, 0, null),
];

/////////////////////////Creation of ImmovableWalls
level_2.immovableWallSpawn = [
  //Border of Level One and Level Two
  new SpriteCreator(true, true, immovableWallSlippery, immovableWallVertical, 3400, 800, 0, 0, .5, .5, 0, 0, null, null),
  //Horizontal Game Mode
  new SpriteCreator(true, true, immovableWallSlippery, immovableWallHorizontal, 3800, 1000, 0, 0, .5, .5, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4200, 1200, 0, 0, .5, .5, 0, 0, null, null),
  //4300
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3400, 1400, 0, 0, .5, .5, 0, 0, null, null),
  //Wall Blocking First Ground
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallVertical, 3800, 1600, 0, 0, .5, .5, 0, 0, null, null),
  //Kill Wall
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallHorizontal, 4200, 1800, 0, 0, .5, .5, 0, 0, null, null),
  //Ground For CheckPoint
  new SpriteCreator(true, true, immovableWallPhase, immovableWallHorizontal, 3400, 2000, 0, 0, .5, .5, 0, 0, null, null),
  //
  new SpriteCreator(true, true, immovableWallPhase, immovableWallVertical, 3800, 2200, 0, 0, .5, .5, 0, 0, null, null),
  //Prevent You From Spam Killing Enemies
  new SpriteCreator(true, true, immovableWallMario, immovableWallVertical, 4200, 2400, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallMario, immovableWallHorizontal, 3400, 2600, 0, 0, .5, .5, 0, 0, null, null),
  //
  ////////////////////////////////////////////////One Way Objects///////////////////////////////////////////////
  new SpriteCreator(true, true, immovableWallOneWayObject, immovableWallVertical, 4200, 3000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallOneWayObject, immovableWallHorizontal, 3400, 3000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallOneWayPlayer, immovableWallVertical, 4200, 3000, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallOneWayPlayer, immovableWallHorizontal, 3400, 3000, 0, 0, .5, .5, 0, 0, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_2.wallSpawn = [
  //Before Grey
  new SpriteCreator(true, true, wallRegular, wallVertical, 300, 400, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 300, 600, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallVertical, 300, 800, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallHorizontal, 300, 1000, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallCloud, wallVertical, 300, 1200, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallCloud, wallHorizontal, 300, 1400, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallGhost, wallVertical, 300, 1600, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallGhost, wallHorizontal, 300, 1800, 0, 0, .3, .3, 0, 0, null, null),
];

//Ledges
level_2.ledgeSpawn = [
  //Elevator
  new SpriteCreator(true, true, elevator, ledge, 600, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 800, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 1000, 1000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 600, 1200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 800, 1200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, elevator, ledge, 1000, 1200, 0, 0, .4, .4, 0, 0, null, null),
  //Bounce Ledges
  new SpriteCreator(true, true, bounce, ledge, 600, 600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 800, 600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 1000, 600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 600, 800, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 800, 800, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, bounce, ledge, 1000, 800, 0, 0, .4, .4, 0, 0, null, null),
  //Surf Ledges
  new SpriteCreator(true, true, surf, ledge, 600, 200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 800, 200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 1000, 200, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 600, 400, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 800, 400, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, surf, ledge, 1000, 400, 0, 0, .4, .4, 0, 0, null, null),
];

//Ball
level_2.ballSpawn = [
  new SpriteCreator(true, true, ballRegular, ball, 1200, 200, 0, 0, null, null, 0, 0, null, null)
];

//Enemy

level_2.enemySpawn = [
  //First Three Enemies
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 2500, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyShooter, enemyOne, 2700, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2900, 200, 0, 0, .5, .5, 0, 0, null, null),
];

//650, 1300
// level_2.flagSpawn = [
//   new flagCreator(1, true, flagRegular, flag, 600, 3050, 0, 0, .4, .4, 0, 0, null),
//   // new flagCreator(3, true, flagRegular, flag, 2500, 3050, 0, 0, .4, .4, 0, 0, null),
//   new flagCreator(3, true, flagSpecial, flag, 2500, 3050, 0, 0, .4, .4, 0, 0, experimental_Level5),
//   new flagCreator(2, true, flagRegular, flag, 200, 1250, 0, 0, .4, .4, 0, 0, null),
//   new flagCreator(0, true, flagRegular, flag, 1700, 1400, 0, 0, .4, .4, 0, 0, null),
// ];

//Text Creator (Helpful Hints)

//Push Level 2 Into World Class Array
worldClassLevels.push(level_2);

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator("Level 3-CLEnemies", 4800, 2000, new MetroidvaniaCreator(4, 0, 4, 2000, 1, 1, 2, 4800), '#ffffff');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(1700, 690),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(4500, 1900),
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
  //Meat Boy
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4670, 500, 0, 0, .1, .1, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4670, 700, 0, 0, .1, .1, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4670, 900, 0, 0, .1, .1, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4670, 1100, 0, 0, .1, .1, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4670, 1300, 0, 0, .1, .1, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 4670, 1500, 0, 0, .1, .1, 0, 0, null, null),
];



/////////////////////////Creation of ImmovableWalls
level_3.immovableWallSpawn = [
  //Border of Level One and Level Two
  new SpriteCreator(true, true, immovableWallSlippery, immovableWallVertical, 4800, 0, 0, 0, .3, 2.1, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4100, 2000, 0, 0, .83, .5, 0, 0, null, null),
  //4300
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 4250, 400, 0, 0, .5, .5, 0, 0, null, null),
  //Vertical
  // new SpriteCreator(true, true, immovableWallOneWayPlayer, immovableWallVertical, 4090, 1538, 0, 0, .5, .46 , 0, 0, null, null),
  //Wall Blocking First Ground
  new SpriteCreator(true, true, immovableWallKillWall, immovableWallVertical, 4090, 0, 0, 0, .5, 1.3, 0, 0, null, null),
  //Ground For CheckPoint
  new SpriteCreator(true, true, immovableWallPhase, immovableWallHorizontal, 2000, 1000, 0, 0, .9, .45, 0, 0, null, null),
  //Prevent You From Spam Killing Enemies
  new SpriteCreator(true, true, immovableWallMario, immovableWallVertical, 2300, 1100, 0, 0, .25, .655, 0, 0, null, null),
];

//Moveable Walls 
level_3.wallSpawn = [
  //Before Grey
  new SpriteCreator(true, true, wallRegular, wallVertical, 2000, 400, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallVertical, 500, 1500, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallHorizontal, 600, 1200, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallCloud, wallVertical, 700, 1700, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallCloud, wallHorizontal, 800, 800, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallGhost, wallVertical, 400, 1200, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallGhost, wallHorizontal, 4500, 300, 0, 0, .3, .3, 0, 0, null, null),
];


//Enemy Spawn
level_3.enemySpawn = [
  //First Three Enemies
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 500, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyShooter, enemyOne, 300, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 400, 200, 0, 0, .5, .5, 0, 0, null, null),
];

//Falling Spikes
level_3.fallingSpikes = [
  /////////////////////////////////////Shadow Level////////////////////////////////////////////
  new SpriteCreator(true, true, spikeRegular, spikeFall, 4175, 50, null, null, .4, .4, 0, 500, null, 2),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 4300, 50, null, null, .4, .4, 0, 500, null, 3),
];

//Flag Spawn
// level_3.flagSpawn = [
//   //First Flag from Level 1;
//   new flagCreator(3, true, flagRegular, flag, 4550, 650, 0, 0, .4, .4, 0, 0, null),
//   //Special Flag At The ENd
//   new flagCreator(2, true, flagSpecial, flag, 220, 250, 0, 0, .4, .4, 0, 0, flagSpecial_Level3),
//   //Testing For Special Properties
//   // new flagCreator(3, true, flagSpecial, flag, 4550, 650, 0, 0, .4, .4, 0, 0, flagSpecial_Level2),
//   ///Middle FLag
//   new flagCreator(1, true, flagRegular, flag, 1600, 620, 0, 0, .4, .4, 0, 0, null),
// ];

//Text Creator (Helpful Hints)

level_3.text = [
  new textCreator(true, 4650, 1800, "Sandbox\n\n→", fontGrind, 25),
  // new textCreator(true, 1100, 3700, "Double Jump", fontGrind, 25),
  // new textCreator(true, 1100, 3400, "Hold D and Tap A\n\nTo Fast Climb", fontGrind, 25),
  // new textCreator(true, 1100, 3100, "Move Left\n\nThen Double Jump", fontGrind, 25),
  // new textCreator(true, 1100, 2750, "Hold A and Tap D\n\nThis Time", fontGrind, 25),
  // new textCreator(true, 1100, 2450, "Move Right\n\nThen Double Jump", fontGrind, 25),
  // new textCreator(true, 150, 1400, "Once You Hit A Surface\n\nThis is Fucking Important\n\nYou Can Double Jump Again", fontGrind, 25),
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
//Push Level 3 Into World Class Array
worldClassLevels.push(level_3);


////////////////////////////////////////Level 4/////////////////////////////////////(Testing Ground)
var level_4 = new LevelCreator("Level 4-PlayGround", 3000, 1600, new MetroidvaniaCreator(null, null, 3, 800, null, null, null, null), '#ffffff'); //2400

// level_4.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_4.playerPosition = [
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(300, 1400), //400/700
  new PlayerPositionCreator(300, 1400),
  new PlayerPositionCreator(1400, 700),
]

///////////////////////Creation of Undeniable Death

level_4.undeniableDeathSpawn = [
  //Bottom At The End of the Map (INVISIBLE)
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3000, 0, 0, 0, .25, 1.142, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, 1.142, 0, 0, null, null),
  //
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 200, 800, 0, 0, .3, .2, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 200, 200, 0, 0, .3, .2, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 1600, 0, 0, 2.1, .2, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 0, 0, 0, 0, 1.5, .2, 0, 0, null, null),
  //Spikes
  new SpriteCreator(true, true, spikesRegular, spikesVertical, 1000, 0, 0, 0, .6, .4, 0, 0, 0, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1000, 600, 0, 0, .25, .7, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 800, 150, 0, 0, .25, .4, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1900, 0, 0, 0, .25, 1, 0, 0, null, null),
  // new SpriteCreator(true, true, spikesRegular, spikesVertical, 700, 800, 0, 0, .25, 1.1, 0, 0, 0, null),
];

// /////////////////////////Creation of ImmovableWalls
level_4.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 200, 1450, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 500, 500, 0, 0, .2, .4, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2100, 400, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2300, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2700, 100, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 2200, 1000, 0, 0, .5, .5, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1000, 580, 0, 0, .4, 1.1, 0, 0, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_4.wallSpawn = [
  // new SpriteCreator(true, true, wallGhost, wallHorizontal, 1000, 400, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallSurf, wallHorizontal, 1490, 400, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallVertical, 400, 1200, 0, 0, .3, .3, 0, 0, null, null),
  new SpriteCreator(true, true, wallRegular, wallHorizontal, 2200, 1350, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallInverse, wallVertical, 500, 1500, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallInverse, wallHorizontal, 600, 1200, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallCloud, wallVertical, 700, 1700, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallCloud, wallHorizontal, 800, 800, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallGhost, wallVertical, 400, 1200, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallGhost, wallHorizontal, 3000, 1350, 0, 0, .3, .3, 0, 0, null, null),
  // new SpriteCreator(true, true, wallRegular, wallHorizontal, 500, 1200, 0, 0, .3, .3, 0, 0, null, null),
];

// var wallRegular = 'wallRegular';
// var groupWallType1 = 'groupWallType1';
// var groupWallType2 = 'groupWallType2';
// var wallPlayerFrozen = 'wallPlayerFrozen';
// //The Surf Walls (Moving Walls)
// var wallSurf = 'wallSurf';
// //The Inverse Wall
// var wallInverse = 'wallInverse'; //First Turn (Leaners Walls From Ledge)
// //Ghost Wall
// var wallGhost = 'wallGhost'; //Immovable Wall That Let's You Get Through Objects
// //Special Walls (Can't Be Transuted Too or From)
// var wallCloud = 'wallCloud'; //Stationary Shooting Platform Heh


// //Ledges
level_4.ledgeSpawn = [
  // //Surf
  new SpriteCreator(true, true, surf, ledge, 1300, 200, 0, 0, .4, .4, 0, 0, null, null),
];

// // //Enemy Spawn
level_4.enemySpawn = [
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1200, 1200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1400, 1200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 1700, 1200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 900, 1200, 0, 0, .5, .5, 0, 0, null, null),
  // new SpriteCreator(true, true, enemyAccelerate, enemyOne, 1800, 300, 0, 0, .5, .5, 0, 0, null, null),
];

// //Ball
level_4.ballSpawn = [
  new SpriteCreator(true, true, ballRegular, ball, 200, 1200, 0, 0, null, null, 0, 0, null, null)
];

//Falling Spikes
level_4.fallingSpikes = [
  new SpriteCreator(true, true, spikeRegular, spikeFall, 400, 50, null, null, .4, .4, 0, 500, null, 3),
  /////////////////////////////////////Shadow Level////////////////////////////////////////////
  new SpriteCreator(true, true, spikeRegular, spikeFall, 800, 50, null, null, .4, .4, 0, 500, null, 3),
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

//
// var immovableWallRegular = 'immovableWallRegular';
// var immovableWallKillWall = 'immovableWallKillWall';
// var immovableWallPhase = 'immovableWallPhase';
// var immovableWallMagnet = 'immovableWallMagnet';
// var immovableWallActivation = 'immovableWallActivation'; //Triggers Movement in a Wall
// var immovableWallMario = 'immovableWallMario'; //Triggers Special Powers in Player
// var immovableWallPadding = 'immovableWallPadding'; //Triggers Special Properties in Objects
// var immovableWallWorldGravity = 'immovableWallWorldGravity'; //Triggers World Gravity
// // var immovableWallSkateBoard = 'immovableWallSkateboard'; //Triggers a Super OP Unchangeable Wall
// var immovableWallSlippery = 'immovableWallSlippery'; //Makes you SLIPPERY!wa 

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
