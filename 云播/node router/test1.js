var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

var router = express.Router();
router.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
});
router.get("/",function(req,res){
	res.send("home page!");
});
router.get("/about",function(req,res){
	res.send("about page!");
});
app.use("/app",router);
app.listen(port);
