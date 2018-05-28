<?php
	$file_name = '表情.png';
	$file_name = iconv("utf-8","gb2312",$file_name);
	if(!file_exists($file_name)){
		echo "文件不存在";
		return;
	}
	$fp = fopen($file_name,"r");
	$file_size = filesize($file_name);
	header("Content-type:application/octet-stream");
	header("Accept-Ranges:bytes");
	header("Accept-length: $file_size");
	header("Content-Disposition:attachment;filename=".$file_name);
	$fcount = 0;
	$buffer = 1024;
	while(feof($fp) && $fcount<$file_size){
		$fdata = fread($fp,$buffer);
		$fcount += $buffer;
		echo $fdata;
	}
	fclose($fp);
?>