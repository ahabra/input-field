import {Objecter, Stringer} from '@techexp/jshelper'
import {template} from './radio.html.js'

export function contentToHtml(element) {
  if (!element) return ''

  return jsonToHtml(element.innerHTML)
}

export function jsonToHtml(json) {
  if (!validateJsonString(json)) return ''
  json = JSON.parse(json)
  if (!validateJsonObject(json)) return ''

  const buttons = buildRadioButtons(json)
  return `\n<div class="radio-buttons">\n${buttons}\n</div>\n`
}

function buildRadioButtons(json) {
  const name = json.name
  const sep = json.flow === 'vertical' ? '<br>\n' : '\n'
  return json.options.map(op => buildOneRadioButton(name, op)).join(sep)
}

function validateJsonString(json) {
  if (!Objecter.isString(json)) return false
  if (Stringer.isEmpty(json)) return false
  json = json.trim()
  return json.length !== 0
}

function validateJsonObject(json) {
  if (!Array.isArray(json.options)) return false
  if (json.options.length === 0) return false

  if (!Objecter.has(json, 'name')) {
    throw 'Radio definition requires a name attribute'
  }
  return true
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