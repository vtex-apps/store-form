📢 Use this project, [contribute](https://github.com/vtex-apps/store-form) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).
# Store Form

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Store Form app provides blocks responsible for displaying an user form connected to [**Master Data**](https://help.vtex.com/tutorial/what-is-master-data--4otjBnR27u4WUIciQsmkAw?locale=en) through a [JSON schema](https://json-schema.org/understanding-json-schema/index.html).

![image](https://user-images.githubusercontent.com/19346539/73491020-75428e80-438c-11ea-8217-4fb7696348b2.png)

## Configuration

:warning: Before configuring the Store Form block in your theme, make sure you've already configure a <strong>JSON schema in Master Data</strong>, otherwise the client form won't be properly saved. To more info, access the recipe on [Creating forms for your store users](https://vtex.io/docs/recipes/templates/creating-a-native-form-for-your-store-users/).

1. Add `store-form` app to your theme's dependencies in the `manifest.json`, for example:

```JSON
dependencies: {
  "vtex.store-form": "0.x"
}
```

Now, you are able to use all blocks exported by the `store-form` app. Check out the full list below:

| Block name     | Description                                     |
| -------------- | ----------------------------------------------- |
| `form` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)  Top level block in which you will specify which entity and schema from Master Data will be used for building the form. It provides context to all its 8 children blocks (listed below).   |
| `form-input.checkbox` | Renders a checkbox field in the form. |
| `form-input.dropdown` | Renders a dropdown field in the form. |
| `form-input.radiogroup` | Renders a radio buttons field in the form.|
| `form-input.textarea` | Renders a big text field in the form. |
| `form-input.text` | Renders a small text field in the form which has few available characters. |
| `form-field-group` | Renders different form blocks (such as `form-input.radiogroup` and `form-input.text`) according to each schema's sub-properties type. |
| `form-input.upload` | Renders an `Upload` field in the form. |
| `form-submit` | Renders a button to submit the user form content. |
| `form-success` | Accepts an array of blocks that will be rendered when the form is successfully submitted. Any children block is valid. |

2. In any desired store template, such as the `store.product`, add the `form` block.
In the example below, the form block is contained in a Flex Layout row:

```JSON
{
 "store.product": {
   "children": [
     "flex-layout.row#product-breadcrumb",
     "flex-layout.row#product-main"
+    "flex-layout.row#form",
     "shelf.relatedProducts",
     "product-reviews",
     "product-questions-and-answers"
   ]
 },
```

3.  Then, declare the `form` block. Bear in mind to specify which `entity` and `schema` from Master Data should be fetched to build the block.

```JSON
{
  "flex-layout.row#form": {
    "children": [
      "flex-layout.col#form"
    ]
  },
  "flex-layout.col#form": {
    "children": [
      "form"
    ]
  },
  "form": {
    "props": {
      "entity": "clients",
      "schema": "person"
    }
  }
}
```

:information_source: If the <code>form</code> block does not have any children configured, <strong>a default form will be rendered</strong> automatically based on the JSON schema in Master Data. This reading and interpretation of  JSON schemas is due to the <a href="[https://github.com/vtex/react-hook-form-jsonschema)](https://github.com/vtex/react-hook-form-jsonschema))">Reacht Hook Form JSON Schema</a> library (which is supporting the Store Form blocks logic behind the scenes).

| Prop name | Type | Description                                                                                                                                         | Default Value |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `entity`  | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)   The [entity](https://help.vtex.com/tutorial/creating-data-entity--tutorials_1265) in Master Data where the document will be saved.             | `undefined`              |
| `schema`  | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) The JSON schema name that will be used. The schema name is set in the API's request to create it in Master Data.| `undefined`

4. If desired,  complete the `form` block by adding and configuring an array of children blocks.  You can use the blocks listed in the first table stated above. For example:

```JSON
  "form": {
    "props": {
      "entity": "clients",
      "schema": "person"
    },
    "children": [
      "rich-text#formTitle",
      "form-input.text#firstName",
      "form-input.text#lastName",
      "form-field-group#address",
      "form-input.checkbox#agreement",
      "form-submit"
    ],
    "blocks": ["form-success"]
  },
  "form-success": {
    "children": [
      "rich-text#successSubmit"
    ]
  },
  "rich-text#successSubmit": {
    "props": {
      "text": "Succesfully submitted the data!",
      "textAlignment": "CENTER",
      "textPosition": "CENTER"
    }
  },
  "form-input.text#firstName": {
    "props": {
      "pointer": "#/properties/firstName"
    }
  },
  "form-input.text#lastName": {
    "props": {
      "pointer": "#/properties/lastName"
    }
  },
  "form-input.checkbox#agreement": {
    "props": {
      "pointer": "#/properties/agreement",
      "label": "Do you agree that this is the best form component in the whole wide world?"
    }
  },
  "form-field-group#address": {
    "props": {
      "pointer": "#/properties/address"
    }
  },
  "form-submit": {
    "props": {
      "label": "Submit"
    }
  }
```

### `form-input.radiogroup`, `form-input.dropdown`, `form-input.textarea` and `form-input.checkbox` props

| Prop name | Type | Description                                                                                                                                                                                                                                          | Default Value  |
| --------| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer` | `string` |  ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)  JSON schema pointer i.e. the JSON schema path  (for example: #/properties/firstName) in which the form block inputs should be validated against. | `undefined`              |
| `label` | `string` |  ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Field's name when rendered | Property's title  |

### `form-input.textarea` props

| Prop name   | Type                                 | Description                                                                                                                                                                                                                                      | Default Value |
| ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `placeholder`   | `string`    |  Placeholder for the textarea input.	 | `undefined`              |

### `form-input.text` props

| Prop name   | Type                                 | Description                                                                                                                                                                                                                                      | Default Value |
| ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer`   | `string`    | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) JSON schema path (e.g., `#/properties/firstName`) for validating form block inputs. | `undefined`              |
| `inputType` | `enum` | Defines the type of the text field. Possible values are: `input` - renders a regular text field; `hidden` - renders a hidden text field used for pre-defining an editable value to be submitted to the form; `password` -  renders a password text field.                 | `input`           |
| `value` (optional) | `string` | Displays a pre-defined text to be submitted when the `inputType` is set as `hidden`.  | `undefined` |
| `label` | `string` |  ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Label of the input field. | Property's title  |
| `placeholder`   | `string`    |  Placeholder for the text input.	 | `undefined`              |

### `form-field-group` props

| Prop name  | Type | Description                                                                                                                                                                                                                                                                                                           | Default Value |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer`  | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) JSON schema pointer i.e. the JSON schema path  (for example: #/properties/address) in which the form block inputs should be validated against. Note that since you are configuring a `form-field-group` block, the path must not include a schema's sub-property, only a schema's property. | `undefined`     |
| `uiSchema` | `object` | Redefines how the `form-field-groups` block should render each sub-properties declared in the JSON schema path defined in `pointer`. As said previously, the `form-field-groups` already does that by itself, but you can overwrite the sub-properties types through a schema and so redefine how each form block will be rendered. | `undefined`   |

### `form-input.upload` props

| Prop name  | Type | Description                                                                                                                                                                                                                                                                                                           | Default Value |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer`  | `string` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) JSON schema pointer i.e. the JSON schema path  (for example: #/properties/address) in which the form block inputs should be validated against. Note that since you are configuring a `form-field-group` block, the path must not include a schema's sub-property, only a schema's property. | `undefined`     |
| `accept` | `string` | ![https://img.shields.io/badge/-optional-yellow](https://img.shields.io/badge/-optional-yellow) By default the upload input just accept image and PDF format files. If you want to customize it, you can pass the format type that you want following this pattern: `*.TYPEFILE`. You can [read more about the `accept` field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept).

- **`uiSchema` object:**

```js
const UISchema = {
  type: UIType,
  properties: {
    // Note that the definition is recursive
    childName: {UISchema},
    childName: {UISchema},
    // ...
    childName: {UISchema},
  },
}
```

Where `childName` should be replaced for the desired sub-property name and the  `UIType` should be replaced for one of the following values:

  - `default`: will consider the `form-field-group` own logic (e.g. using the [React Hook Form JSON Schema](https://github.com/vtex/react-hook-form-jsonschema) library) for block's rendering;
  - `radio`: the sub-property will be rendered as a `form-input.radiogroup` block.
  - `select`: the sub-property will be rendered as a `form-input.dropdown` block.
  - `input`: the sub-property will be rendered as a `form-input.text` block with `inputType` set to `input`.
  - `hidden`:  the sub-property will be rendered as a `form-input.text` block with `inputType` set to `hidden`.
  - `password`: the sub-property will be rendered as a `form-input.text` block with `inputType` set to `password`.
  - `textArea`: the sub-property will be rendered as a `form-input.textarea` block.
  - `checkbox`: the sub-property will be rendered as a`form-input.checkbox` block.
  - `upload`: the sub-property will be rendered as a`form-input.upload` block.

## App behavior

The JSON schema created in Master Data is firstly responsible for telling form blocks which data they must receive i.e. specifying which kind of input each form field should expect from users.

When the user clicks on the `Submit` button, the form blocks then fetch all input data and send it to the Schema validation. This process of understanding which input they must receive and sending it to Master Data is done by using the [`React Hook Form JSON schema`](https://github.com/vtex/react-hook-form-jsonschema) library behind the scenes.

If any unexpected answer is detected, that is, if the form blocks data does not match the Schema, Master Data won't be able to create an user form and an error message will be returned for the user.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| ----------- |
| `form` |
| `formLoading` |
| `formErrorLoading` |
| `formSubmitContainer` |
| `formSubmitButton` |
| `formErrorServer` |
| `formErrorUserInput` |


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/doruradu"><img src="https://avatars1.githubusercontent.com/u/42587916?v=4" width="100px;" alt=""/><br /><sub><b>doruradu</b></sub></a><br /><a href="https://github.com/vtex-apps/store-form/commits?author=doruradu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/LEduard0"><img src="https://avatars0.githubusercontent.com/u/50236503?v=4" width="100px;" alt=""/><br /><sub><b>Luiz Eduardo</b></sub></a><br /><a href="https://github.com/vtex-apps/store-form/commits?author=LEduard0" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
