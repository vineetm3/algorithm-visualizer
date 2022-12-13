import { useState } from "react";
import React, { useContext } from "react";
import { DataContext } from "../DataProvider";
import "./Visualizer.css";
import { astar } from "../algorithms/astar";
import { bfs } from "../algorithms/bfs";
/*
1) Have a main visualize method where we pass in the algo name
2) implement each algo taking in grid, start, end 
3) algo runs
4) call our animation method that lights up shortest path 
*/

let setStartNode = false;
let setEndNode = false;
let start;
let end;
let begin;
let stop;

function updateObjects(table, numRows, numCols) {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      table[row][col].gCost = Math.round(Math.sqrt(
        (row - start.row) ** 2 + (col - start.col) ** 2
      ));
      table[row][col].fCost = Math.round(Math.sqrt(
        (row - end.row) ** 2 + (col - end.col) ** 2
      ));
      table[row][col].fCost = table[row][col].gCost + table[row][col].hCost;
      console.log(table[row][col]);
    }
  }

  //pass in a setTableData function here
}

export const Visualizer = () => {
  const { tableData, setTableData, algoType, path} = useContext(DataContext);

  let numRows = tableData.numRows;
  let numCols = tableData.numCols;

  const [nodeType, setNode] = useState("Walls");
  const [date, setDate] = useState(0);

  const handleClick = (event) => {
    let id = event.currentTarget.id;
    if (event.button === 0) {
      if (document.getElementById(id).style.backgroundColor === "navy") {
        document.getElementById(id).style.backgroundColor = "white";
        tableData.table[id.substring(0, id.indexOf('-'))][
          parseInt(id.substring(id.indexOf('-') + 1))
        ].className = "unvisited";
      } else if (nodeType === "Walls") {
        document.getElementById(id).style.backgroundColor = "dodgerblue";
        //there is a potential issue with getting the 2nd subscript since it can be a value
        //greater than 1 char ... confirm with michael before making changes
        tableData.table[id.substring(0, id.indexOf('-'))][
          parseInt(id.substring(id.indexOf('-') + 1))
        ].className = "wall";
      } else if (nodeType === "End" && isClear()) {
        document.getElementById(id).style.backgroundColor = "blueviolet";
        tableData.table[id.substring(0, id.indexOf('-'))][
          parseInt(id.substring(id.indexOf('-') + 1))
        ].className = "end";
        end =
          tableData.table[parseInt(id.charAt(0))][
            parseInt(id.substring(id.indexOf('-') + 1))
          ];
        setEndNode = true;
      } else if (nodeType === "Start" && isClear()) {
        document.getElementById(id).style.backgroundColor = "lightcoral";
        console.log(id);
        tableData.table[id.substring(0, id.indexOf('-'))][
          parseInt(id.substring(id.indexOf('-') + 1))
        ].className = "start";
        start =
          tableData.table[id.substring(0, id.indexOf('-'))][
            parseInt(id.substring(id.indexOf('-') + 1))
          ];
        setStartNode = true;
      }
    }

    if (setStartNode && setEndNode) {
      updateObjects(tableData.table, tableData.numRows, tableData.numCols);
    }
  };

  const handleClearGrid = () => {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        document.getElementById(i + "-" + j).style.backgroundColor = "white";
        tableData.table[i][j].className = "unvisited";
      }
    }
    path.path = [];
    setDate(0);
    clearHeuristics(tableData);
    window.location.reload();
  };

  const handleClearWalls = () => {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (
          document.getElementById(i + "-" + j).style.backgroundColor ===
          "dodgerblue"
        ) {
          tableData.table[i][j].className = "unvisited";
          document.getElementById(i + "-" + j).style.backgroundColor = "white";
        }
      }
    }
  };

  const isClear = () => {
    let searchingFor;
    if (nodeType === "Start") {
      searchingFor = "lightcoral";
    } else if (nodeType === "End") {
      searchingFor = "blueviolet";
    }
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (
          document.getElementById(i + "-" + j).style.backgroundColor ===
          searchingFor
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const glowUp = (path) => {
    for (let i = 0; i < path.length; i++) {
      if (
        tableData.table[path[i].row][path[i].col].className === "start" ||
        tableData.table[path[i].row][path[i].col].className === "end"
      ) {
        continue;
      }
      if(algoType.algo === "A*") {
        document.getElementById(
            path[i].row + "-" + path[i].col
          ).style.backgroundColor = "yellow";
      }
      if(algoType.algo === "BFS") {
        document.getElementById(
            path[i].row + "-" + path[i].col
          ).style.backgroundColor = "yellow";
      }
    }
  };

  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.parent;
    }
    return nodesInShortestPathOrder.reverse();
  }

  function displayHeuristics(tableData, start, end){
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
          if((i === start.row && j === start.col) || (i === end.row && j === end.col)){
            if(i === start.row && j === start.col){ 
              document.getElementById(i + "-" + j).innerHTML = "Start"
            }
            else { 
              if(i === end.row && j === end.col){ 
                document.getElementById(i + "-" + j).innerHTML = "End"
              }
            }
            continue;
          }
          else if(tableData.table[i][j].className === "Visited"){
            document.getElementById(i + "-" + j).innerHTML = "F Cost: " + tableData.table[i][j].fCost + "<br>H Cost: " + tableData.table[i][j].hCost + "<br>G Cost: " + tableData.table[i][j].gCost
          }
      }
    }
  }

  function clearHeuristics(tableData){
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
          if((i === start.row && j === start.col) || (i === end.row && j === end.col)){
            continue;
          }
          else{
            document.getElementById(i + "-" + j).innerHTML = "";
          }
      }
    }
  }

  return (
    <div className="main-content">
      <table cellSpacing={"0"}>
        <tbody>
          {tableData.table.map((row, rowNumber) => {
            return (
              <tr id={"" + rowNumber} key={"" + rowNumber}>
                {row.map((_, columnNumber) => (
                  <td
                    id={"" + rowNumber + "-" + columnNumber}
                    key={"" + rowNumber + "-" + columnNumber}
                    onClick={handleClick}
                    onDragEnter={handleClick}
                  ></td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button-bar">
        <button className="clear-grid-btn" onClick={handleClearGrid}>
          Clear Grid
        </button>
        <button className="clear-walls-btn" onClick={handleClearWalls}>
          Clear Walls
        </button>
        <button
          className="visualize-btn"
          onClick={() => {
            if (algoType.algo === "A*") {
              path.path = [];
              begin = 0;
              stop = 0;
              begin = Date.now();
              path.path = astar(tableData, setTableData, start, end);
              stop = Date.now();
              setDate(stop - begin);
              glowUp(path.path);
              displayHeuristics(tableData, start, end);
            } 
            else if (algoType.algo === "DFS") {
              console.log(algoType.algo);
            } 
            else if (algoType.algo === "BFS") {
              path.path = [];
              begin = 0; 
              stop = 0;
              begin = Date.now();
              bfs(tableData, start, end);
              stop = Date.now();
              setDate(stop - begin);
              path.path = getNodesInShortestPathOrder(end);
              glowUp(path.path);
              
            } 
            else if (algoType.algo === "Dijkstra") {
              console.log(algoType.algo);
            }
          }}
        >
          Visualize
        </button>
        <select
          name="Items to Place"
          onClick={(event) => setNode(event.target.value)}
        >
          <option value="Walls">Walls</option>
          <option value="Start">Start</option>
          <option value="End">End</option>
        </select>
      </div>
      <div>
        <h3>Time to Run {algoType.algo} (seconds): {date / 1000000}</h3>
        <h3>Nodes in shortest path: {path.path.length}</h3>
      </div>
    </div>
  );
};
