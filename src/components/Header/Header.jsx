import React from 'react';
import('./Header.css');
import logo from'../../images/Logo.svg';

const Header = () => {
    return (
        < div className='header'>
          <img src={logo} alt="" /> 
          <nav>
            <a href="/order">order</a>
            <a href="/Order Review">Order Review</a>
            <a href="Manage Inventory">Manage Inventory</a>
            <a href="Login">Login</a>
          </nav>
            
        </div>
    );
};

export default Header;