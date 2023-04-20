"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/styles/theme.ts":
/*!*****************************!*\
  !*** ./src/styles/theme.ts ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"flexBox\": function() { return /* binding */ flexBox; },\n/* harmony export */   \"media\": function() { return /* binding */ media; },\n/* harmony export */   \"positionCenter\": function() { return /* binding */ positionCenter; },\n/* harmony export */   \"theme\": function() { return /* binding */ theme; }\n/* harmony export */ });\nvar theme = {\n  colors: {\n    Lime: {\n      50: \"#F4FCE3\",\n      100: \"#F4FCE3\",\n      200: \"#D8F5A2\",\n      300: \"#C0EB75\",\n      400: \"#A9E34B\",\n      500: \"#94D82D\",\n      600: \"#82C91E\",\n      700: \"#74B816\",\n      800: \"#66A80F\",\n      900: \"#5C940D\"\n    },\n    Orange: {\n      50: \"#FFF4E6\",\n      100: \"#FFE8CC\",\n      200: \"#FFD8A8\",\n      300: \"#FFC078\",\n      400: \"#FFA94D\",\n      500: \"#FF922B\",\n      600: \"#FD7E14\",\n      700: \"#F76707\",\n      800: \"#E8590C\",\n      900: \"#D9480F\"\n    },\n    Gray: {\n      50: \"#F8F9FA\",\n      100: \"#F1F3F5\",\n      200: \"#E9ECEF\",\n      300: \"#DEE2E6\",\n      400: \"#CED4DA\",\n      500: \"#ADB5BD\",\n      600: \"#868E96\",\n      700: \"#495057\",\n      800: \"#343A40\",\n      900: \"#212529\"\n    }\n  },\n  media: {\n    mobile: \"min-width: 360px\",\n    tablet: \"min-width: 768px\",\n    desktop: \"min-width: 1440px\"\n  }\n}; // export const MIXINS = {\n//   // flex\n//   flexBox: (direction = \"row\", align = \"center\", justify = \"center\") => `\n//       display: flex;\n//       flex-direction: ${direction};\n//       align-items: ${align};\n//       justify-content: ${justify};\n//     `,\n//   // positions\n//   positionCenter: (type = \"absolute\") => {\n//     if (type === \"absolute\" || type === \"fixed\")\n//       return `\n//           position: ${type};\n//           left: 50%;\n//           top: 50%;\n//           transform: translate(-50%, -50%);\n//         `;\n//     return;\n//   },\n// };\n\nvar flexBox = function flexBox() {\n  var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"row\";\n  var align = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"center\";\n  var justify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"center\";\n  return \"\\n  display: flex;\\n  flex-direction: \".concat(direction, \";\\n  align-items: \").concat(align, \";\\n  justify-content: \").concat(justify, \";\\n\");\n};\nvar positionCenter = function positionCenter() {\n  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"absolute\";\n  if (type === \"absolute\" || type === \"fixed\") return \"\\n            position: \".concat(type, \";\\n            left: 50%;\\n            top: 50%;\\n            transform: translate(-50%, -50%);\\n          \");\n};\nvar media = {\n  mobile: \"min-width: 360px\",\n  tablet: \"min-width: 768px\",\n  desktop: \"min-width: 1440px\"\n};\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL3RoZW1lLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFTyxJQUFNQSxLQUFtQixHQUFHO0VBQ2pDQyxNQUFNLEVBQUU7SUFDTkMsSUFBSSxFQUFFO01BQ0osSUFBSSxTQURBO01BRUosS0FBSyxTQUZEO01BR0osS0FBSyxTQUhEO01BSUosS0FBSyxTQUpEO01BS0osS0FBSyxTQUxEO01BTUosS0FBSyxTQU5EO01BT0osS0FBSyxTQVBEO01BUUosS0FBSyxTQVJEO01BU0osS0FBSyxTQVREO01BVUosS0FBSztJQVZELENBREE7SUFhTkMsTUFBTSxFQUFFO01BQ04sSUFBSSxTQURFO01BRU4sS0FBSyxTQUZDO01BR04sS0FBSyxTQUhDO01BSU4sS0FBSyxTQUpDO01BS04sS0FBSyxTQUxDO01BTU4sS0FBSyxTQU5DO01BT04sS0FBSyxTQVBDO01BUU4sS0FBSyxTQVJDO01BU04sS0FBSyxTQVRDO01BVU4sS0FBSztJQVZDLENBYkY7SUF5Qk5DLElBQUksRUFBRTtNQUNKLElBQUksU0FEQTtNQUVKLEtBQUssU0FGRDtNQUdKLEtBQUssU0FIRDtNQUlKLEtBQUssU0FKRDtNQUtKLEtBQUssU0FMRDtNQU1KLEtBQUssU0FORDtNQU9KLEtBQUssU0FQRDtNQVFKLEtBQUssU0FSRDtNQVNKLEtBQUssU0FURDtNQVVKLEtBQUs7SUFWRDtFQXpCQSxDQUR5QjtFQXVDakNDLEtBQUssRUFBRTtJQUNMQyxNQUFNLEVBQUUsa0JBREg7SUFFTEMsTUFBTSxFQUFFLGtCQUZIO0lBR0xDLE9BQU8sRUFBRTtFQUhKO0FBdkMwQixDQUE1QixFQThDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVO0VBQUEsSUFBQ0MsU0FBRCx1RUFBYSxLQUFiO0VBQUEsSUFBb0JDLEtBQXBCLHVFQUE0QixRQUE1QjtFQUFBLElBQXNDQyxPQUF0Qyx1RUFBZ0QsUUFBaEQ7RUFBQSx1REFFSEYsU0FGRywrQkFHTkMsS0FITSxtQ0FJRkMsT0FKRTtBQUFBLENBQWhCO0FBT0EsSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixHQUF1QjtFQUFBLElBQXRCQyxJQUFzQix1RUFBZixVQUFlO0VBQ25ELElBQUlBLElBQUksS0FBSyxVQUFULElBQXVCQSxJQUFJLEtBQUssT0FBcEMsRUFDRSx5Q0FDb0JBLElBRHBCO0FBTUgsQ0FSTTtBQVVBLElBQU1ULEtBQUssR0FBRztFQUNuQkMsTUFBTSxvQkFEYTtFQUVuQkMsTUFBTSxvQkFGYTtFQUduQkMsT0FBTztBQUhZLENBQWQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3N0eWxlcy90aGVtZS50cz81MTYxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlZmF1bHRUaGVtZSB9IGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRoZW1lOiBEZWZhdWx0VGhlbWUgPSB7XHJcbiAgY29sb3JzOiB7XHJcbiAgICBMaW1lOiB7XHJcbiAgICAgIDUwOiBcIiNGNEZDRTNcIixcclxuICAgICAgMTAwOiBcIiNGNEZDRTNcIixcclxuICAgICAgMjAwOiBcIiNEOEY1QTJcIixcclxuICAgICAgMzAwOiBcIiNDMEVCNzVcIixcclxuICAgICAgNDAwOiBcIiNBOUUzNEJcIixcclxuICAgICAgNTAwOiBcIiM5NEQ4MkRcIixcclxuICAgICAgNjAwOiBcIiM4MkM5MUVcIixcclxuICAgICAgNzAwOiBcIiM3NEI4MTZcIixcclxuICAgICAgODAwOiBcIiM2NkE4MEZcIixcclxuICAgICAgOTAwOiBcIiM1Qzk0MERcIixcclxuICAgIH0sXHJcbiAgICBPcmFuZ2U6IHtcclxuICAgICAgNTA6IFwiI0ZGRjRFNlwiLFxyXG4gICAgICAxMDA6IFwiI0ZGRThDQ1wiLFxyXG4gICAgICAyMDA6IFwiI0ZGRDhBOFwiLFxyXG4gICAgICAzMDA6IFwiI0ZGQzA3OFwiLFxyXG4gICAgICA0MDA6IFwiI0ZGQTk0RFwiLFxyXG4gICAgICA1MDA6IFwiI0ZGOTIyQlwiLFxyXG4gICAgICA2MDA6IFwiI0ZEN0UxNFwiLFxyXG4gICAgICA3MDA6IFwiI0Y3NjcwN1wiLFxyXG4gICAgICA4MDA6IFwiI0U4NTkwQ1wiLFxyXG4gICAgICA5MDA6IFwiI0Q5NDgwRlwiLFxyXG4gICAgfSxcclxuICAgIEdyYXk6IHtcclxuICAgICAgNTA6IFwiI0Y4RjlGQVwiLFxyXG4gICAgICAxMDA6IFwiI0YxRjNGNVwiLFxyXG4gICAgICAyMDA6IFwiI0U5RUNFRlwiLFxyXG4gICAgICAzMDA6IFwiI0RFRTJFNlwiLFxyXG4gICAgICA0MDA6IFwiI0NFRDREQVwiLFxyXG4gICAgICA1MDA6IFwiI0FEQjVCRFwiLFxyXG4gICAgICA2MDA6IFwiIzg2OEU5NlwiLFxyXG4gICAgICA3MDA6IFwiIzQ5NTA1N1wiLFxyXG4gICAgICA4MDA6IFwiIzM0M0E0MFwiLFxyXG4gICAgICA5MDA6IFwiIzIxMjUyOVwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG1lZGlhOiB7XHJcbiAgICBtb2JpbGU6IFwibWluLXdpZHRoOiAzNjBweFwiLFxyXG4gICAgdGFibGV0OiBcIm1pbi13aWR0aDogNzY4cHhcIixcclxuICAgIGRlc2t0b3A6IFwibWluLXdpZHRoOiAxNDQwcHhcIixcclxuICB9LFxyXG59O1xyXG5cclxuLy8gZXhwb3J0IGNvbnN0IE1JWElOUyA9IHtcclxuLy8gICAvLyBmbGV4XHJcbi8vICAgZmxleEJveDogKGRpcmVjdGlvbiA9IFwicm93XCIsIGFsaWduID0gXCJjZW50ZXJcIiwganVzdGlmeSA9IFwiY2VudGVyXCIpID0+IGBcclxuLy8gICAgICAgZGlzcGxheTogZmxleDtcclxuLy8gICAgICAgZmxleC1kaXJlY3Rpb246ICR7ZGlyZWN0aW9ufTtcclxuLy8gICAgICAgYWxpZ24taXRlbXM6ICR7YWxpZ259O1xyXG4vLyAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICR7anVzdGlmeX07XHJcbi8vICAgICBgLFxyXG5cclxuLy8gICAvLyBwb3NpdGlvbnNcclxuLy8gICBwb3NpdGlvbkNlbnRlcjogKHR5cGUgPSBcImFic29sdXRlXCIpID0+IHtcclxuLy8gICAgIGlmICh0eXBlID09PSBcImFic29sdXRlXCIgfHwgdHlwZSA9PT0gXCJmaXhlZFwiKVxyXG4vLyAgICAgICByZXR1cm4gYFxyXG4vLyAgICAgICAgICAgcG9zaXRpb246ICR7dHlwZX07XHJcbi8vICAgICAgICAgICBsZWZ0OiA1MCU7XHJcbi8vICAgICAgICAgICB0b3A6IDUwJTtcclxuLy8gICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4vLyAgICAgICAgIGA7XHJcbi8vICAgICByZXR1cm47XHJcbi8vICAgfSxcclxuLy8gfTtcclxuXHJcbmV4cG9ydCBjb25zdCBmbGV4Qm94ID0gKGRpcmVjdGlvbiA9IFwicm93XCIsIGFsaWduID0gXCJjZW50ZXJcIiwganVzdGlmeSA9IFwiY2VudGVyXCIpID0+IGBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiAke2RpcmVjdGlvbn07XHJcbiAgYWxpZ24taXRlbXM6ICR7YWxpZ259O1xyXG4gIGp1c3RpZnktY29udGVudDogJHtqdXN0aWZ5fTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBwb3NpdGlvbkNlbnRlciA9ICh0eXBlID0gXCJhYnNvbHV0ZVwiKSA9PiB7XHJcbiAgaWYgKHR5cGUgPT09IFwiYWJzb2x1dGVcIiB8fCB0eXBlID09PSBcImZpeGVkXCIpXHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJHt0eXBlfTtcclxuICAgICAgICAgICAgbGVmdDogNTAlO1xyXG4gICAgICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgICAgICBgO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1lZGlhID0ge1xyXG4gIG1vYmlsZTogYG1pbi13aWR0aDogMzYwcHhgLFxyXG4gIHRhYmxldDogYG1pbi13aWR0aDogNzY4cHhgLFxyXG4gIGRlc2t0b3A6IGBtaW4td2lkdGg6IDE0NDBweGAsXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJ0aGVtZSIsImNvbG9ycyIsIkxpbWUiLCJPcmFuZ2UiLCJHcmF5IiwibWVkaWEiLCJtb2JpbGUiLCJ0YWJsZXQiLCJkZXNrdG9wIiwiZmxleEJveCIsImRpcmVjdGlvbiIsImFsaWduIiwianVzdGlmeSIsInBvc2l0aW9uQ2VudGVyIiwidHlwZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/styles/theme.ts\n"));

/***/ })

});