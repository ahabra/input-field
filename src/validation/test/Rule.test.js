import {expect} from '@esm-bundle/chai'

import {Rule} from '../Rule'

describe('Rule.js', ()=> {

  describe('constructor', ()=> {
    it('creates an object with validator', ()=> {
      const rule = new Rule('rule1', '+ve', v => v >= 0)
      expect(rule.name).to.equal('rule1')
      expect(rule.message).to.equal('+ve')
      expect(rule.isValid(1)).to.be.true
      expect(rule.isValid(-1)).to.be.false
    })

    it('normalizes rule name', ()=> {
      expect(new Rule('a b c').name).to.equal('a-b-c')
      expect(new Rule('a.b.c').name).to.equal('a-b-c')
    })

  })

})