import {expect} from '@esm-bundle/chai'

import {ValidationRules} from '../ValidationRules'
import {Rule} from '../Rule'

describe('ValidationRules.js', ()=> {

  describe('constructor', ()=> {
    it('creates an object with given rules', ()=> {
      const r1 = new Rule('rule1', '+ve', v => v >= 0)
      const r2 = new Rule('rule2', '>0', v => v >= 10)

      const rules = new ValidationRules([r1, r2])
      expect(rules.rules).to.eql([r1, r2])
    })
  })

  describe('add()', ()=> {
    it('ignores rule if its name already exists', ()=> {
      const r1 = new Rule('rule1', 'a')
      const r2 = new Rule('rule1', 'b')
      const rules = new ValidationRules([r1])
      rules.add(r2)
      expect(rules.rules).to.eql([r1])
    })

    it('returns false if rule exists, true if not', ()=> {
      const r1 = new Rule('rule1', 'a')
      const rules = new ValidationRules()
      expect(rules.add(r1)).to.be.true
      expect(rules.add(r1)).to.be.false
    })

  })

  describe('addAll()', ()=> {
    it('ignores rule if its name already exists', ()=> {
      const r1 = new Rule('rule1', 'a')
      const r2 = new Rule('rule1', 'b')
      const rules = new ValidationRules()
      rules.addAll([r1, r2])
      expect(rules.rules.length).to.eql(1)
      expect(rules.rules).to.eql([r1])
    })


  })



})