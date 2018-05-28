<?php
	function checkNum($number){
		if($number > 1){
			throw new Exception("变量值必须小于1");
		}
		return true;
	}
	try{
		checkNum(2);
		echo "若说输出内容";
	}catch(Exception $e){
		echo 'Message：'.$e->getMessage();
	}
?>