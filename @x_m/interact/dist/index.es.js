import m from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import "core-js/modules/es.object.to-string.js";
import P from "@babel/runtime-corejs3/helpers/classCallCheck";
import C from "@babel/runtime-corejs3/helpers/createClass";
import l from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import O from "@babel/runtime-corejs3/helpers/inherits";
import B from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import T from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import c from "@babel/runtime-corejs3/helpers/defineProperty";
import Y from "@x_m/event-emitter";
import x from "@babel/runtime-corejs3/helpers/slicedToArray";
import "core-js/modules/web.dom-collections.for-each.js";
import W from "@x_m/event-emitter/src";
(function(r) {
  if ("InputDeviceCapabilities" in r || "sourceCapabilities" in UIEvent.prototype)
    return;
  function a(v) {
    Object.defineProperty(this, "__firesTouchEvents", {
      value: v && "firesTouchEvents" in v ? v.firesTouchEvents : !1,
      writable: !1,
      enumerable: !1
    });
  }
  a.prototype = {
    get firesTouchEvents() {
      return this.__firesTouchEvents;
    }
  }, r.InputDeviceCapabilities = a;
  var u = new a({ firesTouchEvents: !0 }), t = new a({ firesTouchEvents: !1 }), o;
  function s(v) {
    o = Date.now();
  }
  document.addEventListener("touchstart", s, !0), document.addEventListener("touchmove", s, !0), document.addEventListener("touchend", s, !0), document.addEventListener("touchcancel", s, !0);
  var f = "__inputDeviceCapabilitiesPolyfill_specifiedSourceCapabilities", e = ["resize", "error", "load", "unload", "abort"], h = 1e3;
  Object.defineProperty(UIEvent.prototype, "sourceCapabilities", {
    get: function() {
      if (f in this)
        return this[f];
      if (e.indexOf(this.type) >= 0)
        return null;
      if (!("TouchEvent" in r))
        return t;
      if (this instanceof TouchEvent)
        return u;
      if ("PointerEvent" in r && this instanceof PointerEvent)
        return this.pointerType == "touch" ? u : t;
      var v = Date.now() < o + h ? u : t;
      return Object.defineProperty(this, f, {
        value: v,
        writable: !1
      }), v;
    },
    configurable: !0,
    enumerable: !0
  });
  function p(v) {
    if (v in r && !(!("length" in r[v]) || r[v].length < 1)) {
      var y = r[v];
      r[v] = function(M, b) {
        var S = b && b.sourceCapabilities ? b.sourceCapabilities : null;
        b && delete b.sourceCapabilities;
        var E = new y(M, b);
        return Object.defineProperty(E, f, {
          value: S,
          writable: !1
        }), E;
      }, r[v].prototype = y.prototype;
    }
  }
  for (var n = ["UIEvent", "MouseEvent", "TouchEvent", "InputEvent", "CompositionEvent", "FocusEvent", "KeyboardEvent", "WheelEvent", "PointerEvent"], i = 0; i < n.length; i++)
    p(n[i]);
  var d = Document.prototype.createEvent;
  Document.prototype.createEvent = function(v) {
    var y = d.call(this, v);
    if (y instanceof UIEvent)
      return Object.defineProperty(y, f, {
        value: null,
        writable: !1
      }), y;
  };
})(globalThis);
function F(r) {
  var a = X();
  return function() {
    var t = T(r), o;
    if (a) {
      var s = T(this).constructor;
      o = m(t, arguments, s);
    } else
      o = t.apply(this, arguments);
    return B(this, o);
  };
}
function X() {
  if (typeof Reflect == "undefined" || !m || m.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(m(Boolean, [], function() {
    })), !0;
  } catch (r) {
    return !1;
  }
}
var ne = /* @__PURE__ */ function(r) {
  O(u, r);
  var a = F(u);
  function u(t) {
    var o, s, f, e, h, p, n;
    return P(this, u), n = a.call(this), c(l(n), "element", null), c(l(n), "isMoving", !1), c(l(n), "onMouseDown", function(i) {
      var d;
      n.disabledWhenFiresTouchEvents && (d = i.sourceCapabilities) !== null && d !== void 0 && d.firesTouchEvents || !n.enableMove || i.button !== n.mouseButtonOfMove || (n.isMoving = !0);
    }), c(l(n), "onMouseMove", function(i) {
      !n.enableMove || !n.isMoving || n.emit("move", {
        x: i.movementX,
        y: i.movementY
      });
    }), c(l(n), "onMouseUp", function() {
      n.isMoving = !1;
    }), c(l(n), "onWheel", function(i) {
      var d = {
        x: i.clientX,
        y: i.clientY
      };
      n.enableScale && !!i.shiftKey == (n.mouseButtonOfScale === "shift-required") && n.emit("scale", {
        ratio: i.deltaY > 0 ? 0.9 : 1 / 0.9,
        center: d
      }), n.enableRotate && !!i.shiftKey != (n.mouseButtonOfScale === "shift-required") && n.emit("rotate", {
        ratio: i.deltaY > 0 ? 15 * Math.PI / 180 : -(15 * Math.PI) / 180,
        center: d
      });
    }), c(l(n), "enableMove", void 0), c(l(n), "enableScale", void 0), c(l(n), "enableRotate", void 0), c(l(n), "mouseButtonOfMove", void 0), c(l(n), "mouseButtonOfScale", void 0), c(l(n), "disabledWhenFiresTouchEvents", void 0), n.enableMove = (o = t == null ? void 0 : t.enableMove) !== null && o !== void 0 ? o : !0, n.enableScale = (s = t == null ? void 0 : t.enableScale) !== null && s !== void 0 ? s : !0, n.enableRotate = (f = t == null ? void 0 : t.enableRotate) !== null && f !== void 0 ? f : !0, n.disabledWhenFiresTouchEvents = (e = t == null ? void 0 : t.disabledWhenFiresTouchEvents) !== null && e !== void 0 ? e : !1, n.mouseButtonOfMove = (h = t == null ? void 0 : t.mouseButtonOfMove) !== null && h !== void 0 ? h : 0, n.mouseButtonOfScale = (p = t == null ? void 0 : t.mouseButtonOfScale) !== null && p !== void 0 ? p : "middle-button-only", n;
  }
  return C(u, [{
    key: "attach",
    value: function(o) {
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
  var a = A();
  return function() {
    var t = T(r), o;
    if (a) {
      var s = T(this).constructor;
      o = m(t, arguments, s);
    } else
      o = t.apply(this, arguments);
    return B(this, o);
  };
}
function A() {
  if (typeof Reflect == "undefined" || !m || m.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(m(Boolean, [], function() {
    })), !0;
  } catch (r) {
    return !1;
  }
}
function L(r, a) {
  return {
    x: a.x - r.x,
    y: a.y - r.y
  };
}
function g(r, a) {
  return Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2));
}
function I() {
  for (var r = 0, a = 0, u = arguments.length, t = new Array(u), o = 0; o < u; o++)
    t[o] = arguments[o];
  return t.forEach(function(s) {
    r += s.x, a += s.y;
  }), {
    x: r / t.length,
    y: a / t.length
  };
}
var oe = /* @__PURE__ */ function(r) {
  O(u, r);
  var a = D(u);
  function u(t) {
    var o, s, f, e;
    return P(this, u), e = a.call(this), c(l(e), "element", null), c(l(e), "hasTouchStart", !1), c(l(e), "touchAPos", {
      x: -1,
      y: -1
    }), c(l(e), "touchBPos", {
      x: -1,
      y: -1
    }), c(l(e), "syncTouches", function(h) {
      var p = x(h.touches, 2), n = p[0], i = p[1];
      n && (e.touchAPos.x = n.clientX, e.touchAPos.y = n.clientY), i && (e.touchBPos.x = i.clientX, e.touchBPos.y = i.clientY);
    }), c(l(e), "onTouchStart", function(h) {
      e.hasTouchStart = !0, h.preventDefault(), e.syncTouches(h);
    }), c(l(e), "onGlobalTouchStart", function(h) {
      e.hasTouchStart && (h.preventDefault(), e.syncTouches(h));
    }), c(l(e), "onTouchMove", function(h) {
      var p = x(h.touches, 2), n = p[0], i = p[1];
      if (!(!n || !e.hasTouchStart)) {
        if (e.enableMove)
          if (i) {
            var d = n.clientX - e.touchAPos.x, v = i.clientX - e.touchBPos.x, y = d + v;
            e.enableScale && (y /= 2), d * v > 0 && (y = Math.abs(d) < Math.abs(v) ? d : v);
            var M = n.clientY - e.touchAPos.y, b = i.clientY - e.touchBPos.y, S = M + b;
            e.enableScale && (S /= 2), M * b > 0 && (S = Math.abs(M) < Math.abs(b) ? M : b), e.emit("move", {
              x: y,
              y: S
            });
          } else
            e.emit("move", {
              x: n.clientX - e.touchAPos.x,
              y: n.clientY - e.touchAPos.y
            });
        if (n && i && (e.enableRotate || e.enableScale)) {
          var E = {
            x: n.clientX,
            y: n.clientY
          }, w = {
            x: i.clientX,
            y: i.clientY
          };
          if (e.enableScale && e.emit("scale", {
            center: I(E, w, e.touchAPos, e.touchBPos),
            ratio: g(E, w) / g(e.touchAPos, e.touchBPos)
          }), e.enableRotate) {
            var R = L(E, w), $ = L(e.touchAPos, e.touchBPos), _ = Math.atan2(R.y, R.x) - Math.atan2($.y, $.x);
            _ > Math.PI && (_ -= Math.PI * 2), _ < -Math.PI && (_ += Math.PI * 2), e.emit("rotate", {
              center: I(E, w),
              ratio: _
            });
          }
        }
        e.syncTouches(h);
      }
    }), c(l(e), "onTouchEnd", function(h) {
      e.syncTouches(h), h.touches.length === 0 && (e.hasTouchStart = !1);
    }), c(l(e), "enableMove", void 0), c(l(e), "enableScale", void 0), c(l(e), "enableRotate", void 0), e.enableMove = (o = t == null ? void 0 : t.enableMove) !== null && o !== void 0 ? o : !0, e.enableScale = (s = t == null ? void 0 : t.enableScale) !== null && s !== void 0 ? s : !0, e.enableRotate = (f = t == null ? void 0 : t.enableRotate) !== null && f !== void 0 ? f : !0, e;
  }
  return C(u, [{
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
  var a = j();
  return function() {
    var t = T(r), o;
    if (a) {
      var s = T(this).constructor;
      o = m(t, arguments, s);
    } else
      o = t.apply(this, arguments);
    return B(this, o);
  };
}
function j() {
  if (typeof Reflect == "undefined" || !m || m.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(m(Boolean, [], function() {
    })), !0;
  } catch (r) {
    return !1;
  }
}
var re = /* @__PURE__ */ function(r) {
  O(u, r);
  var a = U(u);
  function u() {
    return P(this, u), a.apply(this, arguments);
  }
  return C(u);
}(Y);
export {
  re as Interact,
  ne as MouseFormatter,
  oe as TouchFormatter
};
