// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for (var i = 0; i < image.length; i++) {
  for (var j = 0; j < image[i].length; j++) {
    var rgbString = image[i][j];
    var rgbNumbers = rgbStringToArray(rgbString);
    
    // rgbNumbers[RED] = 0;
    // rgbNumbers[GREEN] = 0;
    // rgbNumbers[BLUE] = 255;
    filterFunction(rgbNumbers);
    rgbString = rgbArrayToString(rgbNumbers);
    image[i][j] = rgbString;
    
    // console.log(rgbNumbers);
      // for (var c = 0; c <image.length; c++){
      //   console.log(rgbNumbers[c])
      // }
      

  }
}


}

// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function
function keepInBounds(rgbNumbers){
  
  
  // let x =  255 < x < 0? return 255 : return 0
  //   : score > 50
  //   ? "Average"
  //   : score > 40
  //   ? "Fair"
  //   : "Do better"
  // let x = x < 0  || ||? return : c
  // if ( < 0){
  //   return 0
  // }
  // if ( > 255){
  //   return 255
  // }
  // if ( > 0 && < 255 ){
  //   return 255
  // }
  // if ( < ){
  //   return 
  // }
  // if ( < ){
  //   return 0
  // }
}

// TODO 3: Create reddify function
function reddify(rgbNumbers){
  rgbNumbers[RED] = 200;
}

// TODO 6: Create more filter functions


// CHALLENGE code goes below here
