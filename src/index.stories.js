import React from 'react'
import { text, select, number } from '@storybook/addon-knobs'
import notifier, { ZeitToast } from './index'

export default { title: 'notifier' }

/**
 * Avoid to mount two notifiers when the story is reloaded
 * by HRM in development mode
 */
const useNotifier = (options = ZeitToast.defaultOptions) => {
  React.useEffect(() => {
    notifier.mount(options)

    return () => {
      notifier.unmount()
    }
  }, Object.keys(options).map(key => options[key]))
}

export const Playground = () => {
  const message = text('message', 'Hello World!', 'notification')

  const kind = select(
    'kind',
    ['info', 'error', 'success', 'warning'],
    'info',
    'notification'
  )

  const timeout = number(
    'timeout',
    ZeitToast.defaultOptions.timeout,
    undefined,
    'notifier'
  )

  const interval = number(
    'interval',
    ZeitToast.defaultOptions.interval,
    undefined,
    'notifier'
  )

  const capacity = number(
    'capacity',
    ZeitToast.defaultOptions.capacity,
    undefined,
    'notifier'
  )

  useNotifier({
    timeout,
    interval,
    capacity
  })

  return (
    <button type="button" onClick={() => notifier[kind](message)}>
      Show Notification
    </button>
  )
}

export const AllInOne = () => {
  useNotifier()

  return (
    <>
      <button type="button" onClick={() => notifier.success('Hello world!')}>
        Show Success
      </button>
      <button type="button" onClick={() => notifier.error('Invalid value')}>
        Show Error
      </button>
      <button type="button" onClick={() => notifier.info('Winter is comming')}>
        Show Info
      </button>
      <button
        type="button"
        onClick={() => notifier.warning('Mismatch information')}
      >
        Show Warning
      </button>
    </>
  )
}
