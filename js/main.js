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

////////////////////////////////////////Procedural Generation////////////////////////////////////////////////////////
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
  //Level 0
  {
    worldName: "Level 0",
    gameMode: ["flag", "coin"],
    ////////////World Size
    xOfWorld: 1400,
    yOfWorld: 800,
    ///////////Sprite Positioning
    //Where the Player Spawns Due to Switching Rooms
    playerPosition:
      //Up, Down, Left, Right (Remember!)
      [
        { upPosition: true, x: 200, y: 20 },
        { downPosition: true, x: 700, y: 500 },
        { leftPosition: true, x: 200, y: 400 },
        { rightPosition: true, x: 1400, y: 400 }
      ],
    //Deals with Room Switching
    metroidvania:
    //Up, Down, Left, Right (Remember!)
    {
      //Up Values
      roomUpIndex: 0,
      roomUpValue: 0,
      //Down Values
      roomDownIndex: 0,
      roomDownValue: 800,
      //Left Values
      roomLeftIndex: 0,
      roomLeftValue: 1,
      //Right Values
      roomRightIndex: 0,
      roomRightValue: 1400
    },
    doorSpawn: 
      [true,
        {x: 500, y: 500, teleportationX: 100, teleporationY: 50}
      ],
    undeniableDeathSpawn:
      [true,
        { x: 0, y: 800 }
      ],
    immovableWallSpawn:
      [true,
        { x: 0, y: 200, velocityX: 0, velocityY: 0, size: .5, art: "immovableRotatedWall" },
        // { x: 600, y: 400, velocityX: 500, velocityY: 0, size: .5, art: "immovableVerticalWall" },
      ],
    wallSpawn:
      [true,
        { x: 200, y: 400, velocityX: 300, velocityY: 0, size: .5, art: "rotatedWall" },
      ],
    spikeSpawn:
      [true,
        { x: 700, y: 475, velocityX: 700, velocityY: 0, size: .5, art: "spikes" },
        { x: 700, y: 900, velocityX: 0, velocityY: 0, size: 1, art: "spikes" },
      ],
    ledgeGreySpawn:
      [true,
        //First Item!!
        { x: 1000, y: 200, velocityX: 0, velocityY: 0 },
      ],
    ledgeGreenSpawn:
      [true,
        { x: 800, y: 200, velocityX: 0, velocityY: 0 },
      ],
    ledgeBlueSpawn:
      [true,
        { x: 600, y: 200, velocityX: 0, velocityY: 0 },
      ],
    enemySpawn:
      [true,
        { x: 1200, y: 100, velocityX: 0, velocityY: 0 },
      ],
    ballSpawn:
      [true,
        { x: 1300, y: 50, velocityX: 0, velocityY: 0 },
      ],
    //Check Point
    flagSpawn: { trigger: true, x: 0, y: 550, velocityX: 400, velocityY: 0 } //Will Need to Attach a Boolean Here to Trigger


    //Any Other Property Here Are Unditional Objects
    //Falling or Sideways Spikes
    //Super Ball
    //World Gravity
    //Traps that create generating enemies
  }
]

//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "MetroidVania-Rogue Version: 03, TELEPORTATION DOORS",
  "Glory Brawl."
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
  wall.body.stop();
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
  // if (player.body.touching.left) {
  //   player.body.velocity.x = -100;
  //   player.body.velocity.y = 100;
  // }
  // else if (player.body.touching.right) {
  //   player.body.velocity.x = 100;
  //   player.body.velocity.y = 100;
  // }
  // // if (wall.body.touching.down && player.body.velocity.y < -1) {
  // //   player.body.velocity.y = -100;
  // // }
  // else if (wall.body.touching.down) {
  //   wall.body.velocity.y = -300;
  //   player.body.velocity.y = -100;
  // }
  // console.log(player.animations.play('left'));
}
////////////////////////////////////Immovable Wall/////////////////////////////


////////////////////////////////////Player Ledge Mechanics//////////////////////////////////////
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

/////////////////////////////////////////Other Objects vs. Other Objects/////////////////////////////////////////////



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
function weaponHandler(weapon, sprite) {
  // sprite.body.stop();
  if (pullBoolean) {
    ////////////////////////////////First Attempt////////////////////////
    // console.log("sprite Angle: " + sprite.body.angle);
    // console.log("Weapon Angle: " + weapon.body.angle);
    // sprite.body.velocity.setTo((weapon.x - sprite.x) * 4, (weapon.y - sprite.y) * 4)
    ////////////////////////////////Second Attempt But Figured Something Out///////////////////////
    // game.physics.arcade.moveToXY(sprite, weapon.x, weapon.y, 50, 1000);
    // console.log("WY: " + sprite.body.velocity.y + " WX: " + sprite.body.velocity.x);
    // console.log("PlayerX: " + this.player.x + " PLayerY: " + this.player.y);
    //////////////////////////////What I'm going to go with?/////////////////
    // if (sprite.body.touching.up) {
    //   sprite.body.velocity.y = -50
    // }
    // else if (sprite.body.touching.down) {
    //   sprite.body.velocity.y = 50;
    // }
    // else if (sprite.body.touching.left) {
    //   sprite.body.velocity.x = -50;
    // }
    // else if (sprite.body.touching.right) {
    //   sprite.body.velocity.x = 50;
    // }
    // this.game.physics.arcade.computeVelocity(0, sprite.body, 40, 50, 100, 500);
    ///////////////////////////////Fourth Attempt//////////////////////////////////
    // game.physics.arcade.velocityFromAngle(weapon.angle, 300, sprite.velocity);
    // sprite.body.velocityFromAngle(weapon.body.angle,100);
    // this.sprite.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
    this.game.physics.arcade.moveToObject(sprite, this.player, 200);
  }
  else if (pushBoolean) {
    // sprite.body.immovable = false;
    sprite.body.stop();
  }
  else if (stopBoolean) {
    // sprite.body.immovable = true;
    // sprite.body.stop();
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
  }
  weapon.kill();
}

////////////////////Refactor this later/////////////////////////////
function weaponHandlerForFlag(sprite, weapon) {
  // sprite.body.stop();
  if (pullBoolean) {
    ////////////////////////////////First Attempt////////////////////////
    // console.log("sprite Angle: " + sprite.body.angle);
    // console.log("Weapon Angle: " + weapon.body.angle);
    // sprite.body.velocity.setTo((weapon.x - sprite.x) * 4, (weapon.y - sprite.y) * 4)
    ////////////////////////////////Second Attempt But Figured Something Out///////////////////////
    // game.physics.arcade.moveToXY(sprite, weapon.x, weapon.y, 50, 1000);
    // console.log("WY: " + sprite.body.velocity.y + " WX: " + sprite.body.velocity.x);
    // console.log("PlayerX: " + this.player.x + " PLayerY: " + this.player.y);
    //////////////////////////////What I'm going to go with?/////////////////
    // if (sprite.body.touching.up) {
    //   sprite.body.velocity.y = -50
    // }
    // else if (sprite.body.touching.down) {
    //   sprite.body.velocity.y = 50;
    // }
    // else if (sprite.body.touching.left) {
    //   sprite.body.velocity.x = -50;
    // }
    // else if (sprite.body.touching.right) {
    //   sprite.body.velocity.x = 50;
    // }
    // this.game.physics.arcade.computeVelocity(0, sprite.body, 40, 50, 100, 500);
    ///////////////////////////////Fourth Attempt//////////////////////////////////
    // game.physics.arcade.velocityFromAngle(weapon.angle, 300, sprite.velocity);
    // sprite.body.velocityFromAngle(weapon.body.angle,100);
    // this.sprite.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 200);
    this.game.physics.arcade.moveToObject(sprite, this.player, 200);
  }
  else if (pushBoolean) {
    // sprite.body.immovable = false;
    sprite.body.stop();
  }
  else if (stopBoolean) {
    // sprite.body.immovable = true;
    // sprite.body.stop();
    sprite.kill();
    //Refactor
    // console.log("it hit? Flag");
    if (streak > longestStreak) {
      longestStreak = streak;
    }
    streak = 0;
    game.state.start('deathState');
  }
  weapon.kill();
}

//Test Function

function testFunctionX(sprite1, sprite2) {
  // if (sprite2.key === "wall" || "rotatedWall" || "brownPlatform") {
  //   console.log(sprite2.body.velocity.x + " X Velocity ");
  //   if (sprite2.body.touching.up) {
  //     sprite2.body.velocity.y = 100;
  //     console.log("up");
  //   }
  //   if (sprite2.body.touching.down) {
  //     sprite2.body.velocity.y = -100;
  //     console.log("down");
  //   }
  //   if (sprite2.body.touching.left) {
  //     sprite2.body.velocity.x = 100;
  //     console.log("left");
  //   }
  //   if (sprite2.body.touching.right) {
  //     sprite2.body.velocity.x = -100;
  //     console.log("right");
  //   }
  //   // sprite2.body.immovable = false;
  // }
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

///////////////////////////////////////Preventing PHysics Bugs//////////////////////////
//Preventing Physics Bugs
function preventPhysicsBug(sprite1, sprite2) {
  if (sprite1.body.touching.down) {
    sprite1.body.velocity.y = -1000;
  }
}

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