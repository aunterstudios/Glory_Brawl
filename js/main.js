var game = new Phaser.Game(1400, 800, Phaser.CANVAS);
// var game = new Phaser.Game(1920, 1080, Phaser.CANVAS);
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
game.state.add('boot', brawl.boot);
game.state.add('mainMenu', brawl.mainMenu);
game.state.add('deathState', brawl.death);
game.state.add('game', brawl.game);
game.state.add('story', brawl.story);
game.state.add('startScreen', brawl.startScreen);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
game.state.start('boot');
//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "GroundVs.Death",
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

///////////////////////////////////////////Levels///////////////////////////////////////////////////////////
//Level Holder
var worldClassLevels = [];
///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator(
  "Level 0-Physics Testing", //Name of World
  2800, //X-Size of World
  800,  //Y- Size of World 
  "#FFFDD0", //Background Color
  true, //Out of Bounds Allowed
  1, //PlayerScale
  portalNen, //Nen-System
  bounceGhostGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Special Level Initiated
// level_0.specialLevel = new TimerLevel('timed', 1, 5, 0, 10);
// level_0.specialLevel = new KillAllLevel('killAll', 0, 5, 0, 1);
level_0.specialLevel = new CollectLevel('collected', 1, 5, 0, 4);

//Room-Switching
level_0.metroidvania = new MetroidvaniaCreator(
  1, //Room-Up-Index
  0, //Room-Down-Index
  0, //Room-Left-Index
  0, //Room-Right-Index
);

//World Gravity
// level_0.worldGravity = new worldGravityCreator(0, -200);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_0.playerPosition = [
  new PlayerPositionCreator(800, 700),
  new PlayerPositionCreator(800, 700),
  new PlayerPositionCreator(800, 700),
  new PlayerPositionCreator(800, 700),
];

//Object Generation
level_0.spriteSpawn = [
  //Side Borders
  new SpriteCreator(true, deathBallKill, 'tile', deathTile, 0, 0, 50, 750, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2750, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 800, 2800, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 400, 50, 500, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  //Ledge
  // new SpriteCreator(true, ledgeElevator, 'timer', ledge, 400, 100, 150, 50, 1, 300, 200, 0, 0, null, new timerCreator('repeat', 4, 3)),
  // new SpriteCreator(true, ledgeElevator, 'timer', ledge, 1000, 100, 150, 50, 1, 0, 200, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1000, 100, 150, 50, 1, 0, 200, 0, 0, null, null),
  // new SpriteCreator(true, ledgeSurf, 'timer', ledge, 2000, 100, 150, 50, 1, 0, 200, 0, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, ledgeBounce, 'timer', ledge, 1500, 100, 150, 50, 1, 0, 200, 0, 0, null, new timerCreator('loop', null, 2)),
  //Ball
  // new SpriteCreator(true, ballRegular, 'timer', ball, 1400, 400, 50, 50, 1, -300, 0, 0, 0, null, new timerCreator('repeat', 4, 3)),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 2000, 400, 50, 50, 1, -300, 200, 0, 0, null, null),
  //Enemy
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 2400, 100, 50, 50, 1, 800, 800, 0, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 2500, 700, 50, 50, 1, 800, 800, 0, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 400, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 500, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 600, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 700, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // Wall
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1000, 400, 50, 50, 1, 300, 200, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'tile', wallTile50, 400, 300, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 500, 300, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 600, 300, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 300, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Falling Spikes
  // new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 500, 100, 50, 50, 1, 0, 0, 0, 500, null, new timerCreator('loop', null, 2)),
  //Invisible
  // new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 200, 400, 200, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 200, 450, 50, 200, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 200, 650, 200, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 350, 450, 50, 200, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 250, 500, 50, 50, 1, 1000, 1000, 0, 0, null, null),
  //Ground Move
  // new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 1000, 200, 50, 50, 1, 0, 200, 0, 0, null, null),
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 500, 150, 50, 500, 1, -200, 0, 0, 0, null, null),
  //Coin
  new SpriteCreator(true, coinDefault, 'sprite', coin, 600, 200, 50, 50, 1, 0, 0, 0, 0, scCollect, null),
  new SpriteCreator(true, coinDefault, 'sprite', coin, 600, 300, 50, 50, 1, 0, 0, 0, 0, scCollect, null),
  new SpriteCreator(true, coinDefault, 'sprite', coin, 600, 400, 50, 50, 1, 0, 0, 0, 0, scCollect, null),
  new SpriteCreator(true, coinDefault, 'sprite', coin, 600, 500, 50, 50, 1, 0, 0, 0, 0, scCollect, null),
  //Death Move
  // new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 100, 50, 500, 1, 300, 0, 0, 0, new specialConditionCreator('spriteKiller', 300, 300), null),
  // new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 300, 50, 50, 1, -300, 0, 0, 0, null, null),
  // new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 400, 50, 50, 1, -300, 0, 0, 0, null, null),
  // new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 500, 50, 50, 1, -300, 0, 0, 0, null, null),
  // new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 200, 50, 500, 1, 500, 0, 0, 0, new specialConditionCreator('spriteKiller', 500, 500), null),
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 500, 150, 50, 500, 1, 0, 0, 0, 0, null, null),
  //Power Up
  new SpriteCreator(true, powerJump, 'sprite', powerJar, 1300, 500, 50, 50, 1, 0, 0, 0, 0, null, null),
];

//flag spawn
level_0.flagSpawn = [
  // //First Flag
  // new flagCreator(0, true, flagSpecial, flag, 1, 600, 500, -200, 0, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(0, 3)
  //   ])),
  // new flagCreator(0, true, flagRegular, flag, 1, 100, 500, -200, 0, 0, 0,
  //   new spriteLevelSwitch(0, 
  //     [], //Insert Index (Levels)
  //     [], //Insert Sprite
  //     [3], //Remove Index (Levels)
  //     [0, 1], //Remove Sprite
  //   )),
];

////////////////////////////////////////Level 1-SandboxMode/////////////////////////////////////
//New Playground
var level_1 = new LevelCreator(
  "Level 1-SandboxMode", //Name of World
  1400, //X-Size of World
  16000, //Y-Size of World
  '#B0CDEA', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  noGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_1.metroidvania = new MetroidvaniaCreator(
  1, //Room-Up-Index
  1, //Room-Down-Index
  2, //Room-Left-Index
  1, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  // new PlayerPositionCreator(150, 100),
  // new PlayerPositionCreator(150, 100),
  // new PlayerPositionCreator(150, 100),
  // new PlayerPositionCreator(150, 100),
  //Second Side
  new PlayerPositionCreator(700, 100),
  new PlayerPositionCreator(700, 100),
  new PlayerPositionCreator(700, 100),
  new PlayerPositionCreator(700, 100),
]

level_1.spriteSpawn = [
  ///////////////////////////////////////Pillars//////////////////////////////////////
  //Left
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 0, 0, 50, 8000, 1, 0, 0, 0, 0, null, null),
  //Middle
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 500, 0, 50, 1000, 1, 0, 0, 0, 0, null, null),
  //Right
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1350, 0, 50, 1050, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 1350, 1050, 50, 2000, 1, 0, 0, 0, 0, null, null),
  /////////////////////////////////////////Ground/////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 600, 200, 200, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////First White Section//////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 600, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 700, 900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 850, 1000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 900, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1000, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 550, 1000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 700, 900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 900, 1300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1000, 1100, 50, 50, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////////Hazama/////////////////////////////////////////////////////
  new SpriteCreator(true, hazamaFalconia, 'tile', hazamaHippie, 50, 1000, 1300, 950, 1, 0, 0, 0, 0, null, null),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 1, 750, 150, 0, 0, 0, 0, null),
];

////////////////////////////////////////Level 2/////////////////////////////////////
//Level Begin
var level_2 = new LevelCreator(
  "Level 2-What", //Name of World
  4800, //X-Size of World
  2000, //Y-Size of World
  '#FFFDD0', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  funGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_2.metroidvania = new MetroidvaniaCreator(
  3, //Room-Up-Index
  3, //Room-Down-Index
  null, //Room-Left-Index
  4, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(3750, 1375),
  new PlayerPositionCreator(200, 925),
  new PlayerPositionCreator(4500, 1900),
]

level_2.spriteSpawn = [
  //Repeating Traps on Slippery Wall
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4600, 1600, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4600, 1300, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4600, 1000, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4600, 700, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4600, 400, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4600, 100, 200, 25, .5, 0, 0, 0, 0, null, null),
  //Moving Traps (Make Grabbing enemyShooter Harder)
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4200, 50, 50, 50, 1, 0, 700, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4400, 50, 50, 50, 1, 0, 700, 0, 0, null, null),
  //To Help You Grab the Enemy Shooter
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 4300, 50, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Death Border on Top of Phaser Wall
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4000, 0, 50, 1500, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4050, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3950, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Phaser Wall
  // new SpriteCreator(true, groundPhase, 'tile', groundTile, 4000, 1500, 50, 450, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  //Slippery Wall to Climb
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 4800, 0, 50, 1800, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 4000, 2000, 800, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 2000, 4000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3950, 1900, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Moving Traps for Third Part
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 1100, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 1200, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 1300, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1600, 1100, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2000, 1200, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2400, 1300, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 1100, 50, 50, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 3200, 1200, 50, 50, 1, 0, 500, 0, 0, null, null),
  //Enemy to Grab to Kill Phase Wall
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 4700, 60, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Death Border Right Hand Side
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4050, 0, 700, 25, .5, 0, 0, 0, 0, null, null),
  //Sniper Nest Immovable Wall
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3950, 1800, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Top Borders of Movable Traps Wall Edition Part One
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 1450, 3900, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 3900, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Top Borders of Movable Traps Wall Edition Part Two
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 100, 1000, 3900, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayPlayer, 'tile', deathTile, 25, 1000, 100, 50, .5, 0, 0, 0, 0, null, null),
  //First Moveable Wall to Grab on Left Hand Side
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 200, 1890, 25, 25, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'tile', wallTile25, 3400, 1700, 25, 200, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'sprite', wallTile50, 700, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Moving Traps on Moveable Wall
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 1800, 50, 50, 1, 0, 600, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1300, 1800, 50, 50, 1, 0, 600, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2100, 1800, 50, 50, 1, 0, 600, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2900, 1800, 50, 50, 1, 0, 600, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 3700, 1800, 50, 50, 1, 0, 600, 0, 0, null, null),
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 4400, 50, 50, 50, 1, 0, 700, 0, 0, null, null),
  //Top Left Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 0, 25, 1950, .5, 0, 0, 0, 0, null, null),
  //CheckPoint Holder for Third Part
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3950, 1400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3600, 1400, 300, 50, 1, 0, 0, 0, 0, null, null),
  //Moveable Wall for Third Part
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 3500, 1425, 25, 25, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 3400, 1425, 25, 25, 1, 0, 0, 0, 0, null, null),
  //Checkpoint Holder for End of Third Part
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 100, 950, 250, 50, 1, 0, 0, 0, 0, null, null),
  //Just to Mess With You on the Last Part of the Third
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 200, 1100, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 200, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 200, 1300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 200, 1400, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Sideways Spikes for Third Part
  // new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesTwo, 75, 1100, null, null, 1, 800, 0, 400, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesTwo, 75, 1200, null, null, 1, 800, 0, 400, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesTwo, 75, 1300, null, null, 1, 800, 0, 400, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesTwo, 75, 1425, null, null, 1, 800, 0, 400, 0, null, new timerCreator('loop', null, 2)),
  //Top Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 200, 0, 3800, 50, 1, 0, 0, 0, 0, null, null),
  //Traps for Last Part
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 25, 400, 500, 25, .5, 0, 0, 0, 0, null, null),
  //Hazama For the lastest part
  new SpriteCreator(true, hazamaFalconia, 'tile', hazamaHippie, 400, 50, 3600, 950, 1, 0, 0, 0, 0, null, null),
  //Mini Wall for Second Part
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 3800, 1890, 25, 25, 1, 0, 0, 0, 0, null, null),

];

//Flag Spawn
level_2.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(3, true, flagRegular, flag, 1, 4700, 1900, 0, 0, 0, 0, null),
  new flagCreator(1, true, flagRegular, flag, 1, 3800, 1350, 0, 0, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 1, 300, 900, 0, 0, 0, 0, null),

];

//Text Creator (Helpful Hints)
level_2.text = [
  new textCreator(true, 4650, 1800, "Sandbox\n\n→", fontGrind, 25),
];

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator(
  "Level 3-MovingBlocks", //Name of World
  1400, //X-Size of World
  10000, //Y-Size of World
  '#FFFDD0', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  basicGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_3.metroidvania = new MetroidvaniaCreator(
  2, //Room-Up-Index
  1, //Room-Down-Index
  2, //Room-Left-Index
  1, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(200, 100),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
  new PlayerPositionCreator(200, 9900),
]

//Sprite Generation
level_3.spriteSpawn = [
  ////////////////////////////////////////Side Borders/////////////////////////////////////////////////
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1400, 0, 50, 9950, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////Moving Blocks/////////////////////////////////////////////////
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 9700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 9500, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 700, 9300, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 9100, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 8900, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 8700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 8500, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 8300, 50, 50, 1, 1000, 0, 0, 0, null, null),
  ///////////////////////////////////////Ground/////////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 9950, 1400, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Platform Wall Your Friend////////////////////////////////////////////////////
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 600, 9900, 25, 25, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Testing////////////////////////////////////
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 200, 900, 25, 25, 1, 0, 0, 0, 0, null, null),
];

level_3.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  // new flagCreator(3, true, flagRegular, flag, 4700, 1900, 0, 0, 1, 1, 0, 0, null),
];

///////////////////////////////////////////Level 4///////////////////////////////////////////////////////////
var level_4 = new LevelCreator(
  "Level 4-Play Around", //Name of World
  4200, //X-Size of World
  3000, //Y-Size of World
  '#ffffff', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  funGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_4.metroidvania = new MetroidvaniaCreator(
  4, //Room-Up-Index
  4, //Room-Down-Index
  2, //Room-Left-Index
  4, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_4.playerPosition = [
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(3500, 2900),
]

//Sprite Generation
level_4.spriteSpawn = [
  ////////////////////////////////////First Phase/////////////////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 3000, 500, 50, 1, 0, 0, 0, 0, null, null),
  //Obstacles
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 500, 2500, 50, 450, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1000, 2250, 50, 450, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1500, 2500, 50, 450, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayKillObject, 'tile', groundTile, 2950, 2250, 50, 700, 1, 0, 0, 0, 0, null, null),
  //Top Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 2200, 3000, 50, 1, 0, 0, 0, 0, null, null),
  //Surf Board
  new SpriteCreator(true, wallCloud, 'tile', wallTile50, 300, 2750, 150, 50, 1, 0, 0, 0, 0, null, null),
  //Repeating Traps
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 2850, 2350, 50, 50, 1, -400, 400, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 2850, 2850, 50, 50, 1, -400, -400, 0, 0, null, new timerCreator('loop', null, 2)),
  //enemies
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1025, 2750, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1450, 2850, null, null, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Bottom of Map Death////////////////////////////////////////////////////////////
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 500, 3000, 2500, 50, 1, 0, 0, 0, 0, null, null),
  /////////////////////////////////////Left Border of Map//////////////////////////////////////////////////
  // new SpriteCreator(true, groundKillWall, 'tile', groundTile, 0, 2250, 50, 600, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundKillWall, 'tile', groundTile, 0, 2250, 50, 600, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Second Phase///////////////////////////////////////////
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3000, 3000, 1200, 50, 1, 0, 0, 0, 0, null, null),
  //Left Side Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2950, 500, 50, 1700, 1, 0, 0, 0, 0, null, null),
  //Ledges
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3400, 2850, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3600, 2300, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3700, 600, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3400, 900, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3500, 1000, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3600, 1400, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3700, 1500, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3600, 1600, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3500, 1700, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3700, 1800, null, null, 1, 0, 0, 0, 0, null, null),
  //surf LedgeS
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 2600, 400, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1800, 1000, null, null, 1, 0, 0, 0, 0, null, null),
  //Elevator Ledges
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 2650, 2000, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 2250, 2000, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1800, 2000, null, null, 1, 0, 0, 0, 0, null, null),
  //Death Traps for Surf Ledge
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2000, 800, 950, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1300, 0, 150, 1500, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1450, 1500, 700, 50, 1, 0, 0, 0, 0, null, null),
  //Enemies
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3600, 2100, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3400, 2400, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3700, 2300, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3150, 2450, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3899, 2500, null, null, 1, 0, 0, 0, 0, null, null),
  //Windmill Test
  new SpriteCreator(true, invisibleRegular, 'tile', deathTile, 200, 600, 200, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', deathTile, 200, 650, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', deathTile, 200, 850, 200, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', deathTile, 350, 650, 50, 200, 1, 0, 0, 0, 0, null, null),
  //Moving Windmill
  new SpriteCreator(true, deathRegularMove, 'tile', deathTile, 250, 800, 50, 50, 1, 400, 100, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 400, 800, 50, 50, 1, 500, 500, 0, 0, null, null),
];

//Flag
level_4.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(2, true, flagRegular, flag, 1, 400, 2900, 0, 0, 0, 0, null),
  new flagCreator(3, true, flagRegular, flag, 1, 3700, 2900, 0, 0, 0, 0, null),
];

///////////////////////////////////////////Level 4///////////////////////////////////////////////////////////
var level_5 = new LevelCreator(
  "Level 5-Timer", //Name of World
  4200, //X-Size of World
  3000, //Y-Size of World
  '#b19cd9', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  funGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_5.metroidvania = new MetroidvaniaCreator(
  4, //Room-Up-Index
  2, //Room-Down-Index
  1, //Room-Left-Index
  3, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_5.playerPosition = [
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(3500, 2900),
]

//Sprite Generation
level_5.spriteSpawn = [
  ////////////////////////////////////First Phase/////////////////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 3000, 500, 50, 1, 0, 0, 0, 0, null, null),
];

//Flag
level_5.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(2, true, flagRegular, flag, 1, 400, 2900, 0, 0, 0, 0, null),
  new flagCreator(3, true, flagRegular, flag, 1, 3700, 2900, 0, 0, 0, 0, null),
];

//////////////////////////////////////////Pushing All Levels Into World Array/////////////////////////////////////
var levelCount = 5;
for (var i = 0; i <= levelCount; i++) {
  // worldClassLevels.push(eval("level_"+i));
  worldClassLevels.push(window["level_" + i]);
}
