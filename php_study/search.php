<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php
	function binarySearch(&$arr,$val,$left,$right){
		if($left>$right){
			echo "没有找到哟!!!";
		}
		$mid = round(($left+$right)/2);
		if($val > $arr[$mid]){
			binarySearch($arr,$val,$mid+1,$right);
		}else if($val < $arr[$mid]){
			binarySearch($arr,$val,0,$mid-1);
		}else{
			echo "找到了,下标为=".$mid;
		}
	}
	$arr = array(-2.5.-1,5,111,200);
	binarySearch($arr,5,0,4);
?>
</body>
</html>