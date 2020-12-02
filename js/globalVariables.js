//////////////////////////////////////////////////Global Variables//////////////////////////////////////////////
//Weapon Variables to Change Bullet Type
var weapon1Boolean = false;
var weapon2Boolean = false;
var weapon3Boolean = false;
var weapon4Boolean = false;

//Respawn Holder (The Level You Will Respawn In)
var respawnHolder = {
  indexOfCurrentWorld: 1,
  indexOfPlayerPosition: 0,
}

//Toggling Camera
var cameraBoolean = true;

//Engage Coordinate system
var coordinateSystem = true;
// var coordinateSystem = false;

// Global Timer
var total = 0;

//BMD Text (Toggle On or Off)
// var bitmapBoolean = true;
var bitmapBoolean = false;
//BMD Font
var fontGrind = 'fontGrind';

//Slow Motion
var slowMotionLimit;
var timerEvents;

// Total Deaths
var deaths = 0;

////////////////////////////////////////////Text Function////////////////////////////////////
//Display Word By Word
function lineText(displayText) {
  ////////The Actual Text////////////
  var content = displayText.content;
  //Creating the Array Splitter
  var line = [];
  var wordIndex = 0;
  var lineIndex = 0;

  var wordDelay = displayText.wordDelay;
  var lineDelay = displayText.lineDelay;

  //The Text
  var text = this.game.add.text(displayText.x, displayText.y, '');
  text.font = displayText.font;
  text.fontSize = displayText.fontSize;
  text.fill = displayText.fill;

  //////Inner Functions Declared///////
  //Line By Line
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
    this.game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

  }

  //Word By Word
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
      this.game.time.events.add(lineDelay, nextLine, this);
    }

  }

  //Magic Happening!
  nextLine();
}

