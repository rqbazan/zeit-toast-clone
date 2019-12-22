import React from 'react'

export type MessageKind = 'error' | 'warning' | 'success' | 'info'

export type Toast = {
  [key in MessageKind]: (message: string) => void
}

export type Indexable = {
  index: number
}

export type Searchable = {
  key: string
}

export type AnimatedNotification = INotification & Indexable & Searchable

export interface INotification {
  message: string
  kind: MessageKind
}

export interface IMountOptions {
  height: number
  offset: number
  component: React.ComponentType<INotification>
}

export interface INotifier extends Toast {
  portal(options: IMountOptions): React.ReactPortal
}
