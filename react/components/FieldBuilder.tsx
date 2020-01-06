import React, { FC, useContext } from 'react'

import {
  concatFormPath,
  getObjectFromPath,
  isRequiredField,
} from '../modules/JSONPathHandler'

import { InputProps, FormSchemaContext } from './InputTypes'
import { BooleanInput } from './Inputs/BooleanInput'
import { NumberInput } from './Inputs/NumberInput'
import { StringInput } from './Inputs/StringInput'

const FieldBuilder: FC<InputProps> = props => {
  const schema = useContext(FormSchemaContext)
  const currentObject = getObjectFromPath(schema, props.path)
  if (!currentObject) {
    return <></>
  }
  const required = isRequiredField(schema, props.path)

  switch (currentObject.type) {
    case 'boolean': {
      return <BooleanInput {...props} required={required} />
    }
    case 'number':
    case 'integer': {
      return <NumberInput {...props} required={required} />
    }
    case 'string': {
      return <StringInput {...props} required={required} />
    }
    case 'object': {
      const children: JSX.Element[] = []
      const objKeys = Object.keys(currentObject.properties)
      for (const key of objKeys) {
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

export { FieldBuilder }
