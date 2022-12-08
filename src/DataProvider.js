import { createContext } from 'react';
import createPersistedState from 'use-persisted-state';

//a persistedState enables everything to be the same even after refreshing or re-rendering 
// what is localStorage? 
const useDataState = createPersistedState('tableData', localStorage);
const useDataState2 = createPersistedState('algoType', localStorage);

//create each individual node that will be stored in our tabel 
function createNode(rowVal, colVal){
    return {
        className:'unvisited',
        seen: 'false', 
        row: rowVal, 
        col: colVal, 
        //these we need to calculate before hand 
        hCost: null, 
        gCost: null, 
        fCost: null,
        parent: null
    };
}

//creates our main table that we will eventually see on the screen 
//NOTE 
const initData = () => {
        let numRows =  8;
        let numCols = 10;

        const table = [];
        for (let row = 0; row < numRows; row++) {
          const currentRow = [];
          for (let col = 0; col < numCols; col++) {
            currentRow.push(createNode(row, col));
          }
          table.push(currentRow);
        }
        return { table, numRows, numCols};
}

// some random function that i got no clue what it does 
export const setDataDef = () => {

};

const algo = () => {
  let algo = "A*";

  return {algo};
}
//creates a context (global for all react components) which has the 
//table, setData, algorithimType, setAlgorithim
export const DataContext = createContext({
  tableData: initData,
  setTableData: setDataDef,
  algoType: algo,
});

//main function that makes us a provider which has the table data, algoType and functions to change them if needed
//this helps keep stuff updated even on re-loads i believe + can be accessed by any components 
export function DataProvider({ children }){
  const { Provider } = DataContext;
  const [tableData, setTableData] = useDataState(initData);
  const [algoType] = useDataState2(algo);
  return (<Provider value={{ tableData, setTableData, algoType}}>{children}</Provider>
  );
}