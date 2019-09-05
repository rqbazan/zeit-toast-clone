import React from 'react'
import { Container } from './elements'
import { MessageKind } from '../types'

export interface INotificationProps {
  kind: MessageKind
  message: string
  className?: string
  style?: React.CSSProperties
}

const Notification: React.FC<INotificationProps> = props => {
  const { style, className, message, kind } = props

  return (
    <Container kind={kind} style={style} className={className}>
      <p>{message}</p>
    </Container>
  )
}

export default Notification
