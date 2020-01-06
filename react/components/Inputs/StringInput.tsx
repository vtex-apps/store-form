import React, { FC, useContext } from 'react'
import { useFormContext, ValidationOptions } from 'react-hook-form'

import { InputProps, FormSchemaContext } from '../InputTypes'
import { ValidationWarning } from '../ValidationWarning'
import { getObjectFromPath } from '../../modules/JSONPathHandler'

import { InputWrapper } from './InputWrapper'
import { SelectWrapper } from './SelectWrapper'

export const StringInput: FC<InputProps> = props => {
  const { register } = useFormContext()
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)

  if (!currentObject) {
    return <></>
  }

  const validator: ValidationOptions = {}

  if (props.required) {
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

  let input = <></>
  if (currentObject.enum) {
    if (props.inputType === 'RADIO') {
      input = currentObject.enum.map((value: string) => (
        <div className="db" key={value}>
          <input
            name={props.path}
            ref={register(validator)}
            type="radio"
            required={props.required}
            id={value}
            value={value}
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))
    } else if (props.inputType === 'SELECT' || props.inputType === 'DEFAULT') {
      input = (
        <SelectWrapper
          path={props.path}
          options={currentObject.enum}
          validator={validator}
        />
      )
    }
  } else {
    let inputType: string
    switch (currentObject.format) {
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
    input = (
      <input
        name={props.path}
        ref={register(validator)}
        type={inputType}
        required={props.required}
      />
    )
  }

  return (
    <InputWrapper title={currentObject.title} path={props.path}>
      {input}
      <ValidationWarning path={props.path} />
    </InputWrapper>
  )
}
