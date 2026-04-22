import {Stringer} from '@techexp/jshelper'
import * as WidgetUtils from './WidgetUtils'

const template = `
<label class="checkbox">
  <input type="checkbox" {name} {id} value="{value}"{checked} class="{css-class}"{extra}>
  <span class="checkbox-label">{label}</span>
</label>
`

export function contentToHtml(element, atts) {
  if (!element) return ''

  return jsonToHtml(element.innerHTML, atts)
}

export function jsonToHtml(json, atts) {
  json = WidgetUtils.parseAndValidate(json, 'Checkbox')
  if (!json) return ''

  const buttons = buildCheckboxButtons(json, atts)
  return `\n<div class="checkbox-buttons">\n${buttons}\n</div>\n`
}

function buildCheckboxButtons(json, atts) {
  const sep = json.flow === 'vertical' ? '<br>\n' : '\n'
  return json.options.map(op => buildOneCheckboxButton(op, atts)).join(sep)
}

function buildOneCheckboxButton(option, atts) {
  WidgetUtils.validateOption('Checkbox', option)

  const params = {
    name: option.name ? `name="${option.name}"` : '',
    checked: option.checked ? ' checked' : '',
    id: option.id ? `id="${option.id}"` : '',
    value: option.value || option.label,
    label: option.label || option.value,
    'css-class': WidgetUtils.getCssClass(atts),
    extra: WidgetUtils.extractAttrs(atts, 'name', 'id', 'value', 'checked', 'css-class'),
  }

  return Stringer.replaceTemplate(template.trim(), params, '{')
}
