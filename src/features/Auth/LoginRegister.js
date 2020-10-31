import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function LoginRegister() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        retype_password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        retype_password: '',
    });
    const {updateAuthState} = useContext(AuthContext);

    const [alert, setAlert] = useState(null)
    const { pathname } = useLocation();
    const isRegister = (pathname === '/register');
    const isLogin = (pathname === '/login');

    function handleInputChange(e) {
        setErrors({...errors, [e.target.name]: '' });

        setValues({ ...values, [e.target.name]: e.target.value });
    }

    function isFormValid() {
        let isValid = true;
        const newErrors = {...errors};

        if(!values.username) {
            // Set an error message
            newErrors.username = 'Please provide an email.';
            isValid = false;
        }

        if(!values.password) {
            // Set an error message
            newErrors.password = 'Please provide a password.';
            isValid = false;
        }

        if(isRegister && values.password !== values.retype_password) {
            // Set an error message
            newErrors.retype_password = 'The passwords did not match.';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    }

    console.log(errors);

    async function handleSubmit(e) {
        e.preventDefault();
        setAlert(null);

        if(!isFormValid()) {
            return;
        }

        const fetchConfig = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({username: values.username, password: values.password})
        };
        let url;
        if(!isRegister) {
            // Login
            url = 'http://movies-app-siit.herokuapp.com/auth/login';
            // firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            //     .catch(function(error) {
            //         console.warn(error);
            //     });
        } else {
            // Register
            url = 'http://movies-app-siit.herokuapp.com/auth/register';
        }
        const { accessToken } = await fetch(url, fetchConfig).then(res=>res.json());
        updateAuthState(values.username, accessToken);
        //logout: 

        if(isLogin){
            updateAuthState();

        }
    }

    return (
        <form onSubmit={ handleSubmit }>
            { alert?.message && (
                <div className={ `alert alert-${alert.type}` } role="alert">
                    { alert.message }
                </div>
            )}
            <h1>{ !isRegister ? 'Login' : 'Register' }</h1>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    className={ `form-control${errors.username && ' is-invalid'}` } 
                    id="username" 
                    name="username" 
                    value={ values.username }
                    onChange={ handleInputChange } />
                <div className="invalid-feedback">
                    { errors.username }
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    className={ `form-control${errors.password && ' is-invalid'}` }  
                    id="password" 
                    name="password" 
                    value={ values.password } 
                    onChange={ handleInputChange } />
                <div className="invalid-feedback">
                    { errors.password }
                </div>
            </div>
            { isRegister && (
                <div className="form-group">
                    <label htmlFor="retype_password">Retype Password</label>
                    <input 
                        type="password" 
                        className={ `form-control${errors.retype_password && ' is-invalid'}` }  
                        id="retype_password" 
                        name="retype_password" 
                        value={ values.retype_password } 
                        onChange={ handleInputChange } />
                    <div className="invalid-feedback">
                        { errors.retype_password }
                    </div>
                </div>
            )}
            
            <div className="form-group">
                <button className="btn btn-primary">{ !isRegister ? 'Login' : 'Register' }</button>
            </div>
        </form>
    )
}
