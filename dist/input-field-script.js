// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 1.5.4.
// Apache License Version 2.0


var InputField = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all2) => {
    for (var name in all2)
      __defProp(target, name, { get: all2[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/input-field.js
  var input_field_exports = {};
  __export(input_field_exports, {
    define: () => define
  });

  // node_modules/@techexp/jshelper/dist/helper-esm.js
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all2) => {
    for (var name in all2)
      __defProp2(target, name, { get: all2[name], enumerable: true });
  };
  var Domer_exports = {};
  __export2(Domer_exports, {
    add: () => add,
    all: () => all,
    classPresentIf: () => classPresentIf,
    createElement: () => createElement,
    createElements: () => createElements,
    first: () => first,
    getAttributes: () => getAttributes,
    id: () => id,
    removeElements: () => removeElements,
    setContent: () => setContent,
    tag: () => tag
  });
  var Objecter_exports = {};
  __export2(Objecter_exports, {
    equals: () => equals,
    forEachEntry: () => forEachEntry,
    has: () => has,
    isDate: () => isDate,
    isFunction: () => isFunction,
    isInteger: () => isInteger,
    isNil: () => isNil,
    isNumber: () => isNumber,
    isRegExp: () => isRegExp,
    isString: () => isString
  });
  function isNil(x) {
    return x === null || x === void 0;
  }
  function isString(s) {
    return isType(s, "String");
  }
  function isFunction(f) {
    return isType(f, "Function");
  }
  function isDate(d) {
    return isType(d, "Date");
  }
  function isNumber(n) {
    if (isType(n, "Number")) {
      if (Number.isNaN(n))
        return false;
      return Number.isFinite(n);
    }
    if (!isString(n))
      return false;
    n = n.trim();
    if (n === "")
      return false;
    return !isNaN(n);
  }
  function isInteger(n) {
    if (!isNumber(n))
      return false;
    return Number.isInteger(Number.parseFloat(n));
  }
  function isRegExp(re) {
    return isType(re, "RegExp");
  }
  function isType(v, type) {
    return Object.prototype.toString.call(v) === `[object ${type}]`;
  }
  function forEachEntry(object, func) {
    if (!object || !func)
      return;
    if (Array.isArray(object)) {
      object.forEach((v, index) => {
        func(index, v);
      });
      return;
    }
    Object.entries(object).forEach((p) => func(p[0], p[1]));
  }
  function has(object, propName) {
    if (!object || !propName)
      return false;
    return Object.prototype.hasOwnProperty.call(object, propName);
  }
  function equals(a, b) {
    if (a === b)
      return true;
    if (a === void 0 || b === void 0)
      return false;
    return isEqual(a, b);
  }
  function isEqual(a, b) {
    if (isSimpleType(a) || isSimpleType(b))
      return a === b;
    return isEqualCompoundType(a, b);
  }
  var simpleTypes = /* @__PURE__ */ new Set(["boolean", "number", "bigint", "string", "symbol"]);
  function isSimpleType(v) {
    return simpleTypes.has(typeof v);
  }
  function isEqualCompoundType(a, b) {
    if (!isEqualType(a, b))
      return false;
    if (isEqualDates(a, b))
      return true;
    return isEqualObjects(a, b);
  }
  function isEqualType(a, b) {
    return prototypeToString(a) === prototypeToString(b);
  }
  function prototypeToString(v) {
    return Object.prototype.toString.call(v);
  }
  function isEqualDates(a, b) {
    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }
    return false;
  }
  function isEqualObjects(a, b) {
    const akeys = Object.keys(a);
    if (akeys.length !== Object.keys(b).length)
      return false;
    return akeys.every((k) => equals(a[k], b[k]));
  }
  function id(elementId, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    return root.getElementById(elementId);
  }
  function all(selector, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    return Array.from(root.querySelectorAll(selector));
  }
  function first(selector, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    if (!selector.includes("/")) {
      return root.querySelector(selector);
    }
    const path = selector.split("/").map((p) => p.trim()).filter((p) => p.length > 0);
    for (const p of path) {
      root = nextChild(p, root);
      if (root === null)
        break;
    }
    return root;
  }
  function nextChild(pathItem, root) {
    const isShadowRoot = pathItem === "shadowRoot" || pathItem === "shadow-root";
    return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem);
  }
  function isWebComponent(el) {
    return el && el.shadowRoot && el.tagName.includes("-");
  }
  function getAttributes(el) {
    const result = {};
    const atts = el.attributes;
    if (!atts || atts.length === 0)
      return result;
    for (let i = 0; i < atts.length; i++) {
      const a = atts[i];
      result[a.name] = a.value;
    }
    return result;
  }
  function createElements(html = "") {
    html = html.trim();
    if (!html)
      return [];
    const temp = document.createElement("template");
    temp.innerHTML = html;
    return Array.from(temp.content.childNodes);
  }
  function createElement(name, attributes = {}, content = "") {
    const html = tag(name, attributes, content);
    const elements = createElements(html);
    if (elements.length === 0)
      return null;
    return elements[0];
  }
  function tag(name, attributes = {}, content = "") {
    if (!name)
      return "";
    const atts = attsToString(attributes);
    return `<${name}${atts}>${content}</${name}>`;
  }
  function attsToString(attributes) {
    const array = [];
    forEachEntry(attributes, (k, v) => {
      array.push(`${k}="${v}"`);
    });
    const sep = array.length > 0 ? " " : "";
    return sep + array.join(" ");
  }
  var LOCATIONS = /* @__PURE__ */ new Set(["beforebegin", "afterbegin", "beforeend", "afterend"]);
  function add(target, tobeAdded, location = "beforeend") {
    location = location.toLowerCase();
    if (!LOCATIONS.has(location))
      return false;
    if (isString(tobeAdded)) {
      target.insertAdjacentHTML(location, tobeAdded);
    } else {
      addElements(target, tobeAdded, location);
    }
    return true;
  }
  function addElements(target, tobeAdded, location) {
    if (Array.isArray(tobeAdded)) {
      tobeAdded.forEach((el) => target.insertAdjacentElement(location, el));
    } else {
      target.insertAdjacentElement(location, tobeAdded);
    }
  }
  function setContent(element, ...content) {
    element.innerHTML = "";
    element.append(...content);
  }
  function removeElements(selector, root = document) {
    const elements = all(selector, root);
    elements.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }
  function classPresentIf(el, cssClass, condition) {
    if (!el)
      return;
    const func = condition ? "add" : "remove";
    el.classList[func](cssClass);
  }
  var Stringer_exports = {};
  __export2(Stringer_exports, {
    endsWith: () => endsWith,
    indexOf: () => indexOf,
    indexOfFirstMatch: () => indexOfFirstMatch,
    indexOfLastMatch: () => indexOfLastMatch,
    isEmpty: () => isEmpty,
    removePrefix: () => removePrefix,
    removeSuffix: () => removeSuffix,
    removeSurrounding: () => removeSurrounding,
    replaceAll: () => replaceAll,
    replaceTemplate: () => replaceTemplate,
    startsWith: () => startsWith,
    strip: () => strip,
    stripEnd: () => stripEnd,
    stripStart: () => stripStart,
    substringAfter: () => substringAfter,
    substringBefore: () => substringBefore,
    trim: () => trim
  });
  function indexOf(st, search, fromIndex = 0, ignoreCase = false) {
    if (!st)
      return -1;
    if (ignoreCase) {
      return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
    }
    return st.indexOf(search, fromIndex);
  }
  function indexOfFirstMatch(st, callback) {
    if (!callback || !st)
      return -1;
    return st.split("").findIndex(callback);
  }
  function indexOfLastMatch(st, callback) {
    if (!callback || !st)
      return -1;
    const chars = st.split("");
    for (let i = chars.length; i >= 0; --i) {
      if (callback(chars[i], i))
        return i;
    }
    return -1;
  }
  function startsWith(st = "", search = void 0, ignoreCase = false) {
    if (ignoreCase) {
      const start = st.substring(0, search.length).toLowerCase();
      return search.toLowerCase() === start;
    }
    return st.startsWith(search);
  }
  function endsWith(st, search, ignoreCase = false) {
    if (ignoreCase) {
      return st.toLowerCase().endsWith(search.toLowerCase());
    }
    return st.endsWith(search);
  }
  function removePrefix(st, prefix, ignoreCase = false) {
    if (startsWith(st, prefix, ignoreCase)) {
      st = st.substring(prefix.length);
    }
    return st;
  }
  function removeSuffix(st, suffix, ignoreCase = false) {
    if (endsWith(st, suffix, ignoreCase)) {
      st = st.substring(0, st.length - suffix.length);
    }
    return st;
  }
  function removeSurrounding(st, prefix, suffix, ignoreCase = false) {
    return removeSuffix(removePrefix(st, prefix, ignoreCase), suffix, ignoreCase);
  }
  function substringAfter(st, search, ignoreCase = false) {
    if (!search) {
      return st;
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return "";
    return st.substring(i + search.length);
  }
  function substringBefore(st, search, ignoreCase = false) {
    if (!search) {
      return "";
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return st;
    return st.substring(0, i);
  }
  function trim(s) {
    if (isEmpty(s))
      return "";
    if (!isString(s)) {
      s = String(s);
    }
    return s.trim(s);
  }
  function isEmpty(s) {
    return s === void 0 || s === null || s === "";
  }
  function replaceAll(text, search, newStr) {
    if (isFunction(String.prototype.replaceAll)) {
      return text.replaceAll(search, newStr);
    }
    if (isRegExp(search)) {
      return text.replace(search, newStr);
    }
    const re = new RegExp(search, "g");
    return text.replace(re, newStr);
  }
  function replaceTemplate(text = "", values = {}, preTag = "${", postTag = "}") {
    forEachEntry(values, (k, v) => {
      if (v !== void 0) {
        k = preTag + k + postTag;
        text = replaceAll(text, k, v);
      }
    });
    return text;
  }
  function stripStart(s, stripChars = "") {
    if (isEmpty(s))
      return "";
    if (!stripChars)
      return s;
    return stripStart_(s, new Set(Array.from(stripChars)));
  }
  function stripStart_(s, stripSet) {
    for (let i = 0; i < s.length; i++) {
      if (!stripSet.has(s.charAt(i))) {
        return s.substring(i);
      }
    }
    return "";
  }
  function stripEnd(s, stripChars = "") {
    if (isEmpty(s))
      return "";
    if (!stripChars)
      return s;
    return stripEnd_(s, new Set(Array.from(stripChars)));
  }
  function stripEnd_(s, stripSet) {
    for (let i = s.length - 1; i >= 0; i--) {
      if (!stripSet.has(s.charAt(i))) {
        return s.substring(0, i + 1);
      }
    }
    return "";
  }
  function strip(s, stripChars = "") {
    if (s === void 0 || s === "")
      return "";
    if (!stripChars)
      return s;
    const stripSet = new Set(Array.from(stripChars));
    s = stripStart_(s, stripSet);
    if (!s)
      return "";
    return stripEnd_(s, stripSet);
  }
  var LineCompare_exports = {};
  __export2(LineCompare_exports, {
    compareLines: () => compareLines
  });
  function compareLines(t1, t2, { trim: trim2 = true, skipEmpty = true, caseSensitive = true } = { trim: true, skipEmpty: true, caseSensitive: true }) {
    t1 = toLines(t1, { trim: trim2, skipEmpty });
    t2 = toLines(t2, { trim: trim2, skipEmpty });
    if (t1.length !== t2.length) {
      return `t1 has ${t1.length} lines(s) while t2 has ${t2.length} line(s).`;
    }
    for (let i = 0; i < t1.length; i++) {
      const result = compareTwoLines(t1[i], t2[i], i, caseSensitive);
      if (result.length > 0) {
        return result;
      }
    }
    return "";
  }
  function compareTwoLines(t1, t2, index, caseSensitive) {
    const a = caseSensitive ? t1 : t1.toLowerCase();
    const b = caseSensitive ? t2 : t2.toLowerCase();
    if (a !== b) {
      return `Line #${index + 1} mismatch.
${t1}
${t2}`;
    }
    return "";
  }
  function toLines(t, { trim: trim2, skipEmpty }) {
    if (trim2) {
      t = trim(t);
    }
    t = t.split("\n");
    if (trim2) {
      t = t.map((ln) => trim(ln));
    }
    if (skipEmpty) {
      t = t.filter((ln) => !!ln);
    }
    return t;
  }

  // node_modules/@techexp/data-bind/dist/data-bind-module.js
  function bind({
    obj = {},
    prop,
    sel,
    attr,
    root = document,
    getter,
    setter,
    onChange
  }) {
    validateArgs(prop);
    checkInitialValue(obj, prop);
    const objNotBound = {};
    if (!getter) {
      getter = () => getValue({ prop, sel, attr, root, objNotBound });
    }
    if (!setter) {
      setter = (value) => setValue({ prop, value, root, sel, attr, objNotBound });
    }
    return bindProp({ obj, prop, getter, setter, onChange });
  }
  function bindProp({ obj, prop, getter, setter, onChange }) {
    const descriptor = {
      get: () => getter(),
      set: (value) => {
        if (onChange) {
          const oldValue = getter(prop);
          if (oldValue !== value) {
            onChange(oldValue, value);
          }
        }
        setter(value);
      },
      configurable: true,
      enumerable: true
    };
    Object.defineProperty(obj, prop, descriptor);
    return obj;
  }
  var isCheckbox = (el) => el.type === "checkbox";
  var isRadio = (el) => el.type === "radio";
  var isSelect = (el) => el.nodeName.toLowerCase() === "select";
  var isInputField = (el) => el.nodeName.toLowerCase() === "input-field";
  var isInput = (el) => "value" in el;
  var toSet = (v) => new Set(Array.isArray(v) ? v : [v]);
  function checkInitialValue(obj, prop) {
    const oldValue = obj[prop];
    if (oldValue !== void 0) {
      console.info(`Property '${prop}' already exists in object. Will override previous definition but retain old value of ${oldValue}.`);
      obj[prop] = oldValue;
    }
    return oldValue;
  }
  function getValue({ prop, root, sel, attr, objNotBound }) {
    if (sel)
      return getDomVal(root, sel, attr);
    return objNotBound[prop];
  }
  function setValue({ prop, value, root, sel, attr, objNotBound }) {
    if (sel) {
      setDomVal(root, sel, value, attr);
      return;
    }
    objNotBound[prop] = value;
  }
  function getDomVal(root, sel, attr) {
    const elements = findElements(root, sel);
    if (elements.length === 0)
      return null;
    let el = elements[0];
    if (attr)
      return el.getAttribute(attr);
    if (!isInput(el))
      return el.innerHTML;
    if (isCheckbox(el)) {
      return elements.filter((e) => isCheckbox(e) && e.checked).map((e) => e.value === "on" ? e.name : e.value);
    }
    if (isSelect(el)) {
      const opts = [...el.querySelectorAll("option")];
      return opts.filter((op) => op.selected).map((op) => op.value);
    }
    if (isRadio(el)) {
      el = elements.filter(isRadio).find((e) => e.checked);
      if (!el)
        return void 0;
    }
    if (isInputField(el)) {
      return el.getAttribute("value");
    }
    return el.value;
  }
  function setDomVal(root, sel, val, attr) {
    const elements = findElements(root, sel);
    if (elements.length === 0)
      return;
    const el = elements[0];
    if (isCheckbox(el)) {
      const v = toSet(val);
      elements.filter(isCheckbox).forEach((e) => e.checked = v.has(e.value) || v.has(e.name));
      return;
    }
    if (isSelect(el)) {
      const v = toSet(val);
      el.querySelectorAll("option").forEach((op) => op.selected = v.has(op.value));
      return;
    }
    if (isRadio(el)) {
      elements.filter(isRadio).forEach((e) => e.checked = e.value === val);
      return;
    }
    elements.forEach((el2) => setElementValue(el2, val, attr));
  }
  function setElementValue(el, val, attr) {
    if (attr) {
      el.setAttribute(attr, val);
    } else if (isInput(el)) {
      el.value = val;
    } else if (isInputField(el)) {
      el.setAttribute("value", val);
    } else {
      el.innerHTML = val;
    }
  }
  function findElements(root, sel) {
    const elements = root.querySelectorAll(sel);
    if (elements.length === 0) {
      console.warn(`No elements found matching selector ${sel}`);
    }
    return [...elements];
  }
  function validateArgs(prop) {
    if (typeof prop !== "string" || prop.length === 0) {
      throw `'prop' argument must be a String defining the name a property.`;
    }
  }

  // node_modules/@techexp/webitem/dist/webitem-esm.js
  function defineElement({
    nameWithDash,
    html,
    css,
    display,
    propertyList,
    actionList,
    eventHandlerList
  }) {
    if (customElements.get(nameWithDash))
      return false;
    const el = class extends HTMLElement {
      constructor() {
        super();
        const root = this;
        addHtml(this, html, css, display);
        this.wi = {};
        this.wi.properties = bindProperties(this, propertyList);
        this.wi.actions = defineActions(this, actionList);
        addEventListeners(this, eventHandlerList);
        this.wi.addProperty = function(name, value, sel, attr, onChange) {
          const prop = { name, value, sel, attr, onChange };
          addProperty(root.wi.properties, prop, root);
        };
        this.wi.addAction = (name, action) => addAction(root, root.wi.actions, name, action);
        this.wi.addEventListener = (sel, eventName, listener) => addHandler(root, { sel, eventName, listener });
      }
    };
    customElements.define(nameWithDash, el);
    return true;
  }
  function bindProperties(root, propertyList) {
    const result = {};
    if (!validatePropertyList(propertyList))
      return result;
    propertyList.forEach((p) => addProperty(result, p, root));
    return result;
  }
  function addProperty(obj, prop, root) {
    const onChange = createOnChange(prop, root);
    bind({ obj, prop: prop.name, sel: prop.sel, attr: prop.attr, root: root.shadowRoot, onChange });
    if (prop.value !== void 0) {
      obj[prop.name] = prop.value;
    }
  }
  function createOnChange(prop, root) {
    if (!prop.onChange)
      return void 0;
    return (oldValue, newValue) => prop.onChange(root, oldValue, newValue);
  }
  function validatePropertyList(propertyList) {
    if (!propertyList)
      return false;
    if (!Array.isArray(propertyList)) {
      throw "propertyList must be an array of {name, value, [sel], [attr]} objects";
    }
    return true;
  }
  function defineActions(root, actionList) {
    const actions = {};
    if (!actionList)
      return actions;
    actionList.forEach((pair) => {
      addAction(root, actions, pair.name, pair.action);
    });
    return actions;
  }
  function addAction(root, actions, name, action) {
    if (!Objecter_exports.isString(name) || !Objecter_exports.isFunction(action))
      return;
    actions[name] = action.bind(root);
  }
  function addEventListeners(root, eventHandlerList) {
    if (!eventHandlerList)
      return;
    if (!Array.isArray(eventHandlerList)) {
      throw "eventHandlerList must be an array of {sel, eventName, listener} objects";
    }
    eventHandlerList.forEach((h) => addHandler(root, h));
  }
  function addHandler(root, { sel, eventName, listener }) {
    const elements = Domer_exports.all(sel, root.shadowRoot);
    elements.forEach((el) => {
      el.addEventListener(eventName, (ev) => {
        listener(ev, root);
      });
    });
  }
  function addHtml(root, html, css, display) {
    html = getHtml(root, html);
    const shadow = root.attachShadow({ mode: "open" });
    const nodes = Domer_exports.createElements(getCss(css, display) + html);
    shadow.append(...nodes);
  }
  function getHtml(root, html) {
    return Objecter_exports.isFunction(html) ? html(root) : html;
  }
  function getCss(css, display) {
    return displayStyle(display) + buildCss(css);
  }
  function buildCss(css) {
    css = Stringer_exports.trim(css);
    if (css.length === 0)
      return "";
    if (!Stringer_exports.startsWith(css, "<style>", false)) {
      css = Domer_exports.tag("style", {}, css);
    }
    return css;
  }
  function displayStyle(display) {
    display = Stringer_exports.trim(display);
    if (display.length === 0)
      return "";
    return `
  <style>
    :host { display: ${display};}
    :host([hidden]) {display: none;}
  </style>
  `;
  }

  // src/validation/Rule.js
  var Rule = class {
    constructor(name = "", message, validator) {
      this.name = name.replace(/[ \\.]/g, "-").toLowerCase();
      this.message = message;
      this.validator = validator;
    }
    isValid(value) {
      if (this.name === "required" && value === void 0) {
        return false;
      }
      return this.validator(String(value));
    }
    toHtml() {
      if (Stringer_exports.isEmpty(this.message))
        return "";
      return `<li class="validation-${this.name}">${this.message}</li>
`;
    }
    static createRule(name, message, validator, value) {
      message = Stringer_exports.replaceAll(message, "%v", value);
      return new Rule(name, message, validator);
    }
    static email(msg = "Must be a valid email address") {
      const validator = (value) => /\S+@\S+\.\S+/.test(value);
      return new Rule("email", msg, validator);
    }
    static required(flag, msg = "Required Field") {
      flag = flag.toLowerCase();
      if (flag === "true" || flag === "required") {
        const validator = (value) => !!value;
        return new Rule("required", msg, validator);
      }
      return null;
    }
    static minlength(minLength, msg = "Minimum Length is %v") {
      const validator = (value) => {
        const len = value ? value.length : 0;
        return len >= minLength;
      };
      return Rule.createRule("minlength", msg, validator, minLength);
    }
    static pattern(pattern, msg = "Must satisfy the pattern %v") {
      const validator = (value) => {
        const regex = new RegExp(pattern);
        return regex.test(value);
      };
      return Rule.createRule("pattern", msg, validator, pattern);
    }
    static min(minValue, msg = "Minimum value of %v") {
      minValue = Number(minValue) || 0;
      const validator = (value) => {
        value = Number(value) || 0;
        return value >= minValue;
      };
      return Rule.createRule("minValue", msg, validator, minValue);
    }
    static max(maxValue, msg = "Maximum value of %v") {
      maxValue = Number(maxValue) || 0;
      const validator = (value) => {
        value = Number(value) || 0;
        return value <= maxValue;
      };
      return Rule.createRule("max", msg, validator, maxValue);
    }
    static isNumber(msg = "Must be a valid number") {
      const validator = (v) => Objecter_exports.isNumber(v);
      return new Rule("isNumber", msg, validator);
    }
    static isInteger(msg = "Must be a valid whole number") {
      const validator = (v) => Objecter_exports.isInteger(v);
      return new Rule("isInteger", msg, validator);
    }
    static set(options, msg = "Value must be one of [%v]") {
      const set = new Set(options.split(",").map((op) => op.trim().toLowerCase()));
      const validator = (v) => v === "" || set.has(v.toLowerCase());
      return Rule.createRule("set", msg, validator, options);
    }
  };

  // src/validation/ValidationRules.js
  var ValidationRules = class {
    constructor(rules, showrules) {
      this.rules = [];
      this.addAll(rules);
      this.showrules = showrules;
    }
    add(rule) {
      if (containsName(this.rules, rule.name)) {
        return false;
      }
      this.rules.push(rule);
      return true;
    }
    addAll(rules) {
      if (!rules)
        return;
      rules.forEach((r) => this.add(r));
    }
    validate(value, onValidation) {
      this.rules.forEach((r) => {
        const isValid = r.isValid(value);
        onValidation(isValid, r.name);
      });
    }
    toHtml() {
      return this.rules.map((r) => r.toHtml()).join("");
    }
    static createFromAttributes(atts) {
      const rules = [];
      checkType(rules, atts);
      Objecter_exports.forEachEntry(atts, (k, v) => {
        if (!Stringer_exports.isEmpty(v) && Objecter_exports.has(Rule, k)) {
          const msg = atts[k + "-message"];
          const rule = Rule[k](v, msg);
          if (rule !== null) {
            rules.push(rule);
          }
        }
      });
      return new ValidationRules(rules, atts.showrules);
    }
  };
  function checkType(rules, atts) {
    switch (atts.type) {
      case "email":
        return rules.push(Rule.email(atts["email-message"]));
      case "number":
        return rules.push(Rule.isNumber(atts["number-message"]));
      case "integer":
        return rules.push(Rule.isInteger(atts["integer-message"]));
      case "set":
        return rules.push(Rule.set(atts.options, atts["set-message"]));
    }
  }
  function containsName(rules, name) {
    const found = rules.find((r) => r.name === name);
    return !!found;
  }

  // src/input-field.html.js
  var template = `
{cssFile}

<div class="input-field">
  <label class="label">
    <span class="superlabel {required} {tooltip}">
      {label} {tooltipIcon}
      <span class="tooltip-text">{tooltipText}</span>
    </span>
    <span class="sublabel">{sublabel}</span>
  </label>

  {input}

  <footer>
    <ul class="rules" style="display:{showrules};">{rules}</ul>
  </footer>
</div>
`;

  // src/widgets/WidgetUtils.js
  var required = "required";
  function parseAndValidate(json, widgetType, ...required3) {
    if (!validateString(json))
      return false;
    json = JSON.parse(json);
    if (!validateJsonObject(json, widgetType, ...required3))
      return false;
    return json;
  }
  function validateString(json) {
    if (!Objecter_exports.isString(json))
      return false;
    if (Stringer_exports.isEmpty(json))
      return false;
    json = json.trim();
    return json.length !== 0;
  }
  function validateJsonObject(json, widgetType, ...required3) {
    if (!Array.isArray(json.options))
      return false;
    if (json.options.length === 0)
      return false;
    const found = required3.find((r) => !Objecter_exports.has(json, r));
    if (found) {
      throw `${widgetType} definition requires ${found} attribute`;
    }
    return true;
  }
  function validateOption(widgetType, { label, value }) {
    if (label === void 0 && value === void 0) {
      throw `${widgetType} definition requires at least a label or value`;
    }
  }
  function getAttr(atts, attName) {
    const value = atts[attName];
    if (!value)
      return "";
    if (isRequired(attName, value))
      return required;
    return `${attName}="${value}"`;
  }
  function isRequired(attName, value) {
    if (attName !== required)
      return false;
    return value === required || value === "true";
  }

  // src/widgets/input.js
  var template2 = `
 <input type="{type}" class="input" value="{value}"
  {required} {minlength} {maxlength} {pattern}>
`;
  var required2 = "required";
  function getHtml2(atts) {
    const params = {
      type: getType(atts),
      required: getAttr(atts, required2),
      minlength: getAttr(atts, "minlength"),
      maxlength: getAttr(atts, "maxlength"),
      pattern: getAttr(atts, "pattern"),
      value: atts.value || ""
    };
    return Stringer_exports.replaceTemplate(template2, params, "{");
  }
  function getType(atts) {
    const type = Stringer_exports.trim(atts.type).toLowerCase();
    if (!type)
      return "text";
    if (type === "integer")
      return "number";
    return type;
  }

  // src/widgets/radio.js
  var template3 = `
<label class="radio">
  <input type="radio" name="{name}" {id} value="{value}"{checked}>
  <span class="radio-label">{label}</span>
</label>
`;
  function contentToHtml(element) {
    if (!element)
      return "";
    return jsonToHtml(element.innerHTML);
  }
  function jsonToHtml(json) {
    json = parseAndValidate(json, "Radio", "name");
    if (!json)
      return "";
    const buttons = buildRadioButtons(json);
    return `
<div class="radio-buttons">
${buttons}
</div>
`;
  }
  function buildRadioButtons(json) {
    const name = json.name;
    const sep = json.flow === "vertical" ? "<br>\n" : "\n";
    return json.options.map((op) => buildOneRadioButton(name, op)).join(sep);
  }
  function buildOneRadioButton(name, option) {
    validateOption("Radio", option);
    const params = {
      name,
      checked: option.checked ? " checked" : "",
      id: option.id ? `id="${option.id}"` : "",
      value: option.value || option.label,
      label: option.label || option.value
    };
    return Stringer_exports.replaceTemplate(template3.trim(), params, "{");
  }

  // src/widgets/checkbox.js
  var template4 = `
<label class="checkbox">
  <input type="checkbox" {name} {id} value="{value}"{checked}>
  <span class="checkbox-label">{label}</span>
</label>
`;
  function contentToHtml2(element) {
    if (!element)
      return "";
    return jsonToHtml2(element.innerHTML);
  }
  function jsonToHtml2(json) {
    json = parseAndValidate(json, "Checkbox");
    if (!json)
      return "";
    const buttons = buildCheckboxButtons(json);
    return `
<div class="checkbox-buttons">
${buttons}
</div>
`;
  }
  function buildCheckboxButtons(json) {
    const sep = json.flow === "vertical" ? "<br>\n" : "\n";
    return json.options.map((op) => buildOneCheckboxButton(op)).join(sep);
  }
  function buildOneCheckboxButton(option) {
    validateOption("Checkbox", option);
    const params = {
      name: option.name ? `name="${option.name}"` : "",
      checked: option.checked ? " checked" : "",
      id: option.id ? `id="${option.id}"` : "",
      value: option.value || option.label,
      label: option.label || option.value
    };
    return Stringer_exports.replaceTemplate(template4.trim(), params, "{");
  }

  // src/widgets/listbox.js
  var templates = {
    select: '<select{name}{id}{size}{multiple} class="{widgetType}{multiple}">{options}</select>',
    group: '<optgroup label="{label}">{options}</optgroup>',
    option: "<option{disabled}{selected}{value}>{label}</option>"
  };
  function contentToHtml3(element) {
    if (!element)
      return "";
    return jsonToHtml3(element.innerHTML);
  }
  function jsonToHtml3(json) {
    json = parseAndValidate(json, "Listbox");
    if (!json)
      return "";
    const params = {
      name: json.name ? ` name="${json.name}"` : "",
      id: json.id ? ` id="${json.id}"` : "",
      size: json.size ? ` size="${json.size}"` : "",
      widgetType: getWidgetType(json),
      multiple: json.multiple ? " multiple" : "",
      options: buildOptions(json.options)
    };
    return Stringer_exports.replaceTemplate(templates.select, params, "{");
  }
  function getWidgetType({ multiple, size }) {
    if (multiple || size > 1)
      return "listbox";
    return "combobox";
  }
  function buildOptionGroup(json) {
    const params = {
      label: json.label,
      options: buildOptions(json.options)
    };
    return Stringer_exports.replaceTemplate(templates.group, params, "{");
  }
  function buildOptions(options) {
    if (!Array.isArray(options))
      return "";
    const html = options.map((op) => {
      if (op.options)
        return buildOptionGroup(op);
      return buildOption(op);
    });
    return html.join("\n");
  }
  function buildOption(option) {
    validateOption("Listbox", option);
    const value = option.value || option.label;
    const params = {
      disabled: option.disabled ? " disabled" : "",
      selected: option.selected ? " selected" : "",
      label: option.label || option.value,
      value: ` value="${value}"`
    };
    return Stringer_exports.replaceTemplate(templates.option, params, "{");
  }
  function mousedownListener(ev, inputField) {
    ev.preventDefault();
    const select = Domer_exports.first("select", inputField);
    const scrollTop = select.scrollTop;
    toggleOptionSelected(ev.target);
    inputField.wi.actions._runValueChangeListeners(ev.target.value);
    setTimeout(() => {
      select.scrollTop = scrollTop;
    });
  }
  function toggleOptionSelected(option) {
    option.selected = !option.selected;
    option.parentElement.focus();
  }

  // src/widgets/tooltip.js
  function setTooltipParams(atts, params) {
    const tooltip = atts.tooltip;
    if (tooltip) {
      params.tooltip = "tooltip";
      params.tooltipIcon = '<span class="circle">?</span>';
      params.tooltipText = tooltip;
    } else {
      params.tooltip = "";
      params.tooltipIcon = "";
      params.tooltipText = "";
    }
  }

  // src/widgets/ValueUtils.js
  var separator = "|";
  var escapeChar = "^";
  var escapeSeq = escapeChar + separator;
  var encodeItem = (v) => String(v).replaceAll(separator, escapeSeq);
  var decodeItem = (v) => v.replaceAll(escapeSeq, separator);
  function serialize(value) {
    if (Objecter_exports.isNil(value)) {
      return "";
    }
    if (Array.isArray(value)) {
      return value.map((v) => encodeItem(v)).join(separator);
    }
    return String(value);
  }
  function deserialize(value) {
    if (Stringer_exports.isEmpty(value))
      return [];
    const result = [];
    let lastChar = "";
    let buffer = "";
    Array.from(value).forEach((c) => {
      if (c === separator && lastChar !== escapeChar) {
        result.push(decodeItem(buffer));
        buffer = "";
      } else {
        buffer += c;
      }
      lastChar = c;
    });
    result.push(decodeItem(buffer));
    return result;
  }
  function isMultiValue(el) {
    const type = Stringer_exports.trim(el.getAttribute("type")).toLowerCase();
    return type === "checkbox" || type === "listbox";
  }
  function arraysHaveSameItems(ar1, ar2) {
    const s1 = new Set(ar1);
    const s2 = new Set(ar2);
    if (s1.size !== s2.size)
      return false;
    for (const a of s1) {
      if (!s2.has(a))
        return false;
    }
    return true;
  }
  function isSameValue(v1, v2, isMultiValue2) {
    if (isMultiValue2) {
      return arraysHaveSameItems(v1, v2);
    }
    return v1 === v2;
  }
  function getValueAttr(el) {
    const value = el.getAttribute("value");
    if (isMultiValue(el)) {
      return deserialize(value);
    }
    return value;
  }
  function setValueAttr(el, value) {
    const isMulti = isMultiValue(el);
    if (isSameValue(getValueAttr(el), value, isMulti)) {
      return;
    }
    if (isMulti) {
      value = serialize(value);
    }
    el.setAttribute("value", value, true);
  }
  function getValueProp(el) {
    return el.wi.properties.value;
  }
  function setValueProp(el, value) {
    if (isMultiValue(el)) {
      value = deserialize(value);
      if (arraysHaveSameItems(getValueProp(el), value)) {
        return;
      }
    }
    el.wi.properties.value = value;
  }
  function overrideSetAttribute(el) {
    const oldSet = el.setAttribute.bind(el);
    el.setAttribute = function(name, value, ignoreProp) {
      if (name !== "value") {
        oldSet(name, value);
        return;
      }
      value = String(value);
      if (!ignoreProp) {
        setValueProp(el, value);
      }
      oldSet(name, value);
    };
  }

  // src/input-field.js
  function define(cssFilePath = "") {
    defineElement({
      nameWithDash: "input-field",
      html: (el) => {
        const atts = extractAttributes(el);
        el.validationRules = ValidationRules.createFromAttributes(atts);
        el.valueChangeListeners = [];
        overrideSetAttribute(el);
        return buildHtml(el, atts, cssFilePath);
      },
      propertyList: [
        {
          name: "value",
          sel: "input, select",
          onChange: (el, oldValue, newValue) => onValueChange(el, newValue)
        }
      ],
      eventHandlerList: [
        {
          sel: "label .tooltip",
          eventName: "click",
          listener: (ev, el) => {
            const tooltipText = Domer_exports.first("label .tooltip-text", el);
            tooltipText.classList.toggle("show");
          }
        },
        {
          sel: 'input:not([type="checkbox"]), select',
          eventName: "input",
          listener: (ev, el) => onValueChange(el, ev.target.value)
        },
        {
          sel: 'input[type="checkbox"]',
          eventName: "input",
          listener: (ev, el) => onValueChange(el, el.wi.properties.value)
        },
        {
          sel: "select.listbox.multiple option",
          eventName: "mousedown",
          listener: (ev, el) => {
            mousedownListener(ev, el);
            onValueChange(el, el.wi.properties.value);
          }
        }
      ],
      actionList: [
        {
          name: "addRule",
          action: function(name, message, validator) {
            const rule = new Rule(name, message, validator);
            if (!this.validationRules.add(rule))
              return;
            addRuleHtml(this, rule);
          }
        },
        {
          name: "getRuleValidState",
          action: function(name) {
            const rulesList = Domer_exports.first("footer ul.rules", this);
            const li = Domer_exports.first(`li.validation-${name}`, rulesList);
            if (li === null)
              return null;
            return !li.classList.contains("bad");
          }
        },
        {
          name: "setRuleValidState",
          action: function(name, isValid) {
            const rulesList = Domer_exports.first("footer ul.rules", this);
            const li = Domer_exports.first(`li.validation-${name}`, rulesList);
            Domer_exports.classPresentIf(li, "bad", !isValid);
            const input = Domer_exports.first(".input-field", this);
            const failedRules = Domer_exports.first("li.bad", rulesList);
            Domer_exports.classPresentIf(input, "bad", failedRules !== null);
          }
        },
        {
          name: "addValueChangeListener",
          action: function(valueChangeListener) {
            this.valueChangeListeners.push(valueChangeListener);
          }
        },
        {
          name: "_runValueChangeListeners",
          action: function(value) {
            const el = this;
            el.valueChangeListeners.forEach((listener) => {
              listener(el, value);
            });
          }
        },
        {
          name: "isValid",
          action: function() {
            const el = this;
            validate(el, el.wi.properties.value);
            const input = Domer_exports.first(".input-field", el);
            return !input.classList.contains("bad");
          }
        }
      ]
    });
  }
  function onValueChange(el, value) {
    setValueAttr(el, value);
    validate(el, value);
    el.wi.actions._runValueChangeListeners(value);
  }
  function extractAttributes(el) {
    const domAtts = Domer_exports.getAttributes(el);
    const atts = {};
    Objecter_exports.forEachEntry(domAtts, (k, v) => {
      atts[k.toLowerCase()] = v;
    });
    atts.showrules = extractShowRuleAttribute(atts);
    return atts;
  }
  function extractShowRuleAttribute(atts) {
    const showRules = Stringer_exports.trim(atts.showrules).toLowerCase();
    if (showRules === "false" || showRules === "onerror")
      return showRules;
    return "true";
  }
  function buildHtml(el, atts, cssFilePath) {
    const input = getInputHtml(el, atts);
    const values = {
      input,
      cssFile: buildCssLink(cssFilePath),
      label: atts.label,
      sublabel: getSublabel(atts),
      required: getAttr(atts, "required"),
      showrules: atts.showrules === "true" ? "" : "none",
      rules: el.validationRules.toHtml()
    };
    setTooltipParams(atts, values);
    return Stringer_exports.replaceTemplate(template, values, "{");
  }
  function getInputHtml(el, atts) {
    const type = getType2(atts);
    if (type === "radio")
      return contentToHtml(el);
    if (type === "checkbox")
      return contentToHtml2(el);
    if (type === "listbox")
      return contentToHtml3(el);
    return getHtml2(atts);
  }
  function getType2(atts) {
    const type = Stringer_exports.trim(atts.type).toLowerCase();
    if (!type)
      return "text";
    if (type === "integer")
      return "number";
    return type;
  }
  function buildCssLink(cssFilePath) {
    if (Stringer_exports.isEmpty(cssFilePath))
      return "";
    return `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;
  }
  function getSublabel(atts) {
    const sublabel = atts.sublabel;
    if (!sublabel)
      return "";
    return `<br>${sublabel}`;
  }
  function validate(el, value) {
    const rulesList = Domer_exports.first("footer ul.rules", el);
    let allValid = true;
    el.validationRules.validate(value, (isValid, name) => {
      const li = Domer_exports.first(`li.validation-${name}`, rulesList);
      Domer_exports.classPresentIf(li, "bad", !isValid);
      allValid = allValid && isValid;
    });
    showRulesOnError(el, rulesList, allValid);
    const input = Domer_exports.first(".input-field", el);
    Domer_exports.classPresentIf(input, "bad", !allValid);
  }
  function showRulesOnError(el, rulesList, allValid) {
    if (el.validationRules.showrules !== "onerror") {
      return;
    }
    const display = allValid ? "none" : "";
    rulesList.setAttribute("style", `display:${display};`);
  }
  function addRuleHtml(el, rule) {
    const rulesHtml = Domer_exports.first("footer ul.rules", el);
    Domer_exports.add(rulesHtml, rule.toHtml());
  }
  return __toCommonJS(input_field_exports);
})();
//# sourceMappingURL=input-field-script.js.map
