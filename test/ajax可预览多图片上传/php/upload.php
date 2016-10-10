<?php
	$fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
	if ($fn) {
	    file_put_contents(
	        'uploads/' . $fn,
	        file_get_contents('php://input')
	    );
	    echo "http://www.zhangxinxu.com/study/201109/uploads/$fn";
	    exit();
	}
?>