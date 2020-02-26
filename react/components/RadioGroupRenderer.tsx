import React, { FC } from 'react'
import { RadioGroup } from 'vtex.styleguide'
import {
  UseRadioReturnType,
  Controller,
  useRadio,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'
import { BaseInputProps } from '../typings/InputProps'

export const RadioGroupInput: FC<BaseInputProps> = props => {
  const radioObject = useRadio(props.pointer)
  return <RadioGroupRenderer radioObject={radioObject} label={props.label} />
}

export const RadioGroupRenderer: FC<{
  radioObject: UseRadioReturnType
  label?: string
}> = props => {
  const radioObject = props.radioObject
  const error = radioObject.getError()

  const subSchema = radioObject.getObject()
  const label = props.label ?? subSchema.title ?? radioObject.name

  return (
    <Controller
      name={radioObject.pointer}
      control={radioObject.formContext.control}
      rules={radioObject.validator}
      as={
        <RadioGroup
          name={label}
          required={radioObject.isRequired}
          hideBorder
          label={label}
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
