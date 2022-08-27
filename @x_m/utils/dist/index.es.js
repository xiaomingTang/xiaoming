import o from "@babel/runtime-corejs3/helpers/asyncToGenerator";
import u from "@babel/runtime-corejs3/regenerator";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.promise.finally.js";
import f from "@babel/runtime-corejs3/core-js-stable/promise";
function h(t) {
  var e, n;
  return /* @__PURE__ */ o(/* @__PURE__ */ u.mark(function a() {
    return u.wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            if (typeof e == "undefined") {
              r.next = 2;
              break;
            }
            return r.abrupt("return", e);
          case 2:
            if (!n) {
              r.next = 4;
              break;
            }
            return r.abrupt("return", n);
          case 4:
            return n = t().then(function(i) {
              return e = i, i;
            }).finally(function() {
              n = void 0;
            }), r.abrupt("return", n);
          case 6:
          case "end":
            return r.stop();
        }
    }, a);
  }));
}
function v(t) {
  return new f(function(e) {
    setTimeout(e, t);
  });
}
export {
  h as genePromiseOnce,
  v as sleepMs
};
//# sourceMappingURL=index.es.js.map
