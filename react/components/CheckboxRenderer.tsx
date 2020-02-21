import React, { FC } from 'react'
import { Checkbox } from 'vtex.styleguide'
import { UseCheckboxReturnType, useCheckbox } from 'react-hook-form-jsonschema'

export const CheckboxInput: FC<{ pointer: string }> = props => {
  const checkboxObject = useCheckbox(props.pointer)
  return <CheckboxRenderer checkboxObject={checkboxObject} />
}

export const CheckboxRenderer: FC<{
  checkboxObject: UseCheckboxReturnType
}> = props => {
  const checkboxObject = props.checkboxObject

  if (checkboxObject.isSingle) {
    const checked = checkboxObject.formContext.watch(checkboxObject.pointer)

    return (
      <>
        <Checkbox
          {...checkboxObject.getItemInputProps(0)}
          label={checkboxObject.getObject().title}
          required={checkboxObject.isRequired}
          value="true"
          {...(checked ? { checked: true } : { checked: false })}
          onChange={() => {
            const pointer = checkboxObject.pointer

            checkboxObject.formContext.setValue(pointer, !checked)
          }}
          checked={Boolean(checked)}
        />
      </>
    )
  }

  return (
    <>
      {checkboxObject.getItems().map((value, index) => {
        const checked = checkboxObject.formContext.watch(
          `${checkboxObject.pointer}[${index}]`
        )
        return (
          <Checkbox
            {...checkboxObject.getItemInputProps(index)}
            key={`${value}${index}`}
            label={checkboxObject.getObject().title}
            required={checkboxObject.isRequired}
            value={value}
            {...(checked ? { checked: true } : { checked: false })}
            onChange={() => {
              const pointer = checkboxObject.pointer

              checkboxObject.formContext.setValue(pointer, !checked)
            }}
            checked={Boolean(checked)}
          />
        )
      })}
    </>
  )
}
