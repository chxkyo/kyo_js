<?php
	header("Content-Type: text/html;charset=utf-8");
	$conn = mysqli_connect("localhost:3306",'root','');
	if(!$conn){
		die("数据库连接失败");
	}
	$sql = 'CREATE TABLE runoob_tab('.
			'runoob_id INT NOT NULL AUTO_INCREMENT,'.
			'runoob_title VARCHAR(100) NOT NULL,'.
			'runoob_author VARCHAR(40) NOT NULL,'.
			'submission_date DATE,'.
			'PRIMARY KEY(runoob_id))ENGINE=InnoDB DEFAULT CHARSET=utf8;';
	mysqli_select_db($conn,'RUNOOB');
	$inf = mysqli_query($conn,$sql);
	if(!$inf){
		die('数据表创建失败: ' . mysqli_error($conn));
	}
	echo "表创建成功\n";
			
?>