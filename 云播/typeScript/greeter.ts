class Student{
	fullName:string;
	constructor(public firstName,public middle,public lastName){
		this.fullName = this.firstName + this.middle + this.lastName;
	}
}
interface Person{
	firstName:string,
	lastName:string
}
function greeter(person:Person) {
    return "Hello, " + person.firstName + " "+person.lastName;
}

let user = new Student("cao","heng","xing");

document.body.innerHTML = greeter(user);
let str: any = 'this is a string';
let strNmuber: number = (str as string).length;
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;

