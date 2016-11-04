var http = require("http"),url = require("url"),
util = require("util");
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end(util.inspect(url.parse(req.url,true)));
}).listen("8088");
