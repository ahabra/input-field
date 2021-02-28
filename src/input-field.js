import * as webitem from '@techexp/webitem'
import {Domer, Objecter, Stringer} from '@techexp/jshelper'

import {ValidationRules, Rule} from './input-field-validation'
import template from './input-field.html'

/**
 * Define a responsive input field with its label.
 * You can control the field with the following attributes:
 * required: is the field required. The value should be "required"
 * required-message: Optional. The message to show for required fields. Default is "Required Field"
 * minlength: Integer. The minimum number of characters.
 * minlength-message: Optional. The message to show when there is minlength.
 *    Default is "Minimum Length is %v"
 * maxlength: Integer. Maximum number of characters. The component will prevent entering more.
 * pattern: RegEx string. The input must match given regex.
 * pattern-message: Optional. The message to show when there is a pattern requirement.
 *    Default is "Must satisfy the pattern %v"
 * min: Number. Minimum acceptable numeric value.
 * min-message: Optional. The message to show when there is a min requirement.
 *    Default is "Minimum value of %v"
 * max: Number. Maximum acceptable numeric value.
 * max-message: Optional. The message to show when there is a max requirement.
 *    Default is "Maximum value of %v"
 *
 * Additionally, you can add custom validation rules to the component using:
 *
 * element.actions.addRule(name, message, validator)
 * Where validator is a function that takes the current value and returns a boolean.
 *
 * @param cssFilePath The path to a CSS file containing the input-field styles.
 *    Please use the provided input-field.css and customize it as needed.
 */
export function define(cssFilePath = '') {

  webitem.defineElement({
    nameWithDash: 'input-field',
    html: el => {
      const atts = getAttributes(el)
      el.validationRules = ValidationRules.createFromAttributes(atts)
      return buildHtml(atts, cssFilePath, el.validationRules)
    },

    propertyList: [
      { name: 'value', value: '', sel: 'input',
        onChange: (el, oldValue, newValue) => validate(el, newValue) },
      { name: 'isShowRules', value: true,
        onChange: (el, oldValue, newValue) => {
          const rulesList = Domer.first('footer ul.rules', el)
          newValue = newValue === true || newValue === 'true'
          rulesList.style.display = newValue === true ? '' : 'none'
        }
      }
    ],

    eventHandlerList: [
      {
        sel: 'input',
        eventName: 'input',
        listener: (ev, el) => {
          const value = ev.target.value
          validate(el, value)
        }
      }
    ],

    actionList: [
      {
        name: 'addRule',
        action: function(name, message, validator) {
          const rule = new Rule(name, message, validator)
          if (!this.validationRules.add(rule)) return

          addRuleHtml(this, rule)
        }
      }
    ]

  })
}

// Make sure attributes names are all lower case
function getAttributes(el) {
  const domAtts = Domer.getAttributes(el)
  const atts = {}
  Objecter.forEachEntry(domAtts, (k, v) => {
    atts[k.toLowerCase()] = v
  })
  return atts
}

function buildHtml(atts, cssFilePath, validationRules) {
  const values = {
    cssFile: buildCssLink(cssFilePath),
    label: atts.label,
    type: atts.type || 'text',
    'style-label': getAttr(atts, 'style-label', 'style'),
    'style-input': getAttr(atts, 'style-input', 'style'),
    required: getAttr(atts, 'required'),
    minlength: getAttr(atts, 'minlength'),
    maxlength: getAttr(atts, 'maxlength'),
    pattern: getAttr(atts, 'pattern'),
    min: getAttr(atts, 'min'),
    max: getAttr(atts, 'max'),
    rules: validationRules.toHtml()
  }
  return Stringer.replaceTemplate(template, values)
}

function buildCssLink(cssFilePath) {
  if (Stringer.isEmpty(cssFilePath)) return ''
  return `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`
}

function getAttr(atts, attName, paramName = attName) {
  const value = atts[attName]
  if (value === 'required') return value

  if (value) {
    return ` ${paramName}="${value}"`
  }
  return ''
}

function validate(el, value) {
  const rulesList = Domer.first('footer ul.rules', el)
  let allValid = true
  el.validationRules.validate(value, (isValid, name) => {
    const li = Domer.first(`li.validation-${name}`, rulesList)
    Domer.classPresentIf(li, 'bad', !isValid)
    allValid = allValid && isValid
  })

  const input = Domer.first('input', el)
  Domer.classPresentIf(input, 'bad', !allValid)
}

function addRuleHtml(el, rule) {
  const rulesHtml = Domer.first('footer ul.rules', el)
  Domer.add(rulesHtml, rule.toHtml())
}

