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

    it('escapes pipe with a caret character', ()=> {
      expect(serialize(['a|b', 'c'])).to.equal('a^|b|c')
    })
  })

  describe('deserialize', ()=> {
    const deserialize = ValueUtils.privates.deserialize
    const serialize = ValueUtils.privates.serialize

    it('converts a string to an array', ()=> {
      expect(deserialize('1|2')).to.eql(['1', '2'])
      expect(deserialize('1')).to.eql(['1'])
      expect(deserialize('1|')).to.eql(['1', ''])
      expect(deserialize('')).to.eql([])
      expect(deserialize()).to.eql([])
      expect(deserialize('1||2')).to.eql(['1', '', '2'])
      expect(deserialize('1|2|')).to.eql(['1', '2', ''])
    })

    it('converts strings having pipe escaped with a caret', ()=> {
      expect(deserialize('a^|b|c')).to.eql(['a|b', 'c'])

      const ar = ['a|b', 'c', '', '|']
      expect(deserialize( serialize(ar) )).to.eql(ar)

      expect(deserialize('a^b^^|c|d')).to.eql(['a^b^|c', 'd'])
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

  describe('isSameValue', ()=> {
    const isSameValue = ValueUtils.privates.isSameValue

    it('checks arrays', ()=> {
      expect(isSameValue([1, 2], [2, 1], true)).to.be.true
      expect(isSameValue([1, 2], [2], true)).to.be.false
      expect(isSameValue([1], [1], false)).to.be.false
    })

    it('checks strings', ()=> {
      expect(isSameValue('', '', false)).to.be.true
      expect(isSameValue('a', 'a', false)).to.be.true
      expect(isSameValue('a', 'ab', false)).to.be.false
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

  describe('setValueProp', ()=> {
    const setValueProp = ValueUtils.privates.setValueProp

    it('sets a single value', ()=> {
      const el = Domer.createElement('div')
      el.wi = {
        properties: {}
      }
      setValueProp(el, 'a')
      expect(el.wi.properties.value).to.equal('a')
    })

    it('sets new multivalue', ()=> {
      const el = Domer.createElement('div', {type: 'listbox'})
      el.wi = {
        properties: {}
      }
      setValueProp(el, 'a|b')
      expect(el.wi.properties.value).to.eql(['a', 'b'])
    })

    it('does not set multivalue when they are the same', ()=> {
      const el = Domer.createElement('div', {type: 'listbox'})
      el.wi = {
        properties: {
          value: ['b', 'a']
        }
      }
      setValueProp(el, 'a|b')
      expect(el.wi.properties.value).to.eql(['b', 'a'])
    })
  })

  describe('toggleValueInList', ()=> {
    const toggleValueInList = ValueUtils.toggleValueInList

    it('adds value to list if list is empty', ()=> {
      expect(toggleValueInList(undefined, 'a')).to.eql(['a'])
      expect(toggleValueInList(null, 'a')).to.eql(['a'])
      expect(toggleValueInList([], 'a')).to.eql(['a'])
      expect(toggleValueInList('', 'a')).to.eql(['a'])
    })

    it('clears list if it only contains value', ()=> {
      expect(toggleValueInList('a', 'a')).to.eql([])
      expect(toggleValueInList(['a'], 'a')).to.eql([])
    })

    it('adds value to list if list does not contain value', ()=> {
      expect(toggleValueInList('a', 'b')).to.eql(['a', 'b'])
      expect(toggleValueInList(['a'], 'b')).to.eql(['a', 'b'])
    })

    it('removes value from list if it exists', ()=> {
      expect(toggleValueInList(['a', 'b'], 'a')).to.eql(['b'])
    })

  })

})