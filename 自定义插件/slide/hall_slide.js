/*by kyo
 * parent_selector div 选择器
 * ul_selector ul 选择器
 * imgs 存放 图片资源 href 数组
 * */
(function(exports) {
	  function deepCopy(p,c){
    /*@param p [必选] [对象] 被克隆对象
    **c ：[可选] p对象被克隆到c身上，c被改变
    **返回值为深度克隆后的c*/
    var c= c || {};
    for(var i in p){
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            arguments.callee(p[i],c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
  };
  // 至少传入2个参数，传入的参数都将会被深度复制，不会影响原对象，然后返回扩展后的新对象
  function hrExtend() { //扩展对象
    var args = arguments;
    if (args.length < 2) return;
    var temp = deepCopy(args[0]); //调用复制对象方法
    for (var n = 1; n < args.length; n++) {
      for (var i in args[n]) {
        temp[i] = args[n][i];
      }
    }
    return temp;
  }
	function slider(config){
		var config_default = {
			DURATION:1000,//保存每次滚动的总时长
			STEPS:50,//保存每次滚动的总步数
			WAIT:3000,//每次自动轮播之间的等待时间间隔
			pagination:false,
		}
		this.config = hrExtend(config_default,config);
	}
slider.prototype ={
	LIWIDTH:0,//保存每个li的宽度，其实就是slider div的宽度
	INTERVAL:0,//保存每步移动的时间间隔
	moved:0,//记录本次动画已经移动的步数
	timer:null,//记录当前正在播放动画的序号
	canAuto:true,//标识是否可以自动轮播
	init:function(){
		this.LIWIDTH=
			parseFloat(getComputedStyle($(this.config.parent_selector)[0]).width);
		this.INTERVAL=this.config.DURATION/this.config.STEPS;
		$(this.config.ul_selector)[0].style.width=this.LIWIDTH*this.config.imgs.length+"px";
		if(this.config.pagination){
			for(var i=1,html="";i<=this.config.imgs.length;html+='<li>'+i+'</li>',i++);
			$(this.config.hover_selector)[0].innerHTML=html;
			$(this.config.hover_selector).find("li")[0].className="hover";
			$(this.config.hover_selector)[0].addEventListener('mouseover',function(e){
				e=e||window.event;//获得事件对象
				var target=e.srcElement||e.target;//获得target
				if(target.nodeName=="LI"&&target.className!="hover"){
	      this.move(target.innerHTML-$('#indexs>li.hover').innerHTML);
				}
			}.bind(this));
		}
		$(this.config.ul_selector)[0].addEventListener(
			'mouseover',this.changeCanAuto.bind(this));
		$(this.config.ul_selector)[0].addEventListener(
			'mouseout',this.changeCanAuto.bind(this));
		this.updateView();
		this.autoMove();
	},
	changeCanAuto:function(){
		this.canAuto=this.canAuto?false:true;
	},
	autoMove:function(){
		//反复询问canAuto，直到为true，才调用move
		this.timer=setTimeout(function(){
			if(this.canAuto){
				this.move(1);
			}else{
				this.autoMove();
			}
		}.bind(this),this.config.WAIT);
	},
	move:function(n){ 
		//每次启动新动画前都要停止当前动画，放置动画叠加
		clearTimeout(this.timer);
		this.timer=null;
		if(n<0){
			this.config.imgs=this.config.imgs.splice(this.config.imgs.length-(-n),-n).concat(this.config.imgs);
			this.updateView();//更新页面
			var left=parseFloat(getComputedStyle($(this.config.ul_selector)[0]).left);
			$(this.config.ul_selector)[0].style.left=left-(-n)*this.LIWIDTH+"px";
		}
		this.moveStep(n);//如果是左移，就先移动，再调整数组和页面
	}, //启动移动动画 
	moveStep:function(n){//移动动画的每一步
		var distance=n*this.LIWIDTH;//计算本次移动的总距离
		var step=distance/this.config.STEPS;//计算每步步长
		var left=parseFloat(getComputedStyle($(this.config.ul_selector)[0]).left);
		$(this.config.ul_selector)[0].style.left=left-step+"px";
		this.moved++;
		if(this.moved<this.config.STEPS){
			this.timer=setTimeout(
				this.moveStep.bind(this,n),this.INTERVAL);
		}else{//移动完了
			if(n>0){
				this.config.imgs=this.config.imgs.concat(this.config.imgs.splice(0,n));
				this.updateView();
			}
			$(this.config.ul_selector)[0].style.left="";
			this.moved=0;
			this.autoMove();
		}
	},
	updateView:function(){
		for(var i=0,html="";i<this.config.imgs.length;i++){
			html+='<li>';
			html+='<a href="'+this.config.imgs[i].href+'">';
			html+='<img src="'+this.config.imgs[i].img+'" />';
			html+='</a></li>'
		}
		$(this.config.ul_selector)[0].innerHTML=html;
		if(this.config.pagination){
			$(this.config.hover_selector).find(".hover")[0].className="";
			$(this.config.hover_selector).find("li")[imgs[0].i].className="hover";
		}

	}
}
	exports["slider"] = slider;
})(window)