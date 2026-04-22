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


      el.setAttribute('value', 'NY')
      expect(el.getAttribute('value')).to.equal('NY')
      expect(el.wi.properties.value).to.eql(['NY'])
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

    it('changes the value attribute for a checkbox when user clicks on widget', ()=> {
      const el = createCheckBox()
      const container = Domer.first('.input-field/.checkbox-buttons', el.shadowRoot)
      clickOnCheckbox(container, 'MI')
      expect(el.getAttribute('value')).to.eql('MI')

      clickOnCheckbox(container, 'OH')
      expect(el.getAttribute('value')).to.eql('MI|OH')
    })

  })

  describe('extra attributes', ()=> {
    it('adds extra attributes to the input box', ()=> {
      const attrs = {
        type: 'text',
        value: 'foo',
        step: '10',
        accept: '*.pdf',
        unknown: '42',
        'not-there': 'bar'
      }
      const el = createInputFieldWithAttributes(attrs)
      const input = Domer.first('.input-field/input', el.shadowRoot)

      expect(input.getAttribute('type')).to.equal('text')
      expect(input.getAttribute('value')).to.equal('foo')
      expect(input.getAttribute('step')).to.equal('10')
      expect(input.getAttribute('accept')).to.equal('*.pdf')
      expect(input.getAttribute('unknown')).to.equal('42')
      expect(input.getAttribute('not-there')).to.equal('bar')
    })
  })

})

function createInputFieldWithAttributes(attrs = {}, contentJson) {
  const content = contentJson ? JSON.stringify(contentJson) : ''
  const el = Domer.createElement('input-field', attrs, content)
  document.body.append(el)
  return el
}

function createInputField(type = 'text', value = '', contentJson) {
  const content = contentJson ? JSON.stringify(contentJson) : ''
  const el = Domer.createElement('input-field', {type, value}, content)
  document.body.append(el)
  return el
}

function createListBox() {
  return createInputField('listbox', '', getListboxContent())
}

function createCheckBox() {
  return createInputField('checkbox', '', getListboxContent())
}


function getListboxContent() {
  return {
    name: 'states2',
    id: 'states2',
    multiple: true,
    options: [
      { label: 'Michigan', value: 'MI'},
      { label: 'Ohio', value: 'OH'},
      { label: 'New York', value: 'NY'},
    ]
  }
}

function clickOnSelectOption(select, value) {
  const option = Domer.first(`option[value="${value}"]`, select)
  option.dispatchEvent(new Event('mousedown'))
}

function clickOnCheckbox(container, value) {
  const chkbox = Domer.first(`input[value=${value}]`, container)
  chkbox.click()
}