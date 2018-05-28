
<html>
<body>

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
Name: <input type="text" name="fname">
<input type="submit">
</form>

<?php 
$name = $_REQUEST['fname'];
echo $name."<br>"; 
echo $_SERVER['PHP_SELF'];
echo '这是"'.__LINE__.'"行'."<BR>";
echo '该文件位于"'.__FILE__.'"'."<br>";
echo '该文件位于"'.__DIR__.'"';
?>

</body>
</html>