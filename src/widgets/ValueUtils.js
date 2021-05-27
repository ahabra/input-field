import {Objecter, Stringer} from '@techexp/jshelper'

const separator = '|'
const escapeChar = '^'
const escapeSeq = escapeChar + separator


/** Serialize an array to a string */
function serialize(value) {
  if (Objecter.isNil(value)) {
    return ''
  }
  if (Array.isArray(value)) {
    return value.map(v => String(v).replaceAll(separator, escapeSeq)).join(separator)
  }
  return String(value)
}

/** deSerialize a string to an array of value */
function deserialize(value) {
  if (Stringer.isEmpty(value)) return []

  const result = []
  let lastChar = ''
  let buffer = null
  Array.from(value).forEach(c => {
    if (c === separator && lastChar !== escapeChar) {
      result.push(buffer)
      buffer = null
    } else {
      buffer = buffer === null ? c : buffer + c
    }
    lastChar = c
  })

  result.push(buffer)

  return result.map(r => {
    if (r === null) return ''
    return r.replaceAll(escapeSeq, separator)
  })

  // return value.split(separator)
}

function isMultiValue(el) {
  const type = Stringer.trim(el.getAttribute('type')).toLowerCase()
  return type === 'checkbox' || type === 'listbox'
}

/** Check if two arrays have the same items, regardless of order */
function arraysHaveSameItems(ar1, ar2) {
  const s1 = new Set(ar1)
  const s2 = new Set(ar2)
  if (s1.size !== s2.size) return false
  for (const a of s1) {
    if (!s2.has(a)) return false
  }
  return true
}

function isSameValue(v1, v2, isMultiValue) {
  if (isMultiValue) {
    return arraysHaveSameItems(v1, v2)
  }
  return v1 === v2
}

/** get the value attribute, if multivalue return array */
function getValueAttr(el) {
  const value = el.getAttribute('value')
  if (isMultiValue(el)) {
    return deserialize(value)
  }
  return value
}

/** value can be either a string or an array */
export function setValueAttr(el, value) {
  const isMulti = isMultiValue(el)

  if (isSameValue(getValueAttr(el), value, isMulti)) {
    return
  }

  if (isMulti) {
    value = serialize(value)
  }
  el.setAttribute('value', value, true)
}

function getValueProp(el) {
  return el.wi.properties.value
}

/**
 * Set the value property if it is different.
 * @param el
 * @param value a string that can be a serialized array
 */
function setValueProp(el, value) {
  if (isMultiValue(el)) {
    value = deserialize(value)
    if (arraysHaveSameItems(getValueProp(el), value)) {
      return
    }
  }

  el.wi.properties.value = value
}

/** when the value attribute changes, change the property as well */
export function overrideSetAttribute(el) {
  const oldSet = el.setAttribute.bind(el)

  el.setAttribute = function(name, value, ignoreProp) {
    if (name !== 'value') {
      oldSet(name, value)
      return
    }

    value = String(value)
    if (!ignoreProp) {
      setValueProp(el, value)
    }

    oldSet(name, value)
  }
}

export const privates = {
  serialize,
  deserialize,
  isMultiValue,
  arraysHaveSameItems,
  isSameValue,
  getValueAttr,
  setValueProp
}