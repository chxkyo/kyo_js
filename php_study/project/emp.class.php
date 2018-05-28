<?php
	class emp{
		private $id;
		private $name;
		private $grade;
		private $email;
		private $salary;
		function getId(){
			return $this->id;
		}
		function getName(){
			return $this->name;
		}
		function getGrade(){
			return $this->grade;
		}
		function getEmail(){
			return $this->email;
		}
		function getSalary(){
			return $this->salary;
		}
		function setName($name){
			$this->name = $name;
		}
		function setGrade($grade){
			$this->grade = $grade;
		}
		function setEmail($email){
			$this->email = $email;
		}
		function setSalary($salary){
			$this->salary = $salary;
		}
		function setId($id){
			$this->id = $id;
		}
	}
?>