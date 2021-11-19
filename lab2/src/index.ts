import {searching} from './algorithms/searching'
import {fillArray, getK, List} from "./utils";
import {BinarySearchTree} from "./algorithms/binaryTree";
import {HashTable} from "./algorithms/hash/hashTable";
import {mergeHybridSort} from "./algorithms/sorting/mergeHybridSort";
import {HASH_CONST, KNUTH_CONST} from "./algorithms/hash/methods";

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

// const tree: BinarySearchTree<number> = BinarySearchTree.construct(fillArray(6, 20))
const tree: BinarySearchTree<number> = new BinarySearchTree<number>()
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
  console.log('tree:', tree.rootTree)
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

const addElementToHashTableBtn: HTMLButtonElement = document.querySelector('#hash .add')
addElementToHashTableBtn.addEventListener('click', () => {
  const container: HTMLElement = document.querySelector('#hash')
  const M: number = parseInt((container.querySelector('.size') as HTMLInputElement).value, 10)
  const P: number = parseInt((container.querySelector('.keys') as HTMLInputElement).value, 10)
  const N: number = parseInt((container.querySelector('.counts') as HTMLInputElement).value, 10)
  const R: number = parseInt((container.querySelector('.values') as HTMLInputElement).value, 10)

  experiment(M, P, N, R)
})

function experiment(M, P, N, R): void {
  let chainingCollisionsForKnuth: number = 0
  let chainingCollisionsForMe: number = 0
  let doubleCollisionsForKnuth: number = 0
  let doubleCollisionsForMe: number = 0
  let linearCollisionsForKnuth: number = 0
  let linearCollisionsForMe: number = 0

  for (let i = 1; i <= P; i += 1) {
    const array: number[] = fillArray(N, R)

    // chaining
    let hashTable = new HashTable(M, 'chaining')
    array.forEach((val: number) => {
      hashTable.set(val, val, HASH_CONST)
    })
    chainingCollisionsForMe += hashTable.collisions
    hashTable = new HashTable(M, 'chaining')
    array.forEach((val: number) => {
      hashTable.set(val, val, KNUTH_CONST)
    })
    chainingCollisionsForKnuth += hashTable.collisions

    // double hashing
    hashTable = new HashTable(M, 'double hashing')
    array.forEach((val: number) => {
      hashTable.set(val, val, HASH_CONST)
    })
    doubleCollisionsForMe += hashTable.collisions
    hashTable = new HashTable(M, 'double hashing')
    array.forEach((val: number) => {
      hashTable.set(val, val, KNUTH_CONST)
    })
    doubleCollisionsForKnuth += hashTable.collisions

    // linear probing
    hashTable = new HashTable(M, 'linear probing')
    array.forEach((val: number) => {
      hashTable.set(val, val, HASH_CONST)
    })
    linearCollisionsForMe += hashTable.collisions
    hashTable = new HashTable(M, 'linear probing')
    array.forEach((val: number) => {
      hashTable.set(val, val, KNUTH_CONST)
    })
    linearCollisionsForKnuth += hashTable.collisions
  }

  console.log(`chaining with my constant: ${chainingCollisionsForMe}`)
  console.log(`chaining with Knuth constant: ${chainingCollisionsForKnuth}`)
  console.log(`double hashing with my constant: ${doubleCollisionsForMe}`)
  console.log(`double hashing with Knuth constant: ${doubleCollisionsForKnuth}`)
  console.log(`linear probing with my constant: ${linearCollisionsForMe}`)
  console.log(`linear probing with Knuth constant: ${linearCollisionsForKnuth}`)
}
