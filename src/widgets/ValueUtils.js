import {Objecter, Stringer} from '@techexp/jshelper'

/** Serialize an array to a string */
function serialize(value) {
  if (Objecter.isNil(value)) {
    return ''
  }
  if (Array.isArray(value)) {
    return value.join('|')
  }
  return String(value)
}

/** deSerialize a string to an array of value */
function deserialize(value) {
  if (Stringer.isEmpty(value)) return []
  return value.split('|')
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
export function setValueAttr(el, value, ignoreProp) {
  const isMulti = isMultiValue(el)
  // FIXME
  // if (isMulti && !Array.isArray(value)) throw 'bad value'

  if (isSameValue(getValueAttr(el), value, isMulti)) {
    return
  }

  if (isMulti) {
    value = serialize(value)
  }
  el.setAttribute('value', value, ignoreProp)
}

function getValueProp(el) {
  return el.wi.properties.value
}

/**
 * Set the value property if it is different.
 * @param el
 * @param value a string that can be a serialized array
 */
export function setValueProp(el, value) {
  const isMulti = isMultiValue(el)
  if (isMulti) {
    value = deserialize(value)
  }
  if (arraysHaveSameItems(getValueProp(el), value)) {
    return
  }
  el.wi.properties.value = value
}

export const privates = {
  serialize,
  deserialize,
  isMultiValue,
  arraysHaveSameItems,
  getValueAttr
}