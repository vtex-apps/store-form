import React, { FC } from 'react'
import { RadioGroup } from 'vtex.styleguide'
import {
  UseRadioReturnType,
  Controller,
  useRadio,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const RadioGroupInput: FC<{ path: string }> = props => {
  const radioObject = useRadio(props.path)
  return <RadioGroupRenderer radioObject={radioObject} />
}

export const RadioGroupRenderer: FC<{
  radioObject: UseRadioReturnType
}> = props => {
  const radioObject = props.radioObject
  const error = radioObject.getError()

  return (
    <Controller
      name={radioObject.path}
      control={radioObject.formContext.control}
      rules={radioObject.validator}
      as={
        <RadioGroup
          name={radioObject.getObject().title}
          required={radioObject.isRequired}
          hideBorder
          label={radioObject.getObject().title}
          options={radioObject.getItems().map(value => {
            return { value: value, label: value }
          })}
          error={error ? true : false}
          errorMessage={useFormattedError(error)}
        />
      }
    />
  )
}
