import {Stringer} from '@techexp/jshelper'
import {template} from './radio.html.js'
import * as WidgetUtils from './WidgetUtils'

export function contentToHtml(element) {
  if (!element) return ''

  return jsonToHtml(element.innerHTML)
}

export function jsonToHtml(json) {
  json = WidgetUtils.parseAndVaslidate(json, 'Radio', 'name')
  if (!json) return ''

  const buttons = buildRadioButtons(json)
  return `\n<div class="radio-buttons">\n${buttons}\n</div>\n`
}

function buildRadioButtons(json) {
  const name = json.name
  const sep = json.flow === 'vertical' ? '<br>\n' : '\n'
  return json.options.map(op => buildOneRadioButton(name, op)).join(sep)
}

function buildOneRadioButton(name, option) {
  validateOption(option)

  const params = {
    name,
    checked: option.checked ? ' checked' : '',
    id: option.id ? `id="${option.id}"` : '',
    value: option.value || option.label,
    label: option.label || option.value
  }

  return Stringer.replaceTemplate(template.trim(), params, '{')
}

function validateOption({label, value}) {
  if (label === undefined && value === undefined) {
    throw 'Radio button definition requires at least a label or value'
  }
}