interface LabelledValue{
	label:string
}
function printLabel(labelled: LabelledValue){
	console.log(labelled.label);
}
let myObj = {size:10,label:'Size 10 Object'};

printLabel(myObj)
let arr: number[] = [1,2,3];
let ro: ReadonlyArray<number> = arr;