import React from 'react'
import { Container } from './elements'
import AnimatedContainer from '../animated-container'
import InverseIndexedArray from '../helpers/inverse-indexed-array'
import Timer from '../helpers/timer'
import { INotification, AnimatedNotification, IMountOptions } from '../types'

export interface IState {
  isOverviewing: boolean
  animatedNotifications: InverseIndexedArray<AnimatedNotification>
}

class NotificationManager extends React.Component<IMountOptions, IState> {
  countNotifications = 0

  cleanUpTimer = new Timer()

  dominoTimer = new Timer()

  state: IState = this.getInitialState()

  getInitialState(): IState {
    return {
      isOverviewing: false,
      animatedNotifications: new InverseIndexedArray<AnimatedNotification>(
        this.props.capacity + 1
      )
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
      const { animatedNotifications } = prevState

      animatedNotifications.shift()

      return { animatedNotifications }
    }

    this.setState(updateState)
  }

  showNotification = (notification: INotification) => {
    this.setupTimers()

    const updateState = (prevState: IState) => {
      const { animatedNotifications } = prevState

      animatedNotifications.push({
        ...notification,
        index: 0,
        key: this.generateNextKey()
      })

      return { animatedNotifications }
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
      <Container zIndex={this.props.zIndex}>
        <AnimatedContainer
          capacity={this.props.capacity}
          isOverviewing={this.state.isOverviewing}
          notifications={this.state.animatedNotifications}
          onOverviewToogle={this.onOverviewToogle}
        />
      </Container>
    )
  }
}

export default NotificationManager
