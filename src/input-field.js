import * as webitem from '@techexp/webitem'
import {Domer, Stringer} from '@techexp/jshelper'

import * as Validation from './input-field-validation'
import template from './input-field.html'
import css from './input-field.tcss'

// TODO allow message override

export function define() {
  let validationRules

  webitem.defineElement({
    nameWithDash: 'input-field',
    css,  // FIXME allow override
    html: el => {
      const atts = Domer.getAttributes(el)
      validationRules = createInitialValidationRules(atts)
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
          name = normalizeName(name)
          if (!validationRules.addRule(name, message, validator)) return

          addRuleHtml(this, name, message)
        }
      }
    ]

  })
}

function addRuleHtml(el, name, message) {
  const html = buildRuleHtml(name, message)
  const rulesHtml = Domer.first('footer ul.rules', el)
  Domer.add(rulesHtml, html)
}

function createInitialValidationRules(atts) {
  const rulesNames = ['required', 'minlength', 'pattern', 'min', 'max']
  const validationRules = new Validation.ValidationRules()
  const basicRules = rulesNames.map(rn => Validation.getBasicRule(rn, atts[rn]))
  basicRules.forEach(br => validationRules.add(br))

  return validationRules
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
    rules: buildInitialValidationRulesHtml(validationRules)
  }
  return Stringer.replaceTemplate(template, values)
}

function buildInitialValidationRulesHtml(validationRules) {
  return validationRules.rules.map(r => buildRuleHtml(r.name, r.message)).join('')
}

function buildRuleHtml(name, message) {
  return `<li class="validation-${name}">${message}</li>\n`
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

function normalizeName(name = '') {
  return name.replace(/[ \\.]/g, '-')
}

