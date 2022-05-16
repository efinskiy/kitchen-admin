import Settings from './Modules/Settings/settings';
import css from './content.module.css';
import Orders from './Modules/Orders/orders';
import React from 'react';

const Content = (props) => {
    const {user, tabs} = props;

    return (
        <div className={css.contentWrapper}>
            {
                tabs.ordersCurrent === true ? <Orders/> :
                tabs.ordersPast === true ? <div>История заказов</div> :
                tabs.productsWarehouse === true ? <div>Остатки товаров</div> :
                tabs.productsAdd === true ? <div>Добавить товар</div> :
                tabs.productsCategories === true ? <div>Категории товаров</div> :
                tabs.settingsMain === true ? <Settings user={user}/> : 
                tabs.settingsPayments === true ? <div>Защищенные настройки</div>:
                tabs.settingsUsers === true ? <div>Пользователи</div> :
                false
            }
        </div>
    );
}

export default Content;
