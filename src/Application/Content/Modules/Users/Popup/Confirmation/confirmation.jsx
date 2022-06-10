import React from 'react';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import css from '../popup.module.css';
import { deleteUser } from '../../../../../../Services/user';

const Confirmation = (props) => {
    const {currentPopup, childPopup, user, changes} = props;
    const [currentPopupState, setCurrentPopupState] = currentPopup;
    const [childPopupState, setChildPopupState] = childPopup;


    const handleDelete = () => {
        deleteUser(user.id).then(json => 
            json.response === 999 ? alert('Нельзя удалить последнего администратора.'):
            json.response === 200 ? (alert('Пользователь удален.'), setChildPopupState(false), changes(prev=> prev+1)):
            alert('При выполнении запроса произошла ошибка')
        )
    }

    return (
        <div className={classNames({[css.enabled]: currentPopupState}, css.popup)}>
            
            <div className={css.content}>

                <div className={css.header}>
                    <h2 className={css.title}>
                        Удаление пользователя
                    </h2>
                    <span className={css.close} onClick={()=>setCurrentPopupState(false)}>&times;</span>
                </div>

                <div className={css.body}>

                    <div className={css.bodyWrapper}>

                        <div className={css.productBlock}>

                            <h4>Подтвердите удаление пользователя {user.login}</h4>

                            <button className={classNames(css.button, css.danger)} onClick={handleDelete}>Удалить</button>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Confirmation;
