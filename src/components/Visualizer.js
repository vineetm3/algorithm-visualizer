import './Visualizer.css';

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

    const handleClick = event => {
        console.log(event.currentTarget.id);
        let id = event.currentTarget.id;
        if(event.button === 0){
            if(document.getElementById(id).style.backgroundColor === "navy"){
                document.getElementById(id).style.backgroundColor = "white";
                table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'unvisited';
            }
            else{
                document.getElementById(id).style.backgroundColor = "navy";
                table[parseInt(id.charAt(0))][parseInt(id.charAt(id.length-1))].className = 'wall';
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
                if(document.getElementById(i+'-'+j).style.backgroundColor === "navy"){
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
            </div>
        </div>
    );
}