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
  "eVAL()",
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
/////////////////////////////////////////////////Array Shuffler///////////////////////////////////////
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}
///////////////////////////////////////////Levels///////////////////////////////////////////////////////////
//Level Holder
var worldClassLevels = [];
///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator("Level 0-Physics Testing", 1400, 800, new MetroidvaniaCreator(1, 0, 0, 800, 0, 0, 0, 1400), "#FFFDD0"); //3800

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
  new SpriteCreator(true, wallRegular, wallTile50, 700, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallCloud, wallTile50, 800, 200, 150, 50, 1, 0, 0, 0, 0, null, null),

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
  new SpriteCreator(true, fallingSpikesRegular, fallingSpikesOne, 500, 100, null, null, 1, 0, 0, 0, 500, null, 3),
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
];

////////////////////////////////////////Level 1-SandboxMode/////////////////////////////////////

//New Playground
var level_1 = new LevelCreator("Level 1-SandboxMode", 1400, 10000, new MetroidvaniaCreator(1, 0, 1, 10000, 2, 0, 1, 1400), '#ffffff');

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
]

//Creation of Undeniable Death

level_1.undeniableDeathSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 0, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 1400, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  //Testing
  // new SpriteCreator(true, undeniableDeathRegular, deathTile, 100, 200, 50, 50, 1, 500, 0, 0, 0, null, null),

];

//Creation of ImmovableWalls
level_1.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 0, 9950, 1400, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of Moveable Walls
level_1.wallSpawn = [
  new SpriteCreator(true, wallRegular, wallTile50, 700, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, fallingSpikesRegular, fallingSpikesOne, 500, 100, null, null, 1, 0, 0, 0, 500, null, 3),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 600, 400, 0, 0, .4, .4, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_1.text = [

];

////////////////////////////////////////Level 2/////////////////////////////////////
var level_2 = new LevelCreator("Level 2-What", 4800, 2000, new MetroidvaniaCreator(3, 0, 3, 2000, null, null, 1, 4800), '#FFFDD0');

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
  // new SpriteCreator(true, undeniableDeathRegular, deathTile, 4700, 1700, 50, 50, 1, 700, 0, 0, 0, 1, null),

  //Top of the Yellow at the Bottom
];

/////////////////////////Creation of ImmovableWalls
level_2.immovableWallSpawn = [
  //Border of Level One and Level Two
  new SpriteCreator(true, immovableWallSlippery, immovableWallTile, 4800, 0, 50, 1800, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 4000, 2000, 800, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallActivation, immovableWallTile, 4200, 1700, 200, 25, .5, 0, 0, 0, 0, null, null),

];

//Moveable Walls 
level_2.wallSpawn = [
  new SpriteCreator(true, wallRegular, wallTile50, 4400, 1100, 150, 50, 1, 0, 0, 0, 0, null, null),
];


//Ledges
level_2.ledgeSpawn = [
  new SpriteCreator(true, elevator, ledge, 4200, 1600, null, null, 1, 0, 0, 0, 0, null, null),
];

//Enemy Spawn
level_2.enemySpawn = [
  // new SpriteCreator(true, enemyDaakath, enemyOne, 4300, 1400, null, null, 1, 0, 0, 0, 0, null, null),
];

//Ball
level_2.ballSpawn = [
];


//Falling Spikes
level_2.fallingSpikes = [
  new SpriteCreator(true, fallingSpikesRegular, fallingSpikesOne, 4500, 100, null, null, 1, 0, 0, 0, 500, null, 3),
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
];

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator("Level 3-SandboxMode", 1400, 10000, new MetroidvaniaCreator(1, 0, 1, 10000, 2, 0, 1, 1400), '#FFFDD0'); //2400

// level_3.worldGravity = new worldGravityCreator(200, 300);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
]

//Creation of Undeniable Death

level_3.undeniableDeathSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 0, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 1400, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  //Moving Blocks
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 300, 9700, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 500, 9500, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 700, 9300, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 900, 9100, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 200, 8900, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 400, 8700, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 600, 8500, 50, 50, 1, 1000, 0, 0, 0, 1, null),
  new SpriteCreator(true, undeniableDeathRegular, deathTile, 800, 8300, 50, 50, 1, 1000, 0, 0, 0, 1, null),
];

//Creation of ImmovableWalls
level_3.immovableWallSpawn = [
  //Ground
  new SpriteCreator(true, immovableWallRegular, immovableWallTile, 0, 9950, 1400, 50, 1, 0, 0, 0, 0, null, null),
];

//Creation of Moveable Walls
level_3.wallSpawn = [
  new SpriteCreator(true, wallRegular, wallTile25, 600, 9900, 25, 25, 1, 0, 0, 0, 0, null, null),
];
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
];

//////////////////////////////////////////Pushing All Levels Into World Array/////////////////////////////////////
var levelCount = 4;
for (var i = 0; i <= levelCount; i++) {
  // worldClassLevels.push(eval("level_"+i));
  worldClassLevels.push(window["level_"+i]);
}

