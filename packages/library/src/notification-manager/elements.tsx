import styled from 'styled-components'
import { IMountOptions } from '../types'

export type ContainerProps = Pick<IMountOptions, 'zIndex' | 'offset' | 'width'>

export const Container = styled.div<ContainerProps>`
  position: fixed;

  ${props => ({
    zIndex: props.zIndex,
    bottom: props.offset,
    left: props.offset,
    right: props.offset
  })}

  @media (min-width: 46em) {
    left: unset;

    ${props => ({
      right: props.offset,
      width: props.width
    })}
  }
`
