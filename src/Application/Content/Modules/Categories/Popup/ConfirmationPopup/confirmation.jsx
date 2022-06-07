import React from 'react';
import css from '../popup.module.css';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { deleteCategory, getCategories } from '../../../../../../Services/categories';

const Confirmation = (props) => {
    const {currentPopup, childPopup, category, changes} = props;
    const [currentPopupState, setCurrentPopupState] = currentPopup;
    const [childPopupState, setChildPopupState] = childPopup;
    const [categories, setCategories] = useState([])
    const [transferCategory, setTransferCategory] = useState(undefined)

    useEffect(()=>{
        if (categories.length === 0){
            getCategories().then(json => setCategories(json.categories.filter(cat => cat.id !== category.id)));
        }else{
            setTransferCategory(categories[0].id);
        }
    }, [categories])

    const sendDelete = () => {

        if (transferCategory === -1 || transferCategory === undefined){
            alert("Не выбрана категория переноса.")
        }else{
            deleteCategory(category.id, transferCategory).then(status => status === true ? (alert("Категория удалена"), changes(prev => prev+1), setChildPopupState(false)) : alert("При выполнении запроса произошла ошибка"))
        }
    }

    return (
        <div className={classNames({[css.enabled]: currentPopupState}, css.productPopup)}>
            <div className={css.content}>
                <div className={css.header}>
                    <h2 className={css.title}>
                        Удаление категории
                    </h2>
                    <span className={css.close} onClick={()=>setCurrentPopupState(false)}>&times;</span>
                </div>

                <div className={css.body}>
                    <div className={css.bodyWrapper}>
                        <div className={css.productBlock}>
                            <div className={css.editModule}>
                                <p className={css.moduleTitle}>В какую категорию необходимо перенести товары?</p>
                                <select className={css.categorySelect} onChange={(e)=> setTransferCategory(e.target.value)} defaultValue={transferCategory} value={transferCategory}>
                                    {categories !== undefined ? categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>): false}
                                </select>
                            </div>
                            <div className={css.editModule}>
                                {
                                    categories.length === 0 ? <p className={css.danger}>Нельзя удалить последнюю категорию</p>
                                    : <button className={classNames(css.button, css.danger)} onClick={sendDelete}>Подтвердить удаление</button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
