(function($){
	$.fn.extend({
		waterfall:function(value){
			value=$.extend({
				jsonUrl:"",
				dataType:""
			},value)
			
			var $this = $(this);
			
			//判断每个UL的最后一个LI，是否进入可视区域
			function see(objLiLast){
					//浏览器可视区域的高度
					var see = document.documentElement.clientHeight;	
					//滚动条滑动的距离
					var winScroll = $(this).scrollTop();
					//每个UL的最后一个LI，距离浏览器顶部的
					var lastLisee = objLiLast.offset().top
					return lastLisee < (see+winScroll)?true:false;		
			}
			//是否发出AJAX的“开关”；
			var onOff = true;
			
			$(window).scroll(function(){
				//拖动滚条时，是否发送AJAX的一个“开关”
				$this.children("ul").each(function(index, element) {
					
					//引用当前的UL
					var ulThis = this;
					//引用最后一个LI
					var lastLi = $("li:last",ulThis);
					//调用是否进入可视区域函数
					var isSee = see(lastLi);
					
					if(isSee && onOff){
						onOff = false;
						//发送AJAX请求，载入新的图片
						$.ajax({
							url:value.jsonUrl,
							dataType:value.dataType,
							success:function(data){
								//对返回JSON里面的list数据遍历
								$.each(data.list,function(keyList,ovalue){
								//对LIST里面的SRC数组遍历,取到图片路径
								$.each(ovalue,function(keySrc,avalue){
									$.each(avalue,function(keysrc1,value1){
										var imgLi = $("<li><a href=''><img src='" + value1 + "' alt='' /><p>11111</p></a></li>")
										$this.children("ul").eq(keysrc1).append(imgLi);
									})	
								})
								onOff = true;
								})
							}	
						})
					}
				});	
			})
		}	
	})	
})(jQuery)