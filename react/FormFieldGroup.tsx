import React from 'react'
import { UISchemaType } from 'react-hook-form-jsonschema'

import { ObjectRenderer } from './components/ObjectRenderer'
import { BaseInputProps } from './typings/InputProps'

export interface FormFieldGroupProps extends BaseInputProps {
  uiSchema?: UISchemaType
}

export default function FormInput(props: FormFieldGroupProps) {
  return <ObjectRenderer path={props.path} UISchema={props.uiSchema} />
}
