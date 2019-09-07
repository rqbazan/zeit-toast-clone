import React from 'react'
import { text, select } from '@storybook/addon-knobs'
import Notification from './index'

export default { title: 'Notification' }

export const Playground = () => {
  const message = text('message', 'Hello world!', 'notification')

  const kind = select(
    'kind',
    ['info', 'error', 'success', 'warning'],
    'success',
    'notification'
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
  return <Notification message="Winter is comming" kind="info" />
}
