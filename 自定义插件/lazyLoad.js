/*
 * created by kYo 2016/8/22 
 * 纯属模仿 
 */
 (function(){
 	var lazyLoad = function(){};
 	//图片加载次数
 	var donwnLoad = 0,
 		//存放懒加载图片数组
 		eleObj = [];
 	lazyLoad.prototype = {
 		init:function(){

 		},
 		getPosition:{
 			//浏览器视口高度
 			Viewport:function(){
 				if(document.compatMode == "BackCompat"){
 					var height = document.body.clientHeight;
 				}else{
 					var height = document.documentElement.clientHeight;
 				}
 				return height;
 			},
 			//取得滚动高度
 			getScrollTop:function(){
 				if(document.compatMode == "BackCompat"){
 					var scrollTop = document.body.scrollTop;
 				}else{
 					var scrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : docuemnt.documentElement.scrollTop;
 				}
 				return scrollTop;
 			},
 			//元素距离页面顶部与滚动距离之差
 			getElementTop:function(ele){
 				if(ele){
 					var elementTop = ele.offsetTop;
 					var parent = ele.offsetParent;
 					while(parent != null){
 						elementTop += parent.offsetTop;
 						parent = ele.offsetParent;
 					} 
 				}
 				return elementTop-this.getScrollTop();
 			}
 		},
 		initElementMap:funciton(){
 			var el = document.getElementsByTagName("img");
 			for(var i = 0,len = el.length;i<len;i++){
 				if(typeof(el.getAttribute("lazy-load"))){
 					eleObj.push(el[i]);
 					downLoad++;
 				}
 			}
 		},
 		lazy:function(){
 			if(!downLoad)return;
 			var innerHeight = this.getPosition.viewPort();
 		}
 	}

 })