/////////////////////////List of GROUP NAMES of Each Sprite (For Different Special Properties)////////////////
//Death Group
var groupDeath = 'groupDeath';
var groupDeathMove = 'groupDeathMove';
//Immovable Walls
var groupGround = 'groupGround';
var groupGroundMove = 'groupGroundMove';
//Moveable Walls
var groupWall = 'groupWall';
//Ledge
var groupLedge = 'groupLedge';
//Enemy
var groupEnemy = 'groupEnemy';
//Ball
var groupBall = 'groupBall';
//Hazama
var groupHazama = 'groupHazama';
//Falling Spikes
var groupFallingSpikes = 'groupFallingSpikes';
//Invisible Obstacles
var groupInvisible = 'groupInvisible'
//Flag
var groupFlag = 'groupFlag';
var groupFlagPhysics = 'groupFlagPhysics';
//Coin
var groupCollect = 'groupCollect';
var groupCollectPhysics = 'groupCollectPhysics';

/////////////////////////Global Tints//////////////////////////
var tintWallPlayerFrozen = 0x00ffff; //Frozen Wall Tints
/////////////////////////List of Names of Each Sprite (For Different Special Properties)////////////////
//Death Names
var deathRegular = new spriteType(0, 'deathRegular', Phaser.Color.RED, 100, 0, true, 1000, 1); //No Special Properties
var deathBallKill = new spriteType(0, 'deathBallKill', Phaser.Color.RED, 100, 0, true, 1000, 1); //Killable By Ball
var deathGhost = new spriteType(0, 'deathGhost', Phaser.Color.RED, 100, 0, true, 1000, 1); //Weapon Phases
var deathKillWall = new spriteType(0, 'deathKillWall', Phaser.Color.RED, 100, 0, true, 1000, 1); //Kills Moveable OBjects
//Moveable Death Names
var deathRegularMove = new spriteType(10, 'deathRegularMov', Phaser.Color.RED, 100, 0, false, 1000, 1); //This one is Moving
var deathBallKillMove = new spriteType(10, 'deathBallKillMove', Phaser.Color.RED, 100, 0, false, 1000, 1); //Killable By Ball (Moving)

//Ground
var groundRegular = new spriteType(1, 'groundRegular', Phaser.Color.GRAY, 100, 0, true, 1000, 1); //No Special Properties
var groundKillWall = new spriteType(1, 'groundKillWall', Phaser.Color.getRandomColor(10), 100, 0, true, 1000, 1); //Kills Moveable Objects
var groundPhase = new spriteType(1, 'groundPhase', 12758247.409111453, 100, 0, true, 1000, 1); //Killed By Enemy BULLETS
var groundActivation = new spriteType(1, 'groundActivation', 0xffff00, 100, 0, true, 1000, 1); //Triggers Movement in a Wall
var groundOneWayObject = new spriteType(1, 'groundOneWayObject', 2499878.036284214, 100, 0, true, 1000, 1); //One Way (Objects Only)
var groundSlippery = new spriteType(1, 'groundSlippery', Phaser.Color.YELLOW, 100, 0, true, 1000, 1); //Makes you SLIPPERY!
var groundOneWayPlayerBlockLeft = new spriteType(1, 'groundOneWayPlayerBlockLeft', 3588771.242333334, 100, 0, true, 1000, 1); //One way player only from the left
var groundOneWayPlayerBlockDown = new spriteType(1, 'groundOneWayPlayerBlockDown', Phaser.Color.getRandomColor(10), 100, 0, true, 1000, 1); //One way player only from the Bottom
var groundOneWayKillObject = new spriteType(1, 'groundOneWayKillObject', 241917.63554178402, 100, 0, true, 1000, 1); //One Way for Player But Kills Object
var groundFirePunch = new spriteType(1, 'groundFirePunch', Phaser.Color.RED, 100, 0, true, 1000, 1); //Have to Punch to break it! Or Else it Kills You
//Moveable Ground
var groundRegularMove = new spriteType(11, 'groundRegularMove', Phaser.Color.GRAY, 100, 0, false, 1000, 1); //No Special Properties
//PowerUps (Coded In As Ground)
var powerJump = new spriteType(12, 'powerJump', Phaser.Color.getRandomColor(10), 1, 0, true, 1000, 1); //JUMP HIGH
var powerWorldGravity = new spriteType(12, 'powerWorldGravity', Phaser.Color.getRandomColor(10), 1, 0, true, 1000, 1); //Triggers World Gravity
var powerNegativeGravity = new spriteType(12, 'powerNegativeGravity', Phaser.Color.getRandomColor(10), 1, 0, true, 1000, 1); //Triggers Anti World Gravity
//Coin (Coded In as Ground)
var coinDefault = new spriteType(12, 'coinDefault', Phaser.Color.getRandomColor(10), 1, 0, true, 1000, 1); //Collect Coin

//Moveable Wall Names
var wallRegular = new spriteType(2, 'wallRegular', Phaser.Color.GRAY, 200, .5, false, 1000, 1); //Default Easy Wall
var wallExplode = new spriteType(2, 'wallExplode', Phaser.Color.ORANGE, 200, .5, false, 1000, 1); //Wall That Explodes When It Hits Ground or Death
var wallGhost = new spriteType(2, 'wallGhost', 16771007.229130682, 200, .5, true, 1000, 1); //Immovable Wall That Let's You Get Through Objects
var wallCloud = new spriteType(2, 'wallCloud', 9583870.358153213, 200, .5, true, 1000, 1); //Moving Platform Cloud
var wallCloudSuper = new spriteType(2, 'wallCloudSuper', Phaser.Color.getRandomColor(0, 50), 200, .5, true, 1000, 1); //Faster Moving Platform Cloud (Cloud Super)
var wallLeftRight = new spriteType(2, 'wallLeftRight', Phaser.Color.getRandomColor(), 200, .5, true, 1000, 1); //Moving platform that moves only left and right (OG)
var wallKiller = new spriteType(2, 'wallKiller', Phaser.Color.RED, 200, .5, false, 1000, 1); //Kill You
var wallMomentum = new spriteType(2, 'wallMomentum', Phaser.Color.GREEN, 200, .5, false, 1000, 1); //Goes Nuts (So much momentum)

//Ledge Names
var ledgeElevator = new spriteType(3, 'ledgeElevator', Phaser.Color.YELLOW, 20, .5, false, 1000, 1);
var ledgeBounce = new spriteType(3, 'ledgeBounce', Phaser.Color.GREEN, 20, .5, false, 1000, 1);
var ledgeSurf = new spriteType(3, 'ledgeSurf', Phaser.Color.AQUA, 20, .5, false, 1000, 1);
var ledgeBounceSide = new spriteType(3, 'ledgeBounceSide', Phaser.Color.GREEN, 20, .5, false, 1000, 1);

//Enemy Names
var enemyShooter = new spriteType(4, 'enemyShooter', 12758247.409111453, 20, .5, false, 1000, 1);
var enemyDaakath = new spriteType(4, 'enemyDaakath', 15269906.933038201, 20, .5, false, 1000, 1);
var enemyAccelerate = new spriteType(4, 'enemyAccelerate', 2885804.4944837275, 20, .5, false, 1000, 1);

//Ball Names
var ballRegular = new spriteType(5, 'ballRegular', Phaser.Color.BLUE, 20, .5, false, 1000, 1);

//Falling Spikes
var fallingSpikesRegular = new spriteType(6, 'fallingSpikesRegular', Phaser.Color.RED, 1, .5, false, 10000, 0);
//Faling Spikes (But to draw from different sprite Pool)
var fallingSpikesRegularTwo = new spriteType(7, 'fallingSpikesRegular', Phaser.Color.RED, 1, .5, false, 10000, 0);

//Hazama
var hazamaFalconia = new spriteType(8, 'hazamaFalconia', Phaser.Color.getRandomColor(10), 1, 0, false, 200, 1); //SUPER JUMPING ABILITY

//Invisible
var invisibleRegular = new spriteType(9, 'invisibleRegular', Phaser.Color.AQUA, 1000, 0, true, 1000, 1); //Invisible Objects (Bounce Ground and Death)
var invisibleTrapIndicator = new spriteType(9, 'invisibleTrapIndicator', Phaser.Color.getRandomColor(100), 1000, .5, true, 1000, 1); //Falling Spikes Indicator

//Flag Names
var flagRegular = new spriteType(0, 'flagRegular', Phaser.Color.getRandomColor(10), 200, 0, false, 1000, 1);
var flagSpecial = new spriteType(1, 'flagShadow', Phaser.Color.AQUA, 200, 0, false, 1000, 1);