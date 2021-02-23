// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 0.0.1.
// Apache License Version 2.0


var InputField=(()=>{var K=Object.defineProperty;var Q=(e,t)=>{for(var n in t)K(e,n,{get:t[n],enumerable:!0})};var Be={};Q(Be,{define:()=>z});var U=Object.defineProperty,g=(e,t)=>{for(var n in t)U(e,n,{get:t[n],enumerable:!0})},l={};g(l,{add:()=>te,all:()=>k,classPresentIf:()=>ie,createElement:()=>ee,createElements:()=>R,first:()=>Y,getAttributes:()=>Z,id:()=>X,removeElements:()=>re,setContent:()=>ne,tag:()=>A});var h={};g(h,{equals:()=>q,forEachEntry:()=>v,has:()=>ae,isDate:()=>b,isFunction:()=>ue,isNil:()=>oe,isString:()=>p});function oe(e){return e==null}function p(e){return y(e,"String")}function ue(e){return y(e,"Function")}function b(e){return y(e,"Date")}function y(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function v(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((n,r)=>{t(r,n)});return}Object.entries(e).forEach(n=>t(n[0],n[1]))}}function ae(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function q(e,t){return e===t?!0:e===void 0||t===void 0?!1:le(e,t)}function le(e,t){return O(e)||O(t)?e===t:se(e,t)}var fe=new Set(["boolean","number","bigint","string","symbol"]);function O(e){return fe.has(typeof e)}function se(e,t){return ce(e,t)?de(e,t)?!0:me(e,t):!1}function ce(e,t){return L(e)===L(t)}function L(e){return Object.prototype.toString.call(e)}function de(e,t){return b(e)&&b(t)?e.getTime()===t.getTime():!1}function me(e,t){let n=Object.keys(e);return n.length!==Object.keys(t).length?!1:n.every(r=>q(e[r],t[r]))}function X(e,t=document){return w(t)&&(t=t.shadowRoot),t.getElementById(e)}function k(e,t=document){return w(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function Y(e,t=document){if(w(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let n=e.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(t=ge(r,t),t===null)break;return t}function ge(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function w(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function Z(e){let t={},n=e.attributes;if(!n||n.length===0)return t;for(let r=0;r<n.length;r++){let i=n[r];t[i.name]=i.value}return t}function R(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function ee(e,t={},n=""){let r=A(e,t,n),i=R(r);return i.length===0?null:i[0]}function A(e,t={},n=""){if(!e)return"";let r=he(t);return`<${e}${r}>${n}</${e}>`}function he(e){let t=[];return v(e,(r,i)=>{t.push(`${r}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var pe=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function te(e,t,n="beforeend"){return n=n.toLowerCase(),pe.has(n)?(p(t)?e.insertAdjacentHTML(n,t):be(e,t,n),!0):!1}function be(e,t,n){Array.isArray(t)?t.forEach(r=>e.insertAdjacentElement(n,r)):e.insertAdjacentElement(n,t)}function ne(e,...t){e.innerHTML="",e.append(...t)}function re(e,t=document){k(e,t).forEach(r=>{r.parentNode.removeChild(r)})}function ie(e,t,n){let r=n?"add":"remove";e.classList[r](t)}var f={};g(f,{endsWith:()=>T,indexOf:()=>E,indexOfFirstMatch:()=>ve,indexOfLastMatch:()=>ye,isEmpty:()=>M,removePrefix:()=>N,removeSuffix:()=>P,removeSurrounding:()=>we,replaceTemplate:()=>$e,startsWith:()=>C,substringAfter:()=>Ee,substringBefore:()=>xe,trim:()=>Se});function E(e,t,n=0,r=!1){return e?r?e.toLowerCase().indexOf(t.toLowerCase(),n):e.indexOf(t,n):-1}function ve(e,t){return!t||!e?-1:e.split("").findIndex(t)}function ye(e,t){if(!t||!e)return-1;let n=e.split("");for(let r=n.length;r>=0;--r)if(t(n[r],r))return r;return-1}function C(e="",t=void 0,n=!1){if(n){let r=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===r}return e.startsWith(t)}function T(e,t,n=!1){return n?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function N(e,t,n=!1){return C(e,t,n)&&(e=e.substring(t.length)),e}function P(e,t,n=!1){return T(e,t,n)&&(e=e.substring(0,e.length-t.length)),e}function we(e,t,n,r=!1){return P(N(e,t,r),n,r)}function Ee(e,t,n=!1){if(!t)return e;let r=E(e,t,0,n);return r<0?"":e.substring(r+t.length)}function xe(e,t,n=!1){if(!t)return"";let r=E(e,t,0,n);return r<0?e:e.substring(0,r)}function Se(e){return M(e)?"":(p(e)||(e=String(e)),e.trim(e))}function M(e){return e==null||e===""}function $e(e="",t={},n="${",r="}"){return v(t,(i,o)=>{o!==void 0&&(i=n+i+r,e=e.replaceAll(i,o))}),e}function x({obj:e,prop:t,sel:n,attr:r,root:i,onChange:o}){Re(t),e=e||{};let u=e.hasOwnProperty(t)?e[t]:void 0;i=i||document;let a={};return Object.defineProperty(e,t,{get:()=>H({prop:t,sel:n,attr:r,root:i,objNotBound:a}),set:J=>ke({prop:t,value:J,root:i,sel:n,attr:r,objNotBound:a,onChange:o}),configurable:!0,enumerable:!0}),u!==void 0&&(console.info(`Property '${t}' already exists in object. Will override previous definition but retain old value of ${u}.`),e[t]=u),e}var d=e=>e.type==="checkbox",m=e=>e.type==="radio",j=e=>e.tagName.toLowerCase()==="select",D=e=>"value"in e,V=e=>new Set(Array.isArray(e)?e:[e]);function ke({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:o,onChange:u}){if(Ae({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:o,onChange:u}),r){qe(n,r,t,i);return}o[e]=t}function Ae({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:o,onChange:u}){if(!u)return;let a=H({prop:e,root:n,sel:r,attr:i,objNotBound:o});a!==t&&u(a,t)}function H({prop:e,root:t,sel:n,attr:r,objNotBound:i}){return n?Oe(t,n,r):i[e]}function Oe(e,t,n){let r=W(e,t);if(r.length===0)return null;let i=r[0];return n?i.getAttribute(n):D(i)?d(i)?r.filter(o=>d(o)&&o.checked).map(o=>o.value==="on"?o.name:o.value):j(i)?[...i.querySelectorAll("option")].filter(u=>u.selected).map(u=>u.value):(m(i)&&(i=r.filter(m).find(o=>o.checked)),i.value):i.innerHTML}function qe(e,t,n,r){let i=W(e,t);if(i.length===0)return;let o=i[0];if(d(o)){let u=V(n);i.filter(d).forEach(a=>a.checked=u.has(a.value)||u.has(a.name));return}if(j(o)){let u=V(n);o.querySelectorAll("option").forEach(a=>a.selected=u.has(a.value));return}if(m(o)){i.filter(m).forEach(u=>u.checked=u.value===n);return}i.forEach(u=>Le(u,n,r))}function Le(e,t,n){n?e.setAttribute(n,t):D(e)?e.value=t:e.innerHTML=t}function W(e,t){let n=e.querySelectorAll(t);return n.length===0&&console.warn(`No elements found matching selector ${t}`),[...n]}function Re(e){if(typeof e!="string"||e.length===0)throw"'prop' argument must be a String defining the name a property."}function F({nameWithDash:e,html:t,css:n,display:r,propertyList:i,actionList:o,eventHandlerList:u}){if(customElements.get(e))return!1;let a=class extends HTMLElement{constructor(){super();Pe(this,t,n,r),this.properties=Ce(this,i),this.actions=Te(this,o),Ne(this,u)}};return customElements.define(e,a),!0}function Ce(e,t){let n={};return He(t)&&t.forEach(r=>Me(n,r,e)),n}function Me(e,t,n){let r=je(t,n);x({obj:e,prop:t.name,sel:t.sel,attr:t.attr,root:n.shadowRoot,onChange:r}),e[t.name]=t.value}function je(e,t){if(!!e.onChange)return(n,r)=>e.onChange(t,n,r)}function He(e){if(!e)return!1;if(!Array.isArray(e))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function Te(e,t){let n={};return t&&t.forEach(r=>{r.name&&r.action&&(n[r.name]=r.action.bind(e))}),n}function Ne(e,t){if(!!t){if(!Array.isArray(t))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";t.forEach(n=>{l.all(n.sel,e.shadowRoot).forEach(i=>{i.addEventListener(n.eventName,o=>{n.listener(o,e)})})})}}function Pe(e,t,n,r){t=De(e,t);let i=e.attachShadow({mode:"open"}),o=l.createElements(Ve(n,r)+t);i.append(...o)}function De(e,t){return h.isFunction(t)?t(e):t}function Ve(e,t){return Fe(t)+We(e)}function We(e){return e=f.trim(e),e.length===0?"":(f.startsWith(e,"<style>",!1)||(e=l.tag("style",{},e)),e)}function Fe(e){return e=f.trim(e),e.length===0?"":`
  <style>
    :host { display: ${e};}
    :host([hidden]) {display: none;}
  </style>
  `}var S=class{constructor(){this.rules=[]}add(t){return!t||Ie(this.rules,t.name)?!1:(this.rules.push(t),!0)}addRule(t,n,r){return this.add(new c(t,n,r))}validate(t,n){this.rules.forEach(r=>{let i=r.isValid(t);n(i,r.name)})}};function Ie(e,t){return!!e.find(r=>r.name===t)}var c=class{constructor(t,n,r){this.name=t,this.message=n,this.validator=r}isValid(t){return this.validator(t)}},_e={required:()=>{let e=t=>!!t;return new c("required","Required Field",e)},minlength:e=>{let t=r=>(r?r.length:0)>=e,n="Minimum Length is "+e;return new c("minlength",n,t)},pattern:e=>{let t=r=>new RegExp(e).test(r),n="Must satisfy the pattern "+e;return new c("pattern",n,t)},min:e=>{e=Number(e)||0;let t=r=>(r=Number(r)||0,r>=e),n="Minimum value of "+e;return new c("min",n,t)},max:e=>{e=Number(e)||0;let t=r=>(r=Number(r)||0,r<=e),n="Maximum value of "+e;return new c("max",n,t)}};function I(e,t){if(!t)return!1;let n=_e[e];return n?n(t):!1}var _='<!--<link rel="stylesheet" href="assets/css/input-field.css">-->\n\n<div class="input-field">\n  <label class="label ${required}" ${style-label}>${label}</label>\n  <input type="${type}" class="input" ${style-input}\n         ${required} ${minlength} ${maxlength} ${pattern} ${min} ${max}>\n  <footer>\n    <ul class="rules">${rules}</ul>\n  </footer>\n</div>\n';var B=`/* This file uses vars defined in moose-vars.css */

.input-field {
  --width-label: 10em;
  --width-input: calc(100% - var(--width-label) - 4em);
  --footer-padding-left: calc(var(--width-label) + 1em);
  --footer-font-size: 0.9em;
  --required-marker: " *";

  --color-normal: green;
  --color-dark: darkgreen;
  --color-light: lightgreen;
  --color-bad: red;
  --input-color: DarkSlateGray;
  --input-background-image-focus: linear-gradient(to right, var(--color-light), white);
  --input-background-color-bad: LavenderBlush;
  --input-border-color-bad: var(--color-bad);
  --input-background-image-bad: linear-gradient(to right, var(--input-background-color-bad), white);
  --input-background-image-focus-bad: linear-gradient(to right, var(--input-background-color-bad), var(--color-light), white);
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

  background-color: white;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  height: 1.5em;
  padding: 0.5em 0.7em;
  font-size: 1rem;

  color: var(--input-color, dimgray)
}

.input-field input:focus {
  background-image: var(--input-background-image-focus)
}

.input-field input.bad {
  border-color: var(--input-border-color-bad, red);
  background-image: var(--input-background-image-bad);
}


.input-field input.bad:focus {
  border-color: var(--input-border-color-bad, red);
  background-image: var(--input-background-image-focus-bad);
  outline: none;
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
}`;function z(){let e;F({nameWithDash:"input-field",css:B,html:t=>{let n=l.getAttributes(t);return e=Ge(n),Je(n,e)},propertyList:[{name:"value",value:"",sel:"input",attr:"value"}],eventHandlerList:[{sel:"input",eventName:"input",listener:(t,n)=>{let r=t.target.value;Ke(n,r,e)}}],actionList:[{name:"addRule",action:function(t,n,r){t=Qe(t),!!e.addRule(t,n,r)&&ze(this,t,n)}}]})}function ze(e,t,n){let r=G(t,n),i=l.first("footer ul.rules",e);l.add(i,r)}function Ge(e){let t=["required","minlength","pattern","min","max"],n=new S;return t.map(i=>I(i,e[i])).forEach(i=>n.add(i)),n}function Je(e,t){let n={label:e.label,type:e.type||"text","style-label":s(e,"style-label","style"),"style-input":s(e,"style-input","style"),required:s(e,"required"),minlength:s(e,"minlength"),maxlength:s(e,"maxlength"),pattern:s(e,"pattern"),min:s(e,"min"),max:s(e,"max"),rules:Ue(t)};return f.replaceTemplate(_,n)}function Ue(e){return e.rules.map(t=>G(t.name,t.message)).join("")}function G(e,t){return`<li class="validation-${e}">${t}</li>
`}function s(e,t,n=t){let r=e[t];return r==="required"?r:r?` ${n}="${r}"`:""}function Ke(e,t,n){let r=l.first("footer ul.rules",e),i=!0;n.validate(t,(u,a)=>{let $=l.first(`li.validation-${a}`,r);l.classPresentIf($,"bad",!u),i=i&&u});let o=l.first("input",e);l.classPresentIf(o,"bad",!i)}function Qe(e=""){return e.replace(/[ \\.]/g,"-")}return Be;})();
