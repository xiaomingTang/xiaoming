import m from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useState as w, useEffect as v, useRef as l } from "react";
import L from "lodash/omit";
import s from "lodash/noop";
import S from "lodash/throttle";
var E = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON: function() {
    return L(E, "toJson");
  }
};
function U(r, n, e) {
  var u = w(E), a = m(u, 2), f = a[0], c = a[1];
  return v(function() {
    var d = r instanceof HTMLElement ? r : r == null ? void 0 : r.current;
    if (d) {
      var o, i, t = S(function() {
        c(d.getBoundingClientRect());
      }, n != null ? n : 500, {
        trailing: (o = e == null ? void 0 : e.trailing) !== null && o !== void 0 ? o : !0,
        leading: (i = e == null ? void 0 : e.leading) !== null && i !== void 0 ? i : !1
      });
      return t(), window.addEventListener("resize", t), function() {
        window.removeEventListener("resize", t);
      };
    }
    return s;
  }, [r, n, e == null ? void 0 : e.leading, e == null ? void 0 : e.trailing]), f;
}
function q(r, n) {
  var e = l(r), u = l(n);
  u.current = n, v(function() {
    u.current(r, e.current), e.current = r;
  }, [r]);
}
function x(r, n) {
  var e, u = l(n ? void 0 : r(performance.now())), a = w(u.current), f = m(a, 2), c = f[0], d = f[1], o = l(r), i = (e = n == null ? void 0 : n.enable) !== null && e !== void 0 ? e : !0;
  return o.current = r, v(function() {
    if (!i)
      return s;
    var t = -1, R = function b(g) {
      d(o.current(g)), t = window.requestAnimationFrame(b);
    };
    return t = window.requestAnimationFrame(R), function() {
      window.cancelAnimationFrame(t);
    };
  }, [i]), c;
}
function y() {
  v(function() {
    var r = function(e) {
      return e.preventDefault(), e.returnValue = "before unload", "before unload";
    };
    return window.addEventListener("beforeunload", r), function() {
      window.removeEventListener("beforeunload", r);
    };
  }, []);
}
export {
  U as useElementRect,
  q as useListen,
  x as useRafLoop,
  y as useWarnBeforeUnload
};
