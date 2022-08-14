import p from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useRef as f, useState as b, useEffect as u } from "react";
import R from "lodash/noop";
function B(e, r) {
  var n, d = f(r ? void 0 : e(performance.now())), l = b(d.current), a = p(l, 2), v = a[0], m = a[1], i = f(e), o = (n = r == null ? void 0 : r.enable) !== null && n !== void 0 ? n : !0;
  return u(function() {
    i.current = e;
  }, [e]), u(function() {
    if (!o)
      return R;
    var t = -1, c = function s(w) {
      !o || (m(i.current(w)), t = window.requestAnimationFrame(s));
    };
    return t = window.requestAnimationFrame(c), function() {
      window.cancelAnimationFrame(t);
    };
  }, [o]), v;
}
function E() {
  u(function() {
    var e = function(n) {
      return n.preventDefault(), n.returnValue = "before unload", "before unload";
    };
    return window.addEventListener("beforeunload", e), function() {
      window.removeEventListener("beforeunload", e);
    };
  }, []);
}
export {
  B as useRafLoop,
  E as useWarnBeforeUnload
};
