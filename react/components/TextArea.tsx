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
      placeholder={props.placeholder}
    />
  )
}

export const TextArea: FC<{
  textAreaObject: UseTextAreaReturnType
  label?: string
  placeholder?: string
}> = props => {
  const { textAreaObject, placeholder } = props
  const error = textAreaObject.getError()
  const subSchema = textAreaObject.getObject()
  const label = props.label ?? subSchema.title ?? textAreaObject.name

  return (
    <StyleguideTextarea
      {...textAreaObject.getTextAreaProps()}
      label={label}
      error={!!error}
      errorMessage={useFormattedError(error)}
      placeholder={placeholder}
    />
  )
}
