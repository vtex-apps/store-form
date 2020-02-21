import React, { FC } from 'react'
import { Textarea } from 'vtex.styleguide'
import { UseTextAreaReturnType, useTextArea } from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const TextAreaInput: FC<{ pointer: string }> = props => {
  const textAreaObject = useTextArea(props.pointer)
  return <TextAreaRenderer textAreaObject={textAreaObject} />
}

export const TextAreaRenderer: FC<{
  textAreaObject: UseTextAreaReturnType
}> = props => {
  const textAreaObject = props.textAreaObject
  const error = textAreaObject.getError()

  return (
    <Textarea
      {...textAreaObject.getTextAreaProps()}
      label={textAreaObject.getObject().title}
      error={error ? true : false}
      errorMessage={useFormattedError(error)}
    />
  )
}
