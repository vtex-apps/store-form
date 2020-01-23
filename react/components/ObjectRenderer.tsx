import React, { FC } from 'react'
import { RadioGroup, Input, Dropdown, Textarea } from 'vtex.styleguide'
import {
  UseRawInputReturnType,
  InputReturnTypes,
  InputTypes,
  UseRadioReturnType,
  UseSelectReturnType,
  UISchemaType,
  useObject,
  Controller,
  ErrorMessage,
  UseTextAreaReturnType,
} from 'react-hook-form-jsonschema'

const parseErrorMessage = (error: ErrorMessage): string => {
  if (!error) {
    return ''
  }

  return error.message
}

const SpecializedObject: FC<{ baseObject: InputReturnTypes }> = props => {
  switch (props.baseObject.type) {
    case InputTypes.input: {
      const inputObject = props.baseObject as UseRawInputReturnType
      return (
        <Input
          {...inputObject.getInputProps()}
          label={inputObject.getObject().title}
          error={inputObject.getError() ? true : false}
          errorMessage={parseErrorMessage(inputObject.getError())}
        />
      )
    }
    case InputTypes.radio: {
      const radioObject = props.baseObject as UseRadioReturnType
      return (
        <Controller
          name={radioObject.path}
          control={radioObject.formContext.control}
          rules={props.baseObject.validator}
          as={
            <RadioGroup
              name={radioObject.getObject().title}
              required={radioObject.isRequired}
              hideBorder
              label={radioObject.getObject().title}
              options={radioObject.getItems().map(value => {
                return { value: value, label: value }
              })}
              error={radioObject.getError() ? true : false}
              errorMessage={parseErrorMessage(radioObject.getError())}
            />
          }
        />
      )
    }
    case InputTypes.select: {
      const selectObject = props.baseObject as UseSelectReturnType
      return (
        <>
          <Controller
            name={selectObject.path}
            control={selectObject.formContext.control}
            rules={props.baseObject.validator}
            as={
              <Dropdown
                name={selectObject.getObject().title}
                multi={false}
                label={selectObject.getObject().title}
                options={selectObject.getItems().map(value => {
                  return { value: value, label: value }
                })}
                error={selectObject.getError() ? true : false}
                errorMessage={parseErrorMessage(selectObject.getError())}
              />
            }
          />
        </>
      )
    }
    case InputTypes.textArea: {
      const textAreaObject = props.baseObject as UseTextAreaReturnType
      return (
        <Textarea
          {...textAreaObject.getTextAreaProps()}
          label={textAreaObject.getObject().title}
          error={textAreaObject.getError() ? true : false}
          errorMessage={parseErrorMessage(textAreaObject.getError())}
        />
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
        </div>
      ))}
    </>
  )
}
