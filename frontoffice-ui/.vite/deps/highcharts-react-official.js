import {
  require_react
} from "./chunk-7JZAKNLV.js";
import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/highcharts-react-official/dist/highcharts-react.min.js
var require_highcharts_react_min = __commonJS({
  "node_modules/highcharts-react-official/dist/highcharts-react.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e(require_react()) : "function" == typeof define && define.amd ? define(["react"], e) : "object" == typeof exports ? exports.HighchartsReact = e(require_react()) : t.HighchartsReact = e(t.React);
    }("undefined" != typeof self ? self : exports, function(t) {
      return function(t2) {
        function e(n) {
          if (r[n]) return r[n].exports;
          var o = r[n] = { i: n, l: false, exports: {} };
          return t2[n].call(o.exports, o, o.exports, e), o.l = true, o.exports;
        }
        var r = {};
        return e.m = t2, e.c = r, e.d = function(t3, r2, n) {
          e.o(t3, r2) || Object.defineProperty(t3, r2, { configurable: false, enumerable: true, get: n });
        }, e.n = function(t3) {
          var r2 = t3 && t3.__esModule ? function() {
            return t3.default;
          } : function() {
            return t3;
          };
          return e.d(r2, "a", r2), r2;
        }, e.o = function(t3, e2) {
          return Object.prototype.hasOwnProperty.call(t3, e2);
        }, e.p = "", e(e.s = 0);
      }([function(t2, e, r) {
        "use strict";
        function n() {
          return n = Object.assign ? Object.assign.bind() : function(t3) {
            for (var e2 = 1; e2 < arguments.length; e2++) {
              var r2 = arguments[e2];
              for (var n2 in r2) Object.prototype.hasOwnProperty.call(r2, n2) && (t3[n2] = r2[n2]);
            }
            return t3;
          }, n.apply(this, arguments);
        }
        function o(t3) {
          return a(t3) || i(t3) || u(t3) || c();
        }
        function c() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function u(t3, e2) {
          if (t3) {
            if ("string" == typeof t3) return f(t3, e2);
            var r2 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Object" === r2 && t3.constructor && (r2 = t3.constructor.name), "Map" === r2 || "Set" === r2 ? Array.from(t3) : "Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2) ? f(t3, e2) : void 0;
          }
        }
        function i(t3) {
          if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"]) return Array.from(t3);
        }
        function a(t3) {
          if (Array.isArray(t3)) return f(t3);
        }
        function f(t3, e2) {
          (null == e2 || e2 > t3.length) && (e2 = t3.length);
          for (var r2 = 0, n2 = new Array(e2); r2 < e2; r2++) n2[r2] = t3[r2];
          return n2;
        }
        function s(t3) {
          "@babel/helpers - typeof";
          return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
            return typeof t4;
          } : function(t4) {
            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
          })(t3);
        }
        Object.defineProperty(e, "__esModule", { value: true }), r.d(e, "HighchartsReact", function() {
          return d;
        });
        var p = r(1), l = r.n(p), y = "undefined" != typeof window ? p.useLayoutEffect : p.useEffect, d = Object(p.memo)(Object(p.forwardRef)(function(t3, e2) {
          var r2 = Object(p.useRef)(), c2 = Object(p.useRef)(), u2 = Object(p.useRef)(t3.constructorType), i2 = Object(p.useRef)(t3.highcharts);
          return y(function() {
            function e3() {
              var e4 = t3.highcharts || "object" === ("undefined" == typeof window ? "undefined" : s(window)) && window.Highcharts, n3 = t3.constructorType || "chart";
              e4 ? e4[n3] ? t3.options ? c2.current = e4[n3](r2.current, t3.options, t3.callback) : console.warn('The "options" property was not passed.') : console.warn('The "constructorType" property is incorrect or some required module is not imported.') : console.warn('The "highcharts" property was not passed.');
            }
            if (c2.current) {
              if (false !== t3.allowChartUpdate) if (t3.constructorType !== u2.current || t3.highcharts !== i2.current) u2.current = t3.constructorType, i2.current = t3.highcharts, e3();
              else if (!t3.immutable && c2.current) {
                var n2;
                (n2 = c2.current).update.apply(n2, [t3.options].concat(o(t3.updateArgs || [true, true])));
              } else e3();
            } else e3();
          }, [t3.options, t3.allowChartUpdate, t3.updateArgs, t3.containerProps, t3.highcharts, t3.constructorType]), y(function() {
            return function() {
              c2.current && (c2.current.destroy(), c2.current = null);
            };
          }, []), Object(p.useImperativeHandle)(e2, function() {
            return { get chart() {
              return c2.current;
            }, container: r2 };
          }, []), l.a.createElement("div", n({}, t3.containerProps, { ref: r2 }));
        }));
        e.default = d;
      }, function(e, r) {
        e.exports = t;
      }]);
    });
  }
});
export default require_highcharts_react_min();
//# sourceMappingURL=highcharts-react-official.js.map
