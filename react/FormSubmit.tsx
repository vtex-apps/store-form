import React from 'react'

export type FormSubmit = {
  label: string
}

export default function FormSubmit(props: FormSubmit) {
  return <input type="submit" value={props.label} />
}
