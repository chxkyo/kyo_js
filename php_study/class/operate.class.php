<?php
	class operate{
		const pai = 3.1415926;
		public $first;
		public $second;
		public $operate;
		public function jisuan(){
			if($this->operate == "+"){
				$val = $this->first + $this->second;
			}
			echo "<br>常量为:".self::pai."<br>";
			return $val;
		}
	}
?>