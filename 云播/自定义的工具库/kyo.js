/**
 * @author kYo
 * created 2017/1/5
 */
(function(exports, doc) {
	function tool() {}
	tool.prototype = {
		getPosition: {
			/*
           	  获取窗口的高度
             document.documentElement.clientHeight    IE/CH支持
             document.body.client    通过body元素获取内容的尺寸
             */
			/*获取当前元素相对于窗口顶部的距离*/
			/*
			 获取元素属性
			 elemnt.offsetWidth
			 elemnt.offsetHeight
			 仅IE5不支持，放心使用吧
			 offsetHeight  可以获取元素的高度尺寸，包括：height + padding[top,bottom] + bottom[top,bottom]
			 element.offsetTop  //获取元素与其偏移参考父元素顶部的间隔距离  可以获取元素距其上一级的偏移参考父元素顶部的距离。包括：margin[top] + top
			 element.offsetLeft  //获取元素与其偏移参考父元素左边的间隔距离
			 */
			/*官方解释
			 * document.compatMode等于BackCompat时，浏览器客户区宽度是document.body.clientWidth；
			 * document.compatMode等于CSS1Compat时，浏览器客户区宽度是document.documentElement.clientWidth。
			 * */
			Viewport: function() {
				if(document.compatMode == "BackCompat") {
					var Height = document.body.clientHeight;
				} else {
					var Height = document.documentElement.clientHeight;
				}
				return Height;
			},
			ScrollTop: function() {
				if(document.compatMode == "BackCompat") {
					var elementScrollTop = document.body.scrollTop;

				} else {
					var elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;

				}
				return elementScrollTop;
			},
			//可以直接用getBoundingClientRect().top
			ElementViewTop: function(ele) {
				if(ele) {
					var actualTop = ele.offsetTop;
					var current = ele.offsetParent;
					while(current !== null) {
						actualTop += current.offsetTop;
						current = current.offsetParent;
					}
					return actualTop - this.ScrollTop();
				}
			},
			//var elementTop = getElementPosition(element).top, // 元素顶部位置 elementBottom = elementTop + element.clientHeight; // 元素底部位置
			getElementPosition: function(ele) {
				var defaultRect = {
					top: 0,
					left: 0
				};
				var rect = (elem.getBoundingClientRect && elem.getBoundingClientRect()) || defaultRect;
				var ret = {
					top: rect.top + document.body.scrollTop,
					left: rect.left + document.body.scrollLeft
				}
				return ret;
			}
		},
		
	}
	//原生js实现类似于jQuery append()
	HTMLElement.prototype.appendHTML = function(el,html,where) {
		where = where || "bottom";
	    var divTemp = document.createElement("div"), nodes = null
	        // 文档片段，一次性append，提高性能
	        , fragment = document.createDocumentFragment();
	    divTemp.innerHTML = html;
	    nodes = divTemp.childNodes;
	    for (var i=0, length=nodes.length; i<length; i+=1) {
	       fragment.appendChild(nodes[i].cloneNode(true));
	    }
	   	// where参数bottom（默认）或者before
    	where !== "before"? el.appendChild(fragment) : el.insertBefore(fragment, el.firstChild);;
	    // 据说下面这样子世界会更清净
	    nodes = null;
	    fragment = null;
	};
	//抛出全局
	exports["tool"] = tool;
})(window, document)