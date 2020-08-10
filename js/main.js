var game = new Phaser.Game(1400, 800, Phaser.CANVAS);

/////////////////////////////////////////////////Disable RightClick////////////////////////////////////
window.onload = function () {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  }, false);
  document.addEventListener("keydown", function (e) {
    //document.onkeydown = function(e) {
    // "I" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
      disabledEvent(e);
    }
    // "J" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
      disabledEvent(e);
    }
    // "S" key + macOS
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      disabledEvent(e);
    }
    // "U" key
    if (e.ctrlKey && e.keyCode == 85) {
      disabledEvent(e);
    }
    // "F12" key
    if (event.keyCode == 123) {
      disabledEvent(e);
    }
  }, false);
  function disabledEvent(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
  }
};

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
  "No Right-Click",
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
var immovableWallSlippery = 'immovableWallSlippery'; //Makes you SLIPPERY!
var immovableWallOneWayPlayerBlockLeft = 'immovableWallOneWayPlayerBlockLeft'; //One way player only from the left

//Moveable Wall Names
var wallRegular = 'wallRegular';
var wallPlayerFrozen = 'wallPlayerFrozen';
var wallSurf = 'wallSurf';
var wallInverse = 'wallInverse'; //First Turn (Leaners Walls From Ledge)
var wallGhost = 'wallGhost'; //Immovable Wall That Let's You Get Through Objects
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

//Flag Names
var flagRegular = 'flagRegular';
var flagSpecial = 'flagSpecial';

/////////////////////////List of Art of Each Image/////////////////
var star = 'star';

/////////////////////////List of Art of Each Sprite/////////////////
//Death
var deathTile = 'deathTile';

//Immovable Wall
var immovableWallTile = 'immovableWallTile';

//Moveable Wall
var wallTile = 'wallTile';

//Ledge
var ledge = 'ledge';

//enemy
var enemyOne = 'enemyOne'

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

///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator("Level 0-Direct Physics", 1400, 800, new MetroidvaniaCreator(1, 0, 0, 800, 0, 0, 0, 1400), "#FFFDD0"); //3800

//world gravity
// level_0.worldGravity = new worldGravityCreator(200,200);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(400, 700),
  new PlayerPositionCreator(400, 700),
  new PlayerPositionCreator(400, 700),
  new PlayerPositionCreator(400, 700),
]

//Creation of Undeniable Death

level_0.undeniableDeathSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 0, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 1400, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  //Testing
  // new SpriteCreator(true, undeniableDeathRegular, deathTile, 100, 200, 50, 50, 1, 500, 0, 0, 0, null, null),

];

//Creation of ImmovableWalls
level_0.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 0, 800, 1400, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of Moveable Walls
level_0.wallSpawn = [
  new SpriteCreator(true, wallRegular, wallTile, 700, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of Ledges
level_0.ledgeSpawn = [
  new SpriteCreator(true, surf, ledge, 400, 100, 150, 50, 1, 300, 0, 0, 0, null, null),
];

//Creation of Ball
level_0.ballSpawn = [
  new SpriteCreator(true, ballRegular, ball, 200, 100, 50, 50, 1, 300, 0, 0, 0, null, null),
];

//Creation of Spikes
level_0.enemySpawn = [
  // new SpriteCreator(true, enemyDaakath, enemyOne, 200, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, enemyOne, 100, 300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, enemyOne, 200, 300, 50, 50, 1, 0, 0, 0, 0, null, null),

  // new SpriteCreator(true, enemyShooter, enemyOne, 300, 300, 50, 50, 1, 0, 0, 0, 0, null, null),


];

//Creation of falling spikes or projectile traps
level_0.fallingSpikes = [
  new SpriteCreator(true, spikesRegular, spikeFall, 500, 100, null, null, 1, 0, 0, 0, 500, null, 3),
];

//flag spawn
level_0.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 600, 400, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_0.text = [
  // new textCreator(true, 150, 3500, "Time To Be Reborn\n\nP- Pause\nO- FullScreen\nW or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right", fontGrind, 25),
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

//Push to worldClassLevelsGlobalArray
worldClassLevels.push(level_0);

////////////////////////////////////////Level 1-SandboxMode/////////////////////////////////////

//New Playground
var level_1 = new LevelCreator("Level 1-SandboxMode", 5000, 4000, new MetroidvaniaCreator(1, 0, 1, 4000, 2, 0, 1, 5000), '#ffffff');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(200, 200),
  new PlayerPositionCreator(200, 200),
  new PlayerPositionCreator(200, 200),
  new PlayerPositionCreator(200, 200),
]

//Creation of Undeniable Death

level_1.undeniableDeathSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 0, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 1400, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  //Testing
  // new SpriteCreator(true, undeniableDeathRegular, deathTile, 100, 200, 50, 50, 1, 500, 0, 0, 0, null, null),

];

//Creation of ImmovableWalls
level_1.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 0, 800, 1400, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of Moveable Walls
level_1.wallSpawn = [
  new SpriteCreator(true, wallRegular, wallTile, 700, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of Ledges
level_1.ledgeSpawn = [
  new SpriteCreator(true, surf, ledge, 400, 100, 150, 50, 1, 300, 0, 0, 0, null, null),
];

//Creation of Ball
level_1.ballSpawn = [
  new SpriteCreator(true, ballRegular, ball, 200, 100, 50, 50, 1, 300, 0, 0, 0, null, null),
];

//Creation of Spikes
level_1.enemySpawn = [
  new SpriteCreator(true, enemyDaakath, enemyOne, 100, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of falling spikes or projectile traps
level_1.fallingSpikes = [
  new SpriteCreator(true, spikesRegular, spikeFall, 500, 100, null, null, 1, 0, 0, 0, 500, null, 3),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 600, 400, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_1.text = [
  // new textCreator(true, 150, 3500, "Time To Be Reborn\n\nP- Pause\nO- FullScreen\nW or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right", fontGrind, 25),
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

//Push Level 2 Into World Class Array
worldClassLevels.push(level_1);

////////////////////////////////////////Level 2/////////////////////////////////////
var level_2 = new LevelCreator("Level 2", 4800, 2000, new MetroidvaniaCreator(3, 0, 3, 2000, null, null, 1, 4800), '#ffffff');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(1700, 690),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(4500, 1900),
]

///////////////////////Creation of Undeniable Death

level_2.undeniableDeathSpawn = [
  //Ground Next To Flag
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 4600, 1500, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 4000, 0, 50, 1800, 1, 0, 0, 0, 0, null, null),
  //Top of the Yellow at the Bottom
];

/////////////////////////Creation of ImmovableWalls
level_2.immovableWallSpawn = [
  //Border of Level One and Level Two
  new SpriteCreator(true, immovableWallSlippery, immovableWallTile, 4800, 0, 50, 1800, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 4000, 2000, 800, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 4600, 1100, 200, 25, .5, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallSlippery, immovableWallTile, 4800, 0, 0, 0, 50, 1000, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallRegular, immovableWallTile, 4000, 2000, 0, 0, 800, 50, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallSlippery, immovableWallVertical500, 4800, 1000, 0, 0, 1, 1, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallSlippery, immovableWallVertical300, 4800, 1300, 0, 0, 1, 1, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallSlippery, immovableWallTile, 4800, 1600, 0, 0, 1, 1, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallSlippery, immovableWallTile, 4800, 1650, 0, 0, 1, 1, 0, 0, null, null),
  // new SpriteCreator(true, true, immovableWallSlippery, immovableWallTile, 4800, 1700, 0, 0, 1, 1, 0, 0, null, null),
  // //Ground
  // new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal500, 4300, 2000, 0, 0, 1, 1, 0, 0, null, null),

];

//Moveable Walls 
level_2.wallSpawn = [
  new SpriteCreator(true, wallRegular, wallTile, 4400, 1100, 150, 50, 1, 0, 0, 0, 0, null, null),
];


//Ledges
level_2.ledgeSpawn = [
  new SpriteCreator(true, elevator, ledge, 4200, 1600, null, null, 1, 0, 0, 0, 0, null, null),
];

//Enemy Spawn
level_2.enemySpawn = [
  new SpriteCreator(true, enemyDaakath, enemyOne, 4300, 1400, null, null, 1, 0, 0, 0, 0, null, null),
];

//Ball
level_2.ballSpawn = [
];


//Falling Spikes
level_2.fallingSpikes = [
  new SpriteCreator(true, spikesRegular, spikeFall, 4500, 100, null, null, 1, 0, 0, 0, 500, null, 3),
];

//Flag Spawn
// level_2.flagSpawn = [
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

level_2.text = [
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
worldClassLevels.push(level_2);


////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator("Level 3", 3000, 1600, new MetroidvaniaCreator(null, null, 2, 1600, null, null, null, null), '#ffffff'); //2400

// level_3.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(300, 1400), //400/700
  new PlayerPositionCreator(300, 1400),
  new PlayerPositionCreator(1400, 700),
]

///////////////////////Creation of Undeniable Death

// level_3.undeniableDeathSpawn = [
// ];

// // /////////////////////////Creation of ImmovableWalls
// level_3.immovableWallSpawn = [
// ];

//Moveable Walls
///Single Wall to Teach You  
// level_3.wallSpawn = [
// ];

// //Ledges
level_3.ledgeSpawn = [
  // //Surf
];

// // //Enemy Spawn
level_3.enemySpawn = [
];

// //Ball
level_3.ballSpawn = [
];

//Falling Spikes
level_3.fallingSpikes = [
];

//Push Level 3 Into World Class Array
worldClassLevels.push(level_3);

///////////////////////////////////////////Level 4///////////////////////////////////////////////////////////
var level_4 = new LevelCreator("Level 4-SEAN MOODY", 4200, 3000, new MetroidvaniaCreator(4, 0, 4, 3000, 2, 0, 4, 4200), "#D3D3D3"); //3800

//world gravity
// level_4.worldGravity = new worldGravityCreator(200,200);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_4.playerPosition = [
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
]


// level_4.undeniableDeathSpawn = [
//   // // //Little Death to Prevent Running At Wall Cheese Glitch
//   new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal500, 500, 3000, 0, 0, 1, 1, 0, 0, null, null),
// ];

// /////////////////////////Creation of ImmovableWalls
// level_4.immovableWallSpawn = [
// ];

//Moveable Walls
///Single Wall to Teach You  
// level_4.wallSpawn = [
// ];

level_4.ledgeSpawn = [
];

//Ball
level_4.ballSpawn = [
];

level_4.enemySpawn = [
];

level_4.fallingSpikes = [
  /////////////////////////////////////Shadow Level////////////////////////////////////////////
];

//flag spawn
level_4.flagSpawn = [
  // //First Flag
  // new flagCreator(2, true, flagRegular, flag, 1600, 2850, 0, 0, .4, .4, 0, 0, null),
  // new flagCreator(3, true, flagRegular, flag, 3600, 250, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_4.text = [
  // new textCreator(true, 150, 3500, "Time To Be Reborn\n\nP- Pause\nO- FullScreen\nW or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right", fontGrind, 25),
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

//Push to worldClassLevelsGlobalArray
worldClassLevels.push(level_4);

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
