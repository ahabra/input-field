import {Stringer} from '@techexp/jshelper'
import * as WidgetUtils from './WidgetUtils'

const template = `
<label class="checkbox">
  <input type="checkbox" {name} {id} value="{value}"{checked}>
  <span class="checkbox-label">{label}</span>
</label>
`

export function contentToHtml(element) {
  if (!element) return ''

  return jsonToHtml(element.innerHTML)
}

export function jsonToHtml(json) {
  json = WidgetUtils.parseAndVaslidate(json, 'Checkbox')
  if (!json) return ''

  const buttons = buildCheckboxButtons(json)
  return `\n<div class="checkbox-buttons">\n${buttons}\n</div>\n`
}

function buildCheckboxButtons(json) {
  const sep = json.flow === 'vertical' ? '<br>\n' : '\n'
  return json.options.map(op => buildOneCheckboxButton(op)).join(sep)
}

function buildOneCheckboxButton(option) {
  validateOption(option)

  const params = {
    name: option.name ? `name="${option.name}"` : '',
    checked: option.checked ? ' checked' : '',
    id: option.id ? `id="${option.id}"` : '',
    value: option.value || option.label,
    label: option.label || option.value
  }

  return Stringer.replaceTemplate(template.trim(), params, '{')
}

function validateOption({label, value}) {
  if (label === undefined && value === undefined) {
    throw 'Checkbox button definition requires at least a label or value'
  }
}