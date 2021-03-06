const getRandom = (max: number, min: number = 1): number => Math.floor(Math.random() * (max - min + 1) + min)

const fillArray = (n: number, max: number): number[] => {
  return [...new Array(n)].map(() => getRandom(max))
}

const getK = (k: number): number => {
  let i: number = k
  while (i >= 64) {
    i = Math.floor(i / 2)
  }
  return i
}

interface Node<T> {
  value: T
  next: Node<T>
}

class ListNode<T> implements Node<T> {
  public value: T
  public next: Node<T>

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

class List<T> {
  public head: ListNode<T>

  constructor() {
    this.head = null
  }

  public add(value: T): void {
    if (this.head === null) {
      this.head = new ListNode<T>(value)
    } else {
      let head: ListNode<T> = this.head
      while (head.next !== null) {
        head = head.next
      }

      head.next = new ListNode<T>(value)
    }
  }
}

export {
  getRandom,
  fillArray,
  getK,
  List
}