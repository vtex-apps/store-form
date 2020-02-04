import React, { FC } from 'react'
import { Input } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  useInput,
  usePassword,
  useHidden,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const HiddenInput: FC<{ path: string }> = props => {
  const inputObject = useHidden(props.path)
  return <input {...inputObject.getInputProps()} />
}

export const PasswordInput: FC<{ path: string }> = props => {
  const inputObject = usePassword(props.path)
  return <InputRenderer inputObject={inputObject} />
}

export const RawInput: FC<{ path: string }> = props => {
  const inputObject = useInput(props.path)
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
