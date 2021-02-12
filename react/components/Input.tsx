import React, { FC } from 'react'
import { Input as StyleguideInput } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  useInput,
  usePassword,
  useHidden,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'
import { FormRawInputProps } from '../typings/InputProps'

export const HiddenInput: FC<FormRawInputProps> = props => {
  const { pointer, value } = props
  const inputObject = useHidden(pointer)
  return <input {...inputObject.getInputProps()} value={value} />
}

export const PasswordInput: FC<FormRawInputProps> = props => {
  const { pointer, label, placeholder } = props
  const inputObject = usePassword(pointer)
  return (
    <Input inputObject={inputObject} label={label} placeholder={placeholder} />
  )
}

export const RawInput: FC<FormRawInputProps> = props => {
  const { pointer, label, placeholder } = props
  const inputObject = useInput(pointer)
  return (
    <Input inputObject={inputObject} label={label} placeholder={placeholder} />
  )
}

export const Input: FC<{
  inputObject: UseRawInputReturnType
  label?: string
  placeholder?: string
}> = props => {
  const { inputObject, placeholder } = props
  const error = inputObject.getError()

  const subSchema = inputObject.getObject()
  const label = props.label ?? subSchema.title ?? inputObject.name

  return (
    <StyleguideInput
      {...inputObject.getInputProps()}
      label={label}
      error={!!error}
      errorMessage={useFormattedError(error)}
      placeholder={placeholder}
    />
  )
}
