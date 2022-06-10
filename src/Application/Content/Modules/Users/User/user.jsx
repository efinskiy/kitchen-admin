import React from 'react';
import css from './user.module.css';
import { useState, useEffect } from 'react';

const User = (props) => {
    const {user, popupState, popupUser, action} = props;

    const openPopup = () => {
        action('update');
        popupUser(user);
        popupState(true);
    };


    return (
        <div className={css.container}>
            <div className={css.left}>
                <p className={css.username}>{user.login}</p>
                {user.is_admin ? <p className={css.red}>Администратор</p> : <p className={css.green}>Сотрудник</p>}
                <button className={css.button} onClick={openPopup}>Редактировать</button>
            </div>
        </div>
    );
}

export default User;
