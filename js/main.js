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
  "Less Annoying-Massive Changes",
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
  //Fire Punch
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1550, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1600, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1650, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1700, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1750, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
  //Ledge
  // new SpriteCreator(true, ledgeElevator, 'timer', ledge, 400, 100, 150, 50, 1, 300, 200, 0, 0, null, new timerCreator('repeat', 4, 3)),
  // new SpriteCreator(true, ledgeElevator, 'timer', ledge, 1000, 100, 150, 50, 1, 0, 200, 0, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, ledgeSurf, 'timer', ledge, 2000, 100, 150, 50, 1, 0, 200, 0, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, ledgeBounce, 'timer', ledge, 1500, 100, 150, 50, 1, 0, 200, 0, 0, null, new timerCreator('loop', null, 2)),
  //Ball
  // new SpriteCreator(true, ballRegular, 'timer', ball, 1400, 400, 50, 50, 1, -300, 0, 0, 0, null, new timerCreator('repeat', 4, 3)),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 2000, 400, 50, 50, 1, -300, 200, 0, 0, null, null),
  //Enemy
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 2400, 100, 50, 50, 1, 800, 800, 0, 0, null, new timerCreator('loop', null, 2)),
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 2500, 700, 50, 50, 1, 800, 800, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 400, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 500, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 600, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 700, 100, 50, 50, 1, 0, 0, 0, 0, null, null),
  // Wall
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1000, 400, 50, 50, 1, 300, 200, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 400, 300, 50, 50, 1, 0, 0, 0, 0, null, null),
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
  10000, //Y-Size of World
  '#EBFAFA', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  noGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_1.metroidvania = new MetroidvaniaCreator(
  0, //Room-Up-Index
  3, //Room-Down-Index
  null, //Room-Left-Index
  null, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(220, 10),
  new PlayerPositionCreator(700, 100),
  new PlayerPositionCreator(1150, 3775),
  new PlayerPositionCreator(800, 7375),
]

level_1.spriteSpawn = [
  /////////////////////////////////////////Ground/////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 200, 200, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Your Friends////////////////////////////////
  new SpriteCreator(true, wallExplode, 'tile', wallTile50, 550, 400, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1000, 100, 150, 50, 1, 0, 200, 0, 0, null, null),
  //////////////////////////////////////Side Borders//////////////////////////////////////////
  //Left
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 0, 50, 10000, 1, 0, 0, 0, 0, null, null),
  //Right
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1350, 0, 50, 10000, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////////////Maze//////////////////////////////////////
  //Middle (To the Right of Ground)
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 600, 0, 50, 1000, 1, 0, 0, 0, 0, null, null),
  //Wall Jump Pillars
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 650, 100, 50, 1100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 750, 100, 50, 1100, 1, 0, 0, 0, 0, null, null),
  //Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 200, 1000, 450, 50, 1, 0, 0, 0, 0, null, null),
  //Even More Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 1400, 850, 50, 1, 0, 0, 0, 0, null, null),
  //Stop-Gap
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 800, 1200, 50, 200, 1, 0, 0, 0, 0, null, null),
  //Falling Spikes for that extra spice
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 300, 1100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 400, 1100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 500, 1100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 600, 1100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  //After Wall Jump Pillars (Max Jump)
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 800, 400, 475, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1000, 800, 350, 25, .5, 0, 0, 0, 0, null, null),
  //Wall of Bounce Ledges
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1200, 1500, null, null, 1, 500, 0, 0, 0, null, null),
  //Enemies
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 2500, 700, 50, 50, 1, 800, 800, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 500, 600, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Last Traps For the Maze
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 100, 1600, 1250, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 100, 1600, 50, 1000, 1, 0, 0, 0, 0, null, null),
  //Trampoline
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 100, 3200, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 400, 2700, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 800, 2400, null, null, 1, 0, 0, 0, 0, null, null),
  //Trampoline Borders
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 3400, 1000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1000, 1900, 50, 1600, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 1)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1050, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1100, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 2)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1050, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1100, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 3)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1050, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1100, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 4)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1050, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1100, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 5)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1050, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1100, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 6)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1050, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1100, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////An Area of Combat Sort Of/////////////////////////////////////////
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1000, 3800, 350, 50, 1, 0, 0, 0, 0, null, null),
  //Jumping off Points
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 400, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 600, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 3800, 1150, 50, 1, 0, 0, 0, 0, null, null),
  //Your Friends >.<
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 225, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 425, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 625, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 825, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 200, 4000, 800, 50, 1, 0, 0, 0, 0, null, null),
  //The Sean Moody Obession Traps
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 100, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 150, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 200, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 250, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 300, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 350, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 400, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 450, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 500, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 550, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 600, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 650, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 700, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 750, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 800, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 850, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 900, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 950, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1000, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1050, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1100, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1150, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1200, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1250, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1300, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  //The Enemies of Sean Moody He Wants Destroyed
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 100, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 150, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 200, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 250, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 300, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 350, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 400, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 450, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 500, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 550, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 600, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 650, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 700, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 750, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 800, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 850, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 900, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 950, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1000, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1050, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1100, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1150, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1200, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1250, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1300, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////Falling Vanilla SkyTraps//////////////////////////////////////////
  //Moving Death Box 1
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 100, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 5000, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 5000, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 5000, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 700, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 5000, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 5000, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1100, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 5000, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1300, 5000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //Moving Death Box 2
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 100, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 5400, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 5400, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 5400, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 700, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 5400, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 5400, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1100, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 5400, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1300, 5400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //Moving Death Box 3
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 100, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 5800, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 5800, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 5800, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 700, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 5800, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 5800, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1100, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 5800, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1300, 5800, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //Moving Death Box 4
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 100, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 6200, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 6200, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 6200, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 700, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 6200, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 6200, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1100, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 6200, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1300, 6200, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //Moving Death Box 5
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 100, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 6600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 6600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 6600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 700, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 800, 6600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 6600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1100, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 6600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1300, 6600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //Moving Death Box 5
  //Top Border
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 50, 4800, 1300, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Border
  // new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 50, 1950, 1300, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 50, 6750, 1300, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 50, 7000, 1300, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////////////////Gymnastics///////////////////////////////////////////////
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 450, 7400, 500, 50, 1, 0, 0, 0, 0, null, null),
  //Decorations
  //Part 1
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 50, 7050, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 100, 7100, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 150, 7150, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 7200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 250, 7250, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 300, 7300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 350, 7350, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 400, 7350, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Part 2
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1300, 7050, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1250, 7100, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 7150, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1150, 7200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1100, 7250, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1050, 7300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 1000, 7350, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 950, 7350, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Activate World Gravity
  new SpriteCreator(true, powerWorldGravity, 'tile', powerJar, 300, 7500, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Ball Gravity World
  new SpriteCreator(true, ballRegular, 'sprite', ball, 300, 7800, 50, 50, 1, -500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 400, 7800, 50, 50, 1, 500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 500, 7800, 50, 50, 1, -500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 600, 7800, 50, 50, 1, 500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 700, 7800, 50, 50, 1, -500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 800, 7800, 50, 50, 1, 500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 900, 7800, 50, 50, 1, -500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 1000, 7800, 50, 50, 1, 500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 1100, 7800, 50, 50, 1, -500, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 1200, 7800, 50, 50, 1, 500, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 50, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 100, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 150, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 200, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 250, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 300, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 350, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 400, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 450, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 500, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 550, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 600, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 650, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 700, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 750, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 800, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 850, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 900, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 950, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1000, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1050, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1100, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1150, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1200, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1250, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1300, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, powerNegativeGravity, 'tile', powerJar, 300, 8500, 50, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////////////////Hazama///////////////////////////////////////////////////////////////
  // new SpriteCreator(true, hazamaFalconia, 'tile', hazamaHippie, 50, 1450, 1300, 3000, 1, 0, 0, 0, 0, null, null),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(0, true, flagRegular, flag, 1, 350, 150, 0, 0, 0, 0, null),
  //Second Flag
  new flagCreator(2, true, flagRegular, flag, 1, 1050, 3750, 0, 0, 0, 0, null),
  //Third Flag
  new flagCreator(3, true, flagRegular, flag, 1, 500, 7350, 0, 0, 0, 0, null),
];

////////////////////////////////////////Level 2/////////////////////////////////////
//Level Begin
var level_2 = new LevelCreator(
  "Level 2-ExperimentMechanics", //Name of World
  4800, //X-Size of World
  5000, //Y-Size of World
  '#FFE4E4', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  basicGunSet, //Gun-Set
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
  new PlayerPositionCreator(3800, 4930),
  new PlayerPositionCreator(750, 4750),
  new PlayerPositionCreator(4500, 1900),
]

level_2.spriteSpawn = [
  /////////////////////////////////////Borders/////////////////////////////////////
  //Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 4950, 3450, 50, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 0, 50, 4950, 1, 0, 0, 0, 0, null, null),
  //Right
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4750, 2050, 50, 2950, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Dive///////////////////////////////////////
  //Repeating Traps on Slippery Wall
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3800, 1950, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3800, 1650, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3800, 1350, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3800, 1050, 200, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3800, 750, 200, 25, .5, 0, 0, 0, 0, null, null),
  //Phaser Wall
  // new SpriteCreator(true, groundPhase, 'tile', groundTile, 4000, 1500, 50, 450, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  //Slippery Wall to Climb
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 4000, 700, 50, 1300, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 4000, 2000, 800, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom of Ground That Which is Death
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4000, 2050, 750, 50, 1, 0, 0, 0, 0, null, null),
  //Falling Spikes Section
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3775, 2100, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3750, 2150, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Left Side Barriers of DEATH and Entry
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3650, 700, 50, 1600, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3700, 2250, 350, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4000, 2300, 50, 2400, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 4000, 4700, 50, 250, 1, 0, 0, 0, 0, null, null),
  //Surfs Up
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 4000, 2200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Wall Killer 2
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4150, 2450, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4200, 2500, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4250, 2550, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4300, 2600, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4350, 2650, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4400, 2700, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 4450, 2750, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //Keep in Wall Killers
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4050, 2800, 500, 50, 1, 0, 0, 0, 0, null, null),
  //Wall Momentum After Wall Killers
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4600, 3050, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4400, 3100, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4200, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4175, 3350, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4225, 3450, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4300, 3550, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4300, 3750, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4300, 3850, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4300, 3950, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 4300, 4050, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Wall Momentum Borders
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4300, 3350, 450, 50, 1, 0, 0, 0, 0, null, null),
  //Enemies to Attack Wall Momentum
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4200, 3830, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4400, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4400, 3600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4400, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4600, 4139, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4200, 4200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 4600, 3600, 50, 50, 1, 0, 0, 0, 0, null, null),
  //The Last Part of the Dive - Part 1
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4200, 4400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4250, 4400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4300, 4400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4350, 4400, 50, 50, 1, -1000, 0, 0, 0, null, null),
  //The Last Part of the Dive - Part 2
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4200, 4600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4250, 4600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4300, 4600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 4350, 4600, 50, 50, 1, 1000, 0, 0, 0, null, null),
  //Bottom Border of the Dive
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4000, 4950, 750, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Right to Left 2nd Part No Name///////////////////////////////////////
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3500, 4950, 500, 50, 1, 0, 0, 0, 0, null, null),
  //Left Border of Jungle Gym Slippery Wall and Death
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3450, 4400, 50, 600, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2800, 4400, 1000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 3450, 2400, 50, 2000, 1, 0, 0, 0, 0, null, null),
  //BIG TIME BORDERS
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1000, 2200, 2650, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1600, 2700, 50, 2250, 1, 0, 0, 0, 0, null, null),
  //Repeating Traps on Slippery Wall
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2800, 2950, 850, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3500, 3250, 150, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3500, 3550, 150, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3500, 3850, 150, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3500, 4150, 150, 25, .5, 0, 0, 0, 0, null, null),
  //Ledge Bounce For You To Get On The Wall
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3600, 4600, null, null, 1, 0, 0, 0, 0, null, null),
  //Ledge Surf
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 3800, 2400, null, null, 1, 0, 0, 0, 0, null, null),
  //Nah to your ledge surf
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 2800, 3500, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3000, 3500, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3200, 3500, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  //Surf Borders
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2400, 2325, 50, 2425, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2450, 3550, 900, 50, 1, 0, 0, 0, 0, null, null),
  //After Surf Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2400, 4750, 700, 50, 1, 0, 0, 0, 0, null, null),
  //Wall Killers After Surf Slip (step 1)
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 3300, 3800, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 3300, 3900, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 3300, 4000, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 3300, 4100, 50, 50, 1, 0, 1000, 0, 0, null, null),
  //Wall Killers After Surf Slip (step 2)
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2900, 3800, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2900, 3900, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2900, 4000, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2900, 4100, 50, 50, 1, 0, 1000, 0, 0, null, null),
  //Wall Killers After Surf Slip (step 3)
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2690, 3800, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2690, 3900, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2690, 4000, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 2690, 4100, 50, 50, 1, 0, 1000, 0, 0, null, null),
  //Finally Ground Regular Move
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 3000, 3800, 50, 200, 1, 0, 500, 0, 0, null, null),
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 3090, 3800, 50, 200, 1, 0, 500, 0, 0, null, null),
  //Ledge Surf
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 3200, 4800, null, null, 1, 0, 0, 0, 0, null, null),
  //Elevator End Point
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 4850, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1800, 4450, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 4050, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1800, 3650, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 3250, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1800, 2850, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 2450, null, null, 1, 0, 0, 0, 0, null, null),
  //Ledges Last Obstacle
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1200, 4850, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1400, 4450, null, null, 1, 0, 0, 0, 0, null, null),
  //Canyon Gap
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 2250, 50, 700, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 4600, 50, 700, 1, 0, 1000, 0, 0, null, null),
  /////////////////////////////////////////////Part Three The Power of Ra/////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 500, 4800, 400, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, powerJump, 'sprite', powerJar, 400, 4800, 400, 50, 1, 0, 0, 0, 0, null, null),
];

//Flag Spawn
level_2.flagSpawn = [
  new flagCreator(3, true, flagRegular, flag, 1, 4300, 1950, 0, 0, 0, 0, null),
  new flagCreator(1, true, flagRegular, flag, 1, 3700, 4900, 0, 0, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 1, 650, 4750, 0, 0, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_2.text = [
  new textCreator(true, 4650, 1800, "Sandbox\n\n→", fontGrind, 25),
];

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator(
  "Level 3-Combat", //Name of World
  5000, //X-Size of World
  2800, //Y-Size of World
  '#FFFDD0', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  killGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
);

//Room-Switching
level_3.metroidvania = new MetroidvaniaCreator(
  1, //Room-Up-Index
  1, //Room-Down-Index
  2, //Room-Left-Index
  3, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_3.playerPosition = [
  new PlayerPositionCreator(4750, 100), //Up
  new PlayerPositionCreator(200, 9900), //Down
  new PlayerPositionCreator(200, 9900), //Left
  new PlayerPositionCreator(4750, 1450), //Right
]

//Sprite Generation
level_3.spriteSpawn = [
  ////////////////////////////////////OTrue Friends////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 4700, 1200, 100, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallLeftRight, 'tile', wallTile50, 4700, 1400, 300, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ballRegular, 'sprite', ball, 4700, 150, 50, 50, 1, 0, 300, 0, 0, null, null),
  ////////////////////////////////////Borders///////////////////////////////////////////////
  //Top
  new SpriteCreator(true, deathKillWall, 'tile', invsibileTile, 0, 0, 5000, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom
  new SpriteCreator(true, deathKillWall, 'tile', invsibileTile, 0, 2750, 5000, 50, 1, 0, 0, 0, 0, null, null),
  //Right
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4950, 50, 50, 2700, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 50, 50, 1100, 1, 0, 0, 0, 0, null, null),
  //Left Decorations
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 1100, 500, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 1700, 500, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 1700, 50, 1050, 1, 0, 0, 0, 0, null, null),
  //Ball Kill
  new SpriteCreator(true, deathBallKill, 'tile', ball, 0, 1150, 50, 550, 1, 0, 0, 0, 0, null, null),
  // ////////////////////////////////////A Taste of Death////////////////////////////////////////////
  //Top
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 4000, 1000, 50, 300, 1, 0, 0, 0, 0, null, null),
  //Bottom
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 4000, 1500, 50, 300, 1, 0, 0, 0, 0, null, null),
  //Enemies
  //Top Side
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3950, 1050, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3950, 1150, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3950, 1250, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Side
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3950, 1550, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3950, 1650, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3950, 1750, 50, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Another One////////////////////////////////////////////
  //Top
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3200, 1000, 50, 300, 1, 0, 0, 0, 0, null, null),
  //Bottom
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3200, 1500, 50, 300, 1, 0, 0, 0, 0, null, null),
  //Enemies
  //Top Side
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3300, 1050, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3300, 1150, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3300, 1250, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Side
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3300, 1550, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 3300, 1650, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 3300, 1750, 50, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Middle Divider////////////////////////////////////////////
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2700, 800, 50, 1200, 1, 0, 0, 0, 0, null, null),
  // ////////////////////////////////////Main Traps////////////////////////////////////////////
  // //Repeating Traps Part 1 (Right to Left Orientation)
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 4000, 50, 50, 50, 1, -700, 700, 0, 0, null, new timerCreator('loop', null, 3)),
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 4000, 2750, 50, 50, 1, -700, -700, 0, 0, null, new timerCreator('loop', null, 3)),
  // //Repeating Traps Part 2 (Right to Left Orientation)
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 3000, 50, 50, 50, 1, -700, 700, 0, 0, null, new timerCreator('loop', null, 3)),
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 3000, 2750, 50, 50, 1, -700, -700, 0, 0, null, new timerCreator('loop', null, 3)),
  // //Repeating Traps Part 3 (Right to Left Orientation)
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 2000, 50, 50, 50, 1, -700, 700, 0, 0, null, new timerCreator('loop', null, 3)),
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 2000, 2750, 50, 50, 1, -700, -700, 0, 0, null, new timerCreator('loop', null, 3)),
  //Repeating Enemies?
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 1000, 2750, 50, 50, 1, -700, -700, 0, 0, null, new timerCreator('loop', null, 3)),
  // ////////////////////////////////////Top Path////////////////////////////////////////////
  //Borders
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 2700, 50, 50, 750, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 550, 1100, 2150, 50, 1, 0, 0, 0, 0, null, null),
  //Traps
  //Vertical Moving
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 200, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 600, 300, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 900, 400, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1200, 500, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1500, 600, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1800, 700, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2100, 800, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2400, 900, 50, 50, 1, 0, 1000, 0, 0, null, null),
  //Horizontal Moving
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 100, 300, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 200, 500, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 300, 700, 50, 50, 1, -1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 400, 900, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 500, 1000, 50, 50, 1, -1000, 0, 0, 0, null, null),
  // ////////////////////////////////////Bottom Path////////////////////////////////////////////
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, 100, 1800, 50, 50, 1, 200, 0, 500, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, 100, 2000, 50, 50, 1, 200, 0, 500, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, 100, 2200, 50, 50, 1, 200, 0, 500, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, 100, 2400, 50, 50, 1, 200, 0, 500, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, 100, 2600, 50, 50, 1, 200, 0, 500, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 300, 1900, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 300, 2100, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 300, 2300, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 300, 2500, 150, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Falling Spikes//////////////////////////////////////////
  //Zero Phase - 2
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4200, 100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  //Zero Phase
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4070, 2700, 50, 50, 1, 0, -200, 0, -500, null, new timerCreator('loop', null, 1)),
  //You're Not Standing Up Top or Bottom
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4010, 100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4010, 2700, 50, 50, 1, 0, -200, 0, -500, null, new timerCreator('loop', null, 1)),
  //From Top and Bottom-First Phase
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3400, 2700, 50, 50, 1, 0, -200, 0, -500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3500, 100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3600, 2700, 50, 50, 1, 0, -200, 0, -500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3700, 100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  //Same X-1
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3900, 100, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3900, 2700, 50, 50, 1, 0, -200, 0, -500, null, new timerCreator('loop', null, 1)),
];

level_3.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(0, true, flagRegular, flag, 1, 4700, 1150, 0, 0, 0, 0, null),
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
  basicGunSet, //Gun-Set
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
  basicGunSet, //Gun-Set
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
