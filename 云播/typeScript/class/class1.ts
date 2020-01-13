class Greeter{
	greeting:string;
	constructor(message:string){
		this.greeting = message
	}
	greet(){
		return 'Hello, ' + this.greeting
	}
}
let ins = new Greeter('hello kyo')
console.log(ins.greet())
class Animal{
	private name:string
	public constructor(theName:string){
		this.name = theName
	}
	public move(distanceMeters:number){
		console.log(`${this.name} moved ${distanceMeters}m.`)
	}
}
let animal = new Animal('houzi')
animal.move()
console.log(animal.name)
