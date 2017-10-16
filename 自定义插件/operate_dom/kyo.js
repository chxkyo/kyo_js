(function(w, undefined) {
	// 构造函数
	var mjs = function(selector, context) {
		return new mjs.fn.init(selector, context);
	}
	// 构造函数mjs的原型对象
	mjs.fn = mjs.prototype = {
		constructor: mjs,
		init: function(selector, context) {
			if(!selector) {
				return mjs;
			} else if(typeof selector === 'object') {
				var selector = [selector];
				for(var i = 0; i < selector.length; i++) {
					this[i] = selector[i];
				}
				this.length = selector.length;
				return mjs;
			} else if(typeof selector === 'string') {
				var selector = selector.trim();
				var context = context || document;
				var el = context.querySelectorAll(selector);
				var dom = Array.prototype.slice.call(el);
				var length = dom.length;
				for(var i = 0; i < length; i++) {
					this[i] = dom[i];
				}
				this.context = context;
				this.selector = selector;
				this.length = length;
				return this;
			}
		},
		html: function(content) {
			if(content === undefined && this[0].nodeType === 1) {
				return this[0].innerHTML.trim();
			} else {
				var len = this.length;
				for(var i = 0; i < len; i++) {
					this[i].innerHTML = content;
				}
				return this;
			}
		},
		text: function(val) {
			if(!arguments.length) {
				return this[0].textContent.trim();
			} else {
				for(var i = 0; i < this.length; i++) {
					this[i].innerText = val;
				}
				return this;
			}
		},
		prepend: function(str) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				this[i].insertAdjacentHTML('afterbegin', str);
			}
			return this;
		},
		append: function(str) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				this[i].insertAdjacentHTML('beforeend', str);
			}
			return this;
		},
		before: function(str) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				this[i].insertAdjacentHTML('beforebegin', str);
			}
			return this;
		},
		after: function(str) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				this[i].insertAdjacentHTML('afterend', str);
			}
			return this;
		},
		remove: function() {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				this[i].parentNode.removeChild(this[i]);
			}
			return this;
		},
		hasClass: function(cls) {
			return this[0].classList.contains(cls);
		},
		addClass: function(cls) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				if(!this[i].classList.contains(cls)) {
					this[i].classList.add(cls);
				}
			}
			return this;
		},
		removeClass: function(cls) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				if(this[i].classList.contains(cls)) {
					this[i].classList.remove(cls);
				}
			}
			return this;
		},
		toggleClass: function(cls) {
			return this[0].classList.toggle(cls);
		},
		css: function(attr, val) {
			var len = this.length;
			for(var i = 0; i < len; i++) {
				if(arguments.length === 1) {
					var obj = arguments[0];
					if(typeof obj === 'string') {
						return getComputedStyle(this[i], null)[attr];
					} else if(typeof obj === 'object') {
						for(var attr in obj) {
							this[i].style[attr] = obj[attr];
						}
					}
				} else {
					if(typeof val === 'function') {
						this[i].style[attr] = val();
					} else {
						this[i].style[attr] = val;
					}
				}
			}
			return this;
		},
		find: function(selector) {
			return this.init(selector, this[0])
		},
		first: function() {
			return this.init(this[0])
		},
		last: function() {
			return this.init(this[this.length - 1])
		},
		eq: function(index) {
			return this.init(this[index])
		},
		parent: function() {
			return this.init(this[0].parentNode);
		}
	}

	mjs.fn.init.prototype = mjs.fn;
	// 为window全局变量添加mjs对象
	w.kyo = w.m = mjs;
})(window);