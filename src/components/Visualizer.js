import { useState } from 'react';
import './Visualizer.css';

/*
1) Fixed an issue where if drew over another, the walls would disappear 
2) Implemented button to put start, end, wall nodes 
3) Next step is to start implementing an algorithim itself
-> probably we can test it out on bfs 
*/

function searchNodes(){
    
}

function createNode(rowVal, colVal){
    return {
        className:'unvisited',
        seen: 'false', 
        row: rowVal, 
        col: colVal, 
        //this one we need to calculate before hand 
        distanceToFinishNode: null, 
    };
}

function getData(){
    let numRows =  5;
    let numCols = 5;
    const table = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        currentRow.push(createNode(row, col));
      }
      table.push(currentRow);
    }
    return { table, numRows, numCols };
}

export const Visualizer = () => {
    let data = getData();
    let table = data.table;
    let numRows = data.numRows;
    let numCols = data.numCols;

    const [nodeType, setNode] = useState("Walls");

    const handleClick = (event) => {
        let id = event.currentTarget.id;
        if(event.button === 0){
            if(document.getElementById(id).style.backgroundColor === "navy"){
                document.getElementById(id).style.backgroundColor = "white";
                table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'unvisited';
            }
            else if (nodeType === "Walls") {
                document.getElementById(id).style.backgroundColor = "dodgerblue";
                //there is a potential issue with getting the 2nd subscript since it can be a value 
                //greater than 1 char ... confirm with michael before making changes
                table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'wall';
            }
            else if(nodeType === "End" && isClear()) { 
                document.getElementById(id).style.backgroundColor = "blueviolet";
                table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'end';
            }
            else if(nodeType === "Start" && isClear()) { 
                document.getElementById(id).style.backgroundColor = "lightcoral";
                table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'start';
                console.log(table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))]);
            }
        }
      };

    const handleClearGrid = () => {
        for(let i = 0; i<numRows; i++){
            for(let j = 0; j<numCols; j++){
                document.getElementById(i+'-'+j).style.backgroundColor = "white";
                table[i][j].className = 'unvisited';
            }
        }
      }
      
    const handleClearWalls = () => {
        for(let i = 0; i<numRows; i++){
            for(let j = 0; j<numCols; j++){
                if(document.getElementById(i+'-'+j).style.backgroundColor === "dodgerblue"){
                    table[i][j].className = 'unvisited';
                    document.getElementById(i+'-'+j).style.backgroundColor = "white";
                }
            }
        }
      }
    
    /*
    Can completely get rid of this method if we use a set, but leaving for now ... will optimize later
    */
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
                    {table.map(((row, rowNumber) => {
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
                <select name="Items to Place" onClick={(event) => setNode(event.target.value)}>
                    <option value="Walls">Walls</option>
                    <option value="Start">Start</option>
                    <option value="End">End</option>
                </select>
            </div>
        </div>
    );
}