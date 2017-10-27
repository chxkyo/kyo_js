define(function(require,exports,module){
	var init = function (){
		var textContent = [
			'it works',
			'seajs demo',
			'fuck you',
			'hah',
		];
		var index = Math.floor(Math.random()*textContent.length);
		return textContent[index];
	}
	exports.init = init;
});
