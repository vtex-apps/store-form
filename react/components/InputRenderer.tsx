import React, { FC } from 'react'
import { Input } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  useInput,
  usePassword,
  useHidden,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const HiddenInput: FC<{ pointer: string }> = props => {
  const inputObject = useHidden(props.pointer)
  return <input {...inputObject.getInputProps()} />
}

export const PasswordInput: FC<{ pointer: string }> = props => {
  const inputObject = usePassword(props.pointer)
  return <InputRenderer inputObject={inputObject} />
}

export const RawInput: FC<{ pointer: string }> = props => {
  const inputObject = useInput(props.pointer)
  return <InputRenderer inputObject={inputObject} />
}

export const InputRenderer: FC<{
  inputObject: UseRawInputReturnType
}> = props => {
  const inputObject = props.inputObject
  const error = inputObject.getError()

  return (
    <Input
      {...inputObject.getInputProps()}
      label={inputObject.getObject().title}
      error={error ? true : false}
      errorMessage={useFormattedError(error)}
    />
  )
}
