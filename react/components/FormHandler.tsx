import React, { FC, useMemo, useState, useCallback } from 'react'
import {
  FormContext,
  JSONSchemaType,
  JSONSubSchemaInfo,
  getDataFromPointer,
  OnSubmitParameters,
} from 'react-hook-form-jsonschema'
import { useMutation } from 'react-apollo'
import { ExtensionPoint } from 'vtex.render-runtime'
import { GraphQLError } from 'graphql'

import createDocumentV2 from '../graphql/createDocument.graphql'
import { FormProps } from '../typings/FormProps'
import { parseMasterDataError } from '../logic/masterDataError'
import { useSubmitReducer, SubmitContext } from '../logic/formState'
import { parseDateTimeFieldsData } from '../logic/parseDateTimeFields'

export const FormHandler: FC<{
  schema: JSONSchemaType
  formProps: FormProps
}> = props => {
  const [createDocumentMutation, { error }] = useMutation(createDocumentV2)

  const masterDataErrors = useMemo(() => parseMasterDataError(error), [error])
  const [lastErrorFieldValues, setLastErrorFieldValues] = useState<
    Record<string, string>
  >({})

  const [submitState, dispatchSubmitAction] = useSubmitReducer()

  const onSubmit = useCallback(
    async ({ data, methods, event }: OnSubmitParameters) => {
      if (event) {
        event.preventDefault()
      }
      dispatchSubmitAction({ type: 'SET_LOADING' })

      const parsedData = parseDateTimeFieldsData({
        data,
        properties: props.schema.properties,
      })

      await createDocumentMutation({
        variables: {
          dataEntity: props.formProps.entity,
          document: { document: parsedData },
          schema: props.formProps.schema,
        },
      })
        .then(() => {
          dispatchSubmitAction({ type: 'SET_SUCCESS' })
        })
        .catch(e => {
          setLastErrorFieldValues(parsedData)

          if (e.graphQLErrors) {
            for (const graphqlError of e.graphQLErrors as GraphQLError[]) {
              if (
                graphqlError.extensions?.exception?.name === 'UserInputError'
              ) {
                dispatchSubmitAction({ type: 'SET_USER_INPUT_ERROR' })
              } else {
                dispatchSubmitAction({
                  type: 'SET_SERVER_INTERNAL_ERROR',
                })
              }
            }
          } else {
            dispatchSubmitAction({ type: 'SET_SERVER_INTERNAL_ERROR' })
          }

          methods.triggerValidation()
        })
    },
    [
      createDocumentMutation,
      dispatchSubmitAction,
      props.formProps.entity,
      props.formProps.schema,
      props.schema.properties,
    ]
  )

  if (submitState.success) {
    return <ExtensionPoint id="form-success" />
  }

  return (
    <FormContext
      schema={props.schema}
      onSubmit={onSubmit}
      customValidators={{
        graphqlError: (value, context: JSONSubSchemaInfo) => {
          const lastValue = getDataFromPointer(
            context.pointer,
            lastErrorFieldValues
          )
          if (
            masterDataErrors[context.pointer] &&
            ((!lastValue && !value) || lastValue === value)
          ) {
            return masterDataErrors[context.pointer][0]
          }
          return true
        },
      }}
    >
      <SubmitContext.Provider value={submitState}>
        {props.children}
      </SubmitContext.Provider>
    </FormContext>
  )
}
