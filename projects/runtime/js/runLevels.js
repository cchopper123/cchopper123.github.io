var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE


    function createSawBlade(){
      var hitZoneSize = 25;
      var obstacleImage = draw.bitmap("img/sawblade.png");
      var damageFromObstacle = 10;
      
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      // sawBladeHitZone.x = 500;
      // sawBladeHitZone.y = 50;
      sawBladeHitZone.x = Math.random() * (900 - 500) + 500;
      sawBladeHitZone.y = Math.random() * (350 - 50) + 50;
      game.addGameItem(sawBladeHitZone);
      obstacleImage.width = 3
      obstacleImage.height = 3
      sawBladeHitZone.addChild(obstacleImage);
      
    }
    createSawBlade();
    createSawBlade();
    createSawBlade();
    createSawBlade();
    createSawBlade();
    
    function createEnemy(){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = 400;
      enemy.y = groundY - 50;
      game.addGameItem(enemy);
      enemy.velocity = 1;
      enemy.velocityX = -1;
      enemy.rotationalVelocity = 1;
      
    }
    createEnemy();

    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
