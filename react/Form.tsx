import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import { useIntl, defineMessages } from 'react-intl'
import { Alert } from 'vtex.styleguide'

import { ObjectRenderer } from './components/ObjectRenderer'
import FormSubmit from './FormSubmit'
import documentPublicSchema from './graphql/getSchema.graphql'
import { FormRenderer } from './components/FormRenderer'
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
      schema: schema,
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

  if (!React.Children.count(children)) {
    return (
      <FormRenderer schema={schemaDocument} formProps={props}>
        <ObjectRenderer pointer="#" />
        <FormSubmit label="Submit" />
      </FormRenderer>
    )
  }

  return (
    <FormRenderer schema={schemaDocument} formProps={props}>
      {children}
    </FormRenderer>
  )
}

export default Form
