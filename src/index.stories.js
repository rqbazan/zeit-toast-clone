import React from 'react'
import { text, select, number } from '@storybook/addon-knobs'
import { Button, Emoji, ButtonGroup } from '#storybook/components'
import notifier, { ZeitToast, NotifierPortal } from './index'

export default { title: 'notifier' }

export const Playground = () => {
  const message = text('message', 'Hello world!', 'notification')

  const kind = select(
    'kind',
    ['info', 'error', 'success', 'warning'],
    'success',
    'notification'
  )

  const notifierOptions = {
    timeout: number(
      'timeout',
      ZeitToast.defaultOptions.timeout,
      undefined,
      'notifier'
    ),
    interval: number(
      'interval',
      ZeitToast.defaultOptions.interval,
      undefined,
      'notifier'
    ),
    capacity: number(
      'capacity',
      ZeitToast.defaultOptions.capacity,
      undefined,
      'notifier'
    )
  }

  const show = () => {
    notifier[kind](message)
  }

  return (
    <>
      <Button onClick={show}>Show Notification</Button>
      <NotifierPortal {...notifierOptions} />
    </>
  )
}

export const AllInOne = () => {
  return (
    <>
      <ButtonGroup>
        <Button onClick={() => notifier.success('Hello world!')}>
          Show Success <Emoji ariaLabel="success" render="🎉" />
        </Button>
        <Button onClick={() => notifier.error('Invalid value')}>
          Show Error <Emoji ariaLabel="error" render="❌" />
        </Button>
        <Button onClick={() => notifier.info('Winter is coming')}>
          Show Info <Emoji ariaLabel="information" render="ℹ️" />
        </Button>
        <Button onClick={() => notifier.warning('Mismatch information')}>
          Show Warning ️️
          <Emoji ariaLabel="warning" render="⚠️" />
        </Button>
      </ButtonGroup>
      <NotifierPortal />
    </>
  )
}
