<?php
	header("Content-Type: text/html;charset=utf-8");	
//	$conn = mysqli_connect("localhost:3306","root","");
//	if(!$conn){
//		die("could not connect".mysqli_error());
//	}
//	mysqli_query($conn,'set names utf8');
//	$info = "insert into user(name,password,email,age)values('kyo啊',md5('13093054272'),'2773052294@qq.com',25)";
//	mysqli_select_db($conn,"chuanzhiboke");
//	$reval = mysqli_query($conn,$info);
//	if(!$reval){
//		die('数据插入失败'.mysqli_error($conn));
//	}
//	$info = "insert into user(name,password,email,age)values('KYO',md5('13093054272'),'2773052294@qq.com',25)";
//	$info2 = "delete from user where name = 'KYO'";
    $info3 = "select * from user";
	require_once('SqlTool_class.php');
	$sql = new SqlTool();
	$sql->execute_sql($info3,true);
?>