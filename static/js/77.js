/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: 
 *  time: "2020-4-17 15:41:15"
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[77],{

/***/ "./src/api/icon.js":
/*!*************************!*\
  !*** ./src/api/icon.js ***!
  \*************************/
/*! exports provided: getIconList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIconList", function() { return getIconList; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");

function getIconList(data) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "/icon/list",
    method: "post",
    data: data
  });
}

/***/ })

}]);
//# sourceMappingURL=77.js.map