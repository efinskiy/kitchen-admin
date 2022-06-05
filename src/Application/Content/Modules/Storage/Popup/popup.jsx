import React from 'react';
import css from './popup.module.css'
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { sendImage } from '../../../../../Services/products';
import { updateBalance } from '../../../../../Services/products';
import { updateProduct } from '../../../../../Services/products';


const Popup = (props) => {
    const {popup, product, categoryList, changes} = props;
    const [popupState, setPopupState] = popup;
    const [changesDetector, setChangesDetector] = changes;

    const [nameState, setNameState] = useState(product.name)
    const [weightState, setWeightState] = useState(product.weight)
    const [imgState, setImgState] = useState(product.img)
    const [imgInputState, setImgInputState] = useState(undefined)
    const [priceState, setPriceState] = useState(product.price)
    const [balanceState, setBalanceState] = useState(product.balance)
    const [categoryState, setCategoryState] = useState(product.category_id)
    const imgContainer = useRef(null);



    useEffect(() => {
        if (imgInputState!==undefined){
            sendImage(imgContainer.current.files[0]).then((json)=> setImgState(json.img));
        }
    }, [imgInputState]);

    return (
        <div className={classNames({[css.enabled]: popupState}, css.productPopup)}>
            <div className={css.content}>
                <div className={css.header}>
                    <h2 className={css.title}>{product.name}</h2>
                    <span className={css.close} onClick={()=>setPopupState(false)}>&times;</span>
                </div>
                <div className={css.body}>
                    <div className={css.bodyWrapper}>
                        <div className={css.productBlock}>
                            <h3 className={css.blockTitle}>Основная информация</h3>
                            <div className={css.balanceWrapper}>
                                <p className={css.p}>Остаток:</p>
                                <div className={css.inputWrapper}>
                                    <input className={css.balanceInput} type="number" value={balanceState} onChange={(e)=> setBalanceState(e.target.value)}/>
                                    <span>ед.</span>
                                </div>
                            </div>
                            <p className={css.p}>Зарезервировано: {product.reserved} ед.</p>
                            <p className={css.p}>Кол-во продаж: {product.sells}</p>
                            <button className={css.button} onClick={ ()=> updateBalance(product.id, balanceState).then((json)=> {alert('Изменения внесены'); setChangesDetector(changesDetector+1)})}>Изменить остаток</button>
                        </div>
                        <div className={css.productBlock}>
                            <h3 className={css.blockTitle}>Расширенное редактирование</h3>
                            
                            <div className={css.editModule}>
                                <p className={css.moduleTitle}>Название</p>
                                <input className={css.moduleInputText} type="text" value={nameState} onChange={(e) => setNameState(e.target.value)} />
                            </div>

                            <div className={css.editModule}>
                                <p className={css.moduleTitle}>Категория</p>
                                <select className={css.categorySelect} onChange={(e)=> setCategoryState(e.target.value)} value={String(categoryState)}>
                                    {categoryList.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
                                </select>
                            </div>
                            
                            <div className={css.editModule}>
                                <p className={css.moduleTitle}>Вес</p>
                                <input className={css.moduleInputText} type="text" value={weightState} onChange={(e) => setWeightState(e.target.value)} />
                            </div>
                            
                            <div className={css.editModule}>
                                <p className={css.moduleTitle}>Цена</p>
                                <input className={css.moduleInputText} type="text" value={priceState} onChange={(e) => setPriceState(e.target.value)} />
                            </div>
                            
                            <div className={css.editModule}>
                                <p className={css.moduleTitle}>Изображение</p>
                                <div className={css.imgWrapper}>
                                    <div className={css.currentImg} style={{backgroundImage: 'url(img)'.replace('img', "/api/v1/files/"+imgState)}}/>
                                </div>
                                <p className={css.moduleTitle}>Загрузка изображения</p>
                                <input className={css.moduleInputFile} ref={imgContainer} accept="image/png, image/jpg, image/jpeg" type="file" value={imgInputState} onChange={(e) => setImgInputState(e.target.value)} />
                            </div>

                            <div className={css.editModule}>
                                <button className={css.button} onClick={()=> {
                                    // console.log(product.id)
                                    updateProduct(product.id, nameState, weightState, imgState, priceState, categoryState).then((response)=> response === true ? alert('Изменения успешно внесены.') : alert('При выполенении запроса произошла ошибка.'))
                                    setChangesDetector(changesDetector+1);
                                }}>Сохранить изменения</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
