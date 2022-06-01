var game = new Phaser.Game(1600, 900, Phaser.AUTO);
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
///////////////////////////////////////////Level 0(TESTING ENVIRONMENT)///////////////////////////////////////////////////////////
var level_0 = new LevelCreator(
  "[17]Game Loop Change", //Name of World
  1600, //X-Size of World
  900,  //Y- Size of World 
  "#FFFDD0", //Background Color
  false, //Out of Bounds Allowed
  .3, //PlayerScale
  testNen, //Nen-System
  noGunSet, //Gun-Set
  false, //Sideways Stick to Walls,
  false, //Upsidedown Stick
  1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Font World Color
//level_0.fontWorldColor = Phaser.Color.BLUE;

//Player Stats Color
//level_0.playerStatsColor = Phaser.Color.BLUE;

//Changing Background Color
// level_0.colorChange = new BackgroundColorChange(200, 255, 5);

//Special Level Initiated
// level_0.specialLevel = new TimerLevel('timed', 1, 5, 0, 10);
// level_0.specialLevel = new KillAllLevel('killAll', 0, 5, 0, 1);
// level_0.specialLevel = new CollectLevel('collected', 1, 5, 0, 4);

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
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 800, 1000, 50, 1, 0, 0, 0, 0),
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 1200, 400, 50, 500, 1, 0, 0, 0, 0),
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

////////////////////////////////Level 1///////////////////////////////////
var level_1 = new LevelCreator(
  "[17]Game Loop Change", //Name of World
  1600, //X-Size of World
  900,  //Y- Size of World 
  "#FFFDD0", //Background Color
  false, //Out of Bounds Allowed
  .3, //PlayerScale
  testNen, //Nen-System
  noGunSet, //Gun-Set
  false, //Sideways Stick to Walls,
  false, //Upsidedown Stick
  1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Font World Color
//level_1.fontWorldColor = Phaser.Color.BLUE;

//Player Stats Color
//level_1.playerStatsColor = Phaser.Color.BLUE;

//Changing Background Color
// level_1.colorChange = new BackgroundColorChange(200, 255, 5);

//Special Level Initiated
// level_1.specialLevel = new TimerLevel('timed', 1, 5, 0, 10);
// level_1.specialLevel = new KillAllLevel('killAll', 0, 5, 0, 1);
level_1.specialLevel = new CollectLevel('collected', 1, 5, 0, 4);

//Room-Switching
level_1.metroidvania = new MetroidvaniaCreator(
  1, //Room-Up-Index
  0, //Room-Down-Index
  0, //Room-Left-Index
  0, //Room-Right-Index
);

//World Gravity
// level_1.worldGravity = new worldGravityCreator(0, -200);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_1.playerPosition = [
  new PlayerPositionCreator(100,100),
  new PlayerPositionCreator(100,100),
  new PlayerPositionCreator(100,100),
  new PlayerPositionCreator(100,100),
];

//Object Generation
level_1.spriteSpawn = [
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 200, 200, 25, 1, 0, 0, 0, 0),
  //////////////////////Walls////////////////////////
  // new SpriteCreator(true, wallRegular, 'tile', wallTile25, 800, 600, 25, 25, 1, 0, 0, 0, 0),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile25, 800, 300, 25, 25, 1, 0, 0, 0, 0),
  //Ledges
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 400, 400, null, null, 1, 0, 0, 0, 0),
  // new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 500, 400, null, null, 1, 0, 0, 0, 0),
  // new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 600, 400, null, null, 1, 0, 0, 0, 0),
  //Moving Ground
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 1600, 400, 50, 50, 1, 700, 0, 0, 0),
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 500, 255, 50, 50, 1, -700, 0, 0, 0),
  //Death
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 900, 1600, 25, 1, 0, 0, 0, 0),
];

//flag spawn
level_1.flagSpawn = [
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
  new flagCreator(0, true, flagRegular, flag, 1, 1450, 800, 0, 0, 0, 0,
    new shadowLevelGenerator(0, [
      new shadowLevelArray(17, 0)
    ])),
];

//Text
// level_1.text = [

// ];

/////////////////////////////Level 2///////////////////////////////////
////////////////////////////////New Level///////////////////////////////////
var level_2 = new LevelCreator(
  "[17]Game Loop Change", //Name of World
  1600, //X-Size of World
  900,  //Y- Size of World 
  "#FFFDD0", //Background Color
  false, //Out of Bounds Allowed
  .3, //PlayerScale
  testNen, //Nen-System
  noGunSet, //Gun-Set
  false, //Sideways Stick to Walls,
  false, //Upsidedown Stick
  1, //X-Camera Lerp
  1, //Y-Camera Lerp
  fontNokia, //World Font Name
);

//Font World Color
//level_2.fontWorldColor = Phaser.Color.BLUE;

//Player Stats Color
//level_2.playerStatsColor = Phaser.Color.BLUE;

//Changing Background Color
// level_2.colorChange = new BackgroundColorChange(200, 255, 5);

//Special Level Initiated
// level_2.specialLevel = new TimerLevel('timed', 1, 5, 0, 10);
// level_2.specialLevel = new KillAllLevel('killAll', 0, 5, 0, 1);
level_2.specialLevel = new CollectLevel('collected', 1, 5, 0, 4);

//Room-Switching
level_2.metroidvania = new MetroidvaniaCreator(
  1, //Room-Up-Index
  0, //Room-Down-Index
  0, //Room-Left-Index
  0, //Room-Right-Index
);

//World Gravity
// level_2.worldGravity = new worldGravityCreator(0, -200);

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(100,100),
  new PlayerPositionCreator(100,100),
  new PlayerPositionCreator(100,100),
  new PlayerPositionCreator(100,100),
];

//Object Generation
level_2.spriteSpawn = [
  //Ground
  new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 200, 200, 25, 1, 0, 0, 0, 0),
  //////////////////////Walls////////////////////////
  // new SpriteCreator(true, wallRegular, 'tile', wallTile25, 800, 600, 25, 25, 1, 0, 0, 0, 0),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile25, 800, 300, 25, 25, 1, 0, 0, 0, 0),
  //Ledges
  // new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 400, 400, null, null, 1, 0, 0, 0, 0),
  // new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 500, 400, null, null, 1, 0, 0, 0, 0),
  // new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 600, 400, null, null, 1, 0, 0, 0, 0),
  //Moving Ground
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 1600, 400, 50, 50, 1, 700, 0, 0, 0),
  new SpriteCreator(true, groundRegularMove, 'tile', gMovingTile, 500, 255, 50, 50, 1, -700, 0, 0, 0),
  //Death
  new SpriteCreator(true, deathRegular, 'tile', deathTile, 0, 900, 1600, 25, 1, 0, 0, 0, 0),
];

//flag spawn
level_2.flagSpawn = [
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
  new flagCreator(0, true, flagRegular, flag, 1, 1450, 800, 0, 0, 0, 0,
    new shadowLevelGenerator(0, [
      new shadowLevelArray(17, 0)
    ])),
];

//Text
// level_2.text = [

// ];

//////////////////////////////////////////Pushing All Levels Into World Array/////////////////////////////////////
var levelCount = 2;
for (var i = 0; i <= levelCount; i++) {
  // worldClassLevels.push(eval("level_"+i));
  worldClassLevels.push(window["level_" + i]);
}
