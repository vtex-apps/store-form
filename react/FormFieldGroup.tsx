import React from 'react'
import { UISchemaType } from 'react-hook-form-jsonschema'

import { ObjectRenderer } from './components/ObjectRenderer'

export type FormFieldGroupProps = {
  path: string
  uiSchema: UISchemaType
}

export default function FormInput(props: FormFieldGroupProps) {
  return <ObjectRenderer path={props.path} UISchema={props.uiSchema} />
}
