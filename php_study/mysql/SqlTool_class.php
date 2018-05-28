<?php
	class SqlTool{
		private $conn;
		private $localhost = 'localhost:3306';
		private $root = 'root';
		private $pass = '';
		function __construct($db){
			$this->db =  $db;
			$this->conn = mysqli_connect($this->localhost,$this->root,$this->pass); 
			if(!$this->conn){
				die("数据库连接失败".mysqli_error($this->conn));
			}
			mysqli_select_db($this->conn,$this->db);
			mysqli_query($this->conn,'set names utf8');
		}
		function execute_sql($sql,$isSel){
			$retval = mysqli_query($this->conn,$sql);
			if(!$retval){
				die("数据库操作失败".mysqli_error($this->conn));
			}
//			while($row = mysqli_fetch_object($retval)){
//				var_dump($row);
//			}
////			echo "修改行数".mysql_affected_rows($this->conn).'<br>';
////			echo "多少列".mysql_num_fields($retval);
//			if($isSel){
//				mysqli_free_result($retval);
//			}
			return $retval;
	}
	}
?>