<?php
	$filters = array(
		"name"=>array(
			"filter"=>FILTER_SANITIZE_STRING
		),
		"age"=>array(
			"filter"=>FILTER_VALIDATE_INT,
			"options"=>array(
				"min_range"=>1,
				"max_range"=>120
			)
		),
		"email"=>FILTER_VALIDATE_EMAIL
	);
	$result = filter_input_array(INPUT_GET,$filters);
	if(!$result["age"]){
		echo "年龄必须在1到120之间<br>";
	}else if(!$result["email"]){
		echo "E-MAIL 不合法<br>";
	}else{
		echo "输入正确";
	}
?>