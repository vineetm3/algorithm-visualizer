import { AppBar, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { DataContext } from '../DataProvider';

export const NavBar = () => {
    const {tableData, setTableData, algoType} = useContext(DataContext);

    return (
        <AppBar postion='static'>
            <Toolbar className='navbar' sx={{ justifyContent: "space-between" }}>
                <div>Pathfinding Visualization</div>
                <select onChange={(event) => {
                    algoType.algo = event.target.value;
                    // console.log(algoType.algo);
                    // console.log(event.target.value);
                }}>
                    <option value={'None'} defaultValue disabled>Please Choose an Algorithm!</option>
                    <option value={'A*'}>A*</option>
                    <option value={'DFS'}>DFS</option>
                    <option value ={'BFS'}>BFS</option>
                    <option value ={'Dijkstra'}>Dijkstra</option>
                </select>
            </Toolbar>
        </AppBar>
    );
}