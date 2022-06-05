import React from 'react';
import css from './storage.module.css'
import { useEffect, useState } from 'react';
import { getCategories } from '../../../../Services/categories';
import { getProductsByCategory } from '../../../../Services/products';
import Product from './Product/product';
import Popup from './Popup/popup';

const Storage = () => {
    const [categoryList, setCategoryList] = useState(undefined);
    const [productsList, setProductsList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [changesDetector, setChangesDetector] = useState(0);

    const [popupActive, setPopupActive] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    const categorySelectorChange = (e) => {
        setSelectedCategory(parseInt(e.target.value))
    };

    useEffect(() => {
        getCategories().then((json) => setCategoryList(json.categories))
    }, []);

    useEffect(()=>{
        if (selectedCategory !== -1){
            getProductsByCategory(selectedCategory).then((json)=> setProductsList(json.products))
        }else{
            setProductsList([])
        }
    }, [selectedCategory, changesDetector])

    return (
        <>
            {popupActive === true ? <Popup popup={[popupActive, setPopupActive]} product={selectedProduct} categoryList={categoryList} changes={[changesDetector, setChangesDetector]}/> : false}
            <div className={css.moduleTitle}>
                <h3>Товары</h3>
            </div>
            <div className={css.category}>
                <p>Категория товаров:</p>
                <select className={css.categorySelect} onChange={categorySelectorChange} value={selectedCategory}>
                    <option defaultValue={true} value={-1}>Не выбрано</option>
                    {categoryList !== undefined ? categoryList.map(category => <option key={category.id} value={category.id}>{category.title}</option>): false}
                </select>
            </div>
            <div className={css.productsList}>
                {
                    productsList.length !== 0 ? productsList.map(product => <Product key={product.id} product={product} popup={setPopupActive} popupProduct={setSelectedProduct}/>) : <p>Список пуст</p>
                }
            </div>
        </>
    );
}

export default Storage;
