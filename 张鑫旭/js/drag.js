var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};
//获取相关CSS属性
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};

//拖拽的实现
var startDrag = function(bar, target, callback){
	if(getCss(target, "left") !== "auto"){
		params.left = getCss(target, "left");
	}
	if(getCss(target, "top") !== "auto"){
		params.top = getCss(target, "top");
	}
	//o是移动对象
	bar.onmousedown = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}  
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
	};
	document.onmouseup = function(){
		params.flag = false;	
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
	};
	document.onmousemove = function(event){
		var e = event ? event: window.event;
		var X,Y,targetWidth = parseInt(getCss(target, "width"))+2*parseInt(getCss(target, "padding"))
		targetHeight = parseInt(getCss(target, "height"))+2*parseInt(getCss(target, "padding")),scrollX,scrollY;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;
			scrollX = getCss(target, "position") == 'fixed'?0:document.body.scrollTop | document.documentElement.scrollTop;
			scrollY = getCss(target, "position") == 'fixed'?0:document.body.scrollLeft | document.documentElement.scrollLeft;
			X = parseInt(params.left) + disX;
			Y = parseInt(params.top) + disY;
			X<scrollX && (X = scrollX);
			(X>document.documentElement.clientWidth - targetWidth+scrollX)&&(X=document.documentElement.clientWidth - targetWidth+scrollX);
			Y<scrollY && (Y = scrollY);
			(Y>document.documentElement.clientHeight - targetHeight+scrollY)&&(Y=document.documentElement.clientHeight - targetHeight+scrollY);
			target.style.left = X + "px";
			target.style.top = Y + "px";
			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
		
		if (typeof callback == "function") {
			callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
		}
	}	
};