<?php
	header("Content-Type: text/html;charset=utf-8");	
	$conn = mysqli_connect("localhost:3306","root","");
	if(!$conn){
		die('could not connect'.mysql.error());
	}
	$sql = 'create table apps('.
			'id int not null auto_increment,'.
			'app_name varchar(100) not null,'.
			'url varchar(100) not null,'.
			'country varchar(40) not null,'.
			'primary key(id))ENGINE=InnoDB DEFAULT CHARSET=utf8;';
	mysqli_select_db($conn,'RUNOOB');
	$info = mysqli_query($conn,$sql);
	if(!$info){
		die('数据表创建失败：'.mysqli_error($conn));
	}
	mysqli_close($conn);
?>