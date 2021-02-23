// input-field Web Component. Responsive input field with label and validation
// https://github.com/ahabra/input-field
// Copyright 2021 (C) Abdul Habra. Version 0.0.1.
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
import {Domer as Domer2, Stringer as Stringer2} from "@techexp/jshelper";

// src/input-field-validation.js
var ValidationRules = class {
  constructor() {
    this.rules = [];
  }
  add(rule) {
    if (!rule || containsName(this.rules, rule.name))
      return false;
    this.rules.push(rule);
    return true;
  }
  addRule(name, message, validator) {
    return this.add(new Rule(name, message, validator));
  }
  validate(value, onValidation) {
    this.rules.forEach((r) => {
      const isValid = r.isValid(value);
      onValidation(isValid, r.name);
    });
  }
};
function containsName(rules, name) {
  const found = rules.find((r) => r.name === name);
  return !!found;
}
var Rule = class {
  constructor(name, message, validator) {
    this.name = name;
    this.message = message;
    this.validator = validator;
  }
  isValid(value) {
    return this.validator(value);
  }
};
var basicRules = {
  required: () => {
    const validator = (value) => !!value;
    return new Rule("required", "Required Field", validator);
  },
  minlength: (minLength) => {
    const validator = (value) => {
      const len = value ? value.length : 0;
      return len >= minLength;
    };
    const msg = "Minimum Length is " + minLength;
    return new Rule("minlength", msg, validator);
  },
  pattern: (pattern) => {
    const validator = (value) => {
      const regex = new RegExp(pattern);
      return regex.test(value);
    };
    const msg = "Must satisfy the pattern " + pattern;
    return new Rule("pattern", msg, validator);
  },
  min: (minValue) => {
    minValue = Number(minValue) || 0;
    const validator = (value) => {
      value = Number(value) || 0;
      return value >= minValue;
    };
    const msg = "Minimum value of " + minValue;
    return new Rule("min", msg, validator);
  },
  max: (maxValue) => {
    maxValue = Number(maxValue) || 0;
    const validator = (value) => {
      value = Number(value) || 0;
      return value <= maxValue;
    };
    const msg = "Maximum value of " + maxValue;
    return new Rule("max", msg, validator);
  }
};
function getBasicRule(name, formula) {
  if (!formula)
    return false;
  const func = basicRules[name];
  if (!func)
    return false;
  return func(formula);
}

// src/input-field.html
var input_field_default = '<!--<link rel="stylesheet" href="assets/css/input-field.css">-->\n\n<div class="input-field">\n  <label class="label ${required}" ${style-label}>${label}</label>\n  <input type="${type}" class="input" ${style-input}\n         ${required} ${minlength} ${maxlength} ${pattern} ${min} ${max}>\n  <footer>\n    <ul class="rules">${rules}</ul>\n  </footer>\n</div>\n';

// src/input-field.tcss
var input_field_default2 = '/* This file uses vars defined in moose-vars.css */\n\n.input-field {\n  --width-label: 10em;\n  --width-input: calc(100% - var(--width-label) - 4em);\n  --footer-padding-left: calc(var(--width-label) + 1em);\n  --footer-font-size: 0.9em;\n  --required-marker: " *";\n\n  --color-normal: green;\n  --color-dark: darkgreen;\n  --color-light: lightgreen;\n  --color-bad: red;\n  --input-color: DarkSlateGray;\n  --input-background-image-focus: linear-gradient(to right, var(--color-light), white);\n  --input-background-color-bad: LavenderBlush;\n  --input-border-color-bad: var(--color-bad);\n  --input-background-image-bad: linear-gradient(to right, var(--input-background-color-bad), white);\n  --input-background-image-focus-bad: linear-gradient(to right, var(--input-background-color-bad), var(--color-light), white);\n}\n\n.input-field label {\n  display: inline-block;\n  width: var(--width-label);\n  text-align: right;\n  margin: 0.4em 0.2em 0.1em 0.4em;\n\n  color: var(--color-dark, darkgreen);\n  font-weight: bold;\n}\n\n.input-field label.required:after {\n  content: var(--required-marker);\n  color: var(--color-normal);\n}\n\n\n.input-field input {\n  width: var(--width-input);\n  margin: 0.4em 0.4em 0.1em 0.2em;\n\n  background-color: white;\n  border-radius: 4px;\n  border: 1px solid #dbdbdb;\n  height: 1.5em;\n  padding: 0.5em 0.7em;\n  font-size: 1rem;\n\n  color: var(--input-color, dimgray)\n}\n\n.input-field input:focus {\n  background-image: var(--input-background-image-focus)\n}\n\n.input-field input.bad {\n  border-color: var(--input-border-color-bad, red);\n  background-image: var(--input-background-image-bad);\n}\n\n\n.input-field input.bad:focus {\n  border-color: var(--input-border-color-bad, red);\n  background-image: var(--input-background-image-focus-bad);\n  outline: none;\n}\n\n.input-field footer {\n  padding-left: var(--footer-padding-left);\n  margin-bottom: 1em;\n  font-size: var(--footer-font-size);\n}\n\n.input-field footer ul {\n  margin: 0.5em 0;\n}\n\n.input-field footer ul.rules li.bad {\n  color: var(--color-bad);\n}\n\n@media screen and (max-width: 600px) {\n  .input-field label {\n    display: block;\n    text-align: left;\n    margin-bottom: 0.1em;\n    margin-left: 1.2em;\n  }\n\n  .input-field input {\n    margin-top: 0.1em;\n    width: 80%;\n    margin-left: 1em;\n  }\n\n  .input-field footer {\n    padding-left: 1em;\n  }\n\n  .input-field footer ul {\n    padding-left: 2em;\n  }\n}';

// src/input-field.js
function define() {
  let validationRules;
  defineElement({
    nameWithDash: "input-field",
    css: input_field_default2,
    html: (el) => {
      const atts = Domer2.getAttributes(el);
      validationRules = createInitialValidationRules(atts);
      return buildHtml(atts, validationRules);
    },
    propertyList: [
      {name: "value", value: "", sel: "input", attr: "value"}
    ],
    eventHandlerList: [
      {
        sel: "input",
        eventName: "input",
        listener: (ev, el) => {
          const value = ev.target.value;
          validate(el, value, validationRules);
        }
      }
    ],
    actionList: [
      {
        name: "addRule",
        action: function(name, message, validator) {
          name = normalizeName(name);
          if (!validationRules.addRule(name, message, validator))
            return;
          addRuleHtml(this, name, message);
        }
      }
    ]
  });
}
function addRuleHtml(el, name, message) {
  const html = buildRuleHtml(name, message);
  const rulesHtml = Domer2.first("footer ul.rules", el);
  Domer2.add(rulesHtml, html);
}
function createInitialValidationRules(atts) {
  const rulesNames = ["required", "minlength", "pattern", "min", "max"];
  const validationRules = new ValidationRules();
  const basicRules2 = rulesNames.map((rn) => getBasicRule(rn, atts[rn]));
  basicRules2.forEach((br) => validationRules.add(br));
  return validationRules;
}
function buildHtml(atts, validationRules) {
  const values = {
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
    rules: buildInitialValidationRulesHtml(validationRules)
  };
  return Stringer2.replaceTemplate(input_field_default, values);
}
function buildInitialValidationRulesHtml(validationRules) {
  return validationRules.rules.map((r) => buildRuleHtml(r.name, r.message)).join("");
}
function buildRuleHtml(name, message) {
  return `<li class="validation-${name}">${message}</li>
`;
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
function validate(el, value, validationRules) {
  const rulesList = Domer2.first("footer ul.rules", el);
  let allValid = true;
  validationRules.validate(value, (isValid, name) => {
    const li = Domer2.first(`li.validation-${name}`, rulesList);
    Domer2.classPresentIf(li, "bad", !isValid);
    allValid = allValid && isValid;
  });
  const input = Domer2.first("input", el);
  Domer2.classPresentIf(input, "bad", !allValid);
}
function normalizeName(name = "") {
  return name.replace(/[ \\.]/g, "-");
}
export {
  define
};
