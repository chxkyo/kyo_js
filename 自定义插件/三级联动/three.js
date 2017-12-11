(function($){
	$.extend({
		threeLevel:function(options){
			options = $.extend({
				data:"",
				selects:"",
				dataChild:""
			},options);
		 	function main(){
				var firstLevelSelect = options.selects[0],secondLevelSelect = options.selects[1],,html = "";
				if(options.selects.length >= 3){
					var thirdLevelSelect = options.selects[2]
				}
				var first = function(){
					$.each(options.data,function(index,value){
						html += "<option value'"+value.name+"'>"+value.name+"</option>";
					});
					$(firstLevelSelect).html(html);
					second();
				}
				var second = function(){
					html = "";
					var n = firstLevelSelect.selectedIndex;
					$.each(options.data[n][options.dataChild],function(index,value){
						html += "<option value'"+value.name+"'>"+value.name+"</option>";
					});
					$(secondLevelSelect).html(html);
					options.selects.length >= 3 && third();
				}
				var third = function(){
					html = "";
					var n = firstLevelSelect.selectedIndex;
					var m = secondLevelSelect.selectedIndex;
					if(typeof(options.data[n][options.dataChild][m][options.dataChild]) === "undefined"){
						$(thirdLevelSelect).css("display","none");
					}else{
						$(thirdLevelSelect).css("display","inline");
						$.each(options.data[n][options.dataChild][m][options.dataChild],function(index,value){
							html += "<option value'"+value.name+"'>"+value.name+"</option>";
						});
					}
					$(thirdLevelSelect).html(html);
				}
				//初始化
				first();
				$(firstLevelSelect).change(function(){
					second();
				})
				$(secondLevelSelect).change(function(){
               		third();
            	});

			}
			main();
		}
	})
})(jQuery)