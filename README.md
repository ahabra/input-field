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
The style of the component is controlled through a CSS file. The provided `input-field.css`
file is a complete example that you can use as-is, or customize to match your needs.

In most scenarios, you only need to change the values of the variables defined at the top of the file.

### JavaScript
There is a single function available `InputField.define(cssFilePath)`.
You should call this function before you can use the component in your html.



