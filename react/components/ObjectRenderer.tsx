import React, { FC } from 'react'
import {
  UseRawInputReturnType,
  InputReturnTypes,
  InputTypes,
  UseRadioReturnType,
  UseSelectReturnType,
  UISchemaType,
  useObject,
  UseTextAreaReturnType,
  UseCheckboxReturnType,
} from 'react-hook-form-jsonschema'

import { InputRenderer } from './InputRenderer'
import { TextAreaRenderer } from './TextAreaRenderer'
import { RadioGroupRenderer } from './RadioGroupRenderer'
import { DropdownRenderer } from './DropdownRenderer'
import { CheckboxRenderer } from './CheckboxRenderer'

const SpecializedObject: FC<{ baseObject: InputReturnTypes }> = props => {
  switch (props.baseObject.type) {
    case InputTypes.input: {
      const inputObject = props.baseObject as UseRawInputReturnType
      return <InputRenderer inputObject={inputObject} />
    }
    case InputTypes.radio: {
      const radioObject = props.baseObject as UseRadioReturnType
      return <RadioGroupRenderer radioObject={radioObject} />
    }
    case InputTypes.select: {
      const selectObject = props.baseObject as UseSelectReturnType
      return <DropdownRenderer selectObject={selectObject} />
    }
    case InputTypes.textArea: {
      const textAreaObject = props.baseObject as UseTextAreaReturnType
      return <TextAreaRenderer textAreaObject={textAreaObject} />
    }
    case InputTypes.checkbox: {
      const checkboxObject = props.baseObject as UseCheckboxReturnType
      return <CheckboxRenderer checkboxObject={checkboxObject} />
    }
    default:
      return <></>
  }
}

export const ObjectRenderer: FC<{
  path: string
  UISchema?: UISchemaType
}> = props => {
  const methods = useObject({ path: props.path, UISchema: props.UISchema })

  return (
    <>
      {methods.map(obj => (
        <div key={`${obj.type}${obj.path}`}>
          <SpecializedObject baseObject={obj} />
        </div>
      ))}
    </>
  )
}
