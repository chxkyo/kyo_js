var http = require("http");
var url = require("url");
var data =　{
	'name':"kYo",
	'age':'23'
}
http.createServer(function(req,res){
	var params = url.parse(req.url,true);
	console.log(params.query);
	if(params.query){
		if(params.query.userid == "007"){
			if(params.query.callback){
				var result = params.query.callback+"("+JSON.stringify(data)+")";
				console.log(result)
				res.end(result);
			}else{
				res.end(JSON.stringify(data));
			}
		}
	}
}).listen(8888);
