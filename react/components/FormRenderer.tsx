import React, { FC, useMemo } from 'react'
import {
  FormContext,
  JSONSchemaType,
  JSONSchemaPathInfo,
} from 'react-hook-form-jsonschema'
import { useMutation } from 'react-apollo'
import { ExtensionPoint } from 'vtex.render-runtime'
import { GraphQLError } from 'graphql'

import createDocumentV2 from '../graphql/createDocument.graphql'
import { FormProps } from '../typings/FormProps'
import { parseMasterDataError } from '../logic/masterDataError'
import { useSubmitReducer, SubmitContext } from '../logic/formState'

export const FormRenderer: FC<{
  schema: JSONSchemaType
  formProps: FormProps
}> = props => {
  const [createDocumentMutation, { error }] = useMutation(createDocumentV2)

  const masterDataErrors = useMemo(() => parseMasterDataError(error), [error])
  let lastErrorFieldValues: Record<string, string> = {}

  const [submitState, dispatchSubmitAction] = useSubmitReducer()
  if (submitState.success) {
    return <ExtensionPoint id="form-success" />
  }

  return (
    <FormContext
      schema={props.schema}
      onSubmit={async ({ data, methods, event }) => {
        if (event) {
          event.preventDefault()
        }
        dispatchSubmitAction({ type: 'START_SUBMITTING' })

        await createDocumentMutation({
          variables: {
            dataEntity: props.formProps.entity,
            document: { document: data },
            schema: props.formProps.schema,
          },
        })
          .then(() => {
            dispatchSubmitAction({ type: 'SUCCESS_SUBMITTING' })
          })
          .catch(e => {
            methods.triggerValidation()
            lastErrorFieldValues = {}
            if (e.graphQLErrors) {
              for (const graphqlError of e.graphQLErrors as GraphQLError[]) {
                if (
                  graphqlError.extensions?.exception?.name === 'UserInputError'
                ) {
                  dispatchSubmitAction({ type: 'USER_INPUT_ERROR_SUBMITTING' })
                } else {
                  dispatchSubmitAction({
                    type: 'SERVER_INTERNAL_ERROR_SUBMITTING',
                  })
                }
              }
            } else {
              dispatchSubmitAction({ type: 'SERVER_INTERNAL_ERROR_SUBMITTING' })
            }
          })
      }}
      customValidators={{
        graphqlError: (value, context: JSONSchemaPathInfo) => {
          if (
            masterDataErrors[context.pointer] &&
            (lastErrorFieldValues[context.pointer] === undefined ||
              lastErrorFieldValues[context.pointer] === value)
          ) {
            lastErrorFieldValues[context.pointer] = value
            return masterDataErrors[context.pointer][0]
          }
          return true
        },
      }}>
      <SubmitContext.Provider value={submitState}>
        {props.children}
      </SubmitContext.Provider>
    </FormContext>
  )
}
