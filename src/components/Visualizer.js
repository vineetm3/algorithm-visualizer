import { useState } from 'react';
import './Visualizer.css';

/*
1) Fixed an issue where if drew over another, the walls would disappear 
2) Implemented button to put start, end, wall nodes 
3) Currently an issue with multiple start/end nodes possible ... will fix 
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
        console.log(nodeType)
        //console.log(event.currentTarget.id);
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
            else if(nodeType === "End") { 
                document.getElementById(id).style.backgroundColor = "blueviolet";
            }
            else if(nodeType === "Start") { 
                document.getElementById(id).style.backgroundColor = "lightcoral";
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
                    <option value="Start">Start</option>
                    <option value="End">End</option>
                    <option value="Walls">Walls</option>
                </select>
            </div>
        </div>
    );
}