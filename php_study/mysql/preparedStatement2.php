<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost","root","",'chuanzhiboke');
	if(mysqli_connect_error()){
		die("数据路连接失败".mysqli_connect_error());
	}
	$sql = 'select name,email,password,age from user where id >?';
	$mysqli_stmt = $mysqli->prepare($sql);
//	var_dump($mysqli_stmt);
//	if($mysqli_stmt){
		$id=5;
		$mysqli_stmt->bind_param("i",$id);
		$mysqli_stmt->bind_result($name,$email,$password,$age);
		$mysqli_stmt->execute();
		while($mysqli_stmt->fetch()){
			echo "<br>--$name--$email--$password--$age";
		}
		$mysqli_stmt->free_result();
		$mysqli_stmt->close();
//	}
	$mysqli->close();
?>