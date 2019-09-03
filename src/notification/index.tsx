import * as React from 'react'
import { Container } from './elements'
import { IProps } from './types'

const Notification: React.FC<IProps> = props => {
  const { style, className, message, kind } = props

  return (
    <Container kind={kind} style={style} className={className}>
      <p>{message}</p>
    </Container>
  )
}

export default Notification
