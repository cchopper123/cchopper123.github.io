// This makes the arguments variable behave the way we want it to and a few
// other things. For more info:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

// const { isInteger } = require("lodash");

var _ = {};
var number=3;

/**
* START OF OUR LIBRARY!
* Implement each function below it's instructions
*/

/** _.identity
* Arguments:
*   1) Any value
* Objectives:
*   1) Returns <value> unchanged
* Examples:
*   _.identity(5) === 5
*   _.identity({a: "b"}) === {a: "b"}
*/

_.identity=function(number){
    return number
}

/** _.indexOf
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrance of <value>
*   2) Return -1 if <value> is not in <array>
* Edge Cases:
*   1) What if <array> has multiple occurances of val?
*   2) What if <val> isn't in <array>?
* Examples:
*   _.indexOf(["a","b","c"], "c") -> 2
*   _.indexOf(["a","b","c"], "d") -> -1
*/
var array = ["a","b","c"];
var value = "b"

_.indexOf=function(array, value){
    for (var i=0; i<array.length; i++){
        if (array[i]==value){
            return i
        }   
    }
    return -1
} 

/** _.contains
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
* Edge Cases:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/

var array1 = [1,"two", 3.14];
var value1="two"
_.contains=function(array1, value1){
    for (var i=0; i<array1.length; i++){
        if (array1[i]===value1){
            return true
        }
    }
    return false
}

/** _.each
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array (it should be), call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
* Examples:
*   _.each(["a","b","c"], function(e,i,a){ console.log(e)});
*      -> should log "a" "b" "c" to the console
*/
var collection =["a","b","c"];
//console.log(collection)
//is called to log all the indexes form collection

_.each=function(collection, happy){
if (Array.isArray(collection)===true){
    //console.log(collection.length)
    for (var i = 0; i<collection.length; i++){
        happy(collection[i], i, collection)
    }
    //checks if it is an array
}
    //console.log(collection)
}
function happy(collection){
    
}

/** _.filter
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Edge Cases:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Challenge:
*   use _.each in your implementation
*/


_.filter=function(array2, callback){
    var results=[];
    if (Array.isArray(array2)===true){
        for (var i = 0; i<array2.length; i++){
            if (callback(array2[i], i, array2)===true){
                results.push(array2[i]);
            }
         
        }
        //checks if it is an array
    }
        return results
    }

    var numbers = [1, 2, 3, 4, 5, 6, 7]
const evenNumbers = _.filter(numbers, function(val) {
    if(val % 2 === 0){
        return true
    }
})
console.log(evenNumbers)

/** _.reject
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter()
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
*/



/** _.map
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) if <collection> is an array (it should be), call <function> once for each element
*      with the arguments:
*         the element, it's index, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/



//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = _;
}
