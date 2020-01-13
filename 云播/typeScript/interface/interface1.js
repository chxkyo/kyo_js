function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ colour: 'black' });
var arr = [0, 1, 2, 3];
var noArr = arr;
var mySearch;
mySearch = function (source, substring) {
    var reault = source.search(substring);
    return reault > -1;
};
var myArr;
myArr = ["Bob", "hhaa"];
var myStr = myArr[0];
console.log(myStr);
