import C from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import "core-js/modules/es.object.to-string.js";
import M from "@babel/runtime-corejs3/helpers/classCallCheck";
import S from "@babel/runtime-corejs3/helpers/createClass";
import l from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import P from "@babel/runtime-corejs3/helpers/inherits";
import A from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import E from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import f from "@babel/runtime-corejs3/helpers/defineProperty";
import g from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import p from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import { mat3 as w } from "gl-matrix";
import { MouseFormatter as B, TouchFormatter as D } from "@x_m/interact";
import b from "@x_m/event-emitter";
function _(x) {
  var y = F();
  return function() {
    var s = E(x), t;
    if (y) {
      var r = E(this).constructor;
      t = C(s, arguments, r);
    } else
      t = s.apply(this, arguments);
    return A(this, t);
  };
}
function F() {
  if (typeof Reflect == "undefined" || !C || C.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(C(Boolean, [], function() {
    })), !0;
  } catch (x) {
    return !1;
  }
}
var Y = /* @__PURE__ */ function(x) {
  P(h, x);
  var y = _(h);
  function h() {
    var s, t;
    M(this, h);
    for (var r = arguments.length, e = new Array(r), a = 0; a < r; a++)
      e[a] = arguments[a];
    return t = y.call.apply(y, g(s = [this]).call(s, e)), f(l(t), "originTranslate", {
      x: 0,
      y: 0
    }), f(l(t), "onMove", function() {
      for (var o = arguments.length, n = new Array(o), i = 0; i < o; i++)
        n[i] = arguments[i];
      var c = n[0];
      w.multiply(t.matrix, [1, 0, 0, 0, 1, 0, c.x, c.y, 1], t.matrix), t.emit("change", l(t));
    }), f(l(t), "onRotate", function() {
      for (var o = arguments.length, n = new Array(o), i = 0; i < o; i++)
        n[i] = arguments[i];
      var c = n[0], u = c.ratio, d = c.center, m = Math.cos(u), v = Math.sin(u), T = t.originTranslate, I = T.x, L = T.y, O = -(d.x - I), R = -(d.y - L);
      w.multiply(t.matrix, [m, v, 0, -v, m, 0, O * m - R * v - O, O * v + R * m - R, 1], t.matrix), t.emit("change", l(t));
    }), f(l(t), "onScale", function() {
      for (var o = arguments.length, n = new Array(o), i = 0; i < o; i++)
        n[i] = arguments[i];
      var c = n[0], u = c.ratio, d = c.center, m = t.originTranslate, v = m.x, T = m.y;
      w.multiply(t.matrix, [u, 0, 0, 0, u, 0, (d.x - v) * (1 - u), (d.y - T) * (1 - u), 1], t.matrix), t.emit("change", l(t));
    }), f(l(t), "matrix", w.create()), f(l(t), "mouseFormatter", void 0), f(l(t), "touchFormatter", void 0), t;
  }
  return S(h, [{
    key: "setOriginTranslate",
    value: function(t) {
      this.originTranslate.x = t.x, this.originTranslate.y = t.y;
    }
  }, {
    key: "setOriginTranslateFromDomRect",
    value: function(t) {
      var r = t.x, e = t.y, a = t.width, o = t.height;
      this.originTranslate = {
        x: r + a / 2,
        y: e + o / 2
      };
    }
  }, {
    key: "setOriginTranslateFromElement",
    value: function(t) {
      var r = t.style.transform;
      t.style.transform = "";
      var e = t.getBoundingClientRect(), a = e.x, o = e.y, n = e.width, i = e.height;
      this.originTranslate = {
        x: a + n / 2,
        y: o + i / 2
      }, t.style.transform = r;
    }
  }, {
    key: "attach",
    value: function(t) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["mouse", "touch"];
      if (!t) {
        console.error("[interact-dom]: element is required");
        return;
      }
      if (this.setOriginTranslateFromElement(t), p(r).call(r, "mouse")) {
        var e = new B({
          disabledWhenFiresTouchEvents: p(r).call(r, "touch")
        });
        e.attach(t), e.addListener("move", this.onMove), e.addListener("rotate", this.onRotate), e.addListener("scale", this.onScale), this.mouseFormatter = e;
      }
      if (p(r).call(r, "mouse")) {
        var a = new D();
        a.attach(t), a.addListener("move", this.onMove), a.addListener("rotate", this.onRotate), a.addListener("scale", this.onScale), this.touchFormatter = a;
      }
    }
  }, {
    key: "detach",
    value: function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["mouse", "touch"];
      if (p(t).call(t, "mouse")) {
        var r;
        (r = this.mouseFormatter) === null || r === void 0 || r.detach();
      }
      if (p(t).call(t, "touch")) {
        var e;
        (e = this.touchFormatter) === null || e === void 0 || e.detach();
      }
    }
  }, {
    key: "formatToCss",
    value: function() {
      var t, r, e, a, o, n = this.matrix;
      return g(t = g(r = g(e = g(a = g(o = "matrix(".concat(n[0], ",")).call(o, n[1], ",")).call(a, n[3], ",")).call(e, n[4], ",")).call(r, n[6], ",")).call(t, n[7], ")");
    }
  }]), h;
}(b);
export {
  Y as default
};
