import {BaseHashTable} from "./baseHashTable";
import {getAnotherHash, getHash} from "./methods";
import {List} from "../../utils";

type CollisionMethod = 'chaining' | 'linear probing' | 'double hashing'

export class HashTable extends BaseHashTable {
  private collisionCounter: number = 0
  private readonly method: CollisionMethod
  private readonly size: number

  constructor(size: number, method: CollisionMethod = 'chaining') {
    super()
    this.method = method
    this.size = size
  }

  public get isFull(): boolean {
    return this.size === this.length
  }

  public get collisions(): number {
    return this.collisionCounter
  }

  public get(key: any): any | undefined {

  }

  public set(key: any, value: any): void {
    if (this.isFull) {
      return
    }

    const hash = getHash(key, 0.61, this.size) // TODO: compute my own constant

    if (this.getValue(hash) === undefined) {
      this.setValue(hash, value)
    } else {
      this.collisionCounter += 1
      switch (this.method) {
        case "chaining":
          this.setElWithChaining(hash, value)
          break
        case "linear probing":
          this.setElWithLinearProbing(hash, value)
          break
        case "double hashing":
          this.setElWithQuadraticProbing(hash, getAnotherHash(key), value)
          break
        default:
          console.warn('No such collision handling method')
      }
    }
  }

  public remove(key: any): void {

  }

  private setElWithChaining(key: number, value: any) {
    const initValue = this.getValue(key)

    if (initValue instanceof List) {
      initValue.add(value)
    } else {
      const list = new List()
      list.add(initValue)
      list.add(value)

      this.setValue(key, list)
    }
  }

  private setElWithLinearProbing(key: number, value: any) {
    for (key + 1; key <= this.size; key += 1) {
      this.collisionCounter += 1

      if (this.getValue(key) === undefined) {
        this.setValue(key, value)
        return
      }
    }
  }

  private setElWithQuadraticProbing(hash: number, anotherHash: number, value: any) {
    let i: number = 1
    const doubleHash = () => (hash + i * anotherHash) % this.size
    while (this.getValue(doubleHash()) !== undefined) {
      i += 1
    }

    this.setValue(doubleHash(), value)
  }
}