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
import {getMessage} from "../utils/helpers";

export const HiddenInput: FC<FormRawInputProps> = props => {
  const { pointer, value } = props
  const inputObject = useHidden(pointer)
  return <input {...inputObject.getInputProps()} value={value} />
}

export const PasswordInput: FC<FormRawInputProps> = props => {
  const { pointer, label, placeholder, placeholderId } = props
  const inputObject = usePassword(pointer)
  return (
    <Input inputObject={inputObject} label={label} placeholder={placeholder} placeholderId={placeholderId} />
  )
}

export const RawInput: FC<FormRawInputProps> = props => {
  const { pointer, label, labelId, placeholder, placeholderId } = props

  const inputObject = useInput(pointer)
  return (
    <Input inputObject={inputObject} label={label} labelId={labelId} placeholder={placeholder} placeholderId={placeholderId} />
  )
}

export const Input: FC<{
  inputObject: UseRawInputReturnType
  label?: string
  labelId?: string
  placeholder?: string
  placeholderId?: string
}> = props => {
  const { inputObject, placeholder, placeholderId, labelId } = props
  const error = inputObject.getError()

  const subSchema = inputObject.getObject()
  const label = props.label ?? subSchema.title ?? inputObject.name

  return (
    <StyleguideInput
      {...inputObject.getInputProps()}
      label={labelId ? getMessage(`store/form.label-${labelId}`) : label}
      error={!!error}
      errorMessage={useFormattedError(error)}
      placeholder={placeholderId ? getMessage(`store/form.placeholder-${placeholderId}`) : placeholder}
    />
  )
}
