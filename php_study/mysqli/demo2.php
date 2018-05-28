<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost",'root','','chuanzhiboke','3306');
	if($mysqli->connect_error){
		die("连接失败".$mysqli->connect_error);
	}else{
		echo '连接成功'."<br>";
	}
	$sql = "insert into user(name,password,email,age)values('曹恒星',md5(13093054272),'2773052294@qq.com',25)";
	$sql2 = "delete from user where id =3";
	$sql3 = "update user set age=24 where id =5";
	$res = $mysqli->query($sql3);
	if(!$res){
		echo "数据库操作失败".$mysqli->error;
	}else{
		if($mysqli->affected_rows>0){
			echo "数据插入成功";
		}else{
			echo "操作失败";
		}
	}
?>