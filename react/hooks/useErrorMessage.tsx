import { useIntl, defineMessages } from 'react-intl'
import { ErrorMessage, ErrorTypes } from 'react-hook-form-jsonschema'

const messages = defineMessages({
  required: {
    id: 'store/form.error.required',
    defaultMessage: '',
  },
  maxLength: {
    id: 'store/form.error.maxLength',
    defaultMessage: '',
  },
  minLength: {
    id: 'store/form.error.minLength',
    defaultMessage: '',
  },
  maxValue: {
    id: 'store/form.error.maxValue',
    defaultMessage: '',
  },
  minValue: {
    id: 'store/form.error.minValue',
    defaultMessage: '',
  },
  pattern: {
    id: 'store/form.error.pattern',
    defaultMessage: '',
  },
  multipleOf: {
    id: 'store/form.error.multipleOf',
    defaultMessage: '',
  },
  genericError: {
    id: 'store/form.error.undefinedError',
    defaultMessage: '',
  },
})

export const useFormattedError = (message: ErrorMessage): string => {
  const intl = useIntl()
  if (!message) {
    return ''
  }

  switch (message.message) {
    case ErrorTypes.required:
      return intl.formatMessage(messages.required)
    case ErrorTypes.maxLength:
      return intl.formatMessage(messages.maxLength, { value: message.expected })
    case ErrorTypes.minLength:
      return intl.formatMessage(messages.minLength, { value: message.expected })
    case ErrorTypes.maxValue:
      return intl.formatMessage(messages.maxValue, { value: message.expected })
    case ErrorTypes.minValue:
      return intl.formatMessage(messages.minValue, { value: message.expected })
    case ErrorTypes.pattern:
      return intl.formatMessage(messages.pattern)
    case ErrorTypes.multipleOf:
      return intl.formatMessage(messages.multipleOf, {
        value: message.expected,
      })
    default:
      return intl.formatMessage(messages.genericError)
  }
}
