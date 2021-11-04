interface IHashTable {
  [key: number]: any
}

export class BaseHashTable {
  private readonly hashTable: IHashTable

  constructor() {
    this.hashTable = {}
  }

  public get table(): IHashTable {
    return this.hashTable
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