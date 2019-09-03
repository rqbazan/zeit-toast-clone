import * as React from 'react'
import AnimatedContainer from '../animated-container'
import IndexedArray from '../indexed-array'
import { INotification, IdxNotification } from '../types'
import { Container } from './elements'
import { IState, IProps } from './types'

class NotificationManager extends React.Component<IProps, IState> {
  countNotifications: number = 0

  cleanUpTimerId: number

  dominoTimerId: number

  state: IState = this.getInitialState()

  componentWillUnmount() {
    this.clearTimeouts()
  }

  getInitialState(): IState {
    const { capacity } = this.props

    return {
      notifications: new IndexedArray<IdxNotification>(capacity + 1)
    }
  }

  clearTimeouts = () => {
    if (this.cleanUpTimerId) {
      clearTimeout(this.cleanUpTimerId)
    }

    if (this.dominoTimerId) {
      clearTimeout(this.dominoTimerId)
    }
  }

  domino = () => {
    if (!this.state.notifications.length) {
      return
    }

    this.dominoTimerId = setTimeout(() => {
      this.popNotification()
      this.domino()
    }, this.props.interval)
  }

  setCleanUpTimeout = () => {
    this.clearTimeouts()

    this.cleanUpTimerId = setTimeout(() => {
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
    this.setCleanUpTimeout()

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

  render() {
    return (
      <Container zIndex={this.props.zIndex}>
        <AnimatedContainer
          capacity={this.props.capacity}
          notifications={this.state.notifications}
        />
      </Container>
    )
  }
}

export default NotificationManager
