// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 0.0.1.
// Apache License Version 2.0


var InputField=(()=>{var G=Object.defineProperty;var J=(e,t)=>{for(var r in t)G(e,r,{get:t[r],enumerable:!0})};var _e={};J(_e,{define:()=>z});var K=Object.defineProperty,p=(e,t)=>{for(var r in t)K(e,r,{get:t[r],enumerable:!0})},l={};p(l,{add:()=>Z,all:()=>$,classPresentIf:()=>re,createElement:()=>Y,createElements:()=>O,first:()=>U,getAttributes:()=>X,id:()=>Q,removeElements:()=>te,setContent:()=>ee,tag:()=>L});var c={};p(c,{equals:()=>q,forEachEntry:()=>y,has:()=>oe,isDate:()=>v,isFunction:()=>ie,isNil:()=>ne,isString:()=>b});function ne(e){return e==null}function b(e){return w(e,"String")}function ie(e){return w(e,"Function")}function v(e){return w(e,"Date")}function w(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function y(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((r,n)=>{t(n,r)});return}Object.entries(e).forEach(r=>t(r[0],r[1]))}}function oe(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function q(e,t){return e===t?!0:e===void 0||t===void 0?!1:ue(e,t)}function ue(e,t){return k(e)||k(t)?e===t:ae(e,t)}var le=new Set(["boolean","number","bigint","string","symbol"]);function k(e){return le.has(typeof e)}function ae(e,t){return se(e,t)?fe(e,t)?!0:ce(e,t):!1}function se(e,t){return C(e)===C(t)}function C(e){return Object.prototype.toString.call(e)}function fe(e,t){return v(e)&&v(t)?e.getTime()===t.getTime():!1}function ce(e,t){let r=Object.keys(e);return r.length!==Object.keys(t).length?!1:r.every(n=>q(e[n],t[n]))}function Q(e,t=document){return E(t)&&(t=t.shadowRoot),t.getElementById(e)}function $(e,t=document){return E(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function U(e,t=document){if(E(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let r=e.split("/").map(n=>n.trim()).filter(n=>n.length>0);for(let n of r)if(t=de(n,t),t===null)break;return t}function de(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function E(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function X(e){let t={},r=e.attributes;if(!r||r.length===0)return t;for(let n=0;n<r.length;n++){let i=r[n];t[i.name]=i.value}return t}function O(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function Y(e,t={},r=""){let n=L(e,t,r),i=O(n);return i.length===0?null:i[0]}function L(e,t={},r=""){if(!e)return"";let n=me(t);return`<${e}${n}>${r}</${e}>`}function me(e){let t=[];return y(e,(n,i)=>{t.push(`${n}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var he=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function Z(e,t,r="beforeend"){return r=r.toLowerCase(),he.has(r)?(b(t)?e.insertAdjacentHTML(r,t):ge(e,t,r),!0):!1}function ge(e,t,r){Array.isArray(t)?t.forEach(n=>e.insertAdjacentElement(r,n)):e.insertAdjacentElement(r,t)}function ee(e,...t){e.innerHTML="",e.append(...t)}function te(e,t=document){$(e,t).forEach(n=>{n.parentNode.removeChild(n)})}function re(e,t,r){let n=r?"add":"remove";e.classList[n](t)}var f={};p(f,{endsWith:()=>H,indexOf:()=>x,indexOfFirstMatch:()=>pe,indexOfLastMatch:()=>be,isEmpty:()=>P,removePrefix:()=>R,removeSuffix:()=>j,removeSurrounding:()=>ve,replaceTemplate:()=>xe,startsWith:()=>T,substringAfter:()=>ye,substringBefore:()=>we,trim:()=>Ee});function x(e,t,r=0,n=!1){return e?n?e.toLowerCase().indexOf(t.toLowerCase(),r):e.indexOf(t,r):-1}function pe(e,t){return!t||!e?-1:e.split("").findIndex(t)}function be(e,t){if(!t||!e)return-1;let r=e.split("");for(let n=r.length;n>=0;--n)if(t(r[n],n))return n;return-1}function T(e="",t=void 0,r=!1){if(r){let n=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===n}return e.startsWith(t)}function H(e,t,r=!1){return r?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function R(e,t,r=!1){return T(e,t,r)&&(e=e.substring(t.length)),e}function j(e,t,r=!1){return H(e,t,r)&&(e=e.substring(0,e.length-t.length)),e}function ve(e,t,r,n=!1){return j(R(e,t,n),r,n)}function ye(e,t,r=!1){if(!t)return e;let n=x(e,t,0,r);return n<0?"":e.substring(n+t.length)}function we(e,t,r=!1){if(!t)return"";let n=x(e,t,0,r);return n<0?e:e.substring(0,n)}function Ee(e){return P(e)?"":(b(e)||(e=String(e)),e.trim(e))}function P(e){return e==null||e===""}function xe(e="",t={},r="${",n="}"){return y(t,(i,o)=>{o!==void 0&&(i=r+i+n,e=e.replaceAll(i,o))}),e}function S({obj:e,prop:t,sel:r,attr:n,root:i,onChange:o}){Ae(t),e=e||{};let u=e.hasOwnProperty(t)?e[t]:void 0;i=i||document;let a={};return Object.defineProperty(e,t,{get:()=>M({prop:t,sel:r,attr:n,root:i,objNotBound:a}),set:B=>Se({prop:t,value:B,root:i,sel:r,attr:n,objNotBound:a,onChange:o}),configurable:!0,enumerable:!0}),u!==void 0&&(console.info(`Property '${t}' already exists in object. Will override previous definition but retain old value of ${u}.`),e[t]=u),e}var h=e=>e.type==="checkbox",g=e=>e.type==="radio",N=e=>e.tagName.toLowerCase()==="select",D=e=>"value"in e,W=e=>new Set(Array.isArray(e)?e:[e]);function Se({prop:e,value:t,root:r,sel:n,attr:i,objNotBound:o,onChange:u}){if($e({prop:e,value:t,root:r,sel:n,attr:i,objNotBound:o,onChange:u}),n){Oe(r,n,t,i);return}o[e]=t}function $e({prop:e,value:t,root:r,sel:n,attr:i,objNotBound:o,onChange:u}){if(!u)return;let a=M({prop:e,root:r,sel:n,attr:i,objNotBound:o});a!==t&&u(a,t)}function M({prop:e,root:t,sel:r,attr:n,objNotBound:i}){return r?Le(t,r,n):i[e]}function Le(e,t,r){let n=F(e,t);if(n.length===0)return null;let i=n[0];return r?i.getAttribute(r):D(i)?h(i)?n.filter(o=>h(o)&&o.checked).map(o=>o.value==="on"?o.name:o.value):N(i)?[...i.querySelectorAll("option")].filter(u=>u.selected).map(u=>u.value):(g(i)&&(i=n.filter(g).find(o=>o.checked)),i.value):i.innerHTML}function Oe(e,t,r,n){let i=F(e,t);if(i.length===0)return;let o=i[0];if(h(o)){let u=W(r);i.filter(h).forEach(a=>a.checked=u.has(a.value)||u.has(a.name));return}if(N(o)){let u=W(r);o.querySelectorAll("option").forEach(a=>a.selected=u.has(a.value));return}if(g(o)){i.filter(g).forEach(u=>u.checked=u.value===r);return}i.forEach(u=>qe(u,r,n))}function qe(e,t,r){r?e.setAttribute(r,t):D(e)?e.value=t:e.innerHTML=t}function F(e,t){let r=e.querySelectorAll(t);return r.length===0&&console.warn(`No elements found matching selector ${t}`),[...r]}function Ae(e){if(typeof e!="string"||e.length===0)throw"'prop' argument must be a String defining the name a property."}function _({nameWithDash:e,html:t,css:r,display:n,propertyList:i,actionList:o,eventHandlerList:u}){if(customElements.get(e))return!1;let a=class extends HTMLElement{constructor(){super();He(this,t,r,n),this.properties=ke(this,i),this.actions=Ce(this,o),Te(this,u)}};return customElements.define(e,a),!0}function ke(e,t){let r={};return je(t)&&t.forEach(n=>Re(r,n,e)),r}function Re(e,t,r){let n=Pe(t,r);S({obj:e,prop:t.name,sel:t.sel,attr:t.attr,root:r.shadowRoot,onChange:n}),e[t.name]=t.value}function Pe(e,t){if(!!e.onChange)return(r,n)=>e.onChange(t,r,n)}function je(e){if(!e)return!1;if(!Array.isArray(e))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function Ce(e,t){let r={};return t&&t.forEach(n=>{n.name&&n.action&&(r[n.name]=n.action.bind(e))}),r}function Te(e,t){if(!!t){if(!Array.isArray(t))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";t.forEach(r=>{l.all(r.sel,e.shadowRoot).forEach(i=>{i.addEventListener(r.eventName,o=>{r.listener(o,e)})})})}}function He(e,t,r,n){t=Me(e,t);let i=e.attachShadow({mode:"open"}),o=l.createElements(Ne(r,n)+t);i.append(...o)}function Me(e,t){return c.isFunction(t)?t(e):t}function Ne(e,t){return We(t)+De(e)}function De(e){return e=f.trim(e),e.length===0?"":(f.startsWith(e,"<style>",!1)||(e=l.tag("style",{},e)),e)}function We(e){return e=f.trim(e),e.length===0?"":`
  <style>
    :host { display: ${e};}
    :host([hidden]) {display: none;}
  </style>
  `}var m=class{constructor(t){this.rules=[],this.add(...t)}add(...t){return t=t.filter(r=>!Fe(this.rules,r.name)),t.length===0?!1:(this.rules.push(...t),t)}validate(t,r){this.rules.forEach(n=>{let i=n.isValid(t);r(i,n.name)})}toHtml(){return this.rules.map(t=>t.toHtml()).join("")}static createFromAttributes(t,r={}){let n=[];return c.forEachEntry(t,(i,o)=>{if(!f.isEmpty(o)&&c.has(s,i)){let u=r[i],a=s[i](o,u);n.push(a)}}),new m(n)}};function Fe(e,t){return!!e.find(n=>n.name===t)}var s=class{constructor(t="",r,n){this.name=t.replace(/[ \\.]/g,"-").toLowerCase(),this.message=r,this.validator=n}isValid(t){return this.validator(t)}toHtml(){return`<li class="validation-${this.name}">${this.message}</li>
`}static createRule(t,r,n,i){return r=r.replaceAll("%v",i),new s(t,r,n)}static required(t,r="Required Field"){let n=i=>!!i;return new s("required",r,n)}static minlength(t,r="Minimum Length is %v"){let n=i=>(i?i.length:0)>=t;return s.createRule("minlength",r,n,t)}static pattern(t,r="Must satisfy the pattern %v"){let n=i=>new RegExp(t).test(i);return s.createRule("pattern",r,n,t)}static min(t,r="Minimum value of %v"){t=Number(t)||0;let n=i=>(i=Number(i)||0,i>=t);return s.createRule("minValue",r,n,t)}static max(t,r="Maximum value of %v"){t=Number(t)||0;let n=i=>(i=Number(i)||0,i<=t);return s.createRule("max",r,n,t)}};var I='<!--<link rel="stylesheet" href="assets/css/input-field.css">-->\n\n<div class="input-field">\n  <label class="label ${required}" ${style-label}>${label}</label>\n  <input type="${type}" class="input" ${style-input}\n         ${required} ${minlength} ${maxlength} ${pattern} ${min} ${max}>\n  <footer>\n    <ul class="rules">${rules}</ul>\n  </footer>\n</div>\n';var V=`.input-field {
  --width-label: 10em;
  --width-input: calc(100% - var(--width-label) - 4em);
  --footer-padding-left: calc(var(--width-label) + 1em);
  --footer-font-size: 0.9em;
  --required-marker: " *";

  --color-normal: green;
  --color-dark: #3c643c;
  --color-verydark: #0f190f;
  --color-light: #e0fde0;
  --color-bad: red;
  --color-bad-light: LavenderBlush;

  --input-border-color: Gainsboro;
  --input-border-color-bad: var(--color-bad);
  --input-background-image-focus: linear-gradient(to right, var(--color-light), white);
  --input-background-image-bad: linear-gradient(to right, var(--color-bad-light), white);
  --input-background-image-focus-bad: linear-gradient(to right, var(--color-bad-light), var(--color-light), white);
}

.input-field label {
  display: inline-block;
  width: var(--width-label);
  text-align: right;
  margin: 0.4em 0.2em 0.1em 0.4em;

  color: var(--color-dark, darkgreen);
  font-weight: bold;
}

.input-field label.required:after {
  content: var(--required-marker);
  color: var(--color-normal);
}


.input-field input {
  width: var(--width-input);
  margin: 0.4em 0.4em 0.1em 0.2em;
  padding: 1em 0.7em;

  background-color: white;
  border-radius: 4px;
  border: 1px solid var(--input-border-color);
  height: 2em;
  font-size: 1em;

  color: var(--color-verydark, dimgray)
}

.input-field input:focus {
  background-image: var(--input-background-image-focus);
  outline-color: var(--color-normal);
}

.input-field input.bad {
  border-color: var(--input-border-color-bad, red);
  background-image: var(--input-background-image-bad);
}


.input-field input.bad:focus {
  border-color: var(--input-border-color-bad, red);
  background-image: var(--input-background-image-focus-bad);
  outline-color: var(--input-border-color-bad);
}

.input-field footer {
  padding-left: var(--footer-padding-left);
  margin-bottom: 1em;
  font-size: var(--footer-font-size);
}

.input-field footer ul {
  margin: 0.5em 0;
}

.input-field footer ul.rules li.bad {
  color: var(--color-bad);
}

@media screen and (max-width: 600px) {
  .input-field label {
    display: block;
    text-align: left;
    margin-bottom: 0.1em;
    margin-left: 1.2em;
  }

  .input-field input {
    margin-top: 0.1em;
    width: 80%;
    margin-left: 1em;
  }

  .input-field footer {
    padding-left: 1em;
  }

  .input-field footer ul {
    padding-left: 2em;
  }
}`;function z(e={}){let t;_({nameWithDash:"input-field",css:V,html:r=>{let n=Ie(r);return t=m.createFromAttributes(n,e),Ve(n,t)},propertyList:[{name:"value",value:"",sel:"input",attr:"value"}],eventHandlerList:[{sel:"input",eventName:"input",listener:(r,n)=>{let i=r.target.value;ze(n,i,t)}}],actionList:[{name:"addRule",action:function(r,n,i){let o=new s(r,n,i);!t.add(o)||Be(this,o)}}]})}function Ie(e){let t=l.getAttributes(e),r={};return c.forEachEntry(t,(n,i)=>{r[n.toLowerCase()]=i}),r}function Ve(e,t){let r={label:e.label,type:e.type||"text","style-label":d(e,"style-label","style"),"style-input":d(e,"style-input","style"),required:d(e,"required"),minlength:d(e,"minlength"),maxlength:d(e,"maxlength"),pattern:d(e,"pattern"),min:d(e,"min"),max:d(e,"max"),rules:t.toHtml()};return f.replaceTemplate(I,r)}function d(e,t,r=t){let n=e[t];return n==="required"?n:n?` ${r}="${n}"`:""}function ze(e,t,r){let n=l.first("footer ul.rules",e),i=!0;r.validate(t,(u,a)=>{let A=l.first(`li.validation-${a}`,n);l.classPresentIf(A,"bad",!u),i=i&&u});let o=l.first("input",e);l.classPresentIf(o,"bad",!i)}function Be(e,t){let r=l.first("footer ul.rules",e);l.add(r,t.toHtml())}return _e;})();
