//////////////////////////Special Conditions///////////////////////
var scLocalizedDestruction = new specialConditionCreator('localizedDestruction'); //Destroys Local Sprite Permanently
var scKillAll = new specialConditionCreator('killAll'); //Kill All Sprites to Advance to Next Level
var scCollect = new specialConditionCreator('collect'); //Collect All Sprites to Advance to Next Level
var scNoPhysics = new specialConditionCreator('noPhysics'); //Disables Physics of Sprite (Essesntially Just Becomes an Image)
var scFallingSpikes = new specialConditionCreator("fallingSpikes");