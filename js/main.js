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
game.state.add('rogueTest', brawl.rogue);
game.state.add('test', brawl.testing);
game.state.add('controlScreen', brawl.stateControls);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
game.state.start('mainMenu');
// game.state.start('controlScreen');
// game.state.start('test');
//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////

//Alternative Death State (boolean that is activated).
var deathStateProcedural;

//Death Total in Game
var deaths = 0;

//Total Streak
var streak = 0;
var longestStreak = 0;

//Weapon Variables to Change Bullet Type
var pullBoolean = false;
var pushBoolean = false;
var stopBoolean = false;

// Global Timer

var total = 0;

////////////////////////////////////////Procedural Generation///////////////////////////////////////////////////////
/////////////////////////////////Position of Items Within Rectangle///////////////////////
///Top Positions
var topCenter = Phaser.TOP_CENTER;
var topLeft = Phaser.TOP_LEFT;
var topRight = Phaser.TOP_RIGHT;
//Center Positions
var center = Phaser.CENTER;
var centerLeft = Phaser.LEFT_CENTER;
var centerRight = Phaser.RIGHT_CENTER;
//Bottom Positions
var bottomCenter = Phaser.BOTTOM_CENTER;
var bottomLeft = Phaser.BOTTOM_LEFT;
var bottomRight = Phaser.BOTTOM_RIGHT;

////////////////////////////Array to Scramble Positions///////////////////
//Variables that Hold the Different Positions
var positionArray = [topCenter, topLeft, topRight, center, centerLeft, centerRight, bottomCenter, bottomLeft, bottomRight];

////////////////////////////Creation of Starting Point and EndPoint///////////////////
class baseCampCreator {
  constructor(playerXBaseCamp, playerYBaseCamp, iteratorXBaseCamp, iteratorYBaseCamp) {
    this.playerXBaseCamp = playerXBaseCamp;
    this.playerYBaseCamp = playerYBaseCamp;
    this.iteratorXBaseCamp = iteratorXBaseCamp;
    this.iteratorYBaseCamp = iteratorYBaseCamp;
  }
}
//For the Tradtional Platformer World
var traditionalPlatformerPositionOne = new baseCampCreator(350, 600, 0, 1);
var traditionalPlatformerPositionTwo = new baseCampCreator(6650, 600, 9, 1);
var tradtionalPlatformerArray = [traditionalPlatformerPositionOne, traditionalPlatformerPositionTwo
];

//For the MountainClimb
var mountainClimbPositionOne = new baseCampCreator(1100, 500, 1, 0);
var mountainClimbPositionTwo = new baseCampCreator(1100, 6100, 1, 8);
var mountainClimbArray = [mountainClimbPositionOne, mountainClimbPositionTwo];

//For the Canvas World
var canvasWorldPositionOne = new baseCampCreator(200, 200, 0, 0);
var canvasWorldPositionTwo = new baseCampCreator(200, 625, 0, 1);
var canvasWorldPositionThree = new baseCampCreator(1200, 200, 2, 0);
var canvasWorldPositionFour = new baseCampCreator(1200, 625, 2, 1);
var canvasWorldArray = [canvasWorldPositionOne, canvasWorldPositionTwo, canvasWorldPositionThree, canvasWorldPositionFour];

//For the LargeWorld
var largeWorldPositionOne = new baseCampCreator(300, 520, 0, 0);
var largeWorldPositionTwo = new baseCampCreator(300, 3800, 0, 5);
var largeWorldPositionThree = new baseCampCreator(3700, 520, 6, 0);
var largeWorldPositionFour = new baseCampCreator(3700, 3800, 6, 5);
var largeWorldArray = [largeWorldPositionOne, largeWorldPositionTwo, largeWorldPositionThree, largeWorldPositionFour];

//For the Practice World
var practiceWorldPositionOne = new baseCampCreator(300, 300, 0, 0);
var practiceWorldPositionTwo = new baseCampCreator(300, 1800, 0, 3);
var practiceWorldPositionThree = new baseCampCreator(1700, 300, 3, 0);
var practiceWorldPositionFour = new baseCampCreator(1700, 1800, 3, 3);
var practiceWorldArray = [practiceWorldPositionOne, practiceWorldPositionTwo, practiceWorldPositionThree, practiceWorldPositionFour];

///////////////////////////////////////World Generation Variables of Each Map///////////////////////////////////////

class worldValues {
  constructor(xBlockSizeF, xRectangleF, yBlockSizeF, yRectangleF, deathIterator, deathX, deathY, iteratorX, iteratorY, amountOfSpritesInGrid) {
    this.xBlockSizeF = xBlockSizeF; //Size of Each Block
    this.xRectangleF = xRectangleF; //Size of Rectangle (different than size of block to provide spacing)
    this.yBlockSizeF = yBlockSizeF;
    this.yRectangleF = yRectangleF;
    this.deathIterator = deathIterator; //How Many Times the Spikes at the Bottom Will Loop
    this.deathX = deathX; //Where the Spikes are Located
    this.deathY = deathY;
    this.iteratorX = iteratorX; //How Many Blocks 
    this.iteratorY = iteratorY;
    this.amountOfSpritesInGrid = amountOfSpritesInGrid; //Amount of Sprites in Each Grid
  }
}

///////blocksizeX,rectangleX, blocksizeY, rectangleY, deathI, deathX, deathY, Ix,Iy, Amount of Sprites
//For Tradtional Platformer
var traditionalPlatformerValues = new worldValues(600, 700, 300, 375, 5, 1400, 750, 10, 2, 3);
//For the Mountain Climb
var mountainClimbValues = new worldValues(700, 700, 580, 700, 1, 1400, 6250, 2, 9, 3);
//For the Canvas World
var canvasWorldValues = new worldValues(400, 465, 290, 400, 1, 1400, 750, 3, 2, 2);
//For the Large World
var largeWorldValues = new worldValues(550, 570, 580, 660, 3, 1400, 3950, 7, 6, 3);
//For the Practice World
var practiceWorldValues = new worldValues(490, 500, 390, 500, 3, 1400, 1950, 4, 4, 3);

//////////////////////World Randomness Generator(The Conclusion)//////////////////

var worldGenerator = [
  {
    xOfWorld: 7000,
    yOfWorld: 800,
    baseCamp: tradtionalPlatformerArray, //Array
    world: traditionalPlatformerValues, //Object
    // 0-Wall, 1-Enemy, 2-Ledges, 3-Ball
    spritesType: [0, 2, 3, 1, 1, 2, 1, 1, 2, 1, 3, 0, 1, 0, 2, 1, 2, 0, 1, 0, 0, 1, 2, 3, 1],
    worldName: "Traditional Platformer"
  },
  {
    xOfWorld: 1400,
    yOfWorld: 6300,
    baseCamp: mountainClimbArray,
    world: mountainClimbValues,
    worldName: "The Mountain Climb"
  },
  {
    xOfWorld: 1400,
    yOfWorld: 800,
    baseCamp: canvasWorldArray,
    world: canvasWorldValues,
    worldName: "The Canvas World"
  },
  {
    xOfWorld: 4000,
    yOfWorld: 4000,
    baseCamp: largeWorldArray,
    world: largeWorldValues,
    worldName: "The Large World"
  },
  {
    xOfWorld: 2000,
    yOfWorld: 2000,
    baseCamp: practiceWorldArray,
    world: practiceWorldValues,
    worldName: "The Practice World"
  },
]



//////////////////////////Variables that Hold Different Sizes and Animations of Sprite Groups//////////////////////
//Different Spike Sizes and Keys
var spikeArray = ['invertedSpikes', 'spikes'];
var spikeLength = [.2, .3,];

//Different Wall Types
var wallArray = ['brownPlatform', 'wall', 'rotatedWall'];
var wallLength = [.3, .4, .5, .6];

//Different Immmovable Wall Types
//Different Wall Types
var immovableWallArray = ['immovableVerticalWall', 'immovableRotatedWall'];
var immovableWallLength = [.5, .6];
var immovableWallVelocity = [0, 1];

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
  //////////////////////////////////////////Prototype or Template///////////////////////////////////////
  // {
  //   worldName: "Prototype",
  //   gameMode: ["flag", "coin"],
  //   ////////////World Size
  //   xOfWorld: 1400,
  //   yOfWorld: 800,
  //   ///////////Sprite Positioning
  //   //Where the Player Spawns Due to Switching Rooms
  //   playerPosition:
  //     //Up, Down, Left, Right (Remember!)
  //     [
  //       { upPosition: true, x: 200, y: 20 },
  //       { downPosition: true, x: 2500, y: 200 }, //x400 y3000 (Original)
  //       { leftPosition: true, x: 400, y: 500 },
  //       { rightPosition: true, x: 400, y: 400 }
  //     ],
  //   //Deals with Room Switching
  //   metroidvania:
  //   //Up, Down, Left, Right (Remember!)
  //   {
  //     //Up Values
  //     roomUpIndex: 4,
  //     roomUpValue: 0,
  //     //Down Values
  //     roomDownIndex: 0,
  //     roomDownValue: 3200,
  //     //Left Values
  //     roomLeftIndex: 2,
  //     roomLeftValue: 1,
  //     //Right Values
  //     roomRightIndex: 3,
  //     roomRightValue: 2800
  //   },
  //   //Game Objects
  //   doorSpawn:
  //     [false,
  //       { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
  //     ],
  //   undeniableDeathSpawn:
  //     [true,

  //     ],
  //   immovableWallSpawn:
  //     [true,
  //       //Ground
  //       {
  //         trigger: true, x: 300, y: 3136, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
  //       },
  //     ],
  //   wallSpawn:
  //     [true,
  //     ],
  //   spikeSpawn:
  //     [true,
  //     ],
  //   ledgeGreySpawn:
  //     [true,
  //     ],
  //   ledgeGreenSpawn:
  //     [true,
  //     ],

  //   ledgeBlueSpawn:
  //     [true,
  //     ],
  //   enemySpawn:
  //     [false,
  //     ],
  //   ballSpawn:
  //     [true,
  //     ],
  //   fallingSpikes:
  //     [true,
  //     ],
  //   //Check Point
  //   flagSpawn:
  //     [true,
  //       // { x: 500, y: 3000, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 0 },
  //     ],
  //   text:
  //     [true,
  //     ],



  //   //Any Other Property Here Are Unditional Objects
  //   //Falling or Sideways Spikes
  //   //Super Ball
  //   //World Gravity
  //   //Traps that create generating enemies
  // },
  ///////////////////////////////////Notes About Designed Levels/////////////////////////////////////
  /*
    SpecialCondition (The Type of Change That Will Happen at a Different Level)
    SpecialWorld (The Different Level)
    SpecialArray (The Sprite Position at a Different Level)
  */
  /////////////////////////////////////////////////////////////Level 0 Test/////////////////////////////////////////////
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
      [true,
        { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
      ],
    undeniableDeathSpawn:
      [true,
        {
          trigger: true, x: 0, y: 1470, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .619, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        {
          trigger: true, x: 2800, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .857, art: "sidewaysSpikes",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        {
          trigger: true, x: 2800, y: 1263, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .767, art: "sidewaysSpikes",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 1463, y: 900, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        // {
        //   trigger: true, x: 1463, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "undeniableDeath",
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        // },
        {
          trigger: true, x: 2060, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "undeniableDeath",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        {
          trigger: true, x: 1400, y: 0, velocityX: 0, velocityY: 0, sizeX: 1, sizeY: .5, art: "undeniableDeath",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
      ],
    immovableWallSpawn:
      [true,
        //Ground
        {
          trigger: true, x: 0, y: 2400, velocityX: 0, velocityY: 0, sizeX: 3.29, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Practice Jump Levels
        {
          trigger: true, x: 700, y: 2210, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .15, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        {
          trigger: true, x: 1700, y: 1910, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        //Mini Walls
        {
          trigger: true, x: 2500, y: 2200, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        {
          trigger: true, x: 2500, y: 1800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
        {
          trigger: true, x: 2700, y: 2000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        {
          trigger: true, x: 2700, y: 1600, velocityX: 0, velodcityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        {
          trigger: true, x: 2700, y: 1375, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        },
        //The Box
        {
          trigger: true, x: 2375, y: 1200, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9
        },
        {
          trigger: true, x: 1400, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1.3, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 0, y: 1407, velocityX: 0, velocityY: 0, sizeX: 1.72, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1.653, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        //Inside the Box
        {
          trigger: true, x: 400, y: 1200, velocityX: 0, velocityY: 0, sizeX: .9, sizeY: .4, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 63, y: 800, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 974, y: 500, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 63, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },
        {
          trigger: true, x: 700, y: 600, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 17
        },
        {
          trigger: true, x: 400, y: 500, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableRotatedWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        },
        //Tiny Boxes inside the Box
        {
          trigger: true, x: 200, y: 950, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },
        {
          trigger: true, x: 200, y: 1150, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 20
        },
        {
          trigger: true, x: 500, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 21
        },
        {
          trigger: true, x: 600, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 22
        },
        {
          trigger: true, x: 700, y: 775, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 23
        },
        {
          trigger: true, x: 800, y: 700, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 24
        },
        {
          trigger: true, x: 800, y: 900, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 25
        },
        {
          trigger: true, x: 800, y: 1100, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 26
        },
        {
          trigger: true, x: 1000, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 27
        },
        {
          trigger: true, x: 1000, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 28
        },
        {
          trigger: true, x: 1100, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 29
        },
        {
          trigger: true, x: 1100, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 30
        },
        {
          trigger: true, x: 1200, y: 1100, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 31
        },
        {
          trigger: true, x: 1200, y: 800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 32
        },
        ////Left Room Blocker
        // {
        //   trigger: true, x: 64, y: 0, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: .5, art: "immovableRotatedWall",
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        // },
        // { x: 400, y: 1000, velocityX: 0, velodcityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall" },
        // { x: 700, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall" },

      ],
    wallSpawn:
      [true,
        {
          trigger: true, x: 1900, y: 1100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
      ],
    spikeSpawn:
      [true,
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: 1, sizeY: 1, art: "invertedSpikes", specialCondition: 0, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Special Condition Test to Remove A Game Object Level One
        // {
        //   trigger: true, x: 0, y: 1200, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: 1, art: "invertedSpikes", specialCondition: 1, specialWorld: 1, specialArray: 1, positionInArray: 2,
        // },
      ],
    ledgeGreySpawn:
      [false,
      ],
    ledgeGreenSpawn:
      [false,
      ],
    ledgeBlueSpawn:
      [false,
      ],
    enemySpawn:
      [false,
      ],
    ballSpawn:
      [true,
        {
          trigger: true, x: 700, y: 1350, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        // {
        //   trigger: true, x: 700, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        // },
      ],
    fallingSpikes:
      [false
      ],
    //Check Point
    flagSpawn:
      [false,
      ],
    text:
      [true,
        { x: 100, y: 2000, textInput: "W or Spacebar- Jump\nA- Left\nS- Push or Move Downwards\nD- Right\nTapping Twice on the Jump Button Lets You Double Jump\nJump Over the Wall", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 100, y: 1700, textInput: "Red is Death", font: "Times New Roman", fontSize: 30, fill: "#FF0000", fontWeight: "bold" }
        ,
        { x: 1300, y: 1650, textInput: "You Automatically Stick on Surfaces When You Jump on It\nPress A or D while on the Wall to Jump Off It\nWhile in the Air Move Towards the Wall to Stick to it Again\nKeep Jumping Off and Moving Again Towards the Wall to Climb Over\nTry Holding D While Tapping A while on Sticking on the Left Side of the Wall", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 1800, y: 2000, textInput: "You Can Stick and Move on the Bottom of Surfaces\nPress S to go Downwards or Push\n\nWhenever You Touch A Surface You Can Double Jump Again", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        //First Use of Weapons
        // { x: 1550, y: 1200, textInput: "Press 4 to Toggle Camera Mode (WASD to Move Camera)\n\nPress 1 to Access Pull Gun\nUse Mouse to Aim and Left Click to Shoot\nAny Object that is Moveable Can Be Pulled\n\nSurf the Grey Wall to the Top Using the Pull Gun\nHint: Jump While Shooting At the Grey Wall While Riding It", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
        { x: 1550, y: 1200, textInput: "Press 1 to Access Pull Gun\nUse Mouse to Aim and Left Click to Shoot\nAny Object that is Moveable Can Be Pulled\n\nSurf the Grey Wall to the Top Using the Pull Gun\nHint: Jump While Shooting At the Grey Wall While Riding It", font: "Arial Black", fontSize: 25, fill: "#ffffff", fontWeight: "bold" },
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
      [false,
        { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
      ],
    undeniableDeathSpawn:
      [true,
        //Ground Next To Flag
        {
          trigger: true, x: 725, y: 3170, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .4, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Top of the Yellow at the Bottom
        {
          trigger: true, x: 0, y: 2691, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Border of First Half
        {
          trigger: true, x: 1425, y: 1700, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: 1.08, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        //Connector to top of yellow
        {
          trigger: true, x: 700, y: 2000, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .714, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4
        },
        //Preventing Grey Cheese
        {
          trigger: true, x: 150, y: 1690, velocityX: 0, velocityY: 0, sizeX: .2, sizeY: .39, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5
        },
        //Border Slim Left Side
        {
          trigger: true, x: 0, y: 1400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .922, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6
        },
        // Next to Wall at the End of Grey Phase
        {
          trigger: true, x: 426, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .8029, sizeY: .395, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        //Entryway to the Green Ledge
        {
          trigger: true, x: 1550, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .714, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        },
        //Connector to right side of map
        {
          trigger: true, x: 1465, y: 3170, velocityX: 0, velocityY: 0, sizeX: .5249, sizeY: .4, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9
        },
        //Finally Hurdles Till You Get Respawn Twin Primes
        {
          trigger: true, x: 2150, y: 2000, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .811, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10
        },
        {
          trigger: true, x: 2250, y: 500, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: 1.5, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        {
          trigger: true, x: 2800, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: 1.837, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        //Long Pole Death
        {
          trigger: true, x: 2495, y: 600, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 2495, y: 1000, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 2495, y: 1400, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 2495, y: 1800, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },
        {
          trigger: true, x: 2495, y: 2200, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 17
        },
        {
          trigger: true, x: 2495, y: 2600, velocityX: 0, velocityY: 0, sizeX: .375, sizeY: .03, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 18
        },
        //Blue Ledge Past Long Pole of Death
        {
          trigger: true, x: 1200, y: 0, velocityX: 0, velocityY: 0, sizeX: 1.12, sizeY: .25, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },
        {
          trigger: true, x: 1200, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .8, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },
        {
          trigger: true, x: 1830, y: 500, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .25, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        {
          trigger: true, x: 1240, y: 1080, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .25, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        //Entry Way to Left Side of the Map
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .507, sizeY: .25, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7
        },
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .25, sizeY: .82, art: "sidewaysSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 19
        },


      ],
    immovableWallSpawn:
      [true,
        //Ground
        {
          trigger: true, x: 300, y: 3136, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Vertical Wall Connector to Level 0
        {
          trigger: true, x: 0, y: 2772, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableVerticalWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2,
        },
        //Mini Boxes
        {
          trigger: true, x: 1062.5, y: 2600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        //Top of First Grey Ledge
        {
          trigger: true, x: 430, y: 1690, velocityX: 0, velocityY: 0, sizeX: 1.17, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4,
        },
        //End of Grey Ledge
        {
          trigger: true, x: 0, y: 1336.5, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5,
        },
        //End of Green Ledge
        {
          trigger: true, x: 1591, y: 1336, velocityX: 0, velocityY: 0, sizeX: .774, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6,
        },
        //Entry to Right Side of Map
        {
          trigger: true, x: 2200, y: 3136, velocityX: 0, velocityY: 0, sizeX: .7, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7,
        },
        //Long Pole
        {
          trigger: true, x: 2500, y: 400, velocityX: 0, velocityY: 0, sizeX: .4, sizeY: 3, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        },
        // {
        //   trigger: true, x: 2400, y: 2800, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
        //   specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8
        // },
        //Left and Upwards Rooms of the Map
        {
          trigger: true, x: 773, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9,
        },
        //First Wall THat Gets Removed from Level 3
        {
          trigger: true, x: 773, y: 300, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 10,
        },
        {
          trigger: true, x: 710, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .8, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 11
        },
        {
          trigger: true, x: 425, y: 600, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .87, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 12
        },
        //Mini Walls at the End
        {
          trigger: true, x: 400, y: 400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 13
        },
        {
          trigger: true, x: 600, y: 600, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 14
        },
        {
          trigger: true, x: 600, y: 400, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 15
        },
        {
          trigger: true, x: 700, y: 500, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 16
        },
        {
          trigger: true, x: 300, y: 1000, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .05, art: "immovableVerticalWall",
          specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 17
        },

      ],
    wallSpawn:
      [true,
        //Before Grey
        {
          trigger: true, x: 1100, y: 3000, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //After BLue
        {
          trigger: true, x: 1100, y: 1250, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Kill These
        {
          trigger: true, x: 250, y: 600, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 250, y: 700, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 250, y: 800, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 250, y: 900, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 250, y: 1000, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        {
          trigger: true, x: 250, y: 1100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
      ],
    spikeSpawn:
      [true,
        // {
        //   trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: 2, sizeY: 1, art: "invertedSpikes", specialCondition: null, specialWorld: null, positionInArray: 1
        // },
        {
          trigger: true, x: 2800, y: 2853, velocityX: 0, velocityY: 0, sizeX: .6, sizeY: .4, art: "trueSpikes", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
      ],
    ledgeGreySpawn:
      [true,
        //First One You See
        { trigger: true, x: 100, y: 2600, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        { trigger: true, x: 1080, y: 2200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
      ],
    ledgeGreenSpawn:
      [true,
        { trigger: true, x: 1525, y: 3000, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        { trigger: true, x: 1700, y: 2200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
        { trigger: true, x: 1900, y: 2700, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3 },
        { trigger: true, x: 2100, y: 2000, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4 },
      ],

    ledgeBlueSpawn:
      [true,
        { trigger: true, x: 2270, y: 300, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
      ],
    enemySpawn:
      [false,
      ],
    ballSpawn:
      [true,
        {
          trigger: true, x: 975, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
      ],
    fallingSpikes:
      [false
      ],
    //Check Point
    flagSpawn:
      [true,
        { trigger: true, x: 600, y: 3050, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 1, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        { trigger: true, x: 2500, y: 3050, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 3, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
        { trigger: true, x: 200, y: 1250, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3 },
        // { x: 500, y: 3000, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 0 },
      ],
    text:
      [true,
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
      roomDownIndex: 1,
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
      [false,
        { x: 500, y: 500, teleportationX: 100, teleporationY: 50 }
      ],
    undeniableDeathSpawn:
      [true,
        /////////////////////////Orientation X-Left to Right //////////////////////
        //Bottom Towards the End of the Map
        {
          trigger: true, x: 0, y: 4100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .1, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //Top of Map
        {
          trigger: true, x: 300, y: 0, velocityX: 0, velocityY: 0, sizeX: 3.215, sizeY: .1, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Long Pit (Under Vertical Moveable Wall)
        {
          trigger: true, x: 1406.5, y: 4100, velocityX: 0, velocityY: 0, sizeX: .995, sizeY: .1, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
        //Bottom Towards the End of the Map
        {
          trigger: true, x: 3506, y: 4100, velocityX: 0, velocityY: 0, sizeX: .4169, sizeY: .1, art: "undeniableDeath", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
      ],
    immovableWallSpawn:
      [true,
        ///////////////Orientation X-Right to Left/////////////////////
        //Border of Level One and Level Two
        {
          trigger: true, x: 4800, y: 0, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .7, art: "immovableVerticalWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Ground
        {
          trigger: true, x: 4100, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Wall Blocking First Ground
        {
          trigger: true, x: 4090, y: 100, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .83, art: "immovableVerticalWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Wall with Little Hole
        {
          trigger: true, x: 3300, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .83, art: "immovableVerticalWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Past Max Jump
        {
          trigger: true, x: 2800, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Immovable Wall Past Vertical Moveable Wall
        {
          trigger: true, x: 700, y: 800, velocityX: 0, velocityY: 0, sizeX: .83, sizeY: .5, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Divider at the End
        {
          trigger: true, x: 300, y: 0, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "immovableVerticalWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Ground for the Flag
        {
          trigger: true, x: 128, y: 388.3, velocityX: 0, velocityY: 0, sizeX: .276, sizeY: .297, art: "immovableRotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
        //Border Edge At The End of The Level
        {
          trigger: true, x: 0, y: 0, velocityX: 0, velocityY: 0, sizeX: .3, sizeY: .93, art: "immovableVerticalWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1,
        },
      ],
    wallSpawn:
      [true,
        {
          trigger: true, x: 4500, y: 400, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "rotatedWall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1
        },
        //First Vertical Wall
        {
          trigger: true, x: 2000, y: 400, velocityX: 0, velocityY: 0, sizeX: .5, sizeY: .5, art: "wall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2
        },
        //Test Wall
        {
          trigger: true, x: 500, y: 300, velocityX: 100, velocityY: 0, sizeX: .5, sizeY: .5, art: "wall", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3
        },
      ],
    spikeSpawn:
      [true,
      ],
    ledgeGreySpawn:
      [true,
        { trigger: true, x: 100, y: 100, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6 },
        { trigger: true, x: 1000, y: 150, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6 },
      ],
    ledgeGreenSpawn:
      [true,
        { trigger: true, x: 1000, y: 250, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7 },
      ],
    ledgeBlueSpawn:
      [true,
        { trigger: true, x: 1000, y: 450, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8 },
      ],
    enemySpawn:
      [true,
        //First Three Enemies
        { trigger: true, x: 4300, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        { trigger: true, x: 4500, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 2 },
        { trigger: true, x: 4700, y: 200, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 3 },
        //Blocking the first obstacle
        { trigger: true, x: 4125, y: 50, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 4 },
        //Maximum Jump Enemy
        { trigger: true, x: 3500, y: 500, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 5 },
        //Four Enemies of the Gate
        // { trigger: true, x: 1000, y: 50, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 6 },
        // { trigger: true, x: 1000, y: 250, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 7 },
        // { trigger: true, x: 1000, y: 450, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 8 },
        // { trigger: true, x: 1000, y: 650, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9 },
      ],
    ballSpawn:
      [false,
        // { trigger: true, x: 900, y: 450, velocityX: 0, velocityY: 0, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 9 },
      ],
    fallingSpikes:
      [true,
        { trigger: true, x: 475, y: 50, seconds: 3, velocityX: 0, velocityY: 500, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        // { trigger: true, x: 4700, y: 50, seconds: 5, velocityX: 0, velocityY: 500, specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
      ],
    //Check Point
    flagSpawn:
      [true,
        //Flag At the Beginning of the Level
        // { trigger: true, x: 4600, y: 650, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 3, art: "flag", specialCondition: null, specialWorld: null, specialArray: null, positionInArray: 1 },
        //Flag At the End of The Level
        { trigger: true, x: 220, y: 250, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: 1, specialWorld: 1, specialArray: 10, positionInArray: 2 },
        //test
        { trigger: true, x: 4600, y: 650, velocityX: 0, velocityY: 0, indexOfPlayerPosition: 2, art: "flag", specialCondition: 1, specialWorld: 1, specialArray: 10, positionInArray: 2 },
      ],
    text:
      [true,
      ],



    //Any Other Property Here Are Unditional Objects
    //Falling or Sideways Spikes
    //Super Ball
    //World Gravity
    //Traps that create generating enemies
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
  "MetroidVanian: Finishing This YOYO",
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
}

function deathThree(killer, victim) {
  victim.kill();
}
///////////////////////////////////////////Physics Within Game Mechanics////////////////////////////////////////////

////////////////////////////////////////Wall Mechanics//////////////////////////////////////////
function wallGroupPhysics(sprite1, sprite2) {
  // sprite2.body.stop();
  sprite1.body.stop();
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

function wallStopper (wall,sprite2) {
  if (wall.body.touching.up) {
    wall.body.velocity.y += wall.body.velocityVsImmovable;
  }
  if (wall.body.touching.down) {
    wall.body.velocity.y -= wall.body.velocityVsImmovable;;
  }
  if (wall.body.touching.left) {
    wall.body.velocity.x += wall.body.velocityVsImmovable;;
  }
  if (wall.body.touching.right) {
    wall.body.velocity.x -= wall.body.velocityVsImmovable;
  }
}

///////////////////////////////Player vs. Wall//////////////////
// function playerVsWall (player,wall) {
//   if (wall.body.touching.down) {
//     wall.body.velocity.y = -200;
//   }
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
function ledgeUp(player, ledge) {
  //When You're On Top of the Ledge
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

function ledgeDownS(player, ledge) {
  //When You're On Top of the Ledge
  if (ledge.body.touching.up) {
    player.body.velocity.y = -1200;
  }
}

function ledgeSideX(player, ledge) {
  ////////////////Old Controls////////////////////
  // if (ledge.body.velocity.x > 0) {
  //   ledge.body.velocity.x = 300;
  // }
  // else if (ledge.body.velocity.x < 0) {
  //   ledge.body.velocity.x = -300;
  // }
  // else if (ledge.body.velocity.y >= 0 || ledge.body.velocity.y < 0) {
  //   ledge.body.stop();
  //   ledge.body.velocity.x = 300;
  // }
  // ledge.body.stop();
  ledge.body.velocity.y = 200;
  ledge.body.velocity.x = player.body.velocity.x;
}


////////////////////////////Weapon Mechanics/////////////////////////
// this.game.physics.arcade.overlap(this.weapon.bullets, this.wall, weaponWall);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.spikes, weaponSpikes);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.ledge, weaponLedge);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.ledgeDown, weaponDownLedge);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.ledgeSide, weaponSideLedge);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.enemy, weaponEnemy);
function weaponImmovable(weapon, wall) {
  weapon.kill();
}

function pullWeaponHandler(weapon, sprite) {
  this.game.physics.arcade.moveToObject(sprite, this.player, 200);
  weapon.kill();
}

function stopWeaponHandler(weapon, sprite) {
  sprite.body.stop();
  weapon.kill();
}

function killWeaponHandler(weapon, sprite) {
  sprite.kill();
  if (sprite.key === "coin" || sprite.key === "flag") {
    //Refactor
    // console.log("it hit? coinX");
    if (streak > longestStreak) {
      longestStreak = streak;
    }
    streak = 0;
    game.state.start('deathState');
  }
  weapon.kill();
}

function pullWeaponHandlerForFlag(sprite, weapon) {
  this.game.physics.arcade.moveToObject(sprite, this.player, 200);
  weapon.kill();
}

function stopWeaponHandlerForFlag(sprite, weapon) {
  sprite.body.stop();
  weapon.kill();
}

function killWeaponHandlerForFlag(sprite, weapon) {
  sprite.kill();
  if (sprite.key === "coin" || sprite.key === "flag") {
    //Refactor
    // console.log("it hit? coinX");
    if (streak > longestStreak) {
      longestStreak = streak;
    }
    streak = 0;
    game.state.start('deathState');
  }
  weapon.kill();
}

function moveTowardsPlayer(sprite1, player) {
  if (game.physics.arcade.distanceBetween(sprite1, player, false, true) < 500) {
    /////Alpha Build One/////
    //At the very least we can use the daakath game mode for this.
    game.physics.arcade.moveToObject(sprite1, player, 300);
    /////Alpha Build Two/////
    //game.physics.arcade.moveToXY(sprite1, player.x, player.y, 60, 2000);
  }
}

///////////////////////////////////////Preventing Physics Bugs//////////////////////////
//Preventing Physics Bugs
// function preventPhysicsBug(sprite1, sprite2) {
//   if (sprite1.body.touching.down) {
//     sprite1.body.velocity.y = -1000;
//   }
// }

/*
/////////////////////////////////Reference Code///////////////////////////////
//Pass Arguments forEachAlive
    // this.coin.forEachAlive(moveTowardsPlayer, this, this.player);
//Shoot from Directional
        if (pullBoolean) {
            if (this.cursors.up.isDown) {
                this.weapon1.fireAngle = 270;
                this.weapon1.fire();
            }
            else if (this.cursors.down.isDown) {
                this.weapon1.fireAngle = 90;
                this.weapon1.fire();
            }
            else if (this.cursors.left.isDown) {
                this.weapon1.fireAngle = 180;
                this.weapon1.fire();
            }
            else if (this.cursors.right.isDown) {
                this.weapon1.fireAngle = 0;
                this.weapon1.fire();
            }
        }
        else if (pushBoolean) {
            if (this.cursors.up.isDown) {
                this.weapon2.fireAngle = 270;
                this.weapon2.fire();
            }
            else if (this.cursors.down.isDown) {
                this.weapon2.fireAngle = 90;
                this.weapon2.fire();
            }
            else if (this.cursors.left.isDown) {
                this.weapon2.fireAngle = 180;
                this.weapon2.fire();
            }
            else if (this.cursors.right.isDown) {
                this.weapon2.fireAngle = 0;
                this.weapon2.fire();
            }
        }
        else if (stopBoolean) {
            if (this.cursors.up.isDown) {
                this.weapon3.fireAngle = 270;
                this.weapon3.fire();
            }
            else if (this.cursors.down.isDown) {
                this.weapon3.fireAngle = 90;
                this.weapon3.fire();
            }
            else if (this.cursors.left.isDown) {
                this.weapon3.fireAngle = 180;
                this.weapon3.fire();
            }
            else if (this.cursors.right.isDown) {
                this.weapon3.fireAngle = 0;
                this.weapon3.fire();
            }
        }
//Former Ledge Mechanics
function enemyLedge(ledge, enemy) {
  if (ledge.body.touching.up) {
    enemy.body.stop();
    ledge.body.stop();
    enemy.body.velocity.y = -125;
    ledge.body.velocity.y = 200;
  }
  else if (ledge.body.touching.down) {
    enemy.body.stop();
    ledge.body.stop();
    enemy.body.velocity.y = 125;
    ledge.body.velocity.y = -200;
  }
  else if (ledge.body.touching.left) {
    enemy.body.stop();
    ledge.body.stop();
    enemy.body.velocity.x = -125;
    ledge.body.velocity.x = 200;
  }
  else if (ledge.body.touching.right) {
    enemy.body.stop();
    ledge.body.stop();
    enemy.body.velocity.x = 125;
    ledge.body.velocity.x = -200;
  }
}
radians = this.game.physics.arcade.angleBetween(this.coinX, this.player);
degrees = radians * (180/Math.PI);
this.game.physics.arcade.velocityFromAngle(degrees, 300, this.player.body.velocity);
*/