
function loading(){
 
    function Load(){}
 
    Load.prototype.loadImgs = function(urls,callback) {
        this.urls = urls;
        this.imgNumbers = urls.length;
        this.loadImgNumbers = 0;
        var that =this;
        for(var i=0;i<urls.length;i++){
            var obj = new Image();
            obj.src = urls[i];
            obj.onload = function(){
                that.loadImgNumbers++;
                callback(parseInt((that.loadImgNumbers/that.imgNumbers)*100));
            }
        }
    };
 
    var loader = new Load();
 
    loader.loadImgs([
        // 将所有需要加载的图片地址写于此处
        "http://domain/site/dist/img/XX.png",
        "http://domain/site/dist/img/XX.png",
        "http://domain/site/dist/img/XX.png",
        "http://domain/site/dist/img/XX.png",
        "http://domain/site/dist/img/XX.png",
        "http://domain/site/dist/img/XX.png",
        "http://domain/site/dist/img/XX.png"
    ],function(percent){
        // 假设显示百分比的元素为 $(".percent")
        $(".percent").text(percent+'%');
 
        // 加载结束后，隐藏相应的 loading 或遮罩
        if(percent==100) {
            $(".mask").css('display','none');
        }
    });
}
 
// 执行 loading 方法
loading();