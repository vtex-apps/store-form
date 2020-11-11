import React, { FC } from 'react'
import { Input as StyleguideInput } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  useInput,
  usePassword,
  useHidden,
} from 'react-hook-form-jsonschema'
import { useIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import { useFormattedError } from '../hooks/useErrorMessage'
import { FormRawInputProps } from '../typings/InputProps'

export const HiddenInput: FC<FormRawInputProps> = props => {
  const { pointer } = props
  const inputObject = useHidden(pointer)
  return <input {...inputObject.getInputProps()} />
}

export const PasswordInput: FC<FormRawInputProps> = props => {
  const { pointer, label } = props
  const inputObject = usePassword(pointer)
  return <Input inputObject={inputObject} label={label} />
}

export const RawInput: FC<FormRawInputProps> = props => {
  const { pointer, label, placeholderText } = props
  const inputObject = useInput(pointer)
  return (
    <Input
      inputObject={inputObject}
      label={label}
      placeholderText={placeholderText}
    />
  )
}

export const Input: FC<{
  inputObject: UseRawInputReturnType
  label?: string
  placeholderText?: string
}> = props => {
  const { inputObject, placeholderText } = props
  const error = inputObject.getError()
  const intl = useIntl()

  const subSchema = inputObject.getObject()
  const label = props.label ?? subSchema.title ?? inputObject.name

  return (
    <StyleguideInput
      {...inputObject.getInputProps()}
      label={label}
      error={!!error}
      errorMessage={useFormattedError(error)}
      placeholder={formatIOMessage({ id: placeholderText, intl })}
    />
  )
}
