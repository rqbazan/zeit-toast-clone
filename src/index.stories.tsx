import * as React from 'react'
import { text, select, number } from '@storybook/addon-knobs'
import { INotification, IMountOptions } from './types'
import notifier from './index'

export default { title: 'notifier' }

/**
 * Avoid to mount two notifiers when the story is reloaded
 * by HRM in development mode
 */
const useNotifier = (options: IMountOptions) => {
  const dependencies = Object.keys(options).map(
    (key: keyof IMountOptions) => options[key]
  )

  React.useEffect(() => {
    notifier.mount(options)

    return () => {
      notifier.unmount()
    }
  }, dependencies)
}

type Props = {
  notification: INotification
  options: IMountOptions
}

const DemoApp: React.FC<Props> = props => {
  const { notification, options } = props

  useNotifier(options)

  const notify = () => {
    notifier[notification.kind](notification.message)
  }

  return <button onClick={notify}>Show</button>
}

export const Normal = () => {
  const notification = {
    message: text('message', 'Hello World!', 'notification'),
    kind: select(
      'kind',
      ['info', 'error', 'success', 'warning'],
      'info',
      'notification'
    )
  }

  const options = {
    timeout: number('timeout', 3 * 1000, undefined, 'notifier'),
    interval: number('interval', 3 * 100, undefined, 'notifier'),
    capacity: number('capacity', 3, undefined, 'notifier')
  }

  return <DemoApp notification={notification} options={options} />
}
