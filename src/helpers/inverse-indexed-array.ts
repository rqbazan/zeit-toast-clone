import { Indexable } from '../types'

/**
 * Keeps the index property of the items in the inversed order, also it
 * has a static capacity which is required by default.
 *
 * [{ index: n - 1 }, { index: n - 2 }, ..., { index: 0 }]
 */
class InverseIndexedArray<Item extends Indexable> extends Array<Item> {
  private capacity: number

  constructor(capacity: number) {
    super()
    this.capacity = capacity
  }

  push(newItem: Item) {
    if (this.length + 1 > this.capacity) {
      this.shift()
    }

    this.forEach(item => {
      // eslint-disable-next-line no-param-reassign
      item.index += 1
    })

    return super.push(newItem)
  }
}

export default InverseIndexedArray
