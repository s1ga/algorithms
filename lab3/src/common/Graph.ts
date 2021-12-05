import {Colors, Rib, Vertex} from "../utils"

export class Graph {
  private readonly adjacentList: Map<Vertex, Vertex[]>
  private vertexColors: Map<Vertex, Colors>

  constructor() {
    this.adjacentList = new Map()
    this.vertexColors = new Map()
  }

  public addVertices(...vertices: Vertex[]): this {
    vertices.forEach((vertex: Vertex) => {
      this.adjacentList.set(vertex, [])
    })

    return this
  }

  public addEdge(u: Vertex, v: Vertex): this {
    this.adjacentList.get(u).push(v)
    this.adjacentList.get(v).push(u)

    return this
  }

  public get isEulerian(): boolean {
    let flag: boolean = true
    let oddVertex: number = 0

    this.vertices.forEach((vertex: Vertex) => {
      const vertexDegree = this.adjacentList.get(vertex).length
      if (!vertexDegree) {
        flag = false
        return
      } else if (vertexDegree % 2) {
        oddVertex += 1
      }
    })

    if (oddVertex > 2 || oddVertex === 1) {
      return false
    }

    return flag
  }

  public eulerianPath(): Vertex[] {
    if (!this.isEulerian) {
      return []
    }

    const ribs = this.ribs
    const stack = [ribs[0][0]]
    const path = []
    while (stack.length) {
      const vertex = stack[stack.length - 1]
      const vertexDegree = this.getVertexDegree(vertex, ribs)

      if (vertexDegree) {
        const rib = this.getRibByVertex(vertex, ribs)
        this.removeFromRibs(rib, ribs)
        stack.push(rib[0] !== vertex ? rib[0] : rib[1])
      } else {
        stack.pop()
        path.push(vertex)
      }
    }

    return path
  }

  public get isBipartite(): boolean {
    const queue = [Array.from(this.adjacentList)[0]]
    this.vertexColors.set(queue[0][0], Colors.RED)

    let flag: boolean = true
    while (queue.length) {
      const v1 = queue.shift()
      v1[1].forEach((v2: Vertex) => {
        if (!this.vertexColors.get(v2)) {
          this.vertexColors.set(v2, this.vertexColors.get(v1[0]) === Colors.RED ? Colors.BLUE : Colors.RED)
          queue.unshift([v2, this.adjacentList.get(v2)])
        } else if (this.vertexColors.get(v2) === this.vertexColors.get(v1[0])) {
          flag = false
          return
        }
      })
    }

    return flag
  }

  public bipartiteComponents(): {[key: string]: Vertex[]} {
    if (!this.isBipartite) {
      return {}
    }

    const L: Vertex[] = []
    const R: Vertex[] = []
    Array.from(this.vertexColors).forEach(([v, color]: [Vertex, Colors]) => {
      color === Colors.RED
        ? L.push(v)
        : R.push(v)
    })

    return { L, R }
  }

  private get vertices(): Vertex[] {
    return Array.from(this.adjacentList.keys())
  }

  private get ribs(): Rib[] {
    const adjacentList = new Map(this.adjacentList)

    return this.vertices.reduce((ribs: Rib[], vertex: Vertex) => {
      const adjacentVertices = this.adjacentList.get(vertex)
      adjacentVertices.forEach((v: Vertex) => {
        if (!this.isRibContains([vertex, v], ribs)) {
          ribs.push([vertex, v])
        }
      })

      return ribs
    }, [])
  }

  private isRibContains(rib: Rib, ribs: Rib[]): boolean {
    return !!ribs.find((r: Rib) =>
      JSON.stringify(r) === JSON.stringify(rib) || JSON.stringify(r) === JSON.stringify(rib.reverse())
    )
  }

  private getVertexDegree(vertex: Vertex, ribs: Rib[]): number {
    return ribs.reduce((degree: number, rib: Rib) => {
      if (rib.includes(vertex)) {
        degree += 1
      }

      return degree
    }, 0)
  }

  private getRibByVertex(vertex: Vertex, ribs: Rib[]): Rib {
    return ribs.find((rib: Rib) => rib.includes(vertex))
  }

  private removeFromRibs(rib: Rib, ribs: Rib[]): void {
    const indexes = []
    ribs.forEach((r: Rib, index: number) => {
      if (JSON.stringify(r) === JSON.stringify(rib) || JSON.stringify(r) === JSON.stringify(rib.reverse())) {
        indexes.push(index)
      }
    })
    indexes.forEach((index: number, i: number) => {
      if (i) {
        ribs.splice(index - 1, 1)
      } else {
        ribs.splice(index, 1)
      }
    })
  }
}
