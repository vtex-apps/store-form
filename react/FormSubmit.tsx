import React from 'react'
import { Input } from 'vtex.styleguide'

export type FormSubmit = {
  label: string
}

export default function FormSubmit(props: FormSubmit) {
  return <Input type="submit" value={props.label} />
}
