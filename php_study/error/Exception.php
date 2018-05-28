<?php
	function custom_exception($e){
		echo "出错啦,错误信息是".$e->getMessage();
	}
	set_exception_handler('custom_exception');
	function test_exception($val){
		if($val == 'kyo'){
			throw new Exception("不能这么输入哦!");
		}else{
			echo "输对了";
		}
	}
	try{
		test_exception("kyo");
		echo "ok";
	}catch(Exception $e){
		throw $e;
	}
?>

