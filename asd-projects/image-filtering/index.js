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

  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(increaseGreenByBlue);

  

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

function applyFilterNoBackground(filterFunction){
  var backgroundColor = image[0][0];
  console.log(backgroundColor);
  for (var i = 0; i < image.length; i++) {
    for (var j = 0; j < image[i].length; j++) {
      if (backgroundColor != image[i][j]){
        var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);

      filterFunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
      }
  }
}
  
  

}
// TODO 5: Create the keepInBounds function
function keepInBounds(rgbNumbers){
  rgbNumbers = (rgbNumbers < 0)  ? 0 : rgbNumbers;
  rgbNumbers  = (rgbNumbers > 255) ? 255 : rgbNumbers;
  return rgbNumbers;
  // rgbNumbers = Math.min(rgbNumbers, 30);
  // rgbNumbers = Math.max(rgbNumbers, 255);
  
  // let rgbNumbers =  255 < rgbNumbers < 0? return 255 : return 0
  //   : score > 50
  //   ? "Average"
  //   : score > 40
  //   ? "Fair"
  //   : "Do better"
  
  // if (rgbNumbers < 0){
  //   return 0
  // }
  // if (rgbNumbers > 255){
  //   return 255
  // }
  // if (rgbNumbers > 0 && rgbNumbers < 255 ){
  //   return rgbNumbers
  // }

}


// TODO 3: Create reddify function
function reddify(rgbNumbers){
  rgbNumbers[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(rgbNumbers){
  rgbNumbers[BLUE] = keepInBounds(rgbNumbers[BLUE]-50);

}
function increaseGreenByBlue(rgbNumbers){
  rgbNumbers[GREEN] = keepInBounds(rgbNumbers[BLUE] + rgbNumbers[GREEN]);
}

// CHALLENGE code goes below here
