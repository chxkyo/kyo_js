<?php
	$var = 300;
	$int_options = array(
		"options" =>array(
		"min_range"=>0,
		"max_range"=>256
		)
	);
	if(!filter_var($var,FILTER_VALIDATE_INT,$int_options)){
		echo("不是一个合法的整数");
	}else{
		echo("是个合法的整数");
	}
?>