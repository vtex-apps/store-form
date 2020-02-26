import React from 'react'

import { ObjectRenderer } from './components/ObjectRenderer'
import { FormFieldGroupProps } from './typings/InputProps'

export default function FormFieldGroup(props: FormFieldGroupProps) {
  return <ObjectRenderer {...props} />
}
