import {expect} from '@esm-bundle/chai'

import * as ValueUtils from '../ValueUtils'
import {Domer} from '@techexp/jshelper'

describe('ValueUtils', ()=> {

  describe('serialize', ()=> {
    const serialize = ValueUtils.privates.serialize

    it('converts an array to string', ()=> {
      expect(serialize([1, 2])).to.equal('1|2')
      expect(serialize([1])).to.equal('1')
      expect(serialize([])).to.equal('')
      expect(serialize()).to.equal('')
    })
  })

  describe('deserialize', ()=> {
    const deserialize = ValueUtils.privates.deserialize

    it('converts a string to an array', ()=> {
      expect(deserialize('1|2')).to.eql(['1', '2'])
      expect(deserialize('1')).to.eql(['1'])
      expect(deserialize('')).to.eql([])
      expect(deserialize()).to.eql([])
    })
  })

  describe('isMultiValue', ()=> {
    const isMultiValue = ValueUtils.privates.isMultiValue

    it('returns true for checkbox type', ()=> {
      let el = Domer.createElement('div', {type: 'checkbox'})
      expect(isMultiValue(el)).to.be.true

      el = Domer.createElement('div', {type: 'CheckBOX'})
      expect(isMultiValue(el)).to.be.true
    })

    it('returns true for listbox type', ()=> {
      const el = Domer.createElement('div', {type: 'listbox'})
      expect(isMultiValue(el)).to.be.true
    })

    it('returns false for other types', ()=> {
      let el = Domer.createElement('div', {type: 'text'})
      expect(isMultiValue(el)).to.be.false

      el = Domer.createElement('div', {type: 'email'})
      expect(isMultiValue(el)).to.be.false

      el = Domer.createElement('div')
      expect(isMultiValue(el)).to.be.false
    })
  })

  describe('getValueAttr', ()=> {
    const getValueAttr = ValueUtils.privates.getValueAttr

    it('returns the value attribute', ()=> {
      const el = Domer.createElement('div', {value: '42'})
      expect(getValueAttr(el)).to.equal('42')
    })

    it('returns an array for multivalue element', ()=> {
      let el = Domer.createElement('div', {type: 'checkbox', value: '42'})
      expect(getValueAttr(el)).to.eql(['42'])

      el = Domer.createElement('div', {type: 'checkbox', value: 'a|b'})
      expect(getValueAttr(el)).to.eql(['a', 'b'])
    })
  })

  describe('arraysHaveSameItems', ()=> {
    const arraysHaveSameItems = ValueUtils.privates.arraysHaveSameItems

    it('returns false if arrays have different number of unique items', ()=> {
      expect(arraysHaveSameItems([], [1])).to.be.false
    })

    it('returns false if arrays have different items', ()=> {
      expect(arraysHaveSameItems([2], [1])).to.be.false
      expect(arraysHaveSameItems([1, 2], [1, 3])).to.be.false
    })

    it('returns false if arrays have same items', ()=> {
      expect(arraysHaveSameItems([1], [1])).to.be.true
      expect(arraysHaveSameItems([1, 2], [1, 2])).to.be.true
      expect(arraysHaveSameItems([1, 2], [2, 1])).to.be.true
      expect(arraysHaveSameItems([1, 2], [2, 1, 1])).to.be.true
    })
  })

})