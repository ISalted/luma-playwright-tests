var price = 50
var itemName = "Table"
var messageToPrint = "Your price for your " + itemName + " is " + price +" dollars" // concatination
var messageToPrint2 = `Your price for your ${itemName} is ${price} dollars` // Interpolation
console.log(messageToPrint2)
