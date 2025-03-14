import {
  require_dayjs_min
} from "./chunk-7PPEYBD6.js";
import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/dayjs/locale/ar.js
var require_ar = __commonJS({
  "node_modules/dayjs/locale/ar.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require_dayjs_min()) : "function" == typeof define && define.amd ? define(["dayjs"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_locale_ar = t(e.dayjs);
    }(exports, function(e) {
      "use strict";
      function t(e2) {
        return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
      }
      var n = t(e), r = "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"), d = { 1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥", 6: "٦", 7: "٧", 8: "٨", 9: "٩", 0: "٠" }, _ = { "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "٠": "0" }, o = { name: "ar", weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"), weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"), months: r, monthsShort: r, weekStart: 6, meridiem: function(e2) {
        return e2 > 12 ? "م" : "ص";
      }, relativeTime: { future: "بعد %s", past: "منذ %s", s: "ثانية واحدة", m: "دقيقة واحدة", mm: "%d دقائق", h: "ساعة واحدة", hh: "%d ساعات", d: "يوم واحد", dd: "%d أيام", M: "شهر واحد", MM: "%d أشهر", y: "عام واحد", yy: "%d أعوام" }, preparse: function(e2) {
        return e2.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function(e3) {
          return _[e3];
        }).replace(/،/g, ",");
      }, postformat: function(e2) {
        return e2.replace(/\d/g, function(e3) {
          return d[e3];
        }).replace(/,/g, "،");
      }, ordinal: function(e2) {
        return e2;
      }, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/‏M/‏YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" } };
      return n.default.locale(o, null, true), o;
    });
  }
});
export default require_ar();
//# sourceMappingURL=dayjs_locale_ar.js.map
