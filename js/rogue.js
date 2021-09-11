brawl.game.prototype.rogueGenerator = function () {
    ////////////RNG Generators///////////////
    //Size of World
    var xOfWorld = 1600 * (Math.floor(Math.random() * 5) + 1);
    var yOfWorld = 900 * (Math.floor(Math.random() * 5) + 1);
    // var xOfWorld = 1600 * (Math.floor(Math.random() * 2) + 1);
    // var yOfWorld = 900 * (Math.floor(Math.random() * 2) + 1);

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

    //Tile and Terrain Generation
    var xIterator = xOfWorld / 800;
    var yIterator = yOfWorld / 450;

    //Specific Terrain
    var terrainIndex = Math.floor(Math.random() * terrainArray.length);

    //World Gravity
    // rogueTemplate.worldGravity = new worldGravityCreator(0, -200);

    //Up, Down, Left, Right (Player Position in the Room) When Spawned (indexOfPlayerPosition)
    rogueTemplate.playerPosition = [
        new PlayerPositionCreator(800, 700), //0,0
        new PlayerPositionCreator(800, 700),
        new PlayerPositionCreator(800, 700), //0,
        new PlayerPositionCreator(800, 700),
    ];

    //Initializing Array for Rogue Template
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

    //Troubleshooting
    // console.log(terrainIndex, 'terrainIndex');
    console.log(xIterator, yIterator);
    // console.log(terrainArray[terrainIndex], "actual terrain")

    ///////////////////Initializing Rogue Generation
    for (var i = 0; i < yIterator; i++) {
        var yBlock = i * 450;
        for (var z = 0; z < xIterator; z++) {
            var xBlock = z * 800;
            // console.log(xBlock, 'x', yBlock, 'y');
            this.tileTerrainGenerator(xBlock, yBlock, 0, terrainArray[terrainIndex]);
        }
    }

    return rogueTemplate;

};


////Tile and Terrain Generator

brawl.game.prototype.tileTerrainGenerator = function (x, y, playerPosition, terrain) {
    //List of Tiles
    var tileArray;
    // if (terrain.name === 'beginnertest') {
    //     tileArray = [
    //         [new SpriteCreator(true, wallRegular, 'tile', wallTile50, x, y + 200, 400, 50, 1, 0, 0, 0, 0),
    //         new SpriteCreator(true, wallRegular, 'tile', wallTile50, x + 100, y, 50, 400, 1, 0, 0, 0, 0),
    //         new SpriteCreator(true, groundRegular, 'tile', groundTile, x, y + 350, 400, 50, 1, 0, 0, 0, 0),]
    //     ];
    // };
    tileArray = [
        //Test Variation
        [new SpriteCreator(true, wallRegular, 'tile', wallTile50, x, y + 200, 400, 50, 1, 0, 0, 0, 0),
        new SpriteCreator(true, wallRegular, 'tile', wallTile50, x + 100, y, 50, 400, 1, 0, 0, 0, 0),
        new SpriteCreator(true, groundRegular, 'tile', groundTile, x, y + 350, 400, 50, 1, 0, 0, 0, 0),],
        //Variation of Spikes
        //
        [new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, x + 200, y + 300, 50, 50, 1, 0, 300, 0, 500, null, new timerCreator('loop', null, .5)),
        new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, x + 200, y + 362.25, null, null, .5, 0, 0, 0, 0),
        //
        new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, x + 300, y + 300, 50, 50, 1, 0, 300, 0, 500, null, new timerCreator('loop', null, .5)),
        new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, x + 300, y + 362.25, null, null, .5, 0, 0, 0, 0),
        //
        new SpriteCreator(true, fallingSpikesRegular, 'timer', fallingSpikesOne, x + 400, y + 300, 50, 50, 1, 0, 300, 0, 500, null, new timerCreator('loop', null, .5)),
        new SpriteCreator(true, invisibleTrapIndicator, 'sprite', invsibileTile, x + 400, y + 362.25, null, null, .5, 0, 0, 0, 0),],
        //Ledges
        [new SpriteCreator(true, ledgeSurf, 'sprite', ledge, 1300, 250, null, null, 1, 0, 0, 0, 0),
        new SpriteCreator(true, ledgeElevator, 'sprite', ledge, 1400, 750, null, null, 1, 0, 0, 0, 0),
        new SpriteCreator(true, ledgeBounce, 'sprite', ledge, 1500, 1250, null, null, 1, 0, 0, 0, 0),],
        //Moving Death
        [new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, x + 300, y + 200, 50, 50, 1, 300, -1000, 0, 0),
        new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, x + 150, y + 50, 50, 50, 1, 150, 1000, 0, 0),
        new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, x + 300, y + 100, 50, 50, 1, 100, -1000, 0, 0),
        new SpriteCreator(true, deathRegularMove, 'tile', deathMoveTile, x + 300, y + 200, 50, 50, 1, 200, 1000, 0, 0),],
    ];
    // var tileChoice = tileArray[0];
    // console.log(tileChoice);
    // console.log(tileArray[0],'Is it hitting?');
    var randomIndex = Math.floor(Math.random() * tileArray.length);
    console.log(tileArray[randomIndex], 'index');
    for (var i = 0; i < tileArray[randomIndex].length; i++) {
        rogueTemplate.spriteSpawn.push(tileArray[randomIndex][i]);
    }
    // return;
};

