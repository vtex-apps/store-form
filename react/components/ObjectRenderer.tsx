import React, { FC } from 'react'
import { RadioGroup, Input, Dropdown } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  InputReturnTypes,
  InputTypes,
  UseRadioReturnType,
  UseSelectReturnType,
  UISchemaType,
  useObject,
  Controller,
} from 'react-hook-form-jsonschema'

const SpecializedObject: FC<{ baseObject: InputReturnTypes }> = props => {
  switch (props.baseObject.type) {
    case InputTypes.input: {
      const inputObject = props.baseObject as UseRawInputReturnType
      return (
        <>
          <Input
            {...inputObject.getInputProps()}
            label={inputObject.getObject().title}
          />
        </>
      )
    }
    case InputTypes.radio: {
      const radioObject = props.baseObject as UseRadioReturnType
      return (
        <Controller
          name={radioObject.path}
          control={radioObject.formContext.control}
          as={
            <RadioGroup
              hideBorder
              options={radioObject.getItems().map(value => {
                return { value: value, label: value }
              })}
            />
          }
        />
      )
    }
    case InputTypes.select: {
      const selectObject = props.baseObject as UseSelectReturnType
      return (
        <>
          <label {...selectObject.getLabelProps()}>{selectObject.name}</label>
          <Controller
            name={selectObject.path}
            control={selectObject.formContext.control}
            as={
              <Dropdown
                multi={false}
                options={selectObject.getItems().map(value => {
                  return { value: value, label: value }
                })}
              />
            }
          />
        </>
      )
    }
  }
  return <></>
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
          {obj.getError() && <p>This is an error!</p>}
        </div>
      ))}
    </>
  )
}
