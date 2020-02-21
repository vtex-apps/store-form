import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import { Button, Alert } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'

import { SubmitContext } from './logic/formState'

export type FormSubmitProps = {
  label?: string
}

const CSS_HANDLES = [
  'formSubmitContainer',
  'formSubmitButton',
  'formErrorServer',
  'formErrorUserInput',
] as const

const messages = defineMessages({
  submitButton: {
    id: 'store/form.submit.buttonLabel',
    defaultMessage: '',
  },
  userInputError: {
    id: 'store/form.submit.error.userInputError',
    defaultMessage: '',
  },
  serverError: {
    id: 'store/form.submit.error.serverError',
    defaultMessage: '',
  },
})

export default function FormSubmit({
  label = messages.submitButton.id,
}: FormSubmitProps) {
  const { loading, userInputError, serverError } = useContext(SubmitContext)
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.formSubmitContainer}>
      <div className={handles.formSubmitButton}>
        <Button type="submit" isLoading={loading}>
          <IOMessage id={label} />
        </Button>
      </div>
      <div className={handles.formErrorUserInput}>
        {userInputError && (
          <Alert type="error">
            <IOMessage id={messages.userInputError.id} />
          </Alert>
        )}
      </div>
      <div className={handles.formErrorServer}>
        {serverError && (
          <Alert type="error">
            <IOMessage id={messages.serverError.id} />
          </Alert>
        )}
      </div>
    </div>
  )
}
