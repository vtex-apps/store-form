import React from 'react'

import { RadioGroupInput } from './components/RadioGroupRenderer'
import { BaseInputProps } from './typings/InputProps'

export default function FormInputRadiogroup(props: BaseInputProps) {
  return <RadioGroupInput pointer={props.pointer} />
}
