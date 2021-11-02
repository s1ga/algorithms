const getHash = (key: number, c: number, length: number): number => {
  const x = c * key
  const fractional = x - Math.trunc(x)

  return Math.trunc(length * fractional) // TODO: is it correct to use length here
}

// TODO: implement another function
const getAnotherHash = (key: number): number => {
  return key % 7 + 1
}

export {
  getHash, getAnotherHash
}
