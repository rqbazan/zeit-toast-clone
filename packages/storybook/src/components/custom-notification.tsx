import React from 'react'
import styled from 'styled-components'
import { INotification, MessageKind, DarkModeContext } from 'zeit-toast-clone'
import Emoji from './emoji'

const Container = styled.div<{ darkMode: boolean }>`
  align-items: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
  color: black;
  display: flex;
  padding: 8px 16px;
  font-size: 14px;
  height: 100%;
  box-sizing: border-box;

  ${props =>
    props.darkMode && {
      color: '#dbdbdb',
      backgroundColor: 'black',
      border: '1px solid #4d4d4d'
    }}
`

const emojis: { [key in MessageKind]: string } = {
  success: '🎉',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️'
}

export default function CustomNotification({ message, kind }: INotification) {
  const darkMode = React.useContext(DarkModeContext)

  return (
    <Container darkMode={darkMode}>
      <Emoji ariaLabel="success" render={emojis[kind]} />
      <p style={{ marginLeft: 8 }}>{message}</p>
    </Container>
  )
}
