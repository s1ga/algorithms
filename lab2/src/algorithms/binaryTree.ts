interface INode<T> {
  left: INode<T> | null
  right: INode<T> | null
  data: T
}

class TreeNode<T> implements INode<T> {
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;
  public data: T;

  public static getHeight<T>(root: TreeNode<T>): number {
    if (root === null) {
      return 0
    }

    return Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1
  }

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> {
  public static construct<T>(data: T[]): BinarySearchTree<T> {
    const tree = new BinarySearchTree<T>()
    data.forEach((val: T) => {
      tree.insert(val)
    })
    return tree
  }

  private root: TreeNode<T> | null
  private smallestCounter: number = 0

  constructor(tree: TreeNode<T> | null = null) {
    if (tree !== null) {
      this.root = tree
    }
    this.root = null
  }

  public insert(data: T): void {
    const newNode: TreeNode<T> = new TreeNode<T>(data)
    if (this.root === null) {
      this.root = newNode
    } else {
      this._insert(this.root, newNode)
    }
  }

  public inOrderTraverse(node: TreeNode<T>, callback: (data: TreeNode<T>) => void): void {
    if (node !== null) {
      this.inOrderTraverse(node.left, callback)
      callback(node)
      this.inOrderTraverse(node.right, callback)
    }
  }

  public preOrderTraverse(node: TreeNode<T>, callback: (data: T) => void): void {
    if (node !== null) {
      callback(node.data)
      this.preOrderTraverse(node.left, callback)
      this.preOrderTraverse(node.right, callback)
    }
  }

  public postOrderTraverse(node: TreeNode<T>, callback: (data: T) => void): void {
    if (node !== null) {
      this.postOrderTraverse(node.left, callback)
      this.postOrderTraverse(node.right, callback)
      callback(node.data)
    }
  }

  public kthSmallest(root: TreeNode<T>, k: number): T | null {
    const node: T | null = this.findSmallest(root, k)
    this.smallestCounter = 0
    return node
  }

  public balance(): void {
    if (!this.isBalanced(this.root)) {
      const nodes: TreeNode<T>[] = []

      this.inOrderTraverse(this.root, (node: TreeNode<T>) => {
        nodes.push(node)
      })

      this.root = this.buildBalancedTree(nodes, 1, nodes.length)
    }
  }

  public get rootTree(): TreeNode<T> {
    return this.root
  }

  public isBalanced(root: TreeNode<T>): boolean {
    if (root === null) {
      return true
    }

    const leftHeight: number = TreeNode.getHeight(root.left)
    const rightHeight: number = TreeNode.getHeight(root.right)

    return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)
  }

  private buildBalancedTree(nodes: TreeNode<T>[], start: number, end: number) {
    if (start > end) {
      return null
    }

    const mid: number = Math.floor((start + end) / 2)
    const sep: TreeNode<T> = new TreeNode<T>(this.kthSmallest(this.root, mid))
    sep.left = this.buildBalancedTree(nodes, start, mid - 1)
    sep.right = this.buildBalancedTree(nodes, mid + 1, end)

    return sep
  }

  private findSmallest(root: TreeNode<T>, k: number): T | null {
    if (root === null) {
      return null
    }

    const left = this.findSmallest(root.left, k)
    if (left !== null) {
      return left
    }

    this.smallestCounter += 1
    if (this.smallestCounter === k) {
      return root.data
    }

    return this.findSmallest(root.right, k)
  }

  private _insert(root: TreeNode<T>, newNode: TreeNode<T>): void {
    if (newNode.data < root.data) {
      if (root.left === null) {
        root.left = newNode
      } else {
        this._insert(root.left, newNode)
      }
    } else if (newNode.data > root.data) {
      if (root.right === null) {
        root.right = newNode
      } else {
        this._insert(root.right, newNode)
      }
    }
  }
}
