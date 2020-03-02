# Store Form

The Store Form app provides blocks responsible for displaying an user form connected to [**Master Data v2**](https://help.vtex.com/tutorial/master-data-v2--3JJ1mlzuo88w22gO0gy0QS) through a [JSON schema](https://json-schema.org/understanding-json-schema/index.html).

![image](https://user-images.githubusercontent.com/19346539/73491020-75428e80-438c-11ea-8217-4fb7696348b2.png)

## Configuration 

1. Create your [**JSON schema**](https://json-schema.org/understanding-json-schema/index.html) on Master Data v2. For that, you will need to make a request to the [Master Data schema API](https://developers.vtex.com/reference#saveschemabyname), copying the following example in the request's body and use it as a default to make any required properties change (according to your store’s scenario):

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
      "minimum": 0.3,
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
  {
    "v-security": {
      "publicWrite": [ "publicForWrite" ],
      "publicJsonSchema": true
    }
  }
}
```

:information_source: *When creating your schema and defining its properties, bear in mind that the schema's language will define the form default language as well.*

2. Add `store-form` app to your theme's dependencies in the `manifest.json`, for example:

```JSON
dependencies: {
  "vtex.store-form": "0.x"
}
```

Now, you are able to use all blocks exported by the `store-form` app. Check out the full list below:

| Block name     | Description                                     |
| -------------- | ----------------------------------------------- |
| `form` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)  Top level block in which you will specify which entity and schema from `Masterdata v2` will be used for building the form. It provides context to all its 8 children blocks (listed below).   |
| `form-input-checkbox` | Renders a checkbox field in the form. |
| `form-input-dropdown` | Renders a dropdown field in the form. |
| `form-input-radiogroup` | Renders a radio buttons field in the form.|
| `form-input-textarea` | Renders a big text field in the form. |
| `form-input-text` | Renders a small text field in the form which has few available characters. |
| `form-field-group` | Renders different form blocks (such as `form-input-radiogroup` and `form-input-text`) according to each schema's sub-properties type. |
| `form-submit` | Renders a button to submit the user form content. |
| `form-success` | Accepts an array of blocks that will be rendered when the form is successfully submitted. Any children block is valid. | 

3. In any desired store template, such as the `store.product`, add the `form` block. 
In the example below, the form block is contained in a Flex Layout row:

```JSON
{
 "store.product": {
  "children": [
   "flex-layout.row#product-breadcrumb",
   "flex-layout.row#product-main"
+  "flex-layout.row#form",
   "shelf.relatedProducts",
   "product-reviews",
   "product-questions-and-answers"
 ]
},
```

4.  Then, declare the `form` block. Bear in mind to specify which `entity` and `schema` from Master Data should be fetched to build the block.

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

:warning: *If the `form` block does not have any children configured, **a default form will be rendered** automatically based on the JSON schema in Master Data. This reading and interpretation of  JSON schemas is due to the [`React Hook Form JSON schema`](https://github.com/vtex/react-hook-form-jsonschema) library (which is supporting the Store Form blocks logic behind the scenes.*


| **Props** | **Type** | **Description**                                                                                                                                         | **Default Value** |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `entity`  | `String` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)   The [entity](https://help.vtex.com/tutorial/creating-data-entity--tutorials_1265) in `Masterdata v2` where the document will be saved.             | `undefined`              |
| `schema`  | `String` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) The JSON schema name that will be used. The schema name is set in the API's request to create it in `Masterdata v2`.| `undefined`   

5. If desired,  complete the `form` block by adding and configuring an array of children blocks.  For example: 

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

-  `form-input.radiogroup`, `form-input.dropdown`, `form-input.textarea` and `form-input.checkbox`

| Prop | Type | Description                                                                                                                                                                                                                                          | Default Value  |
| --------| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer` | `String` |  ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red)  JSON schema pointer i.e. the JSON schema path  (for example: #/properties/firstName) in which the form block inputs should be validated against. | `undefined`              |
| `label` | `String` |  ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Field's name when rendered | Property's title  |

-  `form-input.text`

| **Props**   | **Type**                                  | **Description**                                                                                                                                                                                                                                          | **Default Value** |
| ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer`   | `String`    | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) JSON schema pointer i.e. the JSON schema path  (for example: #/properties/firstName) in which the form block inputs should be validated against. | `undefined`              |
| `inputType` | `Enum` | Defines which type of a text field should be rendered: <br>`input`: renders a normal text field.<br>`hidden`: does not render any text field. It should be used in scenarios in which you want to pre-define a field value to be submitted to the form but that shouldn't be visible (and therefore editable) to users. <br>`password`: renders a password text field.                 | `input`           |
| `label` | `String` |  ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Field's name when rendered | Property's title  |

-  `form-field-group`

| **Props**  | **Type** | **Description**                                                                                                                                                                                                                                                                                                           | **Default Value** |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `pointer`  | `String` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) JSON schema pointer i.e. the JSON schema path  (for example: #/properties/address) in which the form block inputs should be validated against. Note that since you are configuring a `form-field-group` block, the path must not include a schema's sub-property, only a schema`s property. | `undefined`              |
| `uiSchema` | `object` | Redefines how the `form-field-groups` block should render each sub-properties declared in the JSON schema path defined in `pointer`. As said previously, the `form-field-groups` already does that by itself, but you can overwrite the sub-properties types through a schema and so redefine which form block will be rendered. | `undefined`   |

The `uiSchema` object must have the following schema format:

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

Where `childName` should be replaced for the desired sub-property name and the  `UIType` should be replaced for the following values:

  - `default`: will consider the `form-field-group` own logic (the [React Hook Form JSON Schema](https://github.com/vtex/react-hook-form-jsonschema) library) for block's rendering;
  - `radio`: the sub-property will be rendered as a `form-input.radiogroup` block.
  - `select`: the sub-property will be rendered as a `form-input.dropdown` block.
  - `input`: the sub-property will be rendered as a `form-input.text` block with `inputType` set to `input`.
  - `hidden`:  the sub-property will be rendered as a `form-input.text` block with `inputType` set to `hidden`.
  - `password`: the sub-property will be rendered as a `form-input.text` block with `inputType` set to `password`.
  - `textArea`: the sub-property will be rendered as a `form-input.textarea` block.
  - `checkbox`: the sub-property will be rendered as a`form-input.checkbox` block.

## Modus operandi

The JSON schema created in Master Data v2 is firstly responsible for telling form blocks which data they must receive i.e. specifying which kind of input each form field should expect from users.

When the user clicks on the `Submit` button, the form blocks then fetch all input data and send it to the Schema validation. This process of understanding which input they must receive and sending it to Master Data is done by using the [`React Hook Form JSON schema`](https://github.com/vtex/react-hook-form-jsonschema) library behind the scenes.

If any unexpected answer is detected, that is, if the form blocks data does not match the Schema, Master Data won't be able to create an user form and an error message will be returned.

:warning: Notice that all configuration and interaction with user forms must be through Master Data v2, not v1. The newest version doesn't have an interface yet, so you will have to do it through [APIs](https://developers.vtex.com/reference#master-data-api-v1-overview). 

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

` 
