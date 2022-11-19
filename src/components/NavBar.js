import { AppBar, Toolbar, Select, MenuItem} from '@mui/material';
import React from 'react';

export const NavBar = () => {
    //HANDLE CLICK NOT WORKING YET. THIS DETERMINES WHICH ALGORITHM WE RUN.
    let algorithm = 'A*'
    const handleClick = (value) => {
        algorithm = value;
    }
    return (
        <AppBar postion='static'>
            <Toolbar className='navbar' sx={{ justifyContent: "space-between" }}>
                <div>Pathfinding Visualization</div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={algorithm}
                >
                    <MenuItem value={'A*'} onClick={handleClick}>A*</MenuItem>
                    <MenuItem value={'BFS'} onClick={handleClick}>Breadth First Search</MenuItem>
                    <MenuItem value={'DFS'} onClick={handleClick}>Depth First Search</MenuItem>
                </Select>
            </Toolbar>
        </AppBar>
    );
}