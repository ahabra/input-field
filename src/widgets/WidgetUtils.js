import {Objecter, Stringer} from '@techexp/jshelper'

export function parseAndValidate(json, widgetType, ...required) {
  if (!validateString(json)) return false
  json = JSON.parse(json)
  if (!validateJsonObject(json, widgetType, ...required)) return false

  return json
}

function validateString(json) {
  if (!Objecter.isString(json)) return false
  if (Stringer.isEmpty(json)) return false
  json = json.trim()
  return json.length !== 0
}

function validateJsonObject(json, widgetType, ...required) {
  if (!Array.isArray(json.options)) return false
  if (json.options.length === 0) return false

  const found = required.find(r => !Objecter.has(json, r))
  if (found) {
    throw `${widgetType} definition requires ${found} attribute`
  }

  return true
}

export function validateOption(widgetType, {label, value}) {
  if (label === undefined && value === undefined) {
    throw `${widgetType} definition requires at least a label or value`
  }
}
