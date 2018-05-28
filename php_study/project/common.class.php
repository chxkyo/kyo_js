<?php
	class Common{
		function getLastVisit(){
			if(isset($_COOKIE['last_visit'])){
				echo "<br>你上次登录时间为".$_COOKIE['last_visit'];
				setcookie("last_visit",date('Y-n-d H:i:s')); 
			}else{
				echo "<br>你是第一次登录";
				setcookie("last_visit",date('Y-n-d H:i:s')); 
			}
		}
		function getCookie($key){
			if(isset($_COOKIE[$key])){
				return $_COOKIE[$key];
			}
		}
		function checkUser(){
			session_start();
			if(empty($_SESSION["user_name"])){
				header("Location:login.php?errorno=1");
			}
		}
	}
?>