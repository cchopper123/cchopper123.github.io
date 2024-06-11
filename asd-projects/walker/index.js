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
    RIGHT : 39
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                            // change 'eventType' to the type of event you want to handle
  
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

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    walker.speedx = 0;
    walker.speedy = 0; 

  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT){
      walker.speedx = -5;
      console.log(walker.speedx);
    }
    if (event.which === KEY.RIGHT){
      walker.speedx = +5;
      console.log(walker.speedx);
    }
    if (event.which === KEY.UP){
      walker.speedy = -5;
      console.log(walker.speedy);
    }
    if (event.which === KEY.DOWN){
      walker.speedy = -5;
      console.log(walker.speedy);
    }

  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.x += walker.speedx;
    walker.y += walker.speedy;
    // update the position of the box along the x-axis
  }
  function redrawGameItem(){
    $("#walker").css("left", walker.x);
    $("#walker").css("up", walker.y); 

    // draw the box in the new location, positionX pixels away from the "left"
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
