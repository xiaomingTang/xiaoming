import i from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useState as s, useEffect as d } from "react";
import p from "lodash/noop";
function T(e) {
  var u = s(-1), t = i(u, 2), o = t[0], f = t[1], c = s(!1), r = i(c, 2), m = r[0], n = r[1];
  return d(function() {
    if (!e)
      return p;
    var a = function(_) {
      var g = _.type;
      switch (g) {
        case "start":
          n(!0);
          break;
        case "running":
          f(e.deg);
          break;
        case "end":
          n(!1);
          break;
      }
    };
    return e.addListener("BUILT_IN_EMIT", a), function() {
      e.removeListener("BUILT_IN_EMIT", a);
    };
  }, [e]), {
    deg: o,
    running: m
  };
}
export {
  T as usePrizeWheelState
};
