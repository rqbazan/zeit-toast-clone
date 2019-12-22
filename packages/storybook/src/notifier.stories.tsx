import React from 'react'
import { text, select, boolean } from '@storybook/addon-knobs'
import notifier, { NotifierPortal, IMountOptions } from 'zeit-toast-clone'
import Button from './components/button'
import Emoji from './components/emoji'
import ButtonGroup from './components/button-group'
import CustomNotification from './components/custom-notification'

export default { title: 'notifier' }

export const Playground = () => {
  const message = text('message', 'Hello world!')

  const kind = select(
    'kind',
    ['info', 'error', 'success', 'warning'],
    'success'
  )

  const notifierOptions: Partial<IMountOptions> = {}

  if (boolean('custom component', false)) {
    notifierOptions.component = CustomNotification
    notifierOptions.height = 40
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
