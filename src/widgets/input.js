import {Stringer} from '@techexp/jshelper'
import * as WidgetUtils from './WidgetUtils'

const template = `
 <input type="{type}" class="input" value="{value}"
  {required} {minlength} {maxlength} {pattern}>
`
const required = 'required'

export function getHtml(atts) {
  const params = {
    type: getType(atts),
    required: WidgetUtils.getAttr(atts, required),
    minlength: WidgetUtils.getAttr(atts, 'minlength'),
    maxlength: WidgetUtils.getAttr(atts, 'maxlength'),
    pattern: WidgetUtils.getAttr(atts, 'pattern'),
    value: atts.value || ''
  }
  return Stringer.replaceTemplate(template, params, '{')
}

function getType(atts) {
  const type = Stringer.trim(atts.type).toLowerCase()
  if (!type) return 'text'
  if (type === 'integer') return 'number'

  return type
}
