import * as React from 'react'
import { text, select } from '@storybook/addon-knobs'
import notifier from './index'

notifier.mount({
  timeout: 3 * 1000,
  interval: 300,
  capacity: 3
})

export default { title: 'notifier' }

export const Normal = () => {
  const message = text('message', 'Hello World!')
  const kind = select('kind', ['info', 'error', 'success', 'warning'], 'info')

  const notify = () => {
    notifier.notify({ message, kind })
  }

  return <button onClick={notify}>Show Notification</button>
}
