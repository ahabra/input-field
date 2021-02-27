import {Objecter, Stringer} from '@techexp/jshelper'

export class ValidationRules {
  constructor() {
    this.rules = []
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
}

function containsName(rules, name) {
  const found = rules.find(r => r.name === name)
  return !!found
}

export class Rule {
  constructor(name = '', message, validator) {
    this.name = name.replace(/[ \\.]/g, '-')
    this.message = message
    this.validator = validator
  }

  isValid(value) {
    return this.validator(value)
  }

  toHtml() {
    return `<li class="validation-${this.name}">${this.message}</li>\n`
  }

}

const basicRules = {
  required: (flag, msg = 'Required Field') => {
    const validator = value => !!value
    return new Rule('required', msg, validator)
  },

  minlength: (minLength, msg = 'Minimum Length is %v') => {
    const validator = value => {
      const len = value ? value.length : 0
      return len >= minLength
    }
    msg = msg.replaceAll('%v', minLength)
    return new Rule('minlength', msg, validator)
  },

  pattern: (pattern, msg = 'Must satisfy the pattern %v') => {
    const validator = value => {
      const regex = new RegExp(pattern)
      return regex.test(value)
    }
    msg = msg.replaceAll('%v', pattern)
    return new Rule('pattern', msg, validator)
  },

  min: (minValue, msg = 'Minimum value of %v') => {
    minValue = Number(minValue) || 0
    const validator = value => {
      value = Number(value) || 0
      return value >= minValue
    }
    msg = msg.replaceAll('%v', minValue)
    return new Rule('min', msg, validator)
  },

  max: (maxValue, msg = 'Maximum value of %v') => {
    maxValue = Number(maxValue) || 0
    const validator = value => {
      value = Number(value) || 0
      return value <= maxValue
    }
    msg = msg.replaceAll('%v', maxValue)
    return new Rule('max', msg, validator)
  },
}

export function createRulesFromAttributes(atts, messages = {}) {
  const rules = []
  Objecter.forEachEntry(atts, (k, v) => {
    if (!Stringer.isEmpty(v) && Objecter.has(basicRules, k)) {
      const msg = messages[k]
      const rule = basicRules[k](v, msg)
      rules.push(rule)
    }
  })
  const validationRules = new ValidationRules()
  validationRules.add(...rules)
  return validationRules
}
