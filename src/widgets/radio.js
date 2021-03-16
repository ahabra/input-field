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

  const html = json.options.map(op => buildOneRadioButton(json.name, op))
  return html.join('\n')
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
  const params = {
    name,
    id: option.id,
    value: option.value,
    checked: option.checked ? ' checked' : '',
    label: option.label
  }
  return Stringer.replaceTemplate(template, params, '{')
}

