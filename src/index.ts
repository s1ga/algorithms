import quickHybridSort from './algorithms/quick-sort'
import mergeHybridSort from "./algorithms/merge-sort"
import {convertToSec, fillArray, getK} from './utils'

interface ISortOptions {
  maxValue: number
  arrayLength: number
  arraysCount: number
}

const showTimeForSort = (sortName: string, options: ISortOptions, sortFn: (arr: number[], k: number) => number[]): string => {
  const start = new Date().getTime()

  const k: number = getK(options.arrayLength)

  for (let i = 1; i <= options.arraysCount; i += 1) {
    const array = fillArray(options.arrayLength, options.maxValue)
    sortFn(array, k)
  }

  const end = new Date().getTime()

  return `Time for ${sortName} hybrid sort: ${convertToSec(end - start)} seconds`
}


document.querySelector('#sort_btn').addEventListener('click', () => {
  const options: ISortOptions = {
    arraysCount: parseInt((document.querySelector('#amount') as HTMLInputElement).value, 10),
    maxValue: parseInt((document.querySelector('#max') as HTMLInputElement).value, 10),
    arrayLength: parseInt((document.querySelector('#length') as HTMLInputElement).value, 10),
  }

  const output1 = document.createElement('div')
  const output2 = document.createElement('div')
  output1.innerText = showTimeForSort('merge', options, mergeHybridSort)
  output2.innerText = showTimeForSort('quick', options, quickHybridSort)

  document.body.append(output1, output2)
})
