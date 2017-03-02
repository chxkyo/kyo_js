/*封装$*/
window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/index/banner_01.jpg"},
    {"i":1,"img":"images/index/banner_02.jpg"},
    {"i":2,"img":"images/index/banner_03.jpg"},
    {"i":3,"img":"images/index/banner_04.jpg"},
    {"i":4,"img":"images/index/banner_05.jpg"},
];
var slider={
	LIWIDTH:0,//保存每个li的宽度，其实就是slider div的宽度
	DURATION:2000,//保存每次滚动的总时长
	STEPS:50,//保存每次滚动的总步数
	INTERVAL:0,//保存每步移动的时间间隔
	moved:0,//记录本次动画已经移动的步数
	WAIT:3000,//每次自动轮播之间的等待时间间隔
	timer:null,//记录当前正在播放动画的序号
	canAuto:true,//标识是否可以自动轮播
	init:function(){
//获得id为slider的div计算后的width，转为浮点数后保存在LIWIDTH中
		this.LIWIDTH=
			parseFloat(getComputedStyle($('#slider')).width);
//计算INTERVAL: DURATION/STEPS
		this.INTERVAL=this.DURATION/this.STEPS;
//设置id为imgs的width为: LIWIDTH*imgs数组的元素个数
		$('#imgs').style.width=this.LIWIDTH*imgs.length+"px";
//根据imgs数组的元素个数，先indexs中添加li
for(var i=1,html="";i<=imgs.length;html+='<li>'+i+'</li>',i++);
		$('#indexs').innerHTML=html;
		//设置#indexs下第一个li的class为hover
		$('#indexs>li:first-child').className="hover";
		this.updateView();
//为id为indexs的ul绑定onmouseover事件，同时添加参数n
		$('#indexs').addEventListener('mouseover',function(e){
			e=e||window.event;//获得事件对象
			var target=e.srcElement||e.target;//获得target
			//如果target是LI，且target的class不是hover
			if(target.nodeName=="LI"&&target.className!="hover"){
      this.move(target.innerHTML-$('#indexs>li.hover').innerHTML);
			}
		}.bind(this));
//		this.autoMove();//启动自动轮播
//为id为slider的div绑定鼠标进入和移出事件
		$('#slider').addEventListener(
			'mouseover',this.changeCanAuto.bind(this));
		$('#slider').addEventListener(
			'mouseout',this.changeCanAuto.bind(this));
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
		}.bind(this),this.WAIT);
	},
	move:function(n){ 
		//每次启动新动画前都要停止当前动画，放置动画叠加
		clearTimeout(this.timer);
		this.timer=null;
		if(n<0){//如果n<0，说明右移，先调整数组和页面，再移动
			//从数组结尾删除-n个元素，拼接到数组开头
			imgs=imgs.splice(imgs.length-(-n),-n).concat(imgs);
			this.updateView();//更新页面
			//获得id为imgs的ul计算后的left
			var left=parseFloat(getComputedStyle($('#imgs')).left);
			//设置id为imgs的ul的left为left-(-n)*LIWIDTH
			$('#imgs').style.left=left-(-n)*this.LIWIDTH+"px";
		}
		this.moveStep(n);//如果是左移，就先移动，再调整数组和页面
	}, //启动移动动画 
	moveStep:function(n){//移动动画的每一步
		var distance=n*this.LIWIDTH;//计算本次移动的总距离
		var step=distance/this.STEPS;//计算每步步长
		//获得id为imgs的ul计算后的left值，转为浮点数，保存在left中
		var left=parseFloat(getComputedStyle($('#imgs')).left);
		//将id为imgs的ul的left设置为left-step
		$('#imgs').style.left=left-step+"px";
		this.moved++;//当前对象的moved++
		if(this.moved<this.STEPS){//如果moved<STEPS
			//启动下一次移动，提前绑定当前对象和移动的个数参数
			this.timer=setTimeout(
				this.moveStep.bind(this,n),this.interval);
		}else{//移动完了
			if(n>0){//如果n>0，说明左移，移动后再调整数组和页面
				//删除数组开头的n个元素，再拼接到数组结尾
				imgs=imgs.concat(imgs.splice(0,n));
				this.updateView();//根据数组的新内容，更新页面
			}
			$('#imgs').style.left="";//清除id为imgs的left属性
			this.moved=0;//moved归零,为下次动画做准备
			//只要当前动画轮播结束，就启动下次自动轮播
//			this.autoMove();
		}
	},
	updateView:function(){//将数组的内容，更新到slider中
		//遍历imgs数组中每个对象,同时声明变量html，初始化为""
		for(var i=0,html="";i<imgs.length;i++){
			//获取当前对象的img属性,保存在变量src中
			//将src拼接为: <li><img src="src"></li>
			//将src追加到html中
			html+='<li><img src="'+imgs[i].img+'"></li>';
		}//(遍历结束)
		$('#imgs').innerHTML=html;//设置id为imgs的内容为html
		//在id为indexs下找到现在class为hover的li，清除class
		$('#indexs>li.hover').className="";
		//找到id为indexs下所有li，将位置和imgs数组中第一个元素的i值相同的li的class设置为hover
		$('#indexs>li')[imgs[0].i].className="hover";
	}
}
window.addEventListener('load',function(){ 
	slider.init();
});