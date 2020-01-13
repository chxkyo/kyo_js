function insertSort(arr){
	var n = arr.length;
	for(var i = 1;i<n;i++){
		for(var j = i - 1;j>=0;j--){
			if(arr[i] >= arr[j]){
				arr.splice(j+1,0,arr.splice(i, 1)[0])
				break
			}else if( j === 0){
				arr.splice(0,0,arr.splice(i, 1)[0])
			}
		}
	}
	return arr
}
function qSort(arr){
	var left  = [],base = arr[0],right = []
	if(arr.length <= 1){
		return arr
	}
	for(var i =0;i<arr.length;i++){
		if(arr[i] <= base){
			left.push(arr[i])
		}else{
			right.push(arr[i])
		}
	}
	if(left.length>1){
		left  = qSort(left)
	}
	if(right.length > 1){
		right  = qSort(right)
	}
	var all = []
	Array.prototype.push.apply(all,left)
	all.push(base)
	Array.prototype.push.apply(all,right)
	return all
}
