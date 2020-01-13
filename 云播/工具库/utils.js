//const _toString = Object.prototype.toString
////判断是否是纯对象
//export function isPlainObject (obj: any): boolean {
//return _toString.call(obj) === '[object Object]'
//}
//
///**
// * Get outerHTML of elements, taking care
// * of SVG elements in IE as well.
// */
//function getOuterHTML (el: Element): string {
//if (el.outerHTML) {
//  return el.outerHTML
//} else {
//  const container = document.createElement('div')
//  container.appendChild(el.cloneNode(true))
//  return container.innerHTML
//}
//}
///**
// * Convert an input value to a number for persistence.
// * If the conversion fails, return original string.
// */
//export function toNumber (val: string): number | string {
//const n = parseFloat(val)
//return isNaN(n) ? val : n
//}
///**
// * Convert a value to a string that is actually rendered.
// */
//export function toString (val: any): string {
//return val == null
//  ? ''
//  : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
//    ? JSON.stringify(val, null, 2)
//    : String(val)
//}
///**
// * Check whether an object has the property.
// */
//var hasOwnProperty = Object.prototype.hasOwnProperty;
//function hasOwn (obj, key) {
//return hasOwnProperty.call(obj, key)
//}

//function  getElementViewLeft(element){
//let actualLeft = element.offsetLeft;
//let current = element.offsetParent;
//const elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
//if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
//    while (current !== null) {
//        actualLeft += current.offsetLeft;
//        current = current.offsetParent;
//    }
//}
//else {
//    while (current !== null && current !== element) {
//        actualLeft += current.offsetLeft;
//        current = current.offsetParent;
//    }
//}
//return actualLeft - elementScrollLeft;
//}
//function getScrollPosition () {
//return {
//    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
//    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
//};
//}
//
//function setScrollPosition ({left = 0, top = 0}) {
//if (this.isFirefox) {
//    document.documentElement.scrollLeft = left;
//    document.documentElement.scrollTop = top;
//}
//else {
//    window.scrollTo(left, top);
//}
//}
///**
// * @desc 函数防抖
// * @param func 函数
// * @param wait 延迟执行毫秒数
// * @param immediate true 表立即执行，false 表非立即执行
// */
//function debounce(func,wait,immediate) {
//  let timeout;
//
//  return function () {
//      let context = this;
//      let args = arguments;
//
//      if (timeout) clearTimeout(timeout);
//      if (immediate) {
//          var callNow = !timeout;
//          timeout = setTimeout(() => {
//              timeout = null;
//          }, wait)
//          if (callNow) func.apply(context, args)
//      }
//      else {
//          timeout = setTimeout(function(){
//              func.apply(context, args)
//          }, wait);
//      }
//  }
//}
///**
// * 节流函数
// * @param {function} func
// * @param {number} wait 触发时间间隔
// * @param {object} 选项
// */
//function throttle(func, wait, options = {}) {
//let timeout,
//  previous = 0
//
//return function() {
//  let now = +new Date()
//  let remain = wait - (now - previous)
//
//  if (remain < 0) {
//    if (previous === 0 && !options.begin) {
//      previous = now
//      return
//    }
//
//    if (timeout) {
//      clearTimeout(timeout)
//      timeout = null
//    }
//
//    previous = now
//    func.apply(this, arguments)
//  } else if (!timeout && options.end) {
//    timeout = setTimeout(() => {
//      func.apply(this, arguments)
//      timeout = null
//    }, wait)
//  }
//}
///**
// * 返回顶部动画
// */
//function backToTop(rate){
//	var doc = document.body.scrollTop ? document.body : document.documentElement;
//	var scrollTop = doc.scrollTop;
//
//	var top = function() {
//		scrollTop = scrollTop + (0 - scrollTop) / (rate || 2);
//
//		if(scrollTop < 1) {
//			doc.scrollTop = 0;
//			return;
//		}
//		doc.scrollTop = scrollTop;
//		requestAnimationFrame(top);
//	};
//	top();
//}
////a[href]:active,button:active {
////  background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
////  background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05))
////}
//
////body.iphone a[href]:active,body.iphone button:active {
////  background-image: none
////}
//// add by zhangxinxu 让iOS9- Safari :active伪类生效
//// document.body.addEventListener('ontouchstart', function() {});
//// Safari使用-webkit-tap-highlight-color高亮，因为:active时机有问题
//if (/iphone/i.test(navigator.userAgent)) {
//  document.body.style.webkitTapHighlightColor = 'rgba(0,0,0,.05)';
//  document.body.classList.add('iphone');
//}
//var closest = function closest(el, fn) {
//  return el && ( fn(el) ? el : closest(el.parentNode, fn) );
//};
//const scrollToTop = () => {
//const c = document.documentElement.scrollTop || document.body.scrollTop;
//if (c > 0) {
//  window.requestAnimationFrame(scrollToTop);
//  window.scrollTo(0, c - c / 8);
//}
//};
/**
 * 读文件大小
 * @param {Object} file
 */
function readFileSize(size){
    var size = size / 1024;
    var aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
    var fileSizeString = '';
    for(var i = 0; size > 1; size /= 1024, i++) {
       fileSizeString = size.toFixed(2) + " " + aMultiples[i];
    }
    return fileSizeString;
}
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
/*
 * 补全字符串
 */
const padStart = function (str, length, pad) {
  let charstr = String(pad)
  let len = length >> 0
  let maxlen = Math.ceil(len / charstr.length)
  let chars = []
  let r = String(str)
  while (maxlen--) {
    chars.push(charstr)
  }
  return chars.join('').substring(0, len - r.length) + r
}
const format = function (time) {
  if (window.isNaN(time)) {
    return ''
  }
  let hour = util.padStart(Math.floor(time / 3600), 2, 0)
  let minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0)
  let second = util.padStart(Math.floor((time - hour * 3600 - minute * 60)), 2, 0)
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':')
}
/**
 * 聊天插入信息
 * @param {obj} HTMLELEMENT
 * @param {str} 插入的字符串
 */
var focusInsert = function(obj, str){
  var result, val = obj.value;
  obj.focus();
  if(document.selection){ //ie
    result = document.selection.createRange();
    document.selection.empty();
    result.text = str;
  } else {
    result = [val.substring(0, obj.selectionStart), str, val.substr(obj.selectionEnd)];
    obj.focus();
    obj.value = result.join('');
  }
};
that.layero.addClass(animClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(this).removeClass(animClass);
});