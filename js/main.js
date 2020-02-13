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
game.state.add('controlScreen', brawl.stateControls);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
game.state.start('mainMenu');
//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "MetroidVanian: Class Refactor",
  "Be Reborn Once Again",
  "Remember the Words",
  "GLORY BRAWL"
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
var livingEnemies = [];
var enemyBulletTime = 0;


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
}

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
}

//Creates Player Positioning (Up, Down, Left Right);
class PlayerPositionCreator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//Creates World Gravity Object
class worldGravityCreator {
  constructor(gravityX, gravityY) {
    this.gravityX = gravityX;
    this.gravityY = gravityY;
  }
}

//Creates the Sprite Properties
class SpriteCreator {
  constructor(positionInArray, trigger, visible, name, art, x, y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY, specialCondition, specialWorld, specialArray, seconds, indexOfPlayerPosition) {
    this.positionInArray = positionInArray;
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
    this.specialWorld = specialWorld;
    this.specialArray = specialArray;
    this.seconds = seconds;
    this.indexOfPlayerPosition = indexOfPlayerPosition;
  }
}

//Creates the Text Class
class textCreator {
  constructor(positionInArray, x, y, textInput, font, fontSize, fill, fontWeight) {
    this.positionInArray = positionInArray;
    this.x = x;
    this.y = y;
    this.textInput = textInput;
    this.font = font;
    this.fontSize = fontSize;
    this.fill = fill;
    this.fontWeight = fontWeight;
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

//Moveable Wall Names
var wallRegular = 'wallRegular';
var wallGhost = 'wallGhost';
var wallFrozen = 'wallFrozen';
var wallGravity = 'wallGravity';
var wallReverseGravity = 'wallReverseGravity';
var wallLight = 'wallLight';
var wallHeavy = 'wallHeavy';
var wallCloud = 'wallCloud';

//Ledge Names
var elevator = 'elevator';
var bounce = 'bounce';
var surf = 'surf';

//Enemy Names
var enemyRegular = 'enemyRegular';

//Ball Names
var ballRegular = 'ballRegular';

//Falling Spikes
var spikeRegular = 'spikeRegular';

//Flag Names
var regularFlag = 'regularFlag';

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
var ledgeElevator = 'ledgeElevator';
var ledgeBounce = 'ledgeBounce';
var ledgeSurf = 'ledgeSurf';

//enemy
var enemyOne = 'enemy'

//Ball
var ball = 'ball';

//Falling Spikes
var spikeFall = 'spikeFall';

//Flag
var flag = 'flag';
///////////////////////////////////////////Tint Specific Art//////////////////////////////////////////////
//Walls
var tintWallRegular = 0xFFFFFF; //wallRegular (Removes Tint)
var tintWallCloud = 9583870.358153213; //wallCloud
var tintWallHeavy = 6623573.181835621; //wallHeavy
var tintWallGhost = 2131.658687827956; //wallGhost
var tintWallFrozen = 0x00ffff;
var tintWallGravity = 0x666666;
var tintWallReverseGravity = 5796018.4954396635;
var tintWallLight = 15680658.67511709;
// var tintWallImmovable = 7232137.110156179;
//Colors I like
var colorsArrays = [
  7232137.110156179,//Dark Blue
  2499878.036284214,//Enemy Wall Impact Tint
  16266338.5302869,//Some Kind of Pinkish Color
  8314793.039214706,//some kind of green tinted color
  2760456.417234472, //Enemy Wall
]


///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator("Level 0-CL", 3800, 2400, new MetroidvaniaCreator(1, 100, 0, 2400, 0, 1, 0, 2800), "#4488AA");

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(150, 50),
  new PlayerPositionCreator(300, 2200),
  new PlayerPositionCreator(200, 400),
  new PlayerPositionCreator(1400, 400),
]

///////////////////////Creation of Undeniable Death

level_0.undeniableDeathSpawn = [
  new SpriteCreator(0, true, true, undeniableDeathRegular, deathVertical, 0, 1470, 0, 0, .25, .619, 0, 0, null, null, null, null, null),
  new SpriteCreator(1, true, true, undeniableDeathRegular, deathVertical, 3800, 0, 0, 0, .25, 1.669, 0, 0, null, null, null, null, null),
  // new SpriteCreator(2, true, true, undeniableDeathRegular, deathVertical, 2800, 1263, 0, 0, .25, .767, 0, 0, null, null, null, null, null),
  new SpriteCreator(2, true, true, undeniableDeathRegular, deathHorizontal, 1463, 900, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(3, true, true, undeniableDeathRegular, deathVertical, 2083, 480, 0, 0, .5, .3, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, undeniableDeathRegular, deathHorizontal, 1400, 0, 0, 0, 1.715, .5, 0, 0, null, null, null, null, null),
  //Blocking Entrance to Level 1 (SPECIAL SPRITE)
  new SpriteCreator(5, true, true, spikesRegular, spikesHorizontalOne, 0, 0, 0, 0, 1, 1, 0, 0, 0, null, null, null, null)
  //Special Sprite (Removed From Game Once Killed);
];

/////////////////////////Creation of ImmovableWalls
level_0.immovableWallSpawn = [
  //Ground
  new SpriteCreator(0, true, true, immovableWallRegular, immovableWallHorizontal, 0, 2400, 0, 0, 4.463, .5, 0, 0, null, null, null, null, null),
  //Practice Jump Levels
  new SpriteCreator(1, true, true, immovableWallRegular, immovableWallVertical, 700, 2210, 0, 0, .4, .15, 0, 0, null, null, null, null, null),
  new SpriteCreator(2, true, true, immovableWallRegular, immovableWallVertical, 1700, 1910, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Tiny Box Practice Upside Down Jump
  new SpriteCreator(3, true, true, immovableWallRegular, immovableWallVertical, 3000, 2200, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, immovableWallRegular, immovableWallVertical, 3460, 1800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(5, true, true, immovableWallRegular, immovableWallVertical, 3230, 2000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(6, true, true, immovableWallRegular, immovableWallVertical, 3200, 1600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(7, true, true, immovableWallRegular, immovableWallVertical, 3200, 1375, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  //The Box
  new SpriteCreator(8, true, true, immovableWallRegular, immovableWallHorizontal, 2375, 700, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(9, true, true, immovableWallRegular, immovableWallVertical, 1400, 300, 0, 0, .5, 1.3, 0, 0, null, null, null, null, null),
  new SpriteCreator(10, true, true, immovableWallRegular, immovableWallHorizontal, 0, 1407, 0, 0, 1.72, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(11, true, true, immovableWallRegular, immovableWallVertical, 0, 0, 0, 0, .5, 1.653, 0, 0, null, null, null, null, null),
  new SpriteCreator(12, true, true, immovableWallRegular, immovableWallHorizontal, 400, 1200, 0, 0, .9, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(13, true, true, immovableWallRegular, immovableWallHorizontal, 63, 800, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(14, true, true, immovableWallRegular, immovableWallHorizontal, 974, 500, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(15, true, true, immovableWallRegular, immovableWallHorizontal, 63, 300, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(16, true, true, immovableWallRegular, immovableWallHorizontal, 700, 600, 0, 0, .4, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(17, true, true, immovableWallRegular, immovableWallHorizontal, 400, 500, 0, 0, .4, .5, 0, 0, null, null, null, null, null),
  //Tiny Boxes Inside THE BOX
  new SpriteCreator(18, true, true, immovableWallRegular, immovableWallVertical, 200, 950, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(19, true, true, immovableWallRegular, immovableWallVertical, 200, 1150, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(20, true, true, immovableWallRegular, immovableWallVertical, 500, 1000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(21, true, true, immovableWallRegular, immovableWallVertical, 600, 800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(22, true, true, immovableWallRegular, immovableWallVertical, 700, 775, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(23, true, true, immovableWallRegular, immovableWallVertical, 800, 700, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(24, true, true, immovableWallRegular, immovableWallVertical, 800, 900, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(25, true, true, immovableWallRegular, immovableWallVertical, 800, 1100, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(26, true, true, immovableWallRegular, immovableWallVertical, 1000, 800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(27, true, true, immovableWallRegular, immovableWallVertical, 1000, 600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(28, true, true, immovableWallRegular, immovableWallVertical, 1100, 1000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(29, true, true, immovableWallRegular, immovableWallVertical, 1100, 600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(30, true, true, immovableWallRegular, immovableWallVertical, 1200, 1100, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(31, true, true, immovableWallRegular, immovableWallVertical, 1200, 800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  //New Item (Instead of Undeniable Death)
  // new SpriteCreator(32, true, true, immovableWallRegular, immovableWallVertical, 3800, 1200, 0, 0, .2, 1.262, 0, 0, null, null, null, null, null),
  //TIny Boxes part 2
  new SpriteCreator(32, true, true, immovableWallRegular, immovableWallVertical, 3050, 1200, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(33, true, true, immovableWallRegular, immovableWallVertical, 2800, 1050, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(34, true, true, immovableWallRegular, immovableWallVertical, 2650, 900, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  // new SpriteCreator(33, true, true, immovableWallRegular, immovableWallHorizontal, 2348, 1700, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_0.wallSpawn = [new SpriteCreator(0, true, true, wallRegular, wallHorizontal, 3000, 450, 0, 0, .5, .5, 0, 0, null, null, null, null, null)];

//Ball
level_0.ballSpawn = [new SpriteCreator(0, true, true, ballRegular, ball, 700, 1350, 0, 0, null, null, 0, 0, null, null, null, null, null)];

//Text Creator (Helpful Hints)
level_0.text = [
  new textCreator(0, 100, 1800, "Alright This is How You Fucking Play\n\nP- Pause\nF- FullScreen\nW or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right\nTapping Twice on the Jump Button Lets You Double Jump\nJump Over the Wall", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(1, 3500, 1650, "RED IS DEATH!", 'Times New Roman', 30, "#FF0000", 'bold'),
  new textCreator(2, 1300, 1650, "You Automatically Stick on Surfaces When You Jump on It\nPress A or D while on the Wall to Jump Off It\nWhile in the Air Move Towards the Wall to Stick to it Again\nKeep Jumping Off and Moving Again Towards the Wall to Climb Over\nTry Holding D While Tapping A while on Sticking on the Left Side of the Wall", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(3, 2180, 1900, "You Can Stick and Move on the Bottom of Surfaces\n\nI Repeat Once Again You Automatically Stick to Surfaces\nPress S to go Downwards or Push\n\nWhenever You Touch A Surface You Can Double Jump Again", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(4, 2850, 600, "Press 1 to Access Pull Gun\nUse Mouse to Aim and Left Click to Shoot\nAny Object that is Moveable Can Be Pulled\n\nSurf the Grey Wall to the Top \nUsing the Pull Gun\nHint: Jump While Shooting At \nthe Grey Wall While Riding It", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(5, 750, 1265, "Press 2 to Use the Stop Gun\nBalls Destroy Enemies and Traps\nDestroy the Spikes\nAny Object that is Moveable Can be Stopped", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(6, 400, 200, "As Long as the Ball Touches Any Part of the Spikes", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(7, 100, 25, "Level 1 ↑", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(8, 2500, 1400, "Once Again When You Hit a Fucking Surface\n\nYou Can Double Jump Again in the Air", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(8, 1500, 600, "You Probably Realized\n\nYou Can Fuck Shit Up With One Mistake", 'Arial Black', 25, '#ffffff', 'bold'),
];

//Push to worldClassLevelsGlobalArray
worldClassLevels.push(level_0);

///////////////////////////////////////////Level 1/////////////////////////////////////////////////////////////
var level_1 = new LevelCreator("Level 1-CL", 2800, 3200, new MetroidvaniaCreator(4, 0, 0, 3200, 2, 1, 3, 2800), '#92e4b0');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(200, 0),
  new PlayerPositionCreator(400, 3120),
  new PlayerPositionCreator(100, 1320),
  new PlayerPositionCreator(2600, 3140),
]

///////////////////////Creation of Undeniable Death

level_1.undeniableDeathSpawn = [
  //Ground Next To Flag
  new SpriteCreator(0, true, true, undeniableDeathRegular, deathHorizontal, 725, 3170, 0, 0, .5, .4, 0, 0, null, null, null, null, null),
  //Top of the Yellow at the Bottom
  new SpriteCreator(1, true, true, undeniableDeathRegular, deathHorizontal, 0, 2691, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Border of First Half
  new SpriteCreator(2, true, true, undeniableDeathRegular, deathVertical, 1425, 1700, 0, 0, .25, 1.08, 0, 0, null, null, null, null, null),
  //Connector to top of yellow
  new SpriteCreator(3, true, true, undeniableDeathRegular, deathVertical, 700, 2000, 0, 0, .25, .714, 0, 0, null, null, null, null, null),
  //Preventing Grey Cheese
  new SpriteCreator(4, true, true, undeniableDeathRegular, deathHorizontal, 150, 1690, 0, 0, .2, .39, 0, 0, null, null, null, null, null),
  //Border Slim Left Side
  new SpriteCreator(5, true, true, undeniableDeathRegular, deathVertical, 0, 1400, 0, 0, .3, .922, 0, 0, null, null, null, null, null),
  //Next to Wall at the End of Grey Phase
  new SpriteCreator(6, true, true, undeniableDeathRegular, deathHorizontal, 426, 1336.5, 0, 0, .8029, .395, 0, 0, null, null, null, null, null),
  //Entryway to the Green Ledge
  new SpriteCreator(7, true, true, undeniableDeathRegular, deathVertical, 1550, 1336.5, 0, 0, .25, .714, 0, 0, null, null, null, null, null),
  //Connector to the right side of the map
  new SpriteCreator(8, true, true, undeniableDeathRegular, deathHorizontal, 1465, 3170, 0, 0, .5249, .4, 0, 0, null, null, null, null, null),
  //Final Hurdles Till You Get Respawn Twin Primes
  new SpriteCreator(9, true, true, undeniableDeathRegular, deathVertical, 2150, 2000, 0, 0, .25, .811, 0, 0, null, null, null, null, null),
  new SpriteCreator(10, true, true, undeniableDeathRegular, deathVertical, 2250, 500, 0, 0, .25, 1.5, 0, 0, null, null, null, null, null),
  new SpriteCreator(11, true, true, undeniableDeathRegular, deathVertical, 2800, 0, 0, 0, .25, 1.837, 0, 0, null, null, null, null, null),
  //Long Pole Death
  new SpriteCreator(12, true, true, undeniableDeathRegular, deathVertical, 2495, 600, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(13, true, true, undeniableDeathRegular, deathVertical, 2495, 1000, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(14, true, true, undeniableDeathRegular, deathVertical, 2495, 1400, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(15, true, true, undeniableDeathRegular, deathVertical, 2495, 1800, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(16, true, true, undeniableDeathRegular, deathVertical, 2495, 2200, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(17, true, true, undeniableDeathRegular, deathVertical, 2495, 2600, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  //Blue Ledge Past Long Pole of Death
  new SpriteCreator(18, true, true, undeniableDeathRegular, deathHorizontal, 1200, 0, 0, 0, 1.12, .25, 0, 0, null, null, null, null, null),
  new SpriteCreator(19, true, true, undeniableDeathRegular, deathVertical, 1200, 0, 0, 0, .25, .8, 0, 0, null, null, null, null, null),
  new SpriteCreator(20, true, true, undeniableDeathRegular, deathHorizontal, 1830, 500, 0, 0, .3, .25, 0, 0, null, null, null, null, null),
  new SpriteCreator(21, true, true, undeniableDeathRegular, deathHorizontal, 1240, 1080, 0, 0, .3, .25, 0, 0, null, null, null, null, null),
  //Entry Way to Left Side of the Map
  new SpriteCreator(22, true, true, undeniableDeathRegular, deathHorizontal, 0, 0, 0, 0, .507, .25, 0, 0, null, null, null, null, null),
  new SpriteCreator(23, true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .25, .82, 0, 0, null, null, null, null, null),
  //////////////////////////////Blocking Entrance to Level 3///////////////////(Spikes)
  new SpriteCreator(24, true, true, spikesRegular, spikesVertical, 2800, 2573, 0, 0, .6, .4, 0, 0, 0, null, null, null, null)
];

/////////////////////////Creation of ImmovableWalls
level_1.immovableWallSpawn = [
  //Ground
  new SpriteCreator(0, true, true, immovableWallRegular, immovableWallHorizontal, 300, 3136, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Vertical Wall Connector to Level 0
  new SpriteCreator(1, true, true, immovableWallRegular, immovableWallVertical, 0, 2772, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Mini Box (First Instance of Immovable Wall Destroying Regular Wall)
  new SpriteCreator(2, true, true, immovableWallKillWall, immovableWallVertical, 1062.5, 2600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  //Top of First Grey Ledge
  new SpriteCreator(3, true, true, immovableWallRegular, immovableWallHorizontal, 430, 1690, 0, 0, 1.17, .5, 0, 0, null, null, null, null, null),
  //End of Grey Ledge
  new SpriteCreator(4, true, true, immovableWallRegular, immovableWallHorizontal, 0, 1336.5, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //End of Green Ledge
  new SpriteCreator(5, true, true, immovableWallRegular, immovableWallHorizontal, 1591, 1500, 0, 0, .774, .5, 0, 0, null, null, null, null, null),
  //Entry to Right Side of the Map
  new SpriteCreator(6, true, true, immovableWallRegular, immovableWallHorizontal, 2200, 3136, 0, 0, .7, .5, 0, 0, null, null, null, null, null),
  //Long Pole
  new SpriteCreator(7, true, true, immovableWallRegular, immovableWallVertical, 2500, 400, 0, 0, .4, 3, 0, 0, null, null, null, null, null),
  ///////////////////////////////////Second Wall That Gets Removed From Level 3//////////////////////
  new SpriteCreator(8, true, true, immovableWallRegular, immovableWallHorizontal, 773, 0, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  /////////////////////////////////////First Wall That Gets Removed From Level 2//////////////////////
  new SpriteCreator(9, true, true, immovableWallRegular, immovableWallHorizontal, 773, 300, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Divider
  new SpriteCreator(10, true, true, immovableWallRegular, immovableWallVertical, 710, 0, 0, 0, .5, .8, 0, 0, null, null, null, null, null),
  //Divider 2
  new SpriteCreator(11, true, true, immovableWallRegular, immovableWallVertical, 425, 600, 0, 0, .5, .87, 0, 0, null, null, null, null, null),
  //Mini Walls At The End
  new SpriteCreator(12, true, true, immovableWallRegular, immovableWallVertical, 400, 400, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(13, true, true, immovableWallRegular, immovableWallVertical, 600, 600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(14, true, true, immovableWallRegular, immovableWallVertical, 600, 400, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(15, true, true, immovableWallRegular, immovableWallVertical, 700, 500, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(16, true, true, immovableWallRegular, immovableWallVertical, 300, 1000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_1.wallSpawn = [
  //Before Grey
  new SpriteCreator(0, true, true, wallRegular, wallHorizontal, 1100, 3000, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //After BLue
  new SpriteCreator(1, true, true, wallRegular, wallHorizontal, 1100, 1250, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Kill These
  new SpriteCreator(2, true, true, wallRegular, wallHorizontal, 250, 600, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(3, true, true, wallRegular, wallHorizontal, 250, 700, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, wallRegular, wallHorizontal, 250, 800, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(5, true, true, wallRegular, wallHorizontal, 250, 900, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(6, true, true, wallRegular, wallHorizontal, 250, 1000, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(7, true, true, wallRegular, wallHorizontal, 250, 1100, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
];

//Ledges
level_1.ledgeSpawn = [
  //Elevator
  new SpriteCreator(0, true, true, elevator, ledgeElevator, 100, 2600, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(1, true, true, elevator, ledgeElevator, 1080, 2200, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  //Bounce Ledges
  new SpriteCreator(2, true, true, bounce, ledgeBounce, 1525, 3000, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(3, true, true, bounce, ledgeBounce, 1700, 2200, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, bounce, ledgeBounce, 1900, 2700, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(5, true, true, bounce, ledgeBounce, 2100, 2000, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  //Surf Ledges
  new SpriteCreator(5, true, true, surf, ledgeSurf, 2270, 300, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
];

//Ball
level_1.ballSpawn = [new SpriteCreator(0, true, true, ballRegular, ball, 975, 200, 0, 0, null, null, 0, 0, null, null, null, null, null)];

//Text Creator (Helpful Hints)
level_1.text = [
  //Entry to Level 0
  new textCreator(0, 100, 3150, "Level 0 ↓", 'Arial Black', 25, '#ffffff', 'bold'),
  //Camera Mode
  new textCreator(1, 80, 2800, "Press 4 to Toggle Free-Look (WASD to Move)", 'Arial Black', 25, '#ffffff', 'bold'),
  //Flag Respawn
  new textCreator(2, 400, 3000, 'Flags are Respawn Checkpoints', 'Arial Black', 25, '#ffffff', 'bold'),
  //Grey Ledge Tutorial
  new textCreator(3, 900, 2300, "Pull the Grey Ledge Towards You\n\nGet on Top of the Grey Ledge", 'Arial Black', 25, '#ffffff', 'bold'),
  //Where to Land Grey Ledge
  new textCreator(4, 300, 1900, "Jump Down to the Grey Ledge at the Bottom", 'Arial Black', 25, '#ffffff', 'bold'),
  //Green Ledge Tutorial
  new textCreator(5, 900, 1525, "Trust the Green Ledges at the Bottom", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(6, 1500, 1600, "↓", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(8, 1600, 3000, "Green Ledges Make You Bounce", 'Arial Black', 25, '#ffffff', 'bold'),
  //Blue Ledge Tutorial
  new textCreator(9, 1500, 200, "You Can Surf Blue Ledges\n\nBe Warned They Are Unstable\n\nLand Perfectly in the Middle of the Blue Ledge\n\nHint: Holding S Can Let You Surf On Top of Objects", 'Arial Black', 25, '#ffffff', 'bold'),
  //Kill Instructions
  new textCreator(10, 100, 200, "Press 3 to Access Kill Gun\n\nAny Object that is Moveable can be Killed", 'Arial Black', 25, '#ffffff', 'bold'),
  //These Kill Walls
  new textCreator(11, 1150, 2600, "These Kill Walls", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(12, 1700, 1300, "Properties of Objects Can Be Changed\n\nDepending What Hits It", 'Arial Black', 25, '#ffffff', 'bold'),
];

level_1.flagSpawn = [
  new SpriteCreator(0, true, true, regularFlag, flag, 600, 3050, 0, 0, .4, .4, 0, 0, null, null, null, null, 1),
  new SpriteCreator(1, true, true, regularFlag, flag, 2500, 3050, 0, 0, .4, .4, 0, 0, null, null, null, null, 3),
  new SpriteCreator(2, true, true, regularFlag, flag, 200, 1250, 0, 0, .4, .4, 0, 0, null, null, null, null, 2),
]

//Push Level 1 Into World Class Array
worldClassLevels.push(level_1);

////////////////////////////////////////Level 2/////////////////////////////////////
var level_2 = new LevelCreator("Level 2-CL", 4800, 800, new MetroidvaniaCreator(3, 0, 4, 800, 1, 1, 1, 4800), '#80235b');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(200, 100),
  new PlayerPositionCreator(200, 380),
  new PlayerPositionCreator(4700, 750),
]

///////////////////////Creation of Undeniable Death

level_2.undeniableDeathSpawn = [
  //Bottom At The End of the Map (INVISIBLE)
  new SpriteCreator(0, true, true, undeniableDeathRegular, deathHorizontal, 0, 4100, 0, 0, .5, .1, 0, 0, null, null, null, null, null),
  //Top of Map
  new SpriteCreator(1, true, true, undeniableDeathRegular, deathHorizontal, 300, 0, 0, 0, 3.215, .1, 0, 0, null, null, null, null, null),
  //Long Pit (Under Vertical Moveable Wall)
  new SpriteCreator(2, true, true, undeniableDeathRegular, deathHorizontal, 1406.5, 4100, 0, 0, .995, .1, 0, 0, null, null, null, null, null),
  //Bottom Beginning of the Map
  new SpriteCreator(3, true, true, undeniableDeathRegular, deathHorizontal, 3506, 4100, 0, 0, .4169, .1, 0, 0, null, null, null, null, null),
  //Spike of Death At Bottom to Prevent Glitch
  new SpriteCreator(4, true, true, undeniableDeathRegular, deathHorizontal, 0, 800, 0, 0, 3.45, .1, 0, 0, null, null, null, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_2.immovableWallSpawn = [
  //Border of Level One and Level Two
  new SpriteCreator(0, true, true, immovableWallRegular, immovableWallVertical, 4800, 0, 0, 0, .3, .7, 0, 0, null, null, null, null, null),
  //Ground
  new SpriteCreator(1, true, true, immovableWallRegular, immovableWallHorizontal, 4100, 800, 0, 0, .83, .5, 0, 0, null, null, null, null, null),
  //Wall Blocking First Ground
  new SpriteCreator(2, true, true, immovableWallRegular, immovableWallVertical, 4090, 100, 0, 0, .5, .83, 0, 0, null, null, null, null, null),
  //Wall With Little Hole
  new SpriteCreator(3, true, true, immovableWallKillWall, immovableWallVertical, 3300, 0, 0, 0, .5, .83, 0, 0, null, null, null, null, null),
  //Past Max Jump
  new SpriteCreator(4, true, true, immovableWallRegular, immovableWallHorizontal, 2800, 800, 0, 0, .83, .5, 0, 0, null, null, null, null, null),
  //Ground Past Vertical Moveable Wall
  new SpriteCreator(5, true, true, immovableWallRegular, immovableWallHorizontal, 700, 800, 0, 0, .83, .5, 0, 0, null, null, null, null, null),
  //Divider At The End
  new SpriteCreator(6, true, true, immovableWallRegular, immovableWallVertical, 300, 0, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Ground For the Flag
  new SpriteCreator(7, true, true, immovableWallRegular, immovableWallHorizontal, 128, 388.3, 0, 0, .276, .297, 0, 0, null, null, null, null, null),
  //Border At the ENd of the Level
  new SpriteCreator(8, true, true, immovableWallRegular, immovableWallVertical, 0, 0, 0, 0, .3, .93, 0, 0, null, null, null, null, null),
  //First Phase Wall
  new SpriteCreator(9, true, true, immovableWallPhase, immovableWallVertical, 300, 426, 0, 0, .5, .418, null, null, null, null, null)
];

//Moveable Walls
///Single Wall to Teach You  
level_2.wallSpawn = [
  //Before Grey
  new SpriteCreator(0, true, true, wallRegular, wallHorizontal, 4500, 400, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(0, true, true, wallRegular, wallVertical, 2000, 400, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
];


//Enemy Spawn
level_2.enemySpawn = [
  //First Three Enemies
  new SpriteCreator(0, true, true, enemyRegular, enemyOne, 4300, 200, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(1, true, true, enemyRegular, enemyOne, 4500, 200, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(2, true, true, enemyRegular, enemyOne, 4700, 200, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Blocking the First Entrance
  new SpriteCreator(3, true, true, enemyRegular, enemyOne, 4125, 50, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Maximum Jump Enemy
  new SpriteCreator(4, true, true, enemyRegular, enemyOne, 3500, 500, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Four Enemies of the Gate
  new SpriteCreator(5, true, true, enemyRegular, enemyOne, 1000, 50, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(6, true, true, enemyRegular, enemyOne, 1000, 250, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(7, true, true, enemyRegular, enemyOne, 1000, 450, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(8, true, true, enemyRegular, enemyOne, 1000, 650, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Last Enemy
  new SpriteCreator(9, true, true, enemyRegular, enemyOne, 600, 600, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
]

//Falling Spikes
level_2.fallingSpikes = [
  new SpriteCreator(0, true, true, spikeRegular, spikeFall, 475, 50, null, null, .4, .4, 0, 500, null, null, null, 3, null),
]

//Flag Spawn
level_2.flagSpawn = [
  new SpriteCreator(0, true, true, regularFlag, flag, 4550, 650, 0, 0, .4, .4, 0, 0, null, null, null, null, 3),
  new SpriteCreator(1, true, true, regularFlag, flag, 220, 250, 0, 0, .4, .4, 0, 0, 1, 1, 9, null, 2),
  //Test
  // new SpriteCreator(1, true, true, regularFlag, flag, 4600, 650, 0, 0, .4, .4, 0, 0, 1, 1, 9, null, 2),
]

//Text Creator (Helpful Hints)
level_2.text = [
  //Entry to Level 1
  new textCreator(0, 4650, 650, "Level 1 →", 'Arial Black', 25, '#ffffff', 'bold'),
  //WolfGang Kill Them
  new textCreator(1, 4250, 450, "Kill Them Before They Kill You", 'Arial Black', 25, '#ffffff', 'bold'),
  //Camera Mode
  new textCreator(2, 2400, 400, "Learn How to Do the Free-Look Shot\n\nBullets Are Killed Off Screen\n\nFollow The Bullet\n\nPress 4 For Free Look (WASD Movement)", 'Arial Black', 25, '#ffffff', 'bold'),
  //Phase Wall
  new textCreator(3, 400, 400, "These Purple Walls Are Killed\n\nBy Enemy Bullets\n\nOh Yeah Falling Spikes Kill You Too", 'Arial Black', 25, '#ffffff', 'bold'),
];

//Push Level 2 Into World Class Array
worldClassLevels.push(level_2);


////////////////////////////////////////Level 3/////////////////////////////////////(Testing Ground)
var level_3 = new LevelCreator("Level 3-PlayGround", 1400, 800, new MetroidvaniaCreator(null, null, 2, 800, null, null, null, null), '#80235b');

// level_3.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(400, 700), //400/700
  new PlayerPositionCreator(200, 700),
  new PlayerPositionCreator(1400, 700),
]

///////////////////////Creation of Undeniable Death

level_3.undeniableDeathSpawn = [
  //Bottom At The End of the Map (INVISIBLE)
  new SpriteCreator(0, true, true, undeniableDeathRegular, deathVertical, 1400, 0, 0, 0, .1, .5, 100, 0, null, null, null, null, null),
  new SpriteCreator(0, true, true, undeniableDeathRegular, deathVertical, 0, 0, 0, 0, .1, .5, 100, 0, null, null, null, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_3.immovableWallSpawn = [
  //Ground
  new SpriteCreator(0, true, true, immovableWallRegular, immovableWallHorizontal, 300, 800, 0, 0, 1.2, .25, 0, 0, null, null, null, null, null),
  // //Testing
  // new SpriteCreator(0, true, true, immovableWallRegular, immovableWallVertical, 200, 250, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_3.wallSpawn = [
  new SpriteCreator(0, true, true, wallRegular, wallHorizontal, 600, 200, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  // new SpriteCreator(1, true, true, wallGhost, wallHorizontal, 600, 400, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  // new SpriteCreator(2, true, true, wallGhost, wallHorizontal, 600, 600, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  // new SpriteCreator(3, true, true, wallGhost, wallHorizontal, 600, 750, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
];

//Ledges
level_3.ledgeSpawn = [
  // //Elevator
  new SpriteCreator(0, true, true, elevator, ledgeElevator, 200, 700, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  // //Bounce Ledges
  // new SpriteCreator(2, true, true, bounce, ledgeBounce, 600, 400, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  //Surf Ledges
  // new SpriteCreator(5, true, true, surf, ledgeSurf, 200, 200, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
];

//Enemy Spawn
// level_3.enemySpawn = [
//   // //First Three Enemies
//   new SpriteCreator(0, true, true, enemyRegular, enemyOne, 400, 200, 0, 0, .5, .5, null, null, null, null, null),
// ];

//Ball
level_3.ballSpawn = [
  new SpriteCreator(0, true, true, ballRegular, ball, 900, 200, 0, 0, null, null, 0, 0, null, null, null, null, null)
];

//Falling Spikes
// level_3.fallingSpikes = [
//   new SpriteCreator(0, true, true, spikeRegular, spikeFall, 475, 50, null, null, .4, .4, 0, 500, null, null, null, 3, null),
// ]

//Flag Spawn
// level_3.flagSpawn = [
//   new SpriteCreator(0, true, true, regularFlag, flag, 4550, 650, 0, 0, .4, .4, 0, 0, null, null, null, null, 3),
//   new SpriteCreator(1, true, true, regularFlag, flag, 220, 250, 0, 0, .4, .4, 0, 0, 1, 1, 9, null, 2),
//   //Test
//   // new SpriteCreator(1, true, true, regularFlag, flag, 4600, 650, 0, 0, .4, .4, 0, 0, 1, 1, 9, null, 2),
// ]

//Text Creator (Helpful Hints)
// level_3.text = [
//   //Entry to Level 1
//   new textCreator(0, 4650, 650, "Level 1 →", 'Arial Black', 25, '#ffffff', 'bold'),
//   //WolfGang Kill Them
//   new textCreator(1, 4250, 450, "Kill Them Before They Kill You", 'Arial Black', 25, '#ffffff', 'bold'),
//   //Camera Mode
//   new textCreator(2, 2400, 400, "Learn How to Do the Free-Look Shot\n\nBullets Are Killed Off Screen\n\nFollow The Bullet\n\nPress 4 For Free Look (WASD Movement)", 'Arial Black', 25, '#ffffff', 'bold'),
//   //Phase Wall
//   new textCreator(3, 400, 400, "These Purple Walls Are Killed\n\nBy Enemy Bullets\n\nOh Yeah Falling Spikes Kill You Too", 'Arial Black', 25, '#ffffff', 'bold'),
// ];

//Push Level 2 Into World Class Array
worldClassLevels.push(level_3);

///////////////Reference Code/////////////
// function moveTowardsPlayer(sprite1, player) {
//   //   if (game.physics.arcade.distanceBetween(sprite1, player, false, true) < 500) {
//   //     /////Alpha Build One/////
//   //     //At the very least we can use the daakath game mode for this.
//   //     game.physics.arcade.moveToObject(sprite1, player, 300);
//   //     /////Alpha Build Two/////
//   //     //game.physics.arcade.moveToXY(sprite1, player.x, player.y, 60, 2000);
//   //   }
//   // }

///////////////////////////////Player vs. Wall//////////////////
///////////Leaner Walls///////////
// function playerVsWall(player, wall) {
//     console.log(player.body.overlapX, player.body.overlapY, 'playerOverlap');
//     if (player.body.overlapX < 0) {
//       player.body.velocity.x = 1000;
//     }
//     else {
//       player.body.velocity.x = 1000;
//     }
// }