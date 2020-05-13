import { ApolloError } from 'apollo-client'
import { GraphQLError } from 'graphql'
import { ErrorTypes } from 'react-hook-form-jsonschema'

const concatFormPointer = (currPath: string, next: string) => {
  return `${currPath}/${next}`
}

export type MasterDataErrorRecord = Record<string, ErrorTypes[]>

interface MasterDataError {
  Message: string
  LineNumber: number
  LinePosition: number
  Path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Value: any | string[]
  SchemaId: string
  SchemaBaseUri: string | null
  ErrorType: string
  ChildErrors: []
}

const concatErrors = (
  errors: MasterDataError[],
  error: { schema: string; errors: MasterDataError }
) => {
  if (error.errors) {
    return errors.concat(error.errors)
  }
  return errors
}

const filterMasterDataErrors = (
  acc: MasterDataError[],
  message: GraphQLError
) => {
  if (message?.extensions?.exception?.response?.data?.errors) {
    return acc.concat(
      message.extensions.exception.response.data.errors.reduce(concatErrors, [])
    )
  }
  return acc
}

const createOrPushError = (
  errorRecord: MasterDataErrorRecord,
  pointer: string,
  error: ErrorTypes
) => {
  if (errorRecord[pointer]) {
    errorRecord[pointer].push(error)
  } else {
    errorRecord[pointer] = [error]
  }
}

const evaluateMasterDataRequiredErrors = (
  data: { nodes: MasterDataErrorRecord; schemaId: string },
  nodeName: string
) => {
  const pointer = concatFormPointer(
    concatFormPointer(data.schemaId, 'properties'),
    nodeName
  )
  createOrPushError(data.nodes, pointer, ErrorTypes.required)
  return { nodes: data.nodes, schemaId: data.schemaId }
}

const evaluateMasterDataErrors = (
  acc: MasterDataErrorRecord,
  serverError: MasterDataError
) => {
  // eslint-disable-next-line default-case
  switch (serverError.ErrorType) {
    case 'required':
      if (Array.isArray(serverError.Value)) {
        acc = serverError.Value.reduce(evaluateMasterDataRequiredErrors, {
          nodes: acc,
          schemaId: serverError.SchemaId,
        }).nodes
      }
      break
    case 'format':
    case 'type':
      createOrPushError(acc, serverError.SchemaId, ErrorTypes.pattern)
      break
    case 'maximum':
      createOrPushError(acc, serverError.SchemaId, ErrorTypes.maxValue)
      break
    case 'minimum':
      createOrPushError(acc, serverError.SchemaId, ErrorTypes.minValue)
      break
    case 'enum':
      createOrPushError(acc, serverError.SchemaId, ErrorTypes.notInEnum)
      break
    case 'minLength':
      createOrPushError(acc, serverError.SchemaId, ErrorTypes.minLength)
      break
    case 'maxLength':
      createOrPushError(acc, serverError.SchemaId, ErrorTypes.maxLength)
      break
  }
  return acc
}

export const parseMasterDataError = (
  error: ApolloError | undefined
): MasterDataErrorRecord => {
  if (!error) {
    return {}
  }

  return error.graphQLErrors
    .reduce(filterMasterDataErrors, [])
    .reduce(evaluateMasterDataErrors, {})
}
