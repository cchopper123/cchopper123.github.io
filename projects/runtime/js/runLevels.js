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
    
    

    function createReward(x, y){
      var reward = game.createGameItem("reward", 25);
      var yellowStar = draw.rect(30, 30, "yellow");
      yellowStar.x = -25;
      yellowStar.y = -25;
      reward.addChild(yellowStar);
      reward.x = 400;
      reward.y = groundY - 50;
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocity = 1;
      reward.velocityX = -0.5;
      reward.rotationalVelocity = 1;
      reward.onPlayerCollision = function(){

        game.increaseScore(100);
        game.changeIntegrity(+10)
        reward.fadeOut();
      };
      reward.onProjectileCollision = function(){

        reward.fadeOut();
      };
    }
    createReward(800, groundY - 50);

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
    
    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = 400;
      enemy.y = groundY - 50;
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocity = 1;
      enemy.velocityX = -0.5;
      enemy.rotationalVelocity = 1;
      enemy.onPlayerCollision = function(){
        game.changeIntegrity(-10)
      };
      enemy.onProjectileCollision = function(){
        game.increaseScore(100);
        enemy.fadeOut();
      };
      
      
    }
    createEnemy(400, groundY - 50);
    createEnemy(450, groundY - 50);

  function createMarker(x, y){
    var marker = game.createGameItem("marker", 25);
    var flag = draw.rect(50, 50, "green");
    flag.x = -25;
    flag.y = -25;
    marker.addChild(flag);
    marker.x = 400;
    marker.y = groundY - 50;
    marker.x = x;
    marker.y = y;
    game.addGameItem(marker);
    marker.velocity = 1;
    marker.velocityX = -0.5;
    marker.rotationalVelocity = 1;
    marker.onPlayerCollision = function(){
      startLevel();
    };
    marker.onProjectileCollision = function(){
      startLevel();
    };
  }
  createMarker(900, groundY - 50)


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
