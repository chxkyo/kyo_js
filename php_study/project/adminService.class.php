<?php
	require_once 'sqlHelper.class.php';
	//主要完成对admin表操作
	class AdminService{
		public function checkAdmin($id,$password){
			$sql = "select password,name from admin where id = $id";
			echo "<br>$sql";
			$sqlHelper = new SqlHelper('empmanage');
			$res = $sqlHelper->execute_dql($sql);
			if($row = mysqli_fetch_assoc($res)){
				if(md5($password) == $row['password']){
					return $row['name'];
				}
			}
			mysqli_free_result($res);
			return '';
			$sqlHelper->close();
		}
	}
?>