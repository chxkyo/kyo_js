<?php
	class SqlHelper{
		private $mysqli;
		private static $host = 'localhost';
		private static $user = 'root';
		private static $pwd = '';
		public function __construct($db){
			$this->mysqli = new mysqli(self::$host,self::$user,self::$pwd,$db);
			if($this->mysqli->connect_error){
				die("连接失败".$this->mysqli->connect_error);
			}
			$this->mysqli->query("set names utf8");
		}
		public function execute_dql($sql){
			$res = $this->mysqli->query($sql) or die("数据库操作失败".$this->mysqli->error);
			return $res;
		}
		public function execute_dml($sql){
			$res = $this->mysqli->query($sql) or die("数据库操作失败".$this->mysqli->error);
			if(!$res){
				return 0;
			}else{
				echo $this->mysqli->affected_rows;
				if($this->mysqli->affected_rows>0){
					return 1;
				}else{
					return 2;
				}
			}
			return $res;
		}
		public function close_sql(){
			$this->mysqli->close();
		}
	}
?>