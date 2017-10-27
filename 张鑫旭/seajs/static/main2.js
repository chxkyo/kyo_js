define(function(require, exports) {
	var query = require("./queryRandom")
	  , flbox = require("./flbox");
	
	exports.bind = function(element) {
		element.onclick = function() {
			var href = this.href;
			flbox.open();	
			
			return false;
		};
	};
});