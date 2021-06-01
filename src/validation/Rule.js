import {Objecter, Stringer} from '@techexp/jshelper'

export class Rule {
  constructor(name = '', message, validator) {
    this.name = name.replace(/[ \\.]/g, '-').toLowerCase()
    this.message = message
    this.validator = validator
  }

  isValid(value) {
    if (this.name === 'required' && value === undefined) {
      return false
    }

    return this.validator(String(value))
  }

  toHtml() {
    if (Stringer.isEmpty(this.message)) return ''
    return `<li class="validation-${this.name}">${this.message}</li>\n`
  }

  static createRule(name, message, validator, value) {
    message = Stringer.replaceAll(message, '%v', value)
    return new Rule(name, message, validator)
  }

  static email(msg = 'Must be a valid email address') {
    const validator = value => /\S+@\S+\.\S+/.test(value)
    return new Rule('email', msg, validator)
  }

  static required(flag, msg = 'Required Field') {
    flag = flag.toLowerCase()
    if (flag === 'true' || flag === 'required') {
      const validator = value => !!value
      return new Rule('required', msg, validator)
    }
    return null
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

  static isNumber(msg = 'Must be a valid number') {
    const validator = v => Objecter.isNumber(v)
    return new Rule('isNumber', msg, validator)
  }

  static isInteger(msg = 'Must be a valid whole number') {
    const validator = v => Objecter.isInteger(v)
    return new Rule('isInteger', msg, validator)
  }

  static set(options, msg = 'Value must be one of [%v]') {
    const set = new Set( options.split(',').map(op => op.trim().toLowerCase()) )
    const validator = v => v === '' || set.has(v.toLowerCase())
    return Rule.createRule('set', msg, validator, options)
  }

}
