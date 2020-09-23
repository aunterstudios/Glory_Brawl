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
  "GunChanges",
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
// level_0.worldGravity = new worldGravityCreator(0, -200);

//Creation of Nen System in Level
level_0.nenSystem = portalNen;

//Creation of Gun System in Level
level_0.gunSystem = basicGunSet;
// level_0.gunSystem = testGunSet;

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
var level_1 = new LevelCreator("Level 1-SandboxMode", 1400, 16000, new MetroidvaniaCreator(1, 0, 1, 10000, 2, 0, 1, 1400), '#ffffff');

//World Gravity
// level_1.worldGravity = new worldGravityCreator(200,200);

//Creation of Nen System in Level
level_1.nenSystem = seanNen;

//Creation of Gun System in Level
level_1.gunSystem = testGunSet;

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
  new SpriteCreator(true, immovableWallSlippery, 'tile', immovableWallTile, 0, 0, 50, 8000, 1, 0, 0, 0, 0, null, null),
  //Middle
  new SpriteCreator(true, immovableWallSlippery, 'tile', immovableWallTile, 500, 0, 50, 1000, 1, 0, 0, 0, 0, null, null),
  //Right
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 1350, 0, 50, 1050, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallSlippery, 'tile', immovableWallTile, 1350, 1050, 50, 2000, 1, 0, 0, 0, 0, null, null),
  /////////////////////////////////////////Ground/////////////////////////////////////////////////
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 600, 200, 200, 50, 1, 0, 0, 0, 0, null, null),
  ////////////////////////////////////////First White Section//////////////////////////////////////////
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 600, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 700, 900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 850, 1000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 900, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 1000, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 550, 1000, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 700, 900, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 900, 1300, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 800, 1200, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 1000, 1100, 50, 50, 1, 0, 0, 0, 0, null, null),


  //////////////Walls That Kill You
  // // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 850, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 900, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallSurf, 'tile', wallTile50, 950, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallInverse, 'tile', wallTile50, 1000, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 1050, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1100, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1150, 800, 50, 50, 1, 0, 0, 0, 0, null, null),
  ///////////////////////////////////////Spring Board Enemies Section//////////////////////////////////////
  //Mixed Wall
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 600, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 650, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 700, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 750, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 800, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 850, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 900, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 950, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1000, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 1050, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1100, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 1150, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1200, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallKiller, 'tile', wallTile50, 1250, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1300, 750, 50, 50, 1, 0, 0, 0, 0, null, null),
  // //Enemies
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 600, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 650, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 700, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 750, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 800, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 850, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 900, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 950, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1000, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1050, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1100, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1150, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1200, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1250, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  // new SpriteCreator(true, enemyDaakath, 'sprite', enemyOne, 1300, 850, 50, 50, 1, 0, 0, 0, 0, scNoTypeEnemy, null),
  //Bottom of Enemies
  // new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 575, 1000, 750, 50, 1, 0, 0, 0, 0, null, null),
];

//flag spawn
level_1.flagSpawn = [
  // //First Flag
  new flagCreator(1, true, flagRegular, flag, 750, 150, 0, 0, .4, .4, 0, 0, null),
];

////////////////////////////////////////Level 2/////////////////////////////////////
var level_2 = new LevelCreator("Level 2-What", 4800, 2000, new MetroidvaniaCreator(3, 0, 3, 2000, null, null, 1, 4800), '#FFFDD0');

//World Gravity
// level_2.worldGravity = new worldGravityCreator(200,200);

//Creation of Nen System in Level
level_2.nenSystem = portalNen;

//Creation of Gun System in Level
level_2.gunSystem = basicGunSet;

//Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
level_2.playerPosition = [
  new PlayerPositionCreator(200, 20),
  new PlayerPositionCreator(3750, 1375),
  new PlayerPositionCreator(200, 925),
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
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 3950, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Phaser Wall
  new SpriteCreator(true, immovableWallPhase, 'tile', immovableWallTile, 4000, 1500, 50, 450, 1, 0, 0, 0, 0, scLocalizedDestruction, null),
  //Slippery Wall to Climb
  new SpriteCreator(true, immovableWallSlippery, 'tile', immovableWallTile, 4800, 0, 50, 1800, 1, 0, 0, 0, 0, null, null),
  //Ground
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 4000, 2000, 800, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 0, 2000, 4000, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 3950, 1900, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Moving Traps for Third Part
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 400, 1100, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 800, 1200, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 1200, 1300, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 1600, 1100, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 2000, 1200, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 2400, 1300, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 2800, 1100, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 3200, 1200, 50, 50, 1, 0, 500, 0, 0, scReverseVelocity, null),
  //Enemy to Grab to Kill Phase Wall
  new SpriteCreator(true, enemyShooter, 'sprite', enemyOne, 4700, 60, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Death Border Right Hand Side
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4050, 0, 700, 25, .5, 0, 0, 0, 0, null, null),
  //Sniper Nest Immovable Wall
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 3950, 1800, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Top Borders of Movable Traps Wall Edition Part One
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 0, 1450, 3900, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallOneWayPlayer, 'tile', immovableWallTile, 3900, 1450, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Top Borders of Movable Traps Wall Edition Part Two
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 100, 1000, 3900, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallOneWayPlayer, 'tile', deathTile, 25, 1000, 100, 50, .5, 0, 0, 0, 0, null, null),
  //First Moveable Wall to Grab on Left Hand Side
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 200, 1890, 25, 25, 1, 0, 0, 0, 0, null, null),
  // new SpriteCreator(true, wallRegular, 'sprite', wallTile50, 700, 200, 50, 50, 1, 0, 0, 0, 0, null, null),
  //Moving Traps on Moveable Wall
  new SpriteCreator(true, undeniableDeathGhost, 'tile', deathTile, 500, 1800, 50, 50, 1, 0, 600, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathGhost, 'tile', deathTile, 1300, 1800, 50, 50, 1, 0, 600, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathGhost, 'tile', deathTile, 2100, 1800, 50, 50, 1, 0, 600, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathGhost, 'tile', deathTile, 2900, 1800, 50, 50, 1, 0, 600, 0, 0, scReverseVelocity, null),
  new SpriteCreator(true, undeniableDeathGhost, 'tile', deathTile, 3700, 1800, 50, 50, 1, 0, 600, 0, 0, scReverseVelocity, null),
  // new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 4400, 50, 50, 50, 1, 0, 700, 0, 0, scReverseVelocity, null),
  //Top Left Border
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 0, 0, 25, 1950, .5, 0, 0, 0, 0, null, null),
  //CheckPoint Holder for Third Part
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 3950, 1400, 50, 50, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 3600, 1400, 300, 50, 1, 0, 0, 0, 0, null, null),
  //Test wall
  // new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 3800, 1890, 25, 25, 1, 0, 0, 0, 0, null, null),
  //Moveable Wall for Third Part
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 3500, 1425, 25, 25, 1, 0, 0, 0, 0, null, null),
  new SpriteCreator(true, wallRegular, 'sprite', wallTile25, 3400, 1425, 25, 25, 1, 0, 0, 0, 0, null, null),
  //Checkpoint Holder for End of Third Part
  new SpriteCreator(true, immovableWallRegular, 'tile', immovableWallTile, 100, 950, 250, 50, 1, 0, 0, 0, 0, null, null),
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
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 200, 0, 3800, 50, 1, 0, 0, 0, 0, null, null),
  //Traps for Last Part
  new SpriteCreator(true, undeniableDeathRegular, 'tile', deathTile, 25, 400, 500, 25, .5, 0, 0, 0, 0, null, null),
  //Hazama For the lastest part
  new SpriteCreator(true, hazamaFalconia, 'tile', hazamaHippie, 400, 50, 3600, 950, 1, 0, 0, 0, 0, null, null),

];

//Flag Spawn
level_2.flagSpawn = [
  // new flagCreator(1, true, flagSpecial, flag, 4200, 1800, 0, 0, .4, .4, 0, 0,
  //   new shadowLevelGenerator(0, [
  //     new shadowLevelArray(2, 4)
  //   ])),
  new flagCreator(3, true, flagRegular, flag, 4700, 1900, 0, 0, 1, 1, 0, 0, null),
  new flagCreator(1, true, flagRegular, flag, 3800, 1350, 0, 0, 1, 1, 0, 0, null),
  new flagCreator(2, true, flagRegular, flag, 300, 900, 0, 0, 1, 1, 0, 0, null),

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

//Creation of Gun System in Level
level_3.gunSystem = basicGunSet;

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

//Creation of Gun System in Level
level_4.gunSystem = basicGunSet;

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
