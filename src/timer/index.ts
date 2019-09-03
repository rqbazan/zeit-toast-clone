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
    clearTimeout(this.timerId)
    this.remaining -= new Date().getTime() - this.start.getTime()
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
