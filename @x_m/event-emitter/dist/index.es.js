import c from "@babel/runtime-corejs3/helpers/classCallCheck";
import p from "@babel/runtime-corejs3/helpers/createClass";
import v from "@babel/runtime-corejs3/helpers/defineProperty";
import h from "@babel/runtime-corejs3/core-js-stable/instance/find-index";
import o from "@babel/runtime-corejs3/core-js-stable/instance/filter";
var b = /* @__PURE__ */ function() {
  function a() {
    c(this, a), v(this, "eventsMap", {});
  }
  return p(a, [{
    key: "addListener",
    value: function(t, e, s) {
      var i;
      this.eventsMap[t] || (this.eventsMap[t] = []);
      var n = (i = s == null ? void 0 : s.times) !== null && i !== void 0 ? i : 1 / 0, r = this.eventsMap[t], f = h(r).call(r, function(u) {
        return u.callback === e;
      });
      return f >= 0 ? r[f].times = n : r.push({
        callback: e,
        times: n
      }), this;
    }
  }, {
    key: "removeListener",
    value: function(t, e) {
      if (this.eventsMap[t])
        if (e) {
          var s;
          this.eventsMap[t] = o(s = this.eventsMap[t]).call(s, function(i) {
            return i.callback !== e;
          });
        } else
          this.eventsMap[t] = [];
      return this;
    }
  }, {
    key: "emit",
    value: function(t) {
      for (var e = arguments.length, s = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
        s[i - 1] = arguments[i];
      if (this.eventsMap[t]) {
        var n;
        this.eventsMap[t] = o(n = this.eventsMap[t]).call(n, function(r) {
          return r.times > 0 && (r.callback.apply(r, s), r.times -= 1), r.times > 0;
        });
      }
      return this;
    }
  }]), a;
}();
export {
  b as default
};
