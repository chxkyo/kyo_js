<?php
	require_once 'common.class.php';
	header("Content-Type: text/html;charset=utf-8");
	$com = new Common();
	$com->checkUser();
	echo "登陆成功";
	$com->getLastVisit();
	echo "<div><a href='login.php'>返回登录</a></div>";
	echo "<div><a href='empList.php'>管理页面</a></div>";
	echo "<div><a href='addEmp.php'>添加用户</a></div>";
?>