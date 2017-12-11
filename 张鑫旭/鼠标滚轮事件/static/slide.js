/**
 * 简易的列表左右滑动切换效果
 * 鼠标事件是关键，因此，一些数值写死在方法中，纯测试用
 */
 
define(function(require, exports, module) {
	var Event = require("./addEvent.js");
	var _timer, _move = function(ele, to, from) {
		from = from || parseFloat(ele.style.left) || 0;	
		if (Math.abs(to - from) > 2) {
			ele.style.left = (to - (to - from) / 3) + "px";
			_timer = setTimeout(function() {
				_move(ele, to);					
			}, 50);
		} else {
			ele.style.left = to + "px";
		}		
	};
	return {
		index: 0,
		visible: 4,
		init: function(box) {
			var length, self = this;
			if (!box) return;
			length = box.getElementsByTagName("li").length;
			Event.addEvent(box.parentNode, "mousewheel", function(event) {
				 if (event.delta > 0 && self.index > 0) {
					// 往上滚
					self.index--;
				 } else if (event.delta < 0 && self.index < length - self.visible) {
					 // 往下
					 self.index++;					 
				 } else {
					return; 
				 }
				 
				 clearTimeout(_timer);
				 _move(box, -1 * self.index * 140);
				 
				 event.preventDefault();
			});
			Event.addEvent(document.querySelector('.left_btn'), "click", function(event) {
				console.log(this);
				if(self.index < length - self.visible) {
					 // 往下
					 self.index++;					 
				}
				 clearTimeout(_timer);
				 _move(box, -1 * self.index * 140);
				 event.preventDefault();
			});
			Event.addEvent(document.querySelector('.right_btn'), "click", function(event) {
				if(self.index >0) {
					 // 往下
					 self.index--;					 
				}
				 clearTimeout(_timer);
				 _move(box, -1 * self.index * 140);
				 event.preventDefault();
			});
		}
	};
});
 
 
 