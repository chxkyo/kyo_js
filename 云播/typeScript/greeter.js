var Student = /** @class */ (function () {
    function Student(firstName, middle, lastName) {
        this.firstName = firstName;
        this.middle = middle;
        this.lastName = lastName;
        this.fullName = this.firstName + this.middle + this.lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("cao", "heng", "xing");
document.body.innerHTML = greeter(user);
var str = 'this is a string';
var strNmuber = str.length;
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
