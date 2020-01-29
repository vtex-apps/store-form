import React, { FC } from 'react'
import { Dropdown } from 'vtex.styleguide'
import {
  Controller,
  UseSelectReturnType,
  useSelect,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const DropdownInput: FC<{ path: string }> = props => {
  const selectObject = useSelect(props.path)
  return <DropdownRenderer selectObject={selectObject} />
}

export const DropdownRenderer: FC<{
  selectObject: UseSelectReturnType
}> = props => {
  const selectObject = props.selectObject
  const error = selectObject.getError()

  return (
    <>
      <Controller
        name={selectObject.path}
        control={selectObject.formContext.control}
        rules={selectObject.validator}
        as={
          <Dropdown
            name={selectObject.getObject().title}
            multi={false}
            label={selectObject.getObject().title}
            options={selectObject.getItems().map(value => {
              return { value: value, label: value }
            })}
            error={error ? true : false}
            errorMessage={useFormattedError(error)}
          />
        }
      />
    </>
  )
}
