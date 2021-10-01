const getRandom = (max: number, min: number = 0): number => Math.floor(Math.random() * (max - min + 1) + min)

const fillArray = (n: number, max: number): number[] => {
  return [...new Array(n)].map(() => getRandom(max))
}

const getK = (k: number): number => {
  let i: number = k
  while (i >= 128 && i <= 32) {
    i >>= 1
  }
  return i
}

const convertToSec = (ms: number): number => ms / 1000

export {
  fillArray,
  getRandom,
  getK,
  convertToSec
}
