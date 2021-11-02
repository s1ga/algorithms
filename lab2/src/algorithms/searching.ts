const getMiddle = (arr: number[], find: number, start: number, end: number, searching: string): number => {
  if (searching === 'binary') {
    return Math.floor((start + end) / 2)
  } else if (searching === 'interpolation') {
    return start + Math.floor((find - arr[start]) * (end - start) / ( (arr[end] - arr[start]) || 1 ))
  }

  throw new Error('No such searching algorithm')
}

export const searching = (arr: number[], find: number, searching: 'binary' | 'interpolation', start: number = 0, end: number = arr.length - 1): number => {
  let counter: number = 0

  while (start <= end && find >= arr[start] && find <= arr[end]) {
    counter += 3
    const sep: number = getMiddle(arr, find, start, end, searching)

    if (arr[sep] === find) {
      counter += 1
      console.log(`Операций сравнения для ${searching}: ${counter}`)
      return sep
    } else if (arr[sep] > find) {
      counter += 1
      end = sep - 1
    } else {
      start = sep + 1
    }
  }

  console.log(`Операций сравнения для ${searching}: ${counter}`)
  return -1
}
