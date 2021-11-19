// const HASH_CONST = Math.PI - Math.E
const HASH_CONST = Math.pow(Math.PI, -1) + Math.pow(Math.E, -1)
const KNUTH_CONST = 0.61803399

const getHash = (key: number, c: number, length: number): number => {
  const x = c * key
  const fractional = x - Math.trunc(x)

  return Math.trunc(length * fractional)
}

// TODO: implement another function
const getAnotherHash = (key: number): number => {
  return 7 - (key % 7)
}

export {
  getHash, getAnotherHash, HASH_CONST, KNUTH_CONST
}
