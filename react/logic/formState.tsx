import React, { useReducer } from 'react'

const initialState: SubmittingState = {
  loading: false,
  userInputError: null,
  serverError: null,
  success: null,
  isRequireCaptcha: false,
  isValidCaptcha: false,
  captchaError: null,
  handlerOnChangeCaptcha: (_args?: any) => {},
}

function reducer(
  state: SubmittingState,
  action: SubmittingAction
): SubmittingState {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        loading: true,
        userInputError: null,
        serverError: null,
        success: null,
      }
    }
    case 'SET_SUCCESS': {
      return {
        ...state,
        loading: false,
        userInputError: false,
        serverError: null,
        success: true,
      }
    }
    case 'SET_USER_INPUT_ERROR': {
      return {
        ...state,
        loading: false,
        userInputError: true,
        success: false,
      }
    }
    case 'SET_SERVER_INTERNAL_ERROR': {
      return {
        ...state,
        loading: false,
        serverError: true,
        success: false,
      }
    }
    case 'SET_CAPTCHA': {
      const args = action.args || {}
      return {
        ...state,
        ...args,
      }
    }
    default:
      return state
  }
}

export type SubmittingState = {
  loading: boolean | null
  userInputError: boolean | null
  serverError: boolean | null
  success: boolean | null
  isValidCaptcha: boolean | null
  isRequireCaptcha: boolean | null
  captchaError: boolean | null
  handlerOnChangeCaptcha: (args?: any) => void
}

export type SubmittingAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_SUCCESS' }
  | { type: 'SET_USER_INPUT_ERROR' }
  | { type: 'SET_SERVER_INTERNAL_ERROR' }
  | {
      type: 'SET_CAPTCHA'
      args: {
        isValidCaptcha: boolean | null
        isRequireCaptcha: boolean | null
        captchaError: boolean | null
      }
    }

export const useSubmitReducer = () => {
  return useReducer(reducer, initialState)
}

export const SubmitContext = React.createContext<SubmittingState>(initialState)
