<?php
	function download_file($file_name,$sub_path){
		$file_name = iconv("utf-8","gb2312",$file_name);
		$file_path = $_SERVER['DOCUMENT_ROOT'].$sub_path.$file_name;
		if(!file_exists($file_path)){
			echo "文件不存在";
			return;
		}
		$fp = fopen($file_path,"r");
		$file_size = filesize($file_path);
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
	}
?>