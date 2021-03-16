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
      const json = `{
        "name": "gender",
        "options": [
          { "label": "Male",   "id": "male",   "value": "M", "checked": true },
          { "label": "Female", "id": "female", "value": "F" }
        ]
      }`

      const html = `
        <label class="radio">
          <input type="radio" name="gender" id="male" value="M" checked>
          <span class="label">Male</span>
        </label>

        <label class="radio">
          <input type="radio" name="gender" id="female" value="F">
          <span class="label">Female</span>
        </label>
      `

      const actual = jsonToHtml(json)

      const comparision = LineCompare.compareLines(actual, html)
      expect(comparision).to.equal('')
    })

  })

})