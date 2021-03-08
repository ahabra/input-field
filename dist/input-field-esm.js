// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 0.2.1.
// Apache License Version 2.0


// node_modules/@techexp/webitem/dist/webitem-esm.js
import {Domer, Objecter, Stringer} from "@techexp/jshelper";

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
    const elements = Domer.all(h.sel, root.shadowRoot);
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
  const nodes = Domer.createElements(getCss(css, display) + html);
  shadow.append(...nodes);
}
function getHtml(root, html) {
  return Objecter.isFunction(html) ? html(root) : html;
}
function getCss(css, display) {
  return displayStyle(display) + buildCss(css);
}
function buildCss(css) {
  css = Stringer.trim(css);
  if (css.length === 0)
    return "";
  if (!Stringer.startsWith(css, "<style>", false)) {
    css = Domer.tag("style", {}, css);
  }
  return css;
}
function displayStyle(display) {
  display = Stringer.trim(display);
  if (display.length === 0)
    return "";
  return `
  <style>
    :host { display: ${display};}
    :host([hidden]) {display: none;}
  </style>
  `;
}

// src/input-field.js
import {Domer as Domer2, Objecter as Objecter3, Stringer as Stringer3} from "@techexp/jshelper";

// src/input-field-validation.js
import {Objecter as Objecter2, Stringer as Stringer2} from "@techexp/jshelper";
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
    Objecter2.forEachEntry(atts, (k, v) => {
      if (!Stringer2.isEmpty(v) && Objecter2.has(Rule, k)) {
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
    if (Stringer2.isEmpty(this.message))
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
  const domAtts = Domer2.getAttributes(el);
  const atts = {};
  Objecter3.forEachEntry(domAtts, (k, v) => {
    atts[k.toLowerCase()] = v;
  });
  const showRules = Stringer3.trim(atts.showrules).toLowerCase();
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
  return Stringer3.replaceTemplate(input_field_default, values);
}
function buildCssLink(cssFilePath) {
  if (Stringer3.isEmpty(cssFilePath))
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
  const rulesList = Domer2.first("footer ul.rules", el);
  let allValid = true;
  el.validationRules.validate(value, (isValid, name) => {
    const li = Domer2.first(`li.validation-${name}`, rulesList);
    Domer2.classPresentIf(li, "bad", !isValid);
    allValid = allValid && isValid;
  });
  const input = Domer2.first("input", el);
  Domer2.classPresentIf(input, "bad", !allValid);
}
function addRuleHtml(el, rule) {
  const rulesHtml = Domer2.first("footer ul.rules", el);
  Domer2.add(rulesHtml, rule.toHtml());
}
export {
  define
};
