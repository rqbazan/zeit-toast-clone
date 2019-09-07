import React from 'react'
import ReactDOM from 'react-dom'
import NotificationManager from './notification-manager'
import { INotifier, INotification, IMountOptions } from './types'

export class ZeitToast implements INotifier {
  static defaultOptions: IMountOptions = {
    timeout: 3 * 1000,
    interval: 3 * 100,
    capacity: 3
  }

  private managerRef: React.RefObject<NotificationManager>

  private containerEl: HTMLDivElement

  private notify(notification: INotification) {
    if (this.managerRef.current) {
      this.managerRef.current.showNotification(notification)
    }
  }

  unmount() {
    if (this.containerEl) {
      ReactDOM.unmountComponentAtNode(this.containerEl)
    }
  }

  mount(options: IMountOptions = ZeitToast.defaultOptions) {
    this.containerEl = document.createElement('div')

    document.body.appendChild(this.containerEl)

    this.managerRef = React.createRef<NotificationManager>()

    ReactDOM.render(
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

export default new ZeitToast()
