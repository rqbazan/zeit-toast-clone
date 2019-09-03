import { IIndexable } from '../types'

class IndexedArray<Item extends IIndexable> extends Array<Item> {
  private capacity: number

  constructor(capacity: number) {
    super()
    this.capacity = capacity
  }

  push(item: Item) {
    if (this.length + 1 > this.capacity) {
      this.shift()
    }

    this.forEach(item => {
      item.index += 1
    })

    return super.push(item)
  }
}

export default IndexedArray
