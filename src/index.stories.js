import React from 'react'
import { text, select, number } from '@storybook/addon-knobs'
import { Button, Emoji, ButtonGroup } from '#storybook/components'
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
  const message = text('message', 'Hello world!', 'notification')

  const kind = select(
    'kind',
    ['info', 'error', 'success', 'warning'],
    'success',
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

  const show = () => {
    notifier[kind](message)
  }

  return <Button onClick={show}>Show Notification</Button>
}

export const AllInOne = () => {
  useNotifier()

  return (
    <ButtonGroup>
      <Button onClick={() => notifier.success('Hello world!')}>
        Show Success <Emoji ariaLabel="success" render="🎉" />
      </Button>
      <Button onClick={() => notifier.error('Invalid value')}>
        Show Error <Emoji ariaLabel="error" render="❌" />
      </Button>
      <Button onClick={() => notifier.info('Winter is comming')}>
        Show Info <Emoji ariaLabel="information" render="ℹ️" />
      </Button>
      <Button onClick={() => notifier.warning('Mismatch information')}>
        Show Warning ️️
        <Emoji ariaLabel="warning" render="⚠️" />
      </Button>
    </ButtonGroup>
  )
}
