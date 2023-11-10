// Declarative function
function helloWorld(){
    console.log("Hello world")
}

helloWorld()

// Anoymus function
var helloTwo = function(){
    console.log("Hello world 2")
}

helloTwo()

//ES6 function or arrow function

var helloThree = () => {
    console.log("Hello world 3")
}

helloThree()

// Function with arguments
function printName(name){
    console.log(name)
}
printName("John")

// improt function / need to add 'type': 'module' in package.json.
import { printAge } from "../helpers/printHelper.js"
printAge(5)

//import everething
import * as helper from "../helpers/printHelper.js"
helper.printAge(6)
