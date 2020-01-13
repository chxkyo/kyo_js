function buildName(firstName:string,...restName:Array<string>){
	return firstName + restName.join('');
}
let name = buildName("chx","kyo1","kyo2","kyo3")
