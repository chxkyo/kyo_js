<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<form action="online_zidian.php" method="post" enctype="multipart/form-data">
			<label for="english">请输入英文：</label>
			<input type="text" name="english" id="english">
			<input type="hidden" value="search" name="type"/>
			<input type="submit" name="submit" value="提交">
		</form>
		<form action="online_zidian.php" method="post" enctype="multipart/form-data">
			<label for="english">请输入中文：</label>
			<input type="text" name="english" id="english">
			<input type="hidden" value="search1" name="type"/>
			<input type="submit" name="submit" value="提交">
		</form>
	</body>
</html>
