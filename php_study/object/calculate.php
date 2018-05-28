<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<?php
			require_once 'cal_obj.php';
			if(isset($_REQUEST["first"])){
				$first = $_REQUEST["first"];
			}
			if(isset($_REQUEST["second"])){
				$second = $_REQUEST["second"];
			}
			if(isset($_REQUEST["opera"])){
				$opera = $_REQUEST["opera"];	
			}
			$cal = new Cal($first,$second,$opera);
			echo "<h3>计算结果为：</h3>".$cal->cal();
		?>
	</body>
</html>