/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort



async function bubbleSort(array){
    for (var i = 0; i < array.length - 1; i++ ){
        //console.log(array);
        //console.log(array[i]);
        for (var j = array.length - 1; j > i + 1; j--){
            //console.log(array[j].value)
            //console.log(array);
            if (array[j].value < array[j-1].value){
                swap(array, j,j-1);
                updateCounter(bubbleCounter);
                await sleep();
            }
        }
    }
}

// TODO 3: Implement quickSort

async function quickSort(array, left, right){
    if (right-left > 0){
        var index = await partition(array, left, right);
        if (left < index-1){
            quickSort(array, left, index-1)
        }
        if (index < right){
            quickSort(array, index, right)
        }
    }
}

// TODOs 4 & 5: Implement partition

async function partition(array, left, right){
    //console.log(left);
    //console.log(right);
    pivot = array[Math.floor((right + left)/2)].value;
    //console.log(pivot);
    while (left < right){
        while (array[left].value < array[left+1].value){
            while (array[right].value > array[right-1].value){
                if (left < right){
                    //console.log(array[left]);
                    //console.log(array[right]);
                    swap(array, array[right].value, array[left].value);
                    updateCounter(quickCounter);
                    await sleep();
                    return left + 1
                }
            }
        }
    }

}
// TODO 1: Implement swap

function swap(array, i, j){
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    drawSwap(array, i, j);
}
    





///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}