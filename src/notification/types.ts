import * as React from 'react'
import { MessageKind } from '../types'

export interface IContainerProps {
  kind: MessageKind
}

export type BgColors = {
  [key in MessageKind]: string
}

export interface IProps extends IContainerProps {
  message: string
  className?: string
  style?: React.CSSProperties
}
