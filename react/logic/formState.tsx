import React, { useReducer } from 'react'

const initialState: SubmittingState = {
  loading: false,
  userInputError: null,
  serverError: null,
  success: null,
}
function reducer(
  state: SubmittingState,
  action: SubmittingAction
): SubmittingState {
  switch (action.type) {
    case 'START_SUBMITTING': {
      return {
        loading: true,
        userInputError: null,
        serverError: null,
        success: null,
      }
    }
    case 'SUCCESS_SUBMITTING': {
      return {
        loading: false,
        userInputError: false,
        serverError: null,
        success: true,
      }
    }
    case 'USER_INPUT_ERROR_SUBMITTING': {
      return {
        ...state,
        loading: false,
        userInputError: true,
        success: false,
      }
    }
    case 'SERVER_INTERNAL_ERROR_SUBMITTING': {
      return {
        ...state,
        loading: false,
        serverError: true,
        success: false,
      }
    }
    default:
      return state
  }
}

export type SubmittingState = {
  loading: boolean
  userInputError: boolean | null
  serverError: boolean | null
  success: boolean | null
}

export type SubmittingAction =
  | { type: 'START_SUBMITTING' }
  | { type: 'SUCCESS_SUBMITTING' }
  | { type: 'USER_INPUT_ERROR_SUBMITTING' }
  | { type: 'SERVER_INTERNAL_ERROR_SUBMITTING' }

export const useSubmitReducer = () => {
  return useReducer(reducer, initialState)
}

export const SubmitContext = React.createContext<SubmittingState>(initialState)
