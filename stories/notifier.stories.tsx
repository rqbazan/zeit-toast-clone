import * as React from 'react'
import notifier, { NotifierPortal, IMountOptions, INotificationProps } from '../src'
import Button from './components/button'
import Emoji from './components/emoji'
import ButtonGroup from './components/button-group'
import CustomNotification from './components/custom-notification'

export default {
  title: 'Notifier',
  argTypes: {
    kind: {
      options: ['error', 'warning', 'success', 'info'],
      control: {
        type: 'radio',
      },
    },
  },
}

export const Playground = (args: INotificationProps & { custom: boolean }) => {
  const notifierOptions: Partial<IMountOptions> = {}

  if (args.custom) {
    notifierOptions.component = CustomNotification
    notifierOptions.height = 40
  }

  const show = () => {
    notifier[args.kind](args.message)
  }

  return (
    <>
      <Button onClick={show}>Show Notification</Button>
      <NotifierPortal {...notifierOptions} />
    </>
  )
}

Playground.args = {
  message: 'Hello world!',
  kind: 'info',
  custom: false,
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
