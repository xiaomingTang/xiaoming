import c from "@babel/runtime-corejs3/helpers/classCallCheck";
import v from "@babel/runtime-corejs3/helpers/createClass";
import o from "@babel/runtime-corejs3/helpers/defineProperty";
import h from "@babel/runtime-corejs3/core-js-stable/instance/find-index";
import f from "@babel/runtime-corejs3/core-js-stable/instance/filter";
var E = /* @__PURE__ */ function() {
  function l() {
    c(this, l), o(this, "eventsMap", {});
  }
  return v(l, [{
    key: "addListener",
    value: function(t, e, s) {
      var r;
      this.eventsMap[t] || (this.eventsMap[t] = []);
      var a = (r = s == null ? void 0 : s.times) !== null && r !== void 0 ? r : 1 / 0, n = this.eventsMap[t], i = h(n).call(n, function(u) {
        return u.callback === e;
      });
      return i >= 0 ? n[i].times = a : n.push({
        callback: e,
        times: a
      }), this;
    }
  }, {
    key: "removeListener",
    value: function(t, e) {
      if (this.eventsMap[t])
        if (e) {
          var s;
          this.eventsMap[t] = f(s = this.eventsMap[t]).call(s, function(r) {
            return r.callback !== e;
          });
        } else
          this.eventsMap[t] = [];
      return this;
    }
  }, {
    key: "emit",
    value: function(t) {
      for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
        s[r - 1] = arguments[r];
      if (this.eventsMap.BUILT_IN_EMIT) {
        var a;
        this.eventsMap.BUILT_IN_EMIT = f(a = this.eventsMap.BUILT_IN_EMIT).call(a, function(i) {
          return i.times > 0 && (i.callback({
            type: t,
            args: s
          }), i.times -= 1), i.times > 0;
        });
      }
      if (this.eventsMap[t]) {
        var n;
        this.eventsMap[t] = f(n = this.eventsMap[t]).call(n, function(i) {
          return i.times > 0 && (i.callback.apply(i, s), i.times -= 1), i.times > 0;
        });
      }
      return this;
    }
  }]), l;
}();
export {
  E as default
};
