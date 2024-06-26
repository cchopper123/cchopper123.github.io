//Functions

function add(a, b){
    var sum = a + b;
    return sum;
}

var x = add(5, 3); // function is called and stored into a variable
console.log(add(1,2)); // function is called and result shows up in the console
add(100, 200); // function is called

//Functions can: perform actions (actions are done in code block), 
//accept inputs (arguements and parameters), 
//be reused as many times (function(args)),
//resolve to a data value (their result is stored into a variable or returned by the function)

//Statements perform actions
add(3,5) // calls teh function and resolves into a data value it is a statement and expression

//Expressions resolve to a data value
"hale" + 'bot' // turns into halebot