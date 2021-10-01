const insertionSort = (arr: number[], left: number = 0, right: number = arr.length - 1): number[] => {
  for (let i = left; i <= right; i++) {
    for (let j = i; j > 0 && arr[j - 1] > arr[j]; j -= 1) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
    }
  }

  return arr
}

export default insertionSort
