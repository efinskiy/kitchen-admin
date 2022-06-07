import React from 'react';
import css from './popup.module.css'
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { update, add } from '../../../../../Services/categories';
import Confirmation from './ConfirmationPopup/confirmation';

const Popup = (props) => {
    const {popup, category, changes, action} = props;
    const [popupState, setPopupState] = popup;
    const [titleState, setTitleState] = useState(category.title);
    const [priorityState, setPriorityState] = useState(category.priority);
    const [visibleState, setVisibleState] = useState(category.visible);

    const [confirmationPopup, setConfirmationPopup] = useState(false)
    


    useEffect(()=> {
        if (action === "add"){
            setTitleState('');
            setPriorityState(0);
            setVisibleState(false);
        }
    }, [])
    return (
        <>
            <div className={classNames({[css.enabled]: popupState}, css.productPopup)}>
            {confirmationPopup === true ? <Confirmation currentPopup={[confirmationPopup, setConfirmationPopup]} childPopup={[popupState, setPopupState]} category={category} changes={changes}/>: null}
                <div className={css.content}>
                    <div className={css.header}>
                        <h2 className={css.title}>
                            {action === "add" ? "Новая категория" : "Редактирование категории"}
                        </h2>
                        <span className={css.close} onClick={()=>setPopupState(false)}>&times;</span>
                    </div>
                    <div className={css.body}>
                        <div className={css.bodyWrapper}>
                            <div className={css.productBlock}>
                            
                                <div className={css.editModule}>
                                    <p className={css.moduleTitle}>Название</p>
                                    <input className={css.moduleInputText} type="text" value={titleState} onChange={(e) => setTitleState(e.target.value)} />
                                </div>
                                
                                <div className={css.editModule}>
                                    <p className={css.moduleTitle}>Приоритет</p>
                                    <input className={css.moduleInputText} type="number" value={priorityState} onChange={(e) => setPriorityState(e.target.value)} />
                                    <p className={css.moduleDesc}>
                                        Чем ниже приоритет, тем ближе к началу будет находиться категория
                                    </p>
                                </div>
                                
                                <div className={css.editModule}>
                                    <p className={css.moduleTitle}>Видимость</p>
                                    <div className={css.visibleBlock}>
                                    {visibleState === true ? <span className={css.yes}>Видна всем</span> : <span className={css.no}>Скрыта</span> }
                                    <input className={css.moduleInputCheckbox} type="checkbox" checked={visibleState} onChange={(e) => setVisibleState(e.target.checked)} />
                                    </div>
                                </div>
                                
                                <div className={css.editModule}>
                                    <button className={css.button} onClick={()=> {
                                        action === "add" 
                                        ? add(titleState, priorityState, visibleState).then((code)=> code === true ? (alert('Категория добавлена.'), changes(prev=> prev+1)) : alert('При выполенении запроса произошла ошибка.')) 
                                        : update(category.id, titleState, priorityState, visibleState).then((code)=> code === true ? (alert('Изменения успешно внесены.'), changes(prev=> prev+1)) : alert('При выполенении запроса произошла ошибка.'))
                                    }}>
                                        {action === "add"? "Добавить" : "Внести изменения"}
                                    </button>
                                </div>

                                {
                                    action === "update"
                                    ? <div className={css.editModule}>
                                        <button className={classNames(css.button, css.danger)} onClick={()=> setConfirmationPopup(true)}>Удалить</button>
                                    </div>
                                    : null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Popup;
