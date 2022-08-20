import s from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useState as m, useEffect as f, useRef as v } from "react";
import S from "lodash/omit";
import w from "lodash/noop";
var p = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON: function() {
    return S(p, "toJson");
  }
};
function A(e) {
  var t = m(p), n = s(t, 2), u = n[0], i = n[1];
  return f(function() {
    var r = e instanceof HTMLElement ? e : e == null ? void 0 : e.current;
    if (r) {
      var o = function() {
        i(r.getBoundingClientRect());
      };
      return o(), window.addEventListener("resize", o), function() {
        window.removeEventListener("resize", o);
      };
    }
    return w;
  }, [e]), u;
}
function B(e, t) {
  var n, u = v(t ? void 0 : e(performance.now())), i = m(u.current), r = s(i, 2), o = r[0], d = r[1], c = v(e), l = (n = t == null ? void 0 : t.enable) !== null && n !== void 0 ? n : !0;
  return c.current = e, f(function() {
    if (!l)
      return w;
    var a = -1, E = function R(b) {
      d(c.current(b)), a = window.requestAnimationFrame(R);
    };
    return a = window.requestAnimationFrame(E), function() {
      window.cancelAnimationFrame(a);
    };
  }, [l]), o;
}
function F() {
  f(function() {
    var e = function(n) {
      return n.preventDefault(), n.returnValue = "before unload", "before unload";
    };
    return window.addEventListener("beforeunload", e), function() {
      window.removeEventListener("beforeunload", e);
    };
  }, []);
}
export {
  A as useElementRect,
  B as useRafLoop,
  F as useWarnBeforeUnload
};
