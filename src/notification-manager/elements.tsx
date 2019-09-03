import styled from 'styled-components'
import { ContainerProps } from './types'

const defaultZIndex = 9999

const getZIndex = (props: ContainerProps) => {
  return props.zIndex || defaultZIndex
}

export const Container = styled.div<ContainerProps>`
  bottom: 16px;
  position: fixed;
  right: 16px;
  width: 328px;
  z-index: ${getZIndex};
`
