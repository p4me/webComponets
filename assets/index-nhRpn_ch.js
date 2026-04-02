(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,W=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),Y=new WeakMap;let ue=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(W&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Y.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Y.set(t,e))}return e}toString(){return this.cssText}};const ye=s=>new ue(typeof s=="string"?s:s+"",void 0,J),be=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new ue(t,s,J)},ve=(s,e)=>{if(W)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=L.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},ee=W?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ye(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:we,defineProperty:xe,getOwnPropertyDescriptor:Ae,getOwnPropertyNames:Ee,getOwnPropertySymbols:Se,getPrototypeOf:Ce}=Object,y=globalThis,te=y.trustedTypes,Pe=te?te.emptyScript:"",B=y.reactiveElementPolyfillSupport,k=(s,e)=>s,N={toAttribute(s,e){switch(e){case Boolean:s=s?Pe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},K=(s,e)=>!we(s,e),se={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&xe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=Ae(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const h=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??se}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const e=Ce(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const t=this.properties,i=[...Ee(t),...Se(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(ee(r))}else e!==void 0&&t.push(ee(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ve(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:N).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const h=i.getPropertyOptions(r),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:N;this._$Em=r;const d=a.fromAttribute(t,h.type);this[r]=d??((n=this._$Ej)==null?void 0:n.get(r))??d,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){var n;if(e!==void 0){const h=this.constructor;if(r===!1&&(o=this[e]),i??(i=h.getPropertyOptions(e)),!((i.hasChanged??K)(o,t)||i.useDefault&&i.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(h._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[k("elementProperties")]=new Map,S[k("finalized")]=new Map,B==null||B({ReactiveElement:S}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,re=s=>s,H=O.trustedTypes,ie=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,pe="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,fe="?"+$,ke=`<${fe}>`,A=document,U=()=>A.createComment(""),M=s=>s===null||typeof s!="object"&&typeof s!="function",F=Array.isArray,Oe=s=>F(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",j=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ne=/>/g,v=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,he=/"/g,ge=/^(?:script|style|textarea|title)$/i,Te=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),g=Te(1),E=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ce=new WeakMap,w=A.createTreeWalker(A,129);function _e(s,e){if(!F(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ie!==void 0?ie.createHTML(e):e}const Ue=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=P;for(let h=0;h<t;h++){const a=s[h];let d,u,c=-1,_=0;for(;_<a.length&&(n.lastIndex=_,u=n.exec(a),u!==null);)_=n.lastIndex,n===P?u[1]==="!--"?n=oe:u[1]!==void 0?n=ne:u[2]!==void 0?(ge.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=v):u[3]!==void 0&&(n=v):n===v?u[0]===">"?(n=r??P,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?v:u[3]==='"'?he:ae):n===he||n===ae?n=v:n===oe||n===ne?n=P:(n=v,r=void 0);const m=n===v&&s[h+1].startsWith("/>")?" ":"";o+=n===P?a+ke:c>=0?(i.push(d),a.slice(0,c)+pe+a.slice(c)+$+m):a+$+(c===-2?h:m)}return[_e(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class D{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const h=e.length-1,a=this.parts,[d,u]=Ue(e,t);if(this.el=D.createElement(d,i),w.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=w.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(pe)){const _=u[n++],m=r.getAttribute(c).split($),R=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:R[2],strings:m,ctor:R[1]==="."?De:R[1]==="?"?Ie:R[1]==="@"?Re:z}),r.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:o}),r.removeAttribute(c));if(ge.test(r.tagName)){const c=r.textContent.split($),_=c.length-1;if(_>0){r.textContent=H?H.emptyScript:"";for(let m=0;m<_;m++)r.append(c[m],U()),w.nextNode(),a.push({type:2,index:++o});r.append(c[_],U())}}}else if(r.nodeType===8)if(r.data===fe)a.push({type:2,index:o});else{let c=-1;for(;(c=r.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(e,t){const i=A.createElement("template");return i.innerHTML=e,i}}function C(s,e,t=s,i){var n,h;if(e===E)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=M(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((h=r==null?void 0:r._$AO)==null||h.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=C(s,r._$AS(s,e.values),r,i)),e}class Me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??A).importNode(t,!0);w.currentNode=r;let o=w.nextNode(),n=0,h=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new I(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Le(o,this,e)),this._$AV.push(d),a=i[++h]}n!==(a==null?void 0:a.index)&&(o=w.nextNode(),n++)}return w.currentNode=A,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class I{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),M(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=D.createElement(_e(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new Me(r,this),h=n.u(this.options);n.p(t),this.T(h),this._$AH=n}}_$AC(e){let t=ce.get(e.strings);return t===void 0&&ce.set(e.strings,t=new D(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new I(this.O(U()),this.O(U()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const r=re(e).nextSibling;re(e).remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=C(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{const h=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=C(this,h[i+a],t,a),d===E&&(d=this._$AH[a]),n||(n=!M(d)||d!==this._$AH[a]),d===l?e=l:e!==l&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!r&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class De extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class Ie extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Re extends z{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??l)===E)return;const i=this._$AH,r=e===l&&i!==l||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==l&&(i===l||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Le{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const q=O.litHtmlPolyfillSupport;q==null||q(D,I),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.2");const Ne=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new I(e.insertBefore(U(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis;let T=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}};var de;T._$litElement$=!0,T.finalized=!0,(de=x.litElementHydrateSupport)==null||de.call(x,{LitElement:T});const V=x.litElementPolyfillSupport;V==null||V({LitElement:T});(x.litElementVersions??(x.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const He=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:K},Be=(s=ze,e,t)=>{const{kind:i,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){const{name:n}=t;return{set(h){const a=e.get.call(this);e.set.call(this,h),this.requestUpdate(n,a,s,!0,h)},init(h){return h!==void 0&&this.C(n,void 0,s,h),h}}}if(i==="setter"){const{name:n}=t;return function(h){const a=this[n];e.call(this,h),this.requestUpdate(n,a,s,!0,h)}}throw Error("Unsupported decorator location: "+i)};function b(s){return(e,t)=>typeof t=="object"?Be(s,e,t):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function X(s){return b({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const je=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z(s,e){return(t,i,r)=>{const o=n=>{var h;return((h=n.renderRoot)==null?void 0:h.querySelector(s))??null};return je(t,i,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe={ATTRIBUTE:1},Ve=s=>(...e)=>({_$litDirective$:s,values:e});class We{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=Ve(class extends We{constructor(s){var e;if(super(s),s.type!==qe.ATTRIBUTE||s.name!=="class"||((e=s.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){var i,r;if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((i=this.nt)!=null&&i.has(o))&&this.st.add(o);return this.render(e)}const t=s.element.classList;for(const o of this.st)o in e||(t.remove(o),this.st.delete(o));for(const o in e){const n=!!e[o];n===this.st.has(o)||(r=this.nt)!=null&&r.has(o)||(n?(t.add(o),this.st.add(o)):(t.remove(o),this.st.delete(o)))}return E}});var Je=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,f=(s,e,t,i)=>{for(var r=i>1?void 0:i?Ke(e,t):e,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(e,t,r):n(r))||r);return i&&r&&Je(e,t,r),r};let p=class extends T{constructor(){super(...arguments),this.value="",this.placeholder="",this.loading=!1,this.disabled=!1,this.theme="auto",this.results=[],this._categories=[{value:"all",label:"All"},{value:"account",label:"Accounts"},{value:"customer",label:"Customers"},{value:"transaction",label:"Transactions"}],this._category="all",this._open=!1,this._focusedIndex=-1,this._debounceTimer=0,this._onDocPointerDown=s=>{s.composedPath().includes(this)||(this._open=!1,this._focusedIndex=-1)},this._reposition=()=>{this._open&&this._positionDropdown()}}get categories(){return this._categories}set categories(s){this._categories=s,s.length>0&&!s.some(e=>e.value===this._category)&&(this._category=s[0].value),this.requestUpdate("categories")}_positionDropdown(){if(!this._dropdown||!this._wrapper)return;const s=this._wrapper.getBoundingClientRect(),e=window.innerHeight-s.bottom;this._dropdown.style.left=`${s.left}px`,this._dropdown.style.width=`${s.width}px`,e<200&&s.top>e?(this._dropdown.style.bottom=`${window.innerHeight-s.top+6}px`,this._dropdown.style.top="auto"):(this._dropdown.style.top=`${s.bottom+6}px`,this._dropdown.style.bottom="auto")}connectedCallback(){super.connectedCallback(),document.addEventListener("pointerdown",this._onDocPointerDown),window.addEventListener("resize",this._reposition),window.addEventListener("scroll",this._reposition,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pointerdown",this._onDocPointerDown),window.removeEventListener("resize",this._reposition),window.removeEventListener("scroll",this._reposition,!0)}updated(s){s.has("_open")&&this._open&&this._positionDropdown()}get _placeholder(){if(this.placeholder)return this.placeholder;const s=this.categories.slice(1).map(e=>e.label.toLowerCase());return s.length?`Search ${s.join(", ")}…`:"Search…"}get _filteredResults(){var e;const s=(e=this.categories[0])==null?void 0:e.value;return this._category===s?this.results:this.results.filter(t=>t.category===this._category)}_onInput(s){this.value=s.target.value,this._focusedIndex=-1,clearTimeout(this._debounceTimer),this.value.trim()?(this._open=!0,this._debounceTimer=window.setTimeout(()=>{this._dispatch("smart-search",{query:this.value.trim(),category:this._category})},300)):(this._open=!1,this.results=[])}_onKeyDown(s){var t;const e=this._filteredResults;switch(s.key){case"ArrowDown":if(s.preventDefault(),!this._open&&this.value.trim()){this._open=!0;return}this._focusedIndex=Math.min(this._focusedIndex+1,e.length-1);break;case"ArrowUp":s.preventDefault(),this._focusedIndex=Math.max(this._focusedIndex-1,-1);break;case"Enter":this._focusedIndex>=0&&e[this._focusedIndex]?this._selectResult(e[this._focusedIndex]):this._dispatch("smart-search",{query:this.value.trim(),category:this._category});break;case"Escape":this._open=!1,this._focusedIndex=-1,(t=this._input)==null||t.blur();break;case"Tab":this._open=!1,this._focusedIndex=-1;break}}_selectResult(s){this._dispatch("smart-search-select",{result:s}),this._open=!1,this._focusedIndex=-1}_clear(){var s;this.value="",this.results=[],this._open=!1,this._focusedIndex=-1,(s=this._input)==null||s.focus(),this._dispatch("smart-search-clear")}_setCategory(s){this._category=s,this._focusedIndex=-1,this.value.trim()&&this._dispatch("smart-search",{query:this.value.trim(),category:s})}_dispatch(s,e){this.dispatchEvent(new CustomEvent(s,{detail:e,bubbles:!0,composed:!0}))}_highlight(s){const e=this.value.trim();if(!e)return g`${s}`;const t=s.toLowerCase(),i=e.toLowerCase(),r=t.indexOf(i);return r===-1?g`${s}`:g`
      ${s.slice(0,r)}
      <mark>${s.slice(r,r+e.length)}</mark>
      ${s.slice(r+e.length)}
    `}render(){const s=this._filteredResults[this._focusedIndex],e=this._filteredResults;return g`
      <div class="wrapper">

        <!-- Live region for screen readers -->
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          ${this._open&&!this.loading?`${e.length} result${e.length!==1?"s":""} found`:""}
        </div>

        <!-- Search bar -->
        <div class=${le({"search-bar":!0,disabled:this.disabled})}>
          <span class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>

          <input
            type="search"
            role="combobox"
            autocomplete="off"
            spellcheck="false"
            .value=${this.value}
            placeholder=${this._placeholder}
            ?disabled=${this.disabled}
            aria-label="Search banking information"
            aria-autocomplete="list"
            aria-expanded=${this._open?"true":"false"}
            aria-controls="search-listbox"
            aria-activedescendant=${s?`result-${s.id}`:l}
            @input=${this._onInput}
            @keydown=${this._onKeyDown}
            @focus=${()=>{this.value.trim()&&(this._open=!0)}}
          />

          ${this.value?g`
            <button class="clear-btn" aria-label="Clear search" @click=${this._clear}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>`:l}
        </div>

        <!-- Category filter chips -->
        <div class="category-bar" role="tablist" aria-label="Filter by category">
          ${this.categories.map(t=>g`
            <button
              class=${le({chip:!0,active:this._category===t.value})}
              role="tab"
              aria-selected=${this._category===t.value?"true":"false"}
              @click=${()=>this._setCategory(t.value)}
            >${t.label}</button>
          `)}
        </div>

        <!-- Results dropdown -->
        ${this._open?g`
          <div
            id="search-listbox"
            class="dropdown"
            role="listbox"
            aria-label="Search results"
          >
            ${this.loading?g`<div class="loading-row"><div class="spinner"></div> Searching…</div>`:e.length===0?g`<div class="no-results">No results for "<strong>${this.value}</strong>"</div>`:e.map((t,i)=>g`
                  <div
                    id="result-${t.id}"
                    class="result-item"
                    role="option"
                    aria-selected=${this._focusedIndex===i?"true":"false"}
                    @click=${()=>this._selectResult(t)}
                    @mouseenter=${()=>{this._focusedIndex=i}}
                  >
                    <div class="result-text">
                      <div class="result-title">${this._highlight(t.title)}</div>
                      ${t.subtitle?g`<div class="result-subtitle">${this._highlight(t.subtitle)}</div>`:l}
                    </div>
                    ${t.meta?g`<div class="result-meta">${t.meta}</div>`:l}
                  </div>
                `)}
          </div>`:l}

      </div>
    `}};p.styles=be`
    /* ── Light theme (default) ── */
    :host {
      display: block;

      /*
       * ── Branding tokens ──────────────────────────────────────────────────────
       * Override any of these from outside to apply custom branding:
       *
       *   smart-search {
       *     --search-font-family: 'Inter', sans-serif;
       *     --search-font-size:   15px;
       *     --search-primary:     #e63946;
       *     --search-radius:      4px;
       *   }
       *
       * Or inline:
       *   <smart-search style="--search-primary:#e63946;">
       * ─────────────────────────────────────────────────────────────────────── */
      --search-font-family:  -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --search-font-size:    14px;
      --search-primary:      #0057b8;
      --search-border:       #9ca3af;
      --search-border-focus: #0057b8;
      --search-bg:           #ffffff;
      --search-bg-hover:     #f3f4f6;
      --search-text:         #111827;
      --search-text-muted:   #6b7280;
      --search-radius:       8px;
      --search-shadow:       0 4px 12px rgba(0, 0, 0, 0.10);
      --search-chip-bg:      #e0edff;
      --search-chip-color:   #0057b8;

      font-family: var(--search-font-family);
      font-size:   var(--search-font-size);
    }

    /* ── Dark theme (explicit) ── */
    :host([theme="dark"]) {
      --search-primary:      #4d9eff;
      --search-border:       #374151;
      --search-border-focus: #4d9eff;
      --search-bg:           #1e293b;
      --search-bg-hover:     #273549;
      --search-text:         #f1f5f9;
      --search-text-muted:   #94a3b8;
      --search-shadow:       0 4px 12px rgba(0, 0, 0, 0.40);
      --search-chip-bg:      #1e3a5f;
      --search-chip-color:   #4d9eff;
    }

    /* ── Auto: follow OS preference when theme="auto" or unset ── */
    @media (prefers-color-scheme: dark) {
      :host(:not([theme="light"])) {
        --search-primary:      #4d9eff;
        --search-border:       #374151;
        --search-border-focus: #4d9eff;
        --search-bg:           #1e293b;
        --search-bg-hover:     #273549;
        --search-text:         #f1f5f9;
        --search-text-muted:   #94a3b8;
        --search-shadow:       0 4px 12px rgba(0, 0, 0, 0.40);
        --search-chip-bg:      #1e3a5f;
        --search-chip-color:   #4d9eff;
      }
    }

    .wrapper {
      position: relative;
      width: 100%;
    }

    /* ── Search bar ──────────────────────────────────────── */
    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 12px;
      border: 1.5px solid var(--search-border);
      border-radius: var(--search-radius);
      background: var(--search-bg);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .search-bar:focus-within {
      border-color: var(--search-border-focus);
      box-shadow: 0 0 0 3px rgba(0, 87, 184, 0.15);
    }

    .search-bar.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .icon {
      flex-shrink: 0;
      color: var(--search-text-muted);
      display: flex;
      align-items: center;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: var(--search-font-family);
      font-size: var(--search-font-size);
      color: var(--search-text);
      padding: 12px 0;
      min-width: 0;
      min-height: 44px;
    }

    input::placeholder { color: var(--search-text-muted); }
    input[type="search"]::-webkit-search-cancel-button { display: none; }

    .clear-btn {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--search-text-muted);
      padding: 4px;
      min-width: 44px;
      min-height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s;
    }
    .clear-btn:hover {
      background: var(--search-bg-hover);
      color: var(--search-text);
    }

    /* ── Category chips ──────────────────────────────────── */
    .category-bar {
      display: flex;
      gap: 6px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .chip {
      padding: 4px 12px;
      min-height: 44px;
      border-radius: 999px;
      font-size: calc(var(--search-font-size) - 1px);
      border: 1.5px solid var(--search-border);
      background: var(--search-bg);
      color: var(--search-text-muted);
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .chip:hover { border-color: var(--search-border-focus); color: var(--search-primary); }
    .chip.active {
      background: var(--search-chip-bg);
      border-color: var(--search-primary);
      color: var(--search-chip-color);
      font-weight: 600;
    }

    /* ── Results dropdown ────────────────────────────────── */
    .dropdown {
      position: fixed;
      background: var(--search-bg, #ffffff);
      border: 1.5px solid var(--search-border);
      border-radius: var(--search-radius);
      box-shadow: var(--search-shadow);
      z-index: 9999;
      max-height: 320px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    /* ── Result items ────────────────────────────────────── */
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      cursor: pointer;
      transition: background 0.12s;
    }
    .result-item:hover,
    .result-item[aria-selected="true"] { background: var(--search-bg-hover); }

    .result-text { flex: 1; min-width: 0; }

    .result-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--search-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .result-subtitle {
      font-size: 12px;
      color: var(--search-text-muted);
      margin-top: 2px;
    }

    .result-meta {
      font-size: 12px;
      color: var(--search-text-muted);
      flex-shrink: 0;
    }

    mark {
      background: rgba(0, 87, 184, 0.12);
      color: var(--search-primary);
      border-radius: 2px;
      padding: 0 1px;
      font-weight: 600;
    }

    .no-results {
      padding: 20px 14px;
      text-align: center;
      color: var(--search-text-muted);
      font-size: 14px;
    }

    .loading-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 18px;
      color: var(--search-text-muted);
      font-size: 14px;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--search-border);
      border-top-color: var(--search-primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    .sr-only {
      position: absolute;
      width: 1px; height: 1px;
      padding: 0; margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;f([b({type:String,reflect:!0})],p.prototype,"value",2);f([b({type:String})],p.prototype,"placeholder",2);f([b({type:Boolean,reflect:!0})],p.prototype,"loading",2);f([b({type:Boolean,reflect:!0})],p.prototype,"disabled",2);f([b({type:String,reflect:!0})],p.prototype,"theme",2);f([b({type:Array})],p.prototype,"results",2);f([b({type:Array})],p.prototype,"categories",1);f([X()],p.prototype,"_category",2);f([X()],p.prototype,"_open",2);f([X()],p.prototype,"_focusedIndex",2);f([Z("input")],p.prototype,"_input",2);f([Z(".wrapper")],p.prototype,"_wrapper",2);f([Z(".dropdown")],p.prototype,"_dropdown",2);p=f([He("smart-search")],p);const Fe=[{id:"1",category:"account",title:"Checking — ****4821",subtitle:"John Doe",meta:"$12,430.00"},{id:"2",category:"account",title:"Savings — ****9034",subtitle:"John Doe",meta:"$5,200.00"},{id:"3",category:"account",title:"Business — ****2201",subtitle:"Doe Enterprises LLC",meta:"$98,000.00"},{id:"4",category:"customer",title:"Jane Smith",subtitle:"Customer ID: C-00291",meta:""},{id:"5",category:"customer",title:"John Doe",subtitle:"Customer ID: C-00143",meta:""},{id:"6",category:"transaction",title:"Wire Transfer #TXN-8821",subtitle:"To: Jane Smith · Mar 20, 2026",meta:"-$500.00"},{id:"7",category:"transaction",title:"Direct Deposit #TXN-7741",subtitle:"From: ACME Corp · Mar 15, 2026",meta:"+$3,200.00"},{id:"8",category:"transaction",title:"Card Purchase #TXN-6612",subtitle:"Amazon · Mar 12, 2026",meta:"-$89.99"}];function Q(s){s.addEventListener("smart-search",e=>{const{query:t,category:i}=e.detail;s.loading=!0,setTimeout(()=>{const r=t.toLowerCase(),o=Fe.filter(n=>(i===s.categories[0].value||n.category===i)&&(n.title.toLowerCase().includes(r)||n.subtitle.toLowerCase().includes(r)));s.loading=!1,s.results=o},600)})}const me=document.getElementById("searchDefault");Q(me);const G=document.getElementById("searchCustom");G.categories=[{value:"all",label:"All"},{value:"account",label:"Account Name"},{value:"customer",label:"Customer"}];Q(G);const $e=document.getElementById("searchBranded");Q($e);window.setTheme=function(s){document.getElementById("btnLight").classList.toggle("active",s==="light"),document.getElementById("btnDark").classList.toggle("active",s==="dark"),document.getElementById("btnAuto").classList.toggle("active",s==="auto"),document.body.classList.toggle("dark",s==="dark"),me.theme=s,G.theme=s,$e.theme=s};
