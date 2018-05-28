<?php
	header("Content-Type: text/html;charset=utf-8");	
	$conn = mysqli_connect("localhost:3306","root","");
	if(!$conn){
		die('could not connect'.mysql.error());
	}
//	echo "数据库连接成功<br>";
//	$sql = 'CREATE DATABASE RUNOOB';
//	$retval = mysqli_query($conn,$sql );
//	if(! $retval )
//	{
//	    die('创建数据库失败: ' . mysqli_error($conn));
//	}
	mysqli_select_db($conn,'RUNOOB');
	mysqli_close($conn);

?>