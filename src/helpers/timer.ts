class Timer {
  private id: number

  init(callback: () => void, timeout: number) {
    clearTimeout(this.id)
    this.id = setTimeout(callback, timeout)
  }

  cancel() {
    clearTimeout(this.id)
  }
}

export default Timer
