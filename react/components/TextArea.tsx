import React, { FC } from 'react'
import { Textarea as StyleguideTextarea } from 'vtex.styleguide'
import { UseTextAreaReturnType, useTextArea } from 'react-hook-form-jsonschema'

import { BaseInputProps } from '../typings/InputProps'
import { useFormattedError } from '../hooks/useErrorMessage'

export const TextAreaInput: FC<BaseInputProps> = props => {
  const textAreaObject = useTextArea(props.pointer)
  return (
    <TextArea
      textAreaObject={textAreaObject}
      label={props.label}
      placeholderText={props.placeholderText}
    />
  )
}

export const TextArea: FC<{
  textAreaObject: UseTextAreaReturnType
  label?: string
  placeholderText?: string
}> = props => {
  const { textAreaObject, placeholderText } = props
  const error = textAreaObject.getError()
  const subSchema = textAreaObject.getObject()
  const label = props.label ?? subSchema.title ?? textAreaObject.name

  return (
    <StyleguideTextarea
      {...textAreaObject.getTextAreaProps()}
      label={label}
      error={!!error}
      errorMessage={useFormattedError(error)}
      placeholder={placeholderText}
    />
  )
}
