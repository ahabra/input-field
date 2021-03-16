import {expect} from '@esm-bundle/chai'

import * as Radio from '../radio'
import {LineCompare} from '@techexp/jshelper'

describe('radio.js', ()=> {

  describe('jsonToHtml', ()=> {
    const jsonToHtml = Radio.jsonToHtml

    it('returns empty string if no json', ()=> {
      expect(jsonToHtml()).to.equal('')
      expect(jsonToHtml(null)).to.equal('')
      expect(jsonToHtml(5)).to.equal('')
      expect(jsonToHtml('')).to.equal('')
      expect(jsonToHtml('  ')).to.equal('')
      expect(jsonToHtml('{}')).to.equal('')
      expect(jsonToHtml(JSON.stringify({options: ''}))).to.equal('')
      expect(jsonToHtml(JSON.stringify({options: []}))).to.equal('')
    })

    it('throws an exception if no name provided', ()=> {
      const json = JSON.stringify({options: [{}]})
      expect( ()=> jsonToHtml(json)).to.throw()
    })

    it('generates HTML for fully populated json', ()=> {
      const json = {
        name: 'gender',
        flow: 'vertical',
        options: [
          {label: 'Male', id: 'male', value: 'M', checked: true},
          {label: 'Female', id: 'female', value: 'F'}
        ]
      }


      const html = `
      <div class="radio-buttons">
        <label class="radio">
          <input type="radio" name="gender" id="male" value="M" checked>
          <span class="radio-label">Male</span>
        </label><br>
        <label class="radio">
          <input type="radio" name="gender" id="female" value="F">
          <span class="radio-label">Female</span>
        </label>
      </div>
      `

      const actual = jsonToHtml(JSON.stringify(json))

      const comparision = LineCompare.compareLines(actual, html)
      expect(comparision).to.equal('')
    })

    describe('generates HTML for partially populated json', ()=> {
      it('generates when label only is available', ()=> {
        const json = {
          name: 'gender',
          options: [
            {label: 'Male'}
          ]
        }
        const html = `
        <div class="radio-buttons">
          <label class="radio">
            <input type="radio" name="gender"  value="Male">
            <span class="radio-label">Male</span>
          </label>
        </div>
        `
        const actual = jsonToHtml(JSON.stringify(json))
        const comparision = LineCompare.compareLines(actual, html)
        expect(comparision).to.equal('')
      })

      it('generates when value only is available', ()=> {
        const json = {
          name: 'gender',
          options: [
            {value: 'male'}
          ]
        }
        const html = `
        <div class="radio-buttons">
          <label class="radio">
            <input type="radio" name="gender"  value="male">
            <span class="radio-label">male</span>
          </label>
        </div>
        `
        const actual = jsonToHtml(JSON.stringify(json))
        const comparision = LineCompare.compareLines(actual, html)
        expect(comparision).to.equal('')
      })

      it('fails if both label and value are missing', ()=> {
        const json = {
          name: 'gender',
          options: [
            {}
          ]
        }
        expect( ()=> jsonToHtml(JSON.stringify(json))).to.throw()
      })

    })

  })

})