<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once 'empService.class.php';
			$empService = new EmpService();
			if(isset($_GET["flag"])){
				if($_GET["flag"] == 'delete'){
					$id = $_GET["id"];
					$val = $empService->delById($id);
					if($val == 1){
						header('Location:operate_sucess.php');
						exit();
					}else{
						header('Location:operate_fail.php');
						exit();
					}
				}else if($_GET["flag"] == 'add'){
					$name = $_POST["name"];
					$grade = $_POST["grade"];
					$eamil = $_POST["email"];
					$salary = $_POST["salary"];
					$val = $empService->addEmp($name,$grade,$eamil,$salary);
					if($val == 1){
						header('Location:operate_sucess.php');
						exit();
					}else{
						header('Location:operate_fail.php');
						exit();
					}
				}else if($_GET["flag"] == 'update'){
					$id = $_POST["id"];
					$name = $_POST["name"];
					$grade = $_POST["grade"];
					$eamil = $_POST["email"];
					$salary = $_POST["salary"];
					$val = $empService->updateEmp($id,$name,$grade,$eamil,$salary);
					if($val == 1){
						header('Location:operate_sucess.php');
						exit();
					}else{
						header('Location:operate_fail.php');
						exit();
					}
				}
			}
?>