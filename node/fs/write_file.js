var fs = require("fs");
fs.writeFile("input.txt","哈撒给",function(err){
	if(err){
		return console.err(err); 
	}
	fs.readFile("input.txt",function(err,data){
		if(err){
			return cosole.error(err);
		}
		console.log("异步读取数据:"+data.toString());
	});
})
