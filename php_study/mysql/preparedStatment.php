<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost","root","",'chuanzhiboke');
	$sql = "insert into user(name,password,email,age)values(?,?,?,?)";
	$mysqli_stmt = $mysqli->prepare($sql);
	$name="kyo";
	$password = '123456';
	$email = '2773052294@qq.com';
	$age = 24;
	$mysqli_stmt->bind_param("sssi",$name,$password,$email,$age);
	$b = $mysqli_stmt->execute();
	if(!$b){
		die("操作失败");
	}else{
		echo "操作成功";
	}
	$mysqli->close();
?>