import {expect} from '@esm-bundle/chai'
import * as InputField from '../input-field'
import {Domer} from '@techexp/jshelper'


describe('input-field.js', ()=> {
  InputField.define()

  beforeEach(()=> {
    document.body.innerHTML = ''
  })

  describe('value attribute and property coupling', ()=> {

    it('couples text field', ()=> {
      const el = createInputField('text', 'a')

      expect(el.getAttribute('value')).to.equal('a')
      expect(el.wi.properties.value).to.equal('a')

      el.wi.properties.value = 'b'
      expect(el.getAttribute('value')).to.equal('b')
      expect(el.wi.properties.value).to.equal('b')

      el.setAttribute('value', 'c')
      expect(el.getAttribute('value')).to.equal('c')
      expect(el.wi.properties.value).to.equal('c')
    })

    it('couples multivalue field', ()=> {
      const el = createListBox()
      el.wi.properties.value = ['MI', 'OH']
      expect(el.getAttribute('value')).to.equal('MI|OH')
      expect(el.wi.properties.value).to.eql(['MI', 'OH'])


      el.setAttribute('value', 'FL')
      expect(el.getAttribute('value')).to.equal('FL')
      expect(el.wi.properties.value).to.eql(['FL'])
    })

    it('does not alter value property when setting value attribute of different order', ()=> {
      const el = createListBox()
      el.wi.properties.value = ['MI', 'OH']
      el.setAttribute('value', 'OH|MI')
      expect(el.getAttribute('value')).to.equal('OH|MI')
      expect(el.wi.properties.value).to.eql(['MI', 'OH'])
    })

    it('allows setting a multivalue property to a single string', ()=> {
      const el = createListBox()
      el.wi.properties.value = 'MI'
      expect(el.wi.properties.value).to.eql(['MI'])
      expect(el.getAttribute('value')).to.equal('MI')
    })


    it('changes the value attribute for a listbox when user clicks on widget', ()=> {
      const el = createListBox()
      const select = Domer.first('.input-field/select', el.shadowRoot)
      clickOnSelectOption(select, 'MI')
      expect(el.getAttribute('value')).to.equal('MI')

      clickOnSelectOption(select, 'OH')
      expect(el.getAttribute('value')).to.equal('MI|OH')

      clickOnSelectOption(select, 'MI')
      expect(el.getAttribute('value')).to.equal('OH')

      clickOnSelectOption(select, 'OH')
      expect(el.getAttribute('value')).to.equal('')
    })


  })

})

function createInputField(type = 'text', value = '', contentJson) {
  const content = contentJson ? JSON.stringify(contentJson) : ''
  const el = Domer.createElement('input-field', {type, value}, content)
  document.body.append(el)
  return el
}

function createListBox() {
  return createInputField('listbox', '', getListboxContent())
}

function getListboxContent() {
  return {
    name: 'states2',
    id: 'states2',
    multiple: true,
    size: 5,
    options: [
      { label: 'Michigan', value: 'MI'},
      { label: 'Ohio', value: 'OH'},
      { label: 'New York', value: 'NY'},
      { label: 'Southern', options: [
        { label: 'Florida', value: 'FL'},
        { value: 'Texas'},
        { label: 'Alabama'},
        { label: 'Georgia'}
      ]
      }
    ]
  }
}

function clickOnSelectOption(select, value) {
  const option = Domer.first(`option[value="${value}"]`, select)
  option.dispatchEvent(new Event('mousedown'))
}