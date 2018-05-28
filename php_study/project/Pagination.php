<?php
	class Paganation{
		//每页显示数量
		public $pageSize = 6;
		//显示的数据
		public $res_array;
		//从数据库取出来的总的条数
		public $rowCount;
		//用户指定的第几页
		public $pageNow;
		//总共多少页
		public $pageCount;
		public $isShow = true;
		function __construct($pageSize,$pageNow,$isShow){
			$this->pageSize = $pageSize;
			$this->pageNow = $pageNow;
			$this->isShow = $isShow;
		}
		function show(){
			if($this->isShow){
				if($this->pageNow>1){
					$prePage = $this->pageNow - 1;
					echo "<a href='empList.php?page=".$prePage."'>上一页</a>";
				}
				if($this->pageNow<$this->pageCount){
					$nextPage = $this->pageNow + 1;
					echo "<a href='empList.php?page=".$nextPage."'>下一页</a>";
				}
				$start = floor(($this->pageNow-1)/10)*10+1;
				$index = $start;
				if($this->pageNow>10){
					echo "<a href='empList.php?page=".($start-1)."'> << </a>";
				}
				for(;$start<$index+10;$start++){
					echo "<a href='empList.php?page=$start'>$start</a>";
				}
				echo "<a href='empList.php?page=$start'> >> </a>";
				echo "总共有".$this->pageCount."页";
			}
		}
	}
?>