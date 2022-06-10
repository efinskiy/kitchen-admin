import React from 'react';
import css from './popup.module.css';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Confirmation from './Confirmation/confirmation';
import { addUser, editUser } from '../../../../../Services/user';

const Popup = (props) => {
    const {popup, action, changes, user} = props;
    const [popupState, setPopupState] = popup;
    const [confirmationPopup, setConfirmationPopup] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);
    const [isKitchen, setIsKitchen] = useState(false);
    const [loginState, setLoginState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    const handleSave = () => {
        editUser(user.id, isAdmin, isKitchen, passwordState === '' ? false : true, passwordState).then(json => 
            json.response === 200 ? (alert('Изменения внесены'), changes(prev=> prev+1)):
            alert('Во время выполнения запроса произошла ошибка')
        )
    }

    const handleAdd = () => {
        if (isAdmin || isKitchen){
            if (loginState.length<3){
                alert('Логин не может быть короче 3 символов.')
            }else{
                if (passwordState.length<8){
                    alert('Пароль не может быть короче 8 символов')
                }else{
                    addUser(loginState, passwordState, isAdmin, isKitchen).then(json => 
                        json.response === 200 ? (alert('Пользователь добавлен'), changes(prev=> prev+1), setPopupState(false)):
                        alert('Во время выполнения запроса произошла ошибка')
                    )
                }
            }
        }else{
            alert('Пожалуйста, выберите роль пользователя.')
        }
    }

    useEffect(() => {
        if (action==='update'){
            setIsAdmin(user.is_admin)
            setIsKitchen(user.is_kitchen)
        }
    }, []);


    return (
        <div className={classNames({[css.enabled]: popupState}, css.popup)}>
        {  <Confirmation currentPopup={[confirmationPopup, setConfirmationPopup]} childPopup={[popupState, setPopupState]} user={user} changes={changes}/>}
            <div className={css.content}>

                <div className={css.header}>
                    <h2 className={css.title}>
                        {action === "add" ? "Добавить пользователя" : "Редактирование пользователя"}
                        </h2>
                    <span className={css.close} onClick={()=>setPopupState(false)}>&times;</span>
                </div>

                <div className={css.body}>
                    <div className={css.bodyWrapper}>

                        <div className={css.productBlock}>
                            <h3 className={css.blockTitle}>Роль</h3>
                            
                            
                            <div className={css.checkboxWrapper}>
                                <p className={css.p}>Администратор: </p>
                                <input className={css.checkbox} checked={isAdmin} onChange={(e) => e.target.checked === true ? (setIsAdmin(true), setIsKitchen(false)): (setIsAdmin(false), setIsKitchen(true))} type="checkbox" />
                            </div>
                            <div className={css.checkboxWrapper}>
                                <p className={css.p}>Сотрудник: </p>
                                <input className={css.checkbox} checked={isKitchen} onChange={(e) => e.target.checked === true ? (setIsAdmin(false), setIsKitchen(true)): (setIsAdmin(true), setIsKitchen(false))} type="checkbox" />
                            </div>
                            
                        </div>
                        {
                            action==='add' ?
                                <div className={css.productBlock}>
                                    <h3 className={css.blockTitle}>Логин</h3>
                                    <input className={css.moduleText} value={loginState} onChange={(e)=> setLoginState(e.target.value)} type="text" placeholder='Логин пользователя' />
                                </div>
                                : null
                        }

                        <div className={css.productBlock}>
                            <h3 className={css.blockTitle}>Пароль</h3>
                            {
                                action==='add'?
                                    <input className={css.moduleText} value={passwordState} onChange={(e)=> setPasswordState(e.target.value)} type="password" placeholder='Пароль' />
                                    :<input className={css.moduleText} value={passwordState} onChange={(e)=> setPasswordState(e.target.value)} type="password" placeholder='Новый пароль' />
                            }
                        </div> 
                        
                        {
                            action==='add'?
                                <button className={css.button} onClick={()=> handleAdd()}>Добавить</button>
                                : [<button className={css.button} onClick={()=> handleSave()}>Сохранить изменения</button>, 
                                   <button className={classNames(css.button, css.danger)} onClick={()=> setConfirmationPopup(true)}>Удалить пользователя</button>]
                        }
                        

 

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Popup;
