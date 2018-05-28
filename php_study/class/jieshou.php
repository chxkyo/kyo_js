<?php
	require_once 'operate.class.php';
	$first1 = $_REQUEST["first"];
	$second1 = $_REQUEST["second"];
	$operate1 = $_REQUEST["operate"];
	$operate_class = new operate;
	var_dump($operate_class);
	echo "<br>";
	$operate_class->first = $first1;
	$operate_class->second = $second1;
	$operate_class->operate = $operate1;
	echo "计算结果为".$operate_class->jisuan();

?>