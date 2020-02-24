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
  notFloat: {
    id: 'store/form.error.notFloat',
    defaultMessage: '',
  },
  notInteger: {
    id: 'store/form.error.notInteger',
    defaultMessage: '',
  },
  pattern: {
    id: 'store/form.error.pattern',
    defaultMessage: '',
  },
  notInEnum: {
    id: 'store/form.error.notInEnum',
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
      return intl.formatMessage(messages.maxLength, {
        value: message.expected?.toString(),
      })
    case ErrorTypes.minLength:
      return intl.formatMessage(messages.minLength, {
        value: message.expected?.toString(),
      })
    case ErrorTypes.maxValue:
      return intl.formatMessage(messages.maxValue, {
        value: message.expected?.toString(),
      })
    case ErrorTypes.minValue:
      return intl.formatMessage(messages.minValue, {
        value: message.expected?.toString(),
      })
    case ErrorTypes.notFloat:
      return intl.formatMessage(messages.notFloat)
    case ErrorTypes.notInteger:
      return intl.formatMessage(messages.notInteger)
    case ErrorTypes.notInEnum:
      return intl.formatMessage(messages.notInEnum)
    case ErrorTypes.pattern:
      return intl.formatMessage(messages.pattern)
    case ErrorTypes.multipleOf:
      return intl.formatMessage(messages.multipleOf, {
        value: message.expected?.toString(),
      })
    default:
      return intl.formatMessage(messages.genericError)
  }
}
