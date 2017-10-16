define(function(require, exports, module){  
    //1，define intenal variable area//变量定义区  
    var moduleName = "hellow module";  
    var version = "1.0.0";  
      
    //2，define intenal funciton area//函数定义区  
    var getObj = function(id){  
        return document.getElementById(id+"");        
    };  
    exports.alert = function(a){  
        alert(a);     
    };  
      
    exports.initEvent = function(){  
        var myObj = getObj('div01');  
        myObj.onmouseover = function(){  
            myObj.style = "border:3px solid blue;"  
        };  
          
        myObj.onmouseout = function(){  
            myObj.style = "border:1px solid red;"  
        };  
          
        var myObj2 = getObj('div02');  
        myObj2.onmouseover = function(){  
            myObj2.className = "div02 alignRight";  
        };  
          
        myObj2.onmouseout = function(){  
            myObj2.className = "div02";  
        };        
    };  
      
    //3，export this module API for outside other module  
    //暴露本模块API给外部其它模块使用  
    module.exports = exports;  
      
    //4，auto run initEvent function when module loaded finish  
    //启用时在加载完将自动运行某方法  
    //exports.initEvent();  
      
});  