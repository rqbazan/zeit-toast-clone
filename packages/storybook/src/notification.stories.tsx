import React from 'react'
import { text, select } from '@storybook/addon-knobs'
import { Notification } from 'zeit-toast-clone'

export default { title: 'notification' }

export const Playground = () => {
  const message = text('message', 'Hello world!')

  const kind = select(
    'kind',
    ['info', 'error', 'success', 'warning'],
    'success'
  )

  return <Notification message={message} kind={kind} />
}

export const Success = () => {
  return <Notification message="Hello world!" kind="success" />
}

export const Error = () => {
  return <Notification message="Invalid value" kind="error" />
}

export const Warning = () => {
  return <Notification message="Mismatch information" kind="warning" />
}

export const Info = () => {
  return <Notification message="Winter is coming" kind="info" />
}
