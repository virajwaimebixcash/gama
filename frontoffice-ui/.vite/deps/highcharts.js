import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/highcharts/highcharts.js
var require_highcharts = __commonJS({
  "node_modules/highcharts/highcharts.js"(exports, module) {
    !/**
    * Highcharts JS v11.4.8 (2024-08-29)
    *
    * (c) 2009-2024 Torstein Honsi
    *
    * License: www.highcharts.com/license
    */
    function(t, e) {
      "object" == typeof module && module.exports ? (e.default = e, module.exports = t && t.document ? e(t) : e) : "function" == typeof define && define.amd ? define("highcharts/highcharts", function() {
        return e(t);
      }) : (t.Highcharts && t.Highcharts.error(16, true), t.Highcharts = e(t));
    }("undefined" != typeof window ? window : exports, function(t) {
      "use strict";
      var e = {};
      function i(e2, i2, s, r) {
        !e2.hasOwnProperty(i2) && (e2[i2] = r.apply(null, s), t && "function" == typeof CustomEvent && t.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: i2, module: e2[i2] } })));
      }
      return i(e, "Core/Globals.js", [], function() {
        var e2, i2;
        return (i2 = e2 || (e2 = {})).SVG_NS = "http://www.w3.org/2000/svg", i2.product = "Highcharts", i2.version = "11.4.8", i2.win = void 0 !== t ? t : {}, i2.doc = i2.win.document, i2.svg = i2.doc && i2.doc.createElementNS && !!i2.doc.createElementNS(i2.SVG_NS, "svg").createSVGRect, i2.userAgent = i2.win.navigator && i2.win.navigator.userAgent || "", i2.isChrome = i2.win.chrome, i2.isFirefox = -1 !== i2.userAgent.indexOf("Firefox"), i2.isMS = /(edge|msie|trident)/i.test(i2.userAgent) && !i2.win.opera, i2.isSafari = !i2.isChrome && -1 !== i2.userAgent.indexOf("Safari"), i2.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(i2.userAgent), i2.isWebKit = -1 !== i2.userAgent.indexOf("AppleWebKit"), i2.deg2rad = 2 * Math.PI / 360, i2.hasBidiBug = i2.isFirefox && 4 > parseInt(i2.userAgent.split("Firefox/")[1], 10), i2.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"], i2.noop = function() {
        }, i2.supportsPassiveEvents = function() {
          let t2 = false;
          if (!i2.isMS) {
            let e3 = Object.defineProperty({}, "passive", { get: function() {
              t2 = true;
            } });
            i2.win.addEventListener && i2.win.removeEventListener && (i2.win.addEventListener("testPassive", i2.noop, e3), i2.win.removeEventListener("testPassive", i2.noop, e3));
          }
          return t2;
        }(), i2.charts = [], i2.composed = [], i2.dateFormats = {}, i2.seriesTypes = {}, i2.symbolSizes = {}, i2.chartCount = 0, e2;
      }), i(e, "Core/Utilities.js", [e["Core/Globals.js"]], function(t2) {
        let e2;
        let { charts: i2, doc: s, win: r } = t2;
        function o(e3, i3, s2, n2) {
          let a2 = i3 ? "Highcharts error" : "Highcharts warning";
          32 === e3 && (e3 = `${a2}: Deprecated member`);
          let h2 = p(e3), l2 = h2 ? `${a2} #${e3}: www.highcharts.com/errors/${e3}/` : e3.toString();
          if (void 0 !== n2) {
            let t3 = "";
            h2 && (l2 += "?"), C(n2, function(e4, i4) {
              t3 += `
 - ${i4}: ${e4}`, h2 && (l2 += encodeURI(i4) + "=" + encodeURI(e4));
            }), l2 += t3;
          }
          M(t2, "displayError", { chart: s2, code: e3, message: l2, params: n2 }, function() {
            if (i3) throw Error(l2);
            r.console && -1 === o.messages.indexOf(l2) && console.warn(l2);
          }), o.messages.push(l2);
        }
        function n(t3, e3) {
          return parseInt(t3, e3 || 10);
        }
        function a(t3) {
          return "string" == typeof t3;
        }
        function h(t3) {
          let e3 = Object.prototype.toString.call(t3);
          return "[object Array]" === e3 || "[object Array Iterator]" === e3;
        }
        function l(t3, e3) {
          return !!t3 && "object" == typeof t3 && (!e3 || !h(t3));
        }
        function d(t3) {
          return l(t3) && "number" == typeof t3.nodeType;
        }
        function c(t3) {
          let e3 = t3 && t3.constructor;
          return !!(l(t3, true) && !d(t3) && e3 && e3.name && "Object" !== e3.name);
        }
        function p(t3) {
          return "number" == typeof t3 && !isNaN(t3) && t3 < 1 / 0 && t3 > -1 / 0;
        }
        function u(t3) {
          return null != t3;
        }
        function g(t3, e3, i3) {
          let s2;
          let r2 = a(e3) && !u(i3), o2 = (e4, i4) => {
            u(e4) ? t3.setAttribute(i4, e4) : r2 ? (s2 = t3.getAttribute(i4)) || "class" !== i4 || (s2 = t3.getAttribute(i4 + "Name")) : t3.removeAttribute(i4);
          };
          return a(e3) ? o2(i3, e3) : C(e3, o2), s2;
        }
        function f(t3) {
          return h(t3) ? t3 : [t3];
        }
        function m(t3, e3) {
          let i3;
          for (i3 in t3 || (t3 = {}), e3) t3[i3] = e3[i3];
          return t3;
        }
        function x() {
          let t3 = arguments, e3 = t3.length;
          for (let i3 = 0; i3 < e3; i3++) {
            let e4 = t3[i3];
            if (null != e4) return e4;
          }
        }
        function y(t3, e3) {
          m(t3.style, e3);
        }
        function b(t3) {
          return Math.pow(10, Math.floor(Math.log(t3) / Math.LN10));
        }
        function v(t3, e3) {
          return t3 > 1e14 ? t3 : parseFloat(t3.toPrecision(e3 || 14));
        }
        (o || (o = {})).messages = [], Math.easeInOutSine = function(t3) {
          return -0.5 * (Math.cos(Math.PI * t3) - 1);
        };
        let S = Array.prototype.find ? function(t3, e3) {
          return t3.find(e3);
        } : function(t3, e3) {
          let i3;
          let s2 = t3.length;
          for (i3 = 0; i3 < s2; i3++) if (e3(t3[i3], i3)) return t3[i3];
        };
        function C(t3, e3, i3) {
          for (let s2 in t3) Object.hasOwnProperty.call(t3, s2) && e3.call(i3 || t3[s2], t3[s2], s2, t3);
        }
        function k(t3, e3, i3) {
          function s2(e4, i4) {
            let s3 = t3.removeEventListener;
            s3 && s3.call(t3, e4, i4, false);
          }
          function r2(i4) {
            let r3, o3;
            t3.nodeName && (e3 ? (r3 = {})[e3] = true : r3 = i4, C(r3, function(t4, e4) {
              if (i4[e4]) for (o3 = i4[e4].length; o3--; ) s2(e4, i4[e4][o3].fn);
            }));
          }
          let o2 = "function" == typeof t3 && t3.prototype || t3;
          if (Object.hasOwnProperty.call(o2, "hcEvents")) {
            let t4 = o2.hcEvents;
            if (e3) {
              let o3 = t4[e3] || [];
              i3 ? (t4[e3] = o3.filter(function(t5) {
                return i3 !== t5.fn;
              }), s2(e3, i3)) : (r2(t4), t4[e3] = []);
            } else r2(t4), delete o2.hcEvents;
          }
        }
        function M(e3, i3, r2, o2) {
          if (r2 = r2 || {}, s.createEvent && (e3.dispatchEvent || e3.fireEvent && e3 !== t2)) {
            let t3 = s.createEvent("Events");
            t3.initEvent(i3, true, true), r2 = m(t3, r2), e3.dispatchEvent ? e3.dispatchEvent(r2) : e3.fireEvent(i3, r2);
          } else if (e3.hcEvents) {
            r2.target || m(r2, { preventDefault: function() {
              r2.defaultPrevented = true;
            }, target: e3, type: i3 });
            let t3 = [], s2 = e3, o3 = false;
            for (; s2.hcEvents; ) Object.hasOwnProperty.call(s2, "hcEvents") && s2.hcEvents[i3] && (t3.length && (o3 = true), t3.unshift.apply(t3, s2.hcEvents[i3])), s2 = Object.getPrototypeOf(s2);
            o3 && t3.sort((t4, e4) => t4.order - e4.order), t3.forEach((t4) => {
              false === t4.fn.call(e3, r2) && r2.preventDefault();
            });
          }
          o2 && !r2.defaultPrevented && o2.call(e3, r2);
        }
        C({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function(e3, i3) {
          t2[i3] = function(t3) {
            return o(32, false, void 0, { [`Highcharts.${i3}`]: `use Array.${e3}` }), Array.prototype[e3].apply(t3, [].slice.call(arguments, 1));
          };
        });
        let w = function() {
          let t3 = Math.random().toString(36).substring(2, 9) + "-", i3 = 0;
          return function() {
            return "highcharts-" + (e2 ? "" : t3) + i3++;
          };
        }();
        return r.jQuery && (r.jQuery.fn.highcharts = function() {
          let e3 = [].slice.call(arguments);
          if (this[0]) return e3[0] ? (new t2[a(e3[0]) ? e3.shift() : "Chart"](this[0], e3[0], e3[1]), this) : i2[g(this[0], "data-highcharts-chart")];
        }), { addEvent: function(e3, i3, s2, r2 = {}) {
          let o2 = "function" == typeof e3 && e3.prototype || e3;
          Object.hasOwnProperty.call(o2, "hcEvents") || (o2.hcEvents = {});
          let n2 = o2.hcEvents;
          t2.Point && e3 instanceof t2.Point && e3.series && e3.series.chart && (e3.series.chart.runTrackerClick = true);
          let a2 = e3.addEventListener;
          a2 && a2.call(e3, i3, s2, !!t2.supportsPassiveEvents && { passive: void 0 === r2.passive ? -1 !== i3.indexOf("touch") : r2.passive, capture: false }), n2[i3] || (n2[i3] = []);
          let h2 = { fn: s2, order: "number" == typeof r2.order ? r2.order : 1 / 0 };
          return n2[i3].push(h2), n2[i3].sort((t3, e4) => t3.order - e4.order), function() {
            k(e3, i3, s2);
          };
        }, arrayMax: function(t3) {
          let e3 = t3.length, i3 = t3[0];
          for (; e3--; ) t3[e3] > i3 && (i3 = t3[e3]);
          return i3;
        }, arrayMin: function(t3) {
          let e3 = t3.length, i3 = t3[0];
          for (; e3--; ) t3[e3] < i3 && (i3 = t3[e3]);
          return i3;
        }, attr: g, clamp: function(t3, e3, i3) {
          return t3 > e3 ? t3 < i3 ? t3 : i3 : e3;
        }, clearTimeout: function(t3) {
          u(t3) && clearTimeout(t3);
        }, correctFloat: v, createElement: function(t3, e3, i3, r2, o2) {
          let n2 = s.createElement(t3);
          return e3 && m(n2, e3), o2 && y(n2, { padding: "0", border: "none", margin: "0" }), i3 && y(n2, i3), r2 && r2.appendChild(n2), n2;
        }, crisp: (t3, e3 = 0, i3) => {
          let s2 = e3 % 2 / 2, r2 = i3 ? -1 : 1;
          return (Math.round(t3 * r2 - s2) + s2) * r2;
        }, css: y, defined: u, destroyObjectProperties: function(t3, e3, i3) {
          C(t3, function(s2, r2) {
            s2 !== e3 && (s2 == null ? void 0 : s2.destroy) && s2.destroy(), ((s2 == null ? void 0 : s2.destroy) || !i3) && delete t3[r2];
          });
        }, diffObjects: function(t3, e3, i3, s2) {
          let r2 = {};
          return function t4(e4, r3, o2, n2) {
            let a2 = i3 ? r3 : e4;
            C(e4, function(i4, d2) {
              if (!n2 && s2 && s2.indexOf(d2) > -1 && r3[d2]) {
                i4 = f(i4), o2[d2] = [];
                for (let e5 = 0; e5 < Math.max(i4.length, r3[d2].length); e5++) r3[d2][e5] && (void 0 === i4[e5] ? o2[d2][e5] = r3[d2][e5] : (o2[d2][e5] = {}, t4(i4[e5], r3[d2][e5], o2[d2][e5], n2 + 1)));
              } else l(i4, true) && !i4.nodeType ? (o2[d2] = h(i4) ? [] : {}, t4(i4, r3[d2] || {}, o2[d2], n2 + 1), 0 !== Object.keys(o2[d2]).length || "colorAxis" === d2 && 0 === n2 || delete o2[d2]) : (e4[d2] !== r3[d2] || d2 in e4 && !(d2 in r3)) && "__proto__" !== d2 && "constructor" !== d2 && (o2[d2] = a2[d2]);
            });
          }(t3, e3, r2, 0), r2;
        }, discardElement: function(t3) {
          t3 && t3.parentElement && t3.parentElement.removeChild(t3);
        }, erase: function(t3, e3) {
          let i3 = t3.length;
          for (; i3--; ) if (t3[i3] === e3) {
            t3.splice(i3, 1);
            break;
          }
        }, error: o, extend: m, extendClass: function(t3, e3) {
          let i3 = function() {
          };
          return i3.prototype = new t3(), m(i3.prototype, e3), i3;
        }, find: S, fireEvent: M, getClosestDistance: function(t3, e3) {
          let i3, s2, r2, o2;
          let n2 = !e3;
          return t3.forEach((t4) => {
            if (t4.length > 1) for (o2 = s2 = t4.length - 1; o2 > 0; o2--) (r2 = t4[o2] - t4[o2 - 1]) < 0 && !n2 ? (e3 == null ? void 0 : e3(), e3 = void 0) : r2 && (void 0 === i3 || r2 < i3) && (i3 = r2);
          }), i3;
        }, getMagnitude: b, getNestedProperty: function(t3, e3) {
          let i3 = t3.split(".");
          for (; i3.length && u(e3); ) {
            let t4 = i3.shift();
            if (void 0 === t4 || "__proto__" === t4) return;
            if ("this" === t4) {
              let t5;
              return l(e3) && (t5 = e3["@this"]), t5 ?? e3;
            }
            let s2 = e3[t4];
            if (!u(s2) || "function" == typeof s2 || "number" == typeof s2.nodeType || s2 === r) return;
            e3 = s2;
          }
          return e3;
        }, getStyle: function t3(e3, i3, s2) {
          let o2;
          if ("width" === i3) {
            let i4 = Math.min(e3.offsetWidth, e3.scrollWidth), s3 = e3.getBoundingClientRect && e3.getBoundingClientRect().width;
            return s3 < i4 && s3 >= i4 - 1 && (i4 = Math.floor(s3)), Math.max(0, i4 - (t3(e3, "padding-left", true) || 0) - (t3(e3, "padding-right", true) || 0));
          }
          if ("height" === i3) return Math.max(0, Math.min(e3.offsetHeight, e3.scrollHeight) - (t3(e3, "padding-top", true) || 0) - (t3(e3, "padding-bottom", true) || 0));
          let a2 = r.getComputedStyle(e3, void 0);
          return a2 && (o2 = a2.getPropertyValue(i3), x(s2, "opacity" !== i3) && (o2 = n(o2))), o2;
        }, inArray: function(t3, e3, i3) {
          return o(32, false, void 0, { "Highcharts.inArray": "use Array.indexOf" }), e3.indexOf(t3, i3);
        }, insertItem: function(t3, e3) {
          let i3;
          let s2 = t3.options.index, r2 = e3.length;
          for (i3 = t3.options.isInternal ? r2 : 0; i3 < r2 + 1; i3++) if (!e3[i3] || p(s2) && s2 < x(e3[i3].options.index, e3[i3]._i) || e3[i3].options.isInternal) {
            e3.splice(i3, 0, t3);
            break;
          }
          return i3;
        }, isArray: h, isClass: c, isDOMElement: d, isFunction: function(t3) {
          return "function" == typeof t3;
        }, isNumber: p, isObject: l, isString: a, keys: function(t3) {
          return o(32, false, void 0, { "Highcharts.keys": "use Object.keys" }), Object.keys(t3);
        }, merge: function() {
          let t3, e3 = arguments, i3 = {}, s2 = function(t4, e4) {
            return "object" != typeof t4 && (t4 = {}), C(e4, function(i4, r3) {
              "__proto__" !== r3 && "constructor" !== r3 && (!l(i4, true) || c(i4) || d(i4) ? t4[r3] = e4[r3] : t4[r3] = s2(t4[r3] || {}, i4));
            }), t4;
          };
          true === e3[0] && (i3 = e3[1], e3 = Array.prototype.slice.call(e3, 2));
          let r2 = e3.length;
          for (t3 = 0; t3 < r2; t3++) i3 = s2(i3, e3[t3]);
          return i3;
        }, normalizeTickInterval: function(t3, e3, i3, s2, r2) {
          let o2, n2 = t3;
          i3 = x(i3, b(t3));
          let a2 = t3 / i3;
          for (!e3 && (e3 = r2 ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], false === s2 && (1 === i3 ? e3 = e3.filter(function(t4) {
            return t4 % 1 == 0;
          }) : i3 <= 0.1 && (e3 = [1 / i3]))), o2 = 0; o2 < e3.length && (n2 = e3[o2], (!r2 || !(n2 * i3 >= t3)) && (r2 || !(a2 <= (e3[o2] + (e3[o2 + 1] || e3[o2])) / 2))); o2++) ;
          return v(n2 * i3, -Math.round(Math.log(1e-3) / Math.LN10));
        }, objectEach: C, offset: function(t3) {
          let e3 = s.documentElement, i3 = t3.parentElement || t3.parentNode ? t3.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
          return { top: i3.top + (r.pageYOffset || e3.scrollTop) - (e3.clientTop || 0), left: i3.left + (r.pageXOffset || e3.scrollLeft) - (e3.clientLeft || 0), width: i3.width, height: i3.height };
        }, pad: function(t3, e3, i3) {
          return Array((e3 || 2) + 1 - String(t3).replace("-", "").length).join(i3 || "0") + t3;
        }, pick: x, pInt: n, pushUnique: function(t3, e3) {
          return 0 > t3.indexOf(e3) && !!t3.push(e3);
        }, relativeLength: function(t3, e3, i3) {
          return /%$/.test(t3) ? e3 * parseFloat(t3) / 100 + (i3 || 0) : parseFloat(t3);
        }, removeEvent: k, replaceNested: function(t3, ...e3) {
          let i3, s2;
          do
            for (s2 of (i3 = t3, e3)) t3 = t3.replace(s2[0], s2[1]);
          while (t3 !== i3);
          return t3;
        }, splat: f, stableSort: function(t3, e3) {
          let i3, s2;
          let r2 = t3.length;
          for (s2 = 0; s2 < r2; s2++) t3[s2].safeI = s2;
          for (t3.sort(function(t4, s3) {
            return 0 === (i3 = e3(t4, s3)) ? t4.safeI - s3.safeI : i3;
          }), s2 = 0; s2 < r2; s2++) delete t3[s2].safeI;
        }, syncTimeout: function(t3, e3, i3) {
          return e3 > 0 ? setTimeout(t3, e3, i3) : (t3.call(0, i3), -1);
        }, timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 }, uniqueKey: w, useSerialIds: function(t3) {
          return e2 = x(t3, e2);
        }, wrap: function(t3, e3, i3) {
          let s2 = t3[e3];
          t3[e3] = function() {
            let t4 = arguments, e4 = this;
            return i3.apply(this, [function() {
              return s2.apply(e4, arguments.length ? arguments : t4);
            }].concat([].slice.call(arguments)));
          };
        } };
      }), i(e, "Core/Chart/ChartDefaults.js", [], function() {
        return { alignThresholds: false, panning: { enabled: false, type: "x" }, styledMode: false, borderRadius: 0, colorCount: 10, allowMutatingData: true, ignoreHiddenSeries: true, spacing: [10, 10, 15, 10], resetZoomButton: { theme: {}, position: {} }, reflow: true, type: "line", zooming: { singleTouch: false, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null, borderColor: "#334eff", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" };
      }), i(e, "Core/Color/Palettes.js", [], function() {
        return { colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e1"] };
      }), i(e, "Core/Time.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { win: i2 } = t2, { defined: s, error: r, extend: o, isNumber: n, isObject: a, merge: h, objectEach: l, pad: d, pick: c, splat: p, timeUnits: u } = e2, g = t2.isSafari && i2.Intl && i2.Intl.DateTimeFormat.prototype.formatRange, f = t2.isSafari && i2.Intl && !i2.Intl.DateTimeFormat.prototype.formatRange;
        class m {
          constructor(t3) {
            this.options = {}, this.useUTC = false, this.variableTimezone = false, this.Date = i2.Date, this.getTimezoneOffset = this.timezoneOffsetFunction(), this.update(t3);
          }
          get(t3, e3) {
            if (this.variableTimezone || this.timezoneOffset) {
              let i3 = e3.getTime(), s2 = i3 - this.getTimezoneOffset(e3);
              e3.setTime(s2);
              let r2 = e3["getUTC" + t3]();
              return e3.setTime(i3), r2;
            }
            return this.useUTC ? e3["getUTC" + t3]() : e3["get" + t3]();
          }
          set(t3, e3, i3) {
            if (this.variableTimezone || this.timezoneOffset) {
              if ("Milliseconds" === t3 || "Seconds" === t3 || "Minutes" === t3 && this.getTimezoneOffset(e3) % 36e5 == 0) return e3["setUTC" + t3](i3);
              let s2 = this.getTimezoneOffset(e3), r2 = e3.getTime() - s2;
              e3.setTime(r2), e3["setUTC" + t3](i3);
              let o2 = this.getTimezoneOffset(e3);
              return r2 = e3.getTime() + o2, e3.setTime(r2);
            }
            return this.useUTC || g && "FullYear" === t3 ? e3["setUTC" + t3](i3) : e3["set" + t3](i3);
          }
          update(t3 = {}) {
            let e3 = c(t3.useUTC, true);
            this.options = t3 = h(true, this.options, t3), this.Date = t3.Date || i2.Date || Date, this.useUTC = e3, this.timezoneOffset = e3 && t3.timezoneOffset || void 0, this.getTimezoneOffset = this.timezoneOffsetFunction(), this.variableTimezone = e3 && !!(t3.getTimezoneOffset || t3.timezone);
          }
          makeTime(t3, e3, i3, s2, r2, o2) {
            let n2, a2, h2;
            return this.useUTC ? (n2 = this.Date.UTC.apply(0, arguments), a2 = this.getTimezoneOffset(n2), n2 += a2, a2 !== (h2 = this.getTimezoneOffset(n2)) ? n2 += h2 - a2 : a2 - 36e5 !== this.getTimezoneOffset(n2 - 36e5) || f || (n2 -= 36e5)) : n2 = new this.Date(t3, e3, c(i3, 1), c(s2, 0), c(r2, 0), c(o2, 0)).getTime(), n2;
          }
          timezoneOffsetFunction() {
            let t3 = this, e3 = this.options, i3 = e3.getTimezoneOffset;
            return this.useUTC ? e3.timezone ? (t4) => {
              try {
                let i4 = `shortOffset,${e3.timezone || ""}`, [s2, r2, o2, a2, h2 = 0] = (m.formatCache[i4] = m.formatCache[i4] || Intl.DateTimeFormat("en", { timeZone: e3.timezone, timeZoneName: "shortOffset" })).format(t4).split(/(GMT|:)/).map(Number), l2 = -(36e5 * (o2 + h2 / 60));
                if (n(l2)) return l2;
              } catch (t5) {
                r(34);
              }
              return 0;
            } : this.useUTC && i3 ? (t4) => 6e4 * i3(t4.valueOf()) : () => 6e4 * (t3.timezoneOffset || 0) : (t4) => 6e4 * new Date(t4.toString()).getTimezoneOffset();
          }
          dateFormat(e3, i3, r2) {
            if (!s(i3) || isNaN(i3)) return t2.defaultOptions.lang && t2.defaultOptions.lang.invalidDate || "";
            e3 = c(e3, "%Y-%m-%d %H:%M:%S");
            let n2 = this, a2 = new this.Date(i3), h2 = this.get("Hours", a2), p2 = this.get("Day", a2), u2 = this.get("Date", a2), g2 = this.get("Month", a2), f2 = this.get("FullYear", a2), m2 = t2.defaultOptions.lang, x = m2 && m2.weekdays, y = m2 && m2.shortWeekdays;
            return l(o({ a: y ? y[p2] : x[p2].substr(0, 3), A: x[p2], d: d(u2), e: d(u2, 2, " "), w: p2, b: m2.shortMonths[g2], B: m2.months[g2], m: d(g2 + 1), o: g2 + 1, y: f2.toString().substr(2, 2), Y: f2, H: d(h2), k: h2, I: d(h2 % 12 || 12), l: h2 % 12 || 12, M: d(this.get("Minutes", a2)), p: h2 < 12 ? "AM" : "PM", P: h2 < 12 ? "am" : "pm", S: d(this.get("Seconds", a2)), L: d(Math.floor(i3 % 1e3), 3) }, t2.dateFormats), function(t3, s2) {
              for (; -1 !== e3.indexOf("%" + s2); ) e3 = e3.replace("%" + s2, "function" == typeof t3 ? t3.call(n2, i3) : t3);
            }), r2 ? e3.substr(0, 1).toUpperCase() + e3.substr(1) : e3;
          }
          resolveDTLFormat(t3) {
            return a(t3, true) ? t3 : { main: (t3 = p(t3))[0], from: t3[1], to: t3[2] };
          }
          getTimeTicks(t3, e3, i3, r2) {
            let n2, a2, h2, l2;
            let d2 = this, p2 = d2.Date, g2 = [], f2 = {}, m2 = new p2(e3), x = t3.unitRange, y = t3.count || 1;
            if (r2 = c(r2, 1), s(e3)) {
              d2.set("Milliseconds", m2, x >= u.second ? 0 : y * Math.floor(d2.get("Milliseconds", m2) / y)), x >= u.second && d2.set("Seconds", m2, x >= u.minute ? 0 : y * Math.floor(d2.get("Seconds", m2) / y)), x >= u.minute && d2.set("Minutes", m2, x >= u.hour ? 0 : y * Math.floor(d2.get("Minutes", m2) / y)), x >= u.hour && d2.set("Hours", m2, x >= u.day ? 0 : y * Math.floor(d2.get("Hours", m2) / y)), x >= u.day && d2.set("Date", m2, x >= u.month ? 1 : Math.max(1, y * Math.floor(d2.get("Date", m2) / y))), x >= u.month && (d2.set("Month", m2, x >= u.year ? 0 : y * Math.floor(d2.get("Month", m2) / y)), a2 = d2.get("FullYear", m2)), x >= u.year && (a2 -= a2 % y, d2.set("FullYear", m2, a2)), x === u.week && (l2 = d2.get("Day", m2), d2.set("Date", m2, d2.get("Date", m2) - l2 + r2 + (l2 < r2 ? -7 : 0))), a2 = d2.get("FullYear", m2);
              let t4 = d2.get("Month", m2), o2 = d2.get("Date", m2), c2 = d2.get("Hours", m2);
              e3 = m2.getTime(), (d2.variableTimezone || !d2.useUTC) && s(i3) && (h2 = i3 - e3 > 4 * u.month || d2.getTimezoneOffset(e3) !== d2.getTimezoneOffset(i3));
              let p3 = m2.getTime();
              for (n2 = 1; p3 < i3; ) g2.push(p3), x === u.year ? p3 = d2.makeTime(a2 + n2 * y, 0) : x === u.month ? p3 = d2.makeTime(a2, t4 + n2 * y) : h2 && (x === u.day || x === u.week) ? p3 = d2.makeTime(a2, t4, o2 + n2 * y * (x === u.day ? 1 : 7)) : h2 && x === u.hour && y > 1 ? p3 = d2.makeTime(a2, t4, o2, c2 + n2 * y) : p3 += x * y, n2++;
              g2.push(p3), x <= u.hour && g2.length < 1e4 && g2.forEach(function(t5) {
                t5 % 18e5 == 0 && "000000000" === d2.dateFormat("%H%M%S%L", t5) && (f2[t5] = "day");
              });
            }
            return g2.info = o(t3, { higherRanks: f2, totalRange: x * y }), g2;
          }
          getDateFormat(t3, e3, i3, s2) {
            let r2 = this.dateFormat("%m-%d %H:%M:%S.%L", e3), o2 = "01-01 00:00:00.000", n2 = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, a2 = "millisecond", h2 = a2;
            for (a2 in u) {
              if (t3 === u.week && +this.dateFormat("%w", e3) === i3 && r2.substr(6) === o2.substr(6)) {
                a2 = "week";
                break;
              }
              if (u[a2] > t3) {
                a2 = h2;
                break;
              }
              if (n2[a2] && r2.substr(n2[a2]) !== o2.substr(n2[a2])) break;
              "week" !== a2 && (h2 = a2);
            }
            return this.resolveDTLFormat(s2[a2]).main;
          }
        }
        return m.formatCache = {}, m;
      }), i(e, "Core/Defaults.js", [e["Core/Chart/ChartDefaults.js"], e["Core/Globals.js"], e["Core/Color/Palettes.js"], e["Core/Time.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r) {
        let { isTouchDevice: o } = e2, { fireEvent: n, merge: a } = r, h = { colors: i2.colors, symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], decimalPoint: ".", numericSymbols: ["k", "M", "G", "T", "P", "E"], resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: { buttonTheme: { fill: "#f7f7f7", padding: 8, r: 2, stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontSize: "0.8em", fontWeight: "normal" }, states: { hover: { fill: "#e6e6e6" }, select: { fill: "#e6e9ff", style: { color: "#000000", fontWeight: "bold" } }, disabled: { style: { color: "#cccccc" } } } } }, time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: true }, chart: t2, title: { style: { color: "#333333", fontWeight: "bold" }, text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "center", widthAdjust: -44 }, caption: { margin: 15, style: { color: "#666666", fontSize: "0.8em" }, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, legend: { enabled: true, align: "center", alignColumns: true, className: "highcharts-no-tooltip", events: {}, layout: "horizontal", itemMarginBottom: 2, itemMarginTop: 2, labelFormatter: function() {
          return this.name;
        }, borderColor: "#999999", borderRadius: 0, navigation: { style: { fontSize: "0.8em" }, activeColor: "#0022ff", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "0.8em", textDecoration: "none", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#666666", textDecoration: "line-through" }, shadow: false, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: true, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontSize: "0.8em", fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } }, tooltip: { enabled: true, animation: { duration: 300, easing: (t3) => Math.sqrt(1 - Math.pow(t3 - 1, 2)) }, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %e %b, %H:%M:%S.%L", second: "%A, %e %b, %H:%M:%S", minute: "%A, %e %b, %H:%M", hour: "%A, %e %b, %H:%M", day: "%A, %e %b %Y", week: "Week from %A, %e %b %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, shape: "callout", shared: false, snap: o ? 25 : 10, headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: "#ffffff", borderWidth: void 0, shadow: true, stickOnContact: false, style: { color: "#333333", cursor: "default", fontSize: "0.8em" }, useHTML: false }, credits: { enabled: true, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "0.6em" }, text: "Highcharts.com" } };
        h.chart.styledMode = false;
        let l = new s(h.time);
        return { defaultOptions: h, defaultTime: l, getOptions: function() {
          return h;
        }, setOptions: function(t3) {
          return n(e2, "setOptions", { options: t3 }), a(true, h, t3), (t3.time || t3.global) && (e2.time ? e2.time.update(a(h.global, h.time, t3.global, t3.time)) : e2.time = l), h;
        } };
      }), i(e, "Core/Color/Color.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { isNumber: i2, merge: s, pInt: r } = e2;
        class o {
          static parse(t3) {
            return t3 ? new o(t3) : o.None;
          }
          constructor(e3) {
            let i3, s2, r2, n;
            this.rgba = [NaN, NaN, NaN, NaN], this.input = e3;
            let a = t2.Color;
            if (a && a !== o) return new a(e3);
            if ("object" == typeof e3 && void 0 !== e3.stops) this.stops = e3.stops.map((t3) => new o(t3[1]));
            else if ("string" == typeof e3) {
              if (this.input = e3 = o.names[e3.toLowerCase()] || e3, "#" === e3.charAt(0)) {
                let t3 = e3.length, i4 = parseInt(e3.substr(1), 16);
                7 === t3 ? s2 = [(16711680 & i4) >> 16, (65280 & i4) >> 8, 255 & i4, 1] : 4 === t3 && (s2 = [(3840 & i4) >> 4 | (3840 & i4) >> 8, (240 & i4) >> 4 | 240 & i4, (15 & i4) << 4 | 15 & i4, 1]);
              }
              if (!s2) for (r2 = o.parsers.length; r2-- && !s2; ) (i3 = (n = o.parsers[r2]).regex.exec(e3)) && (s2 = n.parse(i3));
            }
            s2 && (this.rgba = s2);
          }
          get(t3) {
            let e3 = this.input, r2 = this.rgba;
            if ("object" == typeof e3 && void 0 !== this.stops) {
              let i3 = s(e3);
              return i3.stops = [].slice.call(i3.stops), this.stops.forEach((e4, s2) => {
                i3.stops[s2] = [i3.stops[s2][0], e4.get(t3)];
              }), i3;
            }
            return r2 && i2(r2[0]) ? "rgb" !== t3 && (t3 || 1 !== r2[3]) ? "a" === t3 ? `${r2[3]}` : "rgba(" + r2.join(",") + ")" : "rgb(" + r2[0] + "," + r2[1] + "," + r2[2] + ")" : e3;
          }
          brighten(t3) {
            let e3 = this.rgba;
            if (this.stops) this.stops.forEach(function(e4) {
              e4.brighten(t3);
            });
            else if (i2(t3) && 0 !== t3) for (let i3 = 0; i3 < 3; i3++) e3[i3] += r(255 * t3), e3[i3] < 0 && (e3[i3] = 0), e3[i3] > 255 && (e3[i3] = 255);
            return this;
          }
          setOpacity(t3) {
            return this.rgba[3] = t3, this;
          }
          tweenTo(t3, e3) {
            let s2 = this.rgba, r2 = t3.rgba;
            if (!i2(s2[0]) || !i2(r2[0])) return t3.input || "none";
            let o2 = 1 !== r2[3] || 1 !== s2[3];
            return (o2 ? "rgba(" : "rgb(") + Math.round(r2[0] + (s2[0] - r2[0]) * (1 - e3)) + "," + Math.round(r2[1] + (s2[1] - r2[1]) * (1 - e3)) + "," + Math.round(r2[2] + (s2[2] - r2[2]) * (1 - e3)) + (o2 ? "," + (r2[3] + (s2[3] - r2[3]) * (1 - e3)) : "") + ")";
          }
        }
        return o.names = { white: "#ffffff", black: "#000000" }, o.parsers = [{ regex: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?(?:\.\d+)?)\s*\)/, parse: function(t3) {
          return [r(t3[1]), r(t3[2]), r(t3[3]), parseFloat(t3[4], 10)];
        } }, { regex: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, parse: function(t3) {
          return [r(t3[1]), r(t3[2]), r(t3[3]), 1];
        } }], o.None = new o(""), o;
      }), i(e, "Core/Animation/Fx.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { parse: s } = t2, { win: r } = e2, { isNumber: o, objectEach: n } = i2;
        class a {
          constructor(t3, e3, i3) {
            this.pos = NaN, this.options = e3, this.elem = t3, this.prop = i3;
          }
          dSetter() {
            let t3 = this.paths, e3 = t3 && t3[0], i3 = t3 && t3[1], s2 = this.now || 0, r2 = [];
            if (1 !== s2 && e3 && i3) {
              if (e3.length === i3.length && s2 < 1) for (let t4 = 0; t4 < i3.length; t4++) {
                let n2 = e3[t4], a2 = i3[t4], h = [];
                for (let t5 = 0; t5 < a2.length; t5++) {
                  let e4 = n2[t5], i4 = a2[t5];
                  o(e4) && o(i4) && !("A" === a2[0] && (4 === t5 || 5 === t5)) ? h[t5] = e4 + s2 * (i4 - e4) : h[t5] = i4;
                }
                r2.push(h);
              }
              else r2 = i3;
            } else r2 = this.toD || [];
            this.elem.attr("d", r2, void 0, true);
          }
          update() {
            let t3 = this.elem, e3 = this.prop, i3 = this.now, s2 = this.options.step;
            this[e3 + "Setter"] ? this[e3 + "Setter"]() : t3.attr ? t3.element && t3.attr(e3, i3, null, true) : t3.style[e3] = i3 + this.unit, s2 && s2.call(t3, i3, this);
          }
          run(t3, e3, i3) {
            let s2 = this, o2 = s2.options, n2 = function(t4) {
              return !n2.stopped && s2.step(t4);
            }, h = r.requestAnimationFrame || function(t4) {
              setTimeout(t4, 13);
            }, l = function() {
              for (let t4 = 0; t4 < a.timers.length; t4++) a.timers[t4]() || a.timers.splice(t4--, 1);
              a.timers.length && h(l);
            };
            t3 !== e3 || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = t3, this.end = e3, this.unit = i3, this.now = this.start, this.pos = 0, n2.elem = this.elem, n2.prop = this.prop, n2() && 1 === a.timers.push(n2) && h(l)) : (delete o2.curAnim[this.prop], o2.complete && 0 === Object.keys(o2.curAnim).length && o2.complete.call(this.elem));
          }
          step(t3) {
            let e3, i3;
            let s2 = +/* @__PURE__ */ new Date(), r2 = this.options, o2 = this.elem, a2 = r2.complete, h = r2.duration, l = r2.curAnim;
            return o2.attr && !o2.element ? e3 = false : t3 || s2 >= h + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), l[this.prop] = true, i3 = true, n(l, function(t4) {
              true !== t4 && (i3 = false);
            }), i3 && a2 && a2.call(o2), e3 = false) : (this.pos = r2.easing((s2 - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e3 = true), e3;
          }
          initPath(t3, e3, i3) {
            let s2 = t3.startX, r2 = t3.endX, n2 = i3.slice(), a2 = t3.isArea, h = a2 ? 2 : 1, l = e3 && i3.length > e3.length && i3.hasStackedCliffs, d, c, p, u, g = e3 && e3.slice();
            if (!g || l) return [n2, n2];
            function f(t4, e4) {
              for (; t4.length < c; ) {
                let i4 = t4[0], s3 = e4[c - t4.length];
                if (s3 && "M" === i4[0] && ("C" === s3[0] ? t4[0] = ["C", i4[1], i4[2], i4[1], i4[2], i4[1], i4[2]] : t4[0] = ["L", i4[1], i4[2]]), t4.unshift(i4), a2) {
                  let e5 = t4.pop();
                  t4.push(t4[t4.length - 1], e5);
                }
              }
            }
            function m(t4) {
              for (; t4.length < c; ) {
                let e4 = t4[Math.floor(t4.length / h) - 1].slice();
                if ("C" === e4[0] && (e4[1] = e4[5], e4[2] = e4[6]), a2) {
                  let i4 = t4[Math.floor(t4.length / h)].slice();
                  t4.splice(t4.length / 2, 0, e4, i4);
                } else t4.push(e4);
              }
            }
            if (s2 && r2 && r2.length) {
              for (p = 0; p < s2.length; p++) {
                if (s2[p] === r2[0]) {
                  d = p;
                  break;
                }
                if (s2[0] === r2[r2.length - s2.length + p]) {
                  d = p, u = true;
                  break;
                }
                if (s2[s2.length - 1] === r2[r2.length - s2.length + p]) {
                  d = s2.length - p;
                  break;
                }
              }
              void 0 === d && (g = []);
            }
            return g.length && o(d) && (c = n2.length + d * h, u ? (f(g, n2), m(n2)) : (f(n2, g), m(g))), [g, n2];
          }
          fillSetter() {
            a.prototype.strokeSetter.apply(this, arguments);
          }
          strokeSetter() {
            this.elem.attr(this.prop, s(this.start).tweenTo(s(this.end), this.pos), void 0, true);
          }
        }
        return a.timers = [], a;
      }), i(e, "Core/Animation/AnimationUtilities.js", [e["Core/Animation/Fx.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { defined: i2, getStyle: s, isArray: r, isNumber: o, isObject: n, merge: a, objectEach: h, pick: l } = e2;
        function d(t3) {
          return n(t3) ? a({ duration: 500, defer: 0 }, t3) : { duration: t3 ? 500 : 0, defer: 0 };
        }
        function c(e3, i3) {
          let s2 = t2.timers.length;
          for (; s2--; ) t2.timers[s2].elem !== e3 || i3 && i3 !== t2.timers[s2].prop || (t2.timers[s2].stopped = true);
        }
        return { animate: function(e3, i3, l2) {
          let d2, p = "", u, g, f;
          n(l2) || (f = arguments, l2 = { duration: f[2], easing: f[3], complete: f[4] }), o(l2.duration) || (l2.duration = 400), l2.easing = "function" == typeof l2.easing ? l2.easing : Math[l2.easing] || Math.easeInOutSine, l2.curAnim = a(i3), h(i3, function(o2, n2) {
            c(e3, n2), g = new t2(e3, l2, n2), u = void 0, "d" === n2 && r(i3.d) ? (g.paths = g.initPath(e3, e3.pathArray, i3.d), g.toD = i3.d, d2 = 0, u = 1) : e3.attr ? d2 = e3.attr(n2) : (d2 = parseFloat(s(e3, n2)) || 0, "opacity" !== n2 && (p = "px")), u || (u = o2), "string" == typeof u && u.match("px") && (u = u.replace(/px/g, "")), g.run(d2, u, p);
          });
        }, animObject: d, getDeferredAnimation: function(t3, e3, s2) {
          let r2 = d(e3), o2 = s2 ? [s2] : t3.series, a2 = 0, h2 = 0;
          return o2.forEach((t4) => {
            let s3 = d(t4.options.animation);
            a2 = n(e3) && i2(e3.defer) ? r2.defer : Math.max(a2, s3.duration + s3.defer), h2 = Math.min(r2.duration, s3.duration);
          }), t3.renderer.forExport && (a2 = 0), { defer: Math.max(0, a2 - h2), duration: Math.min(a2, h2) };
        }, setAnimation: function(t3, e3) {
          e3.renderer.globalAnimation = l(t3, e3.options.chart.animation, true);
        }, stop: c };
      }), i(e, "Core/Renderer/HTML/AST.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { SVG_NS: i2, win: s } = t2, { attr: r, createElement: o, css: n, error: a, isFunction: h, isString: l, objectEach: d, splat: c } = e2, { trustedTypes: p } = s, u = p && h(p.createPolicy) && p.createPolicy("highcharts", { createHTML: (t3) => t3 }), g = u ? u.createHTML("") : "", f = function() {
          try {
            return !!new DOMParser().parseFromString(g, "text/html");
          } catch (t3) {
            return false;
          }
        }();
        class m {
          static filterUserAttributes(t3) {
            return d(t3, (e3, i3) => {
              let s2 = true;
              -1 === m.allowedAttributes.indexOf(i3) && (s2 = false), -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(i3) && (s2 = l(e3) && m.allowedReferences.some((t4) => 0 === e3.indexOf(t4))), s2 || (a(33, false, void 0, { "Invalid attribute in config": `${i3}` }), delete t3[i3]), l(e3) && t3[i3] && (t3[i3] = e3.replace(/</g, "&lt;"));
            }), t3;
          }
          static parseStyle(t3) {
            return t3.split(";").reduce((t4, e3) => {
              let i3 = e3.split(":").map((t5) => t5.trim()), s2 = i3.shift();
              return s2 && i3.length && (t4[s2.replace(/-([a-z])/g, (t5) => t5[1].toUpperCase())] = i3.join(":")), t4;
            }, {});
          }
          static setElementHTML(t3, e3) {
            t3.innerHTML = m.emptyHTML, e3 && new m(e3).addToDOM(t3);
          }
          constructor(t3) {
            this.nodes = "string" == typeof t3 ? this.parseMarkup(t3) : t3;
          }
          addToDOM(e3) {
            return function e4(s2, o2) {
              let h2;
              return c(s2).forEach(function(s3) {
                let l2;
                let c2 = s3.tagName, p2 = s3.textContent ? t2.doc.createTextNode(s3.textContent) : void 0, u2 = m.bypassHTMLFiltering;
                if (c2) {
                  if ("#text" === c2) l2 = p2;
                  else if (-1 !== m.allowedTags.indexOf(c2) || u2) {
                    let a2 = "svg" === c2 ? i2 : o2.namespaceURI || i2, h3 = t2.doc.createElementNS(a2, c2), g2 = s3.attributes || {};
                    d(s3, function(t3, e5) {
                      "tagName" !== e5 && "attributes" !== e5 && "children" !== e5 && "style" !== e5 && "textContent" !== e5 && (g2[e5] = t3);
                    }), r(h3, u2 ? g2 : m.filterUserAttributes(g2)), s3.style && n(h3, s3.style), p2 && h3.appendChild(p2), e4(s3.children || [], h3), l2 = h3;
                  } else a(33, false, void 0, { "Invalid tagName in config": c2 });
                }
                l2 && o2.appendChild(l2), h2 = l2;
              }), h2;
            }(this.nodes, e3);
          }
          parseMarkup(t3) {
            let e3;
            let i3 = [];
            if (t3 = t3.trim().replace(/ style=(["'])/g, " data-style=$1"), f) e3 = new DOMParser().parseFromString(u ? u.createHTML(t3) : t3, "text/html");
            else {
              let i4 = o("div");
              i4.innerHTML = t3, e3 = { body: i4 };
            }
            let s2 = (t4, e4) => {
              let i4 = t4.nodeName.toLowerCase(), r2 = { tagName: i4 };
              "#text" === i4 && (r2.textContent = t4.textContent || "");
              let o2 = t4.attributes;
              if (o2) {
                let t5 = {};
                [].forEach.call(o2, (e5) => {
                  "data-style" === e5.name ? r2.style = m.parseStyle(e5.value) : t5[e5.name] = e5.value;
                }), r2.attributes = t5;
              }
              if (t4.childNodes.length) {
                let e5 = [];
                [].forEach.call(t4.childNodes, (t5) => {
                  s2(t5, e5);
                }), e5.length && (r2.children = e5);
              }
              e4.push(r2);
            };
            return [].forEach.call(e3.body.childNodes, (t4) => s2(t4, i3)), i3;
          }
        }
        return m.allowedAttributes = ["alt", "aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup", "aria-hidden", "aria-label", "aria-labelledby", "aria-live", "aria-pressed", "aria-readonly", "aria-roledescription", "aria-selected", "class", "clip-path", "color", "colspan", "cx", "cy", "d", "dx", "dy", "disabled", "fill", "filterUnits", "flood-color", "flood-opacity", "height", "href", "id", "in", "in2", "markerHeight", "markerWidth", "offset", "opacity", "operator", "orient", "padding", "paddingLeft", "paddingRight", "patternUnits", "r", "radius", "refX", "refY", "role", "scope", "slope", "src", "startOffset", "stdDeviation", "stroke", "stroke-linecap", "stroke-width", "style", "tableValues", "result", "rowspan", "summary", "target", "tabindex", "text-align", "text-anchor", "textAnchor", "textLength", "title", "type", "valign", "width", "x", "x1", "x2", "xlink:href", "y", "y1", "y2", "zIndex"], m.allowedReferences = ["https://", "http://", "mailto:", "/", "../", "./", "#"], m.allowedTags = ["a", "abbr", "b", "br", "button", "caption", "circle", "clipPath", "code", "dd", "defs", "div", "dl", "dt", "em", "feComponentTransfer", "feComposite", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMorphology", "feOffset", "feMerge", "feMergeNode", "filter", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "linearGradient", "marker", "ol", "p", "path", "pattern", "pre", "rect", "small", "span", "stop", "strong", "style", "sub", "sup", "svg", "table", "text", "textPath", "thead", "title", "tbody", "tspan", "td", "th", "tr", "u", "ul", "#text"], m.emptyHTML = g, m.bypassHTMLFiltering = false, m;
      }), i(e, "Core/Templating.js", [e["Core/Defaults.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { defaultOptions: i2, defaultTime: s } = t2, { extend: r, getNestedProperty: o, isArray: n, isNumber: a, isObject: h, pick: l, pInt: d } = e2, c = { add: (t3, e3) => t3 + e3, divide: (t3, e3) => 0 !== e3 ? t3 / e3 : "", eq: (t3, e3) => t3 == e3, each: function(t3) {
          let e3 = arguments[arguments.length - 1];
          return !!n(t3) && t3.map((i3, s2) => p(e3.body, r(h(i3) ? i3 : { "@this": i3 }, { "@index": s2, "@first": 0 === s2, "@last": s2 === t3.length - 1 }))).join("");
        }, ge: (t3, e3) => t3 >= e3, gt: (t3, e3) => t3 > e3, if: (t3) => !!t3, le: (t3, e3) => t3 <= e3, lt: (t3, e3) => t3 < e3, multiply: (t3, e3) => t3 * e3, ne: (t3, e3) => t3 != e3, subtract: (t3, e3) => t3 - e3, unless: (t3) => !t3 };
        function p(t3 = "", e3, r2) {
          let n2 = /\{([\w\:\.\,;\-\/<>%@"'’= #\(\)]+)\}/g, a2 = /\(([\w\:\.\,;\-\/<>%@"'= ]+)\)/g, h2 = [], d2 = /f$/, g = /\.(\d)/, f = i2.lang, m = r2 && r2.time || s, x = r2 && r2.numberFormatter || u, y = (t4 = "") => {
            let i3;
            return "true" === t4 || "false" !== t4 && ((i3 = Number(t4)).toString() === t4 ? i3 : o(t4, e3));
          }, b, v, S = 0, C;
          for (; null !== (b = n2.exec(t3)); ) {
            let i3 = a2.exec(b[1]);
            i3 && (b = i3, C = true), v && v.isBlock || (v = { ctx: e3, expression: b[1], find: b[0], isBlock: "#" === b[1].charAt(0), start: b.index, startInner: b.index + b[0].length, length: b[0].length });
            let s2 = b[1].split(" ")[0].replace("#", "");
            c[s2] && (v.isBlock && s2 === v.fn && S++, v.fn || (v.fn = s2));
            let r3 = "else" === b[1];
            if (v.isBlock && v.fn && (b[1] === `/${v.fn}` || r3)) {
              if (S) !r3 && S--;
              else {
                let e4 = v.startInner, i4 = t3.substr(e4, b.index - e4);
                void 0 === v.body ? (v.body = i4, v.startInner = b.index + b[0].length) : v.elseBody = i4, v.find += i4 + b[0], r3 || (h2.push(v), v = void 0);
              }
            } else v.isBlock || h2.push(v);
            if (i3 && !(v == null ? void 0 : v.isBlock)) break;
          }
          return h2.forEach((i3) => {
            let s2, o2;
            let { body: n3, elseBody: a3, expression: h3, fn: u2 } = i3;
            if (u2) {
              let t4 = [i3], l2 = h3.split(" ");
              for (o2 = c[u2].length; o2--; ) t4.unshift(y(l2[o2 + 1]));
              s2 = c[u2].apply(e3, t4), i3.isBlock && "boolean" == typeof s2 && (s2 = p(s2 ? n3 : a3, e3, r2));
            } else {
              let t4 = h3.split(":");
              if (s2 = y(t4.shift() || ""), t4.length && "number" == typeof s2) {
                let e4 = t4.join(":");
                if (d2.test(e4)) {
                  let t5 = parseInt((e4.match(g) || ["", "-1"])[1], 10);
                  null !== s2 && (s2 = x(s2, t5, f.decimalPoint, e4.indexOf(",") > -1 ? f.thousandsSep : ""));
                } else s2 = m.dateFormat(e4, s2);
              }
            }
            t3 = t3.replace(i3.find, l(s2, ""));
          }), C ? p(t3, e3, r2) : t3;
        }
        function u(t3, e3, s2, r2) {
          let o2, n2;
          t3 = +t3 || 0, e3 = +e3;
          let h2 = i2.lang, c2 = (t3.toString().split(".")[1] || "").split("e")[0].length, p2 = t3.toString().split("e"), u2 = e3;
          -1 === e3 ? e3 = Math.min(c2, 20) : a(e3) ? e3 && p2[1] && p2[1] < 0 && ((n2 = e3 + +p2[1]) >= 0 ? (p2[0] = (+p2[0]).toExponential(n2).split("e")[0], e3 = n2) : (p2[0] = p2[0].split(".")[0] || 0, t3 = e3 < 20 ? (p2[0] * Math.pow(10, p2[1])).toFixed(e3) : 0, p2[1] = 0)) : e3 = 2;
          let g = (Math.abs(p2[1] ? p2[0] : t3) + Math.pow(10, -Math.max(e3, c2) - 1)).toFixed(e3), f = String(d(g)), m = f.length > 3 ? f.length % 3 : 0;
          return s2 = l(s2, h2.decimalPoint), r2 = l(r2, h2.thousandsSep), o2 = (t3 < 0 ? "-" : "") + (m ? f.substr(0, m) + r2 : ""), 0 > +p2[1] && !u2 ? o2 = "0" : o2 += f.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + r2), e3 ? o2 += s2 + g.slice(-e3) : 0 == +o2 && (o2 = "0"), p2[1] && 0 != +o2 && (o2 += "e" + p2[1]), o2;
        }
        return { dateFormat: function(t3, e3, i3) {
          return s.dateFormat(t3, e3, i3);
        }, format: p, helpers: c, numberFormat: u };
      }), i(e, "Core/Renderer/RendererRegistry.js", [e["Core/Globals.js"]], function(t2) {
        var e2, i2;
        let s;
        return (i2 = e2 || (e2 = {})).rendererTypes = {}, i2.getRendererType = function(t3 = s) {
          return i2.rendererTypes[t3] || i2.rendererTypes[s];
        }, i2.registerRendererType = function(e3, r, o) {
          i2.rendererTypes[e3] = r, (!s || o) && (s = e3, t2.Renderer = r);
        }, e2;
      }), i(e, "Core/Renderer/RendererUtilities.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { clamp: i2, pick: s, pushUnique: r, stableSort: o } = t2;
        return (e2 || (e2 = {})).distribute = function t3(e3, n, a) {
          let h = e3, l = h.reducedLen || n, d = (t4, e4) => t4.target - e4.target, c = [], p = e3.length, u = [], g = c.push, f, m, x, y = true, b, v, S = 0, C;
          for (f = p; f--; ) S += e3[f].size;
          if (S > l) {
            for (o(e3, (t4, e4) => (e4.rank || 0) - (t4.rank || 0)), x = (C = e3[0].rank === e3[e3.length - 1].rank) ? p / 2 : -1, m = C ? x : p - 1; x && S > l; ) b = e3[f = Math.floor(m)], r(u, f) && (S -= b.size), m += x, C && m >= e3.length && (x /= 2, m = x);
            u.sort((t4, e4) => e4 - t4).forEach((t4) => g.apply(c, e3.splice(t4, 1)));
          }
          for (o(e3, d), e3 = e3.map((t4) => ({ size: t4.size, targets: [t4.target], align: s(t4.align, 0.5) })); y; ) {
            for (f = e3.length; f--; ) b = e3[f], v = (Math.min.apply(0, b.targets) + Math.max.apply(0, b.targets)) / 2, b.pos = i2(v - b.size * b.align, 0, n - b.size);
            for (f = e3.length, y = false; f--; ) f > 0 && e3[f - 1].pos + e3[f - 1].size > e3[f].pos && (e3[f - 1].size += e3[f].size, e3[f - 1].targets = e3[f - 1].targets.concat(e3[f].targets), e3[f - 1].align = 0.5, e3[f - 1].pos + e3[f - 1].size > n && (e3[f - 1].pos = n - e3[f - 1].size), e3.splice(f, 1), y = true);
          }
          return g.apply(h, c), f = 0, e3.some((e4) => {
            let i3 = 0;
            return (e4.targets || []).some(() => (h[f].pos = e4.pos + i3, void 0 !== a && Math.abs(h[f].pos - h[f].target) > a) ? (h.slice(0, f + 1).forEach((t4) => delete t4.pos), h.reducedLen = (h.reducedLen || n) - 0.1 * n, h.reducedLen > 0.1 * n && t3(h, n, a), true) : (i3 += h[f].size, f++, false));
          }), o(h, d), h;
        }, e2;
      }), i(e, "Core/Renderer/SVG/SVGElement.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        let { animate: r, animObject: o, stop: n } = t2, { deg2rad: a, doc: h, svg: l, SVG_NS: d, win: c } = i2, { addEvent: p, attr: u, createElement: g, crisp: f, css: m, defined: x, erase: y, extend: b, fireEvent: v, isArray: S, isFunction: C, isObject: k, isString: M, merge: w, objectEach: T, pick: A, pInt: P, pushUnique: L, replaceNested: O, syncTimeout: D, uniqueKey: E } = s;
        class I {
          _defaultGetter(t3) {
            let e3 = A(this[t3 + "Value"], this[t3], this.element ? this.element.getAttribute(t3) : null, 0);
            return /^-?[\d\.]+$/.test(e3) && (e3 = parseFloat(e3)), e3;
          }
          _defaultSetter(t3, e3, i3) {
            i3.setAttribute(e3, t3);
          }
          add(t3) {
            let e3;
            let i3 = this.renderer, s2 = this.element;
            return t3 && (this.parentGroup = t3), void 0 !== this.textStr && "text" === this.element.nodeName && i3.buildText(this), this.added = true, (!t3 || t3.handleZ || this.zIndex) && (e3 = this.zIndexSetter()), e3 || (t3 ? t3.element : i3.box).appendChild(s2), this.onAdd && this.onAdd(), this;
          }
          addClass(t3, e3) {
            let i3 = e3 ? "" : this.attr("class") || "";
            return (t3 = (t3 || "").split(/ /g).reduce(function(t4, e4) {
              return -1 === i3.indexOf(e4) && t4.push(e4), t4;
            }, i3 ? [i3] : []).join(" ")) !== i3 && this.attr("class", t3), this;
          }
          afterSetters() {
            this.doTransform && (this.updateTransform(), this.doTransform = false);
          }
          align(t3, e3, i3, s2 = true) {
            let r2, o2, n2, a2;
            let h2 = {}, l2 = this.renderer, d2 = l2.alignedObjects, c2 = !!t3;
            t3 ? (this.alignOptions = t3, this.alignByTranslate = e3, this.alignTo = i3) : (t3 = this.alignOptions || {}, e3 = this.alignByTranslate, i3 = this.alignTo);
            let p2 = !i3 || M(i3) ? i3 || "renderer" : void 0;
            p2 && (c2 && L(d2, this), i3 = void 0);
            let u2 = A(i3, l2[p2], l2), g2 = t3.align, f2 = t3.verticalAlign;
            return r2 = (u2.x || 0) + (t3.x || 0), o2 = (u2.y || 0) + (t3.y || 0), "right" === g2 ? n2 = 1 : "center" === g2 && (n2 = 2), n2 && (r2 += ((u2.width || 0) - (t3.width || 0)) / n2), h2[e3 ? "translateX" : "x"] = Math.round(r2), "bottom" === f2 ? a2 = 1 : "middle" === f2 && (a2 = 2), a2 && (o2 += ((u2.height || 0) - (t3.height || 0)) / a2), h2[e3 ? "translateY" : "y"] = Math.round(o2), s2 && (this[this.placed ? "animate" : "attr"](h2), this.placed = true), this.alignAttr = h2, this;
          }
          alignSetter(t3) {
            let e3 = { left: "start", center: "middle", right: "end" };
            e3[t3] && (this.alignValue = t3, this.element.setAttribute("text-anchor", e3[t3]));
          }
          animate(t3, e3, i3) {
            let s2 = o(A(e3, this.renderer.globalAnimation, true)), n2 = s2.defer;
            return h.hidden && (s2.duration = 0), 0 !== s2.duration ? (i3 && (s2.complete = i3), D(() => {
              this.element && r(this, t3, s2);
            }, n2)) : (this.attr(t3, void 0, i3 || s2.complete), T(t3, function(t4, e4) {
              s2.step && s2.step.call(this, t4, { prop: e4, pos: 1, elem: this });
            }, this)), this;
          }
          applyTextOutline(t3) {
            let e3 = this.element;
            -1 !== t3.indexOf("contrast") && (t3 = t3.replace(/contrast/g, this.renderer.getContrast(e3.style.fill)));
            let s2 = t3.split(" "), r2 = s2[s2.length - 1], o2 = s2[0];
            if (o2 && "none" !== o2 && i2.svg) {
              this.fakeTS = true, o2 = o2.replace(/(^[\d\.]+)(.*?)$/g, function(t5, e4, i4) {
                return 2 * Number(e4) + i4;
              }), this.removeTextOutline();
              let t4 = h.createElementNS(d, "tspan");
              u(t4, { class: "highcharts-text-outline", fill: r2, stroke: r2, "stroke-width": o2, "stroke-linejoin": "round" });
              let i3 = e3.querySelector("textPath") || e3;
              [].forEach.call(i3.childNodes, (e4) => {
                let i4 = e4.cloneNode(true);
                i4.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach((t5) => i4.removeAttribute(t5)), t4.appendChild(i4);
              });
              let s3 = 0;
              [].forEach.call(i3.querySelectorAll("text tspan"), (t5) => {
                s3 += Number(t5.getAttribute("dy"));
              });
              let n2 = h.createElementNS(d, "tspan");
              n2.textContent = "​", u(n2, { x: Number(e3.getAttribute("x")), dy: -s3 }), t4.appendChild(n2), i3.insertBefore(t4, i3.firstChild);
            }
          }
          attr(t3, e3, i3, s2) {
            let { element: r2 } = this, o2 = I.symbolCustomAttribs, a2, h2, l2 = this, d2;
            return "string" == typeof t3 && void 0 !== e3 && (a2 = t3, (t3 = {})[a2] = e3), "string" == typeof t3 ? l2 = (this[t3 + "Getter"] || this._defaultGetter).call(this, t3, r2) : (T(t3, function(e4, i4) {
              d2 = false, s2 || n(this, i4), this.symbolName && -1 !== o2.indexOf(i4) && (h2 || (this.symbolAttr(t3), h2 = true), d2 = true), this.rotation && ("x" === i4 || "y" === i4) && (this.doTransform = true), d2 || (this[i4 + "Setter"] || this._defaultSetter).call(this, e4, i4, r2);
            }, this), this.afterSetters()), i3 && i3.call(this), l2;
          }
          clip(t3) {
            if (t3 && !t3.clipPath) {
              let e3 = E() + "-", i3 = this.renderer.createElement("clipPath").attr({ id: e3 }).add(this.renderer.defs);
              b(t3, { clipPath: i3, id: e3, count: 0 }), t3.add(i3);
            }
            return this.attr("clip-path", t3 ? `url(${this.renderer.url}#${t3.id})` : "none");
          }
          crisp(t3, e3) {
            e3 = Math.round(e3 || t3.strokeWidth || 0);
            let i3 = t3.x || this.x || 0, s2 = t3.y || this.y || 0, r2 = (t3.width || this.width || 0) + i3, o2 = (t3.height || this.height || 0) + s2, n2 = f(i3, e3), a2 = f(s2, e3);
            return b(t3, { x: n2, y: a2, width: f(r2, e3) - n2, height: f(o2, e3) - a2 }), x(t3.strokeWidth) && (t3.strokeWidth = e3), t3;
          }
          complexColor(t3, i3, s2) {
            let r2 = this.renderer, o2, n2, a2, h2, l2, d2, c2, p2, u2, g2, f2 = [], m2;
            v(this.renderer, "complexColor", { args: arguments }, function() {
              if (t3.radialGradient ? n2 = "radialGradient" : t3.linearGradient && (n2 = "linearGradient"), n2) {
                if (a2 = t3[n2], l2 = r2.gradients, d2 = t3.stops, u2 = s2.radialReference, S(a2) && (t3[n2] = a2 = { x1: a2[0], y1: a2[1], x2: a2[2], y2: a2[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === n2 && u2 && !x(a2.gradientUnits) && (h2 = a2, a2 = w(a2, r2.getRadialAttr(u2, h2), { gradientUnits: "userSpaceOnUse" })), T(a2, function(t4, e3) {
                  "id" !== e3 && f2.push(e3, t4);
                }), T(d2, function(t4) {
                  f2.push(t4);
                }), l2[f2 = f2.join(",")]) g2 = l2[f2].attr("id");
                else {
                  a2.id = g2 = E();
                  let t4 = l2[f2] = r2.createElement(n2).attr(a2).add(r2.defs);
                  t4.radAttr = h2, t4.stops = [], d2.forEach(function(i4) {
                    0 === i4[1].indexOf("rgba") ? (c2 = (o2 = e2.parse(i4[1])).get("rgb"), p2 = o2.get("a")) : (c2 = i4[1], p2 = 1);
                    let s3 = r2.createElement("stop").attr({ offset: i4[0], "stop-color": c2, "stop-opacity": p2 }).add(t4);
                    t4.stops.push(s3);
                  });
                }
                m2 = "url(" + r2.url + "#" + g2 + ")", s2.setAttribute(i3, m2), s2.gradient = f2, t3.toString = function() {
                  return m2;
                };
              }
            });
          }
          css(t3) {
            let e3 = this.styles, i3 = {}, s2 = this.element, r2, o2 = !e3;
            if (e3 && T(t3, function(t4, s3) {
              e3 && e3[s3] !== t4 && (i3[s3] = t4, o2 = true);
            }), o2) {
              e3 && (t3 = b(e3, i3)), null === t3.width || "auto" === t3.width ? delete this.textWidth : "text" === s2.nodeName.toLowerCase() && t3.width && (r2 = this.textWidth = P(t3.width)), b(this.styles, t3), r2 && !l && this.renderer.forExport && delete t3.width;
              let o3 = w(t3);
              s2.namespaceURI === this.SVG_NS && (["textOutline", "textOverflow", "width"].forEach((t4) => o3 && delete o3[t4]), o3.color && (o3.fill = o3.color)), m(s2, o3);
            }
            return this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), t3.textOutline && this.applyTextOutline(t3.textOutline)), this;
          }
          dashstyleSetter(t3) {
            let e3, i3 = this["stroke-width"];
            if ("inherit" === i3 && (i3 = 1), t3 = t3 && t3.toLowerCase()) {
              let s2 = t3.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
              for (e3 = s2.length; e3--; ) s2[e3] = "" + P(s2[e3]) * A(i3, NaN);
              t3 = s2.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t3);
            }
          }
          destroy() {
            var _a;
            let t3 = this, e3 = t3.element || {}, i3 = t3.renderer, s2 = e3.ownerSVGElement, r2 = "SPAN" === e3.nodeName && t3.parentGroup || void 0, o2, a2;
            if (e3.onclick = e3.onmouseout = e3.onmouseover = e3.onmousemove = e3.point = null, n(t3), t3.clipPath && s2) {
              let e4 = t3.clipPath;
              [].forEach.call(s2.querySelectorAll("[clip-path],[CLIP-PATH]"), function(t4) {
                t4.getAttribute("clip-path").indexOf(e4.element.id) > -1 && t4.removeAttribute("clip-path");
              }), t3.clipPath = e4.destroy();
            }
            if (t3.connector = (_a = t3.connector) == null ? void 0 : _a.destroy(), t3.stops) {
              for (a2 = 0; a2 < t3.stops.length; a2++) t3.stops[a2].destroy();
              t3.stops.length = 0, t3.stops = void 0;
            }
            for (t3.safeRemoveChild(e3); r2 && r2.div && 0 === r2.div.childNodes.length; ) o2 = r2.parentGroup, t3.safeRemoveChild(r2.div), delete r2.div, r2 = o2;
            t3.alignOptions && y(i3.alignedObjects, t3), T(t3, function(e4, i4) {
              t3[i4] && t3[i4].parentGroup === t3 && t3[i4].destroy && t3[i4].destroy(), delete t3[i4];
            });
          }
          dSetter(t3, e3, i3) {
            S(t3) && ("string" == typeof t3[0] && (t3 = this.renderer.pathToSegments(t3)), this.pathArray = t3, t3 = t3.reduce((t4, e4, i4) => e4 && e4.join ? (i4 ? t4 + " " : "") + e4.join(" ") : (e4 || "").toString(), "")), /(NaN| {2}|^$)/.test(t3) && (t3 = "M 0 0"), this[e3] !== t3 && (i3.setAttribute(e3, t3), this[e3] = t3);
          }
          fillSetter(t3, e3, i3) {
            "string" == typeof t3 ? i3.setAttribute(e3, t3) : t3 && this.complexColor(t3, e3, i3);
          }
          hrefSetter(t3, e3, i3) {
            i3.setAttributeNS("http://www.w3.org/1999/xlink", e3, t3);
          }
          getBBox(t3, e3) {
            let i3, s2, r2, o2;
            let { alignValue: n2, element: a2, renderer: h2, styles: l2, textStr: d2 } = this, { cache: c2, cacheKeys: p2 } = h2, u2 = a2.namespaceURI === this.SVG_NS, g2 = A(e3, this.rotation, 0), f2 = h2.styledMode ? a2 && I.prototype.getStyle.call(a2, "font-size") : l2.fontSize;
            if (x(d2) && (-1 === (o2 = d2.toString()).indexOf("<") && (o2 = o2.replace(/\d/g, "0")), o2 += ["", h2.rootFontSize, f2, g2, this.textWidth, n2, l2.textOverflow, l2.fontWeight].join(",")), o2 && !t3 && (i3 = c2[o2]), !i3 || i3.polygon) {
              if (u2 || h2.forExport) {
                try {
                  r2 = this.fakeTS && function(t5) {
                    let e4 = a2.querySelector(".highcharts-text-outline");
                    e4 && m(e4, { display: t5 });
                  }, C(r2) && r2("none"), i3 = a2.getBBox ? b({}, a2.getBBox()) : { width: a2.offsetWidth, height: a2.offsetHeight, x: 0, y: 0 }, C(r2) && r2("");
                } catch (t5) {
                }
                (!i3 || i3.width < 0) && (i3 = { x: 0, y: 0, width: 0, height: 0 });
              } else i3 = this.htmlGetBBox();
              s2 = i3.height, u2 && (i3.height = s2 = { "11px,17": 14, "13px,20": 16 }[`${f2 || ""},${Math.round(s2)}`] || s2), g2 && (i3 = this.getRotatedBox(i3, g2));
              let t4 = { bBox: i3 };
              v(this, "afterGetBBox", t4), i3 = t4.bBox;
            }
            if (o2 && ("" === d2 || i3.height > 0)) {
              for (; p2.length > 250; ) delete c2[p2.shift()];
              c2[o2] || p2.push(o2), c2[o2] = i3;
            }
            return i3;
          }
          getRotatedBox(t3, e3) {
            let { x: i3, y: s2, width: r2, height: o2 } = t3, { alignValue: n2, translateY: h2, rotationOriginX: l2 = 0, rotationOriginY: d2 = 0 } = this, c2 = { right: 1, center: 0.5 }[n2 || 0] || 0, p2 = Number(this.element.getAttribute("y") || 0) - (h2 ? 0 : s2), u2 = e3 * a, g2 = (e3 - 90) * a, f2 = Math.cos(u2), m2 = Math.sin(u2), x2 = r2 * f2, y2 = r2 * m2, b2 = Math.cos(g2), v2 = Math.sin(g2), [[S2, C2], [k2, M2]] = [l2, d2].map((t4) => [t4 - t4 * f2, t4 * m2]), w2 = i3 + c2 * (r2 - x2) + S2 + M2 + p2 * b2, T2 = w2 + x2, A2 = T2 - o2 * b2, P2 = A2 - x2, L2 = s2 + p2 - c2 * y2 - C2 + k2 + p2 * v2, O2 = L2 + y2, D2 = O2 - o2 * v2, E2 = D2 - y2, I2 = Math.min(w2, T2, A2, P2), j = Math.min(L2, O2, D2, E2), B = Math.max(w2, T2, A2, P2) - I2, R = Math.max(L2, O2, D2, E2) - j;
            return { x: I2, y: j, width: B, height: R, polygon: [[w2, L2], [T2, O2], [A2, D2], [P2, E2]] };
          }
          getStyle(t3) {
            return c.getComputedStyle(this.element || this, "").getPropertyValue(t3);
          }
          hasClass(t3) {
            return -1 !== ("" + this.attr("class")).split(" ").indexOf(t3);
          }
          hide() {
            return this.attr({ visibility: "hidden" });
          }
          htmlGetBBox() {
            return { height: 0, width: 0, x: 0, y: 0 };
          }
          constructor(t3, e3) {
            this.onEvents = {}, this.opacity = 1, this.SVG_NS = d, this.element = "span" === e3 || "body" === e3 ? g(e3) : h.createElementNS(this.SVG_NS, e3), this.renderer = t3, this.styles = {}, v(this, "afterInit");
          }
          on(t3, e3) {
            let { onEvents: i3 } = this;
            return i3[t3] && i3[t3](), i3[t3] = p(this.element, t3, e3), this;
          }
          opacitySetter(t3, e3, i3) {
            let s2 = Number(Number(t3).toFixed(3));
            this.opacity = s2, i3.setAttribute(e3, s2);
          }
          reAlign() {
            var _a;
            ((_a = this.alignOptions) == null ? void 0 : _a.width) && "left" !== this.alignOptions.align && (this.alignOptions.width = this.getBBox().width, this.placed = false, this.align());
          }
          removeClass(t3) {
            return this.attr("class", ("" + this.attr("class")).replace(M(t3) ? RegExp(`(^| )${t3}( |$)`) : t3, " ").replace(/ +/g, " ").trim());
          }
          removeTextOutline() {
            let t3 = this.element.querySelector("tspan.highcharts-text-outline");
            t3 && this.safeRemoveChild(t3);
          }
          safeRemoveChild(t3) {
            let e3 = t3.parentNode;
            e3 && e3.removeChild(t3);
          }
          setRadialReference(t3) {
            let e3 = this.element.gradient && this.renderer.gradients[this.element.gradient];
            return this.element.radialReference = t3, e3 && e3.radAttr && e3.animate(this.renderer.getRadialAttr(t3, e3.radAttr)), this;
          }
          shadow(t3) {
            var _a;
            let { renderer: e3 } = this, i3 = w(((_a = this.parentGroup) == null ? void 0 : _a.rotation) === 90 ? { offsetX: -1, offsetY: -1 } : {}, k(t3) ? t3 : {}), s2 = e3.shadowDefinition(i3);
            return this.attr({ filter: t3 ? `url(${e3.url}#${s2})` : "none" });
          }
          show(t3 = true) {
            return this.attr({ visibility: t3 ? "inherit" : "visible" });
          }
          "stroke-widthSetter"(t3, e3, i3) {
            this[e3] = t3, i3.setAttribute(e3, t3);
          }
          strokeWidth() {
            if (!this.renderer.styledMode) return this["stroke-width"] || 0;
            let t3 = this.getStyle("stroke-width"), e3 = 0, i3;
            return /px$/.test(t3) ? e3 = P(t3) : "" !== t3 && (u(i3 = h.createElementNS(d, "rect"), { width: t3, "stroke-width": 0 }), this.element.parentNode.appendChild(i3), e3 = i3.getBBox().width, i3.parentNode.removeChild(i3)), e3;
          }
          symbolAttr(t3) {
            let e3 = this;
            I.symbolCustomAttribs.forEach(function(i3) {
              e3[i3] = A(t3[i3], e3[i3]);
            }), e3.attr({ d: e3.renderer.symbols[e3.symbolName](e3.x, e3.y, e3.width, e3.height, e3) });
          }
          textSetter(t3) {
            t3 !== this.textStr && (delete this.textPxLength, this.textStr = t3, this.added && this.renderer.buildText(this), this.reAlign());
          }
          titleSetter(t3) {
            let e3 = this.element, i3 = e3.getElementsByTagName("title")[0] || h.createElementNS(this.SVG_NS, "title");
            e3.insertBefore ? e3.insertBefore(i3, e3.firstChild) : e3.appendChild(i3), i3.textContent = O(A(t3, ""), [/<[^>]*>/g, ""]).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          }
          toFront() {
            let t3 = this.element;
            return t3.parentNode.appendChild(t3), this;
          }
          translate(t3, e3) {
            return this.attr({ translateX: t3, translateY: e3 });
          }
          updateTransform(t3 = "transform") {
            var _a;
            let { element: e3, matrix: i3, rotation: s2 = 0, rotationOriginX: r2, rotationOriginY: o2, scaleX: n2, scaleY: a2, translateX: h2 = 0, translateY: l2 = 0 } = this, d2 = ["translate(" + h2 + "," + l2 + ")"];
            x(i3) && d2.push("matrix(" + i3.join(",") + ")"), s2 && (d2.push("rotate(" + s2 + " " + A(r2, e3.getAttribute("x"), 0) + " " + A(o2, e3.getAttribute("y") || 0) + ")"), ((_a = this.text) == null ? void 0 : _a.element.tagName) === "SPAN" && this.text.attr({ rotation: s2, rotationOriginX: (r2 || 0) - this.padding, rotationOriginY: (o2 || 0) - this.padding })), (x(n2) || x(a2)) && d2.push("scale(" + A(n2, 1) + " " + A(a2, 1) + ")"), d2.length && !(this.text || this).textPath && e3.setAttribute(t3, d2.join(" "));
          }
          visibilitySetter(t3, e3, i3) {
            "inherit" === t3 ? i3.removeAttribute(e3) : this[e3] !== t3 && i3.setAttribute(e3, t3), this[e3] = t3;
          }
          xGetter(t3) {
            return "circle" === this.element.nodeName && ("x" === t3 ? t3 = "cx" : "y" === t3 && (t3 = "cy")), this._defaultGetter(t3);
          }
          zIndexSetter(t3, e3) {
            let i3 = this.renderer, s2 = this.parentGroup, r2 = (s2 || i3).element || i3.box, o2 = this.element, n2 = r2 === i3.box, a2, h2, l2, d2 = false, c2, p2 = this.added, u2;
            if (x(t3) ? (o2.setAttribute("data-z-index", t3), t3 = +t3, this[e3] === t3 && (p2 = false)) : x(this[e3]) && o2.removeAttribute("data-z-index"), this[e3] = t3, p2) {
              for ((t3 = this.zIndex) && s2 && (s2.handleZ = true), u2 = (a2 = r2.childNodes).length - 1; u2 >= 0 && !d2; u2--) c2 = !x(l2 = (h2 = a2[u2]).getAttribute("data-z-index")), h2 !== o2 && (t3 < 0 && c2 && !n2 && !u2 ? (r2.insertBefore(o2, a2[u2]), d2 = true) : (P(l2) <= t3 || c2 && (!x(t3) || t3 >= 0)) && (r2.insertBefore(o2, a2[u2 + 1]), d2 = true));
              d2 || (r2.insertBefore(o2, a2[n2 ? 3 : 0]), d2 = true);
            }
            return d2;
          }
        }
        return I.symbolCustomAttribs = ["anchorX", "anchorY", "clockwise", "end", "height", "innerR", "r", "start", "width", "x", "y"], I.prototype.strokeSetter = I.prototype.fillSetter, I.prototype.yGetter = I.prototype.xGetter, I.prototype.matrixSetter = I.prototype.rotationOriginXSetter = I.prototype.rotationOriginYSetter = I.prototype.rotationSetter = I.prototype.scaleXSetter = I.prototype.scaleYSetter = I.prototype.translateXSetter = I.prototype.translateYSetter = I.prototype.verticalAlignSetter = function(t3, e3) {
          this[e3] = t3, this.doTransform = true;
        }, I;
      }), i(e, "Core/Renderer/SVG/SVGLabel.js", [e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { defined: i2, extend: s, isNumber: r, merge: o, pick: n, removeEvent: a } = e2;
        class h extends t2 {
          constructor(t3, e3, i3, s2, r2, o2, n2, a2, l, d) {
            let c;
            super(t3, "g"), this.paddingLeftSetter = this.paddingSetter, this.paddingRightSetter = this.paddingSetter, this.doUpdate = false, this.textStr = e3, this.x = i3, this.y = s2, this.anchorX = o2, this.anchorY = n2, this.baseline = l, this.className = d, this.addClass("button" === d ? "highcharts-no-tooltip" : "highcharts-label"), d && this.addClass("highcharts-" + d), this.text = t3.text(void 0, 0, 0, a2).attr({ zIndex: 1 }), "string" == typeof r2 && ((c = /^url\((.*?)\)$/.test(r2)) || this.renderer.symbols[r2]) && (this.symbolKey = r2), this.bBox = h.emptyBBox, this.padding = 3, this.baselineOffset = 0, this.needsBox = t3.styledMode || c, this.deferredAttr = {}, this.alignFactor = 0;
          }
          alignSetter(t3) {
            let e3 = { left: 0, center: 0.5, right: 1 }[t3];
            e3 !== this.alignFactor && (this.alignFactor = e3, this.bBox && r(this.xSetting) && this.attr({ x: this.xSetting }));
          }
          anchorXSetter(t3, e3) {
            this.anchorX = t3, this.boxAttr(e3, Math.round(t3) - this.getCrispAdjust() - this.xSetting);
          }
          anchorYSetter(t3, e3) {
            this.anchorY = t3, this.boxAttr(e3, t3 - this.ySetting);
          }
          boxAttr(t3, e3) {
            this.box ? this.box.attr(t3, e3) : this.deferredAttr[t3] = e3;
          }
          css(e3) {
            if (e3) {
              let t3 = {};
              e3 = o(e3), h.textProps.forEach((i3) => {
                void 0 !== e3[i3] && (t3[i3] = e3[i3], delete e3[i3]);
              }), this.text.css(t3), "fontSize" in t3 || "fontWeight" in t3 ? this.updateTextPadding() : ("width" in t3 || "textOverflow" in t3) && this.updateBoxSize();
            }
            return t2.prototype.css.call(this, e3);
          }
          destroy() {
            a(this.element, "mouseenter"), a(this.element, "mouseleave"), this.text && this.text.destroy(), this.box && (this.box = this.box.destroy()), t2.prototype.destroy.call(this);
          }
          fillSetter(t3, e3) {
            t3 && (this.needsBox = true), this.fill = t3, this.boxAttr(e3, t3);
          }
          getBBox(t3, e3) {
            this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
            let { padding: i3, height: s2 = 0, translateX: r2 = 0, translateY: o2 = 0, width: a2 = 0 } = this, h2 = n(this.paddingLeft, i3), l = e3 ?? (this.rotation || 0), d = { width: a2, height: s2, x: r2 + this.bBox.x - h2, y: o2 + this.bBox.y - i3 + this.baselineOffset };
            return l && (d = this.getRotatedBox(d, l)), d;
          }
          getCrispAdjust() {
            return (this.renderer.styledMode && this.box ? this.box.strokeWidth() : this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
          }
          heightSetter(t3) {
            this.heightSetting = t3, this.doUpdate = true;
          }
          afterSetters() {
            super.afterSetters(), this.doUpdate && (this.updateBoxSize(), this.doUpdate = false);
          }
          onAdd() {
            this.text.add(this), this.attr({ text: n(this.textStr, ""), x: this.x || 0, y: this.y || 0 }), this.box && i2(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
          }
          paddingSetter(t3, e3) {
            r(t3) ? t3 !== this[e3] && (this[e3] = t3, this.updateTextPadding()) : this[e3] = void 0;
          }
          rSetter(t3, e3) {
            this.boxAttr(e3, t3);
          }
          strokeSetter(t3, e3) {
            this.stroke = t3, this.boxAttr(e3, t3);
          }
          "stroke-widthSetter"(t3, e3) {
            t3 && (this.needsBox = true), this["stroke-width"] = t3, this.boxAttr(e3, t3);
          }
          "text-alignSetter"(t3) {
            this.textAlign = t3;
          }
          textSetter(t3) {
            void 0 !== t3 && this.text.attr({ text: t3 }), this.updateTextPadding(), this.reAlign();
          }
          updateBoxSize() {
            let t3;
            let e3 = this.text, o2 = {}, n2 = this.padding, a2 = this.bBox = (!r(this.widthSetting) || !r(this.heightSetting) || this.textAlign) && i2(e3.textStr) ? e3.getBBox(void 0, 0) : h.emptyBBox;
            this.width = this.getPaddedWidth(), this.height = (this.heightSetting || a2.height || 0) + 2 * n2;
            let l = this.renderer.fontMetrics(e3);
            if (this.baselineOffset = n2 + Math.min((this.text.firstLineMetrics || l).b, a2.height || 1 / 0), this.heightSetting && (this.baselineOffset += (this.heightSetting - l.h) / 2), this.needsBox && !e3.textPath) {
              if (!this.box) {
                let t4 = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect();
                t4.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), t4.add(this);
              }
              t3 = this.getCrispAdjust(), o2.x = t3, o2.y = (this.baseline ? -this.baselineOffset : 0) + t3, o2.width = Math.round(this.width), o2.height = Math.round(this.height), this.box.attr(s(o2, this.deferredAttr)), this.deferredAttr = {};
            }
          }
          updateTextPadding() {
            let t3 = this.text;
            if (!t3.textPath) {
              this.updateBoxSize();
              let e3 = this.baseline ? 0 : this.baselineOffset, s2 = n(this.paddingLeft, this.padding);
              i2(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (s2 += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width)), (s2 !== t3.x || e3 !== t3.y) && (t3.attr("x", s2), t3.hasBoxWidthChanged && (this.bBox = t3.getBBox(true)), void 0 !== e3 && t3.attr("y", e3)), t3.x = s2, t3.y = e3;
            }
          }
          widthSetter(t3) {
            this.widthSetting = r(t3) ? t3 : void 0, this.doUpdate = true;
          }
          getPaddedWidth() {
            let t3 = this.padding, e3 = n(this.paddingLeft, t3), i3 = n(this.paddingRight, t3);
            return (this.widthSetting || this.bBox.width || 0) + e3 + i3;
          }
          xSetter(t3) {
            this.x = t3, this.alignFactor && (t3 -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = true), this.xSetting = Math.round(t3), this.attr("translateX", this.xSetting);
          }
          ySetter(t3) {
            this.ySetting = this.y = Math.round(t3), this.attr("translateY", this.ySetting);
          }
        }
        return h.emptyBBox = { width: 0, height: 0, x: 0, y: 0 }, h.textProps = ["color", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "whiteSpace", "width"], h;
      }), i(e, "Core/Renderer/SVG/Symbols.js", [e["Core/Utilities.js"]], function(t2) {
        let { defined: e2, isNumber: i2, pick: s } = t2;
        function r(t3, i3, r2, o2, n2) {
          let a = [];
          if (n2) {
            let h = n2.start || 0, l = s(n2.r, r2), d = s(n2.r, o2 || r2), c = 2e-4 / (n2.borderRadius ? 1 : Math.max(l, 1)), p = Math.abs((n2.end || 0) - h - 2 * Math.PI) < c, u = (n2.end || 0) - (p ? c : 0), g = n2.innerR, f = s(n2.open, p), m = Math.cos(h), x = Math.sin(h), y = Math.cos(u), b = Math.sin(u), v = s(n2.longArc, u - h - Math.PI < c ? 0 : 1), S = ["A", l, d, 0, v, s(n2.clockwise, 1), t3 + l * y, i3 + d * b];
            S.params = { start: h, end: u, cx: t3, cy: i3 }, a.push(["M", t3 + l * m, i3 + d * x], S), e2(g) && ((S = ["A", g, g, 0, v, e2(n2.clockwise) ? 1 - n2.clockwise : 0, t3 + g * m, i3 + g * x]).params = { start: u, end: h, cx: t3, cy: i3 }, a.push(f ? ["M", t3 + g * y, i3 + g * b] : ["L", t3 + g * y, i3 + g * b], S)), f || a.push(["Z"]);
          }
          return a;
        }
        function o(t3, e3, i3, s2, r2) {
          return r2 && r2.r ? n(t3, e3, i3, s2, r2) : [["M", t3, e3], ["L", t3 + i3, e3], ["L", t3 + i3, e3 + s2], ["L", t3, e3 + s2], ["Z"]];
        }
        function n(t3, e3, i3, s2, r2) {
          let o2 = (r2 == null ? void 0 : r2.r) || 0;
          return [["M", t3 + o2, e3], ["L", t3 + i3 - o2, e3], ["A", o2, o2, 0, 0, 1, t3 + i3, e3 + o2], ["L", t3 + i3, e3 + s2 - o2], ["A", o2, o2, 0, 0, 1, t3 + i3 - o2, e3 + s2], ["L", t3 + o2, e3 + s2], ["A", o2, o2, 0, 0, 1, t3, e3 + s2 - o2], ["L", t3, e3 + o2], ["A", o2, o2, 0, 0, 1, t3 + o2, e3], ["Z"]];
        }
        return { arc: r, callout: function(t3, e3, s2, r2, o2) {
          let a = Math.min(o2 && o2.r || 0, s2, r2), h = a + 6, l = o2 && o2.anchorX, d = o2 && o2.anchorY || 0, c = n(t3, e3, s2, r2, { r: a });
          if (!i2(l) || l < s2 && l > 0 && d < r2 && d > 0) return c;
          if (t3 + l > s2 - h) {
            if (d > e3 + h && d < e3 + r2 - h) c.splice(3, 1, ["L", t3 + s2, d - 6], ["L", t3 + s2 + 6, d], ["L", t3 + s2, d + 6], ["L", t3 + s2, e3 + r2 - a]);
            else if (l < s2) {
              let i3 = d < e3 + h, o3 = i3 ? e3 : e3 + r2;
              c.splice(i3 ? 2 : 5, 0, ["L", l, d], ["L", t3 + s2 - a, o3]);
            } else c.splice(3, 1, ["L", t3 + s2, r2 / 2], ["L", l, d], ["L", t3 + s2, r2 / 2], ["L", t3 + s2, e3 + r2 - a]);
          } else if (t3 + l < h) {
            if (d > e3 + h && d < e3 + r2 - h) c.splice(7, 1, ["L", t3, d + 6], ["L", t3 - 6, d], ["L", t3, d - 6], ["L", t3, e3 + a]);
            else if (l > 0) {
              let i3 = d < e3 + h, s3 = i3 ? e3 : e3 + r2;
              c.splice(i3 ? 1 : 6, 0, ["L", l, d], ["L", t3 + a, s3]);
            } else c.splice(7, 1, ["L", t3, r2 / 2], ["L", l, d], ["L", t3, r2 / 2], ["L", t3, e3 + a]);
          } else d > r2 && l < s2 - h ? c.splice(5, 1, ["L", l + 6, e3 + r2], ["L", l, e3 + r2 + 6], ["L", l - 6, e3 + r2], ["L", t3 + a, e3 + r2]) : d < 0 && l > h && c.splice(1, 1, ["L", l - 6, e3], ["L", l, e3 - 6], ["L", l + 6, e3], ["L", s2 - a, e3]);
          return c;
        }, circle: function(t3, e3, i3, s2) {
          return r(t3 + i3 / 2, e3 + s2 / 2, i3 / 2, s2 / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: false });
        }, diamond: function(t3, e3, i3, s2) {
          return [["M", t3 + i3 / 2, e3], ["L", t3 + i3, e3 + s2 / 2], ["L", t3 + i3 / 2, e3 + s2], ["L", t3, e3 + s2 / 2], ["Z"]];
        }, rect: o, roundedRect: n, square: o, triangle: function(t3, e3, i3, s2) {
          return [["M", t3 + i3 / 2, e3], ["L", t3 + i3, e3 + s2], ["L", t3, e3 + s2], ["Z"]];
        }, "triangle-down": function(t3, e3, i3, s2) {
          return [["M", t3, e3], ["L", t3 + i3, e3], ["L", t3 + i3 / 2, e3 + s2], ["Z"]];
        } };
      }), i(e, "Core/Renderer/SVG/TextBuilder.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { doc: s, SVG_NS: r, win: o } = e2, { attr: n, extend: a, fireEvent: h, isString: l, objectEach: d, pick: c } = i2;
        return class {
          constructor(t3) {
            let e3 = t3.styles;
            this.renderer = t3.renderer, this.svgElement = t3, this.width = t3.textWidth, this.textLineHeight = e3 && e3.lineHeight, this.textOutline = e3 && e3.textOutline, this.ellipsis = !!(e3 && "ellipsis" === e3.textOverflow), this.noWrap = !!(e3 && "nowrap" === e3.whiteSpace);
          }
          buildSVG() {
            let e3 = this.svgElement, i3 = e3.element, r2 = e3.renderer, o2 = c(e3.textStr, "").toString(), n2 = -1 !== o2.indexOf("<"), a2 = i3.childNodes, h2 = !e3.added && r2.box, d2 = [o2, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, e3.getStyle("font-size"), this.width].join(",");
            if (d2 !== e3.textCache) {
              e3.textCache = d2, delete e3.actualWidth;
              for (let t3 = a2.length; t3--; ) i3.removeChild(a2[t3]);
              if (n2 || this.ellipsis || this.width || e3.textPath || -1 !== o2.indexOf(" ") && (!this.noWrap || /<br.*?>/g.test(o2))) {
                if ("" !== o2) {
                  h2 && h2.appendChild(i3);
                  let s2 = new t2(o2);
                  this.modifyTree(s2.nodes), s2.addToDOM(i3), this.modifyDOM(), this.ellipsis && -1 !== (i3.textContent || "").indexOf("…") && e3.attr("title", this.unescapeEntities(e3.textStr || "", ["&lt;", "&gt;"])), h2 && h2.removeChild(i3);
                }
              } else i3.appendChild(s.createTextNode(this.unescapeEntities(o2)));
              l(this.textOutline) && e3.applyTextOutline && e3.applyTextOutline(this.textOutline);
            }
          }
          modifyDOM() {
            let t3;
            let e3 = this.svgElement, i3 = n(e3.element, "x");
            for (e3.firstLineMetrics = void 0; t3 = e3.element.firstChild; ) if (/^[\s\u200B]*$/.test(t3.textContent || " ")) e3.element.removeChild(t3);
            else break;
            [].forEach.call(e3.element.querySelectorAll("tspan.highcharts-br"), (t4, s2) => {
              t4.nextSibling && t4.previousSibling && (0 === s2 && 1 === t4.previousSibling.nodeType && (e3.firstLineMetrics = e3.renderer.fontMetrics(t4.previousSibling)), n(t4, { dy: this.getLineHeight(t4.nextSibling), x: i3 }));
            });
            let a2 = this.width || 0;
            if (!a2) return;
            let h2 = (t4, o2) => {
              let h3 = t4.textContent || "", l3 = h3.replace(/([^\^])-/g, "$1- ").split(" "), d2 = !this.noWrap && (l3.length > 1 || e3.element.childNodes.length > 1), c2 = this.getLineHeight(o2), p = 0, u = e3.actualWidth;
              if (this.ellipsis) h3 && this.truncate(t4, h3, void 0, 0, Math.max(0, a2 - 0.8 * c2), (t5, e4) => t5.substring(0, e4) + "…");
              else if (d2) {
                let h4 = [], d3 = [];
                for (; o2.firstChild && o2.firstChild !== t4; ) d3.push(o2.firstChild), o2.removeChild(o2.firstChild);
                for (; l3.length; ) l3.length && !this.noWrap && p > 0 && (h4.push(t4.textContent || ""), t4.textContent = l3.join(" ").replace(/- /g, "-")), this.truncate(t4, void 0, l3, 0 === p && u || 0, a2, (t5, e4) => l3.slice(0, e4).join(" ").replace(/- /g, "-")), u = e3.actualWidth, p++;
                d3.forEach((e4) => {
                  o2.insertBefore(e4, t4);
                }), h4.forEach((e4) => {
                  o2.insertBefore(s.createTextNode(e4), t4);
                  let a3 = s.createElementNS(r, "tspan");
                  a3.textContent = "​", n(a3, { dy: c2, x: i3 }), o2.insertBefore(a3, t4);
                });
              }
            }, l2 = (t4) => {
              [].slice.call(t4.childNodes).forEach((i4) => {
                i4.nodeType === o.Node.TEXT_NODE ? h2(i4, t4) : (-1 !== i4.className.baseVal.indexOf("highcharts-br") && (e3.actualWidth = 0), l2(i4));
              });
            };
            l2(e3.element);
          }
          getLineHeight(t3) {
            let e3 = t3.nodeType === o.Node.TEXT_NODE ? t3.parentElement : t3;
            return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e3 || this.svgElement.element).h;
          }
          modifyTree(t3) {
            let e3 = (i3, s2) => {
              let { attributes: r2 = {}, children: o2, style: n2 = {}, tagName: h2 } = i3, l2 = this.renderer.styledMode;
              if ("b" === h2 || "strong" === h2 ? l2 ? r2.class = "highcharts-strong" : n2.fontWeight = "bold" : ("i" === h2 || "em" === h2) && (l2 ? r2.class = "highcharts-emphasized" : n2.fontStyle = "italic"), n2 && n2.color && (n2.fill = n2.color), "br" === h2) {
                r2.class = "highcharts-br", i3.textContent = "​";
                let e4 = t3[s2 + 1];
                e4 && e4.textContent && (e4.textContent = e4.textContent.replace(/^ +/gm, ""));
              } else "a" === h2 && o2 && o2.some((t4) => "#text" === t4.tagName) && (i3.children = [{ children: o2, tagName: "tspan" }]);
              "#text" !== h2 && "a" !== h2 && (i3.tagName = "tspan"), a(i3, { attributes: r2, style: n2 }), o2 && o2.filter((t4) => "#text" !== t4.tagName).forEach(e3);
            };
            t3.forEach(e3), h(this.svgElement, "afterModifyTree", { nodes: t3 });
          }
          truncate(t3, e3, i3, s2, r2, o2) {
            let n2, a2;
            let h2 = this.svgElement, { rotation: l2 } = h2, d2 = [], c2 = i3 ? 1 : 0, p = (e3 || i3 || "").length, u = p, g = function(e4, r3) {
              let o3 = r3 || e4, n3 = t3.parentNode;
              if (n3 && void 0 === d2[o3] && n3.getSubStringLength) try {
                d2[o3] = s2 + n3.getSubStringLength(0, i3 ? o3 + 1 : o3);
              } catch (t4) {
              }
              return d2[o3];
            };
            if (h2.rotation = 0, s2 + (a2 = g(t3.textContent.length)) > r2) {
              for (; c2 <= p; ) u = Math.ceil((c2 + p) / 2), i3 && (n2 = o2(i3, u)), a2 = g(u, n2 && n2.length - 1), c2 === p ? c2 = p + 1 : a2 > r2 ? p = u - 1 : c2 = u;
              0 === p ? t3.textContent = "" : e3 && p === e3.length - 1 || (t3.textContent = n2 || o2(e3 || i3, u));
            }
            i3 && i3.splice(0, u), h2.actualWidth = a2, h2.rotation = l2;
          }
          unescapeEntities(t3, e3) {
            return d(this.renderer.escapes, function(i3, s2) {
              e3 && -1 !== e3.indexOf(i3) || (t3 = t3.toString().replace(RegExp(i3, "g"), s2));
            }), t3;
          }
        };
      }), i(e, "Core/Renderer/SVG/SVGRenderer.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Defaults.js"], e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Renderer/SVG/SVGLabel.js"], e["Core/Renderer/SVG/Symbols.js"], e["Core/Renderer/SVG/TextBuilder.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o, n, a, h, l) {
        let d;
        let { defaultOptions: c } = e2, { charts: p, deg2rad: u, doc: g, isFirefox: f, isMS: m, isWebKit: x, noop: y, SVG_NS: b, symbolSizes: v, win: S } = s, { addEvent: C, attr: k, createElement: M, crisp: w, css: T, defined: A, destroyObjectProperties: P, extend: L, isArray: O, isNumber: D, isObject: E, isString: I, merge: j, pick: B, pInt: R, replaceNested: z, uniqueKey: N } = l;
        class W {
          constructor(t3, e3, i3, s2, r2, o2, n2) {
            let a2, h2;
            let l2 = this.createElement("svg").attr({ version: "1.1", class: "highcharts-root" }), d2 = l2.element;
            n2 || l2.css(this.getStyle(s2 || {})), t3.appendChild(d2), k(t3, "dir", "ltr"), -1 === t3.innerHTML.indexOf("xmlns") && k(d2, "xmlns", this.SVG_NS), this.box = d2, this.boxWrapper = l2, this.alignedObjects = [], this.url = this.getReferenceURL(), this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highcharts 11.4.8")), this.defs = this.createElement("defs").add(), this.allowHTML = o2, this.forExport = r2, this.styledMode = n2, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.rootFontSize = l2.getStyle("font-size"), this.setSize(e3, i3, false), f && t3.getBoundingClientRect && ((a2 = function() {
              T(t3, { left: 0, top: 0 }), h2 = t3.getBoundingClientRect(), T(t3, { left: Math.ceil(h2.left) - h2.left + "px", top: Math.ceil(h2.top) - h2.top + "px" });
            })(), this.unSubPixelFix = C(S, "resize", a2));
          }
          definition(e3) {
            return new t2([e3]).addToDOM(this.defs.element);
          }
          getReferenceURL() {
            if ((f || x) && g.getElementsByTagName("base").length) {
              if (!A(d)) {
                let e3 = N(), i3 = new t2([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: e3 }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": `url(#${e3})`, fill: "rgba(0,0,0,0.001)" } }] }]).addToDOM(g.body);
                T(i3, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
                let s2 = g.elementFromPoint(6, 6);
                d = "hitme" === (s2 && s2.id), g.body.removeChild(i3);
              }
              if (d) return z(S.location.href.split("#")[0], [/<[^>]*>/g, ""], [/([\('\)])/g, "\\$1"], [/ /g, "%20"]);
            }
            return "";
          }
          getStyle(t3) {
            return this.style = L({ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "1rem" }, t3), this.style;
          }
          setStyle(t3) {
            this.boxWrapper.css(this.getStyle(t3));
          }
          isHidden() {
            return !this.boxWrapper.getBBox().width;
          }
          destroy() {
            let t3 = this.defs;
            return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), P(this.gradients || {}), this.gradients = null, this.defs = t3.destroy(), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null, null;
          }
          createElement(t3) {
            return new this.Element(this, t3);
          }
          getRadialAttr(t3, e3) {
            return { cx: t3[0] - t3[2] / 2 + (e3.cx || 0) * t3[2], cy: t3[1] - t3[2] / 2 + (e3.cy || 0) * t3[2], r: (e3.r || 0) * t3[2] };
          }
          shadowDefinition(t3) {
            let e3 = [`highcharts-drop-shadow-${this.chartIndex}`, ...Object.keys(t3).map((e4) => `${e4}-${t3[e4]}`)].join("-").toLowerCase().replace(/[^a-z\d\-]/g, ""), i3 = j({ color: "#000000", offsetX: 1, offsetY: 1, opacity: 0.15, width: 5 }, t3);
            return this.defs.element.querySelector(`#${e3}`) || this.definition({ tagName: "filter", attributes: { id: e3, filterUnits: i3.filterUnits }, children: this.getShadowFilterContent(i3) }), e3;
          }
          getShadowFilterContent(t3) {
            return [{ tagName: "feDropShadow", attributes: { dx: t3.offsetX, dy: t3.offsetY, "flood-color": t3.color, "flood-opacity": Math.min(5 * t3.opacity, 1), stdDeviation: t3.width / 2 } }];
          }
          buildText(t3) {
            new h(t3).buildSVG();
          }
          getContrast(t3) {
            let e3 = i2.parse(t3).rgba.map((t4) => {
              let e4 = t4 / 255;
              return e4 <= 0.03928 ? e4 / 12.92 : Math.pow((e4 + 0.055) / 1.055, 2.4);
            }), s2 = 0.2126 * e3[0] + 0.7152 * e3[1] + 0.0722 * e3[2];
            return 1.05 / (s2 + 0.05) > (s2 + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
          }
          button(e3, i3, s2, r2, o2 = {}, n2, a2, h2, l2, d2) {
            let p2 = this.label(e3, i3, s2, l2, void 0, void 0, d2, void 0, "button"), u2 = this.styledMode, g2 = arguments, f2 = 0;
            o2 = j(c.global.buttonTheme, o2), u2 && (delete o2.fill, delete o2.stroke, delete o2["stroke-width"]);
            let x2 = o2.states || {}, y2 = o2.style || {};
            delete o2.states, delete o2.style;
            let b2 = [t2.filterUserAttributes(o2)], v2 = [y2];
            return u2 || ["hover", "select", "disabled"].forEach((e4, i4) => {
              b2.push(j(b2[0], t2.filterUserAttributes(g2[i4 + 5] || x2[e4] || {}))), v2.push(b2[i4 + 1].style), delete b2[i4 + 1].style;
            }), C(p2.element, m ? "mouseover" : "mouseenter", function() {
              3 !== f2 && p2.setState(1);
            }), C(p2.element, m ? "mouseout" : "mouseleave", function() {
              3 !== f2 && p2.setState(f2);
            }), p2.setState = (t3 = 0) => {
              if (1 !== t3 && (p2.state = f2 = t3), p2.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t3]), !u2) {
                p2.attr(b2[t3]);
                let e4 = v2[t3];
                E(e4) && p2.css(e4);
              }
            }, p2.attr(b2[0]), !u2 && (p2.css(L({ cursor: "default" }, y2)), d2 && p2.text.css({ pointerEvents: "none" })), p2.on("touchstart", (t3) => t3.stopPropagation()).on("click", function(t3) {
              3 !== f2 && r2.call(p2, t3);
            });
          }
          crispLine(t3, e3) {
            let [i3, s2] = t3;
            return A(i3[1]) && i3[1] === s2[1] && (i3[1] = s2[1] = w(i3[1], e3)), A(i3[2]) && i3[2] === s2[2] && (i3[2] = s2[2] = w(i3[2], e3)), t3;
          }
          path(t3) {
            let e3 = this.styledMode ? {} : { fill: "none" };
            return O(t3) ? e3.d = t3 : E(t3) && L(e3, t3), this.createElement("path").attr(e3);
          }
          circle(t3, e3, i3) {
            let s2 = E(t3) ? t3 : void 0 === t3 ? {} : { x: t3, y: e3, r: i3 }, r2 = this.createElement("circle");
            return r2.xSetter = r2.ySetter = function(t4, e4, i4) {
              i4.setAttribute("c" + e4, t4);
            }, r2.attr(s2);
          }
          arc(t3, e3, i3, s2, r2, o2) {
            let n2;
            E(t3) ? (e3 = (n2 = t3).y, i3 = n2.r, s2 = n2.innerR, r2 = n2.start, o2 = n2.end, t3 = n2.x) : n2 = { innerR: s2, start: r2, end: o2 };
            let a2 = this.symbol("arc", t3, e3, i3, i3, n2);
            return a2.r = i3, a2;
          }
          rect(t3, e3, i3, s2, r2, o2) {
            let n2 = E(t3) ? t3 : void 0 === t3 ? {} : { x: t3, y: e3, r: r2, width: Math.max(i3 || 0, 0), height: Math.max(s2 || 0, 0) }, a2 = this.createElement("rect");
            return this.styledMode || (void 0 !== o2 && (n2["stroke-width"] = o2, L(n2, a2.crisp(n2))), n2.fill = "none"), a2.rSetter = function(t4, e4, i4) {
              a2.r = t4, k(i4, { rx: t4, ry: t4 });
            }, a2.rGetter = function() {
              return a2.r || 0;
            }, a2.attr(n2);
          }
          roundedRect(t3) {
            return this.symbol("roundedRect").attr(t3);
          }
          setSize(t3, e3, i3) {
            this.width = t3, this.height = e3, this.boxWrapper.animate({ width: t3, height: e3 }, { step: function() {
              this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
            }, duration: B(i3, true) ? void 0 : 0 }), this.alignElements();
          }
          g(t3) {
            let e3 = this.createElement("g");
            return t3 ? e3.attr({ class: "highcharts-" + t3 }) : e3;
          }
          image(t3, e3, i3, s2, r2, o2) {
            let n2 = { preserveAspectRatio: "none" };
            D(e3) && (n2.x = e3), D(i3) && (n2.y = i3), D(s2) && (n2.width = s2), D(r2) && (n2.height = r2);
            let a2 = this.createElement("image").attr(n2), h2 = function(e4) {
              a2.attr({ href: t3 }), o2.call(a2, e4);
            };
            if (o2) {
              a2.attr({ href: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" });
              let e4 = new S.Image();
              C(e4, "load", h2), e4.src = t3, e4.complete && h2({});
            } else a2.attr({ href: t3 });
            return a2;
          }
          symbol(t3, e3, i3, s2, r2, o2) {
            let n2, a2, h2, l2;
            let d2 = this, c2 = /^url\((.*?)\)$/, u2 = c2.test(t3), f2 = !u2 && (this.symbols[t3] ? t3 : "circle"), m2 = f2 && this.symbols[f2];
            if (m2) "number" == typeof e3 && (a2 = m2.call(this.symbols, e3 || 0, i3 || 0, s2 || 0, r2 || 0, o2)), n2 = this.path(a2), d2.styledMode || n2.attr("fill", "none"), L(n2, { symbolName: f2 || void 0, x: e3, y: i3, width: s2, height: r2 }), o2 && L(n2, o2);
            else if (u2) {
              h2 = t3.match(c2)[1];
              let s3 = n2 = this.image(h2);
              s3.imgwidth = B(o2 && o2.width, v[h2] && v[h2].width), s3.imgheight = B(o2 && o2.height, v[h2] && v[h2].height), l2 = (t4) => t4.attr({ width: t4.width, height: t4.height }), ["width", "height"].forEach((t4) => {
                s3[`${t4}Setter`] = function(t5, e4) {
                  this[e4] = t5;
                  let { alignByTranslate: i4, element: s4, width: r3, height: n3, imgwidth: a3, imgheight: h3 } = this, l3 = "width" === e4 ? a3 : h3, d3 = 1;
                  o2 && "within" === o2.backgroundSize && r3 && n3 && a3 && h3 ? (d3 = Math.min(r3 / a3, n3 / h3), k(s4, { width: Math.round(a3 * d3), height: Math.round(h3 * d3) })) : s4 && l3 && s4.setAttribute(e4, l3), !i4 && a3 && h3 && this.translate(((r3 || 0) - a3 * d3) / 2, ((n3 || 0) - h3 * d3) / 2);
                };
              }), A(e3) && s3.attr({ x: e3, y: i3 }), s3.isImg = true, s3.symbolUrl = t3, A(s3.imgwidth) && A(s3.imgheight) ? l2(s3) : (s3.attr({ width: 0, height: 0 }), M("img", { onload: function() {
                let t4 = p[d2.chartIndex];
                0 === this.width && (T(this, { position: "absolute", top: "-999em" }), g.body.appendChild(this)), v[h2] = { width: this.width, height: this.height }, s3.imgwidth = this.width, s3.imgheight = this.height, s3.element && l2(s3), this.parentNode && this.parentNode.removeChild(this), d2.imgCount--, d2.imgCount || !t4 || t4.hasLoaded || t4.onload();
              }, src: h2 }), this.imgCount++);
            }
            return n2;
          }
          clipRect(t3, e3, i3, s2) {
            return this.rect(t3, e3, i3, s2, 0);
          }
          text(t3, e3, i3, s2) {
            let r2 = {};
            if (s2 && (this.allowHTML || !this.forExport)) return this.html(t3, e3, i3);
            r2.x = Math.round(e3 || 0), i3 && (r2.y = Math.round(i3)), A(t3) && (r2.text = t3);
            let o2 = this.createElement("text").attr(r2);
            return s2 && (!this.forExport || this.allowHTML) || (o2.xSetter = function(t4, e4, i4) {
              let s3 = i4.getElementsByTagName("tspan"), r3 = i4.getAttribute(e4);
              for (let i5 = 0, o3; i5 < s3.length; i5++) (o3 = s3[i5]).getAttribute(e4) === r3 && o3.setAttribute(e4, t4);
              i4.setAttribute(e4, t4);
            }), o2;
          }
          fontMetrics(t3) {
            let e3 = R(o.prototype.getStyle.call(t3, "font-size") || 0), i3 = e3 < 24 ? e3 + 3 : Math.round(1.2 * e3), s2 = Math.round(0.8 * i3);
            return { h: i3, b: s2, f: e3 };
          }
          rotCorr(t3, e3, i3) {
            let s2 = t3;
            return e3 && i3 && (s2 = Math.max(s2 * Math.cos(e3 * u), 4)), { x: -t3 / 3 * Math.sin(e3 * u), y: s2 };
          }
          pathToSegments(t3) {
            let e3 = [], i3 = [], s2 = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 };
            for (let r2 = 0; r2 < t3.length; r2++) I(i3[0]) && D(t3[r2]) && i3.length === s2[i3[0].toUpperCase()] && t3.splice(r2, 0, i3[0].replace("M", "L").replace("m", "l")), "string" == typeof t3[r2] && (i3.length && e3.push(i3.slice(0)), i3.length = 0), i3.push(t3[r2]);
            return e3.push(i3.slice(0)), e3;
          }
          label(t3, e3, i3, s2, r2, o2, a2, h2, l2) {
            return new n(this, t3, e3, i3, s2, r2, o2, a2, h2, l2);
          }
          alignElements() {
            this.alignedObjects.forEach((t3) => t3.align());
          }
        }
        return L(W.prototype, { Element: o, SVG_NS: b, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: a, draw: y }), r.registerRendererType("svg", W, true), W;
      }), i(e, "Core/Renderer/HTML/HTMLElement.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Globals.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        let { composed: r } = e2, { attr: o, css: n, createElement: a, defined: h, extend: l, pInt: d, pushUnique: c } = s;
        function p(t3, e3, s2) {
          var _a;
          let r2 = ((_a = this.div) == null ? void 0 : _a.style) || s2.style;
          i2.prototype[`${e3}Setter`].call(this, t3, e3, s2), r2 && (r2[e3] = t3);
        }
        let u = (t3, e3) => {
          var _a;
          if (!t3.div) {
            let s2 = o(t3.element, "class"), r2 = t3.css, n2 = a("div", s2 ? { className: s2 } : void 0, { position: "absolute", left: `${t3.translateX || 0}px`, top: `${t3.translateY || 0}px`, ...t3.styles, display: t3.display, opacity: t3.opacity, visibility: t3.visibility }, ((_a = t3.parentGroup) == null ? void 0 : _a.div) || e3);
            t3.classSetter = (t4, e4, i3) => {
              i3.setAttribute("class", t4), n2.className = t4;
            }, t3.translateXSetter = t3.translateYSetter = (e4, i3) => {
              t3[i3] = e4, n2.style["translateX" === i3 ? "left" : "top"] = `${e4}px`, t3.doTransform = true;
            }, t3.opacitySetter = t3.visibilitySetter = p, t3.css = (e4) => (r2.call(t3, e4), e4.cursor && (n2.style.cursor = e4.cursor), e4.pointerEvents && (n2.style.pointerEvents = e4.pointerEvents), t3), t3.on = function() {
              return i2.prototype.on.apply({ element: n2, onEvents: t3.onEvents }, arguments), t3;
            }, t3.div = n2;
          }
          return t3.div;
        };
        class g extends i2 {
          static compose(t3) {
            c(r, this.compose) && (t3.prototype.html = function(t4, e3, i3) {
              return new g(this, "span").attr({ text: t4, x: Math.round(e3), y: Math.round(i3) });
            });
          }
          constructor(t3, e3) {
            super(t3, e3), this.css({ position: "absolute", ...t3.styledMode ? {} : { fontFamily: t3.style.fontFamily, fontSize: t3.style.fontSize } }), this.element.style.whiteSpace = "nowrap";
          }
          getSpanCorrection(t3, e3, i3) {
            this.xCorr = -t3 * i3, this.yCorr = -e3;
          }
          css(t3) {
            let e3;
            let { element: i3 } = this, s2 = "SPAN" === i3.tagName && t3 && "width" in t3, r2 = s2 && t3.width;
            return s2 && (delete t3.width, this.textWidth = d(r2) || void 0, e3 = true), (t3 == null ? void 0 : t3.textOverflow) === "ellipsis" && (t3.whiteSpace = "nowrap", t3.overflow = "hidden"), l(this.styles, t3), n(i3, t3), e3 && this.updateTransform(), this;
          }
          htmlGetBBox() {
            let { element: t3 } = this;
            return { x: t3.offsetLeft, y: t3.offsetTop, width: t3.offsetWidth, height: t3.offsetHeight };
          }
          updateTransform() {
            var _a;
            if (!this.added) {
              this.alignOnAdd = true;
              return;
            }
            let { element: t3, renderer: e3, rotation: i3, rotationOriginX: s2, rotationOriginY: r2, styles: o2, textAlign: a2 = "left", textWidth: l2, translateX: d2 = 0, translateY: c2 = 0, x: p2 = 0, y: u2 = 0 } = this, g2 = { left: 0, center: 0.5, right: 1 }[a2], f2 = o2.whiteSpace;
            if (n(t3, { marginLeft: `${d2}px`, marginTop: `${c2}px` }), "SPAN" === t3.tagName) {
              let o3 = [i3, a2, t3.innerHTML, l2, this.textAlign].join(","), d3 = -(((_a = this.parentGroup) == null ? void 0 : _a.padding) * 1) || 0, c3, m = false;
              if (l2 !== this.oldTextWidth) {
                let e4 = this.textPxLength ? this.textPxLength : (n(t3, { width: "", whiteSpace: f2 || "nowrap" }), t3.offsetWidth), s3 = l2 || 0;
                (s3 > this.oldTextWidth || e4 > s3) && (/[ \-]/.test(t3.textContent || t3.innerText) || "ellipsis" === t3.style.textOverflow) && (n(t3, { width: e4 > s3 || i3 ? l2 + "px" : "auto", display: "block", whiteSpace: f2 || "normal" }), this.oldTextWidth = l2, m = true);
              }
              this.hasBoxWidthChanged = m, o3 !== this.cTT && (c3 = e3.fontMetrics(t3).b, h(i3) && (i3 !== (this.oldRotation || 0) || a2 !== this.oldAlign) && this.setSpanRotation(i3, d3, d3), this.getSpanCorrection(!h(i3) && this.textPxLength || t3.offsetWidth, c3, g2));
              let { xCorr: x = 0, yCorr: y = 0 } = this, b = (s2 ?? p2) - x - p2 - d3, v = (r2 ?? u2) - y - u2 - d3;
              n(t3, { left: `${p2 + x}px`, top: `${u2 + y}px`, transformOrigin: `${b}px ${v}px` }), this.cTT = o3, this.oldRotation = i3, this.oldAlign = a2;
            }
          }
          setSpanRotation(t3, e3, i3) {
            n(this.element, { transform: `rotate(${t3}deg)`, transformOrigin: `${e3}% ${i3}px` });
          }
          add(t3) {
            let e3;
            let i3 = this.renderer.box.parentNode, s2 = [];
            if (this.parentGroup = t3, t3 && !(e3 = t3.div)) {
              let r2 = t3;
              for (; r2; ) s2.push(r2), r2 = r2.parentGroup;
              for (let t4 of s2.reverse()) e3 = u(t4, i3);
            }
            return (e3 || i3).appendChild(this.element), this.added = true, this.alignOnAdd && this.updateTransform(), this;
          }
          textSetter(e3) {
            e3 !== this.textStr && (delete this.bBox, delete this.oldTextWidth, t2.setElementHTML(this.element, e3 ?? ""), this.textStr = e3, this.doTransform = true);
          }
          alignSetter(t3) {
            this.alignValue = this.textAlign = t3, this.doTransform = true;
          }
          xSetter(t3, e3) {
            this[e3] = t3, this.doTransform = true;
          }
        }
        let f = g.prototype;
        return f.visibilitySetter = f.opacitySetter = p, f.ySetter = f.rotationSetter = f.rotationOriginXSetter = f.rotationOriginYSetter = f.xSetter, g;
      }), i(e, "Core/Axis/AxisDefaults.js", [], function() {
        var t2, e2;
        return (e2 = t2 || (t2 = {})).xAxis = { alignTicks: true, allowDecimals: void 0, panningEnabled: true, zIndex: 2, zoomEnabled: true, dateTimeLabelFormats: { millisecond: { main: "%H:%M:%S.%L", range: false }, second: { main: "%H:%M:%S", range: false }, minute: { main: "%H:%M", range: false }, hour: { main: "%H:%M", range: false }, day: { main: "%e %b" }, week: { main: "%e %b" }, month: { main: "%b '%y" }, year: { main: "%Y" } }, endOnTick: false, gridLineDashStyle: "Solid", gridZIndex: 1, labels: { autoRotationLimit: 80, distance: 15, enabled: true, indentation: 10, overflow: "justify", reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: false, zIndex: 7, style: { color: "#333333", cursor: "default", fontSize: "0.8em" } }, maxPadding: 0.01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minorTicksPerMajor: 5, minPadding: 0.01, offset: void 0, reversed: void 0, reversedStacks: false, showEmpty: true, showFirstLabel: true, showLastLabel: true, startOfWeek: 1, startOnTick: false, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", useHTML: false, x: 0, y: 0, style: { color: "#666666", fontSize: "0.8em" } }, visible: true, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#333333", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#333333" }, e2.yAxis = { reversedStacks: true, endOnTick: true, maxPadding: 0.05, minPadding: 0.05, tickPixelInterval: 72, showLastLabel: true, labels: { x: void 0 }, startOnTick: true, title: { text: "Values" }, stackLabels: { animation: {}, allowOverlap: false, enabled: false, crop: true, overflow: "justify", formatter: function() {
          let { numberFormatter: t3 } = this.axis.chart;
          return t3(this.total || 0, -1);
        }, style: { color: "#000000", fontSize: "0.7em", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, t2;
      }), i(e, "Core/Foundation.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { addEvent: i2, isFunction: s, objectEach: r, removeEvent: o } = t2;
        return (e2 || (e2 = {})).registerEventOptions = function(t3, e3) {
          t3.eventOptions = t3.eventOptions || {}, r(e3.events, function(e4, r2) {
            t3.eventOptions[r2] !== e4 && (t3.eventOptions[r2] && (o(t3, r2, t3.eventOptions[r2]), delete t3.eventOptions[r2]), s(e4) && (t3.eventOptions[r2] = e4, i2(t3, r2, e4, { order: 0 })));
          });
        }, e2;
      }), i(e, "Core/Axis/Tick.js", [e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { deg2rad: s } = e2, { clamp: r, correctFloat: o, defined: n, destroyObjectProperties: a, extend: h, fireEvent: l, isNumber: d, merge: c, objectEach: p, pick: u } = i2;
        return class {
          constructor(t3, e3, i3, s2, r2) {
            this.isNew = true, this.isNewLabel = true, this.axis = t3, this.pos = e3, this.type = i3 || "", this.parameters = r2 || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, l(this, "init"), i3 || s2 || this.addLabel();
          }
          addLabel() {
            let e3 = this, i3 = e3.axis, s2 = i3.options, r2 = i3.chart, a2 = i3.categories, c2 = i3.logarithmic, p2 = i3.names, g = e3.pos, f = u(e3.options && e3.options.labels, s2.labels), m = i3.tickPositions, x = g === m[0], y = g === m[m.length - 1], b = (!f.step || 1 === f.step) && 1 === i3.tickInterval, v = m.info, S = e3.label, C, k, M, w = this.parameters.category || (a2 ? u(a2[g], p2[g], g) : g);
            c2 && d(w) && (w = o(c2.lin2log(w))), i3.dateTime && (v ? C = (k = r2.time.resolveDTLFormat(s2.dateTimeLabelFormats[!s2.grid && v.higherRanks[g] || v.unitName])).main : d(w) && (C = i3.dateTime.getXDateFormat(w, s2.dateTimeLabelFormats || {}))), e3.isFirst = x, e3.isLast = y;
            let T = { axis: i3, chart: r2, dateTimeLabelFormat: C, isFirst: x, isLast: y, pos: g, tick: e3, tickPositionInfo: v, value: w };
            l(this, "labelFormat", T);
            let A = (e4) => f.formatter ? f.formatter.call(e4, e4) : f.format ? (e4.text = i3.defaultLabelFormatter.call(e4), t2.format(f.format, e4, r2)) : i3.defaultLabelFormatter.call(e4), P = A.call(T, T), L = k && k.list;
            L ? e3.shortenLabel = function() {
              for (M = 0; M < L.length; M++) if (h(T, { dateTimeLabelFormat: L[M] }), S.attr({ text: A.call(T, T) }), S.getBBox().width < i3.getSlotWidth(e3) - 2 * (f.padding || 0)) return;
              S.attr({ text: "" });
            } : e3.shortenLabel = void 0, b && i3._addedPlotLB && e3.moveLabel(P, f), n(S) || e3.movedLabel ? S && S.textStr !== P && !b && (!S.textWidth || f.style.width || S.styles.width || S.css({ width: null }), S.attr({ text: P }), S.textPxLength = S.getBBox().width) : (e3.label = S = e3.createLabel(P, f), e3.rotation = 0);
          }
          createLabel(t3, e3, i3) {
            let s2 = this.axis, r2 = s2.chart, o2 = n(t3) && e3.enabled ? r2.renderer.text(t3, i3 == null ? void 0 : i3.x, i3 == null ? void 0 : i3.y, e3.useHTML).add(s2.labelGroup) : void 0;
            return o2 && (r2.styledMode || o2.css(c(e3.style)), o2.textPxLength = o2.getBBox().width), o2;
          }
          destroy() {
            a(this, this.axis);
          }
          getPosition(t3, e3, i3, s2) {
            let n2 = this.axis, a2 = n2.chart, h2 = s2 && a2.oldChartHeight || a2.chartHeight, d2 = { x: t3 ? o(n2.translate(e3 + i3, void 0, void 0, s2) + n2.transB) : n2.left + n2.offset + (n2.opposite ? (s2 && a2.oldChartWidth || a2.chartWidth) - n2.right - n2.left : 0), y: t3 ? h2 - n2.bottom + n2.offset - (n2.opposite ? n2.height : 0) : o(h2 - n2.translate(e3 + i3, void 0, void 0, s2) - n2.transB) };
            return d2.y = r(d2.y, -1e9, 1e9), l(this, "afterGetPosition", { pos: d2 }), d2;
          }
          getLabelPosition(t3, e3, i3, r2, o2, a2, h2, d2) {
            let c2, p2;
            let g = this.axis, f = g.transA, m = g.isLinked && g.linkedParent ? g.linkedParent.reversed : g.reversed, x = g.staggerLines, y = g.tickRotCorr || { x: 0, y: 0 }, b = r2 || g.reserveSpaceDefault ? 0 : -g.labelOffset * ("center" === g.labelAlign ? 0.5 : 1), v = o2.distance, S = {};
            return c2 = 0 === g.side ? i3.rotation ? -v : -i3.getBBox().height : 2 === g.side ? y.y + v : Math.cos(i3.rotation * s) * (y.y - i3.getBBox(false, 0).height / 2), n(o2.y) && (c2 = 0 === g.side && g.horiz ? o2.y + c2 : o2.y), t3 = t3 + u(o2.x, [0, 1, 0, -1][g.side] * v) + b + y.x - (a2 && r2 ? a2 * f * (m ? -1 : 1) : 0), e3 = e3 + c2 - (a2 && !r2 ? a2 * f * (m ? 1 : -1) : 0), x && (p2 = h2 / (d2 || 1) % x, g.opposite && (p2 = x - p2 - 1), e3 += p2 * (g.labelOffset / x)), S.x = t3, S.y = Math.round(e3), l(this, "afterGetLabelPosition", { pos: S, tickmarkOffset: a2, index: h2 }), S;
          }
          getLabelSize() {
            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
          }
          getMarkPath(t3, e3, i3, s2, r2 = false, o2) {
            return o2.crispLine([["M", t3, e3], ["L", t3 + (r2 ? 0 : -i3), e3 + (r2 ? i3 : 0)]], s2);
          }
          handleOverflow(t3) {
            let e3 = this.axis, i3 = e3.options.labels, r2 = t3.x, o2 = e3.chart.chartWidth, n2 = e3.chart.spacing, a2 = u(e3.labelLeft, Math.min(e3.pos, n2[3])), h2 = u(e3.labelRight, Math.max(e3.isRadial ? 0 : e3.pos + e3.len, o2 - n2[1])), l2 = this.label, d2 = this.rotation, c2 = { left: 0, center: 0.5, right: 1 }[e3.labelAlign || l2.attr("align")], p2 = l2.getBBox().width, g = e3.getSlotWidth(this), f = {}, m = g, x = 1, y, b, v;
            d2 || "justify" !== i3.overflow ? d2 < 0 && r2 - c2 * p2 < a2 ? v = Math.round(r2 / Math.cos(d2 * s) - a2) : d2 > 0 && r2 + c2 * p2 > h2 && (v = Math.round((o2 - r2) / Math.cos(d2 * s))) : (y = r2 - c2 * p2, b = r2 + (1 - c2) * p2, y < a2 ? m = t3.x + m * (1 - c2) - a2 : b > h2 && (m = h2 - t3.x + m * c2, x = -1), (m = Math.min(g, m)) < g && "center" === e3.labelAlign && (t3.x += x * (g - m - c2 * (g - Math.min(p2, m)))), (p2 > m || e3.autoRotation && (l2.styles || {}).width) && (v = m)), v && (this.shortenLabel ? this.shortenLabel() : (f.width = Math.floor(v) + "px", (i3.style || {}).textOverflow || (f.textOverflow = "ellipsis"), l2.css(f)));
          }
          moveLabel(t3, e3) {
            let i3 = this, s2 = i3.label, r2 = i3.axis, o2 = false, n2;
            s2 && s2.textStr === t3 ? (i3.movedLabel = s2, o2 = true, delete i3.label) : p(r2.ticks, function(e4) {
              o2 || e4.isNew || e4 === i3 || !e4.label || e4.label.textStr !== t3 || (i3.movedLabel = e4.label, o2 = true, e4.labelPos = i3.movedLabel.xy, delete e4.label);
            }), !o2 && (i3.labelPos || s2) && (n2 = i3.labelPos || s2.xy, i3.movedLabel = i3.createLabel(t3, e3, n2), i3.movedLabel && i3.movedLabel.attr({ opacity: 0 }));
          }
          render(t3, e3, i3) {
            let s2 = this.axis, r2 = s2.horiz, n2 = this.pos, a2 = u(this.tickmarkOffset, s2.tickmarkOffset), h2 = this.getPosition(r2, n2, a2, e3), d2 = h2.x, c2 = h2.y, p2 = s2.pos, g = p2 + s2.len, f = r2 ? d2 : c2;
            !s2.chart.polar && this.isNew && (o(f) < p2 || f > g) && (i3 = 0);
            let m = u(i3, this.label && this.label.newOpacity, 1);
            i3 = u(i3, 1), this.isActive = true, this.renderGridLine(e3, i3), this.renderMark(h2, i3), this.renderLabel(h2, e3, m, t3), this.isNew = false, l(this, "afterRender");
          }
          renderGridLine(t3, e3) {
            let i3 = this.axis, s2 = i3.options, r2 = {}, o2 = this.pos, n2 = this.type, a2 = u(this.tickmarkOffset, i3.tickmarkOffset), h2 = i3.chart.renderer, l2 = this.gridLine, d2, c2 = s2.gridLineWidth, p2 = s2.gridLineColor, g = s2.gridLineDashStyle;
            "minor" === this.type && (c2 = s2.minorGridLineWidth, p2 = s2.minorGridLineColor, g = s2.minorGridLineDashStyle), l2 || (i3.chart.styledMode || (r2.stroke = p2, r2["stroke-width"] = c2 || 0, r2.dashstyle = g), n2 || (r2.zIndex = 1), t3 && (e3 = 0), this.gridLine = l2 = h2.path().attr(r2).addClass("highcharts-" + (n2 ? n2 + "-" : "") + "grid-line").add(i3.gridGroup)), l2 && (d2 = i3.getPlotLinePath({ value: o2 + a2, lineWidth: l2.strokeWidth(), force: "pass", old: t3, acrossPanes: false })) && l2[t3 || this.isNew ? "attr" : "animate"]({ d: d2, opacity: e3 });
          }
          renderMark(t3, e3) {
            let i3 = this.axis, s2 = i3.options, r2 = i3.chart.renderer, o2 = this.type, n2 = i3.tickSize(o2 ? o2 + "Tick" : "tick"), a2 = t3.x, h2 = t3.y, l2 = u(s2["minor" !== o2 ? "tickWidth" : "minorTickWidth"], !o2 && i3.isXAxis ? 1 : 0), d2 = s2["minor" !== o2 ? "tickColor" : "minorTickColor"], c2 = this.mark, p2 = !c2;
            n2 && (i3.opposite && (n2[0] = -n2[0]), c2 || (this.mark = c2 = r2.path().addClass("highcharts-" + (o2 ? o2 + "-" : "") + "tick").add(i3.axisGroup), i3.chart.styledMode || c2.attr({ stroke: d2, "stroke-width": l2 })), c2[p2 ? "attr" : "animate"]({ d: this.getMarkPath(a2, h2, n2[0], c2.strokeWidth(), i3.horiz, r2), opacity: e3 }));
          }
          renderLabel(t3, e3, i3, s2) {
            let r2 = this.axis, o2 = r2.horiz, n2 = r2.options, a2 = this.label, h2 = n2.labels, l2 = h2.step, c2 = u(this.tickmarkOffset, r2.tickmarkOffset), p2 = t3.x, g = t3.y, f = true;
            a2 && d(p2) && (a2.xy = t3 = this.getLabelPosition(p2, g, a2, o2, h2, c2, s2, l2), (!this.isFirst || this.isLast || n2.showFirstLabel) && (!this.isLast || this.isFirst || n2.showLastLabel) ? !o2 || h2.step || h2.rotation || e3 || 0 === i3 || this.handleOverflow(t3) : f = false, l2 && s2 % l2 && (f = false), f && d(t3.y) ? (t3.opacity = i3, a2[this.isNewLabel ? "attr" : "animate"](t3).show(true), this.isNewLabel = false) : (a2.hide(), this.isNewLabel = true));
          }
          replaceMovedLabel() {
            let t3 = this.label, e3 = this.axis;
            t3 && !this.isNew && (t3.animate({ opacity: 0 }, void 0, t3.destroy), delete this.label), e3.isDirty = true, this.label = this.movedLabel, delete this.movedLabel;
          }
        };
      }), i(e, "Core/Axis/Axis.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Axis/AxisDefaults.js"], e["Core/Color/Color.js"], e["Core/Defaults.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Axis/Tick.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o, n, a) {
        let { animObject: h } = t2, { xAxis: l, yAxis: d } = e2, { defaultOptions: c } = s, { registerEventOptions: p } = r, { deg2rad: u } = o, { arrayMax: g, arrayMin: f, clamp: m, correctFloat: x, defined: y, destroyObjectProperties: b, erase: v, error: S, extend: C, fireEvent: k, getClosestDistance: M, insertItem: w, isArray: T, isNumber: A, isString: P, merge: L, normalizeTickInterval: O, objectEach: D, pick: E, relativeLength: I, removeEvent: j, splat: B, syncTimeout: R } = a, z = (t3, e3) => O(e3, void 0, void 0, E(t3.options.allowDecimals, e3 < 0.5 || void 0 !== t3.tickAmount), !!t3.tickAmount);
        C(c, { xAxis: l, yAxis: L(l, d) });
        class N {
          constructor(t3, e3, i3) {
            this.init(t3, e3, i3);
          }
          init(t3, e3, i3 = this.coll) {
            let s2 = "xAxis" === i3, r2 = this.isZAxis || (t3.inverted ? !s2 : s2);
            this.chart = t3, this.horiz = r2, this.isXAxis = s2, this.coll = i3, k(this, "init", { userOptions: e3 }), this.opposite = E(e3.opposite, this.opposite), this.side = E(e3.side, this.side, r2 ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(e3);
            let o2 = this.options, n2 = o2.labels;
            this.type ?? (this.type = o2.type || "linear"), this.uniqueNames ?? (this.uniqueNames = o2.uniqueNames ?? true), k(this, "afterSetType"), this.userOptions = e3, this.minPixelPadding = 0, this.reversed = E(o2.reversed, this.reversed), this.visible = o2.visible, this.zoomEnabled = o2.zoomEnabled, this.hasNames = "category" === this.type || true === o2.categories, this.categories = T(o2.categories) && o2.categories || (this.hasNames ? [] : void 0), this.names || (this.names = [], this.names.keys = {}), this.plotLinesAndBandsGroups = {}, this.positiveValuesOnly = !!this.logarithmic, this.isLinked = y(o2.linkedTo), this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len ?? (this.len = 0), this.minRange = this.userMinRange = o2.minRange || o2.maxZoom, this.range = o2.range, this.offset = o2.offset || 0, this.max = void 0, this.min = void 0;
            let a2 = E(o2.crosshair, B(t3.options.tooltip.crosshairs)[s2 ? 0 : 1]);
            this.crosshair = true === a2 ? {} : a2, -1 === t3.axes.indexOf(this) && (s2 ? t3.axes.splice(t3.xAxis.length, 0, this) : t3.axes.push(this), w(this, t3[this.coll])), t3.orderItems(this.coll), this.series = this.series || [], t3.inverted && !this.isZAxis && s2 && !y(this.reversed) && (this.reversed = true), this.labelRotation = A(n2.rotation) ? n2.rotation : void 0, p(this, o2), k(this, "afterInit");
          }
          setOptions(t3) {
            let e3 = this.horiz ? { labels: { autoRotation: [-45], padding: 4 }, margin: 15 } : { labels: { padding: 1 }, title: { rotation: 90 * this.side } };
            this.options = L(e3, c[this.coll], t3), k(this, "afterSetOptions", { userOptions: t3 });
          }
          defaultLabelFormatter() {
            let t3 = this.axis, { numberFormatter: e3 } = this.chart, i3 = A(this.value) ? this.value : NaN, s2 = t3.chart.time, r2 = t3.categories, o2 = this.dateTimeLabelFormat, n2 = c.lang, a2 = n2.numericSymbols, h2 = n2.numericSymbolMagnitude || 1e3, l2 = t3.logarithmic ? Math.abs(i3) : t3.tickInterval, d2 = a2 && a2.length, p2, u2;
            if (r2) u2 = `${this.value}`;
            else if (o2) u2 = s2.dateFormat(o2, i3);
            else if (d2 && a2 && l2 >= 1e3) for (; d2-- && void 0 === u2; ) l2 >= (p2 = Math.pow(h2, d2 + 1)) && 10 * i3 % p2 == 0 && null !== a2[d2] && 0 !== i3 && (u2 = e3(i3 / p2, -1) + a2[d2]);
            return void 0 === u2 && (u2 = Math.abs(i3) >= 1e4 ? e3(i3, -1) : e3(i3, -1, void 0, "")), u2;
          }
          getSeriesExtremes() {
            let t3;
            let e3 = this;
            k(this, "getSeriesExtremes", null, function() {
              e3.hasVisibleSeries = false, e3.dataMin = e3.dataMax = e3.threshold = void 0, e3.softThreshold = !e3.isXAxis, e3.series.forEach((i3) => {
                if (i3.reserveSpace()) {
                  let s2 = i3.options, r2, o2 = s2.threshold, n2, a2;
                  if (e3.hasVisibleSeries = true, e3.positiveValuesOnly && 0 >= (o2 || 0) && (o2 = void 0), e3.isXAxis) (r2 = i3.xData) && r2.length && (r2 = e3.logarithmic ? r2.filter((t4) => t4 > 0) : r2, n2 = (t3 = i3.getXExtremes(r2)).min, a2 = t3.max, A(n2) || n2 instanceof Date || (r2 = r2.filter(A), n2 = (t3 = i3.getXExtremes(r2)).min, a2 = t3.max), r2.length && (e3.dataMin = Math.min(E(e3.dataMin, n2), n2), e3.dataMax = Math.max(E(e3.dataMax, a2), a2)));
                  else {
                    let t4 = i3.applyExtremes();
                    A(t4.dataMin) && (n2 = t4.dataMin, e3.dataMin = Math.min(E(e3.dataMin, n2), n2)), A(t4.dataMax) && (a2 = t4.dataMax, e3.dataMax = Math.max(E(e3.dataMax, a2), a2)), y(o2) && (e3.threshold = o2), (!s2.softThreshold || e3.positiveValuesOnly) && (e3.softThreshold = false);
                  }
                }
              });
            }), k(this, "afterGetSeriesExtremes");
          }
          translate(t3, e3, i3, s2, r2, o2) {
            var _a;
            let n2 = this.linkedParent || this, a2 = s2 && n2.old ? n2.old.min : n2.min;
            if (!A(a2)) return NaN;
            let h2 = n2.minPixelPadding, l2 = (n2.isOrdinal || ((_a = n2.brokenAxis) == null ? void 0 : _a.hasBreaks) || n2.logarithmic && r2) && n2.lin2val, d2 = 1, c2 = 0, p2 = s2 && n2.old ? n2.old.transA : n2.transA, u2 = 0;
            return p2 || (p2 = n2.transA), i3 && (d2 *= -1, c2 = n2.len), n2.reversed && (d2 *= -1, c2 -= d2 * (n2.sector || n2.len)), e3 ? (u2 = (t3 = t3 * d2 + c2 - h2) / p2 + a2, l2 && (u2 = n2.lin2val(u2))) : (l2 && (t3 = n2.val2lin(t3)), u2 = d2 * (t3 - a2) * p2 + c2 + d2 * h2 + (A(o2) ? p2 * o2 : 0), n2.isRadial || (u2 = x(u2))), u2;
          }
          toPixels(t3, e3) {
            return this.translate(t3, false, !this.horiz, void 0, true) + (e3 ? 0 : this.pos);
          }
          toValue(t3, e3) {
            return this.translate(t3 - (e3 ? 0 : this.pos), true, !this.horiz, void 0, true);
          }
          getPlotLinePath(t3) {
            let e3 = this, i3 = e3.chart, s2 = e3.left, r2 = e3.top, o2 = t3.old, n2 = t3.value, a2 = t3.lineWidth, h2 = o2 && i3.oldChartHeight || i3.chartHeight, l2 = o2 && i3.oldChartWidth || i3.chartWidth, d2 = e3.transB, c2 = t3.translatedValue, p2 = t3.force, u2, g2, f2, x2, y2;
            function b2(t4, e4, i4) {
              return "pass" !== p2 && (t4 < e4 || t4 > i4) && (p2 ? t4 = m(t4, e4, i4) : y2 = true), t4;
            }
            let v2 = { value: n2, lineWidth: a2, old: o2, force: p2, acrossPanes: t3.acrossPanes, translatedValue: c2 };
            return k(this, "getPlotLinePath", v2, function(t4) {
              u2 = f2 = (c2 = m(c2 = E(c2, e3.translate(n2, void 0, void 0, o2)), -1e9, 1e9)) + d2, g2 = x2 = h2 - c2 - d2, A(c2) ? e3.horiz ? (g2 = r2, x2 = h2 - e3.bottom + (e3.options.isInternal ? 0 : i3.scrollablePixelsY || 0), u2 = f2 = b2(u2, s2, s2 + e3.width)) : (u2 = s2, f2 = l2 - e3.right + (i3.scrollablePixelsX || 0), g2 = x2 = b2(g2, r2, r2 + e3.height)) : (y2 = true, p2 = false), t4.path = y2 && !p2 ? void 0 : i3.renderer.crispLine([["M", u2, g2], ["L", f2, x2]], a2 || 1);
            }), v2.path;
          }
          getLinearTickPositions(t3, e3, i3) {
            let s2, r2, o2;
            let n2 = x(Math.floor(e3 / t3) * t3), a2 = x(Math.ceil(i3 / t3) * t3), h2 = [];
            if (x(n2 + t3) === n2 && (o2 = 20), this.single) return [e3];
            for (s2 = n2; s2 <= a2 && (h2.push(s2), (s2 = x(s2 + t3, o2)) !== r2); ) r2 = s2;
            return h2;
          }
          getMinorTickInterval() {
            let { minorTicks: t3, minorTickInterval: e3 } = this.options;
            return true === t3 ? E(e3, "auto") : false !== t3 ? e3 : void 0;
          }
          getMinorTickPositions() {
            let t3 = this.options, e3 = this.tickPositions, i3 = this.minorTickInterval, s2 = this.pointRangePadding || 0, r2 = (this.min || 0) - s2, o2 = (this.max || 0) + s2, n2 = o2 - r2, a2 = [], h2;
            if (n2 && n2 / i3 < this.len / 3) {
              let s3 = this.logarithmic;
              if (s3) this.paddedTicks.forEach(function(t4, e4, r3) {
                e4 && a2.push.apply(a2, s3.getLogTickPositions(i3, r3[e4 - 1], r3[e4], true));
              });
              else if (this.dateTime && "auto" === this.getMinorTickInterval()) a2 = a2.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(i3), r2, o2, t3.startOfWeek));
              else for (h2 = r2 + (e3[0] - r2) % i3; h2 <= o2 && h2 !== a2[0]; h2 += i3) a2.push(h2);
            }
            return 0 !== a2.length && this.trimTicks(a2), a2;
          }
          adjustForMinRange() {
            let t3 = this.options, e3 = this.logarithmic, { max: i3, min: s2, minRange: r2 } = this, o2, n2, a2, h2;
            this.isXAxis && void 0 === r2 && !e3 && (r2 = y(t3.min) || y(t3.max) || y(t3.floor) || y(t3.ceiling) ? null : Math.min(5 * (M(this.series.map((t4) => {
              var _a;
              return (t4.xIncrement ? (_a = t4.xData) == null ? void 0 : _a.slice(0, 2) : t4.xData) || [];
            })) || 0), this.dataMax - this.dataMin)), A(i3) && A(s2) && A(r2) && i3 - s2 < r2 && (n2 = this.dataMax - this.dataMin >= r2, o2 = (r2 - i3 + s2) / 2, a2 = [s2 - o2, E(t3.min, s2 - o2)], n2 && (a2[2] = e3 ? e3.log2lin(this.dataMin) : this.dataMin), h2 = [(s2 = g(a2)) + r2, E(t3.max, s2 + r2)], n2 && (h2[2] = e3 ? e3.log2lin(this.dataMax) : this.dataMax), (i3 = f(h2)) - s2 < r2 && (a2[0] = i3 - r2, a2[1] = E(t3.min, i3 - r2), s2 = g(a2))), this.minRange = r2, this.min = s2, this.max = i3;
          }
          getClosest() {
            let t3, e3;
            if (this.categories) e3 = 1;
            else {
              let i3 = [];
              this.series.forEach(function(t4) {
                var _a;
                let s2 = t4.closestPointRange;
                ((_a = t4.xData) == null ? void 0 : _a.length) === 1 ? i3.push(t4.xData[0]) : !t4.noSharedTooltip && y(s2) && t4.reserveSpace() && (e3 = y(e3) ? Math.min(e3, s2) : s2);
              }), i3.length && (i3.sort((t4, e4) => t4 - e4), t3 = M([i3]));
            }
            return t3 && e3 ? Math.min(t3, e3) : t3 || e3;
          }
          nameToX(t3) {
            let e3 = T(this.options.categories), i3 = e3 ? this.categories : this.names, s2 = t3.options.x, r2;
            return t3.series.requireSorting = false, y(s2) || (s2 = this.uniqueNames && i3 ? e3 ? i3.indexOf(t3.name) : E(i3.keys[t3.name], -1) : t3.series.autoIncrement()), -1 === s2 ? !e3 && i3 && (r2 = i3.length) : r2 = s2, void 0 !== r2 ? (this.names[r2] = t3.name, this.names.keys[t3.name] = r2) : t3.x && (r2 = t3.x), r2;
          }
          updateNames() {
            let t3 = this, e3 = this.names;
            e3.length > 0 && (Object.keys(e3.keys).forEach(function(t4) {
              delete e3.keys[t4];
            }), e3.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach((e4) => {
              e4.xIncrement = null, (!e4.points || e4.isDirtyData) && (t3.max = Math.max(t3.max, e4.xData.length - 1), e4.processData(), e4.generatePoints()), e4.data.forEach(function(i3, s2) {
                let r2;
                (i3 == null ? void 0 : i3.options) && void 0 !== i3.name && void 0 !== (r2 = t3.nameToX(i3)) && r2 !== i3.x && (i3.x = r2, e4.xData[s2] = r2);
              });
            }));
          }
          setAxisTranslation() {
            let t3 = this, e3 = t3.max - t3.min, i3 = t3.linkedParent, s2 = !!t3.categories, r2 = t3.isXAxis, o2 = t3.axisPointRange || 0, n2, a2 = 0, h2 = 0, l2, d2 = t3.transA;
            (r2 || s2 || o2) && (n2 = t3.getClosest(), i3 ? (a2 = i3.minPointOffset, h2 = i3.pointRangePadding) : t3.series.forEach(function(e4) {
              let i4 = s2 ? 1 : r2 ? E(e4.options.pointRange, n2, 0) : t3.axisPointRange || 0, l3 = e4.options.pointPlacement;
              if (o2 = Math.max(o2, i4), !t3.single || s2) {
                let t4 = e4.is("xrange") ? !r2 : r2;
                a2 = Math.max(a2, t4 && P(l3) ? 0 : i4 / 2), h2 = Math.max(h2, t4 && "on" === l3 ? 0 : i4);
              }
            }), l2 = t3.ordinal && t3.ordinal.slope && n2 ? t3.ordinal.slope / n2 : 1, t3.minPointOffset = a2 *= l2, t3.pointRangePadding = h2 *= l2, t3.pointRange = Math.min(o2, t3.single && s2 ? 1 : e3), r2 && n2 && (t3.closestPointRange = n2)), t3.translationSlope = t3.transA = d2 = t3.staticScale || t3.len / (e3 + h2 || 1), t3.transB = t3.horiz ? t3.left : t3.bottom, t3.minPixelPadding = d2 * a2, k(this, "afterSetAxisTranslation");
          }
          minFromRange() {
            let { max: t3, min: e3 } = this;
            return A(t3) && A(e3) && t3 - e3 || void 0;
          }
          setTickInterval(t3) {
            var _a, _b, _c, _d;
            let { categories: e3, chart: i3, dataMax: s2, dataMin: r2, dateTime: o2, isXAxis: n2, logarithmic: a2, options: h2, softThreshold: l2 } = this, d2 = A(this.threshold) ? this.threshold : void 0, c2 = this.minRange || 0, { ceiling: p2, floor: u2, linkedTo: g2, softMax: f2, softMin: m2 } = h2, b2 = A(g2) && ((_a = i3[this.coll]) == null ? void 0 : _a[g2]), v2 = h2.tickPixelInterval, C2 = h2.maxPadding, M2 = h2.minPadding, w2 = 0, T2, P2 = A(h2.tickInterval) && h2.tickInterval >= 0 ? h2.tickInterval : void 0, L2, O2, D2, I2;
            if (o2 || e3 || b2 || this.getTickAmount(), D2 = E(this.userMin, h2.min), I2 = E(this.userMax, h2.max), b2 ? (this.linkedParent = b2, T2 = b2.getExtremes(), this.min = E(T2.min, T2.dataMin), this.max = E(T2.max, T2.dataMax), this.type !== b2.type && S(11, true, i3)) : (l2 && y(d2) && A(s2) && A(r2) && (r2 >= d2 ? (L2 = d2, M2 = 0) : s2 <= d2 && (O2 = d2, C2 = 0)), this.min = E(D2, L2, r2), this.max = E(I2, O2, s2)), A(this.max) && A(this.min) && (a2 && (this.positiveValuesOnly && !t3 && 0 >= Math.min(this.min, E(r2, this.min)) && S(10, true, i3), this.min = x(a2.log2lin(this.min), 16), this.max = x(a2.log2lin(this.max), 16)), this.range && A(r2) && (this.userMin = this.min = D2 = Math.max(r2, this.minFromRange() || 0), this.userMax = I2 = this.max, this.range = void 0)), k(this, "foundExtremes"), this.adjustForMinRange(), A(this.min) && A(this.max)) {
              if (!A(this.userMin) && A(m2) && m2 < this.min && (this.min = D2 = m2), !A(this.userMax) && A(f2) && f2 > this.max && (this.max = I2 = f2), e3 || this.axisPointRange || ((_b = this.stacking) == null ? void 0 : _b.usePercentage) || b2 || !(w2 = this.max - this.min) || (!y(D2) && M2 && (this.min -= w2 * M2), y(I2) || !C2 || (this.max += w2 * C2)), !A(this.userMin) && A(u2) && (this.min = Math.max(this.min, u2)), !A(this.userMax) && A(p2) && (this.max = Math.min(this.max, p2)), l2 && A(r2) && A(s2)) {
                let t4 = d2 || 0;
                !y(D2) && this.min < t4 && r2 >= t4 ? this.min = h2.minRange ? Math.min(t4, this.max - c2) : t4 : !y(I2) && this.max > t4 && s2 <= t4 && (this.max = h2.minRange ? Math.max(t4, this.min + c2) : t4);
              }
              !i3.polar && this.min > this.max && (y(h2.min) ? this.max = this.min : y(h2.max) && (this.min = this.max)), w2 = this.max - this.min;
            }
            if (this.min !== this.max && A(this.min) && A(this.max) ? b2 && !P2 && v2 === b2.options.tickPixelInterval ? this.tickInterval = P2 = b2.tickInterval : this.tickInterval = E(P2, this.tickAmount ? w2 / Math.max(this.tickAmount - 1, 1) : void 0, e3 ? 1 : w2 * v2 / Math.max(this.len, v2)) : this.tickInterval = 1, n2 && !t3) {
              let t4 = this.min !== ((_c = this.old) == null ? void 0 : _c.min) || this.max !== ((_d = this.old) == null ? void 0 : _d.max);
              this.series.forEach(function(e4) {
                var _a2;
                e4.forceCrop = (_a2 = e4.forceCropping) == null ? void 0 : _a2.call(e4), e4.processData(t4);
              }), k(this, "postProcessData", { hasExtremesChanged: t4 });
            }
            this.setAxisTranslation(), k(this, "initialAxisTranslation"), this.pointRange && !P2 && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
            let j2 = E(h2.minTickInterval, o2 && !this.series.some((t4) => t4.noSharedTooltip) ? this.closestPointRange : 0);
            !P2 && this.tickInterval < j2 && (this.tickInterval = j2), o2 || a2 || P2 || (this.tickInterval = z(this, this.tickInterval)), this.tickAmount || (this.tickInterval = this.unsquish()), this.setTickPositions();
          }
          setTickPositions() {
            var _a, _b;
            let t3 = this.options, e3 = t3.tickPositions, i3 = t3.tickPositioner, s2 = this.getMinorTickInterval(), r2 = !this.isPanning, o2 = r2 && t3.startOnTick, n2 = r2 && t3.endOnTick, a2 = [], h2;
            if (this.tickmarkOffset = this.categories && "between" === t3.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0, this.single = this.min === this.max && y(this.min) && !this.tickAmount && (this.min % 1 == 0 || false !== t3.allowDecimals), e3) a2 = e3.slice();
            else if (A(this.min) && A(this.max)) {
              if (!((_a = this.ordinal) == null ? void 0 : _a.positions) && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) a2 = [this.min, this.max], S(19, false, this.chart);
              else if (this.dateTime) a2 = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, t3.units), this.min, this.max, t3.startOfWeek, (_b = this.ordinal) == null ? void 0 : _b.positions, this.closestPointRange, true);
              else if (this.logarithmic) a2 = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
              else {
                let t4 = this.tickInterval, e4 = t4;
                for (; e4 <= 2 * t4; ) if (a2 = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && a2.length > this.tickAmount) this.tickInterval = z(this, e4 *= 1.1);
                else break;
              }
              a2.length > this.len && (a2 = [a2[0], a2[a2.length - 1]])[0] === a2[1] && (a2.length = 1), i3 && (this.tickPositions = a2, (h2 = i3.apply(this, [this.min, this.max])) && (a2 = h2));
            }
            this.tickPositions = a2, this.minorTickInterval = "auto" === s2 && this.tickInterval ? this.tickInterval / t3.minorTicksPerMajor : s2, this.paddedTicks = a2.slice(0), this.trimTicks(a2, o2, n2), !this.isLinked && A(this.min) && A(this.max) && (this.single && a2.length < 2 && !this.categories && !this.series.some((t4) => t4.is("heatmap") && "between" === t4.options.pointPlacement) && (this.min -= 0.5, this.max += 0.5), e3 || h2 || this.adjustTickAmount()), k(this, "afterSetTickPositions");
          }
          trimTicks(t3, e3, i3) {
            let s2 = t3[0], r2 = t3[t3.length - 1], o2 = !this.isOrdinal && this.minPointOffset || 0;
            if (k(this, "trimTicks"), !this.isLinked) {
              if (e3 && s2 !== -1 / 0) this.min = s2;
              else for (; this.min - o2 > t3[0]; ) t3.shift();
              if (i3) this.max = r2;
              else for (; this.max + o2 < t3[t3.length - 1]; ) t3.pop();
              0 === t3.length && y(s2) && !this.options.tickPositions && t3.push((r2 + s2) / 2);
            }
          }
          alignToOthers() {
            let t3;
            let e3 = this, i3 = e3.chart, s2 = [this], r2 = e3.options, o2 = i3.options.chart, n2 = "yAxis" === this.coll && o2.alignThresholds, a2 = [];
            if (e3.thresholdAlignment = void 0, (false !== o2.alignTicks && r2.alignTicks || n2) && false !== r2.startOnTick && false !== r2.endOnTick && !e3.logarithmic) {
              let r3 = (t4) => {
                let { horiz: e4, options: i4 } = t4;
                return [e4 ? i4.left : i4.top, i4.width, i4.height, i4.pane].join(",");
              }, o3 = r3(this);
              i3[this.coll].forEach(function(i4) {
                let { series: n3 } = i4;
                n3.length && n3.some((t4) => t4.visible) && i4 !== e3 && r3(i4) === o3 && (t3 = true, s2.push(i4));
              });
            }
            if (t3 && n2) {
              s2.forEach((t5) => {
                let i4 = t5.getThresholdAlignment(e3);
                A(i4) && a2.push(i4);
              });
              let t4 = a2.length > 1 ? a2.reduce((t5, e4) => t5 += e4, 0) / a2.length : void 0;
              s2.forEach((e4) => {
                e4.thresholdAlignment = t4;
              });
            }
            return t3;
          }
          getThresholdAlignment(t3) {
            if ((!A(this.dataMin) || this !== t3 && this.series.some((t4) => t4.isDirty || t4.isDirtyData)) && this.getSeriesExtremes(), A(this.threshold)) {
              let t4 = m((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1);
              return this.options.reversed && (t4 = 1 - t4), t4;
            }
          }
          getTickAmount() {
            let t3 = this.options, e3 = t3.tickPixelInterval, i3 = t3.tickAmount;
            y(t3.tickInterval) || i3 || !(this.len < e3) || this.isRadial || this.logarithmic || !t3.startOnTick || !t3.endOnTick || (i3 = 2), !i3 && this.alignToOthers() && (i3 = Math.ceil(this.len / e3) + 1), i3 < 4 && (this.finalTickAmt = i3, i3 = 5), this.tickAmount = i3;
          }
          adjustTickAmount() {
            let t3 = this, { finalTickAmt: e3, max: i3, min: s2, options: r2, tickPositions: o2, tickAmount: n2, thresholdAlignment: a2 } = t3, h2 = o2 == null ? void 0 : o2.length, l2 = E(t3.threshold, t3.softThreshold ? 0 : null), d2, c2, p2 = t3.tickInterval, u2, g2 = () => o2.push(x(o2[o2.length - 1] + p2)), f2 = () => o2.unshift(x(o2[0] - p2));
            if (A(a2) && (u2 = a2 < 0.5 ? Math.ceil(a2 * (n2 - 1)) : Math.floor(a2 * (n2 - 1)), r2.reversed && (u2 = n2 - 1 - u2)), t3.hasData() && A(s2) && A(i3)) {
              let a3 = () => {
                t3.transA *= (h2 - 1) / (n2 - 1), t3.min = r2.startOnTick ? o2[0] : Math.min(s2, o2[0]), t3.max = r2.endOnTick ? o2[o2.length - 1] : Math.max(i3, o2[o2.length - 1]);
              };
              if (A(u2) && A(t3.threshold)) {
                for (; o2[u2] !== l2 || o2.length !== n2 || o2[0] > s2 || o2[o2.length - 1] < i3; ) {
                  for (o2.length = 0, o2.push(t3.threshold); o2.length < n2; ) void 0 === o2[u2] || o2[u2] > t3.threshold ? f2() : g2();
                  if (p2 > 8 * t3.tickInterval) break;
                  p2 *= 2;
                }
                a3();
              } else if (h2 < n2) {
                for (; o2.length < n2; ) o2.length % 2 || s2 === l2 ? g2() : f2();
                a3();
              }
              if (y(e3)) {
                for (c2 = d2 = o2.length; c2--; ) (3 === e3 && c2 % 2 == 1 || e3 <= 2 && c2 > 0 && c2 < d2 - 1) && o2.splice(c2, 1);
                t3.finalTickAmt = void 0;
              }
            }
          }
          setScale() {
            var _a, _b;
            let { coll: t3, stacking: e3 } = this, i3 = false, s2 = false;
            this.series.forEach((t4) => {
              i3 = i3 || t4.isDirtyData || t4.isDirty, s2 = s2 || t4.xAxis && t4.xAxis.isDirty || false;
            }), this.setAxisSize();
            let r2 = this.len !== (this.old && this.old.len);
            r2 || i3 || s2 || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (e3 && "yAxis" === t3 && e3.buildStacks(), this.forceRedraw = false, this.userMinRange || (this.minRange = void 0), this.getSeriesExtremes(), this.setTickInterval(), e3 && "xAxis" === t3 && e3.buildStacks(), this.isDirty || (this.isDirty = r2 || this.min !== ((_a = this.old) == null ? void 0 : _a.min) || this.max !== ((_b = this.old) == null ? void 0 : _b.max))) : e3 && e3.cleanStacks(), i3 && delete this.allExtremes, k(this, "afterSetScale");
          }
          setExtremes(t3, e3, i3 = true, s2, r2) {
            this.series.forEach((t4) => {
              delete t4.kdTree;
            }), k(this, "setExtremes", r2 = C(r2, { min: t3, max: e3 }), (t4) => {
              this.userMin = t4.min, this.userMax = t4.max, this.eventArgs = t4, i3 && this.chart.redraw(s2);
            });
          }
          setAxisSize() {
            let t3 = this.chart, e3 = this.options, i3 = e3.offsets || [0, 0, 0, 0], s2 = this.horiz, r2 = this.width = Math.round(I(E(e3.width, t3.plotWidth - i3[3] + i3[1]), t3.plotWidth)), o2 = this.height = Math.round(I(E(e3.height, t3.plotHeight - i3[0] + i3[2]), t3.plotHeight)), n2 = this.top = Math.round(I(E(e3.top, t3.plotTop + i3[0]), t3.plotHeight, t3.plotTop)), a2 = this.left = Math.round(I(E(e3.left, t3.plotLeft + i3[3]), t3.plotWidth, t3.plotLeft));
            this.bottom = t3.chartHeight - o2 - n2, this.right = t3.chartWidth - r2 - a2, this.len = Math.max(s2 ? r2 : o2, 0), this.pos = s2 ? a2 : n2;
          }
          getExtremes() {
            let t3 = this.logarithmic;
            return { min: t3 ? x(t3.lin2log(this.min)) : this.min, max: t3 ? x(t3.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
          }
          getThreshold(t3) {
            let e3 = this.logarithmic, i3 = e3 ? e3.lin2log(this.min) : this.min, s2 = e3 ? e3.lin2log(this.max) : this.max;
            return null === t3 || t3 === -1 / 0 ? t3 = i3 : t3 === 1 / 0 ? t3 = s2 : i3 > t3 ? t3 = i3 : s2 < t3 && (t3 = s2), this.translate(t3, 0, 1, 0, 1);
          }
          autoLabelAlign(t3) {
            let e3 = (E(t3, 0) - 90 * this.side + 720) % 360, i3 = { align: "center" };
            return k(this, "autoLabelAlign", i3, function(t4) {
              e3 > 15 && e3 < 165 ? t4.align = "right" : e3 > 195 && e3 < 345 && (t4.align = "left");
            }), i3.align;
          }
          tickSize(t3) {
            let e3 = this.options, i3 = E(e3["tick" === t3 ? "tickWidth" : "minorTickWidth"], "tick" === t3 && this.isXAxis && !this.categories ? 1 : 0), s2 = e3["tick" === t3 ? "tickLength" : "minorTickLength"], r2;
            i3 && s2 && ("inside" === e3[t3 + "Position"] && (s2 = -s2), r2 = [s2, i3]);
            let o2 = { tickSize: r2 };
            return k(this, "afterTickSize", o2), o2.tickSize;
          }
          labelMetrics() {
            let t3 = this.chart.renderer, e3 = this.ticks, i3 = e3[Object.keys(e3)[0]] || {};
            return this.chart.renderer.fontMetrics(i3.label || i3.movedLabel || t3.box);
          }
          unsquish() {
            let t3 = this.options.labels, e3 = t3.padding || 0, i3 = this.horiz, s2 = this.tickInterval, r2 = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / s2), o2 = t3.rotation, n2 = x(0.8 * this.labelMetrics().h), a2 = Math.max(this.max - this.min, 0), h2 = function(t4) {
              let i4 = (t4 + 2 * e3) / (r2 || 1);
              return (i4 = i4 > 1 ? Math.ceil(i4) : 1) * s2 > a2 && t4 !== 1 / 0 && r2 !== 1 / 0 && a2 && (i4 = Math.ceil(a2 / s2)), x(i4 * s2);
            }, l2 = s2, d2, c2 = Number.MAX_VALUE, p2;
            if (i3) {
              if (!t3.staggerLines && (A(o2) ? p2 = [o2] : r2 < t3.autoRotationLimit && (p2 = t3.autoRotation)), p2) {
                let t4, e4;
                for (let i4 of p2) (i4 === o2 || i4 && i4 >= -90 && i4 <= 90) && (e4 = (t4 = h2(Math.abs(n2 / Math.sin(u * i4)))) + Math.abs(i4 / 360)) < c2 && (c2 = e4, d2 = i4, l2 = t4);
              }
            } else l2 = h2(0.75 * n2);
            return this.autoRotation = p2, this.labelRotation = E(d2, A(o2) ? o2 : 0), t3.step ? s2 : l2;
          }
          getSlotWidth(t3) {
            let e3 = this.chart, i3 = this.horiz, s2 = this.options.labels, r2 = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), o2 = e3.margin[3];
            if (t3 && A(t3.slotWidth)) return t3.slotWidth;
            if (i3 && s2.step < 2) return s2.rotation ? 0 : (this.staggerLines || 1) * this.len / r2;
            if (!i3) {
              let t4 = s2.style.width;
              if (void 0 !== t4) return parseInt(String(t4), 10);
              if (o2) return o2 - e3.spacing[3];
            }
            return 0.33 * e3.chartWidth;
          }
          renderUnsquish() {
            let t3 = this.chart, e3 = t3.renderer, i3 = this.tickPositions, s2 = this.ticks, r2 = this.options.labels, o2 = r2.style, n2 = this.horiz, a2 = this.getSlotWidth(), h2 = Math.max(1, Math.round(a2 - (n2 ? 2 * (r2.padding || 0) : r2.distance || 0))), l2 = {}, d2 = this.labelMetrics(), c2 = o2.textOverflow, p2, u2, g2 = 0, f2, m2;
            if (P(r2.rotation) || (l2.rotation = r2.rotation || 0), i3.forEach(function(t4) {
              let e4 = s2[t4];
              e4.movedLabel && e4.replaceMovedLabel(), e4 && e4.label && e4.label.textPxLength > g2 && (g2 = e4.label.textPxLength);
            }), this.maxLabelLength = g2, this.autoRotation) g2 > h2 && g2 > d2.h ? l2.rotation = this.labelRotation : this.labelRotation = 0;
            else if (a2 && (p2 = h2, !c2)) for (u2 = "clip", m2 = i3.length; !n2 && m2--; ) (f2 = s2[i3[m2]].label) && ("ellipsis" === f2.styles.textOverflow ? f2.css({ textOverflow: "clip" }) : f2.textPxLength > a2 && f2.css({ width: a2 + "px" }), f2.getBBox().height > this.len / i3.length - (d2.h - d2.f) && (f2.specificTextOverflow = "ellipsis"));
            l2.rotation && (p2 = g2 > 0.5 * t3.chartHeight ? 0.33 * t3.chartHeight : g2, c2 || (u2 = "ellipsis")), this.labelAlign = r2.align || this.autoLabelAlign(this.labelRotation), this.labelAlign && (l2.align = this.labelAlign), i3.forEach(function(t4) {
              let e4 = s2[t4], i4 = e4 && e4.label, r3 = o2.width, n3 = {};
              i4 && (i4.attr(l2), e4.shortenLabel ? e4.shortenLabel() : p2 && !r3 && "nowrap" !== o2.whiteSpace && (p2 < i4.textPxLength || "SPAN" === i4.element.tagName) ? (n3.width = p2 + "px", c2 || (n3.textOverflow = i4.specificTextOverflow || u2), i4.css(n3)) : !i4.styles.width || n3.width || r3 || i4.css({ width: null }), delete i4.specificTextOverflow, e4.rotation = l2.rotation);
            }, this), this.tickRotCorr = e3.rotCorr(d2.b, this.labelRotation || 0, 0 !== this.side);
          }
          hasData() {
            return this.series.some(function(t3) {
              return t3.hasData();
            }) || this.options.showEmpty && y(this.min) && y(this.max);
          }
          addTitle(t3) {
            let e3;
            let i3 = this.chart.renderer, s2 = this.horiz, r2 = this.opposite, o2 = this.options.title, n2 = this.chart.styledMode;
            this.axisTitle || ((e3 = o2.textAlign) || (e3 = (s2 ? { low: "left", middle: "center", high: "right" } : { low: r2 ? "right" : "left", middle: "center", high: r2 ? "left" : "right" })[o2.align]), this.axisTitle = i3.text(o2.text || "", 0, 0, o2.useHTML).attr({ zIndex: 7, rotation: o2.rotation || 0, align: e3 }).addClass("highcharts-axis-title"), n2 || this.axisTitle.css(L(o2.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = true), n2 || o2.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" }), this.axisTitle[t3 ? "show" : "hide"](t3);
          }
          generateTick(t3) {
            let e3 = this.ticks;
            e3[t3] ? e3[t3].addLabel() : e3[t3] = new n(this, t3);
          }
          createGroups() {
            let { axisParent: t3, chart: e3, coll: i3, options: s2 } = this, r2 = e3.renderer, o2 = (e4, o3, n2) => r2.g(e4).attr({ zIndex: n2 }).addClass(`highcharts-${i3.toLowerCase()}${o3} ` + (this.isRadial ? `highcharts-radial-axis${o3} ` : "") + (s2.className || "")).add(t3);
            this.axisGroup || (this.gridGroup = o2("grid", "-grid", s2.gridZIndex), this.axisGroup = o2("axis", "", s2.zIndex), this.labelGroup = o2("axis-labels", "-labels", s2.labels.zIndex));
          }
          getOffset() {
            let t3 = this, { chart: e3, horiz: i3, options: s2, side: r2, ticks: o2, tickPositions: n2, coll: a2 } = t3, h2 = e3.inverted && !t3.isZAxis ? [1, 0, 3, 2][r2] : r2, l2 = t3.hasData(), d2 = s2.title, c2 = s2.labels, p2 = A(s2.crossing), u2 = e3.axisOffset, g2 = e3.clipOffset, f2 = [-1, 1, 1, -1][r2], m2, x2 = 0, b2, v2 = 0, S2 = 0, C2, M2;
            if (t3.showAxis = m2 = l2 || s2.showEmpty, t3.staggerLines = t3.horiz && c2.staggerLines || void 0, t3.createGroups(), l2 || t3.isLinked ? (n2.forEach(function(e4) {
              t3.generateTick(e4);
            }), t3.renderUnsquish(), t3.reserveSpaceDefault = 0 === r2 || 2 === r2 || { 1: "left", 3: "right" }[r2] === t3.labelAlign, E(c2.reserveSpace, !p2 && null, "center" === t3.labelAlign || null, t3.reserveSpaceDefault) && n2.forEach(function(t4) {
              S2 = Math.max(o2[t4].getLabelSize(), S2);
            }), t3.staggerLines && (S2 *= t3.staggerLines), t3.labelOffset = S2 * (t3.opposite ? -1 : 1)) : D(o2, function(t4, e4) {
              t4.destroy(), delete o2[e4];
            }), (d2 == null ? void 0 : d2.text) && false !== d2.enabled && (t3.addTitle(m2), m2 && !p2 && false !== d2.reserveSpace && (t3.titleOffset = x2 = t3.axisTitle.getBBox()[i3 ? "height" : "width"], v2 = y(b2 = d2.offset) ? 0 : E(d2.margin, i3 ? 5 : 10))), t3.renderLine(), t3.offset = f2 * E(s2.offset, u2[r2] ? u2[r2] + (s2.margin || 0) : 0), t3.tickRotCorr = t3.tickRotCorr || { x: 0, y: 0 }, M2 = 0 === r2 ? -t3.labelMetrics().h : 2 === r2 ? t3.tickRotCorr.y : 0, C2 = Math.abs(S2) + v2, S2 && (C2 -= M2, C2 += f2 * (i3 ? E(c2.y, t3.tickRotCorr.y + f2 * c2.distance) : E(c2.x, f2 * c2.distance))), t3.axisTitleMargin = E(b2, C2), t3.getMaxLabelDimensions && (t3.maxLabelDimensions = t3.getMaxLabelDimensions(o2, n2)), "colorAxis" !== a2 && g2) {
              let e4 = this.tickSize("tick");
              u2[r2] = Math.max(u2[r2], (t3.axisTitleMargin || 0) + x2 + f2 * t3.offset, C2, n2 && n2.length && e4 ? e4[0] + f2 * t3.offset : 0);
              let i4 = !t3.axisLine || s2.offset ? 0 : t3.axisLine.strokeWidth() / 2;
              g2[h2] = Math.max(g2[h2], i4);
            }
            k(this, "afterGetOffset");
          }
          getLinePath(t3) {
            let e3 = this.chart, i3 = this.opposite, s2 = this.offset, r2 = this.horiz, o2 = this.left + (i3 ? this.width : 0) + s2, n2 = e3.chartHeight - this.bottom - (i3 ? this.height : 0) + s2;
            return i3 && (t3 *= -1), e3.renderer.crispLine([["M", r2 ? this.left : o2, r2 ? n2 : this.top], ["L", r2 ? e3.chartWidth - this.right : o2, r2 ? n2 : e3.chartHeight - this.bottom]], t3);
          }
          renderLine() {
            this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
          }
          getTitlePosition(t3) {
            let e3 = this.horiz, i3 = this.left, s2 = this.top, r2 = this.len, o2 = this.options.title, n2 = e3 ? i3 : s2, a2 = this.opposite, h2 = this.offset, l2 = o2.x, d2 = o2.y, c2 = this.chart.renderer.fontMetrics(t3), p2 = t3 ? Math.max(t3.getBBox(false, 0).height - c2.h - 1, 0) : 0, u2 = { low: n2 + (e3 ? 0 : r2), middle: n2 + r2 / 2, high: n2 + (e3 ? r2 : 0) }[o2.align], g2 = (e3 ? s2 + this.height : i3) + (e3 ? 1 : -1) * (a2 ? -1 : 1) * (this.axisTitleMargin || 0) + [-p2, p2, c2.f, -p2][this.side], f2 = { x: e3 ? u2 + l2 : g2 + (a2 ? this.width : 0) + h2 + l2, y: e3 ? g2 + d2 - (a2 ? this.height : 0) + h2 : u2 + d2 };
            return k(this, "afterGetTitlePosition", { titlePosition: f2 }), f2;
          }
          renderMinorTick(t3, e3) {
            let i3 = this.minorTicks;
            i3[t3] || (i3[t3] = new n(this, t3, "minor")), e3 && i3[t3].isNew && i3[t3].render(null, true), i3[t3].render(null, false, 1);
          }
          renderTick(t3, e3, i3) {
            let s2 = this.isLinked, r2 = this.ticks;
            (!s2 || t3 >= this.min && t3 <= this.max || this.grid && this.grid.isColumn) && (r2[t3] || (r2[t3] = new n(this, t3)), i3 && r2[t3].isNew && r2[t3].render(e3, true, -1), r2[t3].render(e3));
          }
          render() {
            let t3, e3;
            let i3 = this, s2 = i3.chart, r2 = i3.logarithmic, a2 = s2.renderer, l2 = i3.options, d2 = i3.isLinked, c2 = i3.tickPositions, p2 = i3.axisTitle, u2 = i3.ticks, g2 = i3.minorTicks, f2 = i3.alternateBands, m2 = l2.stackLabels, x2 = l2.alternateGridColor, y2 = l2.crossing, b2 = i3.tickmarkOffset, v2 = i3.axisLine, S2 = i3.showAxis, C2 = h(a2.globalAnimation);
            if (i3.labelEdge.length = 0, i3.overlap = false, [u2, g2, f2].forEach(function(t4) {
              D(t4, function(t5) {
                t5.isActive = false;
              });
            }), A(y2)) {
              let t4 = this.isXAxis ? s2.yAxis[0] : s2.xAxis[0], e4 = [1, -1, -1, 1][this.side];
              if (t4) {
                let s3 = t4.toPixels(y2, true);
                i3.horiz && (s3 = t4.len - s3), i3.offset = e4 * s3;
              }
            }
            if (i3.hasData() || d2) {
              let a3 = i3.chart.hasRendered && i3.old && A(i3.old.min);
              i3.minorTickInterval && !i3.categories && i3.getMinorTickPositions().forEach(function(t4) {
                i3.renderMinorTick(t4, a3);
              }), c2.length && (c2.forEach(function(t4, e4) {
                i3.renderTick(t4, e4, a3);
              }), b2 && (0 === i3.min || i3.single) && (u2[-1] || (u2[-1] = new n(i3, -1, null, true)), u2[-1].render(-1))), x2 && c2.forEach(function(n2, a4) {
                e3 = void 0 !== c2[a4 + 1] ? c2[a4 + 1] + b2 : i3.max - b2, a4 % 2 == 0 && n2 < i3.max && e3 <= i3.max + (s2.polar ? -b2 : b2) && (f2[n2] || (f2[n2] = new o.PlotLineOrBand(i3, {})), t3 = n2 + b2, f2[n2].options = { from: r2 ? r2.lin2log(t3) : t3, to: r2 ? r2.lin2log(e3) : e3, color: x2, className: "highcharts-alternate-grid" }, f2[n2].render(), f2[n2].isActive = true);
              }), i3._addedPlotLB || (i3._addedPlotLB = true, (l2.plotLines || []).concat(l2.plotBands || []).forEach(function(t4) {
                i3.addPlotBandOrLine(t4);
              }));
            }
            [u2, g2, f2].forEach(function(t4) {
              let e4 = [], i4 = C2.duration;
              D(t4, function(t5, i5) {
                t5.isActive || (t5.render(i5, false, 0), t5.isActive = false, e4.push(i5));
              }), R(function() {
                let i5 = e4.length;
                for (; i5--; ) t4[e4[i5]] && !t4[e4[i5]].isActive && (t4[e4[i5]].destroy(), delete t4[e4[i5]]);
              }, t4 !== f2 && s2.hasRendered && i4 ? i4 : 0);
            }), v2 && (v2[v2.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(v2.strokeWidth()) }), v2.isPlaced = true, v2[S2 ? "show" : "hide"](S2)), p2 && S2 && (p2[p2.isNew ? "attr" : "animate"](i3.getTitlePosition(p2)), p2.isNew = false), m2 && m2.enabled && i3.stacking && i3.stacking.renderStackTotals(), i3.old = { len: i3.len, max: i3.max, min: i3.min, transA: i3.transA, userMax: i3.userMax, userMin: i3.userMin }, i3.isDirty = false, k(this, "afterRender");
          }
          redraw() {
            this.visible && (this.render(), this.plotLinesAndBands.forEach(function(t3) {
              t3.render();
            })), this.series.forEach(function(t3) {
              t3.isDirty = true;
            });
          }
          getKeepProps() {
            return this.keepProps || N.keepProps;
          }
          destroy(t3) {
            let e3 = this, i3 = e3.plotLinesAndBands, s2 = this.eventOptions;
            if (k(this, "destroy", { keepEvents: t3 }), t3 || j(e3), [e3.ticks, e3.minorTicks, e3.alternateBands].forEach(function(t4) {
              b(t4);
            }), i3) {
              let t4 = i3.length;
              for (; t4--; ) i3[t4].destroy();
            }
            for (let t4 in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function(t5) {
              e3[t5] && (e3[t5] = e3[t5].destroy());
            }), e3.plotLinesAndBandsGroups) e3.plotLinesAndBandsGroups[t4] = e3.plotLinesAndBandsGroups[t4].destroy();
            D(e3, function(t4, i4) {
              -1 === e3.getKeepProps().indexOf(i4) && delete e3[i4];
            }), this.eventOptions = s2;
          }
          drawCrosshair(t3, e3) {
            let s2 = this.crosshair, r2 = E(s2 && s2.snap, true), o2 = this.chart, n2, a2, h2, l2 = this.cross, d2;
            if (k(this, "drawCrosshair", { e: t3, point: e3 }), t3 || (t3 = this.cross && this.cross.e), s2 && false !== (y(e3) || !r2)) {
              if (r2 ? y(e3) && (a2 = E("colorAxis" !== this.coll ? e3.crosshairPos : null, this.isXAxis ? e3.plotX : this.len - e3.plotY)) : a2 = t3 && (this.horiz ? t3.chartX - this.pos : this.len - t3.chartY + this.pos), y(a2) && (d2 = { value: e3 && (this.isXAxis ? e3.x : E(e3.stackY, e3.y)), translatedValue: a2 }, o2.polar && C(d2, { isCrosshair: true, chartX: t3 && t3.chartX, chartY: t3 && t3.chartY, point: e3 }), n2 = this.getPlotLinePath(d2) || null), !y(n2)) {
                this.hideCrosshair();
                return;
              }
              h2 = this.categories && !this.isRadial, l2 || (this.cross = l2 = o2.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h2 ? "category " : "thin ") + (s2.className || "")).attr({ zIndex: E(s2.zIndex, 2) }).add(), !o2.styledMode && (l2.attr({ stroke: s2.color || (h2 ? i2.parse("#ccd3ff").setOpacity(0.25).get() : "#cccccc"), "stroke-width": E(s2.width, 1) }).css({ "pointer-events": "none" }), s2.dashStyle && l2.attr({ dashstyle: s2.dashStyle }))), l2.show().attr({ d: n2 }), h2 && !s2.width && l2.attr({ "stroke-width": this.transA }), this.cross.e = t3;
            } else this.hideCrosshair();
            k(this, "afterDrawCrosshair", { e: t3, point: e3 });
          }
          hideCrosshair() {
            this.cross && this.cross.hide(), k(this, "afterHideCrosshair");
          }
          update(t3, e3) {
            let i3 = this.chart;
            t3 = L(this.userOptions, t3), this.destroy(true), this.init(i3, t3), i3.isDirtyBox = true, E(e3, true) && i3.redraw();
          }
          remove(t3) {
            let e3 = this.chart, i3 = this.coll, s2 = this.series, r2 = s2.length;
            for (; r2--; ) s2[r2] && s2[r2].remove(false);
            v(e3.axes, this), v(e3[i3] || [], this), e3.orderItems(i3), this.destroy(), e3.isDirtyBox = true, E(t3, true) && e3.redraw();
          }
          setTitle(t3, e3) {
            this.update({ title: t3 }, e3);
          }
          setCategories(t3, e3) {
            this.update({ categories: t3 }, e3);
          }
        }
        return N.keepProps = ["coll", "extKey", "hcEvents", "len", "names", "series", "userMax", "userMin"], N;
      }), i(e, "Core/Axis/DateTimeAxis.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { addEvent: i2, getMagnitude: s, normalizeTickInterval: r, timeUnits: o } = t2;
        return function(t3) {
          function e3() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
          }
          function n() {
            if ("datetime" !== this.type) {
              this.dateTime = void 0;
              return;
            }
            this.dateTime || (this.dateTime = new a(this));
          }
          t3.compose = function(t4) {
            return t4.keepProps.includes("dateTime") || (t4.keepProps.push("dateTime"), t4.prototype.getTimeTicks = e3, i2(t4, "afterSetType", n)), t4;
          };
          class a {
            constructor(t4) {
              this.axis = t4;
            }
            normalizeTimeTickInterval(t4, e4) {
              let i3 = e4 || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], n2 = i3[i3.length - 1], a2 = o[n2[0]], h = n2[1], l;
              for (l = 0; l < i3.length && (a2 = o[(n2 = i3[l])[0]], h = n2[1], !i3[l + 1] || !(t4 <= (a2 * h[h.length - 1] + o[i3[l + 1][0]]) / 2)); l++) ;
              a2 === o.year && t4 < 5 * a2 && (h = [1, 2, 5]);
              let d = r(t4 / a2, h, "year" === n2[0] ? Math.max(s(t4 / a2), 1) : 1);
              return { unitRange: a2, count: d, unitName: n2[0] };
            }
            getXDateFormat(t4, e4) {
              let { axis: i3 } = this, s2 = i3.chart.time;
              return i3.closestPointRange ? s2.getDateFormat(i3.closestPointRange, t4, i3.options.startOfWeek, e4) || s2.resolveDTLFormat(e4.year).main : s2.resolveDTLFormat(e4.day).main;
            }
          }
          t3.Additions = a;
        }(e2 || (e2 = {})), e2;
      }), i(e, "Core/Axis/LogarithmicAxis.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { addEvent: i2, normalizeTickInterval: s, pick: r } = t2;
        return function(t3) {
          function e3() {
            "logarithmic" !== this.type ? this.logarithmic = void 0 : this.logarithmic ?? (this.logarithmic = new n(this));
          }
          function o() {
            let t4 = this.logarithmic;
            t4 && (this.lin2val = function(e4) {
              return t4.lin2log(e4);
            }, this.val2lin = function(e4) {
              return t4.log2lin(e4);
            });
          }
          t3.compose = function(t4) {
            return t4.keepProps.includes("logarithmic") || (t4.keepProps.push("logarithmic"), i2(t4, "afterSetType", e3), i2(t4, "afterInit", o)), t4;
          };
          class n {
            constructor(t4) {
              this.axis = t4;
            }
            getLogTickPositions(t4, e4, i3, o2) {
              let n2 = this.axis, a = n2.len, h = n2.options, l = [];
              if (o2 || (this.minorAutoInterval = void 0), t4 >= 0.5) t4 = Math.round(t4), l = n2.getLinearTickPositions(t4, e4, i3);
              else if (t4 >= 0.08) {
                let s2, r2, n3, a2, h2, d, c;
                let p = Math.floor(e4);
                for (s2 = t4 > 0.3 ? [1, 2, 4] : t4 > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], r2 = p; r2 < i3 + 1 && !c; r2++) for (n3 = 0, a2 = s2.length; n3 < a2 && !c; n3++) (h2 = this.log2lin(this.lin2log(r2) * s2[n3])) > e4 && (!o2 || d <= i3) && void 0 !== d && l.push(d), d > i3 && (c = true), d = h2;
              } else {
                let d = this.lin2log(e4), c = this.lin2log(i3), p = o2 ? n2.getMinorTickInterval() : h.tickInterval, u = h.tickPixelInterval / (o2 ? 5 : 1), g = o2 ? a / n2.tickPositions.length : a;
                t4 = s(t4 = r("auto" === p ? null : p, this.minorAutoInterval, (c - d) * u / (g || 1))), l = n2.getLinearTickPositions(t4, d, c).map(this.log2lin), o2 || (this.minorAutoInterval = t4 / 5);
              }
              return o2 || (n2.tickInterval = t4), l;
            }
            lin2log(t4) {
              return Math.pow(10, t4);
            }
            log2lin(t4) {
              return Math.log(t4) / Math.LN10;
            }
          }
          t3.Additions = n;
        }(e2 || (e2 = {})), e2;
      }), i(e, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { erase: i2, extend: s, isNumber: r } = t2;
        return function(t3) {
          let e3;
          function o(t4) {
            return this.addPlotBandOrLine(t4, "plotBands");
          }
          function n(t4, i3) {
            let s2 = this.userOptions, r2 = new e3(this, t4);
            if (this.visible && (r2 = r2.render()), r2) {
              if (this._addedPlotLB || (this._addedPlotLB = true, (s2.plotLines || []).concat(s2.plotBands || []).forEach((t5) => {
                this.addPlotBandOrLine(t5);
              })), i3) {
                let e4 = s2[i3] || [];
                e4.push(t4), s2[i3] = e4;
              }
              this.plotLinesAndBands.push(r2);
            }
            return r2;
          }
          function a(t4) {
            return this.addPlotBandOrLine(t4, "plotLines");
          }
          function h(t4, e4, i3) {
            i3 = i3 || this.options;
            let s2 = this.getPlotLinePath({ value: e4, force: true, acrossPanes: i3.acrossPanes }), o2 = [], n2 = this.horiz, a2 = !r(this.min) || !r(this.max) || t4 < this.min && e4 < this.min || t4 > this.max && e4 > this.max, h2 = this.getPlotLinePath({ value: t4, force: true, acrossPanes: i3.acrossPanes }), l2, d2 = 1, c2;
            if (h2 && s2) for (a2 && (c2 = h2.toString() === s2.toString(), d2 = 0), l2 = 0; l2 < h2.length; l2 += 2) {
              let t5 = h2[l2], e5 = h2[l2 + 1], i4 = s2[l2], r2 = s2[l2 + 1];
              ("M" === t5[0] || "L" === t5[0]) && ("M" === e5[0] || "L" === e5[0]) && ("M" === i4[0] || "L" === i4[0]) && ("M" === r2[0] || "L" === r2[0]) && (n2 && i4[1] === t5[1] ? (i4[1] += d2, r2[1] += d2) : n2 || i4[2] !== t5[2] || (i4[2] += d2, r2[2] += d2), o2.push(["M", t5[1], t5[2]], ["L", e5[1], e5[2]], ["L", r2[1], r2[2]], ["L", i4[1], i4[2]], ["Z"])), o2.isFlat = c2;
            }
            return o2;
          }
          function l(t4) {
            this.removePlotBandOrLine(t4);
          }
          function d(t4) {
            let e4 = this.plotLinesAndBands, s2 = this.options, r2 = this.userOptions;
            if (e4) {
              let o2 = e4.length;
              for (; o2--; ) e4[o2].id === t4 && e4[o2].destroy();
              [s2.plotLines || [], r2.plotLines || [], s2.plotBands || [], r2.plotBands || []].forEach(function(e5) {
                for (o2 = e5.length; o2--; ) (e5[o2] || {}).id === t4 && i2(e5, e5[o2]);
              });
            }
          }
          function c(t4) {
            this.removePlotBandOrLine(t4);
          }
          t3.compose = function(t4, i3) {
            let r2 = i3.prototype;
            return r2.addPlotBand || (e3 = t4, s(r2, { addPlotBand: o, addPlotLine: a, addPlotBandOrLine: n, getPlotBandPath: h, removePlotBand: l, removePlotLine: c, removePlotBandOrLine: d })), i3;
          };
        }(e2 || (e2 = {})), e2;
      }), i(e, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [e["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { addEvent: i2, arrayMax: s, arrayMin: r, defined: o, destroyObjectProperties: n, erase: a, fireEvent: h, merge: l, objectEach: d, pick: c } = e2;
        class p {
          static compose(e3, s2) {
            return i2(e3, "afterInit", function() {
              this.labelCollectors.push(() => {
                var _a;
                let t3 = [];
                for (let e4 of this.axes) for (let { label: i3, options: s3 } of e4.plotLinesAndBands) i3 && !((_a = s3 == null ? void 0 : s3.label) == null ? void 0 : _a.allowOverlap) && t3.push(i3);
                return t3;
              });
            }), t2.compose(p, s2);
          }
          constructor(t3, e3) {
            this.axis = t3, this.options = e3, this.id = e3.id;
          }
          render() {
            h(this, "render");
            let { axis: t3, options: e3 } = this, { horiz: i3, logarithmic: s2 } = t3, { color: r2, events: n2, zIndex: a2 = 0 } = e3, p2 = {}, u = t3.chart.renderer, g = e3.to, f = e3.from, m = e3.value, x = e3.borderWidth, y = e3.label, { label: b, svgElem: v } = this, S = [], C, k = o(f) && o(g), M = o(m), w = !v, T = { class: "highcharts-plot-" + (k ? "band " : "line ") + (e3.className || "") }, A = k ? "bands" : "lines";
            if (!t3.chart.styledMode && (M ? (T.stroke = r2 || "#999999", T["stroke-width"] = c(e3.width, 1), e3.dashStyle && (T.dashstyle = e3.dashStyle)) : k && (T.fill = r2 || "#e6e9ff", x && (T.stroke = e3.borderColor, T["stroke-width"] = x))), p2.zIndex = a2, A += "-" + a2, (C = t3.plotLinesAndBandsGroups[A]) || (t3.plotLinesAndBandsGroups[A] = C = u.g("plot-" + A).attr(p2).add()), v || (this.svgElem = v = u.path().attr(T).add(C)), o(m)) S = t3.getPlotLinePath({ value: (s2 == null ? void 0 : s2.log2lin(m)) ?? m, lineWidth: v.strokeWidth(), acrossPanes: e3.acrossPanes });
            else {
              if (!(o(f) && o(g))) return;
              S = t3.getPlotBandPath((s2 == null ? void 0 : s2.log2lin(f)) ?? f, (s2 == null ? void 0 : s2.log2lin(g)) ?? g, e3);
            }
            return !this.eventsAdded && n2 && (d(n2, (t4, e4) => {
              v == null ? void 0 : v.on(e4, (t5) => {
                n2[e4].apply(this, [t5]);
              });
            }), this.eventsAdded = true), (w || !v.d) && (S == null ? void 0 : S.length) ? v.attr({ d: S }) : v && (S ? (v.show(), v.animate({ d: S })) : v.d && (v.hide(), b && (this.label = b = b.destroy()))), y && (o(y.text) || o(y.formatter)) && (S == null ? void 0 : S.length) && t3.width > 0 && t3.height > 0 && !S.isFlat ? (y = l({ align: i3 && k ? "center" : void 0, x: i3 ? !k && 4 : 10, verticalAlign: !i3 && k ? "middle" : void 0, y: i3 ? k ? 16 : 10 : k ? 6 : -4, rotation: i3 && !k ? 90 : 0, ...k ? { inside: true } : {} }, y), this.renderLabel(y, S, k, a2)) : b && b.hide(), this;
          }
          renderLabel(t3, e3, i3, n2) {
            var _a;
            let a2 = this.axis, h2 = a2.chart.renderer, d2 = t3.inside, c2 = this.label;
            c2 || (this.label = c2 = h2.text(this.getLabelText(t3), 0, 0, t3.useHTML).attr({ align: t3.textAlign || t3.align, rotation: t3.rotation, class: "highcharts-plot-" + (i3 ? "band" : "line") + "-label " + (t3.className || ""), zIndex: n2 }), a2.chart.styledMode || c2.css(l({ fontSize: "0.8em", textOverflow: i3 && !d2 ? "" : "ellipsis" }, t3.style)), c2.add());
            let p2 = e3.xBounds || [e3[0][1], e3[1][1], i3 ? e3[2][1] : e3[0][1]], u = e3.yBounds || [e3[0][2], e3[1][2], i3 ? e3[2][2] : e3[0][2]], g = r(p2), f = r(u), m = s(p2) - g;
            c2.align(t3, false, { x: g, y: f, width: m, height: s(u) - f }), (!c2.alignValue || "left" === c2.alignValue || o(d2)) && c2.css({ width: (((_a = t3.style) == null ? void 0 : _a.width) || (i3 && d2 ? m : 90 === c2.rotation ? a2.height - (c2.alignAttr.y - a2.top) : (t3.clip ? a2.width : a2.chart.chartWidth) - (c2.alignAttr.x - a2.left))) + "px" }), c2.show(true);
          }
          getLabelText(t3) {
            return o(t3.formatter) ? t3.formatter.call(this) : t3.text;
          }
          destroy() {
            a(this.axis.plotLinesAndBands, this), delete this.axis, n(this);
          }
        }
        return p;
      }), i(e, "Core/Tooltip.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Templating.js"], e["Core/Globals.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o) {
        var n;
        let { animObject: a } = t2, { format: h } = e2, { composed: l, doc: d, isSafari: c } = i2, { distribute: p } = s, { addEvent: u, clamp: g, css: f, discardElement: m, extend: x, fireEvent: y, isArray: b, isNumber: v, isString: S, merge: C, pick: k, pushUnique: M, splat: w, syncTimeout: T } = o;
        class A {
          constructor(t3, e3, i3) {
            this.allowShared = true, this.crosshairs = [], this.distance = 0, this.isHidden = true, this.isSticky = false, this.options = {}, this.outside = false, this.chart = t3, this.init(t3, e3), this.pointer = i3;
          }
          bodyFormatter(t3) {
            return t3.map(function(t4) {
              let e3 = t4.series.tooltipOptions;
              return (e3[(t4.point.formatPrefix || "point") + "Formatter"] || t4.point.tooltipFormatter).call(t4.point, e3[(t4.point.formatPrefix || "point") + "Format"] || "");
            });
          }
          cleanSplit(t3) {
            this.chart.series.forEach(function(e3) {
              let i3 = e3 && e3.tt;
              i3 && (!i3.isActive || t3 ? e3.tt = i3.destroy() : i3.isActive = false);
            });
          }
          defaultFormatter(t3) {
            let e3;
            let i3 = this.points || w(this);
            return (e3 = (e3 = [t3.tooltipFooterHeaderFormatter(i3[0])]).concat(t3.bodyFormatter(i3))).push(t3.tooltipFooterHeaderFormatter(i3[0], true)), e3;
          }
          destroy() {
            this.label && (this.label = this.label.destroy()), this.split && (this.cleanSplit(true), this.tt && (this.tt = this.tt.destroy())), this.renderer && (this.renderer = this.renderer.destroy(), m(this.container)), o.clearTimeout(this.hideTimer);
          }
          getAnchor(t3, e3) {
            let i3;
            let { chart: s2, pointer: r2 } = this, o2 = s2.inverted, n2 = s2.plotTop, a2 = s2.plotLeft;
            if ((t3 = w(t3))[0].series && t3[0].series.yAxis && !t3[0].series.yAxis.options.reversedStacks && (t3 = t3.slice().reverse()), this.followPointer && e3) void 0 === e3.chartX && (e3 = r2.normalize(e3)), i3 = [e3.chartX - a2, e3.chartY - n2];
            else if (t3[0].tooltipPos) i3 = t3[0].tooltipPos;
            else {
              let s3 = 0, r3 = 0;
              t3.forEach(function(t4) {
                let e4 = t4.pos(true);
                e4 && (s3 += e4[0], r3 += e4[1]);
              }), s3 /= t3.length, r3 /= t3.length, this.shared && t3.length > 1 && e3 && (o2 ? s3 = e3.chartX : r3 = e3.chartY), i3 = [s3 - a2, r3 - n2];
            }
            return i3.map(Math.round);
          }
          getClassName(t3, e3, i3) {
            let s2 = this.options, r2 = t3.series, o2 = r2.options;
            return [s2.className, "highcharts-label", i3 && "highcharts-tooltip-header", e3 ? "highcharts-tooltip-box" : "highcharts-tooltip", !i3 && "highcharts-color-" + k(t3.colorIndex, r2.colorIndex), o2 && o2.className].filter(S).join(" ");
          }
          getLabel({ anchorX: t3, anchorY: e3 } = { anchorX: 0, anchorY: 0 }) {
            let s2 = this, o2 = this.chart.styledMode, n2 = this.options, a2 = this.split && this.allowShared, h2 = this.container, l2 = this.chart.renderer;
            if (this.label) {
              let t4 = !this.label.hasClass("highcharts-label");
              (!a2 && t4 || a2 && !t4) && this.destroy();
            }
            if (!this.label) {
              if (this.outside) {
                let t4 = this.chart.options.chart.style, e4 = r.getRendererType();
                this.container = h2 = i2.doc.createElement("div"), h2.className = "highcharts-tooltip-container", f(h2, { position: "absolute", top: "1px", pointerEvents: "none", zIndex: Math.max(this.options.style.zIndex || 0, (t4 && t4.zIndex || 0) + 3) }), this.renderer = l2 = new e4(h2, 0, 0, t4, void 0, void 0, l2.styledMode);
              }
              if (a2 ? this.label = l2.g("tooltip") : (this.label = l2.label("", t3, e3, n2.shape, void 0, void 0, n2.useHTML, void 0, "tooltip").attr({ padding: n2.padding, r: n2.borderRadius }), o2 || this.label.attr({ fill: n2.backgroundColor, "stroke-width": n2.borderWidth || 0 }).css(n2.style).css({ pointerEvents: n2.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none") })), s2.outside) {
                let t4 = this.label;
                [t4.xSetter, t4.ySetter].forEach((e4, i3) => {
                  t4[i3 ? "ySetter" : "xSetter"] = (r2) => {
                    e4.call(t4, s2.distance), t4[i3 ? "y" : "x"] = r2, h2 && (h2.style[i3 ? "top" : "left"] = `${r2}px`);
                  };
                });
              }
              this.label.attr({ zIndex: 8 }).shadow(n2.shadow).add();
            }
            return h2 && !h2.parentElement && i2.doc.body.appendChild(h2), this.label;
          }
          getPlayingField() {
            let { body: t3, documentElement: e3 } = d, { chart: i3, distance: s2, outside: r2 } = this;
            return { width: r2 ? Math.max(t3.scrollWidth, e3.scrollWidth, t3.offsetWidth, e3.offsetWidth, e3.clientWidth) - 2 * s2 : i3.chartWidth, height: r2 ? Math.max(t3.scrollHeight, e3.scrollHeight, t3.offsetHeight, e3.offsetHeight, e3.clientHeight) : i3.chartHeight };
          }
          getPosition(t3, e3, i3) {
            var _a, _b;
            let { distance: s2, chart: r2, outside: o2, pointer: n2 } = this, { inverted: a2, plotLeft: h2, plotTop: l2, polar: d2 } = r2, { plotX: c2 = 0, plotY: p2 = 0 } = i3, u2 = {}, g2 = a2 && i3.h || 0, { height: f2, width: m2 } = this.getPlayingField(), x2 = n2.getChartPosition(), y2 = (t4) => t4 * x2.scaleX, b2 = (t4) => t4 * x2.scaleY, v2 = (i4) => {
              let n3 = "x" === i4;
              return [i4, n3 ? m2 : f2, n3 ? t3 : e3].concat(o2 ? [n3 ? y2(t3) : b2(e3), n3 ? x2.left - s2 + y2(c2 + h2) : x2.top - s2 + b2(p2 + l2), 0, n3 ? m2 : f2] : [n3 ? t3 : e3, n3 ? c2 + h2 : p2 + l2, n3 ? h2 : l2, n3 ? h2 + r2.plotWidth : l2 + r2.plotHeight]);
            }, S2 = v2("y"), C2 = v2("x"), M2, w2 = !!i3.negative;
            !d2 && ((_b = (_a = r2.hoverSeries) == null ? void 0 : _a.yAxis) == null ? void 0 : _b.reversed) && (w2 = !w2);
            let T2 = !this.followPointer && k(i3.ttBelow, !d2 && !a2 === w2), A2 = function(t4, e4, i4, r3, n3, a3, h3) {
              let l3 = o2 ? "y" === t4 ? b2(s2) : y2(s2) : s2, d3 = (i4 - r3) / 2, c3 = r3 < n3 - s2, p3 = n3 + s2 + r3 < e4, f3 = n3 - l3 - i4 + d3, m3 = n3 + l3 - d3;
              if (T2 && p3) u2[t4] = m3;
              else if (!T2 && c3) u2[t4] = f3;
              else if (c3) u2[t4] = Math.min(h3 - r3, f3 - g2 < 0 ? f3 : f3 - g2);
              else {
                if (!p3) return false;
                u2[t4] = Math.max(a3, m3 + g2 + i4 > e4 ? m3 : m3 + g2);
              }
            }, P = function(t4, e4, i4, r3, o3) {
              if (o3 < s2 || o3 > e4 - s2) return false;
              o3 < i4 / 2 ? u2[t4] = 1 : o3 > e4 - r3 / 2 ? u2[t4] = e4 - r3 - 2 : u2[t4] = o3 - i4 / 2;
            }, L = function(t4) {
              [S2, C2] = [C2, S2], M2 = t4;
            }, O = () => {
              false !== A2.apply(0, S2) ? false !== P.apply(0, C2) || M2 || (L(true), O()) : M2 ? u2.x = u2.y = 0 : (L(true), O());
            };
            return (a2 && !d2 || this.len > 1) && L(), O(), u2;
          }
          hide(t3) {
            let e3 = this;
            o.clearTimeout(this.hideTimer), t3 = k(t3, this.options.hideDelay), this.isHidden || (this.hideTimer = T(function() {
              let i3 = e3.getLabel();
              e3.getLabel().animate({ opacity: 0 }, { duration: t3 ? 150 : t3, complete: () => {
                i3.hide(), e3.container && e3.container.remove();
              } }), e3.isHidden = true;
            }, t3));
          }
          init(t3, e3) {
            this.chart = t3, this.options = e3, this.crosshairs = [], this.isHidden = true, this.split = e3.split && !t3.inverted && !t3.polar, this.shared = e3.shared || this.split, this.outside = k(e3.outside, !!(t3.scrollablePixelsX || t3.scrollablePixelsY));
          }
          shouldStickOnContact(t3) {
            return !!(!this.followPointer && this.options.stickOnContact && (!t3 || this.pointer.inClass(t3.target, "highcharts-tooltip")));
          }
          move(t3, e3, i3, s2) {
            let r2 = this, o2 = a(!r2.isHidden && r2.options.animation), n2 = r2.followPointer || (r2.len || 0) > 1, h2 = { x: t3, y: e3 };
            n2 || (h2.anchorX = i3, h2.anchorY = s2), o2.step = () => r2.drawTracker(), r2.getLabel().animate(h2, o2);
          }
          refresh(t3, e3) {
            let { chart: i3, options: s2, pointer: r2, shared: n2 } = this, a2 = w(t3), l2 = a2[0], d2 = [], c2 = s2.format, p2 = s2.formatter || this.defaultFormatter, u2 = i3.styledMode, f2 = {}, m2 = this.allowShared;
            if (!s2.enabled || !l2.series) return;
            o.clearTimeout(this.hideTimer), this.allowShared = !(!b(t3) && t3.series && t3.series.noSharedTooltip), m2 = m2 && !this.allowShared, this.followPointer = !this.split && l2.series.tooltipOptions.followPointer;
            let x2 = this.getAnchor(t3, e3), v2 = x2[0], C2 = x2[1];
            n2 && this.allowShared ? (r2.applyInactiveState(a2), a2.forEach(function(t4) {
              t4.setState("hover"), d2.push(t4.getLabelConfig());
            }), (f2 = l2.getLabelConfig()).points = d2) : f2 = l2.getLabelConfig(), this.len = d2.length;
            let M2 = S(c2) ? h(c2, f2, i3) : p2.call(f2, this), T2 = l2.series;
            if (this.distance = k(T2.tooltipOptions.distance, 16), false === M2) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(M2, a2);
              else {
                let t4 = v2, o2 = C2;
                if (e3 && r2.isDirectTouch && (t4 = e3.chartX - i3.plotLeft, o2 = e3.chartY - i3.plotTop), i3.polar || false === T2.options.clip || a2.some((e4) => r2.isDirectTouch || e4.series.shouldShowTooltip(t4, o2))) {
                  let t5 = this.getLabel(m2 && this.tt || {});
                  (!s2.style.width || u2) && t5.css({ width: (this.outside ? this.getPlayingField() : i3.spacingBox).width + "px" }), t5.attr({ class: this.getClassName(l2), text: M2 && M2.join ? M2.join("") : M2 }), this.outside && t5.attr({ x: g(t5.x || 0, 0, this.getPlayingField().width - (t5.width || 0)) }), u2 || t5.attr({ stroke: s2.borderColor || l2.color || T2.color || "#666666" }), this.updatePosition({ plotX: v2, plotY: C2, negative: l2.negative, ttBelow: l2.ttBelow, h: x2[2] || 0 });
                } else {
                  this.hide();
                  return;
                }
              }
              this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden = false;
            }
            y(this, "refresh");
          }
          renderSplit(t3, e3) {
            var _a;
            let i3 = this, { chart: s2, chart: { chartWidth: r2, chartHeight: o2, plotHeight: n2, plotLeft: a2, plotTop: h2, scrollablePixelsY: l2 = 0, scrollablePixelsX: u2, styledMode: f2 }, distance: m2, options: y2, options: { positioner: b2 }, pointer: v2 } = i3, { scrollLeft: C2 = 0, scrollTop: M2 = 0 } = ((_a = s2.scrollablePlotArea) == null ? void 0 : _a.scrollingContainer) || {}, w2 = i3.outside && "number" != typeof u2 ? d.documentElement.getBoundingClientRect() : { left: C2, right: C2 + r2, top: M2, bottom: M2 + o2 }, T2 = i3.getLabel(), A2 = this.renderer || s2.renderer, P = !!(s2.xAxis[0] && s2.xAxis[0].opposite), { left: L, top: O } = v2.getChartPosition(), D = h2 + M2, E = 0, I = n2 - l2;
            function j(t4, e4, s3, r3, o3 = true) {
              let n3, a3;
              return s3 ? (n3 = P ? 0 : I, a3 = g(t4 - r3 / 2, w2.left, w2.right - r3 - (i3.outside ? L : 0))) : (n3 = e4 - D, a3 = g(a3 = o3 ? t4 - r3 - m2 : t4 + m2, o3 ? a3 : w2.left, w2.right)), { x: a3, y: n3 };
            }
            S(t3) && (t3 = [false, t3]);
            let B = t3.slice(0, e3.length + 1).reduce(function(t4, s3, r3) {
              if (false !== s3 && "" !== s3) {
                let o3 = e3[r3 - 1] || { isHeader: true, plotX: e3[0].plotX, plotY: n2, series: {} }, l3 = o3.isHeader, d2 = l3 ? i3 : o3.series, c2 = d2.tt = function(t5, e4, s4) {
                  let r4 = t5, { isHeader: o4, series: n3 } = e4;
                  if (!r4) {
                    let t6 = { padding: y2.padding, r: y2.borderRadius };
                    f2 || (t6.fill = y2.backgroundColor, t6["stroke-width"] = y2.borderWidth ?? 1), r4 = A2.label("", 0, 0, y2[o4 ? "headerShape" : "shape"], void 0, void 0, y2.useHTML).addClass(i3.getClassName(e4, true, o4)).attr(t6).add(T2);
                  }
                  return r4.isActive = true, r4.attr({ text: s4 }), f2 || r4.css(y2.style).attr({ stroke: y2.borderColor || e4.color || n3.color || "#333333" }), r4;
                }(d2.tt, o3, s3.toString()), p2 = c2.getBBox(), u3 = p2.width + c2.strokeWidth();
                l3 && (E = p2.height, I += E, P && (D -= E));
                let { anchorX: x2, anchorY: v3 } = function(t5) {
                  let e4, i4;
                  let { isHeader: s4, plotX: r4 = 0, plotY: o4 = 0, series: l4 } = t5;
                  if (s4) e4 = Math.max(a2 + r4, a2), i4 = h2 + n2 / 2;
                  else {
                    let { xAxis: t6, yAxis: s5 } = l4;
                    e4 = t6.pos + g(r4, -m2, t6.len + m2), l4.shouldShowTooltip(0, s5.pos - h2 + o4, { ignoreX: true }) && (i4 = s5.pos + o4);
                  }
                  return { anchorX: e4 = g(e4, w2.left - m2, w2.right + m2), anchorY: i4 };
                }(o3);
                if ("number" == typeof v3) {
                  let e4 = p2.height + 1, s4 = b2 ? b2.call(i3, u3, e4, o3) : j(x2, v3, l3, u3);
                  t4.push({ align: b2 ? 0 : void 0, anchorX: x2, anchorY: v3, boxWidth: u3, point: o3, rank: k(s4.rank, l3 ? 1 : 0), size: e4, target: s4.y, tt: c2, x: s4.x });
                } else c2.isActive = false;
              }
              return t4;
            }, []);
            !b2 && B.some((t4) => {
              let { outside: e4 } = i3, s3 = (e4 ? L : 0) + t4.anchorX;
              return s3 < w2.left && s3 + t4.boxWidth < w2.right || s3 < L - w2.left + t4.boxWidth && w2.right - s3 > s3;
            }) && (B = B.map((t4) => {
              let { x: e4, y: i4 } = j(t4.anchorX, t4.anchorY, t4.point.isHeader, t4.boxWidth, false);
              return x(t4, { target: i4, x: e4 });
            })), i3.cleanSplit(), p(B, I);
            let R = { left: L, right: L };
            B.forEach(function(t4) {
              let { x: e4, boxWidth: s3, isHeader: r3 } = t4;
              !r3 && (i3.outside && L + e4 < R.left && (R.left = L + e4), !r3 && i3.outside && R.left + s3 > R.right && (R.right = L + e4));
            }), B.forEach(function(t4) {
              let { x: e4, anchorX: s3, anchorY: r3, pos: o3, point: { isHeader: n3 } } = t4, a3 = { visibility: void 0 === o3 ? "hidden" : "inherit", x: e4, y: (o3 || 0) + D, anchorX: s3, anchorY: r3 };
              if (i3.outside && e4 < s3) {
                let t5 = L - R.left;
                t5 > 0 && (n3 || (a3.x = e4 + t5, a3.anchorX = s3 + t5), n3 && (a3.x = (R.right - R.left) / 2, a3.anchorX = s3 + t5));
              }
              t4.tt.attr(a3);
            });
            let { container: z, outside: N, renderer: W } = i3;
            if (N && z && W) {
              let { width: t4, height: e4, x: i4, y: s3 } = T2.getBBox();
              W.setSize(t4 + i4, e4 + s3, false), z.style.left = R.left + "px", z.style.top = O + "px";
            }
            c && T2.attr({ opacity: 1 === T2.opacity ? 0.999 : 1 });
          }
          drawTracker() {
            if (!this.shouldStickOnContact()) {
              this.tracker && (this.tracker = this.tracker.destroy());
              return;
            }
            let t3 = this.chart, e3 = this.label, i3 = this.shared ? t3.hoverPoints : t3.hoverPoint;
            if (!e3 || !i3) return;
            let s2 = { x: 0, y: 0, width: 0, height: 0 }, r2 = this.getAnchor(i3), o2 = e3.getBBox();
            r2[0] += t3.plotLeft - (e3.translateX || 0), r2[1] += t3.plotTop - (e3.translateY || 0), s2.x = Math.min(0, r2[0]), s2.y = Math.min(0, r2[1]), s2.width = r2[0] < 0 ? Math.max(Math.abs(r2[0]), o2.width - r2[0]) : Math.max(Math.abs(r2[0]), o2.width), s2.height = r2[1] < 0 ? Math.max(Math.abs(r2[1]), o2.height - Math.abs(r2[1])) : Math.max(Math.abs(r2[1]), o2.height), this.tracker ? this.tracker.attr(s2) : (this.tracker = e3.renderer.rect(s2).addClass("highcharts-tracker").add(e3), t3.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
          }
          styledModeFormat(t3) {
            return t3.replace('style="font-size: 0.8em"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"');
          }
          tooltipFooterHeaderFormatter(t3, e3) {
            let i3 = t3.series, s2 = i3.tooltipOptions, r2 = i3.xAxis, o2 = r2 && r2.dateTime, n2 = { isFooter: e3, labelConfig: t3 }, a2 = s2.xDateFormat, l2 = s2[e3 ? "footerFormat" : "headerFormat"];
            return y(this, "headerFormatter", n2, function(e4) {
              o2 && !a2 && v(t3.key) && (a2 = o2.getXDateFormat(t3.key, s2.dateTimeLabelFormats)), o2 && a2 && (t3.point && t3.point.tooltipDateKeys || ["key"]).forEach(function(t4) {
                l2 = l2.replace("{point." + t4 + "}", "{point." + t4 + ":" + a2 + "}");
              }), i3.chart.styledMode && (l2 = this.styledModeFormat(l2)), e4.text = h(l2, { point: t3, series: i3 }, this.chart);
            }), n2.text;
          }
          update(t3) {
            this.destroy(), this.init(this.chart, C(true, this.options, t3));
          }
          updatePosition(t3) {
            let { chart: e3, container: i3, distance: s2, options: r2, pointer: o2, renderer: n2 } = this, { height: a2 = 0, width: h2 = 0 } = this.getLabel(), { left: l2, top: d2, scaleX: c2, scaleY: p2 } = o2.getChartPosition(), u2 = (r2.positioner || this.getPosition).call(this, h2, a2, t3), g2 = (t3.plotX || 0) + e3.plotLeft, m2 = (t3.plotY || 0) + e3.plotTop, x2;
            n2 && i3 && (r2.positioner && (u2.x += l2 - s2, u2.y += d2 - s2), x2 = (r2.borderWidth || 0) + 2 * s2 + 2, n2.setSize(h2 + x2, a2 + x2, false), (1 !== c2 || 1 !== p2) && (f(i3, { transform: `scale(${c2}, ${p2})` }), g2 *= c2, m2 *= p2), g2 += l2 - u2.x, m2 += d2 - u2.y), this.move(Math.round(u2.x), Math.round(u2.y || 0), g2, m2);
          }
        }
        return (n = A || (A = {})).compose = function(t3) {
          M(l, "Core.Tooltip") && u(t3, "afterInit", function() {
            let t4 = this.chart;
            t4.options.tooltip && (t4.tooltip = new n(t4, t4.options.tooltip, this));
          });
        }, A;
      }), i(e, "Core/Series/Point.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Animation/AnimationUtilities.js"], e["Core/Defaults.js"], e["Core/Templating.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r) {
        let { animObject: o } = e2, { defaultOptions: n } = i2, { format: a } = s, { addEvent: h, crisp: l, erase: d, extend: c, fireEvent: p, getNestedProperty: u, isArray: g, isFunction: f, isNumber: m, isObject: x, merge: y, pick: b, syncTimeout: v, removeEvent: S, uniqueKey: C } = r;
        class k {
          animateBeforeDestroy() {
            let t3 = this, e3 = { x: t3.startXPos, opacity: 0 }, i3 = t3.getGraphicalProps();
            i3.singular.forEach(function(i4) {
              t3[i4] = t3[i4].animate("dataLabel" === i4 ? { x: t3[i4].startXPos, y: t3[i4].startYPos, opacity: 0 } : e3);
            }), i3.plural.forEach(function(e4) {
              t3[e4].forEach(function(e5) {
                e5.element && e5.animate(c({ x: t3.startXPos }, e5.startYPos ? { x: e5.startXPos, y: e5.startYPos } : {}));
              });
            });
          }
          applyOptions(t3, e3) {
            let i3 = this.series, s2 = i3.options.pointValKey || i3.pointValKey;
            return c(this, t3 = k.prototype.optionsToObject.call(this, t3)), this.options = this.options ? c(this.options, t3) : t3, t3.group && delete this.group, t3.dataLabels && delete this.dataLabels, s2 && (this.y = k.prototype.getNestedProperty.call(this, s2)), this.selected && (this.state = "select"), "name" in this && void 0 === e3 && i3.xAxis && i3.xAxis.hasNames && (this.x = i3.xAxis.nameToX(this)), void 0 === this.x && i3 ? this.x = e3 ?? i3.autoIncrement() : m(t3.x) && i3.options.relativeXValue && (this.x = i3.autoIncrement(t3.x)), this.isNull = this.isValid && !this.isValid(), this.formatPrefix = this.isNull ? "null" : "point", this;
          }
          destroy() {
            if (!this.destroyed) {
              let t3 = this, e3 = t3.series, i3 = e3.chart, s2 = e3.options.dataSorting, r2 = i3.hoverPoints, n2 = o(t3.series.chart.renderer.globalAnimation), a2 = () => {
                for (let e4 in (t3.graphic || t3.graphics || t3.dataLabel || t3.dataLabels) && (S(t3), t3.destroyElements()), t3) delete t3[e4];
              };
              t3.legendItem && i3.legend.destroyItem(t3), r2 && (t3.setState(), d(r2, t3), r2.length || (i3.hoverPoints = null)), t3 === i3.hoverPoint && t3.onMouseOut(), s2 && s2.enabled ? (this.animateBeforeDestroy(), v(a2, n2.duration)) : a2(), i3.pointCount--;
            }
            this.destroyed = true;
          }
          destroyElements(t3) {
            let e3 = this, i3 = e3.getGraphicalProps(t3);
            i3.singular.forEach(function(t4) {
              e3[t4] = e3[t4].destroy();
            }), i3.plural.forEach(function(t4) {
              e3[t4].forEach(function(t5) {
                t5 && t5.element && t5.destroy();
              }), delete e3[t4];
            });
          }
          firePointEvent(t3, e3, i3) {
            let s2 = this, r2 = this.series.options;
            s2.manageEvent(t3), "click" === t3 && r2.allowPointSelect && (i3 = function(t4) {
              !s2.destroyed && s2.select && s2.select(null, t4.ctrlKey || t4.metaKey || t4.shiftKey);
            }), p(s2, t3, e3, i3);
          }
          getClassName() {
            return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
          }
          getGraphicalProps(t3) {
            let e3, i3;
            let s2 = this, r2 = [], o2 = { singular: [], plural: [] };
            for ((t3 = t3 || { graphic: 1, dataLabel: 1 }).graphic && r2.push("graphic", "connector"), t3.dataLabel && r2.push("dataLabel", "dataLabelPath", "dataLabelUpper"), i3 = r2.length; i3--; ) s2[e3 = r2[i3]] && o2.singular.push(e3);
            return ["graphic", "dataLabel"].forEach(function(e4) {
              let i4 = e4 + "s";
              t3[e4] && s2[i4] && o2.plural.push(i4);
            }), o2;
          }
          getLabelConfig() {
            return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
          }
          getNestedProperty(t3) {
            return t3 ? 0 === t3.indexOf("custom.") ? u(t3, this.options) : this[t3] : void 0;
          }
          getZone() {
            let t3 = this.series, e3 = t3.zones, i3 = t3.zoneAxis || "y", s2, r2 = 0;
            for (s2 = e3[0]; this[i3] >= s2.value; ) s2 = e3[++r2];
            return this.nonZonedColor || (this.nonZonedColor = this.color), s2 && s2.color && !this.options.color ? this.color = s2.color : this.color = this.nonZonedColor, s2;
          }
          hasNewShapeType() {
            return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
          }
          constructor(t3, e3, i3) {
            this.formatPrefix = "point", this.visible = true, this.series = t3, this.applyOptions(e3, i3), this.id ?? (this.id = C()), this.resolveColor(), t3.chart.pointCount++, p(this, "afterInit");
          }
          isValid() {
            return (m(this.x) || this.x instanceof Date) && m(this.y);
          }
          optionsToObject(t3) {
            let e3 = this.series, i3 = e3.options.keys, s2 = i3 || e3.pointArrayMap || ["y"], r2 = s2.length, o2 = {}, n2, a2 = 0, h2 = 0;
            if (m(t3) || null === t3) o2[s2[0]] = t3;
            else if (g(t3)) for (!i3 && t3.length > r2 && ("string" == (n2 = typeof t3[0]) ? o2.name = t3[0] : "number" === n2 && (o2.x = t3[0]), a2++); h2 < r2; ) i3 && void 0 === t3[a2] || (s2[h2].indexOf(".") > 0 ? k.prototype.setNestedProperty(o2, t3[a2], s2[h2]) : o2[s2[h2]] = t3[a2]), a2++, h2++;
            else "object" == typeof t3 && (o2 = t3, t3.dataLabels && (e3.hasDataLabels = () => true), t3.marker && (e3._hasPointMarkers = true));
            return o2;
          }
          pos(t3, e3 = this.plotY) {
            if (!this.destroyed) {
              let { plotX: i3, series: s2 } = this, { chart: r2, xAxis: o2, yAxis: n2 } = s2, a2 = 0, h2 = 0;
              if (m(i3) && m(e3)) return t3 && (a2 = o2 ? o2.pos : r2.plotLeft, h2 = n2 ? n2.pos : r2.plotTop), r2.inverted && o2 && n2 ? [n2.len - e3 + h2, o2.len - i3 + a2] : [i3 + a2, e3 + h2];
            }
          }
          resolveColor() {
            let t3 = this.series, e3 = t3.chart.options.chart, i3 = t3.chart.styledMode, s2, r2, o2 = e3.colorCount, n2;
            delete this.nonZonedColor, t3.options.colorByPoint ? (i3 || (s2 = (r2 = t3.options.colors || t3.chart.options.colors)[t3.colorCounter], o2 = r2.length), n2 = t3.colorCounter, t3.colorCounter++, t3.colorCounter === o2 && (t3.colorCounter = 0)) : (i3 || (s2 = t3.color), n2 = t3.colorIndex), this.colorIndex = b(this.options.colorIndex, n2), this.color = b(this.options.color, s2);
          }
          setNestedProperty(t3, e3, i3) {
            return i3.split(".").reduce(function(t4, i4, s2, r2) {
              let o2 = r2.length - 1 === s2;
              return t4[i4] = o2 ? e3 : x(t4[i4], true) ? t4[i4] : {}, t4[i4];
            }, t3), t3;
          }
          shouldDraw() {
            return !this.isNull;
          }
          tooltipFormatter(t3) {
            let e3 = this.series, i3 = e3.tooltipOptions, s2 = b(i3.valueDecimals, ""), r2 = i3.valuePrefix || "", o2 = i3.valueSuffix || "";
            return e3.chart.styledMode && (t3 = e3.chart.tooltip.styledModeFormat(t3)), (e3.pointArrayMap || ["y"]).forEach(function(e4) {
              e4 = "{point." + e4, (r2 || o2) && (t3 = t3.replace(RegExp(e4 + "}", "g"), r2 + e4 + "}" + o2)), t3 = t3.replace(RegExp(e4 + "}", "g"), e4 + ":,." + s2 + "f}");
            }), a(t3, { point: this, series: this.series }, e3.chart);
          }
          update(t3, e3, i3, s2) {
            let r2;
            let o2 = this, n2 = o2.series, a2 = o2.graphic, h2 = n2.chart, l2 = n2.options;
            function d2() {
              o2.applyOptions(t3);
              let s3 = a2 && o2.hasMockGraphic, d3 = null === o2.y ? !s3 : s3;
              a2 && d3 && (o2.graphic = a2.destroy(), delete o2.hasMockGraphic), x(t3, true) && (a2 && a2.element && t3 && t3.marker && void 0 !== t3.marker.symbol && (o2.graphic = a2.destroy()), (t3 == null ? void 0 : t3.dataLabels) && o2.dataLabel && (o2.dataLabel = o2.dataLabel.destroy())), r2 = o2.index, n2.updateParallelArrays(o2, r2), l2.data[r2] = x(l2.data[r2], true) || x(t3, true) ? o2.options : b(t3, l2.data[r2]), n2.isDirty = n2.isDirtyData = true, !n2.fixedBox && n2.hasCartesianSeries && (h2.isDirtyBox = true), "point" === l2.legendType && (h2.isDirtyLegend = true), e3 && h2.redraw(i3);
            }
            e3 = b(e3, true), false === s2 ? d2() : o2.firePointEvent("update", { options: t3 }, d2);
          }
          remove(t3, e3) {
            this.series.removePoint(this.series.data.indexOf(this), t3, e3);
          }
          select(t3, e3) {
            let i3 = this, s2 = i3.series, r2 = s2.chart;
            t3 = b(t3, !i3.selected), this.selectedStaging = t3, i3.firePointEvent(t3 ? "select" : "unselect", { accumulate: e3 }, function() {
              i3.selected = i3.options.selected = t3, s2.options.data[s2.data.indexOf(i3)] = i3.options, i3.setState(t3 && "select"), e3 || r2.getSelectedPoints().forEach(function(t4) {
                let e4 = t4.series;
                t4.selected && t4 !== i3 && (t4.selected = t4.options.selected = false, e4.options.data[e4.data.indexOf(t4)] = t4.options, t4.setState(r2.hoverPoints && e4.options.inactiveOtherPoints ? "inactive" : ""), t4.firePointEvent("unselect"));
              });
            }), delete this.selectedStaging;
          }
          onMouseOver(t3) {
            let { inverted: e3, pointer: i3 } = this.series.chart;
            i3 && (t3 = t3 ? i3.normalize(t3) : i3.getChartCoordinatesFromPoint(this, e3), i3.runPointActions(t3, this));
          }
          onMouseOut() {
            let t3 = this.series.chart;
            this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (t3.hoverPoints || []).forEach(function(t4) {
              t4.setState();
            }), t3.hoverPoints = t3.hoverPoint = null;
          }
          manageEvent(t3) {
            var _a, _b, _c, _d, _e, _f;
            let e3 = y(this.series.options.point, this.options), i3 = (_a = e3.events) == null ? void 0 : _a[t3];
            f(i3) && (!((_b = this.hcEvents) == null ? void 0 : _b[t3]) || ((_d = (_c = this.hcEvents) == null ? void 0 : _c[t3]) == null ? void 0 : _d.map((t4) => t4.fn).indexOf(i3)) === -1) ? ((_e = this.importedUserEvent) == null ? void 0 : _e.call(this), this.importedUserEvent = h(this, t3, i3)) : this.importedUserEvent && !i3 && ((_f = this.hcEvents) == null ? void 0 : _f[t3]) && (S(this, t3), delete this.hcEvents[t3], Object.keys(this.hcEvents) || delete this.importedUserEvent);
          }
          setState(e3, i3) {
            var _a;
            let s2 = this.series, r2 = this.state, o2 = s2.options.states[e3 || "normal"] || {}, a2 = n.plotOptions[s2.type].marker && s2.options.marker, h2 = a2 && false === a2.enabled, l2 = a2 && a2.states && a2.states[e3 || "normal"] || {}, d2 = false === l2.enabled, u2 = this.marker || {}, g2 = s2.chart, f2 = a2 && s2.markerAttribs, x2 = s2.halo, y2, v2, S2, C2 = s2.stateMarkerGraphic, k2;
            if ((e3 = e3 || "") === this.state && !i3 || this.selected && "select" !== e3 || false === o2.enabled || e3 && (d2 || h2 && false === l2.enabled) || e3 && u2.states && u2.states[e3] && false === u2.states[e3].enabled) return;
            if (this.state = e3, f2 && (y2 = s2.markerAttribs(this, e3)), this.graphic && !this.hasMockGraphic) {
              if (r2 && this.graphic.removeClass("highcharts-point-" + r2), e3 && this.graphic.addClass("highcharts-point-" + e3), !g2.styledMode) {
                v2 = s2.pointAttribs(this, e3), S2 = b(g2.options.chart.animation, o2.animation);
                let t3 = v2.opacity;
                s2.options.inactiveOtherPoints && m(t3) && (this.dataLabels || []).forEach(function(e4) {
                  e4 && !e4.hasClass("highcharts-data-label-hidden") && (e4.animate({ opacity: t3 }, S2), e4.connector && e4.connector.animate({ opacity: t3 }, S2));
                }), this.graphic.animate(v2, S2);
              }
              y2 && this.graphic.animate(y2, b(g2.options.chart.animation, l2.animation, a2.animation)), C2 && C2.hide();
            } else e3 && l2 && (k2 = u2.symbol || s2.symbol, C2 && C2.currentSymbol !== k2 && (C2 = C2.destroy()), y2 && (C2 ? C2[i3 ? "animate" : "attr"]({ x: y2.x, y: y2.y }) : k2 && (s2.stateMarkerGraphic = C2 = g2.renderer.symbol(k2, y2.x, y2.y, y2.width, y2.height).add(s2.markerGroup), C2.currentSymbol = k2)), !g2.styledMode && C2 && "inactive" !== this.state && C2.attr(s2.pointAttribs(this, e3))), C2 && (C2[e3 && this.isInside ? "show" : "hide"](), C2.element.point = this, C2.addClass(this.getClassName(), true));
            let M = o2.halo, w = this.graphic || C2, T = w && w.visibility || "inherit";
            M && M.size && w && "hidden" !== T && !this.isCluster ? (x2 || (s2.halo = x2 = g2.renderer.path().add(w.parentGroup)), x2.show()[i3 ? "animate" : "attr"]({ d: this.haloPath(M.size) }), x2.attr({ class: "highcharts-halo highcharts-color-" + b(this.colorIndex, s2.colorIndex) + (this.className ? " " + this.className : ""), visibility: T, zIndex: -1 }), x2.point = this, g2.styledMode || x2.attr(c({ fill: this.color || s2.color, "fill-opacity": M.opacity }, t2.filterUserAttributes(M.attributes || {})))) : ((_a = x2 == null ? void 0 : x2.point) == null ? void 0 : _a.haloPath) && !x2.point.destroyed && x2.animate({ d: x2.point.haloPath(0) }, null, x2.hide), p(this, "afterSetState", { state: e3 });
          }
          haloPath(t3) {
            let e3 = this.pos();
            return e3 ? this.series.chart.renderer.symbols.circle(l(e3[0], 1) - t3, e3[1] - t3, 2 * t3, 2 * t3) : [];
          }
        }
        return k;
      }), i(e, "Core/Pointer.js", [e["Core/Color/Color.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        var s;
        let { parse: r } = t2, { charts: o, composed: n, isTouchDevice: a } = e2, { addEvent: h, attr: l, css: d, extend: c, find: p, fireEvent: u, isNumber: g, isObject: f, objectEach: m, offset: x, pick: y, pushUnique: b, splat: v } = i2;
        class S {
          applyInactiveState(t3) {
            let e3 = [], i3;
            (t3 || []).forEach(function(t4) {
              i3 = t4.series, e3.push(i3), i3.linkedParent && e3.push(i3.linkedParent), i3.linkedSeries && (e3 = e3.concat(i3.linkedSeries)), i3.navigatorSeries && e3.push(i3.navigatorSeries);
            }), this.chart.series.forEach(function(t4) {
              -1 === e3.indexOf(t4) ? t4.setState("inactive", true) : t4.options.inactiveOtherPoints && t4.setAllPointsToState("inactive");
            });
          }
          destroy() {
            let t3 = this;
            this.eventsToUnbind.forEach((t4) => t4()), this.eventsToUnbind = [], !e2.chartCount && (S.unbindDocumentMouseUp && S.unbindDocumentMouseUp.forEach((t4) => t4()), S.unbindDocumentTouchEnd && (S.unbindDocumentTouchEnd = S.unbindDocumentTouchEnd())), clearInterval(t3.tooltipTimeout), m(t3, function(e3, i3) {
              t3[i3] = void 0;
            });
          }
          getSelectionMarkerAttrs(t3, e3) {
            let i3 = { args: { chartX: t3, chartY: e3 }, attrs: {}, shapeType: "rect" };
            return u(this, "getSelectionMarkerAttrs", i3, (i4) => {
              let s2;
              let { chart: r2, zoomHor: o2, zoomVert: n2 } = this, { mouseDownX: a2 = 0, mouseDownY: h2 = 0 } = r2, l2 = i4.attrs;
              l2.x = r2.plotLeft, l2.y = r2.plotTop, l2.width = o2 ? 1 : r2.plotWidth, l2.height = n2 ? 1 : r2.plotHeight, o2 && (s2 = t3 - a2, l2.width = Math.max(1, Math.abs(s2)), l2.x = (s2 > 0 ? 0 : s2) + a2), n2 && (s2 = e3 - h2, l2.height = Math.max(1, Math.abs(s2)), l2.y = (s2 > 0 ? 0 : s2) + h2);
            }), i3;
          }
          drag(t3) {
            let { chart: e3 } = this, { mouseDownX: i3 = 0, mouseDownY: s2 = 0 } = e3, { panning: o2, panKey: n2, selectionMarkerFill: a2 } = e3.options.chart, h2 = e3.plotLeft, l2 = e3.plotTop, d2 = e3.plotWidth, c2 = e3.plotHeight, p2 = f(o2) ? o2.enabled : o2, u2 = n2 && t3[`${n2}Key`], g2 = t3.chartX, m2 = t3.chartY, x2, y2 = this.selectionMarker;
            if ((!y2 || !y2.touch) && (g2 < h2 ? g2 = h2 : g2 > h2 + d2 && (g2 = h2 + d2), m2 < l2 ? m2 = l2 : m2 > l2 + c2 && (m2 = l2 + c2), this.hasDragged = Math.sqrt(Math.pow(i3 - g2, 2) + Math.pow(s2 - m2, 2)), this.hasDragged > 10)) {
              x2 = e3.isInsidePlot(i3 - h2, s2 - l2, { visiblePlotOnly: true });
              let { shapeType: n3, attrs: d3 } = this.getSelectionMarkerAttrs(g2, m2);
              (e3.hasCartesianSeries || e3.mapView) && this.hasZoom && x2 && !u2 && !y2 && (this.selectionMarker = y2 = e3.renderer[n3](), y2.attr({ class: "highcharts-selection-marker", zIndex: 7 }).add(), e3.styledMode || y2.attr({ fill: a2 || r("#334eff").setOpacity(0.25).get() })), y2 && y2.attr(d3), x2 && !y2 && p2 && e3.pan(t3, o2);
            }
          }
          dragStart(t3) {
            let e3 = this.chart;
            e3.mouseIsDown = t3.type, e3.cancelClick = false, e3.mouseDownX = t3.chartX, e3.mouseDownY = t3.chartY;
          }
          getSelectionBox(t3) {
            let e3 = { args: { marker: t3 }, result: t3.getBBox() };
            return u(this, "getSelectionBox", e3), e3.result;
          }
          drop(t3) {
            let e3;
            let { chart: i3, selectionMarker: s2 } = this;
            for (let t4 of i3.axes) t4.isPanning && (t4.isPanning = false, (t4.options.startOnTick || t4.options.endOnTick || t4.series.some((t5) => t5.boosted)) && (t4.forceRedraw = true, t4.setExtremes(t4.userMin, t4.userMax, false), e3 = true));
            if (e3 && i3.redraw(), s2 && t3) {
              if (this.hasDragged) {
                let e4 = this.getSelectionBox(s2);
                i3.transform({ axes: i3.axes.filter((t4) => t4.zoomEnabled && ("xAxis" === t4.coll && this.zoomX || "yAxis" === t4.coll && this.zoomY)), selection: { originalEvent: t3, xAxis: [], yAxis: [], ...e4 }, from: e4 });
              }
              g(i3.index) && (this.selectionMarker = s2.destroy());
            }
            i3 && g(i3.index) && (d(i3.container, { cursor: i3._cursor }), i3.cancelClick = this.hasDragged > 10, i3.mouseIsDown = false, this.hasDragged = 0, this.pinchDown = []);
          }
          findNearestKDPoint(t3, e3, i3) {
            let s2;
            return t3.forEach(function(t4) {
              let r2 = !(t4.noSharedTooltip && e3) && 0 > t4.options.findNearestPointBy.indexOf("y"), o2 = t4.searchPoint(i3, r2);
              f(o2, true) && o2.series && (!f(s2, true) || function(t5, i4) {
                var _a, _b;
                let s3 = t5.distX - i4.distX, r3 = t5.dist - i4.dist, o3 = ((_a = i4.series.group) == null ? void 0 : _a.zIndex) - ((_b = t5.series.group) == null ? void 0 : _b.zIndex);
                return 0 !== s3 && e3 ? s3 : 0 !== r3 ? r3 : 0 !== o3 ? o3 : t5.series.index > i4.series.index ? -1 : 1;
              }(s2, o2) > 0) && (s2 = o2);
            }), s2;
          }
          getChartCoordinatesFromPoint(t3, e3) {
            let { xAxis: i3, yAxis: s2 } = t3.series, r2 = t3.shapeArgs;
            if (i3 && s2) {
              let o2 = t3.clientX ?? t3.plotX ?? 0, n2 = t3.plotY || 0;
              return t3.isNode && r2 && g(r2.x) && g(r2.y) && (o2 = r2.x, n2 = r2.y), e3 ? { chartX: s2.len + s2.pos - n2, chartY: i3.len + i3.pos - o2 } : { chartX: o2 + i3.pos, chartY: n2 + s2.pos };
            }
            if (r2 && r2.x && r2.y) return { chartX: r2.x, chartY: r2.y };
          }
          getChartPosition() {
            if (this.chartPosition) return this.chartPosition;
            let { container: t3 } = this.chart, e3 = x(t3);
            this.chartPosition = { left: e3.left, top: e3.top, scaleX: 1, scaleY: 1 };
            let { offsetHeight: i3, offsetWidth: s2 } = t3;
            return s2 > 2 && i3 > 2 && (this.chartPosition.scaleX = e3.width / s2, this.chartPosition.scaleY = e3.height / i3), this.chartPosition;
          }
          getCoordinates(t3) {
            let e3 = { xAxis: [], yAxis: [] };
            for (let i3 of this.chart.axes) e3[i3.isXAxis ? "xAxis" : "yAxis"].push({ axis: i3, value: i3.toValue(t3[i3.horiz ? "chartX" : "chartY"]) });
            return e3;
          }
          getHoverData(t3, e3, i3, s2, r2, o2) {
            let n2 = [], a2 = function(t4) {
              return t4.visible && !(!r2 && t4.directTouch) && y(t4.options.enableMouseTracking, true);
            }, h2 = e3, l2, d2 = { chartX: o2 ? o2.chartX : void 0, chartY: o2 ? o2.chartY : void 0, shared: r2 };
            u(this, "beforeGetHoverData", d2), l2 = h2 && !h2.stickyTracking ? [h2] : i3.filter((t4) => t4.stickyTracking && (d2.filter || a2)(t4));
            let c2 = s2 && t3 || !o2 ? t3 : this.findNearestKDPoint(l2, r2, o2);
            return h2 = c2 && c2.series, c2 && (r2 && !h2.noSharedTooltip ? (l2 = i3.filter(function(t4) {
              return d2.filter ? d2.filter(t4) : a2(t4) && !t4.noSharedTooltip;
            })).forEach(function(t4) {
              let e4 = p(t4.points, function(t5) {
                return t5.x === c2.x && !t5.isNull;
              });
              f(e4) && (t4.boosted && t4.boost && (e4 = t4.boost.getPoint(e4)), n2.push(e4));
            }) : n2.push(c2)), u(this, "afterGetHoverData", d2 = { hoverPoint: c2 }), { hoverPoint: d2.hoverPoint, hoverSeries: h2, hoverPoints: n2 };
          }
          getPointFromEvent(t3) {
            let e3 = t3.target, i3;
            for (; e3 && !i3; ) i3 = e3.point, e3 = e3.parentNode;
            return i3;
          }
          onTrackerMouseOut(t3) {
            let e3 = this.chart, i3 = t3.relatedTarget, s2 = e3.hoverSeries;
            this.isDirectTouch = false, !s2 || !i3 || s2.stickyTracking || this.inClass(i3, "highcharts-tooltip") || this.inClass(i3, "highcharts-series-" + s2.index) && this.inClass(i3, "highcharts-tracker") || s2.onMouseOut();
          }
          inClass(t3, e3) {
            let i3 = t3, s2;
            for (; i3; ) {
              if (s2 = l(i3, "class")) {
                if (-1 !== s2.indexOf(e3)) return true;
                if (-1 !== s2.indexOf("highcharts-container")) return false;
              }
              i3 = i3.parentElement;
            }
          }
          constructor(t3, e3) {
            var _a;
            this.hasDragged = 0, this.pointerCaptureEventsToUnbind = [], this.eventsToUnbind = [], this.options = e3, this.chart = t3, this.runChartClick = !!((_a = e3.chart.events) == null ? void 0 : _a.click), this.pinchDown = [], this.setDOMEvents(), u(this, "afterInit");
          }
          normalize(t3, e3) {
            let i3 = t3.touches, s2 = i3 ? i3.length ? i3.item(0) : y(i3.changedTouches, t3.changedTouches)[0] : t3;
            e3 || (e3 = this.getChartPosition());
            let r2 = s2.pageX - e3.left, o2 = s2.pageY - e3.top;
            return c(t3, { chartX: Math.round(r2 /= e3.scaleX), chartY: Math.round(o2 /= e3.scaleY) });
          }
          onContainerClick(t3) {
            let e3 = this.chart, i3 = e3.hoverPoint, s2 = this.normalize(t3), r2 = e3.plotLeft, o2 = e3.plotTop;
            !e3.cancelClick && (i3 && this.inClass(s2.target, "highcharts-tracker") ? (u(i3.series, "click", c(s2, { point: i3 })), e3.hoverPoint && i3.firePointEvent("click", s2)) : (c(s2, this.getCoordinates(s2)), e3.isInsidePlot(s2.chartX - r2, s2.chartY - o2, { visiblePlotOnly: true }) && u(e3, "click", s2)));
          }
          onContainerMouseDown(t3) {
            var _a;
            let i3 = (1 & (t3.buttons || t3.button)) == 1;
            t3 = this.normalize(t3), e2.isFirefox && 0 !== t3.button && this.onContainerMouseMove(t3), (void 0 === t3.button || i3) && (this.zoomOption(t3), i3 && ((_a = t3.preventDefault) == null ? void 0 : _a.call(t3)), this.dragStart(t3));
          }
          onContainerMouseLeave(t3) {
            let { pointer: e3 } = o[y(S.hoverChartIndex, -1)] || {};
            t3 = this.normalize(t3), this.onContainerMouseMove(t3), e3 && !this.inClass(t3.relatedTarget, "highcharts-tooltip") && (e3.reset(), e3.chartPosition = void 0);
          }
          onContainerMouseEnter() {
            delete this.chartPosition;
          }
          onContainerMouseMove(t3) {
            let e3 = this.chart, i3 = e3.tooltip, s2 = this.normalize(t3);
            this.setHoverChartIndex(t3), ("mousedown" === e3.mouseIsDown || this.touchSelect(s2)) && this.drag(s2), !e3.openMenu && (this.inClass(s2.target, "highcharts-tracker") || e3.isInsidePlot(s2.chartX - e3.plotLeft, s2.chartY - e3.plotTop, { visiblePlotOnly: true })) && !(i3 && i3.shouldStickOnContact(s2)) && (this.inClass(s2.target, "highcharts-no-tooltip") ? this.reset(false, 0) : this.runPointActions(s2));
          }
          onDocumentTouchEnd(t3) {
            this.onDocumentMouseUp(t3);
          }
          onContainerTouchMove(t3) {
            this.touchSelect(t3) ? this.onContainerMouseMove(t3) : this.touch(t3);
          }
          onContainerTouchStart(t3) {
            this.touchSelect(t3) ? this.onContainerMouseDown(t3) : (this.zoomOption(t3), this.touch(t3, true));
          }
          onDocumentMouseMove(t3) {
            let e3 = this.chart, i3 = e3.tooltip, s2 = this.chartPosition, r2 = this.normalize(t3, s2);
            !s2 || e3.isInsidePlot(r2.chartX - e3.plotLeft, r2.chartY - e3.plotTop, { visiblePlotOnly: true }) || i3 && i3.shouldStickOnContact(r2) || r2.target !== e3.container.ownerDocument && this.inClass(r2.target, "highcharts-tracker") || this.reset();
          }
          onDocumentMouseUp(t3) {
            var _a, _b;
            (_b = (_a = o[y(S.hoverChartIndex, -1)]) == null ? void 0 : _a.pointer) == null ? void 0 : _b.drop(t3);
          }
          pinch(t3) {
            let e3 = this, { chart: i3, hasZoom: s2, lastTouches: r2 } = e3, o2 = [].map.call(t3.touches || [], (t4) => e3.normalize(t4)), n2 = o2.length, a2 = 1 === n2 && (e3.inClass(t3.target, "highcharts-tracker") && i3.runTrackerClick || e3.runChartClick), h2 = i3.tooltip, l2 = 1 === n2 && y(h2 == null ? void 0 : h2.options.followTouchMove, true);
            n2 > 1 ? e3.initiated = true : l2 && (e3.initiated = false), s2 && e3.initiated && !a2 && false !== t3.cancelable && t3.preventDefault(), "touchstart" === t3.type ? (e3.pinchDown = o2, e3.res = true, i3.mouseDownX = t3.chartX) : l2 ? this.runPointActions(e3.normalize(t3)) : r2 && (u(i3, "touchpan", { originalEvent: t3, touches: o2 }, () => {
              let e4 = (t4) => {
                let e5 = t4[0], i4 = t4[1] || e5;
                return { x: e5.chartX, y: e5.chartY, width: i4.chartX - e5.chartX, height: i4.chartY - e5.chartY };
              };
              i3.transform({ axes: i3.axes.filter((t4) => t4.zoomEnabled && (this.zoomHor && t4.horiz || this.zoomVert && !t4.horiz)), to: e4(o2), from: e4(r2), trigger: t3.type });
            }), e3.res && (e3.res = false, this.reset(false, 0))), e3.lastTouches = o2;
          }
          reset(t3, e3) {
            let i3 = this.chart, s2 = i3.hoverSeries, r2 = i3.hoverPoint, o2 = i3.hoverPoints, n2 = i3.tooltip, a2 = n2 && n2.shared ? o2 : r2;
            t3 && a2 && v(a2).forEach(function(e4) {
              e4.series.isCartesian && void 0 === e4.plotX && (t3 = false);
            }), t3 ? n2 && a2 && v(a2).length && (n2.refresh(a2), n2.shared && o2 ? o2.forEach(function(t4) {
              t4.setState(t4.state, true), t4.series.isCartesian && (t4.series.xAxis.crosshair && t4.series.xAxis.drawCrosshair(null, t4), t4.series.yAxis.crosshair && t4.series.yAxis.drawCrosshair(null, t4));
            }) : r2 && (r2.setState(r2.state, true), i3.axes.forEach(function(t4) {
              t4.crosshair && r2.series[t4.coll] === t4 && t4.drawCrosshair(null, r2);
            }))) : (r2 && r2.onMouseOut(), o2 && o2.forEach(function(t4) {
              t4.setState();
            }), s2 && s2.onMouseOut(), n2 && n2.hide(e3), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), i3.axes.forEach(function(t4) {
              t4.hideCrosshair();
            }), i3.hoverPoints = i3.hoverPoint = void 0);
          }
          runPointActions(t3, e3, i3) {
            let s2 = this.chart, r2 = s2.series, n2 = s2.tooltip && s2.tooltip.options.enabled ? s2.tooltip : void 0, a2 = !!n2 && n2.shared, l2 = e3 || s2.hoverPoint, d2 = l2 && l2.series || s2.hoverSeries, c2 = (!t3 || "touchmove" !== t3.type) && (!!e3 || d2 && d2.directTouch && this.isDirectTouch), u2 = this.getHoverData(l2, d2, r2, c2, a2, t3);
            l2 = u2.hoverPoint, d2 = u2.hoverSeries;
            let g2 = u2.hoverPoints, f2 = d2 && d2.tooltipOptions.followPointer && !d2.tooltipOptions.split, m2 = a2 && d2 && !d2.noSharedTooltip;
            if (l2 && (i3 || l2 !== s2.hoverPoint || n2 && n2.isHidden)) {
              if ((s2.hoverPoints || []).forEach(function(t4) {
                -1 === g2.indexOf(t4) && t4.setState();
              }), s2.hoverSeries !== d2 && d2.onMouseOver(), this.applyInactiveState(g2), (g2 || []).forEach(function(t4) {
                t4.setState("hover");
              }), s2.hoverPoint && s2.hoverPoint.firePointEvent("mouseOut"), !l2.series) return;
              s2.hoverPoints = g2, s2.hoverPoint = l2, l2.firePointEvent("mouseOver", void 0, () => {
                n2 && l2 && n2.refresh(m2 ? g2 : l2, t3);
              });
            } else if (f2 && n2 && !n2.isHidden) {
              let e4 = n2.getAnchor([{}], t3);
              s2.isInsidePlot(e4[0], e4[1], { visiblePlotOnly: true }) && n2.updatePosition({ plotX: e4[0], plotY: e4[1] });
            }
            this.unDocMouseMove || (this.unDocMouseMove = h(s2.container.ownerDocument, "mousemove", (t4) => {
              var _a, _b;
              return (_b = (_a = o[S.hoverChartIndex ?? -1]) == null ? void 0 : _a.pointer) == null ? void 0 : _b.onDocumentMouseMove(t4);
            }), this.eventsToUnbind.push(this.unDocMouseMove)), s2.axes.forEach(function(e4) {
              let i4;
              let r3 = y((e4.crosshair || {}).snap, true);
              !r3 || (i4 = s2.hoverPoint) && i4.series[e4.coll] === e4 || (i4 = p(g2, (t4) => t4.series && t4.series[e4.coll] === e4)), i4 || !r3 ? e4.drawCrosshair(t3, i4) : e4.hideCrosshair();
            });
          }
          setDOMEvents() {
            let t3 = this.chart.container, e3 = t3.ownerDocument;
            t3.onmousedown = this.onContainerMouseDown.bind(this), t3.onmousemove = this.onContainerMouseMove.bind(this), t3.onclick = this.onContainerClick.bind(this), this.eventsToUnbind.push(h(t3, "mouseenter", this.onContainerMouseEnter.bind(this)), h(t3, "mouseleave", this.onContainerMouseLeave.bind(this))), S.unbindDocumentMouseUp || (S.unbindDocumentMouseUp = []), S.unbindDocumentMouseUp.push(h(e3, "mouseup", this.onDocumentMouseUp.bind(this)));
            let i3 = this.chart.renderTo.parentElement;
            for (; i3 && "BODY" !== i3.tagName; ) this.eventsToUnbind.push(h(i3, "scroll", () => {
              delete this.chartPosition;
            })), i3 = i3.parentElement;
            this.eventsToUnbind.push(h(t3, "touchstart", this.onContainerTouchStart.bind(this), { passive: false }), h(t3, "touchmove", this.onContainerTouchMove.bind(this), { passive: false })), S.unbindDocumentTouchEnd || (S.unbindDocumentTouchEnd = h(e3, "touchend", this.onDocumentTouchEnd.bind(this), { passive: false })), this.setPointerCapture(), h(this.chart, "redraw", this.setPointerCapture.bind(this));
          }
          setPointerCapture() {
            var _a, _b;
            if (!a) return;
            let t3 = this.pointerCaptureEventsToUnbind, e3 = this.chart, i3 = e3.container, s2 = y((_a = e3.options.tooltip) == null ? void 0 : _a.followTouchMove, true) && e3.series.some((t4) => t4.options.findNearestPointBy.indexOf("y") > -1);
            !this.hasPointerCapture && s2 ? (t3.push(h(i3, "pointerdown", (t4) => {
              var _a2, _b2;
              ((_a2 = t4.target) == null ? void 0 : _a2.hasPointerCapture(t4.pointerId)) && ((_b2 = t4.target) == null ? void 0 : _b2.releasePointerCapture(t4.pointerId));
            }), h(i3, "pointermove", (t4) => {
              var _a2, _b2;
              (_b2 = (_a2 = e3.pointer) == null ? void 0 : _a2.getPointFromEvent(t4)) == null ? void 0 : _b2.onMouseOver(t4);
            })), e3.styledMode || d(i3, { "touch-action": "none" }), i3.className += " highcharts-no-touch-action", this.hasPointerCapture = true) : this.hasPointerCapture && !s2 && (t3.forEach((t4) => t4()), t3.length = 0, e3.styledMode || d(i3, { "touch-action": y((_b = e3.options.chart.style) == null ? void 0 : _b["touch-action"], "manipulation") }), i3.className = i3.className.replace(" highcharts-no-touch-action", ""), this.hasPointerCapture = false);
          }
          setHoverChartIndex(t3) {
            var _a;
            let i3 = this.chart, s2 = e2.charts[y(S.hoverChartIndex, -1)];
            if (s2 && s2 !== i3) {
              let e3 = { relatedTarget: i3.container };
              t3 && !(t3 == null ? void 0 : t3.relatedTarget) && (t3 = { ...e3, ...t3 }), (_a = s2.pointer) == null ? void 0 : _a.onContainerMouseLeave(t3 || e3);
            }
            s2 && s2.mouseIsDown || (S.hoverChartIndex = i3.index);
          }
          touch(t3, e3) {
            let i3;
            let { chart: s2, pinchDown: r2 = [] } = this;
            this.setHoverChartIndex(), 1 === (t3 = this.normalize(t3)).touches.length ? s2.isInsidePlot(t3.chartX - s2.plotLeft, t3.chartY - s2.plotTop, { visiblePlotOnly: true }) && !s2.openMenu ? (e3 && this.runPointActions(t3), "touchmove" === t3.type && (i3 = !!r2[0] && Math.pow(r2[0].chartX - t3.chartX, 2) + Math.pow(r2[0].chartY - t3.chartY, 2) >= 16), y(i3, true) && this.pinch(t3)) : e3 && this.reset() : 2 === t3.touches.length && this.pinch(t3);
          }
          touchSelect(t3) {
            return !!(this.chart.zooming.singleTouch && t3.touches && 1 === t3.touches.length);
          }
          zoomOption(t3) {
            let e3 = this.chart, i3 = e3.inverted, s2 = e3.zooming.type || "", r2, o2;
            /touch/.test(t3.type) && (s2 = y(e3.zooming.pinchType, s2)), this.zoomX = r2 = /x/.test(s2), this.zoomY = o2 = /y/.test(s2), this.zoomHor = r2 && !i3 || o2 && i3, this.zoomVert = o2 && !i3 || r2 && i3, this.hasZoom = r2 || o2;
          }
        }
        return (s = S || (S = {})).compose = function(t3) {
          b(n, "Core.Pointer") && h(t3, "beforeRender", function() {
            this.pointer = new s(this, this.options);
          });
        }, S;
      }), i(e, "Core/Legend/LegendSymbol.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { extend: i2, merge: s, pick: r } = t2;
        return function(t3) {
          function e3(t4, e4, o) {
            var _a, _b;
            let n = this.legendItem = this.legendItem || {}, { chart: a, options: h } = this, { baseline: l = 0, symbolWidth: d, symbolHeight: c } = t4, p = this.symbol || "circle", u = c / 2, g = a.renderer, f = n.group, m = l - Math.round((((_a = t4.fontMetrics) == null ? void 0 : _a.b) || c) * (o ? 0.4 : 0.3)), x = {}, y, b = h.marker, v = 0;
            if (a.styledMode || (x["stroke-width"] = Math.min(h.lineWidth || 0, 24), h.dashStyle ? x.dashstyle = h.dashStyle : "square" === h.linecap || (x["stroke-linecap"] = "round")), n.line = g.path().addClass("highcharts-graph").attr(x).add(f), o && (n.area = g.path().addClass("highcharts-area").add(f)), x["stroke-linecap"] && (v = Math.min(n.line.strokeWidth(), d) / 2), d) {
              let t5 = [["M", v, m], ["L", d - v, m]];
              n.line.attr({ d: t5 }), (_b = n.area) == null ? void 0 : _b.attr({ d: [...t5, ["L", d - v, l], ["L", v, l]] });
            }
            if (b && false !== b.enabled && d) {
              let t5 = Math.min(r(b.radius, u), u);
              0 === p.indexOf("url") && (b = s(b, { width: c, height: c }), t5 = 0), n.symbol = y = g.symbol(p, d / 2 - t5, m - t5, 2 * t5, 2 * t5, i2({ context: "legend" }, b)).addClass("highcharts-point").add(f), y.isMarker = true;
            }
          }
          t3.areaMarker = function(t4, i3) {
            e3.call(this, t4, i3, true);
          }, t3.lineMarker = e3, t3.rectangle = function(t4, e4) {
            let i3 = e4.legendItem || {}, s2 = t4.options, o = t4.symbolHeight, n = s2.squareSymbol, a = n ? o : t4.symbolWidth;
            i3.symbol = this.chart.renderer.rect(n ? (t4.symbolWidth - o) / 2 : 0, t4.baseline - o + 1, a, o, r(t4.options.symbolRadius, o / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(i3.group);
          };
        }(e2 || (e2 = {})), e2;
      }), i(e, "Core/Series/SeriesDefaults.js", [], function() {
        return { lineWidth: 2, allowPointSelect: false, crisp: true, showCheckbox: false, animation: { duration: 1e3 }, enableMouseTracking: true, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: true }, hover: { animation: { duration: 150 }, enabled: true, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: true, formatter: function() {
          let { numberFormatter: t2 } = this.series.chart;
          return "number" != typeof this.y ? "" : t2(this.y, -1);
        }, padding: 5, style: { fontSize: "0.7em", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: true, states: { normal: { animation: true }, hover: { animation: { duration: 150 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 150 }, opacity: 0.2 } }, stickyTracking: true, turboThreshold: 1e3, findNearestPointBy: "x" };
      }), i(e, "Core/Series/SeriesRegistry.js", [e["Core/Globals.js"], e["Core/Defaults.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        var r;
        let { defaultOptions: o } = e2, { extend: n, extendClass: a, merge: h } = s;
        return function(e3) {
          function s2(t3, s3) {
            let r2 = o.plotOptions || {}, n2 = s3.defaultOptions, a2 = s3.prototype;
            return a2.type = t3, a2.pointClass || (a2.pointClass = i2), !e3.seriesTypes[t3] && (n2 && (r2[t3] = n2), e3.seriesTypes[t3] = s3, true);
          }
          e3.seriesTypes = t2.seriesTypes, e3.registerSeriesType = s2, e3.seriesType = function(t3, r2, l, d, c) {
            let p = o.plotOptions || {};
            if (r2 = r2 || "", p[t3] = h(p[r2], l), delete e3.seriesTypes[t3], s2(t3, a(e3.seriesTypes[r2] || function() {
            }, d)), e3.seriesTypes[t3].prototype.type = t3, c) {
              class s3 extends i2 {
              }
              n(s3.prototype, c), e3.seriesTypes[t3].prototype.pointClass = s3;
            }
            return e3.seriesTypes[t3];
          };
        }(r || (r = {})), r;
      }), i(e, "Core/Series/Series.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Defaults.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Legend/LegendSymbol.js"], e["Core/Series/Point.js"], e["Core/Series/SeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o, n, a, h, l) {
        let { animObject: d, setAnimation: c } = t2, { defaultOptions: p } = e2, { registerEventOptions: u } = i2, { svg: g, win: f } = s, { seriesTypes: m } = a, { arrayMax: x, arrayMin: y, clamp: b, correctFloat: v, crisp: S, defined: C, destroyObjectProperties: k, diffObjects: M, erase: w, error: T, extend: A, find: P, fireEvent: L, getClosestDistance: O, getNestedProperty: D, insertItem: E, isArray: I, isNumber: j, isString: B, merge: R, objectEach: z, pick: N, removeEvent: W, splat: G, syncTimeout: H } = l;
        class X {
          constructor() {
            this.zoneAxis = "y";
          }
          init(t3, e3) {
            let i3;
            L(this, "init", { options: e3 });
            let s2 = this, r2 = t3.series;
            this.eventsToUnbind = [], s2.chart = t3, s2.options = s2.setOptions(e3);
            let o2 = s2.options, n2 = false !== o2.visible;
            s2.linkedSeries = [], s2.bindAxes(), A(s2, { name: o2.name, state: "", visible: n2, selected: true === o2.selected }), u(this, o2);
            let a2 = o2.events;
            (a2 && a2.click || o2.point && o2.point.events && o2.point.events.click || o2.allowPointSelect) && (t3.runTrackerClick = true), s2.getColor(), s2.getSymbol(), s2.parallelArrays.forEach(function(t4) {
              s2[t4 + "Data"] || (s2[t4 + "Data"] = []);
            }), s2.isCartesian && (t3.hasCartesianSeries = true), r2.length && (i3 = r2[r2.length - 1]), s2._i = N(i3 && i3._i, -1) + 1, s2.opacity = s2.options.opacity, t3.orderItems("series", E(this, r2)), o2.dataSorting && o2.dataSorting.enabled ? s2.setDataSortingOptions() : s2.points || s2.data || s2.setData(o2.data, false), L(this, "afterInit");
          }
          is(t3) {
            return m[t3] && this instanceof m[t3];
          }
          bindAxes() {
            let t3;
            let e3 = this, i3 = e3.options, s2 = e3.chart;
            L(this, "bindAxes", null, function() {
              (e3.axisTypes || []).forEach(function(r2) {
                (s2[r2] || []).forEach(function(s3) {
                  t3 = s3.options, (N(i3[r2], 0) === s3.index || void 0 !== i3[r2] && i3[r2] === t3.id) && (E(e3, s3.series), e3[r2] = s3, s3.isDirty = true);
                }), e3[r2] || e3.optionalAxis === r2 || T(18, true, s2);
              });
            }), L(this, "afterBindAxes");
          }
          updateParallelArrays(t3, e3, i3) {
            let s2 = t3.series, r2 = j(e3) ? function(i4) {
              let r3 = "y" === i4 && s2.toYData ? s2.toYData(t3) : t3[i4];
              s2[i4 + "Data"][e3] = r3;
            } : function(t4) {
              Array.prototype[e3].apply(s2[t4 + "Data"], i3);
            };
            s2.parallelArrays.forEach(r2);
          }
          hasData() {
            return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && this.yData.length > 0;
          }
          hasMarkerChanged(t3, e3) {
            let i3 = t3.marker, s2 = e3.marker || {};
            return i3 && (s2.enabled && !i3.enabled || s2.symbol !== i3.symbol || s2.height !== i3.height || s2.width !== i3.width);
          }
          autoIncrement(t3) {
            let e3 = this.options, i3 = e3.pointIntervalUnit, s2 = e3.relativeXValue, r2 = this.chart.time, o2 = this.xIncrement, n2, a2;
            return (o2 = N(o2, e3.pointStart, 0), this.pointInterval = a2 = N(this.pointInterval, e3.pointInterval, 1), s2 && j(t3) && (a2 *= t3), i3 && (n2 = new r2.Date(o2), "day" === i3 ? r2.set("Date", n2, r2.get("Date", n2) + a2) : "month" === i3 ? r2.set("Month", n2, r2.get("Month", n2) + a2) : "year" === i3 && r2.set("FullYear", n2, r2.get("FullYear", n2) + a2), a2 = n2.getTime() - o2), s2 && j(t3)) ? o2 + a2 : (this.xIncrement = o2 + a2, o2);
          }
          setDataSortingOptions() {
            let t3 = this.options;
            A(this, { requireSorting: false, sorted: false, enabledDataSorting: true, allowDG: false }), C(t3.pointRange) || (t3.pointRange = 1);
          }
          setOptions(t3) {
            var _a, _b;
            let e3;
            let i3 = this.chart, s2 = i3.options.plotOptions, r2 = i3.userOptions || {}, o2 = R(t3), n2 = i3.styledMode, a2 = { plotOptions: s2, userOptions: o2 };
            L(this, "setOptions", a2);
            let h2 = a2.plotOptions[this.type], l2 = r2.plotOptions || {}, d2 = l2.series || {}, c2 = p.plotOptions[this.type] || {}, u2 = l2[this.type] || {};
            this.userOptions = a2.userOptions;
            let g2 = R(h2, s2.series, u2, o2);
            this.tooltipOptions = R(p.tooltip, (_a = p.plotOptions.series) == null ? void 0 : _a.tooltip, c2 == null ? void 0 : c2.tooltip, i3.userOptions.tooltip, (_b = l2.series) == null ? void 0 : _b.tooltip, u2.tooltip, o2.tooltip), this.stickyTracking = N(o2.stickyTracking, u2.stickyTracking, d2.stickyTracking, !!this.tooltipOptions.shared && !this.noSharedTooltip || g2.stickyTracking), null === h2.marker && delete g2.marker, this.zoneAxis = g2.zoneAxis || "y";
            let f2 = this.zones = (g2.zones || []).map((t4) => ({ ...t4 }));
            return (g2.negativeColor || g2.negativeFillColor) && !g2.zones && (e3 = { value: g2[this.zoneAxis + "Threshold"] || g2.threshold || 0, className: "highcharts-negative" }, n2 || (e3.color = g2.negativeColor, e3.fillColor = g2.negativeFillColor), f2.push(e3)), f2.length && C(f2[f2.length - 1].value) && f2.push(n2 ? {} : { color: this.color, fillColor: this.fillColor }), L(this, "afterSetOptions", { options: g2 }), g2;
          }
          getName() {
            return N(this.options.name, "Series " + (this.index + 1));
          }
          getCyclic(t3, e3, i3) {
            let s2, r2;
            let o2 = this.chart, n2 = `${t3}Index`, a2 = `${t3}Counter`, h2 = (i3 == null ? void 0 : i3.length) || o2.options.chart.colorCount;
            !e3 && (C(r2 = N("color" === t3 ? this.options.colorIndex : void 0, this[n2])) ? s2 = r2 : (o2.series.length || (o2[a2] = 0), s2 = o2[a2] % h2, o2[a2] += 1), i3 && (e3 = i3[s2])), void 0 !== s2 && (this[n2] = s2), this[t3] = e3;
          }
          getColor() {
            this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || p.plotOptions[this.type].color, this.chart.options.colors);
          }
          getPointsCollection() {
            return (this.hasGroupedData ? this.points : this.data) || [];
          }
          getSymbol() {
            let t3 = this.options.marker;
            this.getCyclic("symbol", t3.symbol, this.chart.options.symbols);
          }
          findPointIndex(t3, e3) {
            let i3, s2, r2;
            let n2 = t3.id, a2 = t3.x, h2 = this.points, l2 = this.options.dataSorting;
            if (n2) {
              let t4 = this.chart.get(n2);
              t4 instanceof o && (i3 = t4);
            } else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
              let e4 = (e5) => !e5.touched && e5.index === t3.index;
              if (l2 && l2.matchByName ? e4 = (e5) => !e5.touched && e5.name === t3.name : this.options.relativeXValue && (e4 = (e5) => !e5.touched && e5.options.x === t3.x), !(i3 = P(h2, e4))) return;
            }
            return i3 && void 0 !== (r2 = i3 && i3.index) && (s2 = true), void 0 === r2 && j(a2) && (r2 = this.xData.indexOf(a2, e3)), -1 !== r2 && void 0 !== r2 && this.cropped && (r2 = r2 >= this.cropStart ? r2 - this.cropStart : r2), !s2 && j(r2) && h2[r2] && h2[r2].touched && (r2 = void 0), r2;
          }
          updateData(t3, e3) {
            let i3 = this.options, s2 = i3.dataSorting, r2 = this.points, o2 = [], n2 = this.requireSorting, a2 = t3.length === r2.length, h2, l2, d2, c2, p2 = true;
            if (this.xIncrement = null, t3.forEach(function(t4, e4) {
              let l3;
              let d3 = C(t4) && this.pointClass.prototype.optionsToObject.call({ series: this }, t4) || {}, p3 = d3.x;
              d3.id || j(p3) ? (-1 === (l3 = this.findPointIndex(d3, c2)) || void 0 === l3 ? o2.push(t4) : r2[l3] && t4 !== i3.data[l3] ? (r2[l3].update(t4, false, null, false), r2[l3].touched = true, n2 && (c2 = l3 + 1)) : r2[l3] && (r2[l3].touched = true), (!a2 || e4 !== l3 || s2 && s2.enabled || this.hasDerivedData) && (h2 = true)) : o2.push(t4);
            }, this), h2) for (l2 = r2.length; l2--; ) (d2 = r2[l2]) && !d2.touched && d2.remove && d2.remove(false, e3);
            else !a2 || s2 && s2.enabled ? p2 = false : (t3.forEach(function(t4, e4) {
              t4 === r2[e4].y || r2[e4].destroyed || r2[e4].update(t4, false, null, false);
            }), o2.length = 0);
            return r2.forEach(function(t4) {
              t4 && (t4.touched = false);
            }), !!p2 && (o2.forEach(function(t4) {
              this.addPoint(t4, false, null, null, false);
            }, this), null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = x(this.xData), this.autoIncrement()), true);
          }
          setData(t3, e3 = true, i3, s2) {
            var _a;
            let r2 = this, o2 = r2.points, n2 = o2 && o2.length || 0, a2 = r2.options, h2 = r2.chart, l2 = a2.dataSorting, d2 = r2.xAxis, c2 = a2.turboThreshold, p2 = this.xData, u2 = this.yData, g2 = r2.pointArrayMap, f2 = g2 && g2.length, m2 = a2.keys, x2, y2, b2, v2 = 0, S2 = 1, C2;
            h2.options.chart.allowMutatingData || (a2.data && delete r2.options.data, r2.userOptions.data && delete r2.userOptions.data, C2 = R(true, t3));
            let k2 = (t3 = C2 || t3 || []).length;
            if (l2 && l2.enabled && (t3 = this.sortData(t3)), h2.options.chart.allowMutatingData && false !== s2 && k2 && n2 && !r2.cropped && !r2.hasGroupedData && r2.visible && !r2.boosted && (b2 = this.updateData(t3, i3)), !b2) {
              r2.xIncrement = null, r2.colorCounter = 0, this.parallelArrays.forEach(function(t4) {
                r2[t4 + "Data"].length = 0;
              });
              let e4 = c2 && k2 > c2;
              if (e4) {
                let i4 = r2.getFirstValidPoint(t3), s3 = r2.getFirstValidPoint(t3, k2 - 1, -1), o3 = (t4) => !!(I(t4) && (m2 || j(t4[0])));
                if (j(i4) && j(s3)) for (x2 = 0; x2 < k2; x2++) p2[x2] = this.autoIncrement(), u2[x2] = t3[x2];
                else if (o3(i4) && o3(s3)) {
                  if (f2) {
                    if (i4.length === f2) for (x2 = 0; x2 < k2; x2++) p2[x2] = this.autoIncrement(), u2[x2] = t3[x2];
                    else for (x2 = 0; x2 < k2; x2++) y2 = t3[x2], p2[x2] = y2[0], u2[x2] = y2.slice(1, f2 + 1);
                  } else if (m2 && (v2 = m2.indexOf("x"), S2 = m2.indexOf("y"), v2 = v2 >= 0 ? v2 : 0, S2 = S2 >= 0 ? S2 : 1), 1 === i4.length && (S2 = 0), v2 === S2) for (x2 = 0; x2 < k2; x2++) p2[x2] = this.autoIncrement(), u2[x2] = t3[x2][S2];
                  else for (x2 = 0; x2 < k2; x2++) y2 = t3[x2], p2[x2] = y2[v2], u2[x2] = y2[S2];
                } else e4 = false;
              }
              if (!e4) for (x2 = 0; x2 < k2; x2++) y2 = { series: r2 }, r2.pointClass.prototype.applyOptions.apply(y2, [t3[x2]]), r2.updateParallelArrays(y2, x2);
              for (u2 && B(u2[0]) && T(14, true, h2), r2.data = [], r2.options.data = r2.userOptions.data = t3, x2 = n2; x2--; ) (_a = o2[x2]) == null ? void 0 : _a.destroy();
              d2 && (d2.minRange = d2.userMinRange), r2.isDirty = h2.isDirtyBox = true, r2.isDirtyData = !!o2, i3 = false;
            }
            "point" === a2.legendType && (this.processData(), this.generatePoints()), e3 && h2.redraw(i3);
          }
          sortData(t3) {
            let e3 = this, i3 = e3.options.dataSorting.sortKey || "y", s2 = function(t4, e4) {
              return C(e4) && t4.pointClass.prototype.optionsToObject.call({ series: t4 }, e4) || {};
            };
            return t3.forEach(function(i4, r2) {
              t3[r2] = s2(e3, i4), t3[r2].index = r2;
            }, this), t3.concat().sort((t4, e4) => {
              let s3 = D(i3, t4), r2 = D(i3, e4);
              return r2 < s3 ? -1 : r2 > s3 ? 1 : 0;
            }).forEach(function(t4, e4) {
              t4.x = e4;
            }, this), e3.linkedSeries && e3.linkedSeries.forEach(function(e4) {
              let i4 = e4.options, r2 = i4.data;
              i4.dataSorting && i4.dataSorting.enabled || !r2 || (r2.forEach(function(i5, o2) {
                r2[o2] = s2(e4, i5), t3[o2] && (r2[o2].x = t3[o2].x, r2[o2].index = o2);
              }), e4.setData(r2, false));
            }), t3;
          }
          getProcessedData(t3) {
            let e3 = this, i3 = e3.xAxis, s2 = e3.options.cropThreshold, r2 = i3 == null ? void 0 : i3.logarithmic, o2 = e3.isCartesian, n2, a2, h2 = 0, l2, d2, c2, p2 = e3.xData, u2 = e3.yData, g2 = false, f2 = p2.length;
            i3 && (d2 = (l2 = i3.getExtremes()).min, c2 = l2.max, g2 = !!(i3.categories && !i3.names.length)), o2 && e3.sorted && !t3 && (!s2 || f2 > s2 || e3.forceCrop) && (p2[f2 - 1] < d2 || p2[0] > c2 ? (p2 = [], u2 = []) : e3.yData && (p2[0] < d2 || p2[f2 - 1] > c2) && (p2 = (n2 = this.cropData(e3.xData, e3.yData, d2, c2)).xData, u2 = n2.yData, h2 = n2.start, a2 = true));
            let m2 = O([r2 ? p2.map(r2.log2lin) : p2], () => e3.requireSorting && !g2 && T(15, false, e3.chart));
            return { xData: p2, yData: u2, cropped: a2, cropStart: h2, closestPointRange: m2 };
          }
          processData(t3) {
            let e3 = this.xAxis;
            if (this.isCartesian && !this.isDirty && !e3.isDirty && !this.yAxis.isDirty && !t3) return false;
            let i3 = this.getProcessedData();
            this.cropped = i3.cropped, this.cropStart = i3.cropStart, this.processedXData = i3.xData, this.processedYData = i3.yData, this.closestPointRange = this.basePointRange = i3.closestPointRange, L(this, "afterProcessData");
          }
          cropData(t3, e3, i3, s2) {
            let r2 = t3.length, o2, n2, a2 = 0, h2 = r2;
            for (o2 = 0; o2 < r2; o2++) if (t3[o2] >= i3) {
              a2 = Math.max(0, o2 - 1);
              break;
            }
            for (n2 = o2; n2 < r2; n2++) if (t3[n2] > s2) {
              h2 = n2 + 1;
              break;
            }
            return { xData: t3.slice(a2, h2), yData: e3.slice(a2, h2), start: a2, end: h2 };
          }
          generatePoints() {
            let t3 = this.options, e3 = this.processedData || t3.data, i3 = this.processedXData, s2 = this.processedYData, r2 = this.pointClass, o2 = i3.length, n2 = this.cropStart || 0, a2 = this.hasGroupedData, h2 = t3.keys, l2 = [], d2 = t3.dataGrouping && t3.dataGrouping.groupAll ? n2 : 0, c2, p2, u2, g2, f2 = this.data;
            if (!f2 && !a2) {
              let t4 = [];
              t4.length = e3.length, f2 = this.data = t4;
            }
            for (h2 && a2 && (this.options.keys = false), g2 = 0; g2 < o2; g2++) p2 = n2 + g2, a2 ? ((u2 = new r2(this, [i3[g2]].concat(G(s2[g2])))).dataGroup = this.groupMap[d2 + g2], u2.dataGroup.options && (u2.options = u2.dataGroup.options, A(u2, u2.dataGroup.options), delete u2.dataLabels)) : (u2 = f2[p2]) || void 0 === e3[p2] || (f2[p2] = u2 = new r2(this, e3[p2], i3[g2])), u2 && (u2.index = a2 ? d2 + g2 : p2, l2[g2] = u2);
            if (this.options.keys = h2, f2 && (o2 !== (c2 = f2.length) || a2)) for (g2 = 0; g2 < c2; g2++) g2 !== n2 || a2 || (g2 += o2), f2[g2] && (f2[g2].destroyElements(), f2[g2].plotX = void 0);
            this.data = f2, this.points = l2, L(this, "afterGeneratePoints");
          }
          getXExtremes(t3) {
            return { min: y(t3), max: x(t3) };
          }
          getExtremes(t3, e3) {
            let i3 = this.xAxis, s2 = this.yAxis, r2 = [], o2 = this.requireSorting && !this.is("column") ? 1 : 0, n2 = !!s2 && s2.positiveValuesOnly, a2 = e3 || this.getExtremesFromAll || this.options.getExtremesFromAll, { processedXData: h2, processedYData: l2 } = this, d2, c2, p2, u2, g2, f2, m2, b2 = 0, v2 = 0, S2 = 0;
            if (this.cropped && a2) {
              let t4 = this.getProcessedData(true);
              h2 = t4.xData, l2 = t4.yData;
            }
            let C2 = (t3 = t3 || this.stackedYData || l2 || []).length, k2 = h2 || this.xData;
            for (i3 && (b2 = (d2 = i3.getExtremes()).min, v2 = d2.max), f2 = 0; f2 < C2; f2++) if (u2 = k2[f2], c2 = (j(g2 = t3[f2]) || I(g2)) && ((j(g2) ? g2 > 0 : g2.length) || !n2), p2 = e3 || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !i3 || (k2[f2 + o2] || u2) >= b2 && (k2[f2 - o2] || u2) <= v2, c2 && p2) {
              if (m2 = g2.length) for (; m2--; ) j(g2[m2]) && (r2[S2++] = g2[m2]);
              else r2[S2++] = g2;
            }
            let M2 = { activeYData: r2, dataMin: y(r2), dataMax: x(r2) };
            return L(this, "afterGetExtremes", { dataExtremes: M2 }), M2;
          }
          applyExtremes() {
            let t3 = this.getExtremes();
            return this.dataMin = t3.dataMin, this.dataMax = t3.dataMax, t3;
          }
          getFirstValidPoint(t3, e3 = 0, i3 = 1) {
            let s2 = t3.length, r2 = e3;
            for (; r2 >= 0 && r2 < s2; ) {
              if (C(t3[r2])) return t3[r2];
              r2 += i3;
            }
          }
          translate() {
            var _a;
            this.processedXData || this.processData(), this.generatePoints();
            let t3 = this.options, e3 = t3.stacking, i3 = this.xAxis, s2 = i3.categories, r2 = this.enabledDataSorting, o2 = this.yAxis, n2 = this.points, a2 = n2.length, h2 = this.pointPlacementToXValue(), l2 = !!h2, d2 = t3.threshold, c2 = t3.startFromThreshold ? d2 : 0, p2, u2, g2, f2, m2 = Number.MAX_VALUE;
            function x2(t4) {
              return b(t4, -1e9, 1e9);
            }
            for (p2 = 0; p2 < a2; p2++) {
              let t4;
              let a3 = n2[p2], y2 = a3.x, b2, S2, k2 = a3.y, M2 = a3.low, w2 = e3 && ((_a = o2.stacking) == null ? void 0 : _a.stacks[(this.negStacks && k2 < (c2 ? 0 : d2) ? "-" : "") + this.stackKey]);
              u2 = i3.translate(y2, false, false, false, true, h2), a3.plotX = j(u2) ? v(x2(u2)) : void 0, e3 && this.visible && w2 && w2[y2] && (f2 = this.getStackIndicator(f2, y2, this.index), !a3.isNull && f2.key && (S2 = (b2 = w2[y2]).points[f2.key]), b2 && I(S2) && (M2 = S2[0], k2 = S2[1], M2 === c2 && f2.key === w2[y2].base && (M2 = N(j(d2) ? d2 : o2.min)), o2.positiveValuesOnly && C(M2) && M2 <= 0 && (M2 = void 0), a3.total = a3.stackTotal = N(b2.total), a3.percentage = C(a3.y) && b2.total ? a3.y / b2.total * 100 : void 0, a3.stackY = k2, this.irregularWidths || b2.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis))), a3.yBottom = C(M2) ? x2(o2.translate(M2, false, true, false, true)) : void 0, this.dataModify && (k2 = this.dataModify.modifyValue(k2, p2)), j(k2) && void 0 !== a3.plotX && (t4 = j(t4 = o2.translate(k2, false, true, false, true)) ? x2(t4) : void 0), a3.plotY = t4, a3.isInside = this.isPointInside(a3), a3.clientX = l2 ? v(i3.translate(y2, false, false, false, true, h2)) : u2, a3.negative = (a3.y || 0) < (d2 || 0), a3.category = N(s2 && s2[a3.x], a3.x), a3.isNull || false === a3.visible || (void 0 !== g2 && (m2 = Math.min(m2, Math.abs(u2 - g2))), g2 = u2), a3.zone = this.zones.length ? a3.getZone() : void 0, !a3.graphic && this.group && r2 && (a3.isNew = true);
            }
            this.closestPointRangePx = m2, L(this, "afterTranslate");
          }
          getValidPoints(t3, e3, i3) {
            let s2 = this.chart;
            return (t3 || this.points || []).filter(function(t4) {
              let { plotX: r2, plotY: o2 } = t4;
              return !!((i3 || !t4.isNull && j(o2)) && (!e3 || s2.isInsidePlot(r2, o2, { inverted: s2.inverted }))) && false !== t4.visible;
            });
          }
          getClipBox() {
            let { chart: t3, xAxis: e3, yAxis: i3 } = this, { x: s2, y: r2, width: o2, height: n2 } = R(t3.clipBox);
            return e3 && e3.len !== t3.plotSizeX && (o2 = e3.len), i3 && i3.len !== t3.plotSizeY && (n2 = i3.len), t3.inverted && !this.invertible && ([o2, n2] = [n2, o2]), { x: s2, y: r2, width: o2, height: n2 };
          }
          getSharedClipKey() {
            return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0), this.sharedClipKey;
          }
          setClip() {
            let { chart: t3, group: e3, markerGroup: i3 } = this, s2 = t3.sharedClips, r2 = t3.renderer, o2 = this.getClipBox(), n2 = this.getSharedClipKey(), a2 = s2[n2];
            a2 ? a2.animate(o2) : s2[n2] = a2 = r2.clipRect(o2), e3 && e3.clip(false === this.options.clip ? void 0 : a2), i3 && i3.clip();
          }
          animate(t3) {
            let { chart: e3, group: i3, markerGroup: s2 } = this, r2 = e3.inverted, o2 = d(this.options.animation), n2 = [this.getSharedClipKey(), o2.duration, o2.easing, o2.defer].join(","), a2 = e3.sharedClips[n2], h2 = e3.sharedClips[n2 + "m"];
            if (t3 && i3) {
              let t4 = this.getClipBox();
              if (a2) a2.attr("height", t4.height);
              else {
                t4.width = 0, r2 && (t4.x = e3.plotHeight), a2 = e3.renderer.clipRect(t4), e3.sharedClips[n2] = a2;
                let i4 = { x: -99, y: -99, width: r2 ? e3.plotWidth + 199 : 99, height: r2 ? 99 : e3.plotHeight + 199 };
                h2 = e3.renderer.clipRect(i4), e3.sharedClips[n2 + "m"] = h2;
              }
              i3.clip(a2), s2 == null ? void 0 : s2.clip(h2);
            } else if (a2 && !a2.hasClass("highcharts-animating")) {
              let t4 = this.getClipBox(), i4 = o2.step;
              ((s2 == null ? void 0 : s2.element.childNodes.length) || e3.series.length > 1) && (o2.step = function(t5, e4) {
                i4 && i4.apply(e4, arguments), "width" === e4.prop && (h2 == null ? void 0 : h2.element) && h2.attr(r2 ? "height" : "width", t5 + 99);
              }), a2.addClass("highcharts-animating").animate(t4, o2);
            }
          }
          afterAnimate() {
            this.setClip(), z(this.chart.sharedClips, (t3, e3, i3) => {
              t3 && !this.chart.container.querySelector(`[clip-path="url(#${t3.id})"]`) && (t3.destroy(), delete i3[e3]);
            }), this.finishedAnimating = true, L(this, "afterAnimate");
          }
          drawPoints(t3 = this.points) {
            let e3, i3, s2, r2, o2, n2, a2;
            let h2 = this.chart, l2 = h2.styledMode, { colorAxis: d2, options: c2 } = this, p2 = c2.marker, u2 = this[this.specialGroup || "markerGroup"], g2 = this.xAxis, f2 = N(p2.enabled, !g2 || !!g2.isRadial || null, this.closestPointRangePx >= p2.enabledThreshold * p2.radius);
            if (false !== p2.enabled || this._hasPointMarkers) for (e3 = 0; e3 < t3.length; e3++) if (r2 = (s2 = (i3 = t3[e3]).graphic) ? "animate" : "attr", o2 = i3.marker || {}, n2 = !!i3.marker, (f2 && void 0 === o2.enabled || o2.enabled) && !i3.isNull && false !== i3.visible) {
              let t4 = N(o2.symbol, this.symbol, "rect");
              a2 = this.markerAttribs(i3, i3.selected && "select"), this.enabledDataSorting && (i3.startXPos = g2.reversed ? -(a2.width || 0) : g2.width);
              let e4 = false !== i3.isInside;
              if (!s2 && e4 && ((a2.width || 0) > 0 || i3.hasImage) && (i3.graphic = s2 = h2.renderer.symbol(t4, a2.x, a2.y, a2.width, a2.height, n2 ? o2 : p2).add(u2), this.enabledDataSorting && h2.hasRendered && (s2.attr({ x: i3.startXPos }), r2 = "animate")), s2 && "animate" === r2 && s2[e4 ? "show" : "hide"](e4).animate(a2), s2) {
                let t5 = this.pointAttribs(i3, l2 || !i3.selected ? void 0 : "select");
                l2 ? d2 && s2.css({ fill: t5.fill }) : s2[r2](t5);
              }
              s2 && s2.addClass(i3.getClassName(), true);
            } else s2 && (i3.graphic = s2.destroy());
          }
          markerAttribs(t3, e3) {
            let i3 = this.options, s2 = i3.marker, r2 = t3.marker || {}, o2 = r2.symbol || s2.symbol, n2 = {}, a2, h2, l2 = N(r2.radius, s2 && s2.radius);
            e3 && (a2 = s2.states[e3], l2 = N((h2 = r2.states && r2.states[e3]) && h2.radius, a2 && a2.radius, l2 && l2 + (a2 && a2.radiusPlus || 0))), t3.hasImage = o2 && 0 === o2.indexOf("url"), t3.hasImage && (l2 = 0);
            let d2 = t3.pos();
            return j(l2) && d2 && (i3.crisp && (d2[0] = S(d2[0], t3.hasImage ? 0 : "rect" === o2 ? (s2 == null ? void 0 : s2.lineWidth) || 0 : 1)), n2.x = d2[0] - l2, n2.y = d2[1] - l2), l2 && (n2.width = n2.height = 2 * l2), n2;
          }
          pointAttribs(t3, e3) {
            let i3 = this.options.marker, s2 = t3 && t3.options, r2 = s2 && s2.marker || {}, o2 = s2 && s2.color, n2 = t3 && t3.color, a2 = t3 && t3.zone && t3.zone.color, h2, l2, d2 = this.color, c2, p2, u2 = N(r2.lineWidth, i3.lineWidth), g2 = 1;
            return d2 = o2 || a2 || n2 || d2, c2 = r2.fillColor || i3.fillColor || d2, p2 = r2.lineColor || i3.lineColor || d2, e3 = e3 || "normal", h2 = i3.states[e3] || {}, u2 = N((l2 = r2.states && r2.states[e3] || {}).lineWidth, h2.lineWidth, u2 + N(l2.lineWidthPlus, h2.lineWidthPlus, 0)), c2 = l2.fillColor || h2.fillColor || c2, { stroke: p2 = l2.lineColor || h2.lineColor || p2, "stroke-width": u2, fill: c2, opacity: g2 = N(l2.opacity, h2.opacity, g2) };
          }
          destroy(t3) {
            let e3, i3, s2;
            let r2 = this, o2 = r2.chart, n2 = /AppleWebKit\/533/.test(f.navigator.userAgent), a2 = r2.data || [];
            for (L(r2, "destroy", { keepEventsForUpdate: t3 }), this.removeEvents(t3), (r2.axisTypes || []).forEach(function(t4) {
              (s2 = r2[t4]) && s2.series && (w(s2.series, r2), s2.isDirty = s2.forceRedraw = true);
            }), r2.legendItem && r2.chart.legend.destroyItem(r2), e3 = a2.length; e3--; ) (i3 = a2[e3]) && i3.destroy && i3.destroy();
            for (let t4 of r2.zones) k(t4, void 0, true);
            l.clearTimeout(r2.animationTimeout), z(r2, function(t4, e4) {
              t4 instanceof h && !t4.survive && t4[n2 && "group" === e4 ? "hide" : "destroy"]();
            }), o2.hoverSeries === r2 && (o2.hoverSeries = void 0), w(o2.series, r2), o2.orderItems("series"), z(r2, function(e4, i4) {
              t3 && "hcEvents" === i4 || delete r2[i4];
            });
          }
          applyZones() {
            let { area: t3, chart: e3, graph: i3, zones: s2, points: r2, xAxis: o2, yAxis: n2, zoneAxis: a2 } = this, { inverted: h2, renderer: l2 } = e3, d2 = this[`${a2}Axis`], { isXAxis: c2, len: p2 = 0 } = d2 || {}, u2 = ((i3 == null ? void 0 : i3.strokeWidth()) || 0) / 2 + 1, g2 = (t4, e4 = 0, i4 = 0) => {
              h2 && (i4 = p2 - i4);
              let { translated: s3 = 0, lineClip: r3 } = t4, o3 = i4 - s3;
              r3 == null ? void 0 : r3.push(["L", e4, Math.abs(o3) < u2 ? i4 - u2 * (o3 <= 0 ? -1 : 1) : s3]);
            };
            if (s2.length && (i3 || t3) && d2 && j(d2.min)) {
              let e4 = d2.getExtremes().max, u3 = (t4) => {
                t4.forEach((e5, i4) => {
                  ("M" === e5[0] || "L" === e5[0]) && (t4[i4] = [e5[0], c2 ? p2 - e5[1] : e5[1], c2 ? e5[2] : p2 - e5[2]]);
                });
              };
              if (s2.forEach((t4) => {
                t4.lineClip = [], t4.translated = b(d2.toPixels(N(t4.value, e4), true) || 0, 0, p2);
              }), i3 && !this.showLine && i3.hide(), t3 && t3.hide(), "y" === a2 && r2.length < o2.len) for (let t4 of r2) {
                let { plotX: e5, plotY: i4, zone: r3 } = t4, o3 = r3 && s2[s2.indexOf(r3) - 1];
                r3 && g2(r3, e5, i4), o3 && g2(o3, e5, i4);
              }
              let f2 = [], m2 = d2.toPixels(d2.getExtremes().min, true);
              s2.forEach((e5) => {
                var _a, _b;
                let s3 = e5.lineClip || [], r3 = Math.round(e5.translated || 0);
                o2.reversed && s3.reverse();
                let { clip: a3, simpleClip: d3 } = e5, p3 = 0, g3 = 0, x2 = o2.len, y2 = n2.len;
                c2 ? (p3 = r3, x2 = m2) : (g3 = r3, y2 = m2);
                let b2 = [["M", p3, g3], ["L", x2, g3], ["L", x2, y2], ["L", p3, y2], ["Z"]], v2 = [b2[0], ...s3, b2[1], b2[2], ...f2, b2[3], b2[4]];
                f2 = s3.reverse(), m2 = r3, h2 && (u3(v2), t3 && u3(b2)), a3 ? (a3.animate({ d: v2 }), d3 == null ? void 0 : d3.animate({ d: b2 })) : (a3 = e5.clip = l2.path(v2), t3 && (d3 = e5.simpleClip = l2.path(b2))), i3 && ((_a = e5.graph) == null ? void 0 : _a.clip(a3)), t3 && ((_b = e5.area) == null ? void 0 : _b.clip(d3));
              });
            } else this.visible && (i3 && i3.show(), t3 && t3.show());
          }
          plotGroup(t3, e3, i3, s2, r2) {
            let o2 = this[t3], n2 = !o2, a2 = { visibility: i3, zIndex: s2 || 0.1 };
            return C(this.opacity) && !this.chart.styledMode && "inactive" !== this.state && (a2.opacity = this.opacity), o2 || (this[t3] = o2 = this.chart.renderer.g().add(r2)), o2.addClass("highcharts-" + e3 + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (C(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (o2.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), true), o2.attr(a2)[n2 ? "attr" : "animate"](this.getPlotBox(e3)), o2;
          }
          getPlotBox(t3) {
            let e3 = this.xAxis, i3 = this.yAxis, s2 = this.chart, r2 = s2.inverted && !s2.polar && e3 && this.invertible && "series" === t3;
            return s2.inverted && (e3 = i3, i3 = this.xAxis), { translateX: e3 ? e3.left : s2.plotLeft, translateY: i3 ? i3.top : s2.plotTop, rotation: r2 ? 90 : 0, rotationOriginX: r2 ? (e3.len - i3.len) / 2 : 0, rotationOriginY: r2 ? (e3.len + i3.len) / 2 : 0, scaleX: r2 ? -1 : 1, scaleY: 1 };
          }
          removeEvents(t3) {
            let { eventsToUnbind: e3 } = this;
            t3 || W(this), e3.length && (e3.forEach((t4) => {
              t4();
            }), e3.length = 0);
          }
          render() {
            var _a, _b, _c, _d, _e;
            let t3 = this, { chart: e3, options: i3, hasRendered: s2 } = t3, r2 = d(i3.animation), o2 = t3.visible ? "inherit" : "hidden", n2 = i3.zIndex, a2 = e3.seriesGroup, h2 = t3.finishedAnimating ? 0 : r2.duration;
            L(this, "render"), t3.plotGroup("group", "series", o2, n2, a2), t3.markerGroup = t3.plotGroup("markerGroup", "markers", o2, n2, a2), false !== i3.clip && t3.setClip(), h2 && ((_a = t3.animate) == null ? void 0 : _a.call(t3, true)), t3.drawGraph && (t3.drawGraph(), t3.applyZones()), t3.visible && t3.drawPoints(), (_b = t3.drawDataLabels) == null ? void 0 : _b.call(t3), (_c = t3.redrawPoints) == null ? void 0 : _c.call(t3), i3.enableMouseTracking && ((_d = t3.drawTracker) == null ? void 0 : _d.call(t3)), h2 && ((_e = t3.animate) == null ? void 0 : _e.call(t3)), s2 || (h2 && r2.defer && (h2 += r2.defer), t3.animationTimeout = H(() => {
              t3.afterAnimate();
            }, h2 || 0)), t3.isDirty = false, t3.hasRendered = true, L(t3, "afterRender");
          }
          redraw() {
            let t3 = this.isDirty || this.isDirtyData;
            this.translate(), this.render(), t3 && delete this.kdTree;
          }
          reserveSpace() {
            return this.visible || !this.chart.options.chart.ignoreHiddenSeries;
          }
          searchPoint(t3, e3) {
            let { xAxis: i3, yAxis: s2 } = this, r2 = this.chart.inverted;
            return this.searchKDTree({ clientX: r2 ? i3.len - t3.chartY + i3.pos : t3.chartX - i3.pos, plotY: r2 ? s2.len - t3.chartX + s2.pos : t3.chartY - s2.pos }, e3, t3);
          }
          buildKDTree(t3) {
            this.buildingKdTree = true;
            let e3 = this, i3 = e3.options.findNearestPointBy.indexOf("y") > -1 ? 2 : 1;
            delete e3.kdTree, H(function() {
              e3.kdTree = function t4(i4, s2, r2) {
                let o2, n2;
                let a2 = i4 == null ? void 0 : i4.length;
                if (a2) return o2 = e3.kdAxisArray[s2 % r2], i4.sort((t5, e4) => (t5[o2] || 0) - (e4[o2] || 0)), { point: i4[n2 = Math.floor(a2 / 2)], left: t4(i4.slice(0, n2), s2 + 1, r2), right: t4(i4.slice(n2 + 1), s2 + 1, r2) };
              }(e3.getValidPoints(void 0, !e3.directTouch), i3, i3), e3.buildingKdTree = false;
            }, e3.options.kdNow || (t3 == null ? void 0 : t3.type) === "touchstart" ? 0 : 1);
          }
          searchKDTree(t3, e3, i3) {
            let s2 = this, [r2, o2] = this.kdAxisArray, n2 = e3 ? "distX" : "dist", a2 = (s2.options.findNearestPointBy || "").indexOf("y") > -1 ? 2 : 1, h2 = !!s2.isBubble;
            if (this.kdTree || this.buildingKdTree || this.buildKDTree(i3), this.kdTree) return function t4(e4, i4, a3, l2) {
              var _a;
              let d2 = i4.point, c2 = s2.kdAxisArray[a3 % l2], p2, u2, g2 = d2;
              !function(t5, e5) {
                var _a2;
                let i5 = t5[r2], s3 = e5[r2], n3 = C(i5) && C(s3) ? i5 - s3 : null, a4 = t5[o2], l3 = e5[o2], d3 = C(a4) && C(l3) ? a4 - l3 : 0, c3 = h2 && ((_a2 = e5.marker) == null ? void 0 : _a2.radius) || 0;
                e5.dist = Math.sqrt((n3 && n3 * n3 || 0) + d3 * d3) - c3, e5.distX = C(n3) ? Math.abs(n3) - c3 : Number.MAX_VALUE;
              }(e4, d2);
              let f2 = (e4[c2] || 0) - (d2[c2] || 0) + (h2 && ((_a = d2.marker) == null ? void 0 : _a.radius) || 0), m2 = f2 < 0 ? "left" : "right", x2 = f2 < 0 ? "right" : "left";
              return i4[m2] && (g2 = (p2 = t4(e4, i4[m2], a3 + 1, l2))[n2] < g2[n2] ? p2 : d2), i4[x2] && Math.sqrt(f2 * f2) < g2[n2] && (g2 = (u2 = t4(e4, i4[x2], a3 + 1, l2))[n2] < g2[n2] ? u2 : g2), g2;
            }(t3, this.kdTree, a2, a2);
          }
          pointPlacementToXValue() {
            let { options: t3, xAxis: e3 } = this, i3 = t3.pointPlacement;
            return "between" === i3 && (i3 = e3.reversed ? -0.5 : 0.5), j(i3) ? i3 * (t3.pointRange || e3.pointRange) : 0;
          }
          isPointInside(t3) {
            let { chart: e3, xAxis: i3, yAxis: s2 } = this, { plotX: r2 = -1, plotY: o2 = -1 } = t3;
            return o2 >= 0 && o2 <= (s2 ? s2.len : e3.plotHeight) && r2 >= 0 && r2 <= (i3 ? i3.len : e3.plotWidth);
          }
          drawTracker() {
            var _a;
            let t3 = this, e3 = t3.options, i3 = e3.trackByArea, s2 = [].concat((i3 ? t3.areaPath : t3.graphPath) || []), r2 = t3.chart, o2 = r2.pointer, n2 = r2.renderer, a2 = ((_a = r2.options.tooltip) == null ? void 0 : _a.snap) || 0, h2 = () => {
              e3.enableMouseTracking && r2.hoverSeries !== t3 && t3.onMouseOver();
            }, l2 = "rgba(192,192,192," + (g ? 1e-4 : 2e-3) + ")", d2 = t3.tracker;
            d2 ? d2.attr({ d: s2 }) : t3.graph && (t3.tracker = d2 = n2.path(s2).attr({ visibility: t3.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(i3 ? "highcharts-tracker-area" : "highcharts-tracker-line").add(t3.group), r2.styledMode || d2.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: l2, fill: i3 ? l2 : "none", "stroke-width": t3.graph.strokeWidth() + (i3 ? 0 : 2 * a2) }), [t3.tracker, t3.markerGroup, t3.dataLabelsGroup].forEach((t4) => {
              t4 && (t4.addClass("highcharts-tracker").on("mouseover", h2).on("mouseout", (t5) => {
                o2 == null ? void 0 : o2.onTrackerMouseOut(t5);
              }), e3.cursor && !r2.styledMode && t4.css({ cursor: e3.cursor }), t4.on("touchstart", h2));
            })), L(this, "afterDrawTracker");
          }
          addPoint(t3, e3, i3, s2, r2) {
            let o2, n2;
            let a2 = this.options, h2 = this.data, l2 = this.chart, d2 = this.xAxis, c2 = d2 && d2.hasNames && d2.names, p2 = a2.data, u2 = this.xData;
            e3 = N(e3, true);
            let g2 = { series: this };
            this.pointClass.prototype.applyOptions.apply(g2, [t3]);
            let f2 = g2.x;
            if (n2 = u2.length, this.requireSorting && f2 < u2[n2 - 1]) for (o2 = true; n2 && u2[n2 - 1] > f2; ) n2--;
            this.updateParallelArrays(g2, "splice", [n2, 0, 0]), this.updateParallelArrays(g2, n2), c2 && g2.name && (c2[f2] = g2.name), p2.splice(n2, 0, t3), (o2 || this.processedData) && (this.data.splice(n2, 0, null), this.processData()), "point" === a2.legendType && this.generatePoints(), i3 && (h2[0] && h2[0].remove ? h2[0].remove(false) : (h2.shift(), this.updateParallelArrays(g2, "shift"), p2.shift())), false !== r2 && L(this, "addPoint", { point: g2 }), this.isDirty = true, this.isDirtyData = true, e3 && l2.redraw(s2);
          }
          removePoint(t3, e3, i3) {
            let s2 = this, r2 = s2.data, o2 = r2[t3], n2 = s2.points, a2 = s2.chart, h2 = function() {
              n2 && n2.length === r2.length && n2.splice(t3, 1), r2.splice(t3, 1), s2.options.data.splice(t3, 1), s2.updateParallelArrays(o2 || { series: s2 }, "splice", [t3, 1]), o2 && o2.destroy(), s2.isDirty = true, s2.isDirtyData = true, e3 && a2.redraw();
            };
            c(i3, a2), e3 = N(e3, true), o2 ? o2.firePointEvent("remove", null, h2) : h2();
          }
          remove(t3, e3, i3, s2) {
            let r2 = this, o2 = r2.chart;
            function n2() {
              r2.destroy(s2), o2.isDirtyLegend = o2.isDirtyBox = true, o2.linkSeries(s2), N(t3, true) && o2.redraw(e3);
            }
            false !== i3 ? L(r2, "remove", null, n2) : n2();
          }
          update(t3, e3) {
            var _a, _b, _c;
            L(this, "update", { options: t3 = M(t3, this.userOptions) });
            let i3 = this, s2 = i3.chart, r2 = i3.userOptions, o2 = i3.initialType || i3.type, n2 = s2.options.plotOptions, a2 = m[o2].prototype, h2 = i3.finishedAnimating && { animation: false }, l2 = {}, d2, c2, p2 = ["colorIndex", "eventOptions", "navigatorSeries", "symbolIndex", "baseSeries"], u2 = t3.type || r2.type || s2.options.chart.type, g2 = !(this.hasDerivedData || u2 && u2 !== this.type || void 0 !== t3.pointStart || void 0 !== t3.pointInterval || void 0 !== t3.relativeXValue || t3.joinBy || t3.mapData || ["dataGrouping", "pointStart", "pointInterval", "pointIntervalUnit", "keys"].some((t4) => i3.hasOptionChanged(t4)));
            u2 = u2 || o2, g2 && (p2.push("data", "isDirtyData", "isDirtyCanvas", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "hasDataLabels", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX", "transformGroups"), false !== t3.visible && p2.push("area", "graph"), i3.parallelArrays.forEach(function(t4) {
              p2.push(t4 + "Data");
            }), t3.data && (t3.dataSorting && A(i3.options.dataSorting, t3.dataSorting), this.setData(t3.data, false))), t3 = R(r2, { index: void 0 === r2.index ? i3.index : r2.index, pointStart: ((_a = n2 == null ? void 0 : n2.series) == null ? void 0 : _a.pointStart) ?? r2.pointStart ?? ((_b = i3.xData) == null ? void 0 : _b[0]) }, !g2 && { data: i3.options.data }, t3, h2), g2 && t3.data && (t3.data = i3.options.data), (p2 = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(p2)).forEach(function(t4) {
              p2[t4] = i3[t4], delete i3[t4];
            });
            let f2 = false;
            if (m[u2]) {
              if (f2 = u2 !== i3.type, i3.remove(false, false, false, true), f2) {
                if (s2.propFromSeries(), Object.setPrototypeOf) Object.setPrototypeOf(i3, m[u2].prototype);
                else {
                  let t4 = Object.hasOwnProperty.call(i3, "hcEvents") && i3.hcEvents;
                  for (c2 in a2) i3[c2] = void 0;
                  A(i3, m[u2].prototype), t4 ? i3.hcEvents = t4 : delete i3.hcEvents;
                }
              }
            } else T(17, true, s2, { missingModuleFor: u2 });
            if (p2.forEach(function(t4) {
              i3[t4] = p2[t4];
            }), i3.init(s2, t3), g2 && this.points) for (let t4 of (false === (d2 = i3.options).visible ? (l2.graphic = 1, l2.dataLabel = 1) : (this.hasMarkerChanged(d2, r2) && (l2.graphic = 1), ((_c = i3.hasDataLabels) == null ? void 0 : _c.call(i3)) || (l2.dataLabel = 1)), this.points)) t4 && t4.series && (t4.resolveColor(), Object.keys(l2).length && t4.destroyElements(l2), false === d2.showInLegend && t4.legendItem && s2.legend.destroyItem(t4));
            i3.initialType = o2, s2.linkSeries(), s2.setSortedData(), f2 && i3.linkedSeries.length && (i3.isDirtyData = true), L(this, "afterUpdate"), N(e3, true) && s2.redraw(!!g2 && void 0);
          }
          setName(t3) {
            this.name = this.options.name = this.userOptions.name = t3, this.chart.isDirtyLegend = true;
          }
          hasOptionChanged(t3) {
            var _a, _b;
            let e3 = this.chart, i3 = this.options[t3], s2 = e3.options.plotOptions, r2 = this.userOptions[t3], o2 = N((_a = s2 == null ? void 0 : s2[this.type]) == null ? void 0 : _a[t3], (_b = s2 == null ? void 0 : s2.series) == null ? void 0 : _b[t3]);
            return r2 && !C(o2) ? i3 !== r2 : i3 !== N(o2, i3);
          }
          onMouseOver() {
            let t3 = this.chart, e3 = t3.hoverSeries, i3 = t3.pointer;
            i3 == null ? void 0 : i3.setHoverChartIndex(), e3 && e3 !== this && e3.onMouseOut(), this.options.events.mouseOver && L(this, "mouseOver"), this.setState("hover"), t3.hoverSeries = this;
          }
          onMouseOut() {
            let t3 = this.options, e3 = this.chart, i3 = e3.tooltip, s2 = e3.hoverPoint;
            e3.hoverSeries = null, s2 && s2.onMouseOut(), this && t3.events.mouseOut && L(this, "mouseOut"), i3 && !this.stickyTracking && (!i3.shared || this.noSharedTooltip) && i3.hide(), e3.series.forEach(function(t4) {
              t4.setState("", true);
            });
          }
          setState(t3, e3) {
            let i3 = this, s2 = i3.options, r2 = i3.graph, o2 = s2.inactiveOtherPoints, n2 = s2.states, a2 = N(n2[t3 || "normal"] && n2[t3 || "normal"].animation, i3.chart.options.chart.animation), h2 = s2.lineWidth, l2 = s2.opacity;
            if (t3 = t3 || "", i3.state !== t3 && ([i3.group, i3.markerGroup, i3.dataLabelsGroup].forEach(function(e4) {
              e4 && (i3.state && e4.removeClass("highcharts-series-" + i3.state), t3 && e4.addClass("highcharts-series-" + t3));
            }), i3.state = t3, !i3.chart.styledMode)) {
              if (n2[t3] && false === n2[t3].enabled) return;
              if (t3 && (h2 = n2[t3].lineWidth || h2 + (n2[t3].lineWidthPlus || 0), l2 = N(n2[t3].opacity, l2)), r2 && !r2.dashstyle && j(h2)) for (let t4 of [r2, ...this.zones.map((t5) => t5.graph)]) t4 == null ? void 0 : t4.animate({ "stroke-width": h2 }, a2);
              o2 || [i3.group, i3.markerGroup, i3.dataLabelsGroup, i3.labelBySeries].forEach(function(t4) {
                t4 && t4.animate({ opacity: l2 }, a2);
              });
            }
            e3 && o2 && i3.points && i3.setAllPointsToState(t3 || void 0);
          }
          setAllPointsToState(t3) {
            this.points.forEach(function(e3) {
              e3.setState && e3.setState(t3);
            });
          }
          setVisible(t3, e3) {
            var _a;
            let i3 = this, s2 = i3.chart, r2 = s2.options.chart.ignoreHiddenSeries, o2 = i3.visible;
            i3.visible = t3 = i3.options.visible = i3.userOptions.visible = void 0 === t3 ? !o2 : t3;
            let n2 = t3 ? "show" : "hide";
            ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach((t4) => {
              var _a2;
              (_a2 = i3[t4]) == null ? void 0 : _a2[n2]();
            }), (s2.hoverSeries === i3 || ((_a = s2.hoverPoint) == null ? void 0 : _a.series) === i3) && i3.onMouseOut(), i3.legendItem && s2.legend.colorizeItem(i3, t3), i3.isDirty = true, i3.options.stacking && s2.series.forEach((t4) => {
              t4.options.stacking && t4.visible && (t4.isDirty = true);
            }), i3.linkedSeries.forEach((e4) => {
              e4.setVisible(t3, false);
            }), r2 && (s2.isDirtyBox = true), L(i3, n2), false !== e3 && s2.redraw();
          }
          show() {
            this.setVisible(true);
          }
          hide() {
            this.setVisible(false);
          }
          select(t3) {
            this.selected = t3 = this.options.selected = void 0 === t3 ? !this.selected : t3, this.checkbox && (this.checkbox.checked = t3), L(this, t3 ? "select" : "unselect");
          }
          shouldShowTooltip(t3, e3, i3 = {}) {
            return i3.series = this, i3.visiblePlotOnly = true, this.chart.isInsidePlot(t3, e3, i3);
          }
          drawLegendSymbol(t3, e3) {
            var _a;
            (_a = r[this.options.legendSymbol || "rectangle"]) == null ? void 0 : _a.call(this, t3, e3);
          }
        }
        return X.defaultOptions = n, X.types = a.seriesTypes, X.registerType = a.registerSeriesType, A(X.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, directTouch: false, invertible: true, isCartesian: true, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: o, requireSorting: true, sorted: true }), a.series = X, X;
      }), i(e, "Core/Legend/Legend.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/Point.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Templating.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o, n, a) {
        var h;
        let { animObject: l, setAnimation: d } = t2, { registerEventOptions: c } = e2, { composed: p, marginNames: u } = i2, { distribute: g } = o, { format: f } = n, { addEvent: m, createElement: x, css: y, defined: b, discardElement: v, find: S, fireEvent: C, isNumber: k, merge: M, pick: w, pushUnique: T, relativeLength: A, stableSort: P, syncTimeout: L } = a;
        class O {
          constructor(t3, e3) {
            this.allItems = [], this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.padding = 0, this.pages = [], this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = t3, this.setOptions(e3), e3.enabled && (this.render(), c(this, e3), m(this.chart, "endResize", function() {
              this.legend.positionCheckboxes();
            })), m(this.chart, "render", () => {
              this.options.enabled && this.proximate && (this.proximatePositions(), this.positionItems());
            });
          }
          setOptions(t3) {
            let e3 = w(t3.padding, 8);
            this.options = t3, this.chart.styledMode || (this.itemStyle = t3.itemStyle, this.itemHiddenStyle = M(this.itemStyle, t3.itemHiddenStyle)), this.itemMarginTop = t3.itemMarginTop, this.itemMarginBottom = t3.itemMarginBottom, this.padding = e3, this.initialItemY = e3 - 5, this.symbolWidth = w(t3.symbolWidth, 16), this.pages = [], this.proximate = "proximate" === t3.layout && !this.chart.inverted, this.baseline = void 0;
          }
          update(t3, e3) {
            let i3 = this.chart;
            this.setOptions(M(true, this.options, t3)), "events" in this.options && c(this, this.options), this.destroy(), i3.isDirtyLegend = i3.isDirtyBox = true, w(e3, true) && i3.redraw(), C(this, "afterUpdate", { redraw: e3 });
          }
          colorizeItem(t3, e3) {
            let { area: i3, group: s2, label: r2, line: o2, symbol: n2 } = t3.legendItem || {};
            if (s2 == null ? void 0 : s2[e3 ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), !this.chart.styledMode) {
              let { itemHiddenStyle: s3 = {} } = this, a2 = s3.color, { fillColor: h2, fillOpacity: l2, lineColor: d2, marker: c2 } = t3.options, p2 = (t4) => (!e3 && (t4.fill && (t4.fill = a2), t4.stroke && (t4.stroke = a2)), t4);
              r2 == null ? void 0 : r2.css(M(e3 ? this.itemStyle : s3)), o2 == null ? void 0 : o2.attr(p2({ stroke: d2 || t3.color })), n2 && n2.attr(p2(c2 && n2.isMarker ? t3.pointAttribs() : { fill: t3.color })), i3 == null ? void 0 : i3.attr(p2({ fill: h2 || t3.color, "fill-opacity": h2 ? 1 : l2 ?? 0.75 }));
            }
            C(this, "afterColorizeItem", { item: t3, visible: e3 });
          }
          positionItems() {
            this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes();
          }
          positionItem(t3) {
            let { group: e3, x: i3 = 0, y: s2 = 0 } = t3.legendItem || {}, r2 = this.options, o2 = r2.symbolPadding, n2 = !r2.rtl, a2 = t3.checkbox;
            if (e3 && e3.element) {
              let r3 = { translateX: n2 ? i3 : this.legendWidth - i3 - 2 * o2 - 4, translateY: s2 };
              e3[b(e3.translateY) ? "animate" : "attr"](r3, void 0, () => {
                C(this, "afterPositionItem", { item: t3 });
              });
            }
            a2 && (a2.x = i3, a2.y = s2);
          }
          destroyItem(t3) {
            let e3 = t3.checkbox, i3 = t3.legendItem || {};
            for (let t4 of ["group", "label", "line", "symbol"]) i3[t4] && (i3[t4] = i3[t4].destroy());
            e3 && v(e3), t3.legendItem = void 0;
          }
          destroy() {
            for (let t3 of this.getAllItems()) this.destroyItem(t3);
            for (let t3 of ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"]) this[t3] && (this[t3] = this[t3].destroy());
            this.display = null;
          }
          positionCheckboxes() {
            let t3;
            let e3 = this.group && this.group.alignAttr, i3 = this.clipHeight || this.legendHeight, s2 = this.titleHeight;
            e3 && (t3 = e3.translateY, this.allItems.forEach(function(r2) {
              let o2;
              let n2 = r2.checkbox;
              n2 && (o2 = t3 + s2 + n2.y + (this.scrollOffset || 0) + 3, y(n2, { left: e3.translateX + r2.checkboxOffset + n2.x - 20 + "px", top: o2 + "px", display: this.proximate || o2 > t3 - 6 && o2 < t3 + i3 - 6 ? "" : "none" }));
            }, this));
          }
          renderTitle() {
            let t3 = this.options, e3 = this.padding, i3 = t3.title, s2, r2 = 0;
            i3.text && (this.title || (this.title = this.chart.renderer.label(i3.text, e3 - 3, e3 - 4, void 0, void 0, void 0, t3.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(i3.style), this.title.add(this.group)), i3.width || this.title.css({ width: this.maxLegendWidth + "px" }), r2 = (s2 = this.title.getBBox()).height, this.offsetWidth = s2.width, this.contentGroup.attr({ translateY: r2 })), this.titleHeight = r2;
          }
          setText(t3) {
            let e3 = this.options;
            t3.legendItem.label.attr({ text: e3.labelFormat ? f(e3.labelFormat, t3, this.chart) : e3.labelFormatter.call(t3) });
          }
          renderItem(t3) {
            let e3 = t3.legendItem = t3.legendItem || {}, i3 = this.chart, s2 = i3.renderer, r2 = this.options, o2 = "horizontal" === r2.layout, n2 = this.symbolWidth, a2 = r2.symbolPadding || 0, h2 = this.itemStyle, l2 = this.itemHiddenStyle, d2 = o2 ? w(r2.itemDistance, 20) : 0, c2 = !r2.rtl, p2 = !t3.series, u2 = !p2 && t3.series.drawLegendSymbol ? t3.series : t3, g2 = u2.options, f2 = !!this.createCheckboxForItem && g2 && g2.showCheckbox, m2 = r2.useHTML, x2 = t3.options.className, y2 = e3.label, b2 = n2 + a2 + d2 + (f2 ? 20 : 0);
            !y2 && (e3.group = s2.g("legend-item").addClass("highcharts-" + u2.type + "-series highcharts-color-" + t3.colorIndex + (x2 ? " " + x2 : "") + (p2 ? " highcharts-series-" + t3.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), e3.label = y2 = s2.text("", c2 ? n2 + a2 : -a2, this.baseline || 0, m2), i3.styledMode || y2.css(M(t3.visible ? h2 : l2)), y2.attr({ align: c2 ? "left" : "right", zIndex: 2 }).add(e3.group), !this.baseline && (this.fontMetrics = s2.fontMetrics(y2), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, y2.attr("y", this.baseline), this.symbolHeight = w(r2.symbolHeight, this.fontMetrics.f), r2.squareSymbol && (this.symbolWidth = w(r2.symbolWidth, Math.max(this.symbolHeight, 16)), b2 = this.symbolWidth + a2 + d2 + (f2 ? 20 : 0), c2 && y2.attr("x", this.symbolWidth + a2))), u2.drawLegendSymbol(this, t3), this.setItemEvents && this.setItemEvents(t3, y2, m2)), f2 && !t3.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(t3), this.colorizeItem(t3, t3.visible), (i3.styledMode || !h2.width) && y2.css({ width: (r2.itemWidth || this.widthOption || i3.spacingBox.width) - b2 + "px" }), this.setText(t3);
            let v2 = y2.getBBox(), S2 = this.fontMetrics && this.fontMetrics.h || 0;
            t3.itemWidth = t3.checkboxOffset = r2.itemWidth || e3.labelWidth || v2.width + b2, this.maxItemWidth = Math.max(this.maxItemWidth, t3.itemWidth), this.totalItemWidth += t3.itemWidth, this.itemHeight = t3.itemHeight = Math.round(e3.labelHeight || (v2.height > 1.5 * S2 ? v2.height : S2));
          }
          layoutItem(t3) {
            let e3 = this.options, i3 = this.padding, s2 = "horizontal" === e3.layout, r2 = t3.itemHeight, o2 = this.itemMarginBottom, n2 = this.itemMarginTop, a2 = s2 ? w(e3.itemDistance, 20) : 0, h2 = this.maxLegendWidth, l2 = e3.alignColumns && this.totalItemWidth > h2 ? this.maxItemWidth : t3.itemWidth, d2 = t3.legendItem || {};
            s2 && this.itemX - i3 + l2 > h2 && (this.itemX = i3, this.lastLineHeight && (this.itemY += n2 + this.lastLineHeight + o2), this.lastLineHeight = 0), this.lastItemY = n2 + this.itemY + o2, this.lastLineHeight = Math.max(r2, this.lastLineHeight), d2.x = this.itemX, d2.y = this.itemY, s2 ? this.itemX += l2 : (this.itemY += n2 + r2 + o2, this.lastLineHeight = r2), this.offsetWidth = this.widthOption || Math.max((s2 ? this.itemX - i3 - (t3.checkbox ? 0 : a2) : l2) + i3, this.offsetWidth);
          }
          getAllItems() {
            let t3 = [];
            return this.chart.series.forEach(function(e3) {
              let i3 = e3 && e3.options;
              e3 && w(i3.showInLegend, !b(i3.linkedTo) && void 0, true) && (t3 = t3.concat((e3.legendItem || {}).labels || ("point" === i3.legendType ? e3.data : e3)));
            }), C(this, "afterGetAllItems", { allItems: t3 }), t3;
          }
          getAlignment() {
            let t3 = this.options;
            return this.proximate ? t3.align.charAt(0) + "tv" : t3.floating ? "" : t3.align.charAt(0) + t3.verticalAlign.charAt(0) + t3.layout.charAt(0);
          }
          adjustMargins(t3, e3) {
            let i3 = this.chart, s2 = this.options, r2 = this.getAlignment();
            r2 && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(o2, n2) {
              o2.test(r2) && !b(t3[n2]) && (i3[u[n2]] = Math.max(i3[u[n2]], i3.legend[(n2 + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n2] * s2[n2 % 2 ? "x" : "y"] + w(s2.margin, 12) + e3[n2] + (i3.titleOffset[n2] || 0)));
            });
          }
          proximatePositions() {
            let t3;
            let e3 = this.chart, i3 = [], s2 = "left" === this.options.align;
            for (let r2 of (this.allItems.forEach(function(t4) {
              let r3, o2, n2 = s2, a2, h2;
              t4.yAxis && (t4.xAxis.options.reversed && (n2 = !n2), t4.points && (r3 = S(n2 ? t4.points : t4.points.slice(0).reverse(), function(t5) {
                return k(t5.plotY);
              })), o2 = this.itemMarginTop + t4.legendItem.label.getBBox().height + this.itemMarginBottom, h2 = t4.yAxis.top - e3.plotTop, a2 = t4.visible ? (r3 ? r3.plotY : t4.yAxis.height) + (h2 - 0.3 * o2) : h2 + t4.yAxis.height, i3.push({ target: a2, size: o2, item: t4 }));
            }, this), g(i3, e3.plotHeight))) t3 = r2.item.legendItem || {}, k(r2.pos) && (t3.y = e3.plotTop - e3.spacing[0] + r2.pos);
          }
          render() {
            let t3 = this.chart, e3 = t3.renderer, i3 = this.options, s2 = this.padding, r2 = this.getAllItems(), o2, n2, a2, h2 = this.group, l2, d2 = this.box;
            this.itemX = s2, this.itemY = this.initialItemY, this.offsetWidth = 0, this.lastItemY = 0, this.widthOption = A(i3.width, t3.spacingBox.width - s2), l2 = t3.spacingBox.width - 2 * s2 - i3.x, ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) > -1 && (l2 /= 2), this.maxLegendWidth = this.widthOption || l2, h2 || (this.group = h2 = e3.g("legend").addClass(i3.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = e3.g().attr({ zIndex: 1 }).add(h2), this.scrollGroup = e3.g().add(this.contentGroup)), this.renderTitle(), P(r2, (t4, e4) => (t4.options && t4.options.legendIndex || 0) - (e4.options && e4.options.legendIndex || 0)), i3.reversed && r2.reverse(), this.allItems = r2, this.display = o2 = !!r2.length, this.lastLineHeight = 0, this.maxItemWidth = 0, this.totalItemWidth = 0, this.itemHeight = 0, r2.forEach(this.renderItem, this), r2.forEach(this.layoutItem, this), n2 = (this.widthOption || this.offsetWidth) + s2, a2 = this.lastItemY + this.lastLineHeight + this.titleHeight, a2 = this.handleOverflow(a2) + s2, d2 || (this.box = d2 = e3.rect().addClass("highcharts-legend-box").attr({ r: i3.borderRadius }).add(h2)), t3.styledMode || d2.attr({ stroke: i3.borderColor, "stroke-width": i3.borderWidth || 0, fill: i3.backgroundColor || "none" }).shadow(i3.shadow), n2 > 0 && a2 > 0 && d2[d2.placed ? "animate" : "attr"](d2.crisp.call({}, { x: 0, y: 0, width: n2, height: a2 }, d2.strokeWidth())), h2[o2 ? "show" : "hide"](), t3.styledMode && "none" === h2.getStyle("display") && (n2 = a2 = 0), this.legendWidth = n2, this.legendHeight = a2, o2 && this.align(), this.proximate || this.positionItems(), C(this, "afterRender");
          }
          align(t3 = this.chart.spacingBox) {
            let e3 = this.chart, i3 = this.options, s2 = t3.y;
            /(lth|ct|rth)/.test(this.getAlignment()) && e3.titleOffset[0] > 0 ? s2 += e3.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && e3.titleOffset[2] > 0 && (s2 -= e3.titleOffset[2]), s2 !== t3.y && (t3 = M(t3, { y: s2 })), e3.hasRendered || (this.group.placed = false), this.group.align(M(i3, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : i3.verticalAlign }), true, t3);
          }
          handleOverflow(t3) {
            let e3 = this, i3 = this.chart, s2 = i3.renderer, r2 = this.options, o2 = r2.y, n2 = "top" === r2.verticalAlign, a2 = this.padding, h2 = r2.maxHeight, l2 = r2.navigation, d2 = w(l2.animation, true), c2 = l2.arrowSize || 12, p2 = this.pages, u2 = this.allItems, g2 = function(t4) {
              "number" == typeof t4 ? S2.attr({ height: t4 }) : S2 && (e3.clipRect = S2.destroy(), e3.contentGroup.clip()), e3.contentGroup.div && (e3.contentGroup.div.style.clip = t4 ? "rect(" + a2 + "px,9999px," + (a2 + t4) + "px,0)" : "auto");
            }, f2 = function(t4) {
              return e3[t4] = s2.circle(0, 0, 1.3 * c2).translate(c2 / 2, c2 / 2).add(v2), i3.styledMode || e3[t4].attr("fill", "rgba(0,0,0,0.0001)"), e3[t4];
            }, m2, x2, y2, b2 = i3.spacingBox.height + (n2 ? -o2 : o2) - a2, v2 = this.nav, S2 = this.clipRect;
            return "horizontal" !== r2.layout || "middle" === r2.verticalAlign || r2.floating || (b2 /= 2), h2 && (b2 = Math.min(b2, h2)), p2.length = 0, t3 && b2 > 0 && t3 > b2 && false !== l2.enabled ? (this.clipHeight = m2 = Math.max(b2 - 20 - this.titleHeight - a2, 0), this.currentPage = w(this.currentPage, 1), this.fullHeight = t3, u2.forEach((t4, e4) => {
              let i4 = (y2 = t4.legendItem || {}).y || 0, s3 = Math.round(y2.label.getBBox().height), r3 = p2.length;
              (!r3 || i4 - p2[r3 - 1] > m2 && (x2 || i4) !== p2[r3 - 1]) && (p2.push(x2 || i4), r3++), y2.pageIx = r3 - 1, x2 && ((u2[e4 - 1].legendItem || {}).pageIx = r3 - 1), e4 === u2.length - 1 && i4 + s3 - p2[r3 - 1] > m2 && i4 > p2[r3 - 1] && (p2.push(i4), y2.pageIx = r3), i4 !== x2 && (x2 = i4);
            }), S2 || (S2 = e3.clipRect = s2.clipRect(0, a2 - 2, 9999, 0), e3.contentGroup.clip(S2)), g2(m2), v2 || (this.nav = v2 = s2.g().attr({ zIndex: 1 }).add(this.group), this.up = s2.symbol("triangle", 0, 0, c2, c2).add(v2), f2("upTracker").on("click", function() {
              e3.scroll(-1, d2);
            }), this.pager = s2.text("", 15, 10).addClass("highcharts-legend-navigation"), !i3.styledMode && l2.style && this.pager.css(l2.style), this.pager.add(v2), this.down = s2.symbol("triangle-down", 0, 0, c2, c2).add(v2), f2("downTracker").on("click", function() {
              e3.scroll(1, d2);
            })), e3.scroll(0), t3 = b2) : v2 && (g2(), this.nav = v2.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0), t3;
          }
          scroll(t3, e3) {
            let i3 = this.chart, s2 = this.pages, r2 = s2.length, o2 = this.clipHeight, n2 = this.options.navigation, a2 = this.pager, h2 = this.padding, c2 = this.currentPage + t3;
            c2 > r2 && (c2 = r2), c2 > 0 && (void 0 !== e3 && d(e3, i3), this.nav.attr({ translateX: h2, translateY: o2 + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function(t4) {
              t4.attr({ class: 1 === c2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
            }), a2.attr({ text: c2 + "/" + r2 }), [this.down, this.downTracker].forEach(function(t4) {
              t4.attr({ x: 18 + this.pager.getBBox().width, class: c2 === r2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
            }, this), i3.styledMode || (this.up.attr({ fill: 1 === c2 ? n2.inactiveColor : n2.activeColor }), this.upTracker.css({ cursor: 1 === c2 ? "default" : "pointer" }), this.down.attr({ fill: c2 === r2 ? n2.inactiveColor : n2.activeColor }), this.downTracker.css({ cursor: c2 === r2 ? "default" : "pointer" })), this.scrollOffset = -s2[c2 - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = c2, this.positionCheckboxes(), L(() => {
              C(this, "afterScroll", { currentPage: c2 });
            }, l(w(e3, i3.renderer.globalAnimation, true)).duration));
          }
          setItemEvents(t3, e3, i3) {
            let o2 = this, n2 = t3.legendItem || {}, a2 = o2.chart.renderer.boxWrapper, h2 = t3 instanceof r, l2 = t3 instanceof s, d2 = "highcharts-legend-" + (h2 ? "point" : "series") + "-active", c2 = o2.chart.styledMode, p2 = i3 ? [e3, n2.symbol] : [n2.group], u2 = (e4) => {
              o2.allItems.forEach((i4) => {
                t3 !== i4 && [i4].concat(i4.linkedSeries || []).forEach((t4) => {
                  t4.setState(e4, !h2);
                });
              });
            };
            for (let i4 of p2) i4 && i4.on("mouseover", function() {
              t3.visible && u2("inactive"), t3.setState("hover"), t3.visible && a2.addClass(d2), c2 || e3.css(o2.options.itemHoverStyle);
            }).on("mouseout", function() {
              o2.chart.styledMode || e3.css(M(t3.visible ? o2.itemStyle : o2.itemHiddenStyle)), u2(""), a2.removeClass(d2), t3.setState();
            }).on("click", function(e4) {
              let i5 = function() {
                t3.setVisible && t3.setVisible(), u2(t3.visible ? "inactive" : "");
              };
              a2.removeClass(d2), C(o2, "itemClick", { browserEvent: e4, legendItem: t3 }, i5), h2 ? t3.firePointEvent("legendItemClick", { browserEvent: e4 }) : l2 && C(t3, "legendItemClick", { browserEvent: e4 });
            });
          }
          createCheckboxForItem(t3) {
            t3.checkbox = x("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: t3.selected, defaultChecked: t3.selected }, this.options.itemCheckboxStyle, this.chart.container), m(t3.checkbox, "click", function(e3) {
              let i3 = e3.target;
              C(t3.series || t3, "checkboxClick", { checked: i3.checked, item: t3 }, function() {
                t3.select();
              });
            });
          }
        }
        return (h = O || (O = {})).compose = function(t3) {
          T(p, "Core.Legend") && m(t3, "beforeMargins", function() {
            this.legend = new h(this, this.options.legend);
          });
        }, O;
      }), i(e, "Core/Chart/Chart.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Axis/Axis.js"], e["Core/Defaults.js"], e["Core/Templating.js"], e["Core/Foundation.js"], e["Core/Globals.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Time.js"], e["Core/Utilities.js"], e["Core/Renderer/HTML/AST.js"], e["Core/Axis/Tick.js"]], function(t2, e2, i2, s, r, o, n, a, h, l, d, c, p, u) {
        let { animate: g, animObject: f, setAnimation: m } = t2, { defaultOptions: x, defaultTime: y } = i2, { numberFormat: b } = s, { registerEventOptions: v } = r, { charts: S, doc: C, marginNames: k, svg: M, win: w } = o, { seriesTypes: T } = h, { addEvent: A, attr: P, createElement: L, css: O, defined: D, diffObjects: E, discardElement: I, erase: j, error: B, extend: R, find: z, fireEvent: N, getStyle: W, isArray: G, isNumber: H, isObject: X, isString: F, merge: Y, objectEach: U, pick: V, pInt: $, relativeLength: Z, removeEvent: _, splat: q, syncTimeout: K, uniqueKey: J } = c;
        class Q {
          static chart(t3, e3, i3) {
            return new Q(t3, e3, i3);
          }
          constructor(t3, e3, i3) {
            this.sharedClips = {};
            let s2 = [...arguments];
            (F(t3) || t3.nodeName) && (this.renderTo = s2.shift()), this.init(s2[0], s2[1]);
          }
          setZoomOptions() {
            let t3 = this.options.chart, e3 = t3.zooming;
            this.zooming = { ...e3, type: V(t3.zoomType, e3.type), key: V(t3.zoomKey, e3.key), pinchType: V(t3.pinchType, e3.pinchType), singleTouch: V(t3.zoomBySingleTouch, e3.singleTouch, false), resetButton: Y(e3.resetButton, t3.resetZoomButton) };
          }
          init(t3, e3) {
            N(this, "init", { args: arguments }, function() {
              let i3 = Y(x, t3), s2 = i3.chart;
              this.userOptions = R({}, t3), this.margin = [], this.spacing = [], this.labelCollectors = [], this.callback = e3, this.isResizing = 0, this.options = i3, this.axes = [], this.series = [], this.time = t3.time && Object.keys(t3.time).length ? new d(t3.time) : o.time, this.numberFormatter = s2.numberFormatter || b, this.styledMode = s2.styledMode, this.hasCartesianSeries = s2.showAxes, this.index = S.length, S.push(this), o.chartCount++, v(this, s2), this.xAxis = [], this.yAxis = [], this.pointCount = this.colorCounter = this.symbolCounter = 0, this.setZoomOptions(), N(this, "afterInit"), this.firstRender();
            });
          }
          initSeries(t3) {
            let e3 = this.options.chart, i3 = t3.type || e3.type, s2 = T[i3];
            s2 || B(17, true, this, { missingModuleFor: i3 });
            let r2 = new s2();
            return "function" == typeof r2.init && r2.init(this, t3), r2;
          }
          setSortedData() {
            this.getSeriesOrderByLinks().forEach(function(t3) {
              t3.points || t3.data || !t3.enabledDataSorting || t3.setData(t3.options.data, false);
            });
          }
          getSeriesOrderByLinks() {
            return this.series.concat().sort(function(t3, e3) {
              return t3.linkedSeries.length || e3.linkedSeries.length ? e3.linkedSeries.length - t3.linkedSeries.length : 0;
            });
          }
          orderItems(t3, e3 = 0) {
            let i3 = this[t3], s2 = this.options[t3] = q(this.options[t3]).slice(), r2 = this.userOptions[t3] = this.userOptions[t3] ? q(this.userOptions[t3]).slice() : [];
            if (this.hasRendered && (s2.splice(e3), r2.splice(e3)), i3) for (let t4 = e3, o2 = i3.length; t4 < o2; ++t4) {
              let e4 = i3[t4];
              e4 && (e4.index = t4, e4 instanceof a && (e4.name = e4.getName()), e4.options.isInternal || (s2[t4] = e4.options, r2[t4] = e4.userOptions));
            }
          }
          isInsidePlot(t3, e3, i3 = {}) {
            var _a;
            let { inverted: s2, plotBox: r2, plotLeft: o2, plotTop: n2, scrollablePlotBox: a2 } = this, { scrollLeft: h2 = 0, scrollTop: l2 = 0 } = i3.visiblePlotOnly && ((_a = this.scrollablePlotArea) == null ? void 0 : _a.scrollingContainer) || {}, d2 = i3.series, c2 = i3.visiblePlotOnly && a2 || r2, p2 = i3.inverted ? e3 : t3, u2 = i3.inverted ? t3 : e3, g2 = { x: p2, y: u2, isInsidePlot: true, options: i3 };
            if (!i3.ignoreX) {
              let t4 = d2 && (s2 && !this.polar ? d2.yAxis : d2.xAxis) || { pos: o2, len: 1 / 0 }, e4 = i3.paneCoordinates ? t4.pos + p2 : o2 + p2;
              e4 >= Math.max(h2 + o2, t4.pos) && e4 <= Math.min(h2 + o2 + c2.width, t4.pos + t4.len) || (g2.isInsidePlot = false);
            }
            if (!i3.ignoreY && g2.isInsidePlot) {
              let t4 = !s2 && i3.axis && !i3.axis.isXAxis && i3.axis || d2 && (s2 ? d2.xAxis : d2.yAxis) || { pos: n2, len: 1 / 0 }, e4 = i3.paneCoordinates ? t4.pos + u2 : n2 + u2;
              e4 >= Math.max(l2 + n2, t4.pos) && e4 <= Math.min(l2 + n2 + c2.height, t4.pos + t4.len) || (g2.isInsidePlot = false);
            }
            return N(this, "afterIsInsidePlot", g2), g2.isInsidePlot;
          }
          redraw(t3) {
            N(this, "beforeRedraw");
            let e3 = this.hasCartesianSeries ? this.axes : this.colorAxis || [], i3 = this.series, s2 = this.pointer, r2 = this.legend, o2 = this.userOptions.legend, n2 = this.renderer, a2 = n2.isHidden(), h2 = [], l2, d2, c2, p2 = this.isDirtyBox, u2 = this.isDirtyLegend, g2;
            for (n2.rootFontSize = n2.boxWrapper.getStyle("font-size"), this.setResponsive && this.setResponsive(false), m(!!this.hasRendered && t3, this), a2 && this.temporaryDisplay(), this.layOutTitles(false), c2 = i3.length; c2--; ) if (((g2 = i3[c2]).options.stacking || g2.options.centerInCategory) && (d2 = true, g2.isDirty)) {
              l2 = true;
              break;
            }
            if (l2) for (c2 = i3.length; c2--; ) (g2 = i3[c2]).options.stacking && (g2.isDirty = true);
            i3.forEach(function(t4) {
              t4.isDirty && ("point" === t4.options.legendType ? ("function" == typeof t4.updateTotals && t4.updateTotals(), u2 = true) : o2 && (o2.labelFormatter || o2.labelFormat) && (u2 = true)), t4.isDirtyData && N(t4, "updatedData");
            }), u2 && r2 && r2.options.enabled && (r2.render(), this.isDirtyLegend = false), d2 && this.getStacks(), e3.forEach(function(t4) {
              t4.updateNames(), t4.setScale();
            }), this.getMargins(), e3.forEach(function(t4) {
              t4.isDirty && (p2 = true);
            }), e3.forEach(function(t4) {
              let e4 = t4.min + "," + t4.max;
              t4.extKey !== e4 && (t4.extKey = e4, h2.push(function() {
                N(t4, "afterSetExtremes", R(t4.eventArgs, t4.getExtremes())), delete t4.eventArgs;
              })), (p2 || d2) && t4.redraw();
            }), p2 && this.drawChartBox(), N(this, "predraw"), i3.forEach(function(t4) {
              (p2 || t4.isDirty) && t4.visible && t4.redraw(), t4.isDirtyData = false;
            }), s2 && s2.reset(true), n2.draw(), N(this, "redraw"), N(this, "render"), a2 && this.temporaryDisplay(true), h2.forEach(function(t4) {
              t4.call();
            });
          }
          get(t3) {
            let e3 = this.series;
            function i3(e4) {
              return e4.id === t3 || e4.options && e4.options.id === t3;
            }
            let s2 = z(this.axes, i3) || z(this.series, i3);
            for (let t4 = 0; !s2 && t4 < e3.length; t4++) s2 = z(e3[t4].points || [], i3);
            return s2;
          }
          getAxes() {
            let t3 = this.userOptions;
            for (let i3 of (N(this, "getAxes"), ["xAxis", "yAxis"])) for (let s2 of t3[i3] = q(t3[i3] || {})) new e2(this, s2, i3);
            N(this, "afterGetAxes");
          }
          getSelectedPoints() {
            return this.series.reduce((t3, e3) => (e3.getPointsCollection().forEach((e4) => {
              V(e4.selectedStaging, e4.selected) && t3.push(e4);
            }), t3), []);
          }
          getSelectedSeries() {
            return this.series.filter(function(t3) {
              return t3.selected;
            });
          }
          setTitle(t3, e3, i3) {
            this.applyDescription("title", t3), this.applyDescription("subtitle", e3), this.applyDescription("caption", void 0), this.layOutTitles(i3);
          }
          applyDescription(t3, e3) {
            let i3 = this, s2 = this.options[t3] = Y(this.options[t3], e3), r2 = this[t3];
            r2 && e3 && (this[t3] = r2 = r2.destroy()), s2 && !r2 && ((r2 = this.renderer.text(s2.text, 0, 0, s2.useHTML).attr({ align: s2.align, class: "highcharts-" + t3, zIndex: s2.zIndex || 4 }).add()).update = function(e4, s3) {
              i3.applyDescription(t3, e4), i3.layOutTitles(s3);
            }, this.styledMode || r2.css(R("title" === t3 ? { fontSize: this.options.isStock ? "1em" : "1.2em" } : {}, s2.style)), this[t3] = r2);
          }
          layOutTitles(t3 = true) {
            let e3 = [0, 0, 0], i3 = this.renderer, s2 = this.spacingBox;
            ["title", "subtitle", "caption"].forEach(function(t4) {
              let r3 = this[t4], o2 = this.options[t4], n2 = o2.verticalAlign || "top", a2 = "title" === t4 ? "top" === n2 ? -3 : 0 : "top" === n2 ? e3[0] + 2 : 0;
              if (r3) {
                r3.css({ width: (o2.width || s2.width + (o2.widthAdjust || 0)) + "px" });
                let t5 = i3.fontMetrics(r3).b, h2 = Math.round(r3.getBBox(o2.useHTML).height);
                r3.align(R({ y: "bottom" === n2 ? t5 : a2 + t5, height: h2 }, o2), false, "spacingBox"), o2.floating || ("top" === n2 ? e3[0] = Math.ceil(e3[0] + h2) : "bottom" === n2 && (e3[2] = Math.ceil(e3[2] + h2)));
              }
            }, this), e3[0] && "top" === (this.options.title.verticalAlign || "top") && (e3[0] += this.options.title.margin), e3[2] && "bottom" === this.options.caption.verticalAlign && (e3[2] += this.options.caption.margin);
            let r2 = !this.titleOffset || this.titleOffset.join(",") !== e3.join(",");
            this.titleOffset = e3, N(this, "afterLayOutTitles"), !this.isDirtyBox && r2 && (this.isDirtyBox = this.isDirtyLegend = r2, this.hasRendered && t3 && this.isDirtyBox && this.redraw());
          }
          getContainerBox() {
            let t3 = [].map.call(this.renderTo.children, (t4) => {
              if (t4 !== this.container) {
                let e4 = t4.style.display;
                return t4.style.display = "none", [t4, e4];
              }
            }), e3 = { width: W(this.renderTo, "width", true) || 0, height: W(this.renderTo, "height", true) || 0 };
            return t3.filter(Boolean).forEach(([t4, e4]) => {
              t4.style.display = e4;
            }), e3;
          }
          getChartSize() {
            var _a;
            let t3 = this.options.chart, e3 = t3.width, i3 = t3.height, s2 = this.getContainerBox(), r2 = s2.height > 1 && !(!((_a = this.renderTo.parentElement) == null ? void 0 : _a.style.height) && "100%" === this.renderTo.style.height);
            this.chartWidth = Math.max(0, e3 || s2.width || 600), this.chartHeight = Math.max(0, Z(i3, this.chartWidth) || (r2 ? s2.height : 400)), this.containerBox = s2;
          }
          temporaryDisplay(t3) {
            let e3 = this.renderTo, i3;
            if (t3) for (; e3 && e3.style; ) e3.hcOrigStyle && (O(e3, e3.hcOrigStyle), delete e3.hcOrigStyle), e3.hcOrigDetached && (C.body.removeChild(e3), e3.hcOrigDetached = false), e3 = e3.parentNode;
            else for (; e3 && e3.style && (C.body.contains(e3) || e3.parentNode || (e3.hcOrigDetached = true, C.body.appendChild(e3)), ("none" === W(e3, "display", false) || e3.hcOricDetached) && (e3.hcOrigStyle = { display: e3.style.display, height: e3.style.height, overflow: e3.style.overflow }, i3 = { display: "block", overflow: "hidden" }, e3 !== this.renderTo && (i3.height = 0), O(e3, i3), e3.offsetWidth || e3.style.setProperty("display", "block", "important")), (e3 = e3.parentNode) !== C.body); ) ;
          }
          setClassName(t3) {
            this.container.className = "highcharts-container " + (t3 || "");
          }
          getContainer() {
            var _a;
            let t3 = this.options, e3 = t3.chart, i3 = "data-highcharts-chart", s2 = J(), r2, o2 = this.renderTo;
            o2 || (this.renderTo = o2 = e3.renderTo), F(o2) && (this.renderTo = o2 = C.getElementById(o2)), o2 || B(13, true, this);
            let a2 = $(P(o2, i3));
            H(a2) && S[a2] && S[a2].hasRendered && S[a2].destroy(), P(o2, i3, this.index), o2.innerHTML = p.emptyHTML, e3.skipClone || o2.offsetWidth || this.temporaryDisplay(), this.getChartSize();
            let h2 = this.chartHeight, d2 = this.chartWidth;
            O(o2, { overflow: "hidden" }), this.styledMode || (r2 = R({ position: "relative", overflow: "hidden", width: d2 + "px", height: h2 + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none", padding: "0px" }, e3.style || {}));
            let c2 = L("div", { id: s2 }, r2, o2);
            this.container = c2, this.getChartSize(), d2 === this.chartWidth || (d2 = this.chartWidth, this.styledMode || O(c2, { width: V((_a = e3.style) == null ? void 0 : _a.width, d2 + "px") })), this.containerBox = this.getContainerBox(), this._cursor = c2.style.cursor;
            let u2 = e3.renderer || !M ? n.getRendererType(e3.renderer) : l;
            if (this.renderer = new u2(c2, d2, h2, void 0, e3.forExport, t3.exporting && t3.exporting.allowHTML, this.styledMode), m(void 0, this), this.setClassName(e3.className), this.styledMode) for (let e4 in t3.defs) this.renderer.definition(t3.defs[e4]);
            else this.renderer.setStyle(e3.style);
            this.renderer.chartIndex = this.index, N(this, "afterGetContainer");
          }
          getMargins(t3) {
            let { spacing: e3, margin: i3, titleOffset: s2 } = this;
            this.resetMargins(), s2[0] && !D(i3[0]) && (this.plotTop = Math.max(this.plotTop, s2[0] + e3[0])), s2[2] && !D(i3[2]) && (this.marginBottom = Math.max(this.marginBottom, s2[2] + e3[2])), this.legend && this.legend.display && this.legend.adjustMargins(i3, e3), N(this, "getMargins"), t3 || this.getAxisMargins();
          }
          getAxisMargins() {
            let t3 = this, e3 = t3.axisOffset = [0, 0, 0, 0], i3 = t3.colorAxis, s2 = t3.margin, r2 = function(t4) {
              t4.forEach(function(t5) {
                t5.visible && t5.getOffset();
              });
            };
            t3.hasCartesianSeries ? r2(t3.axes) : i3 && i3.length && r2(i3), k.forEach(function(i4, r3) {
              D(s2[r3]) || (t3[i4] += e3[r3]);
            }), t3.setChartSize();
          }
          getOptions() {
            return E(this.userOptions, x);
          }
          reflow(t3) {
            var _a;
            let e3 = this, i3 = e3.containerBox, s2 = e3.getContainerBox();
            (_a = e3.pointer) == null ? true : delete _a.chartPosition, !e3.isPrinting && !e3.isResizing && i3 && s2.width && ((s2.width !== i3.width || s2.height !== i3.height) && (c.clearTimeout(e3.reflowTimeout), e3.reflowTimeout = K(function() {
              e3.container && e3.setSize(void 0, void 0, false);
            }, t3 ? 100 : 0)), e3.containerBox = s2);
          }
          setReflow() {
            let t3 = this, e3 = (e4) => {
              var _a;
              ((_a = t3.options) == null ? void 0 : _a.chart.reflow) && t3.hasLoaded && t3.reflow(e4);
            };
            if ("function" == typeof ResizeObserver) new ResizeObserver(e3).observe(t3.renderTo);
            else {
              let t4 = A(w, "resize", e3);
              A(this, "destroy", t4);
            }
          }
          setSize(t3, e3, i3) {
            let s2 = this, r2 = s2.renderer;
            s2.isResizing += 1, m(i3, s2);
            let o2 = r2.globalAnimation;
            s2.oldChartHeight = s2.chartHeight, s2.oldChartWidth = s2.chartWidth, void 0 !== t3 && (s2.options.chart.width = t3), void 0 !== e3 && (s2.options.chart.height = e3), s2.getChartSize();
            let { chartWidth: n2, chartHeight: a2, scrollablePixelsX: h2 = 0, scrollablePixelsY: l2 = 0 } = s2;
            (s2.isDirtyBox || n2 !== s2.oldChartWidth || a2 !== s2.oldChartHeight) && (s2.styledMode || (o2 ? g : O)(s2.container, { width: `${n2 + h2}px`, height: `${a2 + l2}px` }, o2), s2.setChartSize(true), r2.setSize(n2, a2, o2), s2.axes.forEach(function(t4) {
              t4.isDirty = true, t4.setScale();
            }), s2.isDirtyLegend = true, s2.isDirtyBox = true, s2.layOutTitles(), s2.getMargins(), s2.redraw(o2), s2.oldChartHeight = void 0, N(s2, "resize"), setTimeout(() => {
              s2 && N(s2, "endResize");
            }, f(o2).duration)), s2.isResizing -= 1;
          }
          setChartSize(t3) {
            let e3, i3, s2, r2;
            let { chartHeight: o2, chartWidth: n2, inverted: a2, spacing: h2, renderer: l2 } = this, d2 = this.clipOffset, c2 = Math[a2 ? "floor" : "round"];
            this.plotLeft = e3 = Math.round(this.plotLeft), this.plotTop = i3 = Math.round(this.plotTop), this.plotWidth = s2 = Math.max(0, Math.round(n2 - e3 - this.marginRight)), this.plotHeight = r2 = Math.max(0, Math.round(o2 - i3 - this.marginBottom)), this.plotSizeX = a2 ? r2 : s2, this.plotSizeY = a2 ? s2 : r2, this.spacingBox = l2.spacingBox = { x: h2[3], y: h2[0], width: n2 - h2[3] - h2[1], height: o2 - h2[0] - h2[2] }, this.plotBox = l2.plotBox = { x: e3, y: i3, width: s2, height: r2 }, d2 && (this.clipBox = { x: c2(d2[3]), y: c2(d2[0]), width: c2(this.plotSizeX - d2[1] - d2[3]), height: c2(this.plotSizeY - d2[0] - d2[2]) }), t3 || (this.axes.forEach(function(t4) {
              t4.setAxisSize(), t4.setAxisTranslation();
            }), l2.alignElements()), N(this, "afterSetChartSize", { skipAxes: t3 });
          }
          resetMargins() {
            N(this, "resetMargins");
            let t3 = this, e3 = t3.options.chart, i3 = e3.plotBorderWidth || 0, s2 = i3 / 2;
            ["margin", "spacing"].forEach(function(i4) {
              let s3 = e3[i4], r2 = X(s3) ? s3 : [s3, s3, s3, s3];
              ["Top", "Right", "Bottom", "Left"].forEach(function(s4, o2) {
                t3[i4][o2] = V(e3[i4 + s4], r2[o2]);
              });
            }), k.forEach(function(e4, i4) {
              t3[e4] = V(t3.margin[i4], t3.spacing[i4]);
            }), t3.axisOffset = [0, 0, 0, 0], t3.clipOffset = [s2, s2, s2, s2], t3.plotBorderWidth = i3;
          }
          drawChartBox() {
            let t3 = this.options.chart, e3 = this.renderer, i3 = this.chartWidth, s2 = this.chartHeight, r2 = this.styledMode, o2 = this.plotBGImage, n2 = t3.backgroundColor, a2 = t3.plotBackgroundColor, h2 = t3.plotBackgroundImage, l2 = this.plotLeft, d2 = this.plotTop, c2 = this.plotWidth, p2 = this.plotHeight, u2 = this.plotBox, g2 = this.clipRect, f2 = this.clipBox, m2 = this.chartBackground, x2 = this.plotBackground, y2 = this.plotBorder, b2, v2, S2, C2 = "animate";
            m2 || (this.chartBackground = m2 = e3.rect().addClass("highcharts-background").add(), C2 = "attr"), r2 ? b2 = v2 = m2.strokeWidth() : (v2 = (b2 = t3.borderWidth || 0) + (t3.shadow ? 8 : 0), S2 = { fill: n2 || "none" }, (b2 || m2["stroke-width"]) && (S2.stroke = t3.borderColor, S2["stroke-width"] = b2), m2.attr(S2).shadow(t3.shadow)), m2[C2]({ x: v2 / 2, y: v2 / 2, width: i3 - v2 - b2 % 2, height: s2 - v2 - b2 % 2, r: t3.borderRadius }), C2 = "animate", x2 || (C2 = "attr", this.plotBackground = x2 = e3.rect().addClass("highcharts-plot-background").add()), x2[C2](u2), !r2 && (x2.attr({ fill: a2 || "none" }).shadow(t3.plotShadow), h2 && (o2 ? (h2 !== o2.attr("href") && o2.attr("href", h2), o2.animate(u2)) : this.plotBGImage = e3.image(h2, l2, d2, c2, p2).add())), g2 ? g2.animate({ width: f2.width, height: f2.height }) : this.clipRect = e3.clipRect(f2), C2 = "animate", y2 || (C2 = "attr", this.plotBorder = y2 = e3.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()), r2 || y2.attr({ stroke: t3.plotBorderColor, "stroke-width": t3.plotBorderWidth || 0, fill: "none" }), y2[C2](y2.crisp({ x: l2, y: d2, width: c2, height: p2 }, -y2.strokeWidth())), this.isDirtyBox = false, N(this, "afterDrawChartBox");
          }
          propFromSeries() {
            let t3, e3, i3;
            let s2 = this, r2 = s2.options.chart, o2 = s2.options.series;
            ["inverted", "angular", "polar"].forEach(function(n2) {
              for (e3 = T[r2.type], i3 = r2[n2] || e3 && e3.prototype[n2], t3 = o2 && o2.length; !i3 && t3--; ) (e3 = T[o2[t3].type]) && e3.prototype[n2] && (i3 = true);
              s2[n2] = i3;
            });
          }
          linkSeries(t3) {
            let e3 = this, i3 = e3.series;
            i3.forEach(function(t4) {
              t4.linkedSeries.length = 0;
            }), i3.forEach(function(t4) {
              let { linkedTo: i4 } = t4.options;
              if (F(i4)) {
                let s2;
                (s2 = ":previous" === i4 ? e3.series[t4.index - 1] : e3.get(i4)) && s2.linkedParent !== t4 && (s2.linkedSeries.push(t4), t4.linkedParent = s2, s2.enabledDataSorting && t4.setDataSortingOptions(), t4.visible = V(t4.options.visible, s2.options.visible, t4.visible));
              }
            }), N(this, "afterLinkSeries", { isUpdating: t3 });
          }
          renderSeries() {
            this.series.forEach(function(t3) {
              t3.translate(), t3.render();
            });
          }
          render() {
            var _a;
            let t3 = this.axes, e3 = this.colorAxis, i3 = this.renderer, s2 = this.options.chart.axisLayoutRuns || 2, r2 = (t4) => {
              t4.forEach((t5) => {
                t5.visible && t5.render();
              });
            }, o2 = 0, n2 = true, a2, h2 = 0;
            for (let e4 of (this.setTitle(), N(this, "beforeMargins"), (_a = this.getStacks) == null ? void 0 : _a.call(this), this.getMargins(true), this.setChartSize(), t3)) {
              let { options: t4 } = e4, { labels: i4 } = t4;
              if (this.hasCartesianSeries && e4.horiz && e4.visible && i4.enabled && e4.series.length && "colorAxis" !== e4.coll && !this.polar) {
                o2 = t4.tickLength, e4.createGroups();
                let s3 = new u(e4, 0, "", true), r3 = s3.createLabel("x", i4);
                if (s3.destroy(), r3 && V(i4.reserveSpace, !H(t4.crossing)) && (o2 = r3.getBBox().height + i4.distance + Math.max(t4.offset || 0, 0)), o2) {
                  r3 == null ? void 0 : r3.destroy();
                  break;
                }
              }
            }
            for (this.plotHeight = Math.max(this.plotHeight - o2, 0); (n2 || a2 || s2 > 1) && h2 < s2; ) {
              let e4 = this.plotWidth, i4 = this.plotHeight;
              for (let e5 of t3) 0 === h2 ? e5.setScale() : (e5.horiz && n2 || !e5.horiz && a2) && e5.setTickInterval(true);
              0 === h2 ? this.getAxisMargins() : this.getMargins(), n2 = e4 / this.plotWidth > (h2 ? 1 : 1.1), a2 = i4 / this.plotHeight > (h2 ? 1 : 1.05), h2++;
            }
            this.drawChartBox(), this.hasCartesianSeries ? r2(t3) : e3 && e3.length && r2(e3), this.seriesGroup || (this.seriesGroup = i3.g("series-group").attr({ zIndex: 3 }).shadow(this.options.chart.seriesGroupShadow).add()), this.renderSeries(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = true;
          }
          addCredits(t3) {
            let e3 = this, i3 = Y(true, this.options.credits, t3);
            i3.enabled && !this.credits && (this.credits = this.renderer.text(i3.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
              i3.href && (w.location.href = i3.href);
            }).attr({ align: i3.position.align, zIndex: 8 }), e3.styledMode || this.credits.css(i3.style), this.credits.add().align(i3.position), this.credits.update = function(t4) {
              e3.credits = e3.credits.destroy(), e3.addCredits(t4);
            });
          }
          destroy() {
            let t3;
            let e3 = this, i3 = e3.axes, s2 = e3.series, r2 = e3.container, n2 = r2 && r2.parentNode;
            for (N(e3, "destroy"), e3.renderer.forExport ? j(S, e3) : S[e3.index] = void 0, o.chartCount--, e3.renderTo.removeAttribute("data-highcharts-chart"), _(e3), t3 = i3.length; t3--; ) i3[t3] = i3[t3].destroy();
            for (this.scroller && this.scroller.destroy && this.scroller.destroy(), t3 = s2.length; t3--; ) s2[t3] = s2[t3].destroy();
            ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach(function(t4) {
              let i4 = e3[t4];
              i4 && i4.destroy && (e3[t4] = i4.destroy());
            }), r2 && (r2.innerHTML = p.emptyHTML, _(r2), n2 && I(r2)), U(e3, function(t4, i4) {
              delete e3[i4];
            });
          }
          firstRender() {
            var _a;
            let t3 = this, e3 = t3.options;
            t3.getContainer(), t3.resetMargins(), t3.setChartSize(), t3.propFromSeries(), t3.getAxes();
            let i3 = G(e3.series) ? e3.series : [];
            e3.series = [], i3.forEach(function(e4) {
              t3.initSeries(e4);
            }), t3.linkSeries(), t3.setSortedData(), N(t3, "beforeRender"), t3.render(), (_a = t3.pointer) == null ? void 0 : _a.getChartPosition(), t3.renderer.imgCount || t3.hasLoaded || t3.onload(), t3.temporaryDisplay(true);
          }
          onload() {
            this.callbacks.concat([this.callback]).forEach(function(t3) {
              t3 && void 0 !== this.index && t3.apply(this, [this]);
            }, this), N(this, "load"), N(this, "render"), D(this.index) && this.setReflow(), this.warnIfA11yModuleNotLoaded(), this.hasLoaded = true;
          }
          warnIfA11yModuleNotLoaded() {
            let { options: t3, title: e3 } = this;
            !t3 || this.accessibility || (this.renderer.boxWrapper.attr({ role: "img", "aria-label": (e3 && e3.element.textContent || "").replace(/</g, "&lt;") }), t3.accessibility && false === t3.accessibility.enabled || B('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', false, this));
          }
          addSeries(t3, e3, i3) {
            let s2;
            let r2 = this;
            return t3 && (e3 = V(e3, true), N(r2, "addSeries", { options: t3 }, function() {
              s2 = r2.initSeries(t3), r2.isDirtyLegend = true, r2.linkSeries(), s2.enabledDataSorting && s2.setData(t3.data, false), N(r2, "afterAddSeries", { series: s2 }), e3 && r2.redraw(i3);
            })), s2;
          }
          addAxis(t3, e3, i3, s2) {
            return this.createAxis(e3 ? "xAxis" : "yAxis", { axis: t3, redraw: i3, animation: s2 });
          }
          addColorAxis(t3, e3, i3) {
            return this.createAxis("colorAxis", { axis: t3, redraw: e3, animation: i3 });
          }
          createAxis(t3, i3) {
            let s2 = new e2(this, i3.axis, t3);
            return V(i3.redraw, true) && this.redraw(i3.animation), s2;
          }
          showLoading(t3) {
            let e3 = this, i3 = e3.options, s2 = i3.loading, r2 = function() {
              o2 && O(o2, { left: e3.plotLeft + "px", top: e3.plotTop + "px", width: e3.plotWidth + "px", height: e3.plotHeight + "px" });
            }, o2 = e3.loadingDiv, n2 = e3.loadingSpan;
            o2 || (e3.loadingDiv = o2 = L("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, e3.container)), n2 || (e3.loadingSpan = n2 = L("span", { className: "highcharts-loading-inner" }, null, o2), A(e3, "redraw", r2)), o2.className = "highcharts-loading", p.setElementHTML(n2, V(t3, i3.lang.loading, "")), e3.styledMode || (O(o2, R(s2.style, { zIndex: 10 })), O(n2, s2.labelStyle), e3.loadingShown || (O(o2, { opacity: 0, display: "" }), g(o2, { opacity: s2.style.opacity || 0.5 }, { duration: s2.showDuration || 0 }))), e3.loadingShown = true, r2();
          }
          hideLoading() {
            let t3 = this.options, e3 = this.loadingDiv;
            e3 && (e3.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || g(e3, { opacity: 0 }, { duration: t3.loading.hideDuration || 100, complete: function() {
              O(e3, { display: "none" });
            } })), this.loadingShown = false;
          }
          update(t3, e3, i3, s2) {
            let r2, o2, n2;
            let a2 = this, h2 = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, l2 = t3.isResponsiveOptions, c2 = [];
            N(a2, "update", { options: t3 }), l2 || a2.setResponsive(false, true), t3 = E(t3, a2.options), a2.userOptions = Y(a2.userOptions, t3);
            let p2 = t3.chart;
            p2 && (Y(true, a2.options.chart, p2), this.setZoomOptions(), "className" in p2 && a2.setClassName(p2.className), ("inverted" in p2 || "polar" in p2 || "type" in p2) && (a2.propFromSeries(), r2 = true), "alignTicks" in p2 && (r2 = true), "events" in p2 && v(this, p2), U(p2, function(t4, e4) {
              -1 !== a2.propsRequireUpdateSeries.indexOf("chart." + e4) && (o2 = true), -1 !== a2.propsRequireDirtyBox.indexOf(e4) && (a2.isDirtyBox = true), -1 === a2.propsRequireReflow.indexOf(e4) || (a2.isDirtyBox = true, l2 || (n2 = true));
            }), !a2.styledMode && p2.style && a2.renderer.setStyle(a2.options.chart.style || {})), !a2.styledMode && t3.colors && (this.options.colors = t3.colors), t3.time && (this.time === y && (this.time = new d(t3.time)), Y(true, a2.options.time, t3.time)), U(t3, function(e4, i4) {
              a2[i4] && "function" == typeof a2[i4].update ? a2[i4].update(e4, false) : "function" == typeof a2[h2[i4]] ? a2[h2[i4]](e4) : "colors" !== i4 && -1 === a2.collectionsWithUpdate.indexOf(i4) && Y(true, a2.options[i4], t3[i4]), "chart" !== i4 && -1 !== a2.propsRequireUpdateSeries.indexOf(i4) && (o2 = true);
            }), this.collectionsWithUpdate.forEach(function(e4) {
              t3[e4] && (q(t3[e4]).forEach(function(t4, s3) {
                let r3;
                let o3 = D(t4.id);
                o3 && (r3 = a2.get(t4.id)), !r3 && a2[e4] && (r3 = a2[e4][V(t4.index, s3)]) && (o3 && D(r3.options.id) || r3.options.isInternal) && (r3 = void 0), r3 && r3.coll === e4 && (r3.update(t4, false), i3 && (r3.touched = true)), !r3 && i3 && a2.collectionsWithInit[e4] && (a2.collectionsWithInit[e4][0].apply(a2, [t4].concat(a2.collectionsWithInit[e4][1] || []).concat([false])).touched = true);
              }), i3 && a2[e4].forEach(function(t4) {
                t4.touched || t4.options.isInternal ? delete t4.touched : c2.push(t4);
              }));
            }), c2.forEach(function(t4) {
              t4.chart && t4.remove && t4.remove(false);
            }), r2 && a2.axes.forEach(function(t4) {
              t4.update({}, false);
            }), o2 && a2.getSeriesOrderByLinks().forEach(function(t4) {
              t4.chart && t4.update({}, false);
            }, this);
            let u2 = p2 && p2.width, g2 = p2 && (F(p2.height) ? Z(p2.height, u2 || a2.chartWidth) : p2.height);
            n2 || H(u2) && u2 !== a2.chartWidth || H(g2) && g2 !== a2.chartHeight ? a2.setSize(u2, g2, s2) : V(e3, true) && a2.redraw(s2), N(a2, "afterUpdate", { options: t3, redraw: e3, animation: s2 });
          }
          setSubtitle(t3, e3) {
            this.applyDescription("subtitle", t3), this.layOutTitles(e3);
          }
          setCaption(t3, e3) {
            this.applyDescription("caption", t3), this.layOutTitles(e3);
          }
          showResetZoom() {
            let t3 = this, e3 = x.lang, i3 = t3.zooming.resetButton, s2 = i3.theme, r2 = "chart" === i3.relativeTo || "spacingBox" === i3.relativeTo ? null : "plotBox";
            function o2() {
              t3.zoomOut();
            }
            N(this, "beforeShowResetZoom", null, function() {
              t3.resetZoomButton = t3.renderer.button(e3.resetZoom, null, null, o2, s2).attr({ align: i3.position.align, title: e3.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(i3.position, false, r2);
            }), N(this, "afterShowResetZoom");
          }
          zoomOut() {
            N(this, "selection", { resetSelection: true }, () => this.transform({ reset: true, trigger: "zoom" }));
          }
          pan(t3, e3) {
            let i3 = this, s2 = "object" == typeof e3 ? e3 : { enabled: e3, type: "x" }, r2 = s2.type, o2 = r2 && i3[{ x: "xAxis", xy: "axes", y: "yAxis" }[r2]].filter((t4) => t4.options.panningEnabled && !t4.options.isInternal), n2 = i3.options.chart;
            (n2 == null ? void 0 : n2.panning) && (n2.panning = s2), N(this, "pan", { originalEvent: t3 }, () => {
              i3.transform({ axes: o2, event: t3, to: { x: t3.chartX - (i3.mouseDownX || 0), y: t3.chartY - (i3.mouseDownY || 0) }, trigger: "pan" }), O(i3.container, { cursor: "move" });
            });
          }
          transform(t3) {
            var _a;
            let { axes: e3 = this.axes, event: i3, from: s2 = {}, reset: r2, selection: o2, to: n2 = {}, trigger: a2 } = t3, { inverted: h2 } = this, l2 = false, d2, c2;
            for (let t4 of ((_a = this.hoverPoints) == null ? void 0 : _a.forEach((t5) => t5.setState()), e3)) {
              let { horiz: e4, len: p2, minPointOffset: u2 = 0, options: g2, reversed: f2 } = t4, m2 = e4 ? "width" : "height", x2 = e4 ? "x" : "y", y2 = V(n2[m2], t4.len), b2 = V(s2[m2], t4.len), v2 = 10 > Math.abs(y2) ? 1 : y2 / b2, S2 = (s2[x2] || 0) + b2 / 2 - t4.pos, C2 = S2 - ((n2[x2] ?? t4.pos) + y2 / 2 - t4.pos) / v2, k2 = f2 && !h2 || !f2 && h2 ? -1 : 1;
              if (!r2 && (S2 < 0 || S2 > t4.len)) continue;
              let M2 = t4.toValue(C2, true) + (o2 || t4.isOrdinal ? 0 : u2 * k2), w2 = t4.toValue(C2 + p2 / v2, true) - (o2 || t4.isOrdinal ? 0 : u2 * k2 || 0), T2 = t4.allExtremes;
              if (M2 > w2 && ([M2, w2] = [w2, M2]), 1 === v2 && !r2 && "yAxis" === t4.coll && !T2) {
                for (let e5 of t4.series) {
                  let t5 = e5.getExtremes(e5.getProcessedData(true).yData, true);
                  T2 ?? (T2 = { dataMin: Number.MAX_VALUE, dataMax: -Number.MAX_VALUE }), H(t5.dataMin) && H(t5.dataMax) && (T2.dataMin = Math.min(t5.dataMin, T2.dataMin), T2.dataMax = Math.max(t5.dataMax, T2.dataMax));
                }
                t4.allExtremes = T2;
              }
              let { dataMin: A2, dataMax: P2, min: L2, max: O2 } = R(t4.getExtremes(), T2 || {}), E2 = A2 ?? g2.min, I2 = P2 ?? g2.max, j2 = w2 - M2, B2 = t4.categories ? 0 : Math.min(j2, I2 - E2), z2 = E2 - B2 * (D(g2.min) ? 0 : g2.minPadding), N2 = I2 + B2 * (D(g2.max) ? 0 : g2.maxPadding), W2 = t4.allowZoomOutside || 1 === v2 || "zoom" !== a2 && v2 > 1, G2 = Math.min(g2.min ?? z2, z2, W2 ? L2 : z2), X2 = Math.max(g2.max ?? N2, N2, W2 ? O2 : N2);
              (!t4.isOrdinal || t4.options.overscroll || 1 !== v2 || r2) && (M2 < G2 && (M2 = G2, v2 >= 1 && (w2 = M2 + j2)), w2 > X2 && (w2 = X2, v2 >= 1 && (M2 = w2 - j2)), (r2 || t4.series.length && (M2 !== L2 || w2 !== O2) && M2 >= G2 && w2 <= X2) && (o2 ? o2[t4.coll].push({ axis: t4, min: M2, max: w2 }) : (t4.isPanning = "zoom" !== a2, t4.isPanning && (c2 = true), t4.setExtremes(r2 ? void 0 : M2, r2 ? void 0 : w2, false, false, { move: C2, trigger: a2, scale: v2 }), !r2 && (M2 > G2 || w2 < X2) && "mousewheel" !== a2 && (d2 = true)), l2 = true), i3 && (this[e4 ? "mouseDownX" : "mouseDownY"] = i3[e4 ? "chartX" : "chartY"]));
            }
            return l2 && (o2 ? N(this, "selection", o2, () => {
              delete t3.selection, t3.trigger = "zoom", this.transform(t3);
            }) : (!d2 || c2 || this.resetZoomButton ? !d2 && this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy()) : this.showResetZoom(), this.redraw("zoom" === a2 && (this.options.chart.animation ?? this.pointCount < 100)))), l2;
          }
        }
        return R(Q.prototype, { callbacks: [], collectionsWithInit: { xAxis: [Q.prototype.addAxis, [true]], yAxis: [Q.prototype.addAxis, [false]], series: [Q.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"], propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"], propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"] }), Q;
      }), i(e, "Extensions/ScrollablePlotArea.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Globals.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        let { stop: r } = t2, { composed: o } = e2, { addEvent: n, createElement: a, css: h, defined: l, merge: d, pushUnique: c } = s;
        function p() {
          let t3 = this.scrollablePlotArea;
          (this.scrollablePixelsX || this.scrollablePixelsY) && !t3 && (this.scrollablePlotArea = t3 = new g(this)), t3 == null ? void 0 : t3.applyFixed();
        }
        function u() {
          this.chart.scrollablePlotArea && (this.chart.scrollablePlotArea.isDirty = true);
        }
        class g {
          static compose(t3, e3, i3) {
            c(o, this.compose) && (n(t3, "afterInit", u), n(e3, "afterSetChartSize", (t4) => this.afterSetSize(t4.target, t4)), n(e3, "render", p), n(i3, "show", u));
          }
          static afterSetSize(t3, e3) {
            let i3, s2, r2;
            let { minWidth: o2, minHeight: n2 } = t3.options.chart.scrollablePlotArea || {}, { clipBox: a2, plotBox: h2, inverted: c2, renderer: p2 } = t3;
            if (!p2.forExport && (o2 ? (t3.scrollablePixelsX = i3 = Math.max(0, o2 - t3.chartWidth), i3 && (t3.scrollablePlotBox = d(t3.plotBox), h2.width = t3.plotWidth += i3, a2[c2 ? "height" : "width"] += i3, r2 = true)) : n2 && (t3.scrollablePixelsY = s2 = Math.max(0, n2 - t3.chartHeight), l(s2) && (t3.scrollablePlotBox = d(t3.plotBox), h2.height = t3.plotHeight += s2, a2[c2 ? "width" : "height"] += s2, r2 = false)), l(r2) && !e3.skipAxes)) for (let e4 of t3.axes) e4.horiz === r2 && (e4.setAxisSize(), e4.setAxisTranslation());
          }
          constructor(t3) {
            var _a;
            let e3;
            let s2 = t3.options.chart, r2 = i2.getRendererType(), o2 = s2.scrollablePlotArea || {}, l2 = this.moveFixedElements.bind(this), d2 = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
            t3.scrollablePixelsX && (d2.overflowX = "auto"), t3.scrollablePixelsY && (d2.overflowY = "auto"), this.chart = t3;
            let c2 = this.parentDiv = a("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, t3.renderTo), p2 = this.scrollingContainer = a("div", { className: "highcharts-scrolling" }, d2, c2), u2 = this.innerContainer = a("div", { className: "highcharts-inner-container" }, void 0, p2), g2 = this.fixedDiv = a("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (((_a = s2.style) == null ? void 0 : _a.zIndex) || 0) + 2, top: 0 }, void 0, true), f = this.fixedRenderer = new r2(g2, t3.chartWidth, t3.chartHeight, s2.style);
            this.mask = f.path().attr({ fill: s2.backgroundColor || "#fff", "fill-opacity": o2.opacity ?? 0.85, zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), p2.parentNode.insertBefore(g2, p2), h(t3.renderTo, { overflow: "visible" }), n(t3, "afterShowResetZoom", l2), n(t3, "afterApplyDrilldown", l2), n(t3, "afterLayOutTitles", l2), n(p2, "scroll", () => {
              let { pointer: i3, hoverPoint: s3 } = t3;
              i3 && (delete i3.chartPosition, s3 && (e3 = s3), i3.runPointActions(void 0, e3, true));
            }), u2.appendChild(t3.container);
          }
          applyFixed() {
            var _a;
            let { chart: t3, fixedRenderer: e3, isDirty: i3, scrollingContainer: s2 } = this, { axisOffset: o2, chartWidth: n2, chartHeight: a2, container: d2, plotHeight: c2, plotLeft: p2, plotTop: u2, plotWidth: g2, scrollablePixelsX: f = 0, scrollablePixelsY: m = 0 } = t3, { scrollPositionX: x = 0, scrollPositionY: y = 0 } = t3.options.chart.scrollablePlotArea || {}, b = n2 + f, v = a2 + m;
            e3.setSize(n2, a2), (i3 ?? true) && (this.isDirty = false, this.moveFixedElements()), r(t3.container), h(d2, { width: `${b}px`, height: `${v}px` }), t3.renderer.boxWrapper.attr({ width: b, height: v, viewBox: [0, 0, b, v].join(" ") }), (_a = t3.chartBackground) == null ? void 0 : _a.attr({ width: b, height: v }), h(s2, { width: `${n2}px`, height: `${a2}px` }), l(i3) || (s2.scrollLeft = f * x, s2.scrollTop = m * y);
            let S = u2 - o2[0] - 1, C = p2 - o2[3] - 1, k = u2 + c2 + o2[2] + 1, M = p2 + g2 + o2[1] + 1, w = p2 + g2 - f, T = u2 + c2 - m, A = [["M", 0, 0]];
            f ? A = [["M", 0, S], ["L", p2 - 1, S], ["L", p2 - 1, k], ["L", 0, k], ["Z"], ["M", w, S], ["L", n2, S], ["L", n2, k], ["L", w, k], ["Z"]] : m && (A = [["M", C, 0], ["L", C, u2 - 1], ["L", M, u2 - 1], ["L", M, 0], ["Z"], ["M", C, T], ["L", C, a2], ["L", M, a2], ["L", M, T], ["Z"]]), "adjustHeight" !== t3.redrawTrigger && this.mask.attr({ d: A });
          }
          moveFixedElements() {
            let t3;
            let { container: e3, inverted: i3, scrollablePixelsX: s2, scrollablePixelsY: r2 } = this.chart, o2 = this.fixedRenderer, n2 = g.fixedSelectors;
            for (let a2 of (s2 && !i3 ? t3 = ".highcharts-yaxis" : s2 && i3 ? t3 = ".highcharts-xaxis" : r2 && !i3 ? t3 = ".highcharts-xaxis" : r2 && i3 && (t3 = ".highcharts-yaxis"), t3 && n2.push(`${t3}:not(.highcharts-radial-axis)`, `${t3}-labels:not(.highcharts-radial-axis-labels)`), n2)) [].forEach.call(e3.querySelectorAll(a2), (t4) => {
              (t4.namespaceURI === o2.SVG_NS ? o2.box : o2.box.parentNode).appendChild(t4), t4.style.pointerEvents = "auto";
            });
          }
        }
        return g.fixedSelectors = [".highcharts-breadcrumbs-group", ".highcharts-contextbutton", ".highcharts-caption", ".highcharts-credits", ".highcharts-drillup-button", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-range-selector-group", ".highcharts-reset-zoom", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"], g;
      }), i(e, "Core/Axis/Stacking/StackItem.js", [e["Core/Templating.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { format: s } = t2, { series: r } = e2, { destroyObjectProperties: o, fireEvent: n, isNumber: a, pick: h } = i2;
        return class {
          constructor(t3, e3, i3, s2, r2) {
            let o2 = t3.chart.inverted, n2 = t3.reversed;
            this.axis = t3;
            let a2 = this.isNegative = !!i3 != !!n2;
            this.options = e3 = e3 || {}, this.x = s2, this.total = null, this.cumulative = null, this.points = {}, this.hasValidPoints = false, this.stack = r2, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = { align: e3.align || (o2 ? a2 ? "left" : "right" : "center"), verticalAlign: e3.verticalAlign || (o2 ? "middle" : a2 ? "bottom" : "top"), y: e3.y, x: e3.x }, this.textAlign = e3.textAlign || (o2 ? a2 ? "right" : "left" : "center");
          }
          destroy() {
            o(this, this.axis);
          }
          render(t3) {
            let e3 = this.axis.chart, i3 = this.options, r2 = i3.format, o2 = r2 ? s(r2, this, e3) : i3.formatter.call(this);
            if (this.label) this.label.attr({ text: o2, visibility: "hidden" });
            else {
              this.label = e3.renderer.label(o2, null, void 0, i3.shape, void 0, void 0, i3.useHTML, false, "stack-labels");
              let s2 = { r: i3.borderRadius || 0, text: o2, padding: h(i3.padding, 5), visibility: "hidden" };
              e3.styledMode || (s2.fill = i3.backgroundColor, s2.stroke = i3.borderColor, s2["stroke-width"] = i3.borderWidth, this.label.css(i3.style || {})), this.label.attr(s2), this.label.added || this.label.add(t3);
            }
            this.label.labelrank = e3.plotSizeY, n(this, "afterRender");
          }
          setOffset(t3, e3, i3, s2, o2, l) {
            let { alignOptions: d, axis: c, label: p, options: u, textAlign: g } = this, f = c.chart, m = this.getStackBox({ xOffset: t3, width: e3, boxBottom: i3, boxTop: s2, defaultX: o2, xAxis: l }), { verticalAlign: x } = d;
            if (p && m) {
              let t4 = p.getBBox(void 0, 0), e4 = p.padding, i4 = "justify" === h(u.overflow, "justify"), s3;
              d.x = u.x || 0, d.y = u.y || 0;
              let { x: o3, y: n2 } = this.adjustStackPosition({ labelBox: t4, verticalAlign: x, textAlign: g });
              m.x -= o3, m.y -= n2, p.align(d, false, m), (s3 = f.isInsidePlot(p.alignAttr.x + d.x + o3, p.alignAttr.y + d.y + n2)) || (i4 = false), i4 && r.prototype.justifyDataLabel.call(c, p, d, p.alignAttr, t4, m), p.attr({ x: p.alignAttr.x, y: p.alignAttr.y, rotation: u.rotation, rotationOriginX: t4.width * { left: 0, center: 0.5, right: 1 }[u.textAlign || "center"], rotationOriginY: t4.height / 2 }), h(!i4 && u.crop, true) && (s3 = a(p.x) && a(p.y) && f.isInsidePlot(p.x - e4 + (p.width || 0), p.y) && f.isInsidePlot(p.x + e4, p.y)), p[s3 ? "show" : "hide"]();
            }
            n(this, "afterSetOffset", { xOffset: t3, width: e3 });
          }
          adjustStackPosition({ labelBox: t3, verticalAlign: e3, textAlign: i3 }) {
            let s2 = { bottom: 0, middle: 1, top: 2, right: 1, center: 0, left: -1 }, r2 = s2[e3], o2 = s2[i3];
            return { x: t3.width / 2 + t3.width / 2 * o2, y: t3.height / 2 * r2 };
          }
          getStackBox(t3) {
            let e3 = this.axis, i3 = e3.chart, { boxTop: s2, defaultX: r2, xOffset: o2, width: n2, boxBottom: l } = t3, d = e3.stacking.usePercentage ? 100 : h(s2, this.total, 0), c = e3.toPixels(d), p = t3.xAxis || i3.xAxis[0], u = h(r2, p.translate(this.x)) + o2, g = Math.abs(c - e3.toPixels(l || a(e3.min) && e3.logarithmic && e3.logarithmic.lin2log(e3.min) || 0)), f = i3.inverted, m = this.isNegative;
            return f ? { x: (m ? c : c - g) - i3.plotLeft, y: p.height - u - n2 + p.top - i3.plotTop, width: g, height: n2 } : { x: u + p.transB - i3.plotLeft, y: (m ? c - g : c) - i3.plotTop, width: n2, height: g };
          }
        };
      }), i(e, "Core/Axis/Stacking/StackingAxis.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Axis/Axis.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Axis/Stacking/StackItem.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r) {
        var o;
        let { getDeferredAnimation: n } = t2, { series: { prototype: a } } = i2, { addEvent: h, correctFloat: l, defined: d, destroyObjectProperties: c, fireEvent: p, isArray: u, isNumber: g, objectEach: f, pick: m } = r;
        function x() {
          let t3 = this.inverted;
          this.axes.forEach((t4) => {
            t4.stacking && t4.stacking.stacks && t4.hasVisibleSeries && (t4.stacking.oldStacks = t4.stacking.stacks);
          }), this.series.forEach((e3) => {
            let i3 = e3.xAxis && e3.xAxis.options || {};
            e3.options.stacking && e3.reserveSpace() && (e3.stackKey = [e3.type, m(e3.options.stack, ""), t3 ? i3.top : i3.left, t3 ? i3.height : i3.width].join(","));
          });
        }
        function y() {
          var _a;
          let t3 = this.stacking;
          if (t3) {
            let e3 = t3.stacks;
            f(e3, (t4, i3) => {
              c(t4), delete e3[i3];
            }), (_a = t3.stackTotalGroup) == null ? void 0 : _a.destroy();
          }
        }
        function b() {
          this.stacking || (this.stacking = new w(this));
        }
        function v(t3, e3, i3, s2) {
          return !d(t3) || t3.x !== e3 || s2 && t3.stackKey !== s2 ? t3 = { x: e3, index: 0, key: s2, stackKey: s2 } : t3.index++, t3.key = [i3, e3, t3.index].join(","), t3;
        }
        function S() {
          let t3;
          let e3 = this, i3 = e3.yAxis, s2 = e3.stackKey || "", r2 = i3.stacking.stacks, o2 = e3.processedXData, n2 = e3.options.stacking, a2 = e3[n2 + "Stacker"];
          a2 && [s2, "-" + s2].forEach((i4) => {
            var _a;
            let s3 = o2.length, n3, h2, l2;
            for (; s3--; ) n3 = o2[s3], t3 = e3.getStackIndicator(t3, n3, e3.index, i4), h2 = (_a = r2[i4]) == null ? void 0 : _a[n3], (l2 = h2 == null ? void 0 : h2.points[t3.key || ""]) && a2.call(e3, l2, h2, s3);
          });
        }
        function C(t3, e3, i3) {
          let s2 = e3.total ? 100 / e3.total : 0;
          t3[0] = l(t3[0] * s2), t3[1] = l(t3[1] * s2), this.stackedYData[i3] = t3[1];
        }
        function k(t3) {
          (this.is("column") || this.is("columnrange")) && (this.options.centerInCategory && !this.options.stacking && this.chart.series.length > 1 ? a.setStackedPoints.call(this, t3, "group") : t3.stacking.resetStacks());
        }
        function M(t3, e3) {
          var _a, _b;
          let i3, r2, o2, n2, a2, h2, c2, p2, g2;
          let f2 = e3 || this.options.stacking;
          if (!f2 || !this.reserveSpace() || ({ group: "xAxis" }[f2] || "yAxis") !== t3.coll) return;
          let x2 = this.processedXData, y2 = this.processedYData, b2 = [], v2 = y2.length, S2 = this.options, C2 = S2.threshold || 0, k2 = S2.startFromThreshold ? C2 : 0, M2 = S2.stack, w2 = e3 ? `${this.type},${f2}` : this.stackKey || "", T = "-" + w2, A = this.negStacks, P = t3.stacking, L = P.stacks, O = P.oldStacks;
          for (P.stacksTouched += 1, c2 = 0; c2 < v2; c2++) {
            p2 = x2[c2], g2 = y2[c2], h2 = (i3 = this.getStackIndicator(i3, p2, this.index)).key || "", L[a2 = (r2 = A && g2 < (k2 ? 0 : C2)) ? T : w2] || (L[a2] = {}), L[a2][p2] || (((_a = O[a2]) == null ? void 0 : _a[p2]) ? (L[a2][p2] = O[a2][p2], L[a2][p2].total = null) : L[a2][p2] = new s(t3, t3.options.stackLabels, !!r2, p2, M2)), o2 = L[a2][p2], null !== g2 ? (o2.points[h2] = o2.points[this.index] = [m(o2.cumulative, k2)], d(o2.cumulative) || (o2.base = h2), o2.touched = P.stacksTouched, i3.index > 0 && false === this.singleStacks && (o2.points[h2][0] = o2.points[this.index + "," + p2 + ",0"][0])) : (delete o2.points[h2], delete o2.points[this.index]);
            let e4 = o2.total || 0;
            "percent" === f2 ? (n2 = r2 ? w2 : T, e4 = A && ((_b = L[n2]) == null ? void 0 : _b[p2]) ? (n2 = L[n2][p2]).total = Math.max(n2.total || 0, e4) + Math.abs(g2) || 0 : l(e4 + (Math.abs(g2) || 0))) : "group" === f2 ? (u(g2) && (g2 = g2[0]), null !== g2 && e4++) : e4 = l(e4 + (g2 || 0)), "group" === f2 ? o2.cumulative = (e4 || 1) - 1 : o2.cumulative = l(m(o2.cumulative, k2) + (g2 || 0)), o2.total = e4, null !== g2 && (o2.points[h2].push(o2.cumulative), b2[c2] = o2.cumulative, o2.hasValidPoints = true);
          }
          "percent" === f2 && (P.usePercentage = true), "group" !== f2 && (this.stackedYData = b2), P.oldStacks = {};
        }
        class w {
          constructor(t3) {
            this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = t3;
          }
          buildStacks() {
            let t3, e3;
            let i3 = this.axis, s2 = i3.series, r2 = "xAxis" === i3.coll, o2 = i3.options.reversedStacks, n2 = s2.length;
            for (this.resetStacks(), this.usePercentage = false, e3 = n2; e3--; ) t3 = s2[o2 ? e3 : n2 - e3 - 1], r2 && t3.setGroupedPoints(i3), t3.setStackedPoints(i3);
            if (!r2) for (e3 = 0; e3 < n2; e3++) s2[e3].modifyStacks();
            p(i3, "afterBuildStacks");
          }
          cleanStacks() {
            this.oldStacks && (this.stacks = this.oldStacks, f(this.stacks, (t3) => {
              f(t3, (t4) => {
                t4.cumulative = t4.total;
              });
            }));
          }
          resetStacks() {
            f(this.stacks, (t3) => {
              f(t3, (e3, i3) => {
                g(e3.touched) && e3.touched < this.stacksTouched ? (e3.destroy(), delete t3[i3]) : (e3.total = null, e3.cumulative = null);
              });
            });
          }
          renderStackTotals() {
            var _a;
            let t3 = this.axis, e3 = t3.chart, i3 = e3.renderer, s2 = this.stacks, r2 = n(e3, ((_a = t3.options.stackLabels) == null ? void 0 : _a.animation) || false), o2 = this.stackTotalGroup = this.stackTotalGroup || i3.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add();
            o2.translate(e3.plotLeft, e3.plotTop), f(s2, (t4) => {
              f(t4, (t5) => {
                t5.render(o2);
              });
            }), o2.animate({ opacity: 1 }, r2);
          }
        }
        return (o || (o = {})).compose = function(t3, e3, i3) {
          let s2 = e3.prototype, r2 = i3.prototype;
          s2.getStacks || (h(t3, "init", b), h(t3, "destroy", y), s2.getStacks = x, r2.getStackIndicator = v, r2.modifyStacks = S, r2.percentStacker = C, r2.setGroupedPoints = k, r2.setStackedPoints = M);
        }, o;
      }), i(e, "Series/Line/LineSeries.js", [e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { defined: s, merge: r, isObject: o } = i2;
        class n extends t2 {
          drawGraph() {
            let t3 = this.options, e3 = (this.gappedPath || this.getGraphPath).call(this), i3 = this.chart.styledMode;
            [this, ...this.zones].forEach((s2, n2) => {
              let a, h = s2.graph, l = h ? "animate" : "attr", d = s2.dashStyle || t3.dashStyle;
              h ? (h.endX = this.preventGraphAnimation ? null : e3.xMap, h.animate({ d: e3 })) : e3.length && (s2.graph = h = this.chart.renderer.path(e3).addClass("highcharts-graph" + (n2 ? ` highcharts-zone-graph-${n2 - 1} ` : " ") + (n2 && s2.className || "")).attr({ zIndex: 1 }).add(this.group)), h && !i3 && (a = { stroke: !n2 && t3.lineColor || s2.color || this.color || "#cccccc", "stroke-width": t3.lineWidth || 0, fill: this.fillGraph && this.color || "none" }, d ? a.dashstyle = d : "square" !== t3.linecap && (a["stroke-linecap"] = a["stroke-linejoin"] = "round"), h[l](a).shadow(n2 < 2 && t3.shadow && r({ filterUnits: "userSpaceOnUse" }, o(t3.shadow) ? t3.shadow : {}))), h && (h.startX = e3.xMap, h.isArea = e3.isArea);
            });
          }
          getGraphPath(t3, e3, i3) {
            let r2 = this, o2 = r2.options, n2 = [], a = [], h, l = o2.step, d = (t3 = t3 || r2.points).reversed;
            return d && t3.reverse(), (l = { right: 1, center: 2 }[l] || l && 3) && d && (l = 4 - l), (t3 = this.getValidPoints(t3, false, !(o2.connectNulls && !e3 && !i3))).forEach(function(d2, c) {
              let p;
              let u = d2.plotX, g = d2.plotY, f = t3[c - 1], m = d2.isNull || "number" != typeof g;
              (d2.leftCliff || f && f.rightCliff) && !i3 && (h = true), m && !s(e3) && c > 0 ? h = !o2.connectNulls : m && !e3 ? h = true : (0 === c || h ? p = [["M", d2.plotX, d2.plotY]] : r2.getPointSpline ? p = [r2.getPointSpline(t3, d2, c)] : l ? (p = 1 === l ? [["L", f.plotX, g]] : 2 === l ? [["L", (f.plotX + u) / 2, f.plotY], ["L", (f.plotX + u) / 2, g]] : [["L", u, f.plotY]]).push(["L", u, g]) : p = [["L", u, g]], a.push(d2.x), l && (a.push(d2.x), 2 === l && a.push(d2.x)), n2.push.apply(n2, p), h = false);
            }), n2.xMap = a, r2.graphPath = n2, n2;
          }
        }
        return n.defaultOptions = r(t2.defaultOptions, { legendSymbol: "lineMarker" }), e2.registerSeriesType("line", n), n;
      }), i(e, "Series/Area/AreaSeriesDefaults.js", [], function() {
        return { threshold: 0, legendSymbol: "areaMarker" };
      }), i(e, "Series/Area/AreaSeries.js", [e["Series/Area/AreaSeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { seriesTypes: { line: s } } = e2, { extend: r, merge: o, objectEach: n, pick: a } = i2;
        class h extends s {
          drawGraph() {
            this.areaPath = [], super.drawGraph.apply(this);
            let { areaPath: t3, options: e3 } = this;
            [this, ...this.zones].forEach((i3, s2) => {
              let r2 = {}, o2 = i3.fillColor || e3.fillColor, n2 = i3.area, a2 = n2 ? "animate" : "attr";
              n2 ? (n2.endX = this.preventGraphAnimation ? null : t3.xMap, n2.animate({ d: t3 })) : (r2.zIndex = 0, (n2 = i3.area = this.chart.renderer.path(t3).addClass("highcharts-area" + (s2 ? ` highcharts-zone-area-${s2 - 1} ` : " ") + (s2 && i3.className || "")).add(this.group)).isArea = true), this.chart.styledMode || (r2.fill = o2 || i3.color || this.color, r2["fill-opacity"] = o2 ? 1 : e3.fillOpacity ?? 0.75, n2.css({ pointerEvents: this.stickyTracking ? "none" : "auto" })), n2[a2](r2), n2.startX = t3.xMap, n2.shiftUnit = e3.step ? 2 : 1;
            });
          }
          getGraphPath(t3) {
            let e3, i3, r2;
            let o2 = s.prototype.getGraphPath, n2 = this.options, h2 = n2.stacking, l = this.yAxis, d = [], c = [], p = this.index, u = l.stacking.stacks[this.stackKey], g = n2.threshold, f = Math.round(l.getThreshold(n2.threshold)), m = a(n2.connectNulls, "percent" === h2), x = function(i4, s2, r3) {
              let o3 = t3[i4], n3 = h2 && u[o3.x].points[p], a2 = o3[r3 + "Null"] || 0, m2 = o3[r3 + "Cliff"] || 0, x2, y2, b2 = true;
              m2 || a2 ? (x2 = (a2 ? n3[0] : n3[1]) + m2, y2 = n3[0] + m2, b2 = !!a2) : !h2 && t3[s2] && t3[s2].isNull && (x2 = y2 = g), void 0 !== x2 && (c.push({ plotX: e3, plotY: null === x2 ? f : l.getThreshold(x2), isNull: b2, isCliff: true }), d.push({ plotX: e3, plotY: null === y2 ? f : l.getThreshold(y2), doCurve: false }));
            };
            t3 = t3 || this.points, h2 && (t3 = this.getStackPoints(t3));
            for (let s2 = 0, o3 = t3.length; s2 < o3; ++s2) h2 || (t3[s2].leftCliff = t3[s2].rightCliff = t3[s2].leftNull = t3[s2].rightNull = void 0), i3 = t3[s2].isNull, e3 = a(t3[s2].rectPlotX, t3[s2].plotX), r2 = h2 ? a(t3[s2].yBottom, f) : f, i3 && !m || (m || x(s2, s2 - 1, "left"), i3 && !h2 && m || (c.push(t3[s2]), d.push({ x: s2, plotX: e3, plotY: r2 })), m || x(s2, s2 + 1, "right"));
            let y = o2.call(this, c, true, true);
            d.reversed = true;
            let b = o2.call(this, d, true, true), v = b[0];
            v && "M" === v[0] && (b[0] = ["L", v[1], v[2]]);
            let S = y.concat(b);
            S.length && S.push(["Z"]);
            let C = o2.call(this, c, false, m);
            return this.chart.series.length > 1 && h2 && c.some((t4) => t4.isCliff) && (S.hasStackedCliffs = C.hasStackedCliffs = true), S.xMap = y.xMap, this.areaPath = S, C;
          }
          getStackPoints(t3) {
            let e3 = this, i3 = [], s2 = [], r2 = this.xAxis, o2 = this.yAxis, h2 = o2.stacking.stacks[this.stackKey], l = {}, d = o2.series, c = d.length, p = o2.options.reversedStacks ? 1 : -1, u = d.indexOf(e3);
            if (t3 = t3 || this.points, this.options.stacking) {
              for (let e4 = 0; e4 < t3.length; e4++) t3[e4].leftNull = t3[e4].rightNull = void 0, l[t3[e4].x] = t3[e4];
              n(h2, function(t4, e4) {
                null !== t4.total && s2.push(e4);
              }), s2.sort(function(t4, e4) {
                return t4 - e4;
              });
              let g = d.map((t4) => t4.visible);
              s2.forEach(function(t4, n2) {
                let f = 0, m, x;
                if (l[t4] && !l[t4].isNull) i3.push(l[t4]), [-1, 1].forEach(function(i4) {
                  let r3 = 1 === i4 ? "rightNull" : "leftNull", o3 = h2[s2[n2 + i4]], a2 = 0;
                  if (o3) {
                    let i5 = u;
                    for (; i5 >= 0 && i5 < c; ) {
                      let s3 = d[i5].index;
                      !(m = o3.points[s3]) && (s3 === e3.index ? l[t4][r3] = true : g[i5] && (x = h2[t4].points[s3]) && (a2 -= x[1] - x[0])), i5 += p;
                    }
                  }
                  l[t4][1 === i4 ? "rightCliff" : "leftCliff"] = a2;
                });
                else {
                  let e4 = u;
                  for (; e4 >= 0 && e4 < c; ) {
                    let i4 = d[e4].index;
                    if (m = h2[t4].points[i4]) {
                      f = m[1];
                      break;
                    }
                    e4 += p;
                  }
                  f = a(f, 0), f = o2.translate(f, 0, 1, 0, 1), i3.push({ isNull: true, plotX: r2.translate(t4, 0, 0, 0, 1), x: t4, plotY: f, yBottom: f });
                }
              });
            }
            return i3;
          }
        }
        return h.defaultOptions = o(s.defaultOptions, t2), r(h.prototype, { singleStacks: false }), e2.registerSeriesType("area", h), h;
      }), i(e, "Series/Spline/SplineSeries.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { line: i2 } = t2.seriesTypes, { merge: s, pick: r } = e2;
        class o extends i2 {
          getPointSpline(t3, e3, i3) {
            let s2, o2, n, a;
            let h = e3.plotX || 0, l = e3.plotY || 0, d = t3[i3 - 1], c = t3[i3 + 1];
            function p(t4) {
              return t4 && !t4.isNull && false !== t4.doCurve && !e3.isCliff;
            }
            if (p(d) && p(c)) {
              let t4 = d.plotX || 0, i4 = d.plotY || 0, r2 = c.plotX || 0, p2 = c.plotY || 0, u2 = 0;
              s2 = (1.5 * h + t4) / 2.5, o2 = (1.5 * l + i4) / 2.5, n = (1.5 * h + r2) / 2.5, a = (1.5 * l + p2) / 2.5, n !== s2 && (u2 = (a - o2) * (n - h) / (n - s2) + l - a), o2 += u2, a += u2, o2 > i4 && o2 > l ? (o2 = Math.max(i4, l), a = 2 * l - o2) : o2 < i4 && o2 < l && (o2 = Math.min(i4, l), a = 2 * l - o2), a > p2 && a > l ? (a = Math.max(p2, l), o2 = 2 * l - a) : a < p2 && a < l && (a = Math.min(p2, l), o2 = 2 * l - a), e3.rightContX = n, e3.rightContY = a, e3.controlPoints = { low: [s2, o2], high: [n, a] };
            }
            let u = ["C", r(d.rightContX, d.plotX, 0), r(d.rightContY, d.plotY, 0), r(s2, h, 0), r(o2, l, 0), h, l];
            return d.rightContX = d.rightContY = void 0, u;
          }
        }
        return o.defaultOptions = s(i2.defaultOptions), t2.registerSeriesType("spline", o), o;
      }), i(e, "Series/AreaSpline/AreaSplineSeries.js", [e["Series/Spline/SplineSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { area: s, area: { prototype: r } } = e2.seriesTypes, { extend: o, merge: n } = i2;
        class a extends t2 {
        }
        return a.defaultOptions = n(t2.defaultOptions, s.defaultOptions), o(a.prototype, { getGraphPath: r.getGraphPath, getStackPoints: r.getStackPoints, drawGraph: r.drawGraph }), e2.registerSeriesType("areaspline", a), a;
      }), i(e, "Series/Column/ColumnSeriesDefaults.js", [], function() {
        return { borderRadius: 3, centerInCategory: false, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: false, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: true, stickyTracking: false, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" };
      }), i(e, "Series/Column/ColumnSeries.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Color/Color.js"], e["Series/Column/ColumnSeriesDefaults.js"], e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o, n) {
        let { animObject: a } = t2, { parse: h } = e2, { noop: l } = s, { clamp: d, crisp: c, defined: p, extend: u, fireEvent: g, isArray: f, isNumber: m, merge: x, pick: y, objectEach: b } = n;
        class v extends r {
          animate(t3) {
            let e3, i3;
            let s2 = this, r2 = this.yAxis, o2 = r2.pos, n2 = r2.reversed, h2 = s2.options, { clipOffset: l2, inverted: c2 } = this.chart, p2 = {}, g2 = c2 ? "translateX" : "translateY";
            t3 && l2 ? (p2.scaleY = 1e-3, i3 = d(r2.toPixels(h2.threshold), o2, o2 + r2.len), c2 ? (i3 += n2 ? -Math.floor(l2[0]) : Math.ceil(l2[2]), p2.translateX = i3 - r2.len) : (i3 += n2 ? Math.ceil(l2[0]) : -Math.floor(l2[2]), p2.translateY = i3), s2.clipBox && s2.setClip(), s2.group.attr(p2)) : (e3 = Number(s2.group.attr(g2)), s2.group.animate({ scaleY: 1 }, u(a(s2.options.animation), { step: function(t4, i4) {
              s2.group && (p2[g2] = e3 + i4.pos * (o2 - e3), s2.group.attr(p2));
            } })));
          }
          init(t3, e3) {
            super.init.apply(this, arguments);
            let i3 = this;
            (t3 = i3.chart).hasRendered && t3.series.forEach(function(t4) {
              t4.type === i3.type && (t4.isDirty = true);
            });
          }
          getColumnMetrics() {
            var _a, _b;
            let t3 = this, e3 = t3.options, i3 = t3.xAxis, s2 = t3.yAxis, r2 = i3.options.reversedStacks, o2 = i3.reversed && !r2 || !i3.reversed && r2, n2 = {}, a2, h2 = 0;
            false === e3.grouping ? h2 = 1 : t3.chart.series.forEach(function(e4) {
              let i4;
              let r3 = e4.yAxis, o3 = e4.options;
              e4.type === t3.type && e4.reserveSpace() && s2.len === r3.len && s2.pos === r3.pos && (o3.stacking && "group" !== o3.stacking ? (void 0 === n2[a2 = e4.stackKey] && (n2[a2] = h2++), i4 = n2[a2]) : false !== o3.grouping && (i4 = h2++), e4.columnIndex = i4);
            });
            let l2 = Math.min(Math.abs(i3.transA) * (!((_a = i3.brokenAxis) == null ? void 0 : _a.hasBreaks) && ((_b = i3.ordinal) == null ? void 0 : _b.slope) || e3.pointRange || i3.closestPointRange || i3.tickInterval || 1), i3.len), d2 = l2 * e3.groupPadding, c2 = (l2 - 2 * d2) / (h2 || 1), p2 = Math.min(e3.maxPointWidth || i3.len, y(e3.pointWidth, c2 * (1 - 2 * e3.pointPadding))), u2 = (t3.columnIndex || 0) + (o2 ? 1 : 0);
            return t3.columnMetrics = { width: p2, offset: (c2 - p2) / 2 + (d2 + u2 * c2 - l2 / 2) * (o2 ? -1 : 1), paddedWidth: c2, columnCount: h2 }, t3.columnMetrics;
          }
          crispCol(t3, e3, i3, s2) {
            let r2 = this.borderWidth, o2 = this.chart.inverted;
            return s2 = c(e3 + s2, r2, o2) - (e3 = c(e3, r2, o2)), this.options.crisp && (i3 = c(t3 + i3, r2) - (t3 = c(t3, r2))), { x: t3, y: e3, width: i3, height: s2 };
          }
          adjustForMissingColumns(t3, e3, i3, s2) {
            var _a;
            if (!i3.isNull && s2.columnCount > 1) {
              let r2 = this.xAxis.series.filter((t4) => t4.visible).map((t4) => t4.index), o2 = 0, n2 = 0;
              b((_a = this.xAxis.stacking) == null ? void 0 : _a.stacks, (t4) => {
                if ("number" == typeof i3.x) {
                  let e4 = t4[i3.x.toString()];
                  if (e4 && f(e4.points[this.index])) {
                    let t5 = Object.keys(e4.points).filter((t6) => !t6.match(",") && e4.points[t6] && e4.points[t6].length > 1).map(parseFloat).filter((t6) => -1 !== r2.indexOf(t6)).sort((t6, e5) => e5 - t6);
                    o2 = t5.indexOf(this.index), n2 = t5.length;
                  }
                }
              }), o2 = this.xAxis.reversed ? n2 - 1 - o2 : o2;
              let a2 = (n2 - 1) * s2.paddedWidth + e3;
              t3 = (i3.plotX || 0) + a2 / 2 - e3 - o2 * s2.paddedWidth;
            }
            return t3;
          }
          translate() {
            let t3 = this, e3 = t3.chart, i3 = t3.options, s2 = t3.dense = t3.closestPointRange * t3.xAxis.transA < 2, o2 = t3.borderWidth = y(i3.borderWidth, s2 ? 0 : 1), n2 = t3.xAxis, a2 = t3.yAxis, h2 = i3.threshold, l2 = y(i3.minPointLength, 5), c2 = t3.getColumnMetrics(), u2 = c2.width, f2 = t3.pointXOffset = c2.offset, x2 = t3.dataMin, b2 = t3.dataMax, v2 = t3.translatedThreshold = a2.getThreshold(h2), S = t3.barW = Math.max(u2, 1 + 2 * o2);
            i3.pointPadding && (S = Math.ceil(S)), r.prototype.translate.apply(t3), t3.points.forEach(function(s3) {
              let r2 = y(s3.yBottom, v2), o3 = 999 + Math.abs(r2), g2 = s3.plotX || 0, C = d(s3.plotY, -o3, a2.len + o3), k, M = Math.min(C, r2), w = Math.max(C, r2) - M, T = u2, A = g2 + f2, P = S;
              l2 && Math.abs(w) < l2 && (w = l2, k = !a2.reversed && !s3.negative || a2.reversed && s3.negative, m(h2) && m(b2) && s3.y === h2 && b2 <= h2 && (a2.min || 0) < h2 && (x2 !== b2 || (a2.max || 0) <= h2) && (k = !k, s3.negative = !s3.negative), M = Math.abs(M - v2) > l2 ? r2 - l2 : v2 - (k ? l2 : 0)), p(s3.options.pointWidth) && (A -= Math.round(((T = P = Math.ceil(s3.options.pointWidth)) - u2) / 2)), i3.centerInCategory && !i3.stacking && (A = t3.adjustForMissingColumns(A, T, s3, c2)), s3.barX = A, s3.pointWidth = T, s3.tooltipPos = e3.inverted ? [d(a2.len + a2.pos - e3.plotLeft - C, a2.pos - e3.plotLeft, a2.len + a2.pos - e3.plotLeft), n2.len + n2.pos - e3.plotTop - A - P / 2, w] : [n2.left - e3.plotLeft + A + P / 2, d(C + a2.pos - e3.plotTop, a2.pos - e3.plotTop, a2.len + a2.pos - e3.plotTop), w], s3.shapeType = t3.pointClass.prototype.shapeType || "roundedRect", s3.shapeArgs = t3.crispCol(A, s3.isNull ? v2 : M, P, s3.isNull ? 0 : w);
            }), g(this, "afterColumnTranslate");
          }
          drawGraph() {
            this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
          }
          pointAttribs(t3, e3) {
            let i3 = this.options, s2 = this.pointAttrToOptions || {}, r2 = s2.stroke || "borderColor", o2 = s2["stroke-width"] || "borderWidth", n2, a2, l2, d2 = t3 && t3.color || this.color, c2 = t3 && t3[r2] || i3[r2] || d2, p2 = t3 && t3.options.dashStyle || i3.dashStyle, u2 = t3 && t3[o2] || i3[o2] || this[o2] || 0, g2 = y(t3 && t3.opacity, i3.opacity, 1);
            t3 && this.zones.length && (a2 = t3.getZone(), d2 = t3.options.color || a2 && (a2.color || t3.nonZonedColor) || this.color, a2 && (c2 = a2.borderColor || c2, p2 = a2.dashStyle || p2, u2 = a2.borderWidth || u2)), e3 && t3 && (l2 = (n2 = x(i3.states[e3], t3.options.states && t3.options.states[e3] || {})).brightness, d2 = n2.color || void 0 !== l2 && h(d2).brighten(n2.brightness).get() || d2, c2 = n2[r2] || c2, u2 = n2[o2] || u2, p2 = n2.dashStyle || p2, g2 = y(n2.opacity, g2));
            let f2 = { fill: d2, stroke: c2, "stroke-width": u2, opacity: g2 };
            return p2 && (f2.dashstyle = p2), f2;
          }
          drawPoints(t3 = this.points) {
            let e3;
            let i3 = this, s2 = this.chart, r2 = i3.options, o2 = s2.renderer, n2 = r2.animationLimit || 250;
            t3.forEach(function(t4) {
              let a2 = t4.plotY, h2 = t4.graphic, l2 = !!h2, d2 = h2 && s2.pointCount < n2 ? "animate" : "attr";
              m(a2) && null !== t4.y ? (e3 = t4.shapeArgs, h2 && t4.hasNewShapeType() && (h2 = h2.destroy()), i3.enabledDataSorting && (t4.startXPos = i3.xAxis.reversed ? -(e3 && e3.width || 0) : i3.xAxis.width), !h2 && (t4.graphic = h2 = o2[t4.shapeType](e3).add(t4.group || i3.group), h2 && i3.enabledDataSorting && s2.hasRendered && s2.pointCount < n2 && (h2.attr({ x: t4.startXPos }), l2 = true, d2 = "animate")), h2 && l2 && h2[d2](x(e3)), s2.styledMode || h2[d2](i3.pointAttribs(t4, t4.selected && "select")).shadow(false !== t4.allowShadow && r2.shadow), h2 && (h2.addClass(t4.getClassName(), true), h2.attr({ visibility: t4.visible ? "inherit" : "hidden" }))) : h2 && (t4.graphic = h2.destroy());
            });
          }
          drawTracker(t3 = this.points) {
            let e3;
            let i3 = this, s2 = i3.chart, r2 = s2.pointer, o2 = function(t4) {
              let e4 = r2 == null ? void 0 : r2.getPointFromEvent(t4);
              r2 && e4 && i3.options.enableMouseTracking && (r2.isDirectTouch = true, e4.onMouseOver(t4));
            };
            t3.forEach(function(t4) {
              e3 = f(t4.dataLabels) ? t4.dataLabels : t4.dataLabel ? [t4.dataLabel] : [], t4.graphic && (t4.graphic.element.point = t4), e3.forEach(function(e4) {
                (e4.div || e4.element).point = t4;
              });
            }), i3._hasTracking || (i3.trackerGroups.forEach(function(t4) {
              i3[t4] && (i3[t4].addClass("highcharts-tracker").on("mouseover", o2).on("mouseout", function(t5) {
                r2 == null ? void 0 : r2.onTrackerMouseOut(t5);
              }).on("touchstart", o2), !s2.styledMode && i3.options.cursor && i3[t4].css({ cursor: i3.options.cursor }));
            }), i3._hasTracking = true), g(this, "afterDrawTracker");
          }
          remove() {
            let t3 = this, e3 = t3.chart;
            e3.hasRendered && e3.series.forEach(function(e4) {
              e4.type === t3.type && (e4.isDirty = true);
            }), r.prototype.remove.apply(t3, arguments);
          }
        }
        return v.defaultOptions = x(r.defaultOptions, i2), u(v.prototype, { directTouch: true, getSymbol: l, negStacks: true, trackerGroups: ["group", "dataLabelsGroup"] }), o.registerSeriesType("column", v), v;
      }), i(e, "Core/Series/DataLabel.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Templating.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        var s;
        let { getDeferredAnimation: r } = t2, { format: o } = e2, { defined: n, extend: a, fireEvent: h, isArray: l, isString: d, merge: c, objectEach: p, pick: u, pInt: g, splat: f } = i2;
        return function(t3) {
          function e3() {
            return v(this).some((t4) => t4 == null ? void 0 : t4.enabled);
          }
          function i3(t4, e4, i4, s3, r2) {
            var _a;
            let { chart: o2, enabledDataSorting: h2 } = this, l2 = this.isCartesian && o2.inverted, d2 = t4.plotX, p2 = t4.plotY, g2 = i4.rotation || 0, f2 = n(d2) && n(p2) && o2.isInsidePlot(d2, Math.round(p2), { inverted: l2, paneCoordinates: true, series: this }), m2 = 0 === g2 && "justify" === u(i4.overflow, h2 ? "none" : "justify"), x2 = this.visible && false !== t4.visible && n(d2) && (t4.series.forceDL || h2 && !m2 || f2 || u(i4.inside, !!this.options.stacking) && s3 && o2.isInsidePlot(d2, l2 ? s3.x + 1 : s3.y + s3.height - 1, { inverted: l2, paneCoordinates: true, series: this })), y2 = t4.pos();
            if (x2 && y2) {
              var b2;
              let n2 = e4.getBBox(), d3 = e4.getBBox(void 0, 0), p3 = { right: 1, center: 0.5 }[i4.align || 0] || 0, v2 = { bottom: 1, middle: 0.5 }[i4.verticalAlign || 0] || 0;
              if (s3 = a({ x: y2[0], y: Math.round(y2[1]), width: 0, height: 0 }, s3 || {}), "plotEdges" === i4.alignTo && this.isCartesian && (s3[l2 ? "x" : "y"] = 0, s3[l2 ? "width" : "height"] = ((_a = this.yAxis) == null ? void 0 : _a.len) || 0), a(i4, { width: n2.width, height: n2.height }), b2 = s3, h2 && this.xAxis && !m2 && this.setDataLabelStartPos(t4, e4, r2, f2, b2), e4.align(c(i4, { width: d3.width, height: d3.height }), false, s3, false), e4.alignAttr.x += p3 * (d3.width - n2.width), e4.alignAttr.y += v2 * (d3.height - n2.height), e4[e4.placed ? "animate" : "attr"]({ x: e4.alignAttr.x + (n2.width - d3.width) / 2, y: e4.alignAttr.y + (n2.height - d3.height) / 2, rotationOriginX: (e4.width || 0) / 2, rotationOriginY: (e4.height || 0) / 2 }), m2 && s3.height >= 0) this.justifyDataLabel(e4, i4, e4.alignAttr, n2, s3, r2);
              else if (u(i4.crop, true)) {
                let { x: t5, y: i5 } = e4.alignAttr;
                x2 = o2.isInsidePlot(t5, i5, { paneCoordinates: true, series: this }) && o2.isInsidePlot(t5 + n2.width - 1, i5 + n2.height - 1, { paneCoordinates: true, series: this });
              }
              i4.shape && !g2 && e4[r2 ? "attr" : "animate"]({ anchorX: y2[0], anchorY: y2[1] });
            }
            r2 && h2 && (e4.placed = false), x2 || h2 && !m2 ? (e4.show(), e4.placed = true) : (e4.hide(), e4.placed = false);
          }
          function s2() {
            return this.plotGroup("dataLabelsGroup", "data-labels", this.hasRendered ? "inherit" : "hidden", this.options.dataLabels.zIndex || 6);
          }
          function m(t4) {
            let e4 = this.hasRendered || 0, i4 = this.initDataLabelsGroup().attr({ opacity: +e4 });
            return !e4 && i4 && (this.visible && i4.show(), this.options.animation ? i4.animate({ opacity: 1 }, t4) : i4.attr({ opacity: 1 })), i4;
          }
          function x(t4) {
            var _a;
            let e4;
            t4 = t4 || this.points;
            let i4 = this, s3 = i4.chart, a2 = i4.options, l2 = s3.renderer, { backgroundColor: c2, plotBackgroundColor: m2 } = s3.options.chart, x2 = l2.getContrast(d(m2) && m2 || d(c2) && c2 || "#000000"), y2 = v(i4), { animation: S2, defer: C } = y2[0], k = C ? r(s3, S2, i4) : { defer: 0, duration: 0 };
            h(this, "drawDataLabels"), ((_a = i4.hasDataLabels) == null ? void 0 : _a.call(i4)) && (e4 = this.initDataLabels(k), t4.forEach((t5) => {
              var _a2, _b;
              let r2 = t5.dataLabels || [];
              f(b(y2, t5.dlOptions || ((_a2 = t5.options) == null ? void 0 : _a2.dataLabels))).forEach((c4, f2) => {
                let m3 = c4.enabled && (t5.visible || t5.dataLabelOnHidden) && (!t5.isNull || t5.dataLabelOnNull) && function(t6, e5) {
                  let i5 = e5.filter;
                  if (i5) {
                    let e6 = i5.operator, s4 = t6[i5.property], r3 = i5.value;
                    return ">" === e6 && s4 > r3 || "<" === e6 && s4 < r3 || ">=" === e6 && s4 >= r3 || "<=" === e6 && s4 <= r3 || "==" === e6 && s4 == r3 || "===" === e6 && s4 === r3 || "!=" === e6 && s4 != r3 || "!==" === e6 && s4 !== r3;
                  }
                  return true;
                }(t5, c4), { backgroundColor: y3, borderColor: b2, distance: v2, style: S3 = {} } = c4, C2, k2, M, w, T = {}, A = r2[f2], P = !A, L;
                m3 && (k2 = u(c4[t5.formatPrefix + "Format"], c4.format), C2 = t5.getLabelConfig(), M = n(k2) ? o(k2, C2, s3) : (c4[t5.formatPrefix + "Formatter"] || c4.formatter).call(C2, c4), w = c4.rotation, !s3.styledMode && (S3.color = u(c4.color, S3.color, d(i4.color) ? i4.color : void 0, "#000000"), "contrast" === S3.color ? ("none" !== y3 && (L = y3), t5.contrastColor = l2.getContrast("auto" !== L && L || t5.color || i4.color), S3.color = L || !n(v2) && c4.inside || 0 > g(v2 || 0) || a2.stacking ? t5.contrastColor : x2) : delete t5.contrastColor, a2.cursor && (S3.cursor = a2.cursor)), T = { r: c4.borderRadius || 0, rotation: w, padding: c4.padding, zIndex: 1 }, s3.styledMode || (T.fill = "auto" === y3 ? t5.color : y3, T.stroke = "auto" === b2 ? t5.color : b2, T["stroke-width"] = c4.borderWidth), p(T, (t6, e5) => {
                  void 0 === t6 && delete T[e5];
                })), !A || m3 && n(M) && !!A.div == !!c4.useHTML && (A.rotation && c4.rotation || A.rotation === c4.rotation) || (A = void 0, P = true), m3 && n(M) && (A ? T.text = M : (A = l2.label(M, 0, 0, c4.shape, void 0, void 0, c4.useHTML, void 0, "data-label")).addClass(" highcharts-data-label-color-" + t5.colorIndex + " " + (c4.className || "") + (c4.useHTML ? " highcharts-tracker" : "")), A && (A.options = c4, A.attr(T), s3.styledMode ? S3.width && A.css({ width: S3.width, textOverflow: S3.textOverflow }) : A.css(S3).shadow(c4.shadow), h(A, "beforeAddingDataLabel", { labelOptions: c4, point: t5 }), A.added || A.add(e4), i4.alignDataLabel(t5, A, c4, void 0, P), A.isActive = true, r2[f2] && r2[f2] !== A && r2[f2].destroy(), r2[f2] = A));
              });
              let c3 = r2.length;
              for (; c3--; ) r2[c3] && r2[c3].isActive ? r2[c3].isActive = false : ((_b = r2[c3]) == null ? void 0 : _b.destroy(), r2.splice(c3, 1));
              t5.dataLabel = r2[0], t5.dataLabels = r2;
            })), h(this, "afterDrawDataLabels");
          }
          function y(t4, e4, i4, s3, r2, o2) {
            let n2 = this.chart, a2 = e4.align, h2 = e4.verticalAlign, l2 = t4.box ? 0 : t4.padding || 0, d2 = n2.inverted ? this.yAxis : this.xAxis, c2 = d2 ? d2.left - n2.plotLeft : 0, p2 = n2.inverted ? this.xAxis : this.yAxis, u2 = p2 ? p2.top - n2.plotTop : 0, { x: g2 = 0, y: f2 = 0 } = e4, m2, x2;
            return (m2 = (i4.x || 0) + l2 + c2) < 0 && ("right" === a2 && g2 >= 0 ? (e4.align = "left", e4.inside = true) : g2 -= m2, x2 = true), (m2 = (i4.x || 0) + s3.width - l2 + c2) > n2.plotWidth && ("left" === a2 && g2 <= 0 ? (e4.align = "right", e4.inside = true) : g2 += n2.plotWidth - m2, x2 = true), (m2 = i4.y + l2 + u2) < 0 && ("bottom" === h2 && f2 >= 0 ? (e4.verticalAlign = "top", e4.inside = true) : f2 -= m2, x2 = true), (m2 = (i4.y || 0) + s3.height - l2 + u2) > n2.plotHeight && ("top" === h2 && f2 <= 0 ? (e4.verticalAlign = "bottom", e4.inside = true) : f2 += n2.plotHeight - m2, x2 = true), x2 && (e4.x = g2, e4.y = f2, t4.placed = !o2, t4.align(e4, void 0, r2)), x2;
          }
          function b(t4, e4) {
            let i4 = [], s3;
            if (l(t4) && !l(e4)) i4 = t4.map(function(t5) {
              return c(t5, e4);
            });
            else if (l(e4) && !l(t4)) i4 = e4.map(function(e5) {
              return c(t4, e5);
            });
            else if (l(t4) || l(e4)) {
              if (l(t4) && l(e4)) for (s3 = Math.max(t4.length, e4.length); s3--; ) i4[s3] = c(t4[s3], e4[s3]);
            } else i4 = c(t4, e4);
            return i4;
          }
          function v(t4) {
            var _a, _b;
            let e4 = t4.chart.options.plotOptions;
            return f(b(b((_a = e4 == null ? void 0 : e4.series) == null ? void 0 : _a.dataLabels, (_b = e4 == null ? void 0 : e4[t4.type]) == null ? void 0 : _b.dataLabels), t4.options.dataLabels));
          }
          function S(t4, e4, i4, s3, r2) {
            let o2 = this.chart, n2 = o2.inverted, a2 = this.xAxis, h2 = a2.reversed, l2 = ((n2 ? e4.height : e4.width) || 0) / 2, d2 = t4.pointWidth, c2 = d2 ? d2 / 2 : 0;
            e4.startXPos = n2 ? r2.x : h2 ? -l2 - c2 : a2.width - l2 + c2, e4.startYPos = n2 ? h2 ? this.yAxis.height - l2 + c2 : -l2 - c2 : r2.y, s3 ? "hidden" === e4.visibility && (e4.show(), e4.attr({ opacity: 0 }).animate({ opacity: 1 })) : e4.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, e4.hide), o2.hasRendered && (i4 && e4.attr({ x: e4.startXPos, y: e4.startYPos }), e4.placed = true);
          }
          t3.compose = function(t4) {
            let r2 = t4.prototype;
            r2.initDataLabels || (r2.initDataLabels = m, r2.initDataLabelsGroup = s2, r2.alignDataLabel = i3, r2.drawDataLabels = x, r2.justifyDataLabel = y, r2.setDataLabelStartPos = S, r2.hasDataLabels = e3);
          };
        }(s || (s = {})), s;
      }), i(e, "Series/Column/ColumnDataLabel.js", [e["Core/Series/DataLabel.js"], e["Core/Globals.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        var r;
        let { composed: o } = e2, { series: n } = i2, { merge: a, pick: h, pushUnique: l } = s;
        return function(e3) {
          function i3(t3, e4, i4, s2, r2) {
            let o2 = this.chart.inverted, l2 = t3.series, d = (l2.xAxis ? l2.xAxis.len : this.chart.plotSizeX) || 0, c = (l2.yAxis ? l2.yAxis.len : this.chart.plotSizeY) || 0, p = t3.dlBox || t3.shapeArgs, u = h(t3.below, t3.plotY > h(this.translatedThreshold, c)), g = h(i4.inside, !!this.options.stacking);
            if (p) {
              if (s2 = a(p), !("allow" === i4.overflow && false === i4.crop)) {
                s2.y < 0 && (s2.height += s2.y, s2.y = 0);
                let t4 = s2.y + s2.height - c;
                t4 > 0 && t4 < s2.height - 1 && (s2.height -= t4);
              }
              o2 && (s2 = { x: c - s2.y - s2.height, y: d - s2.x - s2.width, width: s2.height, height: s2.width }), g || (o2 ? (s2.x += u ? 0 : s2.width, s2.width = 0) : (s2.y += u ? s2.height : 0, s2.height = 0));
            }
            i4.align = h(i4.align, !o2 || g ? "center" : u ? "right" : "left"), i4.verticalAlign = h(i4.verticalAlign, o2 || g ? "middle" : u ? "top" : "bottom"), n.prototype.alignDataLabel.call(this, t3, e4, i4, s2, r2), i4.inside && t3.contrastColor && e4.css({ color: t3.contrastColor });
          }
          e3.compose = function(e4) {
            t2.compose(n), l(o, "ColumnDataLabel") && (e4.prototype.alignDataLabel = i3);
          };
        }(r || (r = {})), r;
      }), i(e, "Series/Bar/BarSeries.js", [e["Series/Column/ColumnSeries.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { extend: s, merge: r } = i2;
        class o extends t2 {
        }
        return o.defaultOptions = r(t2.defaultOptions, {}), s(o.prototype, { inverted: true }), e2.registerSeriesType("bar", o), o;
      }), i(e, "Series/Scatter/ScatterSeriesDefaults.js", [], function() {
        return { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: true }, tooltip: { headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.8em"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } };
      }), i(e, "Series/Scatter/ScatterSeries.js", [e["Series/Scatter/ScatterSeriesDefaults.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { column: s, line: r } = e2.seriesTypes, { addEvent: o, extend: n, merge: a } = i2;
        class h extends r {
          applyJitter() {
            let t3 = this, e3 = this.options.jitter, i3 = this.points.length;
            e3 && this.points.forEach(function(s2, r2) {
              ["x", "y"].forEach(function(o2, n2) {
                if (e3[o2] && !s2.isNull) {
                  let a2 = `plot${o2.toUpperCase()}`, h2 = t3[`${o2}Axis`], l = e3[o2] * h2.transA;
                  if (h2 && !h2.logarithmic) {
                    let t4 = Math.max(0, (s2[a2] || 0) - l), e4 = Math.min(h2.len, (s2[a2] || 0) + l);
                    s2[a2] = t4 + (e4 - t4) * function(t5) {
                      let e5 = 1e4 * Math.sin(t5);
                      return e5 - Math.floor(e5);
                    }(r2 + n2 * i3), "x" === o2 && (s2.clientX = s2.plotX);
                  }
                }
              });
            });
          }
          drawGraph() {
            this.options.lineWidth ? super.drawGraph() : this.graph && (this.graph = this.graph.destroy());
          }
        }
        return h.defaultOptions = a(r.defaultOptions, t2), n(h.prototype, { drawTracker: s.prototype.drawTracker, sorted: false, requireSorting: false, noSharedTooltip: true, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"] }), o(h, "afterTranslate", function() {
          this.applyJitter();
        }), e2.registerSeriesType("scatter", h), h;
      }), i(e, "Series/CenteredUtilities.js", [e["Core/Globals.js"], e["Core/Series/Series.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        var s, r;
        let { deg2rad: o } = t2, { fireEvent: n, isNumber: a, pick: h, relativeLength: l } = i2;
        return (r = s || (s = {})).getCenter = function() {
          let t3 = this.options, i3 = this.chart, s2 = 2 * (t3.slicedOffset || 0), r2 = i3.plotWidth - 2 * s2, o2 = i3.plotHeight - 2 * s2, d = t3.center, c = Math.min(r2, o2), p = t3.thickness, u, g = t3.size, f = t3.innerSize || 0, m, x;
          "string" == typeof g && (g = parseFloat(g)), "string" == typeof f && (f = parseFloat(f));
          let y = [h(d[0], "50%"), h(d[1], "50%"), h(g && g < 0 ? void 0 : t3.size, "100%"), h(f && f < 0 ? void 0 : t3.innerSize || 0, "0%")];
          for (!i3.angular || this instanceof e2 || (y[3] = 0), m = 0; m < 4; ++m) x = y[m], u = m < 2 || 2 === m && /%$/.test(x), y[m] = l(x, [r2, o2, c, y[2]][m]) + (u ? s2 : 0);
          return y[3] > y[2] && (y[3] = y[2]), a(p) && 2 * p < y[2] && p > 0 && (y[3] = y[2] - 2 * p), n(this, "afterGetCenter", { positions: y }), y;
        }, r.getStartAndEndRadians = function(t3, e3) {
          let i3 = a(t3) ? t3 : 0, s2 = a(e3) && e3 > i3 && e3 - i3 < 360 ? e3 : i3 + 360;
          return { start: o * (i3 + -90), end: o * (s2 + -90) };
        }, s;
      }), i(e, "Series/Pie/PiePoint.js", [e["Core/Animation/AnimationUtilities.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { setAnimation: s } = t2, { addEvent: r, defined: o, extend: n, isNumber: a, pick: h, relativeLength: l } = i2;
        class d extends e2 {
          getConnectorPath(t3) {
            let e3 = t3.dataLabelPosition, i3 = t3.options || {}, s2 = i3.connectorShape, r2 = this.connectorShapes[s2] || s2;
            return e3 && r2.call(this, { ...e3.computed, alignment: e3.alignment }, e3.connectorPosition, i3) || [];
          }
          getTranslate() {
            return this.sliced && this.slicedTranslation || { translateX: 0, translateY: 0 };
          }
          haloPath(t3) {
            let e3 = this.shapeArgs;
            return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e3.x, e3.y, e3.r + t3, e3.r + t3, { innerR: e3.r - 1, start: e3.start, end: e3.end, borderRadius: e3.borderRadius });
          }
          constructor(t3, e3, i3) {
            super(t3, e3, i3), this.half = 0, this.name ?? (this.name = "Slice");
            let s2 = (t4) => {
              this.slice("select" === t4.type);
            };
            r(this, "select", s2), r(this, "unselect", s2);
          }
          isValid() {
            return a(this.y) && this.y >= 0;
          }
          setVisible(t3, e3 = true) {
            t3 !== this.visible && this.update({ visible: t3 ?? !this.visible }, e3, void 0, false);
          }
          slice(t3, e3, i3) {
            let r2 = this.series;
            s(i3, r2.chart), e3 = h(e3, true), this.sliced = this.options.sliced = t3 = o(t3) ? t3 : !this.sliced, r2.options.data[r2.data.indexOf(this)] = this.options, this.graphic && this.graphic.animate(this.getTranslate());
          }
        }
        return n(d.prototype, { connectorShapes: { fixedOffset: function(t3, e3, i3) {
          let s2 = e3.breakAt, r2 = e3.touchingSliceAt, o2 = i3.softConnector ? ["C", t3.x + ("left" === t3.alignment ? -5 : 5), t3.y, 2 * s2.x - r2.x, 2 * s2.y - r2.y, s2.x, s2.y] : ["L", s2.x, s2.y];
          return [["M", t3.x, t3.y], o2, ["L", r2.x, r2.y]];
        }, straight: function(t3, e3) {
          let i3 = e3.touchingSliceAt;
          return [["M", t3.x, t3.y], ["L", i3.x, i3.y]];
        }, crookedLine: function(t3, e3, i3) {
          let { breakAt: s2, touchingSliceAt: r2 } = e3, { series: o2 } = this, [n2, a2, h2] = o2.center, d2 = h2 / 2, { plotLeft: c, plotWidth: p } = o2.chart, u = "left" === t3.alignment, { x: g, y: f } = t3, m = s2.x;
          if (i3.crookDistance) {
            let t4 = l(i3.crookDistance, 1);
            m = u ? n2 + d2 + (p + c - n2 - d2) * (1 - t4) : c + (n2 - d2) * t4;
          } else m = n2 + (a2 - f) * Math.tan((this.angle || 0) - Math.PI / 2);
          let x = [["M", g, f]];
          return (u ? m <= g && m >= s2.x : m >= g && m <= s2.x) && x.push(["L", m, f]), x.push(["L", s2.x, s2.y], ["L", r2.x, r2.y]), x;
        } } }), d;
      }), i(e, "Series/Pie/PieSeriesDefaults.js", [], function() {
        return { borderRadius: 3, center: [null, null], clip: false, colorByPoint: true, dataLabels: { connectorPadding: 5, connectorShape: "crookedLine", crookDistance: void 0, distance: 30, enabled: true, formatter: function() {
          return this.point.isNull ? void 0 : this.point.name;
        }, softConnector: true, x: 0 }, fillColor: void 0, ignoreHiddenPoint: true, inactiveOtherPoints: true, legendType: "point", marker: null, size: null, showInLegend: false, slicedOffset: 10, stickyTracking: false, tooltip: { followPointer: true }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } };
      }), i(e, "Series/Pie/PieSeries.js", [e["Series/CenteredUtilities.js"], e["Series/Column/ColumnSeries.js"], e["Core/Globals.js"], e["Series/Pie/PiePoint.js"], e["Series/Pie/PieSeriesDefaults.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Renderer/SVG/Symbols.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r, o, n, a, h) {
        let { getStartAndEndRadians: l } = t2, { noop: d } = i2, { clamp: c, extend: p, fireEvent: u, merge: g, pick: f } = h;
        class m extends o {
          animate(t3) {
            let e3 = this, i3 = e3.points, s2 = e3.startAngleRad;
            t3 || i3.forEach(function(t4) {
              let i4 = t4.graphic, r2 = t4.shapeArgs;
              i4 && r2 && (i4.attr({ r: f(t4.startR, e3.center && e3.center[3] / 2), start: s2, end: s2 }), i4.animate({ r: r2.r, start: r2.start, end: r2.end }, e3.options.animation));
            });
          }
          drawEmpty() {
            let t3, e3;
            let i3 = this.startAngleRad, s2 = this.endAngleRad, r2 = this.options;
            0 === this.total && this.center ? (t3 = this.center[0], e3 = this.center[1], this.graph || (this.graph = this.chart.renderer.arc(t3, e3, this.center[1] / 2, 0, i3, s2).addClass("highcharts-empty-series").add(this.group)), this.graph.attr({ d: a.arc(t3, e3, this.center[2] / 2, 0, { start: i3, end: s2, innerR: this.center[3] / 2 }) }), this.chart.styledMode || this.graph.attr({ "stroke-width": r2.borderWidth, fill: r2.fillColor || "none", stroke: r2.color || "#cccccc" })) : this.graph && (this.graph = this.graph.destroy());
          }
          drawPoints() {
            let t3 = this.chart.renderer;
            this.points.forEach(function(e3) {
              e3.graphic && e3.hasNewShapeType() && (e3.graphic = e3.graphic.destroy()), e3.graphic || (e3.graphic = t3[e3.shapeType](e3.shapeArgs).add(e3.series.group), e3.delayedRendering = true);
            });
          }
          generatePoints() {
            super.generatePoints(), this.updateTotals();
          }
          getX(t3, e3, i3, s2) {
            let r2 = this.center, o2 = this.radii ? this.radii[i3.index] || 0 : r2[2] / 2, n2 = s2.dataLabelPosition, a2 = (n2 == null ? void 0 : n2.distance) || 0, h2 = Math.asin(c((t3 - r2[1]) / (o2 + a2), -1, 1));
            return r2[0] + Math.cos(h2) * (o2 + a2) * (e3 ? -1 : 1) + (a2 > 0 ? (e3 ? -1 : 1) * (s2.padding || 0) : 0);
          }
          hasData() {
            return !!this.processedXData.length;
          }
          redrawPoints() {
            let t3, e3, i3, s2;
            let r2 = this, o2 = r2.chart;
            this.drawEmpty(), r2.group && !o2.styledMode && r2.group.shadow(r2.options.shadow), r2.points.forEach(function(n2) {
              let a2 = {};
              e3 = n2.graphic, !n2.isNull && e3 ? (s2 = n2.shapeArgs, t3 = n2.getTranslate(), o2.styledMode || (i3 = r2.pointAttribs(n2, n2.selected && "select")), n2.delayedRendering ? (e3.setRadialReference(r2.center).attr(s2).attr(t3), o2.styledMode || e3.attr(i3).attr({ "stroke-linejoin": "round" }), n2.delayedRendering = false) : (e3.setRadialReference(r2.center), o2.styledMode || g(true, a2, i3), g(true, a2, s2, t3), e3.animate(a2)), e3.attr({ visibility: n2.visible ? "inherit" : "hidden" }), e3.addClass(n2.getClassName(), true)) : e3 && (n2.graphic = e3.destroy());
            });
          }
          sortByAngle(t3, e3) {
            t3.sort(function(t4, i3) {
              return void 0 !== t4.angle && (i3.angle - t4.angle) * e3;
            });
          }
          translate(t3) {
            u(this, "translate"), this.generatePoints();
            let e3 = this.options, i3 = e3.slicedOffset, s2 = l(e3.startAngle, e3.endAngle), r2 = this.startAngleRad = s2.start, o2 = (this.endAngleRad = s2.end) - r2, n2 = this.points, a2 = e3.ignoreHiddenPoint, h2 = n2.length, d2, c2, p2, g2, f2, m2, x, y = 0;
            for (t3 || (this.center = t3 = this.getCenter()), m2 = 0; m2 < h2; m2++) {
              x = n2[m2], d2 = r2 + y * o2, x.isValid() && (!a2 || x.visible) && (y += x.percentage / 100), c2 = r2 + y * o2;
              let e4 = { x: t3[0], y: t3[1], r: t3[2] / 2, innerR: t3[3] / 2, start: Math.round(1e3 * d2) / 1e3, end: Math.round(1e3 * c2) / 1e3 };
              x.shapeType = "arc", x.shapeArgs = e4, (p2 = (c2 + d2) / 2) > 1.5 * Math.PI ? p2 -= 2 * Math.PI : p2 < -Math.PI / 2 && (p2 += 2 * Math.PI), x.slicedTranslation = { translateX: Math.round(Math.cos(p2) * i3), translateY: Math.round(Math.sin(p2) * i3) }, g2 = Math.cos(p2) * t3[2] / 2, f2 = Math.sin(p2) * t3[2] / 2, x.tooltipPos = [t3[0] + 0.7 * g2, t3[1] + 0.7 * f2], x.half = p2 < -Math.PI / 2 || p2 > Math.PI / 2 ? 1 : 0, x.angle = p2;
            }
            u(this, "afterTranslate");
          }
          updateTotals() {
            let t3 = this.points, e3 = t3.length, i3 = this.options.ignoreHiddenPoint, s2, r2, o2 = 0;
            for (s2 = 0; s2 < e3; s2++) (r2 = t3[s2]).isValid() && (!i3 || r2.visible) && (o2 += r2.y);
            for (s2 = 0, this.total = o2; s2 < e3; s2++) (r2 = t3[s2]).percentage = o2 > 0 && (r2.visible || !i3) ? r2.y / o2 * 100 : 0, r2.total = o2;
          }
        }
        return m.defaultOptions = g(o.defaultOptions, r), p(m.prototype, { axisTypes: [], directTouch: true, drawGraph: void 0, drawTracker: e2.prototype.drawTracker, getCenter: t2.getCenter, getSymbol: d, invertible: false, isCartesian: false, noSharedTooltip: true, pointAttribs: e2.prototype.pointAttribs, pointClass: s, requireSorting: false, searchPoint: d, trackerGroups: ["group", "dataLabelsGroup"] }), n.registerSeriesType("pie", m), m;
      }), i(e, "Series/Pie/PieDataLabel.js", [e["Core/Series/DataLabel.js"], e["Core/Globals.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, r) {
        var o;
        let { composed: n, noop: a } = e2, { distribute: h } = i2, { series: l } = s, { arrayMax: d, clamp: c, defined: p, pick: u, pushUnique: g, relativeLength: f } = r;
        return function(e3) {
          let i3 = { radialDistributionY: function(t3, e4) {
            var _a;
            return (((_a = e4.dataLabelPosition) == null ? void 0 : _a.top) || 0) + t3.distributeBox.pos;
          }, radialDistributionX: function(t3, e4, i4, s3, r3) {
            let o3 = r3.dataLabelPosition;
            return t3.getX(i4 < ((o3 == null ? void 0 : o3.top) || 0) + 2 || i4 > ((o3 == null ? void 0 : o3.bottom) || 0) - 2 ? s3 : i4, e4.half, e4, r3);
          }, justify: function(t3, e4, i4, s3) {
            var _a;
            return s3[0] + (t3.half ? -1 : 1) * (i4 + (((_a = e4.dataLabelPosition) == null ? void 0 : _a.distance) || 0));
          }, alignToPlotEdges: function(t3, e4, i4, s3) {
            let r3 = t3.getBBox().width;
            return e4 ? r3 + s3 : i4 - r3 - s3;
          }, alignToConnectors: function(t3, e4, i4, s3) {
            let r3 = 0, o3;
            return t3.forEach(function(t4) {
              (o3 = t4.dataLabel.getBBox().width) > r3 && (r3 = o3);
            }), e4 ? r3 + s3 : i4 - r3 - s3;
          } };
          function s2(t3, e4) {
            let { center: i4, options: s3 } = this, r3 = i4[2] / 2, o3 = t3.angle || 0, n2 = Math.cos(o3), a2 = Math.sin(o3), h2 = i4[0] + n2 * r3, l2 = i4[1] + a2 * r3, d2 = Math.min((s3.slicedOffset || 0) + (s3.borderWidth || 0), e4 / 5);
            return { natural: { x: h2 + n2 * e4, y: l2 + a2 * e4 }, computed: {}, alignment: e4 < 0 ? "center" : t3.half ? "right" : "left", connectorPosition: { breakAt: { x: h2 + n2 * d2, y: l2 + a2 * d2 }, touchingSliceAt: { x: h2, y: l2 } }, distance: e4 };
          }
          function r2() {
            var _a;
            let t3 = this, e4 = t3.points, i4 = t3.chart, s3 = i4.plotWidth, r3 = i4.plotHeight, o3 = i4.plotLeft, n2 = Math.round(i4.chartWidth / 3), a2 = t3.center, c2 = a2[2] / 2, g2 = a2[1], m2 = [[], []], x = [0, 0, 0, 0], y = t3.dataLabelPositioners, b, v, S, C = 0;
            t3.visible && ((_a = t3.hasDataLabels) == null ? void 0 : _a.call(t3)) && (e4.forEach((t4) => {
              (t4.dataLabels || []).forEach((t5) => {
                t5.shortened && (t5.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), t5.shortened = false);
              });
            }), l.prototype.drawDataLabels.apply(t3), e4.forEach((t4) => {
              (t4.dataLabels || []).forEach((e5, i5) => {
                var _a2;
                let s4 = a2[2] / 2, r4 = e5.options, o4 = f((r4 == null ? void 0 : r4.distance) || 0, s4);
                0 === i5 && m2[t4.half].push(t4), !p((_a2 = r4 == null ? void 0 : r4.style) == null ? void 0 : _a2.width) && e5.getBBox().width > n2 && (e5.css({ width: Math.round(0.7 * n2) + "px" }), e5.shortened = true), e5.dataLabelPosition = this.getDataLabelPosition(t4, o4), C = Math.max(C, o4);
              });
            }), m2.forEach((e5, n3) => {
              let l2 = e5.length, d2 = [], f2, m3, b2 = 0, k;
              l2 && (t3.sortByAngle(e5, n3 - 0.5), C > 0 && (f2 = Math.max(0, g2 - c2 - C), m3 = Math.min(g2 + c2 + C, i4.plotHeight), e5.forEach((t4) => {
                (t4.dataLabels || []).forEach((e6) => {
                  var _a2;
                  let s4 = e6.dataLabelPosition;
                  s4 && s4.distance > 0 && (s4.top = Math.max(0, g2 - c2 - s4.distance), s4.bottom = Math.min(g2 + c2 + s4.distance, i4.plotHeight), b2 = e6.getBBox().height || 21, e6.lineHeight = i4.renderer.fontMetrics(e6.text || e6).h + 2 * e6.padding, t4.distributeBox = { target: (((_a2 = e6.dataLabelPosition) == null ? void 0 : _a2.natural.y) || 0) - s4.top + e6.lineHeight / 2, size: b2, rank: t4.y }, d2.push(t4.distributeBox));
                });
              }), h(d2, k = m3 + b2 - f2, k / 5)), e5.forEach((i5) => {
                (i5.dataLabels || []).forEach((h2) => {
                  let l3 = h2.options || {}, g3 = i5.distributeBox, f3 = h2.dataLabelPosition, m4 = (f3 == null ? void 0 : f3.natural.y) || 0, b3 = l3.connectorPadding || 0, C2 = h2.lineHeight || 21, k2 = (C2 - h2.getBBox().height) / 2, M = 0, w = m4, T = "inherit";
                  if (f3) {
                    if (d2 && p(g3) && f3.distance > 0 && (void 0 === g3.pos ? T = "hidden" : (S = g3.size, w = y.radialDistributionY(i5, h2))), l3.justify) M = y.justify(i5, h2, c2, a2);
                    else switch (l3.alignTo) {
                      case "connectors":
                        M = y.alignToConnectors(e5, n3, s3, o3);
                        break;
                      case "plotEdges":
                        M = y.alignToPlotEdges(h2, n3, s3, o3);
                        break;
                      default:
                        M = y.radialDistributionX(t3, i5, w - k2, m4, h2);
                    }
                    if (f3.attribs = { visibility: T, align: f3.alignment }, f3.posAttribs = { x: M + (l3.x || 0) + ({ left: b3, right: -b3 }[f3.alignment] || 0), y: w + (l3.y || 0) - C2 / 2 }, f3.computed.x = M, f3.computed.y = w - k2, u(l3.crop, true)) {
                      let t4;
                      M - (v = h2.getBBox().width) < b3 && 1 === n3 ? (t4 = Math.round(v - M + b3), x[3] = Math.max(t4, x[3])) : M + v > s3 - b3 && 0 === n3 && (t4 = Math.round(M + v - s3 + b3), x[1] = Math.max(t4, x[1])), w - S / 2 < 0 ? x[0] = Math.max(Math.round(-w + S / 2), x[0]) : w + S / 2 > r3 && (x[2] = Math.max(Math.round(w + S / 2 - r3), x[2])), f3.sideOverflow = t4;
                    }
                  }
                });
              }));
            }), (0 === d(x) || this.verifyDataLabelOverflow(x)) && (this.placeDataLabels(), this.points.forEach((e5) => {
              (e5.dataLabels || []).forEach((s4) => {
                var _a2;
                let { connectorColor: r4, connectorWidth: o4 = 1 } = s4.options || {}, n3 = s4.dataLabelPosition;
                if (o4) {
                  let a3;
                  b = s4.connector, n3 && n3.distance > 0 ? (a3 = !b, b || (s4.connector = b = i4.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + e5.colorIndex + (e5.className ? " " + e5.className : "")).add(t3.dataLabelsGroup)), i4.styledMode || b.attr({ "stroke-width": o4, stroke: r4 || e5.color || "#666666" }), b[a3 ? "attr" : "animate"]({ d: e5.getConnectorPath(s4) }), b.attr({ visibility: (_a2 = n3.attribs) == null ? void 0 : _a2.visibility })) : b && (s4.connector = b.destroy());
                }
              });
            })));
          }
          function o2() {
            this.points.forEach((t3) => {
              (t3.dataLabels || []).forEach((t4) => {
                var _a;
                let e4 = t4.dataLabelPosition;
                e4 ? (e4.sideOverflow && (t4.css({ width: Math.max(t4.getBBox().width - e4.sideOverflow, 0) + "px", textOverflow: (((_a = t4.options) == null ? void 0 : _a.style) || {}).textOverflow || "ellipsis" }), t4.shortened = true), t4.attr(e4.attribs), t4[t4.moved ? "animate" : "attr"](e4.posAttribs), t4.moved = true) : t4 && t4.attr({ y: -9999 });
              }), delete t3.distributeBox;
            }, this);
          }
          function m(t3) {
            let e4 = this.center, i4 = this.options, s3 = i4.center, r3 = i4.minSize || 80, o3 = r3, n2 = null !== i4.size;
            return !n2 && (null !== s3[0] ? o3 = Math.max(e4[2] - Math.max(t3[1], t3[3]), r3) : (o3 = Math.max(e4[2] - t3[1] - t3[3], r3), e4[0] += (t3[3] - t3[1]) / 2), null !== s3[1] ? o3 = c(o3, r3, e4[2] - Math.max(t3[0], t3[2])) : (o3 = c(o3, r3, e4[2] - t3[0] - t3[2]), e4[1] += (t3[0] - t3[2]) / 2), o3 < e4[2] ? (e4[2] = o3, e4[3] = Math.min(i4.thickness ? Math.max(0, o3 - 2 * i4.thickness) : Math.max(0, f(i4.innerSize || 0, o3)), o3), this.translate(e4), this.drawDataLabels && this.drawDataLabels()) : n2 = true), n2;
          }
          e3.compose = function(e4) {
            if (t2.compose(l), g(n, "PieDataLabel")) {
              let t3 = e4.prototype;
              t3.dataLabelPositioners = i3, t3.alignDataLabel = a, t3.drawDataLabels = r2, t3.getDataLabelPosition = s2, t3.placeDataLabels = o2, t3.verifyDataLabelOverflow = m;
            }
          };
        }(o || (o = {})), o;
      }), i(e, "Core/Geometry/GeometryUtilities.js", [], function() {
        var t2, e2;
        return (e2 = t2 || (t2 = {})).getCenterOfPoints = function(t3) {
          let e3 = t3.reduce((t4, e4) => (t4.x += e4.x, t4.y += e4.y, t4), { x: 0, y: 0 });
          return { x: e3.x / t3.length, y: e3.y / t3.length };
        }, e2.getDistanceBetweenPoints = function(t3, e3) {
          return Math.sqrt(Math.pow(e3.x - t3.x, 2) + Math.pow(e3.y - t3.y, 2));
        }, e2.getAngleBetweenPoints = function(t3, e3) {
          return Math.atan2(e3.x - t3.x, e3.y - t3.y);
        }, e2.pointInPolygon = function({ x: t3, y: e3 }, i2) {
          let s = i2.length, r, o, n = false;
          for (r = 0, o = s - 1; r < s; o = r++) {
            let [s2, a] = i2[r], [h, l] = i2[o];
            a > e3 != l > e3 && t3 < (h - s2) * (e3 - a) / (l - a) + s2 && (n = !n);
          }
          return n;
        }, t2;
      }), i(e, "Extensions/OverlappingDataLabels.js", [e["Core/Geometry/GeometryUtilities.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { pointInPolygon: i2 } = t2, { addEvent: s, fireEvent: r, objectEach: o, pick: n } = e2;
        function a(t3) {
          let e3 = t3.length, s2 = (t4, e4) => !(e4.x >= t4.x + t4.width || e4.x + e4.width <= t4.x || e4.y >= t4.y + t4.height || e4.y + e4.height <= t4.y), o2 = (t4, e4) => {
            for (let s3 of t4) if (i2({ x: s3[0], y: s3[1] }, e4)) return true;
            return false;
          }, n2, a2, l2, d, c, p = false;
          for (let i3 = 0; i3 < e3; i3++) (n2 = t3[i3]) && (n2.oldOpacity = n2.opacity, n2.newOpacity = 1, n2.absoluteBox = function(t4) {
            var _a, _b;
            if (t4 && (!t4.alignAttr || t4.placed)) {
              let e4 = t4.box ? 0 : t4.padding || 0, i4 = t4.alignAttr || { x: t4.attr("x"), y: t4.attr("y") }, s3 = t4.getBBox();
              return t4.width = s3.width, t4.height = s3.height, { x: i4.x + (((_a = t4.parentGroup) == null ? void 0 : _a.translateX) || 0) + e4, y: i4.y + (((_b = t4.parentGroup) == null ? void 0 : _b.translateY) || 0) + e4, width: (t4.width || 0) - 2 * e4, height: (t4.height || 0) - 2 * e4, polygon: s3 == null ? void 0 : s3.polygon };
            }
          }(n2));
          t3.sort((t4, e4) => (e4.labelrank || 0) - (t4.labelrank || 0));
          for (let i3 = 0; i3 < e3; ++i3) {
            d = (a2 = t3[i3]) && a2.absoluteBox;
            let r2 = d == null ? void 0 : d.polygon;
            for (let n3 = i3 + 1; n3 < e3; ++n3) {
              c = (l2 = t3[n3]) && l2.absoluteBox;
              let e4 = false;
              if (d && c && a2 !== l2 && 0 !== a2.newOpacity && 0 !== l2.newOpacity && "hidden" !== a2.visibility && "hidden" !== l2.visibility) {
                let t4 = c.polygon;
                if (r2 && t4 && r2 !== t4 ? o2(r2, t4) && (e4 = true) : s2(d, c) && (e4 = true), e4) {
                  let t5 = a2.labelrank < l2.labelrank ? a2 : l2, e5 = t5.text;
                  t5.newOpacity = 0, (e5 == null ? void 0 : e5.element.querySelector("textPath")) && e5.hide();
                }
              }
            }
          }
          for (let e4 of t3) h(e4, this) && (p = true);
          p && r(this, "afterHideAllOverlappingLabels");
        }
        function h(t3, e3) {
          let i3, s2, o2 = false;
          return t3 && (s2 = t3.newOpacity, t3.oldOpacity !== s2 && (t3.hasClass("highcharts-data-label") ? (t3[s2 ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), i3 = function() {
            e3.styledMode || t3.css({ pointerEvents: s2 ? "auto" : "none" });
          }, o2 = true, t3[t3.isOld ? "animate" : "attr"]({ opacity: s2 }, void 0, i3), r(e3, "afterHideOverlappingLabel")) : t3.attr({ opacity: s2 })), t3.isOld = true), o2;
        }
        function l() {
          var _a;
          let t3 = this, e3 = [];
          for (let i3 of t3.labelCollectors || []) e3 = e3.concat(i3());
          for (let i3 of t3.yAxis || []) i3.stacking && i3.options.stackLabels && !i3.options.stackLabels.allowOverlap && o(i3.stacking.stacks, (t4) => {
            o(t4, (t5) => {
              t5.label && e3.push(t5.label);
            });
          });
          for (let i3 of t3.series || []) if (i3.visible && ((_a = i3.hasDataLabels) == null ? void 0 : _a.call(i3))) {
            let s2 = (i4) => {
              for (let s3 of i4) s3.visible && (s3.dataLabels || []).forEach((i5) => {
                var _a2;
                let r2 = i5.options || {};
                i5.labelrank = n(r2.labelrank, s3.labelrank, (_a2 = s3.shapeArgs) == null ? void 0 : _a2.height), r2.allowOverlap ?? Number(r2.distance) > 0 ? (i5.oldOpacity = i5.opacity, i5.newOpacity = 1, h(i5, t3)) : e3.push(i5);
              });
            };
            s2(i3.nodes || []), s2(i3.points);
          }
          this.hideOverlappingLabels(e3);
        }
        return { compose: function(t3) {
          let e3 = t3.prototype;
          e3.hideOverlappingLabels || (e3.hideOverlappingLabels = a, s(t3, "render", l));
        } };
      }), i(e, "Extensions/BorderRadius.js", [e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        let { defaultOptions: s } = t2, { noop: r } = e2, { addEvent: o, extend: n, isObject: a, merge: h, relativeLength: l } = i2, d = { radius: 0, scope: "stack", where: void 0 }, c = r, p = r;
        function u(t3, e3, i3, s2, r2 = {}) {
          let o2 = c(t3, e3, i3, s2, r2), { innerR: n2 = 0, r: a2 = i3, start: h2 = 0, end: d2 = 0 } = r2;
          if (r2.open || !r2.borderRadius) return o2;
          let p2 = d2 - h2, g2 = Math.sin(p2 / 2), f2 = Math.max(Math.min(l(r2.borderRadius || 0, a2 - n2), (a2 - n2) / 2, a2 * g2 / (1 + g2)), 0), m2 = Math.min(f2, p2 / Math.PI * 2 * n2), x2 = o2.length - 1;
          for (; x2--; ) !function(t4, e4, i4) {
            let s3, r3, o3;
            let n3 = t4[e4], a3 = t4[e4 + 1];
            if ("Z" === a3[0] && (a3 = t4[0]), ("M" === n3[0] || "L" === n3[0]) && "A" === a3[0] ? (s3 = n3, r3 = a3, o3 = true) : "A" === n3[0] && ("M" === a3[0] || "L" === a3[0]) && (s3 = a3, r3 = n3), s3 && r3 && r3.params) {
              let n4 = r3[1], a4 = r3[5], h3 = r3.params, { start: l2, end: d3, cx: c2, cy: p3 } = h3, u2 = a4 ? n4 - i4 : n4 + i4, g3 = u2 ? Math.asin(i4 / u2) : 0, f3 = a4 ? g3 : -g3, m3 = Math.cos(g3) * u2;
              o3 ? (h3.start = l2 + f3, s3[1] = c2 + m3 * Math.cos(l2), s3[2] = p3 + m3 * Math.sin(l2), t4.splice(e4 + 1, 0, ["A", i4, i4, 0, 0, 1, c2 + n4 * Math.cos(h3.start), p3 + n4 * Math.sin(h3.start)])) : (h3.end = d3 - f3, r3[6] = c2 + n4 * Math.cos(h3.end), r3[7] = p3 + n4 * Math.sin(h3.end), t4.splice(e4 + 1, 0, ["A", i4, i4, 0, 0, 1, c2 + m3 * Math.cos(d3), p3 + m3 * Math.sin(d3)])), r3[4] = Math.abs(h3.end - h3.start) < Math.PI ? 0 : 1;
            }
          }(o2, x2, x2 > 1 ? m2 : f2);
          return o2;
        }
        function g() {
          var _a, _b;
          if (this.options.borderRadius && !(this.chart.is3d && this.chart.is3d())) {
            let { options: t3, yAxis: e3 } = this, i3 = "percent" === t3.stacking, r2 = (_b = (_a = s.plotOptions) == null ? void 0 : _a[this.type]) == null ? void 0 : _b.borderRadius, o2 = f(t3.borderRadius, a(r2) ? r2 : {}), h2 = e3.options.reversed;
            for (let s2 of this.points) {
              let { shapeArgs: r3 } = s2;
              if ("roundedRect" === s2.shapeType && r3) {
                let { width: a2 = 0, height: d2 = 0, y: c2 = 0 } = r3, p2 = c2, u2 = d2;
                if ("stack" === o2.scope && s2.stackTotal) {
                  let r4 = e3.translate(i3 ? 100 : s2.stackTotal, false, true, false, true), o3 = e3.translate(t3.threshold || 0, false, true, false, true), n2 = this.crispCol(0, Math.min(r4, o3), 0, Math.abs(r4 - o3));
                  p2 = n2.y, u2 = n2.height;
                }
                let g2 = (s2.negative ? -1 : 1) * (h2 ? -1 : 1) == -1, f2 = o2.where;
                !f2 && this.is("waterfall") && Math.abs((s2.yBottom || 0) - (this.translatedThreshold || 0)) > this.borderWidth && (f2 = "all"), f2 || (f2 = "end");
                let m2 = Math.min(l(o2.radius, a2), a2 / 2, "all" === f2 ? d2 / 2 : 1 / 0) || 0;
                "end" === f2 && (g2 && (p2 -= m2), u2 += m2), n(r3, { brBoxHeight: u2, brBoxY: p2, r: m2 });
              }
            }
          }
        }
        function f(t3, e3) {
          return a(t3) || (t3 = { radius: t3 || 0 }), h(d, e3, t3);
        }
        function m() {
          let t3 = f(this.options.borderRadius);
          for (let e3 of this.points) {
            let i3 = e3.shapeArgs;
            i3 && (i3.borderRadius = l(t3.radius, (i3.r || 0) - (i3.innerR || 0)));
          }
        }
        function x(t3, e3, i3, s2, r2 = {}) {
          let o2 = p(t3, e3, i3, s2, r2), { r: n2 = 0, brBoxHeight: a2 = s2, brBoxY: h2 = e3 } = r2, l2 = e3 - h2, d2 = h2 + a2 - (e3 + s2), c2 = l2 - n2 > -0.1 ? 0 : n2, u2 = d2 - n2 > -0.1 ? 0 : n2, g2 = Math.max(c2 && l2, 0), f2 = Math.max(u2 && d2, 0), m2 = [t3 + c2, e3], y = [t3 + i3 - c2, e3], b = [t3 + i3, e3 + c2], v = [t3 + i3, e3 + s2 - u2], S = [t3 + i3 - u2, e3 + s2], C = [t3 + u2, e3 + s2], k = [t3, e3 + s2 - u2], M = [t3, e3 + c2], w = (t4, e4) => Math.sqrt(Math.pow(t4, 2) - Math.pow(e4, 2));
          if (g2) {
            let t4 = w(c2, c2 - g2);
            m2[0] -= t4, y[0] += t4, b[1] = M[1] = e3 + c2 - g2;
          }
          if (s2 < c2 - g2) {
            let r3 = w(c2, c2 - g2 - s2);
            b[0] = v[0] = t3 + i3 - c2 + r3, S[0] = Math.min(b[0], S[0]), C[0] = Math.max(v[0], C[0]), k[0] = M[0] = t3 + c2 - r3, b[1] = M[1] = e3 + s2;
          }
          if (f2) {
            let t4 = w(u2, u2 - f2);
            S[0] += t4, C[0] -= t4, v[1] = k[1] = e3 + s2 - u2 + f2;
          }
          if (s2 < u2 - f2) {
            let r3 = w(u2, u2 - f2 - s2);
            b[0] = v[0] = t3 + i3 - u2 + r3, y[0] = Math.min(b[0], y[0]), m2[0] = Math.max(v[0], m2[0]), k[0] = M[0] = t3 + u2 - r3, v[1] = k[1] = e3;
          }
          return o2.length = 0, o2.push(["M", ...m2], ["L", ...y], ["A", c2, c2, 0, 0, 1, ...b], ["L", ...v], ["A", u2, u2, 0, 0, 1, ...S], ["L", ...C], ["A", u2, u2, 0, 0, 1, ...k], ["L", ...M], ["A", c2, c2, 0, 0, 1, ...m2], ["Z"]), o2;
        }
        return { compose: function(t3, e3, i3) {
          let s2 = t3.types.pie;
          if (!e3.symbolCustomAttribs.includes("borderRadius")) {
            let r2 = i3.prototype.symbols;
            o(t3, "afterColumnTranslate", g, { order: 9 }), o(s2, "afterTranslate", m), e3.symbolCustomAttribs.push("borderRadius", "brBoxHeight", "brBoxY"), c = r2.arc, p = r2.roundedRect, r2.arc = u, r2.roundedRect = x;
          }
        }, optionsToObject: f };
      }), i(e, "Core/Responsive.js", [e["Core/Utilities.js"]], function(t2) {
        var e2;
        let { diffObjects: i2, extend: s, find: r, merge: o, pick: n, uniqueKey: a } = t2;
        return function(t3) {
          function e3(t4, e4) {
            let i3 = t4.condition;
            (i3.callback || function() {
              return this.chartWidth <= n(i3.maxWidth, Number.MAX_VALUE) && this.chartHeight <= n(i3.maxHeight, Number.MAX_VALUE) && this.chartWidth >= n(i3.minWidth, 0) && this.chartHeight >= n(i3.minHeight, 0);
            }).call(this) && e4.push(t4._id);
          }
          function h(t4, e4) {
            let s2 = this.options.responsive, n2 = this.currentResponsive, h2 = [], l;
            !e4 && s2 && s2.rules && s2.rules.forEach((t5) => {
              void 0 === t5._id && (t5._id = a()), this.matchResponsiveRule(t5, h2);
            }, this);
            let d = o(...h2.map((t5) => r((s2 || {}).rules || [], (e5) => e5._id === t5)).map((t5) => t5 && t5.chartOptions));
            d.isResponsiveOptions = true, h2 = h2.toString() || void 0;
            let c = n2 && n2.ruleIds;
            h2 === c || (n2 && (this.currentResponsive = void 0, this.updatingResponsive = true, this.update(n2.undoOptions, t4, true), this.updatingResponsive = false), h2 ? ((l = i2(d, this.options, true, this.collectionsWithUpdate)).isResponsiveOptions = true, this.currentResponsive = { ruleIds: h2, mergedOptions: d, undoOptions: l }, this.updatingResponsive || this.update(d, t4, true)) : this.currentResponsive = void 0);
          }
          t3.compose = function(t4) {
            let i3 = t4.prototype;
            return i3.matchResponsiveRule || s(i3, { matchResponsiveRule: e3, setResponsive: h }), t4;
          };
        }(e2 || (e2 = {})), e2;
      }), i(e, "masters/highcharts.src.js", [e["Core/Globals.js"], e["Core/Utilities.js"], e["Core/Defaults.js"], e["Core/Animation/Fx.js"], e["Core/Animation/AnimationUtilities.js"], e["Core/Renderer/HTML/AST.js"], e["Core/Templating.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Renderer/RendererUtilities.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Renderer/SVG/SVGRenderer.js"], e["Core/Renderer/HTML/HTMLElement.js"], e["Core/Axis/Axis.js"], e["Core/Axis/DateTimeAxis.js"], e["Core/Axis/LogarithmicAxis.js"], e["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], e["Core/Axis/Tick.js"], e["Core/Tooltip.js"], e["Core/Series/Point.js"], e["Core/Pointer.js"], e["Core/Legend/Legend.js"], e["Core/Legend/LegendSymbol.js"], e["Core/Chart/Chart.js"], e["Extensions/ScrollablePlotArea.js"], e["Core/Axis/Stacking/StackingAxis.js"], e["Core/Axis/Stacking/StackItem.js"], e["Core/Series/Series.js"], e["Core/Series/SeriesRegistry.js"], e["Series/Column/ColumnDataLabel.js"], e["Series/Pie/PieDataLabel.js"], e["Core/Series/DataLabel.js"], e["Extensions/OverlappingDataLabels.js"], e["Extensions/BorderRadius.js"], e["Core/Responsive.js"], e["Core/Color/Color.js"], e["Core/Time.js"]], function(t2, e2, i2, s, r, o, n, a, h, l, d, c, p, u, g, f, m, x, y, b, v, S, C, k, M, w, T, A, P, L, O, D, E, I, j, B) {
        return t2.AST = o, t2.Axis = p, t2.Chart = C, t2.Color = j, t2.DataLabel = O, t2.Fx = s, t2.HTMLElement = c, t2.Legend = v, t2.LegendSymbol = S, t2.OverlappingDataLabels = t2.OverlappingDataLabels || D, t2.PlotLineOrBand = f, t2.Point = y, t2.Pointer = b, t2.RendererRegistry = a, t2.Series = T, t2.SeriesRegistry = A, t2.StackItem = w, t2.SVGElement = l, t2.SVGRenderer = d, t2.Templating = n, t2.Tick = m, t2.Time = B, t2.Tooltip = x, t2.animate = r.animate, t2.animObject = r.animObject, t2.chart = C.chart, t2.color = j.parse, t2.dateFormat = n.dateFormat, t2.defaultOptions = i2.defaultOptions, t2.distribute = h.distribute, t2.format = n.format, t2.getDeferredAnimation = r.getDeferredAnimation, t2.getOptions = i2.getOptions, t2.numberFormat = n.numberFormat, t2.seriesType = A.seriesType, t2.setAnimation = r.setAnimation, t2.setOptions = i2.setOptions, t2.stop = r.stop, t2.time = i2.defaultTime, t2.timers = s.timers, E.compose(t2.Series, t2.SVGElement, t2.SVGRenderer), P.compose(t2.Series.types.column), O.compose(t2.Series), u.compose(t2.Axis), c.compose(t2.SVGRenderer), v.compose(t2.Chart), g.compose(t2.Axis), D.compose(t2.Chart), L.compose(t2.Series.types.pie), f.compose(t2.Chart, t2.Axis), b.compose(t2.Chart), I.compose(t2.Chart), k.compose(t2.Axis, t2.Chart, t2.Series), M.compose(t2.Axis, t2.Chart, t2.Series), x.compose(t2.Pointer), e2.extend(t2, e2), t2;
      }), e["masters/highcharts.src.js"]._modules = e, e["masters/highcharts.src.js"];
    });
  }
});
export default require_highcharts();
//# sourceMappingURL=highcharts.js.map
