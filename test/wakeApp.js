window.NRUM = window.NRUM || {};
window.NRUM.config = {
	key: '27e86c0843344caca7ba9ea652d7948d',
	clientStart: +new Date()
};
(function() {
	var n = document.getElementsByTagName('script')[0],
		s = document.createElement('script');

	s.type = 'text/javascript';
	s.async = true;
	s.src = 'http://nos.netease.com/apmsdk/napm-web-min-1.1.3.js';
	n.parentNode.insertBefore(s, n);
})();

;
(function(window, doc) {

	// http://apm.netease.com/manual?api=web
	NRUM.mark && NRUM.mark('pageload', true)

	var list = []
	var config = null

	// jsonp
	function jsonp(a, b, c) {
		var d;
		d = document.createElement('script');
		d.src = a;
		c && (d.charset = c);
		d.onload = function() {
			this.onload = this.onerror = null;
			this.parentNode.removeChild(this);
			b && b(!0);
		};
		d.onerror = function() {
			this.onload = this.onerror = null;
			this.parentNode.removeChild(this);
			b && b(!1);
		};
		document.head.appendChild(d);
	};

	function localParam(search, hash) {
		search = search || window.location.search;
		hash = hash || window.location.hash;
		var fn = function(str, reg) {
			if(str) {
				var data = {};
				str.replace(reg, function($0, $1, $2, $3) {
					data[$1] = $3;
				});
				return data;
			}
		}
		return {
			search: fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
			hash: fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
		};
	}

	jsonp('http://active.163.com/service/form/v1/5847/view/1047.jsonp')

	window.search = localParam().search
	window._callback = function(data) {
		window._callback = null
		list = data.list
		if(search.s && !!search.s.match(/^wap/i)) {
			config = list.filter(function(item) {
				return item.type === 'wap'
			})[0]
			return
		}
		config = list.filter(function(item) {
			return item.type === search.s
		})[0]
	}

	var isAndroid = !!navigator.userAgent.match(/android/ig),
		isIos = !!navigator.userAgent.match(/iphone|ipod/ig),
		isIpad = !!navigator.userAgent.match(/ipad/ig),
		isIos9 = !!navigator.userAgent.match(/OS 9/ig),
		isYx = !!navigator.userAgent.match(/MailMaster_Android/i),
		isNewsapp = !!navigator.userAgent.match(/newsapp/i),
		isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
		isYixin = (/yixin/ig).test(navigator.userAgent),
		isQQ = (/qq/ig).test(navigator.userAgent),
		params = localParam().search,
		url = 'newsapp://',
		iframe = document.getElementById('iframe');

	var isIDevicePhone = (/iphone|ipod/gi).test(navigator.platform);
	var isIDeviceIpad = !isIDevicePhone && (/ipad/gi).test(navigator.platform);
	var isIDevice = isIDevicePhone || isIDeviceIpad;
	var isandroid2_x = !isIDevice && (/android\s?2\./gi).test(navigator.userAgent);
	var isIEMobile = !isIDevice && !isAndroid && (/MSIE/gi).test(navigator.userAgent);
	var android_url = (!isandroid2_x) ? "http://3g.163.com/links/4304" : "http://3g.163.com/links/6264";
	var ios_url = "http://3g.163.com/links/3615";
	var wphone_url = "http://3g.163.com/links/3614";
	var channel = params.s || 'newsapp'

	// 判断在不同环境下app的url
	if(params.docid) {
		if(params['boardid'] && params['title']) {
			url = url + 'comment/' + params.boardid + '/' + params.docid + '/' + params.title
		} else {
			url = url + 'doc/' + params.docid
		}
	} else if(params.sid) {
		url = url + 'topic/' + params.sid
	} else if(params.pid) {
		var pid = params.pid.split('_')
		url = url + 'photo/' + pid[0] + '/' + pid[1]
	} else if(params.vid) {
		url = url + 'video/' + params.vid
	} else if(params.liveRoomid) {
		url = url + 'live/' + params.liveRoomid
	} else if(params.url) {
		url = url + 'web/' + decodeURIComponent(params.url)
	} else if(params.expertid) {
		url = url + 'expert/' + params.expertid
	} else if(params.subjectid) {
		url = url + 'subject/' + params.subjectid
	} else if(params.readerid) {
		url = url + 'reader/' + params.readerid
	} else {
		url += 'startup'
	}
	if(url.indexOf('?') >= 0) {
		url += '&s=' + (params.s || 'sps')
	} else {
		url += '?s=' + (params.s || 'sps')
	}

	// ios && 易信  用iframe 打开
	if((isIos || isIpad) && navigator.userAgent.match(/yixin/i)) {
		document.getElementById('iframe').src = url;
	}

	var height = document.documentElement.clientHeight;

	// 通常情况下先尝试使用iframe打开
	document.getElementById('iframe').src = url;

	// 移动端浏览器中，将下载页面显示出来
	if(!isWeixin && !isQQ && !isYixin && !isYx) {
		document.querySelector('.main-body').style.display = 'block'
		if(isIos9) {
			document.querySelector('.main-body').classList.add('showtip')
		}

		setTimeout(function() {
			document.body.scrollTop = 0
		}, 200)
	} else {
		document.getElementById('guide').style.display = 'block'
	}

	// Forward To Redirect Url
	// Add by zhanzhixiang 12/28/2015
	if(params.redirect) {
		var redirectUrl = decodeURIComponent(params.redirect);
		if(typeof(URL) === 'function' && new URL(redirectUrl).hostname.search("163.com") !== -1) {
			window.location.href = redirectUrl;
		} else if(redirectUrl.search("163.com") !== -1) {
			window.location.href = redirectUrl;
		};
	}

	// Forward To Redirect Url End
	if((isWeixin || isQQ) && isAndroid) {
		window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.netease.newsreader.activity&ckey=CK1331205846719&android_schema=' + 　url.match(/(.*)\?/)[1]
	}

	if(isIos || isIpad) {
		document.getElementById("guide").classList.add('iosguideopen')
	} else if(isAndroid) {
		document.getElementById("guide").classList.add('androidguideopen')
	} else {
		// window.location.href = 'http://www.163.com/newsapp'
	}

	document.getElementById('link').addEventListener('click', function() {

		// 统计
		neteaseTracker && neteaseTracker(false, 'http://sps.163.com/func/?func=downloadapp&modelid=' + modelid + '&spst=' + spst + '&spsf&spss=' + channel, '', 'sps')

		if(config) {
			android_url = config.android
		}
		if(config && config.iOS) {
			ios_url = config.iOS
		}
		if(isWeixin || isQQ) {
			return
		}
		var msg = isIDeviceIpad ? "检测到您正在使用iPad, 是否直接前往AppStore下载?" : "检测到您正在使用iPhone, 是否直接前往AppStore下载?";
		if(isIDevice) {
			window.location = ios_url;
			return;
		} else if(isAndroid) {
			// uc浏览器用iframe唤醒
			if(navigator.userAgent.match(/ucbrowser|yixin|MailMaster/i)) {
				document.getElementById('iframe').src = url;
			} else {
				window.location.href = url;
			}
			setTimeout(function() {
				if(document.webkitHidden) {
					return
				}
				if(confirm("检测到您正在使用Android 手机，是否直接下载程序安装包？")) {
					neteaseTracker && neteaseTracker(false, 'http://sps.163.com/func/?func=downloadapp_pass&modelid=' + modelid + '&spst=' + spst + '&spsf&spss=' + channel, '', 'sps')
					window.location.href = android_url;
				} else {
					neteaseTracker && neteaseTracker(false, 'http://sps.163.com/func/?func=downloadapp_cancel&modelid=' + modelid + '&spst=' + spst + '&spsf&spss=' + channel, '', 'sps')
				}
			}, 200)
			return;
		} else if(isIEMobile) {
			window.location = wphone_url;
			return;
		} else {
			window.open('http://www.163.com/special/00774IQ6/newsapp_download.html');
			return;
		}
	}, false)

	setTimeout(function() {
		if(isIDevice && params.notdownload != 1 && !isNewsapp && !isIos9) {
			document.getElementById('link').click()
		}
	}, 1000)

})(window, document);

(function() {
	var openUrl = window.location.search;
	try {
		openUrl = openUrl.substring(1, openUrl.length);
	} catch(e) {}
	var isiOS = navigator.userAgent.match('iPad') ||
		navigator.userAgent.match('iPhone') ||
		navigator.userAgent.match('iPod'),
		isAndroid = navigator.userAgent
		.match('Android'),
		isDesktop = !isiOS && !isAndroid;
	if(isiOS) {
		setTimeout(function() {
			window.location = "itms-apps://itunes.apple.com/app/[name]/[id]?mt=8";
		}, 25);
		window.location = "[scheme]://[host]?url=" + openUrl;
	} else if(isAndroid) {
		window.location = "intent://[host]/" + "url=" + openUrl + "#Intent;scheme=[scheme];package=[package_name];end";
	} else {
		window.location.href = openUrl;
	}
})();