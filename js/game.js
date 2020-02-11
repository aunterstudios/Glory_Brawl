//////////////////////////////////////////Environment//////////////////////////////////////////
brawl.game = function () { };
brawl.game.prototype = {
    init: function (indexOfCurrentWorld, indexOfPlayerPosition, metroidvania) {
        //GENERAL MAP SETTINGS 
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; //Scales our Game
        //Reset Enemy Bullet Array
        livingEnemies = [];
        /*
        Essentially the room initializes with the index of the current world, where the player should spawn in the world, and lastly the rooms available to switch to depending on the side.
        */
        // console.log("IndexOfWorld");
        // console.log(indexOfCurrentWorld);
        // console.log("IndexOfPlayer");
        // console.log(indexOfPlayerPosition);
        // console.log("Metroidvania");
        // console.log(metroidvania);
        this.indexOfCurrentWorld = indexOfCurrentWorld;
        this.indexOfPlayerPosition = indexOfPlayerPosition;
        this.metroidvania = metroidvania;
        cameraBoolean = true;
        // console.log(this.metroidvania.roomRightValue);
    },
    preload: function () {
        // this.game.forceSingleUpdate = true;
        //Immovable Walls
        this.load.image('immovableWallVertical', 'assets/immovableWallVertical.png');
        this.load.image('immovableWallHorizontal', 'assets/immovableWallHorizontal.png');
        //Moveable Walls
        this.load.image('wallVertical', 'assets/wallVertical.png');
        this.load.image('wallHorizontal', 'assets/wallHorizontal.png');
        this.load.image('wallBrown', 'assets/wallBrown.png');
        //Ledges
        this.load.image('ledgeElevator', 'assets/ledgeElevator.png');
        this.load.image('ledgeBounce', 'assets/ledgeBounce.png');
        this.load.image('ledgeSurf', 'assets/ledgeSurf.png');
        //Traps
        this.load.image('spikeFall', 'assets/spikeFall.png');
        this.load.image('spikesHorizontalOne', 'assets/spikesHorizontalOne.png')
        this.load.image('spikesHorizontalTwo', 'assets/spikesHorizontalTwo.png');
        this.load.image('spikesVertical', 'assets/spikesVertical.png');
        //Death (Red)
        this.load.image('deathVertical', 'assets/deathVertical.png');
        this.load.image('deathHorizontal', 'assets/deathHorizontal.png');
        //Bullets
        this.load.image('bulletKill', 'assets/bulletKill.png');
        this.load.image('bulletStop', 'assets/bulletStop.png');
        this.load.image('bulletPull', 'assets/bulletPull.png');
        this.load.image('bulletEnemy', 'assets/bulletEnemy.png');
        //Coin
        this.load.image('coin', 'assets/coin.png');
        //Flag
        this.load.image('flag', 'assets/flag.png');
        //Door
        this.load.image('door', 'assets/door.png');
        //Ball
        this.load.image('ball', 'assets/ball.png');
        //Enemies
        this.load.image('enemy', 'assets/trumpface.png');
        //Player
        // this.load.spritesheet('player', 'assets/player.png', 87.5, 93.5);
        this.load.image('player', 'assets/playerFiller.png');
    },
    create: function () {
        //Desired FPS of game and fps and lag debugging
        this.game.time.desiredFps = 60;

        //FPS Debugging

        // this.game.time.advancedTiming = true;

        //Background Color of Game
        this.game.stage.backgroundColor = worldClassLevels[this.indexOfCurrentWorld].backgroundColor;
        // this.game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
        // this.game.stage.backgroundColor = "#2F4F4F";

        //Sort Direction

        this.game.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
        this.game.physics.arcade.forceX = true;

        // Stretch to fill (Full Screen Mode)
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.fullSize = this.game.input.keyboard.addKey(Phaser.Keyboard.F);

        this.fullSize.onDown.add(this.gofull, this);

        //Pause Menu (Freeze TIME LOL)
        this.pause = this.game.input.keyboard.addKey(Phaser.Keyboard.P);

        this.pause.onDown.add(this.goPause, this);

        //Overlap Bias to Prevent Sprite Tunneling
        this.game.physics.arcade.OVERLAP_BIAS = 20; //20 is original

        ////////////////////Game World Size//////////////////////
        this.game.world.setBounds(0, 0, worldClassLevels[this.indexOfCurrentWorld].xOfWorld, worldClassLevels[this.indexOfCurrentWorld].yOfWorld);
        ///////////////////World Gravity////////////////////////
        if ('worldGravity' in worldClassLevels[this.indexOfCurrentWorld] ) {
            this.game.physics.arcade.gravity.setTo(worldClassLevels[this.indexOfCurrentWorld].worldGravity.gravityX, worldClassLevels[this.indexOfCurrentWorld].worldGravity.gravityY);
        }

        ////////////////////////////////////Keyboard Controls/////////////////////////////////
        this.cursors = this.game.input.keyboard.createCursorKeys();

        /////////////////Adding Sprite Groups//////////////
        //Adding Moveable Walls
        this.wall = this.game.add.group();
        this.wall.enableBody = true; //enables physics for wall
        //Adding Immovable Walls
        this.immovableWall = this.game.add.group();
        this.immovableWall.enableBody = true;
        //Adding Ledges
        this.ledge = this.game.add.group();
        this.ledge.enableBody = true;
        //Adding Enemies
        this.enemy = this.game.add.group();
        this.enemy.enableBody = true;
        //Adding Balls
        this.ball = this.game.add.group();
        this.ball.enableBody = true;
        //Traps
        this.spikes = this.game.add.group();
        this.spikes.enableBody = true;
        //Timer Traps
        this.fallingSpikes = this.game.add.group();
        this.fallingSpikes.enableBody = true;
        //Adding Coins (Win Game)
        this.coin = this.game.add.group();
        this.coin.enableBody = true;
        //Adding This Undeniable Death
        this.death = this.game.add.group();
        this.death.enableBody = true;
        //Adding Flag Group
        this.flag = this.game.add.group();
        this.flag.enableBody = true;


        /////////////////////Practice Specific Sprite Groups/////////////////

        /////////////////////Enemy Bullets///////////////
        // creates enemy bullets
        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'bulletEnemy');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        ////////////////////////////////Key Control Movements/////////////////////////
        //Player Movement (WASD);
        this.movementUp = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.movementDown = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.movementLeft = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.movementRight = this.game.input.keyboard.addKey(Phaser.Keyboard.D)

        //Change Weapon Fire Type
        this.pullBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        this.pushBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.killBullet = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

        //Booleans to Trigger Different Weapon Types
        this.pullBullet.onDown.add(this.goPull, this);
        this.pushBullet.onDown.add(this.goPush, this);
        this.killBullet.onDown.add(this.goKill, this);

        //Fire from Keyboard
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
        this.shiftFire = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        /////////////////////////World Creation Initialization Grid///////////////////////
        var worldName;
        this.worldCreator(worldClassLevels[this.indexOfCurrentWorld]);

        worldName = worldClassLevels[this.indexOfCurrentWorld].worldName

        ////////////////////////////////////////////Camera///////////////////////////////////////////////////////////
        // this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.cameraStyle = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        this.cameraStyle.onDown.add(this.cameraChange, this);

        //World
        this.text = this.game.add.text(200, 6208, "World: " + worldName, { font: "20px Arial", fill: "#ffffff", align: "center" });
        this.text.fixedToCamera = true;
        this.text.cameraOffset.setTo(1100, 725);

        //Teleportation
        // this.game.physics.arcade.overlap(this.player, this.door, this.teleportationDoor, null, this);

        //Timer
        //  Create our Timer
        this.timer = this.game.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        this.timer.loop(1000, this.updateCounter, this);

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    },
    /////////////////////////////Put the Game on Full Screen Mode/////////////////////
    gofull: function () {
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
        }
        else {
            this.game.scale.startFullScreen(false);
        }
    },
    ///////////////////////////Pausing the Game///////////////////
    goPause: function () {
        if (this.game.paused) {
            this.game.paused = false;
        }
        else {
            this.game.paused = true;
            //Streak
            // this.pauseText = this.game.add.text(this.player.x, this.player.y, "PAUSE", { font: "32px Arial", fill: "#ffffff", align: "center" });
            // this.pauseText.fixedToCamera = true;
            // this.pauseText.cameraOffset.setTo(1200, 750);
        }
    },
    /////////////////////////////////////////////////Camera///////////////////////////////////////////
    cameraChange: function () {
        if (cameraBoolean) {
            cameraBoolean = false;
        }
        else {
            cameraBoolean = true;
        }
        if (cameraBoolean) {
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        }
        else {
            this.game.camera.unfollow();
        }
    },
    //////////////////////////////////////Timer//////////////////////////////////////
    updateCounter: function () {
        total++
    },
    //////////////////////////Room Switching (Metroidvania) Events//////////////////////////
    playerOut: function (player) {
        //Up
        if (player.y <= this.metroidvania.roomUpValue) {
            // player.reset(0, player.y)
            // player.body.velocity.x = 400;
            this.game.state.restart(true, false, this.metroidvania.roomUpIndex, 1, worldClassLevels[this.metroidvania.roomUpIndex].metroidvania);
        }
        //Down
        else if (player.y >= this.metroidvania.roomDownValue) {
            // player.reset(1400, player.y)
            // player.body.velocity.x = -400;
            this.game.state.restart(true, false, this.metroidvania.roomDownIndex, 0, worldClassLevels[this.metroidvania.roomDownIndex].metroidvania);
        }
        //Left
        else if (player.x <= this.metroidvania.roomLeftValue) {
            // player.reset(1400, player.y)
            // player.body.velocity.x = -400;
            this.game.state.restart(true, false, this.metroidvania.roomLeftIndex, 3, worldClassLevels[this.metroidvania.roomLeftIndex].metroidvania);
        }
        //Right
        else if (player.x >= this.metroidvania.roomRightValue) {
            // player.reset(1400, player.y)
            // player.body.velocity.x = -400;
            this.game.state.restart(true, false, this.metroidvania.roomRightIndex, 2, worldClassLevels[this.metroidvania.roomRightIndex].metroidvania);
        }

    },
    //////////////////////////Creation of the World/////////////////////////////////
    worldCreator: function (levelGenerator) {
        /////////////////////Testing Entirety of Level/////////////////
        // console.log(levelGenerator);
        ////////////////////Adding Player//////////////////////
        this.player = this.game.add.sprite(levelGenerator.playerPosition[this.indexOfPlayerPosition].x, levelGenerator.playerPosition[this.indexOfPlayerPosition].y, 'player');
        this.game.physics.arcade.enable(this.player); //enables physics for player
        this.player.anchor.setTo(.5);
        // this.player.scale.setTo(.6);
        this.player.scale.setTo(.35);
        // this.player.alpha = this.game.rnd.realInRange(.5, 1);
        // this.player.tint = Phaser.Color.getRandomColor(50, 255, 255);
        // this.player.body.setSize(63, 84, 5, 6);
        // this.player.body.bounce.y = 0;
        this.player.body.mass = 6; //6
        this.player.body.gravity.y = 1500;
        //this.player.body.allowDrag = false;
        // this.player.body.collideWorldBounds = true;
        this.player.checkWorldBounds = true;
        this.player.events.onOutOfBounds.add(this.playerOut, this);

        //Player Upwards Wall
        // this.player.wallUp = 200;

        // // PLAYER ANIMATIONS
        // this.player.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        // this.player.animations.add('right', [9, 10, 11, 12, 13, 14, 15], 10, true);

        //////////////////Adding Weapons////////////////////
        /////////////Pull as Default
        pullBoolean = true;
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon1 = this.game.add.weapon(30, 'bulletPull');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon1.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon1.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon1.bulletSpeed = 500;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon1.fireRate = 500;
        //Size of Bullet
        // this.weapon1.setBulletBodyOffset(5,2,-20,0); //setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)
        // Track Player
        this.weapon1.trackSprite(this.player, 0, 0);

        /////////////////Push
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon2 = this.game.add.weapon(30, 'bulletStop');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon2.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon2.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon2.bulletSpeed = 500;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon2.fireRate = 500;
        //Match Your Velocity?
        // Track Player
        this.weapon2.trackSprite(this.player, 0, 0);

        ////////////////Stop
        //  Creates 30 bullets, using the 'bullet' graphic
        this.weapon3 = this.game.add.weapon(30, 'bulletKill');
        //  The bullet will be automatically killed when it leaves the camera bounds
        this.weapon3.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        this.weapon3.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon3.bulletSpeed = 500;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon3.fireRate = 500;
        // Track Player
        this.weapon3.trackSprite(this.player, 0, 0);

        // - 20 for Tracking//

        ///////////////////////////Sprite Generation in World/////////////////////////////
        // Generating Undeniable Death
        if ('undeniableDeathSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.undeniableDeathSpawn.length; i++) {
                if (levelGenerator.undeniableDeathSpawn[i].trigger) {
                    this.undeniableDeathSpawn(levelGenerator.undeniableDeathSpawn[i]);
                }
            }
        }
        //Generating Immovable Walls
        if ('immovableWallSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.immovableWallSpawn.length; i++) {
                if (levelGenerator.immovableWallSpawn[i].trigger) {
                    this.immovableWallSpawn(levelGenerator.immovableWallSpawn[i]);
                }
            }
        }
        //Generating movable Walls
        if ('wallSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.wallSpawn.length; i++) {
                if (levelGenerator.wallSpawn[i].trigger) {
                    this.wallSpawn(levelGenerator.wallSpawn[i]);
                }
            }
        }
        //Generating spikes
        if ('spikeSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.spikeSpawn.length; i++) {
                if (levelGenerator.spikeSpawn[i].trigger) {
                    this.spikeSpawn(levelGenerator.spikeSpawn[i]);
                }
            }
        }
        //Generating Ledges
        if ('ledgeSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.ledgeSpawn.length; i++) {
                if (levelGenerator.ledgeSpawn[i].trigger) {
                    this.ledgeSpawn(levelGenerator.ledgeSpawn[i]);
                }
            }
        }
        //Generating enemies (Tabled For Now)
        if ('enemySpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.enemySpawn.length; i++) {
                if (levelGenerator.enemySpawn[i].trigger) {
                    this.enemySpawn(levelGenerator.enemySpawn[i]);
                }
            }
        }
        //Generating balls ledges
        if ('ballSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.ballSpawn.length; i++) {
                if (levelGenerator.ballSpawn[i].trigger) {
                    this.ballSpawn(levelGenerator.ballSpawn[i]);
                }
            }
        }
        ///////////////////(Falling Spikes)////////////////
        if ('fallingSpikes' in levelGenerator) {
            for (var i = 0; i < levelGenerator.fallingSpikes.length; i++) {
                if (levelGenerator.fallingSpikes[i].trigger) {
                    this.game.time.events.loop(Phaser.Timer.SECOND * levelGenerator.fallingSpikes[i].seconds, this.spikeFall, this, levelGenerator.fallingSpikes[i]);
                }
            }
        }
        // //////////////////(Respawn)Flag//////////////////
        if ('flagSpawn' in levelGenerator) {
            for (var i = 0; i < levelGenerator.flagSpawn.length; i++) {
                if (levelGenerator.flagSpawn[i].trigger) {
                    this.flagSpawn(levelGenerator.flagSpawn[i]);
                }
            }

        }
        ////////////////////////Text Generation///////////////////////////
        if ('text' in levelGenerator) {
            for (var i = 0; i < levelGenerator.text.length; i++) {
                this.textCreator(levelGenerator.text[i]);
            }
        }

        ///////////////////Debugging Purposes (Knowing The Placement of Each Sprites)/////////////////////////
        // var distanceOfXandY = 200;
        // var xIterator = Math.round(levelGenerator.xOfWorld / distanceOfXandY);
        // var yIterator = Math.round(levelGenerator.yOfWorld / distanceOfXandY);

        // for (var x = 1; x < xIterator; x++) {
        //     for (var y = 1; y < yIterator; y++) {
        //         this.text = this.game.add.text(x*distanceOfXandY, y*distanceOfXandY, x*distanceOfXandY+'X'+y*distanceOfXandY+'Y', { font: "10px Arial", fill: "#ffffff", align: "center" });
        //     }
        // }

    },
    //////////////////////////Creating Game Objects/////////////////////////
    //SpikeFall
    coinSpawn: function (sprite) {
        this.coinX = this.coin.create(sprite.x, sprite.y, 'coin');
        this.coinX.anchor.setTo(.7);
        this.coinX.scale.setTo(.7);
        this.coinX.body.mass = 1;
        this.coinX.body.maxVelocity.setTo(1000);
        this.coinX.body.collideWorldBounds = true;
        this.coinX.body.bounce.setTo(1);
        this.coinX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    },
    undeniableDeathSpawn: function (sprite) {
        this.deathX = this.death.create(sprite.x, sprite.y, sprite.art);
        this.deathX.name = sprite.name;
        this.deathX.groupName = groupUndeniableDeath;
        this.deathX.specialCondition = sprite.specialCondition;
        this.deathX.specialWorld = sprite.specialWorld;
        this.deathX.specialArray = sprite.specialArray;
        this.deathX.positionInArray = sprite.positionInArray;
        this.deathX.scale.setTo(sprite.sizeX, sprite.sizeY);
        this.deathX.body.immovable = true;
        this.deathX.body.mass = 300;
        this.deathX.body.collideWorldBounds = true;
        this.deathX.body.immovable = true;
        this.deathX.body.bounce.setTo(1);
        this.deathX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    },
    immovableWallSpawn: function (sprite) {
        this.immovableWallX = this.immovableWall.create(sprite.x, sprite.y, sprite.art);
        // this.immovableWallX.anchor.setTo(.5);
        this.immovableWallX.name = sprite.name;
        this.immovableWallX.groupName = groupImmovableWall;
        this.immovableWallX.specialCondition = sprite.specialCondition;
        this.immovableWallX.specialWorld = sprite.specialWorld;
        this.immovableWallX.specialArray = sprite.specialArray;
        this.immovableWallX.positionInArray = sprite.positionInArray;
        if (sprite.name === 'immovableWallPhase') {
            this.immovableWallX.tint = Phaser.Color.hexToRGB("#6a0dad");
        }
        if (sprite.name === 'immovableWallKillWall') {
            this.immovableWallX.tint = Phaser.Color.hexToRGB("#cdf053");
        }
        this.immovableWallX.scale.setTo(sprite.sizeX, sprite.sizeY);
        this.immovableWallX.body.immovable = true;
        this.immovableWallX.body.mass = 400;
        this.immovableWallX.body.maxVelocity.setTo(1000);
        this.immovableWallX.body.collideWorldBounds = true;
        this.immovableWallX.body.bounce.setTo(1);
        this.immovableWallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    },
    wallSpawn: function (sprite) {
        this.wallX = this.wall.create(sprite.x, sprite.y, sprite.art);
        this.wallX.name = sprite.name;
        this.wallX.groupName = groupWall;
        this.wallX.specialCondition = sprite.specialCondition;
        this.wallX.specialWorld = sprite.specialWorld;
        this.wallX.specialArray = sprite.specialArray;
        this.wallX.positionInArray = sprite.positionInArray;
        this.wallX.velocityVsImmovable = 100;
        if (sprite.name === wallGhost) {
            this.wallX.tint = Phaser.Color.ORANGE;
            this.wallX.body.immovable = true;
        }
        this.wallX.anchor.setTo(.5);
        this.wallX.scale.setTo(sprite.sizeX, sprite.sizeY);
        // this.wallX.body.immovable = true;
        this.wallX.body.gravity.setTo(sprite.gravityX, sprite.gravityY);
        this.wallX.body.mass = 150;
        this.wallX.body.maxVelocity.setTo(500);
        this.wallX.body.collideWorldBounds = true;
        ////////////////////////Testing/////////////////////////
        // this.wallX.checkWorldBounds = true;
        // this.wallX.events.onOutOfBounds.add(this.wallOut, this);
        /////////////////////////Testing//////////////////
        this.wallX.body.bounce.setTo(1);
        this.wallX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
        ///////////Drag Events///////////
        // this.wallX.inputEnabled = true;
        // this.wallX.input.enableDrag();
        // this.wallX.events.onDragStart.add(this.startDrag, this);
        // this.wallX.events.onDragStop.add(this.stopDrag, this);
        // this.wallX.body.moves = false;
    },
    spikeSpawn: function (sprite) {
        this.spikesX = this.spikes.create(sprite.x, sprite.y, sprite.art);
        this.spikesX.name = sprite.name;
        this.spikesX.groupName = groupSpikes;
        this.spikesX.specialCondition = sprite.specialCondition;
        this.spikesX.specialWorld = sprite.specialWorld;
        this.spikesX.specialArray = sprite.specialArray;
        this.spikesX.positionInArray = sprite.positionInArray;
        this.spikesX.anchor.setTo(.5);
        this.spikesX.scale.setTo(sprite.sizeX, sprite.sizeY);
        this.spikesX.body.immovable = true;
        this.spikesX.body.mass = 150;
        this.spikesX.body.collideWorldBounds = true;
        this.spikesX.body.bounce.setTo(1.0);
        this.spikesX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
        // this.spikesX.alignIn(rect, positionInRectangle);
        // this.spikeFall(this.spikesX);
    },
    ledgeSpawn: function (sprite) {
        this.ledgeX = this.ledge.create(sprite.x, sprite.y, sprite.art);
        this.ledgeX.name = sprite.name;
        this.ledgeX.groupName = groupLedge;
        this.ledgeX.specialCondition = sprite.specialCondition;
        this.ledgeX.specialWorld = sprite.specialWorld;
        this.ledgeX.specialArray = sprite.specialArray;
        this.ledgeX.positionInArray = sprite.positionInArray;
        this.ledgeX.velocityVsWallX = 150;
        this.ledgeX.velocityVsWallY = 150;
        this.ledgeX.anchor.setTo(.5);
        this.ledgeX.scale.setTo(.4);
        this.ledgeX.body.mass = 20;
        this.ledgeX.body.maxVelocity.setTo(1000);
        this.ledgeX.body.collideWorldBounds = true;
        this.ledgeX.body.bounce.setTo(1);
        this.ledgeX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    },
    enemySpawn: function (sprite) {
        this.trumpX = this.enemy.create(sprite.x, sprite.y, 'enemy');
        this.trumpX.name = sprite.name;
        this.trumpX.groupName = groupEnemy;
        this.trumpX.specialCondition = sprite.specialCondition;
        this.trumpX.specialWorld = sprite.specialWorld;
        this.trumpX.specialArray = sprite.specialArray;
        this.trumpX.positionInArray = sprite.positionInArray;
        this.trumpX.velocityVsWallX = 50;
        this.trumpX.velocityVsWallY = 50;
        this.trumpX.anchor.setTo(.5);
        this.trumpX.scale.setTo(.6);
        this.trumpX.body.mass = 20;
        this.trumpX.body.maxVelocity.setTo(1000);
        this.trumpX.body.collideWorldBounds = true;
        this.trumpX.body.bounce.setTo(1);
        this.trumpX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    },
    ballSpawn: function (sprite) {
        //Adding Ball
        this.ballX = this.ball.create(sprite.x, sprite.y, 'ball');
        this.ballX.name = sprite.name;
        this.ballX.groupName = groupBall;
        this.ballX.specialCondition = sprite.specialCondition;
        this.ballX.specialWorld = sprite.specialWorld;
        this.ballX.specialArray = sprite.specialArray;
        this.ballX.positionInArray = sprite.positionInArray;
        this.ballX.velocityVsWallX = 300;
        this.ballX.velocityVsWallY = 300;
        this.ballX.anchor.setTo(.5);
        this.ballX.scale.setTo(.5);
        this.ballX.body.setCircle(50);
        this.ballX.body.mass = 30;
        this.ballX.body.maxVelocity.setTo(1000);
        this.ballX.body.collideWorldBounds = true;
        this.ballX.body.bounce.setTo(1.0);
        this.ballX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
    },
    /////////////////////////////////Falling Spikes///////////////////////////
    spikeFall: function (sprite) {
        this.spikesFall = this.fallingSpikes.getFirstDead(true, sprite.x, sprite.y, 'spikeFall');
        this.spikesFall.specialCondition = sprite.specialCondition;
        this.spikesFall.specialWorld = sprite.specialWorld;
        this.spikesFall.specialArray = sprite.specialArray;
        this.spikesFall.positionInArray = sprite.positionInArray;
        this.spikesFall.name = sprite.name
        this.spikesFall.anchor.setTo(.5);
        this.spikesFall.scale.setTo(.5);
        this.spikesFall.checkWorldBounds = true;
        this.spikesFall.outOfBoundsKill = true;
        this.spikesFall.body.gravity.x = sprite.gravityX;
        this.spikesFall.body.gravity.y = sprite.gravityY;
    },
    //////////////////////////Flag Spawn(Checkpoints or Respawn Points)/////////////////////////
    flagSpawn: function (sprite) {
        this.flagX = this.flag.create(sprite.x, sprite.y, sprite.art);
        this.flagX.name = sprite.name;
        this.flagX.specialCondition = sprite.specialCondition;
        this.flagX.specialWorld = sprite.specialWorld;
        this.flagX.specialArray = sprite.specialArray;
        this.flagX.positionInArray = sprite.positionInArray;
        //this.flagX.scale(sprite.sizeX,sprite.sizeY);
        this.flagX.body.mass = 1;
        this.flagX.body.maxVelocity.setTo(1000);
        this.flagX.body.collideWorldBounds = true;
        this.flagX.body.bounce.setTo(1);
        this.flagX.body.velocity.setTo(sprite.velocityX, sprite.velocityY);
        ////////////////Special Property of Flag//////////////////
        this.flagX.indexOfPlayerPosition = sprite.indexOfPlayerPosition;
    },
    /////////////////////////////Creation of Text in Game/////////////////////////////////
    textCreator: function (sprite) {
        this.text1 = this.game.add.text(sprite.x, sprite.y, sprite.textInput);
        this.text1.font = sprite.font;
        this.text1.fontSize = sprite.fontSize;
        this.text1.fill = sprite.fill;
        this.text1.fontWeight = sprite.fontWeight;
        this.text1.positionInArray = sprite.positionInArray;
    },
    ///////////////////////Handling Jump Events (Double-Jump)//////////////////
    upInputReleased: function () {
        var released = false;

        released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
        released |= this.input.keyboard.upDuration(Phaser.Keyboard.SPACEBAR);

        return released;
    },
    upInputIsActive: function (duration) {
        var isActive = false;

        isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
        isActive |= this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, duration);

        return isActive;
    },
    ///////////////////////////Weapon Functionality/////////////////
    goPull: function () {
        // console.log("1");
        pullBoolean = true;
        pushBoolean = false;
        stopBoolean = false;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    goPush: function () {
        // console.log("2");
        pullBoolean = false;
        pushBoolean = true;
        stopBoolean = false;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    goKill: function () {
        // console.log("3");
        pullBoolean = false;
        pushBoolean = false;
        stopBoolean = true;
        // console.log("Pull: " + pullBoolean + " Push: " + pushBoolean + " Kill: " + stopBoolean);
    },
    //////////////////////////////////////Test Functions//////////////////////////////////
    //Moveable Wall Test
    // wallStop: function (wall) {
    //     wall.body.immovable = false;
    //     console.log(wall.body.immovable);
    // },
    ////////////////////////////////////Continious Updating In Game////////////////////////
    //Enemy Bullets
    fireEnemyBullet: function () {
        // livingEnemies.length = 0; 
        // this.enemy.forEachAlive(function(enemy){
        //     livingEnemies.push(enemy)
        // });
        // if(this.time.now > enemyBulletTime) { 
        //     enemyBullet = this.enemyBullets.getFirstExists(false); 
        //     if(enemyBullet && livingEnemies.length > 0) {
        //         //enemyShotSound.play();
        //         var random = this.rnd.integerInRange(0, livingEnemies.length - 1);
        //         var shooter = livingEnemies[random];
        //         enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
        //         enemyBulletTime = this.time.now + 100; //500 was the "default value"
        //         // if (game.physics.arcade.distanceBetween(enemyBullet, this.player, false, true) < 500) {
        //         //     this.physics.arcade.moveToObject(enemyBullet,this.player,600);
        //         // }
        //         this.physics.arcade.moveToObject(enemyBullet,this.player,600);
        //     }
        // }
        //Clears Array
        livingEnemies.length = 0;
        this.enemy.forEachAlive(function (enemy) {
            if (this.game.physics.arcade.distanceBetween(enemy, this.player, false, true) < 400) {
                livingEnemies.push(enemy)
            }
        }, this, this.player);
        if (this.time.now > enemyBulletTime) {
            enemyBullet = this.enemyBullets.getFirstExists(false);
            if (enemyBullet && livingEnemies.length > 0) {
                //enemyShotSound.play();
                var random = this.rnd.integerInRange(0, livingEnemies.length - 1);
                var shooter = livingEnemies[random];
                enemyBullet.reset(shooter.body.x, shooter.body.y + 30);
                enemyBulletTime = this.time.now + 500; //500 was the "default value"
                // if (game.physics.arcade.distanceBetween(enemyBullet, this.player, false, true) < 500) {
                //     this.physics.arcade.moveToObject(enemyBullet,this.player,600);
                // }
                this.physics.arcade.moveToObject(enemyBullet, this.player, 440);
            }
        }
    },
    // turnMoveable: function (wall) {
    //     wall.body.immovable = false;
    //     console.log(wall.body.immovable);
    // },
    ///////////////////////////////////////////State Switches////////////////////////////////
    deathState: function (victim, killer) {
        victim.kill();
        game.state.start('deathState', true, false, respawnHolder.indexOfCurrentWorld, respawnHolder.indexOfPlayerPosition, respawnHolder.metroidvania);
    },
    //Character Respawn
    respawn: function (player, flag) {
        flag.kill();
        respawnHolder.indexOfCurrentWorld = this.indexOfCurrentWorld;
        respawnHolder.indexOfPlayerPosition = flag.indexOfPlayerPosition;
        respawnHolder.metroidvania = this.metroidvania;
        if (flag.specialCondition === 1) {
            ///////////////Why did I make it so that the flag won't respawn Ever? There was a Reason///////////
            // worldClassLevels[this.indexOfCurrentWorld].flagSpawn[flag.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldClassLevels[flag.specialWorld].immovableWallSpawn[flag.specialArray].trigger = false;
        }
    },
    //////////////////////////////////////////Weapon Functionality////////////////////////////////////////////
    //When Weapon Hits Immovable/Unkillable Objects (It Dies);
    weaponImmovable: function (weapon, wall) {
        weapon.kill();
    },
    //When Weapon Hits Moveable Objects (It's Special Property Expressed)
    weaponHandler: function (weapon, sprite) {
        if (weapon.key === 'bulletPull') {
            this.game.physics.arcade.moveToObject(sprite, this.player, 200);
        }
        else if (weapon.key === 'bulletStop') {
            sprite.body.stop();
        }
        else if (weapon.key === 'bulletKill') {
            sprite.kill();
        }
        weapon.kill();
    },
    //////////////////////////////////////////Coin Conditions////////////////////////////////////////////
    // coinWin: function () {
    //     this.game.physics.arcade.overlap(this.player, this.coin, deathThree, null, this);
    //     //Coin Mechanics
    //     this.game.physics.arcade.collide(this.coin, [this.ball, this.wall, this.ledge, this.ledgeDown, this.ledgeSide, this.enemy, this.immovableWall], null, null, this);
    //     if (this.coin.countDead() === this.coinAmount) {
    //         nextLevel();
    //     }
    // },
    //////////////////////////////////////Physics Handlers Between Objects////////////////////////////
    //Dealing With Sprite Specific vs Group Deaths (Objects Kiling Each Other)
    deathTwo: function (victim, killer) {
        victim.kill();
        if (killer.name === 'immovableWallPhase') {
            killer.kill();
        }
    },
    deathThree: function (killer, victim) {
        victim.kill();
    },
    wallImmovable: function (wall, sprite2) {
        /////////////////Make Sure to Code In Objects Interacting With Each Other!!////////////////
        ////////////////Interactions Coded in the Orientation of Immovable Walls//////////////////
        if (sprite2.name === immovableWallPhase) {
            wall.kill();
        }
    },
    wallMoveable: function (sprite1, sprite2) {
        if ((sprite1.name === wallRegular || sprite1.name === wallFrozen) && sprite2.groupName === groupLedge) {
            // sprite2.body.stop();
            sprite1.name = wallFrozen;
            sprite1.body.moves = false;
            sprite1.body.immovable = true;
            sprite1.tint = 0x00ffff;
            // sprite2.body.stopMovement();
            //sprite2.body.stop();
            if (sprite1.body.touching.up) {
                // sprite2.body.acceleration.y = 100
                // sprite2.body.acceleration.y = 0;
                sprite2.body.velocity.y = -sprite2.velocityVsWallY;
                // sprite1.body.velocity.y = sprite2.velocityVsWallY;
                // console.log(sprite1.body.velocity.y, sprite2.body.velocity.y);
                // sprite2.body.velocity.x = sprite1.body.velocity.x;
            }
            if (sprite1.body.touching.down) {
                // sprite2.body.acceleration.y = 0;
                sprite2.body.velocity.y = sprite2.velocityVsWallY;
                // sprite2.body.velocity.x = sprite1.body.velocity.x;
            }
            if (sprite1.body.touching.left) {
                // sprite2.body.acceleration.x = 0;
                sprite2.body.velocity.x = -sprite2.velocityVsWallX;
                // sprite2.body.velocity.y = sprite1.body.velocity.y;
            }
            if (sprite1.body.touching.right) {
                // sprite2.body.acceleration.x = 0;
                sprite2.body.velocity.x = sprite2.velocityVsWallX;
                // sprite2.body.velocity.y = sprite1.body.velocity.y;
            }
            return;
        }
        else if (sprite1.name === wallGhost && sprite2.groupName === groupLedge) {
            //Changing Name or Type
            sprite1.name = wallRegular;
            sprite1.body.moves = true;
            sprite1.tint = 0xFFFFFF;
            sprite1.body.immovable = false;
            // if (player.body.touching.up) {
            //     wall.body.velocity.y = -100;
            //     player.body.velocity.y = 100;
            // }
            return;
        }
        else if (sprite1.name === wallRegular && sprite2.groupName === groupBall) {
            sprite1.tint = 0x666666;
            // sprite1.body.gravity.y += 100;
        }

    },
    //Wall Out
    // wallOut: function (wall) {
    //     wall.kill();
    // },
    ghostWall: function (wall, immovable) {
        if (wall.name === wallGhost) {
            return false;
        }
        else {
            true;
        }
    },
    //Ball Interaction With Spikes
    ballSpike: function (sprite1, sprite2) {
        sprite2.kill();
        //Removes Localized Sprites from Regenerating (Spikes)
        if (sprite2.specialCondition === 0) {
            //Destruction of Localized Sprite
            worldClassLevels[this.indexOfCurrentWorld].spikeSpawn[sprite2.positionInArray].trigger = false;
        }
        //Removes Sprites from Different Levels (Spikes)
        else if (sprite2.specialCondition === 1) {
            worldClassLevels[this.indexOfCurrentWorld].spikeSpawn[sprite2.positionInArray].trigger = false;
            //Destruction of a sprite at a different level
            worldClassLevels[sprite2.specialWorld].spikeSpawn[sprite2.specialArray].trigger = false;
        }
        //////////////////////////Creates New Sprites After Spikes Destroyed///////////////////////
        //worldClassLevels[sprite2.specialWorld].ledgeGreySpawn[sprite2.specialArray].trigger = true;
    },
    playerWall: function (player, wall) {
        if (wall.name === wallRegular || wall.name === wallFrozen) {
            wall.name = wallRegular;
            wall.body.moves = true;
            wall.tint = 0xFFFFFF;
            wall.body.immovable = false;
            if (player.body.touching.up) {
                wall.body.velocity.y = -100;
                player.body.velocity.y = 100;
            }
        }
        // wall.body.moves = true;
        // wall.tint = 0xFFFFFF;
        // wall.body.immovable = false;
        // if (player.body.touching.up) {
        //     wall.body.velocity.y = -100;
        //     player.body.velocity.y = 100;
        // }
        // if (player.body.touching.down) {
        //     wall.body.velocity.y = -50;
        // }
    },
    playerBall: function (player, ball) {
        //   ///////////////////GOOOFY/////////////
        ball.body.stop();
        if (ball.body.touching.up) {
            ball.body.velocity.y = 200;
        }
        if (ball.body.touching.down) {
            ball.body.velocity.y = -200;
            player.body.velocity.y = -50;
        }
        if (ball.body.touching.left) {
            ball.body.velocity.x = 200;
        }
        if (ball.body.touching.right) {
            ball.body.velocity.x = -200;
        }
        //   //////////////////Natural///////////////
        //   // if (ball.body.touching.up) {
        //   //   ball.body.velocity.y = 50;
        //   // }
        //   // else if (ball.body.touching.down) {
        //   //   ball.body.velocity.y = -50;
        //   //   player.body.velocity.y = -75;
        //   // }
        //   // else if (ball.body.touching.left) {
        //   //   ball.body.velocity.x = 50;
        //   // }
        //   // else if (ball.body.touching.right) {
        //   //   ball.body.velocity.x = -50;
        //   // }
        //   //////////////Control////////////
        //   // if (ball.body.touching.up) {
        //   //   ball.body.velocity.y = player.body.velocity.y;
        //   // }
        //   // if (ball.body.touching.down) {
        //   //   ball.body.velocity.y = player.body.velocity.y;
        //   // }
        //   // if (ball.body.touching.left) {
        //   //   ball.body.velocity.x = player.body.velocity.x;
        //   // }
        //   // if (ball.body.touching.right) {
        //   //   ball.body.velocity.x = player.body.velocity.x;
        //   // }
    },
    playerLedge: function (player, ledge) {
        //////////Eleveator Ledges/////////
        if (ledge.name === elevator) {
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
        //////////Super Jump/////////
        if (ledge.name === bounce) {
            if (ledge.body.touching.up) {
                player.body.velocity.y = -1200;
            }
        }
        ////////Surfs Up Dude////////
        if (ledge.name === surf) {
            ledge.body.velocity.y = 200;
            ledge.body.velocity.x = player.body.velocity.x;
        }
    },
    // //How Game Updates Real-Time (Actual Controls)////
    update: function () {
        ////////////////////////////////////FPS Debugging////////////////////////////////////////
        // console.log(this.game.time.fps);
        ////////////////////////////////////////Continious Updating//////////////////////////////////
        ///Enemy Sprites Firing Bullets
        this.fireEnemyBullet();
        // this.wall.forEachAlive(this.turnMoveable,this);
        ////////////////////////Physics////////////////////////
        //Player Mechanics
        var onImmovable = this.game.physics.arcade.collide(this.player, this.immovableWall, null, null, this);
        var onWall = this.game.physics.arcade.collide(this.player, this.wall, this.playerWall, null, this);
        var onLedge = this.game.physics.arcade.collide(this.player, this.ledge, this.playerLedge, null, this);
        var onBall = this.game.physics.arcade.collide(this.player, this.ball, this.playerBall, null, this);

        //Respawn Point Mechanics
        this.game.physics.arcade.overlap(this.player, this.flag, this.respawn, null, this);

        //Weapon Mechanics
        this.game.physics.arcade.collide([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.ball, this.wall, this.ledge, this.enemy], this.weaponHandler, null, this);
        this.game.physics.arcade.overlap([this.weapon1.bullets, this.weapon2.bullets, this.weapon3.bullets], [this.immovableWall, this.spikes, this.death], this.weaponImmovable, null, this);

        //Immovable Wall vs Moveable Objects
        this.game.physics.arcade.collide(this.immovableWall, [this.ball, this.ledge, this.enemy], null, null, this);

        //Moveable Wall vs Immoveable Objects and Itself
        this.game.physics.arcade.collide(this.wall, [this.wall, this.immovableWall, this.spikes, this.death], this.wallImmovable, this.ghostWall, this);

        //Movable Wall Mechanics vs. Moveable Objects (NOT ITSELF)
        this.game.physics.arcade.collide(this.wall, [this.ledge, this.ball, this.enemy], this.wallMoveable, null, this);

        //Enemy Bullet Mechanics
        this.game.physics.arcade.overlap(this.enemyBullets, [this.ball, this.wall, this.immovableWall, this.ledge, this.spikes, this.death], this.deathTwo, null, this);

        //Falling Spikes Mechanics
        this.game.physics.arcade.overlap(this.fallingSpikes, [this.ball, this.wall, this.immovableWall, this.ledge, this.spikes, this.enemy, this.death], this.deathTwo, null, this);

        // Ball Mechanics
        this.game.physics.arcade.collide(this.ball, [this.ball, this.ledge, this.death], null, null, this);
        this.game.physics.arcade.overlap(this.ball, [this.enemy, this.spikes], this.ballSpike, null, this);

        //Ledge and Enemy Interactions
        this.game.physics.arcade.collide(this.ledge, [this.ledge, this.spikes, this.enemy, this.death], null, null, this); //preventPhysicsBug Removed

        //Enemy Mechanics
        this.game.physics.arcade.collide(this.enemy, [this.spikes, this.enemy], null, null, this);

        //Death Mechanics (Game State Change)
        this.game.physics.arcade.overlap(this.player, [this.enemy, this.spikes, this.enemyBullets, this.death, this.fallingSpikes], this.deathState, null, this);

        ////////////////////////////////Actual Controls////////////////////////////////

        //Jump Mechanics
        // Set a variable that is true when the player is a surface the ground (or different sides) or not a surface
        var onTheGround = this.player.body.touching.down;
        var onTheRightSide = this.player.body.touching.right;
        var onTheLeftSide = this.player.body.touching.left;
        var onUpsideDown = this.player.body.touching.up;
        var onNone = this.player.body.touching.none;

        // If the player is touching a surface, let him have 2 jumps
        if (onTheGround || onTheLeftSide || onTheRightSide || onUpsideDown) {
            this.jumps = 2;
            this.jumping = false;
        }

        //////////////////////////Double Jump Only from the ground/////////////////
        // if (onTheGround) {
        //     this.jumps = 2;
        //     this.jumping = false;
        // }

        // if (onTheLeftSide || onTheRightSide || onUpsideDown) {
        //     this.jumps = 0;
        //     this.jumping = false;
        // }

        // Jump!
        if (this.jumps > 0 && this.upInputIsActive(5)) {
            this.player.body.velocity.y = -500;
            this.jumping = true;
        }

        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }

        //Player Standing Still
        this.player.body.velocity.x = 0;

        //Player Angle Still
        this.player.angle = 0;

        //////////////////////////////////////////WASD Controls and Player Touch Mechanics//////////////////////////////////////////////
        //Camera Focused on Player
        if (cameraBoolean) {
            if (onTheGround) {
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    this.player.body.velocity.x = -350;
                    // this.player.animations.play('left');
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    this.player.body.velocity.x = 350;
                    // this.player.animations.play('right');
                }
                // else {
                //     this.player.animations.stop();
                //     this.player.frame = 8;
                // }
            }
            else if (onTheRightSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = 100;
                    this.player.body.velocity.y = 100;
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 6;
                // }
                if (this.movementLeft.isDown) {
                    this.player.body.velocity.y = -500; 4
                    this.player.body.velocity.x = -1000;
                }
            }
            else if (onTheLeftSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = -100;
                    this.player.body.velocity.y = 100;
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 12;
                // }
                if (this.movementRight.isDown) {
                    this.player.body.velocity.y = -500;
                    this.player.body.velocity.x = 1000;
                }
            }
            else if (onUpsideDown) {
                // this.player.animations.stop();
                // this.player.frame = 8;
                // this.player.angle = 180;
                this.player.body.velocity.y = -100;
                if (this.movementLeft.isDown) {
                    this.player.body.velocity.x = -400;
                    // this.player.animations.play('left');
                }
                else if (this.movementRight.isDown) {
                    this.player.body.velocity.x = 400;
                    // this.player.animations.play('right');
                }

            }
            else if (onNone) {
                // this.player.frame = 10;
                if (this.movementLeft.isDown && !this.movementRight.isDown) {
                    this.player.body.velocity.x = -400;
                }
                else if (this.movementRight.isDown && !this.movementLeft.isDown) {
                    this.player.body.velocity.x = 400;
                }
                else if (this.movementLeft.isDown && this.movementRight.isDown) {
                    this.player.body.velocity.x = 0;
                }
            }

            //////////Downwards Mechanics////////
            if (this.movementDown.isDown && onUpsideDown) {
                // this.player.frame = 13;
                this.player.body.velocity.y = 200;
            }

            //Downward Mechanics
            if (this.movementDown.isDown) {
                // this.player.frame = 13;
                this.player.body.velocity.y = 500;
            }
        }
        //Freelook
        else {
            //Original is 8 (Camera Speed)
            if (this.movementLeft.isDown) {
                this.game.camera.x -= 20;
            }
            else if (this.movementRight.isDown) {
                this.game.camera.x += 20;
            }
            if (this.movementUp.isDown) {
                this.game.camera.y -= 20;
                this.player.body.velocity.y = 0;
            }
            else if (this.movementDown.isDown) {
                this.game.camera.y += 20;
            }
            if (onTheRightSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = 100;
                    this.player.body.velocity.y = 100;
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 6;
                // }
            }
            else if (onTheLeftSide) {
                if (onWall || onImmovable) {
                    this.player.body.velocity.x = -100;
                    this.player.body.velocity.y = 100;
                }
                // if (onWall || onImmovable || onLedge) {
                //     this.player.frame = 12;
                // }
            }
            else if (onUpsideDown) {
                // this.player.animations.stop();
                // this.player.frame = 8;
                // this.player.angle = 180;
                this.player.body.velocity.y = -100;
            }
            // else if (onNone) {
            //     this.player.frame = 10;
            // }
        }
        ///////////////////////Weapon Mechanics///////////////
        //Shoot from Mouse
        if (this.game.input.activePointer.leftButton.isDown || this.shiftFire.isDown) {
            if (pullBoolean) {
                this.weapon1.fireAtPointer();
                this.weapon1.fire();
            }
            else if (pushBoolean) {
                this.weapon2.fireAtPointer();
                this.weapon2.fire();
            }
            else if (stopBoolean) {
                this.weapon3.fireAtPointer();
                this.weapon3.fire();
            }
        }
    },
    //How Game Updates Real-Time (God Mode)!
    // update: function () {
    //     this.fireEnemyBullet();
    //     ///////////God Mode//////////////
    //     this.player.body.velocity.y = 0;
    //     this.player.body.velocity.x = 0;

    //     if (cameraBoolean) {
    //         if (this.movementLeft.isDown) {
    //             this.player.body.velocity.x = -400;
    //             this.player.animations.play('left');
    //         }
    //         else if (this.movementRight.isDown) {
    //             this.player.body.velocity.x = 400;
    //             this.player.animations.play('right');
    //         }
    //         if (this.movementUp.isDown) {
    //             this.player.frame = 10;
    //             this.player.body.velocity.y = -650;
    //         }
    //         else if (this.movementDown.isDown) {
    //             this.player.frame = 10;
    //             this.player.body.velocity.y = 650;
    //         }
    //     }
    //     else {
    //         if (this.movementLeft.isDown) {
    //            this.game.camera.x -= 10;
    //         }
    //         else if (this.movementRight.isDown) {
    //             this.game.camera.x += 10;
    //         }
    //         if (this.movementUp.isDown) {
    //             this.game.camera.y -= 10;
    //         }
    //         else if (this.movementDown.isDown) {
    //             this.game.camera.y += 10;
    //         }
    //     }
    //     ///////////////////////Weapon Mechanics///////////////
    //     //Shoot from Mouse
    //     if (this.game.input.activePointer.leftButton.isDown || this.shiftFire.isDown) {
    //         if (pullBoolean) {
    //             this.weapon1.fireAtPointer();
    //             this.weapon1.fire();
    //         }
    //         else if (pushBoolean) {
    //             this.weapon2.fireAtPointer();
    //             this.weapon2.fire();
    //         }
    //         else if (stopBoolean) {
    //             this.weapon3.fireAtPointer();
    //             this.weapon3.fire();
    //         }
    //     }
    // }
    /////////////////////////Debugging + Timer///////////////////////////
    // render: function () {
    //     // this.game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
    //     // this.game.debug.text('Global Timer: ' + total, 32, 32);
    //     // this.game.debug.text('Heat Timer: ' + total, 32, 64);
    //     // this.game.debug.body(this.player);
    //     // this.game.debug.physicsGroup(this.weapon1.bullets, '#ffffff');
    //     //Debugging FPS
    //     // this.game.debug.text(game.time.fps,500,500);
    // },
};