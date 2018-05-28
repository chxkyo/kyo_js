<?php
	header("Content-Type: text/html;charset=utf-8");
	$conn = mysqli_connect('localhost:3306','root','');
	if(!$conn){
		die("数据库连接失败".mysqli_error($conn));
	}
	mysqli_query($conn,'set names utf8');
	$sql = 'SELECT runoob_id,runoob_title,runoob_author,submission_date FROM runoob_tab WHERE runoob_author LIKE "%COM"';
	mysqli_select_db($conn,'RUNOOB');
	$info = mysqli_query($conn,$sql);
	if(!$info){
		die('无法读取数据'.mysqli_error($conn));
	}
	echo '<table border="1"><tr><td>教程 ID</td><td>标题</td><td>作者</td><td>提交日期</td></tr>';
	while($row = mysqli_fetch_array($info, MYSQL_ASSOC))
	{
	    echo "<tr><td> {$row['runoob_id']}</td> ".
	         "<td>{$row['runoob_title']} </td> ".
	         "<td>{$row['runoob_author']} </td> ".
	         "<td>{$row['submission_date']} </td> ".
	         "</tr>";
	}
	echo '</table>';
	mysqli_close($conn);
?>