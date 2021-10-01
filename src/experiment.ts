import mergeHybridSort from "./algorithms/merge-sort";
import quickHybridSort from "./algorithms/quick-sort";

const mergeHybridSortExperiment = (array: number[]): void => {
  let k: number = array.length
  while (k >>= 1) {
    const start = new Date().getTime()
    mergeHybridSort(array, k)
    const end = new Date().getTime()

    console.log(`${k}: ${end - start}`)
  }
}

const quickHybridSortExperiment = (array: number[]): void => {
  let k: number = array.length
  while ((k >>= 1)) {
    const start = new Date().getTime()
    quickHybridSort(array, k)
    const end = new Date().getTime()

    console.log(`${k}: ${end - start}`)
  }
}

export {
  quickHybridSortExperiment,
  mergeHybridSortExperiment
}
