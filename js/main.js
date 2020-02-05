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
        { upPosition: true, x: 200, y: 20 },
        { downPosition: true, x: 300, y: 2200 },
        { leftPosition: true, x: 200, y: 400 },
        { rightPosition: true, x: 1400, y: 400 }
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
          trigger: true, x: 0, y: 2400, velocityX: 0, velocityY: 0, sizeX: 3.29, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0
        },
        //Practice Jump Levels
        {
          trigger: true, x: 700, y: 2210, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .15, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        {
          trigger: true, x: 1700, y: 1910, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Mini Walls
        {
          trigger: true, x: 2500, y: 2200, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 2500, y: 1800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        {
          trigger: true, x: 2700, y: 2000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
        {
          trigger: true, x: 2700, y: 1600, velocityX: 0, velodcityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        {
          trigger: true, x: 2700, y: 1375, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        //The Box
        {
          trigger: true, x: 2375, y: 1200, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        },
        {
          trigger: true, x: 1400, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1.3, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9
        },
        {
          trigger: true, x: 0, y: 1407, velocityX: 0, velocityY: 0, sizeX: 1.72, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1.653, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        //Inside the Box
        {
          trigger: true, x: 400, y: 1200, velocityX: 0, velocityY: 0, sizeX: .9, sizeY: .4, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        {
          trigger: true, x: 63, y: 800, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 974, y: 500, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 63, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 700, y: 600, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },
        {
          trigger: true, x: 400, y: 500, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 17
        },
        //Tiny Boxes inside the Box
        {
          trigger: true, x: 200, y: 950, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        },
        {
          trigger: true, x: 200, y: 1150, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },
        {
          trigger: true, x: 500, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 20
        },
        {
          trigger: true, x: 600, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 21
        },
        {
          trigger: true, x: 700, y: 775, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 22
        },
        {
          trigger: true, x: 800, y: 700, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 23
        },
        {
          trigger: true, x: 800, y: 900, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 24
        },
        {
          trigger: true, x: 800, y: 1100, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 25
        },
        {
          trigger: true, x: 1000, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 26
        },
        {
          trigger: true, x: 1000, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 27
        },
        {
          trigger: true, x: 1100, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 28
        },
        {
          trigger: true, x: 1100, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 29
        },
        {
          trigger: true, x: 1200, y: 1100, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 30
        },
        {
          trigger: true, x: 1200, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
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
        { upPosition: true, x: 200, y: 20 },
        { downPosition: true, x: 400, y: 3120 }, //x400 y3000 (Original)
        { leftPosition: true, x: 100, y: 1320 },
        { rightPosition: true, x: 2600, y: 3140 }
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
          trigger: true, x: 300, y: 3136, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0,
        },
        //Vertical Wall Connector to Level 0
        {
          trigger: true, x: 0, y: 2772, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallVertical", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Mini Boxes
        {
          trigger: true, x: 1062.5, y: 2600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Top of First Grey Ledge
        {
          trigger: true, x: 430, y: 1690, velocityX: 0, velocityY: 0, sizeX: 1.17, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3,
        },
        //End of Grey Ledge
        {
          trigger: true, x: 0, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4,
        },
        //End of Green Ledge
        {
          trigger: true, x: 1591, y: 1336, velocityX: 0, velocityY: 0, sizeX: .774, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5,
        },
        //Entry to Right Side of Map
        {
          trigger: true, x: 2200, y: 3136, velocityX: 0, velocityY: 0, sizeX: .7, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6,
        },
        //Long Pole
        {
          trigger: true, x: 2500, y: 400, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: 3, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        // {
        //   trigger: true, x: 2400, y: 2800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        // },
        //Left and Upwards Rooms of the Map
        {
          trigger: true, x: 773, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8,
        },
        //First Wall THat Gets Removed from Level 3
        {
          trigger: true, x: 773, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9,
        },
        {
          trigger: true, x: 710, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .8, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 425, y: 600, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .87, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        //Mini Walls at the End
        {
          trigger: true, x: 400, y: 400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        {
          trigger: true, x: 600, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 600, y: 400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 700, y: 500, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 300, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableWallVertical", phaseWall: null,
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
        { upPosition: true, x: 200, y: 20 },
        { downPosition: true, x: 200, y: 100 }, //x400 y3000 (Original)
        { leftPosition: true, x: 200, y: 380 },
        { rightPosition: true, x: 4700, y: 750 }
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
          trigger: true, x: 4800, y: 0, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .7, art: "immovableWallVertical", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0,
        },
        //Ground
        {
          trigger: true, x: 4100, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Wall Blocking First Ground
        {
          trigger: true, x: 4090, y: 100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .83, art: "immovableWallVertical", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2,
        },
        //Wall with Little Hole
        {
          trigger: true, x: 3300, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .83, art: "immovableWallVertical", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3,
        },
        //Past Max Jump
        {
          trigger: true, x: 2800, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4,
        },
        //Immovable Wall Past Vertical Moveable Wall
        {
          trigger: true, x: 700, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5,
        },
        //Divider at the End
        {
          trigger: true, x: 300, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableWallVertical", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6,
        },
        //Ground for the Flag
        {
          trigger: true, x: 128, y: 388.3, velocityX: 0, velocityY: 0, sizeX: .276, sizeY: .297, art: "immovableWallHorizontal", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7,
        },
        //Border Edge At The End of The Level
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .93, art: "immovableWallVertical", phaseWall: null, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8,
        },
        //Phase Wall
        {
          trigger: true, x: 300, y: 426, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .418, art: "immovableWallVertical", phaseWall: 'phase', specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9,
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
        { trigger: true, x: 4600, y: 650, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 3, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 0 },
        //Flag At the End of The Level (Removes One of Bottom Walls at Level One)
        { trigger: true, x: 220, y: 250, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: 1, specialWorld: 1, specialArray: 9, positionInArray: 1 },
        // //test
        // { trigger: true, x: 4600, y: 650, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: 1, specialWorld: 1, specialArray: 9, positionInArray: 2 },
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
  if (killer.phaseWall === 'phase') {
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
  sprite2.body.stop();
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
  //wall.body.stop();
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