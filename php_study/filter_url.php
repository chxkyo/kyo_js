<?php
	if(!filter_has_var(INPUT_GET,"url")){
		echo "没有参数";
	}else{
		$url = filter_input(INPUT_GET,"url",FILTER_SANITIZE_URL);
		echo $url;
	}
?>