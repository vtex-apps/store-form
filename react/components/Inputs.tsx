import React, { FC, useContext } from 'react'
import { FieldError, useFormContext, ValidationOptions } from 'react-hook-form'

import { concatFormPath, getObjectFromPath } from '../modules/JSONPathHandler'

import {
  InputWrapperProps,
  InputProps,
  FormSchemaContext,
  SelectProps,
  ErrorWarningProps,
} from './InputTypes'

const InputWrapper: FC<InputWrapperProps> = props => {
  return (
    <>
      <label className="db" htmlFor={props.path}>
        {props.title}
      </label>
      {props.children}
    </>
  )
}

const Select: FC<SelectProps> = props => {
  const { register } = useFormContext()

  return (
    <select name={props.path} ref={register(props.validator)}>
      {props.options.map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  )
}

const ErrorWarning: FC<ErrorWarningProps> = props => {
  const { errors } = useFormContext()
  return (
    <>
      {errors[props.path] && (
        <p>{(errors[props.path] as FieldError).message}</p>
      )}
    </>
  )
}

const BooleanInput: FC<InputProps> = props => {
  const { register } = useFormContext()
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)
  if (!currentObject) {
    return <></>
  }

  return (
    <InputWrapper title={currentObject.title} path={props.path}>
      <input
        name={props.path}
        type="checkbox"
        ref={register}
        required={props.required}
      />
      <ErrorWarning path={props.path} />
    </InputWrapper>
  )
}

const NumberInput: FC<InputProps> = props => {
  const { register, watch } = useFormContext()
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

  const inputProps: React.ComponentProps<'input'> = {}
  inputProps.name = props.path
  inputProps.ref = register(validator)
  inputProps.required = props.required
  if (step) {
    inputProps.step = step
  }
  if (defaultValue) {
    inputProps.placeholder = defaultValue
  }

  switch (props.inputType) {
    case 'SLIDER':
      if (minimum !== undefined && maximum !== undefined) {
        inputProps.min = minimum
        inputProps.max = maximum
        inputProps.type = 'range'
      }
      break
    default:
      inputProps.type = 'number'
      break
  }

  let currValue = watch(props.path)
  if (currValue === undefined) {
    currValue = defaultValue
  }

  return (
    <InputWrapper title={currentObject.title} path={props.path}>
      <div>
        <input {...inputProps} className="dib" />
        {props.inputType === 'SLIDER' && <p className="dib">{currValue}</p>}
      </div>
      <ErrorWarning path={props.path} />
    </InputWrapper>
  )
}

const StringInput: FC<InputProps> = props => {
  const { register } = useFormContext()
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)

  const validator: ValidationOptions = {}
  if (!currentObject) {
    return <></>
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

  return (
    <InputWrapper title={currentObject.title} path={props.path}>
      {currentObject.enum ? (
        <Select
          path={props.path}
          options={currentObject.enum}
          validator={validator}
        />
      ) : (
        <input
          name={props.path}
          ref={register(validator)}
          type={inputType}
          required={props.required}
        />
      )}
      <ErrorWarning path={props.path} />
    </InputWrapper>
  )
}

const FieldBuilder: FC<InputProps> = props => {
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)
  if (!currentObject) {
    return <></>
  }

  switch (currentObject.type) {
    case 'boolean': {
      return <BooleanInput {...props} />
    }
    case 'number':
    case 'integer': {
      return <NumberInput {...props} />
    }
    case 'string': {
      return <StringInput {...props} />
    }
    case 'object': {
      const children: JSX.Element[] = []
      const objKeys = Object.keys(currentObject.properties)
      for (const key of objKeys) {
        let required: boolean
        if (
          currentObject.required &&
          (currentObject.required as Array<string>).indexOf(key) > -1
        ) {
          required = true
        } else {
          required = false
        }
        children.push(
          <FieldBuilder
            {...props}
            path={concatFormPath(props.path, key)}
            required={required}
          />
        )
      }
      return (
        <>
          <p>{currentObject.title}</p>
          {children}
        </>
      )
    }
    default: {
      return null
    }
  }
}

export { InputWrapper, NumberInput, FieldBuilder }
