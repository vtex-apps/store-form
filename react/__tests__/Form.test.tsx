import React from 'react'
import { render } from '@vtex/test-tools/react'

import Form from '../Form'
import FormInputCheckbox from '../FormInput-checkbox'
import FormText from '../FormInput-text'
import FormFieldGroup from '../FormFieldGroup'

test('should render full schema', () => {
  const { getAllByText } = render(<Form entity="asdf" schema="asdf" />)

  expect(getAllByText('First Name')[0]).toBeDefined()
  expect(getAllByText('Last Name')[0]).toBeDefined()
  expect(getAllByText('Age')[0]).toBeDefined()
  expect(getAllByText('Your height in meters')[0]).toBeDefined()
  expect(getAllByText('Email address')[0]).toBeDefined()
  expect(getAllByText('Street Type')[0]).toBeDefined()
  expect(getAllByText('Address')[0]).toBeDefined()
  expect(getAllByText('Street Number')[0]).toBeDefined()
  expect(getAllByText('Do you agree with the terms?')[0]).toBeDefined()
})

test('should render partial schema', () => {
  const { getAllByText } = render(
    <Form entity="asdf" schema="asdf">
      <FormText pointer="#/properties/firstName" />
      <FormText pointer="#/properties/lastName" />
      <FormFieldGroup pointer="#/properties/address" />
      <FormInputCheckbox pointer="#/properties/agreement" />
    </Form>
  )

  expect(getAllByText('First Name')[0]).toBeDefined()
  expect(getAllByText('Last Name')[0]).toBeDefined()
  expect(getAllByText('Street Type')[0]).toBeDefined()
  expect(getAllByText('Address')[0]).toBeDefined()
  expect(getAllByText('Street Number')[0]).toBeDefined()
  expect(getAllByText('Do you agree with the terms?')[0]).toBeDefined()
})
