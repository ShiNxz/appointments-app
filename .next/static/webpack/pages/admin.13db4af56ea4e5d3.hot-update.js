"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/admin",{

/***/ "./utils/hooks/useAuth.ts":
/*!********************************!*\
  !*** ./utils/hooks/useAuth.ts ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swr */ \"./node_modules/swr/core/dist/index.mjs\");\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/dist/js.cookie.mjs\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _functions_Fetcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions/Fetcher */ \"./utils/functions/Fetcher.ts\");\n\n\n\n\nconst useAuth = ()=>{\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { data , mutate , error  } = (0,swr__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"/api/auth\", _functions_Fetcher__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n    const isLoading = !data && !error;\n    const isLoggedIn = !!(data === null || data === void 0 ? void 0 : data.userId) && !error;\n    const logout = async ()=>{\n        js_cookie__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove(\"token\");\n        router.push(\"/\");\n        await mutate();\n    };\n    console.log({\n        isLoading,\n        isLoggedIn,\n        user: data,\n        mutate,\n        logout\n    });\n    return {\n        isLoading,\n        isLoggedIn,\n        user: data,\n        mutate,\n        logout\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (useAuth);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi91dGlscy9ob29rcy91c2VBdXRoLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUN3QjtBQUNNO0FBQ2E7QUFDRDtBQUUxQyxNQUFNSSxVQUFVLElBQWE7SUFDNUIsTUFBTUMsU0FBU0gsMERBQVNBO0lBRXhCLE1BQU0sRUFBRUksS0FBSSxFQUFFQyxPQUFNLEVBQUVDLE1BQUssRUFBRSxHQUFHUiwrQ0FBTUEsQ0FBQyxhQUFhRywwREFBT0E7SUFFM0QsTUFBTU0sWUFBWSxDQUFDSCxRQUFRLENBQUNFO0lBQzVCLE1BQU1FLGFBQWEsQ0FBQyxDQUFDSixDQUFBQSxpQkFBQUEsa0JBQUFBLEtBQUFBLElBQUFBLEtBQU1LLE1BQU0sS0FBSSxDQUFDSDtJQUV0QyxNQUFNSSxTQUFTLFVBQVk7UUFDMUJYLHdEQUFhLENBQUM7UUFDZEksT0FBT1MsSUFBSSxDQUFDO1FBQ1osTUFBTVA7SUFDUDtJQUVBUSxRQUFRQyxHQUFHLENBQUM7UUFBRVA7UUFBV0M7UUFBWU8sTUFBTVg7UUFBTUM7UUFBUUs7SUFBTztJQUNoRSxPQUFPO1FBQUVIO1FBQVdDO1FBQVlPLE1BQU1YO1FBQU1DO1FBQVFLO0lBQU87QUFDNUQ7QUFVQSwrREFBZVIsT0FBT0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy9ob29rcy91c2VBdXRoLnRzP2YwODIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBJQXV0aFVzZXIgfSBmcm9tICdAL3BhZ2VzL2FwaS9hdXRoJ1xyXG5pbXBvcnQgdXNlU1dSIGZyb20gJ3N3cidcclxuaW1wb3J0IGNvb2tpZSBmcm9tICdqcy1jb29raWUnXHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbidcclxuaW1wb3J0IGZldGNoZXIgZnJvbSAnLi4vZnVuY3Rpb25zL0ZldGNoZXInXHJcblxyXG5jb25zdCB1c2VBdXRoID0gKCk6IElBdXRoID0+IHtcclxuXHRjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxuXHRjb25zdCB7IGRhdGEsIG11dGF0ZSwgZXJyb3IgfSA9IHVzZVNXUignL2FwaS9hdXRoJywgZmV0Y2hlcilcclxuXHJcblx0Y29uc3QgaXNMb2FkaW5nID0gIWRhdGEgJiYgIWVycm9yXHJcblx0Y29uc3QgaXNMb2dnZWRJbiA9ICEhZGF0YT8udXNlcklkICYmICFlcnJvclxyXG5cclxuXHRjb25zdCBsb2dvdXQgPSBhc3luYyAoKSA9PiB7XHJcblx0XHRjb29raWUucmVtb3ZlKCd0b2tlbicpXHJcblx0XHRyb3V0ZXIucHVzaCgnLycpXHJcblx0XHRhd2FpdCBtdXRhdGUoKVxyXG5cdH1cclxuXHJcblx0Y29uc29sZS5sb2coeyBpc0xvYWRpbmcsIGlzTG9nZ2VkSW4sIHVzZXI6IGRhdGEsIG11dGF0ZSwgbG9nb3V0IH0pXHJcblx0cmV0dXJuIHsgaXNMb2FkaW5nLCBpc0xvZ2dlZEluLCB1c2VyOiBkYXRhLCBtdXRhdGUsIGxvZ291dCB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQXV0aCB7XHJcblx0aXNMb2FkaW5nOiBib29sZWFuXHJcblx0aXNMb2dnZWRJbjogYm9vbGVhblxyXG5cdHVzZXI6IElBdXRoVXNlclxyXG5cdG11dGF0ZTogKCkgPT4gUHJvbWlzZTx2b2lkPlxyXG5cdGxvZ291dDogKCkgPT4gdm9pZFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VBdXRoXHJcbiJdLCJuYW1lcyI6WyJ1c2VTV1IiLCJjb29raWUiLCJ1c2VSb3V0ZXIiLCJmZXRjaGVyIiwidXNlQXV0aCIsInJvdXRlciIsImRhdGEiLCJtdXRhdGUiLCJlcnJvciIsImlzTG9hZGluZyIsImlzTG9nZ2VkSW4iLCJ1c2VySWQiLCJsb2dvdXQiLCJyZW1vdmUiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsInVzZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./utils/hooks/useAuth.ts\n"));

/***/ })

});