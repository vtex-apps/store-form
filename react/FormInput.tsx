import React from 'react'

import { CheckboxInput } from './components/CheckboxRenderer'
import { RadioGroupInput } from './components/RadioGroupRenderer'
import {
  RawInput,
  HiddenInput,
  PasswordInput,
} from './components/InputRenderer'
import { DropdownInput } from './components/DropdownRenderer'
import { TextAreaInput } from './components/TextAreaRenderer'
import { ObjectRenderer } from './components/ObjectRenderer'

export enum InputTypes {
  radiogroup = 'radioGroup',
  checkbox = 'checkbox',
  input = 'input',
  hidden = 'hidden',
  password = 'password',
  dropdown = 'dropdown',
  textarea = 'textarea',
  object = 'object',
  defaultInput = 'default',
}
export type FormInputProps = {
  path: string
  inputType: InputTypes
}

export default function FormInput(props: FormInputProps) {
  switch (props.inputType) {
    case InputTypes.radiogroup:
      return <RadioGroupInput path={props.path} />
    case InputTypes.checkbox:
      return <CheckboxInput path={props.path} />
    case InputTypes.input:
      return <RawInput path={props.path} />
    case InputTypes.hidden:
      return <HiddenInput path={props.path} />
    case InputTypes.password:
      return <PasswordInput path={props.path} />
    case InputTypes.dropdown:
      return <DropdownInput path={props.path} />
    case InputTypes.textarea:
      return <TextAreaInput path={props.path} />
    default:
      return <ObjectRenderer path={props.path} />
  }
}
