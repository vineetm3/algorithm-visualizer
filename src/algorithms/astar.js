/**
 * gCost = dis to start
 * hCost = dis to end
 * fCost = combined dis
 */

export function getNeighbors(currentNode, tableData) {
  //is this the right data-structure?
  let neighbors = [];

  for (let i = currentNode.row - 1; i <= currentNode.row + 1; i++) {
    for (let j = currentNode.col - 1; j <= currentNode.col + 1; j++) {
      // check if (i,j) is in array bounds
      if (i >= 0 && j >= 0 && i < tableData.numRows && j < tableData.numCols) {
        // the point isn't its own neighbour
        if (!(i === currentNode.row && j === currentNode.col))
          neighbors.push(tableData.table[i][j]);
      }
    }
  }
  return neighbors;
}

function getDistance(nodeA, nodeB) {
  let distX = Math.abs(nodeA.row - nodeB.row);
  let distY = Math.abs(nodeA.col - nodeB.col);

  if (distX > distY) {
    return 14 * distY + 10 * (distX - distY);
  }
  return 14 * distX + 10 * (distY - distX);
}

function heuristic(position0, position1) {
  let d1 = Math.abs(position1.x - position0.x);
  let d2 = Math.abs(position1.y - position0.y);

  return d1 + d2;
}

export function astar(tableData, setTableData, start, end) {
  let openSet = [];
  let closedSet = [];
  let path = [];

  openSet.push(start);

  while (openSet.length > 0) {
    //assumption lowest index is the first one to begin with
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].fCost < openSet[lowestIndex].fCost) {
        lowestIndex = i;
      }
    }
    let current = openSet[lowestIndex];

    if (current === end) {
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      console.log("DONE!");
      console.log(path.reverse());
      // return the traced path
      return path.reverse();
    }

    //remove current from openSet
    openSet.splice(lowestIndex, 1);
    //add current to closedSet
    closedSet.push(current);

    let neighbors = getNeighbors(current, tableData);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (neighbor.className !== "start" && neighbor.className !== "end") {
        document.getElementById(
          neighbor.row + "-" + neighbor.col
        ).style.backgroundColor = "green";
      }

      if (neighbor.className === "wall" || closedSet.includes(neighbor)) {
        continue;
      }

      if (neighbor.className !== "end") {
      }

      let costToMove = current.gCost + heuristic(current, neighbor);
      if (costToMove < neighbor.gCost || !openSet.includes(neighbor)) {
        neighbor.gCost = costToMove;
        neighbor.hCost = heuristic(neighbor, end);
        neighbor.parent = current;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  //no solution by default
  return [];
}
