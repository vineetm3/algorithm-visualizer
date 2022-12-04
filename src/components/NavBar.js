import { AppBar, Toolbar } from '@mui/material';
import React, { useContext } from 'react';
import { DataContext } from '../DataProvider';
import { astar } from '../algorithms/astar';

export const NavBar = () => {
    const { algorithm, setAlgorithmType } = useContext(DataContext); 

    return (
        <AppBar postion='static'>
            <Toolbar className='navbar' sx={{ justifyContent: "space-between" }}>
                <div>Pathfinding Visualization</div>
                <select onChange={(event) => {
                    setAlgorithmType(event.target.value);
                }}>
                    <option value={'None'} defaultValue disabled>Please Choose an Algorithm!</option>
                    <option value={'A*'}>A*</option>
                    <option value={'DFS'}>DFS</option>
                    <option value ={'DFS'}>BFS</option>
                </select>
            </Toolbar>
        </AppBar>
    );
}