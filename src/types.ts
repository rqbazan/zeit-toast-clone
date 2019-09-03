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

export interface INotifier {
  mount(options: IMountOptions): void
  notify(notification: INotification): void
}

export interface IIndexable {
  key: string
  index: number
}

export type IdxNotification = INotification & IIndexable
