//$可直接使用
//window.onload=function(){xxx}，会覆盖jd_index.js中的
//解决：
window.addEventListener('load',function(){ 
	elevator.init();
});
//定义全局函数getElementTop，获取任意元素距页面顶部的总距离
function getElementTop(elem){
	var elemTop=elem.offsetTop;//获得elem距相对定位的父元素的top
	elem=elem.offsetParent;//将elem换成相对定位的父元素
	while(elem!=null){//只要还有相对定位的父元素
		//获得父元素距它父元素的top值,累加到结果中
		elemTop+=elem.offsetTop;
		//再次将elem换成它的相对定位的父元素
		elem=elem.offsetParent;
	}
	return elemTop;
}
var elevator={
	DURATION:1000,
	STEPS:50,
	INTERVAL:0,
	moved:0,
	timer:null,
	FLOORHEIGHT:0,//保存每层楼的高度: 楼层高度+楼间距
	UPLEVEL:0, DOWNLEVEL:0,//保存上/下部灭灯的边界
	init:function(){
		//计算每步时间间隔
		this.INTERVAL=this.DURATION/this.STEPS;
		//获得id为f1的div的计算后的样式，保存在style中
		var style=getComputedStyle($('#f1'));
		this.FLOORHEIGHT=//设置FLOORHEIGHT为height+marginBottom
		  parseFloat(style.height)+parseFloat(style.marginBottom);
		//计算上下边界的位置
		this.UPLEVEL=(innerHeight-this.FLOORHEIGHT)/2;
		this.DOWNLEVEL=this.UPLEVEL+this.FLOORHEIGHT;
		//为网页绑定滚动事件
		window.addEventListener('scroll',this.scroll.bind(this));
		//为id为elevator下的ul绑定onmouseover
		$('#elevator>ul').addEventListener(
			'mouseover',this.liToggle);
		//为id为elevator下的ul绑定onmouseout事件为liState函数
		$('#elevator>ul').addEventListener(//根据span刷新li
			'mouseout',this.liState);
		//为id为elevator的ul绑定onclick事件为
		$("#elevator>ul").addEventListener(
			'click',this.scrollPage.bind(this));
	},
	scrollPage:function(e){//负责将页面滚动到指定的位置
		clearTimeout(this.timer);
		this.timer=null;
		e=e||window.event;//获得事件对象
		var target=e.srcElement||e.target;//获得target
		if(target.nodeName=="A"){//如果target是a
			//获得当前target对应的序号
			var	i=
				parseInt(target.previousElementSibling.innerHTML);
			var span=$('#f'+i+">header>span");//获得span
			//获得span距页面顶部的距离
			var elemTop=getElementTop(span);
			//让页面滚动到指定的top位置
			//window.scrollTo(0,elemTop-this.UPLEVEL);
		/*动画*/
			//获得目标top
			var targetTop=elemTop-this.UPLEVEL;
			//获得当前top
			var currTop=document.body.scrollTop||
						document.documentElement.scrollTop;
			var step=(targetTop-currTop)/this.STEPS;//计算步长step
			this.scrollStep(step);
		}
	},
	scrollStep:function(step){//滚动一步的动画
		window.scrollBy(0,step);
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(
				this.scrollStep.bind(this,step),this.INTERVAL);
		}else{
			this.moved=0;
		}
	},
	liToggle:function(e){//当鼠标进入一个li时，切换当前li的a
		e=e||window.event;
		var target=e.srcElement||e.target;//获得target
		//如果target是a,将target换成a的parent
		target.nodeName=="A"&&(target=target.parentNode);
		if(target.nodeName=="LI"){//如果target是li时
			//将target下第一个a隐藏
			target.$('a:first-child').style.display="none";
			//将target下第二个a显示
			target.$('.etitle').style.display="block";
		}
	},
	scroll:function(){//在页面滚动时，触发楼层亮灯的检测
		//找到所有.floor下的header下的直接子元素span保存在spans中
		var spans=$('.floor>header>span');
		for(var i=0;i<spans.length;i++){//遍历span中的每个span
			//获取当前span距页面顶部的top值保存在变量top中
			var elemTop=getElementTop(spans[i]);
			var scrollTop=document.body.scrollTop
					||document.documentElement.scrollTop;
			//如果当前页面滚动到上部预计灭灯的高度
			if(scrollTop>elemTop-this.UPLEVEL){
				spans[i].className="";//清除当前span的class
			}else if(scrollTop>elemTop-this.DOWNLEVEL){
				//否则，如果没到上部灭顶高度，超过亮灯高度
				spans[i].className="hover";//设置span的class为hover
			}else{//没到亮灯的高度
				spans[i].className="";
			}
		}//遍历结束后
		//查找.floor下header下的span中class为hover的
		var hoverSpan=$('.floor>header>span.hover');
		//如果hoverSpan有效，id为elevator的div显示出来
		//否则，id为elevator的div隐藏
		$('#elevator').style.display=
				hoverSpan!=null?"block":"none";
		//调用liState，根据span的状态，修改li的状态
		this.liState();
	},
	liState:function(){//根据span的状态，对照控制li的状态
		var spans=$('.floor>header>span');//获得所有的span
		var lis=$('#elevator li');//获得所有电梯按钮li
		for(var i=0;i<spans.length;i++){//遍历每个span
			if(spans[i].className=="hover"){//如果当前span是hover
				lis[i].$('a:first-child').style.display='none';
				lis[i].$('.etitle').style.display='block';
			}else{//如果当前span没有hover
				lis[i].$('a:first-child').style.display='block'
				lis[i].$('.etitle').style.display='none';
			}
		}
	}
};