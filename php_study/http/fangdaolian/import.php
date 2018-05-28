<?php
	echo $_SERVER['HTTP_REFERER'].'<br>';
		echo strpos('abc','b')."<br>";
		var_dump(strpos($_SERVER['HTTP_REFERER'],'http://localhost:6666/http/fangdaolian/'));
		var_dump(strpos($_SERVER['HTTP_REFERER'],'http://localhost:6666/http/fangdaolian/') === false);
		if(strpos($_SERVER['HTTP_REFERER'],'http://localhost:6666/http/fangdaolian/') === false){
			header("Location:http://localhost:6666/http/fangdaolian/warning.php");
		}else{
			echo '可以跳转哦';
		}

?>