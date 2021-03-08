// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 0.2.0.
// Apache License Version 2.0


var InputField=(()=>{var z=Object.defineProperty;var G=(e,t)=>{for(var n in t)z(e,n,{get:t[n],enumerable:!0})};var _e={};G(_e,{define:()=>I});var J=Object.defineProperty,p=(e,t)=>{for(var n in t)J(e,n,{get:t[n],enumerable:!0})},l={};p(l,{add:()=>Y,all:()=>A,classPresentIf:()=>te,createElement:()=>X,createElements:()=>$,first:()=>Q,getAttributes:()=>U,id:()=>K,removeElements:()=>ee,setContent:()=>Z,tag:()=>O});var c={};p(c,{equals:()=>C,forEachEntry:()=>b,has:()=>ie,isDate:()=>v,isFunction:()=>re,isNil:()=>ne,isString:()=>y});function ne(e){return e==null}function y(e){return E(e,"String")}function re(e){return E(e,"Function")}function v(e){return E(e,"Date")}function E(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function b(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((n,r)=>{t(r,n)});return}Object.entries(e).forEach(n=>t(n[0],n[1]))}}function ie(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function C(e,t){return e===t?!0:e===void 0||t===void 0?!1:se(e,t)}function se(e,t){return L(e)||L(t)?e===t:ue(e,t)}var oe=new Set(["boolean","number","bigint","string","symbol"]);function L(e){return oe.has(typeof e)}function ue(e,t){return le(e,t)?ae(e,t)?!0:fe(e,t):!1}function le(e,t){return q(e)===q(t)}function q(e){return Object.prototype.toString.call(e)}function ae(e,t){return v(e)&&v(t)?e.getTime()===t.getTime():!1}function fe(e,t){let n=Object.keys(e);return n.length!==Object.keys(t).length?!1:n.every(r=>C(e[r],t[r]))}function K(e,t=document){return w(t)&&(t=t.shadowRoot),t.getElementById(e)}function A(e,t=document){return w(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function Q(e,t=document){if(w(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let n=e.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(t=ce(r,t),t===null)break;return t}function ce(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function w(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function U(e){let t={},n=e.attributes;if(!n||n.length===0)return t;for(let r=0;r<n.length;r++){let i=n[r];t[i.name]=i.value}return t}function $(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function X(e,t={},n=""){let r=O(e,t,n),i=$(r);return i.length===0?null:i[0]}function O(e,t={},n=""){if(!e)return"";let r=de(t);return`<${e}${r}>${n}</${e}>`}function de(e){let t=[];return b(e,(r,i)=>{t.push(`${r}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var me=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function Y(e,t,n="beforeend"){return n=n.toLowerCase(),me.has(n)?(y(t)?e.insertAdjacentHTML(n,t):he(e,t,n),!0):!1}function he(e,t,n){Array.isArray(t)?t.forEach(r=>e.insertAdjacentElement(n,r)):e.insertAdjacentElement(n,t)}function Z(e,...t){e.innerHTML="",e.append(...t)}function ee(e,t=document){A(e,t).forEach(r=>{r.parentNode.removeChild(r)})}function te(e,t,n){if(!e)return;let r=n?"add":"remove";e.classList[r](t)}var a={};p(a,{endsWith:()=>T,indexOf:()=>x,indexOfFirstMatch:()=>ge,indexOfLastMatch:()=>pe,isEmpty:()=>M,removePrefix:()=>H,removeSuffix:()=>j,removeSurrounding:()=>ye,replaceTemplate:()=>we,startsWith:()=>R,substringAfter:()=>ve,substringBefore:()=>be,trim:()=>Ee});function x(e,t,n=0,r=!1){return e?r?e.toLowerCase().indexOf(t.toLowerCase(),n):e.indexOf(t,n):-1}function ge(e,t){return!t||!e?-1:e.split("").findIndex(t)}function pe(e,t){if(!t||!e)return-1;let n=e.split("");for(let r=n.length;r>=0;--r)if(t(n[r],r))return r;return-1}function R(e="",t=void 0,n=!1){if(n){let r=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===r}return e.startsWith(t)}function T(e,t,n=!1){return n?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function H(e,t,n=!1){return R(e,t,n)&&(e=e.substring(t.length)),e}function j(e,t,n=!1){return T(e,t,n)&&(e=e.substring(0,e.length-t.length)),e}function ye(e,t,n,r=!1){return j(H(e,t,r),n,r)}function ve(e,t,n=!1){if(!t)return e;let r=x(e,t,0,n);return r<0?"":e.substring(r+t.length)}function be(e,t,n=!1){if(!t)return"";let r=x(e,t,0,n);return r<0?e:e.substring(0,r)}function Ee(e){return M(e)?"":(y(e)||(e=String(e)),e.trim(e))}function M(e){return e==null||e===""}function we(e="",t={},n="${",r="}"){return b(t,(i,s)=>{s!==void 0&&(i=n+i+r,e=e.replaceAll(i,s))}),e}function S({obj:e,prop:t,sel:n,attr:r,root:i,onChange:s}){Se(t),e=e||{};let u=e.hasOwnProperty(t)?e[t]:void 0;i=i||document;let o={};return Object.defineProperty(e,t,{get:()=>N({prop:t,sel:n,attr:r,root:i,objNotBound:o}),set:B=>xe({prop:t,value:B,root:i,sel:n,attr:r,objNotBound:o,onChange:s}),configurable:!0,enumerable:!0}),u!==void 0&&(console.info(`Property '${t}' already exists in object. Will override previous definition but retain old value of ${u}.`),e[t]=u),e}var h=e=>e.type==="checkbox",g=e=>e.type==="radio",P=e=>e.tagName.toLowerCase()==="select",D=e=>"value"in e,F=e=>new Set(Array.isArray(e)?e:[e]);function xe({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:s,onChange:u}){if(Ae({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:s,onChange:u}),r){$e(n,r,t,i);return}s[e]=t}function Ae({prop:e,value:t,root:n,sel:r,attr:i,objNotBound:s,onChange:u}){if(!u)return;let o=N({prop:e,root:n,sel:r,attr:i,objNotBound:s});o!==t&&u(o,t)}function N({prop:e,root:t,sel:n,attr:r,objNotBound:i}){return n?Oe(t,n,r):i[e]}function Oe(e,t,n){let r=W(e,t);if(r.length===0)return null;let i=r[0];return n?i.getAttribute(n):D(i)?h(i)?r.filter(s=>h(s)&&s.checked).map(s=>s.value==="on"?s.name:s.value):P(i)?[...i.querySelectorAll("option")].filter(u=>u.selected).map(u=>u.value):(g(i)&&(i=r.filter(g).find(s=>s.checked)),i.value):i.innerHTML}function $e(e,t,n,r){let i=W(e,t);if(i.length===0)return;let s=i[0];if(h(s)){let u=F(n);i.filter(h).forEach(o=>o.checked=u.has(o.value)||u.has(o.name));return}if(P(s)){let u=F(n);s.querySelectorAll("option").forEach(o=>o.selected=u.has(o.value));return}if(g(s)){i.filter(g).forEach(u=>u.checked=u.value===n);return}i.forEach(u=>Ce(u,n,r))}function Ce(e,t,n){n?e.setAttribute(n,t):D(e)?e.value=t:e.innerHTML=t}function W(e,t){let n=e.querySelectorAll(t);return n.length===0&&console.warn(`No elements found matching selector ${t}`),[...n]}function Se(e){if(typeof e!="string"||e.length===0)throw"'prop' argument must be a String defining the name a property."}function _({nameWithDash:e,html:t,css:n,display:r,propertyList:i,actionList:s,eventHandlerList:u}){if(customElements.get(e))return!1;let o=class extends HTMLElement{constructor(){super();Te(this,t,n,r),this.properties=Le(this,i),this.actions=qe(this,s),Re(this,u)}};return customElements.define(e,o),!0}function Le(e,t){let n={};return je(t)&&t.forEach(r=>He(n,r,e)),n}function He(e,t,n){let r=Me(t,n);S({obj:e,prop:t.name,sel:t.sel,attr:t.attr,root:n.shadowRoot,onChange:r}),e[t.name]=t.value}function Me(e,t){if(!!e.onChange)return(n,r)=>e.onChange(t,n,r)}function je(e){if(!e)return!1;if(!Array.isArray(e))throw"propertyList must be an array of {name, value, [sel], [attr]} objects";return!0}function qe(e,t){let n={};return t&&t.forEach(r=>{r.name&&r.action&&(n[r.name]=r.action.bind(e))}),n}function Re(e,t){if(!!t){if(!Array.isArray(t))throw"eventHandlerList must be an array of {sel, eventName, listener} objects";t.forEach(n=>{l.all(n.sel,e.shadowRoot).forEach(i=>{i.addEventListener(n.eventName,s=>{n.listener(s,e)})})})}}function Te(e,t,n,r){t=Ne(e,t);let i=e.attachShadow({mode:"open"}),s=l.createElements(Pe(n,r)+t);i.append(...s)}function Ne(e,t){return c.isFunction(t)?t(e):t}function Pe(e,t){return Fe(t)+De(e)}function De(e){return e=a.trim(e),e.length===0?"":(a.startsWith(e,"<style>",!1)||(e=l.tag("style",{},e)),e)}function Fe(e){return e=a.trim(e),e.length===0?"":`
  <style>
    :host { display: ${e};}
    :host([hidden]) {display: none;}
  </style>
  `}var m=class{constructor(t){this.rules=[],this.add(...t)}add(...t){return t=t.filter(n=>!We(this.rules,n.name)),t.length===0?!1:(this.rules.push(...t),t)}validate(t,n){this.rules.forEach(r=>{let i=r.isValid(t);n(i,r.name)})}toHtml(){return this.rules.map(t=>t.toHtml()).join("")}static createFromAttributes(t){let n=[];return c.forEachEntry(t,(r,i)=>{if(!a.isEmpty(i)&&c.has(f,r)){let s=t[r+"-message"],u=f[r](i,s);n.push(u)}}),new m(n)}};function We(e,t){return!!e.find(r=>r.name===t)}var f=class{constructor(t="",n,r){this.name=t.replace(/[ \\.]/g,"-").toLowerCase(),this.message=n,this.validator=r}isValid(t){return this.validator(String(t))}toHtml(){return a.isEmpty(this.message)?"":`<li class="validation-${this.name}">${this.message}</li>
`}static createRule(t,n,r,i){return n=n.replaceAll("%v",i),new f(t,n,r)}static required(t,n="Required Field"){let r=i=>!!i;return new f("required",n,r)}static minlength(t,n="Minimum Length is %v"){let r=i=>(i?i.length:0)>=t;return f.createRule("minlength",n,r,t)}static pattern(t,n="Must satisfy the pattern %v"){let r=i=>new RegExp(t).test(i);return f.createRule("pattern",n,r,t)}static min(t,n="Minimum value of %v"){t=Number(t)||0;let r=i=>(i=Number(i)||0,i>=t);return f.createRule("minValue",n,r,t)}static max(t,n="Maximum value of %v"){t=Number(t)||0;let r=i=>(i=Number(i)||0,i<=t);return f.createRule("max",n,r,t)}};var V='${cssFile}\n\n<div class="input-field">\n  <label class="label ${required}" ${style-label}>${label}</label>\n  <input type="${type}" class="input" ${style-input} value=""\n         ${required} ${minlength} ${maxlength} ${pattern}>\n  <footer>\n    <ul class="rules" style="display:${showrules};">${rules}</ul>\n  </footer>\n</div>\n';function I(e=""){_({nameWithDash:"input-field",html:t=>{let n=Ve(t);return t.validationRules=m.createFromAttributes(n),ke(n,e,t.validationRules)},propertyList:[{name:"value",value:"",sel:"input",onChange:(t,n,r)=>k(t,r)}],eventHandlerList:[{sel:"input",eventName:"input",listener:(t,n)=>{let r=t.target.value;k(n,r)}}],actionList:[{name:"addRule",action:function(t,n,r){let i=new f(t,n,r);!this.validationRules.add(i)||Ie(this,i)}}]})}function Ve(e){let t=l.getAttributes(e),n={};c.forEachEntry(t,(i,s)=>{n[i.toLowerCase()]=s});let r=a.trim(n.showrules).toLowerCase();return n.showrules=r===""||r==="true",n}function ke(e,t,n){let r={cssFile:Be(t),label:e.label,type:e.type||"text","style-label":d(e,"style-label","style"),"style-input":d(e,"style-input","style"),required:d(e,"required"),minlength:d(e,"minlength"),maxlength:d(e,"maxlength"),pattern:d(e,"pattern"),min:d(e,"min"),max:d(e,"max"),showrules:e.showrules?"":"none",rules:n.toHtml()};return a.replaceTemplate(V,r)}function Be(e){return a.isEmpty(e)?"":`<link rel="stylesheet" type="text/css" href="${e}">`}function d(e,t,n=t){let r=e[t];return r==="required"?r:r?` ${n}="${r}"`:""}function k(e,t){let n=l.first("footer ul.rules",e),r=!0;e.validationRules.validate(t,(s,u)=>{let o=l.first(`li.validation-${u}`,n);l.classPresentIf(o,"bad",!s),r=r&&s});let i=l.first("input",e);l.classPresentIf(i,"bad",!r)}function Ie(e,t){let n=l.first("footer ul.rules",e);l.add(n,t.toHtml())}return _e;})();
