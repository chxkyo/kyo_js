<?php
	function my_error3($no,$mes){
		echo "错误号是:".$no;
	}
	function my_error4($no,$mes){
		$err_info = "出大事了，".$mes;
		echo $err_info;
		error_log($err_info."\r\n",3,'myerr.txt');
	}
	set_error_handler("my_error4",E_USER_ERROR);
	$age = 700;
	if($age > 120){
		trigger_error("输入年龄过大",E_USER_ERROR);
		die();
	}
	echo "<br>ok";
?>