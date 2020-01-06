export default {
  $id: 'https://example.com/person.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Person',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First Name',
      description: "The person's first name.",
    },
    lastName: {
      type: 'string',
      title: 'Last Name',
      description: "The person's last name.",
    },
    age: {
      description: 'Age in years which must be equal to or greater than zero.',
      title: 'Age',
      type: 'integer',
      minimum: 0,
      maximum: 120,
    },
    roundedDecades: {
      type: 'integer',
      title: 'Rounded Decades',
      multipleOf: 10,
      description:
        'How many decades (rounded to the neared 10 mutiple) the person has.',
    },
    height: {
      type: 'number',
      minimum: 0.8,
      maximum: 2.9,
      title: 'Your height in meters',
      multipleOf: 0.01,
    },
    emailAddress: {
      type: 'string',
      format: 'email',
      title: 'Email address',
    },
    address: {
      title: 'Address',
      type: 'object',
      properties: {
        streetType: {
          type: 'string',
          title: 'Street Type',
          enum: ['street', 'road', 'avenue', 'boulevard'],
        },
        streetAddress: {
          type: 'string',
          title: 'Address',
        },
        streetNumber: {
          type: 'integer',
          title: 'Street Number',
        },
      },
      required: ['streetType'],
    },
    agreement: {
      type: 'boolean',
      title: 'Do you agree with the terms?',
    },
  },
  required: ['firstName', 'lastName'],
}
