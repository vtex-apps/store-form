import React, { FC } from 'react'
import { FormContext, useForm } from 'react-hook-form'

import jsonSchema from './mockJSONSchema'
import { FormSchemaContext } from './components/InputTypes'
import { FieldBuilder } from './components/Inputs'
import { buildObjectFromFormData } from './modules/JSONPathHandler'

const onSubmit = (data: { [key: string]: string }) =>
  // eslint-disable-next-line no-console
  console.log(buildObjectFromFormData(data, jsonSchema))

const FormSubmit: FC = props => {
  const methods = useForm()
  return (
    <FormSchemaContext.Provider value={jsonSchema}>
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{props.children}</form>
      </FormContext>
    </FormSchemaContext.Provider>
  )
}

type FormProps = {
  entity: string
  schema: string
}

const Form: FC<FormProps> = props => {
  const body = props.children ? (
    props.children
  ) : (
    <>
      <FieldBuilder path="#" inputType="DEFAULT" />
      <input type="submit" />
    </>
  )

  return <FormSubmit>{body}</FormSubmit>
}

export default Form
