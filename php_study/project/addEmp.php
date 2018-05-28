<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h1>添加雇员</h1>
		<form action="empProcess.php?flag=add" method="post">
			<table border="" cellspacing="" cellpadding="">
				<tr><td>名字：</td><td><input type="text" name="name"/></td></tr>
				<tr><td>级别：</td><td><input type="text" name="grade"/></td></tr>
				<tr><td>邮箱：</td><td><input type="text" name="email"/></td></tr>
				<tr><td>薪水：</td><td><input type="text" name="salary"/></td></tr>
				<tr><td><input type="submit" value="添加用户"/></td><td><input type="reset" value="重置"/></td></tr>
			</table>
		</form>
	</body>
</html>