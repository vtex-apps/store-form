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

const getNumberValidator = (
  currentObject: JSONSchemaType,
  required: boolean,
  minimum: number | undefined,
  maximum: number | undefined
): ValidationOptions => {
  const validator: ValidationOptions = {
    validate: {
      multipleOf: (value: string) => {
        if (currentObject.type === 'integer') {
          return (
            currentObject.multipleOf &&
            (parseInt(value) % parseInt(currentObject.multipleOf) === 0 ||
              'Must be a multiple of ' + currentObject.multipleOf)
          )
        } else {
          // TODO: implement float checking with epsilon
          return true
        }
      },
    },
  }

  if (required) {
    validator.required = 'This field is required'
  }

  if (currentObject.type === 'integer') {
    validator.pattern = {
      value: /^([+-]?[1-9]\d*|0)$/,
      message: 'Must be an integer',
    }
  } else {
    validator.pattern = {
      value: /^([0-9]+([,.][0-9]+))?$/,
      message: 'Must be a float',
    }
  }

  if (minimum || minimum === 0) {
    validator.min = {
      value: minimum,
      message: 'Must be greater than: ' + minimum,
    }
  }

  if (maximum || maximum === 0) {
    validator.max = {
      value: maximum,
      message: 'Must be lower than: ' + currentObject.maximum,
    }
  }

  return validator
}

type RawNumberInputProps = {
  path: string
  validator: ValidationOptions
  inputType: keyof typeof InputTypes
  min?: number
  max?: number
  step?: number | string
  defaultValue?: string
}

const RawNumberInput: FC<RawNumberInputProps> = props => {
  const { register, watch } = useFormContext()
  const inputProps: React.ComponentProps<'input'> = {}
  inputProps.name = props.path
  inputProps.ref = register(props.validator)
  if (props.step) {
    inputProps.step = props.step
  }
  if (props.defaultValue) {
    inputProps.placeholder = props.defaultValue
  }

  switch (props.inputType) {
    case 'HIDDEN':
      inputProps.type = 'hidden'
      break
    case 'SLIDER':
      if (props.min !== undefined && props.max !== undefined) {
        inputProps.min = props.min
        inputProps.max = props.max
        inputProps.type = 'range'
      }
      break
    default:
      inputProps.type = 'number'
      break
  }

  let currValue = watch(props.path)
  if (currValue === undefined) {
    currValue = props.defaultValue
  }

  return (
    <div>
      <input {...inputProps} className="dib" />
      {props.inputType === 'SLIDER' && <p className="dib">{currValue}</p>}
    </div>
  )
}

export const NumberInput: FC<InputProps> = props => {
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)
  if (!currentObject) {
    return <></>
  }

  // Used for exclusiveMinimum and exlusiveMaximum values
  const epsilon = 0.0001

  // Get dominant step value if it is defined
  const step =
    currentObject.multipleOf !== undefined
      ? currentObject.type === 'integer'
        ? parseInt(currentObject.multipleOf)
        : parseFloat(currentObject.multipleOf)
      : props.step !== undefined
      ? props.step
      : currentObject.type === 'integer'
      ? 1
      : 'any'

  /* Calculates wether there is a minimum or exclusiveMinimum value defined somewhere
   * as it is possible to define it in the schema (predominant) or through props
   * which can NOT replace the values defined in the schema as that would not make
   * sense. */
  let minimum =
    currentObject.exlusiveMinimum !== undefined
      ? currentObject.exlusiveMinimum
      : currentObject.minimum !== undefined
      ? currentObject.minimum
      : props.minimum
  if (minimum !== undefined && currentObject.exlusiveMinimum !== undefined) {
    if (step && step != 'any') {
      minimum += step
    } else {
      minimum += epsilon
    }
  }

  // Does the same thing but for maximum values
  let maximum =
    currentObject.exlusiveMaximum !== undefined
      ? parseFloat(currentObject.exlusiveMaximum)
      : currentObject.maximum !== undefined
      ? parseFloat(currentObject.maximum)
      : props.maximum
  if (maximum !== undefined && currentObject.exlusiveMaximum !== undefined) {
    if (step && step != 'any') {
      maximum -= step
    } else {
      maximum -= epsilon
    }
  }

  // Does the same for the default value
  const defaultValue =
    currentObject.default !== undefined ? currentObject.default : props.default

  const validator = getNumberValidator(
    currentObject,
    props.required !== undefined ? props.required : false,
    minimum,
    maximum
  )

  return (
    <InputWrapper title={currentObject.title} path={props.path}>
      <RawNumberInput
        path={props.path}
        validator={validator}
        inputType={props.inputType}
        min={minimum}
        max={maximum}
        step={step}
        defaultValue={defaultValue}
      />
      <ValidationWarning path={props.path} />
    </InputWrapper>
  )
}
