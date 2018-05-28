/*!

 @Title: Layui
 @Description：经典模块化前端框架
 @Site: www.layui.com
 @Author: 贤心
 @License：MIT

 */
 
;!function(win){
  "use strict";

  var doc = document, config = {
    modules: {} //记录模块物理路径
    ,status: {} //记录模块加载状态
    ,timeout: 10 //符合规范的模块请求最长等待秒数
    ,event: {} //记录模块自定义事件
  }

  ,Layui = function(){
    this.v = '2.2.3'; //版本号
  }

  //记录基础数据
  Layui.prototype.cache = config;

  //获取节点的style属性值
  Layui.prototype.getStyle = function(node, name){
    var style = node.currentStyle ? node.currentStyle : win.getComputedStyle(node, null);
    return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
  };


  //图片预加载
  Layui.prototype.img = function(url, callback, error) {   
    var img = new Image();
    img.src = url; 
    if(img.complete){
      return callback(img);
    }
    img.onload = function(){
      img.onload = null;
      callback(img);
    };
    img.onerror = function(e){
      img.onerror = null;
      error(e);
    };  
  };

  //全局配置
  Layui.prototype.config = function(options){
    options = options || {};
    for(var key in options){
      config[key] = options[key];
    }
    return this;
  };

  //拓展模块
  Layui.prototype.extend = function(options){
    var that = this;

    //验证模块是否被占用
    options = options || {};
    for(var o in options){
      if(that[o] || that.modules[o]){
        error('\u6A21\u5757\u540D '+ o +' \u5DF2\u88AB\u5360\u7528');
      } else {
        that.modules[o] = options[o];
      }
    }

    return that;
  };

  //路由解析
  Layui.prototype.router = function(hash){
    var that = this
    ,hash = hash || location.hash
    ,data = {
      path: []
      ,search: {}
      ,hash: (hash.match(/[^#](#.*$)/) || [])[1] || ''
    };
    
    if(!/^#\//.test(hash)) return data; //禁止非路由规范
    hash = hash.replace(/^#\//, '').replace(/([^#])(#.*$)/, '$1').split('/') || [];
    
    //提取Hash结构
    that.each(hash, function(index, item){
      /^\w+=/.test(item) ? function(){
        item = item.split('=');
        data.search[item[0]] = item[1];
      }() : data.path.push(item);
    });

    return data;
  };

  //本地存储
  Layui.prototype.data = function(table, settings){
    table = table || 'layui';
    
    if(!win.JSON || !win.JSON.parse) return;
    
    //如果settings为null，则删除表
    if(settings === null){
      return delete localStorage[table];
    }
    
    settings = typeof settings === 'object' 
      ? settings 
    : {key: settings};
    
    try{
      var data = JSON.parse(localStorage[table]);
    } catch(e){
      var data = {};
    }
    
    if('value' in settings) data[settings.key] = settings.value;
    if(settings.remove) delete data[settings.key];
    localStorage[table] = JSON.stringify(data);
    
    return settings.key ? data[settings.key] : data;
  };

  //设备信息
  Layui.prototype.device = function(key){
    var agent = navigator.userAgent.toLowerCase()

    //获取版本号
    ,getVersion = function(label){
      var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
      label = (agent.match(exp)||[])[1];
      return label || false;
    }
    
    //返回结果集
    ,result = {
      os: function(){ //底层操作系统
        if(/windows/.test(agent)){
          return 'windows';
        } else if(/linux/.test(agent)){
          return 'linux';
        } else if(/iphone|ipod|ipad|ios/.test(agent)){
          return 'ios';
        } else if(/mac/.test(agent)){
          return 'mac';
        } 
      }()
      ,ie: function(){ //ie版本
        return (!!win.ActiveXObject || "ActiveXObject" in win) ? (
          (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
        ) : false;
      }()
      ,weixin: getVersion('micromessenger')  //是否微信
    };
    
    //任意的key
    if(key && !result[key]){
      result[key] = getVersion(key);
    }
    
    //移动设备
    result.android = /android/.test(agent);
    result.ios = result.os === 'ios';
    
    return result;
  };

  //提示
  Layui.prototype.hint = function(){
    return {
      error: error
    }
  };

  //遍历
  Layui.prototype.each = function(obj, fn){
    var key
    ,that = this;
    if(typeof fn !== 'function') return that;
    obj = obj || [];
    if(obj.constructor === Object){
      for(key in obj){
        if(fn.call(obj[key], key, obj[key])) break;
      }
    } else {
      for(key = 0; key < obj.length; key++){
        if(fn.call(obj[key], key, obj[key])) break;
      }
    }
    return that;
  };

  //将数组中的对象按其某个成员排序
  Layui.prototype.sort = function(obj, key, desc){
    var clone = JSON.parse(
      JSON.stringify(obj || [])
    );
    
    if(!key) return clone;
    
    //如果是数字，按大小排序，如果是非数字，按字典序排序
    clone.sort(function(o1, o2){
      var isNum = /^-?\d+$/
      ,v1 = o1[key]
      ,v2 = o2[key];
      
      if(isNum.test(v1)) v1 = parseFloat(v1);
      if(isNum.test(v2)) v2 = parseFloat(v2);
      
      if(v1 && !v2){
        return 1;
      } else if(!v1 && v2){
        return -1;
      }
        
      if(v1 > v2){
        return 1;
      } else if (v1 < v2) {
        return -1;
      } else {
        return 0;
      }
    });

    desc && clone.reverse(); //倒序
    return clone;
  };

  //阻止事件冒泡
  Layui.prototype.stope = function(e){
    e = e || win.event;
    e.stopPropagation 
      ? e.stopPropagation() 
    : e.cancelBubble = true;
  };

  win.layui = new Layui();

}(window);

