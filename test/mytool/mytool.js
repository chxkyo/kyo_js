(function() {
	var kyo = function() {};
	kyo.prototype = {
		//时间格式化
		ultZeroize: function(v, l) {
			var z = "";
			l = l || 2;
			v = String(v);
			for(var i = 0; i < l - v.length; i++) {
				z += "0";
			}
			return z + v;
		},
	}
})