<?php
	require_once 'book.class.php';
	if(isset($_GET["PHPSESSID"])){
		session_id($_GET["PHPSESSID"]);
	}
	echo $_GET["PHPSESSID"];
	session_start();
	echo "<h1>已购买商品如下</h1>";
	foreach($_SESSION as $key=>$val){
		echo "书号：$val->bookid,书名：$val->bookname,购买次数：$val->buyTimes<br>";
	}
?>