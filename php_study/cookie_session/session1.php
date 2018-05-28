<?php
	session_start();
	echo "<br>session学习";
	$_SESSION['name'] = 'kyo';
	echo "<br>保存成功"
?>