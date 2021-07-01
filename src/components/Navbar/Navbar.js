import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';  
import Toolbar from '@material-ui/core/Toolbar';
import Home from '@material-ui/icons/Home';

function Navbar() {
    return (
        <>
            <AppBar className="mrg" position="static">
                <Toolbar style={{ height: '80px'}}>
                    <Link to="/" >
                        <Home style={{ fontSize: "40px"}}/>
                    </Link>

                    <Link to="/" style={{ textDecoration: 'none', paddingLeft: '20px', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                        Movies
                    </Link>
                </Toolbar>

            </AppBar>
            
        </>
    )
}

export default Navbar
