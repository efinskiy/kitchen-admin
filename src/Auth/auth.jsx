import React from 'react';
import { getCurrentUser, postAuth } from '../Services/auth'
import { useState, useEffect } from 'react';

const Auth = (props) => {
    const {auth} = props;
    const [authState, setAuthState] = auth;
    const [authError, setAuthError] = useState()
    const [loginState, setLoginState] = useState('')
    const [passwordState, setPasswordState] = useState('')



    useEffect(() => {
        getCurrentUser().then((json) => {
            setAuthState(json)
        })
    }, []);

    const sendAuth = (login, password) => {
        postAuth(login, password).then(json => {
            switch (json.response) {
                case 100:
                    setAuthError({
                        'error': 'Неправильный логин/пароль'
                    })
                    break;
                case 101:
                    getCurrentUser().then((json) => {
                        setAuthState(json)
                    })
                case 102:
                    getCurrentUser().then((json) => {
                        setAuthState(json)
                    })
            }
        })      
    };

    return (
        <div>
            {
                authState.is_anonymous === true 
                                            ? <p>Вы не авторизованы</p>
                                            : <p>Вы авторизованы как {authState.user}</p>
            }
            <form>
                {
                    authError !== undefined ? <h3>{authError.error}</h3> : false
                }           
                <input type="text" value={loginState} onChange={(event) => {setLoginState(event.target.value)}} placeholder='Login' />
                <input type="password" value={passwordState} onChange={(event) => {setPasswordState(event.target.value)}} placeholder='Password' />
                <input type="button" onClick={() => sendAuth(loginState, passwordState)} value="Войти" />
            </form>
        </div>
    );
}

export default Auth;
