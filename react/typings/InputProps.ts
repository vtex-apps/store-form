import { UISchemaType } from 'react-hook-form-jsonschema'

export interface BaseInputProps {
  pointer: string
  label?: string
  placeholder?: string
}

export interface FormFieldGroupProps extends Omit<BaseInputProps, 'label'> {
  uiSchema?: UISchemaType
}

export enum InputTypes {
  input = 'input',
  hidden = 'hidden',
  password = 'password',
}

export interface FormRawInputProps extends BaseInputProps {
  inputType?: InputTypes
  value?: string
}
