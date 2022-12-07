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

//might need to use a different dataStructures
const open = new Map();
const closed = new Set();

export function getNeighbors(currentNode, tableData) { 

  //Check if corner:
  // -If top left corner: [0,0]
  //  - neighbors = [1,0], [1,1],  [0,1]
  // -If top right corner: [0, numCols-1]
  //  - neighbors = [0,numCols-2], [1,numCols-2],  [1, numCols-1]
  // -If bottom left corner: [numRows-1, 0]
  //  - neighbors = [numRows-2, 0], [numRows-2, 1], [numRows-1, 1]
  // -If bottom right corner: [numRows-1, numCols-1]
  //  - neighbors = [numRows-1, numCols-2], [numRows-2, numCols-2], [numRows-2, numCols-1]
  //Check if Vertical Edge:
  // - 


    //is this the right data-structure? 
    let neighbors = [];

    //CHECK IF A CORNER:
    if(currentNode.row === 0 && currentNode.col === 0 ){
      neighbors.push(tableData.table[1][0])
      neighbors.push(tableData.table[1][1])
      neighbors.push(tableData.table[0][1])
    }
    else if(currentNode.row === 0 && currentNode.col === tableData.numCols-1){
      neighbors.push(tableData.table[0][tableData.numCols-2])
      neighbors.push(tableData.table[1][tableData.numCols-2])
      neighbors.push(tableData.table[1][tableData.numCols-1])
    }
    else if(currentNode.row === tableData.numRows-1 && currentNode.col === 0){
      neighbors.push(tableData.table[tableData.numRows-2][0])
      neighbors.push(tableData.table[tableData.numRows-2][1])
      neighbors.push(tableData.table[tableData.numRows-1][1])
    }
    else if(currentNode.row === tableData.numRows-1 && currentNode.col === tableData.numCols-1){
      neighbors.push(tableData.table[tableData.numRows-1][tableData.numCols-2])
      neighbors.push(tableData.table[tableData.numRows-2][tableData.numCols-2])
      neighbors.push(tableData.table[tableData.numRows-2][tableData.numCols-1])
    }

    //CHECK IF HORIZONTAL EDGE:
    else if(currentNode.row === 0){
      for(let rowNumber = currentNode.row; rowNumber<currentNode.row+2; rowNumber++){
        for(let colNumber = currentNode.col-1; colNumber < currentNode.col+2; colNumber++){
          if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
            neighbors.push(tableData.table[rowNumber][colNumber]);
          }
        }
      }
    }
    else if(currentNode.row === tableData.numRows-1){
      for(let rowNumber = currentNode.row; rowNumber<currentNode.row-2; rowNumber--){
        for(let colNumber = currentNode.col-1; colNumber < currentNode.col+2; colNumber++){
          if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
            neighbors.push(tableData.table[rowNumber][colNumber]);
          }
        }
      }
    }

    //CHECK IF VERTICAL EDGE:
    else if(currentNode.col === 0){
      for(let rowNumber = currentNode.row-1; rowNumber<currentNode.row+2; rowNumber++){
        for(let colNumber = currentNode.col; colNumber < currentNode.col+2; colNumber++){
          if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
            neighbors.push(tableData.table[rowNumber][colNumber]);
          }
        }
      }
    }
    else if(currentNode.col === tableData.numCols-1){
      for(let rowNumber = currentNode.row-1; rowNumber<currentNode.row+2; rowNumber++){
        for(let colNumber = currentNode.col-1; colNumber < currentNode.col+1; colNumber++){
          if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
            neighbors.push(tableData.table[rowNumber][colNumber]);
          }
        }
      }
    }

    //Must be a node surrounded by neighbor nodes
    else{
      console.log("Entered Other");
      for(let rowNumber = currentNode.row-1; rowNumber<currentNode.row+2; rowNumber++){
        for(let colNumber = currentNode.col-1; colNumber < currentNode.col+2; colNumber++){
            if(!(rowNumber === currentNode.row && colNumber === currentNode.col) && tableData.table[rowNumber][colNumber].className !== 'start' && tableData.table[rowNumber][colNumber].className !== 'wall'){
              neighbors.push(tableData.table[rowNumber][colNumber]);
            }
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
      if ((open.get(i) < curr) || (open.get(i).fCost === curr.fCost && open.get(i).hCost < curr.hCost)) {
        curr = open.get(i);
        deleted = i;
      }
    }
    open.delete(deleted);
    closed.add(curr);

    if(curr === end) { 
        console.log("mission accomplished");
        return;
    }

    let neighbors = getNeighbors(curr, tableData);
  }
}

