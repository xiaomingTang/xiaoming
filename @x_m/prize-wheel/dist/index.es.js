import f from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import "core-js/modules/es.object.to-string.js";
import R from "@babel/runtime-corejs3/helpers/classCallCheck";
import _ from "@babel/runtime-corejs3/helpers/createClass";
import o from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import A from "@babel/runtime-corejs3/helpers/inherits";
import y from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import h from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import s from "@babel/runtime-corejs3/helpers/defineProperty";
import T from "@x_m/event-emitter";
import S from "@babel/runtime-corejs3/helpers/slicedToArray";
import { useState as v, useEffect as V } from "react";
import { clamp as L, noop as k } from "lodash-es";
function D(n) {
  var g = n.currentTime, u = n.targetTime, t = n.startValue, r = n.endValue, i = L(g / (u / 2), 0, 2), a = r - t;
  return i < 1 ? t + a / 2 * i * i : (i -= 1, t - a / 2 * (i * (i - 2) - 1));
}
function F(n) {
  var g = v(-1), u = S(g, 2), t = u[0], r = u[1], i = v(!1), a = S(i, 2), l = a[0], e = a[1];
  return V(function() {
    if (!n)
      return k;
    var d = function() {
      e(!0);
    }, m = function() {
      r(n.deg);
    }, p = function() {
      e(!1);
    };
    return n.addListener("start", d), n.addListener("running", m), n.addListener("end", p), function() {
      n.removeListener("start", d), n.removeListener("running", m), n.removeListener("end", p);
    };
  }, [n]), {
    deg: t,
    running: l
  };
}
function C(n) {
  var g = P();
  return function() {
    var t = h(n), r;
    if (g) {
      var i = h(this).constructor;
      r = f(t, arguments, i);
    } else
      r = t.apply(this, arguments);
    return y(this, r);
  };
}
function P() {
  if (typeof Reflect == "undefined" || !f || f.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(f(Boolean, [], function() {
    })), !0;
  } catch (n) {
    return !1;
  }
}
var Q = /* @__PURE__ */ function(n) {
  A(u, n);
  var g = C(u);
  function u(t) {
    var r, i, a, l, e;
    return R(this, u), e = g.call(this), s(o(e), "rawDeg", -1), s(o(e), "speedRatio", 5), s(o(e), "minRunningDeg", 3600), s(o(e), "easeStartDeg", 540), s(o(e), "easeStopDeg", 540), s(o(e), "rawRunning", !1), s(o(e), "shouldStopAtDeg", -1), s(o(e), "animate", function() {
      if (!!e.running) {
        var d;
        e.shouldStopAtDeg >= 0 && e.deg - (e.shouldStopAtDeg - e.easeStopDeg) >= 0 ? d = D({
          currentTime: e.deg - (e.shouldStopAtDeg - e.easeStopDeg),
          targetTime: e.easeStopDeg,
          startValue: 1,
          endValue: 0.1
        }) : d = D({
          currentTime: e.deg,
          targetTime: e.easeStartDeg,
          startValue: 0.1,
          endValue: 1
        }), e.deg += d * e.speedRatio, e.shouldStopAtDeg >= 0 && (e.deg = Math.min(e.shouldStopAtDeg, e.deg)), e.shouldStopAtDeg < 0 || e.deg < e.shouldStopAtDeg ? window.requestAnimationFrame(e.animate) : e.end();
      }
    }), e.easeStartDeg = (r = t == null ? void 0 : t.easeStartDeg) !== null && r !== void 0 ? r : e.easeStartDeg, e.easeStopDeg = (i = t == null ? void 0 : t.easeStopDeg) !== null && i !== void 0 ? i : e.easeStopDeg, e.minRunningDeg = (a = t == null ? void 0 : t.minRunningDeg) !== null && a !== void 0 ? a : e.minRunningDeg, e.speedRatio = (l = t == null ? void 0 : t.speedRatio) !== null && l !== void 0 ? l : e.speedRatio, e;
  }
  return _(u, [{
    key: "deg",
    get: function() {
      return this.rawDeg;
    },
    set: function(r) {
      this.rawDeg = r, this.emit("running");
    }
  }, {
    key: "running",
    get: function() {
      return this.rawRunning;
    },
    set: function(r) {
      r !== this.rawRunning && this.emit(r ? "start" : "end"), this.rawRunning = r;
    }
  }, {
    key: "run",
    value: function() {
      this.shouldStopAtDeg = -1, this.running || (this.running = !0, this.deg = -1, this.animate());
    }
  }, {
    key: "reset",
    value: function() {
      this.shouldStopAtDeg = -1, this.deg = -1, this.running = !1;
    }
  }, {
    key: "end",
    value: function() {
      this.running = !1;
    }
  }, {
    key: "shouldStopAt",
    value: function(r) {
      var i = (r % 360 + 360) % 360;
      this.shouldStopAtDeg = Math.max(this.deg + this.easeStopDeg, this.minRunningDeg);
      var a = i - this.shouldStopAtDeg % 360;
      this.shouldStopAtDeg += a >= 0 ? a : a + 360;
    }
  }]), u;
}(T);
export {
  Q as PrizeWheelLogic,
  D as easeInOutQuad,
  F as usePrizeWheelState
};
//# sourceMappingURL=index.es.js.map
