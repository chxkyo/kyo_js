/**
 * 简易弹框
 */

define(function(require, exports) {
	var funCreate = require("./element")
		, funAjax = require("./ajax")
		, overlay = require("./overlay");
		
	var eleWin = funCreate.create("div", {
			styles: {
				display: "none",
				position: "fixed",
				left: "50%",
				zIndex: 2	
			}	
		})
		, eleBar = funCreate.create("div", {
			styles: {
				fontSize: "12px",
				padding: "8px",
				backgroundColor: "#eee"
			}	
		})
		, eleClose = funCreate.create("a", {
			href: "javascript:",
			styles: {
				fontSize: "12px",
				color: "#34538b",
				textDecoration: "none",
				position: "absolute",
				margin: "-22px 0 0 85%"	
			}	
		})
		, eleBody = funCreate.create("div", {
			styles: {
				backgroundColor: "#fff",
				borderTop: "1px solid #ddd"
			}	
		})
		, eleOverlay = overlay.overlay;
	
	eleWin.appendChild(eleBar);
	eleWin.appendChild(eleClose);
	eleWin.appendChild(eleBody);
	
	document.body.appendChild(eleWin);
	
	eleBar.innerHTML = "弹出框";
	
	eleClose.innerHTML = "[关闭]";
	eleClose.onclick = function() {
		flbox.close();	
		return false;
	};
	
	var flbox = {
		loading: function() {
			eleBody.innerHTML = '<div style="width:200px;height:100px;padding:10px;">加载中...</div>';	
			this.position();
		},
		open: function(url) {
			var self = flbox;
//			funAjax.get(url, function(html) {
				eleBody.innerHTML = '<img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg" />';
				self.position();
//			});
		},
		position: function() {
			eleWin.style.display = "block";
			eleOverlay.show();
			var widthWin = eleWin.clientWidth
			  , heightWin = eleWin.clientHeight;
			  	
			// 定位
			eleWin.style.marginLeft =  "-" + widthWin / 2 + "px";
			eleWin.style.top = (screen.availHeight - heightWin - 100) / 2 + "px";
		},
		close: function() {
			eleOverlay.hide();
			eleWin.style.display = "none";
			eleBody.innerHTML = "";	
		}
	}
	
	exports.open = flbox.open;
});

