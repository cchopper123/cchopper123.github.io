/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var walker_1 = {
    x : 50,
    y : 50,
    speedx : 0,
    speedy : 0
  }
  var walker = {
    x : 0,
    y : 0,
    speedx : 0,
    speedy : 0
  }
  const KEY ={
    ENTER : 13,
    LEFT : 37,
    UP : 38,
    DOWN : 40,
    RIGHT : 39,
    W : 87,
    S: 83, 
    A: 65,
    D: 68
  };

  // one-time setup

  $("#board").append('<div id="walker_1"></div>');
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);

  //$("#walker").on("click", change_Color);
  //$("#walker_1").on("click", change_Color);

  $("#walker").on( "click", { id: "#walker" }, change_Color);
  $("#walker_1").on( "click", { id: "#walker_1" }, change_Color);


  //$("#walker").on("click", change_Color); 


    function change_Color(event) {
      
      var randomColor = "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
      $(event.data.id).css('background-color', randomColor);
    } ;
    

   

                              // change 'eventType' to the type of event you want to handle
  //$(document).getElementById("#walker").addEventListener("click", change_Color);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    findDistance();
    wallCollision();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT){
      walker.speedx = 0;
    }
    if (event.which === KEY.RIGHT){
      walker.speedx = 0;
    }
    if (event.which === KEY.UP){
      walker.speedy = 0;
    }
    if (event.which === KEY.DOWN){
      walker.speedy = 0;
    }
    if (event.which === KEY.A){
      walker_1.speedx = 0;
    }
    if (event.which === KEY.D){
      walker_1.speedx = 0;
    }
    if (event.which === KEY.W){
      walker_1.speedy = 0;
    }
    if (event.which === KEY.S){
      walker_1.speedy = 0;
    }
  }

  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      walker.speedx = -5;
    }
    if (event.which === KEY.RIGHT){
      walker.speedx = 5;
    }
    if (event.which === KEY.UP){
      walker.speedy = -5;
    }
    if (event.which === KEY.DOWN){
      walker.speedy = 5;
    }
    if (event.which === KEY.A){
      walker_1.speedx = -5;
      
    }
    if (event.which === KEY.D){
      walker_1.speedx = 5;
    }
    if (event.which === KEY.W){
      walker_1.speedy = -5;
    }
    if (event.which === KEY.S){
      walker_1.speedy = 5;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

    //find circumference
    //not an event an object
    function findDistance(){
        var r = parseFloat($("#walker").css('height'))/2;
        walker.rad = r;
        var r2 = parseFloat($("#walker_1").css('height'))/2;
        walker_1.rad = r2;
        var distance = Math.hypot(walker.x-walker_1.x, walker.y-walker_1.y);
        if (distance <= walker.rad + walker_1.rad){
          console.log("AIR")
          playerCollision(walker, walker_1);
        }
      }
    
  function playerCollision(walker, walker_1){
    console.log("AIR");
    //how to add onto the board's width + 10
    //access the number then + 10 and put it back in
    var bo = parseFloat($("#board").css('width'));
    let root = document.getElementById("board").style;
    root = root + 10 + " px";
    document.getElementById("board").width = bo + 100;
    
    //bo + 100 = $("#board").css('width');
    console.log(bo);
    walker.x = walker.x - walker.speedx;
    walker.y = walker.y - walker.speedy;
    walker_1.x = walker_1.x - walker_1.speedx;
    walker_1.y = walker_1.y - walker_1.speedy;

    walker.speedx = -1 * walker.speedx;
    walker.speedy = -1 * walker.speedy;
    walker_1.speedx = -1 * walker_1.speedx;
    walker_1.speedy = -1 * walker_1.speedy;
  }
  
  //add an out of bounds to prevent more bugs (or glitiches i think)
  function wallCollision(){
    const boardx = $("#board").width();
    const boardy = $("#board").height();

    if (walker.x > boardx - 50|| walker.y > boardy-50){
      walker.x = walker.x - walker.speedx
      walker.y = walker.y - walker.speedy 
    }
    if (walker.x < 0 || walker.y < 0){
      walker.x = walker.x - walker.speedx
      walker.y = walker.y - walker.speedy 
    }
    if (walker_1.x > boardx - 50|| walker_1.y > boardy-50){
      walker_1.x = walker_1.x - walker_1.speedx
      walker_1.y = walker_1.y - walker_1.speedy 
    }
    if (walker_1.x < 0 || walker_1.y < 0){
      walker_1.x = walker_1.x - walker_1.speedx
      walker_1.y = walker_1.y - walker_1.speedy 
    }
  }

  function repositionGameItem(){
    
    walker.x += walker.speedx;
    walker.y += walker.speedy;

    walker_1.x += walker_1.speedx;
    walker_1.y += walker_1.speedy;
    // update the position of the box along the x-axis
  }
  function redrawGameItem(){
    $("#walker").css("left", walker.x);
    $("#walker").css("right", walker.x); 
    $("#walker").css("top", walker.y); 
    $("#walker").css("bottom", walker.y); 

    $("#walker_1").css("left", walker_1.x);
    $("#walker_1").css("right", walker_1.x); 
    $("#walker_1").css("top", walker_1.y); 
    $("#walker_1").css("bottom", walker_1.y); 

    // draw the box in the new location, positionX pixels away from the "left"
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
