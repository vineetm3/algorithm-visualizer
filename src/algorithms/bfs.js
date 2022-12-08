export function bfs(grid, startNode, finishNode) {
  console.log("in bfs");

  const visitedNodesInOrder = [];
  let nextNodesStack = [startNode];

  console.log(nextNodesStack);
  while (nextNodesStack.length) {
    const currentNode = nextNodesStack.shift();
    if (currentNode === finishNode) {
        console.log(visitedNodesInOrder);
        return visitedNodesInOrder;
    }

    //console.log(currentNode);
    console.log(!currentNode.className === "wall" &&
    (currentNode.className === "start" || !currentNode.seen));

    if (
      !(currentNode.className === "wall") &&
      (currentNode.className === "start" || !(currentNode.seen))
    ) {

      currentNode.seen = true;
      visitedNodesInOrder.push(currentNode);

      if(currentNode.className !== "start" && currentNode.className !== "end") { 
        document.getElementById(currentNode.row + "-" + currentNode.col).style.backgroundColor = "orange";
      }

      const { col, row } = currentNode;
      let nextNode;
      if (row > 0) {
        nextNode = grid.table[row - 1][col];
        if (!(nextNode.seen)) {
          nextNode.parent = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (row < grid.numRows - 1) {
        nextNode = grid.table[row + 1][col];
        if (!(nextNode.seen)) {
          nextNode.parent = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (col > 0) {
        nextNode = grid.table[row][col - 1];
        if (!(nextNode.seen)) {
          nextNode.parent = currentNode;
          nextNodesStack.push(nextNode);
        }
      }

      if (col < grid.table[0].length - 1) {
        nextNode = grid.table[row][col + 1];
        if (!(nextNode.seen)) {
          nextNode.parent = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
    }
  }
  //return visitedNodesInOrder;
}
