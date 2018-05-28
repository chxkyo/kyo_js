<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost","root",'','chuanzhiboke');
	if($mysqli->connect_error){
		die("数据库连接失败".$mysqli->connect_error);
	}
	$mysqli->autocommit(false);
	$sql1 = "update account set balance = balance+2 where id=1";
	$sql2 = "update account set balance = balance-2 where id=2";
	$b = $mysqli->query($sql1);
	$a = $mysqli->query($sql2);
	if(!$b || !$a){
		$mysqli->rollback();
	}else{
		$mysqli->commit();
	}
	$mysqli->close();
?>