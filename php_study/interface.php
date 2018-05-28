<?php
	interface iUsb{
		public function addStudent();
	}
	class A{
		public function deltudent(){
			echo "<br>删除一个学生";
		}
	}
	class B extends A implements iUsb{
		function addStudent(){
			echo "<br>增加一个学生";
		}
	}
	$b = new B();
	$b->addStudent();
	$b->deltudent();
?>