import g from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import "core-js/modules/es.object.to-string.js";
import p from "@babel/runtime-corejs3/helpers/classCallCheck";
import c from "@babel/runtime-corejs3/helpers/createClass";
import o from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import D from "@babel/runtime-corejs3/helpers/inherits";
import S from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import m from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import s from "@babel/runtime-corejs3/helpers/defineProperty";
import v from "@x_m/event-emitter";
import R from "lodash/clamp";
function h(a) {
  var l = a.currentTime, u = a.targetTime, t = a.startValue, n = a.endValue, r = R(l / (u / 2), 0, 2), i = n - t;
  return r < 1 ? t + i / 2 * r * r : (r -= 1, t - i / 2 * (r * (r - 2) - 1));
}
function A(a) {
  var l = y();
  return function() {
    var t = m(a), n;
    if (l) {
      var r = m(this).constructor;
      n = g(t, arguments, r);
    } else
      n = t.apply(this, arguments);
    return S(this, n);
  };
}
function y() {
  if (typeof Reflect == "undefined" || !g || g.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(g(Boolean, [], function() {
    })), !0;
  } catch (a) {
    return !1;
  }
}
var O = /* @__PURE__ */ function(a) {
  D(u, a);
  var l = A(u);
  function u(t) {
    var n, r, i, d, e;
    return p(this, u), e = l.call(this), s(o(e), "rawDeg", -1), s(o(e), "speedRatio", 5), s(o(e), "minRunningDeg", 3600), s(o(e), "easeStartDeg", 540), s(o(e), "easeStopDeg", 540), s(o(e), "rawRunning", !1), s(o(e), "shouldStopAtDeg", -1), s(o(e), "animate", function() {
      if (!!e.running) {
        var f;
        e.shouldStopAtDeg >= 0 && e.deg - (e.shouldStopAtDeg - e.easeStopDeg) >= 0 ? f = h({
          currentTime: e.deg - (e.shouldStopAtDeg - e.easeStopDeg),
          targetTime: e.easeStopDeg,
          startValue: 1,
          endValue: 0.1
        }) : f = h({
          currentTime: e.deg,
          targetTime: e.easeStartDeg,
          startValue: 0.1,
          endValue: 1
        }), e.deg += f * e.speedRatio, e.shouldStopAtDeg >= 0 && (e.deg = Math.min(e.shouldStopAtDeg, e.deg)), e.shouldStopAtDeg < 0 || e.deg < e.shouldStopAtDeg ? typeof window != "undefined" ? requestAnimationFrame(e.animate) : setTimeout(e.animate, 0) : e.end();
      }
    }), e.easeStartDeg = (n = t == null ? void 0 : t.easeStartDeg) !== null && n !== void 0 ? n : e.easeStartDeg, e.easeStopDeg = (r = t == null ? void 0 : t.easeStopDeg) !== null && r !== void 0 ? r : e.easeStopDeg, e.minRunningDeg = (i = t == null ? void 0 : t.minRunningDeg) !== null && i !== void 0 ? i : e.minRunningDeg, e.speedRatio = (d = t == null ? void 0 : t.speedRatio) !== null && d !== void 0 ? d : e.speedRatio, e;
  }
  return c(u, [{
    key: "deg",
    get: function() {
      return this.rawDeg;
    },
    set: function(n) {
      this.rawDeg = n, this.emit("running");
    }
  }, {
    key: "running",
    get: function() {
      return this.rawRunning;
    },
    set: function(n) {
      n !== this.rawRunning && this.emit(n ? "start" : "end"), this.rawRunning = n;
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
    value: function(n) {
      var r = (n % 360 + 360) % 360;
      this.shouldStopAtDeg = Math.max(this.deg + this.easeStopDeg, this.minRunningDeg);
      var i = r - this.shouldStopAtDeg % 360;
      this.shouldStopAtDeg += i >= 0 ? i : i + 360;
    }
  }]), u;
}(v);
export {
  O as PrizeWheel,
  h as easeInOutQuad
};
