<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>雇员信息列表</title>
	</head>
	<body>
		<?php
//			/*每页显示数目*/
//			$pageSize = 3;
//			/*总共有多少页*/
//			$pageCount = 0;
//			/*数据总共多少条*/
//			$rowCount = 0;
//			/*目前是第几页*/
//			$pageNow = 1;
//			if(isset($_GET['page'])){
//				$pageNow = $_GET['page'];
//			}
//			$mysqli = new mysqli('localhost:3306','root','','empmanage');
//			if($mysqli->connect_error){
//				die("数据库连接失败".$mysqli->connect_error);
//			}
//			$mysqli->query('set names utf8');
//			$sql1 = 'select count(id) from emp';
//			if($result1 = $mysqli->query($sql1)){
//				if($res1 = $result1->fetch_assoc()){
//					$rowCount = $res1['count(id)'];
//				}
//				$result1->free();
//			}
//			$pageCount = ceil($rowCount/$pageSize);
//			$sql2 = "select * from  emp limit ".($pageNow - 1)*$pageSize.",$pageSize";
//			echo "<table border='1'>";
//			echo "<tr><th>id</th><th>name</th><th>grade</th><th>email</th><th>salary</th><th>是否修改</th><th>是否删除</th><tr>";
//			if($result2 = $mysqli->query($sql2)){
//				while($res2 = $result2->fetch_assoc()){
//					echo "<tr><td>{$res2['id']}</td><td>{$res2['name']}</td><td>{$res2['grade']}</td><td>{$res2['email']}</td><td>{$res2['salary']}</td><td><a href=''>修改用户</a></td><td><a href=''>删除用户</a></td></tr>";
//				}
//				$result2->free();
//			}
//			echo "<table>";
//			for($i=0;$i<$pageCount;$i++){
//				echo "<a href='empList.php?page=".($i+1)."'>".($i+1)."</a>";
//			}
//			$mysqli->close();
			
			
			require_once 'empService.class.php';
			require_once 'Pagination.php';
			$empService = new EmpService();
			/*面向对象*/
			function pagnation($pageSize = 3,$jumpSize = 5){
				global $empService;
				$fenye = new Paganation(5,1,true);
				$fenye ->pageNow = 1;
				$fenye ->pageSize = $pageSize;
				$jump = 1;
				if(isset($_GET['page'])){
					$fenye ->pageNow = $_GET['page'];
				}
				$empService->getFenye($fenye);
				echo "<table border='1'>";
				echo "<tr><th>id</th><th>name</th><th>grade</th><th>email</th><th>salary</th><th>是否修改</th><th>是否删除</th><tr>";
				for($i=0;$i<count($fenye->res_array);$i++){
					$res2 = $fenye->res_array[$i];
					echo "<tr><td>{$res2['id']}</td><td>{$res2['name']}</td><td>{$res2['grade']}</td><td>{$res2['email']}</td><td>{$res2['salary']}</td><td><a href='updateEmp.php?id={$res2['id']}'>修改用户</a></td><td><a href='empProcess.php?flag=delete&id={$res2['id']}'>删除用户</a></td></tr>";
				}
				echo "<table>";
				$fenye->show(); 
			}
			pagnation(3,10);
		?>
		
		<div>
			跳转到 <input type="text" name="page" style="width:30px;" class="page"/> 页 <button class="jump">跳转到</button>
		</div>
		<script type="text/javascript">
			document.querySelector(".jump").addEventListener("click",function(){
				if(location.href.indexOf("?") != -1){
					var index = location.href.indexOf("?");
					location.href = location.href.substring(0,index)+"?page="+document.querySelector(".page").value;
				}else{
					location.href = location.href+"?page="+document.querySelector(".page").value;
				}
			});
		</script>
	</body>
</html>
