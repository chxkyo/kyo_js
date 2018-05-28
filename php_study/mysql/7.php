<?php
	header("Content-Type: text/html;charset=utf-8");
	$conn = mysqli_connect("localhost:3306",'root','');
	if(!$conn){
		die("数据库连接失败：".mysqli_error($conn));
	}
	$sql = 'DELETE FROM runoob_tab WHERE runoob_id = 3';
	mysqli_select_db($conn,'RUNOOB');
	$info = mysqli_query($conn,$sql);
	if(!$info){
		die('无法删除数据:'.mysqli_error($conn));
	}
	mysqli_close($conn);
?>