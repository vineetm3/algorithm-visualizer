import { useState } from 'react';
import React, { useContext } from 'react';
import { DataContext } from '../DataProvider';
import './Visualizer.css';
import { astar } from '../algorithms/astar';
import { getNeighbors } from '../algorithms/astar';

/*
1) Have a main visualize method where we pass in the algo name
2) implement each algo taking in grid, start, end 
3) algo runs
4) call our animation method that lights up shortest path 
*/
let setStartNode = false;
let setEndNode = false;
//let data = getData();
//let table = data.table;
let start;
let end;

function updateObjects(table, numRows, numCols) { 
    for(let row = 0; row < numRows; row++) { 
        for(let col = 0; col < numCols; col++) { 
            table[row][col].distanceToStartNode = Math.sqrt((row - start.row)**2 + (col - start.col)**2);
            table[row][col].distanceToFinishNode = Math.sqrt((row - end.row)**2 + (col - end.col)**2);
            table[row][col].combinedDistance = table[row][col].distanceToStartNode + table[row][col].distanceToFinishNode;
        }
    }
    console.log(table);

    //pass in a setTableData function here
}

export const Visualizer = () => {
    const {tableData, setTableData, algorithmType} = useContext(DataContext);
    let numRows = tableData.numRows;
    let numCols = tableData.numCols;

    const [nodeType, setNode] = useState("Walls");

    const handleClick = (event) => {
        let id = event.currentTarget.id;
        if(event.button === 0){
            if(document.getElementById(id).style.backgroundColor === "navy"){
                document.getElementById(id).style.backgroundColor = "white";
                tableData.table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'unvisited';
            }
            else if (nodeType === "Walls") {
                document.getElementById(id).style.backgroundColor = "dodgerblue";
                //there is a potential issue with getting the 2nd subscript since it can be a value 
                //greater than 1 char ... confirm with michael before making changes
                tableData.table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'wall';
            }
            else if(nodeType === "End" && isClear()) { 
                document.getElementById(id).style.backgroundColor = "blueviolet";
                tableData.table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'end';
                end = tableData.table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))];
                setEndNode = true;
            }
            else if(nodeType === "Start" && isClear()) { 
                document.getElementById(id).style.backgroundColor = "lightcoral";
                tableData.table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'start';
                start = tableData.table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))];
                setStartNode = true;
            }
        }

        if(setStartNode && setEndNode) { 
            updateObjects(tableData.table, tableData.numRows, tableData.numCols);
            console.log(getNeighbors(tableData.table[0][0], tableData));
        }
      };

    const handleClearGrid = () => {
        for(let i = 0; i<numRows; i++){
            for(let j = 0; j<numCols; j++){
                document.getElementById(i+'-'+j).style.backgroundColor = "white";
                tableData.table[i][j].className = 'unvisited';
            }
        }
      }
      
    const handleClearWalls = () => {
        for(let i = 0; i<numRows; i++){
            for(let j = 0; j<numCols; j++){
                if(document.getElementById(i+'-'+j).style.backgroundColor === "dodgerblue"){
                    tableData.table[i][j].className = 'unvisited';
                    document.getElementById(i+'-'+j).style.backgroundColor = "white";
                }
            }
        }
      }

    const isClear = () => { 
        let searchingFor; 
        if(nodeType === "Start") { 
            searchingFor = "lightcoral";
        }
        else if(nodeType === "End") { 
            searchingFor = "blueviolet";
        }
        for(let i = 0; i<numRows; i++){
            for(let j = 0; j<numCols; j++){
                if(document.getElementById(i+'-'+j).style.backgroundColor === searchingFor) { 
                    return false; 
                }
            }
        }
        return true;
    }

    return (
        <div className='main-content'>
            <table cellSpacing={'0'}>
                <tbody>
                    {tableData.table.map(((row, rowNumber) => {
                        return (
                            <tr id={'' + rowNumber} key={''+rowNumber}>
                                {row.map((_, columnNumber) => <td id={'' + rowNumber + '-' + columnNumber} key={'' + rowNumber + '-' + columnNumber} onClick={handleClick} onDragEnter={handleClick}></td>)}
                            </tr>
                        );
                    }))}
                </tbody>
            </table>
            <div className='button-bar'>
                <button className='clear-grid-btn' onClick={handleClearGrid}>Clear Grid</button>
                <button className='clear-walls-btn' onClick={handleClearWalls}>Clear Walls</button>
               <button className='visualize-btn' onClick={() => {astar(tableData, setTableData, start, end);}}>Visualize</button>
                <select name="Items to Place" onClick={(event) => setNode(event.target.value)}>
                    <option value="Walls">Walls</option>
                    <option value="Start">Start</option>
                    <option value="End">End</option>
                </select>
            </div>
        </div>
    );
}