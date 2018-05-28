<?php
	require_once '../SqlTool_class.php';
	header("Content-Type: text/html;charset=utf-8");
	if(isset($_REQUEST['english'])){
			$enword = $_REQUEST['english'];
	}else{
		echo "输入为空";
	}
	if($_REQUEST['type'] == 'search'){
			$sql = 'select chword from words where enword="'.$enword.'" limit 0,1';		
	}else{
			$sql = 'select enword from words where chword like "%'.$enword.'%"';
	}

	$tool  = new SqlTool('chuanzhiboke');
	$res = $tool->execute_sql($sql,true);
	if($_REQUEST['type'] == 'search'){
		if($row = mysqli_fetch_row($res)){
			echo "英文 $enword 所对应的中文为".$row[0];
		}else{
			echo "没查到哦";
		}
	}else{
//		var_dump(mysqli_num_rows($res));
		if(mysqli_num_rows($res)>0){
			while($row = mysqli_fetch_assoc($res)){
//				var_dump($row);
				echo "中文  $enword 所对应的英文为".$row['enword']."<br>";
			}
		}else{
			echo "没查到哦";
		}
	}

	mysqli_free_result($res);
?>