import {Objecter, Stringer} from '@techexp/jshelper'

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
    if (atts.type === 'email') {
      const msg = atts['email-message']
      rules.push(Rule.email(msg))
    }
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

function containsName(rules, name) {
  const found = rules.find(r => r.name === name)
  return !!found
}

export class Rule {
  constructor(name = '', message, validator) {
    this.name = name.replace(/[ \\.]/g, '-').toLowerCase()
    this.message = message
    this.validator = validator
  }

  isValid(value) {
    return this.validator(String(value))
  }

  toHtml() {
    if (Stringer.isEmpty(this.message)) return ''
    return `<li class="validation-${this.name}">${this.message}</li>\n`
  }

  static createRule(name, message, validator, value) {
    message = message.replaceAll('%v', value)
    return new Rule(name, message, validator)
  }

  static email(msg = 'Must be a valid email address') {
    const validator = value => /\S+@\S+\.\S+/.test(value)
    return new Rule('email', msg, validator)
  }

  static required(flag, msg = 'Required Field') {
    const validator = value => !!value
    return new Rule('required', msg, validator)
  }

  static minlength(minLength, msg = 'Minimum Length is %v') {
    const validator = value => {
      const len = value ? value.length : 0
      return len >= minLength
    }
    return Rule.createRule('minlength', msg, validator, minLength)
  }

  static pattern(pattern, msg = 'Must satisfy the pattern %v') {
    const validator = value => {
      const regex = new RegExp(pattern)
      return regex.test(value)
    }
    return Rule.createRule('pattern', msg, validator, pattern)
  }

  static min(minValue, msg = 'Minimum value of %v') {
    minValue = Number(minValue) || 0
    const validator = value => {
      value = Number(value) || 0
      return value >= minValue
    }
    return Rule.createRule('minValue', msg, validator, minValue)
  }

  static max(maxValue, msg = 'Maximum value of %v') {
    maxValue = Number(maxValue) || 0
    const validator = value => {
      value = Number(value) || 0
      return value <= maxValue
    }
    return Rule.createRule('max', msg, validator, maxValue)
  }
}
