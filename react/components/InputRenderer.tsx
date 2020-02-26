import React, { FC } from 'react'
import { Input } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  useInput,
  usePassword,
  useHidden,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'
import { FormRawInputProps } from '../typings/InputProps'

export const HiddenInput: FC<FormRawInputProps> = props => {
  const inputObject = useHidden(props.pointer)
  return <input {...inputObject.getInputProps()} />
}

export const PasswordInput: FC<FormRawInputProps> = props => {
  const inputObject = usePassword(props.pointer)
  return <InputRenderer inputObject={inputObject} label={props.label} />
}

export const RawInput: FC<FormRawInputProps> = props => {
  const inputObject = useInput(props.pointer)
  return <InputRenderer inputObject={inputObject} label={props.label} />
}

export const InputRenderer: FC<{
  inputObject: UseRawInputReturnType
  label?: string
}> = props => {
  const inputObject = props.inputObject
  const error = inputObject.getError()

  const subSchema = inputObject.getObject()
  const label = props.label ?? subSchema.title ?? inputObject.name

  return (
    <Input
      {...inputObject.getInputProps()}
      label={label}
      error={error ? true : false}
      errorMessage={useFormattedError(error)}
    />
  )
}
