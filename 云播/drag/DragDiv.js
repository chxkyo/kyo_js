function DragDiv(dragContainer,dragNode,dragNodeNumber,dragCallback){
	this.dragContainer = dragContainer
	this.dragNode = dragNode
	this.dragNodeNumber = dragNodeNumber
	this.dragCallback = dragCallback
	this.init()
}
DragDiv.prototype = {
	init:function(){
		this.dragPosition = []
		this.locationArr = []
		var i = 0,j = 0,k = 0
		document.querySelector('.'+this.dragNode.className).parentNode.removeChild(document.querySelector('.'+this.dragNode.className))
		var fragmentWrap = document.createDocumentFragment()
		while(i < this.dragNodeNumber){
			var clonenode = document.createElement("div")
			clonenode.className = this.dragNode.className
			clonenode.innerHTML = this.dragNode.innerHTML
			this.locationArr.push(i + 1)
			fragmentWrap.appendChild(clonenode)
			i++
		}
		this.dragContainer.appendChild(fragmentWrap)
		var insertDragNodeArr 
		this.insertDragNodeArr = insertDragNodeArr  = document.querySelectorAll('.'+this.dragNode.className)
		while(j < insertDragNodeArr.length){
			insertDragNodeArr[j].index = j
			insertDragNodeArr[j].style.top = Math.ceil(insertDragNodeArr[j].offsetTop) + 'px'
			insertDragNodeArr[j].style.left = Math.ceil(insertDragNodeArr[j].offsetLeft) + 'px'
			this.dragPosition.push({
        "left": insertDragNodeArr[j].offsetLeft,
        "top": insertDragNodeArr[j].offsetTop
			})
			j++
		}
		while(k < insertDragNodeArr.length){
			insertDragNodeArr[k].style.position = 'absolute'
			this.drag(insertDragNodeArr[k])
			k++
		}
	},
	drag:function(obj, handle){
		var zIndex = 1
    var newHandle = handle || obj
    var that = this
    newHandle.style.cursor = "move"
    newHandle.onmousedown = newHandle.ontouchstart = function(evt) {
        var event = evt || window.event
        var disX,disY
        if(event.type=='touchstart'){
            var touch = event.touches[0]
            disX = Number(touch.pageX) - this.offsetLeft
            disY = Number(touch.pageY) - this.offsetTop
        }else{
            disX = event.clientX - this.offsetLeft
            disY = event.clientY - this.offsetTop
        }
        var oNear = null
        obj.style.zIndex = '1000'
        document.onmousemove = document.ontouchmove = function(evt) {
            var event = evt || window.event
            var iL,iT
            if(event.type=='touchmove'){
                var touch = event.touches[0]
                iL = Number(touch.pageX) - disX
                iT = Number(touch.pageY) - disY
            }else{
                iL = event.clientX - disX
                iT = event.clientY - disY
            }
            var maxL = obj.parentNode.clientWidth - obj.offsetWidth
            var maxT = obj.parentNode.clientHeight - obj.offsetHeight

            iL < 0 && (iL = 0)
            iT < 0 && (iT = 0)
            iL > maxL && (iL = maxL)
            iT > maxT && (iT = maxT)
            obj.style.left = Math.ceil(iL) + "px"
            obj.style.top = Math.ceil(iT) + "px"
            oNear = that.findNearest(obj)
            oNear.style.zIndex = '900'
            oNear && (oNear.classList.add('hig'))
            return false
        }
        document.onmouseup = document.ontouchend = function() {
            document.onmousemove = document.ontouchmove = null
            document.onmouseup = document.ontouchend = null
            if (oNear) {
              var tIndex = obj.index
              obj.index = oNear.index
              oNear.index = tIndex
              that.startMove(obj, that.dragPosition[obj.index],function(){
              	obj.style.zIndex = '1'
              })
              that.startMove(oNear, that.dragPosition[oNear.index],function(){
              	oNear.style.zIndex = '1'
              })
              oNear.classList.remove('hig')
              var data = [Number(obj.index)+1,Number(oNear.index)+1]
              var minNumber = Math.min.apply(Math,data)
              var maxNumber = Math.max.apply(Math,data)
              that.changeArraryElement(that.locationArr,minNumber,maxNumber)
              if(typeof that.dragCallback === 'function'){
              	that.dragCallback(that.locationArr)
              }
            } else {
              startMove(obj, that.dragPosition[obj.index],function(){
              	obj.style.zIndex = '1'
              })
            }
        }
      return false
    }
	},
	findNearest:function(obj){
    var filterLi = []
    var aDistance = []
    for (var i = 0; i < this.dragNodeNumber; i++){
    	if(this.insertDragNodeArr[i] != obj && this.isButt(obj, this.insertDragNodeArr[i])){
    		aDistance.push(this.getDistance(obj, this.insertDragNodeArr[i]))
    		filterLi.push(this.insertDragNodeArr[i])
    	}
    }
    var minNum = Number.MAX_VALUE
    var minLi = null
    for (i = 0; i < aDistance.length; i++){
    	if(aDistance[i] < minNum ){
    		minNum = aDistance[i]
    		minLi = filterLi[i]
    	}
    }
    return minLi
	},
	getDistance:function(obj1, obj2) {
    var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2)
    var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2)
    return Math.sqrt(a * a + b * b)
 	},
 	isButt:function(obj1, obj2) {
	  var l1 = obj1.offsetLeft
	  var t1 = obj1.offsetTop
	  var r1 = obj1.offsetLeft + obj1.offsetWidth
	  var b1 = obj1.offsetTop + obj1.offsetHeight
	
	  var l2 = obj2.offsetLeft
	  var t2 = obj2.offsetTop
	  var r2 = obj2.offsetLeft + obj2.offsetWidth
	  var b2 = obj2.offsetTop + obj2.offsetHeight
	  return !(r1 < l2 || b1 < t2 || r2 < l1 || b2 < t1)
	},
	getStyle:function(obj, attr){
		return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
	},
	startMove:function(obj, pos, onEnd) {
		var that = this
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        that.doMove(obj, pos, onEnd)
    }, 30)
  },
  doMove:function(obj, pos, onEnd) {
    var iCurL = this.getStyle(obj, "left")
    var iCurT = this.getStyle(obj, "top")
    var iSpeedL = (pos.left - iCurL) / 5
    var iSpeedT = (pos.top - iCurT) / 5
    iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL)
    iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT)
    if (pos.left == iCurL && pos.top == iCurT) {
        clearInterval(obj.timer)
        onEnd && onEnd()
    } else {
        obj.style.left = Math.ceil(iCurL + iSpeedL) + "px"
        obj.style.top = Math.ceil(iCurT + iSpeedT) + "px"
    }
  },
  changeArraryElement:function(arr,x,y){
    arr.splice(x - 1, 1, arr.splice(y - 1, 1, arr[x - 1])[0])
    return arr
  }
}
