"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.2.0_react@18.2.0__react@18.2.0_sass@1.77.8/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.2.0_react@18.2.0__react@18.2.0_sass@1.77.8/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _codegouvfr_react_dsfr_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @codegouvfr/react-dsfr/Card */ \"(app-pages-browser)/./node_modules/.pnpm/@codegouvfr+react-dsfr@1.9.28/node_modules/@codegouvfr/react-dsfr/Card.js\");\n/* harmony import */ var _src_components_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/components/constants */ \"(app-pages-browser)/./src/components/constants.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    const [products, setProducts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetch(_src_components_constants__WEBPACK_IMPORTED_MODULE_3__.GET_ALL_PRODUCTS).then((res)=>res.json()).then((data)=>setProducts(data));\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        console.log(\"prod: \", products);\n    }, [\n        products\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fr-container fr-my-4w\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"fr-grid-row fr-grid-row--gutters fr-my-2w\",\n            children: products.map((product, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"fr-col-4\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_codegouvfr_react_dsfr_Card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n                        background: true,\n                        border: true,\n                        desc: \"Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et\",\n                        footer: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                            className: \"fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"fr-btn\",\n                                        children: \"Modifier\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                                        lineNumber: 29,\n                                        columnNumber: 122\n                                    }, void 0)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                                    lineNumber: 29,\n                                    columnNumber: 118\n                                }, void 0),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        className: \"fr-btn fr-btn--secondary\",\n                                        children: \"Supprimer\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                                        lineNumber: 29,\n                                        columnNumber: 175\n                                    }, void 0)\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                                    lineNumber: 29,\n                                    columnNumber: 171\n                                }, void 0)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                            lineNumber: 29,\n                            columnNumber: 33\n                        }, void 0),\n                        imageAlt: \"texte alternatif de l’image\",\n                        imageUrl: \"https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png\",\n                        linkProps: {\n                            href: \"#\"\n                        },\n                        size: \"medium\",\n                        title: product,\n                        titleAs: \"h3\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 21\n                    }, this)\n                }, index, false, {\n                    fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n                    lineNumber: 24,\n                    columnNumber: 17\n                }, this))\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n            lineNumber: 22,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\jehan\\\\Documents\\\\test-dgfip\\\\web\\\\app\\\\page.tsx\",\n        lineNumber: 21,\n        columnNumber: 9\n    }, this);\n}\n_s(Home, \"yIMaXFJFJk3e4dtbshAaMPRShpc=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNrRDtBQUVDO0FBQ1k7QUFFaEQsU0FBU0s7O0lBQ3BCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHTCwrQ0FBUUEsQ0FBQyxFQUFFO0lBRTlDRCxnREFBU0EsQ0FBQztRQUNUTyxNQUFNSix1RUFBZ0JBLEVBQ3JCSyxJQUFJLENBQUNDLENBQUFBLE1BQU9BLElBQUlDLElBQUksSUFDcEJGLElBQUksQ0FBQ0csQ0FBQUEsT0FBUUwsWUFBWUs7SUFDM0IsR0FBRyxFQUFFO0lBRUxYLGdEQUFTQSxDQUFDO1FBQ1RZLFFBQVFDLEdBQUcsQ0FBQyxVQUFVUjtJQUN2QixHQUFHO1FBQUNBO0tBQVM7SUFFVixxQkFDSSw4REFBQ1M7UUFBSUMsV0FBVTtrQkFDWCw0RUFBQ0Q7WUFBSUMsV0FBVTtzQkFDZFYsU0FBU1csR0FBRyxDQUFDLENBQUNDLFNBQVNDLHNCQUNwQiw4REFBQ0o7b0JBQUlDLFdBQVU7OEJBQ1gsNEVBQUNiLDZEQUFJQTt3QkFDRGlCLFVBQVU7d0JBQ1ZDLE1BQU07d0JBQ05DLE1BQUs7d0JBQ0xDLHNCQUFRLDhEQUFDQzs0QkFBR1IsV0FBVTs7OENBQXVFLDhEQUFDUzs4Q0FBRyw0RUFBQ0M7d0NBQU9WLFdBQVU7a0RBQVM7Ozs7Ozs7Ozs7OzhDQUFzQiw4REFBQ1M7OENBQUcsNEVBQUNDO3dDQUFPVixXQUFVO2tEQUEyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBQ25NVyxVQUFTO3dCQUNUQyxVQUFTO3dCQUNUQyxXQUFXOzRCQUNYQyxNQUFNO3dCQUNOO3dCQUNBQyxNQUFLO3dCQUNMQyxPQUFPZDt3QkFDUGUsU0FBUTs7Ozs7O21CQWJlZDs7Ozs7Ozs7Ozs7Ozs7O0FBcUIvQztHQXRDd0JkO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9wYWdlLnRzeD83NjAzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwiQGNvZGVnb3V2ZnIvcmVhY3QtZHNmci9TZWFyY2hCYXJcIjtcclxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gXCJAY29kZWdvdXZmci9yZWFjdC1kc2ZyL0NhcmRcIjtcclxuaW1wb3J0IHsgR0VUX0FMTF9QUk9EVUNUUyB9IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gICAgY29uc3QgW3Byb2R1Y3RzLCBzZXRQcm9kdWN0c10gPSB1c2VTdGF0ZShbXSk7XHJcblx0XHJcblx0dXNlRWZmZWN0KCgpID0+IHtcclxuXHRcdGZldGNoKEdFVF9BTExfUFJPRFVDVFMpXHJcblx0XHQudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuXHRcdC50aGVuKGRhdGEgPT4gc2V0UHJvZHVjdHMoZGF0YSkpO1xyXG5cdH0sIFtdKVxyXG5cclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ3Byb2Q6ICcsIHByb2R1Y3RzKVxyXG5cdH0sIFtwcm9kdWN0c10pXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZnItY29udGFpbmVyIGZyLW15LTR3Jz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmci1ncmlkLXJvdyBmci1ncmlkLXJvdy0tZ3V0dGVycyBmci1teS0yd1wiPlxyXG4gICAgICAgICAgICB7cHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZyLWNvbC00JyBrZXk9e2luZGV4fT5cclxuICAgICAgICAgICAgICAgICAgICA8Q2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjPVwiTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcsIGluY2lkaWR1bnQsIHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBWaXRhZSBzYXBpZW4gcGVsbGVudGVzcXVlIGhhYml0YW50IG1vcmJpIHRyaXN0aXF1ZSBzZW5lY3R1cyBldFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb3Rlcj17PHVsIGNsYXNzTmFtZT1cImZyLWJ0bnMtZ3JvdXAgZnItYnRucy1ncm91cC0taW5saW5lLXJldmVyc2UgZnItYnRucy1ncm91cC0taW5saW5lLWxnXCI+PGxpPjxidXR0b24gY2xhc3NOYW1lPVwiZnItYnRuXCI+TW9kaWZpZXI8L2J1dHRvbj48L2xpPjxsaT48YnV0dG9uIGNsYXNzTmFtZT1cImZyLWJ0biBmci1idG4tLXNlY29uZGFyeVwiPlN1cHByaW1lcjwvYnV0dG9uPjwvbGk+PC91bD59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlQWx0PVwidGV4dGUgYWx0ZXJuYXRpZiBkZSBs4oCZaW1hZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVVybD1cImh0dHBzOi8vd3d3LnN5c3RlbWUtZGUtZGVzaWduLmdvdXYuZnIvaW1nL3BsYWNlaG9sZGVyLjE2eDkucG5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua1Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3Byb2R1Y3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlQXM9XCJoM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsvKiBTRVQgUEFHSU5BVElPTiAqL31cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ2FyZCIsIkdFVF9BTExfUFJPRFVDVFMiLCJIb21lIiwicHJvZHVjdHMiLCJzZXRQcm9kdWN0cyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImRpdiIsImNsYXNzTmFtZSIsIm1hcCIsInByb2R1Y3QiLCJpbmRleCIsImJhY2tncm91bmQiLCJib3JkZXIiLCJkZXNjIiwiZm9vdGVyIiwidWwiLCJsaSIsImJ1dHRvbiIsImltYWdlQWx0IiwiaW1hZ2VVcmwiLCJsaW5rUHJvcHMiLCJocmVmIiwic2l6ZSIsInRpdGxlIiwidGl0bGVBcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.tsx\n"));

/***/ })

});