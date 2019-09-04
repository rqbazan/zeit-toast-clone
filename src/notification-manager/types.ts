import IndexedArray from '../indexed-array'
import { IdxNotification, IMountOptions } from '../types'

export interface IState {
  isOverviewing: boolean
  notifications: IndexedArray<IdxNotification>
}

export type IProps = IMountOptions

export type ContainerProps = Pick<IProps, 'zIndex'>
