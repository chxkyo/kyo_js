//首屏加载函数
var firstPage = function() {
    var h = window.innerHeight;
    var w = window.innerWidth;

    var bg = document.getElementsByClassName("box_bg");
    //自适应
    //当屏幕高度变小时
    if ((w / h) >= (1920 / 1080)) {
        for (var i = 0, len = bg.length; i < len; i++) {
            bg[i].style.width = w + "px";
            bg[i].style.height = w * (1080 / 1920) + "px";
            bg[i].style.top = -(w * (1080 / 1920) - h) + "px";
            bg[i].style.left = "0px";
        }
        //当屏幕宽度变窄时
    } else {
        for (var i = 0, len = bg.length; i < len; i++) {
            bg[i].style.height = h + "px";
            bg[i].style.width = h * (1920 / 1080) + "px";
            bg[i].style.left = -(h * (1920 / 1080) - w) + "px";
            bg[i].style.top = "0px";
        }
    }
    //4行文字渐显
    var box01_index = 0;
    var box01_p = document.getElementById('box01_text').children;

    function boxOne() {
        if (box01_index >= 0 && box01_index <= 3) {
            box01_p[box01_index].style.opacity = '1';
            box01_index++;
        } else {
            clearInterval(boxOneTimer);
        }
    }
    //初始化转圈
    var x_arr = new Array();
    var y_arr = new Array();
    var x = y = m = 0;
    for (var i = 0; i < 800; i++) {
        if (i >= 400) {
            x = m;
            y = 200 + Math.sqrt(40000 - Math.pow(x - 200, 2));
            m--;
        } else {
            x = m;
            y = 200 - Math.sqrt(40000 - Math.pow(x - 200, 2));
            m++;
        }
        x_arr[i] = x - 60;
        y_arr[i] = parseInt(y) - 25;
    }

    /*
     *原型轨迹
     */
    var gitMove = document.getElementById('github_a');
    var weiboMove = document.getElementById('weibo_a')
    var blogMove = document.getElementById('blog_a')
    var g_num = 0;
    var w_num = 0;
    var b_num = 0;

    function movegit() {
        if (g_num <= 750) {
            // gitMove.css({"left":x_arr[g_num] + "px","top":y_arr[g_num]+"px"});
            gitMove.style.left = x_arr[g_num] + 'px';
            gitMove.style.top = y_arr[g_num] + 'px';
            g_num += 3;
        } else {
            clearInterval(gitTimer);
        }
    }

    function moveweibo() {
        if (w_num <= 400) {
            // weiboMove.css({"left":x_arr[w_num]+"px","top":y_arr[w_num]});
            weiboMove.style.left = x_arr[w_num] + 'px';
            weiboMove.style.top = y_arr[w_num] + 'px';
            w_num += 3;
        } else {
            clearInterval(weiTimer);
        }
    }

    function moveblog() {
        if (b_num <= 90) {
            // blogMove.css({"left":x_arr[b_num]+"px","top":y_arr[b_num]});
            blogMove.style.left = x_arr[b_num] + 'px';
            blogMove.style.top = y_arr[b_num] + 'px';
            b_num += 3;
        } else {
            clearInterval(blogTimer);
        }
    }

    movegit();
    var gitTimer = setInterval(movegit, 1);
    moveweibo();
    var weiTimer = setInterval(moveweibo, 1);
    moveblog();
    var blogTimer = setInterval(moveblog, 1);
    var boxOneTimer = setInterval(boxOne, 2000);
}
firstPage();
//浮动按钮
var f_btn = document.getElementById("float_btn").children;
//固定导航
var nav_ul = document.getElementById('nav_ul').children;
var wrapBox = document.getElementById("wrapBox");
var foot = document.getElementById("foot");
var arrow = document.getElementsByClassName("arrow_img");
var bg = document.getElementsByClassName("box_bg");
var boxs = document.getElementsByClassName("box");
var indexs = 0;
var bar = document.getElementById('bar_container').children; //进度条
var box02_flag = false; //还未曾到第二屏
var box02_text = document.getElementById('box02_text').children; //第二屏文字
var box02_index = 0;
var box02_timer;

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addActive() {
    for (var i = 0; i < bar.length; i++) {
        if (!hasClass(bar[i], 'active')) {
            bar[i].className += ' active';
        }
    }
}

//第二屏动画
function boxTow() {
    if (box02_index >= 0 && box02_index < box02_text.length) {
        box02_text[box02_index].style.right = '0';
        box02_index++;
    } else {
        clearInterval(box02_timer);
    }
}

//滚动函数
function divMove(obj, overHeight, num) {
    if (obj.offsetTop >= overHeight) {
        //向下滚动
        var timer;
        timer = setInterval(function() {
            if ((obj.offsetTop - overHeight) <= num && (obj.offsetTop - overHeight) > 0) {
                obj.style.top = overHeight + 'px';
                clearInterval(timer);
            } else if ((obj.offsetTop - overHeight) > num) {
                obj.style.top = obj.offsetTop - num + 'px';
            }
        }, 10);
    } else if (obj.offsetTop < overHeight) {
        //向上滚动
        var timer;
        timer = setInterval(function() {
            if ((overHeight - obj.offsetTop) <= num && (overHeight - obj.offsetTop) > 0) {
                //最后定位
                obj.style.top = overHeight + 'px';
                clearInterval(timer);
            } else if ((overHeight - obj.offsetTop) > num) {
                //继续滚动
                obj.style.top = obj.offsetTop + num + 'px';
            }
        }, 10);
    }
}

function btnChange(index, flag, speed) {
    var height = window.innerHeight;
    var fh = foot.offsetHeight;
    if(index<5){
        for (var n = 0; n < f_btn.length; n++) {
            f_btn[n].style.background = "transparent";
        }
        for (var n = 0; n < nav_ul.length; n++) {
            nav_ul[n].style.color = '#000000';
        }
    }
    if (flag) {
        if (index <= 0) {
            indexs = 0;
            f_btn[0].style.background = "#ffffff";
            nav_ul[0].style.color = 'red';
            divMove(wrapBox, 0, 20 * speed);
        } else if (index > 0 && index <= 3) {
            f_btn[index].style.background = "#ffffff";
            nav_ul[index].style.color = 'red';
            divMove(wrapBox, -(height * indexs), 20 * speed);
        } else if (index == 4) {
            indexs = 4;
            divMove(wrapBox, (-height * 3 - fh), 20 * speed);
            nav_ul[index].style.color = 'red';
        } else {
            indexs = 4;
        }
    } else {
        if (index <= 0) {
            indexs = 0;
            f_btn[0].style.background = "#ffffff";
            nav_ul[0].style.color = 'red';
            wrapBox.style.top = "0";
        } else if (index > 0 && index <= 3) {
            f_btn[index].style.background = "#ffffff";
            nav_ul[index].style.color = 'red';
            wrapBox.style.top = (-height * indexs) + "px";
        } else if (index == 4) {
            indexs = 4;
            wrapBox.style.top = (-height * 3 - fh) + "px";
            nav_ul[index].style.color = 'red';
        } else {
            indexs = 4;
        }
    }
    if (indexs == 1 && !box02_flag) {
        box02_flag = true;
    }
    if (box02_flag) {
        //第二屏动画
        var timer = setTimeout(addActive, 1000);
        box02_timer = setInterval(boxTow,500);
    }
}

//浮动点击事件
for (var i = 0; i < f_btn.length; i++) {
    f_btn[i].indexs = i;
    f_btn[i].onclick = function() {
        var speed = Math.abs(indexs - this.indexs);
        indexs = this.indexs;
        btnChange(indexs, true, speed);
    }
}

//浮动nav事件
for (var i = 0; i < nav_ul.length; i++) {
    nav_ul[i].indexs = i;
    nav_ul[i].onclick = function() {
        var speed = Math.abs(indexs - this.indexs);
        indexs = this.indexs;
        btnChange(indexs, true, speed);
    }
}


//箭头点击事件
for (var i = 0; i < arrow.length; i++) {
    arrow[i].indexs = i;
    arrow[i].onclick = function() {
        indexs = this.indexs + 1;
        btnChange(indexs, true, 1);
    }
}

var oB = true;

//鼠标滑动事件
var scrollFunc = function(e) {
        e = e || window.event;
        if (e.wheelDelta) { //IE/Opera/Chrome
            if (oB) {
                //向上滑动
                if (e.wheelDelta >= 120) {
                    oB = false;
                    indexs--;
                    btnChange(indexs, true, 1);
                    setTimeout(function() {
                        oB = true;
                    }, 700);

                } else if (e.wheelDelta <= -120) {
                    oB = false;
                    //向下滑动
                    indexs++;
                    btnChange(indexs, true, 1);
                    setTimeout(function() {
                        oB = true;
                    }, 700);
                }
            }

        } else if (e.detail) { //Firefox         
            if (oB) {
                //向下滑动
                if (e.detail >= 3) {
                    oB = false;
                    indexs++;
                    btnChange(indexs, true, 1);
                    setTimeout(function() {
                        oB = true;
                    }, 700);
                    console.log("我在火狐下");
                }
                //向上滑动
                else if (e.detail <= -3) {
                    oB = false;
                    indexs--;
                    btnChange(indexs, true, 1);
                    setTimeout(function() {
                        oB = true;
                    }, 700);
                }
            }
        }
    }
    //FireFox
if (document.addEventListener) {
    document.addEventListener("DoMMouseScroll", scrollFunc, false);
}
//IE/Opera/Chrome
window.onmousewheel = document.onmousewheel = scrollFunc;

var iB = true;
//监听窗口改变
window.onresize = function() {
    document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 20 + 'px';
    var h = window.innerHeight;
    var w = window.innerWidth;
    if (w / h >= 1920 / 1080) {
        iB = true;
        imgChange(iB);
        //窗口大小改变,wrapBox改变
        btnChange(indexs); 
    } else {
        iB = false;
        imgChange(iB);
        btnChange(indexs,false); 
    }
    timeMove();
}

//不同屏幕下背景图的大小
function imgChange(iB) {
    var h = window.innerHeight;
    var w = window.innerWidth;
    if (iB) {
        for (var i = 0; i < bg.length; i++) {
            bg[i].style.width = w + 'px';
            bg[i].style.height = w * (1080 / 1920) + 'px';
            bg[i].style.top = -(w * (1080 / 1920) - h) / 2 + 'px';
            boxs[i].style.width = w + 'px';
            boxs[i].style.height = h + 'px';
            bg[i].style.left = '0';
        }
    } else {
        for (var i = 0; i < bg.length; i++) {
            bg[i].style.height = h + 'px';
            bg[i].style.width = h * (1920 / 1080) + 'px';
            bg[i].style.left = -(h * (1920 / 1080) - w) / 2 + 'px';
            boxs[i].style.width = w + 'px';
            boxs[i].style.height = h + 'px';
            bg[i].style.top = '0';
        }

    }
}
//时间线滑动函数
var timeMove = function(){
    var leftDiv = document.getElementById("left_div"),
    rightDiv = document.getElementById("right_div"),count = 0,liLength = document.getElementById("timeUl").children.length,flag;//flag防止多次点击
    rightDiv.onclick = function(){
        if( count == liLength-2){
            count = liLength-2;
        }else{
            count++;
            document.getElementById("timeUl").style.left = -document.getElementById("timeUl").children[0].offsetWidth*count+ "px";
            
        }
    }
    leftDiv.onclick = function(){
        if(count == 0 ){
            count = 0;
        }else{
            count--;
            document.getElementById("timeUl").style.left = -document.getElementById("timeUl").children[0].offsetWidth*count+ "px";
        }
    }
}; 
timeMove();