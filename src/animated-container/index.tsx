import React from 'react'
import { useTransition, UseTransitionResult } from 'react-spring'
import { NotificationContainer } from './elements'
import Notification from '../notification'
import { IndexableNotification } from '../types'
import vars from '../vars'

export interface IAnimatedContainerProps {
  notifications: IndexableNotification[]
  capacity: number
  isOverviewing: boolean
  onOverviewToogle(isOverviewing: boolean): void
}

export type NotificationTransition = UseTransitionResult<
  IndexableNotification,
  React.CSSProperties
>

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

const comparator = (a: NotificationTransition, b: NotificationTransition) => {
  return b.item.index - a.item.index
}

const AnimatedContainer: React.FC<IAnimatedContainerProps> = props => {
  const {
    notifications: items,
    capacity,
    isOverviewing,
    onOverviewToogle
  } = props

  const updateTransition = (item: IndexableNotification) => {
    const transforms = isOverviewing
      ? getOverviewTransforms(item.index)
      : getUpdateTransforms(item.index)

    return {
      transform: `${transforms.translate} ${transforms.scale}`,
      opacity: item.index < capacity ? 1 : 0
    }
  }

  const hiddenBottomPosition = vars.height + vars.position.bottom

  const transitions = useTransition(items, item => item.key, {
    update: updateTransition,
    onDestroyed: () => onOverviewToogle(false),
    from: {
      transform: `translate(0, ${hiddenBottomPosition}px) scale(1)`,
      opacity: 0
    },
    enter: {
      transform: `translate(0, -${vars.height}px) scale(1)`,
      opacity: 1
    },
    leave: { opacity: 0 }
  })

  const renderTransition = (transition: NotificationTransition) => {
    const { key, props: style, item: notification } = transition

    return (
      <NotificationContainer
        key={key}
        style={style}
        onMouseEnter={() => onOverviewToogle(true)}
        onMouseLeave={() => onOverviewToogle(false)}
      >
        <Notification {...notification} />
      </NotificationContainer>
    )
  }

  return <>{transitions.sort(comparator).map(renderTransition)}</>
}

export default AnimatedContainer
