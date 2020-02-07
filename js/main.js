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
game.state.add('practiceEnvironment', brawl.practiceEnvironment);
game.state.add('gameOn', brawl.gameOn);
game.state.add('controlScreen', brawl.stateControls);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
game.state.start('mainMenu');
//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////
//Weapon Variables to Change Bullet Type
var pullBoolean = false;
var pushBoolean = false;
var stopBoolean = false;

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
////////////////////////////////////////////Class Declaration//////////////////////////////////////////////
//Level Holder
var worldClassLevels = [];
//Creates Each Individual Level
class LevelCreator {
  constructor(worldName, xOfWorld, yOfWorld, metroidvania) {
    this.worldName = worldName;
    this.xOfWorld = xOfWorld;
    this.yOfWorld = yOfWorld;
    this.metroidvania = metroidvania;
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

//Creates the Sprite Properties
class SpriteCreator {
  constructor(positionInArray, trigger, visible, type, art, x, y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY, specialCondition, specialWorld, specialArray, seconds, indexOfPlayerPosition) {
    this.positionInArray = positionInArray;
    this.trigger = trigger;
    this.visible = visible;
    this.type = type;
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
/*
//Position, Trigger, Visible, Type, Art, X, Y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY
//SpecialCondition, SpecialWorld, SpecialArray, Seconds, indexOfPlayerPosition
*/

///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator("Level 0", 2800, 2400, new MetroidvaniaCreator(1, 100, 0, 2400, 0, 1, 0, 2800));

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(200, 0),
  new PlayerPositionCreator(300, 2200),
  new PlayerPositionCreator(200, 400),
  new PlayerPositionCreator(1400, 400),
]

///////////////////////Creation of Undeniable Death

level_0.undeniableDeathSpawn = [
  new SpriteCreator(0, true, true, 'undeniableDeathRegular', 'deathVertical', 0, 1470, 0, 0, .25, .619, 0, 0, null, null, null, null, null),
  new SpriteCreator(1, true, true, 'undeniableDeathRegular', 'deathVertical', 2800, 0, 0, 0, .25, .857, 0, 0, null, null, null, null, null),
  new SpriteCreator(2, true, true, 'undeniableDeathRegular', 'deathVertical', 2800, 1263, 0, 0, .25, .767, 0, 0, null, null, null, null, null),
  new SpriteCreator(3, true, true, 'undeniableDeathRegular', 'deathHorizontal', 1463, 900, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, 'undeniableDeathRegular', 'deathHorizontal', 2060, 300, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(5, true, true, 'undeniableDeathRegular', 'deathHorizontal', 1400, 0, 0, 0, 1, .5, 0, 0, null, null, null, null, null)
];

/////////////////////////Creation of ImmovableWalls
level_0.immovableWallSpawn = [
  //Ground
  new SpriteCreator(0, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 0, 2400, 0, 0, 3.29, .5, 0, 0, null, null, null, null, null),
  //Practice Jump Levels
  new SpriteCreator(1, true, true, 'immovableWallRegular', 'immovableWallVertical', 700, 2210, 0, 0, .4, .15, 0, 0, null, null, null, null, null),
  new SpriteCreator(2, true, true, 'immovableWallRegular', 'immovableWallVertical', 1700, 1910, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Tiny Box Practice Upside Down Jump
  new SpriteCreator(3, true, true, 'immovableWallRegular', 'immovableWallVertical', 2500, 2200, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, 'immovableWallRegular', 'immovableWallVertical', 2500, 1800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(5, true, true, 'immovableWallRegular', 'immovableWallVertical', 2700, 2000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(6, true, true, 'immovableWallRegular', 'immovableWallVertical', 2700, 1600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(7, true, true, 'immovableWallRegular', 'immovableWallVertical', 2700, 1375, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  //The Box
  new SpriteCreator(8, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 2375, 1200, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(9, true, true, 'immovableWallRegular', 'immovableWallVertical', 1400, 300, 0, 0, .5, 1.3, 0, 0, null, null, null, null, null),
  new SpriteCreator(10, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 0, 1407, 0, 0, 1.72, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(11, true, true, 'immovableWallRegular', 'immovableWallVertical', 0, 0, 0, 0, .5, 1.653, 0, 0, null, null, null, null, null),
  new SpriteCreator(12, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 400, 1200, 0, 0, .9, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(13, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 63, 800, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(14, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 974, 500, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(15, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 63, 300, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(16, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 700, 600, 0, 0, .4, .5, 0, 0, null, null, null, null, null),
  new SpriteCreator(17, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 400, 500, 0, 0, .4, .5, 0, 0, null, null, null, null, null),
  //Tiny Boxes Inside THE BOX
  new SpriteCreator(18, true, true, 'immovableWallRegular', 'immovableWallVertical', 200, 950, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(19, true, true, 'immovableWallRegular', 'immovableWallVertical', 200, 1150, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(20, true, true, 'immovableWallRegular', 'immovableWallVertical', 500, 1000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(21, true, true, 'immovableWallRegular', 'immovableWallVertical', 600, 800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(22, true, true, 'immovableWallRegular', 'immovableWallVertical', 700, 775, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(23, true, true, 'immovableWallRegular', 'immovableWallVertical', 800, 700, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(24, true, true, 'immovableWallRegular', 'immovableWallVertical', 800, 900, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(25, true, true, 'immovableWallRegular', 'immovableWallVertical', 800, 1100, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(26, true, true, 'immovableWallRegular', 'immovableWallVertical', 1000, 800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(27, true, true, 'immovableWallRegular', 'immovableWallVertical', 1000, 600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(28, true, true, 'immovableWallRegular', 'immovableWallVertical', 1100, 1000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(29, true, true, 'immovableWallRegular', 'immovableWallVertical', 1100, 600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(30, true, true, 'immovableWallRegular', 'immovableWallVertical', 1200, 1100, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(31, true, true, 'immovableWallRegular', 'immovableWallVertical', 1200, 800, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_0.wallSpawn = [new SpriteCreator(0, true, true, 'wallRegular', 'wallHorizontal', 1900, 1100, 0, 0, .5, .5, 0, 0, null, null, null, null, null)];

//Spikes
//Blocking Entrance to Level 1 (SPECIAL SPRITE)
level_0.spikeSpawn = [new SpriteCreator(0, true, true, 'spikesRegular', 'spikesHorizontalOne', 0, 0, 0, 0, 1, 1, 0, 0, 0, null, null, null, null)];
//Special Sprite (Removed From Game Once Killed);

//Ball
level_0.ballSpawn = [new SpriteCreator(0, true, true, 'ballRegular', 'ball', 700, 1350, 0, 0, null, null, 0, 0, null, null, null, null, null)];

//Text Creator (Helpful Hints)
level_0.text = [
  new textCreator(0, 100, 2000, "W or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right\nTapping Twice on the Jump Button Lets You Double Jump\nJump Over the Wall", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(1, 100, 1700, "Red is Death", 'Times New Roman', 30, "#FF0000", 'bold'),
  new textCreator(2, 1300, 1650, "You Automatically Stick on Surfaces When You Jump on It\nPress A or D while on the Wall to Jump Off It\nWhile in the Air Move Towards the Wall to Stick to it Again\nKeep Jumping Off and Moving Again Towards the Wall to Climb Over\nTry Holding D While Tapping A while on Sticking on the Left Side of the Wall", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(3, 1800, 2000, "You Can Stick and Move on the Bottom of Surfaces\nPress S to go Downwards or Push\n\nWhenever You Touch A Surface You Can Double Jump Again", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(4, 1550, 1200, "Press 1 to Access Pull Gun\nUse Mouse to Aim and Left Click to Shoot\nAny Object that is Moveable Can Be Pulled\n\nSurf the Grey Wall to the Top Using the Pull Gun\nHint: Jump While Shooting At the Grey Wall While Riding It", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(5, 750, 1265, "Press 2 to Use the Stop Gun\nBalls Destroy Enemies and Traps\nDestroy the Spikes\nAny Object that is Moveable Can be Stopped", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(6, 400, 200, "As Long as the Ball Touches Any Part of the Spikes", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(7, 100, 25, "Level 1 ↑", 'Arial Black', 25, '#ffffff', 'bold'),
];

//Push to worldClassLevelsGlobalArray
worldClassLevels.push(level_0);

///////////////////////////////////////////Level 1/////////////////////////////////////////////////////////////
var level_1 = new LevelCreator("Level 1", 2800, 3200, new MetroidvaniaCreator(4, 0, 0, 3200, 2, 1, 3, 2800));

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
  new SpriteCreator(0, true, true, 'undeniableDeathRegular', 'deathHorizontal', 725, 3170, 0, 0, .5, .4, 0, 0, null, null, null, null, null),
  //Top of the Yellow at the Bottom
  new SpriteCreator(1, true, true, 'undeniableDeathRegular', 'deathHorizontal', 0, 2691, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Border of First Half
  new SpriteCreator(2, true, true, 'undeniableDeathRegular', 'deathVertical', 1425, 1700, 0, 0, .25, 1.08, 0, 0, null, null, null, null, null),
  //Connector to top of yellow
  new SpriteCreator(3, true, true, 'undeniableDeathRegular', 'deathVertical', 700, 2000, 0, 0, .25, .714, 0, 0, null, null, null, null, null),
  //Preventing Grey Cheese
  new SpriteCreator(4, true, true, 'undeniableDeathRegular', 'deathHorizontal', 150, 1690, 0, 0, .2, .39, 0, 0, null, null, null, null, null),
  //Border Slim Left Side
  new SpriteCreator(5, true, true, 'undeniableDeathRegular', 'deathVertical', 0, 1400, 0, 0, .3, .922, 0, 0, null, null, null, null, null),
  //Next to Wall at the End of Grey Phase
  new SpriteCreator(6, true, true, 'undeniableDeathRegular', 'deathHorizontal', 426, 1336.5, 0, 0, .8029, .395, 0, 0, null, null, null, null, null),
  //Entryway to the Green Ledge
  new SpriteCreator(7, true, true, 'undeniableDeathRegular', 'deathVertical', 1550, 1336.5, 0, 0, .25, .714, 0, 0, null, null, null, null, null),
  //Connector to the right side of the map
  new SpriteCreator(8, true, true, 'undeniableDeathRegular', 'deathHorizontal', 1465, 3170, 0, 0, .5249, .4, 0, 0, null, null, null, null, null),
  //Final Hurdles Till You Get Respawn Twin Primes
  new SpriteCreator(9, true, true, 'undeniableDeathRegular', 'deathVertical', 2150, 2000, 0, 0, .25, .811, 0, 0, null, null, null, null, null),
  new SpriteCreator(10, true, true, 'undeniableDeathRegular', 'deathVertical', 2250, 500, 0, 0, .25, 1.5, 0, 0, null, null, null, null, null),
  new SpriteCreator(11, true, true, 'undeniableDeathRegular', 'deathVertical', 2800, 0, 0, 0, .25, 1.837, 0, 0, null, null, null, null, null),
  //Long Pole Death
  new SpriteCreator(12, true, true, 'undeniableDeathRegular', 'deathVertical', 2495, 600, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(13, true, true, 'undeniableDeathRegular', 'deathVertical', 2495, 1000, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(14, true, true, 'undeniableDeathRegular', 'deathVertical', 2495, 1400, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(15, true, true, 'undeniableDeathRegular', 'deathVertical', 2495, 1800, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(16, true, true, 'undeniableDeathRegular', 'deathVertical', 2495, 2200, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  new SpriteCreator(17, true, true, 'undeniableDeathRegular', 'deathVertical', 2495, 2600, 0, 0, .375, .03, 0, 0, null, null, null, null, null),
  //Blue Ledge Past Long Pole of Death
  new SpriteCreator(18, true, true, 'undeniableDeathRegular', 'deathHorizontal', 1200, 0, 0, 0, 1.12, .25, 0, 0, null, null, null, null, null),
  new SpriteCreator(19, true, true, 'undeniableDeathRegular', 'deathVertical', 1200, 0, 0, 0, .25, .8, 0, 0, null, null, null, null, null),
  new SpriteCreator(20, true, true, 'undeniableDeathRegular', 'deathHorizontal', 1830, 500, 0, 0, .3, .25, 0, 0, null, null, null, null, null),
  new SpriteCreator(21, true, true, 'undeniableDeathRegular', 'deathHorizontal', 1240, 1080, 0, 0, .3, .25, 0, 0, null, null, null, null, null),
  //Entry Way to Left Side of the Map
  new SpriteCreator(22, true, true, 'undeniableDeathRegular', 'deathHorizontal', 0, 0, 0, 0, .507, .25, 0, 0, null, null, null, null, null),
  new SpriteCreator(23, true, true, 'undeniableDeathRegular', 'deathVertical', 0, 0, 0, 0, .25, .82, 0, 0, null, null, null, null, null),
];

/////////////////////////Creation of ImmovableWalls
level_1.immovableWallSpawn = [
  //Ground
  new SpriteCreator(0, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 300, 3136, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Vertical Wall Connector to Level 0
  new SpriteCreator(1, true, true, 'immovableWallRegular', 'immovableWallVertical', 0, 2772, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Mini Box (First Instance of Immovable Wall Destroying Regular Wall)
  new SpriteCreator(2, true, true, 'immovableWallKillWall', 'immovableWallVertical', 1062.5, 2600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  //Top of First Grey Ledge
  new SpriteCreator(3, true, true, 'immovableWallKillWall', 'immovableWallHorizontal', 430, 1690, 0, 0, 1.17, .5, 0, 0, null, null, null, null, null),
  //End of Grey Ledge
  new SpriteCreator(4, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 0, 1336.5, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //End of Green Ledge
  new SpriteCreator(5, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 1591, 1336, 0, 0, .774, .5, 0, 0, null, null, null, null, null),
  //Entry to Right Side of the Map
  new SpriteCreator(6, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 2200, 3136, 0, 0, .7, .5, 0, 0, null, null, null, null, null),
  //Long Pole
  new SpriteCreator(7, true, true, 'immovableWallRegular', 'immovableWallVertical', 2500, 400, 0, 0, .4, 3, 0, 0, null, null, null, null, null),
  ///////////////////////////////////Second Wall That Gets Removed From Level 3//////////////////////
  new SpriteCreator(8, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 773, 0, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  /////////////////////////////////////First Wall That Gets Removed From Level 2//////////////////////
  new SpriteCreator(9, true, true, 'immovableWallRegular', 'immovableWallHorizontal', 773, 300, 0, 0, .5, .5, 0, 0, null, null, null, null, null),
  //Divider
  new SpriteCreator(10, true, true, 'immovableWallRegular', 'immovableWallVertical', 710, 0, 0, 0, .5, .8, 0, 0, null, null, null, null, null),
  //Divider 2
  new SpriteCreator(11, true, true, 'immovableWallRegular', 'immovableWallVertical', 425, 600, 0, 0, .5, .87, 0, 0, null, null, null, null, null),
  //Mini Walls At The End
  new SpriteCreator(12, true, true, 'immovableWallRegular', 'immovableWallVertical', 400, 400, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(13, true, true, 'immovableWallRegular', 'immovableWallVertical', 600, 600, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(14, true, true, 'immovableWallRegular', 'immovableWallVertical', 600, 400, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(15, true, true, 'immovableWallRegular', 'immovableWallVertical', 700, 500, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
  new SpriteCreator(16, true, true, 'immovableWallRegular', 'immovableWallVertical', 300, 1000, 0, 0, .3, .05, 0, 0, null, null, null, null, null),
];

//Moveable Walls
///Single Wall to Teach You  
level_1.wallSpawn = [
  //Before Grey
  new SpriteCreator(0, true, true, 'wallRegular', 'wallHorizontal', 1100, 3000, 0, 0, .5, .5, null, null, null, null, null),
  //After BLue
  new SpriteCreator(1, true, true, 'wallRegular', 'wallHorizontal', 1100, 1250, 0, 0, .5, .5, null, null, null, null, null),
  //Kill These
  new SpriteCreator(2, true, true, 'wallRegular', 'wallHorizontal', 250, 600, 0, 0, .5, .5, null, null, null, null, null),
  new SpriteCreator(3, true, true, 'wallRegular', 'wallHorizontal', 250, 700, 0, 0, .5, .5, null, null, null, null, null),
  new SpriteCreator(4, true, true, 'wallRegular', 'wallHorizontal', 250, 800, 0, 0, .5, .5, null, null, null, null, null),
  new SpriteCreator(5, true, true, 'wallRegular', 'wallHorizontal', 250, 900, 0, 0, .5, .5, null, null, null, null, null),
  new SpriteCreator(6, true, true, 'wallRegular', 'wallHorizontal', 250, 1000, 0, 0, .5, .5, null, null, null, null, null),
  new SpriteCreator(7, true, true, 'wallRegular', 'wallHorizontal', 250, 1100, 0, 0, .5, .5, null, null, null, null, null),
];

//Spikes
//////////////////////////////Blocking Entrance to Level 3///////////////////////
level_1.spikeSpawn = [new SpriteCreator(0, true, true, 'spikesRegular', 'spikesVertical', 2800, 2853, 0, 0, .6, .4, 0, 0, 0, null, null, null, null)];//Special Sprite (Removed From Game Once Killed);

//Ledges
level_1.ledgeSpawn = [
  //Elevator
  new SpriteCreator(0, true, true, 'elevator', 'ledgeElevator', 100, 2600, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(1, true, true, 'elevator', 'ledgeElevator', 1080, 2200, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  //Bounce Ledges
  new SpriteCreator(2, true, true, 'bounce', 'ledgeBounce', 1525, 3000, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(3, true, true, 'bounce', 'ledgeBounce', 1700, 2200, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(4, true, true, 'bounce', 'ledgeBounce', 1900, 2700, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  new SpriteCreator(5, true, true, 'bounce', 'ledgeBounce', 2100, 2000, 0, 0, .4, .4, 0, 0, null, null, null, null, null),
  //Surf Ledges
  new SpriteCreator(5, true, true, 'surf', 'ledgeSurf', 2270, 300, 0, 0, .4, .4, 0, 0, null, null, null, null, null)
];

//Ball
level_1.ballSpawn = [new SpriteCreator(0, true, true, 'ballRegular', 'ball', 975, 200, 0, 0, null, null, 0, 0, null, null, null, null, null)];

//Text Creator (Helpful Hints)
level_1.text = [
  //Entry to Level 0
  new textCreator(0, 100, 3150, "Level 0 ↓", 'Arial Black', 25, '#ffffff', 'bold'),
  //Camera Mode
  new textCreator(1, 80, 2800, "Press 4 to Toggle Free-Look (WASD to Move)", 'Arial Black', 25, '#ffffff', 'bold'),
  //Flag Respawn
  new textCreator(2, 400, 3000, 'Flags are Respawn Checkpoints', 'Arial Black', 25, '#ffffff', 'bold'),
  //Grey Ledge Tutorial
  new textCreator(3, 900, 2300, "Get on Top of the Grey Ledge\n\nPull the Grey Ledge Towards You", 'Arial Black', 25, '#ffffff', 'bold'),
  //Where to Land Grey Ledge
  new textCreator(4, 300, 1900, "Jump Down to the Grey Ledge at the Bottom", 'Arial Black', 25, '#ffffff', 'bold'),
  //Green Ledge Tutorial
  new textCreator(5, 900, 1525, "Trust the Green Ledges at the Bottom", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(6, 1500, 1600, "↓", 'Arial Black', 25, '#ffffff', 'bold'),
  new textCreator(8, 1600, 3000, "Green Ledges Make You Bounce", 'Arial Black', 25, '#ffffff', 'bold'),
  //Blue Ledge Tutorial
  new textCreator(9, 1500, 200, "You Can Surf Blue Ledges\n\nBe Warned They Are Unstable\n\nLand Perfectly in the Middle of the Blue Ledge\n\nHint: Hold S When Surfing", 'Arial Black', 25, '#ffffff', 'bold'),
  //Kill Instructions
  new textCreator(10, 100, 200, "Press 3 to Access Kill Gun\n\nAny Object that is Moveable can be Killed", 'Arial Black', 25, '#ffffff', 'bold'),
];

level_1.flagSpawn = [
  new SpriteCreator(0, true, true, 'regularFlag', 'flag', 600, 3050, 0, 0, .4, .4, 0, 0, null, null, null, null, 1),
  new SpriteCreator(1, true, true, 'regularFlag', 'flag', 2500, 3050, 0, 0, .4, .4, 0, 0, null, null, null, null, 3),
  new SpriteCreator(2, true, true, 'regularFlag', 'flag', 200, 1250, 0, 0, .4, .4, 0, 0, null, null, null, null, 2),
]

worldClassLevels.push(level_1);

///////////////////////////All the Levels/////////////////////
console.log(worldClassLevels);

///////////////////////////////////////////Designed World Generator/////////////////////////////////////////////
//Will Turn This Into A Constructor and Refactor Later
var worldDesignedLevels = [
  ///////////////////////////////////Notes About Designed Levels/////////////////////////////////////
  /*
    SpecialCondition (The Type of Change That Will Happen at a Different Level)
    SpecialWorld (The Different Level)
    SpecialArray (The Sprite Position at a Different Level)
  */
  /////////////////////////////////////////////////////////////Level 0/////////////////////////////////////////////
  {
    worldName: "Level 0 ",
    gameMode: ["flag", "coin"],
    ////////////World Size
    xOfWorld: 2800,
    yOfWorld: 2400,
    ///////////Sprite Positioning
    //Where the Player Spawns Due to Switching Rooms
    playerPosition:
      //Up, Down, Left, Right (Remember!)
      [
        { x: 200, y: 20 },
        { x: 300, y: 2200 },
        { x: 200, y: 400 },
        { x: 1400, y: 400 }
      ],
    //Deals with Room Switching
    metroidvania:
    //Up, Down, Left, Right (Remember!)
    {
      //Up Values
      roomUpIndex: 1,
      roomUpValue: 100,
      //Down Values
      roomDownIndex: 0,
      roomDownValue: 2400,
      //Left Values
      roomLeftIndex: 0,
      roomLeftValue: 1,
      //Right Values
      roomRightIndex: 0,
      roomRightValue: 2800
    },
    //Game Objects
    doorSpawn:
      [
        { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
      ],
    undeniableDeathSpawn:
      [
        {
          trigger: true, x: 0, y: 1470, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .619, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        {
          trigger: true, x: 2800, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .857, art: "deathVertical",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        {
          trigger: true, x: 2800, y: 1263, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .767, art: "deathVertical",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        {
          trigger: true, x: 1463, y: 900, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        // {
        //   trigger: true, x: 1463, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "deathHorizontal",
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        // },
        {
          trigger: true, x: 2060, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "deathHorizontal",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        {
          trigger: true, x: 1400, y: 0, velocityX: 0, velocityY: 0, sizeX: 1, sizeY: .5, art: "deathHorizontal",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
      ],
    immovableWallSpawn:
      [
        //Ground
        {
          trigger: true, x: 0, y: 2400, velocityX: 0, velocityY: 0, sizeX: 3.29, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        //Practice Jump Levels
        {
          trigger: true, x: 700, y: 2210, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .15, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        {
          trigger: true, x: 1700, y: 1910, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Mini Walls
        {
          trigger: true, x: 2500, y: 2200, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 2500, y: 1800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        {
          trigger: true, x: 2700, y: 2000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
        {
          trigger: true, x: 2700, y: 1600, velocityX: 0, velodcityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        {
          trigger: true, x: 2700, y: 1375, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        //The Box
        {
          trigger: true, x: 2375, y: 1200, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        },
        {
          trigger: true, x: 1400, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1.3, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9
        },
        {
          trigger: true, x: 0, y: 1407, velocityX: 0, velocityY: 0, sizeX: 1.72, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1.653, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        //Inside the Box
        {
          trigger: true, x: 400, y: 1200, velocityX: 0, velocityY: 0, sizeX: .9, sizeY: .4, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        {
          trigger: true, x: 63, y: 800, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 974, y: 500, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 63, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 700, y: 600, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },
        {
          trigger: true, x: 400, y: 500, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableWallHorizontal", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 17
        },
        //Tiny Boxes inside the Box
        {
          trigger: true, x: 200, y: 950, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        },
        {
          trigger: true, x: 200, y: 1150, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },
        {
          trigger: true, x: 500, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 20
        },
        {
          trigger: true, x: 600, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 21
        },
        {
          trigger: true, x: 700, y: 775, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 22
        },
        {
          trigger: true, x: 800, y: 700, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 23
        },
        {
          trigger: true, x: 800, y: 900, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 24
        },
        {
          trigger: true, x: 800, y: 1100, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 25
        },
        {
          trigger: true, x: 1000, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 26
        },
        {
          trigger: true, x: 1000, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 27
        },
        {
          trigger: true, x: 1100, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 28
        },
        {
          trigger: true, x: 1100, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 29
        },
        {
          trigger: true, x: 1200, y: 1100, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 30
        },
        {
          trigger: true, x: 1200, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 31
        },
        ////Left Room Blocker
        // {
        //   trigger: true, x: 64, y: 0, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableWallHorizontal",
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        // },
        // { x: 400, y: 1000, velocityX: 0, velodcityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical" },
        // { x: 700, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical" },

      ],
    wallSpawn:
      [
        {
          trigger: true, x: 1900, y: 1100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
      ],
    spikeSpawn:
      [
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: 1, sizeY: 1, art: "spikesHorizontalOne", specialCondition: 0, specialWorld: null, specialArray: null, positionInArray: 0,
        },
        //Special Condition Test to Remove A Game Object Level One
        // {
        //   trigger: true, x: 0, y: 1200, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1, art: "invertedSpikes", specialCondition: 1, specialWorld: 1, specialArray: 1, positionInArray: 2,
        // },
      ],
    ledgeSpawn:
      [
      ],
    enemySpawn:
      [
      ],
    ballSpawn:
      [
        {
          trigger: true, x: 700, y: 1350, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        // {
        //   trigger: true, x: 700, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        // },
      ],
    fallingSpikes:
      [
      ],
    //Check Point
    flagSpawn:
      [
      ],
    text:
      [
        { x: 100, y: 2000, textInput: "W or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right\nTapping Twice on the Jump Button Lets You Double Jump\nJump Over the Wall", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 100, y: 1700, textInput: "Red is Death", font: "Times New Roman", fontSize: 30, fill: "#FF0000", fontWeight: "bold" }
        ,
        { x: 1300, y: 1650, textInput: "You Automatically Stick on Surfaces When You Jump on It\nPress A or D while on the Wall to Jump Off It\nWhile in the Air Move Towards the Wall to Stick to it Again\nKeep Jumping Off and Moving Again Towards the Wall to Climb Over\nTry Holding D While Tapping A while on Sticking on the Left Side of the Wall", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 1800, y: 2000, textInput: "You Can Stick and Move on the Bottom of Surfaces\nPress S to go Downwards or Push\n\nWhenever You Touch A Surface You Can Double Jump Again", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //First Use of Weapons
        // { x: 1550, y: 1200, textInput: "Press 4 to Toggle Camera Mode (WASD to Move Camera)\n\nPress 1 to Access Pull Gun\nUse Mouse to Aim and Left Click to Shoot\nAny Object that is Moveable Can Be Pulled\n\nSurf the Grey Wall to the Top Using the Pull Gun\nHint: Jump While Shooting At the Grey Wall While Riding It", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 1550, y: 1200, textInput: "Press 1 to Access Pull Gun\nUse Mouse to Aim and Left Click to Shoot\nAny Object that is Moveable Can Be Pulled\n\nSurf the Grey Wall to the Top Using the Pull Gun\nHint: Jump While Shooting At the Grey Wall While Riding It", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Nature of the Wall
        // { x: 1800, y: 550, textInput: "While Touching the Grey Wall\nYou Change It's Interaction With Other Objects", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Inside the Box
        { x: 750, y: 1265, textInput: "Press 2 to Use the Stop Gun\nBalls Destroy Enemies and Traps\nDestroy the Spikes\nAny Object that is Moveable Can be Stopped", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Spike Clarification
        { x: 400, y: 200, textInput: "As Long as the Ball Touches Any Part of the Spikes", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //To Next Level
        { x: 100, y: 25, textInput: "Level 1 ↑", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" }
      ],



    //Any Other Property Here Are additional Objects
    //Falling or Sideways Spikes
    //Super Ball
    //World Gravity
    //Traps that create generating enemies
  },
  //////////////////////////////////////////////////Level One//////////////////////////////////////////////////////////////
  {
    worldName: "Level 1 ",
    gameMode: ["flag", "coin"],
    ////////////World Size
    xOfWorld: 2800,
    yOfWorld: 3200,
    ///////////Sprite Positioning
    //Where the Player Spawns Due to Switching Rooms
    playerPosition:
      //Up, Down, Left, Right (Remember!)
      [
        { x: 200, y: 20 },
        { x: 400, y: 3120 }, //x400 y3000 (Original)
        { x: 100, y: 1320 },
        { x: 2600, y: 3140 }
      ],
    //Deals with Room Switching
    metroidvania:
    //Up, Down, Left, Right (Remember!)
    {
      //Up Values
      roomUpIndex: 4,
      roomUpValue: 0,
      //Down Values
      roomDownIndex: 0,
      roomDownValue: 3200,
      //Left Values
      roomLeftIndex: 2,
      roomLeftValue: 1,
      //Right Values
      roomRightIndex: 3,
      roomRightValue: 2800
    },
    //Game Objects
    doorSpawn:
      [
        { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
      ],
    undeniableDeathSpawn:
      [
        //Ground Next To Flag
        {
          trigger: true, x: 725, y: 3170, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .4, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        //Top of the Yellow at the Bottom
        {
          trigger: true, x: 0, y: 2691, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Border of First Half
        {
          trigger: true, x: 1425, y: 1700, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: 1.08, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Connector to top of yellow
        {
          trigger: true, x: 700, y: 2000, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .714, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        //Preventing Grey Cheese
        {
          trigger: true, x: 150, y: 1690, velocityX: 0, velocityY: 0, sizeX: .2, sizeY: .39, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        //Border Slim Left Side
        {
          trigger: true, x: 0, y: 1400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .922, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
        // Next to Wall at the End of Grey Phase
        {
          trigger: true, x: 426, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .8029, sizeY: .395, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        //Entryway to the Green Ledge
        {
          trigger: true, x: 1550, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .714, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        //Connector to right side of map
        {
          trigger: true, x: 1465, y: 3170, velocityX: 0, velocityY: 0, sizeX: .5249, sizeY: .4, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        },
        //Finally Hurdles Till You Get Respawn Twin Primes
        {
          trigger: true, x: 2150, y: 2000, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .811, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9
        },
        {
          trigger: true, x: 2250, y: 500, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: 1.5, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 2800, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: 1.837, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        //Long Pole Death
        {
          trigger: true, x: 2495, y: 600, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        {
          trigger: true, x: 2495, y: 1000, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 2495, y: 1400, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 2495, y: 1800, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 2495, y: 2200, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },
        {
          trigger: true, x: 2495, y: 2600, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 17
        },
        //Blue Ledge Past Long Pole of Death
        {
          trigger: true, x: 1200, y: 0, velocityX: 0, velocityY: 0, sizeX: 1.12, sizeY: .25, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        },
        {
          trigger: true, x: 1200, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .8, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },
        {
          trigger: true, x: 1830, y: 500, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .25, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 20
        },
        {
          trigger: true, x: 1240, y: 1080, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .25, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 21
        },
        //Entry Way to Left Side of the Map
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .507, sizeY: .25, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 22
        },
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .82, art: "deathVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 23
        },


      ],
    immovableWallSpawn:
      [
        //Ground
        {
          trigger: true, x: 300, y: 3136, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0,
        },
        //Vertical Wall Connector to Level 0
        {
          trigger: true, x: 0, y: 2772, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallVertical", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Mini Boxes
        {
          trigger: true, x: 1062.5, y: 2600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Top of First Grey Ledge
        {
          trigger: true, x: 430, y: 1690, velocityX: 0, velocityY: 0, sizeX: 1.17, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3,
        },
        //End of Grey Ledge
        {
          trigger: true, x: 0, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4,
        },
        //End of Green Ledge
        {
          trigger: true, x: 1591, y: 1336, velocityX: 0, velocityY: 0, sizeX: .774, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5,
        },
        //Entry to Right Side of Map
        {
          trigger: true, x: 2200, y: 3136, velocityX: 0, velocityY: 0, sizeX: .7, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6,
        },
        //Long Pole
        {
          trigger: true, x: 2500, y: 400, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: 3, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        // {
        //   trigger: true, x: 2400, y: 2800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        // },
        //Left and Upwards Rooms of the Map
        {
          trigger: true, x: 773, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8,
        },
        //First Wall THat Gets Removed from Level 3
        {
          trigger: true, x: 773, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9,
        },
        {
          trigger: true, x: 710, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .8, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 425, y: 600, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .87, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        //Mini Walls at the End
        {
          trigger: true, x: 400, y: 400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        {
          trigger: true, x: 600, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 600, y: 400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 700, y: 500, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 300, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", type: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },

      ],
    wallSpawn:
      [
        //Before Grey
        {
          trigger: true, x: 1100, y: 3000, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        //After BLue
        {
          trigger: true, x: 1100, y: 1250, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Kill These
        {
          trigger: true, x: 250, y: 600, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        {
          trigger: true, x: 250, y: 700, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 250, y: 800, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        {
          trigger: true, x: 250, y: 900, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
        {
          trigger: true, x: 250, y: 1000, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        {
          trigger: true, x: 250, y: 1100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
      ],
    spikeSpawn:
      [
        // {
        //   trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: 2, sizeY: 1, art: "invertedSpikes", specialCondition: null, specialWorld: null, positionInArray:null 1
        // },
        {
          trigger: true, x: 2800, y: 2853, velocityX: 0, velocityY: 0, sizeX: .6, sizeY: .4, art: "spikesVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
      ],
    ledgeSpawn:
      [
        //Elevator
        { trigger: true, type: 'elevator', x: 100, y: 2600, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0 },
        { trigger: true, type: 'elevator', x: 1080, y: 2200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        //Bounce Ledges
        { trigger: true, type: 'bounce', x: 1525, y: 3000, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
        { trigger: true, type: 'bounce', x: 1700, y: 2200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3 },
        { trigger: true, type: 'bounce', x: 1900, y: 2700, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4 },
        { trigger: true, type: 'bounce', x: 2100, y: 2000, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5 },
        //Surf Ledges
        { trigger: true, type: 'surf', x: 2270, y: 300, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7 },
      ],
    enemySpawn:
      [
      ],
    ballSpawn:
      [
        {
          trigger: true, x: 975, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
      ],
    fallingSpikes:
      [
      ],
    //Check Point
    flagSpawn:
      [
        { trigger: true, x: 600, y: 3050, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 1, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0 },
        { trigger: true, x: 2500, y: 3050, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 3, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        { trigger: true, x: 200, y: 1250, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
        // { x: 500, y: 3000, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 0 },
      ],
    text:
      [
        //Entry to Level 0
        { x: 100, y: 3150, textInput: "Level 0 ↓", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Camera Mode
        { x: 80, y: 2800, textInput: "Press 4 to Toggle Free-Look (WASD to Move)", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Flag Respawn Pointg Down
        { x: 400, y: 3000, textInput: "Flags are Respawn Checkpoints", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Grey Ledge Tutorial
        { x: 900, y: 2300, textInput: "Get on Top of the Grey Ledge\n\nPull the Grey Ledge Towards You", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Tell You Where To Jump From Grey Ledge
        { x: 300, y: 1900, textInput: "Jump Down to the Grey Ledge at the Bottom", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Trust the Green Jump
        { x: 900, y: 1525, textInput: "Trust the Green Ledges at the Bottom", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 1500, y: 1600, textInput: "↓", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Green Ledge Tutorial
        { x: 1600, y: 3000, textInput: "Green Ledges Make You Jump High", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //Blue Spawn Tutorial
        { x: 1500, y: 200, textInput: "You Can Surf Blue Ledges\n\nBe Warned They Are Unstable\n\nLand Perfectly in the Middle of the Blue Ledge\n\nHint: Hold S When Surfing", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        // Entry to Left Side (Kill Instructions)
        { x: 100, y: 200, textInput: "Press 3 to Access Kill Gun\n\nAny Object that is Moveable can be Killed", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
      ],



    //Any Other Property Here Are Unditional Objects
    //Falling or Sideways Spikes
    //Super Ball
    //World Gravity
    //Traps that create generating enemies
  },
  //////////////////////////////////////////////////Level Two//////////////////////////////////////////////////////////////
  {
    worldName: "Level 2 ",
    gameMode: ["flag", "coin"],
    ////////////World Size
    xOfWorld: 4800,
    yOfWorld: 800,
    ///////////Sprite Positioning
    //Where the Player Spawns Due to Switching Rooms
    playerPosition:
      //Up, Down, Left, Right (Remember!)
      [
        { x: 200, y: 20 },
        { x: 200, y: 100 }, //x400 y3000 (Original)
        { x: 200, y: 380 },
        { x: 4700, y: 750 }
      ],
    //Deals with Room Switching
    metroidvania:
    //Up, Down, Left, Right (Remember!)
    {
      //Up Values
      roomUpIndex: 1,
      roomUpValue: 0,
      //Down Values
      roomDownIndex: 4,
      roomDownValue: 800,
      //Left Values
      roomLeftIndex: 1,
      roomLeftValue: 1,
      //Right Values
      roomRightIndex: 1,
      roomRightValue: 4800
    },
    //Game Objects
    doorSpawn:
      [
        { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
      ],
    undeniableDeathSpawn:
      [
        /////////////////////////Orientation X-Left to Right //////////////////////
        //Bottom Towards the End of the Map
        {
          trigger: true, x: 0, y: 4100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .1, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        //Top of Map
        {
          trigger: true, x: 300, y: 0, velocityX: 0, velocityY: 0, sizeX: 3.215, sizeY: .1, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Long Pit (Under Vertical Moveable Wall)
        {
          trigger: true, x: 1406.5, y: 4100, velocityX: 0, velocityY: 0, sizeX: .995, sizeY: .1, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Bottom Towards the End of the Map
        {
          trigger: true, x: 3506, y: 4100, velocityX: 0, velocityY: 0, sizeX: .4169, sizeY: .1, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        //Spike of Death At Bottom to Prevent Glitch
        {
          trigger: true, x: 0, y: 810, velocityX: 0, velocityY: 0, sizeX: 3.45, sizeY: .1, art: "deathHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
      ],
    immovableWallSpawn:
      [
        ///////////////Orientation X-Right to Left/////////////////////
        //Border of Level One and Level Two
        {
          trigger: true, x: 4800, y: 0, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .7, art: "immovableWallVertical", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0,
        },
        //Ground
        {
          trigger: true, x: 4100, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Wall Blocking First Ground
        {
          trigger: true, x: 4090, y: 100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .83, art: "immovableWallVertical", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2,
        },
        //Wall with Little Hole
        {
          trigger: true, x: 3300, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .83, art: "immovableWallVertical", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3,
        },
        //Past Max Jump
        {
          trigger: true, x: 2800, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4,
        },
        //Immovable Wall Past Vertical Moveable Wall
        {
          trigger: true, x: 700, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5,
        },
        //Divider at the End
        {
          trigger: true, x: 300, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallVertical", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6,
        },
        //Ground for the Flag
        {
          trigger: true, x: 128, y: 395, velocityX: 0, velocityY: 0, sizeX: .276, sizeY: .297, art: "immovableWallHorizontal", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7,
        },
        //Border Edge At The End of The Level
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .93, art: "immovableWallVertical", type: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8,
        },
        //Phase Wall
        {
          trigger: true, x: 300, y: 433, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .412, art: "immovableWallVertical", type: 'phase', specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9,
        },
      ],
    wallSpawn:
      [
        {
          trigger: true, x: 4500, y: 400, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallHorizontal", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        //First Vertical Wall
        {
          trigger: true, x: 2000, y: 400, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wallVertical", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Test Wall
        // {
        //   trigger: true, x: 0, y: 300, velocityX: 100, velocityY: 0, sizeX: .5, sizeY: .5, art: "wall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        // },
      ],
    spikeSpawn:
      [
      ],
    ledgeSpawn:
      [
        // { trigger: true, type: 'elevator', x: 500, y: 100, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6 },
        // { trigger: true, type: 'bounce', x: 500, y: 250, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7 },
        // { trigger: true, type: 'surf', x: 500, y: 450, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8 },
      ],
    enemySpawn:
      [
        //First Three Enemies
        { trigger: true, x: 4300, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0 },
        { trigger: true, x: 4500, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        { trigger: true, x: 4700, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
        //Blocking the first obstacle
        { trigger: true, x: 4125, y: 50, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3 },
        //Maximum Jump Enemy
        { trigger: true, x: 3500, y: 500, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4 },
        //Four Enemies of the Gate
        { trigger: true, x: 1000, y: 50, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5 },
        { trigger: true, x: 1000, y: 250, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6 },
        { trigger: true, x: 1000, y: 450, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7 },
        { trigger: true, x: 1000, y: 650, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8 },
        //Last Enemy
        { trigger: true, x: 600, y: 600, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9 },
      ],
    ballSpawn:
      [
        // { trigger: true, x: 900, y: 450, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9 },
      ],
    fallingSpikes:
      [
        { trigger: true, x: 475, y: 50, seconds: 3, velocityX: 0, velocityY: 500, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0 },
      ],
    //Check Point
    flagSpawn:
      [
        //Flag At the Beginning of the Level
        // { trigger: true, x: 4600, y: 650, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 3, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0 },
        //Flag At the End of The Level (Removes One of Bottom Walls at Level One)
        { trigger: true, x: 220, y: 250, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: 1, specialWorld: 1, specialArray: 9, positionInArray: 1 },
        // //test
        { trigger: true, x: 4600, y: 650, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: 1, specialWorld: 1, specialArray: 9, positionInArray: 2 },
      ],
    text:
      [
      ],
  }

]

//Respawn Holder (The Level You Will Respawn In)
var respawnHolder = {
  indexOfCurrentWorld: 0,
  indexOfPlayerPosition: 1,
  metroidvania: null,
}

//Toggling Camera
var cameraBoolean = true;

//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "MetroidVanian: Refactor",
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

//////////////////////////////////////////////////Changing Game States//////////////////////////////////////////////

//Next Level
function nextLevel(player, door) {
  ++streak
  game.state.start('rogueTest');
}

///Deathgame State
function deathOne(victim, killer) {
  // console.log(victim.body.x + ' '+ victim.body.y);
  victim.kill();
  if (streak > longestStreak) {
    longestStreak = streak;
  }
  streak = 0;
  game.state.start('deathState');
}

//Sprite vs. Group Specific Deaths
function deathTwo(victim, killer) {
  victim.kill();
  if (killer.type === 'immovableWallPhase') {
    killer.kill();
  }
}

function deathThree(killer, victim) {
  victim.kill();
}
///////////////////////////////////////////Physics Within Game Mechanics////////////////////////////////////////////

////////////////////////////////////////Immovable Wall Mechanics//////////////////////////////////////////
function wallGroupPhysics(sprite1, sprite2) {
  // sprite2.body.stop();
  // sprite1.body.immovable = true;
  sprite1.body.stop();
  sprite2.body.stopMovement();
  //sprite2.body.stop();
  if (sprite1.body.touching.up) {
    // sprite2.body.acceleration.y = 100
    // sprite2.body.acceleration.y = 0;
    sprite2.body.velocity.y = -sprite2.velocityVsWallY;
    // sprite1.body.velocity.y = sprite2.velocityVsWallY;
    // console.log(sprite1.body.velocity.y, sprite2.body.velocity.y);
    // sprite2.body.velocity.x = sprite1.body.velocity.x;
  }
  if (sprite1.body.touching.down) {
    // sprite2.body.acceleration.y = 0;
    sprite2.body.velocity.y = sprite2.velocityVsWallY;
    // sprite2.body.velocity.x = sprite1.body.velocity.x;
  }
  if (sprite1.body.touching.left) {
    // sprite2.body.acceleration.x = 0;
    sprite2.body.velocity.x = -sprite2.velocityVsWallX;
    // sprite2.body.velocity.y = sprite1.body.velocity.y;
  }
  if (sprite1.body.touching.right) {
    // sprite2.body.acceleration.x = 0;
    sprite2.body.velocity.x = sprite2.velocityVsWallX;
    // sprite2.body.velocity.y = sprite1.body.velocity.y;
  }

}

///////////////////////////////////Moveable Wall Mecanics///////////////////
function wallStopper(wall, sprite2) {
  wall.body.stopMovement();
  // wall.body.immovable = true;
  if (wall.body.touching.up) {
    wall.body.velocity.y = 100;
    wall.body.velocity.x = 0;
  }
  if (wall.body.touching.down) {
    wall.body.velocity.y = -100;
    wall.body.velocity.x = 0;
  }
  if (wall.body.touching.left) {
    wall.body.velocity.x = 100;
    wall.body.velocity.y = 0;
  }
  if (wall.body.touching.right) {
    wall.body.velocity.x = -100;
    wall.body.velocity.y = 0;
  }
}

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
////////////////////////////////////Immovable Wall/////////////////////////////


////////////////////////////Ball Mechanics////////////////////////////////////
function ballMover(player, ball) {
  ///////////////////GOOOFY/////////////
  // ball.body.stop();
  // if (ball.body.touching.up) {
  //   ball.body.velocity.y= 200;
  // }
  // if (ball.body.touching.down) {
  //   ball.body.velocity.y = -200;
  //   player.body.velocity.y = -50;
  // }
  // if (ball.body.touching.left) {
  //   ball.body.velocity.x = 200;
  // }
  // if (ball.body.touching.right) {
  //   ball.body.velocity.x = -200;
  // }
  //////////////////Natural///////////////
  // if (ball.body.touching.up) {
  //   ball.body.velocity.y = 50;
  // }
  // else if (ball.body.touching.down) {
  //   ball.body.velocity.y = -50;
  //   player.body.velocity.y = -75;
  // }
  // else if (ball.body.touching.left) {
  //   ball.body.velocity.x = 50;
  // }
  // else if (ball.body.touching.right) {
  //   ball.body.velocity.x = -50;
  // }
  //////////////Control////////////
  // if (ball.body.touching.up) {
  //   ball.body.velocity.y = player.body.velocity.y;
  // }
  // if (ball.body.touching.down) {
  //   ball.body.velocity.y = player.body.velocity.y;
  // }
  // if (ball.body.touching.left) {
  //   ball.body.velocity.x = player.body.velocity.x;
  // }
  // if (ball.body.touching.right) {
  //   ball.body.velocity.x = player.body.velocity.x;
  // }
}

////////////////////////////////////Player Ledge Mechanics//////////////////////////////////////

function ledgePhysics(player, ledge) {
  //////////Eleveator Ledges/////////
  if (ledge.type === 'elevator') {
    ledge.body.stop();
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = -200;
      player.body.velocity.y = -200
      // if (player.body.velocity.x < 0) {
      //   ledge.body.velocity.x = player.body.velocity.x - 100;
      // }
      // if (player.body.velocity.x > 0) {
      //   ledge.body.velocity.x = player.body.velocity.x + 100;
      // }
      // {
      //   ledge.body.velocity.x = 0;
      // }
    }
    // When You're Hitting the Edge from the Sides (Right and Left)
    else if (ledge.body.touching.left || ledge.body.touching.right) {
      ledge.body.velocity.y = 0;
      ledge.body.velocity.x = player.body.velocity.x;
    }
    /////////////////////////////////In Case Want to Change Side Ledge Velocity///////////
    // if (ledge.body.touching.left) {
    //   ledge.body.velocity.y = 0;
    //   ledge.body.velocity.x = 300;
    // }
    // if (ledge.body.touching.right) {
    //   ledge.body.velocity.y = 0;
    //   ledge.body.velocity.x = -300;
    // }
    // if (ledge.body.touching.down && player.body.velocity.y < -1) {
    //   player.body.velocity.y = -100;
    // }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = -300;
      player.body.velocity.y = -100;
    }
  }
  //////////Super Jump/////////
  if (ledge.type === 'bounce') {
    if (ledge.body.touching.up) {
      player.body.velocity.y = -1200;
    }
  }
  ////////Surfs Up Dude////////
  if (ledge.type === 'surf') {
    ledge.body.velocity.y = 200;
    ledge.body.velocity.x = player.body.velocity.x;
  }

}

////////////////////////////Weapon Mechanics/////////////////////////
//When Weapon Hits Immovable/Unkillable Objects (It Dies);
function weaponImmovable(weapon, wall) {
  weapon.kill();
}

//When Weapon Hits Moveable Objects (It's Special Property Expressed)

function weaponHandler(weapon, sprite) {
  if (weapon.key === 'bulletPull') {
    this.game.physics.arcade.moveToObject(sprite, this.player, 200);
  }
  else if (weapon.key === 'bulletStop') {
    sprite.body.stop();
  }
  else if (weapon.key === 'bulletKill') {
    sprite.kill();
  }
  weapon.kill();
}
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