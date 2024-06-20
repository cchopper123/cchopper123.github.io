var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 50  },
          { type: "sawblade", x: 500, y: groundY - 50  },
          { type: "sawblade", x: 600, y: groundY - 50 },
          { type: "enemy", x: 700, y: groundY - 50 },
          { type: "reward", x: 800, y: groundY - 50 },
          { type: "marker", x: 900, y: groundY - 50 }
        ],
      },
    ];

    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
