import React from 'react'

import { RawInput, HiddenInput, PasswordInput } from './components/Input'
import { FormRawInputProps, InputTypes } from './typings/InputProps'

export default function FormInput(props: FormRawInputProps) {
  const { inputType = InputTypes.input, pointer, ...rest } = props

  // eslint-disable-next-line default-case
  switch (inputType) {
    case InputTypes.input:
      return <RawInput pointer={pointer} {...rest} />
    case InputTypes.hidden:
      return <HiddenInput pointer={pointer} {...rest} />
    case InputTypes.password:
      return <PasswordInput pointer={pointer} {...rest} />
  }
}
