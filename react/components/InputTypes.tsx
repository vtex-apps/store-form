import { createContext } from 'react'
import { ValidationOptions } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSONSchemaType = { [key: string]: any }

export enum InputTypes {
  'DEFAULT',
  'HIDDEN',
  'SLIDER',
  'SELECT',
  'RADIO',
}

export type InputProps = {
  path: string
  inputType: keyof typeof InputTypes
  required?: boolean
  minimum?: number
  maximum?: number
  step?: number
  value?: string | number | boolean
  default?: string | number | boolean
}

export type InputWrapperProps = {
  title: string
  path: string
}

export type SelectWrapperProps = {
  path: string
  options: Array<string>
  validator: ValidationOptions
}

export type ValidationWarningProps = {
  path: string
}

export const FormSchemaContext = createContext<JSONSchemaType>({})
