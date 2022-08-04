import s from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useState as d, useEffect as S } from "react";
import L from "lodash/noop";
function R(n) {
  var f = d(-1), t = s(f, 2), g = t[0], m = t[1], c = d(!1), r = s(c, 2), v = r[0], e = r[1];
  return S(function() {
    if (!n)
      return L;
    var i = function() {
      e(!0);
    }, o = function() {
      m(n.deg);
    }, u = function() {
      e(!1);
    };
    return n.addListener("start", i), n.addListener("running", o), n.addListener("end", u), function() {
      n.removeListener("start", i), n.removeListener("running", o), n.removeListener("end", u);
    };
  }, [n]), {
    deg: g,
    running: v
  };
}
export {
  R as usePrizeWheelState
};
