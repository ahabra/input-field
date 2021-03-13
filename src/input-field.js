import * as webitem from '@techexp/webitem'
import {Domer, Objecter, Stringer} from '@techexp/jshelper'

import {ValidationRules, Rule} from './input-field-validation'
import template from './input-field.html'

/**
 * Define a responsive input field with its label.
 * You can control the field with the following attributes:
 * type: String. Optional. "text", "password", "email", or "set".
 *    Default is "text"
 * label: String
 * sublabel: String
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
 *    Default is "Maximum value of %v".
 * number-message: Optional. The message to show when the value must be a number.
 * integer-message: Optional. The message to show when the value must be an integer.
 * showrules: Boolean. Default is true. Show or hide validation rules.
 * tooltip: A string to show if the user clicks on the label.
 * options: A comma separated list of options used with set type
 * set-message: Optional. The message to show when there is a set of options.
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
      const atts = extractAttributes(el)
      el.validationRules = ValidationRules.createFromAttributes(atts)
      return buildHtml(atts, cssFilePath, el.validationRules)
    },

    propertyList: [
      { name: 'value', value: '', sel: 'input',
        onChange: (el, oldValue, newValue) => validate(el, newValue) }
    ],

    eventHandlerList: [
      {
        sel: 'input',
        eventName: 'input',
        listener: (ev, el) => {
          const value = ev.target.value
          validate(el, value)
        }
      },
      {
        sel: 'label .tooltip',
        eventName: 'click',
        listener: (ev, el) => {
          const tooltipText = Domer.first('label .tooltip-text', el)
          tooltipText.classList.toggle('show')
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
function extractAttributes(el) {
  const domAtts = Domer.getAttributes(el)
  const atts = {}
  Objecter.forEachEntry(domAtts, (k, v) => {
    atts[k.toLowerCase()] = v
  })
  const showRules = Stringer.trim(atts.showrules).toLowerCase()
  atts.showrules = showRules === '' || showRules === 'true'

  return atts
}

function buildHtml(atts, cssFilePath, validationRules) {
  const values = {
    cssFile: buildCssLink(cssFilePath),
    label: atts.label,
    sublabel: getSublabel(atts),
    type: getType(atts),
    required: getAttr(atts, 'required'),
    minlength: getAttr(atts, 'minlength'),
    maxlength: getAttr(atts, 'maxlength'),
    pattern: getAttr(atts, 'pattern'),
    min: getAttr(atts, 'min'),
    max: getAttr(atts, 'max'),
    showrules: atts.showrules ? '' : 'none',
    rules: validationRules.toHtml()
  }
  setTooltipValues(atts, values)
  return Stringer.replaceTemplate(template, values)
}

function getType(atts) {
  const type = Stringer.trim(atts.type).toLowerCase()
  if (!type) return 'text'
  if (type === 'integer') return 'number'

  return type
}

function buildCssLink(cssFilePath) {
  if (Stringer.isEmpty(cssFilePath)) return ''
  return `<link rel="stylesheet" type="text/css" href="${cssFilePath}">`
}

function getSublabel(atts) {
  const sublabel = atts.sublabel
  if (!sublabel) return ''
  return `<br>${sublabel}`
}

function setTooltipValues(atts, values) {
  const tooltip = atts.tooltip
  if (tooltip) {
    values.tooltip = 'tooltip'
    values.tooltipIcon = '<span class="circle">?</span>'
    values.tooltipText = tooltip
  } else {
    values.tooltip = ''
    values.tooltipIcon = ''
    values.tooltipText = ''
  }
}

function getAttr(atts, attName) {
  const value = atts[attName]
  if (!value) return ''

  if (value === 'required') return value

  return ` ${attName}="${value}"`
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

