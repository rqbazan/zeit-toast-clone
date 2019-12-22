import React from 'react'
import { MessageKind } from '../types'
import { DarkModeContext } from '../contexts'
import { Container } from './elements'

export interface INotificationProps {
  kind: MessageKind
  message: string
}

export default function Notification({
  message,
  kind = 'info'
}: INotificationProps) {
  const darkMode = React.useContext(DarkModeContext)

  return (
    <Container darkMode={darkMode} kind={kind}>
      <p>{message}</p>
    </Container>
  )
}
