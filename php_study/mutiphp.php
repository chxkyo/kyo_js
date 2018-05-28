<?php
	$arr=array(array(1,2,3),array(4,5,6));
	$arr2=array();
	for($i=0;$i<count($arr);$i++){
		for($j=0;$j<count($arr[$i]);$j++){
			$arr2[$j][$i] = $arr[$i][$j];
		}
	}
	var_dump($arr2);
?>