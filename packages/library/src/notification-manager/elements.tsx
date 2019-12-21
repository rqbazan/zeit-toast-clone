import styled from 'styled-components'
import { IMountOptions } from '../types'
import vars from '../vars'

export type ContainerProps = Pick<IMountOptions, 'zIndex'>

const getZIndex = (props: ContainerProps) => {
  return props.zIndex || vars.zIndex
}

export const Container = styled.div<ContainerProps>`
  bottom: ${vars.position.bottom}px;
  left: ${vars.position.right}px;
  position: fixed;
  right: ${vars.position.right}px;
  z-index: ${getZIndex};

  @media (min-width: 46em) {
    left: unset;
    right: ${vars.position.right}px;
    width: ${vars.width}px;
  }
`
