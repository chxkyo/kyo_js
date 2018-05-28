<?php
	header("Content-Type: text/html;charset=utf-8");
	$conn = mysqli_connect("localhost:3306",'root','');
	if(!$conn){
		die("数据库连接失败".mysqli_error($conn));
	}
	mysqli_query($conn,'set names utf8');
	$sql = 'SELECT runoob_id,runoob_title,runoob_author,submission_date FROM runoob_tab';
	mysqli_select_db($conn,'RUNOOB');
	$info = mysqli_query($conn,$sql);
	if(!$info){
		die("数据查询失败".mysqli_error($conn));
	}
	echo "<table border='1'><thead><tr><td>教程ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr></thead>";
//	while($row = mysqli_fetch_array($info,MYSQL_ASSOC)){
//		echo "<tbody><tr><td>{$row['runoob_id']}</td>".
//			"<td>{$row['runoob_title']}</td>".
//			"<td>{$row['runoob_author']}</td>".
//			"<td>{$row['submission_date']}</td>".
//			"</tr>";
//	}
//$row = mysqli_fetch_array($info,MYSQL_NUM)
//索引数组 $row = mysqli_fetch_row($info)
//关联数组mysqli_fetch_assoc($info)
		while($row = mysqli_fetch_object($info)){
			var_dump($row);
//		echo "<tr><td>{$row[0]}</td>".
//			"<td>{$row[1]}</td>".
//			"<td>{$row[2]}</td>".
//			"<td>{$row[3]}</td>".
//			"</tr>";
	}
	mysqli_free_result($info);
	echo "</table>";
?>