import {Stringer} from '@techexp/jshelper'
import * as WidgetUtils from './WidgetUtils'

const template = `
<label class="radio">
  <input type="radio" name="{name}" {id} value="{value}" class="{css-class}"{checked}>
  <span class="radio-label">{label}</span>
</label>
`

export function contentToHtml(element, atts) {
  if (!element) return ''

  return jsonToHtml(element.innerHTML, atts)
}

export function jsonToHtml(json, atts) {
  json = WidgetUtils.parseAndValidate(json, 'Radio', 'name')
  if (!json) return ''

  const buttons = buildRadioButtons(json, atts)
  return `\n<div class="radio-buttons">\n${buttons}\n</div>\n`
}

function buildRadioButtons(json, atts) {
  const name = json.name
  const sep = json.flow === 'vertical' ? '<br>\n' : '\n'
  return json.options.map(op => buildOneRadioButton(name, op, atts)).join(sep)
}

function buildOneRadioButton(name, option, atts) {
  WidgetUtils.validateOption('Radio', option)

  const params = {
    name,
    checked: option.checked ? ' checked' : '',
    id: option.id ? `id="${option.id}"` : '',
    value: option.value || option.label,
    label: option.label || option.value,
    'css-class': WidgetUtils.getCssClass(atts),
  }

  return Stringer.replaceTemplate(template.trim(), params, '{')
}
