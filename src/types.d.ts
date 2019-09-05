export type MessageKind = 'error' | 'warning' | 'success' | 'info'

export type Toast = {
  [key in MessageKind]: (message: string) => void
}

export type Indexable = {
  key: string
  index: number
}

export type IndexableNotification = INotification & Indexable

export interface INotification {
  message: string
  kind: MessageKind
}

export interface IMountOptions {
  timeout: number
  capacity: number
  interval: number
  zIndex?: number
}

export interface INotifier extends Toast {
  mount(options: IMountOptions): void
  unmount(): void
}
