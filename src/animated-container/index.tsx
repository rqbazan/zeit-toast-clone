import * as React from 'react'
import { useTransition } from 'react-spring'
import Notification from '../notification'
import { IdxNotification } from '../types'
import vars from '../vars'
import { IProps, Transition } from './types'
import { Container } from './elements'

const getUpdateTransforms = (index: number) => {
  const scaleFactor = vars.scaleStep * index
  const translateFactor = vars.translateStep * index

  return {
    translate: `translate(0, -${vars.height + translateFactor}px)`,
    scale: `scale(${1 - scaleFactor})`
  }
}

const getOverviewTransforms = (index: number) => {
  const translateFactor = (vars.translateStep + vars.height) * index

  return {
    translate: `translate(0, -${vars.height + translateFactor}px)`,
    scale: `scale(1)`
  }
}

const comparator = (a: Transition, b: Transition) => {
  return b.item.index - a.item.index
}

const AnimatedContainer: React.FC<IProps> = props => {
  const { notifications: items, capacity, isOverviewing, onToogle } = props

  const update = (item: IdxNotification) => {
    const transforms = isOverviewing
      ? getOverviewTransforms(item.index)
      : getUpdateTransforms(item.index)

    return {
      transform: `${transforms.translate} ${transforms.scale}`,
      opacity: item.index < capacity ? 1 : 0
    }
  }

  const transitions = useTransition(items, item => item.key, {
    update,
    onDestroyed: () => onToogle(false),
    from: { transform: 'translate(0, 80px) scale(1)', opacity: 0 },
    enter: { transform: 'translate(0, -64px) scale(1)', opacity: 1 },
    leave: { opacity: 0 }
  })

  const renderTransition = (transition: Transition) => {
    const { key, props: style, item: notification } = transition

    return (
      <Container
        key={key}
        style={style}
        onMouseEnter={() => onToogle(true)}
        onMouseLeave={() => onToogle(false)}
      >
        <Notification {...notification} />
      </Container>
    )
  }

  return <>{transitions.sort(comparator).map(renderTransition)}</>
}

export default AnimatedContainer
