<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once 'mysqli.class.php';
	$mysqli = new SqlHelper('chuanzhiboke');
	$res = $mysqli->execute_dql("select * from user");
	$info = $mysqli->execute_dml("insert into user(name,password,email,age)values('哈哈',md5(123456),'13093054272',30)");
	while($row = $res->fetch_row()){
		foreach($row as $key=>$val){
			echo "--$val";
		}
		echo "<br>";
	}
	echo $info;
?>