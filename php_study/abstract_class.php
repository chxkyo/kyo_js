<?php
	abstract class AbstractClass{
		abstract protected function getValue();
		abstract protected function prefixValue($prefix);
		public function printOut(){
			print $this->getValue() . PHP_EOL;
		}
	}
	
	class ConcreteClass1 extends AbstractClass{
		protected function getValue(){
			return 'ConcreteClass1';
		}
		public function prefixValue($prefix){
			return "{prefix}ConcreteClass1";
		}
	}
	class ConcreteClass2 extends AbstractClass{
		protected function getValue(){
			return 'ConcreteClass2';
		}
		public function prefixValue($prefix){
			return "{prefix}ConcreteClass2";
		}
	}
	$class1 = new ConcreteClass1;
	$class1->printOut();
	$class1->prefixValue('hah');
	$class2 = new ConcreteClass2;
	$class2->printOut();
	$class2->prefixValue('hah');
?>