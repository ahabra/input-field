import {Objecter, Stringer} from '@techexp/jshelper'
import {Rule} from './Rule'

export class ValidationRules {
  constructor(rules) {
    this.rules = []
    this.add(...rules)
  }

  add(...rules) {
    rules = rules.filter(r => !containsName(this.rules, r.name))
    if (rules.length === 0) return false

    this.rules.push(...rules)
    return rules
  }

  validate(value, onValidation) {
    this.rules.forEach(r => {
      const isValid = r.isValid(value)
      onValidation(isValid, r.name)
    })
  }

  toHtml() {
    return this.rules.map(r => r.toHtml()).join('')
  }

  static createFromAttributes(atts) {
    const rules = []
    checkType(rules, atts)
    Objecter.forEachEntry(atts, (k, v) => {
      if (!Stringer.isEmpty(v) && Objecter.has(Rule, k)) {
        const msg = atts[k + '-message']
        const rule = Rule[k](v, msg)
        rules.push(rule)
      }
    })
    return new ValidationRules(rules)
  }

}

/* eslint-disable complexity */
function checkType(rules, atts) {
  switch (atts.type) {
  case 'email':
    return rules.push(Rule.email(atts['email-message']))
  case 'number':
    return rules.push(Rule.isNumber(atts['number-message']))
  case 'integer':
    return rules.push(Rule.isInteger(atts['integer-message']))
  case 'set':
    return rules.push(Rule.set(atts.options, atts['set-message']))
  }
}
/* eslint-enable */

function containsName(rules, name) {
  const found = rules.find(r => r.name === name)
  return !!found
}
