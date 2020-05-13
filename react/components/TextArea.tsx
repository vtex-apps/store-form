import React, { FC } from 'react'
import { Textarea as StyleguideTextarea } from 'vtex.styleguide'
import { UseTextAreaReturnType, useTextArea } from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const TextAreaInput: FC<{ pointer: string }> = props => {
  const textAreaObject = useTextArea(props.pointer)
  return <TextArea textAreaObject={textAreaObject} />
}

export const TextArea: FC<{
  textAreaObject: UseTextAreaReturnType
}> = props => {
  const { textAreaObject } = props
  const error = textAreaObject.getError()

  return (
    <StyleguideTextarea
      {...textAreaObject.getTextAreaProps()}
      label={textAreaObject.getObject().title}
      error={!!error}
      errorMessage={useFormattedError(error)}
    />
  )
}
