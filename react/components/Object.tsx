import React, { FC } from 'react'
import {
  UseRawInputReturnType,
  InputReturnTypes,
  InputTypes,
  UseRadioReturnType,
  UseSelectReturnType,
  useObject,
  UseTextAreaReturnType,
  UseCheckboxReturnType,
} from 'react-hook-form-jsonschema'

import { Input } from './Input'
import { TextArea } from './TextArea'
import { RadioGroup } from './RadioGroup'
import { Dropdown } from './Dropdown'
import { Checkbox } from './Checkbox'
import { FormFieldGroupProps } from '../typings/InputProps'

const SpecializedObject: FC<{ baseObject: InputReturnTypes }> = props => {
  switch (props.baseObject.type) {
    case InputTypes.input: {
      const inputObject = props.baseObject as UseRawInputReturnType
      return <Input inputObject={inputObject} />
    }
    case InputTypes.radio: {
      const radioObject = props.baseObject as UseRadioReturnType
      return <RadioGroup radioObject={radioObject} />
    }
    case InputTypes.select: {
      const selectObject = props.baseObject as UseSelectReturnType
      return <Dropdown selectObject={selectObject} />
    }
    case InputTypes.textArea: {
      const textAreaObject = props.baseObject as UseTextAreaReturnType
      return <TextArea textAreaObject={textAreaObject} />
    }
    case InputTypes.checkbox: {
      const checkboxObject = props.baseObject as UseCheckboxReturnType
      return <Checkbox checkboxObject={checkboxObject} />
    }
    default:
      return <></>
  }
}

export const ObjectMapper: FC<FormFieldGroupProps> = props => {
  const { pointer, uiSchema } = props
  const methods = useObject({
    pointer,
    UISchema: uiSchema,
  })

  return (
    <>
      {methods.map(obj => (
        <div key={`${obj.type}${obj.pointer}`}>
          <SpecializedObject baseObject={obj} />
        </div>
      ))}
    </>
  )
}
