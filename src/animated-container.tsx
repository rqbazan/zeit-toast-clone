import * as React from 'react'
import { useTransition, UseTransitionResult, animated } from 'react-spring'
import { AnimatedNotification, INotification } from './types'

export interface IAnimatedContainerProps {
  notifications: AnimatedNotification[]
  component: React.ComponentType<INotification>
  isOverviewing: boolean
  offset: number
  height: number
  onOverviewToogle(isOverviewing: boolean): void
}

export type NotificationTransition = UseTransitionResult<AnimatedNotification, React.CSSProperties>

export const MAX_NOTIFICATIONS = 3

const SCALE_STEP = 0.05

const TRANSLATE_STEP = 10

const getUpdateTransforms = (index: number, height: number) => {
  const scaleFactor = SCALE_STEP * index
  const translateFactor = TRANSLATE_STEP * index

  return {
    translate: `translate(0, -${height + translateFactor}px)`,
    scale: `scale(${1 - scaleFactor})`,
  }
}

const getOverviewTransforms = (index: number, height: number) => {
  const translateFactor = (TRANSLATE_STEP + height) * index

  return {
    translate: `translate(0, -${height + translateFactor}px)`,
    scale: `scale(1)`,
  }
}

const comparator = (a: NotificationTransition, b: NotificationTransition) => {
  return b.item.index - a.item.index
}

const useClickOutside = (listener: EventListener) => {
  // eslint-disable-next-line
  const callback = React.useCallback(listener, [])

  React.useEffect(() => {
    document.addEventListener('click', callback)

    return () => {
      document.removeEventListener('click', callback)
    }
  }, [callback])
}

const AnimatedContainer: React.FC<IAnimatedContainerProps> = props => {
  const {
    height,
    offset,
    notifications: items,
    component: Notification,
    isOverviewing,
    onOverviewToogle,
  } = props

  useClickOutside(() => {
    if (isOverviewing) {
      onOverviewToogle(false)
    }
  })

  const updateTransition = (item: AnimatedNotification) => {
    const transforms = isOverviewing
      ? getOverviewTransforms(item.index, height)
      : getUpdateTransforms(item.index, height)

    return {
      transform: `${transforms.translate} ${transforms.scale}`,
      opacity: item.index < MAX_NOTIFICATIONS ? 1 : 0,
    }
  }

  const transitions = useTransition(items, item => item.key, {
    update: updateTransition,
    onDestroyed: () => onOverviewToogle(false),
    from: {
      transform: `translate(0, ${height + offset}px) scale(1)`,
      opacity: 0,
    },
    enter: {
      transform: `translate(0, -${height}px) scale(1)`,
      opacity: 1,
    },
    leave: { opacity: 0 },
  })

  const renderTransition = (transition: NotificationTransition) => {
    const { key, props: style, item: notification } = transition

    return (
      <animated.div
        key={key}
        style={{ height, position: 'absolute', width: '100%', ...style }}
        onMouseEnter={() => onOverviewToogle(true)}
        onMouseLeave={() => onOverviewToogle(false)}
        onClick={e => {
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
          onOverviewToogle(true)
        }}
      >
        <Notification {...notification} />
      </animated.div>
    )
  }

  return <>{transitions.sort(comparator).map(renderTransition)}</>
}

export default AnimatedContainer
