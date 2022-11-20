import { AppBar, Toolbar } from '@mui/material';
import React from 'react';

export const NavBar = () => {
    return (
        <AppBar postion='static'>
            <Toolbar className='navbar' sx={{ justifyContent: "space-between" }}>
                <div>Pathfinding Visualization</div>
                <select>
                    <option value={'None'} defaultValue disabled>Please Choose an Algorithm!</option>
                    <option value={'A*'}>A*</option>
                    <option value={'DFS'}>DFS</option>
                    <option value ={'DFS'}>BFS</option>
                </select>
            </Toolbar>
        </AppBar>
    );
}