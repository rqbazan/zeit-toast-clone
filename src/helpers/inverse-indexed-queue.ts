import { Indexable } from '../types'

/**
 * Keeps the index property of the items in the inversed order, also it
 * has a static capacity which is required by default.
 *
 * [{ index: n - 1 }, { index: n - 2 }, ..., { index: 0 }]
 */
class InverseIndexedQueue<Item extends Indexable> {
  private capacity: number

  readonly items: Item[]

  constructor(capacity: number, items: Item[] = []) {
    this.capacity = capacity
    this.items = items
  }

  get length() {
    return this.items.length
  }

  add(newItem: Item) {
    if (this.items.length + 1 > this.capacity) {
      this.items.shift()
    }

    this.items.forEach(item => {
      // eslint-disable-next-line no-param-reassign
      item.index += 1
    })

    this.items.push(newItem)
  }

  pop() {
    this.items.shift()
  }

  clone() {
    return new InverseIndexedQueue(this.capacity, this.items)
  }
}

export default InverseIndexedQueue
