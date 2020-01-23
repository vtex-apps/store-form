import React, { FC } from 'react'
import { FormContext, JSONSchemaType } from 'react-hook-form-jsonschema'

import jsonSchema from './mockJSONSchema'
import { ObjectRenderer } from './components/ObjectRenderer'
import FormSubmit from './FormSubmit'

const onSubmit = (data: JSONSchemaType) =>
  // eslint-disable-next-line no-console
  console.log(data)

const MakeForm: FC = props => {
  return (
    <FormContext schema={jsonSchema} onSubmit={onSubmit}>
      {props.children}
    </FormContext>
  )
}

type FormProps = {
  entity: string
  schema: string
}

const Form: FC<FormProps> = () => {
  return (
    <MakeForm>
      <ObjectRenderer path="#" />
      <FormSubmit label="Submit" />
    </MakeForm>
  )
}

export default Form
