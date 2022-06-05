import React from 'react';
import css from './content.module.css';
import Settings from './Modules/Settings/settings';
import Orders from './Modules/Orders/orders';
import History from './Modules/History/history';
import Storage from './Modules/Storage/storage';

const Content = (props) => {
    const {user, tabs, ordersState} = props;
    const [orders, setOrders] = ordersState;

    return (
        <div className={css.contentWrapper}>
            {
                tabs.ordersCurrent === true ? <Orders ordersState={[orders, setOrders]}/> :
                tabs.ordersPast === true ? <History/> :
                tabs.productsWarehouse === true ? <Storage/> :
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
