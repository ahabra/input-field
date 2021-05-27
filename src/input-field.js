import * as webitem from '@techexp/webitem'
import {Domer, Objecter, Stringer} from '@techexp/jshelper'

import {ValidationRules} from './validation/ValidationRules'
import {Rule} from './validation/Rule'

import template from './input-field.html'
import * as Input from './widgets/input'
import * as Radio from './widgets/radio'
import * as Checkbox from './widgets/checkbox'
import * as Listbox from './widgets/listbox'
import {setTooltipParams} from './widgets/tooltip'
import * as ValueUtils from './widgets/ValueUtils'

/**
 * Define a responsive input field with its label.
 * You can control the field with the following attributes:
 * type: String. Optional. "text", "password", "email", "set", "radio",
 *    "checkbox", "listbox". Default is "text".
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
 * element.wi.actions.addRule(name, message, validator)
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
      el.valueChangeListeners = []
      overrideSetAttribute(el)
      return buildHtml(el, atts, cssFilePath)
    },

    propertyList: [
      { name: 'value', sel: 'input, select',
        onChange: (el, oldValue, newValue) => onValueChange(el, newValue)
      }
    ],

    eventHandlerList: [
      {
        sel: 'input, select',
        eventName: 'input',
        listener: (ev, el) => onValueChange(el, ev.target.value)
      },
      {
        sel: 'label .tooltip',
        eventName: 'click',
        listener: (ev, el) => {
          const tooltipText = Domer.first('label .tooltip-text', el)
          tooltipText.classList.toggle('show')
        }
      },
      {
        sel: 'select.listbox.multiple option',
        eventName: 'mousedown',
        listener: (ev, el) => Listbox.mousedownListener(ev, el)
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
      },
      {
        name: 'getRuleValidState',
        action: function(name) {
          const rulesList = Domer.first('footer ul.rules', this)
          const li = Domer.first(`li.validation-${name}`, rulesList)
          if (li === null) return null

          return !li.classList.contains('bad')
        }
      },
      {
        name: 'setRuleValidState',
        action: function(name, isValid) {
          const rulesList = Domer.first('footer ul.rules', this)
          const li = Domer.first(`li.validation-${name}`, rulesList)
          Domer.classPresentIf(li, 'bad', !isValid)

          const input = Domer.first('input', this)
          const failedRules = Domer.first('li.bad', rulesList)
          Domer.classPresentIf(input, 'bad', failedRules !== null)
        }
      },
      {
        name: 'addValueChangeListener',
        action: function(valueChangeListener) {
          this.valueChangeListeners.push(valueChangeListener)
        }
      },
      {
        name: '_runValueChangeListeners',
        action: function(value) {
          const el = this
          el.valueChangeListeners.forEach( listener => {
            listener(el, value)
          })
        }
      }
    ]

  })
}


function onValueChange(el, value) {
  ValueUtils.setValueAttr(el, value, true)

  validate(el, value)
  el.wi.actions._runValueChangeListeners(value)
}

/** when the value attribute changes, change the property as well */
function overrideSetAttribute(el) {
  const oldSet = el.setAttribute.bind(el)

  el.setAttribute = function(name, value, ignoreProp) {
    if (name !== 'value') {
      oldSet(name, value)
      return
    }

    value = String(value)
    if (!ignoreProp) {
      ValueUtils.setValueProp(el, value)
    }

    oldSet(name, value)
  }

}


/** Make sure attributes names are all lower case */
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

function buildHtml(el, atts, cssFilePath) {
  const input = getInputHtml(el, atts)

  const values = {
    input,
    cssFile: buildCssLink(cssFilePath),
    label: atts.label,
    sublabel: getSublabel(atts),
    required: getAttr(atts, 'required'),
    showrules: atts.showrules ? '' : 'none',
    rules: el.validationRules.toHtml()
  }
  setTooltipParams(atts, values)
  return Stringer.replaceTemplate(template, values)
}

function getInputHtml(el, atts) {
  const type = getType(atts)
  if (type === 'radio') return Radio.contentToHtml(el)
  if (type === 'checkbox') return Checkbox.contentToHtml(el)
  if (type === 'listbox') return Listbox.contentToHtml(el)

  return Input.getHtml(atts)
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

