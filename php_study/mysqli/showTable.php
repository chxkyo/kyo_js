<?php
	function showTable($tbname){
		header("Content-Type: text/html;charset=utf-8");
		$mysqli = new mysqli("localhost",'root','','chuanzhiboke','3306');
		if($mysqli->connect_error){
			die("连接失败".$mysqli->connect_error);
		}else{
			echo '连接成功'."<br>";
		}
		$sql = "select * from ".$tbname;
		echo $sql;
		$res = $mysqli->query($sql);
		echo "该结果集有".$res->num_rows."行,有".$res->field_count."列"."<br>";
		echo "<table border='1'>";
		echo "<tr>";
		while($info = $res->fetch_field()){
			echo "<th>";
			echo $info->name;
			echo "</th>";
		}
		echo "</tr>";
		while($result = $res->fetch_row()){
			echo "<tr>";
		
			foreach($result as $val){
				echo "<th>";
				echo "--$val--";
				echo "</th>";
			}
			echo "</tr>";
		}
		echo "</table>";
		$res->free();
	}
	showTable('words');
?>