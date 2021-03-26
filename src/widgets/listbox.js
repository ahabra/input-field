import * as WidgetUtils from './WidgetUtils'
import {Domer, Stringer} from '@techexp/jshelper'

const templates = {
  select: '<select{name}{id}{size}{multiple} class="{widgetType}{multiple}">{options}</select>',
  group: '<optgroup label="{label}">{options}</optgroup>',
  option: '<option{disabled}{selected}{value}>{label}</option>'
}

export function contentToHtml(element) {
  if (!element) return ''
  return jsonToHtml(element.innerHTML)
}

export function jsonToHtml(json) {
  json = WidgetUtils.parseAndValidate(json, 'Listbox')
  if (!json) return ''

  const params = {
    name: json.name ? ` name="${json.name}"` : '',
    id: json.id ? ` id="${json.id}"` : '',
    size: json.size ? ` size="${json.size}"` : '',
    widgetType: getWidgetType(json),
    multiple: json.multiple ? ' multiple' : '',
    options: buildOptions(json.options)
  }
  return Stringer.replaceTemplate(templates.select, params, '{')
}

function getWidgetType({multiple, size}) {
  if (multiple || size > 1) return 'listbox'
  return 'combobox'
}

function buildOptionGroup(json) {
  const params = {
    label: json.label,
    options: buildOptions(json.options)
  }
  return Stringer.replaceTemplate(templates.group, params, '{')
}

function buildOptions(options) {
  if (!Array.isArray(options)) return ''

  const html = options.map(op => {
    if (op.options) return buildOptionGroup(op)
    return buildOption(op)
  })
  return html.join('\n')
}

function buildOption(option) {
  WidgetUtils.validateOption('Listbox', option)

  const value = option.value || option.label
  const params = {
    disabled: option.disabled ? ' disabled' : '',
    selected: option.selected ? ' selected' : '',
    label: option.label || option.value,
    value: ` value="${value}"`
  }
  return Stringer.replaceTemplate(templates.option, params, '{')
}

export function mousedownListener(ev, inputField) {
  ev.preventDefault()
  const select = Domer.first('select', inputField)
  const scrollTop = select.scrollTop

  toggleOptionSelected(ev.target)
  inputField.actions._runValueChangeListeners(ev.target.value)

  setTimeout(()=> { select.scrollTop = scrollTop })
}

function toggleOptionSelected(option) {
  option.selected = !option.selected
  option.parentElement.focus()
}