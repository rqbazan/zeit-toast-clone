import * as React from 'react'
import { useTransition } from 'react-spring'
import Notification from '../notification'
import { IdxNotification } from '../types'
import { IProps, Transition } from './types'
import { Container } from './elements'

const SCALE_STEP = 0.1
const TRANSLATE_STEP = 10

const calculateTransforms = (index: number) => {
  const scaleFactor = SCALE_STEP * index
  const translateFactor = TRANSLATE_STEP * index

  return {
    translate: `translate(0, -${64 + translateFactor}px)`,
    scale: `scale(${1 - scaleFactor})`
  }
}

const AnimatedContainer: React.FC<IProps> = props => {
  const { notifications: items, capacity } = props

  const update = (item: IdxNotification) => {
    const { translate, scale } = calculateTransforms(item.index)

    return {
      transform: `${translate} ${scale}`,
      opacity: item.index < capacity ? 1 : 0
    }
  }

  const transitions = useTransition(items, item => item.key, {
    update,
    from: { transform: 'translate(0, 80px) scale(1)', opacity: 0 },
    enter: { transform: 'translate(0, -64px) scale(1)', opacity: 1 },
    leave: { opacity: 0 }
  })

  const renderTransition = (transition: Transition) => {
    const { key, props: style, item: notification, state } = transition

    return (
      <Container key={key} style={style}>
        <Notification {...notification} />
      </Container>
    )
  }

  return (
    <>
      {transitions
        .sort((a, b) => b.item.index - a.item.index)
        .map(renderTransition)}
    </>
  )
}

export default AnimatedContainer
