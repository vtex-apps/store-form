import { buildObjectFromFormData } from './JSONPathHandler'

test('should return an object that matches the schema', () => {
  const mockJSONSchema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      address: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
          },
          street: {
            type: 'string',
          },
          streetNumber: {
            type: 'integer',
          },
        },
      },
    },
  }
  const mockData = {
    '#/firstName': 'Helena',
    '#/lastName': 'Steck',
    '#/address/city': 'RJ',
    '#/address/street': 'Uma rua ae',
    '#/address/streetNumber': 300,
  }

  const testResult = buildObjectFromFormData(mockData, mockJSONSchema)

  expect(testResult).toEqual(
    expect.objectContaining({
      firstName: 'Helena',
      lastName: 'Steck',
      address: expect.objectContaining({
        city: 'RJ',
        street: 'Uma rua ae',
        streetNumber: 300,
      }),
    })
  )
})
