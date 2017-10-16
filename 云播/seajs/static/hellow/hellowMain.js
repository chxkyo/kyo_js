define(function(require, exports, module){  
    //1,define intenal variable area//变量定义区  
    var moduleName = "hellow module";  
    var version = "1.0.0";  
          
    //2,load each dependency   
    var workjs = require("hellow");  
          
    //3,define intenal funciton area//函数定义区  
    exports.loadTip = function(refConId){  
        var tipMsg = "module is loaded finish.";  
        if(undefined === refConId || null === refConId || "" === refConId+""){  
            alert(tipMsg);  
        }else{  
            document.getElementById(refConId+"").innerHTML = tipMsg;  
        }  
    };  
      
    exports.initEvent = function(){       
        workjs.initEvent();  
        exports.loadTip();  
    };  
      
    //4,export this module API for outside other module  
    //暴露本模块API给外部其它模块使用  
    module.exports = exports;  
      
    //5,auto run initEvent function when module loaded finish  
    //启用时在加载完将自动运行某方法  
    //exports.initEvent();  
      
});  