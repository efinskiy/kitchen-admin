import React from 'react';
import css from './categories.module.css';
import Popup from './Popup/popup';
import { getCategories } from '../../../../Services/categories';
import { useEffect, useState } from 'react';
import Category from './Category/category';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [changesDetector, setChangesDetector] = useState(0);
    const [popupActive, setPopupActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [actionState, setActionState] = useState("update");

    useEffect(() => {
        getCategories().then((json)=> {setCategories(json.categories)});
    }, [changesDetector]);

    return (
        <>
            {popupActive === true ? <Popup popup={[popupActive, setPopupActive]} category={selectedCategory} changes={setChangesDetector} action={actionState}/>: null}
            <div className={css.moduleTitle}>
                <h3>Категории</h3>
            </div>
            <div className={css.categoriesList}>
                {categories.length !== 0 ? categories.map((cat)=><Category key={cat.title} popup={setPopupActive} popupCategory={setSelectedCategory} action={setActionState} category={cat}/>) : <p>Список категорий пуст.</p>}
            </div>
            <button className={css.button} onClick={()=> {setActionState("add"); setPopupActive(true)}}>Добавить</button>
        </>
    );
}

export default Categories;
