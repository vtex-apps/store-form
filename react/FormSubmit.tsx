import React from 'react'
import { Input } from 'vtex.styleguide'

export type FormSubmitProps = {
  label: string
}

export default function FormSubmit(props: FormSubmitProps) {
  return <Input type="submit" value={props.label} />
}
