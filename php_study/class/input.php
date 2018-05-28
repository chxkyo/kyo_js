<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="../static/hellow/hellow.css" /> 
	</head>
	<body>
		<form action="jieshou.php">
			<label for="first">输入第一个数：</label><input type="text" name="first" id="first"/>
			<label for="second">输入第二个数：</label><input type="text" name="second" id="second"/>
			<select name="operate" id="operate">
				<option value="+">+</option>
				<option value="-">-</option>
				<option value="*">*</option>
				<option value="/">/</option>
			</select>
			<input type="submit" value="开始计算"/>
		</form>
	</body>
</html>