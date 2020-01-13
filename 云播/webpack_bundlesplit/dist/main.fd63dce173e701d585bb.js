(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getData } = __webpack_require__(/*! ./main */ \"./src/main.js\")\r\nconst { findMaxIndex } = __webpack_require__(/*! ./math */ \"./src/math.js\")\r\n\r\nlet arr = [1,2,123,21,3,21,321,1]\r\n\r\nfindMaxIndex(arr)\r\ngetData('./index.html')\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const axios = __webpack_require__(/*! axios */ \"./node_modules/_axios@0.18.0@axios/index.js\")\r\n\r\nconst getData = url => {\r\n    axios.get(url).then(d => {\r\n        console.log(d.status)\r\n        console.log(d.data.length)\r\n    })\r\n}\r\n\r\nmodule.exports = {\r\n    getData\r\n}\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const _ = __webpack_require__(/*! lodash */ \"./node_modules/_lodash@4.17.11@lodash/lodash.js\")\r\n\r\nconst findMaxIndex = arr => {\r\n    let x = _.max(arr)\r\n    let r = Array.prototype.indexOf.call(arr, x)\r\n    console.log(r);\r\n}\r\n\r\nmodule.exports = {\r\n    findMaxIndex\r\n}\n\n//# sourceURL=webpack:///./src/math.js?");

/***/ })

},[["./src/index.js","runtime","chunk-libs"]]]);