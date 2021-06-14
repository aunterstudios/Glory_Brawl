brawl.game.prototype.rogueGenerator = function () {
    var rogueTemplate = new LevelCreator(
        "[0]Physics Testing", //Name of World
        5000, //X-Size of World
        5000,  //Y- Size of World 
        "#FFFDD0", //Background Color
        true, //Out of Bounds Allowed
        1, //PlayerScale
        seanNen, //Nen-System
        bounceGhostGunSet, //Gun-Set
        true, //Sideways Stick to Walls,
        true, //Upsidedown Stick
        1, //X-Camera Lerp
        1, //Y-Camera Lerp
        fontNokia, //World Font Name
    );

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

    //Object Generation
    rogueTemplate.spriteSpawn = [

    ];

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

    return rogueTemplate;

};