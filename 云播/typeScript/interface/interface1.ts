interface squareConfig{
	color?:string;
	width?:number;
}
function createSquare(config:squareConfig):{color:string;area:number}{
	let newSquare = {color:"white",area:100};
	if(config.color){
		newSquare.color = config.color;
	}
	if(config.width){
		newSquare.area = config.width * config.width;
	}
	return newSquare
}
let mySquare = createSquare({colour:'black'})
let arr:Array<number> = [0,1,2,3]
let noArr:ReadonlyArray<number> = arr
interface SearchFun{
	(source:string,substring:string):boolean;
}
let mySearch:SearchFun;
mySearch = function(source:string,substring:string){
	let reault = source.search(substring);
	return reault>-1;
}
interface StringArray{
	[index:number]:string;
}
let myArr:StringArray;
myArr = ["Bob","hhaa"];
let myStr:string = myArr[0];
console.log(myStr)
