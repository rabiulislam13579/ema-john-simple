import React, { useContext } from 'react';
import('./Header.css');
import logo from'../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Header = () => {
  const{user,logOut}=useContext(AuthContext)

  const handleSignOut=()=>{
    logOut()
    .then(()=>{

    })
    .catch(error=>{
      console.log(error)
    })

  }




    return (
        < div className='header'>
          <img src={logo} alt="" /> 
          <nav>
            <Link to="/">Shop</Link>        
            <Link to="/Orders">Orders</Link>
            <Link to="Inventory">Inventory</Link>
            <Link to="Login">Login</Link>
            <Link to="signup">SignUp</Link>
            {
              user && <span className='welcome'>welcome {user.email} <button onClick={handleSignOut}>Sign Out</button></span>
            }
            
          </nav>
            
        </div>
    );
};

export default Header;