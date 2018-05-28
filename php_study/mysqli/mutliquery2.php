<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost","root",'','chuanzhiboke');
	if($mysqli->connect_error){
		die("数据库连接失败".$mysqli->connect_error);
	}
	$sqls = "select * from user;";
	$sqls.= "select * from words;";
	if($res = $mysqli->multi_query($sqls)){
		do{
			//取出第一个结果集
			$result = $mysqli->store_result();
			while($row = $result->fetch_row()){
				foreach($row as $key=>$val){
					echo "--$val";
				}
				echo "<br>";
			}
			$result->free();
			if(!$mysqli->more_results()){
				break;
			}
		}while($mysqli->next_result());
	}else{
		die("数据库查询失败");
	}
?>