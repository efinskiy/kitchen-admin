import React from 'react';
import css from './category.module.css'


const Category = (props) => {
    const {popup, popupCategory, category, action} = props;


    return (
        <div className={css.category}>
            <div className={css.categoryWrapper}>
                <div className={css.categoryLeft}>
                  <p className={css.title}>{category.title} | №{category.id}</p>
                  <div className={css.categorySub}>
                    <span>Скрытая: {category.visible ? <span className={css.yes}>Нет</span> : <span className={css.no}>Да</span>}</span>
                    <span>Приоритет: <span className={css.priorityValue}>{category.priority}</span></span>
                  </div>
                </div>
                <div className={css.categoryRight}>
                <button className={css.editButton} onClick={() => {action("update"); popupCategory(category); popup(true)}}><img src="/icons/light/pen.svg"/></button>
                </div>
            </div>            
        </div>
    );
}

export default Category;
