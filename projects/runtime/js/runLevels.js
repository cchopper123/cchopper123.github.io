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
      // reward.x = 400;
      // reward.y = groundY - 50;
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

    function createSawBlade(x, y){
      var hitZoneSize = 25;
      var obstacleImage = draw.bitmap("img/sawblade.png");
      var damageFromObstacle = 10;
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      sawBladeHitZone.x = x;
      sawBladeHitZone.y = y;
      //sawBladeHitZone.x = Math.random() * (900 - 500) + 500;
      //sawBladeHitZone.y = Math.random() * (350 - 50) + 50;
      game.addGameItem(sawBladeHitZone);
      obstacleImage.width = 3
      obstacleImage.height = 3
      sawBladeHitZone.addChild(obstacleImage);
      
    } 
    
    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.rect(50, 50, "red");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      //enemy.x = 400;
      //enemy.y = groundY - 50;
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
    

  function createMarker(x, y){
    var marker = game.createGameItem("marker", 25);
    var flag = draw.rect(50, 50, "green");
    flag.x = -25;
    flag.y = -25;
    marker.addChild(flag);
    //marker.x = 400;
    //marker.y = groundY - 50;
    marker.x = x;
    marker.y = y;
    game.addGameItem(marker);
    marker.velocity = 1;
    marker.velocityX = -0.5;
    marker.rotationalVelocity = 1;
    //debugger;
    marker.onPlayerCollision = function(){
      console.log("bam");
      startLevel();
    };
    marker.onProjectileCollision = function(){
      console.log("bam");
      startLevel();
    };
  }

    function startLevel() {

      // TODO 13 goes below here

      var level = levelData[currentLevel]
   
      //console.log(level);
      var levelObjects = level.gameItems
      // console.log(levelObjects);
      // console.log(levelObjects[0]);
      // console.log(levelObjects[1]);
      // console.log(levelObjects[2]);
      // console.log(levelObjects[3]);
      // console.log(levelObjects[4]);
      // console.log(levelObjects[5]);
      for (var i = 0; i < levelObjects.length; i++){
        object = levelObjects[i];
        //console.log(object.type);
        
        if (object.type === "sawblade"){
          //sawBladeHitZone.x = Math.random() * (900 - 500) + 500;
          //sawBladeHitZone.y = Math.random() * (350 - 50) + 50;
          //console.log(object.type);
          //console.log(object.x, object.y);
          createSawBlade(object.x, object.y);
        }
        if (object.type === "enemy"){
          //console.log(object.type);
          //console.log(object.x, object.y);
          createEnemy(object.x, object.y);
        }
        if (object.type === "reward"){
          //console.log(object.type);
          //console.log(object.x, object.y);
          createReward(object.x, object.y);
        }
        if (object.type === "marker"){
          //console.log(object.type);
          //console.log(object.x, object.y);
          createMarker(object.x, object.y);
        }
        
      }
      

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
