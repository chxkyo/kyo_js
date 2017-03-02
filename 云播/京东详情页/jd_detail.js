//封装$函数,专门负责按选择器查找元素
//比如:
//	$("选择器") -> 在整个页面查找和选择器匹配的元素集合
//  elem.$("选择器") -> 在elem下查找和选择器匹配的元素集合
window.$=HTMLElement.prototype.$=function(selector){
	//如果在全局调$,就用document.querySelectorAll
	//否则就直接用this.querySelectorAll
var result=(this==window?document:this).querySelectorAll(selector);
	//如果仅返回一个元素，则直接取出唯一的元素返回，不再返回集合
	result.length==1&&(result=result[0]);
	return result;
}//强调: $和jQuery中的$不一样！
/*顶部菜单栏*/
function show(){//弹出一级菜单，this->.app_jd, .service
	this.$("."+this.className+'>a').className="hover";
	this.$('[id$="_items"]').style.display="block";
}
function hide(){//隐藏一级菜单，this->.app_jd, .service
	this.$("."+this.className+'>a').className="";
	this.$('[id$="_items"]').style.display="none";
}
/*全部商品分类菜单*/
function toggleL1(){//显示或隐藏一级菜单
	//找到id为cate_box的ul,获取计算后的display属性
	var display=getComputedStyle($('#cate_box')).display
	//如果display为"none",就设置id为cate_box的ul的display属性为"block",否则设置为"none"
	$("#cate_box").style.display=display=="none"?"block":"none";
}
function toggleL2(){//this->li
	//在当前li下找class为sub_cate_box的div,获取计算后的display属性
	var display=getComputedStyle(this.$('.sub_cate_box')).display;
	//如果display为none，就设置当前li下class为sub_cate_box的div的display为block,否则设置为"none"
	this.$('.sub_cate_box').style.display=
								display=="none"?"block":"none";
	//在当前li下找h3元素,如果当前li下class为sub_cate_box的div的display为none，则清除h3的class，否则设置h3的class为hover
	this.$('h3').className=
		this.$('.sub_cate_box').style.display=="none"?"":"hover";
}
function showTab(e){//this->.main_tabs
	e=e||window.event;//获取事件对象e
	var target=e.srcElement||e.target;//获取目标元素target: ul li a
	if(target.nodeName!="UL"){//如果target不是ul
		//如果target是a,设置target为target的父元素
		target.nodeName=="A"&&(target=target.parentNode);
		//如果target的class不是current
		if(target.className!="current"){
			//在当前ul下查找class为current的li，清除class 
			this.$('.current').className="";
			target.className='current';//设置target的class为current
			//找到id为product_detail下的class为show的元素清除class
			$('#product_detail>.show').className="";
			if(target.getAttribute('i')!=-1){//target的i不是-1
				//找到id为product_detail下的所有id以product_开头的直接子元素，保存在divs中
				var divs=$('#product_detail>[id^="product_"]');
				//获取divs中和target的i属性相同位置的div，设置class为show
				divs[target.getAttribute('i')].className="show";
			}
		}
	}
}
/*强调: 尽量不要用变量临时存储DOM元素对象
        容易形成闭包
	闭包缺点: 占用更多内存，且不易释放——内存泄露
	解决: 随用随查 */
window.addEventListener('load',function(){
//顶部菜单栏
	//找到class为app_id的li，为li绑定鼠标进入事件为show
	$(".app_jd").addEventListener('mouseover',show);
	//找到class为app_id的li，为li绑定鼠标移出事件为hide
	$(".app_jd").addEventListener('mouseout',hide);
	//找到class为service的li，绑定鼠标进入事件为show
	$(".service").addEventListener('mouseover',show);
	//找到class为service的li，绑定鼠标移出事件为hide
	$(".service").addEventListener('mouseout',hide);
//全部商品分类
	//找到id为category的div，绑定onmouseover为toggleL1
	$('#category').addEventListener('mouseover',toggleL1);
	//找到id为category的div，绑定onmouseout为toggleL1
	$('#category').addEventListener('mouseout',toggleL1);
	//找到id为cate_box的ul下的所有li,保存在lis中
	var lis=$("#cate_box>li");
	for(var i=0;i<lis.length;i++){//遍历lis中每个li对象
		//为当前li对象绑定onmouseover和onmouseout事件为toggleL2
		lis[i].addEventListener('mouseover',toggleL2);
		lis[i].addEventListener('mouseout',toggleL2);
	}
//商品详情的页签
	//找到id为product_detail下的class为main_tabs的ul,绑定单击事件为showTab
 $('#product_detail>.main_tabs').addEventListener('click',showTab);
//放大图功能初始化
	preview.init();	
});
var preview={
	LICOUNT:0,//保存li的总数
	moved:0,//保存已经左移的li个数,左移一次+1,右移一次就-1
	LIWIDTH:0,//每个li的宽度，
	STARTLEFT:0,//ul开始时的left值
	ul:null,//整个iconlist元素
	aLeft:null,//左边的按钮(其实是向右移动)
	aRight:null,//右边的按钮(其实是向左移动)
	
	MSIZE:0,//mask的高和宽
	SMSIZE:0,//supermask的宽和高
	MAX:0,//mask可用的最大top和left值
	mask:null,//保存mask元素
	smask:null,//保存superMask元素

	init:function(){
//icon_list的移动和图片切换
	//找到id为icon_list的ul，保存在当前对象的ul属性中
		this.ul=$('#icon_list');
	//获得ul计算后的left值，转为浮点数，保存在当前对象的STARTLEFT中
		this.STARTLEFT=
			parseFloat(getComputedStyle(this.ul).left);
	//找到id为icon_list下的所有li，获得个数，保存在当前对象的LICOUNT
		this.LICOUNT=$('#icon_list>li').length;
	//找到id为icon_list下的第一个子元素li，获得其计算后的width属性，转为浮点数，保存在当前对象的LIWIDTH中
		this.LIWIDTH=parseFloat(
			getComputedStyle($('#icon_list>li:first-child')).width	
		);
	//找到class以backward开头的a，保存在aLeft中
		this.aLeft=$('[class^="backward"]');
	//找到class以forward开头的a，保存在aRight中
		this.aRight=$('[class^="forward"]');
	//为两个a绑定click事件为move，同时move方法提前绑定this为当前对象
		this.aLeft.addEventListener('click',move.bind(this));
		this.aRight.addEventListener('click',move.bind(this));
	//为ul绑定onmouseover事件为changeMImg
		this.ul.addEventListener('mouseover',changeMImg);
//mask随鼠标移动
	this.mask=$('#mask');//获得id为mask的div，保存在mask中
	//获得mask计算后的width,转为浮点数，保存在MSIZE中
	this.MSIZE=parseFloat(getComputedStyle(this.mask).width);
	//获得id为superMask的div，保存在mask中
	this.smask=$('#superMask');
	//获得smask计算后的width,转为浮点数,保存在SMSIZE中
	this.SMSIZE=parseFloat(getComputedStyle(this.smask).width);
	//为smask绑定鼠标进入事件为maskToggle
	this.smask.addEventListener('mouseover',maskToggle);
	//为smask绑定鼠标移出事件为maskToggle
	this.smask.addEventListener('mouseout',maskToggle);
	this.MAX=this.SMSIZE-this.MSIZE;//计算MAX：SMSIZE-MSIZE
	//为smask绑定鼠标移动事件为maskMove，同时提前绑定this为当前对象
	this.smask.addEventListener('mousemove',maskMove.bind(this));
	}
}
//控制mask随鼠标移动
function maskMove(e){//this->preview
  e=e||window.event;//获得事件对象e
  var target=e.srcElement||e.target;//获得target
  //分别获得相对于当前父元素的鼠标的x和y坐标
  var x=e.offsetX;
  var y=e.offsetY;
  //计算top值: y-MSIZE/2
  var top=y-this.MSIZE/2;
  //计算left值: x-MSIZE/2
  var left=x-this.MSIZE/2;
  //如果top>MAX，就设置top为MAX，如果top<0，就设置为0，否则不变
  top=top>this.MAX?this.MAX:top<0?0:top;
 //如果left>MAX，就设置left为MAX，如果left<0，就设置为0，否则不变
  left=left>this.MAX?this.MAX:left<0?0:left;
  //设置mask的top等于top；设置mask的left等于left
  this.mask.style.top=top+"px";
  this.mask.style.left=left+"px";
  //修改largeDiv的背景位置为-2top和-2left
  $('#largeDiv').style.backgroundPosition=
						-16/7*left+"px "+-16/7*top+"px";
}
//控制mask的显示
function maskToggle(){
	//找到id为mask的div
	//如果div的display为"block"，就改为none，否则改为"block"
	$('#mask').style.display=
		$('#mask').style.display=="block"?"none":"block";
	//找到id为largeDiv的元素，设置其display和mask的display一致
	$('#largeDiv').style.display=$('#mask').style.display;
	//获取id为mImg的元素的src属性: xxxxxx-m.jpg -> xxxxx-l.jpg
	var src=$('#mImg').src;
	//查找src中最后一个.的位置i
	var i=src.lastIndexOf('.');
	//截取0~i-1之间的子字符串，拼上l，再拼上src中i到结尾的剩余子字符串
	src=src.slice(0,i-1)+"l"+src.slice(i);
	//设置largeDiv的backgroundImage属性为url(src)
	$('#largeDiv').style.backgroundImage="url("+src+")";
}
//小图片的左移和右移
function move(e){//this被bind替换为preview对象
	e=e||window.event;//获得事件对象e
	var target=e.srcElement||e.target;//获得目标元素target
	//如果target的className中不包含_disabled
	if(target.className.indexOf('_disabled')==-1){
	//	如果target的className中包含forward
	//	当前对象的moved+1
		this.moved+=target.className.indexOf('forward')!=-1?1:-1;
	//	将当前对象的ul的left设置为: -LIWIDTH*moved+20
		this.ul.style.left=-this.LIWIDTH*this.moved+"px";
		if(this.LICOUNT-this.moved==5){//如果LICOUNT-moved==5
			//设置aRight的class为forward_disabled
			this.aRight.className="forward_disabled";
		}else if(this.moved==0){//否则，如果moved==0
			//设置aLeft的class为backward_disabled
			this.aLeft.className="backward_disabled";
		}else{//否则
			//设置aLeft的class为backward
			this.aLeft.className="backward";
			//设置aRight的class为forward
			this.aRight.className="forward";
		}
	}
}
//进入小图片，切换上方的中图片
function changeMImg(e){//this->ul
	e=e||window.event;//获得事件对象e
	var target=e.srcElement||e.target;//获得target
	if(target.nodeName=="IMG"){//如果target是IMG
		//获取target的src,保存在变量src中
		var src=target.src;
		//找到src中最后一个.的位置i
		var i=src.lastIndexOf('.');
		//截取0~i之前的子字符串，拼接上-m，再拼接上src中i到结尾的剩余子字符串，将拼接的结果保存回src中
		src=src.slice(0,i)+'-m'+src.slice(i);
		//找到id为mImg的img元素，直接设置src属性为src
		$('#mImg').src=src;
	}
}