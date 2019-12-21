import React, { ReactPortal } from 'react'
import ReactDOM from 'react-dom'
import Notification from './notification'
import { DarkModeContext } from './contexts'
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

  init() {
    if (this.containerEl) {
      return
    }

    this.containerEl = document.createElement('div')
    document.body.appendChild(this.containerEl)
    this.managerRef = React.createRef<NotificationManager>()
  }

  portal(options: IMountOptions = ZeitToast.defaultOptions): ReactPortal {
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

const notifier = new ZeitToast()

export const NotifierPortal = React.memo(
  (props: Partial<IMountOptions>): ReactPortal | null => {
    // For SSR support ¯\_(ツ)_/¯
    if (typeof window === 'undefined') {
      return null
    }

    return notifier.portal({ ...ZeitToast.defaultOptions, ...props })
  }
)

export { Notification, DarkModeContext }

export default notifier
