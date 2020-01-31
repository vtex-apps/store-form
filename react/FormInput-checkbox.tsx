import React from 'react'

import { CheckboxInput } from './components/CheckboxRenderer'
import { BaseInputProps } from './typings/InputProps'

export default function FormInput(props: BaseInputProps) {
  return <CheckboxInput path={props.path} />
}
