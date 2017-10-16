require.config({
	paths:{
		'jquery':'../lib/jquery-1.11.1.min',
	}
});
require(['jquery'],function($){
	$(document).on('click','#contentBtn',function(){
		$('#messagebox').html('You have access Jquery by using require()');
//		require(['script/desc.js'],function(desc){
//			alert(JSON.stringify(desc))
//		});
		require(['alertdesc'],function(alertdesc){
			alertdesc();
		})
	});
});
