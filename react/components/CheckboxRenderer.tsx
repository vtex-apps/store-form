import React, { FC } from 'react'
import { Checkbox } from 'vtex.styleguide'
import { UseCheckboxReturnType, useCheckbox } from 'react-hook-form-jsonschema'

export const CheckboxInput: FC<{ path: string }> = props => {
  const checkboxObject = useCheckbox(props.path)
  return <CheckboxRenderer checkboxObject={checkboxObject} />
}

export const CheckboxRenderer: FC<{
  checkboxObject: UseCheckboxReturnType
}> = props => {
  const checkboxObject = props.checkboxObject

  if (checkboxObject.isSingle) {
    const checked = checkboxObject.formContext.watch(checkboxObject.path)

    return (
      <>
        <Checkbox
          {...checkboxObject.getItemInputProps(0)}
          label={checkboxObject.getObject().title}
          required={checkboxObject.isRequired}
          value="true"
          {...(checkboxObject.formContext.watch(checkboxObject.path)
            ? { checked: true }
            : { checked: false })}
          onChange={() => {
            const path = checkboxObject.path

            checkboxObject.formContext.setValue(path, !checked)
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
          `${checkboxObject.path}[${index}]`
        )
        return (
          <Checkbox
            {...checkboxObject.getItemInputProps(index)}
            key={`${value}${index}`}
            label={checkboxObject.getObject().title}
            required={checkboxObject.isRequired}
            value={value}
            {...(checkboxObject.formContext.watch(checkboxObject.path)
              ? { checked: true }
              : { checked: false })}
            onChange={() => {
              const path = checkboxObject.path

              checkboxObject.formContext.setValue(path, !checked)
            }}
            checked={Boolean(checked)}
          />
        )
      })}
    </>
  )
}
