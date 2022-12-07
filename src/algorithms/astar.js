import React, { useContext } from "react";
import { DataContext } from "../DataProvider";

/*
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

    // //CHECK IF A CORNER:
    // if(currentNode.row === 0 && currentNode.col === 0 ){
    //   neighbors.push(tableData.table[1][0])
    //   neighbors.push(tableData.table[1][1])
    //   neighbors.push(tableData.table[0][1])
    // }
    // else if(currentNode.row === 0 && currentNode.col === tableData.numCols-1){
    //   neighbors.push(tableData.table[0][tableData.numCols-2])
    //   neighbors.push(tableData.table[1][tableData.numCols-2])
    //   neighbors.push(tableData.table[1][tableData.numCols-1])
    // }
    // else if(currentNode.row === tableData.numRows-1 && currentNode.col === 0){
    //   neighbors.push(tableData.table[tableData.numRows-2][0])
    //   neighbors.push(tableData.table[tableData.numRows-2][1])
    //   neighbors.push(tableData.table[tableData.numRows-1][1])
    // }
    // else if(currentNode.row === tableData.numRows-1 && currentNode.col === tableData.numCols-1){
    //   neighbors.push(tableData.table[tableData.numRows-1][tableData.numCols-2])
    //   neighbors.push(tableData.table[tableData.numRows-2][tableData.numCols-2])
    //   neighbors.push(tableData.table[tableData.numRows-2][tableData.numCols-1])
    // }

    // //CHECK IF HORIZONTAL EDGE:
    // else if(currentNode.row === 0){
    //   for(let rowNumber = currentNode.row; rowNumber<currentNode.row+2; rowNumber++){
    //     for(let colNumber = currentNode.col-1; colNumber < currentNode.col+2; colNumber++){
    //       if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
    //         neighbors.push(tableData.table[rowNumber][colNumber]);
    //       }
    //     }
    //   }
    // }
    // else if(currentNode.row === tableData.numRows-1){
    //   for(let rowNumber = currentNode.row; rowNumber<currentNode.row-2; rowNumber--){
    //     for(let colNumber = currentNode.col-1; colNumber < currentNode.col+2; colNumber++){
    //       if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
    //         neighbors.push(tableData.table[rowNumber][colNumber]);
    //       }
    //     }
    //   }
    // }

    // //CHECK IF VERTICAL EDGE:
    // else if(currentNode.col === 0){
    //   for(let rowNumber = currentNode.row-1; rowNumber<currentNode.row+2; rowNumber++){
    //     for(let colNumber = currentNode.col; colNumber < currentNode.col+2; colNumber++){
    //       if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
    //         neighbors.push(tableData.table[rowNumber][colNumber]);
    //       }
    //     }
    //   }
    // }
    // else if(currentNode.col === tableData.numCols-1){
    //   for(let rowNumber = currentNode.row-1; rowNumber<currentNode.row+2; rowNumber++){
    //     for(let colNumber = currentNode.col-1; colNumber < currentNode.col+1; colNumber++){
    //       if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
    //         neighbors.push(tableData.table[rowNumber][colNumber]);
    //       }
    //     }
    //   }
    // }

    // //Must be a node surrounded by neighbor nodes
    // else{
    //   console.log("Entered Other");
    //   for(let rowNumber = currentNode.row-1; rowNumber<currentNode.row+2; rowNumber++){
    //     for(let colNumber = currentNode.col-1; colNumber < currentNode.col+2; colNumber++){
    //         if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
    //           neighbors.push(tableData.table[rowNumber][colNumber]);
    //         }
    //     }
    //   }
    // }

    return neighbors;
}

export function astar(tableData, setTableData, startNode, endNode) {
  console.log("In astar");

  //create arrays
  const open = [];
  const closed = [];

  //add the start node first
  open.push(startNode);

  //while we have not reached the end node...
  while (open.length() > 0) {

    //sort the availible nodes by fCost (least fCost to greatest fCost) note: fCost is the sum of the distance to the startNode and the distance to the endNode
    let sortedOpen = open.sort((a, b) => (a.fCost > b.fCost) ? 1 : (a.fCost < b.fCost) ? -1 : 0);

    //let the currentNode to be evaluated be the node with the lowest fCost
    let curr = sortedOpen[0];
    
    //remove the node from the open list
    open.shift();

    //add the currentNode to the already evaluated list
    closed.push(curr);

    //currentNode is the end node
    if(curr.hCost === 0){
      console.log("CurrentNode is End Node");
      return;
    }

    //get the surrounding neighbors of the currentNode
    let neighbors = getNeighbors(curr, tableData);

    //Implement for each loop here:

    neighbors.filter((neighbor) => !(neighbor.className === 'wall') && !closed.includes(neighbor)).forEach((neighbor) => {
      //do A* stuff
    })

  }
}

