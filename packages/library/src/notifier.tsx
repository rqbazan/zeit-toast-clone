import React from 'react'
import ReactDOM from 'react-dom'
import defaultConfig from './default-config'
import { INotifier, INotification, IMountOptions } from './types'
import NotificationManager from './manager'

export class Notifier implements INotifier {
  static defaultConfig = defaultConfig

  private managerRef: React.RefObject<NotificationManager>

  private containerEl: HTMLDivElement

  private notify(notification: INotification) {
    if (this.managerRef.current) {
      this.managerRef.current.showNotification(notification)
    }
  }

  init() {
    if (this.containerEl) {
      return
    }

    this.containerEl = document.createElement('div')
    document.body.appendChild(this.containerEl)
    this.managerRef = React.createRef<NotificationManager>()
  }

  portal(options: IMountOptions): React.ReactPortal {
    this.init()

    return ReactDOM.createPortal(
      <NotificationManager {...options} ref={this.managerRef} />,
      this.containerEl
    )
  }

  error(message: string) {
    this.notify({ message, kind: 'error' })
  }

  success(message: string) {
    this.notify({ message, kind: 'success' })
  }

  warning(message: string) {
    this.notify({ message, kind: 'warning' })
  }

  info(message: string) {
    this.notify({ message, kind: 'info' })
  }
}

const notifier = new Notifier()

export const NotifierPortal = React.memo(
  (props: Partial<IMountOptions>): React.ReactPortal | null => {
    // For SSR support ¯\_(ツ)_/¯
    if (typeof window === 'undefined') {
      return null
    }

    return notifier.portal({ ...defaultConfig, ...props })
  }
)

export default notifier
