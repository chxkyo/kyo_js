var route = require("./route");
var handle = require("./hanlde");
var server = require("./server");

//默认路径调用handle里的start 
handle["/"] = hanle.start;
handle["/start"] = hanlde.start;
handle["/uplaod"] = hanlde.upload;

server.start(route.route,handle);
