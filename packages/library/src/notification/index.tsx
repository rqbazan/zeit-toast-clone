import React from 'react'
import { Container } from './elements'
import { MessageKind } from '../types'
import { DarkModeContext } from '../contexts'

export interface INotificationProps {
  kind: MessageKind
  message: string
  className?: string
  style?: React.CSSProperties
}

const Notification: React.FC<INotificationProps> = props => {
  const { style, className, message, kind } = props

  const darkMode = React.useContext(DarkModeContext)

  return (
    <Container
      darkMode={darkMode}
      kind={kind}
      style={style}
      className={className}
    >
      <p>{message}</p>
    </Container>
  )
}

Notification.defaultProps = {
  kind: 'info'
}

export default Notification
