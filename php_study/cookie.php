<?php
	$expire = time() + 60*60*24*30;
	setcookie("user", "php", $expire);
	echo $_COOKIE["user"];
	print_r($_COOKIE);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<?php
			if(isset($_COOKIE["user"]))
			echo "欢迎".$_COOKIE["user"]."!<br/>";
			else
			echo "你是普通访客!<br>";
		?>
	</body>
</html>

