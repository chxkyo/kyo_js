<?php
	require_once 'adminService.class.php';
	header("Content-Type: text/html;charset=utf-8");
	$admin_id = $_POST["admin_id"];
	$admin_pass = $_POST["admin_password"];
	$isSave = $_POST['isSave'];
	echo $isSave;
	if(isset($isSave)){
		setcookie("id",$admin_id,time()+7*24*3600);
	}else{
		echo "不要保存用户ID";
		setcookie("id","",time()-3600);
	}
	$adminService = new AdminService($admin_id,$admin_pass);
	if($name = $adminService->checkAdmin($admin_id,$admin_pass)){
			session_start();
			$_SESSION["user_name"] = $name;
			header("Location:main.php");
			exit();
	}else{
		header("Location:login.php?errorno=1");
		exit();
	}
?>