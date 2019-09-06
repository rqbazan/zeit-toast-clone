import styled from 'styled-components'
import { MessageKind } from '../types'
import vars from '../vars'

export interface IContainerProps {
  kind: MessageKind
}

export type BgColors = {
  [key in MessageKind]: string
}

const bgColors: BgColors = {
  success: '#94ffd8',
  error: '#ff4a2e',
  info: '#ffffff',
  warning: '#ffea2e'
}

const getBgColor = (props: IContainerProps) => {
  return bgColors[props.kind || 'info']
}

export const Container = styled.div<IContainerProps>`
  align-items: center;
  background-color: ${getBgColor};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
  color: black;
  display: flex;
  font-family: 'Open Sans', sans-serif;
  height: ${vars.height}px;
  padding: 0 24px;
`
