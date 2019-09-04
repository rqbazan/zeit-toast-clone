import * as React from 'react'
import * as ReactDOM from 'react-dom'
import NotificationManager from './notification-manager'
import { INotifier, INotification, IMountOptions } from './types'

export class ZeitToast implements INotifier {
  private rootRef: React.RefObject<NotificationManager>

  private containerEl: HTMLDivElement

  private notify(notification: INotification) {
    if (this.rootRef.current) {
      this.rootRef.current.showNotification(notification)
    }
  }

  unmount() {
    if (this.containerEl) {
      ReactDOM.unmountComponentAtNode(this.containerEl)
    }
  }

  mount(options: IMountOptions) {
    this.containerEl = document.createElement('div')

    document.body.appendChild(this.containerEl)

    this.rootRef = React.createRef<NotificationManager>()

    ReactDOM.render(
      <NotificationManager {...options} ref={this.rootRef} />,
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
