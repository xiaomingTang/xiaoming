(function(n,r){typeof exports=="object"&&typeof module!="undefined"?r(exports,require("@babel/runtime-corejs3/helpers/slicedToArray"),require("react"),require("lodash/omit"),require("lodash/noop")):typeof define=="function"&&define.amd?define(["exports","@babel/runtime-corejs3/helpers/slicedToArray","react","lodash/omit","lodash/noop"],r):(n=typeof globalThis!="undefined"?globalThis:n||self,r(n.XM_Hooks={},n._slicedToArray,n.react,n.omit,n.noop))})(this,function(n,r,o,h,E){"use strict";const a=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},v=a(r),R=a(h),m=a(E);var p={height:0,width:0,x:0,y:0,bottom:0,left:0,right:0,top:0,toJSON:function(){return R.default(p,"toJson")}};function b(e){var u=o.useState(p),t=v.default(u,2),d=t[0],s=t[1];return o.useEffect(function(){var i=e instanceof HTMLElement?e:e==null?void 0:e.current;if(i){var f=function(){s(i.getBoundingClientRect())};return f(),window.addEventListener("resize",f),function(){window.removeEventListener("resize",f)}}return m.default},[e]),d}function y(e,u){var t,d=o.useRef(u?void 0:e(performance.now())),s=o.useState(d.current),i=v.default(s,2),f=i[0],_=i[1],w=o.useRef(e),l=(t=u==null?void 0:u.enable)!==null&&t!==void 0?t:!0;return o.useEffect(function(){w.current=e},[e]),o.useEffect(function(){if(!l)return m.default;var c=-1,L=function T(A){!l||(_(w.current(A)),c=window.requestAnimationFrame(T))};return c=window.requestAnimationFrame(L),function(){window.cancelAnimationFrame(c)}},[l]),f}function S(){o.useEffect(function(){var e=function(t){return t.preventDefault(),t.returnValue="before unload","before unload"};return window.addEventListener("beforeunload",e),function(){window.removeEventListener("beforeunload",e)}},[])}n.useElementRect=b,n.useRafLoop=y,n.useWarnBeforeUnload=S,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
