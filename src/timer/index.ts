class Timer {
  private start: Date
  private remaining: number
  private timerId: number
  private callback: () => void

  init(callback: () => void, remaining: number) {
    this.callback = callback
    this.remaining = remaining
    this.resume()
  }

  pause() {
    if (!this.start) {
      return
    }

    clearTimeout(this.timerId)

    const now = new Date().getTime()
    const start = this.start.getTime()
    const elapsedTime = now - start

    this.remaining -= elapsedTime
  }

  resume() {
    clearTimeout(this.timerId)
    this.start = new Date()
    this.timerId = setTimeout(this.callback, this.remaining)
  }

  cancel() {
    clearTimeout(this.timerId)
  }
}

export default Timer
