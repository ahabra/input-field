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
></input-field>
```

The above code will show an input field with some validation rules.

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

1. `type`: Currently, the only supported value is `text`
2. `label`: The label to display before the input field
3. `required`: If the field is required, then this attribute's definition will be `required="required"`.
    Additionally, a _required_ marker (Star) will be displayed after the label.
4. `required-message`: The message to display explaining that this field is required. Default is `Required Field`.
5. `minlength`: The minimum number of characters in the field.
6. `minlength-message`: The message to display explaining the minimum number of characters.
   If the message contains `%v`, it will be replaced by the value of minimum length. Default is
   `Minimum Length is %v`, where `%v` is replaced by the value of `minlength`.
7. `maxlength`: The minimum number of characters allowed in the field.
8. `pattern`: A regular expression that must match the input.
9. `pattern-message`: The message to display explaining the matching pattern. Default is
   `Must satisfy the pattern %v`.
10. `min`: The minimum (numeric) value accepted in the field.
11. `min-message`: The message to display explaining the minimum value for the field. Default is
    `Minimum value of %v`.
12. `max`: The maximum (numeric) value accepted in the field.
13. `max-message`: The message to display explaining the maximum value for the field. Default is
    `Maximum value of %v`.


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

2. `isShowRules`: A read/write boolean property which controls if the rules description should be
   shown under the input-field. Default is true.

```javascript
const age = document.getElementById('age')
age.properties.isShowRules = false   // hide rules
age.properties.isShowRules = true    // show rules

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

