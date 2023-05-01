import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const SignUp = () => {
    const [error,setError]=useState('')
    const {createUser}=useContext(AuthContext);


    const handleSignUp=event=>{
        event.preventDefault();

        const email=event.target.email.value;
        const password=event.target.password.value;
        const confirm=event.target.confirm.value;
        console.log(email , password , confirm)
        setError('');

        if(password !==confirm){
            setError('password did not match');
            return
        }
        else if(password.length<6){
            setError('password must be minimum 6 character')
            return
        }
        createUser(email,password)
        .then((result)=>{
            const loggedUser=result.user;
            console.log(loggedUser)
        })
        .catch((error)=>{
            setError(error.message)
        })

    }




    return (

        <div className='form-container'>
            <h4 className='form-title'>Sign Up</h4>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"  required />
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="confirm"  required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='route-change'><small>Already have an account?<Link to="/Login">  Login </Link></small></p>
            <p className='error'>{error}</p>
        </div>

    );
};

export default SignUp;