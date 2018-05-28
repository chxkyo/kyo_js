<?php
	echo "&nbsp;&nbsp;&nbsp;*<br/>";
	echo "&nbsp;&nbsp;*&nbsp;*<br/>";
	echo "&nbsp;*&nbsp;&nbsp;&nbsp;*<br/>";
	echo "************<br>";	
//	echo "&nbsp;********";
//	for($i=0;$i<4;$i++){
//		for($k=0;$k<3-$i;$k++){
//			echo "&nbsp;";
//		}
//		echo "*";
//		if($i==3){
//			for($j=0;$j<3*4-2;$j++){
//				echo "*";
//			}
//		}else{
//			for($j=0;$j<2*($i-1)+1;$j++){
//				echo "&nbsp;";
//			}
//		}
//		if($i!=0){
//			echo "*<br>";	
//		}else{
//			echo "<br>";
//		}
//	}
	function print_kongxin($n){
		for($i=0;$i<$n;$i++){ 
			for($k=0;$k<$n-1-$i;$k++){
				echo "&nbsp;";
			}
			echo "*";
			if($i==$n-1){
				for($j=0;$j<($n-1)*4-2;$j++){
					echo "*";
				}
			}else{
				for($j=0;$j<2*($i-1)+1;$j++){
					echo "&nbsp;";
				}
			}
			if($i!=0){
				echo "*<br>";	
			}else{
				echo "<br>";
			}
		}
	}
	print_kongxin(5);
?>