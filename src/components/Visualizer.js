import { useState } from 'react';
import './Visualizer.css';

/*
1) Fixed an issue where if drew over another, the walls would disappear 
2) Implemented button to put start, end, wall nodes 
3) Next step is to start implementing an algorithim itself
-> probably we can test it out on bfs 
*/

function getData(){
    let numRows =  10;
    let numCols = 20;
    let table = [];
    let row = Array(numCols);
    for(let i = 0; i<numRows; i++){
        for(let j = 0; j<numCols; j++){
            row[j] = {
                className:'unvisited',
            }
        }
        table.push(row);
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