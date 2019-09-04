import * as React from 'react'
import { IdxNotification } from '../types'
import { UseTransitionResult } from 'react-spring'

export interface IProps {
  notifications: IdxNotification[]
  capacity: number
  isOverviewing: boolean
  onToogle(isOverviewing: boolean): void
}

export type Transition = UseTransitionResult<
  IdxNotification,
  React.CSSProperties
>
