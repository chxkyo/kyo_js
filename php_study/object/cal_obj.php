<?php
	class Cal{
		public $num1;
		public $num2;
		public $opera;
		function __construct($num1,$num2,$opera){
			$this->num1 = $num1;
			$this->num2 = $num2;
			$this->opera = $opera;
		}
		public function cal(){
			$result;
			switch ($this->opera){
				case "+":
					$result = $this->num1 + $this->num2;
					break;
				case "-":
					$result = $this->num1 - $this->num2;
					break;
				case "*":
					$result = $this->num1 * $this->num2;
					break;
				case "/":
					$result = $this->num1 / $this->num2;
					break;
				default:
					echo "运算符错误";
			}
			return $result;
		}
	}
?>