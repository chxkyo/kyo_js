<?php
	require_once 'sqlHelper.class.php';
	class EmpService{
		function getPageCount($pagesize = 3){
			$sql = 'select count(id) from emp';
			$sqlHelper = new SqlHelper('empmanage');
			$res = $sqlHelper->execute_dql($sql);
			if($row = mysqli_fetch_row($res)){
				$pageCount =  ceil($row[0]/$pagesize);
			}
			mysqli_free_result($res);
			$sqlHelper->close();
			return $pageCount;
		}
		function getEmpList($pageNow,$pageSize = 3){
			$sql =  "select * from  emp limit ".($pageNow - 1)*$pageSize.",$pageSize";
			$sqlHelper = new SqlHelper('empmanage');
			$arr = $sqlHelper->execute_dql2($sql);
			$sqlHelper->close();
			return $arr;
		}
		function getFenye($fenye){
			$sql2 = 'select count(id) from emp';
			$sql1 =  "select * from  emp limit ".($fenye->pageNow - 1)*$fenye->pageSize.",$fenye->pageSize";
			$sqlHelper = new sqlHelper('empmanage');
			$sqlHelper->execute_sql_fenye($sql1,$sql2,$fenye);
			$sqlHelper->close();
		}
		function delById($id){
			$sql = "delete from emp where id = $id";
			$sqlHelper = new sqlHelper('empmanage');
			$val = $sqlHelper->execute_dml($sql);
			$sqlHelper->close();
			return $val;
		}
		function addEmp($name,$grade,$email,$salary){
			$sql = "insert into emp".
			        "(name,grade,email,salary) ".
			        "VALUES ".
			        "('$name',$grade,'$email',$salary)";
			$sqlHelper = new sqlHelper('empmanage');
			$val = $sqlHelper->execute_dml($sql);
			$sqlHelper->close();
			return $val;
		}
		function getEmp($id){
			$sql = "select * from emp where id = $id";
			$sqlHelper = new sqlHelper('empmanage');
			$arr = $sqlHelper->execute_dql2($sql);
			$sqlHelper->close();
			return $arr;
		}
		function updateEmp($id,$name,$grade,$email,$salary){
			$sql = "update emp set name='$name',grade = $grade,email = '$email',salary = $salary where id = $id";
			$sqlHelper = new sqlHelper('empmanage');
			$val = $sqlHelper->execute_dml($sql);
			$sqlHelper->close();
			return $val;
		}
	}
?>