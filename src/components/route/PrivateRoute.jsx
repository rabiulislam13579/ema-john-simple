import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const{user,loader}=useContext(AuthContext)
    const location=useLocation();
    console.log(location)
    if(loader){
        return <div><h3> loading...</h3></div>
    }
    if(user){
        return children
    }
    return <Navigate to="/Login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;