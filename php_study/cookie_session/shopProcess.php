<?php
	require_once 'book.class.php';
	echo $_GET["PHPSESSID"];
	if(isset($_GET["PHPSESSID"])){
		session_id($_GET["PHPSESSID"]);
	}
	session_start();
	if(isset($_GET['bookid'])){
		$bookid = $_GET['bookid'];
	}
	if(isset($_GET['bookname'])){
		$bookname = $_GET['bookname'];
	}
	if(empty($_SESSION[$bookid])){
		$book = new Book($bookid,$bookname);
	}else{
		$book = $_SESSION[$bookid];
	}
	$book->buy();
	$_SESSION[$bookid] = $book;
	echo "该买商品成功!!";
	echo "<a href='session_shop.php?".SID."'>返回商品列表</a>";
?>