var game = new Phaser.Game(1400, 800, Phaser.CANVAS);

//////////////////////////////////////////////////Game States//////////////////////////////////////////////
game.state.add('mainMenu', brawl.state1);
game.state.add('deathState', brawl.state2);
game.state.add('rogueTest', brawl.state12);
game.state.add('controlScreen', brawl.stateControls);
//////////////////////////////////////////////////Starting States//////////////////////////////////////////////
game.state.start('mainMenu');
// game.state.start('controlScreen');
//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////

//Death Total in Game
var deaths = 0;

//Total Streak
var streak = 0;
var longestStreak = 0;

//////////////////////////////////////////////////Main Menu Story//////////////////////////////////////////////
var content = [
  "Rogue Version-FixGreenLedges",
  "You are a Prisoner of God.",
  "Given a sentence to experience eternal death and revival.",
  "To compete in an ever changing obstacle course game show.",
  "One designed to break you.",
  "Nor to be fair.",
  "It's not supposed to be fun.",
  "But remember.",
  "This is for the entertainment and subjugation of the masses.",
  "Welcome to Glory Brawl.",
  "Survive 1000 rounds in a row without dying.",
  "Arrow Keys to Move (Downward Key Pushes Your Velocity Down)."
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
///////////////////////////////////////////Function Mechanics////////////////////////////////////////////

//Ledge Mechanics


function ledgeUp(player, ledge) {
  //When You're On Top of the Ledge
  if (ledge.body.touching.up) {
    ledge.body.velocity.y = -200;
    player.body.velocity.y = -200;
    if (player.body.velocity.x > 0) {
      ledge.body.velocity.x = player.body.velocity.x - 100;
    }
    else if (player.body.velocity.x < 0) {
      ledge.body.velocity.x = player.body.velocity.x + 100;
    }
    else {
      ledge.body.velocity.x = 0;
    }
  }
  // When You're Hitting the Edge from the Sides (Right and Left)
  else if (ledge.body.touching.left || ledge.body.touching.right) {
    ledge.body.velocity.y = 0;
    ledge.body.velocity.x = player.body.velocity.x;
  }
  // else if (ledge.body.touching.down && player.body.velocity.y < -1) {
  //   player.body.velocity.y = -100;
  // }
  else if (ledge.body.touching.down) {
    ledge.body.velocity.y = -100;
    player.body.velocity.y = -10;
  }
}

//////////////ledgeFunctionChange
// function ledgeDownS(player, ledge) {
//   //When You're On Top of the Ledge
//   if (ledge.body.touching.up) {
//     ledge.body.velocity.y = -200;
//     player.body.velocity.y = -700;
//     if (player.body.velocity.x > 0) {
//       ledge.body.velocity.x = player.body.velocity.x - 100;
//     }
//     else if (player.body.velocity.x < 0) {
//       ledge.body.velocity.x = player.body.velocity.x + 100;
//     }
//     else {
//       ledge.body.velocity.x = 0;
//     }
//   }
//   // When You're Hitting the Edge from the Sides (Right and Left)
//   else if (ledge.body.touching.left || ledge.body.touching.right) {
//     ledge.body.velocity.y = 0;
//     ledge.body.velocity.x = player.body.velocity.x;
//   }
//   // else if (ledge.body.touching.down && player.body.velocity.y < -1) {
//   //   ledge.body.velocity.x = 0;
//   // }
//   // else if (ledge.body.touching.down) {
//   //   ledge.body.velocity.y = -75;
//   // }
//   // else if (ledge.body.touching.down) {
//   //   ledge.body.stop();
//   //   player.body.velocity.y = -2000;
//   // }
//   else if (ledge.body.touching.down) {
//     ledge.body.velocity.y = -50;
//     player.body.velocity.y = -100;
//   }
// }

function ledgeDownS(player, ledge) {
  //When You're On Top of the Ledge
  if (ledge.body.touching.up || player.body.touching.down) {
    player.body.velocity.y = -1200;
  }
}

function ledgeSideX(player, ledge) {
  if (ledge.body.velocity.x > 0) {
    ledge.body.velocity.x = 800;
  }
  else if (ledge.body.velocity.x < 0) {
    ledge.body.velocity.x = -800;
  }
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

function enemyLedgeSprite(enemy, ledge) {
  if (ledge.body.touching.up) {
    enemy.body.stop();
    enemy.body.velocity.y = -125;
    ledge.body.velocity.y = 200;
  }
  else if (ledge.body.touching.down) {
    enemy.body.stop();
    enemy.body.velocity.y = 125;
    ledge.body.velocity.y = -200;
  }
  else if (ledge.body.touching.left) {
    enemy.body.stop();
    enemy.body.velocity.x = -125;
    ledge.body.velocity.x = 200;
  }
  else if (ledge.body.touching.right) {
    enemy.body.stop();
    enemy.body.velocity.x = 125;
    ledge.body.velocity.x = -200;
  }
}

//Preventing Physics Bugs
function preventPhysicsBug(ledge, spike) {
  if (ledge.body.touching.down) {
    ledge.body.velocity.y = -1000;
  }
}

//Ball Mechanics

function ballMover(player, ball) {
  // ball.body.stop();
  if (ball.body.touching.down) {
    ball.body.velocity.y = -100;
  }
  else if (ball.body.touching.up) {
    ball.body.velocity.y = 100;
  }
  else if (ball.body.touching.right) {
    ball.body.velocity.x = -100;
  }
  else if (ball.body.touching.left) {
    ball.body.velocity.x = 100;
  }
}




