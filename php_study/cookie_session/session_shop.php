<?php
	if(isset($_GET["PHPSESSID"])){
		session_id($_GET["PHPSESSID"]);
	}
	session_start();
	echo SID;
	echo "<h1>欢迎购买</h1>";
	echo "<a href='shopProcess.php?bookid=book1&bookname=西游记&".SID."'>西游记</a><br/>";
	echo "<a href='shopProcess.php?bookid=book2&bookname=水浒传&".SID."'>水浒传</a><br/>";
	echo "<a href='shopProcess.php?bookid=book3&bookname=三国演义&".SID."'>三国演义</a><br/>";
	echo "<a href='shopProcess.php?bookid=book4&bookname=红楼梦&".SID."'>红楼梦</a><br/>";
	echo "<a href='shopList.php?".SID."'>已购买商品列表</a>";
?>