import React from 'react'

import { TextAreaInput } from './components/TextAreaRenderer'
import { BaseInputProps } from './typings/InputProps'

export default function FormInput(props: BaseInputProps) {
  return <TextAreaInput {...props} />
}
