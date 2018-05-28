<?php
	function custom_error($errno,$errmes){
		echo "<font size='5' color='red'>$errno</font><br>";
		echo "错误信息$errmes";
	}
	set_error_handler("custom_error",E_WARNING);
	fopen("a.txt","r");
?>