import React from 'react'

export const IOMessage = props => {
  return <p>{props.id}</p>
}

export function formatIoMessage(params) {
  return params.id
}
