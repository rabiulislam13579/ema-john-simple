import React, { useContext, useState } from 'react';
import'./Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const [error,setError]=useState('')
    const[show , setShow]=useState(false)
    const {signIn}=useContext(AuthContext)
    const navigate=useNavigate();
    const location=useLocation()
    console.log(location)

    const from=location.state?.from?.pathname || '/';
     console.log(from)

    const handleLogIn=event=>{
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
        console.log(email,password)
        
        setError('');
        signIn(email,password)
        .then((result)=>{
            const loggedUser=result.user;
            console.log(loggedUser)
            event.target.reset()
            navigate(from,{replace:true})
        })
        .catch((error)=>{
            setError(error.message)
        })

    }
    return (
        <div className='form-container'>
            <h4 className='form-title'>Log In</h4>
            <form onSubmit={handleLogIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"  required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type={show?"text":"password"} name="password" id="password"  required />
                    <p onClick={()=>setShow(!show)}><small>
                        {
                            show? <span>Hide Password</span>: <span>Show Password</span>

                        }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Log In" />
            </form>
            <p className='route-change'><small>New to Ema-john? <Link  to="/signup"> Sign Up First</Link></small></p>
            <p className='error'>{error}</p>
        </div>
    );
};

export default Login;