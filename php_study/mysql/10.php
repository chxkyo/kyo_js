<?php
	header("Content-Type: text/html;charset=utf-8");	
	$conn = mysqli_connect("localhost:3306","root","");
	if(!$conn){
		die('could not connect'.mysql.error());
	}
	mysqli_query($conn,'set names utf8');
	$name = '微博';
	$url = 'https://www.weibo.com/';
	$alexa = 20;
	$country = 'CN';
	$sql = 'insert into websites'.
			'(name,url,alexa,country)'.
			'values'.
			"('$name','$url','$alexa','$country')";
	mysqli_select_db($conn,'RUNOOB');
	$info = mysqli_query($conn,$sql);
	if(!$info){
		die("无法获取数据".mysqli_error($conn));
	}
	 mysqli_close($conn);
?>