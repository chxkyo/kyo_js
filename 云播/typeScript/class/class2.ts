class Octopus{
	readonly name:string
	readonly numberOfLegs:number = 8 
	constructor(theName:string){
		this.name = theName
	}
}
let passcode = 'secret passcode'
class Employee{
	private _fullName:string
	get fullName():string{
		return this._fullName
	}
	set fullName(newName:string){
		if(passcode && passcode === 'secret passcode'){
			this._fullName = newName
		}else{
			console.log("Error: Unauthorized update of employee!")
		}
	}
}
let employee = new Employee()

employee.fullName = 'kyo'
if(employee.fullName){
	console.log(employee.fullName)
}
