# Store Form

Store Form offers utilities to **build a form based on a [Masterdata v2](https://developers.vtex.com/reference#master-data-api-v2-overview)** [JSON Schema](https://json-schema.org/understanding-json-schema/index.html). It handles the creation and submission of the form, automatically or based on select fields from the schema. It also handles validation of the schema and the errors **Masterdata** itself returns when the document sent does not validate against the schema saved on it.

To handle the schema this block uses the [`react-hook-form-jsonschema`](https://github.com/vtex/react-hook-form-jsonschema) library under the hood.

## Table of Contents

- [Store Form](#store-form)
  - [Configuration](#configuration)
    - [form](#form)
    - [form-input](#form-input)
    - [form-input.input](#form-inputinput)
    - [form-field-group](#form-field-group)
  - [Example usage](#example-usage)

## Configuration

There are **multiple building blocks of Store Form**:

- The `form`: This is the top level block in which you will specify which entity and schema from `Masterdata v2` to use for building and submitting your form.
- The `form-input.checkbox`: This block will render a checkbox in the form.
- The `form-input.dropdown`: This block will render a dropdown in the form.
- The `form-input.input`: This block will render a simple text input in the form.
- The `form-input.radiogroup`: This block will render a group of radio buttons in the form.
- The `form-input.textarea`: This block will render a textarea input in the form.
- The `form-field-group`: This block will, based on the schema provided, automatically build a form based on the provided path in the schema.
- The `form-submit`: This block will render a button to submit the form content.

If `form-input` family of blocks, `form-field-group` or `form-submit` are used, they **need** to be children of a `form` block.

### `form`

If `form` does not have any children the default behaviour will be to try to generate a form automatically based on the JSON Schema provided. If it has children it will simply ccreate a context for the blocks `form-input` and `form-submit` to use.

| **Props** | **Type** | **Description**                                                                                                                                         | **Default Value** |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `entity`  | `String` | The entity in `Masterdata v2` where the document will be saved. This field is **required**.                                                             | `""`              |
| `schema`  | `String` | The schema **already** in `Masterdata v2` against which the form content will be validated and the form will be built upon. This field is **required**. | `""`              |

### `form-input`

All of the blocks of the `form-input` family share the following props:

| **Props** | **Type** | **Description**                                                                                                                                                                                                                                                                                                            | **Default Value** |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `path`    | `String` | Path in the jsonschema this input is validated against. The path is always in the form: `#/some/child/data/field/here` where `#` represents the root of the schema, and the `some/child/data/field/here` represents the tree of objects (from `some` to `here`) to get to the desired field, which in this case is `here`. | `""`              |

### `form-input.input`

Besides the common props, this field accepts the following props:

| **Props**   | **Type**                                  | **Description**                                                                                                                                                                                                                          | **Default Value** |
| ----------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `inputType` | `input` &#124; `hidden` &#124; `password` | Defines the type of the text input to be rendered: <br>`input`: renders a normal text input.<br>`hidden`: Does not render an input, but adds it's value to the submitted document. <br>`password`: Renders an input as a password field. | `input`           |

### `form-field-group`

| **Props**  | **Type** | **Description**                                                                                                                                                                                                                                                                                                | **Default Value** |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `path`     | `String` | Path in the jsonschema this input is validated against. The path is always in the form: #/some/child/data/field/here where # represents the root of the schema, and the some/child/data/field/here represents the tree of objects (from some to here) to get to the desired field, which in this case is here. | `""`              |
| `uiSchema` | `object` | This UISchema is a modified schema type, relative to the object passed in the `path` prop, the format of the UISchema is described bellow.                                                                                                                                                                     | `{}`              |

The uiSchema has the following schema format:

```js
const UISchema = {
  /*
   *  This is the type that will be used to choose what type of input will be
   *  used to build the specified field. Please note that the type of a node
   *  that is an object will be ignored, as there would make no sense to render
   *  an object without it's children inside a form.
   */
  type: UITypes,
  properties: {
    // Note that the definition is recursive
    child1NameHere: UISchema,
    child2NameHere: UISchema,
    // ...
    childXNameHere: UISchema,
  },
}
```

Also note that, regardless if the child is represented in the uiSchema or not, they will still be rendered, to prevent rendering a child use the `hidden` prop in the type.

- The **`UITypes`** is an enum with the following values:
  - `default`: input will have a default type based on what [`react-hook-form-jsonschema`](https://github.com/vtex/react-hook-form-jsonschema) thinks is better.
  - `radio`: will render a `form-input.radiogroup` block.
  - `select`: will render a `form-input.dropdown` block.
  - `input`: will render a `form-input.input` block with `inputType` set to `input`.
  - `hidden`: will render a `form-input.input` block with `inputType` set to `hidden`.
  - `password`: will render a `form-input.input` block with `inputType` set to `password`.
  - `textArea`: will render a `form-input.textarea` block.
  - `checkbox`: will render a `form-input.checkbox` block.

![image](https://user-images.githubusercontent.com/19346539/73478292-97c8ad80-4374-11ea-961e-b02c8114ced7.png)

## Example usage

Suppose you have a schema, called `person` with the following format saved on a `Masterdata v2` entity called `clients`

```JSON
{
  "title": "Person",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First Name",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "title": "Last Name",
      "description": "The person's last name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "title": "Age",
      "type": "integer",
      "minimum": 0,
      "maximum": 120
    },
    "height": {
      "type": "number",
      "minimum": 0.8,
      "maximum": 2.9,
      "title": "Your height in meters",
      "multipleOf": 0.01
    },
    "emailAddress": {
      "type": "string",
      "format": "email",
      "title": "Email address"
    },
    "address": {
      "title": "Address",
      "type": "object",
      "properties": {
        "streetType": {
          "type": "string",
          "title": "Street Type",
          "enum": [
            "street",
            "road",
            "avenue",
            "boulevard"
          ]
        },
        "streetAddress": {
          "type": "string",
          "title": "Address"
        },
        "streetNumber": {
          "type": "integer",
          "title": "Street Number"
        }
      },
      "required": [
        "streetType", "streetAddress", "streetNumber"
      ]
    },
    "agreement": {
      "type": "boolean",
      "title": "Do you agree with the terms?"
    }
  },
  "required": [
    "firstName",
    "lastName",
    "agreement"
  ]
}
```

If you simply declare your form without children:

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
    "entity": "clients",
    "schema": "person"
  }
}
```

the block will spit out something similar to the following:
![image](https://user-images.githubusercontent.com/19346539/73480179-2c80da80-4378-11ea-8b94-6d9df856d6d2.png)

Suppose now that you only want to render the required fields and don't care about the rest, you can do the following (also notice I added a `uiSchema` to the `"streetType"` field making it a `RadioGroup` instead of a `Dropdown`):

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
    "children": [
      "form-input.input#firstName",
      "form-input.input#lastName",
      "form-field-group#address",
      "form-input.checkbox#agreement",
      "form-submit"
    ]
  },
  "form-input.input#firstName": {
    "props": {
      "path": "#/firstName"
    }
  },
  "form-input.input#lastName": {
    "props": {
      "path": "#/lastName"
    }
  },
  "form-input.checkbox#agreement": {
    "props": {
      "path": "#/agreement"
    }
  },
  "form-field-group#address": {
    "props": {
      "path": "#/address",
      "uiSchema": {
	"type": "default",
	"properties": {
	  "streetType": {
	    "type": "radio"
	  }
	}
      }
    }
  },
  "form-submit": {
    "props": {
      "label": "Submit"
    }
  }
}
```

then the block will make out something similar to the following:
![image](https://user-images.githubusercontent.com/19346539/73491020-75428e80-438c-11ea-8217-4fb7696348b2.png)
