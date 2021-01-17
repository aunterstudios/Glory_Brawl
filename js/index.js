var game = new Phaser.Game(1600, 900, Phaser.CANVAS);
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
///////////////////////////////////////////Levels///////////////////////////////////////////////////////////
//Level Holder
var worldClassLevels = [];
///////////////////////////////////////////Level 0///////////////////////////////////////////////////////////
var level_0 = new LevelCreator(
  "[0]Physics Testing", //Name of World
  5000, //X-Size of World
  5000,  //Y- Size of World 
  "#FFFDD0", //Background Color
  true, //Out of Bounds Allowed
  1, //PlayerScale
  seanNen, //Nen-System
  bounceGhostGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Changing Background Color
level_0.colorChange = new BackgroundColorChange(200, 255, 5);

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
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 2750, 0, 50, 750, 1, 0, 0, 0, 0, null, null),
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

//Text
// level_0.text = [
//   new textCreator(true, 200, 1000, "RED IS DEATH", fontNokia, 72),
//   // new textCreator(true, 289.5, 4600, "W-Jump/Double-Jump\nA-Left\nS-Punch\nD-Right\nP-Pause/Controls\nO-Fullscreen", fontNokia, 32),
//   new textCreator(true, 289.5, 4600, "W-\nA-\nS-\nD-\nP-\n0-", fontBlock, 32),
//   new textCreator(true, 340, 4600, "Jump/Double-Jump\nLeft\nPunch\nRight\nPause/Controls\nFullscreen", fontNokia, 32),
//   new textCreator(true, 1000, 4700, "We've been doing this\nfor a long time", fontNokia, 32),
//   // new textCreator(true, 1000, 4700, "WE'VE BEEN DOING THIS A LONG TIME", fontBlock, 32),
//   new textCreator(true, 1800, 4700, "So many\ndifferent methods failing", fontNokia, 32),
//   new textCreator(true, 2600, 4700, "But after thousands of years", fontNokia, 32),
//   new textCreator(true, 3400, 4700, "I realized the story\nneeds to unfold\na certain way", fontNokia, 32),
//   new textCreator(true, 4200, 4700, "You can't be given\nthe entire story\nfrom the beginning", fontNokia, 32),
//   new textCreator(true, 5000, 4700, "That clarity needs to\ncome from progression", fontNokia, 32),
//   new textCreator(true, 5800, 4700, "To cure\nthe rage and sadness\nin your heart", fontNokia, 32),
//   new textCreator(true, 6600, 4700, "For the ultimate goal of\nfinally freeing you", fontNokia, 32),
//   new textCreator(true, 7400, 4700, "But never forget", fontNokia, 32),
//   // new textCreator(true, 8200, 4700, "The       is your enemy", fontNokia, 32),
//   new textCreator(true, 8205, 4700, "The", fontNokia, 32),
//   new textCreator(true, 8255, 4700, "Shadow", fontGrind, 32),
//   new textCreator(true, 8365, 4700, "is your enemy", fontNokia, 32),
// ];

////////////////////////////////////////Level 1-SandboxMode/////////////////////////////////////
//New Playground
var level_1 = new LevelCreator(
  "[1]Downward", //Name of World
  1600, //X-Size of World
  10000, //Y-Size of World
  '#EBFAFA', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  noGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  .1, //X-Camera Lerp
  .3, //Y-Camera Lerp
  fontNokia, //World Font Name
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
  new PlayerPositionCreator(1400, 3775),
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
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1550, 0, 50, 10000, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////////////Maze//////////////////////////////////////
  //Middle (To the Right of Ground)
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 600, 0, 50, 1000, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Wall Jump Pillars
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 650, 100, 50, 1100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 750, 100, 50, 1100, 1, 0, 0, 0, 0, null, null),
  //Bottom FALLING SPIKES
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 200, 950, 450, 100, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Even More Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 1400, 850, 50, 1, 0, 0, 0, 0, null, null),
  //Stop-Gap
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 800, 1200, 50, 200, 1, 0, 0, 0, 0, null, null),
  //Falling Spikes for that extra spice
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 300, 1000, 50, 50, 1, 0, 275, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 400, 1000, 50, 50, 1, 0, 275, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 500, 1000, 50, 50, 1, 0, 275, 0, 500, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 600, 1000, 50, 50, 1, 0, 275, 0, 500, null, new timerCreator('loop', null, 1)),
  //Indicators for Falling Spikes
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 300, 1062.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 400, 1062.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 500, 1062.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 600, 1062.5, null, null, .5, 0, 0, 0, 0, null, null),
  //After Wall Jump Pillars (Max Jump)
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 800, 400, 475, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1200, 800, 350, 25, .5, 0, 0, 0, 0, null, null),
  //Wall of Bounce Ledges
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1200, 1500, null, null, 1, 500, 0, 0, 0, null, null),
  //Enemies
  // new SpriteCreator(true, enemyDaakath, 'timer', enemyOne, 2500, 700, 50, 50, 1, 800, 800, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 500, 600, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Last Traps For the Maze
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 100, 1600, 1450, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 100, 1600, 50, 1000, 1, 0, 0, 0, 0, null, null),
  //Trampoline
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 100, 3200, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 400, 2700, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 800, 2400, null, null, 1, 0, 0, 0, 0, null, null),
  //Trampoline Borders
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 3400, 1000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1000, 1900, 150, 1600, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 1)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1400, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1450, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 2)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1400, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1450, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 3)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1400, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1450, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 2600, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 4)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1400, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1450, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 2900, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 5)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1400, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1450, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fire Punch (Section 6)
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1150, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1200, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1250, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1300, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1350, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1400, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1450, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundFirePunch, 'tile', groundTile, 1500, 3500, 50, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////An Area of Combat Sort Of/////////////////////////////////////////
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 3800, 350, 50, 1, 0, 0, 0, 0, null, null),
  //Jumping off Points
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 400, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 600, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1000, 3800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 3800, 1150, 50, 1, 0, 0, 0, 0, null, null),
  //Your Friends >.<
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 225, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 425, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 625, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 825, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1025, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1350, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1400, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1450, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallMomentum, 'sprite', wallTile50, 1500, 4400, 50, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1350, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1400, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1450, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1500, 4500, 50, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 50, 4800, 1500, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Border
  // new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 50, 1950, 1300, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 50, 6750, 1500, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 50, 7000, 1500, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////////////////Gymnastics///////////////////////////////////////////////
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 450, 7400, 700, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1500, 7050, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1450, 7100, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1400, 7150, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1350, 7200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1300, 7250, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1250, 7300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 1200, 7350, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 1150, 7350, 50, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1350, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1400, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1450, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKillMove, 'tile', ball, 1500, 7900, 50, 50, 1, 0, 0, 0, 0, null, null),

  // new SpriteCreator(true, powerNegativeGravity, 'tile', powerJar, 300, 8500, 50, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////////////////Hazama///////////////////////////////////////////////////////////////
  // new SpriteCreator(true, hazamaFalconia, 'tile', hazamaHippie, 50, 1450, 1300, 3000, 1, 0, 0, 0, 0, null, null),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(0, true, flagRegular, flag, 1, 350, 150, 0, 0, 0, 0, null),
  //Second Flag
  new flagCreator(2, true, flagRegular, flag, 1, 1250, 3750, 0, 0, 0, 0, null),
  //Third Flag
  new flagCreator(3, true, flagRegular, flag, 1, 500, 7350, 0, 0, 0, 0, null),
];

////////////////////////////////////////Level 2/////////////////////////////////////
//Level Begin
var level_2 = new LevelCreator(
  "[2]JungleGym", //Name of World
  4800, //X-Size of World
  5000, //Y-Size of World
  '#FFE4E4', //Background Color
  // Phaser.Color.getRandomColor(10, 100, 5), //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  basicGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  .1, //X-Camera Lerp
  .4, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Room-Switching
level_2.metroidvania = new MetroidvaniaCreator(
  4, //Room-Up-Index
  3, //Room-Down-Index
  null, //Room-Left-Index
  4, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(4725, 100),
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
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 4750, 0, 50, 500, 1, 0, 0, 0, 0, null, null),
  //Top
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 0, 4300, 25, .5, 0, 0, 0, 0, null, null),
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
  //Falling Spikes Holder
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3700, 2150, 100, 100, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Falling Spikes Section-1
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3725, 2250, 50, 50, 1, 0, -1100, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3725, 2137.5, null, null, .5, 0, 0, 0, 0, null, null),
  //Falling Spikes Section-2
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3775, 2250, 50, 50, 1, 0, -1100, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3775, 2137.5, null, null, .5, 0, 0, 0, 0, null, null),
  //Left Side Barriers of DEATH and Entry
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3650, 550, 50, 1750, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3700, 2250, 350, 50, 1, 0, 0, 0, 0, scFallingSpikes, null),
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
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 2800, 3600, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3000, 3600, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3200, 3600, 50, 50, 1, 0, -1000, 0, 0, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 2800, 3537.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3000, 3537.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3200, 3537.5, null, null, .5, 0, 0, 0, 0, null, null),
  //Surf Borders
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2400, 2325, 50, 2425, 1, 0, 0, 0, 0, null, null),
  //Falling Spike Wall
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2450, 3550, 900, 100, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //After Surf Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2400, 4750, 950, 50, 1, 0, 0, 0, 0, null, null),
  //Wall Killers After Surf Slip (step 1)
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 3300, 4100, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 3300, 4100, 50, 50, 1, 0, -1000, 0, 0, null, null),
  //Finally Ground Regular Move
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 3100, 3800, 50, 50, 1, 0, 700, 0, 0, null, null),
  //Ledge Surf for the groovy movy
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 3375, 4920, null, null, 1, 0, 0, 0, 0, null, null),
  //Elevator End Point
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 4850, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1800, 4450, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 4050, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1800, 3650, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 3250, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1800, 2850, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 2200, 2450, null, null, 1, 0, 0, 0, 0, null, null),
  //Canyon Gap
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 2250, 50, 700, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 1000, 4600, 50, 700, 1, 0, 1000, 0, 0, null, null),
  /////////////////////////////////////////////Part Three The Power of Ra/////////////////////////////////////////////
  //Power-Up Needed to Complete Level
  new SpriteCreator(true, powerJump, 'sprite', powerJar, 400, 4800, 400, 50, 1, 0, 0, 0, 0, null, null),
  //Ground W/ Flag
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 500, 4800, 400, 50, 1, 0, 0, 0, 0, null, null),
  //Platforms (The Jungle Gym) The First Jump
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 4000, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Second Jump
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 500, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Third Jump
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 2400, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fourth Jump (Inside Dead Space)
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1400, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Fifth Jump (Inside Ded Space)
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 2825, 2000, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Sixth Jump (Inside Dead Space)
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 3400, 1250, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Seventh Jump (Inside Dead Space)
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 2250, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Ledge Bounce For the Corner Jump
  new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 3500, 2100, null, null, 1, 0, 0, 0, 0, null, null),
  //The Corner Jump
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 450, 400, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Past the Bottom Death Border
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1800, 250, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Death Border Against FIrst Part
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1200, 500, 3600, 50, 1, 0, 0, 0, 0, null, null),
  //Surfs Up
  new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 3500, 400, null, null, 1, 0, 0, 0, 0, null, null),
];

//Flag Spawn
level_2.flagSpawn = [
  new flagCreator(3, true, flagRegular, flag, 1, 4300, 1950, 0, 0, 0, 0, null),
  new flagCreator(1, true, flagRegular, flag, 1, 3700, 4900, 0, 0, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 1, 650, 4750, 0, 0, 0, 0, null),
];

//Text Creator (Helpful Hints)
level_2.text = [
  new textCreator(true, 4650, 1800, "Sandbox\n\n→", fontNokia, 25),
];

////////////////////////////////////////Level 3/////////////////////////////////////
var level_3 = new LevelCreator(
  "[3]Puzzle", //Name of World
  5000, //X-Size of World
  2800, //Y-Size of World
  '#FFFDD0', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  killGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
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
  new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 200, 2700, null, null, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Borders///////////////////////////////////////////////
  //Top
  new SpriteCreator(true, deathKillWall, 'tile', invsibileTile, 0, 0, 5000, 50, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Bottom
  new SpriteCreator(true, deathKillWall, 'tile', invsibileTile, 0, 2750, 5000, 50, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Right
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4950, 50, 50, 2700, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 50, 50, 1100, 1, 0, 0, 0, 0, null, null),
  //Left Decorations Top
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 1100, 500, 50, 1, 0, 0, 0, 0, null, null),
  //Left Decorations Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 1700, 2000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2150, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2200, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2250, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2350, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2400, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2450, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2500, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2550, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2600, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2650, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  //Left Bottom Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 1700, 50, 1050, 1, 0, 0, 0, 0, scFallingSpikes, null),
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
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2700, 500, 50, 1600, 1, 0, 0, 0, 0, null, null),
  // ////////////////////////////////////Top Path////////////////////////////////////////////
  //Borders
  new SpriteCreator(true, invisibleRegular, 'tile', invsibileTile, 2700, 50, 50, 450, 1, 0, 0, 0, 0, null, null),
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
  //Traps and Help
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, -50, 1800, 50, 50, 1, 350, 0, 550, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, -50, 2000, 50, 50, 1, 350, 0, 550, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, -50, 2200, 50, 50, 1, 350, 0, 550, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, -50, 2400, 50, 50, 1, 350, 0, 550, 0, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegularTwo, 'timer', fallingSpikesTwo, -50, 2600, 50, 50, 1, 350, 0, 550, 0, null, new timerCreator('loop', null, 1)),
  //Bottom Path Indicators
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 62.5, 1800, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 62.5, 2000, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 62.5, 2200, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 62.5, 2400, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 62.5, 2600, null, null, .5, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Falling Spikes//////////////////////////////////////////
  //Zero Phase - 2
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4200, -50, 50, 50, 1, 0, 300, 0, 600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 4200, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  //Zero Phase
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4070, 2850, 50, 50, 1, 0, -300, 0, -600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 4070, 2737.5, null, null, .5, 0, 0, 0, 0, null, null),
  //You're Not Standing Up Top or Bottom
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4010, -50, 50, 50, 1, 0, 300, 0, 600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 4010, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 4010, 2850, 50, 50, 1, 0, -300, 0, -600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 4010, 2737.5, null, null, .5, 0, 0, 0, 0, null, null),
  //From Top and Bottom-First Phase
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3400, 2850, 50, 50, 1, 0, -300, 0, -600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3400, 2737.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3500, -50, 50, 50, 1, 0, 300, 0, 600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3500, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3600, 2850, 50, 50, 1, 0, -300, 0, -600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3600, 2737.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3700, -50, 50, 50, 1, 0, 300, 0, 600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3700, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  //Same X-1
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3900, -50, 50, 50, 1, 0, 300, 0, 600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3900, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 3900, 2850, 50, 50, 1, 0, -300, 0, -600, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3900, 2737.5, null, null, .5, 0, 0, 0, 0, null, null),
];

level_3.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(0, true, flagRegular, flag, 1, 4700, 1150, 0, 0, 0, 0, null),
];

//Text Creator (Helpful Hints)
// level_3.text = [
//   new textCreator(true, 4650, 1800, "Test", fontGrind, 25),
// ];

///////////////////////////////////////////Level 4///////////////////////////////////////////////////////////
var level_4 = new LevelCreator(
  "[4]Asteroid", //Name of World
  6000, //X-Size of World
  900, //Y-Size of World
  Phaser.Color.getRandomColor(200, 255), //Background Color
  true, //Out of Bounds Allowed
  .6, //Player Scale
  portalNen, //Nen-System
  onlyKillGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  1, //X-Camera Lerp
  .1, //Y-Camera Lerp
  fontNokia, //World Font Name
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
  new PlayerPositionCreator(200, 500),
  new PlayerPositionCreator(200, 800),
  new PlayerPositionCreator(100, 2900),
  new PlayerPositionCreator(200, 1500),
]

//Sprite Generation
level_4.spriteSpawn = [
  /////////////////////////////////////Borders//////////////////////////////////////////////////////////
  //Top
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 50, 0, 6000, 50, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 550, 850, 5450, 50, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, groundSlippery, 'tile', groundTile, 0, 0, 50, 850, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Ground/////////////////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 850, 500, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////SpaceShip////////////////////////
  new SpriteCreator(true, wallCloud, 'tile', wallTile25, 400, 450, 150, 25, 1, 0, 0, 0, 0, null, null),
  /////////////////////////////////Object Killer Border Beginning////////////////////
  new SpriteCreator(true, groundOneWayKillObject, 'tile', groundTile, 500, 50, 50, 850, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////First Pillar-1300X/////////////////////////////////
  //Actual Pillar
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1300, 250, 50, 600, 1, 0, 0, 0, 0, null, null),
  //Traps on Pillar-Part 1
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1275, 300, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 1275, 300, null, null, 1, -600, -600, 0, 0, null, new timerCreator('loop', null, 2)),
  //Traps on Pillar-Part 2
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1275, 800, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 1275, 800, null, null, 1, -600, -600, 0, 0, null, new timerCreator('loop', null, 2)),
  //Traps on Pillar- Part 3 The Middle Bad BOy
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1275, 550, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 1275, 550, null, null, 1, -600, -600, 0, 0, null, new timerCreator('loop', null, 2)),
  //Bottom Traps-1
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 800, 825, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 800, 825, null, null, 1, 800, -600, 0, 0, null, new timerCreator('loop', null, 2)),
  // //Bottom Traps-2
  // new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1100, 825, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'timer', wallTile50, 1100, 825, null, null, 1, 800, -600, 0, 0, null, new timerCreator('loop', null, 2)),
  ///////////////////////////////Second Pillar-1800X///////////////////////////////
  //Actual Pillar
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1800, 50, 50, 400, 1, 0, 0, 0, 0, null, null),
  //A Little Sprinkle of Spikes for Funsies
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1450, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1550, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1650, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1750, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 1450, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 2.5)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 1550, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 1650, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 2)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 1750, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 1.5)),
  //Kill These WallKillers WIth Your Gun Bounce Section
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 1825, 300, null, null, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'sprite', wallTile50, 1825, 800, null, null, 1, 0, -1000, 0, 0, null, null),
  ///////////////////////////////Third Pillar-2300X///////////////////////////////
  //Actual Pillar (Quasi Pillar!)
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 200, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 300, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 400, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 500, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 600, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2300, 700, 50, 50, 1, 0, -1000, 0, 0, null, null),
  //A Little Sprinkle of Spikes for Funsies
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 2000, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 2100, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 2200, 62.5, null, null, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 2000, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 2.5)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 2100, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 1)),
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 2200, -50, 50, 50, 1, 0, 0, 0, 800, null, new timerCreator('loop', null, 2)),
  //////////////////////////////Fourth Pillar-2800X//////////////////////////////
  //Actual Pillar (Quasi Pillar!)
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 200, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 300, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 400, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 500, 50, 50, 1, 0, -1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 600, 50, 50, 1, 0, 1000, 0, 0, null, null),
  new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, 2800, 700, 50, 50, 1, 0, -1000, 0, 0, null, null),
  //The Middle
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 2530, 275.9, 50, 400, 1, 0, 0, 0, 0, null, null),
  //Enemies in the Middle
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 2613.3, 361.2, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 2613.3, 597.4, null, null, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////Doom Trap of Spawning Enemies-5000X////////////////////////////////////
  //Da Borders For this
  new SpriteCreator(true, groundOneWayKillObject, 'tile', groundTile, 3000, 50, 50, 850, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundOneWayPlayer, 'tile', groundTile, 5000, 50, 50, 850, 1, 0, 0, 0, 0, null, null),
  //Initial Boom! From the Wall
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 4975, 156.8, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 4975, 156.8, null, null, 1, -500, -700, 0, 0, null, new timerCreator('loop', null, 2.5)),
  //THe BOTTOm THE BOTTOM THE BOTTOm
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 3822.4, 833.5, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallKiller, 'timer', wallTile50, 3822.4, 833.5, null, null, 1, 500, 700, 0, 0, null, new timerCreator('loop', null, 2.5)),
  //THE BRICKS
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3250, 222.3, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3393.8, 734.3, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3501, 50, 50, 250, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 3610.5, 523.9, 50, 300, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4000, 400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4182.9, 611.2, 50, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4398.6, 218.3, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 4478.6, 627.1, 50, 100, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////Last Section-All Out Brawl (6000X)////////////////////////////////////
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 5209.5, 234.2, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 5409.5, 410.8, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 5280, 725.4, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 5662.9, 754.1, null, null, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 5754.3, 225.2, null, null, 1, 0, 0, 0, 0, null, null),
];

//Flag
level_4.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(0, true, flagRegular, flag, 1, 400, 800, 0, 0, 0, 0, null),
];

///////////////////////////////////////////Level 5///////////////////////////////////////////////////////////
var level_5 = new LevelCreator(
  "[5]Premise", //Name of World
  9000, //X-Size of World
  5000, //Y-Size of World
  '#D0CFCF', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  noGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  .1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Room-Switching
level_5.metroidvania = new MetroidvaniaCreator(
  4, //Room-Up-Index
  2, //Room-Down-Index
  1, //Room-Left-Index
  6, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_5.playerPosition = [
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(8860, 4925),
]

//Sprite Generation
level_5.spriteSpawn = [
  ////////////////////////////////////Ground/////////////////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 4950, 9000, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Borders//////////////////////////////////////////////////////////
  //Top
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 300, 0, 1000, 50, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 0, 50, 4950, 1, 0, 0, 0, 0, null, null),
];

//Flag
// level_5.flagSpawn = [
//   // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
//   //   new shadowLevelGenerator(0, [
//   //     new shadowLevelArray(2, 4)
//   //   ])),
// ];

level_5.text = [
  new textCreator(true, 200, 1000, "RED IS DEATH", fontNokia, 72),
  // new textCreator(true, 289.5, 4600, "W-Jump/Double-Jump\nA-Left\nS-Punch\nD-Right\nP-Pause/Controls\nO-Fullscreen", fontNokia, 32),
  new textCreator(true, 289.5, 4600, "W-\nA-\nS-\nD-\nP-\nO-", fontBlock, 32),
  new textCreator(true, 340, 4600, "Jump/Double-Jump\nLeft\nPunch\nRight\nPause/Controls\nFullscreen", fontNokia, 32),
  new textCreator(true, 1000, 4700, "We've been doing this\nfor a long time", fontNokia, 32),
  // new textCreator(true, 1000, 4700, "WE'VE BEEN DOING THIS A LONG TIME", fontBlock, 32),
  new textCreator(true, 1800, 4700, "So many\ndifferent methods failing", fontNokia, 32),
  new textCreator(true, 2600, 4700, "But after thousands of years", fontNokia, 32),
  new textCreator(true, 3400, 4700, "I realized the story\nneeds to unfold\na certain way", fontNokia, 32),
  new textCreator(true, 4200, 4700, "You can't be given\nthe entire story\nfrom the beginning", fontNokia, 32),
  new textCreator(true, 5000, 4700, "That clarity needs to\ncome from progression", fontNokia, 32),
  new textCreator(true, 5800, 4700, "To cure\nthe rage and sadness\nin your heart", fontNokia, 32),
  new textCreator(true, 6600, 4700, "For the ultimate goal of\nfinally freeing you", fontNokia, 32),
  new textCreator(true, 7400, 4700, "But never forget", fontNokia, 32),
  // new textCreator(true, 8200, 4700, "The       is your enemy", fontNokia, 32),
  new textCreator(true, 8205, 4700, "The", fontNokia, 32),
  new textCreator(true, 8255, 4700, "Shadow", fontGrind, 32),
  new textCreator(true, 8365, 4700, "is your enemy", fontNokia, 32),
];

///////////////////////////////////////////Level 6///////////////////////////////////////////////////////////
var level_6 = new LevelCreator(
  "[6]Movement", //Name of World
  2000, //X-Size of World
  2000, //Y-Size of World
  '#c7ebdf', //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  noGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  .1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Room-Switching
level_6.metroidvania = new MetroidvaniaCreator(
  4, //Room-Up-Index
  8, //Room-Down-Index
  5, //Room-Left-Index
  3, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_6.playerPosition = [
  new PlayerPositionCreator(900, 300),
  new PlayerPositionCreator(1050, 1800),
  new PlayerPositionCreator(100, 1925),
  new PlayerPositionCreator(1050, 1800),
]

//Sprite Generation
level_6.spriteSpawn = [
  ////////////////////////////////////Ground/////////////////////////////////////////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 1950, 950, 50, 1, 0, 0, 0, 0, null, null),
  //////////////////////////////////////Borders//////////////////////////////////////////////////////////
  //Top
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 0, 300, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 250, 50, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 300, 0, 700, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1050, 0, 950, 50, 1, 0, 0, 0, 0, null, null),
  //Dislodge Stop Gap (STill TOp)
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1000, 0, 50, 450, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 50, 50, 1200, 1, 0, 0, 0, 0, null, null),
  //Right
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1950, 50, 50, 1950, 1, 0, 0, 0, 0, null, null),
  //Bottom
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1200, 1950, 750, 50, 1, 0, 0, 0, 0, null, null),
  //Bottom Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1400, 1900, 50, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////Jump on Wall First///////////////////////////
  //The Wall
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 900, 950, 50, 950, 1, 0, 0, 0, 0, null, null),
  //Death Pit
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 600, 1900, 350, 50, 1, 0, 0, 0, 0, null, null),
  //Top Hat
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 600, 900, 1050, 50, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////////Disledge Pit///////////////////////////////////
  //Left-Hand Border
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 550, 125, 50, 800, 1, 0, 0, 0, 0, null, null),
  //Safe Haven
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 450, 250, 50, 1, 0, 0, 0, 0, null, null),
  //Underneath Safe Haven
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 750, 500, 300, 50, 1, 0, 0, 0, 0, null, null),
  //You Can Double-Jump in the Air
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 825, 50, 50, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////////Baby Pillars of Death//////////////////////////
  //Base Pillar
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1650, 150, 50, 800, 1, 0, 0, 0, 0, null, null),
  //Opposite Side Base Pillar Death
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1700, 200, 25, 1550, .5, 0, 0, 0, 0, null, null),
  //Death Traps
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 1550, 625, 100, 25, .5, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 1550, 300, 100, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1600, 625, 50, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1600, 300, 50, 25, .5, 0, 0, 0, 0, null, null),
  ////////////////////////////////////The Last Pillar//////////////////////////////
  //Base Pillar
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1150, 1200, 50, 800, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 1550, 625, 100, 25, .5, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, deathRegular, 'tile', deathTile, 1550, 300, 100, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1200, 1350, 50, 25, .5, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 1200, 1725, 50, 25, .5, 0, 0, 0, 0, null, null),
];

//Flag
level_6.flagSpawn = [
  new flagCreator(2, true, flagRegular, flag, 1, 200, 1900, 0, 0, 0, 0, null),
  new flagCreator(0, true, flagRegular, flag, 1, 875, 400, 0, 0, 0, 0, null),
];

level_6.text = [
  new textCreator(true, 164, 1850, "Checkpoint", fontNokia, 32),
  new textCreator(true, 380, 1750, "Jump on the wall", fontNokia, 32),
  new textCreator(true, 625, 1870, "You stick to surfaces", fontNokia, 32),
  new textCreator(true, 625, 1600, "Hold    and Tap\nto Fast Climb", fontNokia, 32),
  new textCreator(true, 675, 1600, "D             A", fontBlock, 32),
  new textCreator(true, 500, 1200, "Hold    Then Double-Jump", fontNokia, 32),
  new textCreator(true, 550, 1200, "A", fontBlock, 32),
  new textCreator(true, 150, 1000, "Reverse the Movement", fontNokia, 32),
  new textCreator(true, 195, 206, "You can move upside down", fontNokia, 32),
  new textCreator(true, 750, 150, "Press    to disoldge\nfrom surfaces", fontNokia, 32),
  new textCreator(true, 810, 150, "S", fontBlock, 32),
  new textCreator(true, 800, 625, "You can control your\nmovement in the air", fontNokia, 32),
  // new textCreator(true, 800, 625, "You can double-jump\nin the air", fontNokia, 32),
  new textCreator(true, 1250, 500, "Once you touch\na surface you\ncan double-jump again", fontNokia, 32),
  // new textCreator(true, 1250, 200, "Super important\n       |\n       |\n       V", fontNokia, 32),
  new textCreator(true, 1775, 200, "Hold    to\nslow fall", fontNokia, 32),
  new textCreator(true, 1825, 200, "S", fontBlock, 32),
  new textCreator(true, 1350, 1725, "Dislodging will\nbe useful here", fontNokia, 32),
  new textCreator(true, 1775, 1400, "Make sure\nyou have\ndouble-jumps", fontNokia, 32),
];

///////////////////////////////////////////Level 7(The Real True Beginning)///////////////////////////////////////////////////////////
var level_7 = new LevelCreator(
  "[7]??????????", //Name of World
  1600, //X-Size of World
  20000, //Y-Size of World
  "#ffffff", //Background Color
  false, //Out of Bounds Allowed
  1, //Player Scale
  begNen, //Nen-System
  noGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  .1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Changing Background Color
level_7.colorChange = new BackgroundColorChange(200, 255, 5);

//Special Level Condition
level_7.specialLevel = new TimerLevel('timed', 0, 5, 0, 5);

// level_7.worldGravity = new worldGravityCreator(0, 2000);

//Room-Switching
level_7.metroidvania = new MetroidvaniaCreator(
  5, //Room-Up-Index
  5, //Room-Down-Index
  5, //Room-Left-Index
  5, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_7.playerPosition = [
  new PlayerPositionCreator(800, 200),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(100, 1925),
  new PlayerPositionCreator(200, 300),
]

//Sprite Generation
level_7.spriteSpawn = [
  // ///////////////////////////////////Ground Sprites////////////////////////////////////////////////////
  // //X-Set One
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 1000, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundSlippery, 'tile', groundTile, 900, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 1100, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundSlippery, 'tile', groundTile, 1200, 1700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // //X-Set Two
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 1000, 2200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundSlippery, 'tile', groundTile, 900, 2700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegular, 'tile', groundTile, 1100, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundSlippery, 'tile', groundTile, 1200, 3700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // ///////////////////////////////////Ledge Sprites////////////////////////////////////////////////////
  // //X-Set One
  // new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1300, 250, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1400, 750, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1500, 1250, null, null, 1, 0, 0, 0, 0, null, null),
  // //X-Set Two
  // new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1300, 1750, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1400, 2250, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1500, 2750, null, null, 1, 0, 0, 0, 0, null, null),
  // //X-Set Three
  // new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1300, 3250, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1400, 3750, null, null, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1500, 4250, null, null, 1, 0, 0, 0, 0, null, null),
  // ///////////////////////////////////Wall Sprites//////////////////////////////////////////////
  // //X-Set One
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 500, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallMomentum, 'tile', wallTile50, 600, 700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // //X-Set Two
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 500, 1700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallMomentum, 'tile', wallTile50, 600, 2200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 2700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // //X-Set Three
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 500, 3200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallMomentum, 'tile', wallTile50, 600, 3700, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 4200, 50, 50, 1, 0, 0, 0, 0, null, null),
  // ////////////////////////////////Ball Sprites//////////////////////////////////////////////////
  // //X-Set One
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 200, 250, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 300, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 400, 1250, 50, 50, 1, 0, 0, 0, 0, null, null),
  // //X-Set Two
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 200, 1750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 300, 2250, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 400, 2750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // //X-Set Three
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 200, 3250, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 300, 3750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 400, 4250, 50, 50, 1, 0, 0, 0, 0, null, null),
];

//Flag
level_7.flagSpawn = [

];

level_7.text = [

];

////////////////////////////////////////////////////////Level 8 The Gun Level///////////////////////////////////////////////////////
var level_8 = new LevelCreator(
  "[8]Guns", //Name of World
  1600, //X-Size of World
  2500, //Y-Size of World
  "#f4d9cf", //Background Color
  true, //Out of Bounds Allowed
  1, //Player Scale
  portalNen, //Nen-System
  killGunSet, //Gun-Set
  true, //Sideways Stick to Walls,
  true, //Upsidedown Stick
  .1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Room-Switching
level_8.metroidvania = new MetroidvaniaCreator(
  6, //Room-Up-Index
  5, //Room-Down-Index
  5, //Room-Left-Index
  5, //Room-Right-Index
);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_8.playerPosition = [
  new PlayerPositionCreator(200, 50),
  new PlayerPositionCreator(200, 300),
  new PlayerPositionCreator(100, 1925),
  new PlayerPositionCreator(200, 300),
]

//Sprite Generation
level_8.spriteSpawn = [
  //////////////////////////////////Ground//////////////////////////////////////
  //Ground with Flag
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 50, 400, 1150, 50, 1, 0, 0, 0, 0, null, null),
  //Ground With Ball
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 400, 650, 1150, 50, 1, 0, 0, 0, 0, null, null),
  //Last Stable Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 50, 900, 500, 50, 1, 0, 0, 0, 0, null, null),
  /////////////////////////////////Borders//////////////////////////////////////
  //Right & End
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1550, 0, 50, 2200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, deathBallKill, 'tile', ball, 1500, 2200, 50, 250, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  new SpriteCreator(true, deathBallKill, 'tile', ball, 1550, 2200, 50, 250, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  //Bottom First Half
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 2450, 1600, 50, 1, 0, 0, 0, 0, null, null),
  //Left
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 0, 50, 2450, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////Ball/////////////////////////////////////////////
  new SpriteCreator(true, ballRegular, 'sprite', ball, 950, 550, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, ballRegular, 'sprite', ball, 550, 2300, 50, 50, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////Prevent First Half Cheese/////////////////////////
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1550, 0, 50, 2000, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////Main Middle Obstacles////////////////////////////
  //Base 50-50 Blocks
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 400, 1600, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1009.6, 1388.7, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 600, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 850, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1250, 900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 300, 1400, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 500, 1444.8, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1009.6, 1388.7, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1050, 1261, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 530, 1900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1058, 1625, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 826, 1766, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 861, 1485, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 765, 1521, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 525, 1742, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 543, 1346, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1180, 1322, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 696, 1877, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 553, 1640, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 923, 1319, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 1000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1264, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 942, 1173, 50, 50, 1, 0, 0, 0, 0, null, null),
  //
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 157, 1319, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 215, 1589, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1379, 1054, 50, 50, 1, 0, 0, 0, 0, null, null),
  //50x-150/200y Blocks
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1400, 1600, 50, 150, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 1200, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 639, 1586.5, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 1400, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 500, 1025, 50, 150, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 686.6, 876.9, 50, 200, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 665, 1376, 50, 150, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 401, 1284, 50, 150, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1221, 1762, 50, 150, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1030, 1900, 50, 150, 1, 0, 0, 0, 0, null, null),
  //150/200x-50y Blocks
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 1000, 200, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 200, 1172, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 210, 1820, 200, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 800, 1600, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1227.8, 1965, 150, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1328, 1250, 200, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 140, 1658, 200, 50, 1, 0, 0, 0, 0, null, null),
  //Stocky Boy Blocks 400x,50y
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 50, 1950.5, 400, 100, 1, 0, 0, 0, 0, null, null),
  //Boxes
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 985, 1782.6, 100, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 720, 1950, 100, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 50, 1450, 100, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1450, 1100, 100, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1450, 1400, 100, 100, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1102, 996, 100, 100, 1, 0, 0, 0, 0, null, null),
  //Twin Primes
  // //Moving tiles
  // new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 700, 1700, 50, 50, 1, 1000, 0, 0, 0, null, null),
  // new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 900, 1000, 50, 200, 1, 1000, 0, 0, 0, null, null),
  //////////////////////////////Falling Spikes Intro//////////////////////////////
  //Hat
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 600, 2100, 950, 100, 1, 0, 0, 0, 0, scFallingSpikes, null),
  //Trap 1
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 612.5, 2150, 50, 50, 1, 0, 300, 0, 500, null, new timerCreator('loop', null, .5)),
  // new SpriteCreator(true, fallingSpikesRegular, 'timer', 'particles', 612.5, 2215, 50, 50, 1, 0, 200, 0, 500, null, new timerCreator('loop', null, .5)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 612.5, 2212.5, null, null, .5, 0, 0, 0, 0, null, null),
  // //Trap 2
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 1000, 2150, 50, 50, 1, 0, 300, 0, 500, null, new timerCreator('loop', null, .5)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1000, 2212.5, null, null, .5, 0, 0, 0, 0, null, null),
  //Trap 3
  new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, 1387.5, 2150, 50, 50, 1, 0, 300, 0, 500, null, new timerCreator('loop', null, .5)),
  new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, 1387.5, 2212.5, null, null, .5, 0, 0, 0, 0, null, null),
];

//Flag
level_8.flagSpawn = [
  new flagCreator(0, true, flagRegular, flag, 1, 277, 350, 0, 0, 0, 0, null),
];

level_8.text = [
  new textCreator(true, 400, 150, "1\n2\n3\n4", fontBlock, 32),
  new textCreator(true, 450, 200, "-Access Spirit Guns", fontNokia, 32),
  new textCreator(true, 1100, 150, "Different pocket dimensions\n=\nDifferent Guns", fontNokia, 32),
  // new textCreator(true, 900, 150, "LEFT\nCLICK", fontBlock, 32),
  // new textCreator(true, 1100, 175, "-Shoot", fontNokia, 32),
  new textCreator(true, 400, 500, "LEFT\nCLICK", fontBlock, 32),
  new textCreator(true, 590, 525, "-Shoot", fontNokia, 32),
  new textCreator(true, 1300, 500, "Guide the ball\nto the end", fontNokia, 32),
  new textCreator(true, 925, 490, "Ball", fontNokia, 32),
  new textCreator(true, 140, 750, "Press\nTo kill yourself\nIf you destroy the ball", fontNokia, 32),
  new textCreator(true, 200, 750, "R", fontBlock, 32),
  new textCreator(true, 140, 500, "Bullets are killed\noffscreen", fontNokia, 32),
  new textCreator(true, 645, 2250, "The trap is spawning\neven if it's unseen", fontNokia, 32),
  new textCreator(true, 150, 2250, "Destroy deathWall with the ball\n\nBlock fallingSpikes with ball", fontNokia, 32),
];


//////////////////////////////////////////Pushing All Levels Into World Array/////////////////////////////////////
var levelCount = 8;
for (var i = 0; i <= levelCount; i++) {
  // worldClassLevels.push(eval("level_"+i));
  worldClassLevels.push(window["level_" + i]);
}
