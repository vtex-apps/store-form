import React, { FC } from 'react'

import { ObjectRenderer } from './components/ObjectRenderer'
import FormSubmit from './FormSubmit'
import documentSchemaV2 from './graphql/getSchema.graphql'
import { useQuery } from './hooks/mockUseQuery'
import { FormRenderer } from './components/FormRenderer'
import { FormProps } from './typings/FormProps'

const Form: FC<FormProps> = props => {
  const { data } = useQuery(documentSchemaV2, {
    variables: {
      dataEntity: 'Test',
      schema: 'person',
    },
  })

  if (!React.Children.count(props.children)) {
    return (
      <FormRenderer schema={data} formProps={props}>
        <ObjectRenderer path="#" />
        <FormSubmit label="Submit" />
      </FormRenderer>
    )
  }

  return (
    <FormRenderer schema={data} formProps={props}>
      {props.children}
    </FormRenderer>
  )
}

export default Form
