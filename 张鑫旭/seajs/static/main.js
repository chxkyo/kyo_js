define(function(require,exports,module){
	var title = document.getElementById("title");
	var changeText = require('changeText');
	var $ = require('jquery');
	var showText = function(){
		$("#title").text(changeText.init());
	}
	module.exports = {
		showText:showText,
	}
});
