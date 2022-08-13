import w from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useRef as o, useState as R, useEffect as f } from "react";
import A from "lodash/noop";
function q(e, r) {
  var n, m = o(r ? void 0 : e(performance.now())), v = R(m.current), a = w(v, 2), d = a[0], l = a[1], i = o(e), t = (n = r == null ? void 0 : r.enable) !== null && n !== void 0 ? n : !0;
  return f(function() {
    i.current = e;
  }, [e]), f(function() {
    if (!t)
      return A;
    var u = -1, s = function c(p) {
      !t || (l(i.current(p)), u = window.requestAnimationFrame(c));
    };
    return u = window.requestAnimationFrame(s), function() {
      window.cancelAnimationFrame(u);
    };
  }, [t]), d;
}
export {
  q as useRafLoop
};
