import styled from 'styled-components'
import { animated } from 'react-spring'
import vars from '../vars'

export const NotificationContainer = styled(animated.div)`
  height: ${vars.height + vars.translateStep}px;
  position: absolute;
  width: 100%;
`
