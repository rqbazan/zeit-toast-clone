import * as React from 'react'
import { INotification, AnimatedNotification, IMountOptions } from './types'
import AnimatedContainer, { MAX_NOTIFICATIONS } from './animated-container'
import InverseIndexedQueue from './helpers/inverse-indexed-queue'
import Timer from './helpers/timer'

export interface IState {
  isOverviewing: boolean
  animatedNotifications: InverseIndexedQueue<AnimatedNotification>
}

const COLLAPSE_INTERVAL = 3_00

const TIMEOUT = 3_000

class NotificationManager extends React.PureComponent<IMountOptions, IState> {
  countNotifications = 0

  cleanUpTimer = new Timer()

  dominoTimer = new Timer()

  state: IState = this.getInitialState()

  getInitialState(): IState {
    return {
      isOverviewing: false,
      animatedNotifications: new InverseIndexedQueue<AnimatedNotification>(MAX_NOTIFICATIONS + 1),
    }
  }

  componentWillUnmount() {
    this.cancelTimers()
  }

  domino = () => {
    if (!this.state.animatedNotifications.length) {
      return
    }

    this.popNotification()

    this.dominoTimer.init(() => {
      this.domino()
    }, COLLAPSE_INTERVAL)
  }

  cancelTimers = () => {
    this.cleanUpTimer.cancel()
    this.dominoTimer.cancel()
  }

  setupTimers = () => {
    this.cancelTimers()

    this.cleanUpTimer.init(() => {
      this.domino()
    }, TIMEOUT)
  }

  generateNextKey = () => {
    return `rsn/notification@${++this.countNotifications}`
  }

  popNotification = () => {
    const updateState = (prevState: IState) => {
      const { animatedNotifications } = prevState

      animatedNotifications.pop()

      return {
        animatedNotifications: animatedNotifications.clone(),
      }
    }

    this.setState(updateState)
  }

  showNotification = (notification: INotification) => {
    this.setupTimers()

    const updateState = (prevState: IState) => {
      const { animatedNotifications } = prevState

      animatedNotifications.add({
        ...notification,
        index: 0,
        key: this.generateNextKey(),
      })

      return {
        animatedNotifications: animatedNotifications.clone(),
      }
    }

    this.setState(updateState)
  }

  turnOverviewingOn = () => {
    this.cancelTimers()
    this.setState({ isOverviewing: true })
  }

  turnOverviewingOff = () => {
    this.setupTimers()
    this.setState({ isOverviewing: false })
  }

  onOverviewToogle = (isOverviewing: boolean) => {
    if (isOverviewing) {
      this.turnOverviewingOn()
    } else {
      this.turnOverviewingOff()
    }
  }

  render() {
    return (
      <div className="ztc-container">
        <AnimatedContainer
          offset={this.props.offset}
          height={this.props.height}
          component={this.props.component}
          isOverviewing={this.state.isOverviewing}
          notifications={this.state.animatedNotifications.items}
          onOverviewToogle={this.onOverviewToogle}
        />
      </div>
    )
  }
}

export default NotificationManager
