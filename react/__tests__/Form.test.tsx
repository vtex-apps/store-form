import React from 'react'
import { render } from '@vtex/test-tools/react'
import * as Apollo from 'react-apollo'

import Form from '../Form'
import FormInputCheckbox from '../FormInputCheckbox'
import FormText from '../FormInputText'
import FormFieldGroup from '../FormFieldGroup'

describe('Form', () => {
  it('should render full schema', () => {
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

  it('should render partial schema', () => {
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

  it('should render an error if the properties is missing in the schema', () => {
    const schema = { firstName: { type: 'string' } }
    jest.spyOn(Apollo, 'useQuery').mockImplementation((query, options) => ({
      data: {
        documentPublicSchema: { schema },
      },
      query,
      options,
    }))

    const errorSpy = jest.spyOn(global.console, 'error')
    errorSpy.mockImplementation(() => {})

    render(
      <Form entity="foo" schema="bar">
        <FormText pointer="#/properties/firstName" />
      </Form>
    )

    expect(errorSpy.mock.calls[0][0]).toBe(
      'The MasterData Schema fields should be inside "properties". Example: { "schema": { "type": "object", "properties": { "foo": { "type": "string" } }}}'
    )
    expect(errorSpy.mock.calls[1][0]).toBe(`Received:`)
    expect(errorSpy.mock.calls[1][1]).toBe(schema)

    errorSpy.mockReset()
  })

  it('should render an error if the type property is missing in the schema', () => {
    const schema = { properties: { firstName: { type: 'string' } } }
    jest.spyOn(Apollo, 'useQuery').mockImplementation((query, options) => ({
      data: {
        documentPublicSchema: {
          schema,
        },
      },
      query,
      options,
    }))

    const errorSpy = jest.spyOn(global.console, 'error')

    render(
      <Form entity="foo" schema="bar">
        <FormText pointer="#/properties/firstName" />
      </Form>
    )

    expect(errorSpy.mock.calls[0][0]).toBe(
      'The MasterData Schema is missing the required property `"type": "object"`. Example: { "schema": { "type": "object", "properties": { "foo": { "type": "string" } }}}'
    )
    expect(errorSpy.mock.calls[1][0]).toBe(`Received:`)
    expect(errorSpy.mock.calls[1][1]).toBe(schema)

    errorSpy.mockReset()
  })

  it('should render OK if all required fields are present', () => {
    const schema = {
      type: 'object',
      properties: { firstName: { type: 'string' } },
    }
    jest.spyOn(Apollo, 'useQuery').mockImplementation((query, options) => ({
      data: {
        documentPublicSchema: {
          schema,
        },
      },
      query,
      options,
    }))

    const { getAllByText } = render(
      <Form entity="foo" schema="bar">
        <FormText pointer="#/properties/firstName" />
      </Form>
    )

    expect(getAllByText('firstName')[0]).toBeDefined()
  })
})
