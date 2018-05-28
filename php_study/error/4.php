<?php
	$myfile = fopen('myfile.txt','w') or die("unable to read");
	var_dump($myfile);
//	fwrite($myfile,'kyo is so handsome');
//	fclose($myfile);
?>