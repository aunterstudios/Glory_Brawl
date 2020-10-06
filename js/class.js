////////////////////////////////////////////Class Declarations/////////////////////////////////////////////////////
//Creates Each Individual Level
class LevelCreator {
    constructor(worldName, xOfWorld, yOfWorld, metroidvania, backgroundColor) {
      this.worldName = worldName;
      this.xOfWorld = xOfWorld;
      this.yOfWorld = yOfWorld;
      this.metroidvania = metroidvania;
      this.backgroundColor = backgroundColor;
    }
  };
  
  ///Creates Room Switching
  class MetroidvaniaCreator {
    constructor(roomUpIndex, roomUpValue, roomDownIndex, roomDownValue, roomLeftIndex, roomLeftValue, roomRightIndex, roomRightValue) {
      this.roomUpIndex = roomUpIndex;
      this.roomUpValue = roomUpValue
      this.roomDownIndex = roomDownIndex;
      this.roomDownValue = roomDownValue;
      this.roomLeftIndex = roomLeftIndex;
      this.roomLeftValue = roomLeftValue;
      this.roomRightIndex = roomRightIndex;
      this.roomRightValue = roomRightValue;
    }
  };
  
  //Creates Player Positioning (Up, Down, Left Right);
  class PlayerPositionCreator {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  };
  
  //Creates World Gravity Object
  class worldGravityCreator {
    constructor(gravityX, gravityY) {
      this.gravityX = gravityX;
      this.gravityY = gravityY;
    }
  };
  
  ///Generate Shadow Levels
  class shadowLevelGenerator {
    constructor(page, levelSwitchArray) {
      this.page = page; //Denotes the Story Page
      this.levelSwitchArray = levelSwitchArray; //Array that Switches Any number of Levels (Room Stays the same but becomes completely different)
    }
  }
  class shadowLevelArray {
    constructor(oldLevel, shadowLevel) {
      this.oldLevel = oldLevel; //The Level That's Going To Be Changed
      this.shadowLevel = shadowLevel; //The New Level that takes place
    }
  }
  
  //Generates Nen or Physics of the Individual Player
  class nenCreator {
    constructor(playerSpeed, playerJump, playerGravityX, playerGravityY, playerDoubleJumps, playerWallJumpX, playerWallJumpY, playerStickiness, playerSlippery, playerDownwards, overlapBias) {
      this.playerSpeed = playerSpeed; //Speed of Player
      this.playerJump = playerJump; //Jump of Player
      this.playerGravityX = playerGravityX; //Personal Gravity X-Axis
      this.playerGravityY = playerGravityY; //Personal Gravity Y-Axis
      this.playerDoubleJumps = playerDoubleJumps; //Amount of Double Jumps
      this.playerWallJumpX = playerWallJumpX; //Jumping From Side of Wall-SideWays Distance
      this.playerWallJumpY = playerWallJumpY; //Jumping From Side of Wall-Vertical Distance
      this.playerStickiness = playerStickiness; //Stick Force Applied to Different Objects
      this.playerSlippery = playerSlippery; //Player Sliding Down From Side of walls
      this.playerDownwards = playerDownwards; //Player Moving Downwards
      //////////////////////World Attributes/////////////////
      this.overlapBias = overlapBias;
    }
  };
  
  //Generates Group Array Within Spawn
  class groupArrayCreator {
    constructor(groupSprite, groupCategory) {
      this.groupSprite = groupSprite;
      this.groupCategory = groupCategory;
    }
  }
  
  //Generates Sprite Placement (Physics)
  class SpriteCreator {
    constructor(trigger, spriteType, generationType, art, x, y, widthX, widthY, scale, velocityX, velocityY, gravityX, gravityY, specialCondition, time) {
      this.trigger = trigger;
      this.spriteType = spriteType;
      this.generationType = generationType;
      this.art = art;
      this.x = x;
      this.y = y;
      this.widthX = widthX;
      this.widthY = widthY;
      this.scale = scale;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.gravityX = gravityX;
      this.gravityY = gravityY;
      this.specialCondition = specialCondition;
      this.time = time;
    }
  };
  
  //Creates Special Conditions (scalable)
  class specialConditionCreator {
    constructor(name) {
      this.name = name;
    }
  };
  
  //Create Timer Class
  class timerCreator {
    constructor(timerType, repeatAmount, seconds) {
      {
        this.timerType = timerType;
        this.repeatAmount = repeatAmount;
        this.seconds = seconds;
      }
    }
  }
  
  //The individual properties of each sprite. 
  class spriteType {
    constructor(groupNumber, name, tint, mass, anchor, immovable, maxVelocity, bounce) {
      this.groupNumber = groupNumber;
      this.name = name;
      this.tint = tint;
      this.mass = mass;
      this.anchor = anchor;
      this.immovable = immovable;
      this.maxVelocity = maxVelocity;
      this.bounce = bounce;
    }
  };
  
  //Individual Properties of Weapon
  class weaponCreator {
    constructor(name, tint, weaponFireRate, weaponBulletSpeed, powerOne) {
      this.name = name;
      this.tint = tint;
      this.weaponFireRate = weaponFireRate;
      this.weaponBulletSpeed = weaponBulletSpeed;
      this.powerOne = powerOne;
    }
  };
  
  //Creating Images
  class imageCreator {
    constructor(trigger, name, art, x, y, scale) {
      this.trigger = trigger;
      this.name = name;
      this.art = art;
      this.x = x;
      this.y = y;
      this.scale = scale;
    }
  };
  
  //////////////////Flag Specific Classes/////////
  class flagCreator {
    constructor(indexOfPlayerPosition, trigger, name, art, x, y, velocityX, velocityY, sizeX, sizeY, gravityX, gravityY, specialHandler) {
      this.indexOfPlayerPosition = indexOfPlayerPosition;
      this.trigger = trigger;
      this.name = name;
      this.art = art;
      this.x = x;
      this.y = y;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.gravityX = gravityX;
      this.gravityY = gravityY;
      this.specialHandler = specialHandler;
    }
  };
  
  //Creating Bitmap Text Class
  class textCreator {
    constructor(trigger, x, y, textInput, font, fontSize) {
      this.trigger = trigger;
      this.x = x;
      this.y = y;
      this.textInput = textInput;
      this.font = font;
      this.fontSize = fontSize;
    }
  };