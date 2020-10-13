/////////////////////////Nen System///////////////////////////
//Holds as Reference
var nenHolder;

////////////////////////Creation of Nen System///////////////////////

// var portalNen = new nenCreator(
//   400, //Speed
//   -500, //Jump
//   null, //Gravity-X
//   1500, //Gravity-Y
//   2, //Double Jump
//   1000, //WallJump-X
//   500, //wallJump-Y
//   200, //Stickiness
//   -25, //Wall Slide-Y
//   400, //Downwards-S
//   10, //OverLap Bias
// );

var portalNen = new nenCreator(
  400, //Speed
  -500, //Jump
  null, //Gravity-X
  1500, //Gravity-Y
  2, //Double Jump
  1000, //WallJump-X
  500, //wallJump-Y
  500, //Stiickiness
  -25, //Wall Slide-Y
  400, //Downwards-S
  10, //OverLap Bias
);

var seanNen = new nenCreator(
  400, //Speed
  -800, //Jump
  null, //Gravity-X
  1500, //Gravity-Y
  1, //Double Jump
  1000, //WallJump-X
  500, //wallJump-Y
  500, //Stiickiness
  -25, //Wall Slide-Y
  400, //Downwards-S
  10, //OverLap Bias
);

////////////////////////Creation of Gun System Sets///////////////////////

// var basicGunSet = [
//   //Name, Tint, FireRate, Speed, Power
//   new weaponCreator('pull', Phaser.Color.GREEN, 500, 500, 300),//Weapon 1
//   new weaponCreator('push', Phaser.Color.BLUE, 500, 500, 3),//Weapon 2
//   new weaponCreator('stop', Phaser.Color.VIOLET, 500, 500),//Weapon 3
//   null, //Weapon 4
// ];

var basicGunSet = [
  //Name, Tint, FireRate, Speed, Power
  new weaponCreator('pull', Phaser.Color.GREEN, 300, 800, 600),//Weapon 1
  new weaponCreator('push', Phaser.Color.BLUE, 300, 800, 2),//Weapon 2
  new weaponCreator('stop', Phaser.Color.VIOLET, 300, 800),//Weapon 3
  null, //Weapon 4
];


var funGunSet = [
  //Name, Tint, FireRate, Speed
  new weaponCreator('pull', Phaser.Color.GREEN, 250, 1000, 300),//Weapon 1
  new weaponCreator('push', Phaser.Color.BLUE, 250, 1000, 3),//Weapon 2
  new weaponCreator('stop', Phaser.Color.VIOLET, 250, 1000),//Weapon 3
  null, //Weapon 4
];

var testGunSet = [
  //Name, Tint, FireRate, Speed
  null, //Weapon 1
  null, //Weapon 2
  null, //Weapon 3
  null, //Weapon 4
];