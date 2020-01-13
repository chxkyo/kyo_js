var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return 'Hello, ' + this.greeting;
    };
    return Greeter;
}());
var ins = new Greeter('hello kyo');
console.log(ins.greet());
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceMeters) {
        console.log(this.name + " moved " + distanceMeters + "m.");
    };
    return Animal;
}());
var animal = new Animal('houzi');
animal.move();
console.log(animal.name);
