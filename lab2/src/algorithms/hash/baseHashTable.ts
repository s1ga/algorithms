interface IHashTable {
  [key: number]: any
}

export class BaseHashTable {
  public readonly hashTable: IHashTable // TODO: make protected

  constructor() {
    this.hashTable = {}
  }

  protected get length(): number {
    return Object.keys(this.hashTable).length
  }

  protected setValue(key: number, value: any) {
    this.hashTable[key] = value
  }

  protected getValue(key: number): any | undefined {
    return this.hashTable[key]
  }
}