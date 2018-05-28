<?php
	class customException extends Exception{
		public function errorMessage(){
			$errorMsg = '错误行号'.$this->getLine().'in'.$this->getFile().":<b>".$this->getMessage().'</b>不是一个合法的E-Mail地址';
			return $errorMsg;
		}
	}
		$email = 'someone@example...com';
		try{
			if(filter_var($email,FILTER_VALIDATE_EMAIL) === FALSE){
				throw new customException($email);
			}
		}catch(customException $e){
			echo $e->errorMessage();
		}
?>