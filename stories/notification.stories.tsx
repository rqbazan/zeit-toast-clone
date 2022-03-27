import * as React from 'react'
import { Notification, INotificationProps } from '../src'

export default {
  title: 'Notification',
  component: Notification,
}

export const Playground = (args: INotificationProps) => {
  return <Notification {...args} />
}

Playground.args = {
  message: 'Hello world!',
  kind: 'info',
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
