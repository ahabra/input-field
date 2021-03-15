# input-field Web Component
A responsive, configurable input field with validation.

Many times I need an input field with its label and validation with styling to
show and explain errors. This component helps with that.

## Install
You can use this library as either an EcmaScript module, or the old way
as a script which you include in your html file.

Additionally, the library requires a CSS file that control its style. An example file
is available at

    https://github.com/ahabra/input-field/blob/master/dist/input-field.css

You should download and customize as needed.

### Install as NPM EcmaScript Module
If you plan to use this package as an NPM module:

```bash
    npm install @techexp/input-field
```

### Install as a Script
If you plan to use this package as a JS script library

```html
    <script src="https://raw.githubusercontent.com/ahabra/input-field/master/dist/input-field-script-min.js"></script>
```

Alternatively, you can download the file
`https://raw.githubusercontent.com/ahabra/input-field/master/dist/input-field-script-min.js`
and use directly. Note that there is a non-minified version at the same location.

## Usage
If you installed as an EcmaScript module
```js
import * as InputField from '@techexp/input-field'
```

If you installed as a Script, the library is available at `window.InputField`

### Quick Code Demo
This example shows how to use the component:

```js
import * as InputField from '@techexp/input-field'
// or use window.InputField

// Provide the path to input-field.css
const cssFilePath = '/css/input-field.css'
InputField.define(cssFilePath)
```

```html
<input-field id="age" type="text" label="Age"
             required="required"
             minlength="2" maxlength="3"
             min="18" max="150"
             pattern="[0-9]{2,3}"
             tooltip="Your Age in Solar Years"
></input-field>

<input-field type="set" label="RGB Colors"
             tooltip="One of: red, green, blue"
             options="red, green, blue"
></input-field>
```

The above code will show input fields with some validation rules.

## API
### CSS Style
The style of the component is controlled through a CSS file.
The provided [`input-field.css`](https://github.com/ahabra/input-field/blob/master/dist/input-field.css)
file is a complete example that you can use as-is, or customize to match your needs.

In most scenarios, you only need to change the values of the variables defined at the top of the file.

### HTML
The library defines a new _Web Component_ (a.k.a. _Custom Element_) named `input-field`.
The component supports the following attributes
(in addition to common HTML attributes like `id` or `class`):

1. `type`: `text`, `password`, `email`, `number`, `integer`, or `set`.
    Optional. Default is `text`
2. `label`: The label to display before the input field
3. `sublabel`: Text that will appear under the label, with smaller font.
4. `required`: If the field is required, then this attribute's definition will be `required="required"`.
    Additionally, a _required_ marker (Star) will be displayed after the label.
5. `required-message`: The message to display explaining that this field is required. Default is `Required Field`.
6. `minlength`: The minimum number of characters in the field.
7. `minlength-message`: The message to display explaining the minimum number of characters.
   If the message contains `%v`, it will be replaced by the value of minimum length. Default is
   `Minimum Length is %v`, where `%v` is replaced by the value of `minlength`.
8. `maxlength`: The maximum number of characters allowed in the field.
9. `pattern`: A regular expression that must match the input.
10. `pattern-message`: The message to display explaining the matching pattern. Default is
    `Must satisfy the pattern %v`.
11. `min`: The minimum (numeric) value accepted in the field.
12. `min-message`: The message to display explaining the minimum value for the field. Default is
    `Minimum value of %v`.
13. `max`: The maximum (numeric) value accepted in the field.
14. `max-message`: The message to display explaining the maximum value for the field. Default is
    `Maximum value of %v`.
15. `number-message`: The message to show when the value must be a number.
16. `integer-message`: The message to show when the value must be an integer.
17. `showrules`: Boolean. Default is true. Show or hide validation rules.
18. `tooltip`: String. If provided, a question parm icon is displayed at the end of
    the label. When User clicks on the label a tooltip will pop up.
19. `options`: A comma separated list of options used with `set` type.
20. `set-message`: Optional. The message to show when there is a set of options.


### JavaScript
There is a single function available `InputField.define(cssFilePath)`.
You should call this function before you can use the component in your html.

The component defines properties and actions that can help you configure its instances.
For example, if you have this html:

```html
<input-field id="age" type="text" label="Age"></input-field>
```

#### Properties Defined on the Component
1. `value`: A read/write property of the value of the InputField instance.
   For the input-field defined above, you can access its value like this:

```javascript
const age = document.getElementById('age')
age.properties.value = 10
console.log(age.properties.value)
```


#### Actions Defined on the Component
The component defines a single _action_ which allows you to define custom validation rules.

```javascript
const age = document.getElementById('age')
age.actions.addRule('adult', 'Must be at least 18', v => Number(v) >= 18)
```

The `addRule` action takes the following arguments:
1. `name`: Name of the action. Must be a string that follows JavaScript variable naming rules.
2. `message`: The message to describe this validation rule
3. `validator`: A function that takes the value of the input-field as an argument, and returns true
    if the value is value, false if not.

The `addRule` action can be used to define ajax-based validation, or rules that cannot be expressed
easily using the provided rules.

## TODO
This is my wishlist for this library.
1. 2021-03-10: Allow more customization to label
    1. ~~add little help button.~~ Done. 2020-03-12
    2. ~~sublabel.~~ Done. 2020-03-11
2. 2021-03-10: ~~Support data types: Integer, Number, String.~~ Done. 2020-03-12
3. 2021-03-10: ~~Support one of a group, e.g.: one of `red`, `green`, `blue`.~~ Done. 2020-03-12
4. 2021-03-10: Support combo-box, list-box
5. 2021-03-10: Support radio buttons
6. 2021-03-10: Support check boxes
7. 2021-03-10: Show validation rule text on error
8. 2021-03-10: ~~Refactor input-feild.css to use variables better~~. Done. 2020-03-11

### Playing
#### Radio
```html
<input type="radio" name="gender" id="male" value="male" checked>
<label for="male">Male</label><br>

<input type="radio" name="gender" id="female" value="female">
<label for="female">Female</label><br>
```

name will be an attribute on element ??

```json
{
  "name": "gender",
  "options": [
    {
      "label": "Male",   "id": "male",   "value": "male", "checked": true },
    { "label": "Female", "id": "female", "value": "female" }
  ]
}
```

#### Checkbox
```html
<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1"> I have a bike</label><br>

<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
<label for="vehicle2"> I have a car</label><br>
```

```json
{
  "options": [
    { "label": "Have a bike",  "id": "vehicle1", "name": "vehicle1", "value": "Bike", "checked": true},
    { "label": "Have a car",   "id": "vehicle2", "name": "vehicle2", "value": "Car" },
    { "label": "Horse"}
  ]
}
```


#### List/Combo box
```html
<select name="cars" id="cars" size="4">
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab" disabled>Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>
```

```json
{
  "name": "cars",
  "id": "cars",
  "multiple": true,
  "size": 1,
  "options": [
    { "label": "Toyota", "value": "Toyota" },
    { "label": "GM"},
    { "value": "Tesla"},
    { "label": "Swedish Cars", "options": [
      {"label": "Volvo"},
      {"label": "Saab", "disabled": true}
    ]},
    { "label": "German Cars", "options": [
      {"label": "Mercedes"},
      {"label": "Audi"}
    ]}
  ]
}
```