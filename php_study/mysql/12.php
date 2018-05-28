<?php
	header("Content-Type: text/html;charset=utf-8");	
	$conn = mysqli_connect("localhost:3306","root","");
	if(!$conn){
		die('could not connect'.mysql.error());
	}
	mysqli_query($conn,'set names utf8');
	$sql = 'select country from websites union all select country from apps order by country';
	mysqli_select_db($conn,'RUNOOB');
	$info = mysqli_query($conn,$sql);
	if(!$info){
		die("无法获取数据".mysqli_error($conn));
	}
	echo '<table border="1"><tr><td>国家</td></tr>';
	while($row = mysqli_fetch_array($info, MYSQL_ASSOC))
	{
	    echo "<tr><td> {$row['country']}</td> ".
	         "</tr>";
	}
	echo '</table>';
	// 释放内存
	mysqli_free_result($info);
	mysqli_close($conn);
?>