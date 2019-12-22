import React from 'react'
import { MessageKind } from './types'
import { DarkModeContext } from './contexts'

export interface INotificationProps {
  kind: MessageKind
  message: string
}

export default function Notification({
  message,
  kind = 'info'
}: INotificationProps) {
  const darkMode = React.useContext(DarkModeContext)

  const classNames = ['ztc-notification', kind, darkMode && 'dark']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames}>
      <span className="ztc-message">{message}</span>
    </div>
  )
}
