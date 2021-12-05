import {Graph} from "./common/Graph";

const graph = new Graph()
graph
  .addVertices('A', 'B', 'C', 'D', 'E', 'F')
  .addEdge('A', 'B')
  .addEdge('A', 'D')
  .addEdge('B', 'C')
  .addEdge('C', 'D')
  .addEdge('B', 'E')
  .addEdge('F', 'D')
  .addEdge('F', 'B')

console.log(graph.bipartiteComponents())
