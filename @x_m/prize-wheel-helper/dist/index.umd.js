(function(t,n){typeof exports=="object"&&typeof module!="undefined"?n(exports,require("@babel/runtime-corejs3/helpers/slicedToArray"),require("react"),require("lodash/noop")):typeof define=="function"&&define.amd?define(["exports","@babel/runtime-corejs3/helpers/slicedToArray","react","lodash/noop"],n):(t=typeof globalThis!="undefined"?globalThis:t||self,n(t.XM_PrizeWheelHelper={},t._slicedToArray,t.react,t.noop))})(this,function(t,n,r,f){"use strict";const u=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},i=u(n),c=u(f);function l(e){var p=r.useState(-1),s=i.default(p,2),_=s[0],y=s[1],T=r.useState(!1),o=i.default(T,2),S=o[0],a=o[1];return r.useEffect(function(){if(!e)return c.default;var d=function(b){var g=b.type;switch(g){case"start":a(!0);break;case"running":y(e.deg);break;case"end":a(!1);break}};return e.addListener("BUILT_IN_EMIT",d),function(){e.removeListener("BUILT_IN_EMIT",d)}},[e]),{deg:_,running:S}}t.usePrizeWheelState=l,Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
