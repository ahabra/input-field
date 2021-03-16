import {Stringer} from '@techexp/jshelper'
import {template} from './input.html.js'

const required = 'required'

export function getHtml(atts) {
  const params = {
    type: getType(atts),
    required: getAttr(atts, required),
    minlength: getAttr(atts, 'minlength'),
    maxlength: getAttr(atts, 'maxlength'),
    pattern: getAttr(atts, 'pattern'),
  }
  return Stringer.replaceTemplate(template, params, '{')
}

function getType(atts) {
  const type = Stringer.trim(atts.type).toLowerCase()
  if (!type) return 'text'
  if (type === 'integer') return 'number'

  return type
}

function getAttr(atts, attName) {
  const value = atts[attName]
  if (!value) return ''

  if (attName === required && value === required) return required
  return `${attName}="${value}"`
}