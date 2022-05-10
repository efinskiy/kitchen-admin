import React from 'react';
import { getCurrentUser, postAuth } from '../Services/auth'
import { useState, useEffect } from 'react';
import css from './auth.module.css';

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
        <div className={css.authWrapper}>
                {
                    authError !== undefined ? <h3>{authError.error}</h3> : false
                }           
                <div class={css.login_container}>
                <section class={css.login}>
                    <header>
                    <h2>Столовая</h2>
                    <h4>Авторизация</h4>
                    </header>
                    <div class={css.login_form}>
                    <input type="text" value={loginState} onChange={(event) => {setLoginState(event.target.value)}} class={css.login_input} placeholder="Логин" required autofocus/>
                    <input type="password" value={passwordState} onChange={(event) => {setPasswordState(event.target.value)}} class={css.login_input} placeholder="Пароль" required/>
                    <div class={css.submit_container}>
                        <button onClick={() => sendAuth(loginState, passwordState)} class={css.login_button}>Войти</button>
                    </div>
                    </div>
                </section>
                </div>
        </div>
    );
}

export default Auth;
