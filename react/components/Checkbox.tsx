import React, { FC } from 'react'
import { Checkbox as StyleguideCheckbox } from 'vtex.styleguide'
import { UseCheckboxReturnType, useCheckbox } from 'react-hook-form-jsonschema'
import { useIntl } from 'react-intl'

import { BaseInputProps } from '../typings/InputProps'
import { getMessage } from '../utils/helpers'

export const CheckboxInput: FC<BaseInputProps> = props => {
  const checkboxObject = useCheckbox(props.pointer)
  return (
    <Checkbox
      checkboxObject={checkboxObject}
      label={props.label}
      labelId={props.labelId}
    />
  )
}

export const Checkbox: FC<{
  checkboxObject: UseCheckboxReturnType
  label?: string
  labelId?: string
}> = props => {
  const { checkboxObject, labelId } = props
  const subSchema = checkboxObject.getObject()
  const label = props.label ?? subSchema.title ?? checkboxObject.name
  const intl = useIntl()

  if (checkboxObject.isSingle) {
    const checked = checkboxObject.formContext.watch(checkboxObject.pointer)

    return (
      <>
        <StyleguideCheckbox
          {...checkboxObject.getItemInputProps(0)}
          label={labelId ? getMessage(intl, labelId) : label}
          required={checkboxObject.isRequired}
          checked={Boolean(checked)}
          value="true"
          onChange={() => {
            const { pointer } = checkboxObject
            checkboxObject.formContext.setValue(pointer, !checked)
          }}
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
          <StyleguideCheckbox
            {...checkboxObject.getItemInputProps(index)}
            key={`${value}${index}`}
            label={label}
            required={checkboxObject.isRequired}
            value={value}
            {...(checked ? { checked: true } : { checked: false })}
            onChange={() => {
              const { pointer } = checkboxObject

              checkboxObject.formContext.setValue(pointer, !checked)
            }}
            checked={Boolean(checked)}
          />
        )
      })}
    </>
  )
}
