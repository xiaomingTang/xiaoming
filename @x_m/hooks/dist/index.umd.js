(function(n,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("@babel/runtime-corejs3/helpers/slicedToArray"),require("react"),require("lodash/noop")):typeof define=="function"&&define.amd?define(["exports","@babel/runtime-corejs3/helpers/slicedToArray","react","lodash/noop"],t):(n=typeof globalThis!="undefined"?globalThis:n||self,t(n.XM_Hooks={},n._slicedToArray,n.react,n.noop))})(this,function(n,t,o,l){"use strict";const a=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},c=a(t),p=a(l);function v(e,u){var r,_=o.useRef(u?void 0:e(performance.now())),w=o.useState(_.current),d=c.default(w,2),b=d[0],y=d[1],s=o.useRef(e),i=(r=u==null?void 0:u.enable)!==null&&r!==void 0?r:!0;return o.useEffect(function(){s.current=e},[e]),o.useEffect(function(){if(!i)return p.default;var f=-1,h=function A(R){!i||(y(s.current(R)),f=window.requestAnimationFrame(A))};return f=window.requestAnimationFrame(h),function(){window.cancelAnimationFrame(f)}},[i]),b}function m(){o.useEffect(function(){var e=function(r){return r.preventDefault(),r.returnValue="before unload","before unload"};return window.addEventListener("beforeunload",e),function(){window.removeEventListener("beforeunload",e)}},[])}n.useRafLoop=v,n.useWarnBeforeUnload=m,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
