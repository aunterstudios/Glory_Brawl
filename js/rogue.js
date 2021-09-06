brawl.game.prototype.rogueGenerator = function () {
    ////////////RNG Generators///////////////
    //Size of World
    var xOfWorld = 1600 * (Math.floor(Math.random() * 6) + 1);
    var yOfWorld = 900 * (Math.floor(Math.random() * 10) + 1);

    //Nen System
    var rogueNen = new nenCreator(
        randomRange(200, 1500), //Speed
        randomRange(-1000, -400), //Jump
        null, //Gravity-X
        randomRange(-500, 1500), //Gravity-Y
        randomRange(2, 10), //Double Jump
        randomRange(200, 2000), //WallJump-X
        randomRange(500, 1000), //wallJump-Y
        randomRange(500, 500), //Stiickiness
        -25, //Wall Slide-Y
        randomRange(200, 400), //Downwards-S
        10, //OverLap Bias
    );

    /////////////Template////////////////
    rogueTemplate = new LevelCreator(
        "RogueWorld", //Name of World
        xOfWorld, //X-Size of World
        yOfWorld,  //Y- Size of World 
        "#FFFDD0", //Background Color
        false, //Out of Bounds Allowed
        1, //PlayerScale
        rogueNen, //Nen-System
        basicGunSet, //Gun-Set
        true, //Sideways Stick to Walls,
        true, //Upsidedown Stick
        1, //X-Camera Lerp
        1, //Y-Camera Lerp
        fontNokia, //World Font Name
    );

    //Test
    // console.log(rogueTemplate, 'Check Rogue Works');

    //Font World Color
    //rogueTemplate.fontWorldColor = Phaser.Color.BLUE;

    //Player Stats Color
    //rogueTemplate.playerStatsColor = Phaser.Color.BLUE;

    //Changing Background Color
    // rogueTemplate.colorChange = new BackgroundColorChange(200, 255, 5);

    //Special Level Initiated
    // rogueTemplate.specialLevel = new TimerLevel('timed', 1, 5, 0, 10);
    // rogueTemplate.specialLevel = new KillAllLevel('killAll', 0, 5, 0, 1);
    //   rogueTemplate.specialLevel = new CollectLevel('collected', 1, 5, 0, 4);

    //Room-Switching
    rogueTemplate.metroidvania = new MetroidvaniaCreator(
        1, //Room-Up-Index
        0, //Room-Down-Index
        0, //Room-Left-Index
        0, //Room-Right-Index
    );

    //World Gravity
    // rogueTemplate.worldGravity = new worldGravityCreator(0, -200);

    //Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
    rogueTemplate.playerPosition = [
        new PlayerPositionCreator(800, 700),
        new PlayerPositionCreator(800, 700),
        new PlayerPositionCreator(800, 700),
        new PlayerPositionCreator(800, 700),
    ];

    // //Object Generation
    // rogueTemplate.spriteSpawn = [
    //     new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1000, 400, 400, 50, 1, 0, 0, 0, 0),
    //     new SpriteCreator(true, wallRegular, 'tile', wallTile50, 1500, 400, 50, 400, 1, 0, 0, 0, 0),
    //     new SpriteCreator(true, groundRegular, 'tile', groundTile, 0, 800, 2800, 50, 1, 0, 0, 0, 0),
    // ];

    //flag spawn
    rogueTemplate.flagSpawn = [
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

    //Tile and Terrain Generation
    var xIterator = xOfWorld/800;
    var yIterator = yOfWorld/450;
    
    console.log(xIterator, 'x', yIterator, 'y');

    return rogueTemplate;

};


////Tile and Terrain Generator

brawl.game.prototype.tileTerrainGenerator = function () {
 
};

