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
  "OhSniperActivated",
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
var level_0 = new LevelCreator("Level 0-Physics Testing", 1400, 800, new MetroidvaniaCreator(1, 0, 0, 800, 0, 0, 0, 1400), "#FFFDD0");

//world gravity
// level_0.worldGravity = new worldGravityCreator(200,200);

//Creation of Nen System in Level
level_0.nenSystem = portalNen;

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(400, 700),
  new PlayerPositionCreator(400, 700),
  new PlayerPositionCreator(400, 700),
  new PlayerPositionCreator(400, 700),
]

//
level_0.spriteSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathBallKill, 'tile', deathTile, 0, 0, 50, 750, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 1400, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 0, 800, 1400, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallCloud, 'tile', wallTile50, 800, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
  //Repeating Ledge
  new SpriteCreator(true, ledgeElevator, 'timer', ledge, 400, 100, 150, 50, 1, 300, 200, 0, 0, null, new timerCreator('repeat', 4, 3)),
  //Ball
  new SpriteCreator(true, ballRegular, 'sprite', ball, 200, 100, 50, 50, 1, -300, 0, 0, 0, null, null),
  //Enemy
  new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 100, 200, 50, 50, 1, 0, 200, 0, 0, null, new timerCreator('repeat', 4, 3)),
  //Falling Spikes
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 500, 100, 50, 50, 1, 0, 0, 0, 500, null, new timerCreator('loop', null, 3)),
];

//flag spawn
level_0.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 600, 400, 0, 0, .4, .4, 0, 0, null),
];
////////////////////////////////////////Level 1-SandboxMode/////////////////////////////////////
//New Playground
var level_1 = new LevelCreator("Level 1-SandboxMode", 1400, 10000, new MetroidvaniaCreator(1, 0, 1, 10000, 2, 0, 1, 1400), '#ffffff');

//World Gravity
// level_1.worldGravity = new worldGravityCreator(200,200);

//Creation of Nen System in Level
level_1.nenSystem = portalNen;

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
]

level_1.spriteSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 0, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 1400, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  //Testing
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 0, 9950, 1400, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 200, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 400, 100, 150, 50, 1, 300, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 200, 100, 50, 50, 1, 300, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 100, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 500, 100, 50, 50, 1, 0, 0, 0, 500, null, new timerCreator('loop', null, 3)),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 600, 400, 0, 0, .4, .4, 0, 0, null),
];

////////////////////////////////////////Level 2/////////////////////////////////////
var level_2 = new LevelCreator("Level 2-What", 4800, 2000, new MetroidvaniaCreator(3, 0, 3, 2000, null, null, 1, 4800), '#FFFDD0');

//Creation of Nen System in Level
level_2.nenSystem = portalNen;

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(1700, 690),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(4500, 1900),
]

level_2.spriteSpawn = [
  //Repeating Traps on Slippery Wall
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4600, 1600, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4600, 1300, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4600, 1000, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4600, 700, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4600, 400, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4600, 100, 200, 25, .5, 0, 0, 0, 0, null, null),
  //Moving Traps (Make Grabbing enemyShooter Harder)
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4200, 50, 50, 50, 1, 0, 700, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4400, 50, 50, 50, 1, 0, 700, 0, 0, scReverseVelocity, null),
  //To Help You Grab the Enemy Shooter
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 4300, 50, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Death Border on Top of Phaser Wall
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4000, 0, 50, 1500, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4050, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4050, 1475, 25, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 3950, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Phaser Wall
  // new SpriteCreator(true, immovableWallPhase, 'tile', immovableWallTile, 4000, 1500, 50, 450, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  new SpriteCreator(true, immovableWallPhase, 'tile', immovableWallTile, 4000, 1500, 50, 450, 1, 0, 0, 0, 0, null, null),
  //Slippery Wall to Climb
  new SpriteCreator(true, immovableWallSlippery, 'tile', immovableWallTile, 4800, 0, 50, 1800, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 4000, 2000, 800, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 0, 2000, 4000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 3950, 1900, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Falling Spikes After Phase Wall
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3700, 50, null, null, 1, 0, 0, 0, 500, null, new timerCreator('loop', null, 3)),
  //Falling Spikes Test Left Hand Side
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesTwo, 200, 1300, null, null, 1, 0, 0, 500, 0, null, new timerCreator('loop', null, 3)),
  //Enemy to Grab to Kill Phase Wall
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 4700, 60, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Death Border Right Hand Side
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4050, 0, 700, 25, .5, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 200, 1800, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, hazamaFalconia, 'tile', hazamaHippie, 4200, 0, 500, 1800, 1, 0, 0, 0, 0, null, null),
  //Sniper Nest Immovable Wall
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 3950, 1800, 50, 50, 1, 0, 0, 0, 0, null, null),
  //First Moveable Wall to Grab on Left Hand Side
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 200, 1890, 25, 25, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'sprite', wallTile50, 700, 200, 50, 50, 1, 0, 0, 0, 0, null, null),

];

//Flag Spawn
level_2.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(3, true, flagRegular, flag, 4700, 1900, 0, 0, 1, 1, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_2.text = [
  new textCreator(true, 4650, 1800, "Sandbox\n\n→", fontGrind, 25),
];

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator("Level 3-SandboxMode", 1400, 10000, new MetroidvaniaCreator(1, 0, 1, 10000, 2, 0, 1, 1400), '#FFFDD0'); //2400

// level_3.worldGravity = new worldGravityCreator(200, 300);

//Creation of Nen System in Level
level_3.nenSystem = portalNen;

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
]

//Sprite Generation
level_3.spriteSpawn = [
  //Side Borders
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 0, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 1400, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  //Moving Blocks
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 300, 9700, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 500, 9500, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 700, 9300, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 900, 9100, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 200, 8900, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 400, 8700, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 600, 8500, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 800, 8300, 50, 50, 1, 1000, 0, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 0, 9950, 1400, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 600, 9900, 25, 25, 1, 0, 0, 0, 0, null, null),
  
];

///////////////////////////////////////////Level 4///////////////////////////////////////////////////////////
var level_4 = new LevelCreator("Level 4-SEAN MOODY", 4200, 3000, new MetroidvaniaCreator(4, 0, 4, 3000, 2, 0, 4, 4200), "#D3D3D3"); //3800

//world gravity
// level_4.worldGravity = new worldGravityCreator(200,200);

//Creation of Nen System in Level
level_4.nenSystem = portalNen;

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_4.playerPosition = [
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
]

//Sprite Generation
level_4.spriteSpawn = [
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 0, 3000, 500, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 550, 3000, 500, 50, 1, 0, 0, 0, 0, null, null),
];

//////////////////////////////////////////Pushing All Levels Into World Array/////////////////////////////////////
var levelCount = 4;
for (var i = 0; i <= levelCount; i++) {
  // worldClassLevels.push(eval("level_"+i));
  worldClassLevels.push(window["level_" + i]);
}
