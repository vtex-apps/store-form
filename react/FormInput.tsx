import React from 'react'

import { InputProps } from './components/InputTypes'
import { FieldBuilder } from './components/Inputs'

export default function FormInput(props: InputProps): React.ReactNode {
  return <FieldBuilder {...props} />
}
