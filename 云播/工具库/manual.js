function debounce(func,time,flag){
	var timer = null
	return function(){
		var args = Array.prototype.slice.call(arguments)
		var that = this
		clearTimeout(timer)
		if(!timer && !flag){
			func.apply(this,args)
		}
		timer = setTimeout(function(){
			func.apply(that,args)
		},time)
	}
}
function throttle(func,time){
	var pre = 0;
	var timer = null;
	return function(){
		var that = this
		var args = Array.prototype.slice.call(arguments)
		if(new Date().getTime() - pre > time){
			clearTimeout(timer)
			timer = null
			pre = new Date().getTime()
			func.apply(that,args)
		}else if(!timer){
			timer = setTimeout(function(){
				func.apply(that,args)
			},time)
		}
	}
}
function tomorrow(){
	var t = new Date()
	t.setDate(t.getDate() + 1)
	console.log(t.toISOString())
}
Function.prototype.funcbind = function(context,...args){
	if(this === Function.prototype){
		throw new Error('报错')
	}
	//拿到此函数值
	var that = this
	return function(...arg1s){
		if(this instanceof that){
			return new that(...args,...arg1s)
		}
		that.apply(context,args.concat(arg1s))
	}
}
function getByteLen(val) {
	return new Blob([val]).size
}
function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
function unique(arr){
	var obj = {}
	return arr.filter(function(item){
		if(obj[item]){
			return false
		}else{
			obj[item] = true
			return true
		}
	})
}
function unique1(arr){
	return arr.filter(function(item,index){
		return arr.indexOf(item) === index
	})
}
function unique2(arr){
	return [...new Set(arr)]
}
const filterNonUnique = arr => arr.filter(i => 
  arr.indexOf(i) === arr.lastIndexOf(i)
)
function mapToArray(arr){
	var map = {},newArr = []
	arr.forEach(function(item,index){
		item.id && map[item.id]?map[item.id].push(item):map[item.id] = [item]
	})
	Object.keys(map).forEach(function(key){
		newArr.push({
			id:key,
			value:map[key]
		})
	})
	return newArr
}
function flat(arr){
	var result = []
	for(var i =0;i<arr.length;i++){
		if(Array.isArray(arr[i])){
			result = result.concat(flat(arr[i]))
		}else{
			result.push(arr[i])
		}
	}
	return result
}
function max(arr){
	return arr.reduce(function(max,item){
		return Math.max(max,item)
	})
}
//function disorder(array){
//	var len = array.length
//	var current = array.length - 1
//	var random
//	while(current > -1){
//		random = Math.floor(Math.random() * len)
//		console.log(random)
//		[array[current],array[random]] = [array[random],array[current]]
//		current--
//	}
//	return array
//}
function decimalToBinary(num, result = []) {
  const round = Math.floor(num / 2);
  result.unshift(num % 2);
  if (round === 0) {
    return result.join("");
  } else {
    return decimalToBinary(round, result);
  }
}
function nest(items, id = null, link = 'parent_id'){
	var str = '<ul>'
	items.filter(function(item){
		return item[link] === id
	}).map(function(item){
			str += '<li>'+ item.name
			str += nest(items,item.id)
			str += '</li>'
	})
	str += '</ul>'
	return str
}
