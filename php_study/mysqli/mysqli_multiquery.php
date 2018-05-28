<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost","root",'','chuanzhiboke');
	if($mysqli->connect_error){
		die("数据库连接失败".$mysqli->connect_error);
	}
	$sqls = "insert into user(name,password,email,age)values('宋江','aaa','aaa@123.com',45);";
	$sqls.= "insert into user(name,password,email,age)values('卢俊义','aaa','aaa@123.com',45);";
	echo $sqls;
	$b = $mysqli->multi_query($sqls);
	if(!$b){
		die("执行失败".$mysqli->error);
	}else{
		echo "ok";
	}
	$mysqli->close();
?>