/**
 * URL地址后面增加随机参数
 */
define(function(require, exports, module) {
	exports.queryRandom = function(url) {
		var strQueryRandom = "random=" + Math.random();
		
		var arrQuery = url.split("?");
		
		if (arrQuery[1] != undefined) {
			// 含查询字符串
			if (url.slice(-1) === "&") {
				url = url + strQueryRandom;		
			} else {
				url = url + "&" + strQueryRandom;
			}
		} else {
			// 不含查询字符串
			url = url + "?" + strQueryRandom;	
		}
		
		return url;
	};
});