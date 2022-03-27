/**
 * An small abstraction over `setTimeout`
 */
class Timer {
  private id!: NodeJS.Timeout

  /**
   * Set a timeout-function and clear a previous one created
   * by the timer instance
   *
   * @param callback - timeout-function to be invoked in the future
   * @param timeout - milliseconds
   */
  init(callback: () => void, timeout: number) {
    clearTimeout(this.id)
    this.id = setTimeout(callback, timeout)
  }

  /**
   * Cancel the timeout-function at any time
   */
  cancel() {
    clearTimeout(this.id)
  }
}

export default Timer
