<?php require_once 'common.class.php'; ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h1>管理员登录系统</h1>
		<form action="loginPress.php" method="post">
			<table border="0" cellspacing="" cellpadding="">
				<tr><td>用户ID</td><td><input type="text" name="admin_id" value="<?php $com = new Common();echo $com->getCookie('id'); ?>"/></td></tr>
				<tr><td>密码</td><td><input type="password" name="admin_password"/></td></tr>
				<tr><td colspan="2">是否保存用户ID <input type="checkbox" name="isSave" value="yes"/></td></tr>
				<tr><td><input type="submit" vallue="登录"></td></tr>
			</table>
		</form>
		<?php
			if(!empty($_GET['errorno'])){
				if($_GET['errorno'] == 1){
					echo "<font color='red'>用户名密码错误</font>";
				}else if($_GET['errorno'] == 2){
					echo "<font color='red'>验证码错误</font>";
				}
			}
		?>
	</body>
</html>
