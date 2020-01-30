import React from 'react'

import { TextAreaInput } from './components/TextAreaRenderer'

export type FormTextareaProps = {
  path: string
}

export default function FormInput(props: FormTextareaProps) {
  return <TextAreaInput path={props.path} />
}
