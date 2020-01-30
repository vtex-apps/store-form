import React from 'react'

import { DropdownInput } from './components/DropdownRenderer'

export type FormDropdownProps = {
  path: string
}

export default function FormInput(props: FormDropdownProps) {
  return <DropdownInput path={props.path} />
}
