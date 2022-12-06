import React, { useContext } from "react";
import { DataContext } from "../DataProvider";

/**
 * Algo from: https://www.youtube.com/watch?v=mZfyt03LDH4&list=PLFt_AvWsXl0cq5Umv3pMC9SPnKjfp9eGW&index=3 
 */

/**
  What is inside tableData: 
  tableData: initData,
  setTableData: setDataDef,
  algorithmType: 'A*',
  setAlgorithmType: () => {},
 */

/**
 * gCost = dis to start
 * hCost = dis to end
 * fCost = combined dis
 */

//might need to use a different dataStructures
const open = new Map();
const closed = new Set();

function getNeighbors(node, tableData) { 
    //is this the right data-structure? 
    let neighbors = new Array();

    for(let x = -1; x <= 1; x++) { 
        for(let y = -1; y <= 1; y++) { 
            if(x == 0 && y == 0) { 
                continue;
            }
            checkX = node.row + x;
            checkY = node.col + y;

            if(checkX >= 0 && checkX < tableData.numRows && checkY >= 0 && checkY < tableData.numCols) { 
                neighbors.push(tableData.table[checkX][checkY]);
            }
        }
    }

    return neighbors;
}

export function astar(tableData, setTableData, start, end) {
  console.log("In astar");

  //has value when start node has not even been decided ... weird bug to fix later
  //start has null values for distance, need to fix
  open.put(0, start);

  while (open.size > 0) {
    let curr = open.get(0);
    let deleted = 0;

    for (let i = 1; i < open.size; i += 1) {
        //beware a get to a non-existing key, might need to check for that
      if ((open.get(i) < curr) || (open.get(i).combinedDistance === curr.combinedDistance && open.get(i).ditanceToFinishNode < curr.distanceToFinishNode)) {
        curr = open.get(i);
        deleted = i;
      }
    }
    open.delete(deleted);
    closedSet.add(curr);

    if(curr === end) { 
        console.log("mission accomplished");
        return;
    }

    let neighbors = getNeighbors(curr, tableData);
  }
}

