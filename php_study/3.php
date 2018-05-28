<?php
	class Car{
		var $color;
		function Car($color ="green"){
			$this->color = $color;
		}
		function what_color(){
			
			
			return $this->color;
		}
	}
	function print_vars($obj){
		foreach(get_object_vars($obj) as $prop => $val){
			echo "\t$prop = $val\n";
		}
	}
	$herbie = new Car("red");
	print_vars($herbie);
	echo $_SERVER['SERVER_PORT'];
?>