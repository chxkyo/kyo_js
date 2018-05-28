<?php
	$conn = mysql_connect("localhost","root","");
	if($conn){
		echo "数据库连接成功";
	}else{
		echo "数据库连接失败";
	}

?>