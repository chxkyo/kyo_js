var express = require('express')
var app = express();
app.get("/",function(req,res){
	res.send('Hello World');
})
var server = app.listen(8081,function(){
	var host = server.address().host;
	var port = server.address().port;
	console.log(host);
	console.log(port);
})
