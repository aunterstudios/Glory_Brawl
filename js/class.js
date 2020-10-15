////////////////////////////////////////////Class Declarations/////////////////////////////////////////////////////
//Creates Each Individual Level
class LevelCreator {
  constructor(worldName, xOfWorld, yOfWorld, backgroundColor, outOfBounds, playerScale, nenSystem, gunSystem, sideStick, upsideDownStick,) {
    this.worldName = worldName;
    this.xOfWorld = xOfWorld;
    this.yOfWorld = yOfWorld;
    this.backgroundColor = backgroundColor;
    this.outOfBounds = outOfBounds;
    this.playerScale = playerScale;
    this.nenSystem = nenSystem;
    this.gunSystem = gunSystem;
    this.sideStick = sideStick;
    this.upsideDownStick = upsideDownStick;
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

///////////////////////////////////////////////////Sprite and Weapon Generation//////////////////////////////////////////////////
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

//////////////////////////////////////////////////Special Condition Creators for Sprites//////////////////////////////////////////////
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

/////////////////////////////////////////////Flag Specific Classes//////////////////////////////////////////
class flagCreator {
  constructor(indexOfPlayerPosition, trigger, spriteType, art, scale, x, y, velocityX, velocityY, gravityX, gravityY, specialHandler) {
    this.indexOfPlayerPosition = indexOfPlayerPosition;
    this.trigger = trigger;
    this.spriteType = spriteType;
    this.art = art;
    this.scale = scale;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.specialHandler = specialHandler;
  }
};

///Generate Shadow Levels (Levels that Completely Change Rooms)
class shadowLevelGenerator {
  constructor(page, levelSwitchArray) {
    this.name = 'shadowLevel';
    this.page = page; //Denotes the Story Page
    this.levelSwitchArray = levelSwitchArray; //Array that Switches Any number of Levels (Room Index Order Stays the same but becomes completely different)
  }
}

class shadowLevelArray {
  constructor(oldLevel, shadowLevel) {
    this.oldLevel = oldLevel; //The Level That's Going To Be Changed
    this.shadowLevel = shadowLevel; //The New Level that takes place
  }
}

//Switches on and off sprites in a level
class spriteLevelSwitch {
  constructor(page, insertIndex, insertSprite, removeIndex, removeSprite) {
    this.name = 'spriteLevelSwitch';
    this.page = page;
    this.insertIndex = insertIndex;
    this.insertSprite = insertSprite;
    this.removeIndex = removeIndex;
    this.removeSprite = removeSprite;
  }
}


////////////////////////////////////////////////Text and Images//////////////////////////////////////////////////////
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
