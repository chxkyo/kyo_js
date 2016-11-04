
function route(hanlde,pathname){
	console.log("About to route a request for"+pathname);
	if(typeof handle[pathname] === "function"){
		hanlde[pathname]();
	}else{
		console.log("No request hanlder for "+ pathname);
	}
}
exports.handle = route;