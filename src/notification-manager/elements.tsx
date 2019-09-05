import styled from 'styled-components'
import { IMountOptions } from '../types'
import vars from '../vars'

export type ContainerProps = Pick<IMountOptions, 'zIndex'>

const getZIndex = (props: ContainerProps) => {
  return props.zIndex || vars.zIndex
}

export const Container = styled.div<ContainerProps>`
  bottom: ${vars.position.bottom}px;
  position: fixed;
  right: ${vars.position.right}px;
  width: 328px;
  z-index: ${getZIndex};
`
