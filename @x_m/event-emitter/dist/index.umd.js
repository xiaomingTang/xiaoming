(function(i,d){typeof exports=="object"&&typeof module!="undefined"?module.exports=d(require("@babel/runtime-corejs3/helpers/classCallCheck"),require("@babel/runtime-corejs3/helpers/createClass"),require("@babel/runtime-corejs3/helpers/classPrivateFieldGet"),require("@babel/runtime-corejs3/core-js-stable/instance/find-index"),require("@babel/runtime-corejs3/core-js-stable/instance/filter"),require("@babel/runtime-corejs3/core-js-stable/weak-map")):typeof define=="function"&&define.amd?define(["@babel/runtime-corejs3/helpers/classCallCheck","@babel/runtime-corejs3/helpers/createClass","@babel/runtime-corejs3/helpers/classPrivateFieldGet","@babel/runtime-corejs3/core-js-stable/instance/find-index","@babel/runtime-corejs3/core-js-stable/instance/filter","@babel/runtime-corejs3/core-js-stable/weak-map"],d):(i=typeof globalThis!="undefined"?globalThis:i||self,i.EventEmitter=d(i._classCallCheck,i._createClass,i._classPrivateFieldGet,i._findIndexInstanceProperty,i._filterInstanceProperty,i._WeakMap))})(this,function(i,d,p,m,_,v){"use strict";const f=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},j=f(i),k=f(d),s=f(p),C=f(m),h=f(_),y=f(v);function P(e,u,t){w(e,u),u.set(e,t)}function w(e,u){if(u.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}var r=new y.default,I=function(){function e(){j.default(this,e),P(this,r,{writable:!0,value:{}})}return k.default(e,[{key:"addListener",value:function(t,l,c){var a;s.default(this,r)[t]||(s.default(this,r)[t]=[]);var o=(a=c==null?void 0:c.times)!==null&&a!==void 0?a:1/0,n=s.default(this,r)[t],b=C.default(n).call(n,function(E){return E.callback===l});return b>=0?n[b].times=o:n.push({callback:l,times:o}),this}},{key:"removeListener",value:function(t,l){if(s.default(this,r)[t])if(l){var c;s.default(this,r)[t]=h.default(c=s.default(this,r)[t]).call(c,function(a){return a.callback!==l})}else s.default(this,r)[t]=[];return this}},{key:"emit",value:function(t){for(var l=arguments.length,c=new Array(l>1?l-1:0),a=1;a<l;a++)c[a-1]=arguments[a];if(s.default(this,r)[t]){var o;s.default(this,r)[t]=h.default(o=s.default(this,r)[t]).call(o,function(n){return n.times>0&&(n.callback.apply(n,c),n.times-=1),n.times>0})}return this}}]),e}();return I});
//# sourceMappingURL=index.umd.js.map
