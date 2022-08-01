import m from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import i from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/esnext.promise.all-settled.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import s from "@babel/runtime-corejs3/core-js-stable/promise";
import { EventEmitter as l } from "@x_m/event-emitter";
var v = "PrizeWheel";
function r(e) {
  return new s(function(n) {
    console.log("sleep ".concat(e, " start")), window.setTimeout(function() {
      console.log("sleep ".concat(e, " end")), n();
    }, e);
  });
}
function _() {
  return o.apply(this, arguments);
}
function o() {
  return o = m(/* @__PURE__ */ i.mark(function e() {
    return i.wrap(function(t) {
      for (; ; )
        switch (t.prev = t.next) {
          case 0:
            return console.log("imported from '@x_m/event-emitter': ".concat(l)), console.log("testPromise start"), t.next = 4, s.allSettled([r(1500), r(2e3), r(2500)]);
          case 4:
            console.log("testPromise end");
          case 5:
          case "end":
            return t.stop();
        }
    }, e);
  })), o.apply(this, arguments);
}
export {
  v as PrizeWheel,
  r as sleepMs,
  _ as testPromise
};
//# sourceMappingURL=index.es.js.map
