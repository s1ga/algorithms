import insertionSort from "./insertionSort"

const merge = (left: number[], right: number[]): number[] => {
  const res = []

  let i: number = 0
  let j: number = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i += 1
    } else {
      res.push(right[j])
      j += 1
    }
  }

  return [...res, ...left.slice(i), ...right.slice(j)]
}

export const mergeHybridSort = (arr: number[], k: number): number[] => {
  if (arr.length < 2) {
    return arr
  } else if (arr.length < k) {
    return insertionSort(arr)
  }

  const sep = Math.floor(arr.length / 2)
  const leftPart = arr.slice(0, sep)
  const rightPart = arr.slice(sep)

  return merge(mergeHybridSort(leftPart, k), mergeHybridSort(rightPart, k))
}
