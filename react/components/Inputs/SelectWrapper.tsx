import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectWrapperProps } from '../InputTypes'

export const SelectWrapper: FC<SelectWrapperProps> = props => {
  const { register } = useFormContext()

  return (
    <select name={props.path} ref={register(props.validator)}>
      {props.options.map(value => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
