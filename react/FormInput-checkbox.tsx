import React from 'react'

import { CheckboxInput } from './components/CheckboxRenderer'

export type FormCheckboxProps = {
  path: string
}

export default function FormInput(props: FormCheckboxProps) {
  return <CheckboxInput path={props.path} />
}
