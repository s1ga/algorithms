import {searching} from './algorithms/searching'
import {fillArray, List} from "./utils";
import {BinarySearchTree} from "./algorithms/tree/binaryTree";
import {HashTable} from "./algorithms/hash/hashTable";

// const findElement = () => {
//   const container: HTMLElement = document.querySelector('#search')
//   const length: number = parseInt((container.querySelector('.length') as HTMLInputElement).value, 10)
//   const maxEl: number = parseInt((container.querySelector('.max') as HTMLInputElement).value, 10)
//   const find: number = parseInt((container.querySelector('.find') as HTMLInputElement).value, 10)
//
//   const arr: number[] = fillArray(length, maxEl)
//   arr.sort((a: number, b: number) => a - b)
//   console.log(arr)
//
//   console.log(searching(arr, find, 'binary'))
//   console.log(searching(arr, find, 'interpolation'))
// }
//
// const findElementBtn: HTMLButtonElement = document.querySelector('#search .submit')
// findElementBtn.addEventListener('click', () => {
//   findElement()
// })

// const tree = BinarySearchTree.construct<number>([4, 2, 6, 0, 1, 3, 9, 8, 10, 5, 12, 13])
// console.log(tree.isBalanced(tree.rootTree))
// tree.balance()
// console.log(tree.isBalanced(tree.rootTree))
// console.log(tree.rootTree)

const hashTable = new HashTable(10, 'chaining')
hashTable.set(1, 1)
hashTable.set(1, 2)
hashTable.set(1, 10)
hashTable.set(2, 3)
hashTable.set(3, 4)
console.log(hashTable.hashTable, hashTable.collisions)