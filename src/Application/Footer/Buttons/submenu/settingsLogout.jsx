import React from 'react';
import css from '../Buttons.module.css'
import classNames from 'classnames';
import { logout } from '../../../../Services/auth';

const SettingsLogout = (props) => {
    const {userstate} = props;
    const [user, setUser] = userstate;
    return (
            <button className={classNames(css.button)} onClick={() => {
                logout().then(() => window.location.reload())
            }}>
            <img src="icons/light/sign-out.svg" height='30px' width='30px' alt="" />
            </button>
    );
}

export default SettingsLogout;
