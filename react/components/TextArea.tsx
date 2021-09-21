import React, { FC } from 'react'
import { Textarea as StyleguideTextarea } from 'vtex.styleguide'
import { UseTextAreaReturnType, useTextArea } from 'react-hook-form-jsonschema'

import { BaseInputProps } from '../typings/InputProps'
import { useFormattedError } from '../hooks/useErrorMessage'
import {getMessage} from "../utils/helpers";

export const TextAreaInput: FC<BaseInputProps> = props => {
  const textAreaObject = useTextArea(props.pointer)
  return (
    <TextArea
      textAreaObject={textAreaObject}
      label={props.label}
      labelId={props.labelId}
      placeholder={props.placeholder}
      placeholderId={props.placeholderId}
    />
  )
}

export const TextArea: FC<{
  textAreaObject: UseTextAreaReturnType
  label?: string
  labelId?: string
  placeholder?: string
  placeholderId?: string
}> = props => {
  const { textAreaObject, placeholder, labelId, placeholderId } = props
  const error = textAreaObject.getError()
  const subSchema = textAreaObject.getObject()
  const label = props.label ?? subSchema.title ?? textAreaObject.name

  return (
    <StyleguideTextarea
      {...textAreaObject.getTextAreaProps()}
      label={labelId ? getMessage(`store/form.label-${labelId}`) : label}
      error={!!error}
      errorMessage={useFormattedError(error)}
      placeholder={placeholderId ? getMessage(`store/form.placeholder-${placeholderId}`) : placeholder}
    />
  )
}
