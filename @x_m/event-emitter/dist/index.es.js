import m from "@babel/runtime-corejs3/helpers/classCallCheck";
import v from "@babel/runtime-corejs3/helpers/createClass";
import s from "@babel/runtime-corejs3/helpers/classPrivateFieldGet";
import p from "@babel/runtime-corejs3/core-js-stable/instance/find-index";
import u from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import d from "@babel/runtime-corejs3/core-js-stable/weak-map";
function k(l, c, t) {
  w(l, c), c.set(l, t);
}
function w(l, c) {
  if (c.has(l))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
var i = /* @__PURE__ */ new d(), L = /* @__PURE__ */ function() {
  function l() {
    m(this, l), k(this, i, {
      writable: !0,
      value: {}
    });
  }
  return v(l, [{
    key: "addListener",
    value: function(t, n, a) {
      var r;
      s(this, i)[t] || (s(this, i)[t] = []);
      var o = (r = a == null ? void 0 : a.times) !== null && r !== void 0 ? r : 1 / 0, e = s(this, i)[t], f = p(e).call(e, function(h) {
        return h.callback === n;
      });
      return f >= 0 ? e[f].times = o : e.push({
        callback: n,
        times: o
      }), this;
    }
  }, {
    key: "removeListener",
    value: function(t, n) {
      if (s(this, i)[t])
        if (n) {
          var a;
          s(this, i)[t] = u(a = s(this, i)[t]).call(a, function(r) {
            return r.callback !== n;
          });
        } else
          s(this, i)[t] = [];
      return this;
    }
  }, {
    key: "emit",
    value: function(t) {
      for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
        a[r - 1] = arguments[r];
      if (s(this, i)[t]) {
        var o;
        s(this, i)[t] = u(o = s(this, i)[t]).call(o, function(e) {
          return e.times > 0 && (e.callback.apply(e, a), e.times -= 1), e.times > 0;
        });
      }
      return this;
    }
  }]), l;
}();
export {
  L as default
};
//# sourceMappingURL=index.es.js.map
