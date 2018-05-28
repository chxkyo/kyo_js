<?php
	header("Content-Type: text/html;charset=utf-8");	
	$conn = mysqli_connect("localhost:3306","root","");
	if(!$conn){
		die("could not connect".mysqli_error());
	}
	$info = "create table user(".
			"id int auto_increment,".
			"name varchar(32) not null,".
			"password varchar(32) not null,".
			"email varchar(128) not null,".
			"age tinyint not null,".
			"primary key(id));";
	mysqli_select_db($conn,"chuanzhiboke");
	$retval = mysqli_query($conn,$info);
	if(!$retval){
		die("数据表创建失败".mysqli_error($conn));
	}
	mysqli_close($conn);
?>