<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
<?php
	function bubbleSort(&$arr){
			$temp1 = 0;
			$flag = false;
		//比较多少轮
		for($i=1;$i<count($arr);$i++){
			//每轮作几次比较
			for($j=0;$j<count($arr)-$i;$j++){
				if($arr[$j]>$arr[$j+1]){
					$temp1 = $arr[$j];
					$arr[$j] = $arr[$j+1];
					$arr[$j+1] = $temp1;
					$flag = true;
				}
			}
			if(!$flag){
				break;
			}
			$flag = false;
		}
	}
	$arr1 = array(-2,5,10,-1,-5);
	bubbleSort($arr1);
	echo "冒泡排序结果为:";
	var_dump($arr1);
	echo "<br>";
	function selectSort(&$arr){
		$temp2 = 0;
		for($i=0;$i<count($arr)-1;$i++){
			$minIndex = $i;
			$minval = $arr[$i];
			for($j=$i+1;$j<count($arr);$j++){
				if($minval > $arr[$j]){
					$minIndex = $j;
					$minval = $arr[$j];
				}
			}
			$temp2 = $arr[$i];
			$arr[$i] = $arr[$minIndex];
			$arr[$minIndex] = $temp2;
		}
	}
	$arr2 = array(-2,5,10,-1,-5);
	selectSort($arr2);
	echo "选择排序结果为:";
	var_dump($arr2);
	echo "<br>";
	function insertSort(&$arr){
		for($i=1;$i<count($arr);$i++){
			$insertval = $arr[$i];
			$index = $i-1;
			while($index>=0 && $insertval < $arr[$index]){
				$arr[$index+1] = $arr[$index];
				$index--;
			}
			if($i !== ($index+1) ){
				$arr[$index+1] = $insertval;	
			}
		}
	}
	$arr3 = array(-2,5,10,-1,-5);
	insertSort($arr3);
	echo "插入排序结果为:";
	var_dump($arr3);
	echo "<br>";
?>
</html>