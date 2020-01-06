import React, { FC, useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { InputProps, FormSchemaContext } from '../InputTypes'
import { ValidationWarning } from '../ValidationWarning'
import { getObjectFromPath } from '../../modules/JSONPathHandler'

import { InputWrapper } from './InputWrapper'

export const BooleanInput: FC<InputProps> = props => {
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
      <ValidationWarning path={props.path} />
    </InputWrapper>
  )
}
