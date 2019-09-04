export type MessageKind = 'error' | 'warning' | 'success' | 'info'

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

export interface IIndexable {
  key: string
  index: number
}

export type IdxNotification = INotification & IIndexable

export type Toast = {
  [key in MessageKind]: (message: string) => void
}
