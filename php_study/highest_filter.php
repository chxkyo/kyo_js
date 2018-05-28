<?php
	$int = 222;
	$min = 1;
	$max = 200;
	if(filter_var($int,FILTER_VALIDATE_INT,array("options"=>array("min_range"=>$min,"max_range"=>$max))) === false){
		echo "变量不在合法范围内";
	}else{
		echo "变量值在合法范围内";
	}
?>