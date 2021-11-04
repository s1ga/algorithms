import {searching} from './algorithms/searching'
import {fillArray, getK, List} from "./utils";
import {BinarySearchTree} from "./algorithms/binaryTree";
import {HashTable} from "./algorithms/hash/hashTable";
import {mergeHybridSort} from "./algorithms/sorting/mergeHybridSort";

const findElement = () => {
  const container: HTMLElement = document.querySelector('#search')
  const length: number = parseInt((container.querySelector('.length') as HTMLInputElement).value, 10)
  const maxEl: number = parseInt((container.querySelector('.max') as HTMLInputElement).value, 10)
  const find: number = parseInt((container.querySelector('.find') as HTMLInputElement).value, 10)

  const arr: number[] = mergeHybridSort(fillArray(length, maxEl), getK(length))

  console.log(searching(arr, find, 'binary'))
  console.log(searching(arr, find, 'interpolation'))
}
const findElementBtn: HTMLButtonElement = document.querySelector('#search .submit')
findElementBtn.addEventListener('click', () => {
  findElement()
})

const tree: BinarySearchTree<number> = BinarySearchTree.construct(fillArray(6, 20))
const addToTreeBtn: HTMLButtonElement = document.querySelector('#tree .add')
addToTreeBtn.addEventListener('click', () => {
  const container: HTMLElement = document.querySelector('#tree')
  const elToAdd: number = parseInt((container.querySelector('.el') as HTMLInputElement).value, 10)

  tree.insert(elToAdd)

  let traverse: number[] = []
  tree.inOrderTraverse(tree.rootTree, (el) => {
    traverse.push(el.data)
  })
  console.log('inorder', traverse)
  traverse = []
  tree.preOrderTraverse(tree.rootTree, (data) => {
    traverse.push(data)
  })
  console.log('preorder', traverse)
  traverse = []
  tree.postOrderTraverse(tree.rootTree, (data) => {
    traverse.push(data)
  })
  console.log('postorder', traverse)
})
const findTreeElBtn: HTMLButtonElement = document.querySelector('#tree .find')
findTreeElBtn.addEventListener('click', () => {
  const container: HTMLElement = document.querySelector('#tree')
  const k: number = parseInt((container.querySelector('.min') as HTMLInputElement).value, 10)
  console.log('kth min el', tree.kthSmallest(tree.rootTree, k))
})
const balanceTreeBtn: HTMLButtonElement = document.querySelector('#tree .balance')
balanceTreeBtn.addEventListener('click', () => {
  tree.balance()

  let traverse: number[] = []
  tree.inOrderTraverse(tree.rootTree, (el) => {
    traverse.push(el.data)
  })
  console.log('inorder', traverse)
  traverse = []
  tree.preOrderTraverse(tree.rootTree, (data) => {
    traverse.push(data)
  })
  console.log('preorder', traverse)
  traverse = []
  tree.postOrderTraverse(tree.rootTree, (data) => {
    traverse.push(data)
  })
  console.log('postorder', traverse)
})

const hashTable = new HashTable(10, 'double hashing')
hashTable.set(1, 1)
hashTable.set(1, 2)
hashTable.set(1, 10)
hashTable.set(2, 3)
hashTable.set(3, 4)
console.log(hashTable.table, hashTable.collisions)