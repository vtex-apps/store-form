import React, { FC } from 'react'
import { useFormContext, FieldError } from 'react-hook-form'

import { ValidationWarningProps } from './InputTypes'

export const ValidationWarning: FC<ValidationWarningProps> = props => {
  const { errors } = useFormContext()

  return (
    <>
      {errors[props.path] && (
        <p>{(errors[props.path] as FieldError).message}</p>
      )}
    </>
  )
}
