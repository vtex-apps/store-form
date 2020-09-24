import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import { useIntl, defineMessages } from 'react-intl'
import { Alert } from 'vtex.styleguide'

import { ObjectMapper } from './components/Object'
import FormSubmit from './FormSubmit'
import documentPublicSchema from './graphql/getSchema.graphql'
import { FormHandler } from './components/FormHandler'
import { FormProps } from './typings/FormProps'

const messages = defineMessages({
  loadingForm: {
    id: 'store/form.schema.loading',
    defaultMessage: '',
  },
  errorLoadingForm: {
    id: 'store/form.schema.error',
    defaultMessage: '',
  },
})

const Form: FC<FormProps> = props => {
  const { entity, schema, children } = props
  const intl = useIntl()
  const { data, loading, error } = useQuery(documentPublicSchema, {
    variables: {
      dataEntity: entity,
      schema,
    },
  })

  if (loading) {
    return (
      <Alert type="warning">{intl.formatMessage(messages.loadingForm)}</Alert>
    )
  }

  if (error) {
    return (
      <Alert type="error">
        {intl.formatMessage(messages.errorLoadingForm)}
      </Alert>
    )
  }

  const schemaDocument = data.documentPublicSchema.schema

  if (!schemaDocument) {
    console.error('No MasterData Schema found')
    return null
  }

  if (!('properties' in schemaDocument)) {
    console.error(
      `The MasterData Schema fields should be inside "properties". Example: { "schema": { "type": "object", "properties": { "foo": { "type": "string" } }}}`
    )
    console.error('Received:', schemaDocument)
    return null
  }

  if (!('type' in schemaDocument)) {
    console.error(
      `The MasterData Schema is missing the required property \`"type": "object"\`. Example: { "schema": { "type": "object", "properties": { "foo": { "type": "string" } }}}`
    )
    console.error('Received:', schemaDocument)
    return null
  }

  if (!React.Children.count(children)) {
    return (
      <FormHandler schema={schemaDocument} formProps={props}>
        <ObjectMapper pointer="#" />
        <FormSubmit label="Submit" />
      </FormHandler>
    )
  }

  return (
    <FormHandler schema={schemaDocument} formProps={props}>
      {children}
    </FormHandler>
  )
}

export default Form
