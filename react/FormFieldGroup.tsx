import React from 'react'

import { ObjectMapper } from './components/Object'
import { FormFieldGroupProps } from './typings/InputProps'

export default function FormFieldGroup(props: FormFieldGroupProps) {
  return <ObjectMapper {...props} />
}
