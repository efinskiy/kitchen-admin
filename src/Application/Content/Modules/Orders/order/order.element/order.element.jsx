import React from 'react';
import css from './order.element.module.css';

const Product = (props) => {
    const {item} = props;
    return (
        <div className={css.product}>
            <div className={css.imgWrap}>
                <div style={{backgroundImage: 'url(img)'.replace('img', "/api/v1/menu/img?p="+item.id)}} className={css.imgContainer}></div>
            </div>
            <div className={css.productInfo}>
                <div className={css.productTitle}>
                    <span>
                        {item.title}
                    </span>
                </div>
                <div className={css.productOrdered}>
                    <span>
                        {item.amount} шт. по {item.price}₽
                    </span>
                </div>
                <div className={css.productSumm}>
                    <span>
                        Сумма: {item.summ}₽
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Product;
