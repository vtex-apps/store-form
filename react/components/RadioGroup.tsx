import React, { FC } from 'react'
import { RadioGroup as StyleguideRadioGroup } from 'vtex.styleguide'
import {
  UseRadioReturnType,
  Controller,
  useRadio,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'
import { BaseInputProps } from '../typings/InputProps'
import {getMessage} from "../utils/helpers";

export const RadioGroupInput: FC<BaseInputProps> = props => {
  const { pointer, label, labelId } = props
  const radioObject = useRadio(pointer)
  return <RadioGroup radioObject={radioObject} label={label} labelId={labelId} />
}

export const RadioGroup: FC<{
  radioObject: UseRadioReturnType
  label?: string
  labelId?: string
}> = props => {
  const { radioObject, labelId } = props
  const error = radioObject.getError()

  const subSchema = radioObject.getObject()
  const label = props.label ?? subSchema.title ?? radioObject.name

  return (
    <Controller
      name={radioObject.pointer}
      control={radioObject.formContext.control}
      rules={radioObject.validator}
      as={
        <StyleguideRadioGroup
          name={label}
          required={radioObject.isRequired}
          hideBorder
          label={labelId ? getMessage(`store/form.label-${labelId}`) : label}
          options={radioObject.getItems().map(value => {
            return { value, label: value }
          })}
          error={!!error}
          errorMessage={useFormattedError(error)}
        />
      }
    />
  )
}
