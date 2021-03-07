// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 0.1.0.
// Apache License Version 2.0


var InputField = (() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all2) => {
    for (var name in all2)
      __defProp(target, name, {get: all2[name], enumerable: true});
  };

  // src/input-field.js
  var input_field_exports = {};
  __export(input_field_exports, {
    define: () => define
  });

  // node_modules/@techexp/jshelper/dist/helper-esm.js
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all2) => {
    for (var name in all2)
      __defProp2(target, name, {get: all2[name], enumerable: true});
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
    isNil: () => isNil,
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
  var simpleTypes = new Set(["boolean", "number", "bigint", "string", "symbol"]);
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
  var LOCATIONS = new Set(["beforebegin", "afterbegin", "beforeend", "afterend"]);
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
    replaceTemplate: () => replaceTemplate,
    startsWith: () => startsWith,
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
  function replaceTemplate(text = "", values = {}, preTag = "${", postTag = "}") {
    forEachEntry(values, (k, v) => {
      if (v !== void 0) {
        k = preTag + k + postTag;
        text = text.replaceAll(k, v);
      }
    });
    return text;
  }

  // node_modules/@techexp/data-bind/dist/data-bind-module.js
  function bind({obj, prop, sel, attr, root, onChange}) {
    validateArgs(prop);
    obj = obj || {};
    const oldValue = obj.hasOwnProperty(prop) ? obj[prop] : void 0;
    root = root || document;
    const objNotBound = {};
    const descriptor = {
      get: () => getValue({prop, sel, attr, root, objNotBound}),
      set: (value) => setValue({prop, value, root, sel, attr, objNotBound, onChange}),
      configurable: true,
      enumerable: true
    };
    Object.defineProperty(obj, prop, descriptor);
    if (oldValue !== void 0) {
      console.info(`Property '${prop}' already exists in object. Will override previous definition but retain old value of ${oldValue}.`);
      obj[prop] = oldValue;
    }
    return obj;
  }
  var isCheckbox = (el) => el.type === "checkbox";
  var isRadio = (el) => el.type === "radio";
  var isSelect = (el) => el.tagName.toLowerCase() === "select";
  var isInput = (el) => "value" in el;
  var toSet = (v) => new Set(Array.isArray(v) ? v : [v]);
  function setValue({prop, value, root, sel, attr, objNotBound, onChange}) {
    fireChange({prop, value, root, sel, attr, objNotBound, onChange});
    if (sel) {
      setDomVal(root, sel, value, attr);
      return;
    }
    objNotBound[prop] = value;
  }
  function fireChange({prop, value, root, sel, attr, objNotBound, onChange}) {
    if (!onChange)
      return;
    const oldValue = getValue({prop, root, sel, attr, objNotBound});
    if (oldValue === value)
      return;
    onChange(oldValue, value);
  }
  function getValue({prop, root, sel, attr, objNotBound}) {
    if (sel)
      return getDomVal(root, sel, attr);
    return objNotBound[prop];
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
        addHtml(this, html, css, display);
        this.properties = bindProperties(this, propertyList);
        this.actions = defineActions(this, actionList);
        addEventListeners(this, eventHandlerList);
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
    bind({obj, prop: prop.name, sel: prop.sel, attr: prop.attr, root: root.shadowRoot, onChange});
    obj[prop.name] = prop.value;
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
      if (pair.name && pair.action) {
        actions[pair.name] = pair.action.bind(root);
      }
    });
    return actions;
  }
  function addEventListeners(root, eventHandlerList) {
    if (!eventHandlerList)
      return;
    if (!Array.isArray(eventHandlerList)) {
      throw "eventHandlerList must be an array of {sel, eventName, listener} objects";
    }
    eventHandlerList.forEach((h) => {
      const elements = Domer_exports.all(h.sel, root.shadowRoot);
      elements.forEach((el) => {
        el.addEventListener(h.eventName, (ev) => {
          h.listener(ev, root);
        });
      });
    });
  }
  function addHtml(root, html, css, display) {
    html = getHtml(root, html);
    const shadow = root.attachShadow({mode: "open"});
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

  // src/input-field-validation.js
  var ValidationRules = class {
    constructor(rules) {
      this.rules = [];
      this.add(...rules);
    }
    add(...rules) {
      rules = rules.filter((r) => !containsName(this.rules, r.name));
      if (rules.length === 0)
        return false;
      this.rules.push(...rules);
      return rules;
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
      Objecter_exports.forEachEntry(atts, (k, v) => {
        if (!Stringer_exports.isEmpty(v) && Objecter_exports.has(Rule, k)) {
          const msg = atts[k + "-message"];
          const rule = Rule[k](v, msg);
          rules.push(rule);
        }
      });
      return new ValidationRules(rules);
    }
  };
  function containsName(rules, name) {
    const found = rules.find((r) => r.name === name);
    return !!found;
  }
  var Rule = class {
    constructor(name = "", message, validator) {
      this.name = name.replace(/[ \\.]/g, "-").toLowerCase();
      this.message = message;
      this.validator = validator;
    }
    isValid(value) {
      return this.validator(String(value));
    }
    toHtml() {
      if (Stringer_exports.isEmpty(this.message))
        return "";
      return `<li class="validation-${this.name}">${this.message}</li>
`;
    }
    static createRule(name, message, validator, value) {
      message = message.replaceAll("%v", value);
      return new Rule(name, message, validator);
    }
    static required(flag, msg = "Required Field") {
      const validator = (value) => !!value;
      return new Rule("required", msg, validator);
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
  };

  // src/input-field.html
  var input_field_default = '${cssFile}\n\n<div class="input-field">\n  <label class="label ${required}" ${style-label}>${label}</label>\n  <input type="${type}" class="input" ${style-input} value=""\n         ${required} ${minlength} ${maxlength} ${pattern}>\n  <footer>\n    <ul class="rules" style="display:${showrules};">${rules}</ul>\n  </footer>\n</div>\n';

  // src/input-field.js
  function define(cssFilePath = "") {
    defineElement({
      nameWithDash: "input-field",
      html: (el) => {
        const atts = extractAttributes(el);
        el.validationRules = ValidationRules.createFromAttributes(atts);
        const h = buildHtml(atts, cssFilePath, el.validationRules);
        return h;
      },
      propertyList: [
        {
          name: "value",
          value: "",
          sel: "input",
          onChange: (el, oldValue, newValue) => validate(el, newValue)
        }
      ],
      eventHandlerList: [
        {
          sel: "input",
          eventName: "input",
          listener: (ev, el) => {
            const value = ev.target.value;
            validate(el, value);
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
        }
      ]
    });
  }
  function extractAttributes(el) {
    const domAtts = Domer_exports.getAttributes(el);
    const atts = {};
    Objecter_exports.forEachEntry(domAtts, (k, v) => {
      atts[k.toLowerCase()] = v;
    });
    const showRules = Stringer_exports.trim(atts.showrules).toLowerCase();
    atts.showrules = showRules === "" || showRules === "true";
    return atts;
  }
  function buildHtml(atts, cssFilePath, validationRules) {
    const values = {
      cssFile: buildCssLink(cssFilePath),
      label: atts.label,
      type: atts.type || "text",
      "style-label": getAttr(atts, "style-label", "style"),
      "style-input": getAttr(atts, "style-input", "style"),
      required: getAttr(atts, "required"),
      minlength: getAttr(atts, "minlength"),
      maxlength: getAttr(atts, "maxlength"),
      pattern: getAttr(atts, "pattern"),
      min: getAttr(atts, "min"),
      max: getAttr(atts, "max"),
      showrules: atts.showrules ? "" : "none",
      rules: validationRules.toHtml()
    };
    return Stringer_exports.replaceTemplate(input_field_default, values);
  }
  function buildCssLink(cssFilePath) {
    if (Stringer_exports.isEmpty(cssFilePath))
      return "";
    return `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`;
  }
  function getAttr(atts, attName, paramName = attName) {
    const value = atts[attName];
    if (value === "required")
      return value;
    if (value) {
      return ` ${paramName}="${value}"`;
    }
    return "";
  }
  function validate(el, value) {
    const rulesList = Domer_exports.first("footer ul.rules", el);
    let allValid = true;
    el.validationRules.validate(value, (isValid, name) => {
      const li = Domer_exports.first(`li.validation-${name}`, rulesList);
      Domer_exports.classPresentIf(li, "bad", !isValid);
      allValid = allValid && isValid;
    });
    const input = Domer_exports.first("input", el);
    Domer_exports.classPresentIf(input, "bad", !allValid);
  }
  function addRuleHtml(el, rule) {
    const rulesHtml = Domer_exports.first("footer ul.rules", el);
    Domer_exports.add(rulesHtml, rule.toHtml());
  }
  return input_field_exports;
})();
