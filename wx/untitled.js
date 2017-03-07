module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/    var installedModules = {};
/******/    function __webpack_require__(moduleId) {
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/        module.l = true;
/******/        return module.exports;
/******/    }

/******/    __webpack_require__.m = modules;
/******/    __webpack_require__.c = installedModules;
/******/    __webpack_require__.i = function(value) { return value; };
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };

/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/    __webpack_require__.p = "";
/******/    return __webpack_require__(__webpack_require__.s = 225);
/******/ })
/******/ ({
/***/     101:
/***/     function(module, exports) {
          // removed by extract-text-webpack-plugin
          },
/***/     143:
/***/     function(module, exports, __webpack_require__) {
/***/       var __vue_exports__, __vue_options__
            var __vue_styles__ = {}
            __webpack_require__(101)
            __vue_exports__ = __webpack_require__(65)
            /* template */
            var __vue_template__ = __webpack_require__(171)
            __vue_options__ = __vue_exports__ = __vue_exports__ || {}
            if( typeof __vue_exports__.default === "object" || typeof __vue_exports__.default === "function" ) {
              __vue_options__ = __vue_exports__ = __vue_exports__.default
            }
            if (typeof __vue_options__ === "function") {
              __vue_options__ = __vue_options__.options
            }
            __vue_options__.render = __vue_template__.render
            __vue_options__.staticRenderFns = __vue_template__.staticRenderFns
            module.exports = __vue_exports__
          },
/***/     171:
/***/     function(module, exports) {
          module.exports={
            render:function (){
              var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
              return _c('div', {
                staticClass: "mint-navbar",
                class: {
                  'is-fixed': _vm.fixed
                }
              }, [_vm._t("default")], 2)
            },staticRenderFns: []}
          },

/***/     225:
/***/     function(module, exports, __webpack_require__) {
            module.exports = __webpack_require__(33);
/***/     },
/***/     33:
/***/     function(module, exports, __webpack_require__) {
            "use strict";
            /* harmony import */ 
            var __WEBPACK_IMPORTED_MODULE_0__src_navbar_vue__ = __webpack_require__(143);
            /* harmony import */ 
            var __WEBPACK_IMPORTED_MODULE_0__src_navbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_navbar_vue__);
            Object.defineProperty(exports, "__esModule", { value: true });
            /* harmony reexport (default from non-hamory) */ 
            __webpack_require__.d(exports, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__src_navbar_vue___default.a; });
/***/     },
/***/     65:
/***/     function(module, exports, __webpack_require__) {
            "use strict";
            Object.defineProperty(exports, "__esModule", { value: true });
/**
 * mt-navbar
 * @module components/navbar
 * @desc 顶部 tab，依赖 tab-item
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} selected - 返回 item component 传入的 value
 * @example
 * <mt-navbar :selected.sync="selected">
 *   <mt-tab-item value="订单">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-navbar>
 *
 * <mt-navbar :selected.sync="selected" fixed>
 *   <mt-tab-item :value="['传入数组', '也是可以的']">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-navbar>
 *
 */
/* harmony default export */ 
          exports["default"] = {
            name: 'mt-navbar',
            props: {
              fixed: Boolean,
              value: {}
            }
          };
        }
      }
      );