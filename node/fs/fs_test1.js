
var fs = require("fs");
fs.readFile("input.txt",function(err,data){
	if(err){
		return console.error(err);
	}
	console.log("异步读取的数据为:"+data.toString());
});

var data = fs.readFileSync('input.txt');
console.log("同步读取："+data.toString());
console.log("程序执行完毕!!!");

fs.stat('input.txt',function(err,stats){
	console.log(stats.isFile());
})
