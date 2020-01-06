import React, { FC, useContext } from 'react'
import { useFormContext, ValidationOptions } from 'react-hook-form'

import {
  InputProps,
  FormSchemaContext,
  InputTypes,
  JSONSchemaType,
} from '../InputTypes'
import { ValidationWarning } from '../ValidationWarning'
import { getObjectFromPath } from '../../modules/JSONPathHandler'

import { InputWrapper } from './InputWrapper'
import { SelectWrapper } from './SelectWrapper'

const getStringFieldValidator = (
  currentObject: JSONSchemaType,
  required: boolean
): ValidationOptions => {
  const validator: ValidationOptions = {}

  if (required) {
    validator.required = 'This field is required'
  }

  if (currentObject.minLength) {
    validator.minLength = {
      value: currentObject.minLength,
      message: 'Must have at least ' + currentObject.minLength + ' characters!',
    }
  }

  if (currentObject.maxLength) {
    validator.maxLength = {
      value: currentObject.maxLength,
      message:
        'Must have at maximum ' + currentObject.maxLength + ' characters!',
    }
  }

  if (currentObject.pattern) {
    validator.pattern = {
      value: new RegExp(currentObject.pattern),
      message: 'Insert a valid input!',
    }
  }
  return validator
}

type RawStringInputProps = {
  currentObject: JSONSchemaType
  inputType: keyof typeof InputTypes
  validator: ValidationOptions
  path: string
  required?: boolean
}

const RawStringInput: FC<RawStringInputProps> = props => {
  const { register } = useFormContext()

  if (props.currentObject.enum) {
    if (props.inputType === 'RADIO') {
      const radios = props.currentObject.enum.map((value: string) => (
        <div key={value}>
          <input
            name={props.path}
            ref={register(props.validator)}
            type="radio"
            required={props.required}
            id={value}
            value={value}
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))

      return (
        <>
          <label>{props.currentObject.time}</label>
          {radios}
        </>
      )
    } else {
      return (
        <SelectWrapper
          path={props.path}
          options={props.currentObject.enum}
          validator={props.validator}
        />
      )
    }
  } else {
    let inputType: string
    switch (props.currentObject.format) {
      case 'date-time':
        inputType = 'datetime-local'
        break
      case 'email':
        inputType = 'email'
        break
      case 'hostname':
        inputType = 'url'
        break
      case 'uri':
        inputType = 'url'
        break

      default:
        inputType = 'text'
    }
    return (
      <input
        name={props.path}
        ref={register(props.validator)}
        type={inputType}
        required={props.required}
      />
    )
  }
}

export const StringInput: FC<InputProps> = props => {
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)

  if (!currentObject) {
    return <></>
  }

  const validator = getStringFieldValidator(
    currentObject,
    props.required !== undefined ? props.required : false
  )

  return (
    <InputWrapper title={currentObject.title} path={props.path}>
      <RawStringInput
        currentObject={currentObject}
        inputType={props.inputType}
        validator={validator}
        path={props.path}
        required={props.required}
      />
      <ValidationWarning path={props.path} />
    </InputWrapper>
  )
}
