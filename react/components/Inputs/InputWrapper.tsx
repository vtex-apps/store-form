import React, { FC } from 'react'

import { InputWrapperProps } from '../InputTypes'

export const InputWrapper: FC<InputWrapperProps> = props => {
  return (
    <>
      <label className="db" htmlFor={props.path}>
        {props.title}
      </label>
      {props.children}
    </>
  )
}
