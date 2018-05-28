<?php
	class SqlHelper {
		public $conn;
		public $username = 'root';
		public $pass = '';
		public $host = 'localhost';
		public function __construct($db){
			$this->conn = mysqli_connect($this->host,$this->username,$this->pass,$db);
			if(mysqli_connect_error()){
				die("连接失败".mysqli_connect_error());
			}
			mysqli_select_db($this->conn,$db);
			mysqli_query($this->conn,"set names utf8");
		}
		public function execute_dql($sql){
			$res = mysqli_query($this->conn,$sql) or die("数据库操作失败".mysqli_error($this->conn));
			return $res;
		}
		//返回一个数组
		public function execute_dql2($sql){
			$arr = array();
			$res = mysqli_query($this->conn,$sql) or die("数据库操作失败".mysqli_error($this->conn));
			$i = 0;
			while($row = mysqli_fetch_assoc($res)){
				$arr[$i] = $row;
				$i++;
			}
			mysqli_free_result($res);
			return $arr;
		}
		public function execute_sql_fenye($sql1,$sql2,$fenye){
			$arr = array();
			$res = mysqli_query($this->conn,$sql1) or die("数据库操作失败".mysqli_error($this->conn));
			while($row = mysqli_fetch_assoc($res)){
				$arr[] = $row;
			}
			$fenye->res_array = $arr;
			mysqli_free_result($res);
			$res2 = mysqli_query($this->conn,$sql2) or die("数据库操作失败".mysqli_error($this->conn));
			if($row = mysqli_fetch_row($res2)){
				$fenye->rowCount = $row[0];
				$fenye->pageCount = ceil($row[0]/$fenye->pageSize);
			}
		}
		public function execute_dml($sql){
			$res = mysqli_query($this->conn,$sql) or die("数据库操作失败".mysqli_error($this->conn));
			if(!$res){
				return 0;
			}else{
				if(mysqli_affected_rows($this->conn)>0){
					return 1;
				}else{
					return 2;
				}
			}
		}
		public function close(){
			if(!empty($this->conn)){
				mysqli_close($this->conn);
			}
		}
	}
?>