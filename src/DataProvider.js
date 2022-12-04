import { createContext } from 'react';
import createPersistedState from 'use-persisted-state';

const useDataState = createPersistedState('tableData', localStorage);
const useAlgorithmState = createPersistedState('algorithm', localStorage);

function createNode(rowVal, colVal){
    return {
        className:'unvisited',
        seen: 'false', 
        row: rowVal, 
        col: colVal, 
        //these we need to calculate before hand 
        distanceToFinishNode: null, 
        distanceToStartNode: null
    };
}

const initData = () => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const setDataDef = () => {};

export const DataContext = createContext({
  tableData: initData,
  setTableData: setDataDef,
  algorithmType: '',
  setAlgorithmType: () => {},
});

export function DataProvider({ children }){
  const { Provider } = DataContext;
  const [tableData, setTableData] = useDataState(initData);
  const [algorithmType, setAlgorithmType] = useAlgorithmState('');
  return (<Provider value={{ tableData, setTableData,  algorithmType, setAlgorithmType}}>{children}</Provider>
  );
}