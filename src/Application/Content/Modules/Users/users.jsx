import React from 'react';
import css from './users.module.css';
import { useEffect, useState } from 'react';
import { changePassword, getUsers } from '../../../../Services/user';
import Popup from './Popup/popup';
import User from './User/user';


const Users = (props) => {
    const {currentUser} = props;
    const [usersList, setUsersList] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [changesDetector, setChangesDetector] = useState(0);
    const [popupState, setPopupState] = useState(false);
    const [popupAction, setPopupAction] = useState('update');
    const [popupUser, setPopupUser] = useState({});

    useEffect(()=>{
        if (currentUser.is_admin === true){
            getUsers().then(json => setUsersList(json.users));
        }
    }, [changesDetector])

    const handlePasswordChange = () => {
        if (currentPassword.length === 0){
            alert('Пожалуйста, введите текущий пароль.')
        }else{
            if (newPassword !== confirmPassword){
                alert('Пароли не совпадают.')
            }else{
                if (newPassword.length === 0 || confirmPassword.length === 0) {
                    alert('Пожалуйста, введите новый пароль.')
                }else{
                    if (newPassword.length < 8){
                        alert('Пароль не может быть короче 8 символов')
                    }else{
                        changePassword(currentPassword, newPassword).then(json => {
                            json.response === 100 ? alert('Текущий пароль введен неверно.') :
                            json.response === 200 ? alert('Пароль изменен.')
                            : alert('При выполнении запроса произошла ошибка')
                        })
                    }
                }
            }
        }
    }

    return (
        <>
        {popupState===true ? <Popup popup={[popupState, setPopupState]} action={popupAction} changes={setChangesDetector} user={popupUser} /> : null}
        <div className={css.container}>
            <h3>Настройки пользователя</h3>

            <div className={css.block}>
                <h4>Изменить пароль</h4>
                <div className={css.passwordBlock}>
                    <label>Текущий пароль</label>
                    <input type="password" placeholder='Текущий пароль' value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} />
                    <label>Новый пароль</label>
                    <input type="password" placeholder='Новый пароль' value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
                    <label>Подтверждение пароля</label>
                    <input type="password" placeholder='Подтверждение пароля' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                    <button className={css.button} onClick={handlePasswordChange}>Изменить пароль</button>
                </div>
            </div>

            {
                currentUser.is_admin
                ? 
                <div className={css.block}>
                    <h4>Пользователи</h4>

                    {usersList.map(user=> <User user={user} popupState={setPopupState} popupUser={setPopupUser} action={setPopupAction}/>)}

                    <button className={css.button} onClick={()=> {setPopupAction('add'); setPopupState(true)}}>Добавить пользователя</button>
                </div>
                : null
            }
        </div>
        </>
    );
}

export default Users;
