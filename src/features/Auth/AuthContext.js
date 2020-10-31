import React from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

const initialValue = {
    isAuthenticated: false,
    user: null,
    token: null
};

const AuthContext = React.createContext(initialValue);

function AuthContextProvider({ children }) {
    const [value, setValue] = useLocalStorageState('auth', initialValue);

    function updateAuthState(username, token) { 
        if(token) {
            setValue({
                isAuthenticated: true,
                user: username,
                token
            });
        } else {
            setValue(initialValue);
        }
    }

    return (
        <AuthContext.Provider value={ {...value, updateAuthState} }>
            { children }
        </AuthContext.Provider>
    )
}

//named export
export { AuthContext, AuthContextProvider };
