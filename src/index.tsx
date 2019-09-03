import * as React from 'react'
import * as ReactDOM from 'react-dom'
import NotificationManager from './notification-manager'
import { INotifier, INotification, IMountOptions } from './types'

export class ReactBasicNotifier implements INotifier {
  rootRef: React.RefObject<NotificationManager>

  mount(options: IMountOptions) {
    const containerEl = document.createElement('div')

    document.body.appendChild(containerEl)

    this.rootRef = React.createRef<NotificationManager>()

    ReactDOM.render(
      <NotificationManager {...options} ref={this.rootRef} />,
      containerEl
    )
  }

  notify(notification: INotification) {
    if (this.rootRef.current) {
      this.rootRef.current.showNotification(notification)
    }
  }
}

export default new ReactBasicNotifier()
