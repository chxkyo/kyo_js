<?php
	class MethodTest{
		public function __call($name,$arguments){
			echo "Calling object method $name".implode(" ",$arguments)."<br>";
		}
		public static function __callStatic($name,$arguments){
			echo "Calling static method $name".implode(" ",$arguments)."<br>";
		}
	}
	$obj = new MethodTest;
	$obj->kyo("in object context","second");
	MethodTest::kyo("in statics context","third");
?>