import * as webitem from '@techexp/webitem'
import {Domer, Objecter, Stringer} from '@techexp/jshelper'

import * as Validation from './input-field-validation'
import template from './input-field.html'
import css from './input-field.tcss'


export function define(messages = {}) {
  let validationRules

  webitem.defineElement({
    nameWithDash: 'input-field',
    css,  // FIXME allow override
    html: el => {
      const atts = getAttributes(el)
      validationRules = Validation.createRulesFromAttributes(atts, messages)
      return buildHtml(atts, validationRules)
    },
    propertyList: [
      {name: 'value', value: '', sel: 'input', attr: 'value'}
    ],
    eventHandlerList: [
      {
        sel: 'input',
        eventName: 'input',
        listener: (ev, el) => {
          const value = ev.target.value
          validate(el, value, validationRules)
        }
      }
    ],
    actionList: [
      {
        name: 'addRule',
        action: function(name, message, validator) {
          const rule = new Validation.Rule(name, message, validator)
          if (!validationRules.add(rule)) return

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

function buildHtml(atts, validationRules) {
  const values = {
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


function getAttr(atts, attName, paramName = attName) {
  const value = atts[attName]
  if (value === 'required') return value

  if (value) {
    return ` ${paramName}="${value}"`
  }
  return ''
}

function validate(el, value, validationRules) {
  const rulesList = Domer.first('footer ul.rules', el)
  let allValid = true
  validationRules.validate(value, (isValid, name) => {
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

