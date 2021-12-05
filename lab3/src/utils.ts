const getRandom = (max: number, min: number = 0): number => Math.floor(Math.random() * (max - min + 1) + min)

const fillArray = (n: number, max: number): number[] => {
  return [...new Array(n)].map(() => getRandom(max))
}

type Vertex = string | number

type Rib = [Vertex, Vertex]

enum Colors {
  RED = 'red',
  BLUE = 'blue'
}

export {
  getRandom,
  fillArray,
  Vertex,
  Rib,
  Colors
}