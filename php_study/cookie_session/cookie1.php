<?php
	header("Content-Type: text/html;charset=utf-8");
	setCookie("name","shuiping",time()+3600);
	echo "cookie 保存成功";
?>
