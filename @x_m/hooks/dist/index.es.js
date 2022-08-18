import s from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useState as m, useEffect as u, useRef as l } from "react";
import b from "lodash/omit";
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
    return b(p, "toJson");
  }
};
function A(e) {
  var t = m(p), n = s(t, 2), i = n[0], a = n[1];
  return u(function() {
    var r = e instanceof HTMLElement ? e : e == null ? void 0 : e.current;
    if (r) {
      var o = function() {
        a(r.getBoundingClientRect());
      };
      return o(), window.addEventListener("resize", o), function() {
        window.removeEventListener("resize", o);
      };
    }
    return w;
  }, [e]), i;
}
function B(e, t) {
  var n, i = l(t ? void 0 : e(performance.now())), a = m(i.current), r = s(a, 2), o = r[0], v = r[1], c = l(e), f = (n = t == null ? void 0 : t.enable) !== null && n !== void 0 ? n : !0;
  return u(function() {
    c.current = e;
  }, [e]), u(function() {
    if (!f)
      return w;
    var d = -1, E = function R(S) {
      !f || (v(c.current(S)), d = window.requestAnimationFrame(R));
    };
    return d = window.requestAnimationFrame(E), function() {
      window.cancelAnimationFrame(d);
    };
  }, [f]), o;
}
function F() {
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
  A as useElementRect,
  B as useRafLoop,
  F as useWarnBeforeUnload
};
