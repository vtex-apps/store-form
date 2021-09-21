import {defineMessages, useIntl} from "react-intl";

export const messages = defineMessages({
  returnReason: {id: 'store/form.label-returnReason'},
  submit: {id: 'store/form.label-submit'},
  firstName: {id: 'store/form.placeholder-firstName'},
  lastName: {id: 'store/form.placeholder-lastName'},
  phone: {id: 'store/form.placeholder-phone'},
  email: {id: 'store/form.placeholder-email'},
  orderId: {id: 'store/form.placeholder-orderId'},
})

export const getMessage = (message: any) => {
  const intl = useIntl();
  return intl.formatMessage({id: message})
}


