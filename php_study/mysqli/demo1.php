<?php
	header("Content-Type: text/html;charset=utf-8");
	$mysqli = new mysqli("localhost",'root','','chuanzhiboke','3306');
	if($mysqli->connect_error){
		die("连接失败".$mysqli->connect_error);
	}else{
		echo '连接成功'."<br>";
	}
	$sql = 'select * from words';
	$res = $mysqli->query($sql);
	while($row = $res->fetch_field()){
		var_dump($row->name);
	}
	while($row = $res->fetch_row()){
		foreach($row as $key=>$val){
			echo "--$val";
		}
		echo "<br>";
	}
	$res->free();
?>