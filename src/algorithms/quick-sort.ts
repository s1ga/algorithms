import {getRandom} from "../utils"
import insertionSort from "./insertion-sort"

const partition = (arr: number[], left: number, right: number): number => {
  const sep: number = left
  let i: number = left
  let j: number = right

  while (i <= j) {
    // while left elements less than pivot shift our pointer
    while (arr[i] < arr[sep]) {
      i += 1
    }
    // while right elements greater than pivot shift our pointer
    while (arr[j] > arr[sep]) {
      j -= 1
    }

    // swap elements
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i += 1
      j -= 1
    }
  }

  return i
}

const quickHybridSort = (arr: number[], k: number, left: number = 0, right: number = arr.length - 1): number[] => {
  if (right - left) {
    if (right - left <= k) {
      return insertionSort(arr, left, right)
    } else if (left <= right) {
      const i: number = partition(arr, left, right)
      // recursive call for subarray
      if (left < i - 1) {
        quickHybridSort(arr, k, left, i - 1)
      }
      if (i < right) {
        quickHybridSort(arr, k, i, right)
      }
    }
  }

  return arr
}

export default quickHybridSort
