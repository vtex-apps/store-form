import React, { useContext } from 'react'
import { Button, Alert } from 'vtex.styleguide'

import { SubmitContext } from './logic/formState'

export type FormSubmitProps = {
  label: string
}

export default function FormSubmit(props: FormSubmitProps) {
  const { loading, userInputError, serverError } = useContext(SubmitContext)
  return (
    <>
      <Button type="submit" isLoading={loading}>
        {props.label}
      </Button>
      {userInputError && (
        <Alert type="error">Please review the form and try again!</Alert>
      )}
      {serverError && (
        <Alert type="error">
          Internal Server Error! Please try again later!
        </Alert>
      )}
    </>
  )
}
