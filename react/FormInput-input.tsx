import React from 'react'

import {
  RawInput,
  HiddenInput,
  PasswordInput,
} from './components/InputRenderer'

export enum InputTypes {
  input = 'input',
  hidden = 'hidden',
  password = 'password',
}
export type FormInputProps = {
  path: string
  inputType: InputTypes
}

export default function FormInput(props: FormInputProps) {
  const { inputType = InputTypes.input } = props

  switch (inputType) {
    case InputTypes.input:
      return <RawInput path={props.path} />
    case InputTypes.hidden:
      return <HiddenInput path={props.path} />
    case InputTypes.password:
      return <PasswordInput path={props.path} />
  }
}
