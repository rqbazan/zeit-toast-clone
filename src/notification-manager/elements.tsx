import styled from 'styled-components'
import { ContainerProps } from './types'
import vars from '../vars'

const getZIndex = (props: ContainerProps) => {
  return props.zIndex || vars.zIndex
}

export const Container = styled.div<ContainerProps>`
  bottom: 16px;
  position: fixed;
  right: 16px;
  width: 328px;
  z-index: ${getZIndex};
`
