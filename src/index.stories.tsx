import * as React from 'react'
import { text, select } from '@storybook/addon-knobs'
import { INotification, IMountOptions } from './types'
import notifier from './index'

export default { title: 'notifier' }

/**
 * Avoid to mount two notifiers when the story is reloaded
 * by HRM in development mode
 */
const useNotifier = (options: IMountOptions) => {
  React.useEffect(() => {
    notifier.mount(options)

    return () => {
      notifier.unmount()
    }
  }, [])
}

const DemoApp: React.FC<INotification> = props => {
  const { message, kind } = props

  useNotifier({
    timeout: 3 * 1000,
    interval: 300,
    capacity: 3
  })

  const notify = () => {
    notifier.notify({ message, kind })
  }

  return <button onClick={notify}>Show</button>
}

export const Normal = () => {
  const message = text('message', 'Hello World!')
  const kind = select('kind', ['info', 'error', 'success', 'warning'], 'info')

  return <DemoApp message={message} kind={kind} />
}
