window.onload=function(){
	countries.init();
};
var countries={
	sel:[],//被选中的国家名称列表
	unsel:[], //未被选中的国家名称列表
	selElem:null,//右侧select元素
	unselElem:null,//左侧select元素
	init:function(){
		//找到id为unsel的select，保存在unselElem中
		this.unselElem=document.getElementById("unsel");
		//找到id为sel的select，保存在selElem中
		this.selElem=document.getElementById("sel");
		//将unselElem中所有option，转化为国家名称数组，保存在unsel数组中
		console.log(this.unselElem);
		this.unsel=this.unselElem
					   .innerHTML
					   .replace(
						/^\s*<option>|<\/option>\s*$/g,"")
					   .split(/<\/option>\s*<option>/)
		console.log(String(this.unsel));
	},
	selectAll:function(){//将unsel中剩余项都合并到sel中
		this.sel=this.sel.concat(this.unsel).sort();
		this.unsel=[];
	},
	unselectAll:function(){//将sel中剩余项都合并到unsel中
		this.unsel=this.unsel.concat(this.sel).sort();
		this.sel=[];
	},
	move:function(inner){//响应按钮点击事件，调度方法
		switch (inner){
			case "&gt;&gt;":this.selectAll();break;
			case "&lt;&lt;":this.unselectAll();break;
			case "&gt;":this.moveRight();break;
			case "&lt;":this.moveLeft();break;
		}
		this.updateView();//更新界面
	},
	updateView:function(){//将两个数组的元素更新到页面上	
		//设置unselElem的内容：如果unsel没有元素，就设置为"",否则设置为unsel拼接成<option>之后的结果
		this.unselElem.innerHTML=
			this.unsel.length==0?"":
			    "<option>"
				+this.unsel.join("</option><option>")
				+"</option>"
		//设置selElem的内容：如果sel没有元素，设置为"",否则设置为sel拼接成<option>之后的结果
		this.selElem.innerHTML=
			this.sel.length==0?"":
			    "<option>"
				+this.sel.join("</option><option>")
				+"</option>"
	},
	moveLeft:function(){
		for(var i=this.sel.length-1;i>=0;i--){
			if(this.selElem.options[i].selected){
				this.unsel=
				this.unsel.concat(this.sel.splice(i,1));
			}
		}//(遍历结束)
		this.unsel.sort();
	},
	moveRight:function(){//将unselElem选中项移动到selElem
		//从后先前遍历unsel中所有元素
		for(var i=this.unsel.length-1;i>=0;i--){
		//	如果当前option被选中
			if(this.unselElem.options[i].selected){
		//		从unsel中i位置开始，删除1个元素，将结果拼接到sel中
				this.sel=
				this.sel.concat(this.unsel.splice(i,1));
			}
		}//(遍历结束)
		this.sel.sort();//将sel排序
	}
}