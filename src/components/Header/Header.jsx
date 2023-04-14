import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <nav>
            <Link to = '/'>Home</Link>
            <Link to = '/login'>Login</Link>
            <Link to = '/register'>Register</Link>
            <Link to = '/registerRbs'>RegisterRBS</Link>
            <Link to = '/registerBS'>RegisterBS</Link>


        </nav>
    );
};

export default Header;