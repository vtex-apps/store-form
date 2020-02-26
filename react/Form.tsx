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
  const intl = useIntl()
  const { data, loading, error } = useQuery(documentPublicSchema, {
    variables: {
      dataEntity: props.entity,
      schema: props.schema,
    },
  })

  if (loading) {
    return (
      <Alert type="warning">{intl.formatMessage(messages.loadingForm)}</Alert>
    )
  } else if (error) {
    return (
      <Alert type="error">
        {intl.formatMessage(messages.errorLoadingForm)}
      </Alert>
    )
  }

  const schema = data.documentPublicSchema.schema

  if (!React.Children.count(props.children)) {
    return (
      <FormRenderer schema={schema} formProps={props}>
        <ObjectRenderer pointer="#" />
        <FormSubmit label="Submit" />
      </FormRenderer>
    )
  }

  return (
    <FormRenderer schema={schema} formProps={props}>
      {props.children}
    </FormRenderer>
  )
}

export default Form
