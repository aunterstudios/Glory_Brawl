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
  "MetroidVanian: Play Testing Physics",
  "Be Reborn Once Again",
  "Remember the Words",
  "GLORY BRAWL",
  "Change Wall"
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

//Creates the Text Class
class textCreator {
  constructor(trigger, x, y, textInput, font, fontSize, fill, fontWeight) {
    this.trigger = trigger;
    this.x = x;
    this.y = y;
    this.textInput = textInput;
    this.font = font;
    this.fontSize = fontSize;
    this.fill = fill;
    this.fontWeight = fontWeight;
  }
};
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

//Moveable Wall Namesa
//Base Walls
var wallRegular = 'wallRegular';
//First Line Ball Descedeant Walls
var wallControl = 'wallControl'; //First Turn (Control Wall BALL!)
//Ledge-Tree Descendent Walls
var wallInverse = 'wallInverse'; //First Turn (Leaners Walls From Ledge)
//Third Line Enemy Descendant Walls
var wallBlackFrozen = 'wallBlackFrozen'; //Completely Immovable But Kills 
var wallBlackTrap = 'wallBlackTrap'; //Immovable But Moving Trap (That Kills
var wallBlackKiller = 'wallBlackKiller'; //No Player Collision But Moveable Everything Incuding Yu)Everything
//Special Walls (Can't Be Transuted Too or From)
var wallCloud = 'wallCloud'; //Stationary Shooting Platform Heh
var wallGhost = 'wallGhost'; //Immovable Wall That Let's You Get Through Objects

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

/////////////////////////List of Art of Each Sprite/////////////////
//Death
var deathHorizontal = 'deathHorizontal';
var deathVertical = 'deathVertical';
//Spikes
var spikesVertical = 'spikesVertical';
var spikesHorizontalOne = 'spikesHorizontalOne';
var spikesHorizontalTwo = 'spikesHorizontalTwo';

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

//Walls
var tintWallControl = 0x666666;
var tintWallInverse = 2070551.3881263782;
// var tintWallBlackTrap = 15680658.67511709;
var tintWallBlackTrap = Phaser.Color.RED;
var tintWallBlackFrozen = 0x00ffff;
var tintWallBlackKiller = 10409939.733364154;
var tintWallHeavy = 6623573.181835621;
var tintWallCloud = 9583870.358153213;
var tintWallGhost = 16771007.229130682;

//Enemies
var tintEnemyShooter = 12758247.409111453;
var tintEnemyDaakath = 15269906.933038201;
var tintEnemyAccelerate = 2885804.4944837275;

///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator("Level 0-CL", 3800, 4200, new MetroidvaniaCreator(1, 100, 0, 4200, 0, 1, 0, 3800), "#ffffff"); //3800

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(200, 200),
  new PlayerPositionCreator(300, 4100),
  new PlayerPositionCreator(1250, 2000),
  new PlayerPositionCreator(2600, 600),
]

///////////////////////Creation of Undeniable Death

level_0.undeniableDeathSpawn = [
  //Leftward Boundary
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 1470, 0, 0, .25, .945, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 3800, 0, 0, 0, .25, 1.995, 0, 0, null, null),
  // new SpriteCreator(2, true, true, undeniableDeathRegular, deathVertical, 2800, 1263, 0, 0, .25, .767, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1463, 900, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 2083, 480, 0, 0, .5, .3, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1400, 0, 0, 0, 1.715, .5, 0, 0, null, null),
  //Blocking Entrance to Level 1 (SPECIAL SPRITE)
  new SpriteCreator(true, true, spikesRegular, spikesHorizontalOne, 0, 0, 0, 0, 1, .5, 0, 0, 0, null),
  //Special Sprite (Removed From Game Once Killed);
  /////////////////////////Make Sure You Don't Have to Re-Do From the Launch Pad//////////////////////
  new SpriteCreator(true, true, undeniableDeathRegular, deathHorizontal, 1800, 2800, 0, 0, 1.427, .5, 0, 0, null, null),
  ///Border Left Bottom
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 3230, 0, 0, .25, .645, 0, 0, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_0.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 4200, 0, 0, 4.463, .5, 0, 0, null, null),
  //The Double Jump
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1800, 4000, 0, 0, .4, .15, 0, 0, null, null),
  //Fast Climb
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2100, 3500, 0, 0, .5, .5, 0, 0, null, null),
  //Fast Climb Other Side
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1600, 3200, 0, 0, .5, .5, 0, 0, null, null),
  //Last Fast Climb Tutorial
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1200, 2900, 0, 0, .5, .5, 0, 0, null, null),
  //Teach You How to Slide Down
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 45, 3335, 0, 0, 1.44, .5, 0, 0, null, null),
  //First Mini Wall Before Explaining How to Side Ways Jump from the Wall
  new SpriteCreator(false, true, immovableWallRegular, immovableWallVertical, 500, 3200, 0, 0, .3, .05, 0, 0, null, null),
  //Sideways Jump
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 0, 2800, 0, 0, .5, .5, 0, 0, null, null),
  //Sideways Jump This!
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 600, 2400, 0, 0, .5, .5, 0, 0, null, null),
  //Side Ways Jump Again!
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 50, 1480, 0, 0, .5, 1, 0, 0, null, null),
  //Landing Pad of the Check Point and Dislodge
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 950, 2100, 0, 0, 1, .5, 0, 0, null, null),
  //Mini Walls After Launch Pad
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2100, 2400, 0, 0, .4, .2, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2500, 2600, 0, 0, .4, .2, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2600, 1400, 0, 0, .4, .2, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3300, 2300, 0, 0, .4, .2, 0, 0, null, null),
  //Upside Down Mini-Wall
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3300, 1950, 0, 0, .4, .2, 0, 0, null, null),
  //Mini Walls Part Two After Upside Down
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2800, 2300, 0, 0, .4, .2, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3000, 1600, 0, 0, .4, .2, 0, 0, null, null),
  //NOT MINI-WALL BUT TO TEACH YOU HOW TO DO OG SIDEWAYS JUMP SEAN MOODY
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3600, 1450, 0, 0, .4, .4, 0, 0, null, null),
  //Tap D this time.
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2300, 1100, 0, 0, .4, .4, 0, 0, null, null),
  //
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3000, 600, 0, 0, .3, .05, 0, 0, null, null),
  //Last Divider of The Right Side
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3800, 2885, 0, 0, .5, 1.465, 0, 0, null, null),
  //The Box
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 2375, 700, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1400, 300, 0, 0, .5, 1.3, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 0, 1407, 0, 0, 1.72, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 0, 0, 0, 0, .5, 1.653, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 400, 1200, 0, 0, .9, .4, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 63, 800, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 974, 500, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 63, 300, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 700, 600, 0, 0, .4, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 400, 500, 0, 0, .4, .5, 0, 0, null, null),
  //Tiny Boxes Inside THE BOX
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 200, 950, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 200, 1150, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 500, 1000, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 600, 800, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 700, 775, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 800, 700, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 800, 900, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 800, 1100, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1000, 800, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1000, 600, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1100, 1000, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1100, 600, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1200, 1100, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 1200, 800, 0, 0, .3, .05, 0, 0, null, null),
  //TIny Boxes part 2
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 3300, 1050, 0, 0, .3, .05, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 2650, 900, 0, 0, .3, .05, 0, 0, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_0.wallSpawn = [new SpriteCreator(true, true, wallRegular, wallHorizontal, 3500, 950, 0, 0, .5, .5, 0, 0, null, null)];

//Ball
level_0.ballSpawn = [new SpriteCreator(true, true, ballRegular, ball, 700, 1350, 0, 0, null, null, 0, 0, null, null)];

//FLag Respawn
level_0.flagSpawn = [
  new flagCreator(0, true, flagRegular, flag, 100, 200, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(3, true, flagRegular, flag, 2400, 600, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 1150, 2000, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_0.text = [
  new textCreator(true, 100, 3600, "This is How You'll Be Reborn\n\nP- Pause\nO- FullScreen\nR- To Literally Kill Yourself\nW or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 100, 4000, "RED IS DEATH", 'Impact', 30, "#FF0000", 'bold'),
  new textCreator(true, 1900, 3950, "You Automatically Stick on Surfaces\n\nWhen You Jump on It\n\nHold D While Tapping A to Fast Climb", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1750, 3350, "This Time Hold A While Tapping D", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 650, 3000, "While Sticking to a Side of a Wall\n\nHold S to Slide Down", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 150, 2870, "You Can Jump Off Walls\n\nMove/Hold Right\n\nDouble Jump While in the Air", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 200, 2100, "As Long As You Touch a Surface\n\nYou Can Double Jump Again and Again\n\nThis is Fucking Important So Remember It", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 150, 2500, "It's Obvious\n\nWhat You Need to Do", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 100, 25, "Level 1 ↑", 'Courier New', 25, '#000000', 'bold'),
  // new textCreator(9, true, 2500, 1400, "Once Again When You Hit a Fucking 4wSurface\n\nYou Can Double Jump Again in the Air", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 300, 1600, "You Can Go Upside Down\n\nJump to the Bottom of The Wall\n\nYou Can Move While Upside Down", 'Courier New', 25, '#000000', 'bold'),
  ////////////////////////////New Text//////////////////////
  new textCreator(true, 1050, 3800, "Tapping Twice on the Jump Button Lets You Double Jump\n\nDouble Jump to the Top of the Wall", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1000, 1600, "Press S to Dislodge Yourself\n\nHolding S While Falling\n\nSlows Down Your Fall", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1300, 1850, "Checkpoint\n\nPress Shift to Toggle Free-Look\n\n(WASD Movement)\n\nLOOK AT THE FUCKING MAP NOW", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1900, 1900, "You Can Control Your Movement in the Air\n\nPressing S Lets You Move Downwards", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 2800, 3450, "I'm Telling You to Read the Fucking Instructions\n\nHoly Shit It's Fucking Important\n\nI'm Telling You How To Become Reborn\n\nNow We've Done This Countless of Times\n\nThe Same Thing Over and Over Again\n\nGo Back to the Beginning With This in Mind\n\nJust Remember the Words\n\n\nGLORY BRAWL ", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 2900, 2000, "Stick to the Bottom\n\nDislodge Yourself\n\nDouble Jump to the Top", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 2800, 1500, "←", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 3000, 1200, "Do I Need To Say It Again?\n\nYou Can Double Jump in the Air\n\nOnce You Hit a Surface", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 3400, 1400, "←", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 3200, 300, "Press 1 to Access Pull Gun\n\nPoint and Click to Shoot\n\nUse the Pull Gun\n\nWhile on Top of the Wall\n\nJump and Pull Yourself Along", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 2400, 200, "Pressing S Pushes Down the Wall\n\nRemember You're Surfing It\n\n←", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1600, 450, "Any Object That is Moveable\n\nCan Be Pulled", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 800, 150, "DO NOT TOUCH ORANGE\n\nIT WILL KILL YOU\n\nGet to The Checkpoint on the Left\n\nThen Go to the Bottom", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 100, 1300, "The Ball Can Kill Orange\nAmong Other Things", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 750, 1300, "Press 2 To Access the Push Gun\nIt Does the Opposite From Pull\nAny Object That is Moveable Can Be Pushed", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 200, 600, "Are You Stuggling?\nPress 3 to Access the Stop Gun\nIt Stops Things\nAny Object That is Moveable\nCan Be Stopped", 'Courier New', 25, '#000000', 'bold'),
  ///Addition Text
  new textCreator(true, 2250, 3600, "Go Here First →\n\nFucking Read It", 'Courier New', 25, '#000000', 'bold'),
  //Arrows
  new textCreator(true, 1900, 3500, "←", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 1900, 3800, "↑", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 1400, 3200, "←", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 1050, 2900, "↓", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 200, 3100, "↑", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 1000, 3250, "←", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 1000, 3250, "←", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 300, 2700, "→", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 500, 2600, "↑", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 300, 2700, "→", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 300, 2350, "←", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 200, 1900, "↑", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 400, 1525, "→", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 1100, 1525, "↓", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 2100, 2100, "↓", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 2300, 2400, "→", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 3500, 2200, "↑", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 2400, 1000, "↑", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 2900, 1000, "←", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 2800, 600, "→", 'Courier New', 30, '#000000', 'bold'),
  new textCreator(true, 3500, 1800, "→", 'Courier New', 30, '#000000', 'bold'),
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
  new SpriteCreator(true, true, wallControl, wallHorizontal, 1700, 600, 0, 0, .4, .4, 0, 0, null, null),
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
level_1.text = [
  //Marker For Level 0
  //Entry to Level 0
  new textCreator(true, 600, 2950, "Level 0 ↓", 'Courier New', 25, '#000000', 'bold'),
  //Entry to Level 1 (Lets See if You Remember!)
  new textCreator(true, 550, 2550, "Get On The Wall and Surfs Up\n\nRemember to Use A Combination of Your Guns\n\nAlso If You Haven't Realized Fuckhead\n\nYou Can Stick To The Bottom", 'Courier New', 25, '#000000', 'bold'),
  //WolfGang Kill Them-Pull The Wall
  new textCreator(true, 600, 2000, "It's All About Pulling The Wall Along\n\nAs You Jump And Shoot\n\nRemember To Press S To Push Downwards\n\nAnd To Use The Different Guns Idiot!", 'Courier New', 25, '#000000', 'bold'),
  //Stick to the Side
  new textCreator(true, 600, 1350, "You Can Stick To The Side\n\nIt Stablizes The Wall", 'Courier New', 25, '#000000', 'bold'),
  //These Kill Walls (Wasn't So Bad)
  new textCreator(true, 600, 450, "These Kill Walls By The Way\n\n\n\n\n\n\n\n\nThat Wasn't So Bad Was It?\n\nI Hope This Was Easy\n\nOr Else You're Straight Fucked", 'Courier New', 25, '#000000', 'bold'),
  //Control Wall First Text
  new textCreator(true, 1600, 300, "These Walls Stop Movement\n\nAs Soon As You Touch It\n\nPress S To Push Down", 'Courier New', 25, '#000000', 'bold'),
  //First Horizontal Inverse Wall
  new textCreator(true, 2800, 2550, "These Walls Are Special\n\nIt Will Move Based On\n\nWhich Side You're On\n\nGet On Top of It", 'Courier New', 25, '#000000', 'bold'),
  //First Vertical Inverse Wall
  new textCreator(true, 4100, 400, "Stick To The Side Of This\n\nOr Get On Top\n\nIt Will Move Depending\n\nWhich Side You're On\n\nOh Yeah Press S To Push Down!!!", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 4800, 1400, "The Push Gun Works Here Pretty Well", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 4300, 2000, "Remember You Can Double Jump Again\n\nOnce You Hit A Fucking Surface", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 5555, 2600, "Walls Transform\n\nBased What Hits It", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 5540, 1800, "Oh Yeah\n\nYou Can Stick Upside Down", 'Courier New', 25, '#000000', 'bold')
  ,
  new textCreator(true, 2800, 2050, "Move From Side To Side\n\nOr Even Jump", 'Courier New', 25, '#000000', 'bold')
  ,
  //Level 1 ↑
  new textCreator(true, 5625, 50, "Level 2 ↑", 'Courier New', 25, '#000000', 'bold')

];

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
  new SpriteCreator(true, true, spikesRegular, spikesVertical, 3200, 2573, 0, 0, .6, .4, 0, 0, 0, null)
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
  ///////////////////////////////////Second Wall That Gets Removed From Level 3//////////////////////
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 773, 0, 0, 0, .5, .5, 0, 0, null, null),
  /////////////////////////////////////First Wall That Gets Removed From Level 2//////////////////////
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
  new flagCreator(3, true, flagRegular, flag, 2500, 3050, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 200, 1250, 0, 0, .4, .4, 0, 0, null),
  new flagCreator(0, true, flagRegular, flag, 1700, 1400, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_2.text = [
  //Entry to Level 0
  new textCreator(true, 100, 3150, "Level 1 ↓", 'Courier New', 25, '#000000', 'bold'),
  //Camera Mode
  new textCreator(false, 80, 2800, "Press 4 to Toggle Free-Look(WASD to Move)", 'Courier New', 25, '#000000', 'bold'),
  //Grey Ledge Tutorial
  new textCreator(true, 850, 2300, "Pull the Yellow Ledge Towards You\n\nGet on Top of the Yellow Ledge", 'Courier New', 25, '#000000', 'bold'),
  //Where to Land Grey Ledge
  new textCreator(true, 300, 1850, "Jump Down to the Yellow Ledge at the Bottom\n\nHold S To Slow Down Your Fall", 'Courier New', 25, '#000000', 'bold'),
  //Green Ledge Tutorial
  new textCreator(true, 900, 1525, "Trust the Green Ledges at the Bottom", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1500, 1600, "↓", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1600, 3000, "Green Ledges Make You Bounce", 'Courier New', 25, '#000000', 'bold'),
  //Blue Ledge Tutorial
  new textCreator(true, 1850, 200, "You Can Surf Blue Ledges(Control By Going Left or Right)\n\nLand Perfectly in the Middle of the Blue Ledge\n\nHolding S Lets You Descend Faster (Obviously)", 'Courier New', 25, '#000000', 'bold'),
  //Kill Instructions
  new textCreator(true, 80, 250, "Press 4 to Access Kill Gun\n\nAny Object that is Moveable can be Killed", 'Courier New', 25, '#000000', 'bold'),
  //These Kill Walls
  //////////////////////////////////Triggering After Special Flag in Level 2 is Reached/////////////////////////////
  new textCreator(false, 650, 700, "Get The Ball To The Spikes", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(false, 80, 200, "Trying Using the Pull Gun\n\nOn The Walls Next Time", 'Courier New', 25, '#000000', 'bold'),
  /////////////////////////////////Adding New Things////////////////////////////
  new textCreator(true, 1700, 1300, "You Can Surf On Top of Surfaces", 'Courier New', 25, '#000000', 'bold'),
  //Level Two Indicator
  new textCreator(true, 25, 1225, "← Level 3", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 150, 2850, "Hey Dumbass!\n\nRemember Shift is Free Look!\n\nWASD Movement", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 2250, 2800, "Tap A or D\n\nThen Double Jump\n\nBack On To The Wall", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 900, 2800, "If You Ever Fuck Up\n\nPress R To Kill Yourself\n\nTry It", 'Courier New', 25, '#000000', 'bold'),

];

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

// Special Handler For Changing Conditions of Levels
var flagSpecial_Level3 = {
  storyTrigger: {
    page: 0,
    level: 3,
    backgroundColor: "#000000",
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
level_3.text = [
  //Entry to Level 1
  new textCreator(true, 4650, 650, "Level 2 →", 'Courier New', 25, '#000000', 'bold'),
  //WolfGang Kill Them
  new textCreator(true, 4250, 580, "Kill Them Before They Kill You\nYou Can Move Them Too", 'Courier New', 25, '#000000', 'bold'),
  //Camera Mode
  new textCreator(true, 2400, 400, "Learn How to Do the Free-Look Shot\n\nBullets Are Killed Off Screen\n\nFollow The Bullet\n\nPress Shift For Free Look (WASD Movement)", 'Courier New', 25, '#000000', 'bold'),
  //Phase Wall
  new textCreator(true, 400, 400, "These Orange Walls Are Killed\n\nBy Enemy Bullets\n\nThat Falling Red Thing Kills You", 'Courier New', 25, '#000000', 'bold'),
  ////////////////////////////////////Shadow Level//////////////////////////////////
  //Entry to Level 1
  new textCreator(false, 4650, 650, "Level 2 →", 'Courier New', 25, '#ff0000', 'bold'),
  //WolfGang Kill Them
  new textCreator(false, 4250, 580, "I'll Always Be With You", 'Courier New', 25, '#ff0000', 'bold'),
  //Camera Mode
  new textCreator(false, 2250, 400, "Feel My Wrath", 'Courier New', 25, '#ff0000', 'bold'),
  //Phase Wall
  new textCreator(false, 400, 400, "This is A Level of The Shadow", 'Courier New', 25, '#ff0000', 'bold'),
  /////////////////////////////New Text/////////////////
  new textCreator(true, 1400, 200, "The Wall Can Be Used\n\nAgainst The Enemy\n\nThere's a Price Though", 'Courier New', 25, '#000000', 'bold'),
];

//Push Level 3 Into World Class Array
worldClassLevels.push(level_3);


////////////////////////////////////////Level 4/////////////////////////////////////(Testing Ground)
var level_4 = new LevelCreator("Level 4-PlayGround", 1400, 800, new MetroidvaniaCreator(null, null, 3, 800, null, null, null, null), '#ffffff');

// level_4.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_4.playerPosition = [
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(400, 700), //400/700
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(3800, 3800),
]

///////////////////////Creation of Undeniable Death

level_4.undeniableDeathSpawn = [
  //Bottom At The End of the Map (INVISIBLE)
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 1400, 0, 0, 0, .25, .5, 0, 0, null, null),
  new SpriteCreator(true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, .5, 0, 0, null, null),
  // new SpriteCreator(0, true, true, undeniableDeathRegular, deathHorizontal, 300, 400, 0, 0, .5, .5, 0, 0, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_4.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, true, immovableWallRegular, immovableWallHorizontal, 300, 800, 0, 0, 1.2, .25, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallSlippery, immovableWallVertical, 400, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, immovableWallRegular, immovableWallVertical, 700, 200, 0, 0, .5, .5, 0, 0, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
// level_4.wallSpawn = [
//   new SpriteCreator(3, true, true, wallCloud, wallHorizontal, 600, 400, 0, 0, .4, .4, 0, 0, null, null),
//   // new SpriteCreator(4, true, true, wallRegular, wallVertical, 400, 600, 0, 0, .4, .4, 0, 0, null, null),
// ];


//Ledges
level_4.ledgeSpawn = [
  // //Surf
  new SpriteCreator(true, true, surf, ledge, 1100, 200, 0, 0, .4, .4, 0, 0, null, null),
  // //Bounce Ledges
  // new SpriteCreator(2, true, true, bounce, ledge, 900, 390, 0, 0, .4, .4, 0, 0, null, null),
  // //Surf Ledges
  // new SpriteCreator(3, true, true, elevator, ledge, 200, 200, 0, 0, .4, .4, 0, 0, null, null),
];

//Enemy Spawn
level_4.enemySpawn = [
  // new SpriteCreator(0, true, true, enemyDaakath, enemyOne, 400, 200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyShooter, enemyOne, 1200, 300, 0, 0, .5, .5, 0, 0, null, null),
];

//Ball
level_4.ballSpawn = [
  new SpriteCreator(true, true, ballRegular, ball, 800, 400, 0, 0, null, null, 0, 0, null, null)
];

//Push Level 4 Into World Class Array
worldClassLevels.push(level_4);


////////////////////////////////////////Level 4/////////////////////////////////////(Testing Ground)
var level_5 = new LevelCreator("Level 5-SpecialWalls", 6000, 4000, new MetroidvaniaCreator(null, null, null, 6000, 2, 0, null, null), '#ffffff');

// level_5.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_5.playerPosition = [
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(1000, 3800), //400/700
  new PlayerPositionCreator(100, 3800),
  new PlayerPositionCreator(1400, 700),
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
];

//Walls
level_5.wallSpawn = [
  //First Control Wall Turned Into WallBlackKiller
  // new SpriteCreator(true, true, wallRegular, wallHorizontal, 600, 3600, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallControl, wallVertical, 1200, 3000, 0, 0, .4, .4, 0, 0, null, null),
  new SpriteCreator(true, true, wallInverse, wallHorizontal, 1900, 3650, 0, 0, .4, .4, 0, 0, null, null),
];


//Ledges
level_5.ledgeSpawn = [
  // //Surf
  new SpriteCreator(true, true, surf, ledge, 600, 3600, 0, 0, .4, .4, 0, 0, null, null),
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
  new SpriteCreator(true, true, enemyShooter, enemyOne, 2450, 3100, 0, 300, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyShooter, enemyOne, 3300, 3400, 0, 300, .5, .5, 0, 0, null, null),
  //Enemies Accelerate
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2500, 3500, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2500, 3550, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2700, 3400, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2800, 3200, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 2900, 3100, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 3000, 3800, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyAccelerate, enemyOne, 3000, 3600, 0, 0, .5, .5, 0, 0, null, null),
  //More Enemies To Fuck With You
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3300, 3700, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3200, 3750, 0, 0, .5, .5, 0, 0, null, null),
  //More Enemies To Fuck With You Part 2
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3000, 3600, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3300, 3700, 0, 0, .5, .5, 0, 0, null, null),
  new SpriteCreator(true, true, enemyDaakath, enemyOne, 3200, 3750, 0, 0, .5, .5, 0, 0, null, null),
];

//Falling Spikes
level_5.fallingSpikes = [
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2250, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2315, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2600, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 2800, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 3000, 3075, null, null, .4, .4, 0, 700, null, 3),
  new SpriteCreator(true, true, spikeRegular, spikeFall, 3200, 3075, null, null, .4, .4, 0, 700, null, 3),
  /////////////////////////////////////Shadow Level////////////////////////////////////////////
];

//Text Creator (Helpful Hints)
level_5.text = [
  //Entry to Level 1
  new textCreator(true, 500, 3700, "Bring This With You\n\nYou're Going To Need It\n\nTill The Next Checkpoint", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 500, 2900, "This New Wall Kills Everything\n\nThere's a Price To Use It\n\nYou're Going To Need It\n\nTill The Next Checkpoint\n\nDon't Let It Touch The Ledge", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1400, 2900, "Do I Need To Remind You Dumbass?\n\nDon't Forget To Use Free-Look\n\nAnd Your Fucking Guns", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1150, 3300, "An Unshootable Trap\n\nAvoid It\n\nOr Kill It Before\n\nIt Transforms", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 1500, 3800, "The Trick Is To Try And Get The Wall\n\nTo The Other Side", 'Courier New', 25, '#000000', 'bold'),
  new textCreator(true, 3650, 3600, "If You Didn't Realize Yet Fuckhead\n\nYou Could Stick To These Upside Down", 'Courier New', 25, '#000000', 'bold'),
];



//Push Level 4 Into World Class Array
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
