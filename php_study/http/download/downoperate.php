<?php
	header("Content-Type: text/html;charset=utf-8");	
	require_once('downservice.php');
	$file_name = $_REQUEST['filename'];
	download_file($file_name,'/http/download/img/');
?>