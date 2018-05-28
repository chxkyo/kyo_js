<?php
	require_once 'empService.class.php';
	if(isset($_GET['id'])){
		$id = $_GET['id'];
		$empService = new EmpService();
		$arr = $empService->getEmp($id);
		print_r($arr);
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<h1>修改雇员</h1>
		<form action="empProcess.php?flag=update" method="post">
			<table border="" cellspacing="" cellpadding="">
				<tr><td>ID：</td><td><input type="text" name="id" value='<?php echo $arr[0]['id'] ?>' readonly="readonly"/></td></tr>
				<tr><td>名字：</td><td><input type="text" name="name" value='<?php echo $arr[0]['name'] ?>'/></td></tr>
				<tr><td>级别：</td><td><input type="text" name="grade" value='<?php echo $arr[0]['grade'] ?>'/></td></tr>
				<tr><td>邮箱：</td><td><input type="text" name="email" value='<?php echo $arr[0]['email'] ?>'/></td></tr>
				<tr><td>薪水：</td><td><input type="text" name="salary" value='<?php echo $arr[0]['salary'] ?>'/></td></tr>
				<tr><td><input type="submit" value="修改用户"/></td><td><input type="reset" value="重置"/></td></tr>
			</table>
		</form>
	</body>
</html>