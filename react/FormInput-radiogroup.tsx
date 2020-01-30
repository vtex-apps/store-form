import React from 'react'

import { RadioGroupInput } from './components/RadioGroupRenderer'

export type FormRadiogroupProps = {
  path: string
}

export default function FormInputRadiogroup(props: FormRadiogroupProps) {
  return <RadioGroupInput path={props.path} />
}
