var game = new Phaser.Game(1400, 800, Phaser.CANVAS);

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

//Death Total in Game
var deaths = 0;

//Total Streak
var streak = 0;
var longestStreak = 0;

//Weapon Variables to Change Bullet Type
var pullBoolean = false;
var pushBoolean = false;
var stopBoolean = false;

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
var practiceWorldPositionOne = new baseCampCreator(200, 400, 0, 0);
var practiceWorldPositionTwo = new baseCampCreator(200, 1600, 0, 3);
var practiceWorldPositionThree = new baseCampCreator(1600, 400, 3, 0);
var practiceWorldPositionFour = new baseCampCreator(1600, 1600, 3, 3);
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
var traditionalPlatformerValues = new worldValues(600, 700, 300, 375, 5, 1400, 700, 10, 2, 2);
//For the Mountain Climb
var mountainClimbValues = new worldValues(700, 700, 580, 700, 1, 1400, 6200, 2, 9, 3);
//For the Canvas World
var canvasWorldValues = new worldValues(400, 465, 290, 400, 1, 1400, 700, 3, 2, 3);
//For the Large World
var largeWorldValues = new worldValues(550, 570, 600, 660, 3, 1400, 3900, 7, 6, 3);
//For the Practice World
var practiceWorldValues = new worldValues(400, 500, 400, 500, 3, 1400, 1900, 4, 4, 3);

//////////////////////World Randomness Generator(The Conclusion)//////////////////

var worldGenerator = [
  {
    xOfWorld: 7000,
    yOfWorld: 800,
    baseCamp: tradtionalPlatformerArray, //Array
    world: traditionalPlatformerValues, //Object
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
var wallLength = [.4, .5, .6];

//Different Immmovable Wall Types
//Different Wall Types
var immovableWallArray = ['immovableVerticalWall', 'immovableRotatedWall'];
var immovableWallLength = [.5, .6];
var immovableWallVelocity = [0, 1];

/////////////////////////////////////////////////Array Shuffler///////////////////////////////////////
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "Rogue Version-OVERLAP_BIAS-BLAME!",
  "You have no name and no memory.",
  "Trapped in an unknown ever-changing world.",
  "All you know is the name of the world",
  "Glory Brawl",
  "Survive 1000 rooms in a row without dying to escape."
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
function playerWall(player, wall) {
  // wall.body.stop();
  // if (wall.body.touching.up) {
  //   wall.body.velocity.y = -200;
  //   player.body.velocity.y = -200
  //   // if (player.body.velocity.x < 0) {
  //   //   wall.body.velocity.x = player.body.velocity.x - 100;
  //   // }
  //   // if (player.body.velocity.x > 0) {
  //   //   wall.body.velocity.x = player.body.velocity.x + 100;
  //   // }
  //   // {
  //   //   wall.body.velocity.x = 0;
  //   // }
  // }
  // // When You're Hitting the Edge from the Sides (Right and Left)
  // else if (wall.body.touching.left || wall.body.touching.right) {
  //   wall.body.velocity.y = 0;
  //   wall.body.velocity.x = player.body.velocity.x;
  // }
  // /////////////////////////////////In Case Want to Change Side Ledge Velocity///////////
  // // if (wall.body.touching.left) {
  // //   wall.body.velocity.y = 0;
  // //   wall.body.velocity.x = 300;
  // // }
  // // if (wall.body.touching.right) {
  // //   wall.body.velocity.y = 0;
  // //   wall.body.velocity.x = -300;
  // // }
  // // if (wall.body.touching.down && player.body.velocity.y < -1) {
  // //   player.body.velocity.y = -100;
  // // }
  // else if (wall.body.touching.down) {
  //   wall.body.velocity.y = -300;
  //   player.body.velocity.y = -100;
  // }
}
////////////////////////////////////Immovable Wall/////////////////////////////


////////////////////////////////////Ledge Mechanics//////////////////////////////////////


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
  ledge.body.stop();
  ledge.body.velocity.y = 200;
  ledge.body.velocity.x = player.body.velocity.x;
}

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

function enemyLedgeBlue(ledge, enemy) {
  enemy.body.stop();
  enemy.body.velocity.y = -100;
}
//Preventing Physics Bugs
function preventPhysicsBug(sprite1, sprite2) {
  if (sprite1.body.touching.down) {
    sprite1.body.velocity.y = -1000;
  }
}

// function preventPhysicsBug2(sprite1, sprite2) {
//   if (sprite1.body.touching.down) {
//     sprite1.body.velocity.y = -1000;
//   }
//   if (sprite1.body.touching.up) {
//     sprite1.body.stop();
//     sprite1.body.velocity.y = 50;
//   }
// }

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
  if (ball.body.touching.up) {
    ball.body.velocity.y = 50;
  }
  else if (ball.body.touching.down) {
    ball.body.velocity.y = -50;
    player.body.velocity.y = -75;
  }
  else if (ball.body.touching.left) {
    ball.body.velocity.x = 50;
  }
  else if (ball.body.touching.right) {
    ball.body.velocity.x = -50;
  }
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

function ballLedge(ball, ledge) {
  if (ball.body.touching.up) {
    ledge.body.stop();
    ball.body.stop();
    ball.body.velocity.y = 200;
    ledge.body.velocity.y = -200;
  }
  else if (ball.body.touching.down) {
    ledge.body.stop();
    ball.body.stop();
    ball.body.velocity.y = -200;
    ledge.body.velocity.y = 100;
  }
}

function ballWall(ball, wall) {
  if (ball.body.touching.up) {
    ball.body.velocity.y = 100;
  }
  else if (ball.body.touching.down) {
    ball.body.velocity.y = -100;
  }
  else if (ball.body.touching.left) {
    ball.body.velocity.x = 100;
  }
  else if (ball.body.touching.right) {
    ball.body.velocity.x = -100;
  }
}

function ballLedgeDown(ball, ledge) {
  if (ledge.body.touching.up) {
    ball.body.velocity.y = -1000;
  }
  else if (ledge.body.touching.down) {
    ball.body.velocity.y = 1000;
  }
}

////////////////////////////Weapon Mechanics///////////
// this.game.physics.arcade.overlap(this.weapon.bullets, this.wall, weaponWall);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.spikes, weaponSpikes);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.ledge, weaponLedge);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.ledgeDown, weaponDownLedge);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.ledgeSide, weaponSideLedge);
// this.game.physics.arcade.overlap(this.weapon.bullets, this.enemy, weaponEnemy);
function weaponImmovable(weapon, wall) {
  weapon.kill();
}
function weaponBall(weapon, ball) {
  // ball.body.stop();

  if (pullBoolean) {
    if (ball.body.touching.up) {
      ball.body.velocity.y = -100;
    }
    else if (ball.body.touching.down) {
      ball.body.velocity.y = 100;
    }
    else if (ball.body.touching.left) {
      ball.body.velocity.x = -100;
    }
    else if (ball.body.touching.right) {
      ball.body.velocity.x = 100;
    }
  }
  else if (pushBoolean) {
    if (ball.body.touching.up) {
      ball.body.velocity.y = 100;
    }
    else if (ball.body.touching.down) {
      ball.body.velocity.y = -100;
    }
    else if (ball.body.touching.left) {
      ball.body.velocity.x = 100;
    }
    else if (ball.body.touching.right) {
      ball.body.velocity.x = -100;
    }
  }
  else if (stopBoolean) {
    ball.body.stop()
  }
  weapon.kill();
}

function weaponWall(weapon, wall) {
  wall.body.stop();
  if (pullBoolean) {
    if (wall.body.touching.up) {
      wall.body.velocity.y = -50;
    }
    else if (wall.body.touching.down) {
      wall.body.velocity.y = 50;
    }
    else if (wall.body.touching.left) {
      wall.body.velocity.x = -50;
    }
    else if (wall.body.touching.right) {
      wall.body.velocity.x = 50;
    }
  }
  else if (pushBoolean) {
    // wall.body.immovable = false;
    if (wall.body.touching.up) {
      wall.body.velocity.y = 50;
    }
    else if (wall.body.touching.down) {
      wall.body.velocity.y = -50;
    }
    else if (wall.body.touching.left) {
      wall.body.velocity.x = 50;
    }
    else if (wall.body.touching.right) {
      wall.body.velocity.x = -50;
    }
  }
  else if (stopBoolean) {
    // wall.body.immovable = true;
    wall.body.stop();
    // wall.kill();
  }
  weapon.kill();
}

function weaponSpikes(weapon, spikes) {
  weapon.kill();
}

function weaponLedge(weapon, ledge) {
  // ledge.body.stop();
  if (pullBoolean) {
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = -100;
    }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = 100;
    }
    else if (ledge.body.touching.left) {
      ledge.body.velocity.x = -100;
    }
    else if (ledge.body.touching.right) {
      ledge.body.velocity.x = 100;
    }
  }
  else if (pushBoolean) {
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = 100;
    }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = -100;
    }
    else if (ledge.body.touching.left) {
      ledge.body.velocity.x = 100;
    }
    else if (ledge.body.touching.right) {
      ledge.body.velocity.x = -100;
    }
  }
  else if (stopBoolean) {
    ledge.body.stop();
  }
  weapon.kill();
}

function weaponDownLedge(weapon, ledge) {
  if (pullBoolean) {
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = -100;
    }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = 100;
    }
    else if (ledge.body.touching.left) {
      ledge.body.velocity.x = -100;
    }
    else if (ledge.body.touching.right) {
      ledge.body.velocity.x = 100;
    }
  }
  else if (pushBoolean) {
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = 100;
    }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = -100;
    }
    else if (ledge.body.touching.left) {
      ledge.body.velocity.x = 100;
    }
    else if (ledge.body.touching.right) {
      ledge.body.velocity.x = -100;
    }
  }
  else if (stopBoolean) {
    ledge.body.stop();
  }
  weapon.kill();
}

function weaponSideLedge(weapon, ledge) {
  // ledge.body.stop();
  if (pullBoolean) {
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = -100;
    }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = 100;
    }
    else if (ledge.body.touching.left) {
      ledge.body.velocity.x = -100;
    }
    else if (ledge.body.touching.right) {
      ledge.body.velocity.x = 100;
    }
  }
  else if (pushBoolean) {
    if (ledge.body.touching.up) {
      ledge.body.velocity.y = 100;
    }
    else if (ledge.body.touching.down) {
      ledge.body.velocity.y = -100;
    }
    else if (ledge.body.touching.left) {
      ledge.body.velocity.x = 100;
    }
    else if (ledge.body.touching.right) {
      ledge.body.velocity.x = -100;
    }
  }
  else if (stopBoolean) {
    ledge.body.stop();
  }
  weapon.kill();
}

function weaponEnemy(weapon, enemy) {
  // enemy.body.stop();
  if (pullBoolean) {
    if (enemy.body.touching.up) {
      enemy.body.velocity.y = -100;
    }
    else if (enemy.body.touching.down) {
      enemy.body.velocity.y = 100;
    }
    else if (enemy.body.touching.left) {
      enemy.body.velocity.x = -100;
    }
    else if (enemy.body.touching.right) {
      enemy.body.velocity.x = 100;
    }
  }
  else if (pushBoolean) {
    if (enemy.body.touching.up) {
      enemy.body.velocity.y = 100;
    }
    else if (enemy.body.touching.down) {
      enemy.body.velocity.y = -100;
    }
    else if (enemy.body.touching.left) {
      enemy.body.velocity.x = 100;
    }
    else if (enemy.body.touching.right) {
      enemy.body.velocity.x = -100;
    }
  }
  else if (stopBoolean) {
    enemy.body.stop();
  }
  weapon.kill();
}

/////////////////////////Undeniable Boundary Mechanics///////////////////////
//Prevent Sprites from Just Staying at the Bottom

function boundaryCollisionCheck(boundary, collision) {
  if (collision.body.touching.up) {
    collision.body.velocity.y = 100;
  }
  if (collision.body.touching.down) {
    collision.body.velocity.y = -100;
  }
  if (collision.body.touching.left) {
    collision.body.velocity.x = 100;
  }
  if (collision.body.touching.right) {
    collision.body.velocity.x = -100;
  }
}
///////////////////////////////////////Reference Code/////////////////////////////
/*
// var xBlockSize = 400;
            // var yBlockSize = 400;
            // var xRectangle = 500;
            // var yRectangle = 500;
            // for (var x = 0; x < 4; x++) {
            //     for (var y = 0; y < 4; y++) {
            //         ////////Creation of Rectangle////////////

            //         // var rect = new Phaser.Rectangle(x * xBlockSize, (y * yBlockSize) + 600, xBlockSize, yBlockSize);
            //         var rect = new Phaser.Rectangle(x * xRectangle, y * yRectangle, xBlockSize, yBlockSize);
            //         var xOfSprite = rect.x
            //         var yOfSprite = rect.y
            //         // console.log(rect);
            //         // this.testingArray.push(rect);
            //         // this.text = this.game.add.text(rect.x + 100, rect.y + 100, "Rectangle " + x + y, { font: "32px Arial", fill: "#ffffff", align: "center" });
            //         // console.log("Rectangle " + x + y);
            //         ////////////Random Array to Scramble Positions//////////
            //         // var positionArray = [topCenter, topLeft, topRight, center, centerLeft, centerRight, bottomCenter, bottomLeft, bottomRight];
            //         if (x === 0 && y === 0) {
            //             this.baseCamp(xOfSprite, yOfSprite, rect, bottomCenter, bottomLeft, bottomRight, centerLeft, centerRight);
            //         }
            //         else {
            //             var positionArray = [];
            //             var randomGeneratorForArray = this.game.rnd.integerInRange(0, 100);
            //             if (randomGeneratorForArray >= 0 && randomGeneratorForArray <= 25) {
            //                 // positionArray.push(topCenter);
            //                 // positionArray.push(bottomLeft);
            //                 // positionArray.push(centerRight);
            //                 // positionArray.push(topLeft);
            //                 // positionArray.push(topLeft);
            //                 positionArray.push(center);
            //                 positionArray.push(bottomRight);
            //                 positionArray.push(bottomLeft);
            //                 positionArray.push(topRight);
            //                 // console.log("Formation1");
            //             }
            //             else if (randomGeneratorForArray >= 26 && randomGeneratorForArray <= 50) {
            //                 positionArray.push(topRight);
            //                 positionArray.push(center);
            //                 positionArray.push(bottomLeft);
            //                 // positionArray.push(bottomRight);
            //                 positionArray.push(bottomCenter);
            //                 // console.log("Formation2");
            //             }
            //             else if (randomGeneratorForArray >= 51 && randomGeneratorForArray <= 75) {
            //                 positionArray.push(topRight);
            //                 positionArray.push(topLeft);
            //                 positionArray.push(bottomRight);
            //                 // positionArray.push(centerLeft);
            //                 positionArray.push(bottomLeft);
            //                 // console.log("Formation3");
            //             }
            //             else if (randomGeneratorForArray >= 76 && randomGeneratorForArray <= 100) {
            //                 positionArray.push(centerLeft);
            //                 // positionArray.push(bottomCenter);
            //                 positionArray.push(centerRight);
            //                 positionArray.push(bottomRight);
            //                 positionArray.push(topLeft);
            //                 // console.log("Formation4");
            //             }

            //             // console.log(positionArray);
            //             //////Sprites//////
            //             for (var i = 0; i < 4; i++) {
            //                 this.gridSystem(xOfSprite, yOfSprite, rect, positionArray[i]);
            //                 // console.log("---------------------------------------------------");
            //             }
            //         }
            //     }
            // }

            this.testingArray = [];
        this.testingArray.push(rect);
        this.text = this.game.add.text(rect.x + 100, rect.y + 100, "Rectangle " + x + y, { font: "32px Arial", fill: "#ffffff", align: "center" });

        /////////////////////////////God Mode/////////////////////////////////////

        // ////////Player Standing Still//////////////
        // this.player.body.velocity.y = 0;
        // this.player.body.velocity.x = 0;

        // if (this.cursors.left.isDown) {
        //     this.player.body.velocity.x = -400;
        //     this.player.animations.play('left');
        // }
        // else if (this.cursors.right.isDown) {
        //     this.player.body.velocity.x = 400;
        //     this.player.animations.play('right');
        // }
        // if (this.cursors.up.isDown) {
        //     this.player.frame = 10;
        //     this.player.body.velocity.y = -650;
        // }
        // else if (this.cursors.down.isDown) {
        //     this.player.frame = 10;
        //     this.player.body.velocity.y = 650;
        // }

        ///////////Alpha Build One///////////
        // var xBlockSize = 280;
        // // var yBlockSize = 450;
        // var yBlockSize = 375;

        // //6
        // //5850
        // for (var x = 0; x < 20; x++) {
        //     for (var y = 0; y < 16; y++) {
        //         var xRandom = this.game.rnd.realInRange((x * xBlockSize) + 1, (x + 1) * xBlockSize);
        //         var yRandom = this.game.rnd.realInRange((y * yBlockSize) + 1, (y + 1) * yBlockSize);
        //         this.gridSystem(xRandom, yRandom);
        //         // console.log(x + ' ' + y + ' ' + xRandom + ' ' + yRandom);
        //     }
        // }

*/