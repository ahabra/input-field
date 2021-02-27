
export class ValidationRules {
  constructor() {
    this.rules = []
  }

  add(rule) {
    if (!rule || containsName(this.rules, rule.name)) return false

    this.rules.push(rule)
    return true
  }

  addRule(name, message, validator) {
    return this.add(new Rule(name, message, validator))
  }

  validate(value, onValidation) {
    this.rules.forEach(r => {
      const isValid = r.isValid(value)
      onValidation(isValid, r.name)
    })
  }
}

function containsName(rules, name) {
  const found = rules.find(r => r.name === name)
  return !!found
}

export class Rule {
  constructor(name, message, validator) {
    this.name = name
    this.message = message
    this.validator = validator
  }

  isValid(value) {
    return this.validator(value)
  }

}

const basicRules = {
  required: ()=> {
    const validator = value => !!value
    return new Rule('required', 'Required Field', validator)
  },

  minlength: minLength => {
    const validator = value => {
      const len = value ? value.length : 0
      return len >= minLength
    }
    const msg = 'Minimum Length is ' + minLength
    return new Rule('minlength', msg, validator)
  },

  pattern: pattern => {
    const validator = value => {
      const regex = new RegExp(pattern)
      return regex.test(value)
    }
    const msg = 'Must satisfy the pattern ' + pattern
    return new Rule('pattern', msg, validator)
  },

  min: minValue => {
    minValue = Number(minValue) || 0
    const validator = value => {
      value = Number(value) || 0
      return value >= minValue
    }
    const msg = 'Minimum value of ' + minValue
    return new Rule('min', msg, validator)
  },

  max: maxValue => {
    maxValue = Number(maxValue) || 0
    const validator = value => {
      value = Number(value) || 0
      return value <= maxValue
    }
    const msg = 'Maximum value of ' + maxValue
    return new Rule('max', msg, validator)
  },
}

export function getBasicRule(name, limit) {
  if (!limit) return false

  const func = basicRules[name]
  if (!func) return false

  return func(limit)
}