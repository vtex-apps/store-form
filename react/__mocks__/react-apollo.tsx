import { OperationVariables, ObservableQueryFields } from '@apollo/react-common'
import { DocumentNode } from 'graphql'
import { QueryHookOptions, MutationTuple } from '@apollo/react-hooks'

import jsonSchema from './mockJSONSchema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface QueryResult<TData = any, TVariables = OperationVariables>
  extends ObservableQueryFields<TData, TVariables> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  query?: DocumentNode
  options?: QueryHookOptions<TData, TVariables>
}

export function useQuery<TData, TVariables = OperationVariables>(
  query?: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): Partial<QueryResult<TData, TVariables>> {
  return {
    data: { documentPublicSchema: { schema: jsonSchema } },
    query,
    options,
  }
}

export function useMutation<
  TData = any,
  TVariables = OperationVariables
>(): Partial<MutationTuple<TData, TVariables>> {
  return [
    () => {
      return Promise.resolve({})
    },
    {
      loading: false,
      called: false,
    },
  ]
}
