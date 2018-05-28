<?php
	class Book{
		public $bookid;
		public $bookname;
		public $buyTimes = 0;
		function __construct($bookid,$bookname){
			$this->bookid = $bookid;
			$this->bookname = $bookname;
		}
		function buy(){
			$this->buyTimes++;
		}
	}
?>