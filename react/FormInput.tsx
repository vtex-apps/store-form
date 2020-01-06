import React from 'react'

import { InputProps } from './components/InputTypes'
import { FieldBuilder } from './components/FieldBuilder'

export default function FormInput(props: InputProps): React.ReactNode {
  return <FieldBuilder {...props} />
}
