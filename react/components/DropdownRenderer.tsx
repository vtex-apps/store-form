import React, { FC, useMemo } from 'react'
import { Dropdown } from 'vtex.styleguide'
import {
  Controller,
  UseSelectReturnType,
  useSelect,
} from 'react-hook-form-jsonschema'

import { useFormattedError } from '../hooks/useErrorMessage'

export const DropdownInput: FC<{ pointer: string }> = props => {
  const selectObject = useSelect(props.pointer)
  return <DropdownRenderer selectObject={selectObject} />
}

export const DropdownRenderer: FC<{
  selectObject: UseSelectReturnType
}> = props => {
  const selectObject = props.selectObject
  const error = selectObject.getError()
  const title = selectObject.getObject().title
  const items = selectObject.getItems()
  const options = useMemo(() => {
    return items.map(value => {
      return { value: value, label: value }
    })
  }, [items])

  return (
    <>
      <Controller
        name={selectObject.pointer}
        control={selectObject.formContext.control}
        rules={selectObject.validator}
        as={
          <Dropdown
            name={title}
            multi={false}
            label={title}
            options={options}
            error={error ? true : false}
            errorMessage={useFormattedError(error)}
          />
        }
      />
    </>
  )
}
