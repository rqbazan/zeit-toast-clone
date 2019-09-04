import * as React from 'react'
import AnimatedContainer from '../animated-container'
import IndexedArray from '../indexed-array'
import Timer from '../timer'
import { INotification, IdxNotification } from '../types'
import { Container } from './elements'
import { IState, IProps } from './types'

class NotificationManager extends React.Component<IProps, IState> {
  countNotifications = 0

  cleanUpTimer = new Timer()

  dominoTimer = new Timer()

  state: IState = this.getInitialState()

  componentWillUnmount() {
    this.cancelTimers()
  }

  getInitialState(): IState {
    const { capacity } = this.props

    return {
      isOverviewing: false,
      notifications: new IndexedArray<IdxNotification>(capacity + 1)
    }
  }

  domino = () => {
    if (!this.state.notifications.length) {
      return
    }

    this.dominoTimer.init(() => {
      this.popNotification()
      this.domino()
    }, this.props.interval)
  }

  cancelTimers = () => {
    this.cleanUpTimer.cancel()
    this.dominoTimer.cancel()
  }

  setupTimers = () => {
    this.cancelTimers()

    this.cleanUpTimer.init(() => {
      this.domino()
    }, this.props.timeout)
  }

  generateNextKey = () => {
    return `rsn/notification@${++this.countNotifications}`
  }

  popNotification = () => {
    const updateState = (prevState: IState) => {
      const { notifications } = prevState

      notifications.shift()

      return { notifications }
    }

    this.setState(updateState)
  }

  showNotification = (notification: INotification) => {
    this.setupTimers()

    const updateState = (prevState: IState) => {
      const { notifications } = prevState

      const indexableNotification: IdxNotification = {
        ...notification,
        index: 0,
        key: this.generateNextKey()
      }

      notifications.push(indexableNotification)

      return { notifications }
    }

    this.setState(updateState)
  }

  turnOverviewOn = () => {
    this.setState({ isOverviewing: true })
    this.setupTimers()
    this.cleanUpTimer.pause()
  }

  turnOverviewOff = () => {
    this.setupTimers()
    this.setState({ isOverviewing: false })
  }

  onAnimatedToogle = (isOverviewing: boolean) => {
    if (isOverviewing) {
      this.turnOverviewOn()
    } else {
      this.turnOverviewOff()
    }
  }

  render() {
    return (
      <Container zIndex={this.props.zIndex}>
        <AnimatedContainer
          capacity={this.props.capacity}
          isOverviewing={this.state.isOverviewing}
          notifications={this.state.notifications}
          onToogle={this.onAnimatedToogle}
        />
      </Container>
    )
  }
}

export default NotificationManager
