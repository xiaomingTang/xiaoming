import p from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import "core-js/modules/es.object.to-string.js";
import w from "@babel/runtime-corejs3/helpers/classCallCheck";
import P from "@babel/runtime-corejs3/helpers/createClass";
import i from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import C from "@babel/runtime-corejs3/helpers/inherits";
import R from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import T from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import a from "@babel/runtime-corejs3/helpers/defineProperty";
import Y from "@x_m/event-emitter";
import x from "@babel/runtime-corejs3/helpers/slicedToArray";
import "core-js/modules/web.dom-collections.for-each.js";
import W from "@x_m/event-emitter/src";
(function(r) {
  if ("InputDeviceCapabilities" in r || "sourceCapabilities" in UIEvent.prototype)
    return;
  function l(e) {
    Object.defineProperty(this, "__firesTouchEvents", {
      value: e && "firesTouchEvents" in e ? e.firesTouchEvents : !1,
      writable: !1,
      enumerable: !1
    });
  }
  l.prototype = {
    get firesTouchEvents() {
      return this.__firesTouchEvents;
    }
  }, r.InputDeviceCapabilities = l;
  var u = new l({ firesTouchEvents: !0 }), t = new l({ firesTouchEvents: !1 }), o;
  function s(e) {
    o = Date.now();
  }
  document.addEventListener("touchstart", s, !0), document.addEventListener("touchmove", s, !0), document.addEventListener("touchend", s, !0), document.addEventListener("touchcancel", s, !0);
  var d = "__inputDeviceCapabilitiesPolyfill_specifiedSourceCapabilities", n = ["resize", "error", "load", "unload", "abort"], v = 1e3;
  Object.defineProperty(UIEvent.prototype, "sourceCapabilities", {
    get: function() {
      if (d in this)
        return this[d];
      if (n.indexOf(this.type) >= 0)
        return null;
      if (!("TouchEvent" in r))
        return t;
      if (this instanceof TouchEvent)
        return u;
      if ("PointerEvent" in r && this instanceof PointerEvent)
        return this.pointerType == "touch" ? u : t;
      var e = Date.now() < o + v ? u : t;
      return Object.defineProperty(this, d, {
        value: e,
        writable: !1
      }), e;
    },
    configurable: !0,
    enumerable: !0
  });
  function b(e) {
    if (e in r && !(!("length" in r[e]) || r[e].length < 1)) {
      var c = r[e];
      r[e] = function(m, y) {
        var S = y && y.sourceCapabilities ? y.sourceCapabilities : null;
        y && delete y.sourceCapabilities;
        var M = new c(m, y);
        return Object.defineProperty(M, d, {
          value: S,
          writable: !1
        }), M;
      }, r[e].prototype = c.prototype;
    }
  }
  for (var f = ["UIEvent", "MouseEvent", "TouchEvent", "InputEvent", "CompositionEvent", "FocusEvent", "KeyboardEvent", "WheelEvent", "PointerEvent"], h = 0; h < f.length; h++)
    b(f[h]);
  var E = Document.prototype.createEvent;
  Document.prototype.createEvent = function(e) {
    var c = E.call(this, e);
    if (c instanceof UIEvent)
      return Object.defineProperty(c, d, {
        value: null,
        writable: !1
      }), c;
  };
})(globalThis);
function F(r) {
  var l = X();
  return function() {
    var t = T(r), o;
    if (l) {
      var s = T(this).constructor;
      o = p(t, arguments, s);
    } else
      o = t.apply(this, arguments);
    return R(this, o);
  };
}
function X() {
  if (typeof Reflect == "undefined" || !p || p.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(p(Boolean, [], function() {
    })), !0;
  } catch (r) {
    return !1;
  }
}
var ne = /* @__PURE__ */ function(r) {
  C(u, r);
  var l = F(u);
  function u(t) {
    var o, s, d, n, v, b, f, h, E, e;
    return w(this, u), e = l.call(this), a(i(e), "element", null), a(i(e), "isMoving", !1), a(i(e), "onMouseDown", function(c) {
      var m;
      e.disabledWhenFiresTouchEvents && (m = c.sourceCapabilities) !== null && m !== void 0 && m.firesTouchEvents || !e.enableMove || c.button !== e.mouseButtonOfMove || (e.isMoving = !0);
    }), a(i(e), "onMouseMove", function(c) {
      !e.enableMove || !e.isMoving || e.emit("move", {
        x: c.movementX * e.ratioOfMove,
        y: c.movementY * e.ratioOfMove
      });
    }), a(i(e), "onMouseUp", function() {
      e.isMoving = !1;
    }), a(i(e), "onWheel", function(c) {
      var m = {
        x: c.clientX,
        y: c.clientY
      };
      e.enableScale && !!c.shiftKey == (e.mouseButtonOfScale === "shift-required") && e.emit("scale", {
        ratio: c.deltaY > 0 ? 1 / e.ratioOfScale : e.ratioOfScale,
        center: m
      }), e.enableRotate && !!c.shiftKey != (e.mouseButtonOfScale === "shift-required") && e.emit("rotate", {
        ratio: c.deltaY > 0 ? e.ratioOfRotate * Math.PI / 180 : -(e.ratioOfRotate * Math.PI) / 180,
        center: m
      });
    }), a(i(e), "enableMove", void 0), a(i(e), "enableScale", void 0), a(i(e), "enableRotate", void 0), a(i(e), "mouseButtonOfMove", void 0), a(i(e), "mouseButtonOfScale", void 0), a(i(e), "ratioOfMove", void 0), a(i(e), "ratioOfScale", void 0), a(i(e), "ratioOfRotate", void 0), a(i(e), "disabledWhenFiresTouchEvents", void 0), e.enableMove = (o = t == null ? void 0 : t.enableMove) !== null && o !== void 0 ? o : !0, e.enableScale = (s = t == null ? void 0 : t.enableScale) !== null && s !== void 0 ? s : !0, e.enableRotate = (d = t == null ? void 0 : t.enableRotate) !== null && d !== void 0 ? d : !0, e.ratioOfMove = (n = t == null ? void 0 : t.ratioOfMove) !== null && n !== void 0 ? n : 1, e.ratioOfScale = (v = t == null ? void 0 : t.ratioOfScale) !== null && v !== void 0 ? v : 1.1, e.ratioOfRotate = (b = t == null ? void 0 : t.ratioOfRotate) !== null && b !== void 0 ? b : 15, e.disabledWhenFiresTouchEvents = (f = t == null ? void 0 : t.disabledWhenFiresTouchEvents) !== null && f !== void 0 ? f : !1, e.mouseButtonOfMove = (h = t == null ? void 0 : t.mouseButtonOfMove) !== null && h !== void 0 ? h : 0, e.mouseButtonOfScale = (E = t == null ? void 0 : t.mouseButtonOfScale) !== null && E !== void 0 ? E : "middle-button-only", e;
  }
  return P(u, [{
    key: "attach",
    value: function(o) {
      if (!o) {
        console.error("[interact] element required");
        return;
      }
      this.element = o, window.addEventListener("mousemove", this.onMouseMove), window.addEventListener("mouseup", this.onMouseUp), o.addEventListener("mousedown", this.onMouseDown), o.addEventListener("wheel", this.onWheel);
    }
  }, {
    key: "detach",
    value: function() {
      var o, s;
      window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("mouseup", this.onMouseUp), (o = this.element) === null || o === void 0 || o.removeEventListener("mousedown", this.onMouseDown), (s = this.element) === null || s === void 0 || s.removeEventListener("wheel", this.onWheel), this.element = null;
    }
  }]), u;
}(Y);
function D(r) {
  var l = A();
  return function() {
    var t = T(r), o;
    if (l) {
      var s = T(this).constructor;
      o = p(t, arguments, s);
    } else
      o = t.apply(this, arguments);
    return R(this, o);
  };
}
function A() {
  if (typeof Reflect == "undefined" || !p || p.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(p(Boolean, [], function() {
    })), !0;
  } catch (r) {
    return !1;
  }
}
function L(r, l) {
  return {
    x: l.x - r.x,
    y: l.y - r.y
  };
}
function g(r, l) {
  return Math.sqrt(Math.pow(r.x - l.x, 2) + Math.pow(r.y - l.y, 2));
}
function I() {
  for (var r = 0, l = 0, u = arguments.length, t = new Array(u), o = 0; o < u; o++)
    t[o] = arguments[o];
  return t.forEach(function(s) {
    r += s.x, l += s.y;
  }), {
    x: r / t.length,
    y: l / t.length
  };
}
var oe = /* @__PURE__ */ function(r) {
  C(u, r);
  var l = D(u);
  function u(t) {
    var o, s, d, n;
    return w(this, u), n = l.call(this), a(i(n), "element", null), a(i(n), "hasTouchStart", !1), a(i(n), "touchAPos", {
      x: -1,
      y: -1
    }), a(i(n), "touchBPos", {
      x: -1,
      y: -1
    }), a(i(n), "syncTouches", function(v) {
      var b = x(v.touches, 2), f = b[0], h = b[1];
      f && (n.touchAPos.x = f.clientX, n.touchAPos.y = f.clientY), h && (n.touchBPos.x = h.clientX, n.touchBPos.y = h.clientY);
    }), a(i(n), "onTouchStart", function(v) {
      n.hasTouchStart = !0, v.preventDefault(), n.syncTouches(v);
    }), a(i(n), "onGlobalTouchStart", function(v) {
      n.hasTouchStart && (v.preventDefault(), n.syncTouches(v));
    }), a(i(n), "onTouchMove", function(v) {
      var b = x(v.touches, 2), f = b[0], h = b[1];
      if (!(!f || !n.hasTouchStart)) {
        if (n.enableMove)
          if (h) {
            var E = f.clientX - n.touchAPos.x, e = h.clientX - n.touchBPos.x, c = E + e;
            n.enableScale && (c /= 2), E * e > 0 && (c = Math.abs(E) < Math.abs(e) ? E : e);
            var m = f.clientY - n.touchAPos.y, y = h.clientY - n.touchBPos.y, S = m + y;
            n.enableScale && (S /= 2), m * y > 0 && (S = Math.abs(m) < Math.abs(y) ? m : y), n.emit("move", {
              x: c,
              y: S
            });
          } else
            n.emit("move", {
              x: f.clientX - n.touchAPos.x,
              y: f.clientY - n.touchAPos.y
            });
        if (f && h && (n.enableRotate || n.enableScale)) {
          var M = {
            x: f.clientX,
            y: f.clientY
          }, O = {
            x: h.clientX,
            y: h.clientY
          };
          if (n.enableScale && n.emit("scale", {
            center: I(M, O, n.touchAPos, n.touchBPos),
            ratio: g(M, O) / g(n.touchAPos, n.touchBPos)
          }), n.enableRotate) {
            var $ = L(M, O), B = L(n.touchAPos, n.touchBPos), _ = Math.atan2($.y, $.x) - Math.atan2(B.y, B.x);
            _ > Math.PI && (_ -= Math.PI * 2), _ < -Math.PI && (_ += Math.PI * 2), n.emit("rotate", {
              center: I(M, O),
              ratio: _
            });
          }
        }
        n.syncTouches(v);
      }
    }), a(i(n), "onTouchEnd", function(v) {
      n.syncTouches(v), v.touches.length === 0 && (n.hasTouchStart = !1);
    }), a(i(n), "enableMove", void 0), a(i(n), "enableScale", void 0), a(i(n), "enableRotate", void 0), n.enableMove = (o = t == null ? void 0 : t.enableMove) !== null && o !== void 0 ? o : !0, n.enableScale = (s = t == null ? void 0 : t.enableScale) !== null && s !== void 0 ? s : !0, n.enableRotate = (d = t == null ? void 0 : t.enableRotate) !== null && d !== void 0 ? d : !0, n;
  }
  return P(u, [{
    key: "attach",
    value: function(o) {
      this.element = o, this.element.addEventListener("touchstart", this.onTouchStart, {
        passive: !1
      }), window.addEventListener("touchstart", this.onGlobalTouchStart, {
        passive: !1
      }), window.addEventListener("touchmove", this.onTouchMove), window.addEventListener("touchend", this.onTouchEnd);
    }
  }, {
    key: "detach",
    value: function() {
      var o;
      (o = this.element) === null || o === void 0 || o.removeEventListener("touchstart", this.onTouchStart), window.removeEventListener("touchstart", this.onGlobalTouchStart), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd), this.element = null;
    }
  }]), u;
}(W);
function U(r) {
  var l = j();
  return function() {
    var t = T(r), o;
    if (l) {
      var s = T(this).constructor;
      o = p(t, arguments, s);
    } else
      o = t.apply(this, arguments);
    return R(this, o);
  };
}
function j() {
  if (typeof Reflect == "undefined" || !p || p.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(p(Boolean, [], function() {
    })), !0;
  } catch (r) {
    return !1;
  }
}
var re = /* @__PURE__ */ function(r) {
  C(u, r);
  var l = U(u);
  function u() {
    return w(this, u), l.apply(this, arguments);
  }
  return P(u);
}(Y);
export {
  re as Interact,
  ne as MouseFormatter,
  oe as TouchFormatter
};
