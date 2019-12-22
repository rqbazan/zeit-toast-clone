import styled from 'styled-components'
import { MessageKind } from '../types'

export interface IContainerProps {
  kind: MessageKind
  darkMode?: boolean
}

export type BgColors = {
  [key in MessageKind]: string
}

const bgLightColors: BgColors = {
  success: '#94ffd8',
  error: '#ff4a2e',
  info: '#fff',
  warning: '#ffea2e'
}

const bgDarkColors: BgColors = {
  ...bgLightColors,
  info: '#000'
}

const isDarkInfo = (props: IContainerProps): boolean => {
  return !!props.darkMode && props.kind === 'info'
}

const getBgColor = (props: IContainerProps): string => {
  const { darkMode, kind } = props

  if (darkMode) {
    return bgDarkColors[kind]
  }

  return bgLightColors[kind]
}

const getBorder = (props: IContainerProps): string | null => {
  if (!props.darkMode) {
    return null
  }

  if (isDarkInfo(props)) {
    return 'border: 1px solid #858585;'
  }

  return 'border: 1px solid #000;'
}

const getColor = (props: IContainerProps): string => {
  if (isDarkInfo(props)) {
    return '#fff'
  }

  return '#000'
}

export const Container = styled.div<IContainerProps>`
  align-items: center;
  background-color: ${getBgColor};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
  color: ${getColor};
  display: flex;
  height: 64px;
  padding: 0 24px;
  user-select: none;
  ${getBorder}
`
