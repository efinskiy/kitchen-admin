import React from 'react';
import css from './product.module.css';
import { useState } from 'react';

const Product = (props) => {
    const {product, popup, popupProduct, setPopupAction}= props
    return (
        <div className={css.productWrapper}>
            <div className={css.imgWrap}>
                <div className={css.imgContainer} style={{backgroundImage: 'url(img)'.replace('img', "/api/v1/files/"+product.img)}}/>
            </div>
            <div className={css.productInfo}>
                <div className={css.productText}>
                    <div className={css.productTitle}>
                        <span>
                            {product.name}
                        </span>
                    </div>
                    <div className={css.productStorage}>
                        <span>
                            Остаток: {product.balance} шт.
                        </span>
                    </div>
                    <div className={css.productReserved}>
                        <span>
                            Резерв: {product.reserved} шт.
                        </span>
                    </div>
                </div>
                <div className={css.buttonWrapper}>
                    <button className={css.editButton} onClick={() => {setPopupAction("update"); popupProduct(product); popup(true)}}><img src="/icons/light/pen.svg"/></button>
                </div>
            </div>
        </div>
    );
}

export default Product;
