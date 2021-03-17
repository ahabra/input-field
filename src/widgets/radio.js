import {Stringer} from '@techexp/jshelper'
import * as WidgetUtils from './WidgetUtils'

const template = `
<label class="radio">
  <input type="radio" name="{name}" {id} value="{value}"{checked}>
  <span class="radio-label">{label}</span>
</label>
`

export function contentToHtml(element) {
  if (!element) return ''

  return jsonToHtml(element.innerHTML)
}

export function jsonToHtml(json) {
  json = WidgetUtils.parseAndValidate(json, 'Radio', 'name')
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
  WidgetUtils.validateOption('Radio', option)

  const params = {
    name,
    checked: option.checked ? ' checked' : '',
    id: option.id ? `id="${option.id}"` : '',
    value: option.value || option.label,
    label: option.label || option.value
  }

  return Stringer.replaceTemplate(template.trim(), params, '{')
}
