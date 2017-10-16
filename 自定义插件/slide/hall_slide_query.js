/*by kyo*/
(function(exports) {
	function slider(){}
	slider.prototype = {
		timer: null,
		oNext:null,
		now:0,
		aBigLi:null,
		oUlBig:null,
		getStyle: function(obj, name) {
			if(obj.currentStyle) {
				return obj.currentStyle[name]
			} else {
				return getComputedStyle(obj, false)[name]
			}
		},
		getByClass: function(oParent, nClass) {
			var eLe = oParent.getElementsByTagName('*');
			var aRrent = [];
			for(var i = 0; i < eLe.length; i++) {
				if(eLe[i].className == nClass) {
					aRrent.push(eLe[i]);
				}
			}
			return aRrent;
		},
		startMove: function(obj, att, add) {
			clearInterval(obj.timer)
			obj.timer = setInterval(function() {
				var cutt = 0;
				if(att == 'opacity') {
					cutt = Math.round(parseFloat(this.getStyle(obj, att)));
				} else {
					cutt = Math.round(parseInt(this.getStyle(obj, att)));
				}
				var speed = (add - cutt) / 4;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if(cutt == add) {
					clearInterval(obj.timer)
					obj.timer = null;
					!this.timer && (this.timer = setInterval(function(){this.next();}.bind(this), 6000));
				} else {
					if(att == 'opacity') {
						obj.style.opacity = (cutt + speed) / 100;
						obj.style.filter = 'alpha(opacity:' + (cutt + speed) + ')';
					} else {
						obj.style[att] = cutt + speed + 'px';
					}
				}

			}.bind(this), 30)
		},
		next:function(){
				clearInterval(this.timer)
				this.timer = null;
				this.now++
				if(this.now == this.aBigLi.length) {
					this.now = 0;
				}
				this.tab();
		},
		pre:function(){
				clearInterval(this.timer)
				this.timer = null;
				this.now--
				if(this.now == -1) {
					this.now = this.aBigLi.length - 1;
				}
				this.tab();
		},
		tab:function(){
//			for(var i = 0; i < aLiSmall.length; i++) {
//				aLiSmall[i].className = '';
//			}
//			aLiSmall[that.now].className = 'thistitle'
			this.startMove(this.oUlBig, 'left', -(this.now * this.aBigLi[0].offsetWidth))
		},
		init: function() {
			var that = this;
			var oDiv = document.getElementById('playBox');
			var oPre = $(".pre")[0];
			var oNext = $('.next')[0];
			this.oUlBig = this.getByClass(oDiv, 'oUlplay')[0];
			this.aBigLi = this.oUlBig.getElementsByTagName('li');
			var oDivSmall = this.getByClass(oDiv, 'smalltitle')[0];
			var ul_small = '<ul>';
			for(var i = 0; i < this.aBigLi.length; i++) {
				ul_small += '<li></li>';
			}
			ul_small += "</ul>";
			oDivSmall.insertAdjacentHTML("beforeEnd", ul_small);
			var aLiSmall = oDivSmall.getElementsByTagName('li');
			$(".smalltitle").find('li').eq(0).addClass("thistitle");
			for(var i = 0; i < aLiSmall.length; i++) {
				aLiSmall[i].index = i;
				aLiSmall[i].onclick = function() {
					clearInterval(that.timer)
					that.timer = null;
					that.now = this.index;
					that.tab();
				}
			}
			$(oPre).on("click",function(){
				that.pre();
			})
			$(oNext).on("click",function(){
				that.next();
			})
			this.timer = setInterval(function(){this.next();}.bind(this), 6000)
			$(that.oUlBig).hover(function(){
				clearInterval(that.timer)
				that.timer = null;
			},function(){
				!that.timer && (that.timer = setInterval(function(){this.next();}.bind(that), 6000))
			});
		}
	}
	exports["slider"] = slider;
})(window)