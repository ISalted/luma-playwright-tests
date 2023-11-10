// Loops

var cars = ["Volvo", "Toyota", "Tesla"]

for( i=0; i<3; i++){
    // console.log(car[i])
}

for (let car of cars) {
    console.log(car)
    if (car == "Toyota"){
        break
    }
}

cars.forEach(car=>{
    console.log(car)
})

